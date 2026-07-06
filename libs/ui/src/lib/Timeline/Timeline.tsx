import type { ReactNode } from 'react';
import styles from './Timeline.module.css';

export interface TimelineProps {
  className?: string;
  children: ReactNode;
}

/** Vertical bordered rail that holds TimelineItem nodes. */
export function Timeline({ className, children }: TimelineProps) {
  return (
    <div className={[styles.tl, className].filter(Boolean).join(' ')}>{children}</div>
  );
}

export interface TimelineItemProps {
  /** Date range, e.g. "FEB 2025 — PRESENT". */
  when: ReactNode;
  role: ReactNode;
  /** Organization line; wrap the org name in `<b>`. */
  org: ReactNode;
  desc: ReactNode;
}

/** A single timeline entry with a plasma node dot. */
export function TimelineItem({ when, role, org, desc }: TimelineItemProps) {
  return (
    <div className={styles.item}>
      <div className={styles.when}>{when}</div>
      <div className={styles.role}>{role}</div>
      <div className={styles.org}>{org}</div>
      <div className={styles.desc}>{desc}</div>
    </div>
  );
}
