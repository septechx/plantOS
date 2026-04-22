#![no_std]
#![no_main]
#![deny(
    clippy::mem_forget,
    reason = "mem::forget is generally not safe to do with esp_hal types, especially those \
        holding buffers for the duration of a data transfer."
)]
#![deny(clippy::large_stack_frames)]

mod output;
mod uart;

use core::cell::RefCell;

use crate::{output::init_output, uart::init_uart};
use critical_section::Mutex;
use defmt::info;
use embassy_executor::Spawner;
use embassy_time::{Duration, Timer};
use esp_hal::clock::CpuClock;
use esp_hal::timer::timg::TimerGroup;
use plantos_zone_protocol::ZoneId;
use static_cell::StaticCell;
use {esp_backtrace as _, esp_println as _};

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

extern crate alloc;

include!(concat!(env!("OUT_DIR"), "/generated_zone_id.rs"));

esp_bootloader_esp_idf::esp_app_desc!();

static ZONE_ID: StaticCell<Mutex<RefCell<Option<ZoneId>>>> = StaticCell::new();

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

    let zone_id_mutex = ZONE_ID.init_with(|| Mutex::new(RefCell::new(None)));
    critical_section::with(|cs| {
        zone_id_mutex
            .borrow_ref_mut(cs)
            .replace(ZoneId::zone(ZONE_ID_U8));
    });
    info!("Zone ID set to {}", ZONE_ID_U8);

    let (rx, tx) = init_uart(peripherals.UART1, peripherals.GPIO18, peripherals.GPIO17);
    spawner
        .spawn(uart::uart_listener(rx, tx, zone_id_mutex))
        .expect("Failed to spawn UART listener");

    let output = init_output(peripherals.GPIO5);
    spawner
        .spawn(output::output_manager(output))
        .expect("Failed to spawn output manager");

    loop {
        Timer::after(Duration::from_secs(1)).await;
    }
}
