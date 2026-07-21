import { motion } from "framer-motion";

const entrance = {
  initial: { filter: "blur(10px)", opacity: 0, y: 24 },
  whileInView: { filter: "blur(0px)", opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
};

const PROFILES = ["Flat", "Bose", "Sony", "Apple", "Sennheiser", "Beats", "JBL", "AKG"];
const FORMATS = ["mp3", "wav", "m4a", "flac", "aac", "caf", "ogg", "aif"];

const SHORTCUTS: { key: string; label: string; desc: string }[] = [
  { key: "␣", label: "Space", desc: "Play / pause" },
  { key: "←", label: "Left", desc: "Skip back — seek within 3 s, else previous" },
  { key: "→", label: "Right", desc: "Crossfade to next track" },
];

export function BeyondMix() {
  return (
    <section className="relative overflow-hidden bg-vinyl-ink text-vinyl-bone">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(900px 500px at 88% 100%, rgba(255,128,56,0.08), transparent 60%)",
        }}
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 vinyl-grain opacity-25" />

      <div className="relative z-10 mx-auto max-w-6xl px-6 pb-32 md:px-10 lg:px-12">
        <motion.div
          {...entrance}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="grid grid-cols-1 items-end gap-6 border-b border-vinyl-bone/10 pb-10 md:grid-cols-12"
        >
          <div className="md:col-span-8">
            <div className="font-body text-[11px] font-semibold uppercase tracking-[0.24em] text-vinyl-ember">
              // Beyond the Mix
            </div>
            <h2 className="font-heading mt-4 text-5xl italic leading-[0.95] tracking-[-0.03em] text-vinyl-bone md:text-7xl">
              A record player, <span className="text-vinyl-ember">reimagined.</span>
            </h2>
          </div>
          <p className="font-body max-w-md text-sm leading-relaxed text-vinyl-bone/60 md:col-span-4">
            Three tabs. Feeds for reading, Cella for listening, Config for the library.
            Fullscreen, keyboard-first, native on Apple Silicon.
          </p>
        </motion.div>

        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-6 md:gap-5">
          {/* Feeds tab */}
          <motion.article
            {...entrance}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="vinyl-tile flex flex-col rounded-[28px] p-8 md:col-span-3 md:min-h-[320px]"
          >
            <span className="font-body text-[10px] font-bold uppercase tracking-[0.24em] text-vinyl-bone/40">
              05 · Feeds
            </span>
            <h3 className="font-heading mt-4 text-3xl italic leading-[1.05] tracking-tight text-vinyl-bone md:text-4xl">
              EPUB reader, sentence by sentence.
            </h3>
            <p className="font-body mt-4 max-w-md text-sm leading-relaxed text-vinyl-bone/60">
              Read while you listen. A minimal EPUB library with progress tracking, cover art,
              a mini now-playing bar, and a gentle water reminder timer.
            </p>

            <div className="mt-auto space-y-2 pt-8">
              {[
                "A rhythm found me before I found it. It was warm, and it was patient.",
                "The needle dropped and the room, for a moment, agreed to listen.",
                "Somewhere between the verse and the chorus, an hour disappeared.",
              ].map((line, i) => (
                <p
                  key={i}
                  className="font-heading text-lg italic leading-snug text-vinyl-bone/80"
                  style={{ opacity: 1 - i * 0.28 }}
                >
                  {line}
                </p>
              ))}
            </div>
          </motion.article>

          {/* Audio profiles */}
          <motion.article
            {...entrance}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
            className="vinyl-tile flex flex-col rounded-[28px] p-8 md:col-span-3 md:min-h-[320px]"
          >
            <span className="font-body text-[10px] font-bold uppercase tracking-[0.24em] text-vinyl-bone/40">
              06 · Audio Profiles
            </span>
            <h3 className="font-heading mt-4 text-3xl italic leading-[1.05] tracking-tight text-vinyl-bone md:text-4xl">
              Eight EQ curves. One for your ears.
            </h3>
            <p className="font-body mt-4 max-w-md text-sm leading-relaxed text-vinyl-bone/60">
              Flat, plus curves tuned for Bose, Sony, Apple, Sennheiser, Beats, JBL and AKG —
              routed through spatial delay, hall reverb and a peak limiter.
            </p>

            <div className="mt-auto flex flex-wrap gap-2 pt-8">
              {PROFILES.map((p, i) => (
                <span
                  key={p}
                  className="font-body rounded-full border px-3 py-1.5 text-[11px]"
                  style={
                    i === 0
                      ? {
                          borderColor: "rgba(255,128,56,0.5)",
                          background: "rgba(255,128,56,0.12)",
                          color: "#FFB388",
                        }
                      : {
                          borderColor: "rgba(232,217,190,0.12)",
                          background: "rgba(18,16,14,0.4)",
                          color: "rgba(232,217,190,0.8)",
                        }
                  }
                >
                  {p}
                </span>
              ))}
            </div>
          </motion.article>

          {/* Keyboard shortcuts */}
          <motion.article
            {...entrance}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
            className="vinyl-tile flex flex-col rounded-[28px] p-8 md:col-span-3 md:min-h-[260px]"
          >
            <span className="font-body text-[10px] font-bold uppercase tracking-[0.24em] text-vinyl-bone/40">
              07 · Keyboard-first
            </span>
            <h3 className="font-heading mt-4 text-3xl italic leading-[1.05] tracking-tight text-vinyl-bone md:text-4xl">
              Three keys. Full control.
            </h3>

            <ul className="mt-6 space-y-3">
              {SHORTCUTS.map((s) => (
                <li key={s.label} className="flex items-center gap-4">
                  <kbd className="font-heading flex h-10 w-10 items-center justify-center rounded-lg border border-vinyl-bone/15 bg-vinyl-ink/60 text-lg italic text-vinyl-bone shadow-[inset_0_1px_0_rgba(232,217,190,0.08)]">
                    {s.key}
                  </kbd>
                  <div>
                    <div className="font-body text-[10px] font-bold uppercase tracking-[0.24em] text-vinyl-bone/40">
                      {s.label}
                    </div>
                    <div className="font-body text-sm text-vinyl-bone/80">{s.desc}</div>
                  </div>
                </li>
              ))}
            </ul>
          </motion.article>

          {/* Formats */}
          <motion.article
            {...entrance}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="vinyl-tile flex flex-col rounded-[28px] p-8 md:col-span-3 md:min-h-[260px]"
          >
            <span className="font-body text-[10px] font-bold uppercase tracking-[0.24em] text-vinyl-bone/40">
              08 · Library
            </span>
            <h3 className="font-heading mt-4 text-3xl italic leading-[1.05] tracking-tight text-vinyl-bone md:text-4xl">
              Drop a folder. Cella takes it from there.
            </h3>
            <p className="font-body mt-4 max-w-md text-sm leading-relaxed text-vinyl-bone/60">
              Point at any folder. Files named{" "}
              <span className="font-heading italic text-vinyl-bone/90">Artist — Title</span>{" "}
              are parsed automatically.
            </p>

            <div className="mt-auto flex flex-wrap gap-2 pt-6">
              {FORMATS.map((f) => (
                <span
                  key={f}
                  className="font-heading rounded-md border border-vinyl-bone/10 bg-vinyl-ink/40 px-2.5 py-1 text-sm italic text-vinyl-bone/85"
                >
                  .{f}
                </span>
              ))}
            </div>
          </motion.article>
        </div>
      </div>
    </section>
  );
}
