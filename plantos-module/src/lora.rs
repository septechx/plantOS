use embedded_hal_bus::spi::ExclusiveDevice;
use esp_hal::gpio::{Event, Input, InputConfig, Level, Output, OutputConfig};
use esp_hal::spi::Mode;
use esp_hal::spi::master::{Config as SpiConfig, Spi};
use esp_hal::time::Rate;
use esp_hal::{Async, peripherals};
use sx1262::{RfFrequencyConfig, StandbyConfig, commands};

/// Returns (device, busy, dio1, rst)
#[allow(clippy::type_complexity, clippy::too_many_arguments)]
pub async fn init_lora<'a>(
    spi: peripherals::SPI2<'a>,
    cs: peripherals::GPIO8<'a>,
    sck: peripherals::GPIO9<'a>,
    mosi: peripherals::GPIO10<'a>,
    miso: peripherals::GPIO11<'a>,
    rst: peripherals::GPIO12<'a>,
    busy: peripherals::GPIO13<'a>,
    dio1: peripherals::GPIO14<'a>,
) -> (
    sx1262::Device<ExclusiveDevice<Spi<'a, Async>, Output<'a>, embassy_time::Delay>>,
    Input<'a>,
    Input<'a>,
    Output<'a>,
) {
    let cs = Output::new(cs, Level::High, OutputConfig::default());
    let rst = Output::new(rst, Level::High, OutputConfig::default());
    let mut busy = Input::new(busy, InputConfig::default());
    let dio1 = Input::new(dio1, InputConfig::default());

    let spi = Spi::new(
        spi,
        SpiConfig::default()
            .with_frequency(Rate::from_mhz(4))
            .with_mode(Mode::_0),
    )
    .expect("Failed to init SPI")
    .with_sck(sck)
    .with_mosi(mosi)
    .with_miso(miso)
    .into_async();

    let spi =
        ExclusiveDevice::new(spi, cs, embassy_time::Delay).expect("Failed to create SPI device");

    let mut radio = sx1262::Device::new(spi);

    busy.wait_for(Event::LowLevel).await;
    radio
        .execute_command(commands::SetStandby {
            config: StandbyConfig::Rc,
        })
        .expect("Failed to set SX1262 standby");

    busy.wait_for(Event::LowLevel).await;
    radio
        .execute_command(commands::SetRfFrequency {
            config: RfFrequencyConfig {
                frequency: 868_000_000,
            },
        })
        .expect("Failed to set RF frequency");

    (radio, busy, dio1, rst)
}
