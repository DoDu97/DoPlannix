const PROMO_CODES: Record<string, number> = {
  DOPLANNIX10: 10,
}

export function validatePromoCode(code: string): number {
  return PROMO_CODES[code.trim().toUpperCase()] ?? 0
}
