import { HERO_PROMPTS } from "@/shared/constants/app";
import type { DashboardMetrics } from "@/shared/types";
import { currency } from "@/shared/utils/currency";

export function HeroPanel({ metrics, onDashboard, onNewItem }: {
  metrics: DashboardMetrics;
  onDashboard: () => void;
  onNewItem: () => void;
}) {
  return (
    <div className="hero-grid">
      <div>
        <p className="eyebrow">AI resale intelligence</p>
        <h1>Scan an item. Know its resale value. Publish with confidence.</h1>
        <p className="hero-copy">
          Vendix turns a camera photo into pricing guidance, profit estimates, marketplace comps, and listing copy for resellers.
        </p>
        <div className="hero-actions">
          <button className="primary" onClick={onNewItem}>Evaluate item</button>
          <button className="ghost" onClick={onDashboard}>View portfolio</button>
        </div>
        <div className="prompt-row">
          {HERO_PROMPTS.map((prompt) => <span key={prompt}>{prompt}</span>)}
        </div>
      </div>
      <aside className="profit-card" aria-label="Profit summary">
        <span className="card-label">Estimated total margin</span>
        <strong>{currency(metrics.totalProfit)}</strong>
        <small>{metrics.activeCount} active listings · {metrics.soldCount} sold</small>
        <div className="sparkline" aria-hidden="true">
          {[34, 48, 40, 65, 58, 78, 92].map((height, index) => <i key={index} style={{ height: `${height}%` }} />)}
        </div>
      </aside>
    </div>
  );
}
