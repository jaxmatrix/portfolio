import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllPosts } from '../../lib/blog';

export const metadata: Metadata = {
  title: 'Blog Transmissions — MJX.EXE',
  description: 'Deep dives, field notes, and technical postmortems on Rust, open standards, WASM, and AI agent runtimes by MJX.EXE.',
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <div className="wrap" style={{ paddingTop: '120px', paddingBottom: '80px' }}>
      <div className="section-banner">
        <div className="sec-badge">ARCHIVES</div>
        <h1 className="sec-title">BLOG TRANSMISSIONS &amp; FIELD NOTES</h1>
        <div className="sec-desc">{posts.length} {posts.length === 1 ? 'ENTRY' : 'ENTRIES'} ARCHIVED</div>
      </div>

      <div style={{ marginBottom: '32px' }}>
        <p style={{ fontSize: '16px', color: 'var(--ink-body)', maxWidth: '750px', lineHeight: '1.7' }}>
          Unvarnished notes on deep-stack engineering: rebuilding OOXML standards in pure Rust, compiling markdown-to-voice engines for WASM, and architecting multi-platform agent operating systems.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '28px' }}>
        {posts.map((post) => (
          <article key={post.slug} className="quest-card" style={{ padding: '28px' }}>
            <div className="quest-act">
              {post.dateDisplay.toUpperCase()} · {post.readingMinutes} MIN READ
            </div>
            <h2 className="quest-title" style={{ fontSize: '16px', margin: '12px 0' }}>
              <Link href={`/blog/${post.slug}`} style={{ color: 'var(--ink-title)' }}>
                {post.title}
              </Link>
            </h2>
            <p className="quest-body" style={{ marginBottom: '24px' }}>
              {post.summary}
            </p>
            <div className="quest-loot">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div className="loot-chips">
                  {post.tags.map((tag) => (
                    <span key={tag} className="chip rare">{tag}</span>
                  ))}
                </div>
                <Link href={`/blog/${post.slug}`} className="pixel-btn primary" style={{ fontSize: '10px', padding: '8px 14px' }}>
                  DECODE POST ➔
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
