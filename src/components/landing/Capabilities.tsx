import { motion } from "framer-motion";
import { DotMatrix } from "./DotMatrix";

const entrance = {
  initial: { filter: "blur(10px)", opacity: 0, y: 24 },
  whileInView: { filter: "blur(0px)", opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
};

const PARTNERS = ["spfk-tempo", "spfk-musical-analysis", "spfk-loudness", "Accelerate", "EPUBKit"];

export function Capabilities() {
  return (
    <section className="relative overflow-hidden bg-vinyl-ink text-vinyl-bone">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(1000px 600px at 12% 0%, rgba(255,106,44,0.08), transparent 60%)",
        }}
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 vinyl-grain opacity-30" />

      <div className="relative z-10 mx-auto max-w-6xl px-6 py-24 md:px-10 md:py-32 lg:px-12">
        {/* Section header */}
        <motion.div
          {...entrance}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="grid grid-cols-1 items-end gap-6 border-b border-vinyl-bone/10 pb-10 md:grid-cols-12"
        >
          <div className="md:col-span-8">
            <div className="font-body text-[11px] font-semibold uppercase tracking-[0.24em] text-vinyl-ember">
              // Inside the Engine
            </div>
            <h2 className="font-heading mt-4 text-5xl italic leading-[0.95] tracking-[-0.03em] text-vinyl-bone md:text-7xl">
              Mixing, <span className="text-vinyl-ember">engineered.</span>
            </h2>
          </div>
          <p className="font-body max-w-md text-sm leading-relaxed text-vinyl-bone/60 md:col-span-4">
            A Swift actor pipeline analyses, orders and blends your library —
            harmonic-aware, vocal-safe, quantized to the bar.
          </p>
        </motion.div>

        {/* Bento grid */}
        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-6 md:gap-5">
          {/* Track Analysis — wide */}
          <motion.article
            {...entrance}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="vinyl-tile relative flex flex-col rounded-[28px] p-8 md:col-span-4 md:min-h-[340px]"
          >
            <div className="flex items-center justify-between">
              <span className="font-body text-[10px] font-bold uppercase tracking-[0.24em] text-vinyl-bone/40">
                01 · Track Analysis
              </span>
              <span className="font-body rounded-full border border-vinyl-bone/10 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-vinyl-bone/60">
                mono · 22 kHz
              </span>
            </div>
            <h3 className="font-heading mt-6 max-w-md text-4xl italic leading-[1] tracking-tight text-vinyl-bone md:text-5xl">
              BPM, Camelot key, LUFS &amp; vocal boundaries.
            </h3>
            <p className="font-body mt-5 max-w-lg text-sm leading-relaxed text-vinyl-bone/60">
              A Swift actor runs concurrent analysis on every file — tempo, key, integrated
              loudness, structure, and vocal activity — downsampled for speed without losing
              the detail the engine needs.
            </p>
            <div className="mt-auto flex flex-wrap gap-2 pt-8">
              {["BPM", "Camelot", "LUFS", "Vocals", "Structure"].map((t) => (
                <span
                  key={t}
                  className="font-body rounded-full border border-vinyl-bone/10 bg-vinyl-ink/30 px-3 py-1.5 text-[11px] text-vinyl-bone/80"
                >
                  {t}
                </span>
              ))}
            </div>
          </motion.article>

          {/* Emotion screen */}
          <motion.article
            {...entrance}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
            className="vinyl-tile flex flex-col items-center justify-between rounded-[28px] p-8 md:col-span-2 md:min-h-[340px]"
          >
            <div className="w-full">
              <div className="font-body text-[10px] font-bold uppercase tracking-[0.24em] text-vinyl-bone/40">
                02 · Emotion Screen
              </div>
              <div className="font-heading mt-1 text-xl italic text-vinyl-bone">9×5 Grid</div>
            </div>
            <div className="my-4">
              <DotMatrix size="md" intervalMs={2200} />
            </div>
            <p className="font-body w-full text-left text-xs leading-relaxed text-vinyl-bone/55">
              A dot-matrix display that breathes with the mix — energy, mood and transition state
              in one glance.
            </p>
          </motion.article>

          {/* Optimal Ordering */}
          <motion.article
            {...entrance}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
            className="vinyl-tile flex flex-col rounded-[28px] p-8 md:col-span-3 md:min-h-[300px]"
          >
            <span className="font-body text-[10px] font-bold uppercase tracking-[0.24em] text-vinyl-bone/40">
              03 · Optimal Ordering
            </span>
            <h3 className="font-heading mt-4 text-3xl italic leading-[1.05] tracking-tight text-vinyl-bone md:text-4xl">
              TSP heuristic. Refined by 2-opt.
            </h3>
            <p className="font-body mt-4 max-w-md text-sm leading-relaxed text-vinyl-bone/60">
              MixEngine scores every pair on five weighted axes, then solves the set with
              nearest-insertion TSP and a 2-opt refinement.
            </p>

            {/* Weighted compatibility axes */}
            <div className="mt-auto space-y-2 pt-6">
              {[
                { k: "Key", v: 30 },
                { k: "Energy", v: 26 },
                { k: "Tempo", v: 22 },
                { k: "Vocal", v: 12 },
                { k: "Spectral", v: 10 },
              ].map((s) => (
                <div key={s.k} className="flex items-center gap-3">
                  <span className="font-body w-16 text-[10px] font-bold uppercase tracking-[0.2em] text-vinyl-bone/50">
                    {s.k}
                  </span>
                  <span className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-vinyl-bone/10">
                    <span
                      className="absolute inset-y-0 left-0 rounded-full"
                      style={{
                        width: `${s.v}%`,
                        background: "linear-gradient(90deg, #FF8038, rgba(255,128,56,0.35))",
                      }}
                    />
                  </span>
                  <span className="font-heading w-8 text-right text-sm italic text-vinyl-bone/80">
                    {s.v}%
                  </span>
                </div>
              ))}
            </div>
          </motion.article>

          {/* Beat aligned crossfade */}
          <motion.article
            {...entrance}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="vinyl-tile flex flex-col rounded-[28px] p-8 md:col-span-3 md:min-h-[300px]"
          >
            <span className="font-body text-[10px] font-bold uppercase tracking-[0.24em] text-vinyl-bone/40">
              04 · Beat-Aligned Crossfade
            </span>
            <h3 className="font-heading mt-4 text-3xl italic leading-[1.05] tracking-tight text-vinyl-bone md:text-4xl">
              Bar-quantized. Vocal-safe.
            </h3>
            <p className="font-body mt-4 max-w-md text-sm leading-relaxed text-vinyl-bone/60">
              Dual AVAudioEngine players trigger on optimal bar boundaries, glide tempo with a
              smoothstep ramp, and duck vocals so no lyric ever lands on top of another.
            </p>
            <div className="mt-auto grid grid-cols-2 gap-3 pt-6">
              {[
                { k: "Glide", v: "2.0 s" },
                { k: "Ducking", v: "−6 dB" },
                { k: "Quantize", v: "1 bar" },
                { k: "Blend", v: "Spectral" },
              ].map((s) => (
                <div
                  key={s.k}
                  className="rounded-xl bg-vinyl-ink/40 px-3 py-2 ring-1 ring-inset ring-vinyl-bone/5"
                >
                  <div className="font-body text-[9px] font-bold uppercase tracking-[0.2em] text-vinyl-bone/40">
                    {s.k}
                  </div>
                  <div className="font-heading text-xl italic text-vinyl-bone">{s.v}</div>
                </div>
              ))}
            </div>
          </motion.article>
        </div>

        {/* Footer strip */}
        <motion.div
          {...entrance}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
          className="mt-16 flex flex-col items-center gap-6 border-t border-vinyl-bone/10 pt-10"
        >
          <span className="font-body rounded-full border border-vinyl-bone/10 px-4 py-1.5 text-[11px] uppercase tracking-[0.24em] text-vinyl-bone/60">
            Built on Apple audio frameworks &amp; open-source DSP
          </span>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3 md:gap-x-14">
            {PARTNERS.map((p) => (
              <span
                key={p}
                className="font-heading text-2xl italic tracking-tight text-vinyl-bone/70 md:text-3xl"
              >
                {p}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
