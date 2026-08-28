import { motion } from "framer-motion";

const entrance = {
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
};

const PROFILES = ["Flat", "Bose", "Sony", "AirPods Max"];
const THEMES = [
  { name: "Dark", hex: "#0d0b09", ring: "rgba(230,221,201,0.28)" },
  { name: "Light", hex: "#e8e0d0", ring: "rgba(16,13,10,0.25)" },
  { name: "Seafoam", hex: "#0d1f1c", ring: "rgba(127,217,107,0.45)" },
  { name: "Brat", hex: "#1c1a13", ring: "rgba(127,217,107,0.35)" },
];

const KEYS = [
  { key: "Space", label: "Play / pause" },
  { key: "← →", label: "Skip · seek · next track" },
  { key: "L", label: "Cycle lyrics" },
];

export function BeyondMix() {
  return (
    <section id="library" className="relative overflow-hidden bg-desk-ink text-desk-metal">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(900px 560px at 90% 0%, rgba(255,128,56,0.07), transparent 60%), radial-gradient(800px 520px at 4% 100%, rgba(255,176,58,0.05), transparent 60%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-6 pb-32 md:px-10 lg:px-12">
        {/* header */}
        <motion.div
          {...entrance}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="grid grid-cols-1 items-end gap-8 md:grid-cols-12"
        >
          <h2 className="max-w-3xl font-display text-4xl leading-[1.06] tracking-[-0.01em] text-desk-metal md:col-span-8 md:text-6xl">
            More on
            <br />
            the desk<span className="text-desk-hot">.</span>
          </h2>
          <p className="max-w-md font-body text-sm leading-relaxed text-desk-faint md:col-span-4">
            A player, a lyrics lab, a boomerang maker, and a library format that
            keeps your folders yours — all four looks, four EQ curves, three keys
            to run it.
          </p>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-6">
          {/* Library format */}
          <motion.article
            {...entrance}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.12 }}
            className="plate relative rounded-lg p-7 md:col-span-3 md:p-8"
          >
            <div className="flex items-center justify-between">
              <span className="placard">Your library</span>
              <span className="led led-lime" />
            </div>
            <h3 className="mt-6 font-display text-2xl leading-tight text-desk-metal md:text-[26px]">
              One folder.
              <br />
              Cella takes it from there<span className="text-desk-hot">.</span>
            </h3>
            <p className="mt-4 max-w-md font-body text-sm leading-relaxed text-desk-faint">
              Point at any playlist folder. Artwork and lyrics ride inside —
              <span className="font-mono text-[12px] text-desk-metal/90"> Artist — Title.mp3</span>{" "}
              is parsed and matched automatically.
            </p>
            <div className="mt-7 rounded-md bg-desk-room/70 p-4 font-mono text-[11px] leading-[1.9] tracking-tight text-desk-faint ring-1 ring-inset ring-desk-hair">
              <div className="text-desk-lime">MIXSET.cella/</div>
              <div className="pl-4">
                MIXSET.ca <span className="text-desk-faint/70">← index</span>
              </div>
              <div className="pl-4">cma/ · album A/ · album B/</div>
              <div className="pl-8">01 - Track.mp3</div>
              <div className="pl-8">lrc/01 - Track.lrc</div>
            </div>
          </motion.article>

          {/* Looks + EQ */}
          <motion.article
            {...entrance}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.18 }}
            className="plate relative rounded-lg p-7 md:col-span-3 md:p-8"
          >
            <div className="flex items-center justify-between">
              <span className="placard">Looks · Ears</span>
              <span className="led led-amber" />
            </div>
            <h3 className="mt-6 font-display text-2xl leading-tight text-desk-metal md:text-[26px]">
              Four rooms.
              <br />
              Four curves<span className="text-desk-hot">.</span>
            </h3>
            <p className="mt-4 max-w-md font-body text-sm leading-relaxed text-desk-faint">
              Dark, light, seafoam, brat — with system or forced theme. EQ shapes
              tuned for the commonest cans, ten bands deep.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              {THEMES.map((t) => (
                <span
                  key={t.name}
                  className="flex items-center gap-2 rounded-full border border-desk-hair px-3 py-1.5"
                  title={t.name}
                >
                  <span
                    className="h-3.5 w-3.5 rounded-full"
                    style={{ background: t.hex, boxShadow: `0 0 0 1px ${t.ring}` }}
                  />
                  <span className="font-mono text-[10px] tracking-[0.14em] text-desk-faint">
                    {t.name.toUpperCase()}
                  </span>
                </span>
              ))}
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {PROFILES.map((p) => (
                <span
                  key={p}
                  className="rounded-lg border border-desk-hair px-2.5 py-1 font-mono text-[10px] tracking-[0.1em] text-desk-metal/85"
                >
                  {p}
                </span>
              ))}
            </div>
          </motion.article>

          {/* Lyrics + motion lab */}
          <motion.article
            {...entrance}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.22 }}
            className="plate relative rounded-lg p-7 md:col-span-4 md:p-8"
          >
            <div className="flex items-center justify-between">
              <span className="placard">Labs</span>
              <span className="placard">LRC · Motion</span>
            </div>
            <h3 className="mt-6 max-w-lg font-display text-2xl leading-tight text-desk-metal md:text-[26px]">
              Stamped lyrics,
              <br />
              looped moments<span className="text-desk-hot">.</span>
            </h3>
            <p className="mt-4 max-w-xl font-body text-sm leading-relaxed text-desk-faint">
              An enhanced LRC editor slows playback to 0.25×–2×, taps timestamps
              into place, and keeps fifty steps of undo. The Motion lab turns any
              clip into a mark-based boomerang at 0.3, 0.5, 1, or 2 seconds.
            </p>
            <div className="mt-7 grid grid-cols-2 gap-3">
              <div className="rounded-md bg-desk-room/60 px-4 py-3 ring-1 ring-inset ring-desk-hair">
                <div className="placard">LRC editor</div>
                <div className="mt-1.5 font-mono text-[11px] tracking-[0.06em] text-desk-metal/90">
                  0.25–2× · tap-stamp · undo 50
                </div>
              </div>
              <div className="rounded-md bg-desk-room/60 px-4 py-3 ring-1 ring-inset ring-desk-hair">
                <div className="placard">Motion</div>
                <div className="mt-1.5 font-mono text-[11px] tracking-[0.06em] text-desk-metal/90">
                  boomerang · 0.3/0.5/1/2 s
                </div>
              </div>
            </div>
          </motion.article>

          {/* Keyboard */}
          <motion.article
            {...entrance}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.26 }}
            className="plate relative rounded-lg p-7 md:col-span-2 md:p-8"
          >
            <div className="flex items-center justify-between">
              <span className="placard">Keyboard</span>
              <span className="led led-dim" />
            </div>
            <h3 className="mt-6 font-display text-xl leading-tight text-desk-metal">
              Three keys.
              <br />
              Full control<span className="text-desk-hot">.</span>
            </h3>
            <ul className="mt-6 space-y-3.5">
              {KEYS.map((k) => (
                <li key={k.key} className="flex items-center gap-3">
                  <kbd className="flex h-9 min-w-9 items-center justify-center gap-1 rounded-md border border-desk-hair bg-desk-room/70 px-2.5 font-mono text-[13px] tracking-[0.12em] text-desk-metal shadow-[inset_0_1px_0_rgba(230,221,201,0.08)]">
                    {k.key}
                  </kbd>
                  <span className="font-body text-[12px] leading-snug text-desk-faint">
                    {k.label}
                  </span>
                </li>
              ))}
            </ul>
          </motion.article>
        </div>
      </div>
    </section>
  );
}