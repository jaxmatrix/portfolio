import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { compileMDX } from 'next-mdx-remote/rsc';
import { Chip, Prose, Section, TableOfContents } from '@portfolio/ui';
import { PostSidebar } from '../../../components/blog/PostSidebar';
import { mdxComponents } from '../../../components/mdx-components';
import { getAllPosts, getPostBySlug, getRelatedPosts, tagToSlug } from '../../../lib/blog';
import { createMdxOptions } from '../../../lib/mdx-options';
import { author, blog } from '../../../lib/site';
import styles from '../blog.module.css';

/* Only real posts are routable; anything else 404s without hitting the fs. */
export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  const { meta } = post;
  const images = meta.cover ? [{ url: meta.cover, alt: meta.coverAlt ?? meta.title }] : undefined;

  return {
    title: meta.title,
    description: meta.summary,
    alternates: { canonical: `/blog/${meta.slug}` },
    openGraph: {
      type: 'article',
      title: meta.title,
      description: meta.summary,
      url: `/blog/${meta.slug}`,
      publishedTime: meta.date,
      ...(meta.updated ? { modifiedTime: meta.updated } : {}),
      authors: [author.name],
      tags: meta.tags,
      ...(images ? { images } : {}),
    },
    twitter: {
      card: images ? 'summary_large_image' : 'summary',
      title: meta.title,
      description: meta.summary,
      ...(images ? { images } : {}),
    },
  };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const { meta } = post;

  /* `headings` is populated by a remark plugin during the compile, so it must
     only be read after awaiting. */
  const { headings, options } = createMdxOptions();
  const { content } = await compileMDX({
    source: post.body,
    options,
    components: mdxComponents,
  });

  const related = getRelatedPosts(meta.slug);

  const metaParts = [
    meta.coord,
    meta.dateDisplay,
    `${meta.readingMinutes} min read`,
    ...(meta.updatedDisplay ? [`Updated ${meta.updatedDisplay}`] : []),
  ];

  return (
    <Section id="post">
      <div className={styles.grid}>
        <article>
          <header className={styles.postHeader}>
            <p className={styles.postCoord}>{blog.title.toUpperCase()}</p>
            <h1 className={styles.postTitle}>
              {meta.title}
              {meta.draft && <span className={styles.draft}>Draft</span>}
            </h1>
            <p className={styles.postSummary}>{meta.summary}</p>

            <div className={styles.postMeta}>
              {metaParts.map((part) => (
                <span key={part}>{part}</span>
              ))}
            </div>

            {meta.tags.length > 0 && (
              <div className={styles.postTags}>
                {meta.tags.map((tag) => (
                  <Chip key={tag} href={`/blog/tag/${tagToSlug(tag)}`}>
                    {tag}
                  </Chip>
                ))}
              </div>
            )}
          </header>

          {meta.cover && (
            <img className={styles.cover} src={meta.cover} alt={meta.coverAlt ?? ''} />
          )}

          {/* Shown only below 1040px, where the sticky sidebar copy is hidden. */}
          <TableOfContents items={headings} variant="inline" className={styles.inlineToc} />

          <Prose>{content}</Prose>

          <footer className={styles.postFooter}>
            <a className={styles.backLink} href="/blog">
              ← All posts
            </a>
            <a className={styles.backLink} href={`mailto:${author.email}`}>
              Reply by email ↗
            </a>
          </footer>
        </article>

        <PostSidebar
          postsHeading={related.length > 0 ? 'Related' : 'Recent'}
          posts={related.length > 0 ? related : undefined}
          toc={
            <TableOfContents items={headings} className={styles.stickyToc} />
          }
        />
      </div>
    </Section>
  );
}
