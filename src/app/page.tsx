import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Section from '@/components/Section';
import Card from '@/components/Card';
import Button from '@/components/Button';
import ProductCard from '@/components/ProductCard';
import { siteConfig, mailtoLink } from '@/lib/siteConfig';
import { buildMetadata } from '@/lib/seo';
import { bestSellers, featuredProducts, productCategories } from '@/lib/catalog';

export const metadata = buildMetadata({
  title: 'Everyday essentials, delivered across Bangladesh',
  description:
    'Shop OTRO — curated apparel, home and everyday products with cash on delivery, bKash, Nagad and SSLCommerz payments, shipped by Pathao and RedX across Bangladesh.',
  path: '/',
});

const SHOP_QUICK_LINKS = [
  { href: '/products', label: 'Shop all' },
  { href: '/cart', label: 'Cart' },
  { href: '/returns', label: 'Returns & exchanges' },
];

const FAQ = [
  {
    q: 'Do I have to pay before delivery?',
    a: 'No. Cash on delivery is available nationwide. If you prefer bKash, Nagad or SSLCommerz, we send a payment link only after your order request has been reviewed and confirmed by phone.',
  },
  {
    q: 'How long does delivery take?',
    a: 'Inside Dhaka metro, usually 1–2 business days. Outside Dhaka, 3–5 business days. Remote upazilas can take up to 7 business days depending on courier coverage. Weather and holidays can add a day or two.',
  },
  {
    q: 'Which courier delivers my parcel?',
    a: 'We ship with Pathao and RedX. Inside Dhaka we generally use Pathao; outside Dhaka we pick whichever of the two has the better coverage for your area. You get a tracking ID by SMS once the parcel is handed to the courier.',
  },
  {
    q: 'Can I return or exchange an item?',
    a: 'Yes — unused items in original packaging can be returned or exchanged within 7 days of delivery. Read the full timeline, conditions and exclusions on our Returns page before ordering.',
  },
  {
    q: 'Are prices really in BDT?',
    a: 'Yes. Every price on the site is in Bangladeshi Taka (BDT) and is the product price only. The delivery charge for your zone is confirmed by phone before dispatch, so there are no surprise fees on the parcel.',
  },
  {
    q: 'Do you ship outside Bangladesh?',
    a: 'Not yet. Shop OTRO currently delivers inside Bangladesh only. If you need cross-border sourcing, our B2B division handles bulk orders and export documentation.',
  },
];

/**
 * Shop OTRO homepage (CONTENT_BRIEFS SITE 4). Product-led, mobile-first and
 * conversion-focused: shop CTA in the hero, best-sellers above the fold on
 * scroll, then delivery trust, FAQ and a contact CTA.
 */
