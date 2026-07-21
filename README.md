# Cella Landing Page

> **macOS music player with AI-powered automix** — analyzes BPM, key, and vocals; orders tracks intelligently; crossfades with beat alignment and vocal preservation.

---

## ✨ Features

- **Smart automix** — TSP-optimized track ordering via compatibility scoring (key, energy, tempo, vocals, spectral)
- **Beat-aligned crossfades** — dynamic bar-quantized duration, gradual tempo sync, vocal-aware ducking
- **On-device analysis** — BPM (spfk-tempo), key signature (spfk-musical-analysis), LUFS loudness (spfk-loudness)
- **Vocal preservation** — detects vocal activity, avoids cutting phrases during transitions, adapts ducking strategy
- **9×5 dot matrix display** — mood-driven animations (5 moods × 4 frames), text scroller, pixel font
- **Procedural line visualizer** — Catmull-Rom path with energy-reactive trail + drifting stars
- **EPUB reader** — sentence-by-sentence with progress tracking, cover art, water reminder timer
- **8 audio profiles** — Flat, Bose, Sony, Apple, Sennheiser, Beats, JBL, AKG (EQ presets)
- **macOS native** — fullscreen, hidden title bar, keyboard shortcuts, remote command center
- **Dark / Light themes** — warm orange accent (#FF8038)

---

## 🏗 Architecture

```
CellaApp                     ← @main, fullscreen, hidden title bar
└── ContentView              ← root, tabs + keyboard shortcuts
    ├── TopTabBar            ← pill-style tab bar (scroll/drag switching)
    ├── FeedsView            ← EPUB reader + water reminder + mini player
    ├── CellaView            ← main player UI
    │   ├── EmotionScreenView  ← 21:9 dark container
    │   │   └── DotMatrixView  ← 9×5 dot grid renderer
    │   └── PlayerIndicatorView ← status text
    └── ConfigView           ← folder import + analysis progress
```

## 📦 Dependencies

| Package | Purpose |
|---------|---------|
| `spfk-tempo` | BPM detection |
| `spfk-musical-analysis` | Key detection |
| `spfk-loudness` | LUFS measurement |
| `spfk-audiobase` | Shared audio types |
| `Accelerate` | System DSP framework (FFT, vDSP, BLAS) |
| `EPUBKit` | EPUB parsing |

---

## 🎵 Supported Audio Formats

`mp3`, `wav`, `m4a`, `flac`, `aac`, `caf`, `ogg`, `aif`

File naming: `Artist - Title.ext` → parsed into artist/title metadata.

---

## 🎨 Themes

| Token | Dark | Light |
|-------|------|-------|
| Background | `#0D0D0D` | `#FFFFFF` |
| Screen | `#231A16` | `#F5F0EB` |
| Tab bar | `#231A16` | `#F5F0EB` |
| Active dot | `#FF8038` | `#FF8038` |
| Inactive dot | `#3E2D24` | `#D4C5B8` |
| Text primary | `#D9D9D9` | `#2D1F17` |

---

## 📄 File Format

| Section | Example |
|---------|---------|
| Track file | `Artist - Title.mp3` |
| EPUB library | `~/Library/Application Support/CellaBooks/library.json` |
| Book covers | `~/Library/Application Support/CellaBooks/*_cover.*` |

---

## 🔧 Build

Open `Cella.xcodeproj` in Xcode 15+. SPM dependencies resolve automatically.

```bash
xed Cella.xcodeproj
```

---

## 📝 License

MIT
