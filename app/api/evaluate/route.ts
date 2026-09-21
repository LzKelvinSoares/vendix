import { NextResponse } from "next/server";
import { createGeminiEvaluation } from "@/lib/server/services/valuation/gemini-valuation.service";
import type { EvaluationInput } from "@/shared/types";

export async function POST(request: Request) {
  try {
    const input = (await request.json()) as EvaluationInput;

    return NextResponse.json(await createGeminiEvaluation(input));
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to evaluate item.";
    const status = message.includes("GEMINI_API_KEY") ? 500 : 502;

    return NextResponse.json({ error: message }, { status });
  }
}
