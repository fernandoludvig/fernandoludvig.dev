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
    slug: "rdstation-crm-mcp",
    title: "An MCP server built for a model to use, not for an API to mirror",
    tagline:
      "Twelve tools that let an AI agent work a real sales pipeline — designed around the two things a model never has: the account's internal IDs, and spare context.",
    context: "Open source",
    period: "2026",
    role: "Design and implementation",
    featured: true,
    stack: ["TypeScript", "MCP SDK", "Node.js", "REST APIs", "msw", "GitHub Actions"],

    problem:
      "RD Station CRM is the most widely used CRM in Brazil and Latin America, and nothing connected it to the MCP ecosystem — so an agent that could otherwise qualify a lead, move a deal or answer \"where is my pipeline stuck?\" had no way to reach the system where that data lives. Writing that bridge is not the same as wrapping the API. A one-to-one port of REST endpoints into tools produces something a model can call and still can't use: it asks for UUIDs the model has never seen, and it answers with payloads that spend the context the model needed to reason.",

    constraints: [
      "A model never knows the account's internal IDs. Stages, pipelines, owners and lost reasons all exist in the API as identifiers that appear nowhere in the conversation.",
      "The context window is the scarce resource. A list endpoint returning full records spends the budget that should have gone to the answer.",
      "The same server has to serve one developer on a laptop and a multi-user hosted deployment — where a single implicit token stops being a convenience and becomes a security bug.",
      "The CRM API rate-limits and fails intermittently. A tool that surfaces a raw 429 to the model converts a transient error into a confident wrong answer.",
    ],

    decisions: [
      {
        decision: "Tools accept names, and the server resolves them against the live account.",
        why: "The alternative is instructing the model to call a list endpoint first and pass back an ID — two round trips and an opportunity to hallucinate one. Resolution belongs on the side that actually holds the data.",
      },
      {
        decision: "When a name doesn't resolve, the error enumerates every valid option.",
        why: "A model can recover from a wrong stage name if the failure tells it the real ones. \"Not found\" ends the attempt; a list of alternatives turns one failed call into a correct second call, with no human in the loop.",
      },
      {
        decision:
          "List tools return one line per record with explicit pagination hints, and truncate with guidance rather than flooding.",
        why: "Compact responses aren't an aesthetic preference. Every token spent on a field nobody asked about is a token unavailable for reasoning about the question that was asked.",
      },
      {
        decision: "Ship pipeline health as a single aggregation tool instead of leaving the math to the model.",
        why: "\"Where are deals stuck?\" is what people actually ask. Answering it by listing every deal and having the model sum them is slow, expensive, and wrong at the edges — the aggregate belongs in code, in one call.",
      },
      {
        decision:
          "Two transports: stdio for the single local user, Streamable HTTP with per-session bearer tokens for hosted use.",
        why: "A hosted server serves more than one CRM account, so the token can't be an env var read once at boot. Splitting the transports kept local setup a one-liner without making the multi-tenant case unsafe.",
      },
      {
        decision: "Isolate the HTTP client beneath the tools, with retry and exponential backoff on 429 and 5xx.",
        why: "Intermittent failure is the API's normal behaviour, not an exception. Handling it one layer down means no tool has to know about it and no model ever sees a retryable error.",
      },
    ],

    flow: [
      {
        stage: "Connect",
        detail: "Claude Desktop, Claude Code or any MCP client attaches over stdio or Streamable HTTP",
      },
      {
        stage: "Resolve",
        detail: "Names in the call — stage, pipeline, owner, lost reason — matched against the live account; a miss returns the valid set",
      },
      {
        stage: "Call",
        detail: "Typed request through an isolated HTTP client with retry and exponential backoff on 429/5xx",
      },
      {
        stage: "Compact",
        detail: "Records reduced to one line each with pagination hints; oversized responses truncated with instructions, not cut blind",
      },
      {
        stage: "Aggregate",
        detail: "Pipeline questions answered in a single call: totals per stage, win rate, and the deals going stale",
      },
    ],

    metrics: [
      {
        value: "0 → 1",
        label: "Open-source MCP servers for RD Station CRM",
        source: "There were none before this one; now published to npm and the official MCP registry, installable with npx",
      },
      {
        value: "12",
        label: "Tools across contacts, deals, tasks, notes and pipeline health",
        source: "Each one scoped to a question a salesperson asks out loud, rather than to an API endpoint",
      },
      {
        value: "2",
        label: "Transports, for two different trust models",
        source: "stdio with one implicit token for local use; Streamable HTTP with per-session bearer tokens for multi-user hosting",
      },
      {
        value: "1,385",
        label: "Impressions on the launch post",
        source: "LinkedIn analytics — highest-reach post to date, from a niche nobody had filled",
      },
    ],

    takeaway:
      "Wrapping an API is a port. Building for a model is a different job: resolving the identifiers it can't know, treating its context as a budget, and making failures instructive enough that it corrects itself. The tools that survived into the final surface are the ones that answer a question someone actually asks — not the ones that mirror a route.",

    links: [
      { label: "GitHub", href: "https://github.com/fernandoludvig/rdstation-crm-mcp" },
      { label: "npm", href: "https://www.npmjs.com/package/rdstation-crm-mcp" },
    ],
  },

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
    slug: "pr-code-reviewer",
    title: "A PR reviewer that had to earn the right to comment",
    tagline:
      "An LLM reviewing GitHub pull requests inline — where most of the engineering went into keeping it quiet enough that nobody turns it off.",
    context: "Open source",
    period: "2026",
    role: "Design and implementation",
    stack: ["Python", "FastAPI", "GitHub API", "Webhooks", "gpt-4o-mini", "HMAC-SHA256"],

    problem:
      "Security bugs reach human reviewers because reading a diff carefully is tedious and the reviewer is the bottleneck. A model can read the whole diff in seconds and flag a hardcoded credential or an unparameterised query before anyone opens the PR. The obvious build — webhook, prompt, post comments — works beautifully on the first pull request and gets muted on the tenth. The failure mode of an automated reviewer isn't being wrong. It's being noisy, and noise is indistinguishable from being wrong once people stop reading.",

    constraints: [
      "GitHub expects a webhook response within seconds, and disables endpoints that keep timing out. An LLM reviewing a full diff takes considerably longer than that.",
      "The GitHub API only accepts review comments anchored to lines that are part of the diff. Anything else comes back as a 422.",
      "A push burst fires several synchronize events for what is effectively the same code, and each one would pay for a fresh review.",
      "The webhook endpoint is public: anyone who finds the URL can spend the model budget behind it.",
      "An LLM returns valid JSON most of the time. \"Most of the time\" cannot be allowed to take the service down.",
    ],

    decisions: [
      {
        decision: "Acknowledge the webhook immediately and run the review in a background task.",
        why: "GitHub retries and eventually disables slow endpoints. Decoupling the acknowledgement from the work keeps the integration healthy no matter how slow the model is on a large diff.",
      },
      {
        decision:
          "Parse the diff to learn which lines are commentable, anchor everything that fits, and overflow the rest into the review body.",
        why: "The naive version posts and hopes. The plain 422 fallback dumps everything into the body and loses the line context that makes a review readable. Knowing the commentable set up front means precise anchoring where possible and nothing silently dropped where not.",
      },
      {
        decision: "Deduplicate per file and line, keeping the highest severity, and filter anything below a configurable floor.",
        why: "Three overlapping remarks on one line read as noise even when all three are correct. A reviewer's credibility is a budget, and it is spent per comment.",
      },
      {
        decision: "Cache the reviewed head SHA per pull request, with a TTL.",
        why: "Rapid pushes fire multiple events for the same commit. Without the cache, each is a full-price model call producing an identical review — paying twice to annoy the author twice.",
      },
      {
        decision: "Always submit as COMMENT. Never APPROVE, never REQUEST_CHANGES.",
        why: "A bot that can block a merge becomes a process obstacle teams route around within a week. Suggesting keeps the human in the decision, and keeps the bot installed.",
      },
      {
        decision: "Validate the HMAC-SHA256 signature on every request, and treat malformed model output as an empty review.",
        why: "Both are the same class of decision: bound what an untrusted input can cost. One stops a stranger spending the API budget; the other stops a bad completion crashing the service.",
      },
    ],

    flow: [
      {
        stage: "Receive",
        detail: "POST /webhook/github takes opened, synchronize and reopened pull_request events",
      },
      {
        stage: "Verify",
        detail: "HMAC-SHA256 checked over the raw payload; 200 OK returned at once and the work deferred to a background task",
      },
      {
        stage: "Dedup",
        detail: "head SHA checked against a TTL cache — a commit already reviewed costs nothing to see again",
      },
      {
        stage: "Review",
        detail: "Diff fetched from the GitHub API, truncated at ~6,000 tokens, sent to gpt-4o-mini for a structured JSON review",
      },
      {
        stage: "Filter",
        detail: "Below-threshold severities dropped; overlapping comments on the same line collapsed to the most severe",
      },
      {
        stage: "Post",
        detail: "Comments anchored to commentable lines, the remainder into the body, submitted as COMMENT with severity markers",
      },
    ],

    metrics: [
      {
        value: "2",
        label: "Real vulnerabilities caught in a single test file",
        source: "Demo run on a seeded PR: a hardcoded password and a SQL injection, both flagged high severity with the fix explained inline",
      },
      {
        value: "1",
        label: "Model call per commit, regardless of how many times it's pushed",
        source: "TTL cache keyed on head SHA — the anti-reprocessing guard added once push bursts showed up in the logs",
      },
      {
        value: "~6k",
        label: "Token ceiling on any single diff",
        source: "Truncation limit in the reviewer module; bounds what one webhook event can cost",
      },
      {
        value: "0",
        label: "Pull requests the bot is able to block",
        source: "Every review submitted with event=COMMENT; APPROVE and REQUEST_CHANGES are never called",
      },
    ],

    takeaway:
      "The model was the easy part — a decent prompt produces a usable review on the first attempt. What made it survivable in a real repository was everything wrapped around it: the signature check, the SHA cache, the severity floor, the deduplication, and the deliberate choice that it may suggest but never block. An automated reviewer is a trust product that happens to have an LLM inside it.",

    links: [{ label: "GitHub", href: "https://github.com/fernandoludvig/pr-code-reviewer" }],
  },

  {
    slug: "email-triage-agent",
    title: "An agent that acts on your inbox — and never acts twice",
    tagline:
      "Four routes, one classifier, and an idempotency rule, because a duplicated action here is a second email to a real person.",
    context: "Open source",
    period: "2026",
    role: "Design and implementation",
    stack: ["Python", "FastAPI", "LangChain", "GPT-4o", "Gmail API (OAuth 2.0)", "APScheduler", "SQLite", "Next.js"],

    problem:
      "Inbox triage is repetitive work that punishes inattention: the urgent message arrives between two newsletters, and the trivial question that takes ten seconds to answer still costs the interruption. A model classifies each message accurately enough to route it — that part is nearly free. The hard part is that this agent doesn't stop at classifying. It replies, escalates and files on its own, so every failure mode is an action taken in someone's real inbox rather than a wrong label on a dashboard.",

    constraints: [
      "Actions are irreversible. A duplicated classification is invisible; a duplicated auto-reply is a second email in a customer's inbox, and no rollback exists.",
      "Gmail delivers HTML, quoted threads and signatures — most of the payload isn't the message, but all of it costs tokens.",
      "The classifier's output feeds a routing switch, so \"mostly valid JSON\" is indistinguishable from a crash.",
      "The scheduler runs on a fixed cycle whether or not anything arrived, and most of what did arrive deserves no action at all.",
    ],

    decisions: [
      {
        decision: "Record every processed message by its Gmail ID and check before acting, never after.",
        why: "Idempotency is the entire safety model of an agent holding send permissions. A check that runs after dispatch isn't a guard, it's a log entry explaining what already went wrong.",
      },
      {
        decision: "Four routes — and one of them is deliberately to do nothing.",
        why: "Spam and automated notifications are the bulk of the volume. Giving \"ignore\" the same first-class standing as \"reply\" is what stops the agent inventing work to justify its own existence.",
      },
      {
        decision: "Only trivial messages get an automatic reply; anything needing judgement goes to a human queue with the summary attached.",
        why: "The value was never in answering everything. It's in a person opening a short queue of things that genuinely need them, already summarised, instead of an inbox sorted by arrival time.",
      },
      {
        decision: "Force structured output and treat the classification as a contract: category, one-line summary, urgency 1–5, intent.",
        why: "Free-form text cannot be routed. Fixing the shape at the model boundary is what lets everything downstream be ordinary, testable code instead of string parsing.",
      },
      {
        decision: "Urgent messages escalate to Telegram, not to another mailbox.",
        why: "An alert delivered into the channel being triaged is not an alert. Escalation has to leave the medium it's escalating out of, or it just joins the pile.",
      },
      {
        decision: "Strip HTML and quoted history to plain text before classification.",
        why: "Markup and thread history dominate the token count of a typical email while carrying almost none of its meaning — and the model reads the noise at full price.",
      },
    ],

    flow: [
      {
        stage: "Poll",
        detail: "APScheduler wakes every 5 minutes and pulls unread mail from the last hour through the Gmail API",
      },
      {
        stage: "Clean",
        detail: "HTML, quoted threads and signatures stripped down to the text that actually carries the message",
      },
      {
        stage: "Classify",
        detail: "GPT-4o via LangChain returns structured JSON: category, one-line summary, urgency 1–5, detected intent",
      },
      {
        stage: "Guard",
        detail: "Gmail ID checked against the processed table — anything already handled stops here, before any action",
      },
      {
        stage: "Act",
        detail: "Simple → drafted reply sent · Urgent → Telegram alert · Complex → human review queue · Ignore → discarded",
      },
      {
        stage: "Close",
        detail: "Message marked read and recorded, so the next cycle cannot reach it a second time",
      },
    ],

    metrics: [
      {
        value: "0",
        label: "Duplicate actions on a message already handled",
        source: "Every action gated on a Gmail ID lookup before dispatch; the message is recorded and marked read on completion",
      },
      {
        value: "4",
        label: "Routes, one of which is deliberately no action",
        source: "Simple, urgent, complex and ignore — the routing table the classifier feeds",
      },
      {
        value: "5 min",
        label: "Polling cycle across a one-hour lookback window",
        source: "APScheduler job wired into the FastAPI application lifecycle",
      },
      {
        value: "1–5",
        label: "Urgency attached to every message, alongside a summary and intent",
        source: "Part of the structured classification contract that makes the routing deterministic",
      },
    ],

    takeaway:
      "Classification was a prompt. The product was the guard around it. Once an agent can send mail on your behalf, correctness stops being about accuracy on the first run and starts being about what happens on the second — which is why the idempotency check, not the model, is the part of this I'd defend in review.",

    links: [{ label: "GitHub", href: "https://github.com/fernandoludvig/email-triage-agent" }],
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
