import styles from './HeroArt.module.css';

export interface HeroArtProps {
  /** Caption under the drawing. */
  caption?: string;
  className?: string;
}

/** Abstract toolpath / chip-trace SVG that draws itself on load. */
export function HeroArt({
  caption = 'FIG.01 — SVG TOOLPATH → MOTION · 100µm RESOLUTION',
  className,
}: HeroArtProps) {
  return (
    <div className={[styles.heroArt, className].filter(Boolean).join(' ')}>
      <svg
        viewBox="0 0 400 400"
        role="img"
        aria-label="Abstract toolpath tracing a chip layout"
      >
        <rect x="20" y="20" width="360" height="360" className={styles.pad} />
        <path
          className={styles.tp}
          d="M60,60 H340 V110 H90 V150 H340 V190 H90 V230 H340 V270 H90 V310 H340"
        />
        <path
          className={styles.tp2}
          d="M60,60 V340 M60,340 H140 M200,340 V270 M200,270 H300 M300,270 V190"
        />
        <circle className={styles.via} cx="60" cy="60" r="5" style={{ animationDelay: '0.5s' }} />
        <circle className={styles.via} cx="340" cy="60" r="5" style={{ animationDelay: '1s' }} />
        <circle className={styles.via} cx="340" cy="310" r="5" style={{ animationDelay: '2.4s' }} />
        <circle className={styles.via} cx="60" cy="340" r="5" style={{ animationDelay: '2.8s' }} />
        <circle
          className={styles.via}
          cx="300"
          cy="190"
          r="4"
          style={{ animationDelay: '3.4s', fill: 'var(--amber)' }}
        />
        <rect
          className={styles.via}
          x="196"
          y="266"
          width="8"
          height="8"
          style={{ animationDelay: '3.6s', fill: 'var(--amber)' }}
        />
      </svg>
      <div className={styles.artCap}>{caption}</div>
    </div>
  );
}

export default HeroArt;
