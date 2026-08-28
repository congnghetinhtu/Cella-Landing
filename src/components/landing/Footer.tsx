import { motion } from "framer-motion";
import { GitHubIcon, ArrowUpRight } from "./icons";

const entrance = {
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
};

const REPO = "https://github.com/congnghetinhtu/Cella";

function Screws() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-4 z-10">
      <span className="screw absolute left-0 top-0" />
      <span className="screw absolute right-0 top-0" />
      <span className="screw absolute bottom-0 left-0" />
      <span className="screw absolute bottom-0 right-0" />
    </div>
  );
}

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-desk-ink text-desk-metal">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(1100px 640px at 50% 0%, rgba(255,128,56,0.08), transparent 60%), radial-gradient(800px 480px at 100% 100%, rgba(127,217,107,0.04), transparent 60%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-6 py-24 md:px-10 md:py-32 lg:px-12">
        <motion.div
          {...entrance}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="plate sweep relative overflow-hidden rounded-lg px-8 py-16 text-center md:px-16 md:py-20"
        >
          <Screws />
          <div className="relative z-0">
            <div className="flex items-center justify-center gap-2.5">
              <span className="led led-lime" />
              <span className="placard">Open source · MIT</span>
            </div>
            <h2 className="mx-auto mt-6 max-w-2xl font-display text-4xl leading-[1.06] tracking-[-0.01em] text-desk-metal md:text-6xl">
              Clone it. Remix it.
              <span className="text-desk-hot"> Make it yours.</span>
            </h2>
            <p className="mx-auto mt-6 max-w-xl font-body text-[15px] leading-relaxed text-desk-faint">
              Cella is open source under the MIT license. Fork the repo, file an
              issue, or lift the OpenMix engine as a starting point for your own
              native audio experiments.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href={REPO}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 rounded-lg bg-desk-metal px-6 py-3.5 font-body text-sm font-semibold uppercase tracking-[0.15em] text-desk-ink transition-transform hover:bg-white active:scale-[0.98]"
              >
                <GitHubIcon className="h-4 w-4" />
                Clone on GitHub
                <span className="hidden font-mono text-[10px] font-normal normal-case tracking-normal text-desk-ink/60 sm:inline">
                  congnghetinhtu/Cella
                </span>
              </a>
              <a
                href={REPO}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-desk-hair bg-desk-panel/50 px-5 py-3.5 font-body text-sm font-medium text-desk-metal transition-colors hover:border-desk-metal/30 hover:text-white"
              >
                <ArrowUpRight className="h-4 w-4" />
                Get Cella
              </a>
            </div>

            <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.24em] text-desk-faint">
              MIT license · SwiftUI + Python · macOS 15+
            </p>
          </div>
        </motion.div>

        <motion.div
          {...entrance}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
          className="mt-16"
        >
          <div className="grille-h" />
          <div className="flex flex-col items-center justify-between gap-6 pt-8 md:flex-row">
            <div className="flex items-center gap-3">
              <span className="font-display text-xl tracking-[0.3em] text-desk-metal">
                CELL<span className="text-desk-hot">A</span>
              </span>
              <span className="placard">Automix music player</span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8">
              <a
                href={REPO}
                target="_blank"
                rel="noopener noreferrer"
                className="font-body text-sm text-desk-faint transition-colors hover:text-desk-metal"
              >
                GitHub
              </a>
              <a
                href={`${REPO}/blob/main/LICENSE`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-body text-sm text-desk-faint transition-colors hover:text-desk-metal"
              >
                License
              </a>
              <a
                href={`${REPO}/issues`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-body text-sm text-desk-faint transition-colors hover:text-desk-metal"
              >
                Issues
              </a>
            </div>
            <span className="font-mono text-[11px] text-desk-faint">
              © {new Date().getFullYear()} Cella · Thanh Solar NEXT · MIT
            </span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}