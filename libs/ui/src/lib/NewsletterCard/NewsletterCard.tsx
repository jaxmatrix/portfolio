import type { ReactNode } from 'react';
import { NewsletterForm } from './NewsletterForm';
import styles from './NewsletterCard.module.css';

export interface NewsletterCardProps {
  title?: ReactNode;
  blurb?: ReactNode;
  /**
   * POST endpoint for a mailing-list provider.
   *
   * When omitted, no email input is rendered at all — the card falls back to
   * `fallbackLinks` instead of collecting addresses that go nowhere.
   */
  action?: string;
  buttonLabel?: string;
  /** Shown only when `action` is undefined. */
  fallbackLinks?: { label: string; href: string; external?: boolean }[];
  className?: string;
}

/** Sidebar subscribe panel.
 *
 *  With no `action` configured this deliberately renders real links (a feed, an
 *  email address) rather than a form that silently discards what you type. */
export function NewsletterCard({
  title = 'Subscribe',
  blurb,
  action,
  buttonLabel = 'Subscribe',
  fallbackLinks,
  className,
}: NewsletterCardProps) {
  return (
    <div className={[styles.wrap, className].filter(Boolean).join(' ')}>
      <h2 className={styles.heading}>{title}</h2>
      {blurb !== undefined && <p className={styles.blurb}>{blurb}</p>}

      {action !== undefined ? (
        <NewsletterForm action={action} buttonLabel={buttonLabel} />
      ) : (
        fallbackLinks !== undefined &&
        fallbackLinks.length > 0 && (
          <ul className={styles.links}>
            {fallbackLinks.map((link) => (
              <li key={link.href}>
                <a
                  className={styles.link}
                  href={link.href}
                  {...(link.external ? { target: '_blank', rel: 'noreferrer' } : {})}
                >
                  {link.label}
                  <span className={styles.arrow}>↗</span>
                </a>
              </li>
            ))}
          </ul>
        )
      )}
    </div>
  );
}

export default NewsletterCard;
