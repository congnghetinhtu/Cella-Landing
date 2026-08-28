# Cella — Project Documentation

> **macOS SwiftUI music player with automix, OpenMix Python engine, Enhanced LRC editor & Cella Motion boomerang maker.**

- **Bundle:** macOS 15.0+ · SwiftUI · Xcode 15+ · SPM
- **Repo root:** `Cella/Cella.xcodeproj`
- **License:** MIT (2026 Van Thanh Pham)
- **Python:** 3.10+ `librosa`, `scipy`, `numpy`, `soundfile`, `audioread`

---

## 1. At-a-Glance

| Tab | Purpose |
|-----|---------|
| **Cluster** | Placeholder (coming soon) |
| **Motion** | Instagram boomerang from video (0.3 / 0.5 / 1 / 2s mark-based trimmer + filmstrip) |
| **Cella** | Main player — 21:9 emotion screen, now-playing pill, queue |
| **LRC Editor** | Enhanced LRC (independent player, speed 0.25–2×, tap-to-stamp, undo 50, auto-save, metadata) |
| **Config** | Import `.cella` folder, appearance, audio profiles, queue management, engine log |

---

## 2. Architecture

```
┌─ Cella (Swift) ───────────────────────────────────┐
│ PlayerViewModel (@Observable)                     │
│  ├─ importViaOpenMix / importFolder  → .cella    │
│  ├─ MixAudioEngine (fallback)  AVAudioEngine     │
│  ├─ StreamAudioEngine (OpenMix) chunk player     │
│  ├─ OpenMixBridge  subprocess + named pipe       │
│  └─ Lyrics / Artist media / Mood / Queue         │
│ Views: Cella / Motion / LRC Editor / Config      │
│ Theme / MatrixPatterns / LineAnimation            │
└──────────────────────────────────────────────────┘
         ↕ stdin/stdout JSON + named pipe (float32)
┌─ OpenMix (Python) ────────────────────────────────┐
│ stream_server.py · analyzer.py · crossfader.py   │
│ mixer.py · audio_utils.py · models.py            │
└──────────────────────────────────────────────────┘
```

**Channels**

| Direction | Channel | Format |
|-----------|---------|--------|
| Cella → OpenMix | stdin | JSON `analyze` / `mix` / `cancel` |
| OpenMix → Cella | stdout | JSON progress / analysis / done |
| OpenMix → Cella | named pipe | raw float32 LE stereo 44.1kHz |

---

## 3. Key Features

- **Automix:** BPM/key/energy-aware ordering (MixEngine), beat-aligned bar triggers, vocal-aware ducking, equal-power S-curve crossfades, mood-preserved EQ envelopes.
- **Dual audio engines:** `StreamAudioEngine` (OpenMix chunks, 3-chunk buffer-ahead) + `MixAudioEngine` (real-time fallback with `AVAudioPlayerNode` + `AVAudioUnitTimePitch` + `AVAudioUnitEQ` + `AVAudioUnitReverb` + PeakLimiter).
- **OpenMix streaming:** 5 s float32 chunks via `mkfifo`, `readAudioChunks()` in Swift.
- **Analysis sync:** BPM, key, energyProfile, barTimestamps, vocal activity flow back to Swift for visuals/mood.
- **21:9 emotion screen:** Dot matrix / line visualizer (`Catmull-Rom`) / static; artist image/video background; slim/full lyrics overlay; progress bar with sweep; green gradient border pulse on `autoMix` and on lyric `...` → lyric transition; volume scroll on hover.
- **Now-playing pill:** Track/lyric crossfade, `OpenMixing to` badge (green shimmer), volume bar (green glow on adjust, 30 Hz coalesced), lyric mode icon, 10 s `Lyric Supported` badge (persisted per track, not re-triggered on tab switch).
- **Motion trimmer:** Mark-based (scrub → Mark In/Out), preset lengths 0.3/0.5/1/2 s, filmstrip (full-video, `AVAssetImageGenerator` thumbnails), loop preview, frame-step via real FPS, `BoomerangMaker` (forward+backward, 1.25×).
- **Enhanced LRC:** Separate `AVAudioPlayer`, `LrcParser` with `LrcMetadata` preservation, speed control, undo, export.
- **Queue:** Drag-reorder / drop delegate, jumpToTrack, remove, speaker indicator.
- **Themes:** dark / light / seafoam / brat × system/dark/light; `AppColors` / `Theme`.
- **Audio profiles:** flat, bose, sony, airpodsMax (10-band parametric EQ).
- **System:** RemoteCommandCenter, `MPNowPlayingInfo`, `PowerManager`, `DisplayLink`.

