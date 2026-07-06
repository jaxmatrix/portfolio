import type { ReactNode } from 'react';
import { SectionHeader } from '../SectionHeader';
import styles from './Section.module.css';

export interface SectionProps {
  /** Anchor id, e.g. "builds". */
  id?: string;
  /** When set, a SectionHeader is rendered at the top of the section. */
  coord?: string;
  title?: ReactNode;
  note?: ReactNode;
  className?: string;
  children: ReactNode;
}

/** Page section shell: `<section>` padding + centered `.wrap`, with an
 *  optional SectionHeader (the `WP-xx · Title · note` row). */
export function Section({ id, coord, title, note, className, children }: SectionProps) {
  return (
    <section id={id} className={[styles.section, className].filter(Boolean).join(' ')}>
      <div className={styles.wrap}>
        {coord !== undefined && title !== undefined && (
          <SectionHeader coord={coord} title={title} note={note} />
        )}
        {children}
      </div>
    </section>
  );
}

export default Section;
