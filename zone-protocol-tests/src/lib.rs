#![cfg(test)]

use common::with;
use plantos_zone_protocol::{Message, MessageKind, ZoneId};

mod common;

const ZONE_ID: ZoneId = ZoneId::zone(1);

#[test]
fn receives_open() {
    with(ZONE_ID, |mut t| {
        t.send_message(MessageKind::Open);
        t.expect_message(&Message::ACK);
    });
}

#[test]
fn receives_close() {
    with(ZONE_ID, |mut t| {
        t.send_message(MessageKind::Close);
        t.expect_message(&Message::ACK);
    });
}
