import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Section from '@/components/Section';
import Card from '@/components/Card';
import ProductMedia from '@/components/ProductMedia';
import ProductCard from '@/components/ProductCard';
import ProductPurchase from '@/components/ProductPurchase';
import { buildMetadata } from '@/lib/seo';
import { siteConfig } from '@/lib/siteConfig';
import { formatBdt, getProduct, products } from '@/lib/catalog';

const SHOP_QUICK_LINKS = [
  { href: '/products', label: 'Shop all' },
  { href: '/cart', label: 'Cart' },
  { href: '/returns', label: 'Returns & exchanges' },
];

const PAYMENT_BADGES = ['Cash on Delivery', 'bKash', 'Nagad', 'SSLCommerz'];

/** Prerender every product at build time — no server round-trip per visit. */
export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const product = getProduct(params.slug);
  if (!product) {
    return buildMetadata({
      title: 'Product not found',
      description: 'This product is no longer listed. Browse the current Shop OTRO catalog instead.',
      path: '/products',
    });
  }
  return buildMetadata({
    title: product.name,
    description: `${product.shortDescription} Price: ${formatBdt(product.priceBdt)}. Cash on delivery available across Bangladesh.`,
    path: `/products/${product.slug}`,
  });
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProduct(params.slug);
  if (!product) notFound();

  const sameCategory = products.filter((p) => p.category === product.category && p.id !== product.id);
  const related = sameCategory.length > 0 ? sameCategory.slice(0, 3) : products.filter((p) => p.id !== product.id).slice(0, 3);
  const limited = product.stockLabel.toLowerCase().includes('limited');

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.shortDescription,
    category: product.category,
    brand: { '@type': 'Brand', name: siteConfig.brandName },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'BDT',
      price: product.priceBdt,
      availability: limited ? 'https://schema.org/LimitedAvailability' : 'https://schema.org/InStock',
      seller: { '@type': 'Organization', name: siteConfig.legalEntityName },
    },
  };

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
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }} />

        <Section tone="light">
          <nav aria-label="Breadcrumb" className="mb-8 text-sm text-brand-ink/60">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className="hover:text-brand-blue">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/products" className="hover:text-brand-blue">
                  Shop
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="font-medium text-brand-navy">
                {product.name}
              </li>
            </ol>
          </nav>

          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
            <div>
              <ProductMedia name={product.name} category={product.category} className="aspect-[4/3] w-full rounded-xl" />
              <p className="mt-3 text-xs text-brand-ink/50">
                Product photography placeholder — final studio images are being prepared.
              </p>
            </div>

            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-brand-blue">{product.category}</p>
              <h1 className="mt-2 font-display text-3xl font-bold text-brand-navy sm:text-4xl">{product.name}</h1>

              <div className="mt-4 flex flex-wrap items-center gap-4">
                <p className="font-display text-2xl font-bold text-brand-navy">{formatBdt(product.priceBdt)}</p>
                <span
                  className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${
                    limited ? 'bg-brand-amber/20 text-brand-navy' : 'bg-emerald-50 text-emerald-700'
                  }`}
                >
                  <span aria-hidden="true" className={`h-2 w-2 rounded-full ${limited ? 'bg-brand-amber' : 'bg-emerald-500'}`} />
                  {product.stockLabel}
                </span>
              </div>

              <p className="mt-4 text-base leading-relaxed text-brand-ink/80">{product.shortDescription}</p>

              <ul className="mt-5 space-y-2 text-sm text-brand-ink/80">
                {product.highlights.map((highlight) => (
                  <li key={highlight} className="flex gap-2">
                    <span aria-hidden="true" className="mt-[0.35rem] h-1.5 w-1.5 shrink-0 rounded-full bg-brand-amber" />
                    {highlight}
                  </li>
                ))}
              </ul>

              <div className="mt-8 border-t border-brand-mist pt-8">
                <ProductPurchase
                  productId={product.id}
                  name={product.name}
                  sizes={product.variants.sizes}
                  colors={product.variants.colors}
                />
              </div>

              <div className="mt-8 rounded-xl border border-brand-mist bg-brand-mist/50 p-5">
                <h2 className="text-sm font-semibold uppercase tracking-wide text-brand-navy">Payment options</h2>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {PAYMENT_BADGES.map((method) => (
                    <li key={method} className="rounded-md border border-brand-navy/15 bg-white px-3 py-1 text-xs font-semibold text-brand-navy">
                      {method}
                    </li>
                  ))}
                </ul>
                <p className="mt-3 text-xs leading-relaxed text-brand-ink/70">
                  No payment is taken on this page. Choose a method at checkout; online payment links are sent after the
                  order is reviewed and confirmed by phone.
                </p>
              </div>

              <dl className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-brand-mist p-4">
                  <dt className="text-sm font-semibold text-brand-navy">Delivery estimate</dt>
                  <dd className="mt-1 text-sm text-brand-ink/75">Inside Dhaka 1–2 business days · Outside Dhaka 3–5 business days</dd>
                </div>
                <div className="rounded-xl border border-brand-mist p-4">
                  <dt className="text-sm font-semibold text-brand-navy">Returns</dt>
                  <dd className="mt-1 text-sm text-brand-ink/75">
                    7-day return or exchange on unused items.{' '}
                    <Link href="/returns" className="font-semibold text-brand-blue underline">
                      Read policy
                    </Link>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </Section>

        <Section eyebrow="Good to know" title="Before you order" tone="mist">
          <div className="grid gap-6 lg:grid-cols-3">
            <Card title="Courier and tracking" badge="Pathao / RedX">
              Parcels are handed to Pathao or RedX depending on your district. You receive a tracking ID by SMS as soon as
              the parcel is dispatched.
            </Card>
            <Card title="Delivery charge" badge="Confirmed by phone">
              Courier pricing depends on zone and weight, so we confirm the exact charge on the phone before dispatch —
              no hidden amounts added to the parcel.
            </Card>
            <Card title="Variants and stock" badge="Manual confirmation">
              Size and colour choices are recorded with your order and confirmed by our team, since stock moves quickly
              during peak seasons.
            </Card>
          </div>
        </Section>

        <Section eyebrow="You may also like" title="Related products" tone="light">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </Section>
      </main>
      <Footer quickLinks={SHOP_QUICK_LINKS} />
    </>
  );
}
