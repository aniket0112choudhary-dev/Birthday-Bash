import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/memories")({
  head: () => ({
    meta: [
      { title: "Memories with Mom — A Birthday Tribute" },
      { name: "description", content: "A few favorite memories with the most wonderful mother." },
    ],
  }),
  component: MemoriesPage,
});

const memories = [
  { year: "Then", title: "The First Embrace", body: "Your arms were the very first home I knew — warm, safe, endlessly patient." },
  { year: "Always", title: "Lessons in Kindness", body: "You taught me that softness is a kind of strength, and that love is best when given freely." },
  { year: "Today", title: "Still My Compass", body: "Every good thing in me has your fingerprints on it. Thank you for showing me the way." },
];

function MemoriesPage() {
  return (
    <section className="relative min-h-[calc(100vh-64px)] py-24 bg-secondary/40">
      <div className="absolute inset-0 bg-bloom opacity-50" />
      <div className="relative mx-auto max-w-6xl px-6">
        <div className="mb-14 text-center animate-fade-up">
          <p className="text-xs uppercase tracking-[0.3em] text-primary">moments</p>
          <h1 className="mt-3 font-display text-4xl md:text-6xl">A Few Of My Favorite Memories</h1>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {memories.map((m, i) => (
            <article
              key={m.title}
              className="group rounded-3xl border border-border/60 bg-card p-8 shadow-soft transition hover:-translate-y-2 hover:shadow-petal animate-fade-up"
              style={{ animationDelay: `${i * 120}ms` }}
            >
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-gradient-rose text-primary-foreground">
                <Heart className="h-5 w-5" />
              </div>
              <p className="text-xs uppercase tracking-widest text-primary">{m.year}</p>
              <h2 className="mt-2 font-display text-2xl">{m.title}</h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">{m.body}</p>
            </article>
          ))}
        </div>
        <div className="mt-14 text-center">
          <Button asChild className="bg-gradient-rose text-primary-foreground shadow-soft">
            <Link to="/gallery">Visit the gallery →</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
