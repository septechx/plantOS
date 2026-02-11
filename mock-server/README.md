# PlantOS Mock Server

A fully-featured mock server for the PlantOS Admin Protocol v1.0. This server implements the complete protocol specification including encryption, all message types, broadcasts, and error handling.

## Features

- **Complete Protocol Implementation**: All message types from the PlantOS Admin Protocol v1.0
- **AES-256-GCM Encryption**: Message-level encryption with HKDF-SHA256 key derivation as per spec
- **Session Management**: Per-client session tracking with unique session IDs
- **Declarative Mock Data**: Easy-to-use API for defining zones, modules, and statistics
- **Broadcast System**: Automatic zone, module, and statistics updates to all connected clients
- **Comprehensive Error Handling**: All error codes from the protocol specification
- **Type Safety**: Full TypeScript support with generated protobuf types

## Quick Start

### Basic Usage

```typescript
import { createDefaultMockServer } from "./server";

// Create and start server with default mock data
const server = createDefaultMockServer({
  port: 8080,
  hubId: "mock-hub-001",
  hubVersion: "1.0.0",
});

server.start();
```

### Custom Mock Data

```typescript
import { PlantOSMockServer, Status } from "./server";

const server = new PlantOSMockServer({
  port: 8080,
});

// Define zones declaratively
server.defineZones([
  {
    id: 1,
    name: "Monstera Deliciosa",
    icon: "🌿",
    moduleId: 1,
    status: Status.STATUS_IDLE,
    statistics: {
      temperature: { min: 18, max: 28, current: 22, variance: 0.5 },
      humidity: { min: 20, max: 85, current: 45, variance: 3 },
      light: { min: 200, max: 2500, current: 1200, variance: 100 },
    },
    lastWatered: Date.now() - 2 * 24 * 60 * 60 * 1000, // 2 days ago
  },
  {
    id: 2,
    name: "Fiddle Leaf Fig",
    icon: "🌿",
    moduleId: 1,
    status: Status.STATUS_WORKING,
    statistics: {
      temperature: { min: 18, max: 28, current: 23, variance: 0.5 },
      humidity: { min: 20, max: 85, current: 55, variance: 3 },
      light: { min: 200, max: 2500, current: 800, variance: 100 },
    },
  },
]);

// Define modules
server.defineModules([
  {
    id: 1,
    name: "Main Module",
    status: Status.STATUS_IDLE,
    batteryLevel: 85,
    zoneIds: [1, 2],
  },
]);

server.start();
```

## Configuration Options

```typescript
interface MockServerConfig {
  port: number; // WebSocket server port (default: 8080)
  encryptionKey: Buffer; // 32-byte encryption key (auto-generated if not provided)
  hubId: string; // Hub identifier (default: "mock-hub-001")
  hubVersion: string; // Hub version string (default: "1.0.0-mock")
  broadcastIntervalMs: number; // Statistics broadcast interval (default: 5000ms)
  enableEncryption: boolean; // Enable message encryption (default: true)
}
```

## Architecture

### Encryption Flow

1. **Session Establishment**: Client connects, server creates session with unique 16-byte session ID
2. **Key Derivation**: Session key derived using HKDF-SHA256:
   ```
   derived_key = HKDF-SHA256(
       ikm: encryption_key,
       salt: session_id,
       info: "plantos-v1-message-key",
       length: 32
   )
   ```
3. **Handshake**: Client sends unencrypted `Hello`, server responds with unencrypted `Welcome` (containing session_id)
4. **Encrypted Communication**: All subsequent messages encrypted with AES-256-GCM using derived key

### Message Format (Encrypted)

```
4 bytes:  Message type (uint32, little-endian)
12 bytes: GCM nonce (random per message)
N bytes:  Ciphertext (encrypted protobuf payload)
16 bytes: GCM authentication tag
```

## Implemented Message Handlers

| Message Type                   | Description               | Status         |
| ------------------------------ | ------------------------- | -------------- |
| `Hello` / `Welcome`            | Handshake                 | ✅ Implemented |
| `ListZones`                    | List all zones            | ✅ Implemented |
| `GetZone`                      | Get zone details          | ✅ Implemented |
| `ListModules`                  | List all modules          | ✅ Implemented |
| `GetModule`                    | Get module details        | ✅ Implemented |
| `GetStatistics`                | Get historical statistics | ✅ Implemented |
| `GetZoneSettings`              | Get zone settings         | ✅ Implemented |
| `UpdateZoneSettings`           | Update zone settings      | ✅ Implemented |
| `ZoneUpdate` (broadcast)       | Zone state changes        | ✅ Implemented |
| `ModuleUpdate` (broadcast)     | Module state changes      | ✅ Implemented |
| `StatisticsUpdate` (broadcast) | New sensor readings       | ✅ Implemented |
| `ErrorResponse`                | Error responses           | ✅ Implemented |

## Error Codes

All error codes from the protocol specification are supported:

- `ERROR_CODE_INVALID_REQUEST`
- `ERROR_CODE_ZONE_NOT_FOUND`
- `ERROR_CODE_MODULE_NOT_FOUND`
- `ERROR_CODE_MODULE_OFFLINE`
- `ERROR_CODE_INTERNAL_ERROR`
- `ERROR_CODE_INVALID_TIME_RANGE`
- `ERROR_CODE_VERSION_MISMATCH`

## Environment Variables

| Variable             | Description              | Default      |
| -------------------- | ------------------------ | ------------ |
| `PORT`               | Server port              | 8080         |
| `HUB_ID`             | Hub identifier           | mock-hub-001 |
| `HUB_VERSION`        | Hub version              | 1.0.0-mock   |
| `BROADCAST_INTERVAL` | Broadcast interval in ms | 5000         |

## Running the Server

```bash
# Development mode with hot reload
cd mock-server
pnpm dev

# Or with custom port
PORT=9000 pnpm dev

# Type checking
pnpm typecheck
```

## Protocol Compliance

This mock server implements the complete PlantOS Admin Protocol v1.0 specification:

- ✅ WebSocket transport on `/v1/admin` path
- ✅ `plantos-protobuf` subprotocol
- ✅ Binary protobuf message framing (4-byte type prefix)
- ✅ Unencrypted handshake (Hello/Welcome)
- ✅ Encrypted post-handshake communication
- ✅ HKDF-SHA256 key derivation with session_id salt
- ✅ AES-256-GCM encryption with 12-byte random nonce
- ✅ All request/response message pairs
- ✅ Broadcast messages (ZoneUpdate, ModuleUpdate, StatisticsUpdate)
- ✅ Complete error code support

## Testing

The server includes default mock data that can be used for testing:

- 5 zones
- 3 modules with different battery levels
- Realistic statistics with automatic variation
- Pre-configured zone settings with thresholds

Connect with any WebSocket client that implements the PlantOS protocol to test.
