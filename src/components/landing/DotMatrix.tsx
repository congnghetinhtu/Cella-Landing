import { useEffect, useState } from "react";

// 9 columns × 5 rows
type Pattern = number[]; // length 45; 1 = on, 0 = off

// Smiley (matches the reference screenshot)
const SMILEY: Pattern = [
  0,0,0,0,0,0,0,0,0,
  0,0,1,0,0,0,1,0,0,
  0,0,0,0,0,0,0,0,0,
  0,1,0,0,0,0,0,1,0,
  0,0,1,1,1,1,1,0,0,
];

// Rising energy — bar meter
const ENERGY: Pattern = [
  0,0,0,0,1,0,0,0,0,
  0,0,0,1,1,1,0,0,0,
  0,0,1,1,1,1,1,0,0,
  0,1,1,1,1,1,1,1,0,
  1,1,1,1,1,1,1,1,1,
];

// Waveform
const WAVE: Pattern = [
  0,0,1,0,0,0,1,0,0,
  0,1,0,1,0,1,0,1,0,
  1,0,0,0,1,0,0,0,1,
  0,1,0,1,0,1,0,1,0,
  0,0,1,0,0,0,1,0,0,
];

// Heart
const HEART: Pattern = [
  0,1,1,0,0,0,1,1,0,
  1,1,1,1,0,1,1,1,1,
  1,1,1,1,1,1,1,1,1,
  0,1,1,1,1,1,1,1,0,
  0,0,1,1,1,1,1,0,0,
];

const FRAMES: Pattern[] = [SMILEY, WAVE, ENERGY, HEART];

interface DotMatrixProps {
  size?: "sm" | "md" | "lg";
  intervalMs?: number;
}

export function DotMatrix({ size = "md", intervalMs = 2600 }: DotMatrixProps) {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = window.setInterval(() => {
      setIdx((i) => (i + 1) % FRAMES.length);
    }, intervalMs);
    return () => window.clearInterval(t);
  }, [intervalMs]);

  const dot =
    size === "lg"
      ? "h-4 w-4 md:h-5 md:w-5"
      : size === "sm"
        ? "h-2 w-2"
        : "h-3 w-3 md:h-3.5 md:w-3.5";
  const gap = size === "lg" ? "gap-3 md:gap-4" : size === "sm" ? "gap-1.5" : "gap-2.5 md:gap-3";

  const frame = FRAMES[idx];

  return (
    <div
      className={`grid grid-cols-9 ${gap} justify-items-center`}
      role="img"
      aria-label="Cella emotion matrix"
    >
      {frame.map((cell, i) => (
        <span
          key={i}
          className={`${dot} rounded-full transition-[background-color,box-shadow] duration-700 ease-out`}
          style={
            cell
              ? {
                  backgroundColor: "#FF8038",
                  boxShadow: "0 0 10px rgba(255,128,56,0.65), 0 0 22px rgba(255,128,56,0.25)",
                }
              : {
                  backgroundColor: "rgba(62, 45, 36, 0.55)",
                }
          }
        />
      ))}
    </div>
  );
}
