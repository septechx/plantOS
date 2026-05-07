#![no_std]
#![no_main]
#![deny(
    clippy::mem_forget,
    reason = "mem::forget is generally not safe to do with esp_hal types, especially those \
    holding buffers for the duration of a data transfer."
)]
#![feature(const_trait_impl)]
#![feature(const_option_ops)]

mod display;
mod lora;
mod router;
mod web;
mod wifi;

use defmt::info;
use embassy_executor::Spawner;
use embassy_time::{Duration, Timer};
use esp_hal::timer::timg::TimerGroup;
use esp_hal::{clock::CpuClock, interrupt::software::SoftwareInterruptControl, rng::Rng};
use {esp_backtrace as _, esp_println as _};

extern crate alloc;

// This creates a default app-descriptor required by the esp-idf bootloader.
// For more information see: <https://docs.espressif.com/projects/esp-idf/en/stable/esp32/api-reference/system/app_image_format.html#application-description>
esp_bootloader_esp_idf::esp_app_desc!();

#[allow(
    clippy::large_stack_frames,
    reason = "it's not unusual to allocate larger buffers etc. in main"
)]
#[esp_rtos::main]
async fn main(spawner: Spawner) -> ! {
    // generator version: 1.2.0

    let config = esp_hal::Config::default().with_cpu_clock(CpuClock::max());
    let peripherals = esp_hal::init(config);

    esp_alloc::heap_allocator!(#[esp_hal::ram(reclaimed)] size: 73744);

    let timg0 = TimerGroup::new(peripherals.TIMG0);
    let sw_int = SoftwareInterruptControl::new(peripherals.SW_INTERRUPT);
    esp_rtos::start(timg0.timer0, sw_int.software_interrupt0);

    info!("Embassy initialized!");

    let disp = display::init_display(
        peripherals.SPI3,
        peripherals.GPIO26,
        peripherals.GPIO48,
        peripherals.GPIO47,
        peripherals.GPIO33,
        peripherals.GPIO6,
    )
    .await;

    spawner.spawn(display::display_task(disp).unwrap());

    let stack = wifi::init_wifi(&spawner, peripherals.WIFI).await;

    spawner.spawn(web::web_server(stack).unwrap());

    let lora = lora::init_lora(
        peripherals.SPI2,
        peripherals.GPIO8,
        peripherals.GPIO9,
        peripherals.GPIO10,
        peripherals.GPIO11,
        peripherals.GPIO12,
        peripherals.GPIO13,
        peripherals.GPIO14,
    )
    .await;

    let rng = Rng::new();
    {
        let token = lora::lora_sender(lora, rng);
        spawner.spawn(token.unwrap());
    }

    loop {
        Timer::after(Duration::from_secs(10)).await;
    }
}
