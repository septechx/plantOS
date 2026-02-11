import { MessageType, ErrorCode } from "@plantos/admin-proto";
import { Hello, Welcome, Timestamp } from "../types";
import { HandlerRegistry } from "./registry";
import { HandlerContext, ErrorResult } from "../types";

export function registerHandshakeHandlers(
  registry: HandlerRegistry,
  hubId: string,
  hubVersion: string,
): void {
  // Hello handler (unencrypted)
  registry.register(
    MessageType.MSG_HELLO,
    Hello,
    Welcome,
    (
      request: { protocolVersion?: string; clientVersion?: string },
      context: HandlerContext,
    ) => {
      const { session } = context;

      console.log(
        `Client handshake: protocol=${request.protocolVersion}, client=${request.clientVersion}`,
      );

      // Store client version in session
      if (request.clientVersion) {
        session.clientVersion = request.clientVersion;
      }

      // Validate protocol version
      if (request.protocolVersion !== "1.0") {
        return {
          code: ErrorCode.ERROR_CODE_VERSION_MISMATCH,
          message: `Protocol version ${request.protocolVersion} not supported. Expected 1..0.`,
        } as ErrorResult;
      }

      // Enable encryption for this session after successful handshake
      // Note: The response is still unencrypted, but subsequent messages will be encrypted
      session.isEncrypted = true;

      // Build Welcome response
      const welcome = new Welcome();
      welcome.hubId = hubId;
      welcome.hubVersion = hubVersion;

      const now = new Date();
      welcome.serverTimestamp = Timestamp.fromObject({
        seconds: Math.floor(now.getTime() / 1000),
        nanos: (now.getTime() % 1000) * 1_000_000,
      });

      // Include session ID for client-side key derivation
      welcome.sessionId = session.id;

      return welcome;
    },
    { requiresEncryption: false }, // Hello is always unencrypted
  );
}
