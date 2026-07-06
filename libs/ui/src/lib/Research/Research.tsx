import { Fragment, type ReactNode } from 'react';
import styles from './Research.module.css';

export interface PublicationItemProps {
  title: ReactNode;
  /** Highlight the title in plasma (the featured publication). */
  featured?: boolean;
  /** Venue + year, e.g. "Analytical Methods 15(29), 2023". */
  journal: ReactNode;
  /** Citation count, rendered amber, e.g. "cited by 11". */
  citedBy?: ReactNode;
  /** Trailing note, e.g. "device + image-processing server". */
  note?: ReactNode;
}

/** A single publication row: title over a mono venue/citation line. */
export function PublicationItem({
  title,
  featured,
  journal,
  citedBy,
  note,
}: PublicationItemProps) {
  const parts: ReactNode[] = [journal];
  if (citedBy) parts.push(<span className={styles.cite}>{citedBy}</span>);
  if (note) parts.push(note);

  return (
    <div className={styles.pub}>
      <div className={styles.pubT}>
        {featured ? <span className={styles.feat}>{title}</span> : title}
      </div>
      <div className={styles.pubM}>
        {parts.map((part, i) => (
          <Fragment key={i}>
            {i > 0 && ' · '}
            {part}
          </Fragment>
        ))}
      </div>
    </div>
  );
}

export interface AwardItemProps {
  title: ReactNode;
  meta: ReactNode;
}

/** A single award row: bold display title over a mono meta line. */
export function AwardItem({ title, meta }: AwardItemProps) {
  return (
    <div className={styles.award}>
      <b>{title}</b>
      <span className={styles.awM}>{meta}</span>
    </div>
  );
}
