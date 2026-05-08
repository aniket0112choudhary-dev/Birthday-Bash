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

export function FlyingBalloons({ count = 14 }: { count?: number }) {
  const items = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => {
        const palette = PALETTES[Math.floor(Math.random() * PALETTES.length)];
        return {
          id: i,
          left: Math.random() * 100,
          delay: Math.random() * 18,
          duration: 18 + Math.random() * 16,
          size: 38 + Math.random() * 38,
          drift: (Math.random() - 0.5) * 140,
          sway: 3 + Math.random() * 4,
          ...palette,
        };
      }),
    [count]
  );

  return (
    <div
      className="pointer-events-none fixed inset-0 z-40 overflow-hidden"
      aria-hidden="true"
    >
      {items.map((b) => (
        <span
          key={b.id}
          className="absolute animate-float-up"
          style={{
            left: `${b.left}%`,
            bottom: "-120px",
            width: `${b.size}px`,
            height: `${b.size * 1.5}px`,
            animationDelay: `${b.delay}s`,
            animationDuration: `${b.duration}s`,
            ["--drift" as never]: `${b.drift}px`,
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
