import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Section from '@/components/Section';
import CartView from '@/components/CartView';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Your cart',
  description: 'Review the items in your Shop OTRO cart, adjust quantities and continue to checkout. Cash on delivery available across Bangladesh.',
  path: '/cart',
});

const SHOP_QUICK_LINKS = [
  { href: '/products', label: 'Shop all' },
  { href: '/cart', label: 'Cart' },
  { href: '/returns', label: 'Returns & exchanges' },
];

export default function CartPage() {
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
          eyebrow="Cart"
          title="Your cart"
          lead="Items are saved on this device only. Nothing is charged here — your order request is reviewed and confirmed by phone before payment or dispatch."
          tone="light"
          headingLevel="h1"
        >
          <CartView />
        </Section>
      </main>
      <Footer quickLinks={SHOP_QUICK_LINKS} />
    </>
  );
}
