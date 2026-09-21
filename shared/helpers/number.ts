export function normalizeMoney(value: number) {
  return Number.isFinite(value) ? Math.round(value) : 0;
}

export function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, Number.isFinite(value) ? value : min));
}
