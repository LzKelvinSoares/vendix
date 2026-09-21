import { ComparableListings } from "@/components/vendix/shared/ComparableListings";
import { ItemSummary } from "@/components/vendix/shared/ItemSummary";
import { PriceHistory } from "@/components/vendix/shared/PriceHistory";
import type { ItemStatus, VendixItem } from "@/shared/types";
import { currency } from "@/shared/utils/currency";

export function ItemDetail({ item, onStatus }: {
  item: VendixItem;
  onStatus: (id: string, status: ItemStatus) => void;
}) {
  const publishText = encodeURIComponent(`${item.name} - ${currency(item.suggestedPrice)}\n\n${item.generatedDescription}`);
  return (
    <div className="detail-grid">
      <ItemSummary item={item} />
      <div className="form-card">
        <p className="eyebrow">Generated listing</p>
        <h2>{item.name}</h2>
        <textarea readOnly value={item.generatedDescription} />
        <div className="button-row wrap">
          <a className="primary link-button" href={`https://www.olx.pt/ads/create/?text=${publishText}`} target="_blank" rel="noreferrer">Publish to OLX</a>
          <a className="ghost link-button" href={`https://www.facebook.com/marketplace/create/item?description=${publishText}`} target="_blank" rel="noreferrer">Marketplace</a>
          <button className="ghost" onClick={() => onStatus(item.id, "archived")}>Archive</button>
        </div>
      </div>
      <ComparableListings item={item} />
      <PriceHistory item={item} />
    </div>
  );
}
