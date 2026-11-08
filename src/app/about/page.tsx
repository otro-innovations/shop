import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Section from '@/components/Section';
import Card from '@/components/Card';
import Button from '@/components/Button';
import { buildMetadata } from '@/lib/seo';
import { siteConfig } from '@/lib/siteConfig';

export const metadata = buildMetadata({
  title: 'About Shop OTRO',
  description: `About ${siteConfig.brandName} — the retail division of ${siteConfig.legalEntityName}: curated everyday products for Bangladesh with cash on delivery and local courier delivery.`,
  path: '/about',
});

const SHOP_QUICK_LINKS = [
  { href: '/products', label: 'Shop all' },
  { href: '/cart', label: 'Cart' },
  { href: '/returns', label: 'Returns & exchanges' },
];

export default function AboutPage() {
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
          eyebrow="About"
          title="Retail built on the Bridge Mindset."
          lead={`${siteConfig.brandName} is the consumer retail division of ${siteConfig.legalEntityName} — the same group that runs trade, education, digital and travel businesses between China, Bangladesh and the world.`}
          tone="navy"
          headingLevel="h1"
        >
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button href="/products" variant="secondary">
              Shop the catalog
            </Button>
            <Button href="/contact" variant="ghost">
              Talk to the team
            </Button>
          </div>
        </Section>

        <Section eyebrow="Our story" title="A shop that answers the phone" tone="light">
          <div className="max-w-3xl space-y-5 text-base leading-relaxed text-brand-ink/80">
            <p>
              OTRO started as a bridge between markets: a Bangladesh-rooted team with operations in China, working for
              importers, students and businesses who needed someone accountable on both sides of a transaction. Shop OTRO
              applies the same discipline to everyday retail in Bangladesh.
            </p>
            <p>
              Most online shoppers here are not short of options — they are short of certainty. Will the item arrive? Is
              the size what it says? If something is wrong, will anyone reply? We built a small catalog around those
              questions instead of an endless one. Every product is sampled or inspected before it is listed, priced in
              BDT with no invented discounts, and delivered through couriers you already know: Pathao and RedX.
            </p>
            <p>
              Because we run our own import and logistics work, we can keep stock honest. When a product is running low,
              the listing says so. When a variant is unavailable, we tell you on the phone instead of shipping a
              substitute. That is the retail version of the Bridge Mindset: the same standards we apply to a
              container of goods, applied to a single panjabi or a water bottle.
            </p>
          </div>
        </Section>

        <Section eyebrow="How we work" title="Four commitments" tone="mist">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <Card title="Curated, not crowded" badge="Small catalog">
              A short list of products we have handled ourselves. We would rather add slowly than list things we cannot
              support.
            </Card>
            <Card title="Honest pricing" badge="BDT">
              One clear price in Bangladeshi Taka. Delivery is charged at courier rates and confirmed before dispatch —
              never quietly added.
            </Card>
            <Card title="Local logistics" badge="Pathao / RedX">
              Inside Dhaka in 1–2 business days, outside Dhaka in 3–5. Tracking IDs sent by SMS, not buried in a portal.
            </Card>
            <Card title="After-sales that replies" badge="7-day returns">
              Real people answer order queries, delivery issues and returns — the same team that packed the parcel.
            </Card>
          </div>
        </Section>

        <Section eyebrow="Sourcing" title="Where the products come from" tone="light">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-xl border border-brand-mist bg-white p-6">
              <h3 className="font-display text-xl font-bold text-brand-navy">Local makers first</h3>
              <p className="mt-2 text-sm leading-relaxed text-brand-ink/80">
                Apparel, jute goods and pantry items come from Bangladeshi workshops and gardens. We buy in small runs so
                quality stays consistent and lead times stay short.
              </p>
            </div>
            <div className="rounded-xl border border-brand-mist bg-white p-6">
              <h3 className="font-display text-xl font-bold text-brand-navy">Imported where it makes sense</h3>
              <p className="mt-2 text-sm leading-relaxed text-brand-ink/80">
                Accessories and electronics are sourced through our own trade channels, inspected before dispatch, and
                backed by the same returns policy as everything else in the shop.
              </p>
            </div>
          </div>
          <p className="mt-6 max-w-3xl text-sm leading-relaxed text-brand-ink/70">
            We do not claim to manufacture what we sell, and we do not pass off another company&apos;s brand as our own.
            Products are listed under plain, descriptive names so you know exactly what you are buying.
          </p>
        </Section>

        <Section
          eyebrow="Contact"
          title="Questions about a product or an order?"
          lead="Message the order team — include the product name, your city and (for an existing order) your phone number."
          tone="navy"
        >
          <Button href="/contact" variant="secondary">
            Contact the order team
          </Button>
        </Section>
      </main>
      <Footer quickLinks={SHOP_QUICK_LINKS} />
    </>
  );
}
