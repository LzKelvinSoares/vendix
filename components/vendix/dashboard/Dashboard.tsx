import { Metric } from "@/components/vendix/shared/Metric";
import type { DashboardMetrics, VendixItem } from "@/shared/types";
import { currency } from "@/shared/utils/currency";
import { ItemCard } from "./ItemCard";

export function Dashboard({ items, metrics, onNew, onOpen }: {
  items: VendixItem[];
  metrics: DashboardMetrics;
  onNew: () => void;
  onOpen: (id: string) => void;
}) {
  return (
    <div className="stack">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Dashboard</p>
          <h2>Your evaluated items</h2>
        </div>
        <button className="primary" onClick={onNew}>Scan product</button>
      </div>
      <div className="metric-grid">
        <Metric label="Potential margin" value={currency(metrics.totalProfit)} />
        <Metric label="Realized profit" value={currency(metrics.realizedProfit)} />
        <Metric label="Avg. time to sale" value={metrics.averageDays ? `${metrics.averageDays} days` : "—"} />
        <Metric label="Best category" value={metrics.topCategory} />
      </div>
      <div className="item-grid">
        {items.map((item) => <ItemCard key={item.id} item={item} onOpen={() => onOpen(item.id)} />)}
      </div>
    </div>
  );
}
