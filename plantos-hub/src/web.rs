use defmt::{error, info};
use embassy_net::tcp::TcpSocket;
use embassy_net::{IpListenEndpoint, Stack};
use embassy_time::{Duration, Timer};
use embedded_io_async::Write;

const PORT: u16 = 80;

#[allow(clippy::large_stack_frames)]
#[embassy_executor::task]
pub async fn web_server(stack: Stack<'static>) {
    let mut rx_buf = [0u8; 2056];
    let mut tx_buf = [0u8; 2056];
    let mut socket = TcpSocket::new(stack, &mut rx_buf, &mut tx_buf);

    loop {
        info!("Wait for connection...");
        let r = socket
            .accept(IpListenEndpoint {
                addr: None,
                port: PORT,
            })
            .await;
        info!("Connected...");

        if let Err(e) = r {
            error!("connect error: {:?}", e);
            continue;
        }

        let mut buf = [0u8; 1024];
        let mut pos = 0;
        loop {
            match socket.read(&mut buf).await {
                Ok(0) => {
                    info!("Read EOF");
                    continue;
                }
                Ok(len) => {
                    let received = str::from_utf8(&buf[..(pos + len)]).expect("Invalid UTF8");

                    if received.contains("\r\n\r\n") {
                        info!("{}", received);
                        break;
                    }

                    pos += len;
                }
                Err(err) => {
                    error!("Read error = {}", err);
                    break;
                }
            }
        }

        if let Err(e) = socket
            .write_all(
                b"HTTP/1.0 200 OK\r\n\r\n\
            <html>\
                <body>\
                    <h1>Hello Rust! Hello esp-radio!</h1>\
                </body>\
            </html>\r\n\
            ",
            )
            .await
        {
            info!("write error = {}", e);
        }

        if let Err(e) = socket.flush().await {
            error!("flush error = {}", e);
        }

        socket.close();
        Timer::after(Duration::from_millis(1000)).await;

        socket.abort();
    }
}
