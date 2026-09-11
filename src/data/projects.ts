export type ProjectStat = { v: string; k: string };
export type ProjectBadge = { text: string; hot?: boolean };

export type ProjectPreviewKind = "invoice" | "serverless";

export type Project = {
  slug: string;
  title: string;
  liveUrl: string;
  tags: string[];
  tagBadges: ProjectBadge[];
  problem?: string;
  solution?: string;
  description: string;
  stack: string;
  stats?: ProjectStat[];
  glyph: string;
  fileLabel: string;
  demoBtnText: string;
  sourceUrl?: string;
  featured?: boolean;
  preview?: ProjectPreviewKind;
  caseStudy?: string;
};

export const PROJECTS: Project[] = [
  {
    slug: "invoice-gen",
    title: "AI Invoice Generator & Management",
    liveUrl: "https://invoicegen.abhijeetrana.com",
    tags: ["fullstack", "backend", "ai"],
    tagBadges: [
      { text: "production", hot: true },
      { text: "2024" },
      { text: "mern" },
      { text: "ai / ml" },
    ],
    problem:
      "finance teams losing 12+ hrs/week to manual invoice processing; off-the-shelf OCR below 60% accuracy.",
    solution:
      "hybrid pipeline: GPT-4 Vision extraction → Tesseract fallback → deterministic validation. SQS + Lambda for burst handling.",
    description:
      "End-to-end platform that extracts invoices from email & PDF via GPT-4 with OCR fallback, automates reminders, and surfaces business insights.",
    stack: "Node.js · React · MongoDB · AWS Lambda · SQS · OpenAI",
    stats: [
      { v: "10k+", k: "invoices / month" },
      { v: "99.9%", k: "uptime" },
      { v: "−67%", k: "manual effort" },
    ],
    glyph: "AI",
    fileLabel: "invoice.gen — 2024",
    demoBtnText: "live demo",
    sourceUrl: "https://github.com/AbhijeetDotexe/FrontendInvoice",
    featured: true,
    preview: "invoice",
    caseStudy: `Invoice work looks simple until a PDF is a photo of a crumpled page, the vendor invented their own tax layout, and three departments need the same number to match.

The product accepts invoices from email and uploads, extracts structured fields, reminds people who have not paid, and shows operators what is stuck. The interesting part is not the UI. It is making extraction and reminders survive messy documents and bursty traffic.

## Before and after (real numbers)

| Area | Before | After |
| --- | --- | --- |
| Upload API p95 | ~4.2s (model on hot path) | ~45ms (store + enqueue) |
| Dashboard list at 10k rows | Timeouts, full scans | Indexed query + pagination |
| Manual processing | ~12 hrs/week (team estimate) | ~4 hrs/week with review queue |
| Silent bad extractions | Possible | Blocked by arithmetic validation |

The dashboard slowdown was a compound index and projection fix — not a rewrite. That story is in the essay on [MERN performance](/blog/mern-stack-performance).

## What we refused to do in the HTTP request

Early versions ran validation, model extraction, persistence, and a webhook before returning 200. That is fine for a demo. It is a liability when OpenAI is slow or a 40-page PDF arrives at 9am.

Ingest now does three things: authenticate, store the raw object, enqueue a job with an idempotency key, respond. Workers own the rest. If a worker dies mid-flight, SQS redelivers. If the payload is poison, it lands in a DLQ instead of blocking the queue.

## Extraction is a validation problem

GPT-4 Vision is good at "what does this look like." It is not a ledger. We treat model JSON as a proposal:

1. Parse into a strict schema.
2. Recompute line totals and tax.
3. Reject or send to review when math, currency, or invoice number fails.
4. Fall back to Tesseract plus field-specific parsers when the model times out or confidence is junk.

That fallback is slower and uglier. It is also how you keep the product up when a vendor PDF is a scan of a fax.

## What I would still change

Idempotency keys belong on every write, including reminder emails. "At least once" queues plus "send if we have not sent" is how you avoid billing someone twice in the logs and once in real life.

See also: [accept then process](/blog/accept-then-process) and [extraction is validation](/blog/extraction-is-validation).`,
  },
  {
    slug: "serverless-flow",
    title: "ServerlessFlow — AWS Lambda alternative",
    liveUrl: "https://serverless.abhijeetrana.com",
    tags: ["backend", "infra", "oss"],
    tagBadges: [
      { text: "open source", hot: true },
      { text: "2024" },
      { text: "serverless" },
      { text: "infra" },
    ],
    problem:
      "vendor lock-in and opaque pricing in commercial serverless; teams needed self-hosted, predictable-cost FaaS.",
    solution:
      "OpenWhisk orchestrator + container pool with pre-warming; scheduler prioritizes reuse over creation; cgroup-isolated execution.",
    description:
      "Self-hosted FaaS platform on OpenWhisk + Docker. Custom runtimes, container pooling with pre-warming, auto-scaling to 100+ concurrent functions.",
    stack: "OpenWhisk · Docker · Go · Prometheus",
    stats: [
      { v: "<200ms", k: "cold start" },
      { v: "100+", k: "concurrency" },
      { v: "85%", k: "container reuse" },
    ],
    glyph: "λ",
    fileLabel: "serverless.flow — 2024",
    demoBtnText: "try deploying",
    sourceUrl: "https://github.com/AbhijeetDotexe/frontendServerless",
    featured: true,
    preview: "serverless",
    caseStudy: `Commercial FaaS is excellent until the bill, the region, or the runtime is not yours. ServerlessFlow is a self-hosted function platform: OpenWhisk for orchestration, Docker for isolation, a pool of already-started containers so the common path is reuse rather than boot.

## Before and after

| Metric | Cold path (no pool) | Warm reuse path |
| --- | --- | --- |
| Wall time to handler | 800ms–1.2s | <200ms (published runs) |
| Pool hit rate | 0% | ~85% under measured load |
| Operator visibility | "feels slow" | spawn + hit rate on Grafana |

Those numbers are from our dashboard, not a benchmark blog post. Your images and import graph will differ.

## The latency that actually matters

"Cold start" is a slogan. The bill is container create, runtime init, and loading your code. Function CPU time is rarely the first problem.

We keep a warm pool sized from recent concurrency, not from hope. The scheduler prefers an idle warm container over a new one. When traffic falls, the pool shrinks so you are not paying to heat empty rooms.

## Isolation and honesty

cgroup limits stop one noisy function from eating the node. Prometheus makes pool hit rate and spawn time visible, which is the only way a "sub-200ms" claim stays true after the demo.

I would not tell a team to rebuild Lambda for a CRUD app. I would tell them to measure spawn time before they declare serverless "too slow," and to treat pool hit rate as a product metric if they insist on running their own.

See also: [cold start is a pool-sizing problem](/blog/warm-pools-not-myths) and [write workers you can replay](/blog/workers-you-can-replay).`,
  },
  {
    slug: "github-archive",
    title: "Everything else lives on GitHub",
    liveUrl: "https://github.com/abhijeetdotexe",
    tags: ["fullstack", "backend", "ai", "infra", "oss"],
    tagBadges: [{ text: "more" }, { text: "experiments" }, { text: "oss" }],
    description:
      "CLI tools, infrastructure scripts, OSS contributions, and experiments in Rust & edge compute. The archive tells the fuller story.",
    stack: "Rust · Go · Python · TypeScript · Docker",
    glyph: "∞",
    fileLabel: "the archive",
    demoBtnText: "github.com/abhijeetdotexe",
  },
];

export const PROJECT_CATEGORIES = [
  { id: "all", label: "all" },
  { id: "fullstack", label: "full-stack" },
  { id: "backend", label: "backend" },
  { id: "ai", label: "ai / ml" },
  { id: "infra", label: "infra" },
  { id: "oss", label: "open source" },
] as const;

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find((project) => project.slug === slug);
}

export function featuredProjects(): Project[] {
  return PROJECTS.filter((project) => project.featured);
}
