use std::time::Duration;

use plantos_zone_protocol::Message;
use serialport::SerialPort;

const MAX_FRAME_SIZE: usize = 1024 * 64;
const MAX_EMPTY_READS: u32 = 10;

pub struct Test {
    port: Box<dyn SerialPort>,
    pending: Vec<u8>,
}

impl Test {
    pub fn new() -> Self {
        let port_name =
            std::env::var("PLANTOS_ZONE_SERIAL_PORT").unwrap_or("/dev/ttyACM1".to_string());
        let port = serialport::new(&port_name, 115_200)
            .timeout(Duration::from_secs(1))
            .open()
            .expect("Failed to connect to configured serial port (defaults to /dev/ttyACM1 unless PLANTOS_ZONE_SERIAL_PORT is provided)");

        Self {
            port,
            pending: Vec::new(),
        }
    }

    pub fn write(&mut self, bytes: &[u8]) {
        self.port
            .write_all(bytes)
            .expect("Failed to write to serial");
    }

    pub fn flush(&mut self) {
        self.port.flush().expect("Failed to flush serial");
    }

    pub fn send_message(&mut self, msg: &Message) {
        let msg = serde_json::to_string(msg).expect("Failed to serialize message");
        self.write(msg.as_bytes());
        self.write("\n".as_bytes());
        self.flush();
    }

    pub fn expect_message(&mut self, expected: &Message) -> Message {
        let mut buf = [0u8; 256];
        let mut acc = if self.pending.is_empty() {
            Vec::new()
        } else {
            std::mem::take(&mut self.pending)
        };
        let mut empty_reads = 0;

        loop {
            let n = self
                .port
                .read(&mut buf)
                .expect("Failed to read from serial");

            if n == 0 {
                empty_reads += 1;
                assert!(
                    empty_reads < MAX_EMPTY_READS,
                    "Timed out waiting for response after {} empty reads",
                    empty_reads
                );
                continue;
            }
            empty_reads = 0;

            if let Some(pos) = buf[..n].iter().position(|&b| b == b'\n') {
                assert!(
                    acc.len() + pos <= MAX_FRAME_SIZE,
                    "Frame too large: {} bytes (max {})",
                    acc.len() + pos,
                    MAX_FRAME_SIZE
                );
                acc.extend_from_slice(&buf[..pos]);
                self.pending.extend_from_slice(&buf[pos + 1..n]);
                break;
            }

            assert!(
                acc.len() + n <= MAX_FRAME_SIZE,
                "Frame too large: {} bytes (max {})",
                acc.len() + n,
                MAX_FRAME_SIZE
            );

            acc.extend_from_slice(&buf[..n]);
        }
        let str = str::from_utf8(&acc).expect("Invalid UTF-8 received");
        let msg: Message = serde_json::from_str(str).expect("Failed to parse message");
        assert_eq!(
            *expected, msg,
            "Message mismatch: expected {:?}, got {:?}",
            expected, msg
        );
        msg
    }
}

pub fn with<F: FnOnce(Test)>(callback: F) {
    callback(Test::new())
}
