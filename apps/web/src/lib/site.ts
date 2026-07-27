/* Site-level identity, shared by metadata, RSS and the blog sidebar. */

/**
 * Absolute site origin, needed for `metadataBase`, RSS and the sitemap.
 * Vercel exposes the deployment host, which keeps preview builds self-consistent.
 */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : 'http://localhost:3000')
).replace(/\/$/, '');

export const siteName = 'Jai Shukla';

export const author = {
  name: 'Jai Shukla',
  role: 'Founding Engineer @ SlidelyAI',
  email: 'jaishukla7768@gmail.com',
  blurb:
    'I build the whole stack — precision machines, embedded firmware, full-stack software and AI systems. These are notes from the bench.',
  /* Derived from public/isolated_self.png + self_mask.png, cropped square and
     scaled to 240px. Regenerate or replace once the cutout is finalised. */
  avatar: { src: '/blog/author.jpg', alt: 'Jai Shukla' },
};

export const blog = {
  title: 'Blog',
  description:
    'Notes on hardware, firmware, full-stack software and AI systems — written from the bench.',
  /** Waypoint continuing the homepage's WP-01…WP-07 scheme. */
  coord: 'WP-08',
  feedPath: '/blog/rss.xml',
};

/**
 * Mailing-list endpoint. Undefined today, which makes `NewsletterCard` render
 * honest links instead of a form that would discard the address.
 */
export const newsletterAction = process.env.NEXT_PUBLIC_NEWSLETTER_ENDPOINT;
