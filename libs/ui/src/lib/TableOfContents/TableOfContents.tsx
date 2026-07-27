'use client';

import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import styles from './TableOfContents.module.css';

export interface TocItem {
  /** Anchor id — must match the id rehype-slug put on the rendered heading. */
  id: string;
  text: string;
  depth: 2 | 3;
}

export interface TableOfContentsProps {
  items: TocItem[];
  title?: ReactNode;
  /**
   * `sticky` is the sidebar card; `inline` is a collapsed `<details>` shown
   * instead at narrow widths, where a sidebar TOC would land below the article
   * and be useless. Both are rendered and CSS picks one — `<details>` cannot be
   * conditionally created from CSS alone.
   */
  variant?: 'sticky' | 'inline';
  /** Distance from the viewport top counted as "current", clearing the nav. */
  offset?: number;
  className?: string;
}

/** Table of contents with scroll-spy. Highlights the heading currently at the
 *  top of the viewport, following the same passive-listener and
 *  reduced-capability guards used by ProgressRail and Reveal. */
export function TableOfContents({
  items,
  title = 'On this page',
  variant = 'sticky',
  offset = 92,
  className,
}: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string | null>(items[0]?.id ?? null);

  useEffect(() => {
    if (items.length === 0) return;

    const headings = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);

    if (headings.length === 0) return;

    /* Pick the last heading whose top has passed the offset line. Reading the
       positions directly (rather than trusting IntersectionObserver's entry
       set) keeps behaviour correct when scrolling up, and when several short
       sections are on screen at once. */
    const update = () => {
      let current = headings[0];

      for (const heading of headings) {
        if (heading.getBoundingClientRect().top <= offset + 4) current = heading;
        else break;
      }

      /* At the very bottom the last section may be too short to reach the
         offset line — treat it as current so the final entry is reachable. */
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;

      setActiveId(atBottom ? headings[headings.length - 1].id : current.id);
    };

    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();

    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [items, offset]);

  /* A post with no h2/h3 should not leave an empty bordered box. */
  if (items.length === 0) return null;

  const list = (
    <ul className={styles.list}>
      {items.map((item) => {
        const isActive = item.id === activeId;
        return (
          <li key={item.id}>
            <a
              className={[
                styles.link,
                item.depth === 3 && styles.nested,
                isActive && styles.active,
              ]
                .filter(Boolean)
                .join(' ')}
              href={`#${item.id}`}
              {...(isActive ? { 'aria-current': 'location' as const } : {})}
            >
              {item.text}
            </a>
          </li>
        );
      })}
    </ul>
  );

  if (variant === 'inline') {
    return (
      <details className={[styles.inline, className].filter(Boolean).join(' ')}>
        <summary className={styles.summary}>{title}</summary>
        <nav aria-label="Table of contents">{list}</nav>
      </details>
    );
  }

  return (
    <nav
      className={[styles.wrap, className].filter(Boolean).join(' ')}
      aria-label="Table of contents"
    >
      <h2 className={styles.heading}>{title}</h2>
      {list}
    </nav>
  );
}

export default TableOfContents;
