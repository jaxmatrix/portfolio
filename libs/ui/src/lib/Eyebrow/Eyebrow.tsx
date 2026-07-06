import type { ReactNode } from 'react';
import styles from './Eyebrow.module.css';

export interface EyebrowProps {
  className?: string;
  children: ReactNode;
}

/** Small uppercase mono label used above headings and lists. */
export function Eyebrow({ className, children }: EyebrowProps) {
  return (
    <div className={[styles.eyebrow, className].filter(Boolean).join(' ')}>
      {children}
    </div>
  );
}

export default Eyebrow;
