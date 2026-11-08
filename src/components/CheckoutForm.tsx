'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { formatBdt, getProductById } from '@/lib/catalog';
import { clearCart, readCart, type CartLine } from '@/lib/cart';

const PAYMENT_METHODS = ['Cash on Delivery', 'bKash', 'Nagad', 'SSLCommerz'] as const;

const PAYMENT_NOTES: Record<string, string> = {
  'Cash on Delivery': 'Pay the courier in cash when the parcel arrives. Please keep the exact amount ready.',
  bKash: 'After we review your order, we send a bKash payment request or merchant number by phone or SMS.',
  Nagad: 'After we review your order, we send a Nagad payment request or merchant number by phone or SMS.',
  SSLCommerz: 'After we review your order, we send a secure SSLCommerz link for card, bank or mobile banking payment.',
};

/**
 * Order request form. No payment API is called here: the request is reviewed by
 * the order team, then a payment link (or COD confirmation) is sent by phone/email.
 * Posts a plain HTML form to /api/contact so it works without JavaScript, and
 * clears the local cart once the server redirects back with ?ok=1.
 */
export default function CheckoutForm() {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [ready, setReady] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [payment, setPayment] = useState<string>('Cash on Delivery');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('ok') === '1') {
      clearCart();
      setLines([]);
      setSubmitted(true);
    } else {
      setLines(readCart());
    }
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

  const subtotal = rows.reduce((sum, row) => sum + row.product.priceBdt * row.line.qty, 0);
  const itemCount = rows.reduce((sum, row) => sum + row.line.qty, 0);

  const orderSummary = rows
    .map(({ line, product }) => {
      const variant = line.variant ? ` (${line.variant})` : '';
      return `- ${product.name}${variant} x${line.qty} = ${formatBdt(product.priceBdt * line.qty)}`;
    })
    .join('\n');

  if (submitted) {
    return (
      <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-8" role="status">
        <h2 className="font-display text-2xl font-bold text-brand-navy">Order request received</h2>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-brand-ink/80">
          Thank you. Our order team will call you on the number you provided to confirm stock, the delivery charge and
          your payment method. If you chose bKash, Nagad or SSLCommerz, we will send the payment link only after that
          call or email confirmation.
        </p>
        <p className="mt-2 text-sm text-brand-ink/70">
          Nothing has been charged. Delivery inside Dhaka usually takes 1–2 business days after confirmation; outside
          Dhaka 3–5 business days.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/products"
            className="inline-flex min-h-[48px] items-center justify-center rounded-md bg-brand-navy px-6 py-3 text-sm font-semibold text-white hover:bg-brand-blue"
          >
            Continue shopping
          </Link>
          <Link
            href="/contact"
            className="inline-flex min-h-[48px] items-center justify-center rounded-md border border-brand-navy px-6 py-3 text-sm font-semibold text-brand-navy hover:bg-brand-navy hover:text-white"
          >
            Contact order support
          </Link>
        </div>
      </div>
    );
  }

  if (ready && rows.length === 0) {
    return (
      <div className="rounded-xl border border-brand-mist bg-white p-8 text-center shadow-sm">
        <h2 className="font-display text-2xl font-bold text-brand-navy">Your cart is empty</h2>
        <p className="mx-auto mt-3 max-w-md text-sm text-brand-ink/70">
          Add a product to your cart before requesting an order.
        </p>
        <Link
          href="/products"
          className="mt-6 inline-flex min-h-[48px] items-center justify-center rounded-md bg-brand-navy px-6 py-3 text-sm font-semibold text-white hover:bg-brand-blue"
        >
          Shop Now
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_21rem]">
      <form action="/api/contact" method="POST" className="space-y-5 rounded-xl border border-brand-mist bg-white p-6 shadow-sm">
        <input type="hidden" name="formType" value="order" />
        <input type="hidden" name="orderSummary" value={orderSummary} />
        <input type="hidden" name="subtotal" value={String(subtotal)} />
        <input type="hidden" name="itemCount" value={String(itemCount)} />

        <div>
          <h2 className="font-display text-xl font-bold text-brand-navy">Delivery details</h2>
          <p className="mt-1 text-sm text-brand-ink/70">We use these details only to confirm and deliver this order.</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm font-medium text-brand-navy">
            Full name
            <input
              required
              name="name"
              autoComplete="name"
              className="mt-1 min-h-[44px] w-full rounded-md border border-brand-mist px-3 py-2 text-brand-ink"
            />
          </label>
          <label className="block text-sm font-medium text-brand-navy">
            Phone number
            <input
              required
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="01XXXXXXXXX"
              pattern="[0-9+\-\s]{7,20}"
              className="mt-1 min-h-[44px] w-full rounded-md border border-brand-mist px-3 py-2 text-brand-ink"
            />
          </label>
        </div>

        <label className="block text-sm font-medium text-brand-navy">
          City / district
          <input
            required
            name="city"
            autoComplete="address-level2"
            className="mt-1 min-h-[44px] w-full rounded-md border border-brand-mist px-3 py-2 text-brand-ink"
          />
        </label>

        <label className="block text-sm font-medium text-brand-navy">
          Full delivery address
          <textarea
            required
            name="address"
            rows={3}
            autoComplete="street-address"
            placeholder="House / road, area, thana, postcode"
            className="mt-1 w-full rounded-md border border-brand-mist px-3 py-2 text-brand-ink"
          />
        </label>

        <label className="block text-sm font-medium text-brand-navy">
          Payment method
          <select
            name="payment"
            value={payment}
            onChange={(event) => setPayment(event.target.value)}
            className="mt-1 min-h-[44px] w-full rounded-md border border-brand-mist px-3 py-2 text-brand-ink"
          >
            {PAYMENT_METHODS.map((method) => (
              <option key={method} value={method}>
                {method}
              </option>
            ))}
          </select>
        </label>
        <p className="rounded-md bg-brand-mist/70 px-4 py-3 text-sm text-brand-ink/80" aria-live="polite">
          {PAYMENT_NOTES[payment]}
        </p>

        <label className="block text-sm font-medium text-brand-navy">
          Order notes <span className="font-normal text-brand-ink/60">(optional)</span>
          <textarea
            name="notes"
            rows={3}
            placeholder="Preferred delivery time, landmark, gift note…"
            className="mt-1 w-full rounded-md border border-brand-mist px-3 py-2 text-brand-ink"
          />
        </label>

        {/* Honeypot anti-spam field — hidden from users and assistive tech. */}
        <input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />

        <p className="rounded-md border border-brand-amber/40 bg-brand-cream px-4 py-3 text-sm leading-relaxed text-brand-ink/80">
          <strong>No payment is taken on this site.</strong> This is an order request: we review it, call you to confirm
          stock and the delivery charge, and then send a bKash, Nagad or SSLCommerz payment link by phone or email if you
          chose an online method.
        </p>

        <button
          type="submit"
          className="inline-flex min-h-[48px] w-full items-center justify-center rounded-md bg-brand-navy px-6 py-3 text-sm font-semibold text-white hover:bg-brand-blue focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue sm:w-auto"
        >
          Place order request
        </button>
        <p className="text-xs text-brand-ink/60">
          By requesting an order you agree to our{' '}
          <Link href="/terms" className="underline">
            terms
          </Link>{' '}
          and{' '}
          <Link href="/returns" className="underline">
            returns policy
          </Link>
          .
        </p>
      </form>

      <aside aria-label="Your order" className="h-fit rounded-xl border border-brand-mist bg-brand-mist/60 p-6 lg:sticky lg:top-24">
        <h2 className="font-display text-xl font-bold text-brand-navy">Your order</h2>
        {ready ? (
          <>
            <ul className="mt-4 space-y-3 text-sm">
              {rows.map(({ line, product }) => (
                <li key={`${line.id}-${line.variant ?? 'standard'}`} className="flex justify-between gap-3">
                  <span className="text-brand-ink/80">
                    {product.name}
                    {line.variant ? ` (${line.variant})` : ''} × {line.qty}
                  </span>
                  <span className="shrink-0 font-semibold text-brand-navy">{formatBdt(product.priceBdt * line.qty)}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex items-center justify-between border-t border-brand-navy/10 pt-4">
              <span className="text-sm font-semibold text-brand-navy">Subtotal</span>
              <span className="font-display text-xl font-bold text-brand-navy">{formatBdt(subtotal)}</span>
            </div>
            <p className="mt-2 text-xs leading-relaxed text-brand-ink/60">
              Delivery charge is added after we confirm your zone and courier. Nothing is charged until you approve the
              final amount.
            </p>
          </>
        ) : (
          <p className="mt-4 text-sm text-brand-ink/60">Loading your cart…</p>
        )}
        <Link href="/cart" className="mt-4 inline-flex min-h-[44px] items-center text-sm font-semibold text-brand-blue underline">
          Edit cart
        </Link>
      </aside>
    </div>
  );
}
