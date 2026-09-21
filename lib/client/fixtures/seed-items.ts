import type { VendixItem } from "@/shared/types";

export function seedItems(): VendixItem[] {
  return [
    {
      id: "seed-1",
      name: "Sony WH-1000XM4 headphones",
      category: "Electronics",
      brand: "Sony",
      purchasePrice: 92,
      suggestedPrice: 168,
      confidence: 88,
      margin: 76,
      status: "for-sale",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
      generatedDescription:
        "Premium Sony noise-cancelling headphones in good condition. Tested, cleaned, and ready to use. Includes charging cable.",
      similarListings: [
        { marketplace: "OLX", title: "Sony WH-1000XM4 black", price: 165, condition: "Good", url: "https://example.com/olx" },
        { marketplace: "Vinted", title: "Sony headphones XM4", price: 155, condition: "Used", url: "https://example.com/vinted" },
        { marketplace: "Facebook", title: "WH-1000XM4 with case", price: 179, condition: "Like new", url: "https://example.com/facebook" },
      ],
      priceHistory: [
        { label: "30d", value: 151 },
        { label: "21d", value: 159 },
        { label: "14d", value: 172 },
        { label: "7d", value: 166 },
        { label: "Now", value: 168 },
      ],
    },
    {
      id: "seed-2",
      name: "Nike Dunk Low Retro",
      category: "Sneakers",
      brand: "Nike",
      purchasePrice: 64,
      suggestedPrice: 119,
      confidence: 82,
      margin: 55,
      status: "sold",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 19).toISOString(),
      soldAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(),
      daysToSale: 12,
      generatedDescription:
        "Nike Dunk Low Retro sneakers, lightly worn and freshly cleaned. Great everyday pair with strong resale demand.",
      similarListings: [
        { marketplace: "Vinted", title: "Nike Dunk Low", price: 115, condition: "Good", url: "https://example.com/vinted" },
        { marketplace: "eBay", title: "Dunk Low Retro", price: 128, condition: "Used", url: "https://example.com/ebay" },
      ],
      priceHistory: [
        { label: "30d", value: 110 },
        { label: "21d", value: 114 },
        { label: "14d", value: 121 },
        { label: "7d", value: 119 },
        { label: "Sold", value: 119 },
      ],
    },
  ];
}
