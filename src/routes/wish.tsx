import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { generateWish } from "@/lib/wishes.functions";

export const Route = createFileRoute("/wish")({
  head: () => ({
    meta: [
      { title: "Make a Wish — A Birthday Note for Mom" },
      { name: "description", content: "Generate a fresh, AI-crafted birthday wish for Mom in the mood of your choice." },
    ],
  }),
  component: WishPage,
});

const vibes = [
  { id: "heartfelt", label: "Heartfelt" },
  { id: "poetic", label: "Poetic" },
  { id: "playful", label: "Playful" },
  { id: "spiritual", label: "Spiritual" },
] as const;

function WishPage() {
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
    <section className="relative min-h-[calc(100vh-64px)] py-24 bg-gradient-warm">
      <Toaster position="top-center" />
      <div className="absolute inset-0 bg-bloom" />
      <div className="relative mx-auto max-w-2xl px-6">
        <div className="rounded-[2rem] border border-rose/30 bg-card/80 p-10 shadow-petal backdrop-blur md:p-14 animate-fade-up">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-gradient-rose px-4 py-1.5 text-xs uppercase tracking-[0.25em] text-primary-foreground">
              <Wand2 className="h-3.5 w-3.5" /> AI Birthday Wish
            </div>
            <h1 className="mt-6 font-display text-3xl md:text-5xl">A wish, written just for her</h1>
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
  );
}
