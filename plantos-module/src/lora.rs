use aes_gcm::{AeadInPlace, Aes256Gcm, Key, KeyInit, Nonce, aead::heapless::Vec};
use defmt::{error, info};
use embassy_embedded_hal::shared_bus::asynch::spi::SpiDevice;
use embassy_sync::blocking_mutex::raw::CriticalSectionRawMutex;
use embassy_sync::mutex::Mutex;
use esp_hal::gpio::{Input, InputConfig, Level, Output, OutputConfig};
use esp_hal::spi::Mode;
use esp_hal::spi::master::{Config as SpiConfig, Spi};
use esp_hal::time::Rate;
use esp_hal::{Async, peripherals};
use lora_phy::iv::GenericSx126xInterfaceVariant;
use lora_phy::mod_params::{Bandwidth, CodingRate, SpreadingFactor};
use lora_phy::sx126x::{self, Sx126x, Sx1262, TcxoCtrlVoltage};
use lora_phy::{LoRa, RxMode};
use plantos_lora_protocol::{LoRaId, Packet, PacketKind};
use static_cell::StaticCell;

use crate::uart;

// Development use only, replace in production
const KEY: &[u8; 32] = &[
    0x45, 0xc5, 0x45, 0xd8, 0xe7, 0xd0, 0xfe, 0x96, 0x26, 0xd, 0x04, 0x98, 0x1c, 0x3e, 0xf7, 0x7c,
    0x7c, 0x3b, 0x8d, 0xb5, 0x52, 0x1a, 0x47, 0x20, 0x0e, 0x2b, 0xbf, 0x0a, 0xe5, 0xae, 0x00, 0x57,
];

const LORA_FREQUENCY: u32 = 868_000_000; // 868Mhz (EU868 863~870)
static SPI_BUS: StaticCell<Mutex<CriticalSectionRawMutex, Spi<'static, Async>>> = StaticCell::new();

pub type LoRaInstance = LoRa<
    Sx126x<
        SpiDevice<'static, CriticalSectionRawMutex, Spi<'static, Async>, Output<'static>>,
        GenericSx126xInterfaceVariant<Output<'static>, Input<'static>>,
        Sx1262,
    >,
    embassy_time::Delay,
>;

#[allow(clippy::large_stack_frames)]
#[embassy_executor::task]
pub async fn lora_listener(mut lora: LoRaInstance) {
    let mut buf = [0u8; 256];

    let modulation_params = {
        match lora.create_modulation_params(
            SpreadingFactor::_10,
            Bandwidth::_250KHz,
            CodingRate::_4_8,
            LORA_FREQUENCY,
        ) {
            Ok(mp) => mp,
            Err(err) => {
                error!("Radio error = {}", err);
                return;
            }
        }
    };

    let rx_packet_params = {
        match lora.create_rx_packet_params(
            4,
            false,
            buf.len() as u8,
            true,
            false,
            &modulation_params,
        ) {
            Ok(pp) => pp,
            Err(err) => {
                error!("Radio error = {}", err);
                return;
            }
        }
    };

    match lora
        .prepare_for_rx(RxMode::Continuous, &modulation_params, &rx_packet_params)
        .await
    {
        Ok(()) => {}
        Err(err) => {
            error!("Radio error = {}", err);
            return;
        }
    };

    loop {
        buf = [0u8; 256];
        match lora.rx(&rx_packet_params, &mut buf).await {
            Ok((received_len, _rx_pkt_status)) => {
                let recieved_msg = &buf[..received_len as usize];
                let (nonce, message) = match parse_packet(recieved_msg) {
                    Some(p) => p,
                    None => {
                        info!("Invalid packet");
                        continue;
                    }
                };
                let plaintext = match decrypt_message(KEY, nonce, message) {
                    Ok(pt) => pt,
                    Err(_) => {
                        info!("Decryption error");
                        continue;
                    }
                };
                info!("Recieved packet: {}", plaintext.as_slice());
                let packet: Packet =
                    serde_json::from_slice(&plaintext).expect("Failed to parse packet");

                // TODO: Dynamic module ids
                if packet.to != LoRaId::module(1) || packet.from != LoRaId::MODULE {
                    continue;
                }

                match packet.kind {
                    PacketKind::Open => uart::signal_open(),
                    PacketKind::Close => uart::signal_close(),
                }
            }
            Err(err) => info!("rx unsuccessful = {}", err),
        }
    }
}

#[allow(clippy::large_stack_frames)]
pub fn decrypt_message(
    key_bytes: &[u8; 32],
    nonce_bytes: &[u8; 12],
    ciphertext: &[u8],
) -> Result<Vec<u8, 128>, aes_gcm::Error> {
    let key = Key::<Aes256Gcm>::from_slice(key_bytes);
    let cipher = Aes256Gcm::new(key);
    let nonce = Nonce::from_slice(nonce_bytes);

    let mut buffer: Vec<u8, 128> = Vec::new();
    buffer
        .extend_from_slice(ciphertext)
        .map_err(|_| aes_gcm::Error)?;

    cipher.decrypt_in_place(nonce, b"", &mut buffer)?;
    Ok(buffer)
}

fn parse_packet(packet: &[u8]) -> Option<(&[u8; 12], &[u8])> {
    if packet.len() < 12 {
        return None;
    }

    let (nonce_bytes, ciphertext) = packet.split_at(12);
    let nonce = nonce_bytes.try_into().ok()?;
    Some((nonce, ciphertext))
}

#[allow(clippy::too_many_arguments, clippy::large_stack_frames)]
pub async fn init_lora(
    spi: peripherals::SPI2<'static>,
    cs: peripherals::GPIO8<'static>,
    sck: peripherals::GPIO9<'static>,
    mosi: peripherals::GPIO10<'static>,
    miso: peripherals::GPIO11<'static>,
    rst: peripherals::GPIO12<'static>,
    busy: peripherals::GPIO13<'static>,
    dio1: peripherals::GPIO14<'static>,
) -> LoRaInstance {
    let nss = Output::new(cs, Level::High, OutputConfig::default());
    let reset = Output::new(rst, Level::Low, OutputConfig::default());
    let busy = Input::new(busy, InputConfig::default());
    let dio1 = Input::new(dio1, InputConfig::default());

    let spi = Spi::new(
        spi,
        SpiConfig::default()
            .with_frequency(Rate::from_khz(100))
            .with_mode(Mode::_0),
    )
    .expect("Failed to init SPI")
    .with_sck(sck)
    .with_mosi(mosi)
    .with_miso(miso)
    .into_async();

    let spi_bus = SPI_BUS.init(Mutex::new(spi));
    let spi_dev = SpiDevice::new(spi_bus, nss);

    let sx126x_config = sx126x::Config {
        chip: Sx1262,
        tcxo_ctrl: Some(TcxoCtrlVoltage::Ctrl1V7),
        use_dcdc: false,
        rx_boost: true,
    };

    let iv = GenericSx126xInterfaceVariant::new(reset, dio1, busy, None, None).unwrap();

    LoRa::new(
        Sx126x::new(spi_dev, iv, sx126x_config),
        false,
        embassy_time::Delay,
    )
    .await
    .expect("Failed to initialize LoRa")
}
