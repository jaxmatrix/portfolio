import type { ReactNode } from 'react';
import styles from './Chip.module.css';

export interface ChipProps {
  /** Render as an anchor when provided, otherwise a `<span>`. */
  href?: string;
  className?: string;
  children: ReactNode;
}

/** Monospace tech tag used in build cards, stacks and blog tag lists. */
export function Chip({ href, className, children }: ChipProps) {
  const cls = [styles.chip, href !== undefined && styles.link, className]
    .filter(Boolean)
    .join(' ');

  if (href !== undefined) {
    return (
      <a className={cls} href={href}>
        {children}
      </a>
    );
  }

  return <span className={cls}>{children}</span>;
}

export default Chip;
