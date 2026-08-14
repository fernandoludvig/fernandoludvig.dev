import Link from "next/link";
import { profile } from "@/content/profile";
import { publishedCaseStudies } from "@/content/case-studies";

/* O método editorial do site, exibido como elemento visual. É uma sequência de
   verdade (a ordem carrega significado), então setas são estrutura, não enfeite. */
const METHOD = ["Problem", "Constraints", "Decisions", "Measured result"];

export default function Home() {
  // O draft existe para desenvolvimento, mas não deve disputar atenção com o
  // trabalho que um recrutador encontra no deploy público.
  const publicStudies = publishedCaseStudies.filter((study) => !study.draft);
  const leadStudy = publicStudies[0];
  const remainingStudies = publicStudies.slice(1);

  return (
    <div className="mx-auto w-full max-w-5xl px-6">
      {/* Acima da dobra: o que ele faz, e por que a elegibilidade não é problema.
          Nessa ordem, porque a segunda pergunta só importa se a primeira convenceu. */}
      <section className="hero-shell grid gap-12 py-16 sm:py-20 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:py-28">
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

        {/* Uma tradução visual do que ele constrói: dados entram em sistemas
            distintos, passam por uma camada de orquestração e viram ação. */}
        <aside
          className="rise architecture-card overflow-hidden rounded-xl border border-border bg-surface shadow-[0_28px_90px_rgba(0,0,0,0.42)]"
          style={{ animationDelay: "160ms" }}
          aria-label="AI automation architecture"
        >
          <div className="flex items-center justify-between border-b border-border bg-surface-2/80 px-5 py-3.5">
            <span className="font-mono text-xs text-muted">automation.system</span>
            <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.12em] text-ok">
              <span className="status-dot scale-75" aria-hidden /> live systems
            </span>
          </div>
          <div className="architecture-grid p-5 sm:p-6">
            <div className="architecture-column">
              <span className="label">Systems</span>
              <div className="mt-4 space-y-3">
                <SystemNode label="CRM" detail="HubSpot · Salesforce" />
                <SystemNode label="Inbox" detail="Gmail · Zendesk" />
                <SystemNode label="Calendar" detail="Google · Calendly" />
              </div>
            </div>
            <div className="architecture-bridge" aria-hidden>
              <span className="bridge-line bridge-line-top" />
              <span className="bridge-line bridge-line-middle" />
              <span className="bridge-line bridge-line-bottom" />
              <span className="bridge-core">AI</span>
            </div>
            <div className="architecture-column architecture-output">
              <span className="label">Outcomes</span>
              <div className="mt-4 space-y-3">
                <SystemNode label="Qualify" detail="route · enrich" accent />
                <SystemNode label="Resolve" detail="reply · escalate" accent />
                <SystemNode label="Report" detail="signal · prove ROI" accent />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 border-t border-border bg-surface-2/45">
            <PanelFact label="based" value={profile.base} />
            <PanelFact label="availability" value="Remote · EU" />
          </div>
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
            {String(publicStudies.length).padStart(2, "0")} case studies
          </span>
        </div>
        {leadStudy ? <LeadStudy study={leadStudy} /> : null}
        <ul className="mt-5 grid gap-5 md:grid-cols-3">
          {remainingStudies.map((study, i) => (
            <li key={study.slug}>
              <StudyCard study={study} index={i + 2} />
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

function SystemNode({
  label,
  detail,
  accent = false,
}: {
  label: string;
  detail: string;
  accent?: boolean;
}) {
  return (
    <div className={`system-node ${accent ? "system-node-accent" : ""}`}>
      <span className="font-mono text-xs text-foreground">{label}</span>
      <span className="mt-1 block font-mono text-[10px] leading-relaxed text-faint">{detail}</span>
    </div>
  );
}

function PanelFact({ label, value }: { label: string; value: string }) {
  return (
    <div className="px-5 py-3.5 first:border-r first:border-border sm:px-6">
      <p className="label text-[9px]">{label}</p>
      <p className="mt-1.5 text-xs text-muted">{value}</p>
    </div>
  );
}

function LeadStudy({ study }: { study: (typeof publishedCaseStudies)[number] }) {
  return (
    <Link
      href={`/work/${study.slug}`}
      className="lead-study group relative mt-8 block overflow-hidden rounded-xl border border-border bg-surface p-6 transition-colors hover:border-accent/60 sm:p-9"
    >
      <span className="lead-study-orb" aria-hidden />
      <div className="relative grid gap-8 lg:grid-cols-[1.35fr_0.65fr] lg:items-end">
        <div>
          <div className="flex items-center gap-3">
            <span className="label text-accent">01 · selected case</span>
            <span className="h-px w-12 bg-accent/50" aria-hidden />
            <span className="label">{study.context} · {study.period}</span>
          </div>
          <h3 className="mt-6 max-w-2xl text-3xl font-semibold leading-[1.08] tracking-tight text-foreground transition-colors group-hover:text-accent sm:text-4xl">
            {study.title}
          </h3>
          <p className="editorial mt-5 max-w-2xl text-lg leading-relaxed text-muted">
            {study.tagline}
          </p>
        </div>
        <div className="relative border-t border-border pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
          <p className="label">Case signal</p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">
            API design, model-aware tool interfaces, and a public package that fills a real gap.
          </p>
          <span className="mt-8 inline-flex items-center gap-3 font-mono text-xs text-foreground transition-all group-hover:gap-5 group-hover:text-accent">
            Read the case study <span aria-hidden>→</span>
          </span>
        </div>
      </div>
      <div className="relative mt-8 flex flex-wrap gap-2">
        {study.stack.slice(0, 5).map((item) => (
          <span key={item} className="chip">
            {item}
          </span>
        ))}
      </div>
    </Link>
  );
}

function StudyCard({
  study,
  index,
}: {
  study: (typeof publishedCaseStudies)[number];
  index: number;
}) {
  return (
    <Link
      href={`/work/${study.slug}`}
      className="study-card group flex h-full flex-col rounded-xl border border-border bg-surface/55 p-6 transition-all hover:-translate-y-1 hover:border-border-strong hover:bg-surface"
    >
      <div className="flex items-baseline justify-between gap-3">
        <span className="label">{study.context}</span>
        <span className="font-mono text-xs text-faint">{String(index).padStart(2, "0")}</span>
      </div>
      <h3 className="mt-5 text-xl font-medium leading-snug tracking-tight text-foreground transition-colors group-hover:text-accent">
        {study.title}
      </h3>
      <p className="editorial mt-4 text-[1rem] leading-relaxed text-muted">{study.tagline}</p>
      <div className="mt-auto flex items-center justify-between border-t border-border pt-5">
        <span className="font-mono text-[11px] text-faint">{study.period}</span>
        <span className="font-mono text-xs text-muted transition-colors group-hover:text-accent">Read →</span>
      </div>
    </Link>
  );
}
