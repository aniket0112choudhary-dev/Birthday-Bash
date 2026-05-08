import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart, Sparkles, Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroFlowers from "@/assets/hero-flowers.jpg";
import { HomeDecorations } from "@/components/HomeDecorations";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Happy Birthday, Mom — A Letter in Bloom" },
      { name: "description", content: "A heartfelt birthday celebration for Mom — letters, memories, and AI-crafted wishes." },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <section className="relative min-h-[calc(100vh-64px)] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-warm" />
      <div className="absolute inset-0 bg-bloom" />
      <img
        src={heroFlowers}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover opacity-60 mix-blend-multiply"
      />
      <HomeDecorations />

      <div className="relative z-10 mx-auto max-w-4xl px-6 py-20 text-center animate-fade-up">
        <div className="inline-flex items-center gap-2 rounded-full border border-rose/30 bg-card/60 px-4 py-1.5 text-xs uppercase tracking-[0.25em] text-primary backdrop-blur">
          <Sparkles className="h-3.5 w-3.5" /> A Day Made For You
        </div>
        <h1 className="mt-8 font-script text-7xl text-primary md:text-9xl">Happy Birthday</h1>
        <p className="mt-2 font-display text-5xl font-light tracking-wide text-foreground md:text-7xl">
          <span className="text-gradient-rose font-semibold">Mom</span>
        </p>
        <p className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
          Today the world feels softer, the sky a little brighter — because it's the day
          it gave us you. Wander through these little chapters, all written with love.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Button size="lg" asChild className="bg-gradient-rose text-primary-foreground shadow-soft hover:opacity-90">
            <Link to="/letter"><Heart className="mr-2 h-4 w-4" /> Read my letter</Link>
          </Button>
          <Button size="lg" variant="outline" asChild className="border-rose/40 bg-card/60 backdrop-blur">
            <Link to="/wish"><Wand2 className="mr-2 h-4 w-4" /> Make a wish</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
