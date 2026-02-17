import { MessageType, v1 } from "@plantos/admin-proto";
import {
  ListModulesRequest,
  ListModulesResponse,
  GetModuleRequest,
  GetModuleResponse,
  createErrorResult,
  success,
  failure,
} from "../types";
import { HandlerRegistry } from "./registry";
import { HandlerContext } from "../types";

const { ErrorCode } = v1;

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
      return success(response);
    },
    { responseType: MessageType.MSG_LIST_MODULES_RESPONSE },
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
        return failure(
          createErrorResult(
            ErrorCode.ERROR_CODE_MODULE_NOT_FOUND,
            `Module with ID ${moduleId} not found`,
          ),
        );
      }

      const response = new GetModuleResponse();
      response.module = module;
      return success(response);
    },
    { responseType: MessageType.MSG_GET_MODULE_RESPONSE },
  );
}
