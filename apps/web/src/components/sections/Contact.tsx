import { ContactGrid, ContactRow } from '@portfolio/ui';
import { contact, contactLinks } from '../../content/portfolio';
import styles from './sections.module.css';

export function Contact() {
  return (
    <footer className={styles.contact} id="contact">
      <div className={styles.contactWrap}>
        <div className={styles.contactCoord}>{contact.coord}</div>
        <h2 className={styles.contactH}>{contact.heading}</h2>
        <p className={styles.contactSub}>{contact.sub}</p>
        <ContactGrid>
          {contactLinks.map((link) => (
            <ContactRow
              key={link.label}
              label={link.label}
              value={link.value}
              href={link.href}
              external={link.external}
            />
          ))}
        </ContactGrid>
        <div className={styles.foot}>
          <span>{contact.footLeft}</span>
          <span>{contact.footRight}</span>
        </div>
      </div>
    </footer>
  );
}
