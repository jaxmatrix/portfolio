import { Section, Gallery } from '@portfolio/ui';
import { gallery } from '../../content/portfolio';

export function GallerySection() {
  return (
    <Section id="gallery" coord="WP-03" title="The bench" note="drag to scroll · click to enlarge">
      <Gallery items={gallery} />
    </Section>
  );
}
