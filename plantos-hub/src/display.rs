use defmt::info;
use display_interface_spi::SPIInterface;
use embassy_embedded_hal::shared_bus::asynch::spi::SpiDevice;
use embassy_sync::blocking_mutex::raw::CriticalSectionRawMutex;
use embassy_sync::mutex::Mutex;
use embassy_time::{Duration, Timer};
use embedded_graphics::mono_font::MonoTextStyle;
use embedded_graphics::mono_font::ascii::FONT_6X10;
use embedded_graphics::pixelcolor::BinaryColor;
use embedded_graphics::prelude::*;
use embedded_graphics::text::Text;
use esp_hal::gpio::{Level, Output, OutputConfig};
use esp_hal::spi::Mode;
use esp_hal::spi::master::{Config as SpiConfig, Spi};
use esp_hal::time::Rate;
use esp_hal::{Async, peripherals};
use ssd1306::Ssd1306Async;
use ssd1306::mode::BufferedGraphicsModeAsync;
use ssd1306::prelude::*;
use ssd1306::rotation::DisplayRotation;
use ssd1306::size::DisplaySize128x64;
use static_cell::StaticCell;

static SPI_BUS: StaticCell<Mutex<CriticalSectionRawMutex, Spi<'static, Async>>> = StaticCell::new();

pub type Display = Ssd1306Async<
    SPIInterface<
        SpiDevice<'static, CriticalSectionRawMutex, Spi<'static, Async>, Output<'static>>,
        Output<'static>,
    >,
    DisplaySize128x64,
    BufferedGraphicsModeAsync<DisplaySize128x64>,
>;

pub async fn init_display(
    spi: peripherals::SPI3<'static>,
    cs: peripherals::GPIO26<'static>,
    dc: peripherals::GPIO48<'static>,
    mosi: peripherals::GPIO47<'static>,
    sck: peripherals::GPIO33<'static>,
    rst: peripherals::GPIO6<'static>,
) -> Display {
    let cs = Output::new(cs, Level::High, OutputConfig::default());
    let mut reset = Output::new(rst, Level::Low, OutputConfig::default());
    let dc = Output::new(dc, Level::Low, OutputConfig::default());

    let spi = Spi::new(
        spi,
        SpiConfig::default()
            .with_frequency(Rate::from_khz(400))
            .with_mode(Mode::_0),
    )
    .expect("Failed to init display SPI")
    .with_sck(sck)
    .with_mosi(mosi)
    .into_async();

    let spi_bus = SPI_BUS.init(Mutex::new(spi));
    let spi_dev = SpiDevice::new(spi_bus, cs);

    let di = SPIInterface::new(spi_dev, dc);
    let mut disp = Ssd1306Async::new(di, DisplaySize128x64, DisplayRotation::Rotate0)
        .into_buffered_graphics_mode();

    disp.reset(&mut reset, &mut embassy_time::Delay)
        .await
        .expect("Failed to reset display");
    disp.init().await.expect("Failed to init display");
    disp.flush().await.expect("Failed to flush display");

    disp
}

#[embassy_executor::task]
pub async fn display_task(mut disp: Display) {
    loop {
        info!("Trying to print");
        Text::new(
            "PlantOS",
            Point::new(32, 32),
            MonoTextStyle::new(&FONT_6X10, BinaryColor::On),
        )
        .draw(&mut disp)
        .unwrap();
        disp.flush().await.expect("Failed to flush display");
        Timer::after(Duration::from_secs(5)).await;
    }
}
