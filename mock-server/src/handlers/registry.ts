import { MessageType, ErrorCode } from "@plantos/admin-proto";
import {
  MessageHandler,
  HandlerContext,
  HandlerResult,
  ErrorResult,
  ErrorResponse,
  Session,
} from "../types";
import {
  encodeUnencryptedMessage,
  encodeEncryptedMessage,
  encryptMessage,
} from "../encryption";

// Type for protobuf static classes
type ProtobufClass = {
  decode(reader: Uint8Array | Buffer, length?: number): unknown;
  encode(message: unknown, writer?: unknown): { finish(): Uint8Array };
};

interface RegisteredHandler {
  messageType: number;
  requestClass: ProtobufClass;
  responseClass?: ProtobufClass;
  handler: MessageHandler;
  requiresEncryption: boolean;
}

export class HandlerRegistry {
  private handlers: Map<number, RegisteredHandler> = new Map();

  /**
   * Register a handler for a specific message type.
   */
  register<TRequest, TResponse>(
    messageType: number,
    requestClass: ProtobufClass,
    responseClass: ProtobufClass | undefined,
    handler: MessageHandler<TRequest, HandlerResult<TResponse>>,
    options: { requiresEncryption?: boolean } = {},
  ): void {
    this.handlers.set(messageType, {
      messageType,
      requestClass,
      responseClass,
      handler: handler as MessageHandler,
      requiresEncryption: options.requiresEncryption ?? true,
    });
  }

  /**
   * Check if a handler is registered for a message type.
   */
  hasHandler(messageType: number): boolean {
    return this.handlers.has(messageType);
  }

  /**
   * Route a message to its handler.
   * Returns the encoded response or null if no response needed.
   */
  async routeMessage(
    messageType: number,
    payload: Uint8Array,
    session: Session,
    context: HandlerContext,
  ): Promise<Uint8Array | null> {
    const registration = this.handlers.get(messageType);

    if (!registration) {
      return this.createErrorResponse(
        ErrorCode.ERROR_CODE_INVALID_REQUEST,
        `Unknown message type: ${messageType}`,
        messageType,
        session,
      );
    }

    // Check encryption requirement
    if (registration.requiresEncryption && !session.isEncrypted) {
      return this.createErrorResponse(
        ErrorCode.ERROR_CODE_INVALID_REQUEST,
        "Message requires encryption. Complete handshake first.",
        messageType,
        session,
      );
    }

    try {
      // Decode request
      const request = registration.requestClass.decode(payload) as TRequest;

      // Call handler
      const result = await registration.handler(request, context);

      // Check if result is an error
      if (this.isErrorResult(result)) {
        return this.createErrorResponse(
          result.code,
          result.message,
          messageType,
          session,
        );
      }

      // Encode response if there is one
      if (
        registration.responseClass &&
        result !== undefined &&
        result !== null
      ) {
        const responsePayload = registration.responseClass
          .encode(result)
          .finish();

        // Determine message type for response
        const responseMessageType = this.getResponseMessageType(messageType);
        if (responseMessageType === null) {
          console.error(`No response message type mapping for ${messageType}`);
          return null;
        }

        return this.encodeResponse(
          responseMessageType,
          responsePayload,
          session,
        );
      }

      return null;
    } catch (error) {
      console.error(`Error handling message type ${messageType}:`, error);
      return this.createErrorResponse(
        ErrorCode.ERROR_CODE_INTERNAL_ERROR,
        `Failed to process message: ${error instanceof Error ? error.message : "Unknown error"}`,
        messageType,
        session,
      );
    }
  }

  /**
   * Create an error response.
   */
  createErrorResponse(
    code: number,
    message: string,
    requestType: number,
    session: Session,
  ): Uint8Array {
    const error = new ErrorResponse();
    error.code = code;
    error.message = message;
    error.requestType = requestType;

    const payload = ErrorResponse.encode(error).finish();
    return this.encodeResponse(
      MessageType.MSG_ERROR_RESPONSE,
      payload,
      session,
    );
  }

  /**
   * Encode a response based on session encryption state.
   */
  private encodeResponse(
    messageType: number,
    payload: Uint8Array,
    session: Session,
  ): Uint8Array {
    if (session.isEncrypted) {
      const encrypted = encryptMessage(
        session.derivedKey,
        Buffer.from(payload),
      );
      return encodeEncryptedMessage(messageType, encrypted);
    } else {
      return encodeUnencryptedMessage(messageType, payload);
    }
  }

  /**
   * Check if a result is an error.
   */
  private isErrorResult(result: unknown): result is ErrorResult {
    return (
      result !== null &&
      typeof result === "object" &&
      "code" in result &&
      "message" in result &&
      typeof (result as ErrorResult).code === "number" &&
      typeof (result as ErrorResult).message === "string"
    );
  }

  /**
   * Get the response message type for a request message type.
   */
  private getResponseMessageType(requestType: number): number | null {
    const requestResponseMap: Record<number, number> = {
      [MessageType.MSG_HELLO]: MessageType.MSG_WELCOME,
      [MessageType.MSG_LIST_MODULES_REQUEST]:
        MessageType.MSG_LIST_MODULES_RESPONSE,
      [MessageType.MSG_GET_MODULE_REQUEST]: MessageType.MSG_GET_MODULE_RESPONSE,
      [MessageType.MSG_LIST_ZONES_REQUEST]: MessageType.MSG_LIST_ZONES_RESPONSE,
      [MessageType.MSG_GET_ZONE_REQUEST]: MessageType.MSG_GET_ZONE_RESPONSE,
      [MessageType.MSG_GET_STATISTICS_REQUEST]:
        MessageType.MSG_GET_STATISTICS_RESPONSE,
      [MessageType.MSG_GET_ZONE_SETTINGS_REQUEST]:
        MessageType.MSG_GET_ZONE_SETTINGS_RESPONSE,
      [MessageType.MSG_UPDATE_ZONE_SETTINGS_REQUEST]:
        MessageType.MSG_UPDATE_ZONE_SETTINGS_RESPONSE,
    };

    return requestResponseMap[requestType] ?? null;
  }
}

// Helper type for request type inference
type TRequest = unknown;
