import { Section, Capabilities, CapabilityCard, Reveal } from '@portfolio/ui';
import { capabilities } from '../../content/portfolio';

export function Stack() {
  return (
    <Section id="stack" coord="WP-05" title="The stack I build with">
      <Reveal>
        <Capabilities>
          {capabilities.map((cap) => (
            <CapabilityCard key={cap.title} title={cap.title} items={cap.items} />
          ))}
        </Capabilities>
      </Reveal>
    </Section>
  );
}
