import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono, Newsreader } from "next/font/google";
import { profile } from "@/content/profile";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Serifa itálica usada com parcimônia — só taglines e takeaways.
const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  style: ["italic"],
});

export const metadata: Metadata = {
  title: `${profile.name} — ${profile.role}`,
  description: profile.pitch,
  openGraph: {
    title: `${profile.name} — ${profile.role}`,
    description: profile.pitch,
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${newsreader.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-md">
          <nav className="mx-auto flex w-full max-w-5xl items-center justify-between gap-4 px-6 py-4">
            <Link
              href="/"
              className="group flex items-center gap-2.5 font-mono text-sm text-foreground"
            >
              <span
                aria-hidden
                className="inline-block h-3.5 w-3.5 rounded-[3px] bg-accent transition-transform group-hover:rotate-45"
              />
              {profile.name.toLowerCase().replace(" ", ".")}
            </Link>
            <div className="flex items-center gap-4 font-mono text-xs text-muted sm:gap-6 sm:text-sm">
              <a href={profile.links.github} className="transition-colors hover:text-accent">
                GitHub
              </a>
              <a href={profile.links.linkedin} className="transition-colors hover:text-accent">
                LinkedIn
              </a>
              <a
                href={`mailto:${profile.links.email}`}
                className="hidden rounded border border-border px-3 py-1.5 text-foreground transition-colors hover:border-accent hover:text-accent sm:inline-block"
              >
                Email
              </a>
              <a
                href={`mailto:${profile.links.email}`}
                className="transition-colors hover:text-accent sm:hidden"
              >
                Email
              </a>
            </div>
          </nav>
        </header>

        <main className="flex-1">{children}</main>

        <footer className="border-t border-border bg-surface/40">
          <div className="mx-auto grid w-full max-w-5xl gap-10 px-6 py-12 sm:grid-cols-3">
            <div>
              <p className="label">Status</p>
              <p className="mt-3 flex items-center gap-2.5 text-sm text-foreground">
                <span className="status-dot" aria-hidden />
                {profile.availability}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {profile.eligibility.headline}
              </p>
            </div>
            <div>
              <p className="label">Elsewhere</p>
              <ul className="mt-3 space-y-2 font-mono text-sm">
                <li>
                  <a href={profile.links.github} className="text-muted transition-colors hover:text-accent">
                    GitHub ↗
                  </a>
                </li>
                <li>
                  <a href={profile.links.linkedin} className="text-muted transition-colors hover:text-accent">
                    LinkedIn ↗
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${profile.links.email}`}
                    className="text-muted transition-colors hover:text-accent"
                  >
                    {profile.links.email}
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <p className="label">Colophon</p>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Next.js 16 · Tailwind v4 · no CMS — the content is typed TypeScript.{" "}
                <a
                  href="https://github.com/fernandoludvig/fernandoludvig.dev"
                  className="text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-accent"
                >
                  Source ↗
                </a>
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
