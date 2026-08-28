# DESIGN.md — Cella Landing (The Sound Desk)

Direction on this build: **The Sound Desk** (model-pick on the direction roll, seed `18913663`, recorded in `.impeccable/decision/`). Cella's landing reads as the mix console where OpenMix works — every feature is a module on the desk, meters alive with the engine's real numbers, the better-mix claim proven at the first viewport instead of announced.

## Direction contract

Text of the build contract currently ships inside the markup as an HTML comment, first element of `<body>` in the root layout (`src/routes/__root.tsx` → `<DirectionContract/>`, a raw-comment div). It survives production builds; `grep -rl "seed-18913663" .output` confirms it lives in the SSR router and the client bundle.

## World

- Warm charcoal room (`--color-desk-room: #171310`; ink `#100d0a`), brushed-aluminum plates (`--color-desk-panel`, hairline edges, inset ledges, hex screws), lime ballistics (`--color-desk-lime`), the product's hot-orange lamp (`--color-desk-hot`), amber accents, mono numerals (`Fragment Mono`) for every measurement, one wide industrial display face (`Michroma`) for every spoken word.
- Radii are console radii (4–8 px), not browser glass. No remnant glass skin remains (liquid-glass classes and unused BlurText/FadingVideo deleted).

## Structure and first viewport

1. **Navbar** — full-width etched bar, placard links; on mobile a second row of chip links keeps Player/Engine/Library reachable (no hamburger burial).
2. **Hero (first viewport)** — left: LED + placard (Cella · OpenMix · macOS 15+), headline "Your library, mixed like a live set.", Get Cella / Read the code, and the spec strip (Engine / Chunks / Buffer). Right: the **master-bus module** — the **emotion screen as a live line stage in the Seafoam theme** (seeded Catmull-Rom comet, mint on deep teal, energy-driven head and comet trail, drifting stars), three live **L / R / Master** VU ballistics, and the bar-quantized crossfade ruler (hot 6–7 engaged, dashed 5/8 candidates, "T+2.0 s · equal-power S").
3. **Capabilities (Engine)** — signal chain (`.cella → OpenMix → named pipe → Swift → Out`), Automix/Analysis/Emotion screen/Two engines modules. Instrument numbers come from one source of truth (`desk.ts` → `MIX`) so hero and engine never drift. Jargon is glossed in plain voice (named-pipe footnote, Catmull-Rom parenthetical).
4. **BeyondMix (Library)** — `.cella` file tree, four themes, LRC + Motion lab, keyboard shortcuts (Space / ←→ / L).
5. **Footer (close)** — Clone on GitHub / Get Cella, MIT, © Thanh Solar NEXT.

## Behaviour

- Motion entrances are framer-motion `whileInView` (poetic, staggered, `viewport.once`).
- The **emotion screen runs the product's own LineAnimation** (`src/components/landing/LineAnimation.tsx`, port of `LineAnimationView.swift`): a seeded Catmull-Rom spline, 8-segment comet trail with energy-driven head speed and trail length, seam-safe wrap splitting, floating twinkle stars seeded per track, a faint idle full-curve backdrop, IntersectionObserver offscreen pause, and a glowing head marker.
- `prefers-reduced-motion: reduce` disables the VU, sweep, comet, and star motion; the stage settles into its calm idle curve.
- Body/html render the room colour so overscroll never flashes white.

## Seafoam theme

Seafoam is one of the app's four looks (Dark, Light, **Seafoam**, Brat — see the themes rack in BeyondMix). On the landing, Seafoam stops being a swatch and becomes a room: the master-bus emotion stage is deep teal (`--color-seafoam-ink → --color-seafoam-deep`) lit by the mint comet (`--color-seafoam: #93e9be`), with its own mint lamp (`led-mint`). Every motion number on the stage still comes from `desk.ts` (`124.8 BPM`, `82%` energy).

## Finish review

Dual-agent finish review (A: design, B: detector+browser). Detector (regex engine): **clean** over `src/components/landing` + `styles.css`; the HTML-grade parser rules are unavailable (missing htmlparser2/css-select — undercount, not clean bill). A scored 16/24 (heuristics 5/7/9/10 `n/a` on a one-pager, ~67% = Good).

Fixed in the finish pass, one batch:
- `<Navbar/>` was imported but never mounted — now rendered; mobile second row added.
- Three VU meters (L/R/Master) replace the single spectrum ladder per the direction brief.
- Console radii everywhere; glass pill nav → etched desk bar.
- Reduced-motion + offscreen pause for all continuous animation.
- "Explore the repo" → "Read the code" (+ icon swap); dead glass/BlurText/FadingVideo removed.
- Instrument constants centralized in `desk.ts`; jargon glossed; mobile spec strip stacks; body charcoal.

**Verdict: direction met.** Desk grammar is cohesive and product-specific; remaining honest gaps are polish (sweep has no state behind it, some spec density at first viewport for first-timers) — deliberate trade, not regression. Screenshot rasters: see `.impeccable/review3/provenance.md`.

## Evidence

- Decision payload: `.impeccable/decision-payload.json`; challenge boards: `.impeccable/mocks/quality/`.
- Critique snapshot: `.impeccable/critique/`.
- Product truth source of record: `PRODUCT.md` (from `Cella-Documentation.md`).