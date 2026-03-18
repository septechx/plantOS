use defmt::{error, info};
use esp_hal::peripherals;
use esp_hal::uart::{Config, Uart, UartRx, UartTx};

use crate::protocol::Message;

#[embassy_executor::task]
pub async fn uart_listener(mut rx: UartRx<'static, esp_hal::Async>) {
    // sizeof(Message) = 16b (Extra space for newline/null terminator)
    let mut buf = [0u8; 32];

    loop {
        match rx.read_async(&mut buf).await {
            Ok(n) if n > 0 => {
                let rec = &buf[..n];
                decode_message(rec);
            }
            Ok(_) => {}
            Err(e) => {
                error!("UART recieve error: {}", e)
            }
        }
    }
}

fn decode_message(msg: &[u8]) {
    match serde_json::from_slice::<Message>(msg) {
        Ok(msg) => {
            info!("{:?}", msg);
        }
        Err(_) => {
            error!("Message decode error");
        }
    }
}

pub fn init_uart<'a>(
    uart: peripherals::UART2<'a>,
    rx: peripherals::GPIO18<'a>,
    tx: peripherals::GPIO17<'a>,
) -> (UartRx<'a, esp_hal::Async>, UartTx<'a, esp_hal::Async>) {
    let uart = Uart::new(uart, Config::default())
        .expect("Failed to init UART")
        .with_rx(rx)
        .with_tx(tx)
        .into_async();

    uart.split()
}
