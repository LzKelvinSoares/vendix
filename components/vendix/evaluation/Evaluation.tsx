import { ComparableListings } from "@/components/vendix/shared/ComparableListings";
import { ItemSummary } from "@/components/vendix/shared/ItemSummary";
import { PriceHistory } from "@/components/vendix/shared/PriceHistory";
import type { ItemStatus, VendixItem } from "@/shared/types";
import { currency } from "@/shared/utils/currency";

export function Evaluation({ item, onDetail, onStatus }: {
  item: VendixItem;
  onDetail: () => void;
  onStatus: (id: string, status: ItemStatus) => void;
}) {
  return (
    <div className="evaluation-grid">
      <ItemSummary item={item} />
      <div className="valuation-card highlight">
        <p className="eyebrow">Suggested price</p>
        <strong>{currency(item.suggestedPrice)}</strong>
        <span>{item.confidence}% confidence based on similar listings</span>
        <div className="margin-pill">Estimated margin: {currency(item.margin)}</div>
        <div className="button-row">
          <button className="primary" onClick={onDetail}>Open detail</button>
          <button className="ghost" onClick={() => onStatus(item.id, "sold")}>Mark sold</button>
        </div>
      </div>
      <ComparableListings item={item} />
      <PriceHistory item={item} />
    </div>
  );
}
