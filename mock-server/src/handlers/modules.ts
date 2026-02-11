import { MessageType, ErrorCode } from "@plantos/admin-proto";
import {
  ListModulesRequest,
  ListModulesResponse,
  GetModuleRequest,
  GetModuleResponse,
  ModuleUpdate,
  Timestamp,
  ModuleType,
} from "../types";
import { HandlerRegistry } from "./registry";
import { HandlerContext, ErrorResult } from "../types";

export function registerModuleHandlers(registry: HandlerRegistry): void {
  // ListModules handler
  registry.register(
    MessageType.MSG_LIST_MODULES_REQUEST,
    ListModulesRequest,
    ListModulesResponse,
    (_request: unknown, context: HandlerContext) => {
      console.log("ListModulesRequest");

      const { store } = context;
      const response = new ListModulesResponse();
      response.modules = store.getModules();
      return response;
    },
  );

  // GetModule handler
  registry.register(
    MessageType.MSG_GET_MODULE_REQUEST,
    GetModuleRequest,
    GetModuleResponse,
    (request: { moduleId: number }, context: HandlerContext) => {
      const { store } = context;
      const moduleId = request.moduleId;

      console.log(`GetModuleRequest: moduleId=${moduleId}`);

      const module = store.getModuleById(moduleId);
      if (!module) {
        return {
          code: ErrorCode.ERROR_CODE_MODULE_NOT_FOUND,
          message: `Module with ID ${moduleId} not found`,
        } as ErrorResult;
      }

      const response = new GetModuleResponse();
      response.module = module;
      return response;
    },
  );
}

// Helper function to broadcast module updates
export function broadcastModuleUpdate(
  moduleId: number,
  module: ModuleType,
  changeType: number, // ModuleUpdateChangeType enum value
  context: HandlerContext,
): void {
  const { broadcast } = context;

  const update = new ModuleUpdate();
  update.moduleId = moduleId;
  update.module = module;
  update.changeType = changeType;

  const now = new Date();
  update.timestamp = Timestamp.fromObject({
    seconds: Math.floor(now.getTime() / 1000),
    nanos: (now.getTime() % 1000) * 1_000_000,
  });

  const payload = ModuleUpdate.encode(update).finish();
  broadcast(MessageType.MSG_MODULE_UPDATE, payload);
}
