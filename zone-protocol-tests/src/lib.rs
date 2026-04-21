#![cfg(test)]

use common::with;
use plantos_zone_protocol::{Message, MessageKind, ZoneId};

mod common;

#[test]
fn receives_open() {
    with(|mut t| {
        t.send_message(&Message {
            id: ZoneId::zone(1),
            kind: MessageKind::Open,
        });

        t.expect_message(&Message::ACK);
    });
}

#[test]
fn receives_close() {
    with(|mut t| {
        t.send_message(&Message {
            id: ZoneId::zone(1),
            kind: MessageKind::Close,
        });

        t.expect_message(&Message::ACK);
    });
}
