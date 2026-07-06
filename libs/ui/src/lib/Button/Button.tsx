import type { ReactNode } from 'react';
import styles from './Button.module.css';

export interface ButtonProps {
  /** `primary` = filled ink button; `default` = outlined. */
  variant?: 'primary' | 'default';
  /** Render as an anchor when provided, otherwise a `<button>`. */
  href?: string;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  className?: string;
  children: ReactNode;
}

export function Button({
  variant = 'default',
  href,
  type = 'button',
  onClick,
  className,
  children,
}: ButtonProps) {
  const cls = [styles.btn, variant === 'primary' && styles.primary, className]
    .filter(Boolean)
    .join(' ');

  if (href !== undefined) {
    return (
      <a className={cls} href={href} onClick={onClick}>
        {children}
      </a>
    );
  }

  return (
    <button className={cls} type={type} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
