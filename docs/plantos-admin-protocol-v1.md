# PlantOS Admin Protocol

**Version**: 1.0.1
**Date**: 2026-02-13

## 1. Overview

The PlantOS Admin Protocol enables communication between the PlantOS client application and the PlantOS hub (central controller). The protocol supports real-time monitoring of plant zones, module management, and control operations.

### 1.1 Design Principles

- **Real-time Updates**: Server-push updates for immediate status changes
- **Type Safety**: Protocol Buffers for strongly typed message definitions
- **Security**: TLS encryption for all communication
- **Simplicity**: Simple request/response pattern with streaming updates
- **Efficiency**: Binary protobuf encoding for minimal bandwidth

### 1.2 Security Model

- All communication is encrypted using TLS
- Clients receive a pre-shared encryption key via QR code during initial setup
- No additional authentication tokens required (security handled by TLS + pre-shared key)
- QR code contains: `hub_id`, `encryption_key`, `hub_address`

### 1.3 Encryption Key Specification

The `encryption_key` is a symmetric message-level encryption key used to provide end-to-end encryption layered on top of TLS. This ensures confidentiality even if the TLS connection is compromised.

#### 1.3.1 Role and Purpose

The `encryption_key` serves as:

- **Application-layer encryption key**: Protects message payloads after TLS encryption
- **Defense in depth**: Provides confidentiality if TLS is compromised (e.g., compromised CA, MITM with stolen certs)
- **Mutual authentication**: Both parties must possess the same key to communicate

**Important**: This is NOT a TLS-PSK identity or secret. Standard TLS certificates are used for transport security; the `encryption_key` is used for message-level encryption within the application protocol.

#### 1.3.2 Format and Generation

- **Length**: 32 bytes (256 bits)
- **Encoding**: Base64 URL-safe encoding (RFC 4648, no padding)
- **Generation**: Cryptographically secure random (CSPRNG)
- **Example**: `dBjftJeZ4CVP-mB92K27uhbUJU1p1r_wW1gFWFOEjXk`

#### 1.3.3 Key Derivation and Usage

All encrypted messages use **AES-256-GCM** with authenticated encryption. The encryption flow:

```text
encryption_key (32 bytes)
    |
    v
HKDF-SHA256 (salt=session_id, info="plantos-v1-message-key")
    |
    v
Derived Key (32 bytes) + Nonce (12 bytes)
    |
    v
AES-256-GCM(plaintext) -> ciphertext + auth_tag (16 bytes)
```

**Message Encryption Format**:

- 4 bytes: Message type identifier (uint32) - unencrypted header
- 12 bytes: Nonce (random per message) - sent in clear
- N bytes: Ciphertext (encrypted protobuf payload)
- 16 bytes: GCM authentication tag

**Per-Session Key Derivation**:
After the `Hello`/`Welcome` handshake establishes a unique `session_id`:

```text
derived_key = HKDF-SHA256(
    ikm: encryption_key,
    salt: session_id,
    info: "plantos-v1-message-key",
    length: 32
)
```

This ensures:

- Different session = different derived key (session key isolation)
- Compromised session cannot decrypt other sessions
- Replay protection via unique session IDs

#### 1.3.4 Algorithms and Parameters

| Component         | Algorithm   | Parameters                                        |
| ----------------- | ----------- | ------------------------------------------------- |
| Key Derivation    | HKDF-SHA256 | Salt=session_id, info="plantos-v1-message-key"    |
| Encryption        | AES-256-GCM | Key=32 bytes, Nonce=12 bytes random, Tag=16 bytes |
| Random Generation | CSPRNG      | `/dev/urandom` or platform equivalent             |

**Security Requirements**:

- GCM nonces MUST be unique per message within a session (use CSPRNG, 96-bit random). The 96-bit nonce MUST be random and used as the GCM nonce; the 32-bit monotonic counter is only a local message-count limit to trigger session rotation and MUST NOT be substituted for the nonce.
- Maximum messages per session: 2^32 (to avoid nonce reuse risk)
  - **Enforcement**: Both sender and receiver maintain a per-session monotonic 32-bit counter, incremented on each encrypted/decrypted message. Before encrypting or decrypting, the counter MUST be checked; if it has reached 2^32, the session MUST be terminated immediately (close connection and initiate session rotation). This enforcement is local to each endpoint—no cross-node coordination is required. The 96-bit nonce requirement (above) provides defense-in-depth, but the counter limit is the primary safeguard against nonce collision due to counter overflow.
