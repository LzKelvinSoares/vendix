export type EvaluationInput = {
  name: string;
  category: string;
  brand?: string;
  purchasePrice: number;
  image?: string;
};

export type AiEvaluationResult = {
  name: string;
  category: string;
  brand?: string;
  suggestedPrice: number;
  confidence: number;
  generatedDescription: string;
  similarListings: Array<{
    marketplace: "OLX" | "Vinted" | "Facebook" | "eBay";
    title: string;
    price: number;
    condition: "New" | "Like new" | "Good" | "Used";
    url: string;
  }>;
  priceHistory: Array<{
    label: string;
    value: number;
  }>;
};
