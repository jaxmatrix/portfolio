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

/** Portrait for the hero column, cropped into a vertical ellipse frame. */
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
      {/* Slightly shorter than the source so the oval itself clips the
          artwork's bottom edge — image and frame stay one scaled unit. */}
      <div
        className={styles.frame}
        style={{ aspectRatio: `${width} / ${Math.round(height * 0.9)}` }}
      >
        <picture className={styles.shot}>
          {srcWebp && <source srcSet={srcWebp} type="image/webp" />}
          <img src={src} alt={alt} width={width} height={height} />
        </picture>
      </div>
      {caption && <div className={styles.artCap}>{caption}</div>}
    </div>
  );
}

export default HeroPortrait;
