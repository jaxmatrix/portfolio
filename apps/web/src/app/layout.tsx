import './global.css';
import { Nav, ProgressRail } from '@portfolio/ui';
import { Contact } from '../components/sections';
import { navLinks, resumeCta } from '../content/portfolio';
import { blog, siteUrl } from '../lib/site';
import styles from '../components/sections/sections.module.css';

export const metadata = {
  /* Required so the blog's relative canonical and OG image URLs resolve to
     absolute ones. */
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Jai Shukla — AI & Systems Engineer',
    template: '%s — Jai Shukla',
  },
  alternates: {
    types: { 'application/rss+xml': blog.feedPath },
  },
  description:
    'Jai Shukla builds the whole stack — agent systems, full-stack products, embedded firmware and the machines underneath.',
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: '48x48' },
    ],
    shortcut: '/favicon.ico',
    apple: '/apple-icon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;700&family=Archivo+Expanded:wght@600;700;800&family=IBM+Plex+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="paper-surface">
        <Nav
          brand={
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                color: 'var(--ink)',
              }}
            >
              {/* Slot is the SVG's document rect (26px tall); the artwork is
                  taller than the page, so it bleeds out of the header below. */}
              <span
                style={{
                  position: 'relative',
                  display: 'block',
                  flex: 'none',
                  width: 48.67,
                  height: 26,
                }}
              >
                <img
                  src="/logo.svg"
                  alt=""
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: 'auto',
                    display: 'block',
                    pointerEvents: 'none',
                  }}
                />
              </span>
              JAI<span>/</span>SHUKLA
            </span>
          }
          brandHref="/"
          links={navLinks}
          cta={resumeCta}
        />
        <ProgressRail />
        <main id="top" className={styles.main}>
          {children}
        </main>
        <Contact />
      </body>
    </html>
  );
}
