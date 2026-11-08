import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Section from '@/components/Section';
import Card from '@/components/Card';
import Button from '@/components/Button';
import { buildMetadata } from '@/lib/seo';
import { siteConfig, mailtoLink } from '@/lib/siteConfig';

export const metadata = buildMetadata({
  title: 'Returns & exchanges',
  description:
    'Shop OTRO returns and exchange policy: 7-day window, condition requirements, step-by-step process, refund timelines and exclusions for Bangladesh deliveries.',
  path: '/returns',
});

const SHOP_QUICK_LINKS = [
  { href: '/products', label: 'Shop all' },
  { href: '/cart', label: 'Cart' },
  { href: '/returns', label: 'Returns & exchanges' },
];

const STEPS = [
  {
    title: 'Message us within 7 days',
    body: 'Email or use the contact form with your order phone number, the product name and the reason. Attach photos of the item and its packaging.',
  },
  {
    title: 'We approve in one business day',
    body: 'We confirm whether the item qualifies for a return, exchange or refund and share the pickup or drop-off instructions.',
  },
  {
    title: 'Pickup or courier drop-off',
    body: 'Inside Dhaka we arrange a pickup. Outside Dhaka we share the return address and the courier option that costs you least.',
  },
  {
    title: 'Inspection and resolution',
    body: 'Once the item reaches us we inspect it within 2 business days, then ship the exchange or process the refund.',
  },
];

export default function ReturnsPage() {
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
          eyebrow="Returns & exchanges"
          title="A clear returns policy, not a maze."
          lead="If something is wrong with your order, tell us. We accept returns and exchanges within 7 days of delivery when the conditions below are met — and we never ask you to argue for a fair outcome."
          tone="navy"
          headingLevel="h1"
        >
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button href="/contact" variant="secondary">
              Start a return
            </Button>
            <Button href="/products" variant="ghost">
              Back to the shop
            </Button>
          </div>
        </Section>

        <Section eyebrow="At a glance" title="The essentials" tone="light">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <Card title="7-day window" badge="From delivery">
              Report the issue within 7 calendar days of receiving the parcel. Damaged or wrong items must be reported
              within 48 hours.
            </Card>
            <Card title="Original condition" badge="Unused">
              Unworn, unwashed and unused, with tags, labels and packaging intact, and all accessories included.
            </Card>
            <Card title="Exchange or refund" badge="Your choice">
              Swap for another size or colour where stock allows, or take a refund to bKash, Nagad or your bank account.
            </Card>
            <Card title="Who pays courier" badge="Case by case">
              We cover return courier charges for damaged, defective or wrong items. Change-of-mind returns are sent at
              your cost.
            </Card>
          </div>
        </Section>

        <Section eyebrow="Process" title="How to return or exchange" tone="mist">
          <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((step, index) => (
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
            Contact:{' '}
            <a className="font-semibold text-brand-blue underline" href={mailtoLink('Return request')}>
              {siteConfig.contactEmail}
            </a>{' '}
            — include &ldquo;Return&rdquo; and your order phone number in the subject line so it reaches the right team.
          </p>
        </Section>

        <Section eyebrow="Refunds" title="How refunds are paid" tone="light">
          <div className="max-w-3xl space-y-4 text-base leading-relaxed text-brand-ink/80">
            <p>
              Cash-on-delivery orders are refunded through bKash, Nagad or a bank transfer in the account holder&apos;s
              name. Online payments are refunded to the original payment source where the provider supports it. Refunds
              are initiated within 2 business days of inspection and usually land within 7–10 business days depending on
              the provider.
            </p>
            <p>
              Delivery charges are not refunded for change-of-mind returns. If the return is due to a defective, damaged
              or incorrect item, the delivery charge is refunded together with the product price.
            </p>
            <p>
              Exchanges are dispatched after the returned item passes inspection. If the exchange item costs more, we
              confirm the difference with you before dispatch; if it costs less, the balance is refunded.
            </p>
          </div>
        </Section>

        <Section eyebrow="Exclusions" title="What we cannot accept" tone="mist">
          <ul className="grid max-w-3xl gap-3 text-sm leading-relaxed text-brand-ink/80 sm:grid-cols-2">
            {[
              'Innerwear, swimwear and personal-care items, for hygiene reasons.',
              'Opened or consumed pantry items (tea, food, supplements).',
              'Personalised or customised items made to your specification.',
              'Products marked “final sale” or “no return” on the product page.',
              'Items damaged by misuse, improper washing or alteration after delivery.',
              'Items returned without tags, original packaging or included accessories.',
            ].map((item) => (
              <li key={item} className="flex gap-2 rounded-md border border-brand-mist bg-white p-3">
                <span aria-hidden="true" className="mt-[0.3rem] h-1.5 w-1.5 shrink-0 rounded-full bg-brand-amber" />
                {item}
              </li>
            ))}
          </ul>
        </Section>

        <Section eyebrow="Your rights" title="This policy sits on top of the law" tone="light">
          <div className="max-w-3xl space-y-4 text-sm leading-relaxed text-brand-ink/80">
            <p>
              Nothing in this policy reduces any right you have under Bangladeshi consumer protection law, including the
              Consumer Rights Protection Act, 2009. Where the law gives you a stronger remedy than this policy, the law
              applies.
            </p>
            <p>
              If a parcel is lost or shows no tracking movement for more than 48 hours, contact us and we will file the
              courier claim ourselves. Please do not open a dispute with the courier directly — the contract is with us,
              not with you.
            </p>
            <p>
              Read the full{' '}
              <Link href="/terms" className="font-semibold text-brand-blue underline">
                terms of sale
              </Link>{' '}
              and{' '}
              <Link href="/privacy" className="font-semibold text-brand-blue underline">
                privacy policy
              </Link>{' '}
              for the rest of the detail.
            </p>
          </div>
        </Section>

        <Section eyebrow="Contact" title="Need help with a return?" lead="Send the order phone number, product name and photos — we will reply with the next step." tone="navy">
          <Button href="/contact" variant="secondary">
            Contact the order team
          </Button>
        </Section>
      </main>
      <Footer quickLinks={SHOP_QUICK_LINKS} />
    </>
  );
}
