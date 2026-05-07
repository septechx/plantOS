use embassy_embedded_hal::shared_bus::asynch::spi::SpiDevice;
use embassy_sync::blocking_mutex::raw::CriticalSectionRawMutex;
use embassy_sync::mutex::Mutex;
use embedded_graphics::image::{Image, ImageRawLE};
use embedded_graphics::pixelcolor::BinaryColor;
use embedded_graphics::prelude::Point;
use esp_hal::gpio::{Level, Output, OutputConfig};
use esp_hal::spi::Mode;
use esp_hal::spi::master::{Config as SpiConfig, Spi};
use esp_hal::time::Rate;
use esp_hal::{Async, peripherals};
use ssd1309::mode::GraphicsMode;
use static_cell::StaticCell;

static SPI_BUS: StaticCell<Mutex<CriticalSectionRawMutex, Spi<'static, Async>>> = StaticCell::new();

pub async fn init_display(
    spi: peripherals::SPI3<'static>,
    cs: peripherals::GPIO26<'static>,
    dc: peripherals::GPIO48<'static>,
    mosi: peripherals::GPIO47<'static>,
    sck: peripherals::GPIO33<'static>,
    rst: peripherals::GPIO6<'static>,
) {
    let cs = Output::new(cs, Level::Low, OutputConfig::default());
    let reset = Output::new(rst, Level::Low, OutputConfig::default());

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

    let mut disp: GraphicsMode<_> = ssd1309::Builder::new().connect(spi_dev).into();
    disp.reset(&mut reset, &mut embassy_time::Delay)
        .expect("Failed to reset display");
    disp.init().expect("Failed to init display");
    disp.flush().expect("Failed to flush display");

    let im: ImageRawLE<BinaryColor> = ImageRawLE::new(include_bytes!("./rust.raw"), 64);

    Image::new(&im, Point::new(32, 0)).draw(&mut disp).unwrap();

    disp.flush().unwrap();

    loop {}
}
