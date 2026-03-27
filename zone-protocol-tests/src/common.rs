use std::time::Duration;

use plantos_zone_protocol::Message;
use serialport::SerialPort;

pub struct Test {
    port: Box<dyn SerialPort>,
}

impl Test {
    pub fn new() -> Self {
        let port = serialport::new("/dev/ttyACM1", 115_200)
            .timeout(Duration::from_secs(1))
            .open()
            .expect("Failed to connect to /dev/ttyACM1");

        Self { port }
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
        let str = serde_json::to_string(msg).expect("Failed to serialize message");
        self.write(str.as_bytes());
        self.write("\n".as_bytes());
        self.flush();
    }

    pub fn expect_message(&mut self, expected: &Message) -> Message {
        let mut buf = [0u8; 256];
        let n = self
            .port
            .read(&mut buf)
            .expect("Failed to read from serial");
        let str = str::from_utf8(&buf[..n]).expect("Invalid UTF-8 received");
        let msg: Message = serde_json::from_str(str).expect("Failed to parse message");
        assert_eq!(
            *expected, msg,
            "Message mismatch: expected {:?}, got {:?}",
            expected, msg
        );
        msg
    }
}

pub fn with(callback: fn(Test) -> ()) {
    callback(Test::new())
}
