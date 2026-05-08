import { useMemo } from "react";

const EMOJIS = ["🎈", "🎈", "🎈", "🎉", "🎂", "💖", "🌸", "✨", "🌺", "🎁", "💐", "🥳"];
const COLORS = ["#ff6b9d", "#ffb3c6", "#ffd166", "#ef476f", "#f78fb3", "#ffc2d4"];

export function FlyingBalloons({ count = 18 }: { count?: number }) {
  const items = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 12,
        duration: 12 + Math.random() * 14,
        size: 22 + Math.random() * 28,
        drift: (Math.random() - 0.5) * 120,
        emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
      })),
    [count]
  );

  return (
    <div className="pointer-events-none fixed inset-0 z-40 overflow-hidden" aria-hidden="true">
      {items.map((b) => {
        const isBalloon = b.emoji === "🎈";
        return (
          <span
            key={b.id}
            className="absolute animate-float-up"
            style={{
              left: `${b.left}%`,
              bottom: "-80px",
              fontSize: `${b.size}px`,
              animationDelay: `${b.delay}s`,
              animationDuration: `${b.duration}s`,
              ["--drift" as never]: `${b.drift}px`,
              color: isBalloon ? b.color : undefined,
              filter: "drop-shadow(0 6px 10px rgba(0,0,0,0.12))",
            }}
          >
            {b.emoji}
          </span>
        );
      })}
    </div>
  );
}
