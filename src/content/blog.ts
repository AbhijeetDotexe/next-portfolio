import { DIAGRAMS } from "@/content/diagrams";

export type BlogCover = {
  motif: "queue" | "vision" | "pool" | "ledger" | "signals" | "mern";
  accent: string;
  label: string;
};

export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  updated?: string;
  category: string;
  summary: string;
  keywords: string[];
  cover: BlogCover;
  markdown: string;
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "mern-stack-performance",
    title: "Making a MERN app fast without rewriting it",
    date: "2026-04-02",
    category: "Full-Stack",
    keywords: [
      "MERN stack",
      "React performance",
      "MongoDB indexes",
      "Express.js",
      "Node.js",
      "web performance",
    ],
    cover: { motif: "mern", accent: "#5b8def", label: "measure each layer" },
    summary:
      "The wins that actually moved the needle on a production MERN app: indexes before microservices, route-level code splitting, pagination defaults, and stopping the N+1 populate spiral.",
    markdown: `Every slow MERN app I have debugged had the same opening act: the team debated Redis, a CDN, or "maybe we need Go," while one Mongo query scanned a million documents and the React bundle shipped every chart library on npm.

The stack is not the problem. Unmeasured defaults are.

${DIAGRAMS.mernPerformance}

<aside class="article-callout">
<strong>Start here:</strong> log p95 latency per API route and per Mongo operation before you add infrastructure. Most fixes are boring and free.
</aside>

## MongoDB: the usual culprit

On the invoice product, the dashboard that listed invoices by account and status was fine with fifty rows. At ten thousand, it was not fine — because we filtered on \`accountId\` and sorted on \`createdAt\` without a compound index.

The fix was not sharding. It was:

\`\`\`js
db.invoices.createIndex({ accountId: 1, status: 1, createdAt: -1 });
\`\`\`

Then we stopped returning the world:

- **Projection** — only fields the table needs. Not the full extraction blob.
- **Pagination** — \`limit\` + \`skip\` or cursor on \`createdAt\` for deep pages. Default page size of 20, not 200.
- **Lean queries** — \`.lean()\` in Mongoose when you are not mutating documents. Hydrated documents cost memory and CPU.

The smell test: run \`explain("executionStats")\` on your slowest query. If \`totalDocsExamined\` dwarfs \`nReturned\`, you do not have a scaling problem. You have an index problem.

## Express: stop doing heavy work on the hot path

Node is fast when you do not block it. That sounds obvious until someone synchronously parses a 12MB CSV in middleware.

Patterns that helped:

- **Paginate at the database**, not in memory after \`find({})\`.
- **Stream large downloads** instead of buffering entire files.
- **Move email, PDF generation, and third-party calls to a queue** — same lesson as the ingest essay, smaller scale.
- **Compress JSON responses** only when payloads are large; gzip on a 200-byte health check is noise.

Keep handlers thin. Validate, authorize, call a service, return. If a route does five sequential awaits to unrelated services, that is a waterfall you can parallelize with \`Promise.all\` where dependencies allow — or split into a job.

## React: ship less, render less

The frontend wins were less glamorous than rewriting in Rust, but users felt them immediately.

1. **Route-level code splitting** — admin charts and PDF viewers do not belong in the landing bundle. \`React.lazy\` on heavy routes cut first-load JS noticeably.
2. **Virtualize long lists** — rendering 2,000 table rows because "it works on my laptop" will not work on a finance user's four-year-old ThinkPad.
3. **Stabilize props** — memoize expensive child trees when profiling shows wasted renders. Do not memo everything on day one; use the React DevTools profiler and fix what actually re-renders.
4. **Fetch once, cache sensibly** — duplicate \`useEffect\` fetches on mount because two components need the same user object is a classic MERN tax. Lift data to a parent, use SWR or React Query, or expose a small \`/api/me\` cache on the server.

Images: serve WebP/AVIF, set width and height, lazy-load below the fold. This is baseline, not optional.

## The N+1 populate trap

Mongoose \`.populate()\` in a loop is ORM comfort food that becomes a latency bomb. One route returned invoices and populated vendor, line items, and uploader for each row — three round trips per document, times fifty rows.

Fixes, in order of preference:

- **Embed** what you always need together if the document is read as a unit.
- **$lookup** in aggregation when you need a join-shaped answer once.
- **Batch load** related ids in one query and map in application code.

If populate appears inside \`for\` or \`.map()\`, that is a bug until proven otherwise.

## Redis: cache what is expensive and stable

We did not Redis-all-the-things. We cached:

- Session-adjacent config that rarely changes
- Aggregates that were expensive to compute and okay stale for five minutes
- Rate-limit counters

We did not cache individual invoice rows that finance might edit. Stale reads in a ledger UI are worse than a few extra milliseconds.

## What to measure

Before and after each change, track:

| Layer | Metric |
| --- | --- |
| Browser | LCP, bundle size, route transition time |
| API | p95 per route, payload bytes |
| Mongo | \`executionStats\`, connection pool wait |
| Product | Time to interactive on the slowest screen users actually use |

If you cannot name the slowest route and the slowest query, you are guessing. MERN gives you velocity; discipline gives you speed.

## What I would not do first

- Rewrite the API in another language before indexing
- Add GraphQL because REST "feels chatty" — fix chatty handlers
- Microservices because Mongo is slow — fix Mongo
- Premature Kubernetes — you are not out of single-server optimizations yet

The MERN stack is enough for a lot of production software. Make each layer honest, measure p95, and save the rewrite for when the numbers — not the Twitter discourse — demand it.
`,
  },
  {
    slug: "accept-then-process",
    title: "Accept the invoice. Process it later.",
    date: "2026-03-18",
    category: "Architecture",
    keywords: [
      "event-driven architecture",
      "AWS SQS",
      "idempotency",
      "invoice processing",
      "Node.js workers",
      "dead letter queue",
    ],
    cover: { motif: "queue", accent: "#3ecf8e", label: "ingest ≠ workflow" },
    summary:
      "Why invoice ingest should return in tens of milliseconds, how SQS plus an idempotency key beats a heroic HTTP handler, and when Kafka is the wrong default.",
    markdown: `The first version of our invoice pipeline did the honest thing: a request came in, we validated the file, called a model, wrote to MongoDB, and fired a webhook. Then we returned 200.

It worked in staging. It failed in the only way production fails — slowly, then all at once. A 40-page scan and a slow model call sat on the Node event loop. Timeouts retried. Retries stampeded the same work. Operators saw a spinner. We saw event-loop delay and a queue of nothing, because there was no queue.

${DIAGRAMS.acceptProcess}

<aside class="article-callout">
<strong>Rule of thumb:</strong> if a human is waiting on the response, do not call a model, a vendor webhook, or anything you do not control.
</aside>

## The request is not a workflow

HTTP is a conversation. Invoice processing is a job. Those should not share a lifetime.

The ingest path now does four things:

1. Authenticate and authorize.
2. Store the raw bytes (S3, not the database).
3. Enqueue a message that names the object and an **idempotency key**.
4. Return 202 with a job id.

Extraction, totaling, reminder scheduling, and vendor webhooks happen in workers. If OpenAI is having a bad afternoon, users still uploaded successfully. The job is delayed, not lost.

## SQS is enough until it is not

We used AWS SQS, not Kafka. That was not a lack of ambition. Invoice jobs are discrete, ordered per document, and bursty around month-end. We needed:

- At-least-once delivery we could reason about
- A dead-letter queue for poison PDFs
- Visibility timeouts longer than the slowest model call
- Zero extra cluster to babysit

Kafka would have given us replay and consumer groups. It would also have given us a second career as part-time brokers. Replay is useful; it is not free. If you cannot say which team owns the cluster at 2am, do not put your invoices on it.

When we needed fan-out (extract once, notify billing and search), we published a second message after the document was valid — not a topic topology that looked good on a whiteboard.

## Idempotency is the real feature

At-least-once means your handler will run twice. If "twice" sends two reminder emails or double-writes a payment, you do not have a retry policy. You have a bug with retries.

Every job carries a key derived from \`accountId + sha256(object)\`. The worker:

- Writes a processing row unique on that key
- Does the work
- Marks the row complete

A redelivery sees the row and exits. Partial failure is the sharp edge: if you crash after the model call but before the write, you will call the model again. That costs money. It should not corrupt data. Spend the token budget; do not invent a second invoice number.

Visibility timeout must exceed the p99 of the worker, including the model. If it does not, SQS will hand the same message to another worker while the first is still talking to GPT. Unique keys still save you. Overlapping model spend does not.

## Dead letters are a product surface

A DLQ is not a trash can. It is where the weird vendors live.

We inspect DLQ payloads weekly: encrypted zips, HTML pretending to be PDF, statements with no invoice number. Some get a parser. Some get a "needs human" state in the UI. Sweeping the DLQ into \`/dev/null\` trains you to ignore the only documents that hurt finance teams.

## What changed in the numbers that matter

I will not cite a fictional 10 million events a day. What we actually needed was:

- Ingest p95 in the tens of milliseconds, not seconds
- Workers that scale on queue depth, not on web traffic
- A way to pause processing without refusing uploads

Splitting accept from process gave us all three. The code is not exotic. The discipline is: **no network you do not control inside the request that the user is waiting on**.

If you are still extracting invoices inside \`POST /upload\`, move the file, enqueue the key, and return. The rest is a worker problem — which is a better class of problem.
`,
  },
  {
    slug: "extraction-is-validation",
    title: "Invoice extraction is a validation problem",
    date: "2026-02-12",
    category: "AI / ML",
    keywords: [
      "GPT-4 Vision",
      "OCR",
      "invoice extraction",
      "document AI",
      "validation",
      "accounts payable automation",
    ],
    cover: { motif: "vision", accent: "#5b8def", label: "propose → prove" },
    summary:
      "GPT-4 Vision proposes fields. Arithmetic, schema, and a human queue decide what is true. OCR is the fallback, not the strategy.",
    markdown: `People ask how we "use AI for invoices." The honest answer is: we use a model to guess, then we refuse to believe it.

A language model will happily invent an invoice number that looks right. It will transpose a GST amount and still produce fluent JSON. If you persist that JSON, you have built a very expensive way to corrupt accounts payable.

${DIAGRAMS.validation}

<aside class="article-callout">
<strong>Product truth:</strong> a 98% automatic rate with silent 2% garbage loses to an 85% automatic rate finance can audit.
</aside>

## The model is a parser with vibes

GPT-4 Vision is strong at layout that regex hates: stamps over totals, tables that wrap, "Amount due" in a footer in another language. We send a rendered page (or a few) and ask for a strict JSON object: vendor, number, dates, currency, line items, tax, total.

Then we throw most of the trust away.

The worker runs deterministic checks:

- Schema: required fields, ISO dates, currency codes
- Arithmetic: line totals sum to subtotal within a cent; tax math matches the stated rate or the stated tax amount
- Identity: invoice number is present and not a placeholder like \`N/A\`
- Consistency: currency on lines matches header currency

Fail any of those and the document does not become "extracted." It becomes **needs review**, with the model's proposal shown next to the pixels.

That UI is the product.

## Confidence is not a probability

Model "confidence" is not a calibrated probability of field correctness. We use it only as a tripwire: if the API is unsure, or the response is truncated, we do not pretend we have a number.

Cost control matters here. Vision on every page of a 40-page PDF is how you discover pricing. We render the first pages that look like an invoice (keywords, layout), not the entire terms-and-conditions novel. When the model times out, we do not retry forever on the hot path — we degrade.

## OCR is the understudy

Tesseract plus field-specific patterns is worse at "understanding" a document. It is better at still existing when the API is down.

Fallback is not "OCR the whole page and hope." It is:

1. Deskew and binarize
2. Try known vendor templates when we have seen the sender before
3. Pull candidates for dates, amounts, and IBAN-like strings
4. Run the **same** arithmetic checks as the model path

If OCR cannot prove the total, humans get the document. The shared validation layer is the point. Two extractors, one definition of done.

## Never let the model pick the schema

We do not ask the model to "return whatever fields seem useful." We supply the schema. Extra keys are dropped. Missing keys fail closed.

A tiny checker is more valuable than a clever prompt:

\`\`\`ts
function totalsMatch(invoice: ParsedInvoice) {
  const lines = invoice.lineItems.reduce((sum, item) => sum + item.total, 0);
  return Math.abs(lines - invoice.subtotal) < 0.01;
}
\`\`\`

If that function is false, the document is not done. No prompt engineering overrides arithmetic.

## What I would tell a team starting tomorrow

- Budget for a review queue on day one. Not after launch.
- Log raw model output separately from accepted fields. You will need to debug "why did we trust this."
- Cap tokens and pages. Extraction quality dies when you silently truncate.
- Treat vendor-specific parsers as a privilege you earn after volume, not as a rewrite of the core.

The drop in manual effort we talk about on the project page came from this shape: model where it is cheap to guess, math where it is expensive to be wrong, people where neither works. The AI is the suggestion. The system is the refusal to store a suggestion as a fact.
`,
  },
  {
    slug: "warm-pools-not-myths",
    title: "Cold start is a pool-sizing problem",
    date: "2026-01-20",
    category: "Serverless",
    keywords: [
      "cold starts",
      "OpenWhisk",
      "container pooling",
      "FaaS",
      "Docker",
      "self-hosted serverless",
    ],
    cover: { motif: "pool", accent: "#3ecf8e", label: "hit rate > mythology" },
    summary:
      "Self-hosted functions feel fast when you keep warm containers and measure spawn time. They feel like Lambda's worst days when you boot Docker per request.",
    markdown: `Cold start is not a myth. It is also not a single number. When we built ServerlessFlow — a self-hosted FaaS on OpenWhisk and Docker — the useful move was to stop arguing about serverless and start timing the three phases of a start.

${DIAGRAMS.warmPool}

## Three clocks, not one

A "cold" invocation is roughly:

1. **Allocate** — create or schedule a container
2. **Init** — runtime, mounts, env, your process
3. **Load** — import the function, connect to anything you foolishly connect to at import time

If you measure only wall time from HTTP to handler, you will optimize the wrong phase. We watched spawn time and **pool hit rate** as first-class metrics. A beautiful handler in a container that took a second to exist is still a slow product.

On a node with a warm pool, reuse is the common case: the process is up, the runtime is hot, you dispatch the payload. That path is what people mean when they say "feels like a server." The cold path is what they mean when they say "serverless is unusable."

Both are the same system. The difference is whether you already paid for init.

## Pools are a forecast, not a vibe

A static pool of 50 containers is easy and wasteful. A pool of 0 is honest and slow.

We sized from recent concurrency: if we have been running 40 functions, keep a buffer above that. If we have been idle, shrink. Predictive scaling based on a 15-minute velocity beat both "always warm" and "always cold" for our traffic, which is spiky but not random.

The scheduler's only interesting rule: **prefer an idle warm container over a create**. Creates happen at the edge of the pool, not on the first request of a working day.

Pre-warming is not magic. It is running init before the user is waiting. You still pay CPU and memory. You just pay it in the background, where product people cannot see a spinner.

## What we actually optimized in the function

After allocation was in the hundreds of milliseconds instead of seconds, load time started to matter:

- Stop connecting to databases at import time
- Stop shipping a 40MB node_modules into every image "just in case"
- Prefer a thin runtime image per language over a kitchen-sink base

Tree-shaking a Node function helps. It does not help as much as not booting Docker. Sequence your work: pool first, bundle second, micro-optimizations never if you cannot see them on a graph.

## Isolation is why you are not using a shared Node process

A warm pool is one step from "we have a fleet of long-lived workers." The reason to stay in function-shaped boxes is blast radius: cgroups, one user's memory leak, one infinite loop.

If you do not isolate, you do not have FaaS. You have a monolith with extra YAML. If you isolate but never reuse, you have isolation with a latency tax.

<aside class="article-callout">
<strong>Claims I will not make:</strong> we did not abolish cold starts. With ~85% pool reuse under the load we cared about, the user-visible path was reuse — and reuse was well under 200ms in the runs we published.
</aside>

Your numbers will differ. Your region, image, and import graph will differ. Copy the method: measure allocate vs init vs load, put a pool in front of allocate, and make hit rate visible to whoever owns the pager.

If a vendor's cold start bothers you, you can buy provisioned concurrency — or you can run a pool yourself and own the bill. Both are valid. Pretending start time is a moral failing of the cloud is not.
`,
  },
  {
    slug: "workers-you-can-replay",
    title: "Write workers you can replay",
    date: "2025-12-08",
    category: "Engineering",
    keywords: [
      "idempotent workers",
      "message queues",
      "retry strategies",
      "dead letter queue",
      "observability",
      "side effects",
    ],
    cover: { motif: "ledger", accent: "#c084fc", label: "replay without fear" },
    summary:
      "Retries, poison messages, and 3am debugging all get easier when a job is a pure function of stored inputs — not of whatever the process happened to remember.",
    markdown: `The best complement to a queue is a worker that does not mind running twice. The worst is a worker that "mostly" does.

This is not philosophy. It is how you sleep when SQS redelivers, when you replay a DLQ after a bad deploy, and when a new teammate asks why production sent two webhooks on Tuesday.

${DIAGRAMS.replay}

## Inputs live in the object store, not in the message

A queue message should be small and boring: job type, account id, object key, idempotency key, attempt. The PDF lives in S3. The email lives in the mailbox you already stored. If the message is a 2MB JSON blob of "the document we parsed so far," you will eventually hit size limits and you will never know which version was canonical.

Replay means: put the same key on the queue again. The worker loads bytes, runs the pipeline, writes results. No hidden state in the process.

## Side effects need a ledger

The handler will call APIs. Those are the dangerous parts.

For each side effect — send reminder, POST webhook, charge a usage counter — we record an intent row before the call and a completion row after. On retry:

- Completed effects are skipped
- Intents without completion are the gray area: the call may have succeeded and the process died. That is why webhooks should be idempotent on the receiver, and why reminder emails include a unique id the mailer can de-dupe.

You cannot make every third-party API perfect. You can make *your* worker obvious: here is what we already did.

## Logs are for a single job id

When extraction fails, nobody wants a grep across "error" at 14:07. They want \`job_id=...\` and the object key.

We structure logs with job id, attempt, and stage (\`fetch\`, \`extract\`, \`validate\`, \`persist\`). Traces are nice; consistent fields are mandatory. A replay should produce a new attempt number and the same job id so you can see the story in order.

Metrics that mattered for us were not "CPU on the node." They were: queue age, DLQ depth, validation fail rate, model latency, pool hit rate (on the FaaS side). If validation fail rate spikes, you shipped a parser bug or a vendor changed letterhead — not a "scale" event.

## Postgres notes I actually use

The invoice product's system of record is MongoDB. Other systems I have run sit on Postgres. A few habits transfer:

- Put a unique constraint on the idempotency key. Application "select then insert" will lose a race.
- Index what you filter in the operator UI (account + status + created_at). Do not index every JSON path you might query someday.
- Connection pooling belongs in front of the database if you have many workers. Hundreds of direct connections are a tax.

I do not have a tale about PgBouncer saving a Fortune 500. I have a tale about unique constraints saving us from double inserts when the queue got chatty.

## A worker checklist

Before you call a job "done":

- Can I replay it from the object key alone?
- Will a second run skip completed side effects?
- Does a poison payload leave the queue and enter a place humans look?
- Can I find all logs for one job without knowing the timestamp?

If the answer is no, the queue is a delay line for a request handler you did not want to admit you still have. Fix the worker first. The fancy bus can wait.
`,
  },
  {
    slug: "watch-the-queue-not-the-cpu",
    title: "Watch the queue, not the CPU",
    date: "2025-11-03",
    category: "Observability",
    keywords: [
      "observability",
      "queue metrics",
      "SLOs",
      "alerting",
      "distributed systems",
      "Node.js production",
    ],
    cover: { motif: "signals", accent: "#e0a15c", label: "signals over dashboards" },
    summary:
      "Pretty Grafana boards do not wake you for the right outage. Queue age, DLQ depth, and validation fail rate do — here is the small set we actually page on.",
    markdown: `The first dashboard I built for the invoice platform had twelve panels. CPU, memory, Node event-loop lag, HTTP p99, Mongo connections, Lambda duration, SQS visible messages, and a sparkline nobody could explain.

It looked serious. It missed the outage where uploads succeeded and nothing processed for forty minutes — because the queue was deep, workers were healthy, and a bad deploy had made every validation fail soft into a silent retry loop.

${DIAGRAMS.observability}

<aside class="article-callout">
<strong>Lesson:</strong> if your pager keys off host health, you will sleep through product failure.
</aside>

## Four signals that earned a page

We cut the board to four numbers that map to user pain:

1. **Queue age** — oldest message waiting. If this climbs, work is late even if boxes are green.
2. **DLQ depth** — poison or schema drift. Finance notices weird vendors before your CPU does.
3. **Validation fail rate** — parser or model regression. Spikes after deploys are a smell, not "traffic."
4. **Model p99** — budget and timeout risk. When this blows, visibility timeouts and double spends follow.

Everything else is diagnostic. Useful when you are already investigating. Useless as a wake-up call.

## SLOs that match the architecture

We stopped promising "API p99 under 200ms" as the only SLO. Ingest is fast by design. The promise that matters for customers is **time from upload to extracted-or-review**.

So we track:

- Ingest availability and latency (the HTTP face)
- End-to-end processing latency for successful jobs
- Review-queue backlog age (humans are part of the system)

If you only measure the edge, you will optimize a 202 that hides a stuck worker.

## Alerts that survive a quiet night

Good alerts are rare and actionable:

- Queue age > N minutes for M minutes → page
- DLQ depth rising and not draining → ticket, then page if still rising
- Validation fail rate > baseline after a deploy → page the deployer
- Model error rate or timeout share > threshold → page, and flip to OCR/degraded mode if you have it

Bad alerts are high CPU, single-host flaps, and "error log contains Error." Those train people to mute Slack.

## Structured logs beat clever search

We already log \`job_id\`, attempt, and stage. Observability is unfinished until an on-call engineer can answer:

- Which account is affected?
- Which object key?
- Did we already send the webhook?
- Is this a redelivery or a new job?

Without those fields, you have metrics and a prayer. With them, a replay is a decision, not an archaeology dig.

## What I would delete from your dashboard

- Per-instance CPU unless you are capacity planning
- Generic "5xx rate" without route and job type
- Model token counters as alerts (keep them as cost reports)
- Anything you have never used in a real incident

Keep a deep dashboard for forensics. Keep a short one for pages. If a chart has never changed a decision, it is decoration — and decoration is how you miss the queue filling up while the CPU looks calm.
`,
  },
];
