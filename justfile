PROTO_DIR := "proto"
SHARED_OUT := "shared/admin-proto/src/proto-generated"
PROTO_FILE := PROTO_DIR + "/admin/v1/admin.proto"

proto-generate-all: proto-generate-shared
    @echo "All protocol buffer code generation complete!"

[working-directory: "shared/admin-proto"]
proto-generate-shared:
    @echo "Generating TypeScript code for shared protocol..."
    @mkdir -p src/proto-generated
    pnpm exec pbjs \
        -t static-module \
        -w commonjs \
        --force-long \
        -o src/proto-generated/admin.js \
        ../../{{PROTO_FILE}}
    pnpm exec pbts \
        -o src/proto-generated/admin.d.ts \
        src/proto-generated/admin.js
    @echo "TypeScript code generated in {{SHARED_OUT}}"

proto-clean:
    @echo "Cleaning generated proto code..."
    rm -rf {{SHARED_OUT}}
    @echo "Cleaned generated code directories"

