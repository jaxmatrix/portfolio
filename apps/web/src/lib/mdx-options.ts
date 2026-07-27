import GithubSlugger from 'github-slugger';
import { toString as mdastToString } from 'mdast-util-to-string';
import { visit } from 'unist-util-visit';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrettyCode, { type Options as PrettyCodeOptions } from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import type { PluggableList } from 'unified';
import type { TocHeading } from './blog-types';
import paperLightJson from './paper-light.json';

/* A JSON import widens `"type": "light"` to `string`, so the literal shape has
   to be re-asserted.
   The theme MUST keep its `tokenColors` key: rehype-pretty-code detects a
   single JSON theme with `Object.hasOwn(theme, 'tokenColors')`, and without it
   it silently treats the object as a *map of themes* and fails to register. */
const paperLight = paperLightJson as unknown as PrettyCodeOptions['theme'];

const prettyCodeOptions: PrettyCodeOptions = {
  /* Recoloured onto the paper/ink palette by `paper-light.json`. Highlighting
     happens at build time only — no shiki reaches the client.
     shiki loads grammars lazily per language actually used in a post, so there
     is no language list to restrict here. */
  theme: paperLight,
  keepBackground: false,
  /* Block only. Left as a bare string this would also highlight *inline* code,
     which just fights the inline chrome in Prose.module.css. */
  defaultLang: { block: 'text', inline: '' },
};

/**
 * A remark plugin that records every h2/h3 into `sink`, in document order,
 * assigning the same slugs rehype-slug will later put on the rendered headings.
 *
 * Collecting from mdast rather than regexing the raw MDX matters: `## not a
 * heading` inside a fenced code block is a `code` node here, so it is correctly
 * ignored.
 *
 * The sink is a closure array rather than `file.data` because `compileMDX`
 * returns only `{ content, frontmatter }` and gives no access to the vfile.
 */
export function remarkCollectHeadings(sink: TocHeading[]) {
  return () => (tree: unknown) => {
    /* One slugger per document so duplicate headings get -1/-2 suffixes
       exactly the way rehype-slug's own per-file slugger does. */
    const slugger = new GithubSlugger();

    visit(tree as never, 'heading', (node: { depth: number; children: unknown[] }) => {
      const text = mdastToString(node as never);
      /* h1 is the post title (rendered from frontmatter), h4+ is too deep to list. */
      if (node.depth !== 2 && node.depth !== 3) {
        /* Still consume a slug so numbering stays aligned with rehype-slug,
           which slugs every heading level, not just the ones we list. */
        slugger.slug(text);
        return;
      }
      sink.push({ id: slugger.slug(text), text, depth: node.depth });
    });
  };
}

/**
 * Build the MDX compiler options for one post.
 *
 * Returns the options plus the `headings` array they populate — read it only
 * *after* awaiting `compileMDX`, since it is filled during the compile.
 */
export function createMdxOptions() {
  const headings: TocHeading[] = [];

  /* Annotated as PluggableList so the `[plugin, options]` entries stay tuples —
     without it TS widens them to arrays and they stop matching `Pluggable`. */
  const remarkPlugins: PluggableList = [remarkGfm, remarkCollectHeadings(headings)];

  const rehypePlugins: PluggableList = [
    rehypeSlug,
    [rehypePrettyCode, prettyCodeOptions],
    [
      rehypeAutolinkHeadings,
      {
        behavior: 'append',
        properties: { className: ['heading-anchor'], ariaHidden: true, tabIndex: -1 },
        content: {
          type: 'element',
          tagName: 'span',
          properties: {},
          children: [{ type: 'text', value: '#' }],
        },
      },
    ],
  ];

  return {
    headings,
    options: {
      parseFrontmatter: false,
      /* Posts are first-party content committed to this repo, not user
         submissions. v6 strips `{expressions}` by default; that would break
         ordinary MDX authoring, so it is turned off deliberately. */
      blockJS: false,
      mdxOptions: { remarkPlugins, rehypePlugins },
    },
  };
}
