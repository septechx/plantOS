use defmt::{error, info};
use esp_hal::peripherals;
use esp_hal::uart::{Config, TxError, Uart, UartRx, UartTx};
use heapless::Vec;
use plantos_zone_protocol::{Message, MessageKind};
use static_cell::StaticCell;

use crate::get_zone_id;

const FRAME_DELIMITER: u8 = b'\n';
const MAX_FRAME_SIZE: usize = 200;
const RX_BUFFER_CAPACITY: usize = 200;

#[allow(clippy::large_stack_frames)]
#[embassy_executor::task]
pub async fn uart_listener(
    mut rx: UartRx<'static, esp_hal::Async>,
    mut tx: UartTx<'static, esp_hal::Async>,
) {
    let mut buf = [0u8; 32];
    static RX_BUF: StaticCell<Vec<u8, RX_BUFFER_CAPACITY>> = StaticCell::new();
    let rx_buf = RX_BUF.init_with(Vec::new);

    loop {
        match rx.read_async(&mut buf).await {
            Ok(n) if n > 0 => {
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
                    let mut frame: Vec<u8, MAX_FRAME_SIZE> = Vec::new();
                    frame
                        .extend_from_slice(&rx_buf[..pos])
                        .expect("Failed to read frame");
                    let remaining_len = rx_buf.len() - pos - 1;
                    rx_buf.copy_within(pos + 1.., 0);
                    rx_buf.truncate(remaining_len);

                    if !frame.is_empty() {
                        decode_message(&frame, &mut tx);
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

fn decode_message(msg: &[u8], tx: &mut UartTx<'static, esp_hal::Async>) {
    match serde_json::from_slice::<Message>(msg) {
        Ok(msg) => {
            if Some(msg.id) != get_zone_id() {
                return;
            }

            info!("Recieved message: `{}`", msg);

            match msg.kind {
                MessageKind::Open => {
                    // TODO
                }
                MessageKind::Close => {
                    // TODO
                }
                MessageKind::Ack => {
                    // Should never happen
                    error!("Ignoring unexpected ACK addressed to this zone");
                    return;
                }
            }

            if let Err(e) = send_ack(tx) {
                error!("Failed to send ACK: {}", e);
            }
        }
        Err(_) => {
            error!("Message decode error");
        }
    }
}

fn send_ack(tx: &mut UartTx<'static, esp_hal::Async>) -> Result<(), TxError> {
    tx.write(
        serde_json::to_string(&Message::ACK)
            .expect("Message::ACK serializes correctly")
            .as_bytes(),
    )?;
    tx.write("\n".as_bytes())?;
    tx.flush()?;

    Ok(())
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
