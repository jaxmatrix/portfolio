import type { ReactNode } from 'react';
import styles from './Contact.module.css';

export interface ContactGridProps {
  className?: string;
  children: ReactNode;
}

/** Two-up bordered grid of ContactRows (sits on the dark contact footer). */
export function ContactGrid({ className, children }: ContactGridProps) {
  return (
    <div className={[styles.grid, className].filter(Boolean).join(' ')}>{children}</div>
  );
}

export interface ContactRowProps {
  /** Uppercase key, e.g. "Email". */
  label: ReactNode;
  /** Displayed value, e.g. "jaishukla7768@gmail.com". */
  value: ReactNode;
  href: string;
  external?: boolean;
}

/** A single labelled contact link row. */
export function ContactRow({ label, value, href, external }: ContactRowProps) {
  const extra = external ? { target: '_blank', rel: 'noopener noreferrer' } : {};
  return (
    <a className={styles.cline} href={href} {...extra}>
      <span className={styles.k}>{label}</span>
      <span className={styles.v}>{value}</span>
    </a>
  );
}
