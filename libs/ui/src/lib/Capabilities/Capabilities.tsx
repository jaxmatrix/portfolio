import type { ReactNode } from 'react';
import styles from './Capabilities.module.css';

export interface CapabilitiesProps {
  className?: string;
  children: ReactNode;
}

/** Two-up grid container with hairline dividers for CapabilityCards. */
export function Capabilities({ className, children }: CapabilitiesProps) {
  return (
    <div className={[styles.caps, className].filter(Boolean).join(' ')}>{children}</div>
  );
}

export interface CapabilityCardProps {
  /** Group heading, e.g. "Languages". */
  title: ReactNode;
  items: string[];
}

/** A labelled group of monospace capability tags. */
export function CapabilityCard({ title, items }: CapabilityCardProps) {
  return (
    <div className={styles.cap}>
      <h4>{title}</h4>
      <div className={styles.list}>
        {items.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>
    </div>
  );
}
