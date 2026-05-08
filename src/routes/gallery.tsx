import { createFileRoute, Link } from "@tanstack/react-router";
import { Cake, Gift, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import cakeImg from "@/assets/cake.jpg";
import bouquetImg from "@/assets/bouquet.jpg";
import balloonsImg from "@/assets/balloons.jpg";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Just For You — Birthday Gallery" },
      { name: "description", content: "Cake, flowers, and balloons — a little gallery just for Mom." },
    ],
  }),
  component: GalleryPage,
});

const items = [
  { src: cakeImg, icon: Cake, label: "A cake as sweet as you" },
  { src: bouquetImg, icon: Gift, label: "Roses, your favorite" },
  { src: balloonsImg, icon: Sparkles, label: "Wishes floating up" },
];

function GalleryPage() {
  return (
    <section className="relative min-h-[calc(100vh-64px)] py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-14 text-center animate-fade-up">
          <p className="text-xs uppercase tracking-[0.3em] text-primary">a celebration</p>
          <h1 className="mt-3 font-display text-4xl md:text-6xl">Just For You</h1>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {items.map(({ src, icon: Icon, label }, i) => (
            <figure
              key={label}
              className="group relative overflow-hidden rounded-3xl shadow-soft animate-float-soft"
              style={{ animationDelay: `${i * 0.7}s` }}
            >
              <img src={src} alt={label} loading="lazy" width={1024} height={1024}
                className="aspect-square w-full object-cover transition duration-700 group-hover:scale-105" />
              <figcaption className="absolute inset-x-0 bottom-0 flex items-center gap-2 bg-gradient-to-t from-background/95 to-transparent p-5 text-sm">
                <Icon className="h-4 w-4 text-primary" /> {label}
              </figcaption>
            </figure>
          ))}
        </div>
        <div className="mt-14 text-center">
          <Button asChild className="bg-gradient-rose text-primary-foreground shadow-soft">
            <Link to="/wish">Make a wish →</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
