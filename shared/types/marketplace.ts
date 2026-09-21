export type MarketplaceName = "OLX" | "Vinted" | "Facebook" | "eBay";

export type ItemCondition = "New" | "Like new" | "Good" | "Used";

export type SimilarListing = {
  marketplace: MarketplaceName;
  title: string;
  price: number;
  condition: ItemCondition;
  url: string;
};
