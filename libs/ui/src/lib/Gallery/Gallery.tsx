'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import styles from './Gallery.module.css';

export interface GalleryItem {
  /** Image URL; leave empty for a placeholder tile. */
  src?: string;
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

/** Past this much pointer travel a press is a drag, not a click on a tile. */
const DRAG_SLOP = 6;

/**
 * Horizontally scrolling image carousel with a keyboard-navigable lightbox.
 *
 * The track renders three copies of `items` and parks the viewport on the
 * middle one; when a scroll approaches either edge it jumps by exactly one
 * copy-width, which is invisible because the pixels either side are identical.
 * That gives an endless track in both directions with no autoplay and no
 * per-frame JS — plain native scrolling does the work, so trackpad, touch and
 * scroll-snap all behave normally.
 */
export function Gallery({ items, className }: GalleryProps) {
  const [current, setCurrent] = useState<number | null>(null);
  const open = current !== null;

  const trackRef = useRef<HTMLDivElement>(null);
  /** Set while a pointer drag is in flight so it doesn't become a tile click. */
  const dragging = useRef(false);
  const drag = useRef({ startX: 0, startScroll: 0, moved: 0 });

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

  /**
   * Width of exactly one copy of `items`, cached because `onScroll` fires far
   * too often to be reading layout each time.
   *
   * It must be measured, not derived: `scrollWidth / 3` is wrong once the
   * track has a `gap`, because three copies have 3n-1 gaps rather than 3n. The
   * resulting few-pixel error would be re-applied on every wrap and drift the
   * snap alignment. The offset between tile 0 and tile n is the true period.
   */
  const copyWidth = useRef(0);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const measure = () => {
      const first = el.children[0] as HTMLElement | undefined;
      const second = el.children[items.length] as HTMLElement | undefined;
      if (!first || !second) return;
      copyWidth.current = second.offsetLeft - first.offsetLeft;
      // Park on the middle copy so there's runway in both directions.
      el.scrollLeft = copyWidth.current;
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [items.length]);

  /**
   * Keep the viewport inside the middle copy. `scroll-behavior` is forced to
   * auto for the jump so a smooth-scrolling browser doesn't animate it, and
   * scroll-snap is suspended for the same frame — snapping mid-teleport would
   * fight the reposition and visibly stutter.
   */
  const onScroll = useCallback(() => {
    const el = trackRef.current;
    const copy = copyWidth.current;
    if (!el || copy <= 0) return;
    const x = el.scrollLeft;
    if (x >= copy * 0.5 && x <= copy * 1.5) return;

    const prevBehavior = el.style.scrollBehavior;
    const prevSnap = el.style.scrollSnapType;
    el.style.scrollBehavior = 'auto';
    el.style.scrollSnapType = 'none';
    el.scrollLeft = x < copy * 0.5 ? x + copy : x - copy;
    // A drag in flight tracks absolute positions, so move its origin with the
    // teleport or the next pointermove snaps the track back.
    if (dragging.current) {
      drag.current.startScroll += el.scrollLeft - x;
    }
    el.style.scrollBehavior = prevBehavior;
    el.style.scrollSnapType = prevSnap;
  }, []);

  /** Detaches the in-flight drag's window listeners; also runs on unmount. */
  const stopDrag = useRef<(() => void) | null>(null);
  useEffect(() => () => stopDrag.current?.(), []);

  /**
   * Mouse/pen drag-to-scroll.
   *
   * Deliberately does NOT use `setPointerCapture`: capturing retargets the
   * subsequent `click` to the capturing element, so every click would land on
   * the track instead of the tile and the lightbox would never open. Listening
   * on `window` instead keeps the click's natural target while still following
   * the pointer outside the track.
   */
  const onPointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const el = trackRef.current;
    if (!el) return;
    // Clear the previous gesture's travel first, so a click after a drag still
    // registers as a click.
    drag.current = { startX: e.clientX, startScroll: el.scrollLeft, moved: 0 };
    // Touch keeps native momentum scrolling; only take over for mouse and pen.
    if (e.pointerType === 'touch') return;

    dragging.current = true;

    const onMove = (ev: PointerEvent) => {
      const dx = ev.clientX - drag.current.startX;
      drag.current.moved = Math.max(drag.current.moved, Math.abs(dx));
      el.scrollLeft = drag.current.startScroll - dx;
    };
    const onUp = () => {
      dragging.current = false;
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('pointercancel', onUp);
      stopDrag.current = null;
    };

    stopDrag.current = onUp;
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    window.addEventListener('pointercancel', onUp);
  }, []);

  const active = current !== null ? items[current] : null;

  // Three copies: the middle one is what the viewport sits on, the outer two
  // are the runway that makes the wrap invisible.
  const looped = [...items, ...items, ...items];

  return (
    <>
      <div
        ref={trackRef}
        className={[styles.track, className].filter(Boolean).join(' ')}
        onScroll={onScroll}
        onPointerDown={onPointerDown}
      >
        {looped.map((item, i) => {
          const index = i % items.length;
          return (
            <figure
              key={i}
              className={styles.item}
              // Only the middle copy is reachable by keyboard, so tabbing
              // through the carousel visits each image exactly once.
              tabIndex={i >= items.length && i < items.length * 2 ? 0 : -1}
              aria-hidden={i < items.length || i >= items.length * 2 || undefined}
              role="button"
              aria-label={`Open image: ${item.caption}`}
              onClick={() => {
                if (drag.current.moved > DRAG_SLOP) return;
                setCurrent(index);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setCurrent(index);
                }
              }}
            >
              <div className={styles.frame}>
                <div className={styles.expand}>
                  <ExpandIcon />
                </div>
                {item.src ? (
                  <img src={item.src} alt={item.caption} loading="lazy" draggable={false} />
                ) : (
                  <div className={styles.ph}>
                    <CameraIcon />
                  </div>
                )}
              </div>
              <figcaption className={styles.figcap}>{item.caption}</figcaption>
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
                <div className={styles.ph} />
              )}
            </div>
            <button
              className={`${styles.nav} ${styles.next}`}
              aria-label="Next image"
              onClick={next}
            >
              ›
            </button>
            <div className={styles.cap}>{active.caption}</div>
          </>
        )}
      </div>
    </>
  );
}

export default Gallery;
