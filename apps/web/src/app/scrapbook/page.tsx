import { Section, Gallery } from '@portfolio/ui';
import { scrapbook } from '../../content/portfolio';

export const metadata = {
  title: 'Scrapbook',
  description:
    'Things I made that aren’t on a résumé — costumes, keychains, a bricked hard disk talked back to life.',
  alternates: { canonical: '/scrapbook' },
};

export default function ScrapbookPage() {
  return (
    <Section
      id="scrapbook"
      coord="WP-09"
      title="Scrapbook"
      note="drag to scroll · click to enlarge"
    >
      <p
        style={{
          maxWidth: '64ch',
          margin: '0 0 26px',
          fontSize: 16,
          color: 'var(--ink-2)',
        }}
      >
        Things I made that aren’t on a résumé. Some of it is engineering that went sideways,
        some of it isn’t engineering at all.
      </p>
      <Gallery items={scrapbook} />
    </Section>
  );
}
