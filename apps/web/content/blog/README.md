# Writing a post

Drop an `.mdx` file in this directory. That is the whole publishing step — the
index, tag pages, RSS feed and sitemap all pick it up automatically, and no
other file needs editing.

The filename becomes the URL: `closing-the-loop.mdx` → `/blog/closing-the-loop`.
Use lowercase words separated by hyphens.

## Frontmatter

```yaml
---
title: Closing the loop on a cheap spindle     # required
date: 2026-07-18                                # required, YYYY-MM-DD
summary: >-                                     # required — cards, RSS, meta description
  A £40 spindle has no encoder and no shame. Here is how I gave one a
  closed control loop without replacing it.
tags: [Firmware, Control]                       # optional; each becomes a /blog/tag/... page
cover: /blog/my-post/cover.jpg                  # optional, path under public/
coverAlt: The spindle mount seen from the Z gantry   # required whenever cover is set
updated: 2026-07-26                             # optional
draft: false                                    # optional; drafts are dev-only
---
```

Frontmatter is validated when the post is read. A missing or malformed field
fails the build with a message naming the file and the field, rather than
silently rendering an empty page.

`draft: true` keeps a post visible in `pnpm dev` while hiding it from production
builds, RSS and the sitemap.

## Body

Standard Markdown, plus GitHub extensions (tables, strikethrough, task lists).

Headings: the `title` is rendered as the `h1`, so start at `##`. Every `##` and
`###` is collected into the table of contents automatically.

Code fences get syntax highlighting at build time — no JavaScript is shipped to
the reader. Two extras are available:

````
```ts showLineNumbers
```ts {3-5}      // highlight specific lines
````

These components are available in any post **without an import**:

- `<Callout tone="note|warn|spec" title="…">` — an aside
- `<Figure src alt caption index>` — a captioned image
- `<Chip>` and `<StatusPill>`

Images go in `apps/web/public/blog/<slug>/` and are referenced as
`/blog/<slug>/name.jpg`.

## One thing to avoid

Tailwind utility classes do not work inside `.mdx` — Tailwind does not scan this
directory, so `className="text-plasma"` will silently do nothing. Styling comes
from the `Prose` wrapper and the components above.
