import { SITE } from "./site";

export const RESUME = {
  name: SITE.name,
  title: "Full-Stack Engineer",
  email: SITE.email,
  location: "India · remote-first",
  links: {
    site: SITE.url,
    github: SITE.githubUrl,
    linkedin: SITE.linkedinUrl,
  },
  summary:
    "Full-stack engineer with 2+ years shipping production MERN and AWS systems — AI invoice automation, self-hosted serverless, and event-driven backends. I care about ingest latency, idempotent workers, and UIs that stay fast under real data.",
  skills: [
    "TypeScript · Node.js · Express · React",
    "MongoDB · Redis · PostgreSQL",
    "AWS Lambda · SQS · S3 · Docker",
    "OpenAI · document extraction · validation pipelines",
    "OpenWhisk · Prometheus · observability",
  ],
  experience: [
    {
      role: "Full-Stack Engineer",
      org: "Independent / contract",
      period: "2024 — present",
      highlights: [
        "Built AI Invoice Generator — MERN + Lambda + SQS, 10k+ invoices/month, 99.9% uptime",
        "Designed accept-then-process ingest; moved extraction off the HTTP path",
        "Shipped hybrid GPT-4 Vision + OCR extraction with arithmetic validation and human review queue",
      ],
    },
    {
      role: "Creator, ServerlessFlow",
      org: "Open source",
      period: "2024",
      highlights: [
        "Self-hosted FaaS on OpenWhisk + Docker with warm container pooling",
        "Sub-200ms reuse path; ~85% pool hit rate under load we measured",
        "Prometheus metrics for spawn time and pool sizing",
      ],
    },
  ],
  projects: [
    {
      name: "AI Invoice Generator",
      url: "https://invoicegen.abhijeetrana.com",
      stack: "Node.js · React · MongoDB · AWS · OpenAI",
    },
    {
      name: "ServerlessFlow",
      url: "https://serverless.abhijeetrana.com",
      stack: "OpenWhisk · Docker · Go · Prometheus",
    },
  ],
} as const;
