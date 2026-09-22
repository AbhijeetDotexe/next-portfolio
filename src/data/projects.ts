export type ProjectStat = { v: string; k: string };
export type ProjectBadge = { text: string; hot?: boolean };

export type ProjectPreviewKind = "invoice" | "serverless" | "routepulse" | "systemcraft";

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
    slug: "routepulse",
    title: "RoutePulse — Luxury Bus Booking & Transit Radar",
    liveUrl: "https://booking.abhijeetrana.com",
    tags: ["fullstack", "backend", "infra"],
    tagBadges: [
      { text: "production", hot: true },
      { text: "2025" },
      { text: "mern" },
      { text: "redis" },
    ],
    problem:
      "Race conditions causing double bookings during flash reservations, coupled with zero real-time visibility into transit fleet operations.",
    solution:
      "Distributed concurrency control with atomic Redis seat locking (SET lock:seat ... EX 600), high-throughput search caching, and direct GTFS-RT Protobuf telematics for 4,100+ buses.",
    description:
      "Enterprise intercity luxury bus booking platform with atomic Redis seat locking, route search caching, and real-time live transit telematics powered by Delhi OTD GTFS-RT Protobuf feeds.",
    stack: "Node.js · Express · React 19 · Redis · MongoDB · GTFS-RT Protobuf",
    stats: [
      { v: "0", k: "race conditions" },
      { v: "4,100+", k: "live buses tracked" },
      { v: "600s", k: "atomic seat hold ttl" },
    ],
    glyph: "RP",
    fileLabel: "routepulse — 2025",
    demoBtnText: "live booking",
    sourceUrl: "https://github.com/AbhijeetDotexe/busBooking",
    featured: true,
    preview: "routepulse",
    caseStudy: `Booking an intercity bus seat looks like a simple CRUD application until five hundred passengers click on the same sleeper berth in the same second. Without distributed locks, relational transactions lock entire tables or fail silently, leading to catastrophic double bookings.

RoutePulse pairs a production-grade MERN architecture with in-memory distributed concurrency in Redis, layered Route-Controller-Service patterns, and a real-time transit radar streaming live telematics from the Delhi Open Transit Data (OTD) GTFS-RT binary Protocol Buffers feed.

## Before and after (measured metrics)

| Metric | Without Distributed Locks | RoutePulse (Redis Concurrency) |
| --- | --- | --- |
| Double booking rate | ~4.2% under concurrent test bursts | 0% (deterministic atomic reservation) |
| Popular corridor search p95 | ~340ms (repeated MongoDB queries) | ~8ms (Redis 60s cached corridor pipeline) |
| Live fleet telematics | N/A (static schedule guesses) | 4,100+ DTC Electric & CNG buses streamed live |
| Abandoned seat recovery | Manual administrative cleanup | Automatic release at TTL expiry (600s) |

## Atomic Seat Locking via Distributed Redis Keys

When a passenger clicks a seat on the multi-deck bus layout, we do not write to MongoDB immediately. We acquire an atomic lock in Redis:

\`\`\`javascript
const lockKey = \`lock:seat:\${tripId}:\${seatNumber}\`;
const acquired = await redis.set(lockKey, passengerSessionId, 'NX', 'EX', 600);
if (!acquired) {
  return res.status(409).json({ error: 'Seat is currently reserved by another passenger' });
}
\`\`\`

1. **Atomic Acquisition (\`NX\`)**: If two requests hit the backend within the same millisecond, Redis's single-threaded event loop ensures exactly one succeeds.
2. **Deterministic Time-To-Live (\`EX 600\`)**: If the user closes their browser or abandons checkout, the lock automatically expires after 10 minutes without orphaned database states.
3. **Instant Manual Release**: If the passenger deselects the berth, the lock is freed immediately, making the seat instantly available to other passengers.
4. **Permanent Transaction Commit**: Upon successful payment confirmation, the seat status is persisted into MongoDB and the ephemeral Redis lock is safely removed.

## Live Fleet Telematics: Ingesting Delhi GTFS-RT Protobuf

Most booking platforms rely on static timetables. RoutePulse ingests the official Govt of NCT Delhi Open Transit Data (OTD) real-time binary stream (\`VehiclePositions.pb\`):

- **Protobuf Decoding**: Parses compact binary feeds directly via \`gtfs-realtime-bindings\` rather than bloated JSON payloads.
- **Fleet Scale**: Monitors live GPS coordinates, bearings, speeds, and trip IDs across more than 4,100 active Electric and CNG buses in the capital region.
- **Interactive Transit Radar**: Provides an admin & passenger radar modal with electric fleet filtering, live speeds, nearest landmark geocoding (e.g. Kashmiri Gate ISBT, Dhaula Kuan), and Google Maps cross-linking.

## High-Throughput Search Caching & Layered Architecture

Corridor queries (e.g., Delhi to Chandigarh, Jaipur to Delhi) experience heavy read volumes. RoutePulse caches search results in Redis with a 60-second TTL. Whenever a new trip is scheduled or pricing is altered, invalidation hooks purge stale corridor keys.

The backend strictly enforces the **Route → Controller → Service** architectural separation:
- **Routes**: Handle URL definitions and authentication middleware.
- **Controllers**: Orchestrate HTTP request/response lifecycles and input extraction.
- **Services**: Encapsulate business logic, Redis lock acquisitions, Protobuf stream parsing, QR code generation, and database interactions.`,
  },
  {
    slug: "systemcraft-ai",
    title: "SystemCraft AI — Visual System Design Studio",
    liveUrl: "https://blueprint.abhijeetrana.com",
    tags: ["fullstack", "ai", "oss"],
    tagBadges: [
      { text: "production", hot: true },
      { text: "2025" },
      { text: "ai / ml" },
      { text: "canvas" },
    ],
    problem:
      "Translating complex distributed software architecture requirements into accurate, cleanly routed architecture diagrams is slow, manual, and prone to disorganized layouts.",
    solution:
      "Two-stage generative pipeline: Gemini AI translates prompts into strict Zod-validated node/edge schemas, while Dagre computes deterministic non-overlapping multi-tier layouts.",
    description:
      "Interactive architecture diagramming studio powered by Google Gemini AI. Generates multi-tier microservices, caches, and queues with automatic Dagre layout and real-time canvas editing.",
    stack: "React · TypeScript · Express · Gemini AI · Dagre Layout · MongoDB",
    stats: [
      { v: "100%", k: "valid schemas (zod)" },
      { v: "<1.2s", k: "dagre layout time" },
      { v: "6+", k: "infra categories" },
    ],
    glyph: "SC",
    fileLabel: "systemcraft.ai — 2025",
    demoBtnText: "launch studio",
    sourceUrl: "https://github.com/AbhijeetDotexe/system-design-ai",
    featured: true,
    preview: "systemcraft",
    caseStudy: `Architectural diagramming tools force engineers into a frustrating tradeoff: manually drag dozens of boxes and connectors in visual canvas tools, or write code-only DSLs that lack interactive visual refinement.

SystemCraft AI eliminates this friction by combining natural language system generation powered by Google Gemini with deterministic graph theory layout engines and a fluid, Excalidraw-inspired interactive canvas.

## Why LLMs Cannot Draw (and How We Fixed It)

Large language models excel at semantic reasoning: they understand why an API Gateway needs a Redis token bucket rate limiter before routing to an Order Service. But LLMs are notoriously bad at computing 2D canvas coordinates (x, y coordinates, collision bounding boxes, edge bezier routing).

If you ask an LLM to "draw" a diagram directly with coordinates, nodes overlap, edges crisscross, and the output is illegible.

SystemCraft AI decouples semantic reasoning from spatial geometry through a two-stage pipeline:

1. **Stage 1 (Semantic Graph Extraction)**: Gemini AI receives the architecture prompt and returns a pure logical graph (nodes with infrastructure types, labels, and directed dependencies). The output is strictly validated against a recursive Zod schema on the Express backend.
2. **Stage 2 (Topological Layout with Dagre)**: The raw graph is passed to a specialized Dagre hierarchical layout engine that calculates mathematical ranks, node bounding boxes, and collision-free edge routing in under 50ms.

\`\`\`typescript
// Server-side Zod contract enforcing valid graph topology
export const DiagramGraphSchema = z.object({
  nodes: z.array(z.object({
    id: z.string(),
    type: z.enum(['client', 'gateway', 'service', 'database', 'cache', 'queue']),
    label: z.string(),
    metadata: z.record(z.any()).optional(),
  })),
  edges: z.array(z.object({
    id: z.string(),
    source: z.string(),
    target: z.string(),
    label: z.string().optional(),
    animated: z.boolean().optional(),
  })),
});
\`\`\`

## Contextual AI Diagram Refinement ("Ask AI")

Static generation is only the first step. In real engineering sessions, architecture evolves incrementally: *"Add a Redis cache in front of PostgreSQL"*, or *"Split the billing service into a separate worker reading from Kafka"*.

The floating Ask AI assistant injects the active diagram topology as context into the prompt, instructing the model to perform surgical graph additions and rewiring while preserving existing component IDs. Dagre then realigns the newly added nodes seamlessly without shuffling the existing layout.

## Fluid Interactive Canvas Engine

- **Smooth Pan & Zoom**: Trackpad pinch and mouse wheel navigation with level-of-detail rendering.
- **Component Palette**: Curated library of cloud infrastructure components spanning Clients, Edge Gateways, Compute, Caches, Relational/NoSQL Stores, and Message Brokers.
- **Debounced Autosave & Version Restore**: Edits are debounced and saved to MongoDB with full version history snapshots.
- **Multi-Format Export**: One-click vector SVG export, high-res PNG, or structural JSON for documentation pipelines.`,
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
