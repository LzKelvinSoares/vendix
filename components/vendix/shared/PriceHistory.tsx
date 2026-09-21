import type { VendixItem } from "@/shared/types";

export function PriceHistory({ item }: { item: VendixItem }) {
  const max = Math.max(...item.priceHistory.map((entry) => entry.value));
  return (
    <div className="form-card">
      <p className="eyebrow">Trend</p>
      <h3>Price history</h3>
      <div className="history-chart">
        {item.priceHistory.map((entry) => (
          <div key={entry.label}>
            <i style={{ height: `${Math.max(18, (entry.value / max) * 100)}%` }} />
            <span>{entry.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
