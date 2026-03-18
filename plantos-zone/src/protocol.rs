use defmt::Format;
use serde::{Deserialize, Serialize};

/// Mod = 0; Zone = 1..256
#[derive(Debug, PartialEq, Eq, PartialOrd, Ord, Clone, Copy, Serialize, Deserialize, Format)]
pub struct ZoneID(u8);

impl ZoneID {
    pub const fn module() -> Self {
        Self(0)
    }
}

#[derive(Debug, PartialEq, Eq, PartialOrd, Ord, Clone, Copy, Serialize, Deserialize, Format)]
pub struct Message {
    pub id: ZoneID,
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