export default function HomePage() {
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
        {/* Hero — product-led */}
        <Section
          eyebrow={siteConfig.tagline}
          title="Everyday essentials, honestly priced, delivered to your door."
          lead={`${siteConfig.brandName} is the retail division of ${siteConfig.legalEntityName}. Curated apparel, home and everyday goods for Bangladesh — pay cash on delivery, bKash, Nagad or card, and track every parcel with Pathao or RedX.`}
          tone="navy"
          headingLevel="h1"
        >
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button href="/products">Shop Now</Button>
            <Button href="#best-sellers" variant="secondary">
              See best sellers
            </Button>
          </div>
          <ul className="mt-6 flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-wide text-white/80">
            {['Cash on Delivery', 'bKash', 'Nagad', 'SSLCommerz'].map((method) => (
              <li key={method} className="rounded-full border border-white/20 px-3 py-1">
                {method}
              </li>
            ))}
          </ul>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </Section>

        {/* Trust strip */}
        <Section eyebrow="Why people order here" title="Local delivery, local payments, real accountability" tone="light">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <Card title="Cash on delivery" badge="Nationwide">
              Check the parcel before you pay. COD is available everywhere Pathao and RedX deliver across Bangladesh.
            </Card>
            <Card title="Easy returns" badge="7 days">
              Unused items with tags can be returned or exchanged within 7 days. Clear policy, no runaround.
            </Card>
            <Card title="Local payments" badge="BDT">
              bKash, Nagad and SSLCommerz for card or bank payment — plus COD if you would rather pay on arrival.
            </Card>
            <Card title="Tracked couriers" badge="Pathao / RedX">
              Every parcel ships with a tracking ID, sent by SMS as soon as it leaves our hands.
            </Card>
          </div>
        </Section>

        {/* Featured categories */}
        <Section
          eyebrow="Featured collections"
          title="Start with a category"
          lead="A small, deliberate catalog. Every item is checked before it is listed — no endless, unverifiable inventory."
          tone="mist"
        >
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {productCategories.map((category) => (
              <Card key={category.name} href="/products" title={category.name} badge={`${category.count} item${category.count === 1 ? '' : 's'}`}>
                Browse the {category.name.toLowerCase()} selection.
              </Card>
            ))}
          </div>
        </Section>

        {/* Best sellers */}
        <Section
          id="best-sellers"
          eyebrow="Best sellers"
          title="What customers reorder most"
          lead="Our most requested pieces this season. Prices are in BDT and stock is updated as orders are confirmed."
          tone="light"
        >
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {bestSellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="mt-8">
            <Button href="/products" variant="ghost">
              Browse all products
            </Button>
          </div>
        </Section>

        {/* How delivery works */}
        <Section
          eyebrow="Delivery"
          title="How delivery works"
          lead="Two zones, two couriers, one confirmation call. Here is exactly what happens after you request an order."
          tone="mist"
        >
          <div className="grid gap-6 lg:grid-cols-2">
            <Card title="Inside Dhaka" badge="1–2 business days">
              Delivered by Pathao. Same-day dispatch for orders confirmed before 3 pm on working days. Cash on delivery
              collected at your door.
            </Card>
            <Card title="Outside Dhaka" badge="3–5 business days">
              Delivered by Pathao or RedX depending on coverage. We share the tracking ID by SMS so you can follow the
              parcel until it reaches your thana.
            </Card>
          </div>
          <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { title: 'Request your order', body: 'Add items to the cart and submit the order request. No payment is taken on the site.' },
              { title: 'We confirm by phone', body: 'Our team calls to confirm stock, the delivery charge for your zone and your payment method.' },
              { title: 'Dispatch + tracking', body: 'Your parcel is packed, handed to Pathao or RedX, and the tracking ID reaches you by SMS.' },
              { title: 'Pay on arrival', body: 'Pay the courier in cash, or complete a bKash, Nagad or SSLCommerz payment link before dispatch.' },
            ].map((step, index) => (
              <li key={step.title} className="rounded-xl border border-brand-mist bg-white p-5">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-brand-navy text-sm font-bold text-white">
                  {index + 1}
                </span>
                <h3 className="mt-3 font-display text-lg font-bold text-brand-navy">{step.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-brand-ink/75">{step.body}</p>
              </li>
            ))}
          </ol>
          <p className="mt-6 max-w-3xl text-sm text-brand-ink/70">
            Delivery charges are set by courier zone and parcel weight, so they are confirmed on the phone before
            dispatch rather than guessed online. Inside-Dhaka orders are usually the cheapest; outside-Dhaka rates depend
            on your district.
          </p>
        </Section>

        {/* FAQ */}
        <Section eyebrow="FAQ" title="Questions before you order" tone="light">
          <div className="max-w-3xl divide-y divide-brand-mist rounded-xl border border-brand-mist bg-white">
            {FAQ.map((item) => (
              <details key={item.q} className="group p-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold text-brand-navy [&::-webkit-details-marker]:hidden">
                  {item.q}
                  <span aria-hidden="true" className="text-brand-blue transition group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-brand-ink/80">{item.a}</p>
              </details>
            ))}
          </div>
        </Section>

        {/* Contact CTA */}
        <Section
          eyebrow="Contact"
          title="Not sure which size, colour or product?"
          lead="Message the order team with the product name and your city — we will confirm availability, sizing and the delivery estimate before you order."
          tone="navy"
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button href="/contact" variant="secondary">
              Contact the order team
            </Button>
            <a className="text-sm font-semibold text-white/85 underline hover:text-white" href={mailtoLink('Shop OTRO enquiry')}>
              {siteConfig.contactEmail}
            </a>
          </div>
        </Section>
      </main>
      <Footer quickLinks={SHOP_QUICK_LINKS} />
    </>
  );
}
