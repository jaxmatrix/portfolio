import { Section, Timeline, TimelineItem, Reveal } from '@portfolio/ui';
import { timeline } from '../../content/portfolio';

export function Path() {
  return (
    <Section id="path" coord="WP-04" title="The path" note="bench → firmware → software → AI">
      <Reveal>
        <Timeline>
          {timeline.map((entry) => (
            <TimelineItem
              key={`${entry.role}-${entry.when}`}
              when={entry.when}
              role={entry.role}
              org={entry.org}
              desc={entry.desc}
            />
          ))}
        </Timeline>
      </Reveal>
    </Section>
  );
}
