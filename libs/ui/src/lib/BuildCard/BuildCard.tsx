import type { ReactNode } from 'react';
import { Tag } from '../Tag';
import { Chip } from '../Chip';
import styles from './BuildCard.module.css';

export interface BuildCardProps {
  /** Category label, e.g. "Precision machine". */
  tag: ReactNode;
  /** Muted suffix on the tag, e.g. "Utopic Tech · 2023–24". */
  year?: ReactNode;
  title: ReactNode;
  /** Text after the "Role: " prefix. */
  role: ReactNode;
  /** Body paragraphs; wrap emphasis in `<span className="hard">…<b/></span>`. */
  paragraphs: ReactNode[];
  chips: string[];
  /** Custom media (a `<video>` / `<iframe>`); falls back to the play-button slot. */
  media?: ReactNode;
  mediaLabel?: ReactNode;
  mediaHint?: ReactNode;
  /** Place the media on the right (the original `:nth-child(even)` layout). */
  reverse?: boolean;
  className?: string;
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

/** The signature two-up build card: media/video slot beside a titled body. */
export function BuildCard({
  tag,
  year,
  title,
  role,
  paragraphs,
  chips,
  media,
  mediaLabel,
  mediaHint,
  reverse = false,
  className,
}: BuildCardProps) {
  const cls = [styles.card, reverse && styles.reverse, className]
    .filter(Boolean)
    .join(' ');

  return (
    <article className={cls}>
      <div className={styles.media}>
        <span className={`${styles.corner} ${styles.tl}`} />
        <span className={`${styles.corner} ${styles.br}`} />
        {media ?? (
          <div className={styles.vslot}>
            <div className={styles.play}>
              <PlayIcon />
            </div>
            {mediaLabel !== undefined && (
              <div className={styles.vlabel}>{mediaLabel}</div>
            )}
            {mediaHint !== undefined && <div className={styles.vhint}>{mediaHint}</div>}
          </div>
        )}
      </div>

      <div className={styles.body}>
        <Tag className={styles.tagRow} year={year}>
          {tag}
        </Tag>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.role}>Role: {role}</div>
        {paragraphs.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
        <div className={styles.chips}>
          {chips.map((chip) => (
            <Chip key={chip}>{chip}</Chip>
          ))}
        </div>
      </div>
    </article>
  );
}

export default BuildCard;
