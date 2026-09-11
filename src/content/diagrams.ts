/** Inline SVG figures for blog articles (no external image CDN). */

export const DIAGRAMS = {
  acceptProcess: `<figure class="article-figure">
  <svg viewBox="0 0 720 280" role="img" aria-label="Accept then process flow">
    <defs>
      <linearGradient id="g1" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#3ecf8e" stop-opacity=".35"/>
        <stop offset="100%" stop-color="#3ecf8e" stop-opacity=".05"/>
      </linearGradient>
    </defs>
    <rect width="720" height="280" rx="20" fill="url(#g1)"/>
    <rect x="40" y="70" width="150" height="72" rx="14" fill="#0f1713" stroke="#3ecf8e" stroke-width="2"/>
    <text x="115" y="100" text-anchor="middle" fill="#e9ede9" font-size="14" font-family="monospace">POST /upload</text>
    <text x="115" y="122" text-anchor="middle" fill="#9aa69d" font-size="12" font-family="monospace">auth · store</text>
    <path d="M200 106 H250" stroke="#3ecf8e" stroke-width="2" marker-end="url(#arrow)"/>
    <rect x="260" y="70" width="150" height="72" rx="14" fill="#0f1713" stroke="#3ecf8e" stroke-width="2"/>
    <text x="335" y="100" text-anchor="middle" fill="#e9ede9" font-size="14" font-family="monospace">S3 + SQS</text>
    <text x="335" y="122" text-anchor="middle" fill="#9aa69d" font-size="12" font-family="monospace">object · key</text>
    <path d="M335 142 V175" stroke="#3ecf8e" stroke-width="2"/>
    <rect x="260" y="180" width="150" height="56" rx="14" fill="#13201a" stroke="#3ecf8e" stroke-width="1.5"/>
    <text x="335" y="214" text-anchor="middle" fill="#3ecf8e" font-size="13" font-family="monospace">202 · job id</text>
    <path d="M420 106 H470" stroke="#3ecf8e" stroke-width="2"/>
    <rect x="480" y="50" width="190" height="180" rx="16" fill="#0f1713" stroke="#3ecf8e" stroke-width="2"/>
    <text x="575" y="90" text-anchor="middle" fill="#e9ede9" font-size="14" font-family="monospace">workers</text>
    <text x="575" y="120" text-anchor="middle" fill="#9aa69d" font-size="12" font-family="monospace">extract</text>
    <text x="575" y="145" text-anchor="middle" fill="#9aa69d" font-size="12" font-family="monospace">validate</text>
    <text x="575" y="170" text-anchor="middle" fill="#9aa69d" font-size="12" font-family="monospace">persist</text>
    <text x="575" y="195" text-anchor="middle" fill="#9aa69d" font-size="12" font-family="monospace">webhook / DLQ</text>
  </svg>
  <figcaption>Ingest returns fast. The workflow lives on the queue.</figcaption>
</figure>`,

  validation: `<figure class="article-figure">
  <svg viewBox="0 0 720 260" role="img" aria-label="Model proposes, validation decides">
    <defs>
      <linearGradient id="g2" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="#3ecf8e" stop-opacity=".2"/>
        <stop offset="100%" stop-color="#5b8def" stop-opacity=".18"/>
      </linearGradient>
    </defs>
    <rect width="720" height="260" rx="20" fill="url(#g2)"/>
    <rect x="36" y="48" width="200" height="164" rx="16" fill="#0f1713" stroke="#5b8def" stroke-width="2"/>
    <text x="136" y="88" text-anchor="middle" fill="#e9ede9" font-size="15" font-family="monospace">GPT-4 Vision</text>
    <text x="136" y="118" text-anchor="middle" fill="#9aa69d" font-size="12" font-family="monospace">proposes JSON</text>
    <text x="136" y="148" text-anchor="middle" fill="#9aa69d" font-size="12" font-family="monospace">layout · fields</text>
    <text x="136" y="178" text-anchor="middle" fill="#5b8def" font-size="12" font-family="monospace">not truth</text>
    <path d="M246 130 H300" stroke="#3ecf8e" stroke-width="2"/>
    <rect x="310" y="48" width="200" height="164" rx="16" fill="#0f1713" stroke="#3ecf8e" stroke-width="2"/>
    <text x="410" y="88" text-anchor="middle" fill="#e9ede9" font-size="15" font-family="monospace">validators</text>
    <text x="410" y="118" text-anchor="middle" fill="#9aa69d" font-size="12" font-family="monospace">schema</text>
    <text x="410" y="143" text-anchor="middle" fill="#9aa69d" font-size="12" font-family="monospace">arithmetic</text>
    <text x="410" y="168" text-anchor="middle" fill="#9aa69d" font-size="12" font-family="monospace">identity</text>
    <text x="410" y="193" text-anchor="middle" fill="#3ecf8e" font-size="12" font-family="monospace">fail → review</text>
    <path d="M520 130 H574" stroke="#3ecf8e" stroke-width="2"/>
    <rect x="584" y="70" width="100" height="50" rx="12" fill="#13201a" stroke="#3ecf8e"/>
    <text x="634" y="100" text-anchor="middle" fill="#3ecf8e" font-size="13" font-family="monospace">accept</text>
    <rect x="584" y="140" width="100" height="50" rx="12" fill="#1a1410" stroke="#e0a15c"/>
    <text x="634" y="170" text-anchor="middle" fill="#e0a15c" font-size="13" font-family="monospace">human</text>
  </svg>
  <figcaption>The model suggests. Math and schema decide what ships.</figcaption>
</figure>`,

  warmPool: `<figure class="article-figure">
  <svg viewBox="0 0 720 270" role="img" aria-label="Warm pool vs cold allocate">
    <defs>
      <linearGradient id="g3" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#3ecf8e" stop-opacity=".28"/>
        <stop offset="100%" stop-color="#0a0f0c" stop-opacity=".1"/>
      </linearGradient>
    </defs>
    <rect width="720" height="270" rx="20" fill="url(#g3)"/>
    <text x="48" y="48" fill="#9aa69d" font-size="12" font-family="monospace">WARM POOL</text>
    <rect x="48" y="64" width="70" height="90" rx="10" fill="#0f1713" stroke="#3ecf8e" stroke-width="2"/>
    <rect x="130" y="64" width="70" height="90" rx="10" fill="#0f1713" stroke="#3ecf8e" stroke-width="2"/>
    <rect x="212" y="64" width="70" height="90" rx="10" fill="#0f1713" stroke="#3ecf8e" stroke-width="2"/>
    <rect x="294" y="64" width="70" height="90" rx="10" fill="#13201a" stroke="#3ecf8e" stroke-dasharray="4 3"/>
    <text x="83" y="115" text-anchor="middle" fill="#3ecf8e" font-size="11" font-family="monospace">ready</text>
    <text x="165" y="115" text-anchor="middle" fill="#3ecf8e" font-size="11" font-family="monospace">ready</text>
    <text x="247" y="115" text-anchor="middle" fill="#3ecf8e" font-size="11" font-family="monospace">busy</text>
    <text x="329" y="115" text-anchor="middle" fill="#9aa69d" font-size="11" font-family="monospace">spare</text>
    <path d="M400 110 H460" stroke="#3ecf8e" stroke-width="2"/>
    <text x="430" y="98" text-anchor="middle" fill="#9aa69d" font-size="11" font-family="monospace">hit</text>
    <rect x="470" y="70" width="200" height="80" rx="14" fill="#0f1713" stroke="#3ecf8e" stroke-width="2"/>
    <text x="570" y="105" text-anchor="middle" fill="#e9ede9" font-size="14" font-family="monospace">invoke &lt;200ms</text>
    <text x="570" y="128" text-anchor="middle" fill="#9aa69d" font-size="12" font-family="monospace">reuse path</text>
    <text x="48" y="190" fill="#9aa69d" font-size="12" font-family="monospace">COLD PATH</text>
    <rect x="48" y="204" width="622" height="40" rx="10" fill="#0f1713" stroke="#e0a15c" stroke-width="1.5"/>
    <text x="359" y="229" text-anchor="middle" fill="#e0a15c" font-size="13" font-family="monospace">allocate → init → load  ·  pay this before the user waits</text>
  </svg>
  <figcaption>Pool hit rate is the product metric. Spawn time is the cost metric.</figcaption>
</figure>`,

  replay: `<figure class="article-figure">
  <svg viewBox="0 0 720 250" role="img" aria-label="Replayable worker ledger">
    <defs>
      <linearGradient id="g4" x1="1" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#3ecf8e" stop-opacity=".22"/>
        <stop offset="100%" stop-color="#c084fc" stop-opacity=".12"/>
      </linearGradient>
    </defs>
    <rect width="720" height="250" rx="20" fill="url(#g4)"/>
    <rect x="40" y="50" width="160" height="150" rx="14" fill="#0f1713" stroke="#3ecf8e" stroke-width="2"/>
    <text x="120" y="90" text-anchor="middle" fill="#e9ede9" font-size="14" font-family="monospace">message</text>
    <text x="120" y="120" text-anchor="middle" fill="#9aa69d" font-size="11" font-family="monospace">job · key</text>
    <text x="120" y="145" text-anchor="middle" fill="#9aa69d" font-size="11" font-family="monospace">object key</text>
    <text x="120" y="170" text-anchor="middle" fill="#9aa69d" font-size="11" font-family="monospace">attempt</text>
    <path d="M210 125 H260" stroke="#3ecf8e" stroke-width="2"/>
    <rect x="270" y="50" width="180" height="150" rx="14" fill="#0f1713" stroke="#3ecf8e" stroke-width="2"/>
    <text x="360" y="95" text-anchor="middle" fill="#e9ede9" font-size="14" font-family="monospace">S3 bytes</text>
    <text x="360" y="125" text-anchor="middle" fill="#9aa69d" font-size="12" font-family="monospace">canonical input</text>
    <text x="360" y="155" text-anchor="middle" fill="#3ecf8e" font-size="12" font-family="monospace">replayable</text>
    <path d="M460 125 H510" stroke="#3ecf8e" stroke-width="2"/>
    <rect x="520" y="40" width="160" height="170" rx="14" fill="#0f1713" stroke="#c084fc" stroke-width="2"/>
    <text x="600" y="80" text-anchor="middle" fill="#e9ede9" font-size="14" font-family="monospace">ledger</text>
    <text x="600" y="110" text-anchor="middle" fill="#9aa69d" font-size="11" font-family="monospace">intent</text>
    <text x="600" y="135" text-anchor="middle" fill="#9aa69d" font-size="11" font-family="monospace">complete</text>
    <text x="600" y="160" text-anchor="middle" fill="#9aa69d" font-size="11" font-family="monospace">skip on retry</text>
    <text x="600" y="185" text-anchor="middle" fill="#c084fc" font-size="11" font-family="monospace">idempotent</text>
  </svg>
  <figcaption>Small messages. Stored inputs. A ledger for every side effect.</figcaption>
</figure>`,

  observability: `<figure class="article-figure">
  <svg viewBox="0 0 720 240" role="img" aria-label="Signals that matter for queues">
    <defs>
      <linearGradient id="g5" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="#e0a15c" stop-opacity=".2"/>
        <stop offset="100%" stop-color="#3ecf8e" stop-opacity=".25"/>
      </linearGradient>
    </defs>
    <rect width="720" height="240" rx="20" fill="url(#g5)"/>
    <rect x="40" y="50" width="140" height="140" rx="14" fill="#0f1713" stroke="#e0a15c" stroke-width="2"/>
    <text x="110" y="110" text-anchor="middle" fill="#e0a15c" font-size="22" font-family="monospace">age</text>
    <text x="110" y="140" text-anchor="middle" fill="#9aa69d" font-size="12" font-family="monospace">queue wait</text>
    <rect x="206" y="50" width="140" height="140" rx="14" fill="#0f1713" stroke="#3ecf8e" stroke-width="2"/>
    <text x="276" y="110" text-anchor="middle" fill="#3ecf8e" font-size="22" font-family="monospace">dlq</text>
    <text x="276" y="140" text-anchor="middle" fill="#9aa69d" font-size="12" font-family="monospace">poison depth</text>
    <rect x="372" y="50" width="140" height="140" rx="14" fill="#0f1713" stroke="#5b8def" stroke-width="2"/>
    <text x="442" y="110" text-anchor="middle" fill="#5b8def" font-size="18" font-family="monospace">p99</text>
    <text x="442" y="140" text-anchor="middle" fill="#9aa69d" font-size="12" font-family="monospace">model latency</text>
    <rect x="538" y="50" width="140" height="140" rx="14" fill="#0f1713" stroke="#c084fc" stroke-width="2"/>
    <text x="608" y="110" text-anchor="middle" fill="#c084fc" font-size="16" font-family="monospace">fail%</text>
    <text x="608" y="140" text-anchor="middle" fill="#9aa69d" font-size="12" font-family="monospace">validation</text>
  </svg>
  <figcaption>CPU graphs lie. Queue age and validation fail rate tell the truth.</figcaption>
</figure>`,

  mernPerformance: `<figure class="article-figure">
  <svg viewBox="0 0 720 280" role="img" aria-label="MERN performance layers">
    <defs>
      <linearGradient id="g6" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#5b8def" stop-opacity=".28"/>
        <stop offset="100%" stop-color="#3ecf8e" stop-opacity=".2"/>
      </linearGradient>
    </defs>
    <rect width="720" height="280" rx="20" fill="url(#g6)"/>
    <rect x="40" y="40" width="640" height="52" rx="12" fill="#0f1713" stroke="#5b8def" stroke-width="2"/>
    <text x="360" y="72" text-anchor="middle" fill="#5b8def" font-size="14" font-family="monospace">React — split routes · virtualize lists · stop fetch waterfalls</text>
    <rect x="40" y="108" width="640" height="52" rx="12" fill="#0f1713" stroke="#3ecf8e" stroke-width="2"/>
    <text x="360" y="140" text-anchor="middle" fill="#3ecf8e" font-size="14" font-family="monospace">Express — paginate · lean JSON · never block the event loop</text>
    <rect x="40" y="176" width="640" height="52" rx="12" fill="#0f1713" stroke="#e0a15c" stroke-width="2"/>
    <text x="360" y="208" text-anchor="middle" fill="#e0a15c" font-size="14" font-family="monospace">MongoDB — index the filter · project fields · pool connections</text>
    <rect x="220" y="244" width="280" height="28" rx="8" fill="#13201a" stroke="#c084fc" stroke-width="1.5"/>
    <text x="360" y="263" text-anchor="middle" fill="#c084fc" font-size="12" font-family="monospace">measure p95 per layer, not "the app feels slow"</text>
  </svg>
  <figcaption>Most MERN slowness is one unindexed query or one bloated bundle — not the stack.</figcaption>
</figure>`,
} as const;
