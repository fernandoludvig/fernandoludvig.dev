/**
 * Case studies são o conteúdo que faz este site valer alguma coisa.
 *
 * Regra: nada de número inventado. Um case entra com `draft: true` enquanto
 * faltar informação real — drafts aparecem só em `npm run dev`, nunca em
 * produção. Preencher e virar a flag é o que publica.
 */

export type Metric = {
  value: string;
  label: string;
  /** De onde veio o número. Se você não sabe responder isso, não publique. */
  source?: string;
};

export type CaseStudy = {
  slug: string;
  title: string;
  /** Uma linha. O que o projeto é, não o que ele usa. */
  tagline: string;
  context: string;
  period: string;
  role: string;
  stack: string[];
  /** Ocultado em produção enquanto true. */
  draft?: boolean;
  featured?: boolean;

  problem: string;
  /** As restrições são a parte interessante — é o que separa um projeto real de um tutorial. */
  constraints: string[];
  /** Cada decisão vem com o porquê. Decisão sem porquê não demonstra engenharia. */
  decisions: { decision: string; why: string }[];
  /** Etapas do fluxo, renderizadas como diagrama. */
  flow: { stage: string; detail: string }[];
  metrics: Metric[];
  takeaway: string;
  links?: { label: string; href: string }[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "job-search-intelligence",
    title: "A multi-agent job search system that got cheaper every week",
    tagline:
      "Four agents, two APIs, a hard quota budget, and a feedback loop that retires its own queries when they stop paying off.",
    context: "Personal project",
    period: "2026",
    role: "Design and implementation",
    featured: true,
    stack: [
      "Python",
      "Claude Code sub-agents",
      "Tavily API",
      "Bright Data",
      "Markdown as datastore",
    ],

    problem:
      "Finding remote roles open to a candidate outside the US means reading five sources a day — LinkedIn, three remote boards, the open web — and discarding roughly nine out of ten listings against eligibility rules that no source exposes as a filter: visa requirements, 'remote' that turns hybrid in paragraph four, US-only time zones. Done by hand it costs an hour a day and the reader gets worse at it as they get bored.",

    constraints: [
      "The scraping provider bills per delivered record, with 5,000/month free — and offers no usage meter. Overspend is invisible until the invoice.",
      "The sources disagree on everything: one exposes the location restriction as a structured field, one returns its own navigation menu when scraped, one mixes listings with search pages.",
      "Collectors run in parallel, so any of them writing to the history file would corrupt it.",
      "A daily run that re-reports yesterday's listings is worse than no run at all — the reader stops opening it.",
    ],

    decisions: [
      {
        decision: "Collectors never touch the filesystem. Only the orchestrator writes.",
        why: "Four agents run concurrently. Concurrent appends to the history file interleave and corrupt it. Making collection pure and deferring every write to the join step removed the failure mode instead of guarding against it.",
      },
      {
        decision: "Deduplicate against history *before* dispatching, not after.",
        why: "The quota is spent on delivery, not on the call. Filtering after the fetch pays full price for records that get thrown away.",
      },
      {
        decision: "Ignore the provider's `remote` filter and scan the description text.",
        why: "Measured: about half the listings the provider flagged as remote said 'hybrid' or 'on-site' in the body. Trusting the flag put unusable roles at the top of the report, which is the fastest way to kill trust in an automated feed.",
      },
      {
        decision: "Route the paid source last, and only when the free ones come back thin.",
        why: "One round ran on free sources alone and returned five usable roles, three of them worldwide. The paid step is a fallback, not the backbone.",
      },
      {
        decision: "Keep a learnings log that retires sources and queries by measured yield.",
        why: "Two queries in the same geography overlapped ~90%: both were billed, one was delivered. Without a written record of yield per query, that overlap is invisible and repeats forever.",
      },
    ],

    flow: [
      { stage: "Profile", detail: "Target roles, eligibility rules and query set — a single editable file that drives everything downstream" },
      { stage: "Dedup", detail: "Diff against the run history before any API call, so quota is never spent on known listings" },
      { stage: "Collect ×4", detail: "Remote boards · open web · LinkedIn EU · LinkedIn LATAM — in parallel, read-only" },
      { stage: "Filter", detail: "Eligibility rules applied to the description text, not to the provider's flags" },
      { stage: "Join", detail: "Cross-source dedup, ranking, and the single write to history" },
      { stage: "Learn", detail: "Cost-per-usable-result per source, appended to the log; low-yield queries get retired" },
    ],

    metrics: [
      {
        value: "96 → 8",
        label: "Records billed vs. usable roles, first run",
        source: "12 paid records per usable role — the baseline everything after was measured against",
      },
      {
        value: "21",
        label: "Records wasted on overlapping queries",
        source: "Found by auditing billed-vs-delivered; those queries were retired the same day",
      },
      {
        value: "0",
        label: "Paid records in the best-performing run",
        source: "Free sources alone returned 5 usable roles, 3 of them worldwide",
      },
      {
        value: "~50%",
        label: "Error rate of the provider's own 'remote' filter",
        source: "Measured against the listing descriptions; the reason the text scan exists",
      },
    ],

    takeaway:
      "The scraping was the boring part. The engineering was the budget: measuring cost per usable result, and building a loop that spends the next run's quota on whatever the last run proved worth it.",
  },

  {
    slug: "darwin-crm-integrations",
    title: "Connecting AI agents to the CRMs a business already lives in",
    tagline:
      "Making an AI agent's output land in HubSpot, Salesforce and Pipedrive the way a human rep would have entered it.",
    context: "Darwin AI",
    period: "2026 — present",
    role: "AI Automation Engineer",
    featured: true,
    draft: true, // TODO: preencher métricas reais + checar o que pode ser divulgado
    stack: ["Python", "n8n", "Albato", "Zapier", "HubSpot", "Webhooks", "Prompt engineering"],

    problem:
      "TODO: qual era o problema concreto? Ex.: conversas do agente terminavam sem virar registro no CRM, e o time comercial não confiava no pipeline.",

    constraints: [
      "TODO: quais eram as restrições reais? (schema do CRM do cliente, rate limit, dado que o agente captura mas o CRM não aceita, etc.)",
    ],

    decisions: [
      {
        decision: "TODO: uma decisão técnica que você tomou",
        why: "TODO: por que essa e não a alternativa óbvia",
      },
    ],

    flow: [{ stage: "TODO", detail: "TODO" }],

    metrics: [
      {
        value: "TODO",
        label: "TODO",
        source: "TODO — sem fonte, não publica",
      },
    ],

    takeaway: "TODO",
  },
];

export const publishedCaseStudies = caseStudies.filter(
  (c) => !c.draft || process.env.NODE_ENV === "development",
);

export function getCaseStudy(slug: string) {
  return publishedCaseStudies.find((c) => c.slug === slug);
}
