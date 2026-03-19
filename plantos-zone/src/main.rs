#![no_std]
#![no_main]
#![deny(
    clippy::mem_forget,
    reason = "mem::forget is generally not safe to do with esp_hal types, especially those \
    holding buffers for the duration of a data transfer."
)]
#![deny(clippy::large_stack_frames)]

mod protocol;
mod uart;

use crate::{
    protocol::ZoneId,
    uart::{init_uart, uart_listener},
};

use defmt::info;
use embassy_executor::Spawner;
use embassy_time::{Duration, Timer};
use esp_hal::clock::CpuClock;
use esp_hal::timer::timg::TimerGroup;
use {esp_backtrace as _, esp_println as _};

extern crate alloc;

// This creates a default app-descriptor required by the esp-idf bootloader.
// For more information see: <https://docs.espressif.com/projects/esp-idf/en/stable/esp32/api-reference/system/app_image_format.html#application-description>
esp_bootloader_esp_idf::esp_app_desc!();

static mut ZONE_ID: Option<ZoneId> = None;

#[allow(
    clippy::large_stack_frames,
    reason = "it's not unusual to allocate larger buffers etc. in main"
)]
#[esp_rtos::main]
async fn main(spawner: Spawner) -> ! {
    let config = esp_hal::Config::default().with_cpu_clock(CpuClock::max());
    let peripherals = esp_hal::init(config);

    esp_alloc::heap_allocator!(#[esp_hal::ram(reclaimed)] size: 73744);

    let timg0 = TimerGroup::new(peripherals.TIMG0);
    esp_rtos::start(timg0.timer0);

    info!("Embassy initialized!");

    set_zone_id(ZoneId::zone(1));

    let (rx, _) = init_uart(peripherals.UART2, peripherals.GPIO18, peripherals.GPIO17);
    spawner
        .spawn(uart_listener(rx))
        .expect("Failed to spawn UART listener");

    loop {
        Timer::after(Duration::from_secs(1)).await;
    }
}

fn set_zone_id(id: ZoneId) {
    unsafe {
        ZONE_ID = Some(id);
    }
}

fn get_zone_id() -> Option<ZoneId> {
    unsafe { ZONE_ID }
}
