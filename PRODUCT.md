# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Music lovers / listeners** (primary): people with a local library who want a
  DJ-quality, hands-off listening experience — a player that reads their own files and
  blends them into a seamless mix. No DJ skills required. The landing's goal is that they
  install the app.
- **Developers & tinkerers** (secondary): open-source hackers interested in the
  DSP/automix engine (Swift + Python streaming, librosa analysis, named-pipe audio).

## Product Purpose

Cella is a macOS music player with OpenMix built in — a full-featured player that also
automixes the library. It analyzes BPM, key, energy, and vocals on every track, orders the
playlist like a DJ, and beat-aligns crossfades so transitions land on bar boundaries and
never cut across a lyric. The mix is measurably better than shuffle: bar-quantized,
vocal-safe, harmonic-aware. Success means listening to your own library the way you'd
hear a well-built live mix, without doing any of the mixing yourself.

## Positioning

A music player whose built-in automix (OpenMix) is a **live streaming engine**: a Python
subprocess (librosa/scipy/numpy) analyzes and mixes in real time, streaming 44.1 kHz
float32 chunks through a named pipe into a native Swift AVAudioEngine chunk player.
Analysis syncs back (BPM, key, energy profile, bar timestamps, vocal activity) to drive
the 21:9 emotion screen, mood, and visuals. Crossfades are equal-power S-curves,
beat-triggered, bar-quantized, vocal-ducked, mood-preserved. The claim a neighboring
player could not copy is that depth inside an ordinary player — real-time DJ-grade
transitions over your own folder of files, fully on-device.

## Operating Context

- macOS 15.0+ on Apple Silicon; SwiftUI; Xcode 15+; bundle is a native Swift app.
- Five-tab keyboard-first shell: Cluster (future), Motion, Cella (player/emotion screen),
  LRC Editor, Config (`.cella` import, appearance, audio profiles, queue, engine log).
- Keyboard: Space play/pause, ←/→ skip, L cycles lyrics.
- RemoteCommandCenter + MPNowPlayingInfo integration.
- Reading/living alongside listening: EPUB reading was in the older README; the current
  app adds an Enhanced LRC editor (0.25–2× playback, tap-to-stamp, undo) and a Motion
  tab (Instagram-style boomerang maker from video, 0.3/0.5/1/2 s mark-based trimmer).

## Capabilities and Constraints

- **OpenMix streaming engine (differentiator):** Python 3.10+ subprocess using librosa,
  scipy, numpy, soundfile, audioread; commands over stdin JSON (`analyze` / `mix` /
  `cancel`); audio back over a named pipe as raw float32 LE stereo 44.1 kHz; Swift reads 5
  s chunks with 3-chunk buffer-ahead (`StreamAudioEngine`).
- **Dual audio engines:** `StreamAudioEngine` (OpenMix chunks) + `MixAudioEngine`
  (real-time AVAudioEngine fallback: AVAudioPlayerNode + AVAudioUnitTimePitch +
  AVAudioUnitEQ + AVAudioUnitReverb + PeakLimiter).
- **Automix:** BPM/key/energy-aware ordering (MixEngine), beat-aligned bar triggers,
  vocal-aware ducking, equal-power S-curve crossfades, mood-preserved EQ envelopes.
- **Analysis sync:** BPM, key, energyProfile, barTimestamps, vocal activity stream back
  from OpenMix to drive visuals and mood.
- **21:9 emotion screen:** dot matrix / Catmull-Rom line visualizer / static; artist
  image/video background (muted, looping); slim/full lyrics overlays; progress bar with
  sweep; green gradient border pulse on autoMix and lyric transitions; scroll-to-volume.
- **Now-playing pill:** track/lyric crossfade, `OpenMixing to` badge, volume bar with
  green glow, lyric mode icon, transient `Lyric Supported` badge.
- **Themes:** dark / light / seafoam / brat × system/dark/light; `AppColors` / `Theme`.
- **Audio profiles:** flat, bose, sony, airpodsMax (10-band parametric EQ).
- **LRC editor & Motion:** Enhanced LRC (independent AVAudioPlayer, parse/save metadata,
  speed 0.25–2×, 50-step undo); Motion boomerang maker with filmstrip
  (`AVAssetImageGenerator`) and forward+backward 1.25× export.
- **`.cella` format:** import folder MUST end `.cella`; contains `.ca` JSON index
  (`{ name, albums[] }`), `cma/` artist art/video, album dirs with CUE + mp3 + `lrc/`.
  `Artist - Title` filenames parse into metadata.
- **Formats:** mp3, wav, m4a, flac, aac, caf, ogg, aif (older README list).
- **Platform constraints:** macOS 15.0+, Apple Silicon, Xcode 15+, Python 3.10+.
- **Explicitly undecided:** distribution channel (no App Store / direct-download link
  noted; app installs via Xcode build from repo), and availability of a real demo-mix
  audio asset for the landing's "Hear a Mix".

## Brand Commitments

- Product name: **Cella**. Built-in automix engine: **OpenMix** (a Python streaming
  engine — the name carries the mechanism).
- Publisher: **Thanh Solar NEXT**; author/license holder: **Van Thanh Pham**; repo owner
  handle: `congnghetinhtu`.
- Open source under the MIT license (2026); primary surface is the GitHub repo
  (`github.com/congnghetinhtu/Cella`).
- App identity: warm-orange accent `#FF8038`, 9×5 dot matrix, pixel/editorial display
  language, and the 21:9 emotion screen are part of the product's look; themes include
  dark, light, seafoam, and brat.

## Evidence on Hand

- Working app, used by the author (per publisher). Feature facts above come from
  `Cella-Documentation.md`, generated 2026-08-29 from the current checkout at
  `/Users/admin/Downloads/Cella`.
- Existing landing page code (Hero, Capabilities, BeyondMix, Footer) documents an earlier,
  narrower feature set (EPUB reading, TSP ordering, 8 EQ profiles) — superseded where it
  conflicts with the doc.
- **No** screenshots, demo mixes, or video assets in this repo yet — future work must not
  fabricate them. Author can supply visuals when needed.

## Product Principles

- **DJ craft by default:** the product's reason to exist is hands-off mixing of real
  quality — beat-aligned, vocal-safe, harmonic-aware — so craft must never be a feature
  you have to ask for.
- **On-device and local:** analysis runs locally on Apple frameworks and open-source DSP;
  speed comes from smart downsampling, not from sending sound to a cloud.
- **Listening stays the product:** reading, reminders, and the emotion screen enrich the
  listening flow rather than competing with it; the player is the hearth.
- **Open and remixable:** MIT, buildable from source; the engine is a starting point for
  others, not a locked black box.
- **Precision under a calm surface:** quantified bars, weighted axes, exact dB values —
  engineering depth rendered as a warm, unobtrusive player, not a control console.