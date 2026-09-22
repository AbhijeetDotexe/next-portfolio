/** Maps project slugs to related blog essay slugs. */
export const PROJECT_ESSAYS: Record<string, string[]> = {
  routepulse: [
    "mern-stack-performance",
    "watch-the-queue-not-the-cpu",
    "accept-then-process",
  ],
  "systemcraft-ai": [
    "extraction-is-validation",
    "mern-stack-performance",
  ],
  "serverless-flow": ["warm-pools-not-myths", "workers-you-can-replay"],
  "invoice-gen": [
    "mern-stack-performance",
    "accept-then-process",
    "extraction-is-validation",
  ],
};
