import type { VendixItem } from "@/shared/types";
import { currency } from "@/shared/utils/currency";
import { statusLabel } from "@/shared/utils/status";

export function ItemSummary({ item }: { item: VendixItem }) {
  return (
    <div className="summary-card">
      <div className="large-thumb">{item.image ? <img src={item.image} alt={item.name} /> : <span>{item.category}</span>}</div>
      <div>
        <p className="eyebrow">{statusLabel(item.status)}</p>
        <h2>{item.name}</h2>
        <p>{item.category}{item.brand ? ` · ${item.brand}` : ""}</p>
      </div>
      <div className="summary-values">
        <span>Cost {currency(item.purchasePrice)}</span>
        <strong>List {currency(item.suggestedPrice)}</strong>
      </div>
    </div>
  );
}
