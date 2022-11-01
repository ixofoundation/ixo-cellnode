#!/bin/bash
set -o errexit -o nounset -o pipefail
command -v shellcheck >/dev/null && shellcheck "$0"

ROOT_PROTO_DIR="./"
COSMOS_PROTO_DIR="./"
THIRD_PARTY_PROTO_DIR="./"
OUT_DIR="./codecgen"
PLUGIN_PATH="$(realpath ./bin)/protoc-gen-ts_proto_yarn_2"
mkdir -p "$OUT_DIR"



protoc \
--plugin="$PLUGIN_PATH" \
  --ts_proto_out="$OUT_DIR" \
  --proto_path="$COSMOS_PROTO_DIR" \
  --proto_path="$THIRD_PARTY_PROTO_DIR" \
  --ts_proto_opt="esModuleInterop=true,forceLong=long,useOptionals=true" \
  "./cosmos/coin.proto" \
  "./cosmos/cosmos.proto" \
  "./cosmos/pagination.proto" \
  "./entity/entity.proto" \
  "./entity/genesis.proto" \
  "./entity/query.proto" \
  "./entity/tx.proto" \
  "./iid/event.proto" \
  "./iid/iid.proto" \
  "./iid/genesis.proto" \
  "./iid/query.proto" \
  "./iid/tx.proto" \
  "./bonds/bonds.proto" \
  "./bonds/genesis.proto" \
  "./bonds/query.proto" \
  "./bonds/tx.proto" \
  "./legacy/did/did.proto" \
  "./legacy/did/diddoc.proto" \
  "./gogoproto/gogo.proto" \
  "./payments/genesis.proto" \
  "./payments/payments.proto" \
  "./payments/query.proto" \
  "./payments/tx.proto" \
  "./project/genesis.proto" \
  "./project/project.proto" \
  "./project/query.proto" \
  "./project/tx.proto" \
  "./tendermint/abci/types.proto" \
  "./tendermint/crypto/keys.proto" \
  "./tendermint/crypto/proof.proto" \
  "./tendermint/p2p/types.proto" \
  "./tendermint/types/block.proto" \
  "./tendermint/types/evidence.proto" \
  "./tendermint/types/params.proto" \
  "./tendermint/types/types.proto" \
  "./tendermint/types/validator.proto" \
  "./tendermint/version/types.proto" \
  "./tendermint/libs/bits/types.proto" \
  "./google/protobuf/any.proto" \


# Remove unnecessary codec files
rm -rf \
  src/codec/cosmos_proto/ \
  src/codec/gogoproto/ \
  src/codec/google/api/ \
  src/codec/google/protobuf/descriptor.ts
