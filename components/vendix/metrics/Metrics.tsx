import { Metric } from "@/components/vendix/shared/Metric";
import type { DashboardMetrics, VendixItem } from "@/shared/types";
import { currency } from "@/shared/utils/currency";

export function Metrics({ items, metrics }: { items: VendixItem[]; metrics: DashboardMetrics }) {
  const categories = Object.entries(
    items.reduce<Record<string, number>>((acc, item) => {
      acc[item.category] = (acc[item.category] ?? 0) + Math.max(0, item.margin);
      return acc;
    }, {}),
  ).sort((a, b) => b[1] - a[1]);

  return (
    <div className="stack">
      <div className="section-heading"><div><p className="eyebrow">Metrics</p><h2>Resale performance</h2></div></div>
      <div className="metric-grid">
        <Metric label="Estimated total profit" value={currency(metrics.totalProfit)} />
        <Metric label="Sold profit" value={currency(metrics.realizedProfit)} />
        <Metric label="Average time to sale" value={metrics.averageDays ? `${metrics.averageDays} days` : "No sales yet"} />
        <Metric label="Top category" value={metrics.topCategory} />
      </div>
      <div className="form-card">
        <h3>Most profitable categories</h3>
        <div className="category-bars">
          {categories.map(([category, value]) => (
            <div key={category}>
              <span>{category}</span>
              <i style={{ width: `${Math.min(100, (value / Math.max(1, categories[0]?.[1] ?? 1)) * 100)}%` }} />
              <strong>{currency(value)}</strong>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
