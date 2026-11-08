import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Section from '@/components/Section';
import Card from '@/components/Card';
import { buildMetadata } from '@/lib/seo';
import { siteConfig, mailtoLink } from '@/lib/siteConfig';

export const metadata = buildMetadata({
  title: 'Contact',
  description: `Contact ${siteConfig.brandName}: order support, delivery questions, returns and product advice. Email ${siteConfig.contactEmail}.`,
  path: '/contact',
});

const SHOP_QUICK_LINKS = [
  { href: '/products', label: 'Shop all' },
  { href: '/cart', label: 'Cart' },
  { href: '/returns', label: 'Returns & exchanges' },
];

export default function ContactPage() {
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
          eyebrow="Contact"
          title="Talk to the order team"
          lead={`Email us at ${siteConfig.contactEmail} or send a message below. For an existing order, include the phone number you used at checkout so we can find it quickly.`}
          tone="light"
          headingLevel="h1"
        >
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_20rem]">
            <form action="/api/contact" method="POST" className="grid max-w-xl gap-4">
              <label className="block text-sm font-medium text-brand-navy">
                Name
                <input required name="name" autoComplete="name" className="mt-1 min-h-[44px] w-full rounded-md border border-brand-mist px-3 py-2" />
              </label>
              <label className="block text-sm font-medium text-brand-navy">
                Email or phone
                <input required name="contact" autoComplete="email" className="mt-1 min-h-[44px] w-full rounded-md border border-brand-mist px-3 py-2" />
              </label>
              <label className="block text-sm font-medium text-brand-navy">
                Service interest
                <select name="service" className="mt-1 min-h-[44px] w-full rounded-md border border-brand-mist px-3 py-2">
                  <option value="">Select…</option>
                  <option>Order support</option>
                  <option>Delivery</option>
                  <option>Returns</option>
                  <option>Product question</option>
                  <option>Other</option>
                </select>
              </label>
              <label className="block text-sm font-medium text-brand-navy">
                Message
                <textarea required name="message" rows={5} className="mt-1 w-full rounded-md border border-brand-mist px-3 py-2" />
              </label>
              {/* Honeypot anti-spam field — hidden from users. */}
              <input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
              <button
                type="submit"
                className="inline-flex min-h-[48px] w-fit items-center justify-center rounded-md bg-brand-navy px-6 py-3 text-sm font-semibold text-white hover:bg-brand-blue focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
              >
                Send message
              </button>
              <p className="text-xs text-brand-ink/60">
                Prefer email?{' '}
                <a className="underline" href={mailtoLink('Website enquiry')}>
                  {siteConfig.contactEmail}
                </a>
              </p>
            </form>

            <div className="space-y-4">
              <Card title="Order support" badge="Fastest">
                Include your order phone number and the product name. We reply during business hours and call back on
                payment or delivery questions.
              </Card>
              <Card title="Delivery issues" badge="Pathao / RedX">
                If a tracking update has not moved for more than 48 hours, message us and we will chase the courier on
                your behalf.
              </Card>
              <Card title="Returns and exchanges" badge="7 days">
                Read the returns policy first, then send photos of the item and packaging so we can approve the pickup
                in one reply.
              </Card>
              <div className="rounded-xl border border-brand-mist bg-brand-mist/60 p-5 text-sm text-brand-ink/80">
                <p className="font-semibold text-brand-navy">{siteConfig.legalEntityName}</p>
                <p className="mt-1">
                  <a className="underline hover:text-brand-blue" href={mailtoLink('Shop OTRO enquiry')}>
                    {siteConfig.contactEmail}
                  </a>
                </p>
                <p className="mt-1">
                  <a className="underline hover:text-brand-blue" href={`tel:${siteConfig.phone}`}>
                    {siteConfig.phone}
                  </a>
                </p>
                <p className="mt-3 text-xs text-brand-ink/60">Business hours: Saturday–Thursday, 10 am–8 pm (BST).</p>
              </div>
            </div>
          </div>
        </Section>
      </main>
      <Footer quickLinks={SHOP_QUICK_LINKS} />
    </>
  );
}
