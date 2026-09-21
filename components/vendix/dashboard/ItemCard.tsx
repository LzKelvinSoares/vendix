import type { VendixItem } from "@/shared/types";
import { currency } from "@/shared/utils/currency";
import { statusLabel } from "@/shared/utils/status";

export function ItemCard({ item, onOpen }: { item: VendixItem; onOpen: () => void }) {
  return (
    <button className="item-card" onClick={onOpen}>
      <div className="thumb">{item.image ? <img src={item.image} alt="" /> : <span>{item.category.slice(0, 2)}</span>}</div>
      <div>
        <div className="item-row"><strong>{item.name}</strong><span className={`status ${item.status}`}>{statusLabel(item.status)}</span></div>
        <p>{item.category}{item.brand ? ` · ${item.brand}` : ""}</p>
        <div className="price-row"><span>{currency(item.suggestedPrice)}</span><small>Margin {currency(item.margin)}</small></div>
      </div>
    </button>
  );
}
