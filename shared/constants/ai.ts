import { Type } from "@google/genai";
import { PRODUCT_CATEGORIES } from "@/shared/constants/forms";
import { ITEM_CONDITIONS, MARKETPLACE_NAMES } from "@/shared/constants/marketplace";

export const AI_DEFAULT_MODEL = "gemini-3.6-flash";

export const GEMINI_EVALUATION_RESPONSE_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    name: { type: Type.STRING },
    category: { type: Type.STRING, enum: [...PRODUCT_CATEGORIES] },
    brand: { type: Type.STRING, nullable: true },
    suggestedPrice: { type: Type.NUMBER },
    confidence: { type: Type.NUMBER },
    generatedDescription: { type: Type.STRING },
    similarListings: {
      type: Type.ARRAY,
      minItems: 3,
      maxItems: 4,
      items: {
        type: Type.OBJECT,
        properties: {
          marketplace: { type: Type.STRING, enum: [...MARKETPLACE_NAMES] },
          title: { type: Type.STRING },
          price: { type: Type.NUMBER },
          condition: { type: Type.STRING, enum: [...ITEM_CONDITIONS] },
          url: { type: Type.STRING },
        },
        required: ["marketplace", "title", "price", "condition", "url"],
      },
    },
    priceHistory: {
      type: Type.ARRAY,
      minItems: 5,
      maxItems: 5,
      items: {
        type: Type.OBJECT,
        properties: {
          label: { type: Type.STRING },
          value: { type: Type.NUMBER },
        },
        required: ["label", "value"],
      },
    },
  },
  required: [
    "name",
    "category",
    "suggestedPrice",
    "confidence",
    "generatedDescription",
    "similarListings",
    "priceHistory",
  ],
};
