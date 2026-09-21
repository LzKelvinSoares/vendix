import { PRODUCT_CATEGORIES } from "@/shared/constants/forms";
import { MARKETPLACE_URLS } from "@/shared/constants/marketplace";
import { buildInlineImagePart } from "@/shared/helpers/media";
import { clamp, normalizeMoney } from "@/shared/helpers/number";
import type { AiEvaluationResult, EvaluationInput, VendixItem } from "@/shared/types";

export function buildEvaluationContents(input: EvaluationInput) {
  const textPrompt = [
    "Evaluate this item for resale.",
    "Use the user-provided details as hints, but correct the name/category/brand if the image strongly suggests otherwise.",
    "Return realistic resale pricing in EUR for Portugal/EU second-hand marketplaces.",
    "Do not claim that you performed live scraping. Treat comparable listings as estimated comparable marketplace examples.",
    "",
    `User-entered name: ${input.name || "Unknown"}`,
    `User-entered category: ${input.category || "Other"}`,
    `User-entered brand: ${input.brand || "Unknown"}`,
    `Purchase price EUR: ${Number.isFinite(input.purchasePrice) ? input.purchasePrice : 0}`,
  ].join("\n");

  const imagePart = input.image ? buildInlineImagePart(input.image) : null;

  return [
    {
      role: "user" as const,
      parts: imagePart ? [{ text: textPrompt }, imagePart] : [{ text: textPrompt }],
    },
  ];
}

export function buildValuationSystemPrompt() {
  return `You are Vendix, an AI resale valuation assistant.
Analyze product photos and item details to estimate resale potential.
Return only JSON that matches the provided schema.

Rules:
- Currency is EUR.
- suggestedPrice must be a practical listing price, not a guaranteed sale price.
- confidence must be an integer from 0 to 100.
- category must be one of: ${PRODUCT_CATEGORIES.join(", ")}.
- similarListings should contain 3 to 4 estimated comparable examples from OLX, Vinted, Facebook, or eBay.
- priceHistory should contain exactly 5 points with labels like "30d", "21d", "14d", "7d", and "Now".
- generatedDescription should be concise, listing-ready, and include a reminder to verify condition/accessories if uncertain.
- If the image is unclear, lower confidence and explain uncertainty in the description.`;
}

export function normalizeEvaluation(input: EvaluationInput, aiEvaluation: AiEvaluationResult): VendixItem {
  const purchasePrice = normalizeMoney(input.purchasePrice);
  const suggestedPrice = Math.max(1, normalizeMoney(aiEvaluation.suggestedPrice));
  const safeCategory = PRODUCT_CATEGORIES.includes(aiEvaluation.category as (typeof PRODUCT_CATEGORIES)[number])
    ? aiEvaluation.category
    : input.category || "Other";

  return {
    id: crypto.randomUUID(),
    name: aiEvaluation.name || input.name || `${safeCategory} item`,
    category: safeCategory,
    brand: aiEvaluation.brand || input.brand || undefined,
    purchasePrice,
    suggestedPrice,
    confidence: clamp(Math.round(aiEvaluation.confidence), 0, 100),
    margin: suggestedPrice - purchasePrice,
    status: "for-sale",
    image: input.image,
    createdAt: new Date().toISOString(),
    generatedDescription: aiEvaluation.generatedDescription || `${aiEvaluation.name || input.name} evaluated for resale by Vendix.`,
    similarListings: normalizeSimilarListings(aiEvaluation),
    priceHistory: normalizePriceHistory(aiEvaluation.priceHistory, suggestedPrice),
  };
}

function normalizeSimilarListings(aiEvaluation: AiEvaluationResult) {
  return aiEvaluation.similarListings.slice(0, 4).map((listing) => ({
    marketplace: listing.marketplace,
    title: listing.title,
    price: Math.max(1, normalizeMoney(listing.price)),
    condition: listing.condition,
    url: listing.url?.startsWith("https://") ? listing.url : MARKETPLACE_URLS[listing.marketplace],
  }));
}

function normalizePriceHistory(history: AiEvaluationResult["priceHistory"], suggestedPrice: number) {
  const fallback = [
    { label: "30d", value: Math.round(suggestedPrice * 0.92) },
    { label: "21d", value: Math.round(suggestedPrice * 0.98) },
    { label: "14d", value: Math.round(suggestedPrice * 1.04) },
    { label: "7d", value: Math.round(suggestedPrice * 1.01) },
    { label: "Now", value: suggestedPrice },
  ];

  const normalized = history
    .slice(0, 5)
    .map((entry) => ({ label: entry.label || "—", value: Math.max(1, normalizeMoney(entry.value)) }));

  return normalized.length === 5 ? normalized : fallback;
}
