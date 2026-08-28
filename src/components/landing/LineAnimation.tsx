import { useEffect, useRef } from "react";

/*
 * Cella Emotion Screen — Line Animation.
 * A faithful web port of LineAnimationView.swift: a seeded Catmull-Rom spline
 * drawn as a comet trail whose head speed and trail length ride the track's
 * energy, with 4 track-stable drifting stars on top. Pauses offscreen,
 * honors prefers-reduced-motion, and falls back to the calm idle stroke.
 */

const MINT = "#93e9be";
const BPM = 124.8;
const SEGMENTS = 8;
const PAD = 3;
const VB = { w: 100, h: 30 };

function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function seedFromHash(str: string) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function mod1(n: number) {
  return ((n % 1) + 1) % 1;
}

function buildSmoothPath(rand: () => number) {
  const count = 6 + Math.floor(rand() * 7); // 6–12 control points
  const pts: Array<[number, number]> = [];
  for (let i = 0; i < count; i++) {
    pts.push([
      PAD + rand() * (VB.w - PAD * 2),
      PAD + rand() * (VB.h - PAD * 2),
    ]);
  }
  // Closed Catmull-Rom → cubic Bézier. cp for segment (p0,p1) uses the
  // neighbors p-1/p+2 with wraparound, so the curve loops without a corner.
  const p = (i: number) => pts[((i % count) + count) % count];
  let d = "";
  for (let i = 0; i < count; i++) {
    const [x0, y0] = p(i);
    const [x1, y1] = p(i + 1);
    const [xm, ym] = p(i - 1);
    const [xp, yp] = p(i + 2);
    const c1x = x0 + (x1 - xm) / 6;
    const c1y = y0 + (y1 - ym) / 6;
    const c2x = x1 - (xp - x0) / 6;
    const c2y = y1 - (yp - y0) / 6;
    d += `C ${c1x.toFixed(2)} ${c1y.toFixed(2)} ${c2x.toFixed(2)} ${c2y.toFixed(2)} ${x1.toFixed(2)} ${y1.toFixed(2)} `;
  }
  return `M ${pts[0][0].toFixed(2)} ${pts[0][1].toFixed(2)} ${d} Z`;
}

// Deterministic first paint: same shape on server and client, then the clock
// re-rolls the curve every lap with a fresh time seed.
const INITIAL_D = buildSmoothPath(mulberry32(seedFromHash("cella-landing-line")));

type Props = {
  size?: "sm" | "md" | "lg";
  label?: string;
};

