import styles from './TagFilter.module.css';

export interface TagFilterItem {
  label: string;
  href: string;
  count: number;
}

export interface TagFilterProps {
  tags: TagFilterItem[];
  /** Label of the currently active tag, if any. */
  activeTag?: string;
  /** Href of the unfiltered index. */
  allHref: string;
  allLabel?: string;
  /** Total post count, shown against the "all" row. */
  allCount?: number;
  className?: string;
}

/** Sidebar topic filter. Each tag links to its own static page, so the
 *  filtered view is shareable and indexable. */
export function TagFilter({
  tags,
  activeTag,
  allHref,
  allLabel = 'All posts',
  allCount,
  className,
}: TagFilterProps) {
  /* With no tags there is nothing to filter — render nothing rather than an
     empty bordered box. */
  if (tags.length === 0) return null;

  return (
    <nav
      className={[styles.wrap, className].filter(Boolean).join(' ')}
      aria-label="Filter posts by topic"
    >
      <h2 className={styles.heading}>Topics</h2>

      <ul className={styles.list}>
        <li>
          <a
            className={[styles.item, activeTag === undefined && styles.active]
              .filter(Boolean)
              .join(' ')}
            href={allHref}
            {...(activeTag === undefined ? { 'aria-current': 'page' as const } : {})}
          >
            <span className={styles.label}>{allLabel}</span>
            {allCount !== undefined && <span className={styles.count}>{allCount}</span>}
          </a>
        </li>

        {tags.map((tag) => {
          const isActive = tag.label === activeTag;
          return (
            <li key={tag.href}>
              <a
                className={[styles.item, isActive && styles.active].filter(Boolean).join(' ')}
                href={tag.href}
                {...(isActive ? { 'aria-current': 'page' as const } : {})}
              >
                <span className={styles.label}>{tag.label}</span>
                <span className={styles.count}>{tag.count}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default TagFilter;
