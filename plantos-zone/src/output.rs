use defmt::info;
use embassy_sync::signal::Signal;
use embassy_sync::blocking_mutex::raw::CriticalSectionRawMutex;
use esp_hal::gpio::{Level, Output, OutputConfig};
use esp_hal::peripherals;

use crate::ZoneStatus;

pub static ZONE_STATUS_SIGNAL: Signal<CriticalSectionRawMutex, ZoneStatus> = Signal::new();

#[embassy_executor::task]
pub async fn output_manager(mut output: Output<'static>) {
    loop {
        let status = ZONE_STATUS_SIGNAL.wait().await;

        info!("Zone status changed to {}", status);

        if status == ZoneStatus::Open {
            output.set_high();
        } else {
            output.set_low();
        }
    }
}

pub fn init_output<'a>(output: peripherals::GPIO5<'a>) -> Output<'a> {
    Output::new(output, Level::Low, OutputConfig::default())
}
