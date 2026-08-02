import type { ReactNode } from 'react';
import { Chip } from '../Chip';
import { Tag } from '../Tag';
import styles from './PostCard.module.css';

export interface PostCardProps {
  href: string;
  title: ReactNode;
  summary: ReactNode;
  /** Machinist coordinate, e.g. `LOG-003`. */
  coord?: ReactNode;
  /** Pre-formatted on the server — never a Date, to avoid hydration drift. */
  dateDisplay: ReactNode;
  readingLabel?: ReactNode;
  /** Tag labels paired with their tag-page hrefs. */
  tags?: { label: string; href: string }[];
  cover?: { src: string; alt: string };
  /** Shows a DRAFT marker; only ever true in development. */
  draft?: boolean;
  className?: string;
}

/** Prominent card for the most recent post. The media band renders only when
 *  the post has a cover image. */
export function PostCard({
  href,
  title,
  summary,
  coord,
  dateDisplay,
  readingLabel,
  tags,
  cover,
  draft,
  className,
}: PostCardProps) {
  const meta = [dateDisplay, readingLabel].filter(Boolean);

  return (
    <article className={[styles.card, className].filter(Boolean).join(' ')}>
      {cover && (
        <a className={styles.media} href={href} aria-hidden="true" tabIndex={-1}>
          <img className={styles.cover} src={cover.src} alt={cover.alt} />
          <span className={styles.tl} />
          <span className={styles.br} />
        </a>
      )}

      <div className={styles.body}>
        <div className={styles.head}>
          <Tag year={dateDisplay}>{coord ?? 'Latest'}</Tag>
          {draft && <span className={styles.draft}>Draft</span>}
        </div>

        <h2 className={styles.title}>
          <a href={href}>{title}</a>
        </h2>

        <p className={styles.summary}>{summary}</p>

        {meta.length > 0 && (
          <div className={styles.meta}>
            {meta.map((part, i) => (
              <span key={i} className={styles.metaPart}>
                {part}
              </span>
            ))}
          </div>
        )}

        {tags !== undefined && tags.length > 0 && (
          <div className={styles.tags}>
            {tags.map((tag) => (
              <Chip key={tag.href} href={tag.href}>
                {tag.label}
              </Chip>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}

export default PostCard;
