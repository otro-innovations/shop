import Link from 'next/link';
import type { Product } from '@/lib/catalog';
import { formatBdt } from '@/lib/catalog';
import ProductMedia from '@/components/ProductMedia';

/** Product tile used on the home best-seller grid and the /products catalog. */
export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-brand-mist bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
    >
      <div className="relative">
        <ProductMedia name={product.name} category={product.category} className="h-44 w-full sm:h-48" />
        {product.badge && (
          <span className="absolute left-3 top-3 rounded-full bg-brand-amber px-3 py-1 text-xs font-bold uppercase tracking-wide text-brand-navy">
            {product.badge}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-brand-blue">{product.category}</p>
        <h3 className="mt-1 font-display text-lg font-bold text-brand-navy group-hover:text-brand-blue">{product.name}</h3>
        <p className="mt-1 text-sm leading-relaxed text-brand-ink/70">{product.shortDescription}</p>
        <div className="mt-auto flex items-center justify-between gap-3 pt-4">
          <span className="font-semibold text-brand-navy">{formatBdt(product.priceBdt)}</span>
          <span className="text-sm font-semibold text-brand-blue">View details</span>
        </div>
      </div>
    </Link>
  );
}
