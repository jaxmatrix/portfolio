import type { ReactNode } from 'react';
import styles from './Figure.module.css';

export interface FigureProps {
  src: string;
  alt: string;
  caption?: ReactNode;
  /** Plate number shown against the caption, e.g. `01`. */
  index?: string;
  className?: string;
}

/** Captioned image inside an article, using the gallery's plate-caption idiom.
 *  Available to MDX posts without an import. */
export function Figure({ src, alt, caption, index, className }: FigureProps) {
  return (
    <figure className={[styles.figure, className].filter(Boolean).join(' ')}>
      <img className={styles.img} src={src} alt={alt} />
      {caption !== undefined && (
        <figcaption className={styles.caption}>
          {index !== undefined && <span className={styles.index}>{index}</span>}
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

export default Figure;
