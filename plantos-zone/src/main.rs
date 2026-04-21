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

use core::{
    cell::RefCell,
    sync::atomic::{AtomicBool, Ordering},
};

use crate::{
    output::{init_output, output_manager},
    uart::{init_uart, uart_listener},
};

use critical_section::Mutex;
use defmt::info;
use embassy_executor::Spawner;
use embassy_time::{Duration, Timer};
use esp_hal::clock::CpuClock;
use esp_hal::timer::timg::TimerGroup;
use plantos_zone_protocol::ZoneId;
use {esp_backtrace as _, esp_println as _};

extern crate alloc;

// This creates a default app-descriptor required by the esp-idf bootloader.
// For more information see: <https://docs.espressif.com/projects/esp-idf/en/stable/esp32/api-reference/system/app_image_format.html#application-description>
esp_bootloader_esp_idf::esp_app_desc!();

static ZONE_ID: Mutex<RefCell<Option<ZoneId>>> = Mutex::new(RefCell::new(None));
static ZONE_STATUS: AtomicBool = AtomicBool::new(false);

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

    let zone_id = env!("ZONE_ID").parse::<u8>().expect("Invalid ZONE_ID");
    set_zone_id(ZoneId::zone(zone_id));
    info!("Zone ID set to {}", zone_id);

    let (rx, tx) = init_uart(peripherals.UART1, peripherals.GPIO18, peripherals.GPIO17);
    spawner
        .spawn(uart_listener(rx, tx))
        .expect("Failed to spawn UART listener");

    let output = init_output(peripherals.GPIO5);
    spawner
        .spawn(output_manager(output))
        .expect("Failed to spawn output manager");

    loop {
        Timer::after(Duration::from_secs(1)).await;
    }
}

pub fn set_zone_id(id: ZoneId) {
    critical_section::with(|cs| {
        ZONE_ID.borrow_ref_mut(cs).replace(id);
    });
}

pub fn get_zone_id() -> Option<ZoneId> {
    critical_section::with(|cs| *ZONE_ID.borrow_ref(cs))
}

pub fn set_zone_status(status: ZoneStatus) {
    ZONE_STATUS.store(status.into(), Ordering::Relaxed);
}

pub fn get_zone_status() -> ZoneStatus {
    ZONE_STATUS.load(Ordering::Relaxed).into()
}

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
