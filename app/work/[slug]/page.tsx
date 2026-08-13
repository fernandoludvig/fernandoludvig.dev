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

export default async function CaseStudyPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  return (
    <article className="mx-auto w-full max-w-3xl px-6">
      <header className="border-b border-border py-16">
        <Link href="/" className="label hover:text-accent">
          ← Back
        </Link>
        <p className="label mt-8">
          {study.context} · {study.period} · {study.role}
        </p>
        <h1 className="mt-4 text-3xl font-medium leading-tight tracking-tight">{study.title}</h1>
        <p className="mt-6 text-lg leading-relaxed text-muted">{study.tagline}</p>
        <p className="mt-8 font-mono text-xs leading-relaxed text-faint">
          {study.stack.join(" · ")}
        </p>
      </header>

      <Section label="The problem">
        <p className="leading-relaxed text-muted">{study.problem}</p>
      </Section>

      {/* As restrições vêm antes das decisões de propósito: uma decisão só
          impressiona quem entende contra o que ela foi tomada. */}
      <Section label="Constraints">
        <ul className="space-y-4">
          {study.constraints.map((constraint) => (
            <li key={constraint} className="flex gap-4 leading-relaxed text-muted">
              <span aria-hidden className="mt-2 h-px w-4 shrink-0 bg-border" />
              <span>{constraint}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section label="How it works">
        <ol className="space-y-px">
          {study.flow.map((step, i) => (
            <li
              key={step.stage}
              className="flex gap-4 rounded-sm border border-border bg-surface p-4 sm:gap-6"
            >
              <span className="label pt-0.5 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <p className="font-mono text-sm text-foreground">{step.stage}</p>
                <p className="mt-1 text-sm leading-relaxed text-muted">{step.detail}</p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <Section label="Decisions & trade-offs">
        <ul className="space-y-8">
          {study.decisions.map((item) => (
            <li key={item.decision}>
              <p className="leading-relaxed text-foreground">{item.decision}</p>
              <p className="mt-2 border-l-2 border-accent-dim pl-4 leading-relaxed text-muted">
                {item.why}
              </p>
            </li>
          ))}
        </ul>
      </Section>

      <Section label="Results">
        <dl className="grid gap-px overflow-hidden rounded-sm border border-border bg-border sm:grid-cols-2">
          {study.metrics.map((metric) => (
            <div key={metric.label} className="bg-surface p-5">
              <dt className="text-2xl font-medium tabular-nums tracking-tight text-accent">
                {metric.value}
              </dt>
              <dd className="mt-2 text-sm leading-relaxed text-foreground">{metric.label}</dd>
              {metric.source ? (
                <dd className="mt-2 text-xs leading-relaxed text-faint">{metric.source}</dd>
              ) : null}
            </div>
          ))}
        </dl>
      </Section>

      <Section label="Takeaway">
        <p className="leading-relaxed text-muted">{study.takeaway}</p>
        {study.links?.length ? (
          <div className="mt-8 flex flex-wrap gap-5 font-mono text-sm">
            {study.links.map((link) => (
              <a key={link.href} href={link.href} className="text-accent hover:underline">
                {link.label} ↗
              </a>
            ))}
          </div>
        ) : null}
      </Section>
    </article>
  );
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <section className="border-b border-border py-12 last:border-b-0">
      <h2 className="label">{label}</h2>
      <div className="mt-6">{children}</div>
    </section>
  );
}
