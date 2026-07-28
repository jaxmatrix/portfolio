import { Section, BuildCard, Reveal } from '@portfolio/ui';
import { builds } from '../../content/portfolio';
import styles from './sections.module.css';

export function Builds() {
  return (
    <Section id="builds" coord="WP-02" title="Featured builds">
      {/* Content is authored oldest-first; the page leads with the newest build. */}
      {[...builds].reverse().map((build, i) => (
        <Reveal key={build.title} className={styles.buildItem}>
          <BuildCard
            tag={build.tag}
            year={build.year}
            title={build.title}
            role={build.role}
            paragraphs={build.paragraphs}
            chips={build.chips}
            links={build.links}
            media={<img src={build.image} alt={build.imageAlt} loading="lazy" />}
            reverse={i % 2 === 1}
          />
        </Reveal>
      ))}
    </Section>
  );
}
