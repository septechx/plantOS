use serde::{Deserialize, Serialize};

/// Mod = 0; Zone = 1..256
#[derive(
    Debug, PartialEq, Eq, PartialOrd, Ord, Clone, Copy, Serialize, Deserialize, defmt::Format,
)]
pub struct ZoneID(u8);

#[derive(Debug, PartialEq, Eq, PartialOrd, Ord, Clone, Copy, Serialize, Deserialize)]
pub struct Message {
    pub id: ZoneID,
    pub kind: MessageKind,
}

#[derive(Debug, PartialEq, Eq, PartialOrd, Ord, Clone, Copy, Serialize, Deserialize)]
pub enum MessageKind {
    /// Mod -> Zone
    Open,
    /// Mod -> Zone
    Close,
    /// Zone -> Mod
    Ack,
}
