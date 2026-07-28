import type { ReactNode } from 'react';
import styles from './Chip.module.css';

export interface ChipProps {
  /** Render as an anchor when provided, otherwise a `<span>`. */
  href?: string;
  /** Open the link in a new tab (off-site destinations). */
  external?: boolean;
  className?: string;
  children: ReactNode;
}

/** Monospace tech tag used in build cards, stacks and blog tag lists. */
export function Chip({ href, external, className, children }: ChipProps) {
  const cls = [styles.chip, href !== undefined && styles.link, className]
    .filter(Boolean)
    .join(' ');

  if (href !== undefined) {
    return (
      <a
        className={cls}
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noreferrer' : undefined}
      >
        {children}
      </a>
    );
  }

  return <span className={cls}>{children}</span>;
}

export default Chip;
