'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { formatBdt, getProductById } from '@/lib/catalog';
import { MAX_QTY_PER_LINE, readCart, removeLine, updateQty, writeCart, type CartLine } from '@/lib/cart';
import ProductMedia from '@/components/ProductMedia';

/**
 * Cart screen. Reads localStorage in an effect (never during render, so the
 * static export matches the server markup) and keeps every derived total in
 * sync with the persisted lines.
 */
export default function CartView() {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setLines(readCart());
    setReady(true);
  }, []);

  const rows = useMemo(
    () =>
      lines.flatMap((line) => {
        const product = getProductById(line.id);
        return product ? [{ line, product }] : [];
      }),
    [lines],
  );

  const unavailableCount = lines.length - rows.length;
  const subtotal = rows.reduce((sum, row) => sum + row.product.priceBdt * row.line.qty, 0);
  const itemCount = rows.reduce((sum, row) => sum + row.line.qty, 0);

  function changeQty(line: CartLine, delta: number) {
    setLines(updateQty(line.id, line.variant, line.qty + delta));
  }

  function handleRemove(line: CartLine) {
    setLines(removeLine(line.id, line.variant));
  }

  function clearUnavailable() {
    const next = rows.map((row) => row.line);
    writeCart(next);
    setLines(next);
  }

  if (!ready) {
    return <p className="text-sm text-brand-ink/60">Loading your cart…</p>;
  }

  if (rows.length === 0) {
    return (
      <div className="rounded-xl border border-brand-mist bg-white p-8 text-center shadow-sm">
        <h2 className="font-display text-2xl font-bold text-brand-navy">Your cart is empty</h2>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-brand-ink/70">
          Browse the current collection and add what you need. Cash on delivery is available across Bangladesh,
          and online payments can be arranged after we confirm your order.
        </p>
        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/products"
            className="inline-flex min-h-[48px] items-center justify-center rounded-md bg-brand-navy px-6 py-3 text-sm font-semibold text-white hover:bg-brand-blue"
          >
            Shop Now
          </Link>
          <Link
            href="/contact"
            className="inline-flex min-h-[48px] items-center justify-center rounded-md border border-brand-navy px-6 py-3 text-sm font-semibold text-brand-navy hover:bg-brand-navy hover:text-white"
          >
            Ask a question
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_21rem]">
      <div>
        {unavailableCount > 0 && (
          <div className="mb-4 flex flex-col gap-2 rounded-md border border-brand-amber/50 bg-brand-cream px-4 py-3 text-sm text-brand-ink sm:flex-row sm:items-center sm:justify-between">
            <p>
              {unavailableCount} item{unavailableCount === 1 ? '' : 's'} in your cart {unavailableCount === 1 ? 'is' : 'are'} no
              longer listed.
            </p>
            <button type="button" onClick={clearUnavailable} className="min-h-[44px] text-left font-semibold text-brand-blue underline">
              Remove unavailable items
            </button>
          </div>
        )}

        <ul className="space-y-4">
          {rows.map(({ line, product }) => (
            <li
              key={`${line.id}-${line.variant ?? 'standard'}`}
              className="flex gap-4 rounded-xl border border-brand-mist bg-white p-4 shadow-sm"
            >
              <ProductMedia className="h-20 w-20 shrink-0 rounded-lg" name={product.name} compact />
              <div className="flex min-w-0 flex-1 flex-col gap-2">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <Link
                      href={`/products/${product.slug}`}
                      className="font-display text-lg font-bold text-brand-navy hover:text-brand-blue"
                    >
                      {product.name}
                    </Link>
                    <p className="text-xs uppercase tracking-wide text-brand-blue">{product.category}</p>
                    {line.variant && <p className="mt-1 text-sm text-brand-ink/70">Variant: {line.variant}</p>}
                  </div>
                  <p className="text-sm font-semibold text-brand-navy">{formatBdt(product.priceBdt * line.qty)}</p>
                </div>

                <div className="mt-1 flex flex-wrap items-center justify-between gap-3">
                  <div
                    role="group"
                    aria-label={`Quantity for ${product.name}`}
                    className="inline-flex items-center rounded-md border border-brand-mist"
                  >
                    <button
                      type="button"
                      onClick={() => changeQty(line, -1)}
                      disabled={line.qty <= 1}
                      aria-label={`Decrease quantity of ${product.name}`}
                      className="flex h-11 w-11 items-center justify-center text-lg font-semibold text-brand-navy disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      &minus;
                    </button>
                    <span aria-live="polite" className="w-8 text-center text-sm font-semibold">
                      {line.qty}
                    </span>
                    <button
                      type="button"
                      onClick={() => changeQty(line, 1)}
                      disabled={line.qty >= MAX_QTY_PER_LINE}
                      aria-label={`Increase quantity of ${product.name}`}
                      className="flex h-11 w-11 items-center justify-center text-lg font-semibold text-brand-navy disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      +
                    </button>
                  </div>
                  <p className="text-sm text-brand-ink/60">
                    {formatBdt(product.priceBdt)} each
                  </p>
                  <button
                    type="button"
                    onClick={() => handleRemove(line)}
                    aria-label={`Remove ${product.name} from cart`}
                    className="min-h-[44px] px-2 text-sm font-semibold text-brand-blue underline hover:text-brand-navy"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <Link href="/products" className="mt-6 inline-flex min-h-[44px] items-center text-sm font-semibold text-brand-blue hover:text-brand-navy">
          Continue shopping
        </Link>
      </div>

      <aside aria-label="Order summary" className="h-fit rounded-xl border border-brand-mist bg-brand-mist/60 p-6 lg:sticky lg:top-24">
        <h2 className="font-display text-xl font-bold text-brand-navy">Order summary</h2>
        <dl className="mt-4 space-y-2 text-sm">
          <div className="flex items-center justify-between">
            <dt className="text-brand-ink/70">Items ({itemCount})</dt>
            <dd className="font-semibold text-brand-navy">{formatBdt(subtotal)}</dd>
          </div>
          <div className="flex items-center justify-between">
            <dt className="text-brand-ink/70">Delivery</dt>
            <dd className="text-brand-ink/70">Quoted by zone</dd>
          </div>
          <div className="flex items-center justify-between border-t border-brand-navy/10 pt-3">
            <dt className="font-semibold text-brand-navy">Subtotal</dt>
            <dd className="font-display text-xl font-bold text-brand-navy">{formatBdt(subtotal)}</dd>
          </div>
        </dl>
        <p className="mt-3 text-xs leading-relaxed text-brand-ink/60">
          Delivery charge depends on courier zone (inside or outside Dhaka) and is confirmed by phone before dispatch.
          Cash on delivery, bKash, Nagad and SSLCommerz are all supported.
        </p>
        <Link
          href="/checkout"
          className="mt-5 inline-flex min-h-[48px] w-full items-center justify-center rounded-md bg-brand-navy px-6 py-3 text-sm font-semibold text-white hover:bg-brand-blue"
        >
          Proceed to checkout
        </Link>
        <p className="mt-3 text-center text-xs text-brand-ink/60">
          No online payment is taken on this site. Online payment links are sent after order review.
        </p>
      </aside>
    </div>
  );
}
