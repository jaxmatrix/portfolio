import type { ReactNode } from 'react';
import styles from './Pillars.module.css';

export interface PillarsProps {
  className?: string;
  children: ReactNode;
}

/** Three-up grid container with hairline dividers for Pillar cards. */
export function Pillars({ className, children }: PillarsProps) {
  return (
    <div className={[styles.pillars, className].filter(Boolean).join(' ')}>
      {children}
    </div>
  );
}

export interface PillarProps {
  /** Layer label, e.g. "LAYER 00 — METAL". */
  n: ReactNode;
  title: ReactNode;
  children: ReactNode;
}

/** A single pillar / capability layer card. */
export function Pillar({ n, title, children }: PillarProps) {
  return (
    <div className={styles.pillar}>
      <div className={styles.n}>{n}</div>
      <h3>{title}</h3>
      <p>{children}</p>
    </div>
  );
}
