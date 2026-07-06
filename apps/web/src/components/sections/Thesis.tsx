import { Section, Pillars, Pillar, Reveal } from '@portfolio/ui';
import { thesis, pillars } from '../../content/portfolio';
import styles from './sections.module.css';

export function Thesis() {
  return (
    <Section id="thesis" coord="WP-01" title="The through-line">
      <p className={styles.thesisLead}>{thesis.lead}</p>
      <p className={styles.thesisBody}>{thesis.body}</p>
      <Reveal>
        <Pillars>
          {pillars.map((pillar) => (
            <Pillar key={pillar.n} n={pillar.n} title={pillar.title}>
              {pillar.body}
            </Pillar>
          ))}
        </Pillars>
      </Reveal>
    </Section>
  );
}
