export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || '';
export const SITE_URL  = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export function withBase(p: string) {
  return `${BASE_PATH}${p}`;
}
