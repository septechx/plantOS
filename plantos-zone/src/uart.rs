use defmt::{error, info};
use esp_hal::peripherals;
use esp_hal::uart::{Config, Uart, UartRx, UartTx};
use heapless::Vec;

use crate::get_zone_id;
use crate::protocol::Message;

const FRAME_DELIMITER: u8 = b'\n';
const MAX_FRAME_SIZE: usize = 200;
const RX_BUFFER_CAPACITY: usize = 200;

#[embassy_executor::task]
pub async fn uart_listener(mut rx: UartRx<'static, esp_hal::Async>) {
    let mut buf = [0u8; 32];
    static mut RX_BUF: Vec<u8, RX_BUFFER_CAPACITY> = Vec::new();

    loop {
        match rx.read_async(&mut buf).await {
            Ok(n) if n > 0 => {
                #[allow(static_mut_refs)]
                let rx_buf: &mut Vec<u8, RX_BUFFER_CAPACITY> = unsafe { &mut RX_BUF };
                for &byte in &buf[..n] {
                    if rx_buf.push(byte).is_err() {
                        error!("RX buffer full, dropping data");
                        rx_buf.clear();
                        break;
                    }
                }

                if rx_buf.len() > MAX_FRAME_SIZE {
                    error!("Oversized frame: {} bytes, dropping buffer", rx_buf.len());
                    rx_buf.clear();
                    continue;
                }

                while let Some(pos) = rx_buf.iter().position(|&b| b == FRAME_DELIMITER) {
                    let frame = rx_buf[..pos].to_vec();
                    let remaining_len = rx_buf.len() - pos - 1;
                    rx_buf.copy_within(pos + 1.., 0);
                    rx_buf.truncate(remaining_len);

                    if !frame.is_empty() {
                        decode_message(&frame);
                    }
                }
            }
            Ok(_) => {}
            Err(e) => {
                error!("UART receive error: {}", e)
            }
        }
    }
}

fn decode_message(msg: &[u8]) {
    match serde_json::from_slice::<Message>(msg) {
        Ok(msg) => {
            if Some(msg.id) != get_zone_id() {
                return;
            }

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
