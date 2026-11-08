import { NextResponse } from 'next/server';
import { allowedOrigins } from '@/lib/siteConfig';

/** Read a trimmed string field from FormData (File values are ignored). */
function field(form: FormData, key: string): string {
  const value = form.get(key);
  return typeof value === 'string' ? value.trim() : '';
}

/**
 * Contact form + order-request handler (single endpoint per the brief).
 * `formType=order` submits from /checkout; everything else is a general enquiry.
 * Origin is checked against the config-derived allow-list so CORS stays correct
 * after any domain migration. No payment provider is called from here.
 */
export async function POST(req: Request) {
  const origin = req.headers.get('origin');
  if (origin && !allowedOrigins().includes(origin) && !origin.includes('vercel.app')) {
    return NextResponse.json({ error: 'Origin not allowed' }, { status: 403 });
  }

  const form = await req.formData().catch(() => null);
  if (!form) {
    return NextResponse.json({ error: 'Invalid form submission' }, { status: 400 });
  }

  const isOrder = field(form, 'formType') === 'order';
  const successPath = isOrder ? '/checkout?ok=1' : '/contact?ok=1';

  // Honeypot: bots fill hidden fields. Pretend success and store nothing.
  if (field(form, 'company')) {
    return NextResponse.redirect(new URL(successPath, req.url), 303);
  }

  const name = field(form, 'name');
  if (!name) {
    return NextResponse.json({ error: 'Missing name' }, { status: 400 });
  }

  if (isOrder) {
    const phone = field(form, 'phone');
    const address = field(form, 'address');
    const city = field(form, 'city');
    const payment = field(form, 'payment');
    const orderSummary = field(form, 'orderSummary');
    const notes = field(form, 'notes');
    const subtotal = field(form, 'subtotal');

    if (!phone || !address || !city || !payment) {
      return NextResponse.json({ error: 'Missing order details' }, { status: 400 });
    }

    // TODO(Phase 4): persist { name, phone, address, city, payment, orderSummary, notes, subtotal }
    // to Supabase and notify the order team via Resend/Nodemailer once those secrets
    // are set in Vercel. Payment links are sent manually after review — by design.
    void notes;
    void subtotal;
    return NextResponse.redirect(new URL(successPath, req.url), 303);
  }

  const message = field(form, 'message');
  if (!message) {
    return NextResponse.json({ error: 'Missing message' }, { status: 400 });
  }

  // TODO(Phase 4): send email via Resend/Nodemailer once RESEND_API_KEY is set.
  return NextResponse.redirect(new URL(successPath, req.url), 303);
}
