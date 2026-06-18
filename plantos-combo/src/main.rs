#![no_std]
#![no_main]
#![deny(
    clippy::mem_forget,
    reason = "mem::forget is generally not safe to do with esp_hal types, especially those \
    holding buffers for the duration of a data transfer."
)]
#![deny(clippy::large_stack_frames)]

mod lora;
mod output;

use defmt::info;
use embassy_executor::Spawner;
use embassy_time::{Duration, Timer};
use esp_hal::gpio::{Output, OutputConfig};
use esp_hal::timer::timg::TimerGroup;
use esp_hal::{clock::CpuClock, gpio::Level};
use plantos_lora_protocol::LoRaId;
use {esp_backtrace as _, esp_println as _};

extern crate alloc;

esp_bootloader_esp_idf::esp_app_desc!();

#[derive(Debug, Clone, Copy, PartialEq, Eq, PartialOrd, Ord, Hash, defmt::Format)]
pub enum ZoneStatus {
    Open,
    Closed,
}

impl From<bool> for ZoneStatus {
    fn from(open: bool) -> Self {
        if open {
            ZoneStatus::Open
        } else {
            ZoneStatus::Closed
        }
    }
}

impl From<ZoneStatus> for bool {
    fn from(status: ZoneStatus) -> Self {
        status == ZoneStatus::Open
    }
}

pub const LORA_ID: LoRaId = LoRaId::module(1);

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

    info!("LoRa ID set to {}", LORA_ID);

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

    let mut out1 = Output::new(peripherals.GPIO5, Level::Low, OutputConfig::default());
    let mut out = Output::new(peripherals.GPIO6, Level::Low, OutputConfig::default());

    loop {
        out1.set_low();
        out.set_low();
        Timer::after(Duration::from_secs(5)).await;
        out1.set_high();
        out.set_high();
        Timer::after(Duration::from_secs(5)).await;
    }
}
