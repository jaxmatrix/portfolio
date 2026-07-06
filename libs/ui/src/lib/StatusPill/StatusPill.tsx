import type { ReactNode } from 'react';
import styles from './StatusPill.module.css';

export interface StatusPillProps {
  className?: string;
  children: ReactNode;
}

/** Bordered mono status chip with a pulsing amber dot (hero availability tag). */
export function StatusPill({ className, children }: StatusPillProps) {
  return (
    <div className={[styles.pill, className].filter(Boolean).join(' ')}>
      <span className={styles.dot} />
      {children}
    </div>
  );
}

export default StatusPill;
