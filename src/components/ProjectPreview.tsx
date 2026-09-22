export type ProjectPreviewKind = "invoice" | "serverless" | "routepulse" | "systemcraft";

export default function ProjectPreview({ kind }: { kind: ProjectPreviewKind }) {
  if (kind === "routepulse") {
    return (
      <div className="project-preview" aria-hidden="true">
        <div className="preview-chrome">
          <span /><span /><span />
          <div className="preview-url">booking.abhijeetrana.com</div>
        </div>
        <div className="preview-body routepulse-preview">
          <div className="routepulse-header">
            <div className="radar-status">
              <span className="live-dot" />
              <span className="radar-label">DELHI OTD RADAR · 4,180 BUSES</span>
            </div>
            <span className="telematics-speed">48 km/h</span>
          </div>
          <div className="bus-deck-wrap">
            <div className="bus-aisle-label">UPPER DECK · SLEEPER 2+1</div>
            <div className="bus-seat-grid">
              <div className="bus-berth booked">U1</div>
              <div className="bus-berth booked">U2</div>
              <div className="bus-berth available">U3</div>
              <div className="bus-berth locked-self">U4</div>
              <div className="bus-berth available">U5</div>
              <div className="bus-berth booked">U6</div>
            </div>
          </div>
          <div className="routepulse-footer">
            <span className="redis-lock-indicator">
              <i /> LOCK: U4 · TTL 09:48
            </span>
            <span className="status-pill ok">GTFS-RT SYNC</span>
          </div>
        </div>
      </div>
    );
  }

  if (kind === "systemcraft") {
    return (
      <div className="project-preview" aria-hidden="true">
        <div className="preview-chrome">
          <span /><span /><span />
          <div className="preview-url">blueprint.abhijeetrana.com</div>
        </div>
        <div className="preview-body systemcraft-preview">
          <div className="canvas-prompt-bar">
            <span className="sparkle">✦</span>
            <span className="prompt-text">Add Redis cache & Kafka queue</span>
          </div>
          <div className="canvas-graph-mock">
            <div className="graph-tier tier-gateway">
              <span className="graph-node node-client">Client App</span>
              <span className="graph-arrow">→</span>
              <span className="graph-node node-gateway">API Gateway</span>
            </div>
            <div className="graph-tier tier-services">
              <span className="graph-node node-cache">Redis [60s]</span>
              <span className="graph-node node-service">Auth Svc</span>
              <span className="graph-node node-db">PostgreSQL</span>
            </div>
          </div>
          <div className="systemcraft-footer">
            <span className="engine-badge">DAGRE AUTO-LAYOUT</span>
            <span className="status-pill ok">ZOD VERIFIED</span>
          </div>
        </div>
      </div>
    );
  }

  if (kind === "invoice") {
    return (
      <div className="project-preview" aria-hidden="true">
        <div className="preview-chrome">
          <span /><span /><span />
          <div className="preview-url">invoicegen.abhijeetrana.com</div>
        </div>
        <div className="preview-body invoice-preview">
          <div className="preview-sidebar">
            <div className="preview-pill hot" />
            <div className="preview-pill" />
            <div className="preview-pill" />
            <div className="preview-pill muted" />
          </div>
          <div className="preview-main">
            <div className="preview-row">
              <span className="preview-label">invoices</span>
              <span className="preview-stat">10,284</span>
            </div>
            <div className="preview-table">
              <div className="preview-table-head" />
              <div className="preview-table-row accent" />
              <div className="preview-table-row" />
              <div className="preview-table-row" />
              <div className="preview-table-row warn" />
            </div>
            <div className="preview-badge">extracted · validated</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="project-preview" aria-hidden="true">
      <div className="preview-chrome">
        <span /><span /><span />
        <div className="preview-url">serverless.abhijeetrana.com</div>
      </div>
      <div className="preview-body serverless-preview">
        <div className="preview-terminal">
          <div className="preview-line">
            <span className="preview-prompt">$</span> deploy fn worker-01
          </div>
          <div className="preview-line ok">pool hit · 142ms</div>
          <div className="preview-line">concurrency 47 / 100</div>
          <div className="preview-line warn">cold allocate · 890ms</div>
          <div className="preview-spark">
            <i style={{ height: "40%" }} />
            <i style={{ height: "70%" }} />
            <i style={{ height: "55%" }} />
            <i style={{ height: "90%" }} />
            <i style={{ height: "65%" }} />
            <i style={{ height: "85%" }} />
          </div>
        </div>
      </div>
    </div>
  );
}
