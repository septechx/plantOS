import {
  MessageType,
  v1,
  encodeUnencryptedMessage,
  encodeEncryptedMessage,
  encryptMessage,
} from "@plantos/admin-proto";
import {
  MessageHandler,
  HandlerContext,
  HandlerResult,
  ErrorResponse,
  Session,
} from "../types";

const { ErrorCode } = v1;

type ProtobufClass = {
  decode(reader: Uint8Array | Buffer, length?: number): unknown;
  encode(message: unknown, writer?: unknown): { finish(): Uint8Array };
};

interface RegisteredHandler<TResponse = unknown> {
  messageType: number;
  requestClass: ProtobufClass;
  responseClass?: ProtobufClass;
  handler: MessageHandler<unknown, TResponse>;
  requiresEncryption: boolean;
  isHandshake: boolean;
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
    handler: MessageHandler<TRequest, TResponse>,
    options: { requiresEncryption?: boolean; isHandshake?: boolean } = {},
  ): void {
    this.handlers.set(messageType, {
      messageType,
      requestClass,
      responseClass,
      handler: handler as MessageHandler<unknown, unknown>,
      requiresEncryption: options.requiresEncryption ?? true,
      isHandshake: options.isHandshake ?? false,
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
      const request = registration.requestClass.decode(payload);

      // Call handler
      const result = (await registration.handler(
        request,
        context,
      )) as HandlerResult<unknown>;

      // Check if result is an error
      if (!result.ok) {
        return this.createErrorResponse(
          result.error.code,
          result.error.message,
          messageType,
          session,
        );
      }

      // Encode response if there is one
      if (
        registration.responseClass &&
        result.value !== undefined &&
        result.value !== null
      ) {
        const responsePayload = registration.responseClass
          .encode(result.value)
          .finish();

        const responseMessageType = this.getResponseMessageType(messageType);
        if (responseMessageType === null) {
          console.error(`No response message type mapping for ${messageType}`);
          return this.createErrorResponse(
            ErrorCode.ERROR_CODE_INTERNAL_ERROR,
            `No response message type mapping for ${messageType}`,
            messageType,
            session,
          );
        }

        const encoded = this.encodeResponse(
          responseMessageType,
          responsePayload,
          session,
          registration.isHandshake,
        );

        return encoded;
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
    isHandshake: boolean = false,
  ): Uint8Array {
    if (session.isEncrypted && !isHandshake) {
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