---

## 4. The `.cella` Format

```
MyPlaylist.cella/                  # folder MUST end with .cella
├── MyPlaylist.ca                  # JSON index { name, albums[] }
├── cma/                           # artist artwork/videos
│   └── <artist>/  *.mp4/*.mov/*.jpg/*.gif
├── Album A/
│   ├── 01 - Track.cue?           # per-album CUE → performer → cma mapping
│   ├── *.mp3
│   └── lrc/
│       └── 01 - Track.lrc
└── Album B/ ...
```

- **`.ca`**: `CaParser` → `CaPlaylist` / `CaAlbum` / `CaTrack`; `CaParser.audioFiles()` enumerates tracks.
- **CUE**: `CueParser` per album, maps `TRACK FILE` → artist.
- **LRC**: `LrcParser.parse()` → `(LrcMetadata, [LrcLine])`; `LrcLine { time, text }`; `loadLyrics(for:)` searches `album/lrc/`, `root/lrc/`, `root/`.

---

## 5. Project Structure

```
Cella/
├── CellaApp.swift
├── ContentView.swift                 # BottomTabBar + tab switch, keys, volume save, scroll-to-volume
├── AudioEngine/
│   ├── MixAudioEngine.swift          # AVAudioEngine graph, smoothVolume/setVolumeImmediate, crossfade
│   ├── StreamAudioEngine.swift       # chunk player
│   └── OpenMixBridge.swift           # subprocess lifecycle, JSON, pipe
├── AudioUtils/AudioHelpers.swift
├── Analyzer/TrackAnalyzer.swift
├── Crossfader/Crossfader.swift
├── Mixer/MixEngine.swift
├── Models/
│   ├── AppTab.swift                  # .cluster/.motions/.cella/.enhancedLRC/.config
│   ├── PlayerState.swift             # PlayerState + MusicMood + LyricsMode
│   ├── TrackAsset.swift / TrackAnalysis.swift
│   ├── MixQueue.swift / AudioConfig.swift / AudioProfile.swift
│   └── EditableLrcLine.swift / TransitionLog.swift
├── Theme/Theme.swift / AppColors.swift
├── Utilities/
│   ├── LrcParser.swift / CueParser.swift / CaParser.swift
│   ├── MatrixPatterns.swift / LinePathGenerator.swift
│   ├── PixelFont.swift / PowerManager.swift / DisplayLink.swift
│   └── …
├── VideoUtils/
│   ├── BoomerangMaker.swift
│   └── FilmstripGenerator.swift      # AVAssetImageGenerator (windowed)
├── ViewModels/
│   ├── PlayerViewModel.swift         # @Observable, queue, lyrics, artist media, GIF/video bg
│   └── EnhancedLRCViewModel.swift
└── Views/
    ├── Navigation/TopTabBar.swift    # BottomTabBar, NowPlayingBar (pill + badges), ScrollCoordinator
    ├── Cella/
    │   ├── CellaView.swift / EmotionScreenView.swift  # 21:9 + CmaBackgroundLayer (VideoBackgroundView)
    │   ├── LyricsView.swift / LineAnimationView.swift / DotMatrixView.swift
    │   ├── QueueView.swift / PlayerIndicatorView.swift
    │   └── …
    ├── Motions/CellaMotionsView.swift # mark-based trimmer + FilmstripBar
    ├── EnhancedLRC/EnhancedLRCView.swift
    ├── Config/ConfigView.swift
    └── Cluster/ClusterView.swift

OpenMix/  (Python — not in this checkout)
├── stream_server.py / cli.py / analyzer.py / crossfader.py / mixer.py / audio_utils.py
```

---

## 6. Core Types & State

