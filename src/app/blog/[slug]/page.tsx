import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { marked } from 'marked';
import { getAllPosts, getPostBySlug } from '../../../lib/blog';
import { VoiceoverDemo } from '../../../components/VoiceoverDemo';

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: 'Post Not Found' };

  return {
    title: `${post.title} — MJX.EXE`,
    description: post.summary,
  };
}

// Configure marked options
marked.setOptions({
  gfm: true,
  breaks: false,
});

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // Check if this post contains the VoiceoverDemo component
  const hasVoiceoverDemo = post.content.includes('<VoiceoverDemo');

  // Split content around <VoiceoverDemo ... /> if present
  let beforeDemo = post.content;
  let afterDemo = '';

  if (hasVoiceoverDemo) {
    const parts = post.content.split(/<VoiceoverDemo[\s\S]*?\/>/);
    beforeDemo = parts[0] || '';
    afterDemo = parts[1] || '';
  }

  // Clean custom Callout tags to clean markdown quotes
  const cleanMdx = (text: string) => {
    return text
      .replace(/<Callout tone="note" title="([^"]+)">([\s\S]*?)<\/Callout>/g, (_, title, body) => {
        return `\n> **${title}**\n>\n> ${body.trim().replace(/\n/g, '\n> ')}\n`;
      })
      .replace(/<Callout[^>]*>([\s\S]*?)<\/Callout>/g, (_, body) => {
        return `\n> ${body.trim().replace(/\n/g, '\n> ')}\n`;
      });
  };

  const htmlBefore = await marked.parse(cleanMdx(beforeDemo));
  const htmlAfter = hasVoiceoverDemo ? await marked.parse(cleanMdx(afterDemo)) : '';

  const voiceoverSamples = [
    {
      label: 'A whole page',
      markdown: `# Deployment guide

Run the migration **before** restarting the workers.

## Rollback

1. Stop the queue
2. Restore the snapshot

> [!WARNING]
> Dropping a column breaks active clients.`,
    },
    {
      label: 'Code snippet',
      markdown: `Install it first:

\`\`\`bash
cargo add mjx-md-voiceover
\`\`\`

Then call it:

\`\`\`rust
let speech = parse_and_format(md)?;
\`\`\``,
    },
    {
      label: 'Maths expression',
      markdown: `The energy is $E = mc^2$, and the norm is $\\sqrt{x^2 + y^2}$.`,
    },
    {
      label: 'Mermaid Diagram',
      markdown: `\`\`\`mermaid
sequenceDiagram
A->>B: hello
\`\`\``,
    },
  ];

  return (
    <div className="blog-article-wrapper">
      <div className="wrap" style={{ maxWidth: '860px' }}>
        <div style={{ marginBottom: '24px' }}>
          <Link href="/blog" className="pixel-btn" style={{ fontSize: '11px', padding: '8px 14px' }}>
            ◀ ALL TRANSMISSIONS
          </Link>
        </div>

        {/* Article Header Card */}
        <header className="article-header-panel">
          <div className="article-top-label">
            <span>LOG_ENTRY // {post.dateDisplay.toUpperCase()}</span>
            <span>·</span>
            <span>{post.readingMinutes} MIN READ</span>
          </div>
          
          <h1 className="article-main-title">
            {post.title}
          </h1>
          
          <p className="article-summary-lead">
            {post.summary}
          </p>

          <div className="article-meta-tags-row">
            <span className="tags-label-text">TAGS:</span>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {post.tags.map((t) => (
                <span key={t} className="chip-tag rare">{t}</span>
              ))}
            </div>
            {post.repo && (
              <a 
                href={post.repo} 
                target="_blank" 
                rel="noreferrer" 
                className="pixel-btn" 
                style={{ marginLeft: 'auto', fontSize: '11px', padding: '6px 12px' }}
              >
                SOURCE REPO ↗
              </a>
            )}
          </div>
        </header>

        {/* Article Body HTML */}
        <div 
          className="pixel-prose"
          dangerouslySetInnerHTML={{ __html: htmlBefore }}
        />

        {/* Embedded Interactive Voiceover Demo if in md-voiceover post */}
        {hasVoiceoverDemo && (
          <div style={{ margin: '36px 0' }}>
            <VoiceoverDemo
              fallbackOutput="Heading: Deployment guide. Run the migration before restarting the workers. Section: Rollback. First, Stop the queue. Second, Restore the snapshot. Warning alert callout. Dropping a column breaks active clients."
              samples={voiceoverSamples}
            />
          </div>
        )}

        {/* Remainder of Article if demo was embedded */}
        {hasVoiceoverDemo && htmlAfter && (
          <div 
            className="pixel-prose"
            dangerouslySetInnerHTML={{ __html: htmlAfter }}
          />
        )}

        {/* Footer Navigation */}
        <div className="article-footer-nav">
          <Link href="/blog" className="pixel-btn primary">
            ◀ BACK TO BLOG ARCHIVES
          </Link>
          <a href="#top" className="pixel-btn">
            TOP ▲
          </a>
        </div>
      </div>
    </div>
  );
}
