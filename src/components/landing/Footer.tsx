import { motion } from "framer-motion";
import { GitHubIcon } from "./icons";

const entrance = {
  initial: { filter: "blur(10px)", opacity: 0, y: 24 },
  whileInView: { filter: "blur(0px)", opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
};

const REPO = "https://github.com/congnghetinhtu/Cella";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-vinyl-ink text-vinyl-bone">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(1200px 700px at 50% 0%, rgba(255,128,56,0.10), transparent 60%)",
        }}
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 vinyl-grain opacity-25" />

      <div className="relative z-10 mx-auto max-w-6xl px-6 py-24 md:px-10 md:py-32 lg:px-12">
        <motion.div
          {...entrance}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="vinyl-tile flex flex-col items-center rounded-[36px] px-8 py-16 text-center md:px-16 md:py-20"
        >
          <div className="font-body text-[11px] font-semibold uppercase tracking-[0.24em] text-vinyl-ember">
            // Open Source
          </div>
          <h2 className="font-heading mt-4 max-w-2xl text-5xl italic leading-[0.95] tracking-[-0.03em] text-vinyl-bone md:text-7xl">
            Clone it. Remix it. <span className="text-vinyl-ember">Make it yours.</span>
          </h2>
          <p className="font-body mt-6 max-w-xl text-base leading-relaxed text-vinyl-bone/60">
            Cella is open source under the MIT license. Fork the repo, file an issue, or use the
            engine as a starting point for your own native audio experiments.
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
            <a
              href={REPO}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2.5 rounded-full bg-vinyl-bone px-6 py-3.5 text-sm font-semibold uppercase tracking-[0.16em] text-vinyl-ink transition-transform active:scale-[0.98]"
            >
              <GitHubIcon className="h-4 w-4" />
              Clone on GitHub
              <span className="font-body text-[10px] font-medium normal-case tracking-normal opacity-60">
                congnghetinhtu/Cella
              </span>
            </a>
            <span className="font-body text-[11px] uppercase tracking-[0.24em] text-vinyl-bone/40">
              MIT License · SwiftUI · macOS
            </span>
          </div>
        </motion.div>

        <motion.div
          {...entrance}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
          className="mt-16 flex flex-col items-center justify-between gap-6 border-t border-vinyl-bone/10 pt-10 md:flex-row"
        >
          <div className="flex items-center gap-3">
            <span className="font-heading text-2xl italic text-vinyl-bone">cella</span>
            <span className="font-body text-[10px] uppercase tracking-[0.2em] text-vinyl-bone/40">
              Automix music player
            </span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8">
            <a
              href={REPO}
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-sm text-vinyl-bone/60 transition-colors hover:text-vinyl-bone"
            >
              GitHub
            </a>
            <a
              href={`${REPO}/blob/main/LICENSE`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-sm text-vinyl-bone/60 transition-colors hover:text-vinyl-bone"
            >
              License
            </a>
            <a
              href={`${REPO}/issues`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-sm text-vinyl-bone/60 transition-colors hover:text-vinyl-bone"
            >
              Issues
            </a>
          </div>
          <span className="font-body text-[11px] text-vinyl-bone/40">
            © {new Date().getFullYear()} Cella. Released under MIT.
          </span>
        </motion.div>
      </div>
    </footer>
  );
}
