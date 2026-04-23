use defmt::{error, info};
use embassy_executor::Spawner;
use embassy_net::{Runner, Stack, StackResources};
use embassy_time::{Duration, Timer};
use esp_hal::peripherals;
use esp_hal::rng::Rng;
use esp_radio::wifi::scan::ScanConfig;
use esp_radio::wifi::sta::StationConfig;
use esp_radio::wifi::{ControllerConfig, Interface, WifiController};
use static_cell::StaticCell;

static STACK_RESOURCES: StaticCell<StackResources<3>> = StaticCell::new();

const SSID: &str = option_env!("SSID").unwrap_or("TEST_SSID");
const PASSWORD: &str = option_env!("PASSWORD").unwrap_or("TEST_PWD");

#[allow(clippy::large_stack_frames)]
pub async fn init_wifi(
    spawner: &Spawner,
    wifi_controller: peripherals::WIFI<'static>,
) -> Stack<'static> {
    let station_config = esp_radio::wifi::Config::Station(
        StationConfig::default()
            .with_ssid(SSID)
            .with_password(PASSWORD.into()),
    );

    info!("Starting WIFI");
    let (mut controller, interfaces) = esp_radio::wifi::new(
        wifi_controller,
        ControllerConfig::default().with_initial_config(station_config),
    )
    .expect("Failed to start WIFI");
    info!("Succesfully started WIFI!");

    let wifi_interface = interfaces.station;

    let config = embassy_net::Config::dhcpv4(Default::default());

    let rng = Rng::new();
    let seed = (rng.random() as u64) << 32 | rng.random() as u64;

    let (stack, runner) = embassy_net::new(
        wifi_interface,
        config,
        STACK_RESOURCES.uninit().write(StackResources::<3>::new()),
        seed,
    );

    info!("Scan:");
    let scan_config = ScanConfig::default().with_max(10);
    for ap in controller
        .scan_async(&scan_config)
        .await
        .expect("Failed to scan for APs")
    {
        info!("{}", ap.ssid.as_str());
    }

    spawner.spawn(connection(controller).unwrap());
    spawner.spawn(net_task(runner).unwrap());

    stack.wait_config_up().await;

    if let Some(config) = stack.config_v4() {
        info!("Got IP: {}", config.address);
    }

    stack
}

#[allow(clippy::large_stack_frames)]
#[embassy_executor::task]
async fn connection(mut controller: WifiController<'static>) {
    info!("start connection task");

    loop {
        info!("About to connect...");

        match controller.connect_async().await {
            Ok(info) => {
                info!("Wifi connected to {}", info.ssid.as_str());

                // wait until we're no longer connected
                let info = controller.wait_for_disconnect_async().await.ok();
                match info {
                    Some(info) => info!("Disconnected: {}", info.ssid.as_str()),
                    None => info!("Disconnected"),
                }
            }
            Err(e) => {
                error!("Failed to connect to wifi: {}", e);
            }
        }

        Timer::after(Duration::from_millis(5000)).await
    }
}

#[embassy_executor::task]
async fn net_task(mut runner: Runner<'static, Interface<'static>>) {
    runner.run().await
}
