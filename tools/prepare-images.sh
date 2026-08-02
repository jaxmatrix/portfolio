#!/usr/bin/env bash
#
# Derive web-ready images from the raw asset library into apps/web/public/.
#
# apps/web/assets/Raw/ is a 1.3 GB source library (gitignored, never deployed).
# Originals are 4000x3000 JPEGs at 1-9 MB each; the site serves them through a
# plain <img> with no srcset, and the Gallery lightbox reuses the same file as
# the tile, so each image needs exactly one derivative sized for the largest
# use — 1600px — rather than a thumbnail.
#
# Re-runnable and idempotent. Run once, commit the output.
#
#   bash tools/prepare-images.sh
#
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
RAW="$ROOT/apps/web/assets/Raw"
ASSETS="$ROOT/apps/web/assets"
PUB="$ROOT/apps/web/public"

for tool in convert ffmpeg; do
  command -v "$tool" >/dev/null || { echo "missing required tool: $tool" >&2; exit 1; }
done

mkdir -p "$PUB/builds" "$PUB/gallery" "$PUB/scrapbook"

# -auto-orient is load-bearing: several sources carry EXIF rotation and render
# sideways without it (ChemicalDeposition_UpdatedMachine is the obvious one).
# -strip drops EXIF afterwards, which also removes GPS tags from lab photos.
derive() {
  local src="$1" dest="$2" max="${3:-1600}"
  [ -f "$src" ] || { echo "  MISSING $src" >&2; return 1; }
  convert "$src" -auto-orient -resize "${max}x${max}>" -quality 82 -strip "$dest"
  printf '  %-52s %s\n' "$(basename "$dest")" "$(du -h "$dest" | cut -f1)"
}

# Pull a single frame from a video. Used where no still of the subject exists.
# $2 is an ffmpeg -ss timestamp; optional $4 is an ImageMagick crop geometry,
# since a phone-shot of a screen usually needs the wall and desk trimmed off.
frame() {
  local src="$1" at="$2" dest="$3" crop="${4:-}"
  [ -f "$src" ] || { echo "  MISSING $src" >&2; return 1; }
  local tmp; tmp="$(mktemp --suffix=.png)"
  ffmpeg -nostdin -v error -ss "$at" -i "$src" -frames:v 1 -y "$tmp"
  if [ -n "$crop" ]; then
    convert "$tmp" -crop "$crop" +repage "$tmp"
  fi
  derive "$tmp" "$dest"
  rm -f "$tmp"
}

echo "== build card media =="
derive "$ASSETS/mjx-hermes.jpeg" "$PUB/builds/mjx-hermes.webp"
derive "$ASSETS/dexkitty.png"    "$PUB/builds/dexkitty.webp"
derive "$RAW/EtchingElectrodes18Electrodes.jpg" "$PUB/builds/biosensors.webp"
derive "$RAW/PotentioStateV4_StartupWithRustFirmware.jpg"           "$PUB/builds/potentiostat.webp"
derive "$RAW/FirstSetup_DepositionMachine.jpg"                      "$PUB/builds/deposition-machine.webp"
# No still exists of the control app. The clip is one static phone-shot of a
# laptop, most of it blank window, so crop to the band that actually carries
# information: the jog controls and the two live camera feeds.
frame "$RAW/DepositionExperiment_FromSoftware.mp4" 12.7 \
  "$PUB/builds/control-software.webp" "990x360+20+550"

echo "== slidely.ai hero =="
# Their og:image is a logo card, not the product, so capture the hero instead.
# Snap-packaged Chromium is confined and cannot write to /tmp or to dot-dirs in
# $HOME, so the scratch dir has to be a plain directory inside the repo.
SLIDELY_TMP="$ROOT/tmp-shot"
CHROME="$(command -v chromium-browser || command -v chromium || true)"
if [ -n "$CHROME" ]; then
  mkdir -p "$SLIDELY_TMP"
  "$CHROME" --headless --disable-gpu --no-sandbox --hide-scrollbars \
    --virtual-time-budget=8000 --window-size=1600,1000 \
    --screenshot="$SLIDELY_TMP/slidely.png" https://slidely.ai >/dev/null 2>&1 || true
  if [ -s "$SLIDELY_TMP/slidely.png" ]; then
    # Crop to the hero: drops the support-chat bubble and the half-cut
    # "Try now or scroll" band below the fold.
    convert "$SLIDELY_TMP/slidely.png" -crop 1600x840+0+0 +repage \
      -resize '1600x1600>' -quality 82 -strip "$PUB/builds/slidely.webp"
    printf '  %-52s %s\n' "slidely.webp" "$(du -h "$PUB/builds/slidely.webp" | cut -f1)"
  else
    echo "  capture failed — leaving any existing slidely.webp untouched" >&2
  fi
  rm -rf "$SLIDELY_TMP"
else
  echo "  no chromium on PATH — skipping" >&2
fi

echo "== gallery (engineering) =="
gallery=(
  FirstSetup_DepositionMachine:deposition-rig
  ChemicalDeposition_UpdatedMachine:deposition-enclosed
  ChemicalDepositionUpgrade_1_humidityProtction:deposition-humidity
  Sputterin_NonWorkingMainMachine:sputtering-chamber
  Sputtering_Fixed:sputtering-controller
  SputterinFixed_CopperDeposition:sputtering-copper
  PotentioStateV4_StartupWithRustFirmware:potentiostat-v4
  V2PotentioStat:potentiostat-v2
  V1PotentioStat:potentiostat-v1
  FixingRustDriverForTheDisplay:rust-display-driver
  AnExperimentMadeUsingSLAPrintingAndScreenPrinting:multiplexed-sensor
  laserEtchedElectrode:screen-printed-cells
  MicroFluidicsAndElectrochemicalSetup:microfluidics
  HomeLab_IITKharagpur:home-lab
  AClipIsAllYouNeed_WhenThereIsNoAdapter:clothes-peg-connector
  MakingBlueMaskFirstVersionForPatchSensor:patch-sensor-mask
)
for entry in "${gallery[@]}"; do
  derive "$RAW/${entry%%:*}.jpg" "$PUB/gallery/${entry##*:}.webp"
done

echo "== scrapbook =="
scrapbook=(
  AssasinCreedDressFromPaper:paper-costume
  GarbageDesign_AwardSecond:garbage-design-award
  GarbageDesignMakingAScenary:garbage-design-build
  NumbuMirchiBoi_3DPen_kyechain:3d-pen-keychain
  3D_Printed_selfPortraid:printed-self-portrait
  HackingHardisk_ForBitCointChallenge:hdd-serial-console
  FinalDaysOfGsocCompletingTheKanban:gsoc-kanban
  PeltierPlatesSetupForItsCharacterization:peltier-rig
)
for entry in "${scrapbook[@]}"; do
  derive "$RAW/${entry%%:*}.jpg" "$PUB/scrapbook/${entry##*:}.webp"
done
frame "$RAW/BugMadeTheCircuitDJ.mp4" 3 "$PUB/scrapbook/relay-loop.webp"

echo
echo "public/ image payload: $(du -sh "$PUB/builds" "$PUB/gallery" "$PUB/scrapbook" | awk '{s+=$1} END {print}' >/dev/null; du -ch "$PUB/builds" "$PUB/gallery" "$PUB/scrapbook" | tail -1 | cut -f1)"
