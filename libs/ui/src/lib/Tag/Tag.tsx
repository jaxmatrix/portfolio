import type { ReactNode } from 'react';
import styles from './Tag.module.css';

export interface TagProps {
  /** The category label, e.g. "Precision machine". */
  children: ReactNode;
  /** Optional muted suffix, e.g. "Utopic Tech · 2023–24". */
  year?: ReactNode;
  className?: string;
}

/** Uppercase mono category label with an optional muted year suffix. */
export function Tag({ children, year, className }: TagProps) {
  return (
    <div className={[styles.tag, className].filter(Boolean).join(' ')}>
      {children}
      {year !== undefined && <span className={styles.yr}>{year}</span>}
    </div>
  );
}

export default Tag;
