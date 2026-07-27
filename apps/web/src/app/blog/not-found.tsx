import { Button, Section } from '@portfolio/ui';
import { blog } from '../../lib/site';

export default function BlogNotFound() {
  return (
    <Section id="blog-404" coord={blog.coord} title="No such entry">
      <p style={{ color: 'var(--ink-2)', maxWidth: '46ch', marginBottom: 28 }}>
        That post doesn&rsquo;t exist — it may have been renamed, or never published.
      </p>
      <Button href="/blog" variant="primary">
        All posts
      </Button>
    </Section>
  );
}