- **PlayerState:** `.idle` / `.playing` / `.paused` / `.analyzing(Double)` / `.loading` / `.autoMix`; `isPlaying` == `.playing`.
- **LyricsMode:** `.off` (text.bubble) / `.full` (text.bubble.fill) / `.slim` (text.badge.checkmark); `L` hotkey cycles.
- **PlayerViewModel (@Observable):** `playerState`, `currentVolume`, `currentTime/currentDuration` (1 s `nowPlayingTimer` + `syncPlaybackTime()`), `mixQueue`, `currentLyrics/nextLyrics`, `lyricsMode`, `currentArtistImage/videoPlayer`, `artistImages/ gifFrames`, `activeEngine`, `engineLog`, `lastLyricBadgeTrackID`.
- **MixQueue:** `tracks: [TrackAsset]`, `currentIndex`, `currentTrack/nextTrack`, `advanceToNext/Previous`, `moveTrack`.
- **TrackAsset:** `url`, `fileName`, `trackTitle/artistName` (parsed), `analysis: TrackAnalysis?`, `id: UUID`.
- **TrackAnalysis:** `bpm`, `keySignature`, `energyProfile`, `barTimestamps`, `beatTimestamps`, `vocalActivity`, `introRegion`, `structureSections`, `duration`.

---

## 7. Important Behaviors

- **Volume:** Scroll on 21:9 only (`EmotionScreenView` local monitor, swallowed, not propagated to `AVPlayerView`); `setVolumeForScroll` → engine immediate + UI coalesced to 30 Hz; leaving `Motion` tab restores `cellaVolume`; `isVolumeAdjusting` glow 0.8 s.
- **Lyric border pulse:** `EmotionScreenView` tracks `currentLyricIndex`; when `prev == "..."/"…" / ""` → `lyric` triggers 1.8 s green/mint border (same as `autoMix`), combined `isBorderPulsing`.
- **Lyric Supported badge:** In `NowPlayingBar` next to lyric mode, green shimmer pill, 10 s per track (`lastLyricBadgeTrackID` persisted in `PlayerViewModel` so tab switch doesn't re-trigger); triggers on `mixQueue.url` change (non-autoMix), `currentLyricsTrackURL` change, `autoMix→playing` (force), `onAppear` for first import.
- **Motion flow:** Drop video → `AVAssetImageGenerator` 30 thumbs overview → scrub slider + filmstrip tap/move → `Mark In = playhead`, `Mark Out = playhead` (target duration), presets 0.3/0.5/1/2, loop preview, `BoomerangMaker`.
- **Keyboard:** `Space` play/pause, `←`/`→` skip, `L` cycle lyrics (ignored on `enhancedLRC`/`cluster`).

---

## 8. Build & Run

```bash
# Requirements: macOS 15+, Xcode 15+, Python 3.10+
xed Cella.xcodeproj
# SPM packages: SPFKTempo, SPFKMusicalAnalysis, SPFKLoudness, SPFKAudioBase
# Build:
xcodebuild -project Cella.xcodeproj -scheme Cella -configuration Debug build
# Run: Product → Run in Xcode
```

Python deps (if using OpenMix):
```bash
pip install librosa scipy numpy soundfile audioread
```

---

## 9. Caveats & Notes

- `.cella` extension is mandatory for import; `ConfigView.selectFolder` validates.
- `AVPlayerView` video gravity `.resizeAspectFill`, muted, loops via `AVQueuePlayer` or single `AVPlayer`; `CmaBackgroundLayer` isolated so volume UI doesn't re-render video (no `drawingGroup` on `AVPlayerLayer`).
- `FilmstripGenerator` uses `AVAssetImageGenerator` with `.zero` tolerance for frame accuracy; windowed `start/end` for dense thumbs.
- `LrcParser` regex `\[(\d{2}):(\d{2})\.?(\d{0,3})\]` with 3-digit padded fraction.

---

## 10. File Map

See §5 for full file map. Entry points: `CellaApp.swift` → `ContentView.swift` → `PlayerViewModel` → `MixAudioEngine` / `OpenMixBridge`.

---

*Generated 2026-08-29 — from current checkout at `/Users/admin/Downloads/Cella`.*
