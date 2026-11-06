/**
 * OTRO — Domain-Portability Engine (SINGLE SOURCE OF TRUTH)
 * ─────────────────────────────────────────────────────────────────────────────
 * Every absolute URL, canonical tag, OG URL, sitemap entry, robots rule, cookie
 * domain and CORS allow-list in this codebase MUST derive from this file.
 *
 * Migration plan (otro.bd -> otro.cn) reduces to:
 *   1. Change NEXT_PUBLIC_BASE_DOMAIN in the Vercel project env vars.
 *   2. Flip DNS in Cloudflare. No code edits. Ever.
 *
 * Hardcoding the literal base domain anywhere outside this file and .env* is
 * forbidden and blocked at build time by scripts/assert-no-hardcoded-domain.mjs.
 */

export type Subdomain = 'main' | 'edu' | 'digital' | 'trade' | 'shop' | 'tours';

export interface SiteConfig {
  /** Production base domain. Env-driven; default is a safe local placeholder. */
  baseDomain: string;
  /** Which pillar this repo implements. 'main' = corporate hub (apex domain). */
  subdomain: Subdomain;
  brandName: string;
  tagline: string;
  description: string;
  legalEntityName: string;
  contactEmail: string;
  phone: string;
  socialHandles: Record<string, string>;
}

/** The site-level config. Per-repo spawns override the identity fields only. */
export const siteConfig: SiteConfig = {
  baseDomain: process.env.NEXT_PUBLIC_BASE_DOMAIN ?? 'otro.bd',
  subdomain: (process.env.NEXT_PUBLIC_SITE_SUBDOMAIN as Subdomain) ?? 'shop',
  brandName: 'Shop OTRO',
  tagline: 'Delivered Across Bangladesh',
  description:
    'Shop OTRO — Bangladesh-local e-commerce with cash on delivery, bKash, Nagad and SSLCommerz payments, and Pathao/RedX logistics.',
  legalEntityName: 'OTRO INNOVATIONS LLC',
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? 'support@otro.bd',
  phone: '+880-XXXXXXXXX', // USER: replace with verified business number
  socialHandles: {
    facebook: 'otroinnovations',
    linkedin: 'otro-innovations',
    instagram: 'otro.innovations',
    youtube: '@otroinnovations',
  },
};

/**
 * Resolve the full host for this site.
 * 'main' lives on the apex (otro.bd); every pillar lives on `<sub>.<base>`.
 */
export function getHost(cfg: SiteConfig = siteConfig): string {
  return cfg.subdomain === 'main' ? cfg.baseDomain : `${cfg.subdomain}.${cfg.baseDomain}`;
}

/** Build an absolute https URL for a path. Always use this — never a literal host. */
export function absoluteUrl(path = '', cfg: SiteConfig = siteConfig): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  return `https://${getHost(cfg)}${clean === '/' ? '' : clean}`;
}

/** mailto: link derived from config (portable across domain migrations). */
export function mailtoLink(subject = '', cfg: SiteConfig = siteConfig): string {
  return subject
    ? `mailto:${cfg.contactEmail}?subject=${encodeURIComponent(subject)}`
    : `mailto:${cfg.contactEmail}`;
}

/**
 * CORS/webhook allow-list: this site's host + the apex + known preview hosts.
 * Server routes should validate Origin against this list.
 */
export function allowedOrigins(cfg: SiteConfig = siteConfig): string[] {
  return [
    `https://${getHost(cfg)}`,
    `https://www.${getHost(cfg)}`,
    `https://${cfg.baseDomain}`,
    `https://www.${cfg.baseDomain}`,
  ];
}

/** Cookie scoping: parent-domain cookies so future cross-subdomain SSO works. */
export function cookieDomain(cfg: SiteConfig = siteConfig): string {
  return `.${cfg.baseDomain}`;
}
