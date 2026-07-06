import type { ReactNode } from 'react';
import styles from './Nav.module.css';

export interface NavLink {
  label: string;
  href: string;
}

export interface NavProps {
  /** Brand mark; wrap an accent in `<span>` to colour it plasma. */
  brand: ReactNode;
  brandHref?: string;
  links: NavLink[];
  cta?: NavLink;
  className?: string;
}

/** Fixed, blurred top navigation bar. */
export function Nav({ brand, brandHref = '#top', links, cta, className }: NavProps) {
  return (
    <header className={[styles.nav, className].filter(Boolean).join(' ')}>
      <a className={styles.brand} href={brandHref}>
        {brand}
      </a>
      <nav className={styles.links}>
        {links.map((link) => (
          <a key={link.href} href={link.href}>
            {link.label}
          </a>
        ))}
      </nav>
      {cta && (
        <a className={styles.cta} href={cta.href}>
          {cta.label}
        </a>
      )}
    </header>
  );
}

export default Nav;
