import { Callout, Chip, Figure, StatusPill } from '@portfolio/ui';

/**
 * Components made available to every `.mdx` post without an import.
 *
 * Element styling is handled by `<Prose>` in CSS rather than by mapping
 * `h2`/`p`/`pre` to React components here — that keeps the compiled output as
 * plain HTML and means `rehype-slug`'s ids and `rehype-pretty-code`'s markup
 * survive untouched.
 */
export const mdxComponents = {
  Callout,
  Figure,
  Chip,
  StatusPill,
};

export default mdxComponents;
