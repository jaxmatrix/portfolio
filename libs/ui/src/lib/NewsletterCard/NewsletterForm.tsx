'use client';

import { useState } from 'react';
import styles from './NewsletterCard.module.css';

export interface NewsletterFormProps {
  /** POST endpoint that accepts an `email` field. */
  action: string;
  buttonLabel: string;
}

type Status = 'idle' | 'submitting' | 'ok' | 'error';

/** The real signup form. Rendered only when an endpoint is configured.
 *  `method`/`action` are set natively, so it still submits without JS. */
export function NewsletterForm({ action, buttonLabel }: NewsletterFormProps) {
  const [status, setStatus] = useState<Status>('idle');

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus('submitting');

    try {
      const response = await fetch(action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });
      setStatus(response.ok ? 'ok' : 'error');
      if (response.ok) form.reset();
    } catch {
      setStatus('error');
    }
  }

  if (status === 'ok') {
    return <p className={styles.status}>Subscribed — check your inbox to confirm.</p>;
  }

  return (
    <form className={styles.form} method="post" action={action} onSubmit={onSubmit}>
      <label className={styles.srOnly} htmlFor="newsletter-email">
        Email address
      </label>
      <input
        className={styles.input}
        id="newsletter-email"
        type="email"
        name="email"
        placeholder="you@example.com"
        required
        disabled={status === 'submitting'}
      />
      <button className={styles.submit} type="submit" disabled={status === 'submitting'}>
        {status === 'submitting' ? 'Sending…' : buttonLabel}
      </button>

      {status === 'error' && (
        <p className={styles.status}>That didn&rsquo;t go through. Try again in a moment.</p>
      )}
    </form>
  );
}

export default NewsletterForm;
