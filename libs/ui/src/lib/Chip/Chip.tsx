import type { ReactNode } from 'react';
import styles from './Chip.module.css';

export interface ChipProps {
  className?: string;
  children: ReactNode;
}

/** Monospace tech tag used in build cards and stacks. */
export function Chip({ className, children }: ChipProps) {
  return (
    <span className={[styles.chip, className].filter(Boolean).join(' ')}>
      {children}
    </span>
  );
}

export default Chip;
