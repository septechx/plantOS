import { MessageType, v1 } from "@plantos/admin-proto";
import {
  Hello,
  Welcome,
  Timestamp,
  createErrorResult,
  success,
  failure,
} from "../types";
import { HandlerRegistry } from "./registry";
import { HandlerContext } from "../types";

const { ErrorCode } = v1;

export function registerHandshakeHandlers(
  registry: HandlerRegistry,
  hubId: string,
  hubVersion: string,
): void {
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

      if (request.clientVersion) {
        session.clientVersion = request.clientVersion;
      }

      if (request.protocolVersion !== "1.0") {
        return failure(
          createErrorResult(
            ErrorCode.ERROR_CODE_VERSION_MISMATCH,
            `Protocol version ${request.protocolVersion} not supported. Expected 1.0.`,
          ),
        );
      }

      const welcome = new Welcome();
      welcome.hubId = hubId;
      welcome.hubVersion = hubVersion;

      const now = new Date();
      welcome.serverTimestamp = Timestamp.fromObject({
        seconds: Math.floor(now.getTime() / 1000),
        nanos: (now.getTime() % 1000) * 1_000_000,
      });

      welcome.sessionId = session.id;

      return success(welcome);
    },
    {
      requiresEncryption: false,
      isHandshake: true,
      responseType: MessageType.MSG_WELCOME,
    },
  );
}
