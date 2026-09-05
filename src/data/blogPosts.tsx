import React from "react";
import { BlogPost } from "@/components/BlogModal";

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "event-driven-nodejs-scale",
    title: "Event-driven Node.js at scale: lessons from 10M events/day",
    date: "mar 2026",
    readTime: "8 min read",
    category: "Architecture",
    summary:
      "How we moved from synchronous REST pipelines to event sourcing with Kafka, cut p99 latency by 73%, and built self-healing retry mechanisms.",
    content: (
      <>
        <p>
          When handling high-throughput financial and invoice processing workloads, synchronous
          REST chains quickly become a liability. A single slow downstream service or API rate limit
          causes cascading thread pool exhaustion across your Node.js services.
        </p>
        <h2>The Bottleneck of Synchronous Requests</h2>
        <p>
          In our initial architecture, every invoice uploaded by a customer triggered 4 consecutive API calls:
          document validation, OCR extraction, database persistence, and webhook delivery. Under peak loads
          of 500 requests/sec, the event loop latency spiked to 4.2 seconds.
        </p>
        <blockquote>
          &ldquo;Coupling execution flow with network I/O is the fastest way to turn a microservices architecture
          into a distributed monolith.&rdquo;
        </blockquote>
        <h2>Migrating to Event Streams</h2>
        <p>
          We transitioned to an asynchronous event bus using Kafka and AWS SQS. Rather than processing everything in the HTTP lifecycle:
        </p>
        <ul>
          <li><strong>Ingest API</strong> immediately acknowledges receipt and pushes an event to SQS.</li>
          <li><strong>Worker Nodes</strong> consume events concurrently with backpressure control.</li>
          <li><strong>Dead Letter Queues (DLQ)</strong> automatically isolate failing payloads without blocking the pipeline.</li>
        </ul>
        <h2>Key Results & Metrics</h2>
        <pre>
          <code>
{`// Example event consumer pattern with exponential backoff
async function handleInvoiceEvent(payload) {
  try {
    await processInvoice(payload);
  } catch (err) {
    if (err.isTransient) {
      await retryQueue.publish(payload, { backoffMs: 2000 });
    } else {
      await dlq.publish(payload, { reason: err.message });
    }
  }
}`}
          </code>
        </pre>
        <p>
          By separating ingestion from processing, our HTTP response times dropped from 1,200ms to 45ms (a 96% reduction), while p99 end-to-end processing latency plummeted by 73%.
        </p>
      </>
    ),
  },
  {
    slug: "cold-starts-are-a-myth",
    title: "Cold starts are a myth (when you build it right)",
    date: "feb 2026",
    readTime: "6 min read",
    category: "Serverless",
    summary:
      "Container pooling, pre-warming, and runtime optimizations that got us sub-200ms invocations on a self-hosted serverless engine.",
    content: (
      <>
        <p>
          Cold starts are often cited as the biggest reason teams hesitate to adopt FaaS (Function-as-a-Service).
          When building <strong>ServerlessFlow</strong>, an open-source alternative to AWS Lambda, achieving consistent sub-200ms cold starts was our non-negotiable target.
        </p>
        <h2>Understanding the Cold Start Cost</h2>
        <p>
          A serverless cold start consists of three distinct phases: container allocation, runtime initialization, and code evaluation.
          Most of the penalty isn&apos;t function execution—it&apos;s container creation and module loading.
        </p>
        <h2>Pre-Warming & Container Pooling</h2>
        <p>
          Instead of creating containers on demand when HTTP triggers arrive, we engineered an adaptive container pool scheduler:
        </p>
        <ul>
          <li><strong>Warm Pools:</strong> Keep a base pool of pre-allocated Docker runtime containers ready.</li>
          <li><strong>Predictive Auto-scaling:</strong> Scale up warm containers based on rolling traffic velocity.</li>
          <li><strong>Bundle Tree-Shaking:</strong> Strip unnecessary dependencies to minimize Node.js module parsing time.</li>
        </ul>
        <h2>The Benchmark</h2>
        <pre>
          <code>
{`// Cold Start Benchmarks (1,000 Invocations)
Standard Docker Spawn:   1,420 ms
Pre-Warmed Pool:           148 ms  [90% reduction]`}
          </code>
        </pre>
        <p>
          With intelligent container reuse and runtime pre-warming, sub-200ms invocations are entirely achievable without expensive commercial serverless tier costs.
        </p>
      </>
    ),
  },
  {
    slug: "reliable-invoice-extraction-gpt4-ocr",
    title: "Reliable invoice extraction with GPT-4 + fallback OCR",
    date: "jan 2026",
    readTime: "10 min read",
    category: "AI / ML",
    summary:
      "Graceful degradation patterns for production LLM systems: confidence scoring, deterministic validation, and when to trust the model.",
    content: (
      <>
        <p>
          Large Language Models like GPT-4 Vision excel at understanding unstructured documents, but relying solely on AI outputs without guardrails is a recipe for data corruption in production financial software.
        </p>
        <h2>Hybrid Pipeline Architecture</h2>
        <p>
          We designed a multi-tier extraction pipeline that balances accuracy, cost, and reliability:
        </p>
        <ul>
          <li><strong>Primary Tier:</strong> GPT-4 Vision extracts structured JSON directly from PDF images.</li>
          <li><strong>Validation Tier:</strong> Deterministic schema validation checks totals, tax math, and date formats.</li>
          <li><strong>Fallback Tier:</strong> If confidence falls below 95% or LLM times out, Tesseract OCR + RegEx takes over.</li>
        </ul>
        <h2>Confidence Scoring Matrix</h2>
        <blockquote>
          &ldquo;Never send LLM data straight to a database without passing it through deterministic validation rules first.&rdquo;
        </blockquote>
        <pre>
          <code>
{`function validateInvoiceData(data) {
  const lineItemTotal = data.lineItems.reduce((acc, item) => acc + item.total, 0);
  const mathMatches = Math.abs(lineItemTotal - data.subtotal) < 0.01;
  return mathMatches && Boolean(data.invoiceNumber && data.vendorName);
}`}
          </code>
        </pre>
        <p>
          This hybrid fallback system reduced manual human review requirements by 67% while guaranteeing 99.8% field accuracy across 10,000+ invoices/month.
        </p>
      </>
    ),
  },
  {
    slug: "postgresql-at-scale-year-three",
    title: "PostgreSQL at scale: what I wish I knew at year three",
    date: "dec 2025",
    readTime: "12 min read",
    category: "Databases",
    summary:
      "Index strategies, connection pooling with PgBouncer, JSONB trade-offs, and the observability setup that saved us from 3 AM outages.",
    content: (
      <>
        <p>
          PostgreSQL is one of the most reliable relational databases in the world, but running it at scale requires a deep understanding of its internals, query planner behavior, and lock mechanics.
        </p>
        <h2>1. Connection Pooling is Mandatory</h2>
        <p>
          PostgreSQL creates a dedicated process per connection. Having 500 direct client connections will overwhelm your CPU context switching.
          Introducing <strong>PgBouncer</strong> in transaction pooling mode reduced memory usage by 70% and eliminated connection timeouts.
        </p>
        <h2>2. Beware of Partial Indexes & Unused Indexes</h2>
        <p>
          Indexes are not free—every write operation must update every index on the table.
          Utilize <code>pg_stat_user_indexes</code> to drop unused indexes and partial indexes for specific status filters.
        </p>
        <pre>
          <code>
{`-- Find unused indexes consuming memory
SELECT relname, indexrelname, idx_scan 
FROM pg_stat_user_indexes 
WHERE idx_scan = 0 AND idxrelname NOT LIKE '%_pkey';`}
          </code>
        </pre>
      </>
    ),
  },
  {
    slug: "seven-engineering-principles",
    title: "Seven engineering principles I refuse to compromise on",
    date: "nov 2025",
    readTime: "5 min read",
    category: "Philosophy",
    summary:
      "From &apos;make it work, make it right, make it fast&apos; to &apos;code is a liability&apos; — the core beliefs that shape how I build software.",
    content: (
      <>
        <p>
          Over 4+ years of shipping production software and debugging complex systems, I&apos;ve distilled my technical approach into seven core principles:
        </p>
        <ul>
          <li><strong>1. Code is a Liability:</strong> Write less code whenever possible. The best code is the code you didn&apos;t have to write.</li>
          <li><strong>2. Optimize for Readability:</strong> Code is read 10x more often than it is written. Clear over clever.</li>
          <li><strong>3. Fail Fast & Visibly:</strong> Don&apos;t swallow errors or return silent defaults. Surface problems immediately with rich contextual logging.</li>
          <li><strong>4. Measure Before Optimizing:</strong> Never optimize based on intuition—benchmark and profile real workload metrics.</li>
          <li><strong>5. Idempotency by Design:</strong> Every background job, API request, and database write should handle retries safely.</li>
          <li><strong>6. Simple Architecture &gt; Complex Frameworks:</strong> Choose boring, proven technologies unless a new tool solves a major bottleneck.</li>
          <li><strong>7. Deliver End-to-End Value:</strong> Great software isn&apos;t just clean code—it&apos;s intuitive user experience and business impact.</li>
        </ul>
      </>
    ),
  },
];
