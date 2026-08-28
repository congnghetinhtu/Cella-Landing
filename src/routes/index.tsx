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
          "A macOS music player with OpenMix built in: a live automix engine that reads BPM, key, energy and vocals, then beat-aligns the crossfades so nothing lands on a lyric.",
      },
      { property: "og:title", content: "Cella — Automix Music Player for macOS" },
      {
        property: "og:description",
        content:
          "OpenMix reads every track — BPM, key, energy, vocals — and crossfades on the bar, vocal-safe. A SwiftUI + Python player for macOS. Open source under MIT.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="bg-desk-room">
      <Hero />
      <Capabilities />
      <BeyondMix />
      <Footer />
    </main>
  );
}


