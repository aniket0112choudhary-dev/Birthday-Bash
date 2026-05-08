import { createFileRoute, Link } from "@tanstack/react-router";
import { Stars } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/letter")({
  head: () => ({
    meta: [
      { title: "A Letter to Mom — Happy Birthday" },
      { name: "description", content: "A heartfelt letter to the most wonderful mother in the world." },
    ],
  }),
  component: LetterPage,
});

function LetterPage() {
  return (
    <section className="relative min-h-[calc(100vh-64px)] py-24">
      <div className="absolute inset-0 bg-bloom opacity-60" />
      <div className="relative mx-auto max-w-3xl px-6 text-center animate-fade-up">
        <Stars className="mx-auto mb-6 h-6 w-6 text-accent animate-shimmer" />
        <h1 className="font-script text-6xl text-primary md:text-7xl">a little letter</h1>
        <div className="mx-auto mt-12 max-w-2xl space-y-6 text-lg leading-relaxed text-foreground/80">
          <p>
            Mom, if I gathered every star and tried to thank you with light, I still
            wouldn't have enough. You are the quiet music behind every good day of my life.
          </p>
          <p>
            Thank you for the small things — the cups of tea, the late-night calls,
            the way you remember <em>everything</em> I forget. Thank you for the big
            things too: your courage, your patience, your endless, endless love.
          </p>
          <p className="font-script text-3xl text-primary">I love you, today and always.</p>
        </div>
        <div className="mt-12">
          <Button asChild className="bg-gradient-rose text-primary-foreground shadow-soft">
            <Link to="/memories">See our memories →</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
