#![no_std]

use core::fmt::Display;

use defmt::Format;
use serde::{Deserialize, Serialize};

/// Mod = 0; Zone = 1..255
#[derive(
    Debug, PartialEq, Eq, PartialOrd, Ord, Clone, Copy, Serialize, Deserialize, Format, Hash,
)]
pub struct ZoneId(u8);

impl Display for ZoneId {
    fn fmt(&self, f: &mut core::fmt::Formatter<'_>) -> core::fmt::Result {
        write!(f, "{}", self.0)
    }
}

impl ZoneId {
    /// Used for messages sent to the module or broadcasts from the module
    pub const MODULE: Self = Self(0);

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

impl Message {
    pub const ACK: Self = Self {
        id: ZoneId::MODULE,
        kind: MessageKind::Ack,
    };

    #[inline]
    pub fn to_mod(kind: MessageKind) -> Message {
        Message {
            id: ZoneId::MODULE,
            kind,
        }
    }
}

#[derive(Debug, PartialEq, Eq, PartialOrd, Ord, Clone, Copy, Serialize, Deserialize, Format)]
pub enum MessageKind {
    /// Mod -> Zone
    Open,
    /// Mod -> Zone
    Close,
    /// Zone -> Mod
    Ack,

    /// Mod -> Zone
    Discover,
    /// Zone -> Mod
    Announce { id: ZoneId },
}
