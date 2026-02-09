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

proto-generate-shared:
    @echo "Generating TypeScript code for shared protocol..."
    @mkdir -p {{SHARED_OUT}}
    cd shared/admin-proto && pnpm exec pbjs \
        -t static-module \
        -w commonjs \
        --force-long \
        -o src/proto-generated/admin.js \
        ../../{{PROTO_FILE}}
    cd shared/admin-proto && pnpm exec pbts \
        -o src/proto-generated/admin.d.ts \
        src/proto-generated/admin.js
    @echo "TypeScript code generated in {{SHARED_OUT}}"

proto-clean:
    @echo "Cleaning generated proto code..."
    rm -rf {{KOTLIN_OUT}}
    rm -rf {{SHARED_OUT}}
    @echo "Cleaned generated code directories"

proto-check-tools:
    @echo "Checking required tools..."
    @which protoc > /dev/null && echo "  protoc: OK ($(protoc --version))" || echo "  protoc: NOT FOUND - Install protobuf compiler"
    @which protoc-gen-kotlin > /dev/null 2>&1 && echo "  protoc-gen-kotlin: OK" || echo "  protoc-gen-kotlin: OK (built into protoc)"
    @which protoc-gen-ts > /dev/null 2>&1 && echo "  protoc-gen-ts: OK" || echo "  protoc-gen-ts: NOT FOUND - Install with: npm install -g ts-protoc-gen"
