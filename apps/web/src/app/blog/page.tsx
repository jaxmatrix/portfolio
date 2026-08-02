import type { Metadata } from 'next';
import { Button, PostList, PostRow, Section } from '@portfolio/ui';
import { PostSidebar } from '../../components/blog/PostSidebar';
import { getAllPosts, tagToSlug } from '../../lib/blog';
import { author, blog } from '../../lib/site';
import styles from './blog.module.css';

export const metadata: Metadata = {
  title: blog.title,
  description: blog.description,
  alternates: {
    canonical: '/blog',
    types: { 'application/rss+xml': blog.feedPath },
  },
  openGraph: {
    type: 'website',
    title: blog.title,
    description: blog.description,
    url: '/blog',
  },
};

export default function BlogIndexPage() {
  const posts = getAllPosts();
  // const [featured, ...rest] = posts;

  const tagLinks = (tags: string[]) =>
    tags.map((tag) => ({ label: tag, href: `/blog/tag/${tagToSlug(tag)}` }));

  return (
    <Section
      id="blog"
      coord={blog.coord}
      title={blog.title}
      note={
        posts.length > 0
          ? `${posts.length} ${posts.length === 1 ? 'entry' : 'entries'}`
          : undefined
      }
    >
      <p className={styles.intro}>{blog.description}</p>

      {posts.length === 0 ? (
        <div className={styles.empty}>
          <p className={styles.emptyCoord}>Awaiting first entry</p>
          <h2 className={styles.emptyTitle}>Blog coming soon</h2>
          <p className={styles.emptyBody}>
            Nothing published yet. I&rsquo;m writing up work on firmware, motion
            control and AI systems — the first entries land here shortly.
          </p>
          <div className={styles.emptyActions}>
            <Button variant="primary" href={`mailto:${author.email}`}>
              Email me ↗
            </Button>
            <Button href="/#builds">See the builds ↓</Button>
          </div>
        </div>
      ) : (
        <div className={styles.grid}>
          <div>
            {/* {featured && ( */}
            {/*   <div className={styles.featured}> */}
            {/*     <PostCard */}
            {/*       href={`/blog/${featured.slug}`} */}
            {/*       title={featured.title} */}
            {/*       summary={featured.summary} */}
            {/*       coord={featured.coord} */}
            {/*       dateDisplay={featured.dateDisplay} */}
            {/*       readingLabel={`${featured.readingMinutes} min read`} */}
            {/*       tags={tagLinks(featured.tags)} */}
            {/*       draft={featured.draft} */}
            {/*     /> */}
            {/*   </div> */}
            {/* )} */}

            <PostList>
              {posts.map((post) => (
                <PostRow
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  title={post.title}
                  summary={post.summary}
                  coord={post.coord}
                  dateDisplay={post.dateDisplay}
                  readingLabel={`${post.readingMinutes} min read`}
                  tags={tagLinks(post.tags)}
                  draft={post.draft}
                />
              ))}
            </PostList>
          </div>

          <PostSidebar />
        </div>
      )}
    </Section>
  );
}
