import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Cella — Automix Music Player for macOS" },
      {
        name: "description",
        content:
          "Cella analyzes your tracks and beat-aligns crossfades between them — a SwiftUI music player with a real automix engine.",
      },
      { name: "author", content: "Cella" },
      { property: "og:title", content: "Cella — Automix Music Player for macOS" },
      {
        property: "og:description",
        content:
          "BPM, key, vocals, and energy analysis with beat-aligned crossfades. A SwiftUI player with a real automix engine.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fragment+Mono&family=Inter:wght@400;500;600;700&family=Michroma&display=swap",
      },

      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

const DIRECTION_CONTRACT = `<!-- impeccable:direction seed-18913663
      THESIS: Cella's landing reads as the mix console where OpenMix works — every feature is a module on the desk, meters alive with the engine's real numbers, and the better-mix claim is proven at the first viewport instead of announced.
      OWN-WORLD: Warm charcoal room; brushed-aluminum plates with hex screws, inset hairlines and engraved placards; lime VU ballistics with the product's hot-orange lamp; mono numerals for every measurement; one wide industrial display face carries every spoken word.
      STORY: The visitor walks up to a lit desk, reads the live meters, understands OpenMix is a real streaming engine, and leaves wanting it in the room — Get Cella on macOS.
      FIRST VIEWPORT: Left, the display-voice headline and the get-it action. Right, a master-bus module: the emotion screen as a live line stage in the Seafoam theme, three live VU meters, and the bar-quantized crossfade ruler with dashed alternates.
      EVENT: delight pass. Seafoam stops being a swatch and becomes a room: the master-bus emotion stage is rewritten as Cella's real LineAnimation (seeded Catmull-Rom comet, energy-driven head and trail, drifting stars, mint on deep teal), per the product's LineAnimation spec. The dot-matrix display is retired from the landing.
      FORM: The Sound Desk, model-pick on the direction roll (seed 18913663).
      FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
    -->`;

// First child of <body>: the contract rides the emitted markup as a real HTML
// comment, so a production build can never erase the direction this page owes.
function DirectionContract() {
  return (
    <div aria-hidden className="hidden" dangerouslySetInnerHTML={{ __html: DIRECTION_CONTRACT }} />
  );
}

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <DirectionContract />
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}
