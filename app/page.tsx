import Link from "next/link";
import { profile } from "@/content/profile";
import { publishedCaseStudies } from "@/content/case-studies";

export default function Home() {
  return (
    <div className="mx-auto w-full max-w-3xl px-6">
      {/* Acima da dobra: o que ele faz, e por que a elegibilidade não é problema.
          Nessa ordem, porque a segunda pergunta só importa se a primeira convenceu. */}
      <section className="border-b border-border py-20">
        <p className="label">{profile.role}</p>
        <h1 className="mt-4 text-3xl font-medium leading-tight tracking-tight sm:text-4xl">
          {profile.name}
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">{profile.pitch}</p>

        <div className="mt-8 rounded border border-accent-dim bg-surface p-5">
          <p className="text-sm font-medium text-accent">{profile.eligibility.headline}</p>
          <p className="mt-2 text-sm leading-relaxed text-muted">{profile.eligibility.detail}</p>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 font-mono text-sm">
          <a
            href={`mailto:${profile.links.email}`}
            className="rounded bg-accent px-4 py-2 font-medium text-background hover:bg-accent/90"
          >
            Get in touch
          </a>
          <span className="text-faint">{profile.availability}</span>
        </div>
      </section>

      <section className="border-b border-border py-16">
        <h2 className="label">Selected work</h2>
        <ul className="mt-8 space-y-10">
          {publishedCaseStudies.map((study) => (
            <li key={study.slug}>
              <Link href={`/work/${study.slug}`} className="group block">
                <div className="flex items-baseline gap-3">
                  <span className="label">
                    {study.context} · {study.period}
                  </span>
                  {study.draft ? (
                    <span className="label text-accent">draft — dev only</span>
                  ) : null}
                </div>
                <h3 className="mt-2 text-xl font-medium tracking-tight group-hover:text-accent">
                  {study.title}
                </h3>
                <p className="mt-3 leading-relaxed text-muted">{study.tagline}</p>
                <p className="mt-4 font-mono text-xs text-faint">
                  {study.stack.slice(0, 5).join(" · ")}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="border-b border-border py-16">
        <h2 className="label">Stack</h2>
        <dl className="mt-8 space-y-6">
          {profile.stack.map((group) => (
            <div key={group.group} className="sm:flex sm:gap-8">
              <dt className="label sm:w-40 sm:shrink-0 sm:pt-1">{group.group}</dt>
              <dd className="mt-2 text-sm leading-relaxed text-muted sm:mt-0">
                {group.items.join(" · ")}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="py-16">
        <h2 className="label">Background</h2>
        <div className="mt-8 space-y-6 leading-relaxed text-muted">
          <p>
            <span className="text-foreground">Now — {profile.now.company}.</span> {profile.now.what}
          </p>
          <p>
            <span className="text-foreground">Before.</span> {profile.before}
          </p>
        </div>
      </section>
    </div>
  );
}
