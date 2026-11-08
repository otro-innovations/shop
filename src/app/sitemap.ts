import type { MetadataRoute } from 'next';
import { siteConfig, absoluteUrl } from '@/lib/siteConfig';
import { products } from '@/lib/catalog';

/** Sitemap URLs derived from siteConfig — survives domain migration untouched. */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes = ['', '/products', '/about', '/contact', '/returns', '/terms', '/privacy'];
  const entries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: absoluteUrl(route),
    lastModified: now,
    changeFrequency: 'monthly',
    priority: route === '' ? 1 : 0.7,
  }));

  // Product detail pages are statically generated at build time.
  for (const product of products) {
    entries.push({
      url: absoluteUrl(`/products/${product.slug}`),
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    });
  }

  // Cross-pillar entries so search engines map the whole OTRO ecosystem.
  for (const sub of ['edu', 'digital', 'trade', 'shop', 'tours']) {
    if (sub !== siteConfig.subdomain) {
      entries.push({
        url: `https://${sub}.${siteConfig.baseDomain}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.4,
      });
    }
  }

  return entries;
}
