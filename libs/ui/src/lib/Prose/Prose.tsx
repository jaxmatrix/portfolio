import type { ReactNode } from 'react';
import styles from './Prose.module.css';

export interface ProseProps {
  className?: string;
  children: ReactNode;
}

/** Long-form article body. Styles raw HTML elements produced by MDX, so posts
 *  need no per-element wrappers. Text blocks are capped to a readable measure
 *  while code, tables and figures use the full column width. */
export function Prose({ className, children }: ProseProps) {
  return (
    <div className={[styles.prose, className].filter(Boolean).join(' ')}>{children}</div>
  );
}

export default Prose;
