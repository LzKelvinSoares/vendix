import type { ItemCondition, MarketplaceName } from "@/shared/types/marketplace";

export const MARKETPLACE_NAMES: MarketplaceName[] = ["OLX", "Vinted", "Facebook", "eBay"];

export const MARKETPLACE_URLS: Record<MarketplaceName, string> = {
  OLX: "https://www.olx.pt/",
  Vinted: "https://www.vinted.pt/",
  Facebook: "https://www.facebook.com/marketplace/",
  eBay: "https://www.ebay.com/",
};

export const ITEM_CONDITIONS: ItemCondition[] = ["Like new", "Good", "Used", "New"];
