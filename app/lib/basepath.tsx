export const BASE = process.env.NEXT_PUBLIC_BASE_PATH || '';

export function withBase(p: string) {
  return `${BASE}${p}`;
}