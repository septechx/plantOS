use aes_gcm::{AeadInPlace, Aes256Gcm, Key, KeyInit, Nonce, aead::heapless::Vec as AesVec};
use embassy_embedded_hal::shared_bus::asynch::spi::SpiDevice;
use embassy_sync::blocking_mutex::raw::CriticalSectionRawMutex;
use embassy_sync::channel::Channel;
use embassy_sync::mutex::Mutex;
use esp_hal::gpio::{Input, InputConfig, Level, Output, OutputConfig};
use esp_hal::spi::Mode;
use esp_hal::spi::master::{Config as SpiConfig, Spi};
use esp_hal::time::Rate;
use esp_hal::{Async, peripherals};
use lora_phy::LoRa;
use lora_phy::iv::GenericSx126xInterfaceVariant;
use lora_phy::mod_params::{Bandwidth, CodingRate, SpreadingFactor};
use lora_phy::sx126x::{self, Sx126x, Sx1262, TcxoCtrlVoltage};
use plantos_lora_protocol::{LoRaId, Packet, PacketKind};
use static_cell::StaticCell;

// Development use only, replace in production
const KEY: &[u8; 32] = &[
    0x45, 0xc5, 0x45, 0xd8, 0xe7, 0xd0, 0xfe, 0x96, 0x26, 0xd, 0x04, 0x98, 0x1c, 0x3e, 0xf7, 0x7c,
    0x7c, 0x3b, 0x8d, 0xb5, 0x52, 0x1a, 0x47, 0x20, 0x0e, 0x2b, 0xbf, 0x0a, 0xe5, 0xae, 0x00, 0x57,
];

const LORA_FREQUENCY: u32 = 868_000_000;
const MAX_CIPHERTEXT: usize = 256;
static SPI_BUS: StaticCell<Mutex<CriticalSectionRawMutex, Spi<'static, Async>>> = StaticCell::new();

pub type LoRaInstance = LoRa<
    Sx126x<
        SpiDevice<'static, CriticalSectionRawMutex, Spi<'static, Async>, Output<'static>>,
        GenericSx126xInterfaceVariant<Output<'static>, Input<'static>>,
        Sx1262,
    >,
    embassy_time::Delay,
>;

#[derive(Debug, Clone, Copy)]
pub enum LoRaCommand {
    Send { to: LoRaId, kind: PacketKind },
}

static COMMAND_CHANNEL: Channel<CriticalSectionRawMutex, LoRaCommand, 8> = Channel::new();

pub fn signal_send(to: LoRaId, kind: PacketKind) {
    if COMMAND_CHANNEL
        .try_send(LoRaCommand::Send { to, kind })
        .is_err()
    {
        defmt::error!("LoRa command channel full; dropping Send");
    }
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

    let iv = GenericSx126xInterfaceVariant::new(reset, dio1, busy, None, None)
        .expect("sx126x IV init failed");

    LoRa::new(
        Sx126x::new(spi_dev, iv, sx126x_config),
        false,
        embassy_time::Delay,
    )
    .await
    .expect("Failed to initialize LoRa")
}

pub fn encrypt_message(
    key_bytes: &[u8; 32],
    nonce_bytes: &[u8; 12],
    plaintext: &[u8],
) -> AesVec<u8, MAX_CIPHERTEXT> {
    let key = Key::<Aes256Gcm>::from_slice(key_bytes);
    let cipher = Aes256Gcm::new(key);
    let nonce = Nonce::from_slice(nonce_bytes);

    let mut buffer: AesVec<u8, MAX_CIPHERTEXT> = AesVec::new();
    buffer
        .extend_from_slice(plaintext)
        .expect("buffer capacity is sufficient");

    cipher
        .encrypt_in_place(nonce, b"", &mut buffer)
        .expect("encryption failed");
    buffer
}

pub fn generate_nonce(rng: &mut esp_hal::rng::Rng) -> [u8; 12] {
    let a = rng.random();
    let b = rng.random();
    let c = rng.random();
    [
        a as u8,
        (a >> 8) as u8,
        (a >> 16) as u8,
        (a >> 24) as u8,
        b as u8,
        (b >> 8) as u8,
        (b >> 16) as u8,
        (b >> 24) as u8,
        c as u8,
        (c >> 8) as u8,
        (c >> 16) as u8,
        (c >> 24) as u8,
    ]
}

#[allow(clippy::large_stack_frames)]
#[embassy_executor::task]
pub async fn lora_sender(mut lora: LoRaInstance, mut rng: esp_hal::rng::Rng) {
    let modulation_params = match lora.create_modulation_params(
        SpreadingFactor::_10,
        Bandwidth::_250KHz,
        CodingRate::_4_8,
        LORA_FREQUENCY,
    ) {
        Ok(mp) => mp,
        Err(err) => {
            defmt::error!("Radio error = {}", err);
            return;
        }
    };

    const OUTPUT_POWER: i32 = 22;

    loop {
        match COMMAND_CHANNEL.receive().await {
            LoRaCommand::Send { to, kind } => {
                defmt::info!("Sending {:?} to {}", kind, to);

                let packet = Packet {
                    from: LoRaId::HUB,
                    to,
                    kind,
                };

                let payload = serde_json::to_vec(&packet).expect("Packet serializes");
                let nonce = generate_nonce(&mut rng);
                let encrypted = encrypt_message(KEY, &nonce, &payload);

                let mut tx_buffer: heapless::Vec<u8, 256> = heapless::Vec::new();
                tx_buffer
                    .extend_from_slice(&nonce)
                    .expect("buffer capacity is sufficient");
                tx_buffer
                    .extend_from_slice(&encrypted)
                    .expect("buffer capacity is sufficient");

                let mut tx_packet_params =
                    match lora.create_tx_packet_params(4, false, true, false, &modulation_params) {
                        Ok(p) => p,
                        Err(e) => {
                            defmt::error!("TX packet params error = {}", e);
                            continue;
                        }
                    };

                if let Err(e) = lora
                    .prepare_for_tx(
                        &modulation_params,
                        &mut tx_packet_params,
                        OUTPUT_POWER,
                        &tx_buffer,
                    )
                    .await
                {
                    defmt::error!("TX prepare error = {}", e);
                    continue;
                }

                match lora.tx().await {
                    Ok(()) => defmt::info!("TX done"),
                    Err(e) => defmt::error!("TX error = {}", e),
                }
            }
        }
    }
}
