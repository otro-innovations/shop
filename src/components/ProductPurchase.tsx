'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { addToCart } from '@/lib/cart';

interface Props {
  productId: string;
  name: string;
  sizes?: string[];
  colors?: string[];
}

/**
 * Variant selector + add-to-cart for the product detail page.
 * Variants are display-only (they do not change price or stock); selecting them
 * only labels the cart line so the order team knows what to pack.
 */
export default function ProductPurchase({ productId, name, sizes = [], colors = [] }: Props) {
  const [size, setSize] = useState<string | undefined>(undefined);
  const [color, setColor] = useState<string | undefined>(undefined);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (!added) return;
    const timer = window.setTimeout(() => setAdded(false), 5000);
    return () => window.clearTimeout(timer);
  }, [added]);

  const variantLabel = [size, color].filter(Boolean).join(' / ') || undefined;

  function handleAdd() {
    addToCart(productId, variantLabel, 1);
    setAdded(true);
  }

  const chip = (selected: boolean) =>
    `inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-md border px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue ${
      selected
        ? 'border-brand-navy bg-brand-navy text-white'
        : 'border-brand-mist bg-white text-brand-ink hover:border-brand-blue hover:text-brand-blue'
    }`;

  return (
    <div className="space-y-6">
      {sizes.length > 0 && (
        <fieldset>
          <legend className="text-sm font-semibold text-brand-navy">Size</legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {sizes.map((option) => (
              <button
                key={option}
                type="button"
                aria-pressed={size === option}
                aria-label={`Size ${option}`}
                onClick={() => setSize((current) => (current === option ? undefined : option))}
                className={chip(size === option)}
              >
                {option}
              </button>
            ))}
          </div>
        </fieldset>
      )}

      {colors.length > 0 && (
        <fieldset>
          <legend className="text-sm font-semibold text-brand-navy">Colour</legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {colors.map((option) => (
              <button
                key={option}
                type="button"
                aria-pressed={color === option}
                aria-label={`Colour ${option}`}
                onClick={() => setColor((current) => (current === option ? undefined : option))}
                className={chip(color === option)}
              >
                {option}
              </button>
            ))}
          </div>
        </fieldset>
      )}

      <div>
        <p className="text-sm text-brand-ink/70">
          Selected: <span className="font-semibold text-brand-navy">{variantLabel ?? 'Standard'}</span>
        </p>
        <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center">
          <button
            type="button"
            onClick={handleAdd}
            className="inline-flex min-h-[48px] items-center justify-center rounded-md bg-brand-navy px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-blue focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
          >
            Add to cart
          </button>
          <Link
            href="/cart"
            className="inline-flex min-h-[48px] items-center justify-center rounded-md border border-brand-navy px-6 py-3 text-sm font-semibold text-brand-navy transition-colors hover:bg-brand-navy hover:text-white"
          >
            View cart
          </Link>
        </div>
        <p role="status" aria-live="polite" className="mt-3 min-h-[1.25rem] text-sm font-medium text-brand-blue">
          {added ? `${name} added to your cart${variantLabel ? ` (${variantLabel})` : ''}.` : ''}
        </p>
      </div>
    </div>
  );
}
