'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { cartCount, onCartChange, readCart } from '@/lib/cart';

/**
 * Cart shortcut for the navbar. Rendered client-side so the count can follow
 * localStorage without making every page dynamic. Starts at 0 on the server and
 * hydrates in an effect (no hydration mismatch).
 */
export default function CartLink() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const sync = () => setCount(cartCount(readCart()));
    sync();
    return onCartChange(sync);
  }, []);

  return (
    <Link
      href="/cart"
      aria-label={count > 0 ? `Cart, ${count} item${count === 1 ? '' : 's'}` : 'Cart, empty'}
      className="inline-flex min-h-[44px] items-center gap-1 rounded-md px-3 py-2 text-sm font-semibold text-brand-navy transition-colors hover:bg-brand-mist hover:text-brand-blue"
    >
      Cart
      {count > 0 && (
        <span
          aria-hidden="true"
          className="inline-flex min-w-[1.4rem] items-center justify-center rounded-full bg-brand-amber px-1.5 text-xs font-bold text-brand-navy"
        >
          {count}
        </span>
      )}
    </Link>
  );
}
