import fs from 'node:fs';
import path from 'node:path';
import { cache } from 'react';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import type { PostFrontmatter, PostMeta, PostSource, TagCount } from './blog-types';

/* Posts live outside `src/` because they are data read at build time, not
   modules compiled into the bundle. Every route that reads them is statically
   generated, so these reads never happen at runtime. */
const BLOG_DIR = path.join(process.cwd(), 'content/blog');

const MDX_EXT = '.mdx';

/** Turn a tag into its URL segment: "Embedded Firmware" -> "embedded-firmware". */
export function tagToSlug(tag: string): string {
  return tag
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function fail(file: string, message: string): never {
  throw new Error(`Invalid frontmatter in content/blog/${file}: ${message}`);
}

/**
 * Normalise a frontmatter date to `YYYY-MM-DD`.
 *
 * YAML parses an unquoted `2026-07-18` into a JS `Date`, but a quoted
 * `"2026-07-18"` stays a string — so both forms reach us and both must work.
 * Authors should not have to remember which one YAML prefers.
 *
 * The Date branch reads UTC parts deliberately: js-yaml builds the value at UTC
 * midnight, so using local getters would shift the date back a day anywhere west
 * of Greenwich.
 */
function toIsoDate(value: unknown): string | null {
  if (value instanceof Date) {
    if (Number.isNaN(value.getTime())) return null;
    return value.toISOString().slice(0, 10);
  }
  return typeof value === 'string' ? value : null;
}

/**
 * Validate hand-authored frontmatter, failing the build with a message that
 * names the file and the offending field. Cheaper than a schema library for
 * seven fields, and the errors are friendlier.
 */
function parseFrontmatter(data: Record<string, unknown>, file: string): PostFrontmatter {
  const { title, summary, tags, cover, coverAlt, draft } = data;

  const date = toIsoDate(data.date);
  const updated = data.updated === undefined ? undefined : toIsoDate(data.updated);

  if (typeof title !== 'string' || title.trim() === '') {
    fail(file, '`title` is required and must be a non-empty string.');
  }
  if (date === null || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    fail(file, '`date` is required and must be an ISO date, e.g. 2026-07-20.');
  }
  if (Number.isNaN(Date.parse(`${date}T00:00:00Z`))) {
    fail(file, `\`date\` "${date}" is not a real calendar date.`);
  }
  if (data.updated !== undefined && (!updated || !/^\d{4}-\d{2}-\d{2}$/.test(updated))) {
    fail(file, '`updated` must be an ISO date, e.g. 2026-07-20.');
  }
  if (typeof summary !== 'string' || summary.trim() === '') {
    fail(file, '`summary` is required and must be a non-empty string.');
  }
  if (tags !== undefined && !Array.isArray(tags)) {
    fail(file, '`tags` must be a list, e.g. [firmware, hardware].');
  }
  if (cover !== undefined && typeof cover !== 'string') {
    fail(file, '`cover` must be a path under public/, e.g. /blog/cnc.jpg.');
  }
  if (cover !== undefined && (typeof coverAlt !== 'string' || coverAlt.trim() === '')) {
    fail(file, '`coverAlt` is required whenever `cover` is set.');
  }
  return {
    title,
    date,
    summary,
    tags: (tags ?? []).map((t) => String(t)),
    ...(typeof cover === 'string' ? { cover, coverAlt: coverAlt as string } : {}),
    draft: draft === true,
    ...(updated ? { updated } : {}),
  };
}

/* Drafts stay visible while writing, and disappear from production builds. */
const includeDrafts = process.env.NODE_ENV !== 'production';

/**
 * Format `YYYY-MM-DD` as `18 Jul 2026`, always in UTC.
 *
 * Done on the server so components only ever receive strings — a `Date`
 * formatted during render would produce different output on the server and in
 * the browser and trip a hydration mismatch.
 */
export function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

function readPost(file: string): Omit<PostSource, 'meta'> & {
  meta: Omit<PostMeta, 'coord'>;
} {
  const raw = fs.readFileSync(path.join(BLOG_DIR, file), 'utf8');
  const { data, content } = matter(raw);
  const frontmatter = parseFrontmatter(data, file);

  return {
    meta: {
      ...frontmatter,
      slug: file.slice(0, -MDX_EXT.length),
      readingMinutes: Math.max(1, Math.round(readingTime(content).minutes)),
      dateDisplay: formatDate(frontmatter.date),
      ...(frontmatter.updated ? { updatedDisplay: formatDate(frontmatter.updated) } : {}),
    },
    body: content,
  };
}

function loadAllPosts(): PostMeta[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  const posts = fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(MDX_EXT))
    .map((file) => readPost(file).meta)
    .filter((meta) => includeDrafts || !meta.draft)
    /* ISO `YYYY-MM-DD` sorts correctly as a plain string, which also sidesteps
       the timezone drift you get from `new Date('2026-07-18')`. Ties break on
       slug so the order is deterministic across builds. */
    .sort((a, b) => (a.date === b.date ? a.slug.localeCompare(b.slug) : a.date < b.date ? 1 : -1));

  /* Number from the oldest post up, so the newest post always takes the next
     free coordinate and existing posts keep theirs. */
  const total = posts.length;
  return posts.map((meta, i) => ({
    ...meta,
    coord: `LOG-${String(total - i).padStart(3, '0')}`,
  }));
}

