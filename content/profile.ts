export const profile = {
  name: "Fernando Ludvig",
  role: "AI Automation Engineer",

  // The line above the fold. It has one job: make a recruiter who has never
  // heard of you understand what you do before they scroll.
  pitch:
    "I build the plumbing between LLMs and the systems a business already runs on — CRMs, support desks, internal tools. The unglamorous layer where AI either becomes useful or quietly fails.",

  // Eligibility is the first objection an international recruiter has about a
  // candidate based in Brazil. It is answered here, above the fold, not in a
  // footnote.
  eligibility: {
    headline: "Luxembourg (EU) citizen — no sponsorship required",
    detail:
      "Full right to work across the European Union. Based in Brazil (UTC−3), with a working-hours overlap of 4–5h with the EU and near-full overlap with US Eastern.",
  },

  availability: "Open to remote roles — worldwide or EU",

  links: {
    email: "fernandoludvig0@gmail.com",
    github: "https://github.com/fernandoludvig",
    linkedin: "https://www.linkedin.com/in/fernandoludvig/",
  },

  stack: [
    {
      group: "AI / LLM",
      items: [
        "OpenAI",
        "Anthropic Claude",
        "LangChain",
        "RAG (pgvector / Supabase)",
        "Prompt engineering",
        "Evals",
      ],
    },
    {
      group: "Automation",
      items: ["n8n", "Zapier", "Albato", "REST APIs", "Webhooks", "Google Apps Script"],
    },
    {
      group: "Backend",
      items: ["Python", "FastAPI", "PostgreSQL", "Supabase", "MySQL", "SQL"],
    },
    {
      group: "Frontend",
      items: ["TypeScript", "React", "Next.js", "Tailwind"],
    },
    {
      group: "Business systems",
      items: ["HubSpot", "Salesforce", "Pipedrive", "GoHighLevel", "Zendesk"],
    },
  ],

  // Short, factual, no adjectives. The case studies do the persuading.
  now: {
    company: "Darwin AI",
    what: "Integrating AI agents with customer CRMs, building n8n/Zapier/Albato automations, and tuning agent prompts against real conversation failures.",
  },

  before:
    "Web development (PHP/JS/MySQL) and technical support (Zendesk). The support years are why I design automations around what actually breaks in an operation, not around the happy path.",
} as const;
