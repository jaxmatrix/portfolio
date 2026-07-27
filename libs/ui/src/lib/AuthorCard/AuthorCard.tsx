import type { ReactNode } from 'react';
import styles from './AuthorCard.module.css';

export interface AuthorCardProps {
  name: ReactNode;
  role: ReactNode;
  blurb: ReactNode;
  avatar?: { src: string; alt: string };
  links?: { label: string; href: string; external?: boolean }[];
  className?: string;
}

/** Sidebar author panel — photo, one-line role, short bio and profile links. */
export function AuthorCard({ name, role, blurb, avatar, links, className }: AuthorCardProps) {
  return (
    <div className={[styles.wrap, className].filter(Boolean).join(' ')}>
      <div className={styles.head}>
        {avatar && <img className={styles.avatar} src={avatar.src} alt={avatar.alt} />}
        <div>
          <p className={styles.name}>{name}</p>
          <p className={styles.role}>{role}</p>
        </div>
      </div>

      <p className={styles.blurb}>{blurb}</p>

      {links !== undefined && links.length > 0 && (
        <ul className={styles.links}>
          {links.map((link) => (
            <li key={link.href}>
              <a
                className={styles.link}
                href={link.href}
                {...(link.external ? { target: '_blank', rel: 'noreferrer' } : {})}
              >
                {link.label}
                <span className={styles.arrow}>{link.external ? '↗' : '→'}</span>
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default AuthorCard;
