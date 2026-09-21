import type { EvaluationInput, VendixItem } from "@/shared/types";

type EvaluationErrorResponse = {
  error?: string;
};

export async function requestEvaluation(input: EvaluationInput): Promise<VendixItem> {
  const response = await fetch("/api/evaluate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    const payload = (await response.json().catch(() => ({}))) as EvaluationErrorResponse;
    throw new Error(payload.error ?? "Unable to evaluate item. Please try again.");
  }

  return response.json() as Promise<VendixItem>;
}
