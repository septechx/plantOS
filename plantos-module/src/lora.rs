use embassy_embedded_hal::shared_bus::asynch::spi::SpiDevice;
use embassy_sync::blocking_mutex::raw::CriticalSectionRawMutex;
use embassy_sync::mutex::Mutex;
use esp_hal::gpio::{Input, InputConfig, Level, Output, OutputConfig};
use esp_hal::spi::Mode;
use esp_hal::spi::master::{Config as SpiConfig, Spi};
use esp_hal::time::Rate;
use esp_hal::{Async, peripherals};
use lora_phy::LoRa;
use lora_phy::iv::GenericSx126xInterfaceVariant;
use lora_phy::sx126x::{self, Sx126x, Sx1262, TcxoCtrlVoltage};
use static_cell::StaticCell;

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
pub async fn lora_listener(lora: LoRaInstance) {}

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
