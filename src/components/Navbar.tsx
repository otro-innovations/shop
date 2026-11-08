import Link from 'next/link';
import { siteConfig, getHost } from '@/lib/siteConfig';
import CartLink from '@/components/CartLink';

interface NavLink { href: string; label: string }

/**
 * Shared navbar. `links` are RELATIVE paths only (portability rule §4);
 * cross-site links use siblingHref() from Footer to stay config-derived.
 * The mobile menu uses <details> so it works without JavaScript; the cart
 * count is a client island that reads localStorage.
 */
export default function Navbar({
  links,
  ctaLabel = 'Shop Now',
  ctaHref = '/products',
}: {
  links: NavLink[];
  ctaLabel?: string;
  ctaHref?: string;
}) {
  return (
    <header className="sticky top-0 z-50 border-b border-brand-mist bg-white/95 backdrop-blur">
      <nav aria-label="Main navigation" className="mx-auto flex max-w-content items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-baseline gap-2" aria-label={`${siteConfig.brandName} home`}>
          <span className="font-display text-2xl font-bold tracking-tight text-brand-navy">OTRO</span>
          <span className="hidden text-xs font-semibold uppercase tracking-widest text-brand-blue sm:inline">
            {siteConfig.subdomain}
          </span>
        </Link>

        <ul className="hidden items-center gap-6 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="text-sm font-medium text-brand-ink hover:text-brand-blue">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1 sm:gap-2">
          <a href={`tel:${siteConfig.phone}`} className="hidden text-sm font-medium text-brand-ink hover:text-brand-blue lg:inline" aria-label="Call us">
            {siteConfig.phone}
          </a>
          <CartLink />
          <Link
            href={ctaHref}
            className="hidden min-h-[44px] items-center rounded-md bg-brand-navy px-4 py-2 text-sm font-semibold text-white hover:bg-brand-blue sm:inline-flex"
          >
            {ctaLabel}
          </Link>

          {/* Mobile menu (no JS required). */}
          <details className="relative md:hidden">
            <summary className="flex h-11 w-11 cursor-pointer list-none items-center justify-center rounded-md border border-brand-mist text-brand-navy [&::-webkit-details-marker]:hidden">
              <span className="sr-only">Menu</span>
              <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            </summary>
            <div className="absolute right-0 top-12 w-60 rounded-lg border border-brand-mist bg-white p-2 shadow-lg">
              <ul className="space-y-1">
                {links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="flex min-h-[44px] items-center rounded-md px-3 text-sm font-medium text-brand-ink hover:bg-brand-mist hover:text-brand-blue">
                      {l.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href="/cart" className="flex min-h-[44px] items-center rounded-md px-3 text-sm font-medium text-brand-ink hover:bg-brand-mist hover:text-brand-blue">
                    Cart
                  </Link>
                </li>
                <li>
                  <Link href={ctaHref} className="mt-1 flex min-h-[44px] items-center justify-center rounded-md bg-brand-navy px-3 text-sm font-semibold text-white hover:bg-brand-blue">
                    {ctaLabel}
                  </Link>
                </li>
              </ul>
            </div>
          </details>
        </div>
      </nav>
      <span className="sr-only">{getHost()}</span>
    </header>
  );
}
