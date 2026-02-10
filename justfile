PROTO_DIR := "proto"
KOTLIN_OUT := "plantos-app/app/src/main/proto-generated"
SHARED_OUT := "shared/admin-proto/src/proto-generated"
PROTO_FILE := PROTO_DIR + "/admin/v1/admin.proto"

proto-generate-all: proto-generate-kotlin proto-generate-shared
    @echo "All protocol buffer code generation complete!"

proto-generate-kotlin:
    @echo "Generating Kotlin code for Android client..."
    @mkdir -p {{KOTLIN_OUT}}
    protoc \
        --proto_path={{PROTO_DIR}} \
        --kotlin_out={{KOTLIN_OUT}} \
        {{PROTO_FILE}}
    @echo "Kotlin code generated in {{KOTLIN_OUT}}"

[working-directory: "shared/admin-proto"]
proto-generate-shared:
    @echo "Generating TypeScript code for shared protocol..."
    @mkdir -p {{SHARED_OUT}}
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
    rm -rf {{KOTLIN_OUT}}
    rm -rf {{SHARED_OUT}}
    @echo "Cleaned generated code directories"

