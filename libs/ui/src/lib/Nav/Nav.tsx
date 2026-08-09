'use client';

import { useCallback, useEffect, useId, useState, type ReactNode } from 'react';
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
  const [open, setOpen] = useState(false);
  const menuId = useId();

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 720px)');
    const onChange = () => {
      if (!mq.matches) close();
    };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, [close]);

  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open, close]);

  return (
    <header
      className={[styles.nav, open ? styles.navOpen : '', className]
        .filter(Boolean)
        .join(' ')}
    >
      <a className={styles.brand} href={brandHref} onClick={close}>
        {brand}
      </a>

      <nav className={styles.links} aria-label="Primary">
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

      <button
        type="button"
        className={styles.menuBtn}
        aria-expanded={open}
        aria-controls={menuId}
        aria-label={open ? 'Close menu' : 'Open menu'}
        onClick={() => setOpen((v) => !v)}
      >
        <span className={styles.menuIcon} aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
      </button>

      <div
        id={menuId}
        className={styles.panel}
        hidden={!open}
        aria-hidden={!open}
      >
        <nav className={styles.panelLinks} aria-label="Mobile">
          {links.map((link) => (
            <a key={link.href} href={link.href} onClick={close}>
              {link.label}
            </a>
          ))}
          {cta && (
            <a className={styles.panelCta} href={cta.href} onClick={close}>
              {cta.label}
            </a>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Nav;
