export type ProjectPreviewKind = "invoice" | "serverless";

export default function ProjectPreview({ kind }: { kind: ProjectPreviewKind }) {
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
            <span className="preview-prompt">$</span> deploy fn invoice-worker
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
