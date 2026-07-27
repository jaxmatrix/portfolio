import type { ReactNode } from 'react';
import { Chip } from '../Chip';
import styles from './PostList.module.css';

export interface PostListProps {
  /** Rendered when there are no rows — e.g. an empty tag page. */
  empty?: ReactNode;
  className?: string;
  children?: ReactNode;
}

/** Vertical list of posts, separated by hairlines. */
export function PostList({ empty, className, children }: PostListProps) {
  const hasChildren = Array.isArray(children) ? children.length > 0 : Boolean(children);

  if (!hasChildren && empty !== undefined) {
    return <p className={styles.empty}>{empty}</p>;
  }

  return (
    <ul className={[styles.list, className].filter(Boolean).join(' ')}>{children}</ul>
  );
}

export interface PostRowProps {
  href: string;
  title: ReactNode;
  summary?: ReactNode;
  /** Machinist coordinate, e.g. `LOG-003`. */
  coord?: ReactNode;
  /** Pre-formatted on the server — never a Date, to avoid hydration drift. */
  dateDisplay: ReactNode;
  readingLabel?: ReactNode;
  /** Tag labels paired with their tag-page hrefs. */
  tags?: { label: string; href: string }[];
  /** Shows a DRAFT marker; only ever true in development. */
  draft?: boolean;
  className?: string;
}

/** One row in a `PostList`, following the publication-row idiom: title line
 *  over a mono meta line, divided by a hairline. */
export function PostRow({
  href,
  title,
  summary,
  coord,
  dateDisplay,
  readingLabel,
  tags,
  draft,
  className,
}: PostRowProps) {
  const meta = [coord, dateDisplay, readingLabel].filter(Boolean);

  return (
    <li className={[styles.row, className].filter(Boolean).join(' ')}>
      <a className={styles.rowLink} href={href}>
        <h3 className={styles.title}>
          {title}
          {draft && <span className={styles.draft}>Draft</span>}
        </h3>
        {summary !== undefined && <p className={styles.summary}>{summary}</p>}
      </a>

      <div className={styles.meta}>
        {meta.map((part, i) => (
          <span key={i} className={styles.metaPart}>
            {part}
          </span>
        ))}
      </div>

      {tags !== undefined && tags.length > 0 && (
        <div className={styles.tags}>
          {tags.map((tag) => (
            <Chip key={tag.href} href={tag.href}>
              {tag.label}
            </Chip>
          ))}
        </div>
      )}
    </li>
  );
}

export default PostList;
