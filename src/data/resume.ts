import { SITE } from "./site";

export type SkillCategory = {
  category: string;
  items: string[];
};

export type ResumeJob = {
  role: string;
  org: string;
  period: string;
  location?: string;
  tagline?: string;
  highlights: string[];
};

export type ResumeProject = {
  name: string;
  url: string;
  githubUrl?: string;
  description: string;
  stack: string;
};

export const RESUME = {
  name: SITE.name,
  title: "Software Developer",
  subtitle: "Full-Stack · Cloud Systems · AI Tooling",
  email: SITE.email,
  location: "India · Remote-first",
  links: {
    site: SITE.url,
    github: SITE.githubUrl,
    linkedin: SITE.linkedinUrl,
  },
  summary:
    "Software Developer at LCNC Technologies (DrapCode) with 2+ years of production experience architecting scalable low-code/no-code platforms, cloud infrastructure, and AI systems. Specialized in core platform performance optimization, sandboxed serverless execution engines, bidirectional GitHub CI/CD integrations, modular plugin ecosystems, and building custom Model Context Protocol (MCP) servers. Hands-on expertise managing enterprise AWS services (Lambda, KMS, S3, CloudWatch, CloudTrail, SNS, SQS) and partnering with global enterprise clients to design, troubleshoot, and ship high-throughput production solutions.",
  skillCategories: [
    {
      category: "Languages & Frameworks",
      items: [
        "TypeScript",
        "JavaScript",
        "Node.js",
        "Express",
        "React 19",
        "Next.js",
        "HTML5 / Modern CSS",
      ],
    },
    {
      category: "Cloud & Infrastructure (AWS)",
      items: [
        "AWS Lambda",
        "AWS KMS (Encryption & Secrets)",
        "Amazon S3",
        "AWS CloudWatch (Telemetry & Alarms)",
        "AWS CloudTrail (Audit & Compliance)",
        "Amazon SNS & SQS (Event Queues)",
        "Docker Containerization",
        "Linux Server Management",
      ],
    },
    {
      category: "Architecture & Data",
      items: [
        "Serverless Functions Engine",
        "Distributed Systems & Concurrency",
        "Redis (Distributed Locks & Caching)",
        "MongoDB",
        "PostgreSQL",
        "REST APIs & Webhooks",
      ],
    },
    {
      category: "Developer Tooling & Integrations",
      items: [
        "GitHub VCS Integration",
        "Custom Plugin Architecture",
        "CI/CD Pipelines",
        "GTFS-RT Protobuf Telematics",
        "Dagre Graph Layout Engine",
      ],
    },
    {
      category: "AI & Modern Toolchains",
      items: [
        "Model Context Protocol (MCP) Servers",
        "LLMs & Agent Toolchains",
        "Google Gemini AI",
        "Zod Schema Contracts",
        "Contextual Prompting",
      ],
    },
  ],
  skills: [
    "TypeScript · Node.js · Express · React 19 · Next.js",
    "AWS Lambda · S3 · KMS · CloudWatch · CloudTrail · SNS · SQS",
    "Model Context Protocol (MCP) · LLM Toolchains · Gemini AI",
    "Serverless Functions Engine · GitHub Integrations · Plugin Systems",
    "Redis (Locks & Caching) · MongoDB · PostgreSQL · Docker",
  ],
  experience: [
    {
      role: "Software Developer",
      org: "LCNC Technologies Pvt. Ltd. / DrapCode",
      period: "2023 — Present",
      location: "India · Hybrid / Remote",
      tagline: "Enterprise No-Code / Low-Code Web Application Builder & Cloud Platform",
      highlights: [
        "Platform Performance Optimization: Profiled and resolved execution bottlenecks across core application runtimes, dynamic builder rendering engines, and database access layers, substantially cutting p95 response times under heavy concurrent builder workloads.",
        "Serverless Functions Engine: Designed and shipped an in-platform serverless execution system enabling users to write, test, and run event-driven backend functions with isolated runtime execution.",
        "GitHub VCS Integration: Engineered native bidirectional GitHub integration featuring automated repository exports, branch commit workflows, and continuous deployment synchronization directly from the builder.",
        "Modular Plugin Architecture: Developed an extensible plugin framework empowering third-party integrations, custom action blocks, and reusable UI/backend extensions across user workspaces.",
        "Model Context Protocol (MCP) & AI Systems: Researched and integrated modern LLM capabilities; engineered custom Model Context Protocol (MCP) servers and client toolchains across entire projects and client solutions, connecting AI agents to platform APIs, schemas, and live database context.",
        "AWS Cloud Infrastructure & Server Management: Managed and hardened production AWS environments utilizing AWS Lambda for serverless compute, KMS for secret & payload encryption, S3 for multi-tenant asset storage, CloudWatch & CloudTrail for telemetry and audit compliance, and SNS/SQS for decoupled messaging.",
        "Enterprise Client Solutions: Collaborated directly with enterprise clients to translate bespoke business workflows into platform features, diagnose production edge-cases, and deliver custom technical integrations.",
      ],
    },
    {
      role: "Creator & Systems Engineer",
      org: "Independent & Open Source",
      period: "2024 — 2025",
      location: "Open Source",
      tagline: "Distributed Systems, Real-Time Telematics & AI Diagramming Tools",
      highlights: [
        "RoutePulse: Built production intercity luxury bus reservation system featuring Redis distributed concurrency locks (SET lock:seat ... EX 600) eliminating double booking race conditions, and real-time live transit radar ingesting Delhi OTD GTFS-RT Protobuf feeds (4,100+ buses).",
        "SystemCraft AI: Engineered visual distributed architecture studio powered by Google Gemini AI, server-side Zod validation contracts, Dagre graph layout engine, and an infinite pan/zoom canvas.",
        "ServerlessFlow: Developed self-hosted FaaS platform on OpenWhisk + Docker with pre-warmed container pooling (<200ms reuse path) and Prometheus observability.",
      ],
    },
  ],
  projects: [
    {
      name: "RoutePulse",
      url: "https://booking.abhijeetrana.com",
      githubUrl: "https://github.com/AbhijeetDotexe/busBooking",
      description: "Intercity bus reservation engine with atomic Redis distributed locking and Delhi OTD live bus telematics.",
      stack: "Node.js · Express · React 19 · Redis · MongoDB · GTFS-RT",
    },
    {
      name: "SystemCraft AI",
      url: "https://blueprint.abhijeetrana.com",
      githubUrl: "https://github.com/AbhijeetDotexe/system-design-ai",
      description: "Visual system architecture platform with Gemini AI generation, Zod schemas, and Dagre graph auto-layout.",
      stack: "React · TypeScript · Express · Gemini AI · Dagre · MongoDB",
    },
    {
      name: "ServerlessFlow",
      url: "https://serverless.abhijeetrana.com",
      githubUrl: "https://github.com/AbhijeetDotexe/frontendServerless",
      description: "Self-hosted function-as-a-service platform with warm container reuse and Prometheus monitoring.",
      stack: "OpenWhisk · Docker · Go · Prometheus",
    },
  ],
} as const;
