'use client';

import { useEffect, useRef } from 'react';
import styles from './ProgressRail.module.css';

export interface ProgressRailProps {
  /** Vertical label shown along the rail. */
  label?: string;
  className?: string;
}

/** Fixed left "toolpath" rail whose fill + head track scroll position. */
export function ProgressRail({ label = 'TOOLPATH · POSITION', className }: ProgressRailProps) {
  const fillRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fill = fillRef.current;
    const head = headRef.current;
    if (!fill || !head) return;

    const update = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      const p = h > 0 ? Math.min(1, window.scrollY / h) : 0;
      const pct = (p * 100).toFixed(2) + '%';
      fill.style.height = pct;
      head.style.top = pct;
    };

    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();

    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return (
    <div className={[styles.rail, className].filter(Boolean).join(' ')} aria-hidden="true">
      <div className={styles.track}>
        <div className={styles.fill} ref={fillRef} />
        <div className={styles.head} ref={headRef} />
        <div className={styles.label}>{label}</div>
      </div>
    </div>
  );
}

export default ProgressRail;
