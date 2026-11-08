import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Section from '@/components/Section';
import Button from '@/components/Button';
import ProductCard from '@/components/ProductCard';
import { buildMetadata } from '@/lib/seo';
import { productCategories, products } from '@/lib/catalog';

export const metadata = buildMetadata({
  title: 'All products',
  description:
    'Browse every Shop OTRO product: apparel, home and kitchen, bags, stationery, electronics and pantry. Prices in BDT with cash on delivery across Bangladesh.',
  path: '/products',
});

const SHOP_QUICK_LINKS = [
  { href: '/products', label: 'Shop all' },
  { href: '/cart', label: 'Cart' },
  { href: '/returns', label: 'Returns & exchanges' },
];

/** Static catalog grid — mobile-first, 1 column on phones, 4 on desktop. */
export default function ProductsPage() {
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
          eyebrow="Shop OTRO"
          title="The full catalog"
          lead="A deliberately short list of products we can stand behind. Prices are in Bangladeshi Taka (BDT); delivery is charged by courier zone and confirmed by phone before dispatch."
          tone="navy"
          headingLevel="h1"
        >
          <ul className="flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-wide text-white/80">
            {productCategories.map((category) => (
              <li key={category.name} className="rounded-full border border-white/20 px-3 py-1">
                {category.name} ({category.count})
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Every product" eyebrow={`${products.length} products`} tone="light">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="mt-10 rounded-xl border border-brand-mist bg-brand-mist/60 p-6">
            <h3 className="font-display text-lg font-bold text-brand-navy">Buying in bulk or for a shop?</h3>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-brand-ink/75">
              Quantity pricing, custom packing and delivery scheduling are handled by the OTRO trade division. Tell us
              the product, quantity and delivery district and we will quote properly.
            </p>
            <div className="mt-4">
              <Button href="/contact" variant="ghost">
                Request a bulk quote
              </Button>
            </div>
          </div>
        </Section>
      </main>
      <Footer quickLinks={SHOP_QUICK_LINKS} />
    </>
  );
}
