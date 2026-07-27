import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PostList, PostRow, Section } from '@portfolio/ui';
import { PostSidebar } from '../../../../components/blog/PostSidebar';
import { getAllTags, getPostsByTag, tagToSlug } from '../../../../lib/blog';
import { blog } from '../../../../lib/site';
import styles from '../../blog.module.css';

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllTags().map(({ tag }) => ({ tag: tagToSlug(tag) }));
}

/** Recover the original, human-cased tag label from its slug. */
function labelForSlug(slug: string): string | null {
  return getAllTags().find(({ tag }) => tagToSlug(tag) === slug)?.tag ?? null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tag: string }>;
}): Promise<Metadata> {
  const { tag } = await params;
  const label = labelForSlug(tag);
  if (!label) return {};

  const title = `${label} — ${blog.title}`;
  const description = `Posts filed under ${label}.`;

  return {
    title,
    description,
    alternates: { canonical: `/blog/tag/${tag}` },
    openGraph: { type: 'website', title, description, url: `/blog/tag/${tag}` },
  };
}

export default async function TagPage({ params }: { params: Promise<{ tag: string }> }) {
  const { tag } = await params;
  const label = labelForSlug(tag);
  if (!label) notFound();

  const posts = getPostsByTag(tag);

  return (
    <Section
      id="blog-tag"
      coord={blog.coord}
      title={label}
      note={`${posts.length} ${posts.length === 1 ? 'entry' : 'entries'}`}
    >
      <p className={styles.intro}>
        Posts filed under <em>{label}</em>.{' '}
        <a href="/blog">Show all posts →</a>
      </p>

      <div className={styles.grid}>
        <div>
          <PostList empty={`Nothing filed under ${label} yet.`}>
            {posts.map((post) => (
              <PostRow
                key={post.slug}
                href={`/blog/${post.slug}`}
                title={post.title}
                summary={post.summary}
                coord={post.coord}
                dateDisplay={post.dateDisplay}
                readingLabel={`${post.readingMinutes} min read`}
                tags={post.tags.map((t) => ({
                  label: t,
                  href: `/blog/tag/${tagToSlug(t)}`,
                }))}
                draft={post.draft}
              />
            ))}
          </PostList>
        </div>

        <PostSidebar activeTag={label} />
      </div>
    </Section>
  );
}
