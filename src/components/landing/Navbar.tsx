import { ArrowUpRight } from "./icons";

const NAV_LINKS = [
  { label: "Player", href: "#player" },
  { label: "Engine", href: "#engine" },
  { label: "Library", href: "#library" },
];

const REPO = "https://github.com/congnghetinhtu/Cella";

export function Navbar() {
  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-desk-hair/80 bg-desk-ink/85 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3 md:px-10 lg:px-12">
        <a
          href="#player"
          className="group flex items-center gap-3"
          aria-label="Cella home"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-[5px] border border-desk-hair bg-desk-panel font-display text-[15px] text-desk-metal shadow-[inset_0_1px_0_rgba(230,221,201,0.08)] transition-colors group-hover:border-desk-amber/40">
            c
          </span>
          <span className="font-display text-sm tracking-[0.34em] text-desk-metal">
            CELL<span className="text-desk-hot">A</span>
          </span>
        </a>

        <div className="hidden items-center gap-6 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="font-body text-[13px] font-medium text-desk-faint transition-colors hover:text-desk-metal"
            >
              {link.label}
            </a>
          ))}
        </div>

        <a
          href={REPO}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg bg-desk-metal px-4 py-2 font-body text-xs font-semibold uppercase tracking-[0.18em] text-desk-ink transition-transform hover:bg-white active:scale-[0.98]"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-desk-lime shadow-[0_0_8px_rgba(127,217,107,0.9)]" />
          Get Cella
          <ArrowUpRight className="h-3.5 w-3.5" />
        </a>
      </div>

      <div className="flex items-center gap-4 overflow-x-auto px-6 pb-2.5 md:hidden">
        {NAV_LINKS.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="rounded-md border border-desk-hair bg-desk-panel/60 px-3 py-1.5 font-body text-xs text-desk-faint transition-colors hover:text-desk-metal"
          >
            {link.label}
          </a>
        ))}
      </div>
    </nav>
  );
}