#!/bin/bash
# Generate one image with Codex's built-in image tool (billed to the ChatGPT plan, not the API).
# Usage: imagegen.sh "<prompt>" <out.png> [aspect, default 16:9]
set -euo pipefail
[ $# -ge 2 ] || { echo 'usage: imagegen.sh "<prompt>" <out.png> [16:9]' >&2; exit 2; }
prompt=$1; out=$2; aspect=${3:-16:9}
codex=${CODEX_BIN:-$(command -v codex || echo /Applications/ChatGPT.app/Contents/Resources/codex-cli/bin/codex)}
[ -x "$codex" ] || { echo "Codex not found: install the ChatGPT app or Codex CLI and sign in with ChatGPT" >&2; exit 1; }
dir=$(cd "$(dirname "$out")" && pwd); name=$(basename "$out")
[ -e "$dir/$name" ] && { echo "exists: $dir/$name (pick a new name, e.g. -v2)" >&2; exit 1; }
# ponytail: unset the API key so a stray OPENAI_API_KEY can't route this to paid API billing
env -u OPENAI_API_KEY "$codex" exec --skip-git-repo-check -s workspace-write -C "$dir" \
  "Use your built-in image_gen tool (never the CLI script or the API) to generate exactly one $aspect image. No text, logos or watermarks in the image unless the prompt asks for them. Prompt: $prompt
Then copy the generated file into the current directory as $name. Do nothing else." >&2
[ -s "$dir/$name" ] || { echo "no image written to $dir/$name" >&2; exit 1; }
echo "$dir/$name"
