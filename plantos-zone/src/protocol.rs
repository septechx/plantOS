use defmt::Format;
use serde::{Deserialize, Serialize};

/// Mod = 0; Zone = 1..255
#[derive(Debug, PartialEq, Eq, PartialOrd, Ord, Clone, Copy, Serialize, Deserialize, Format)]
pub struct ZoneId(u8);

impl ZoneId {
    const MODULE: Self = Self(0);

    pub fn zone(id: u8) -> Self {
        if id == 0 {
            // It is better to let the zone panic rather than sending invalid messages
            panic!("Cannot create zone id equal to zero");
        } else {
            Self(id)
        }
    }
}

#[derive(Debug, PartialEq, Eq, PartialOrd, Ord, Clone, Copy, Serialize, Deserialize, Format)]
pub struct Message {
    pub id: ZoneId,
    pub kind: MessageKind,
}

#[derive(Debug, PartialEq, Eq, PartialOrd, Ord, Clone, Copy, Serialize, Deserialize, Format)]
pub enum MessageKind {
    /// Mod -> Zone
    Open,
    /// Mod -> Zone
    Close,
    /// Zone -> Mod
    Ack,
}
