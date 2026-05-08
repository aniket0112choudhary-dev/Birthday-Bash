import { useMemo } from "react";

// Birthday-themed background decorations for the home page:
// confetti dots, sparkles, twinkling stars, hanging streamers and a pennant garland.

const CONFETTI_COLORS = [
  "var(--primary)",
  "var(--rose)",
  "var(--accent)",
  "#f7c873",
  "#f49ac1",
  "#b39df7",
];

export function HomeDecorations() {
  const confetti = useMemo(
    () =>
      Array.from({ length: 36 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 6,
        dur: 6 + Math.random() * 6,
        size: 6 + Math.random() * 8,
        color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
        rot: Math.random() * 360,
        shape: i % 3, // 0 rect, 1 circle, 2 strip
      })),
    []
  );

  const sparkles = useMemo(
    () =>
      Array.from({ length: 22 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 90,
        delay: Math.random() * 4,
        dur: 2.4 + Math.random() * 2.6,
        size: 4 + Math.random() * 6,
      })),
    []
  );

  const pennants = useMemo(
    () => Array.from({ length: 14 }).map((_, i) => ({
      id: i,
      color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
      delay: i * 0.12,
    })),
    []
  );

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {/* Pennant garland across the top */}
      <div className="absolute left-0 right-0 top-0 flex justify-center px-6 pt-4">
        <svg
          viewBox="0 0 800 70"
          preserveAspectRatio="none"
          className="h-16 w-full max-w-5xl opacity-90"
        >
          <path
            d="M0,10 Q400,80 800,10"
            fill="none"
            stroke="oklch(0.55 0.05 20 / 0.5)"
            strokeWidth="1.5"
          />
          {pennants.map((p, i) => {
            const t = i / (pennants.length - 1);
            const x = t * 800;
            // approximate y on the curve y = 10 + 70*4*t*(1-t)/... use parabola
            const y = 10 + 70 * (1 - Math.abs(2 * t - 1)) * 0.9;
            return (
              <g key={p.id} style={{ transformOrigin: `${x}px ${y}px`, animation: `pennant-sway 4s ease-in-out ${p.delay}s infinite` }}>
                <polygon
                  points={`${x - 10},${y} ${x + 10},${y} ${x},${y + 22}`}
                  fill={p.color}
                  opacity="0.85"
                />
              </g>
            );
          })}
        </svg>
      </div>

      {/* Side streamers */}
      <div className="absolute left-2 top-0 h-40 w-1 origin-top rotate-6 rounded-full bg-gradient-to-b from-primary/70 to-transparent" />
      <div className="absolute left-8 top-0 h-32 w-1 origin-top -rotate-3 rounded-full bg-gradient-to-b from-accent/70 to-transparent" />
      <div className="absolute right-3 top-0 h-44 w-1 origin-top -rotate-6 rounded-full bg-gradient-to-b from-rose/70 to-transparent" />
      <div className="absolute right-10 top-0 h-28 w-1 origin-top rotate-3 rounded-full bg-gradient-to-b from-primary/60 to-transparent" />

      {/* Twinkling sparkles */}
      {sparkles.map((s) => (
        <span
          key={s.id}
          className="absolute rounded-full bg-white/80 shadow-[0_0_10px_2px_rgba(255,255,255,0.6)]"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: s.size,
            height: s.size,
            animation: `sparkle-twinkle ${s.dur}s ease-in-out ${s.delay}s infinite`,
          }}
        />
      ))}

      {/* Falling confetti */}
      {confetti.map((c) => (
        <span
          key={c.id}
          className="absolute -top-6"
          style={{
            left: `${c.left}%`,
            width: c.shape === 2 ? c.size * 0.4 : c.size,
            height: c.shape === 2 ? c.size * 1.6 : c.size,
            background: c.color,
            borderRadius: c.shape === 1 ? "9999px" : "2px",
            transform: `rotate(${c.rot}deg)`,
            animation: `confetti-fall ${c.dur}s linear ${c.delay}s infinite`,
            opacity: 0.85,
          }}
        />
      ))}
    </div>
  );
}
