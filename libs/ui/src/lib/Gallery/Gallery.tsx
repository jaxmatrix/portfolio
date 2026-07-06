'use client';

import { useCallback, useEffect, useState } from 'react';
import styles from './Gallery.module.css';

export interface GalleryItem {
  /** Image URL; leave empty for a placeholder tile. */
  src?: string;
  /** Taller placeholder for masonry variety. */
  tall?: boolean;
  caption: string;
}

export interface GalleryProps {
  items: GalleryItem[];
  className?: string;
}

function CameraIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 8V4h4M20 8V4h-4M4 16v4h4M20 16v4h-4" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function ExpandIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M9 4H4v5M15 4h5v5M9 20H4v-5M15 20h5v-5" />
    </svg>
  );
}

const pad = (n: number) => String(n).padStart(2, '0');

/** Masonry image grid with a keyboard-navigable lightbox. */
export function Gallery({ items, className }: GalleryProps) {
  const [current, setCurrent] = useState<number | null>(null);
  const open = current !== null;

  const close = useCallback(() => setCurrent(null), []);
  const next = useCallback(
    () => setCurrent((c) => (c === null ? c : (c + 1) % items.length)),
    [items.length]
  );
  const prev = useCallback(
    () => setCurrent((c) => (c === null ? c : (c - 1 + items.length) % items.length)),
    [items.length]
  );

  // Keyboard nav + scroll lock while the lightbox is open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowRight') next();
      else if (e.key === 'ArrowLeft') prev();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, close, next, prev]);

  const active = current !== null ? items[current] : null;

  return (
    <>
      <div className={[styles.grid, className].filter(Boolean).join(' ')}>
        {items.map((item, i) => {
          const idx = pad(i + 1);
          return (
            <figure
              key={i}
              className={styles.item}
              tabIndex={0}
              role="button"
              aria-label={`Open image: ${item.caption}`}
              onClick={() => setCurrent(i)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setCurrent(i);
                }
              }}
            >
              <div className={styles.expand}>
                <ExpandIcon />
              </div>
              {item.src ? (
                <img src={item.src} alt={item.caption} loading="lazy" />
              ) : (
                <div className={styles.ph} style={{ minHeight: item.tall ? 300 : 190 }}>
                  <CameraIcon />
                  <span className={styles.phtxt}>ADD IMAGE {idx}</span>
                </div>
              )}
              <figcaption className={styles.figcap}>
                <span className={styles.gidx}>{idx}</span>
                <span>{item.caption}</span>
              </figcaption>
            </figure>
          );
        })}
      </div>

      <div
        className={[styles.lb, open && styles.lbOpen].filter(Boolean).join(' ')}
        role="dialog"
        aria-modal="true"
        aria-label="Image viewer"
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
      >
        {active && current !== null && (
          <>
            <div className={styles.count}>
              {pad(current + 1)} / {pad(items.length)}
            </div>
            <button className={styles.close} aria-label="Close" onClick={close}>
              ×
            </button>
            <button
              className={`${styles.nav} ${styles.prev}`}
              aria-label="Previous image"
              onClick={prev}
            >
              ‹
            </button>
            <div className={styles.stage}>
              {active.src ? (
                <img src={active.src} alt={active.caption} />
              ) : (
                <div className={styles.ph}>
                  <span className={styles.phtxt}>IMAGE {pad(current + 1)} — ADD FILE</span>
                </div>
              )}
            </div>
            <button
              className={`${styles.nav} ${styles.next}`}
              aria-label="Next image"
              onClick={next}
            >
              ›
            </button>
            <div className={styles.cap}>
              <span className={styles.gidx}>{pad(current + 1)}</span>
              &nbsp;{active.caption}
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Gallery;
