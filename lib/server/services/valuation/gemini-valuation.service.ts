import { GoogleGenAI } from "@google/genai";
import { AI_DEFAULT_MODEL, GEMINI_EVALUATION_RESPONSE_SCHEMA } from "@/shared/constants/ai";
import { parseJsonObjectResponse } from "@/shared/helpers/json";
import { buildEvaluationContents, buildValuationSystemPrompt, normalizeEvaluation } from "@/shared/helpers/valuation";
import type { AiEvaluationResult, EvaluationInput, VendixItem } from "@/shared/types";

export async function createGeminiEvaluation(input: EvaluationInput): Promise<VendixItem> {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not configured.");
  }

  const genai = new GoogleGenAI({ apiKey });
  const model = process.env.GEMINI_MODEL ?? AI_DEFAULT_MODEL;

  const response = await genai.models.generateContent({
    model,
    contents: buildEvaluationContents(input),
    config: {
      systemInstruction: buildValuationSystemPrompt(),
      responseMimeType: "application/json",
      responseSchema: GEMINI_EVALUATION_RESPONSE_SCHEMA,
    },
  });

  const aiEvaluation = parseJsonObjectResponse<AiEvaluationResult>(
    response.text ?? "",
    "Gemini returned an invalid valuation response.",
  );

  return normalizeEvaluation(input, aiEvaluation);
}
