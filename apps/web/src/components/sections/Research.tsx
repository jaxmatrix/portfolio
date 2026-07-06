import { Section, Eyebrow, PublicationItem, AwardItem } from '@portfolio/ui';
import { publications, awards, scholarUrl } from '../../content/portfolio';
import styles from './sections.module.css';

export function Research() {
  return (
    <Section
      id="research"
      coord="WP-06"
      title="Research & recognition"
      note={
        <a href={scholarUrl} target="_blank" rel="noopener noreferrer">
          Google Scholar ↗
        </a>
      }
    >
      <div className={styles.twoCol}>
        <div>
          <Eyebrow className={styles.eyebrowSpace}>PUBLICATIONS · 5</Eyebrow>
          {publications.map((pub) => (
            <PublicationItem
              key={pub.title}
              title={pub.title}
              featured={pub.featured}
              journal={pub.journal}
              citedBy={pub.citedBy}
              note={pub.note}
            />
          ))}
        </div>
        <div>
          <Eyebrow className={styles.eyebrowSpace}>AWARDS</Eyebrow>
          {awards.map((award) => (
            <AwardItem key={award.title} title={award.title} meta={award.meta} />
          ))}
        </div>
      </div>
    </Section>
  );
}
