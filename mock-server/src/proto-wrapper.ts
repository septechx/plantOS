import protobuf from "protobufjs";

if (!protobuf.roots) {
  (protobuf as any).roots = {};
}

export * from "./proto-generated/admin.js";

import { plantos } from "./proto-generated/admin.js";
export default plantos.admin.v1;
