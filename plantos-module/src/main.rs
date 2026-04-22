#![no_std]
#![no_main]
#![deny(
    clippy::mem_forget,
    reason = "mem::forget is generally not safe to do with esp_hal types, especially those \
    holding buffers for the duration of a data transfer."
)]
#![deny(clippy::large_stack_frames)]

mod lora;
mod uart;

use defmt::info;
use embassy_executor::Spawner;
use embassy_time::{Duration, Timer};
use esp_hal::clock::CpuClock;
use esp_hal::timer::timg::TimerGroup;
use plantos_zone_protocol::ZoneId;
use {esp_backtrace as _, esp_println as _};

extern crate alloc;

esp_bootloader_esp_idf::esp_app_desc!();

const ZONE_ID: u8 = 1;

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

    let zone_id = ZoneId::zone(ZONE_ID);
    info!("Zone ID set to {}", ZONE_ID);

    let (rx, tx) = uart::init_uart(peripherals.UART1, peripherals.GPIO47, peripherals.GPIO48);
    spawner
        .spawn(uart::uart_sender(tx, rx, zone_id))
        .expect("Failed to spawn UART sender");

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
    spawner
        .spawn(lora::lora_listener(lora))
        .expect("Failed to spawn LoRa listener");

    loop {
        uart::signal_open();
        Timer::after(Duration::from_secs(5)).await;
        uart::signal_close();
        Timer::after(Duration::from_secs(5)).await;
    }
}
