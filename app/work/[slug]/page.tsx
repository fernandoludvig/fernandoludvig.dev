import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { publishedCaseStudies, getCaseStudy } from "@/content/case-studies";

export function generateStaticParams() {
  return publishedCaseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return {};
  return { title: study.title, description: study.tagline };
}

/* Índice lateral: os ids têm que bater com os das <Section>. */
const SECTIONS = [
  { id: "problem", label: "The problem" },
  { id: "constraints", label: "Constraints" },
  { id: "how-it-works", label: "How it works" },
  { id: "decisions", label: "Decisions" },
  { id: "results", label: "Results" },
  { id: "takeaway", label: "Takeaway" },
] as const;

export default async function CaseStudyPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  const index = publishedCaseStudies.findIndex((s) => s.slug === study.slug);
  const prev = index > 0 ? publishedCaseStudies[index - 1] : null;
  const next =
    index < publishedCaseStudies.length - 1 ? publishedCaseStudies[index + 1] : null;

  return (
    <article className="mx-auto w-full max-w-5xl px-6">
      <header className="border-b border-border py-14 sm:py-16">
        <Link
          href="/#work"
          className="label inline-flex items-center gap-2 transition-colors hover:text-accent"
        >
          ← All work
        </Link>
        <div className="mt-8 flex flex-wrap items-center gap-2">
          <span className="chip">{study.context}</span>
          <span className="chip">{study.period}</span>
          <span className="chip">{study.role}</span>
          {study.draft ? <span className="chip text-accent">draft — dev only</span> : null}
        </div>
        <h1 className="mt-6 max-w-3xl text-3xl font-semibold leading-tight tracking-tight sm:text-[2.75rem] sm:leading-[1.1]">
          {study.title}
        </h1>
        <p className="editorial mt-6 max-w-2xl text-xl leading-relaxed text-muted">
          {study.tagline}
        </p>
        <p className="mt-8 font-mono text-xs leading-relaxed text-faint">
          {study.stack.join(" · ")}
        </p>
      </header>

      <div className="gap-12 py-4 lg:grid lg:grid-cols-[11rem_1fr]">
        {/* Índice fixo no desktop. No mobile some — a página lê de cima a baixo. */}
        <nav aria-label="Sections" className="hidden lg:block">
          <ol className="sticky top-24 space-y-1 py-10">
            {SECTIONS.map((section, i) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className="group flex items-baseline gap-3 rounded px-2 py-1.5 font-mono text-xs text-faint transition-colors hover:text-foreground"
                >
                  <span className="text-[10px] tabular-nums text-faint/70 transition-colors group-hover:text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {section.label}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="min-w-0">
          <Section id="problem" label="The problem">
            <p className="max-w-2xl text-[1.05rem] leading-relaxed text-muted">
              {study.problem}
            </p>
          </Section>

          {/* As restrições vêm antes das decisões de propósito: uma decisão só
              impressiona quem entende contra o que ela foi tomada. */}
          <Section id="constraints" label="Constraints">
            <ul className="max-w-2xl space-y-4">
              {study.constraints.map((constraint) => (
                <li key={constraint} className="flex gap-4 leading-relaxed text-muted">
                  <span
                    aria-hidden
                    className="mt-2.5 h-px w-5 shrink-0 bg-accent/60"
                  />
                  <span>{constraint}</span>
                </li>
              ))}
            </ul>
          </Section>

          <Section id="how-it-works" label="How it works">
            <ol className="max-w-2xl">
              {study.flow.map((step, i) => (
                <li key={step.stage} className="relative flex gap-5 pb-9 last:pb-0">
                  {i < study.flow.length - 1 ? (
                    <span
                      aria-hidden
                      className="absolute bottom-0 left-4 top-10 w-px bg-border"
                    />
                  ) : null}
                  <span className="z-10 flex size-8 shrink-0 items-center justify-center rounded-md border border-border bg-surface font-mono text-[11px] text-muted">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="pt-1">
                    <p className="font-mono text-sm text-foreground">{step.stage}</p>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted">
                      {step.detail}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </Section>

          <Section id="decisions" label="Decisions & trade-offs">
            <ul className="max-w-2xl space-y-5">
              {study.decisions.map((item) => (
                <li
                  key={item.decision}
                  className="rounded-lg border border-border bg-surface/50 p-5 sm:p-6"
                >
                  <p className="font-medium leading-relaxed text-foreground">
                    {item.decision}
                  </p>
                  <p className="mt-3 border-l-2 border-accent/50 pl-4 text-sm leading-relaxed text-muted">
                    {item.why}
                  </p>
                </li>
              ))}
            </ul>
          </Section>

          <Section id="results" label="Results">
            <dl className="grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2">
              {study.metrics.map((metric) => (
                <div
                  key={metric.label}
                  className="bg-surface p-6 transition-colors hover:bg-surface-2"
                >
                  <dt className="text-4xl font-semibold tabular-nums tracking-tight text-accent">
                    {metric.value}
                  </dt>
                  <dd className="mt-3 text-sm font-medium leading-relaxed text-foreground">
                    {metric.label}
                  </dd>
                  {metric.source ? (
                    <dd className="mt-2 text-xs leading-relaxed text-faint">
                      {metric.source}
                    </dd>
                  ) : null}
                </div>
              ))}
            </dl>
          </Section>

          <Section id="takeaway" label="Takeaway">
            <div className="max-w-2xl rounded-lg border border-border bg-surface/50 p-6 sm:p-8">
              <p className="editorial text-lg leading-relaxed text-foreground">
                {study.takeaway}
              </p>
              {study.links?.length ? (
                <div className="mt-7 flex flex-wrap gap-3 font-mono text-sm">
                  {study.links.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      className="rounded-md border border-border px-4 py-2 text-muted transition-colors hover:border-accent hover:text-accent"
                    >
                      {link.label} ↗
                    </a>
                  ))}
                </div>
              ) : null}
            </div>
          </Section>
        </div>
      </div>

      {(prev || next) && (
        <nav
          aria-label="More case studies"
          className="grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2"
        >
          {prev ? (
            <Link
              href={`/work/${prev.slug}`}
              className="group bg-surface p-6 transition-colors hover:bg-surface-2"
            >
              <span className="label">← Previous</span>
              <span className="mt-2 block font-medium leading-snug text-foreground transition-colors group-hover:text-accent">
                {prev.title}
              </span>
            </Link>
          ) : (
            <span aria-hidden className="hidden bg-surface sm:block" />
          )}
          {next ? (
            <Link
              href={`/work/${next.slug}`}
              className="group bg-surface p-6 transition-colors hover:bg-surface-2 sm:text-right"
            >
              <span className="label">Next →</span>
              <span className="mt-2 block font-medium leading-snug text-foreground transition-colors group-hover:text-accent">
                {next.title}
              </span>
            </Link>
          ) : (
            <span aria-hidden className="hidden bg-surface sm:block" />
          )}
        </nav>
      )}
      <div className="pb-16" />
    </article>
  );
}

function Section({
  id,
  label,
  children,
}: {
  id: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 border-b border-border py-12 last:border-b-0">
      <h2 className="label">{label}</h2>
      <div className="mt-6">{children}</div>
    </section>
  );
}