export function LineAnimation({ size = "md", label = "Emotion screen" }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const basePathRef = useRef<SVGPathElement>(null);
  const idlePathRef = useRef<SVGPathElement>(null);
  const headRef = useRef<SVGCircleElement>(null);
  const trailPathsRef = useRef<Array<SVGPathElement | null>>([]);
  const wrapPathsRef = useRef<Array<SVGPathElement | null>>([]);
  const starsRef = useRef<Array<SVGGElement | null>>([]);

  const stateRef = useRef({
    seed: seedFromHash("cella-landing-line") ^ 0x5eed,
    rand: null as (() => number) | null,
    head: 0.3,
    phase: 0,
    raf: 0,
    visible: true,
    running: false,
    totalLen: 0,
    lastNow: 0,
  });

  // Track-stable star layout: angle, drift, size, twinkle phase. Seeded on
  // the component's id so the same song always scatters the same sky.
  const stars = useRef(
    (() => {
      const rand = mulberry32(seedFromHash("cella-stars-seafoam"));
      return Array.from({ length: 4 }, () => ({
        r: 0.7 + rand() * 1.1,
        ang: rand() * Math.PI * 2,
        speed: 1.6 + rand() * 2.6,
        phase: rand() * Math.PI * 2,
        px: 6 + rand() * (VB.w - 12),
        py: 5 + rand() * (VB.h - 10),
      }));
    })(),
  );

  const box =
    size === "lg"
      ? "h-36 sm:h-40 md:h-48"
      : size === "sm"
        ? "h-20"
        : "h-28 md:h-32";

  function evaluateTrailPaths(st: typeof stateRef.current, energy: number) {
    const base = basePathRef.current;
    if (!base) return;
    let total = st.totalLen;
    if (!total) {
      total = base.getTotalLength() || 1;
      st.totalLen = total;
    }
    const trailLen = 0.15 + energy * 0.15;
    const head = st.head;

    for (let k = 0; k < SEGMENTS; k++) {
      const faded = Math.pow(k / SEGMENTS, 1.5);
      const width = 4 - (4 - 2.5) * (k / SEGMENTS);
      const a = mod1(head - trailLen * (k / SEGMENTS)) * total;
      const b = mod1(head - trailLen * ((k + 1) / SEGMENTS)) * total;

      // A segment may straddle the 0/1 seam; split into at most two dashes.
      const windows: Array<[number, number]> =
        b < a
          ? [
              [a, total],
              [0, b],
            ]
          : [[a, b]];

      const paint = (el: SVGPathElement | null, [sa, ea]: [number, number]) => {
        if (!el) return;
        const len = Math.max(ea - sa, 0.5);
        el.setAttribute("stroke", MINT);
        el.setAttribute("stroke-opacity", String(0.85 * (1 - faded)));
        el.setAttribute("stroke-width", width.toFixed(2));
        el.setAttribute("stroke-dasharray", `${len} ${total}`);
        el.setAttribute("stroke-dashoffset", String(total - sa));
      };

      paint(trailPathsRef.current[k], windows[0]);
      paint(wrapPathsRef.current[k], windows[1] ?? [0, 0]);
    }

    if (headRef.current) {
      try {
        const p = base.getPointAtLength(mod1(head) * total);
        headRef.current.setAttribute("cx", p.x.toFixed(2));
        headRef.current.setAttribute("cy", p.y.toFixed(2));
      } catch {}
    }
  }

  useEffect(() => {
    const st = stateRef.current;
    st.rand = mulberry32(st.seed);
    st.head = 0.3;

    const pump = (now: number) => {
      const last = stateRef.current.lastNow;
      const dt = Math.min((now - last) / 1000, 0.12);
      stateRef.current.lastNow = now;
      st.phase += dt * (BPM / 60);
      const energy = 0.36 + 0.32 * (0.5 + 0.5 * Math.sin(st.phase));
      st.head += dt * (0.1 + energy * 0.4);

      if (st.head >= 1) {
        st.head = 0;
        st.seed = Date.now() >>> 0;
        st.rand = mulberry32(st.seed);
        st.totalLen = 0;
        const next = buildSmoothPath(st.rand);
        if (basePathRef.current) basePathRef.current.setAttribute("d", next);
        if (idlePathRef.current) idlePathRef.current.setAttribute("d", next);
      }

      evaluateTrailPaths(st, energy);
      st.raf = requestAnimationFrame(pump);
    };

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    let io: IntersectionObserver | null = null;
    let firstObserve = true;
    if (wrapRef.current && "IntersectionObserver" in window) {
      io = new IntersectionObserver(
        ([entry]) => {
          st.visible = entry.isIntersecting;
          if (st.visible && !st.running) {
            stateRef.current.lastNow = performance.now();
            st.raf = requestAnimationFrame(pump);
            st.running = true;
          } else if (!st.visible && st.running && !firstObserve) {
            cancelAnimationFrame(st.raf);
            st.running = false;
          }
          firstObserve = false;
        },
        { threshold: 0 },
      );
      io.observe(wrapRef.current);
    }

    stateRef.current.lastNow = performance.now();
    st.raf = requestAnimationFrame(pump);
    st.running = true;

    return () => {
      if (io) io.disconnect();
      if (st.running) {
        cancelAnimationFrame(st.raf);
        st.running = false;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Star drift + twinkle (twinkle phase rides the beat so the sky breathes
  // with the music; reduced-motion keeps them still).
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.12);
      last = now;
      const phase = stateRef.current.phase;
      stars.current.forEach((s, i) => {
        s.px += Math.cos(s.ang) * s.speed * dt;
        s.py += Math.sin(s.ang) * s.speed * dt;
        s.px = mod1(s.px / VB.w) * VB.w;
        s.py = mod1(s.py / VB.h) * VB.h;
        const g = starsRef.current[i];
        if (!g) return;
        g.setAttribute("transform", `translate(${s.px.toFixed(2)} ${s.py.toFixed(2)})`);
        const t = Math.max(0, Math.sin(phase * s.speed + s.phase));
        const tw = 0.3 + 0.7 * (t * t * (3 - 2 * t));
        g.setAttribute("opacity", String(tw));
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div
      ref={wrapRef}
      role="img"
      aria-label={`${label} — line animation, seafoam theme`}
      className={`stage-seafoam relative w-full overflow-hidden ${box}`}
    >
      <svg
        viewBox={`0 0 ${VB.w} ${VB.h}`}
        preserveAspectRatio="xMidYMid meet"
        className="h-full w-full"
      >
        {/* idle backdrop: the whole curve faintly, calm when nothing plays */}
        <path ref={idlePathRef} d={INITIAL_D} fill="none" stroke={MINT} strokeOpacity="0.15" strokeWidth="1" />
        {/* invisible metric source for trail math */}
        <path ref={basePathRef} d={INITIAL_D} fill="none" stroke="none" />
        {/* comet segments (primary + seam-wrap halves) */}
        {Array.from({ length: SEGMENTS }).map((_, k) => (
          <g key={k}>
            <path
              ref={(el) => {
                trailPathsRef.current[k] = el;
              }}
              d={INITIAL_D}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray={`${0} ${1}`}
            />
            <path
              ref={(el) => {
                wrapPathsRef.current[k] = el;
              }}
              d={INITIAL_D}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray={`${0} ${1}`}
            />
          </g>
        ))}
        {/* glowing head */}
        <circle ref={headRef} cx={VB.w / 2} cy={VB.h / 2} r="0.9" fill={MINT} />
        {/* four-point stars */}
        {stars.current.map((s, i) => (
          <g
            key={i}
            ref={(el) => {
              starsRef.current[i] = el;
            }}
            opacity="0.4"
          >
            <path
              d={`M 0 ${-s.r} Q ${s.r * 0.42} ${-s.r * 0.32} ${s.r} 0 Q ${s.r * 0.42} ${s.r * 0.32} 0 ${s.r} Q ${-s.r * 0.42} ${s.r * 0.32} ${-s.r} 0 Q ${-s.r * 0.42} ${-s.r * 0.32} 0 ${-s.r} Z`}
              fill={MINT}
              stroke={MINT}
              strokeWidth="0.32"
              strokeLinejoin="round"
            />
          </g>
        ))}
      </svg>
    </div>
  );
}