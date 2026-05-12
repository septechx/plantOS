use alloc::string::ToString;
use defmt::{error, info};
use embassy_net::tcp::TcpSocket;
use embassy_net::{IpListenEndpoint, Stack};
use embassy_time::{Duration, Timer};
use embedded_io_async::Write;
use plantos_lora_protocol::{LoRaId, PacketKind};

use crate::lora::signal_send;
use crate::router::{ContentType, Method, Request, Response, Router};

const PORT: u16 = 80;

fn parse_request(buf: &[u8]) -> Option<Request> {
    let text = str::from_utf8(buf).ok()?;
    let (head, body) = text.split_once("\r\n\r\n")?;

    let mut lines = head.lines();
    let request_line = lines.next()?;

    let mut parts = request_line.split_whitespace();
    let method = match parts.next()? {
        "GET" => Method::Get,
        "POST" => Method::Post,
        _ => return None,
    };

    let path = parts.next()?.to_string();

    let mut content_length = 0usize;
    for line in lines {
        if let Some(v) = line.strip_prefix("Content-Length:") {
            content_length = v.trim().parse().ok()?;
        } else if let Some(v) = line.strip_prefix("content-length:") {
            content_length = v.trim().parse().ok()?;
        }
    }

    let body_bytes = body.as_bytes();

    if body_bytes.len() < content_length {
        return None;
    }

    let body = str::from_utf8(&body_bytes[..content_length])
        .ok()?
        .to_string();

    Some(Request { method, path, body })
}

async fn read_http_request(socket: &mut TcpSocket<'_>) -> Option<Request> {
    let mut request_buf = [0u8; 2048];
    let mut request_len = 0usize;
    let mut read_buf = [0u8; 512];

    loop {
        let n = match socket.read(&mut read_buf).await {
            Ok(0) => return None,
            Ok(n) => n,
            Err(e) => {
                error!("read error = {}", e);
                return None;
            }
        };

        if request_len + n > request_buf.len() {
            error!("request too large");
            return None;
        }

        request_buf[request_len..request_len + n].copy_from_slice(&read_buf[..n]);
        request_len += n;

        if let Some(req) = parse_request(&request_buf[..request_len]) {
            return Some(req);
        }
    }
}

fn handle_home(_request: &Request) -> Response {
    Response::text(include_str!("index.html")).content_type(ContentType::Html)
}

fn handle_open(_request: &Request) -> Response {
    info!("recieved API request: open");
    signal_send(LoRaId::module(1), PacketKind::Open);
    Response::text("")
}

fn handle_close(_request: &Request) -> Response {
    info!("recieved API request: close");
    signal_send(LoRaId::module(1), PacketKind::Close);
    Response::text("")
}

#[embassy_executor::task]
pub async fn web_server(stack: Stack<'static>) {
    let router = Router::new([
        ("/", Method::Get, handle_home),
        ("/open", Method::Get, handle_open),
        ("/close", Method::Get, handle_close),
    ]);

    let mut rx_buf = [0u8; 2056];
    let mut tx_buf = [0u8; 2056];
    let mut socket = TcpSocket::new(stack, &mut rx_buf, &mut tx_buf);

    loop {
        info!("Waiting for connection...");

        if let Err(e) = socket
            .accept(IpListenEndpoint {
                addr: None,
                port: PORT,
            })
            .await
        {
            error!("accept error: {:?}", e);
            continue;
        }

        info!("Connected");

        let request = match read_http_request(&mut socket).await {
            Some(req) => req,
            None => {
                socket.close();
                Timer::after(Duration::from_millis(100)).await;
                socket.abort();
                continue;
            }
        };

        info!(
            "method={} path={} body={}",
            request.method,
            request.path.as_str(),
            request.body.as_str()
        );

        if let Err(e) = match router.route(&request) {
            Some(response) => socket.write_all(response.finalize().as_bytes()).await,
            None => socket
                .write_all(
                    b"HTTP/1.0 404 Not Found\r\nContent-Type: text/plain\r\n\r\n404 Not Found\r\n",
                )
                .await,
        } {
            error!("write error = {}", e);
        }

        if let Err(e) = socket.flush().await {
            error!("flush error = {}", e);
        }

        socket.close();
        Timer::after(Duration::from_millis(1000)).await;
        socket.abort();
    }
}
