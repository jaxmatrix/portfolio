import type { ReactNode } from 'react';
import styles from './Callout.module.css';

export interface CalloutProps {
  /** `note` = plasma, `warn` = amber, `spec` = neutral ink. */
  tone?: 'note' | 'warn' | 'spec';
  title?: ReactNode;
  className?: string;
  children: ReactNode;
}

/** Aside inside an article. Available to MDX posts without an import. */
export function Callout({ tone = 'note', title, className, children }: CalloutProps) {
  return (
    <aside
      className={[styles.callout, styles[tone], className].filter(Boolean).join(' ')}
    >
      {title !== undefined && <p className={styles.title}>{title}</p>}
      <div className={styles.body}>{children}</div>
    </aside>
  );
}

export default Callout;
