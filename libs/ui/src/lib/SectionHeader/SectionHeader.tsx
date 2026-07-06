import type { ReactNode } from 'react';
import styles from './SectionHeader.module.css';

export interface SectionHeaderProps {
  /** Workpoint coordinate, e.g. "WP-02". */
  coord: string;
  /** Section title, e.g. "Featured builds". */
  title: ReactNode;
  /** Optional right-aligned note (text or a link). */
  note?: ReactNode;
  className?: string;
}

/** The `WP-xx · Title · note` header that opens each page section. */
export function SectionHeader({ coord, title, note, className }: SectionHeaderProps) {
  return (
    <div className={[styles.head, className].filter(Boolean).join(' ')}>
      <span className={styles.coord}>{coord}</span>
      <span className={styles.title}>{title}</span>
      {note !== undefined && <span className={styles.note}>{note}</span>}
    </div>
  );
}

export default SectionHeader;
