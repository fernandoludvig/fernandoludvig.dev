import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <header className="border-b border-border">
          <nav className="mx-auto flex w-full max-w-3xl items-center justify-between gap-4 px-6 py-5">
            <Link href="/" className="font-mono text-sm text-foreground hover:text-accent">
              {profile.name.toLowerCase().replace(" ", ".")}
            </Link>
            <div className="flex items-center gap-4 font-mono text-xs text-muted sm:gap-5 sm:text-sm">
              <a href={profile.links.github} className="hover:text-accent">
                GitHub
              </a>
              <a href={profile.links.linkedin} className="hover:text-accent">
                LinkedIn
              </a>
              <a href={`mailto:${profile.links.email}`} className="hover:text-accent">
                Email
              </a>
            </div>
          </nav>
        </header>

        <main className="flex-1">{children}</main>

        <footer className="border-t border-border">
          <div className="mx-auto w-full max-w-3xl px-6 py-8">
            <p className="label">{profile.availability}</p>
            <p className="mt-2 text-sm text-muted">
              {profile.eligibility.headline} ·{" "}
              <a
                href={`mailto:${profile.links.email}`}
                className="text-foreground underline decoration-border underline-offset-4 hover:decoration-accent"
              >
                {profile.links.email}
              </a>
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
