import { motion } from "framer-motion";
import { LineAnimation } from "./LineAnimation";
import { MIX } from "./desk";

const entrance = {
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
};

const CHAIN = [
  { label: "Your .cella", sub: "folder drop" },
  { label: "OpenMix", sub: "Python · analyze + score" },
  { label: "Named pipe", sub: "float32 · 44.1 kHz" },
  { label: "Swift", sub: "chunk player · 3 ahead" },
  { label: "Out", sub: "EQ · reverb · limiter" },
];

export function Capabilities() {
  return (
    <section id="engine" className="relative overflow-hidden bg-desk-ink text-desk-metal">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(1000px 560px at 8% 0%, rgba(255,176,58,0.07), transparent 60%), radial-gradient(880px 520px at 96% 100%, rgba(127,217,107,0.05), transparent 60%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-6 py-24 md:px-10 md:py-32 lg:px-12">
        {/* header */}
        <motion.div
          {...entrance}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="grid grid-cols-1 items-end gap-8 md:grid-cols-12"
        >
          <h2 className="max-w-3xl font-display text-4xl leading-[1.06] tracking-[-0.01em] text-desk-metal md:col-span-8 md:text-6xl">
            OpenMix runs
            <br />
            the desk<span className="text-desk-hot">.</span>
          </h2>
          <p className="max-w-md font-body text-sm leading-relaxed text-desk-faint md:col-span-4">
            A Python engine analyzes and mixes in real time, streaming raw audio
            through a named pipe into a native Swift player. Every number it reads
            comes back to the screen.
          </p>
        </motion.div>

        {/* signal chain */}
        <motion.div
          {...entrance}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
          className="mt-14 flex flex-col items-stretch justify-between gap-3 md:flex-row md:items-center"
        >
          {CHAIN.map((c, i) => (
            <div key={c.label} className="contents">
              <div className="plate relative flex-1 rounded-md px-5 py-4">
                <div className="placard">{c.label}</div>
                <div className="mt-1.5 font-mono text-[11px] tracking-tight text-desk-faint">
                  {c.sub}
                </div>
              </div>
              {i < CHAIN.length - 1 && (
                <div
                  aria-hidden
                  className="flex justify-center font-mono text-lg text-desk-amber/70 md:self-center"
                >
                  →&nbsp;&nbsp;
                </div>
              )}
            </div>
          ))}
        </motion.div>

        <motion.p
          {...entrance}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.16 }}
          className="mt-4 font-body text-[13px] italic leading-relaxed text-desk-faint/90"
        >
          A named pipe just means the engine hands audio straight to the player —
          44.1 kHz, floating point, five-second chunks with three buffered ahead.
        </motion.p>

        {/* module grid */}
        <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-6">
          {/* Automix */}
          <motion.article
            {...entrance}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.12 }}
            className="plate relative rounded-lg p-7 md:col-span-3 md:p-8"
          >
            <div className="flex items-center justify-between">
              <span className="placard">Automix</span>
              <span className="led led-lime" />
            </div>
            <h3 className="mt-6 font-display text-2xl leading-tight text-desk-metal md:text-[26px]">
              Crossfades that
              <br />
              wait for the bar<span className="text-desk-hot">.</span>
            </h3>
            <p className="mt-4 max-w-md font-body text-sm leading-relaxed text-desk-faint">
              OpenMix scores every pair, picks the trigger on an optimal bar
              boundary, and rides an equal-power S-curve while vocals are ducked
              out of each other's way. The groove never breaks.
            </p>
            <ul className="mt-7 flex flex-wrap gap-2">
              {["Bar-quantized", "Vocal duck −6 dB", "Mood EQ"].map((t) => (
                <li
                  key={t}
                  className="font-mono text-[11px] tracking-[0.08em] text-desk-metal/85"
                >
                  <span className="mr-1.5 text-desk-lime">·</span>
                  {t}
                </li>
              ))}
            </ul>
          </motion.article>

          {/* Analysis */}
          <motion.article
            {...entrance}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.18 }}
            className="plate relative rounded-lg p-7 md:col-span-3 md:p-8"
          >
            <div className="flex items-center justify-between">
              <span className="placard">Analysis</span>
              <span className="led led-amber" />
            </div>
            <h3 className="mt-6 font-display text-2xl leading-tight text-desk-metal md:text-[26px]">
              Every track,
              <br />
              read before it plays<span className="text-desk-hot">.</span>
            </h3>
            <p className="mt-4 max-w-md font-body text-sm leading-relaxed text-desk-faint">
              BPM, key, energy profile, bar timestamps, and vocal activity are
              computed and streamed back to the screen — so the mix and the light
              report the same numbers.
            </p>
            <div className="mt-7 max-w-xs space-y-2">
              {[
                { k: "BPM", v: MIX.bpm },
                { k: "KEY", v: MIX.key },
                { k: "VOCAL", v: MIX.vocal },
              ].map((s) => (
                <div key={s.k} className="flex items-baseline justify-between gap-4 border-b border-desk-hair/70 pb-2">
                  <span className="placard">{s.k}</span>
                  <span className="font-mono text-[13px] text-desk-metal">{s.v}</span>
                </div>
              ))}
            </div>
          </motion.article>

          {/* Emotion screen */}
          <motion.article
            {...entrance}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.22 }}
            className="plate relative overflow-hidden rounded-lg p-7 md:col-span-3 md:p-8"
          >
            <div className="flex items-center justify-between">
              <span className="placard">Emotion screen</span>
              <span className="placard">21:9</span>
            </div>
            <div className="mt-6 flex justify-center">
              <LineAnimation size="md" label="Emotion screen" />
            </div>
            <p className="mt-6 font-body text-sm leading-relaxed text-desk-faint">
              A dot-matrix mood display and a Catmull-Rom line visualizer — a
              smooth curve through the wave's peaks — breathe with the mix; artist
              art and video behind, lyrics overlaid, a green border pulsing
              whenever the engine takes a transition.
            </p>
          </motion.article>

          {/* Dual engines */}
          <motion.article
            {...entrance}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.26 }}
            className="plate relative rounded-lg p-7 md:col-span-3 md:p-8"
          >
            <div className="flex items-center justify-between">
              <span className="placard">Two engines</span>
              <span className="led led-amber" />
            </div>
            <h3 className="mt-6 font-display text-2xl leading-tight text-desk-metal md:text-[26px]">
              Stream first.
              <br />
              Never miss a beat<span className="text-desk-hot">.</span>
            </h3>
            <p className="mt-4 max-w-md font-body text-sm leading-relaxed text-desk-faint">
              The main path plays OpenMix's freshly mixed chunks with three buffers
              ahead; a real-time AVAudioEngine path stands by with pitch, EQ,
              reverb, and a peak limiter. One glitch and the desk trades arms
              mid-bar.
            </p>
            <div className="mt-7 space-y-2">
              <div className="flex items-center gap-3 rounded-md bg-desk-room/60 px-4 py-3 ring-1 ring-inset ring-desk-hair">
                <span className="led led-lime" />
                <span className="font-mono text-[11px] tracking-[0.06em] text-desk-metal/90">
                  STREAM — OpenMix chunks · 5 s · 3-buffer
                </span>
              </div>
              <div className="flex items-center gap-3 rounded-md bg-desk-room/60 px-4 py-3 ring-1 ring-inset ring-desk-hair">
                <span className="led led-amber" />
                <span className="font-mono text-[11px] tracking-[0.06em] text-desk-metal/90">
                  FALLBACK — AVAudioEngine · EQ + reverb · limiter
                </span>
              </div>
            </div>
          </motion.article>
        </div>
      </div>
    </section>
  );
}