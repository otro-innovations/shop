/**
 * Config-driven metadata factory. Canonical/OG URLs ALWAYS derive from
 * siteConfig.absoluteUrl — never a literal host (domain-portability rule §4).
 */
import type { Metadata } from 'next';
import { siteConfig, absoluteUrl } from './siteConfig';

interface SeoInput {
  title?: string;
  description?: string;
  path?: string;          // e.g. '/about'
  image?: string;        // optional custom OG image path
  type?: 'website' | 'article';
}

export function buildMetadata({
  title,
  description,
  path = '',
  image = '/og.png',
  type = 'website',
}: SeoInput = {}): Metadata {
  const pageTitle = title ? `${title} | ${siteConfig.brandName}` : `${siteConfig.brandName} — ${siteConfig.tagline}`;
  const desc = description ?? siteConfig.description;
  const url = absoluteUrl(path);
  // Root layout owns the "%s | Brand" template. Child pages pass a plain string
  // title so the template is applied exactly once (no doubled brand suffix).
  // The root segment (path '') is not wrapped by its own layout template, so it
  // gets the brand suffix applied here.
  const titleField = !title
    ? { default: pageTitle, template: `%s | ${siteConfig.brandName}` }
    : path === '' || path === '/'
      ? `${title} | ${siteConfig.brandName}`
      : title;
  return {
    metadataBase: new URL(absoluteUrl('')),
    title: titleField,
    description: desc,
    keywords: ['OTRO', 'OTRO INNOVATIONS', 'China', 'Bangladesh', 'sourcing', 'education', 'trade'],
    alternates: { canonical: url },
    openGraph: {
      type,
      url,
      siteName: siteConfig.brandName,
      title: pageTitle,
      description: desc,
      images: [{ url: absoluteUrl(image), width: 1200, height: 630, alt: pageTitle }],
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description: desc,
      images: [absoluteUrl(image)],
    },
    robots: { index: true, follow: true },
  };
}

/** schema.org Organization JSON-LD — domain derived from config. */
export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.legalEntityName,
    alternateName: siteConfig.brandName,
    url: absoluteUrl(''),
    email: siteConfig.contactEmail,
    description: siteConfig.description,
    sameAs: Object.entries(siteConfig.socialHandles).map(([platform, handle]) => {
      const domains: Record<string, string> = {
        facebook: 'facebook.com', linkedin: 'linkedin.com/company',
        instagram: 'instagram.com', youtube: 'youtube.com/',
      };
      return `https://${domains[platform] ?? platform}.com/${handle}`;
    }),
  };
}
