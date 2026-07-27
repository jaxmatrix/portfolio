import type { CSSProperties } from 'react';
import styles from './HeroPortrait.module.css';

export interface HeroPortraitProps {
  /** Transparent cut-out. Used as the fallback when `srcWebp` is set. */
  src: string;
  /** Preferred source — served to anything that speaks WebP. */
  srcWebp?: string;
  alt: string;
  /** Intrinsic pixel size of `src`, so the browser reserves the box before load. */
  width: number;
  height: number;
  /** Optional mono caption under the portrait. */
  caption?: string;
  className?: string;
}

/** Cut-out portrait for the hero column, lit from behind by its own silhouette. */
export function HeroPortrait({
  src,
  srcWebp,
  alt,
  width,
  height,
  caption,
  className,
}: HeroPortraitProps) {
  return (
    <div className={[styles.heroPortrait, className].filter(Boolean).join(' ')}>
      <div className={styles.frame} style={{ aspectRatio: `${width} / ${height}` }}>
        <span className={styles.bloom} aria-hidden="true" />
        {/* Aura and photo share a wrapper so one bottom fade covers both and they
            dissolve on exactly the same line. */}
        <div className={styles.subject}>
          {/* The cut-out's own alpha, tinted and blurred — this is what makes the
              silhouette itself look lit rather than sitting on a coloured disc. */}
          <span
            className={styles.aura}
            aria-hidden="true"
            style={{ '--portrait': `url(${src})` } as CSSProperties}
          />
          <picture className={styles.shot}>
            {srcWebp && <source srcSet={srcWebp} type="image/webp" />}
            <img src={src} alt={alt} width={width} height={height} />
          </picture>
        </div>
      </div>
      {caption && <div className={styles.artCap}>{caption}</div>}
    </div>
  );
}

export default HeroPortrait;
