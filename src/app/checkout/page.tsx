import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Section from '@/components/Section';
import CheckoutForm from '@/components/CheckoutForm';
import { buildMetadata } from '@/lib/seo';
import { siteConfig, mailtoLink } from '@/lib/siteConfig';

export const metadata = buildMetadata({
  title: 'Checkout',
  description:
    'Request your Shop OTRO order: cash on delivery, bKash, Nagad or SSLCommerz. Online payment links are confirmed by phone after the order is reviewed.',
  path: '/checkout',
});

const SHOP_QUICK_LINKS = [
  { href: '/products', label: 'Shop all' },
  { href: '/cart', label: 'Cart' },
  { href: '/returns', label: 'Returns & exchanges' },
];

export default function CheckoutPage() {
  return (
    <>
      <Navbar
        links={[
          { href: '/products', label: 'Shop' },
          { href: '/about', label: 'About' },
          { href: '/returns', label: 'Returns' },
          { href: '/contact', label: 'Contact' },
        ]}
      />
      <main id="main">
        <Section
          eyebrow="Checkout"
          title="Request your order"
          lead="Tell us where to deliver and how you would like to pay. Our order team reviews every request, calls to confirm stock and the delivery charge, then arranges delivery or an online payment link."
          tone="light"
          headingLevel="h1"
        >
          <CheckoutForm />

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            <div className="rounded-xl border border-brand-mist p-5">
              <h2 className="font-display text-lg font-bold text-brand-navy">Cash on delivery</h2>
              <p className="mt-2 text-sm leading-relaxed text-brand-ink/75">
                Available nationwide. Inspect the parcel when it arrives and pay the courier in cash.
              </p>
            </div>
            <div className="rounded-xl border border-brand-mist p-5">
              <h2 className="font-display text-lg font-bold text-brand-navy">bKash, Nagad, SSLCommerz</h2>
              <p className="mt-2 text-sm leading-relaxed text-brand-ink/75">
                We never take card or wallet credentials on this site. After review, we send an official payment request
                from the merchant account by phone or email.
              </p>
            </div>
            <div className="rounded-xl border border-brand-mist p-5">
              <h2 className="font-display text-lg font-bold text-brand-navy">Need help ordering?</h2>
              <p className="mt-2 text-sm leading-relaxed text-brand-ink/75">
                Email{' '}
                <a className="font-semibold text-brand-blue underline" href={mailtoLink('Shop OTRO order help')}>
                  {siteConfig.contactEmail}
                </a>{' '}
                or use the{' '}
                <Link className="font-semibold text-brand-blue underline" href="/contact">
                  contact form
                </Link>
                . We reply during business hours.
              </p>
            </div>
          </div>
        </Section>
      </main>
      <Footer quickLinks={SHOP_QUICK_LINKS} />
    </>
  );
}