let memo: PostMeta[] | null = null;

/**
 * Every published post, newest first — metadata only, never the MDX body, so
 * rendering the index does not compile every document.
 *
 * Two layers of memoisation, and the module-level one is the load-bearing half:
 * `next build` renders `generateStaticParams`, then `generateMetadata` and the
 * page component once per post, then the tag pages, the feed and the sitemap —
 * all in one process but across separate render passes. React's `cache()` is
 * scoped to a single pass, so on its own it would re-read the directory dozens
 * of times. `cache()` is still kept for dev's double-invocation.
 *
 * The module cache is production-only: in dev the module instance outlives
 * edits to the `.mdx` files, so caching there would serve stale frontmatter.
 */
export const getAllPosts = cache((): PostMeta[] => {
  if (process.env.NODE_ENV !== 'production') return loadAllPosts();
  return (memo ??= loadAllPosts());
});

/**
 * One post with its raw MDX body, or null when the slug does not exist.
 *
 * Metadata comes from `getAllPosts()` rather than re-reading the file, because
 * the `coord` is only knowable from the post's position in the full set.
 */
export const getPostBySlug = cache((slug: string): PostSource | null => {
  const meta = getAllPosts().find((post) => post.slug === slug);
  if (!meta) return null;

  const full = path.join(BLOG_DIR, `${slug}${MDX_EXT}`);

  /* Guard against `..` and nested paths sneaking in through the route param. */
  if (path.dirname(full) !== BLOG_DIR || !fs.existsSync(full)) return null;

  return { meta, body: matter(fs.readFileSync(full, 'utf8')).content };
});

/** Every tag in use, most-used first, ties broken alphabetically. */
export const getAllTags = cache((): TagCount[] => {
  const counts = new Map<string, number>();

  for (const post of getAllPosts()) {
    for (const tag of post.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }

  return [...counts.entries()]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
});

/** Posts carrying `tagSlug`, newest first. Matching is on the slugified tag. */
export const getPostsByTag = cache((tagSlug: string): PostMeta[] =>
  getAllPosts().filter((post) => post.tags.some((tag) => tagToSlug(tag) === tagSlug)),
);

/**
 * Posts related to `slug`: most shared tags first, then most recent. Falls back
 * to filling with the latest posts so the sidebar is never half-empty.
 */
export const getRelatedPosts = cache((slug: string, limit = 3): PostMeta[] => {
  const all = getAllPosts();
  const current = all.find((post) => post.slug === slug);
  if (!current) return [];

  const others = all.filter((post) => post.slug !== slug);
  const currentTags = new Set(current.tags);

  const scored = others
    .map((post) => ({
      post,
      shared: post.tags.filter((tag) => currentTags.has(tag)).length,
    }))
    .filter((entry) => entry.shared > 0)
    .sort((a, b) => b.shared - a.shared || (a.post.date < b.post.date ? 1 : -1))
    .map((entry) => entry.post);

  if (scored.length >= limit) return scored.slice(0, limit);

  const chosen = new Set(scored.map((post) => post.slug));
  const filler = others.filter((post) => !chosen.has(post.slug));

  return [...scored, ...filler].slice(0, limit);
});
