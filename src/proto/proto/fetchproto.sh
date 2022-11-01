#!/bin/bash
set -o errexit -o nounset -o pipefail
command -v shellcheck >/dev/null && shellcheck "$0"

PROTO_DIR="./ixo-proto"
IXO_DIR="$PROTO_DIR/ixo"
IXO_SDK_DIR="$IXO_DIR/ixo-sdk"
ZIP_FILE="$IXO_DIR/tmp.zip"
IXO_SDK_REF=${IXO_SDK_REF:-"master"}
SUFFIX=${IXO_SDK_REF}

[[ $SUFFIX =~ ^v[0-9]+\.[0-9]+\.[0-9]+(-.+)?$ ]] && SUFFIX=${SUFFIX#v}

mkdir -p "$IXO_DIR"

wget -qO "$ZIP_FILE" "https://github.com/ixofoundation/ixo-blockchain/tree/devel/entity-module/archive/$IXO_SDK_REF.zip"
unzip "$ZIP_FILE" "*.proto" -d "$IXO_DIR"
mv "$IXO_SDK_DIR-$SUFFIX" "$IXO_SDK_DIR"
rm "$ZIP_FILE"