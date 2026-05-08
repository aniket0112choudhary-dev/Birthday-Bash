import { useMemo } from "react";

const PALETTES = [
  { body: "#ff6b9d", shine: "#ffd1e1" }, // rose
  { body: "#ef476f", shine: "#ffc2d4" }, // deep pink
  { body: "#f7a8c4", shine: "#ffe1ec" }, // blush
  { body: "#ffd166", shine: "#fff1c2" }, // gold
  { body: "#e8b4b8", shine: "#fbe4e6" }, // dusty rose
  { body: "#c08497", shine: "#ead2d8" }, // mauve
  { body: "#ffb4a2", shine: "#ffe0d6" }, // peach
];

function Balloon({ body, shine }: { body: string; shine: string }) {
  return (
    <svg
      viewBox="0 0 60 90"
      width="100%"
      height="100%"
      style={{ filter: "drop-shadow(0 8px 12px rgba(120,40,70,0.18))" }}
    >
      {/* string */}
      <path
        d="M30 62 Q32 72 28 80 Q26 86 30 90"
        stroke="rgba(80,40,50,0.45)"
        strokeWidth="0.8"
        fill="none"
      />
      {/* knot */}
      <path d="M27 60 L33 60 L30 65 Z" fill={body} opacity="0.85" />
      {/* balloon body */}
      <ellipse cx="30" cy="32" rx="24" ry="29" fill={body} />
      {/* highlight */}
      <ellipse cx="22" cy="22" rx="6" ry="10" fill={shine} opacity="0.75" />
      <ellipse cx="20" cy="18" rx="2" ry="4" fill="#ffffff" opacity="0.85" />
      {/* subtle shadow on bottom */}
      <ellipse cx="36" cy="46" rx="14" ry="14" fill="rgba(0,0,0,0.08)" />
    </svg>
  );
}

const PATHS = ["float-up-a", "float-up-b", "float-up-c", "float-up-d"];
const EASINGS = [
  "cubic-bezier(.45,.05,.55,.95)",
  "cubic-bezier(.4,.1,.6,.9)",
  "linear",
  "cubic-bezier(.5,0,.5,1)",
];

export function FlyingBalloons({ count = 14 }: { count?: number }) {
  const items = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => {
        const palette = PALETTES[Math.floor(Math.random() * PALETTES.length)];
        // Keep balloons in left/right edge bands so they don't sit over text.
        const onLeft = Math.random() < 0.5;
        const left = onLeft ? Math.random() * 18 : 82 + Math.random() * 18;
        // Drift outward (away from center) so they leave the page edge.
        const drift = (onLeft ? -1 : 1) * (60 + Math.random() * 140);
        return {
          id: i,
          left,
          delay: Math.random() * 22,
          duration: 16 + Math.random() * 28,
          size: 32 + Math.random() * 38,
          drift,
          sway: 2.5 + Math.random() * 5,
          path: PATHS[Math.floor(Math.random() * PATHS.length)],
          easing: EASINGS[Math.floor(Math.random() * EASINGS.length)],
          ...palette,
        };
      }),
    [count]
  );


  return (
    <div
      className="balloon-layer pointer-events-none fixed inset-0 z-30 overflow-hidden"
      aria-hidden="true"
    >
      {items.map((b) => (
        <span
          key={b.id}
          className="absolute"
          style={{
            left: `${b.left}%`,
            bottom: "-140px",
            width: `${b.size}px`,
            height: `${b.size * 1.5}px`,
            animation: `${b.path} ${b.duration}s ${b.easing} ${b.delay}s infinite`,
            ["--drift" as never]: `${b.drift}px`,
            ["--rm-delay" as never]: `${b.delay * 0.3}s`,
          }}
        >
          <span
            className="block h-full w-full"
            style={{
              animation: `balloon-sway ${b.sway}s ease-in-out infinite`,
              transformOrigin: "50% 100%",
            }}
          >
            <Balloon body={b.body} shine={b.shine} />
          </span>
        </span>
      ))}
    </div>
  );
}
