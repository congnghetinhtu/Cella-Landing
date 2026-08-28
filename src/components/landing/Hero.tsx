import { motion } from "framer-motion";
import { LineAnimation } from "./LineAnimation";
import { Navbar } from "./Navbar";
import { ArrowUpRight } from "./icons";
import { MIX } from "./desk";

const REPO = "https://github.com/congnghetinhtu/Cella";

function Screws() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-3 z-10">
      <span className="screw absolute left-0 top-0" />
      <span className="screw absolute right-0 top-0" />
      <span className="screw absolute bottom-0 left-0" />
      <span className="screw absolute bottom-0 right-0" />
    </div>
  );
}

function RulerLine() {
  const bars = Array.from({ length: 11 }, (_, i) => i + 1);
  return (
    <div className="w-full">
      <div className="flex items-end gap-[3px]">
        {bars.map((b) => {
          const active = b >= 6 && b <= 7;
          const alt = b === 5 || b === 8;
          return (
            <span
              key={b}
              aria-hidden
              className={
                active
                  ? "h-7 w-[10px] rounded-[2px] bg-desk-hot shadow-[0_0_10px_rgba(255,128,56,0.55)]"
                  : alt
                    ? "h-7 w-[10px] rounded-[2px] border border-dashed border-desk-amber/50"
                    : "h-7 w-[10px] rounded-[2px] bg-desk-metal/12"
              }
            />
          );
        })}
      </div>
      <div className="mt-3 flex items-center justify-between font-mono text-[9px] tracking-[0.18em] text-desk-faint">
        <span>Bar-quantized</span>
        <span>T+2.0 s · equal-power S</span>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section
      id="player"
      className="relative overflow-hidden bg-desk-room text-desk-metal"
    >
      <Navbar />
      {/* room light */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(1100px 640px at 84% 4%, rgba(255,128,56,0.13), transparent 60%), radial-gradient(900px 640px at 6% 96%, rgba(127,217,107,0.06), transparent 60%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-6 pb-20 pt-36 md:px-10 md:pb-28 md:pt-44 lg:px-12">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-12 md:gap-8">
          {/* Left: the speech */}
          <div className="md:col-span-6 lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.08 }}
              className="flex items-center gap-3"
            >
              <span className="led led-amber" />
              <span className="placard">Cella · OpenMix · macOS 15+</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.16 }}
              className="mt-7 font-display text-[42px] leading-[1.04] tracking-[-0.01em] text-desk-metal md:text-[52px] lg:text-[60px]"
            >
              Your library,
              <br />
              mixed like
              <br />
              a <span className="text-desk-hot">live set.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.28 }}
              className="mt-8 max-w-[62ch] font-body text-[15px] leading-relaxed text-desk-faint md:text-base"
            >
              Cella reads BPM, key, energy, and vocals on every track — then the
              OpenMix engine beat-matches the crossfades so nothing ever lands on
              top of a lyric. Drop a folder in. The desk does the rest.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
              className="mt-10 flex flex-wrap items-center gap-3"
            >
              <a
                href={REPO}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 rounded-lg bg-desk-metal px-6 py-3.5 font-body text-sm font-semibold uppercase tracking-[0.15em] text-desk-ink transition-transform hover:bg-white active:scale-[0.98]"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-desk-lime shadow-[0_0_8px_rgba(127,217,107,0.9)]" />
                Get Cella
                <ArrowUpRight className="h-4 w-4" />
              </a>
              <a
                href={REPO}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 rounded-lg border border-desk-hair bg-desk-panel/60 px-5 py-3.5 font-body text-sm font-medium text-desk-metal transition-colors hover:border-desk-metal/30 hover:text-white"
              >
                <ArrowUpRight className="h-4 w-4" />
                Read the code
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.52 }}
              className="mt-12"
            >
              <div className="grille-h" />
              <div className="grid grid-cols-1 gap-5 pt-6 sm:grid-cols-3">
                {[
                  { k: "Engine", v: "OpenMix · Python" },
                  { k: "Chunks", v: "5 s · 44.1 kHz" },
                  { k: "Buffer", v: "3 ahead" },
                ].map((s) => (
                  <div key={s.k}>
                    <div className="placard">{s.k}</div>
                    <div className="mt-1.5 font-mono text-[13px] tracking-tight text-desk-metal">
                      {s.v}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right: the master bus */}
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut", delay: 0.34 }}
            className="md:col-span-6 lg:col-span-7"
          >
            <div className="plate sweep relative rounded-lg p-6 md:p-8">
              <Screws />

              <div className="relative z-0 flex items-center justify-between gap-4">
                <div className="flex items-center gap-2.5">
                  <span className="led led-lime" />
                  <span className="placard">Master bus · live</span>
                </div>
                <span className="font-mono text-[11px] tracking-[0.2em] text-desk-faint">
                  MIX {MIX.key} · {MIX.bpm} BPM
                </span>
              </div>

              {/* emotion screen — line stage */}
              <div className="relative mt-5 overflow-hidden rounded-md border border-desk-hair bg-desk-room/70 p-5 md:p-6">
                <div className="flex items-center justify-between">
                  <span className="placard">Emotion · line stage</span>
                  <span className="flex items-center gap-2 font-mono text-[10px] tracking-[0.16em] text-desk-faint">
                    <span className="led led-mint" />
                    SEAFOAM · {MIX.bpm} BPM
                  </span>
                </div>
                <div className="mt-5">
                  <LineAnimation size="lg" label="Emotion screen on the master bus" />
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <span className="font-display text-lg text-desk-metal">
                    Peak Energy
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-desk-faint">
                    {MIX.energy} energy · live
                  </span>
                </div>
              </div>

              {/* ballistics */}
              <div className="relative mt-4 rounded-md border border-desk-hair bg-desk-room/50 p-5">
                <div className="flex items-center justify-between">
                  <span className="placard">Ballistics</span>
                  <span className="font-mono text-[10px] tracking-[0.18em] text-desk-faint">
                    LIVE
                  </span>
                </div>
                <div className="mt-4 flex flex-col items-stretch justify-between gap-6 sm:flex-row sm:items-end">
                  <div className="grid flex-1 grid-cols-3 gap-4">
                    {[
                      { label: "L", heights: [40, 76, 52, 88, 66, 44, 78, 58, 92, 70, 50, 82, 60, 46] },
                      { label: "R", heights: [60, 80, 56, 44, 90, 62, 74, 48, 68, 40, 84, 54, 72, 50] },
                      { label: "M", heights: [50, 92, 74, 58, 86, 52, 96, 64, 80, 44, 70, 88, 56, 62] },
                    ].map((m) => (
                      <div key={m.label} className="flex flex-col gap-2">
                        <span className="placard">{m.label}</span>
                        <div className="vu w-full">
                          {m.heights.map((h, i) => (
                            <i key={i} style={{ height: `${h}%` }} />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-2.5 text-right">
                    {[
                      { k: "BPM", v: MIX.bpm },
                      { k: "KEY", v: MIX.key },
                      { k: "ENERGY", v: MIX.energy },
                    ].map((s) => (
                      <div key={s.k} className="flex items-center justify-end gap-3">
                        <span className="placard">{s.k}</span>
                        <span className="w-12 font-mono text-sm text-desk-metal">
                          {s.v}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* crossfade ruler */}
              <div className="relative mt-4 rounded-md border border-desk-hair bg-desk-room/50 p-5">
                <div className="mb-4 flex items-center justify-between">
                  <span className="placard">Crossfade</span>
                  <span className="flex items-center gap-2 font-mono text-[10px] tracking-[0.16em] text-desk-faint">
                    <span className="h-1.5 w-1.5 rounded-full bg-desk-lime shadow-[0_0_8px_rgba(127,217,107,0.9)]" />
                    VOCAL-SAFE
                  </span>
                </div>
                <RulerLine />
              </div>
            </div>

            <p className="mt-4 text-center font-mono text-[10px] uppercase tracking-[0.24em] text-desk-faint">
              Built for macOS 15 · Apple Silicon · SwiftUI + Python
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}