use defmt::info;
use embassy_time::Timer;
use esp_hal::gpio::{Level, Output, OutputConfig};
use esp_hal::peripherals;

use crate::{ZoneStatus, get_zone_status};

#[embassy_executor::task]
pub async fn output_manager(mut output: Output<'static>) {
    let mut prev: Option<ZoneStatus> = None;
    loop {
        let status = get_zone_status();
        if Some(status) == prev {
            Timer::after_millis(50).await;
            continue;
        }
        prev = Some(status);

        info!("Zone status changed to {}", status);

        if status == ZoneStatus::Open {
            output.set_high();
        } else {
            output.set_low();
        }
    }
}

pub fn init_output<'a>(output: peripherals::GPIO5<'a>) -> Output<'a>
where
    'a: 'static,
{
    Output::new(output, Level::Low, OutputConfig::default())
}
