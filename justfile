PROTO_DIR := "proto"
KOTLIN_OUT := "plantos-app/app/src/main/proto-generated"
TYPESCRIPT_OUT := "mock-server/src/proto-generated"
PROTO_FILE := PROTO_DIR + "/admin/v1/admin.proto"

proto-generate-all: proto-generate-kotlin proto-generate-typescript
    @echo "All protocol buffer code generation complete!"

proto-generate-kotlin:
    @echo "Generating Kotlin code for Android client..."
    @mkdir -p {{KOTLIN_OUT}}
    protoc \
        --proto_path={{PROTO_DIR}} \
        --kotlin_out={{KOTLIN_OUT}} \
        {{PROTO_FILE}}
    @echo "Kotlin code generated in {{KOTLIN_OUT}}"

proto-generate-typescript:
    @echo "Generating TypeScript code for mock server..."
    @mkdir -p {{TYPESCRIPT_OUT}}
    cd mock-server && pnpm exec pbjs \
        -t static-module \
        -w commonjs \
        --force-long \
        -o src/proto-generated/admin.js \
        ../{{PROTO_FILE}}
    cd mock-server && pnpm exec pbts \
        -o src/proto-generated/admin.d.ts \
        src/proto-generated/admin.js
    @echo "TypeScript code generated in {{TYPESCRIPT_OUT}}"

proto-clean:
    @echo "Cleaning generated proto code..."
    rm -rf {{KOTLIN_OUT}}
    rm -rf {{TYPESCRIPT_OUT}}
    @echo "Cleaned generated code directories"

proto-check-tools:
    @echo "Checking required tools..."
    @which protoc > /dev/null && echo "  protoc: OK ($(protoc --version))" || echo "  protoc: NOT FOUND - Install protobuf compiler"
    @which protoc-gen-kotlin > /dev/null 2>&1 && echo "  protoc-gen-kotlin: OK" || echo "  protoc-gen-kotlin: OK (built into protoc)"
    @which protoc-gen-ts > /dev/null 2>&1 && echo "  protoc-gen-ts: OK" || echo "  protoc-gen-ts: NOT FOUND - Install with: npm install -g ts-protoc-gen"

