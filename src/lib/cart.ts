/**
 * Shop OTRO — localStorage cart helper.
 * ─────────────────────────────────────────────────────────────────────────────
 * No dependencies, no server calls. Every accessor is guarded for SSR
 * (`typeof window === 'undefined'`) and wrapped in try/catch so private-mode /
 * disabled storage degrades gracefully instead of crashing the storefront.
 */

export interface CartLine {
  /** Product id from src/lib/catalog.ts. */
  id: string;
  qty: number;
  /** Optional selected variant label, e.g. "M / Navy". */
  variant?: string;
}

const STORAGE_KEY = 'otro-shop-cart-v1';
/** Internal event so every mounted cart UI stays in sync (tabs use `storage`). */
const CART_EVENT = 'otro-shop-cart-changed';
export const MAX_QTY_PER_LINE = 10;

function isCartLine(value: unknown): value is CartLine {
  if (typeof value !== 'object' || value === null) return false;
  const candidate = value as Record<string, unknown>;
  return (
    typeof candidate.id === 'string' &&
    typeof candidate.qty === 'number' &&
    Number.isFinite(candidate.qty) &&
    (candidate.variant === undefined || typeof candidate.variant === 'string')
  );
}

function clampQty(qty: number): number {
  if (!Number.isFinite(qty)) return 1;
  return Math.min(Math.max(Math.trunc(qty), 1), MAX_QTY_PER_LINE);
}

/** Read and sanitise the persisted cart. Safe on the server (returns []). */
export function readCart(): CartLine[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isCartLine).map((line) =>
      line.variant
        ? { id: line.id, qty: clampQty(line.qty), variant: line.variant }
        : { id: line.id, qty: clampQty(line.qty) },
    );
  } catch {
    return [];
  }
}

/** Persist the cart and notify listeners. Storage failures are non-fatal. */
export function writeCart(lines: CartLine[]): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  } catch {
    // Storage full or blocked (private mode) — the UI still works in-session.
  }
  try {
    window.dispatchEvent(new Event(CART_EVENT));
  } catch {
    // Event constructor unavailable (very old browsers) — listeners simply miss one update.
  }
}

/** Add (or top up) a line. Returns the resulting cart array. */
export function addToCart(id: string, variant?: string, qty = 1): CartLine[] {
  const lines = readCart();
  const existing = lines.find((l) => l.id === id && l.variant === variant);
  if (existing) existing.qty = clampQty(existing.qty + qty);
  else lines.push(variant ? { id, qty: clampQty(qty), variant } : { id, qty: clampQty(qty) });
  writeCart(lines);
  return lines;
}

/** Change quantity for one line. A qty of 0 or less removes the line. */
export function updateQty(id: string, variant: string | undefined, qty: number): CartLine[] {
  const lines = readCart();
  const target = lines.find((l) => l.id === id && l.variant === variant);
  if (!target) return lines;
  if (qty <= 0) {
    const next = lines.filter((l) => !(l.id === id && l.variant === variant));
    writeCart(next);
    return next;
  }
  target.qty = clampQty(qty);
  writeCart(lines);
  return lines;
}

/** Remove a single line. */
export function removeLine(id: string, variant?: string): CartLine[] {
  const next = readCart().filter((l) => !(l.id === id && l.variant === variant));
  writeCart(next);
  return next;
}

/** Empty the cart (after a submitted order request). */
export function clearCart(): void {
  writeCart([]);
}

/** Total units in the cart (drives the navbar badge). */
export function cartCount(lines: CartLine[]): number {
  return lines.reduce((total, line) => total + clampQty(line.qty), 0);
}

/**
 * Subscribe to cart changes (same tab via custom event, other tabs via storage).
 * Returns an unsubscribe function.
 */
export function onCartChange(callback: () => void): () => void {
  if (typeof window === 'undefined') return () => undefined;
  const handler = () => callback();
  window.addEventListener(CART_EVENT, handler);
  window.addEventListener('storage', handler);
  return () => {
    window.removeEventListener(CART_EVENT, handler);
    window.removeEventListener('storage', handler);
  };
}
