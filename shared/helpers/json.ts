export function parseJsonObjectResponse<T>(rawText: string, errorMessage: string): T {
  try {
    return JSON.parse(rawText) as T;
  } catch {
    const jsonMatch = rawText.match(/\{[\s\S]*\}/);

    if (!jsonMatch) {
      throw new Error(errorMessage);
    }

    return JSON.parse(jsonMatch[0]) as T;
  }
}
