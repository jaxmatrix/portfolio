import { getAllPosts } from '../../../lib/blog';
import { author, blog, siteName, siteUrl } from '../../../lib/site';

/* Read at build time and served as a static file. */
export const dynamic = 'force-static';

/**
 * Escape text for XML. Post titles here carry `·`, `—` and `→`, which UTF-8
 * handles, but a bare `&` or `<` would produce a document most readers reject
 * outright.
 */
function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function toRfc822(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toUTCString();
}

export function GET() {
  const posts = getAllPosts();
  const feedUrl = `${siteUrl}${blog.feedPath}`;

  /* Summaries only — rendering each post to HTML a second time, through a
     separate pipeline, is more surface than a personal feed warrants. Each
     item links back to the full article. */
  const items = posts
    .map((post) => {
      const url = `${siteUrl}/blog/${post.slug}`;
      const categories = post.tags
        .map((tag) => `      <category>${escapeXml(tag)}</category>`)
        .join('\n');

      return [
        '    <item>',
        `      <title>${escapeXml(post.title)}</title>`,
        `      <link>${escapeXml(url)}</link>`,
        `      <guid isPermaLink="true">${escapeXml(url)}</guid>`,
        `      <pubDate>${toRfc822(post.date)}</pubDate>`,
        `      <description>${escapeXml(post.summary)}</description>`,
        categories,
        '    </item>',
      ]
        .filter(Boolean)
        .join('\n');
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(`${blog.title} — ${siteName}`)}</title>
    <link>${escapeXml(`${siteUrl}/blog`)}</link>
    <description>${escapeXml(blog.description)}</description>
    <language>en</language>
    <managingEditor>${escapeXml(`${author.email} (${author.name})`)}</managingEditor>
    <atom:link href="${escapeXml(feedUrl)}" rel="self" type="application/rss+xml" />
${posts[0] ? `    <lastBuildDate>${toRfc822(posts[0].date)}</lastBuildDate>` : ''}
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
}
