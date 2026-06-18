use defmt::info;
use embassy_sync::blocking_mutex::raw::CriticalSectionRawMutex;
use embassy_sync::signal::Signal;
use esp_hal::gpio::{Level, Output, OutputConfig};
use esp_hal::peripherals;

use crate::ZoneStatus;

pub static ZONE_STATUS_SIGNAL: Signal<CriticalSectionRawMutex, [ZoneStatus; 2]> = Signal::new();

#[embassy_executor::task]
pub async fn output_manager(mut outputs: (Output<'static>, Output<'static>)) {
    loop {
        let status = ZONE_STATUS_SIGNAL.wait().await;

        info!("Zone status changed to {}", status);

        let [s1, s2] = status;
        if s1 == ZoneStatus::Open {
            outputs.0.set_high();
        } else {
            outputs.0.set_low();
        }
        if s2 == ZoneStatus::Open {
            outputs.1.set_high();
        } else {
            outputs.1.set_low();
        }
    }
}

pub fn init_output<'a>(
    output1: peripherals::GPIO5<'a>,
    output2: peripherals::GPIO6<'a>,
) -> (Output<'a>, Output<'a>) {
    (
        Output::new(output1, Level::Low, OutputConfig::default()),
        Output::new(output2, Level::Low, OutputConfig::default()),
    )
}
