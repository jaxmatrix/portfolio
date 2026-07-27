import { AuthorCard, NewsletterCard, TagFilter } from '@portfolio/ui';
import { getAllPosts, getAllTags, tagToSlug } from '../../lib/blog';
import type { PostMeta } from '../../lib/blog-types';
import { author, blog, newsletterAction } from '../../lib/site';
import styles from '../../app/blog/blog.module.css';

export interface PostSidebarProps {
  /** Label of the active tag, when rendering a tag page. */
  activeTag?: string;
  /** Heading for the post list — "Recent" on the index, "Related" on a post. */
  postsHeading?: string;
  /** Posts to list. Defaults to the five most recent. */
  posts?: PostMeta[];
  /** Slot for the sticky table of contents on a post page. */
  toc?: React.ReactNode;
}

/** The blog sidebar: contents, topics, a short post list, and who wrote it. */
export function PostSidebar({
  activeTag,
  postsHeading = 'Recent',
  posts,
  toc,
}: PostSidebarProps) {
  const allPosts = getAllPosts();
  const listed = posts ?? allPosts.slice(0, 5);

  const tags = getAllTags().map(({ tag, count }) => ({
    label: tag,
    href: `/blog/tag/${tagToSlug(tag)}`,
    count,
  }));

  return (
    <aside className={styles.side}>
      {toc}

      <TagFilter
        tags={tags}
        activeTag={activeTag}
        allHref="/blog"
        allCount={allPosts.length}
      />

      {listed.length > 0 && (
        <div className={styles.sideCard}>
          <h2 className={styles.sideHeading}>{postsHeading}</h2>
          <ul className={styles.related}>
            {listed.map((post) => (
              <li key={post.slug} className={styles.relatedItem}>
                <a className={styles.relatedLink} href={`/blog/${post.slug}`}>
                  {post.title}
                  <span className={styles.relatedMeta}>
                    {post.coord} · {post.dateDisplay}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <AuthorCard
        name={author.name}
        role={author.role}
        blurb={author.blurb}
        avatar={author.avatar}
        links={[
          { label: 'GitHub', href: 'https://github.com/jaishukla', external: true },
          {
            label: 'LinkedIn',
            href: 'https://www.linkedin.com/in/jai-shukla',
            external: true,
          },
        ]}
      />

      <NewsletterCard
        action={newsletterAction}
        blurb="No mailing list yet — point a reader at the feed, or email me and I'll ping you when something lands."
        fallbackLinks={[
          { label: 'RSS feed', href: blog.feedPath },
          { label: 'Email me', href: `mailto:${author.email}`, external: true },
        ]}
      />
    </aside>
  );
}

export default PostSidebar;
