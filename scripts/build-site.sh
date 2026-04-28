#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
PAR_LANG_DIR="${PAR_LANG_DIR:-"$ROOT_DIR/../par-lang"}"
PAR_REPOSITORY="${PAR_REPOSITORY:-faiface/par-lang}"
DIST_DIR="$ROOT_DIR/dist"

require_command() {
  if ! command -v "$1" >/dev/null 2>&1; then
    echo "Missing required command: $1" >&2
    exit 1
  fi
}

require_command cargo
require_command git
require_command mdbook
require_command npm
require_command node
require_command trunk

if [[ ! -d "$PAR_LANG_DIR" ]]; then
  echo "PAR_LANG_DIR does not exist: $PAR_LANG_DIR" >&2
  exit 1
fi

if [[ ! -f "$PAR_LANG_DIR/Cargo.toml" ]]; then
  echo "PAR_LANG_DIR does not look like the Par language repo: $PAR_LANG_DIR" >&2
  exit 1
fi

rm -rf "$DIST_DIR"

cd "$ROOT_DIR"
npm run build

mdbook build "$PAR_LANG_DIR/docs" --dest-dir "$DIST_DIR/book"

cargo build \
  --manifest-path "$PAR_LANG_DIR/Cargo.toml" \
  --release \
  --no-default-features \
  --bin par

DOC_WORKDIR="$(mktemp -d)"
cleanup() {
  rm -rf "$DOC_WORKDIR"
}
trap cleanup EXIT

PAR_BIN="$PAR_LANG_DIR/target/release/par"
(
  cd "$DOC_WORKDIR"
  "$PAR_BIN" doc --out "$DIST_DIR/doc" --exported
)

(
  cd "$PAR_LANG_DIR"
  env -u NO_COLOR trunk build --release --dist "$DIST_DIR/playground" --public-url /playground/
)

touch "$DIST_DIR/.nojekyll"
node "$ROOT_DIR/scripts/write-build-metadata.mjs" \
  "$DIST_DIR" \
  "$ROOT_DIR" \
  "$PAR_LANG_DIR" \
  "$PAR_REPOSITORY"
