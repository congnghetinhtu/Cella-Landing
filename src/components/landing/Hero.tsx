import { motion } from "framer-motion";
import { DotMatrix } from "./DotMatrix";
import { Navbar } from "./Navbar";
import { ArrowUpRight, PlayIcon } from "./icons";

const entrance = {
  initial: { filter: "blur(10px)", opacity: 0, y: 20 },
  animate: { filter: "blur(0px)", opacity: 1, y: 0 },
};
const trans = (delay: number) => ({ duration: 0.8, ease: "easeOut" as const, delay });

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-vinyl-ink text-vinyl-bone">
      {/* warm vignette + grain */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(1200px 700px at 82% 8%, rgba(255,106,44,0.14), transparent 60%), radial-gradient(900px 600px at 10% 90%, rgba(42,31,23,0.9), transparent 70%)",
        }}
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0 vinyl-grain opacity-40" />

      <div className="relative z-10">
        <Navbar />

        <div className="mx-auto grid min-h-screen max-w-6xl grid-cols-1 items-center gap-10 px-6 pb-16 pt-32 md:grid-cols-12 md:gap-8 md:px-10 md:pt-40 lg:px-12">
          {/* Left: editorial column */}
          <div className="md:col-span-6 lg:col-span-6">
            <motion.div {...entrance} transition={trans(0.15)} className="flex items-center gap-3">
              <span className="h-1.5 w-1.5 rounded-full bg-vinyl-ember shadow-[0_0_10px_rgba(255,106,44,0.8)]" />
              <span className="font-body text-[11px] font-semibold uppercase tracking-[0.24em] text-vinyl-ember">
                Version 1.0 · macOS
              </span>
            </motion.div>

            <motion.h1
              {...entrance}
              transition={trans(0.3)}
              className="font-heading mt-6 text-[68px] italic leading-[0.9] tracking-[-0.03em] text-vinyl-bone md:text-[92px] lg:text-[108px]"
            >
              Automix
              <br />
              with <span className="text-vinyl-ember">human</span>
              <br />
              <span className="italic">soul.</span>
            </motion.h1>

            <motion.p
              {...entrance}
              transition={trans(0.5)}
              className="font-body mt-8 max-w-[44ch] text-base leading-relaxed text-vinyl-bone/60 md:text-lg"
            >
              The macOS engine that thinks like a DJ. Cella reads BPM, key, LUFS and vocals from
              every track — then beat-aligns the crossfade so nothing ever lands on top of a lyric.
            </motion.p>

            <motion.div
              {...entrance}
              transition={trans(0.7)}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <a
                href="https://github.com/congnghetinhtu/Cella"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full bg-vinyl-bone px-6 py-3.5 text-sm font-semibold uppercase tracking-[0.16em] text-vinyl-ink transition-transform active:scale-[0.98]"
              >
                Clone on GitHub
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <button className="inline-flex items-center gap-2 rounded-full border border-vinyl-bone/20 px-5 py-3 text-sm font-medium text-vinyl-bone/90 transition-colors hover:bg-vinyl-bone/5">
                <PlayIcon className="h-4 w-4" />
                Hear a Mix
              </button>
            </motion.div>


            <motion.div
              {...entrance}
              transition={trans(0.9)}
              className="mt-12 grid max-w-md grid-cols-3 gap-6 border-t border-vinyl-bone/10 pt-6"
            >
              {[
                { k: "Glide", v: "2s" },
                { k: "Matrix", v: "9×5" },
                { k: "Analysis", v: "22 kHz" },
              ].map((s) => (
                <div key={s.k}>
                  <div className="font-heading text-3xl italic tracking-tight text-vinyl-bone">
                    {s.v}
                  </div>
                  <div className="font-body mt-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-vinyl-bone/40">
                    {s.k}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: emotion screen tile */}
          <motion.div
            initial={{ filter: "blur(12px)", opacity: 0, y: 30 }}
            animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
            className="md:col-span-6 lg:col-span-6"
          >
            <div className="vinyl-tile relative rounded-[36px] p-8 md:p-10">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-body text-[10px] font-bold uppercase tracking-[0.24em] text-vinyl-bone/40">
                    Emotion State
                  </div>
                  <div className="font-heading mt-1 text-2xl italic text-vinyl-bone">
                    Peak Energy
                  </div>
                </div>
                <div className="flex items-center gap-2 rounded-full border border-vinyl-bone/10 px-3 py-1.5">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-vinyl-ember shadow-[0_0_8px_rgba(255,106,44,0.9)]" />
                  <span className="font-body text-[10px] font-semibold uppercase tracking-[0.2em] text-vinyl-bone/70">
                    Live
                  </span>
                </div>
              </div>

              <div className="my-10 flex items-center justify-center">
                <DotMatrix size="lg" />
              </div>

              <div className="grid grid-cols-3 gap-3">
                {[
                  { k: "BPM", v: "124.8" },
                  { k: "Key", v: "8A" },
                  { k: "LUFS", v: "−9.2" },
                ].map((s) => (
                  <div
                    key={s.k}
                    className="rounded-2xl bg-vinyl-ink/40 px-4 py-3 ring-1 ring-inset ring-vinyl-bone/5"
                  >
                    <div className="font-body text-[10px] font-bold uppercase tracking-[0.2em] text-vinyl-bone/40">
                      {s.k}
                    </div>
                    <div className="font-heading mt-1 text-2xl italic tracking-tight text-vinyl-bone">
                      {s.v}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <p className="font-body mt-4 text-center text-[11px] uppercase tracking-[0.24em] text-vinyl-bone/40">
              Built for macOS Sonoma · Apple Silicon
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
