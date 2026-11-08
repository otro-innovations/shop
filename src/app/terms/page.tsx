import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Section from '@/components/Section';
import { buildMetadata } from '@/lib/seo';
import { siteConfig, mailtoLink } from '@/lib/siteConfig';

export const metadata = buildMetadata({
  title: 'Terms of Sale',
  description: `Terms of sale for ${siteConfig.brandName}: orders, pricing in BDT, cash on delivery and online payments, Pathao/RedX delivery, returns and liability.`,
  path: '/terms',
});

const SHOP_QUICK_LINKS = [
  { href: '/products', label: 'Shop all' },
  { href: '/cart', label: 'Cart' },
  { href: '/returns', label: 'Returns & exchanges' },
];

const SECTIONS = [
  {
    heading: '1. Who these terms are with',
    body: [
      `This storefront is operated by ${siteConfig.legalEntityName} under the ${siteConfig.brandName} name. By submitting an order request or using this site you agree to these terms.`,
      'If you do not agree with them, please do not place an order.',
    ],
  },
  {
    heading: '2. Orders are requests, confirmed by a person',
    body: [
      'Submitting the checkout form creates an order request, not a completed sale. Our team reviews it, checks stock and calls or messages you to confirm the delivery charge and payment method.',
      'A contract of sale is formed only when we confirm the order to you. If an item turns out to be out of stock or mispriced, we will tell you before dispatch and you may cancel without any charge.',
      'We may decline an order where details are incomplete, where fraud is suspected, or where the delivery address is outside our courier coverage.',
    ],
  },
  {
    heading: '3. Prices and payment',
    body: [
      'All prices are shown in Bangladeshi Taka (BDT) and cover the product only. The delivery charge for your zone is quoted and confirmed before dispatch, so the final amount is agreed with you in advance.',
      'We accept cash on delivery, bKash, Nagad and SSLCommerz. Cash on delivery is paid to the courier on arrival. For online methods we send a payment request from the official merchant account only after the order is confirmed.',
      'This site never collects card numbers, wallet PINs or OTPs. bKash, Nagad and SSLCommerz process payments under their own terms; we are not responsible for their systems, but we will help you raise a failed-payment query.',
    ],
  },
  {
    heading: '4. Delivery',
    body: [
      'We deliver inside Bangladesh using Pathao and RedX. Typical timelines are 1–2 business days inside Dhaka and 3–5 business days elsewhere; remote areas may take longer. These are estimates, not guarantees.',
      'Please provide a reachable phone number and a complete address including thana and, where relevant, a landmark. If a parcel cannot be delivered because the address or phone number is wrong, the courier may return it to us; a re-delivery charge set by the courier may then apply.',
      'Risk in the goods passes to you when the parcel is delivered and accepted. Please inspect the parcel at delivery and report damage or a wrong item within 48 hours.',
    ],
  },
  {
    heading: '5. Returns and exchanges',
    body: [
      'Returns and exchanges are governed by our returns policy, which forms part of these terms: unused items in original condition may be returned or exchanged within 7 days of delivery, subject to the exclusions listed there.',
    ],
  },
  {
    heading: '6. Product information',
    body: [
      'We describe products as accurately as we can. Screen settings and lighting can make colours look slightly different in person, and hand-made or locally tailored items may vary slightly in measurement. Such variation is not a defect.',
      'Product imagery on this site is a styled placeholder until studio photography is published; the written description and the confirmed variant are the reference for what you will receive.',
      'Stock labels reflect our records at the time of listing. Because stock moves quickly during peak seasons, the final availability is confirmed on the phone before dispatch.',
    ],
  },
  {
    heading: '7. Your responsibilities',
    body: [
      'Provide accurate contact and delivery details, keep your phone reachable around the delivery window, and pay the agreed amount on delivery for cash-on-delivery orders.',
      'Do not use this site to submit false orders, abusive messages or automated form spam.',
    ],
  },
  {
    heading: '8. Intellectual property',
    body: [
      `The ${siteConfig.brandName} and OTRO names, this site's layout, copy and product descriptions belong to ${siteConfig.legalEntityName} or are used with permission. You may share links and quote short excerpts with attribution, but not republish the catalog or copy for commercial use.`,
      'Third-party names such as Pathao, RedX, bKash, Nagad and SSLCommerz are the property of their respective owners and are used only to describe the services involved in your order.',
    ],
  },
  {
    heading: '9. Liability',
    body: [
      'To the extent permitted by law, our liability for any order is limited to the amount you paid for that order, including the delivery charge. We are not liable for indirect or consequential losses, such as lost profit or lost opportunity.',
      'Nothing in these terms excludes liability for fraud, for death or personal injury caused by negligence, or for any consumer right that cannot be excluded under Bangladeshi law, including the Consumer Rights Protection Act, 2009.',
    ],
  },
  {
    heading: '10. Events outside our control',
    body: [
      'We are not liable for delays caused by events outside our reasonable control, including courier strikes, natural disasters, flooding, political unrest, government restrictions or nationwide internet disruption. We will keep you informed and complete the order as soon as it is practical.',
    ],
  },
  {
    heading: '11. Governing law and complaints',
    body: [
      'These terms are governed by the laws of Bangladesh for consumer purchases made through this storefront. Disputes are subject to the jurisdiction of the Bangladeshi courts.',
      `If something goes wrong, contact us first at ${siteConfig.contactEmail} with your order phone number. We aim to resolve complaints within 7 business days, and we will always tell you where a matter stands.`,
    ],
  },
  {
    heading: '12. Changes to these terms',
    body: [
      'We may update these terms as the shop grows. The version published on this page when you place an order is the version that applies to that order.',
    ],
  },
];

export default function TermsPage() {
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
          eyebrow="Legal"
          title="Terms of Sale"
          lead="The rules that apply when you request an order from Shop OTRO: how orders are confirmed, how payment and delivery work, and what happens if something goes wrong."
          tone="navy"
          headingLevel="h1"
        >
          <p className="text-sm text-white/70">Last updated: November 2026</p>
        </Section>

        <Section title="The detail" tone="light">
          <div className="max-w-3xl space-y-8">
            {SECTIONS.map((section) => (
              <div key={section.heading}>
                <h3 className="font-display text-xl font-bold text-brand-navy">{section.heading}</h3>
                <div className="mt-2 space-y-2 text-sm leading-relaxed text-brand-ink/80">
                  {section.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </div>
            ))}
            <div className="rounded-xl border border-brand-mist bg-brand-mist/60 p-5 text-sm leading-relaxed text-brand-ink/80">
              <p className="font-semibold text-brand-navy">Contact for legal and order matters</p>
              <p className="mt-1">
                {siteConfig.legalEntityName} · {siteConfig.brandName}
                <br />
                <a className="font-semibold text-brand-blue underline" href={mailtoLink('Terms enquiry')}>
                  {siteConfig.contactEmail}
                </a>{' '}
                · {siteConfig.phone}
              </p>
              <p className="mt-3">
                Related:{' '}
                <Link href="/privacy" className="font-semibold text-brand-blue underline">
                  Privacy policy
                </Link>{' '}
                ·{' '}
                <Link href="/returns" className="font-semibold text-brand-blue underline">
                  Returns policy
                </Link>
              </p>
            </div>
          </div>
        </Section>
      </main>
      <Footer quickLinks={SHOP_QUICK_LINKS} />
    </>
  );
}
