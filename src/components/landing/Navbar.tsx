import { ArrowUpRight } from "./icons";

const NAV_LINKS = ["Player", "Automix", "Engine", "Download"];

export function Navbar() {
  return (
    <nav className="fixed inset-x-0 top-5 z-50 flex items-center justify-between px-6 md:px-10 lg:px-12">
      <a
        href="#"
        className="flex items-center gap-2.5"
        aria-label="Cella home"
      >
        <span className="flex h-9 w-9 items-center justify-center rounded-full border border-vinyl-bone/15 bg-vinyl-umber/70 backdrop-blur">
          <span className="font-heading text-xl italic lowercase leading-none text-vinyl-bone">
            c
          </span>
        </span>
        <span className="font-heading hidden text-xl italic text-vinyl-bone md:inline">
          Cella
        </span>
      </a>

      <div className="hidden items-center gap-1 rounded-full border border-vinyl-bone/10 bg-vinyl-umber/60 px-1.5 py-1.5 backdrop-blur md:flex">
        {NAV_LINKS.map((link) => (
          <a
            key={link}
            href="#"
            className="font-body rounded-full px-3.5 py-1.5 text-[13px] font-medium text-vinyl-bone/80 transition-colors hover:bg-vinyl-bone/5 hover:text-vinyl-bone"
          >
            {link}
          </a>
        ))}
      </div>

      <button className="inline-flex items-center gap-1.5 rounded-full bg-vinyl-bone px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-vinyl-ink transition-transform active:scale-95">
        Get Cella
        <ArrowUpRight className="h-3.5 w-3.5" />
      </button>
    </nav>
  );
}