- Session ID must be unique and unpredictable (128-bit minimum entropy)

#### 1.3.5 Storage, Lifetime, and Rotation

**Client Storage**:

- Store in platform secure storage (iOS Keychain, Android Keystore, Windows DPAPI, macOS Keychain)
- Never write to unencrypted persistent storage
- Clear from memory when app backgrounded (if possible)

**Hub Storage**:

- Store in encrypted database or HSM (Hardware Security Module) if available

#### 1.3.6 QR Code Payload Format

The QR code contains a JSON object with four required fields:

```json
{
  "v": 1,
  "hub_id": "hub-abc123",
  "hub_address": "wss://192.168.1.100:443/v1/admin",
  "key": "dBjftJeZ4CVP-mB92K27uhbUJU1p1r_wW1gFWFOEjXk"
}
```

**Field Definitions**:

| Field         | Type    | Description                                    |
| ------------- | ------- | ---------------------------------------------- |
| `v`           | integer | Payload format version (current: 1)            |
| `hub_id`      | string  | Unique hub identifier (alphanumeric + hyphens) |
| `hub_address` | string  | WebSocket URL (wss:// or ws:// for local)      |
| `key`         | string  | Base64 URL-safe encoded 32-byte encryption key |

**Encoding**:

- JSON minified (no whitespace)
- UTF-8 encoded
- QR Code: Model 2, Error Correction Level M (15% redundancy)
- Maximum payload: ~2,953 bytes (QR Code version 40) - typically under 200 bytes

#### 1.3.7 Example Usage Scenarios

**Scenario 1: Client Connects to Hub**

```javascript
// 1. Scan QR code
const qrPayload = JSON.parse(qrCodeData);
// { v: 1, hub_id: "hub-abc123", hub_address: "wss://192.168.1.100:443/v1/admin", key: "..." }

// 2. Establish WebSocket with required subprotocol
const ws = new WebSocket(qrPayload.hub_address, "plantos-protobuf");

// 3. On connection, send Hello (unencrypted - no session yet)
ws.send(
  encodeMessage(
    MSG_HELLO,
    Hello.encode({ protocolVersion: "1.0", clientVersion: "1.0.0" }),
  ),
);

// 4. Receive Welcome with session_id
const { sessionId } = Welcome.decode(payload);

// 5. Derive session key
derivedKey = hkdfSha256(
  base64UrlDecode(qrPayload.key),
  sessionId, // 16 bytes from Welcome
  "plantos-v1-message-key",
  32,
);

// 6. All subsequent messages encrypted
function sendEncrypted(msgType, protobufMsg) {
  const plaintext = protobufMsg.finish();
  const nonce = crypto.getRandomValues(new Uint8Array(12));
  const { ciphertext, tag } = aesGcmEncrypt(derivedKey, nonce, plaintext);
  return encodeEncryptedMessage(msgType, nonce, ciphertext, tag);
}

// 7. Decrypt incoming messages
function decryptMessage(data) {
  const { msgType, nonce, ciphertext, tag } = parseEncryptedMessage(data);
  return aesGcmDecrypt(derivedKey, nonce, ciphertext, tag);
}
```

**Scenario 2: Hub Handles Encrypted Messages**

```python
# 1. Client connects, send Welcome with unique session_id
session_id = secrets.token_bytes(16)  # 128-bit random
ws.send(encode_message(MSG_WELCOME, Welcome(session_id=session_id)))

# 2. Look up encryption_key for this hub_id
encryption_key = get_key_for_hub(hub_id)  # From secure storage

# 3. Derive session key
derived_key = hkdf_sha256(
    ikm=encryption_key,
    salt=session_id,
    info=b"plantos-v1-message-key",
    length=32
)

# 4. Store in session context
sessions[session_id] = { "derived_key": derived_key, ... }

# 5. Decrypt incoming messages
def on_message(data):
    msg_type, nonce, ciphertext, tag = parse_message(data)
    plaintext = aes_gcm_decrypt(derived_key, nonce, ciphertext, tag)
    protobuf_msg = decode_protobuf(msg_type, plaintext)
    handle_message(protobuf_msg)

# 6. Encrypt outgoing broadcasts (same key for all clients of this hub)
def broadcast(zone_update):
    for session in sessions.values():
        nonce = os.urandom(12)
        ciphertext, tag = aes_gcm_encrypt(
            session["derived_key"], nonce, zone_update.serialize()
        )
        session.ws.send(encode_encrypted(MSG_ZONE_UPDATE, nonce, ciphertext, tag))
```

**Scenario 3: Interoperability Checklist**

When implementing the QR payload:

- [ ] Generate 32 random bytes using CSPRNG
- [ ] Encode using Base64 URL-safe alphabet (RFC 4648 section 5)
- [ ] Omit Base64 padding characters (=)
- [ ] Validate decoded key is exactly 32 bytes
- [ ] Use HKDF-SHA256 with session_id as salt
- [ ] Use AES-256-GCM with 12-byte random nonce per message
- [ ] Verify GCM authentication tag before decrypting
- [ ] Reject messages with reused nonces within same session
- [ ] Support graceful key rotation with overlap period

## 2. Transport Layer

### 2.1 WebSocket Connection

- **Protocol**: WebSocket Secure (WSS) over TLS
- **Default Port**: 443 (or custom port if specified)
- **Path**: `/v1/admin`
- **Subprotocol**: `plantos-protobuf` (required)

The `plantos-protobuf` subprotocol MUST be specified during the WebSocket handshake. The server will reject connections that don't request this subprotocol.

### 2.2 Message Framing

The protocol uses two framing formats depending on the connection state:

**1. Unencrypted Framing** (Handshake phase):

- **4 bytes**: Message type identifier (uint32, little-endian)
- **N bytes**: Protobuf serialized message payload

This framing applies ONLY to `Hello` and `Welcome`/`Error` messages during the initial handshake.

**2. Encrypted Framing** (Post-handshake phase):

- Follows the structure defined in [Section 1.3.3 (Key Derivation and Usage)](#133-key-derivation-and-usage).
- **4 bytes**: Message type identifier (uint32, little-endian)
- **12 bytes**: GCM nonce
- **N bytes**: Ciphertext (Protobuf payload)
- **16 bytes**: GCM tag

**Transition**: All messages after the `Welcome` message MUST use the encrypted framing. Encoders and decoders MUST switch parsing rules immediately after successfully processing the `Welcome` message.

> **Note**: The uint32 message type is always encoded in little-endian byte order. See Appendix B for the canonical TypeScript implementation using `setUint32(0, type, true)`.

### 2.3 Connection Lifecycle

1. Client establishes WSS connection to hub with subprotocol `plantos-protobuf`
2. Client sends unencrypted `Hello` message with protocol version
3. Hub responds with unencrypted `Welcome` (success) or `ErrorResponse` (version mismatch)
4. After receiving `Welcome`, **all subsequent messages MUST be encrypted** using the derived session key
5. Bidirectional encrypted communication begins
6. Either party may close connection

**Important**: The transition from unencrypted to encrypted happens immediately after the `Welcome` message is received. The `Welcome` message itself is unencrypted, but contains the `session_id` needed to derive the encryption key for all following messages.

## 3. Data Model

### 3.1 Protocol Buffer Definitions

```protobuf
syntax = "proto3";

package plantos.admin.v1;

import "google/protobuf/timestamp.proto";
import "google/protobuf/duration.proto";

// Enums

enum Status {
  STATUS_UNSPECIFIED = 0;
  STATUS_IDLE = 1;
  STATUS_WORKING = 2;
  STATUS_PAUSED = 3;
  STATUS_ERROR = 4;
  STATUS_OFFLINE = 5;
}

enum StatisticType {
  STATISTIC_TYPE_UNSPECIFIED = 0;
  STATISTIC_TYPE_TEMPERATURE = 1;
  STATISTIC_TYPE_HUMIDITY = 2;
  STATISTIC_TYPE_LIGHT = 3;
  STATISTIC_TYPE_SOIL_MOISTURE = 4;
  STATISTIC_TYPE_BATTERY = 5;
}

enum ErrorCode {
  ERROR_CODE_UNSPECIFIED = 0;
  ERROR_CODE_INVALID_REQUEST = 1;
  ERROR_CODE_ZONE_NOT_FOUND = 2;
  ERROR_CODE_MODULE_NOT_FOUND = 3;
  ERROR_CODE_MODULE_OFFLINE = 4;
  ERROR_CODE_INTERNAL_ERROR = 5;
  ERROR_CODE_INVALID_TIME_RANGE = 6;
  ERROR_CODE_VERSION_MISMATCH = 7;
}

// Data Structures

message StatisticDataPoint {
  google.protobuf.Timestamp timestamp = 1;
  float value = 2;
}

message Statistic {
  StatisticType type = 1;
  repeated StatisticDataPoint history = 2;
}

message Zone {
  int32 id = 1;  // 1-based identifier (zone ID 0 is reserved/invalid)
  int32 module_id = 2;  // ID of the controlling module
  string name = 3;
  string icon = 4;  // Unicode emoji or icon identifier
  Status status = 5;
  google.protobuf.Timestamp last_watered = 6;

  // Current values only (not full history)
  repeated Statistic current_statistics = 7;
}

message Module {
  int32 id = 1;
  string name = 2;
  Status status = 3;

  // Battery percentage 0-100
  float battery_level = 4;

  // IDs of zones controlled by this module
  repeated int32 zone_ids = 5;

  // Last time module was seen
  google.protobuf.Timestamp last_seen = 6;
}

message ZoneSettings {
  int32 zone_id = 1;

  // Thresholds for alerts
  message Thresholds {
    float min_temperature = 1;  // Celsius
    float max_temperature = 2;  // Celsius
    float min_soil_moisture = 3;  // Percentage
    float max_soil_moisture = 4;  // Percentage
  }

  Thresholds thresholds = 2;

  // Notification settings
  bool notify_on_error = 3;
  bool notify_on_low_battery = 4;
}

// Request/Response Messages

// Client -> Hub: Initial handshake
message Hello {
  string protocol_version = 1;  // "1.0"
  string client_version = 2;    // Client app version
}

// Hub -> Client: Handshake response
message Welcome {
  string hub_id = 1;
  string hub_version = 2;
  google.protobuf.Timestamp server_timestamp = 3;  // Server time for sync
  bytes session_id = 4;  // 16 bytes (128-bit) random session ID for encryption
}

// Client -> Hub: Request to list all modules
message ListModulesRequest {
  // Empty - returns all modules
}

// Hub -> Client: Module list response
message ListModulesResponse {
  repeated Module modules = 1;
}

// Client -> Hub: Request module details
message GetModuleRequest {
  int32 module_id = 1;
}

// Hub -> Client: Module details
message GetModuleResponse {
  Module module = 1;
}

// Client -> Hub: List all zones
message ListZonesRequest {
  // Optional filter by module
  optional int32 module_id = 1;
}

// Hub -> Client: Zone list response
message ListZonesResponse {
  repeated Zone zones = 1;
}

// Client -> Hub: Request zone details
message GetZoneRequest {
  int32 zone_id = 1;
}

// Hub -> Client: Zone details
message GetZoneResponse {
  Zone zone = 1;
}

// Client -> Hub: Get historical statistics
message GetStatisticsRequest {
  int32 zone_id = 1;

  // Time range (required)
  google.protobuf.Timestamp from = 2;
  google.protobuf.Timestamp to = 3;

  // Optional: specific statistic types (empty = all)
  repeated StatisticType types = 4;

  // Optional: data point aggregation
  enum Aggregation {
    AGGREGATION_NONE = 0;      // Raw data points
    AGGREGATION_HOURLY = 1;    // Hourly averages
    AGGREGATION_DAILY = 2;     // Daily averages
    AGGREGATION_WEEKLY = 3;    // Weekly averages
  }
  Aggregation aggregation = 5;
}

// Hub -> Client: Statistics response
message GetStatisticsResponse {
  int32 zone_id = 1;
  repeated Statistic statistics = 2;
}

// Settings management

message GetZoneSettingsRequest {
  int32 zone_id = 1;
}

message GetZoneSettingsResponse {
  ZoneSettings settings = 1;
}

message UpdateZoneSettingsRequest {
  ZoneSettings settings = 1;
}

message UpdateZoneSettingsResponse {
  bool success = 1;
  ZoneSettings updated_settings = 2;
}

// Hub -> Client: Server-push updates (broadcasts)

message ZoneUpdate {
  int32 zone_id = 1;
  Zone zone = 2;

  // What changed
  enum ChangeType {
    CHANGE_TYPE_UNSPECIFIED = 0;
    CHANGE_TYPE_STATUS = 1;
    CHANGE_TYPE_STATISTICS = 2;
    CHANGE_TYPE_SETTINGS = 3;
  }
  ChangeType change_type = 3;
  google.protobuf.Timestamp timestamp = 4;
}

message ModuleUpdate {
  int32 module_id = 1;
  Module module = 2;

  enum ChangeType {
    CHANGE_TYPE_UNSPECIFIED = 0;
    CHANGE_TYPE_STATUS = 1;
    CHANGE_TYPE_BATTERY = 2;
    CHANGE_TYPE_ZONES = 3;
    CHANGE_TYPE_CONNECTED = 4;
    CHANGE_TYPE_DISCONNECTED = 5;
  }
  ChangeType change_type = 3;
  google.protobuf.Timestamp timestamp = 4;
}

message StatisticsUpdate {
  int32 zone_id = 1;
  repeated Statistic updated_statistics = 2;
  google.protobuf.Timestamp timestamp = 3;
}

// Error response

message ErrorResponse {
  ErrorCode code = 1;
  string message = 2;

  // Optional: request that caused the error
  MessageType request_type = 3;
}

// Message type identifiers (4-byte prefix)
// Used for message routing

enum MessageType {
  MESSAGE_TYPE_UNSPECIFIED = 0;

  // Client -> Hub
  MSG_HELLO = 1;
  MSG_LIST_MODULES_REQUEST = 2;
  MSG_GET_MODULE_REQUEST = 3;
  MSG_LIST_ZONES_REQUEST = 4;
  MSG_GET_ZONE_REQUEST = 5;
  MSG_GET_STATISTICS_REQUEST = 6;
  MSG_GET_ZONE_SETTINGS_REQUEST = 7;
  MSG_UPDATE_ZONE_SETTINGS_REQUEST = 8;

  // Hub -> Client
  MSG_WELCOME = 1001;
  MSG_LIST_MODULES_RESPONSE = 1002;
  MSG_GET_MODULE_RESPONSE = 1003;
  MSG_LIST_ZONES_RESPONSE = 1004;
  MSG_GET_ZONE_RESPONSE = 1005;
  MSG_GET_STATISTICS_RESPONSE = 1006;
  MSG_GET_ZONE_SETTINGS_RESPONSE = 1007;
  MSG_UPDATE_ZONE_SETTINGS_RESPONSE = 1008;

  // Broadcasts
  MSG_ZONE_UPDATE = 2001;
  MSG_MODULE_UPDATE = 2002;
  MSG_STATISTICS_UPDATE = 2003;

  // Errors
  MSG_ERROR_RESPONSE = 3001;
}
```

## 4. API Reference

### 4.1 Connection Management

#### Hello / Welcome

**Direction**: Client → Hub / Hub → Client
**Purpose**: Protocol version negotiation and connection establishment

**Flow**:

1. Client connects via WSS
2. Client sends `Hello` with protocol version
3. Hub responds with `Welcome` (success) or `ErrorResponse` (version mismatch)

### 4.2 Module Operations

#### List Modules

**Direction**: Client → Hub
**Request**: `ListModulesRequest`
**Response**: `ListModulesResponse`

Retrieves all connected modules and their current status.

#### Get Module

**Direction**: Client → Hub
**Request**: `GetModuleRequest` (module_id)
**Response**: `GetModuleResponse` or `ErrorResponse` (ERROR_CODE_MODULE_NOT_FOUND)

Retrieves detailed information about a specific module.

### 4.3 Zone Operations

#### List Zones

**Direction**: Client → Hub
**Request**: `ListZonesRequest` (optional module_id filter)
**Response**: `ListZonesResponse`

Retrieves all zones, optionally filtered by controlling module.

#### Get Zone

**Direction**: Client → Hub
**Request**: `GetZoneRequest` (zone_id)
**Response**: `GetZoneResponse` or `ErrorResponse` (ERROR_CODE_ZONE_NOT_FOUND)

Retrieves detailed information about a specific zone including current statistics.

### 4.4 Statistics Operations

#### Get Statistics

**Direction**: Client → Hub
**Request**: `GetStatisticsRequest`
**Response**: `GetStatisticsResponse` or `ErrorResponse`

Retrieves historical statistics for a zone within a specified time range.

**Parameters**:

- `from`, `to`: Required time range
- `types`: Optional filter for specific statistic types
- `aggregation`: Optional data aggregation level

### 4.5 Settings Operations

#### Get Zone Settings

**Direction**: Client → Hub
**Request**: `GetZoneSettingsRequest` (zone_id)
**Response**: `GetZoneSettingsResponse` or `ErrorResponse`

Retrieves thresholds, and notification settings.

#### Update Zone Settings

**Direction**: Client → Hub
**Request**: `UpdateZoneSettingsRequest` (ZoneSettings)
**Response**: `UpdateZoneSettingsResponse` or `ErrorResponse`

Updates zone configuration.

### 4.7 Server-Push Updates (Broadcasts)

The hub broadcasts updates to all connected clients when state changes occur.

#### Zone Update

**Direction**: Hub → Client (broadcast)
**Message**: `ZoneUpdate`

Sent when:

- Zone status changes (Idle → Working, etc.)
- Zone settings change
- Current statistics update

#### Module Update

**Direction**: Hub → Client (broadcast)
**Message**: `ModuleUpdate`

Sent when:

- Module connects/disconnects
- Battery level changes significantly
- Status changes
- Zone associations change

#### Statistics Update

**Direction**: Hub → Client (broadcast)
**Message**: `StatisticsUpdate`

Sent periodically (configurable, e.g., every 5 seconds for testing or 5 minutes for production) with new sensor readings.

## 5. Error Handling

### 5.1 Error Codes

| Code                            | Value | Description               | Typical Cause                             |
| ------------------------------- | ----- | ------------------------- | ----------------------------------------- |
| `ERROR_CODE_UNSPECIFIED`        | 0     | Unspecified error         | Default/placeholder                       |
| `ERROR_CODE_INVALID_REQUEST`    | 1     | Malformed request         | Missing required fields, invalid protobuf |
| `ERROR_CODE_ZONE_NOT_FOUND`     | 2     | Zone ID doesn't exist     | Client using stale zone ID                |
| `ERROR_CODE_MODULE_NOT_FOUND`   | 3     | Module ID doesn't exist   | Client using stale module ID              |
| `ERROR_CODE_MODULE_OFFLINE`     | 4     | Module not connected      | Network issue or power loss               |
| `ERROR_CODE_INTERNAL_ERROR`     | 5     | Hub internal failure      | Database error, hardware failure          |
| `ERROR_CODE_INVALID_TIME_RANGE` | 6     | Invalid statistics range  | `from` after `to`, future date            |
| `ERROR_CODE_VERSION_MISMATCH`   | 7     | Protocol version mismatch | Client too old or too new                 |

### 5.2 Error Response Format

All errors return `ErrorResponse` with:

- `code`: Machine-readable error code
- `message`: Human-readable description
- `request_type`: (Optional) Type of request that failed

## 6. Setup Flow

### 6.1 Initial Hub Setup

1. User installs PlantOS hub hardware
2. Hub generates unique ID and encryption key
3. Hub displays QR code containing:

```json
{
  "v": 1,
  "hub_id": "hub-abc123",
  "hub_address": "wss://192.168.1.100:443/v1/admin",
  "key": "base64-encoded-key"
}
```

### 6.2 Client Onboarding

1. User opens PlantOS mobile app
2. User scans QR code on hub
3. App extracts connection details and key
4. App establishes WSS connection
5. App sends `Hello` message
6. Hub responds with `Welcome`
7. Connection established, client receives initial state via broadcasts

## 7. Implementation Notes

### 7.1 Client Guidelines

- Maintain persistent WebSocket connection for real-time updates
- Implement exponential backoff for reconnection
- Cache zone/module data, invalidate on updates
- Request statistics with appropriate aggregation to reduce data transfer
- Handle all error codes gracefully
- Note: Zone and module IDs are 1-based; ID 0 is reserved and invalid

#### Field Naming Convention

Protocol Buffers use **snake_case** for field names in the `.proto` file (e.g., `protocol_version`, `zone_id`). When working with protobuf-generated code:

- **JSON/Proto3**: Fields use snake_case by default
- **Generated accessors**: Most protobuf libraries provide camelCase accessors (e.g., `protocolVersion`, `zoneId`)
- **Examples in this spec**: May use either form depending on context

Always refer to the canonical `.proto` file for exact field names.

### 7.2 Hub Guidelines

- Broadcast updates to all connected clients
- Queue updates for disconnected clients (optional)
- Validate all incoming requests
- Rate limit control operations (prevent flooding)
- Log all errors for debugging

### 7.3 Performance Considerations

- Use `aggregation` parameter for historical data to reduce payload size
- Zone and module lists should be paginated if > 100 items (future enhancement)
- Statistics history should be stored efficiently (time-series database recommended)

## 8. Future Enhancements

- Pagination for large zone/module lists
- Batch operations (water multiple zones)
- Firmware update mechanism for modules
- Advanced scheduling (weather-based, seasonal)
- Multi-user support with role-based access

## 9. Version History

| Version | Date       | Changes                                                                |
| ------- | ---------- | ---------------------------------------------------------------------- |
| 1.0     | 2026-02-09 | Initial protocol design                                                |
| 1.0.1   | 2026-02-13 | Aligned protobuf definitions with proto/plantos/admin/v1/admin.proto:  |
|         |            | - Added `session_id` field to `Welcome` message                        |
|         |            | - Fixed `Welcome.server_timestamp` type to `google.protobuf.Timestamp` |
|         |            | - Fixed ErrorCode enum values (shifted 6→5, 7→6, 8→7, no gaps)         |
|         |            | - Fixed `ErrorResponse.request_type` to use `MessageType` enum         |
|         |            | - Clarified encryption transition after `Welcome` message              |
|         |            | - Documented required WebSocket subprotocol `plantos-protobuf`         |
|         |            | - Updated message flow diagram to show encryption phases               |
|         |            | - Added field naming convention documentation                          |

## Appendix A: Example Message Flow

```text
Client                                    Hub
  |                                         |
  |----- WSS CONNECT wss://hub:443/v1/admin |
  |      Subprotocol: plantos-protobuf      |
  |                                         |
  |----- Hello {protocolVersion: "1.0"} --->|  [unencrypted]
  |                                         |
  |<----- Welcome {hub_id, version, --------|  [unencrypted]
  |       session_id}                       |
  |                                         |
  |  [derive session key from session_id]   |
  |                                         |
  |----- ListModulesRequest --------------->|  [encrypted]
  |                                         |
  |<----- ListModulesResponse {modules} ----|  [encrypted]
  |                                         |
  |----- GetStatisticsRequest ------------->|  [encrypted]
  |    {zone_id: 1, from: ..., to: ...}     |
  |                                         |
  |<----- GetStatisticsResponse {stats} ----|  [encrypted]
  |                                         |
  |<----- ZoneUpdate {zone_id: 1, ...} -----|  [encrypted, broadcast]
  |<----- StatisticsUpdate {zone_id: 1} ----|  [encrypted, broadcast]
  |                                         |
```

## Appendix B: TypeScript/JavaScript Client Example

```typescript
// WebSocket connection with protobuf
const ws = new WebSocket("wss://hub:443/v1/admin", "plantos-protobuf");

ws.onopen = () => {
  // Send Hello message
  const hello = Hello.encode({ protocolVersion: "1.0" }).finish();
  const message = encodeMessage(MessageType.MSG_HELLO, hello);
  ws.send(message);
};

ws.onmessage = (event) => {
  const { type, payload } = decodeMessage(event.data);

  switch (type) {
    case MessageType.MSG_WELCOME:
      handleWelcome(Welcome.decode(payload));
      break;
    case MessageType.MSG_ZONE_UPDATE:
      handleZoneUpdate(ZoneUpdate.decode(payload));
      break;
    // ... handle other message types
  }
};

function encodeMessage(type: MessageType, payload: Uint8Array): Uint8Array {
  const buffer = new ArrayBuffer(4 + payload.length);
  const view = new DataView(buffer);
  view.setUint32(0, type, true); // Little-endian
  new Uint8Array(buffer, 4).set(payload);
  return new Uint8Array(buffer);
}
```
