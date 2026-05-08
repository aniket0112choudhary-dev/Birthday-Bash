import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { FlyingBalloons } from "@/components/FlyingBalloons";
import { BirthdayMusic } from "@/components/BirthdayMusic";
import { PageTransition } from "@/components/PageTransition";

import appCss from "../styles.css?url";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/letter", label: "Letter" },
  { to: "/memories", label: "Memories" },
  { to: "/gallery", label: "Gallery" },
  { to: "/wish", label: "Make a Wish" },
] as const;

function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-rose/20 bg-background/70 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3">
        <Link to="/" className="flex items-center gap-2 font-script text-2xl text-primary">
          <Heart className="h-4 w-4 fill-current" /> For Mom
        </Link>
        <ul className="flex flex-wrap items-center gap-1 text-sm">
          {NAV.map((item) => (
            <li key={item.to}>
              <Link
                to={item.to}
                activeOptions={{ exact: true }}
                activeProps={{ className: "bg-gradient-rose text-primary-foreground shadow-soft" }}
                inactiveProps={{ className: "text-foreground/70 hover:text-primary hover:bg-rose/10" }}
                className="rounded-full px-3 py-1.5 transition"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}


function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Happy Birthday, Mom — A Letter in Bloom" },
      { name: "description", content: "A heartfelt birthday celebration for the woman who taught us love. Memories, wishes, and Beautiful letter to express our love." },
      { property: "og:title", content: "Happy Birthday, Mom — A Letter in Bloom" },
      { property: "og:description", content: "A heartfelt birthday celebration for the woman who taught us love. Memories, wishes, and Beautiful letter to express our love." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Happy Birthday, Mom — A Letter in Bloom" },
      { name: "twitter:description", content: "A heartfelt birthday celebration for the woman who taught us love. Memories, wishes, and Beautiful letter to express our love." },
      { property: "og:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/84cc2545-4e7a-4c7a-8a30-6ebe1be888ff" },
      { name: "twitter:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/84cc2545-4e7a-4c7a-8a30-6ebe1be888ff" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Inter:wght@300;400;500;600&family=Great+Vibes&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <FlyingBalloons count={16} />
      <SiteHeader />
      <PageTransition />
      <BirthdayMusic />
    </QueryClientProvider>
  );
}
