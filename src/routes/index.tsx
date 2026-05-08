import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Heart, Sparkles, Cake, Gift, Stars, Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { FloatingPetals } from "@/components/FloatingPetals";
import { generateWish } from "@/lib/wishes.functions";

import heroFlowers from "@/assets/hero-flowers.jpg";
import cakeImg from "@/assets/cake.jpg";
import balloonsImg from "@/assets/balloons.jpg";
import bouquetImg from "@/assets/bouquet.jpg";

export const Route = createFileRoute("/")({
  component: BirthdayPage,
});

const memories = [
  { year: "Then", title: "The First Embrace", body: "Your arms were the very first home I knew — warm, safe, endlessly patient." },
  { year: "Always", title: "Lessons in Kindness", body: "You taught me that softness is a kind of strength, and that love is best when given freely." },
  { year: "Today", title: "Still My Compass", body: "Every good thing in me has your fingerprints on it. Thank you for showing me the way." },
];

const vibes = [
  { id: "heartfelt", label: "Heartfelt" },
  { id: "poetic", label: "Poetic" },
  { id: "playful", label: "Playful" },
  { id: "spiritual", label: "Spiritual" },
] as const;

function BirthdayPage() {
  const [name, setName] = useState("");
  const [vibe, setVibe] = useState<(typeof vibes)[number]["id"]>("heartfelt");
  const [wish, setWish] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const generate = useServerFn(generateWish);

  async function handleGenerate() {
    setLoading(true);
    try {
      const res = await generate({ data: { name: name || undefined, vibe } });
      setWish(res.wish);
    } catch (e) {
      toast.error("Could not generate a wish. Please try again.");
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background">
      <Toaster position="top-center" />

      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-warm" />
        <div className="absolute inset-0 bg-bloom" />
        <img
          src={heroFlowers}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover opacity-60 mix-blend-multiply"
        />
        <FloatingPetals count={22} />

        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center animate-fade-up">
          <div className="inline-flex items-center gap-2 rounded-full border border-rose/30 bg-card/60 px-4 py-1.5 text-xs uppercase tracking-[0.25em] text-primary backdrop-blur">
            <Sparkles className="h-3.5 w-3.5" /> A Day Made For You
          </div>
          <h1 className="mt-8 font-script text-7xl text-primary md:text-9xl">
            Happy Birthday
          </h1>
          <p className="mt-2 font-display text-5xl font-light tracking-wide text-foreground md:text-7xl">
            <span className="text-gradient-rose font-semibold">Mom</span>
          </p>
          <p className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Today the world feels softer, the sky a little brighter — because it's the day
            it gave us you. This little corner of the internet is yours, with all my love.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Button size="lg" asChild className="bg-gradient-rose text-primary-foreground shadow-soft hover:opacity-90">
              <a href="#letter"><Heart className="mr-2 h-4 w-4" /> Read my letter</a>
            </Button>
            <Button size="lg" variant="outline" asChild className="border-rose/40 bg-card/60 backdrop-blur">
              <a href="#wish"><Wand2 className="mr-2 h-4 w-4" /> Make a wish</a>
            </Button>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs uppercase tracking-[0.3em] text-muted-foreground/70">
          scroll
        </div>
      </section>

      {/* LETTER */}
      <section id="letter" className="relative py-28">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <Stars className="mx-auto mb-6 h-6 w-6 text-accent animate-shimmer" />
          <h2 className="font-script text-5xl text-primary md:text-6xl">a little letter</h2>
          <div className="mx-auto mt-10 max-w-2xl space-y-6 text-lg leading-relaxed text-foreground/80">
            <p>
              Mom, if I gathered every star and tried to thank you with light,
              I still wouldn't have enough. You are the quiet music behind every
              good day of my life.
            </p>
            <p>
              Thank you for the small things — the cups of tea, the late-night
              calls, the way you remember <em>everything</em> I forget. Thank you
              for the big things too: your courage, your patience, your endless,
              endless love.
            </p>
            <p className="font-script text-3xl text-primary">
              I love you, today and always.
            </p>
          </div>
        </div>
      </section>

      {/* MEMORIES */}
      <section className="relative py-28 bg-secondary/40">
        <div className="absolute inset-0 bg-bloom opacity-50" />
        <div className="relative mx-auto max-w-6xl px-6">
          <div className="mb-16 text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-primary">moments</p>
            <h2 className="mt-3 font-display text-4xl md:text-5xl">A Few Of My Favorite Memories</h2>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {memories.map((m, i) => (
              <article
                key={m.title}
                className="group rounded-3xl border border-border/60 bg-card p-8 shadow-soft transition hover:-translate-y-2 hover:shadow-petal"
                style={{ animationDelay: `${i * 120}ms` }}
              >
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-gradient-rose text-primary-foreground">
                  <Heart className="h-5 w-5" />
                </div>
                <p className="text-xs uppercase tracking-widest text-primary">{m.year}</p>
                <h3 className="mt-2 font-display text-2xl">{m.title}</h3>
                <p className="mt-4 leading-relaxed text-muted-foreground">{m.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="relative py-28">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-16 text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-primary">a celebration</p>
            <h2 className="mt-3 font-display text-4xl md:text-5xl">Just For You</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { src: cakeImg, icon: Cake, label: "A cake as sweet as you" },
              { src: bouquetImg, icon: Gift, label: "Roses, your favorite" },
              { src: balloonsImg, icon: Sparkles, label: "Wishes floating up" },
            ].map(({ src, icon: Icon, label }, i) => (
              <figure
                key={label}
                className="group relative overflow-hidden rounded-3xl shadow-soft animate-float-soft"
                style={{ animationDelay: `${i * 0.7}s` }}
              >
                <img src={src} alt={label} loading="lazy" width={1024} height={1024}
                  className="aspect-square w-full object-cover transition duration-700 group-hover:scale-105" />
                <figcaption className="absolute inset-x-0 bottom-0 flex items-center gap-2 bg-gradient-to-t from-background/90 to-transparent p-5 text-sm">
                  <Icon className="h-4 w-4 text-primary" /> {label}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* AI WISH GENERATOR */}
      <section id="wish" className="relative py-28 bg-gradient-warm">
        <div className="absolute inset-0 bg-bloom" />
        <div className="relative mx-auto max-w-2xl px-6">
          <div className="rounded-[2rem] border border-rose/30 bg-card/80 p-10 shadow-petal backdrop-blur md:p-14">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 rounded-full bg-gradient-rose px-4 py-1.5 text-xs uppercase tracking-[0.25em] text-primary-foreground">
                <Wand2 className="h-3.5 w-3.5" /> AI Birthday Wish
              </div>
              <h2 className="mt-6 font-display text-3xl md:text-4xl">A wish, written just for her</h2>
              <p className="mt-3 text-muted-foreground">
                Type her name and pick a mood — we'll craft a fresh, original birthday wish.
              </p>
            </div>

            <div className="mt-8 space-y-5">
              <Input
                placeholder="Her name (e.g. Mom, Mama, Linda…)"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-12 rounded-full border-rose/30 bg-background/80 px-5 text-center"
              />
              <div className="flex flex-wrap justify-center gap-2">
                {vibes.map((v) => (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => setVibe(v.id)}
                    className={`rounded-full border px-4 py-2 text-sm transition ${
                      vibe === v.id
                        ? "border-transparent bg-gradient-rose text-primary-foreground shadow-soft"
                        : "border-rose/30 bg-background/60 text-foreground hover:bg-background"
                    }`}
                  >
                    {v.label}
                  </button>
                ))}
              </div>
              <Button
                onClick={handleGenerate}
                disabled={loading}
                size="lg"
                className="w-full rounded-full bg-gradient-rose text-primary-foreground shadow-soft hover:opacity-90"
              >
                {loading ? "Writing with love…" : "Generate a wish"}
              </Button>
            </div>

            {wish && (
              <blockquote className="mt-10 animate-fade-up rounded-2xl border border-rose/20 bg-background/70 p-8 text-center font-display text-xl italic leading-relaxed text-foreground/90">
                "{wish}"
              </blockquote>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative py-16 text-center">
        <div className="mx-auto max-w-xl px-6">
          <p className="font-script text-4xl text-primary">with all my love</p>
          <p className="mt-3 text-sm text-muted-foreground">
            Made with <Heart className="inline h-3.5 w-3.5 text-primary" /> for the most wonderful mother in the world.
          </p>
        </div>
      </footer>
    </div>
  );
}
