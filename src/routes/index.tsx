import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/landing/Hero";
import { Capabilities } from "@/components/landing/Capabilities";
import { BeyondMix } from "@/components/landing/BeyondMix";
import { Footer } from "@/components/landing/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Cella — Automix Music Player for macOS" },
      {
        name: "description",
        content:
          "Open-source SwiftUI music player for macOS. Analyzes BPM, key, vocals, and energy — then beat-aligns crossfades into one seamless mix.",
      },
      { property: "og:title", content: "Cella — Automix Music Player for macOS" },
      {
        property: "og:description",
        content:
          "Track analysis, TSP-based ordering, and vocal-aware beat-aligned crossfades. Open source under MIT.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="bg-black">
      <Hero />
      <Capabilities />
      <BeyondMix />
      <Footer />
    </main>
  );
}


