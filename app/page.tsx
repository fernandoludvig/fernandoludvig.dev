import Link from "next/link";
import { profile } from "@/content/profile";
import { publishedCaseStudies } from "@/content/case-studies";

/* O método editorial do site, exibido como elemento visual. É uma sequência de
   verdade (a ordem carrega significado), então setas são estrutura, não enfeite. */
const METHOD = ["Problem", "Constraints", "Decisions", "Measured result"];

export default function Home() {
  return (
    <div className="mx-auto w-full max-w-5xl px-6">
      {/* Acima da dobra: o que ele faz, e por que a elegibilidade não é problema.
          Nessa ordem, porque a segunda pergunta só importa se a primeira convenceu. */}
      <section className="grid gap-12 py-20 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:py-28">
        <div>
          <p className="label rise">{profile.role}</p>
          <h1
            className="rise mt-5 text-5xl font-semibold leading-[1.02] tracking-tight sm:text-6xl"
            style={{ animationDelay: "60ms" }}
          >
            {profile.name}
          </h1>
          <p
            className="rise mt-7 max-w-xl text-lg leading-relaxed text-muted"
            style={{ animationDelay: "120ms" }}
          >
            {profile.pitch}
          </p>
          <div
            className="rise mt-9 flex flex-wrap items-center gap-4 font-mono text-sm"
            style={{ animationDelay: "180ms" }}
          >
            <a
              href={`mailto:${profile.links.email}`}
              className="rounded-md bg-accent px-5 py-2.5 font-medium text-background transition-transform hover:-translate-y-0.5 hover:bg-accent/90"
            >
              Get in touch
            </a>
            <a
              href="#work"
              className="rounded-md border border-border px-5 py-2.5 text-muted transition-colors hover:border-border-strong hover:text-foreground"
            >
              Read the case studies ↓
            </a>
          </div>
        </div>

        {/* O conteúdo do site é TypeScript tipado — o painel do herói encena isso. */}
        <aside
          className="rise overflow-hidden rounded-lg border border-border bg-surface shadow-[0_24px_60px_rgba(0,0,0,0.35)]"
          style={{ animationDelay: "160ms" }}
          aria-label="Profile facts"
        >
          <div className="flex items-center justify-between border-b border-border bg-surface-2 px-5 py-3">
            <span className="font-mono text-xs text-muted">profile.ts</span>
            <span className="label">typed · no CMS</span>
          </div>
          <dl className="divide-y divide-border">
            <PanelRow label="status">
              <span className="flex items-center gap-2.5">
                <span className="status-dot" aria-hidden />
                {profile.availability}
              </span>
            </PanelRow>
            <PanelRow label="citizenship">{profile.eligibility.headline}</PanelRow>
            <PanelRow label="base">{profile.base}</PanelRow>
            <PanelRow label="overlap">{profile.overlap}</PanelRow>
            <PanelRow label="now">
              {profile.now.company} — AI agents in production
            </PanelRow>
          </dl>
        </aside>
      </section>

      {/* A régua editorial: todo case study daqui pra baixo segue esta ordem. */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-y border-border py-5">
        <span className="label">Every case study reads as</span>
        <span className="flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-xs text-muted sm:text-sm">
          {METHOD.map((step, i) => (
            <span key={step} className="flex items-center gap-3">
              {i > 0 && (
                <span aria-hidden className="text-accent">
                  →
                </span>
              )}
              <span className={i === METHOD.length - 1 ? "text-foreground" : undefined}>
                {step}
              </span>
            </span>
          ))}
        </span>
      </div>

      <section id="work" className="scroll-mt-24 py-16 sm:py-20">
        <div className="flex items-baseline justify-between">
          <h2 className="label">Selected work</h2>
          <span className="font-mono text-xs text-faint">
            {String(publishedCaseStudies.length).padStart(2, "0")} case studies
          </span>
        </div>
        <ul className="mt-8 space-y-5">
          {publishedCaseStudies.map((study, i) => (
            <li key={study.slug}>
              <Link
                href={`/work/${study.slug}`}
                className="group block rounded-lg border border-border bg-surface/50 p-6 transition-all hover:border-accent-dim hover:bg-surface sm:p-8"
              >
                <div className="flex items-baseline justify-between gap-4">
                  <div className="flex items-baseline gap-3">
                    <span className="label">
                      {study.context} · {study.period}
                    </span>
                    {study.draft ? (
                      <span className="label text-accent">draft — dev only</span>
                    ) : null}
                  </div>
                  <span
                    aria-hidden
                    className="font-mono text-sm text-faint transition-colors group-hover:text-accent"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-3 max-w-2xl text-2xl font-medium tracking-tight transition-colors group-hover:text-accent">
                  {study.title}
                </h3>
                <p className="editorial mt-3 max-w-2xl text-[1.05rem] leading-relaxed text-muted">
                  {study.tagline}
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-2">
                  {study.stack.slice(0, 5).map((item) => (
                    <span key={item} className="chip">
                      {item}
                    </span>
                  ))}
                  <span
                    aria-hidden
                    className="ml-auto font-mono text-xs text-faint transition-all group-hover:translate-x-1 group-hover:text-accent"
                  >
                    Read the case study →
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="border-t border-border py-16 sm:py-20">
        <h2 className="label">Stack</h2>
        <dl className="mt-8 space-y-7">
          {profile.stack.map((group) => (
            <div key={group.group} className="sm:flex sm:gap-8">
              <dt className="label sm:w-44 sm:shrink-0 sm:pt-2">{group.group}</dt>
              <dd className="mt-3 flex flex-wrap gap-2 sm:mt-0">
                {group.items.map((item) => (
                  <span key={item} className="chip">
                    {item}
                  </span>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="border-t border-border py-16 sm:py-20">
        <h2 className="label">Background</h2>
        <div className="mt-8 grid gap-8 leading-relaxed text-muted sm:grid-cols-2">
          <p className="max-w-md">
            <span className="block font-medium text-foreground">Now — {profile.now.company}</span>
            <span className="mt-2 block">{profile.now.what}</span>
          </p>
          <p className="max-w-md">
            <span className="block font-medium text-foreground">Before</span>
            <span className="mt-2 block">{profile.before}</span>
          </p>
        </div>
      </section>
    </div>
  );
}

function PanelRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[6.5rem_1fr] gap-4 px-5 py-3.5">
      <dt className="font-mono text-xs leading-6 text-faint">{label}</dt>
      <dd className="text-sm leading-6 text-foreground">{children}</dd>
    </div>
  );
}
