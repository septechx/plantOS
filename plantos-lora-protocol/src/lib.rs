#![no_std]

use defmt::Format;
use serde::{Deserialize, Serialize};

#[derive(
    Debug, PartialEq, Eq, PartialOrd, Ord, Clone, Copy, Serialize, Deserialize, Format, Hash,
)]
pub struct LoRaId(u8);

impl LoRaId {
    pub const HUB: LoRaId = LoRaId(0);

    #[inline]
    pub const fn module(id: u8) -> Self {
        if id == 0 {
            panic!("Cannot create module lora id equal to zero");
        } else {
            Self(id)
        }
    }
}

#[derive(Debug, PartialEq, Eq, PartialOrd, Ord, Clone, Copy, Serialize, Deserialize, Format)]
pub struct Packet {
    pub from: LoRaId,
    pub to: LoRaId,
    pub kind: PacketKind,
}

#[derive(Debug, PartialEq, Eq, PartialOrd, Ord, Clone, Copy, Serialize, Deserialize, Format)]
pub enum PacketKind {
    Open,
    Close,
}
