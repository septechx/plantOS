use defmt::{Format, error, info};
use embassy_sync::blocking_mutex::raw::CriticalSectionRawMutex;
use embassy_sync::channel::Channel;
use embassy_time::{Duration, Timer};
use esp_hal::peripherals;
use esp_hal::uart::{Config, Uart, UartRx, UartTx};
use plantos_zone_protocol::{Message, MessageKind, ZoneId};

const MAX_RETRIES: u8 = 10;
const ACK_TIMEOUT_MS: u64 = 1000;

#[derive(Debug, Clone, Copy)]
pub enum ZoneCommand {
    Open,
    Close,
}

static COMMAND_CHANNEL: Channel<CriticalSectionRawMutex, ZoneCommand, 8> = Channel::new();

#[allow(clippy::large_stack_frames)]
#[embassy_executor::task]
pub async fn uart_sender(
    mut tx: UartTx<'static, esp_hal::Async>,
    mut rx: UartRx<'static, esp_hal::Async>,
    zone_id: ZoneId,
) {
    let mut buf = [0u8; 32];

    loop {
        match COMMAND_CHANNEL.receive().await {
            ZoneCommand::Open => {
                info!("Sending Open to zone {}", zone_id);
                if send_with_retry(&mut tx, &mut rx, zone_id, MessageKind::Open, &mut buf)
                    .await
                    .is_ok()
                {
                    info!("Zone {} opened", zone_id);
                } else {
                    error!("Failed to open zone {} after retries", zone_id);
                }
            }
            ZoneCommand::Close => {
                info!("Sending Close to zone {}", zone_id);
                if send_with_retry(&mut tx, &mut rx, zone_id, MessageKind::Close, &mut buf)
                    .await
                    .is_ok()
                {
                    info!("Zone {} closed", zone_id);
                } else {
                    error!("Failed to close zone {} after retries", zone_id);
                }
            }
        }
    }
}

async fn send_with_retry(
    tx: &mut UartTx<'static, esp_hal::Async>,
    rx: &mut UartRx<'static, esp_hal::Async>,
    zone_id: ZoneId,
    kind: MessageKind,
    rx_buf: &mut [u8; 32],
) -> Result<(), SendError> {
    let mut attempt = 0;

    while attempt < MAX_RETRIES {
        attempt += 1;

        let msg = Message { id: zone_id, kind };
        let payload = serde_json::to_string(&msg).expect("Message serializes");

        if let Err(e) = tx.write(payload.as_bytes()) {
            error!("TX error: {}", e);
            continue;
        }
        if let Err(e) = tx.write("\n".as_bytes()) {
            error!("TX error: {}", e);
            continue;
        }
        if let Err(e) = tx.flush() {
            error!("TX flush error: {}", e);
            continue;
        }

        match wait_for_ack(rx, rx_buf).await {
            Ok(true) => return Ok(()),
            Ok(false) => {
                info!("Unexpected response on attempt {}, retrying", attempt);
            }
            Err(e) => {
                info!("ACK timeout/error on attempt {}: {:?}", attempt, e);
            }
        }

        Timer::after(Duration::from_millis(50)).await;
    }

    Err(SendError::MaxRetriesExceeded)
}

async fn wait_for_ack(
    rx: &mut UartRx<'static, esp_hal::Async>,
    buf: &mut [u8; 32],
) -> Result<bool, SendError> {
    let deadline = embassy_time::Instant::now() + Duration::from_millis(ACK_TIMEOUT_MS);

    loop {
        if embassy_time::Instant::now() >= deadline {
            return Err(SendError::Timeout);
        }

        match rx.read_async(buf).await {
            Ok(n) if n > 0 => {
                if let Ok(msg) = serde_json::from_slice::<Message>(&buf[..n]) {
                    return Ok(msg.kind == MessageKind::Ack);
                } else {
                    return Ok(false);
                }
            }
            Ok(_) => {}
            Err(e) => {
                error!("RX error: {}", e);
                return Err(SendError::RxError);
            }
        }
    }
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Format)]
pub enum SendError {
    MaxRetriesExceeded,
    Timeout,
    RxError,
}

pub fn init_uart<'a>(
    uart: peripherals::UART1<'a>,
    rx: peripherals::GPIO47<'a>,
    tx: peripherals::GPIO48<'a>,
) -> (UartRx<'a, esp_hal::Async>, UartTx<'a, esp_hal::Async>) {
    let uart = Uart::new(uart, Config::default().with_baudrate(9600))
        .expect("Failed to init UART")
        .with_rx(rx)
        .with_tx(tx)
        .into_async();

    uart.split()
}

pub fn signal_open() {
    COMMAND_CHANNEL.try_send(ZoneCommand::Open).ok();
}

pub fn signal_close() {
    COMMAND_CHANNEL.try_send(ZoneCommand::Close).ok();
}
