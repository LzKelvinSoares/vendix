import type { VendixItem } from "@/shared/types";
import { currency } from "@/shared/utils/currency";

export function ComparableListings({ item }: { item: VendixItem }) {
  return (
    <div className="form-card">
      <p className="eyebrow">Pricing data</p>
      <h3>Similar listings</h3>
      <div className="comps">
        {item.similarListings.map((listing) => (
          <div key={`${listing.marketplace}-${listing.title}`}>
            <span>{listing.marketplace}</span>
            <strong>{listing.title}</strong>
            <small>{listing.condition}</small>
            <b>{currency(listing.price)}</b>
          </div>
        ))}
      </div>
    </div>
  );
}
