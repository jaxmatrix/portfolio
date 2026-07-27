/* =========================================================
   Blog content types.

   Frontmatter is authored by hand at the top of each
   `content/blog/*.mdx` file, so it is validated at read time
   rather than trusted — see `parseFrontmatter` in ./blog.ts.
   ========================================================= */

export interface PostFrontmatter {
  /** Post title, used as the h1, the card title and the <title> tag. */
  title: string;
  /** Publish date, ISO `YYYY-MM-DD`. Drives sort order and the dateline. */
  date: string;
  /** One-or-two sentence blurb — used on cards, in RSS and as the meta description. */
  summary: string;
  /** Topic tags. Each becomes a static `/blog/tag/<slug>` page. */
  tags: string[];
  /** Optional cover image, as a path under `public/` (e.g. `/blog/cnc.jpg`). */
  cover?: string;
  /** Alt text for the cover image. Required whenever `cover` is set. */
  coverAlt?: string;
  /** Hidden from production builds, still visible in `nx dev web`. */
  draft: boolean;
  /** Optional ISO date of the last substantive edit. */
  updated?: string;
}

/** Everything needed to render a post card or list row — no MDX body. */
export interface PostMeta extends PostFrontmatter {
  /** URL slug, derived from the filename. */
  slug: string;
  /** Reading time in whole minutes, floored to a minimum of 1. */
  readingMinutes: number;
  /**
   * Machinist waypoint for the post, e.g. `LOG-003`, continuing the homepage's
   * `WP-xx` scheme. Assigned by ascending publish date, so publishing a new
   * post never renumbers an older one.
   */
  coord: string;
  /** Pre-formatted on the server, so no `Date` ever crosses into a component. */
  dateDisplay: string;
  updatedDisplay?: string;
}

/** A post's metadata plus its raw, uncompiled MDX body. */
export interface PostSource {
  meta: PostMeta;
  body: string;
}

/** A heading collected from the MDX body, for the table of contents. */
export interface TocHeading {
  /** Anchor id — must match what rehype-slug generates on the rendered heading. */
  id: string;
  /** Plain-text heading content. */
  text: string;
  /** 2 or 3 — h1 is the post title, h4+ is too deep to list. */
  depth: 2 | 3;
}

/** A tag with the number of published posts carrying it. */
export interface TagCount {
  tag: string;
  count: number;
}
