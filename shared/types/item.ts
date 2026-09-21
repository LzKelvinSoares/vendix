import type { SimilarListing } from "./marketplace";

export type ItemStatus = "for-sale" | "sold" | "archived" | "draft";

export type PriceHistoryPoint = {
  label: string;
  value: number;
};

export type VendixItem = {
  id: string;
  name: string;
  category: string;
  brand?: string;
  purchasePrice: number;
  suggestedPrice: number;
  confidence: number;
  margin: number;
  status: ItemStatus;
  image?: string;
  createdAt: string;
  soldAt?: string;
  daysToSale?: number;
  generatedDescription: string;
  similarListings: SimilarListing[];
  priceHistory: PriceHistoryPoint[];
};
