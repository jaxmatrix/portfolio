import './global.css';
import { Nav, ProgressRail } from '@portfolio/ui';
import { Contact } from '../components/sections';
import { navLinks, resumeCta } from '../content/portfolio';
import styles from '../components/sections/sections.module.css';

export const metadata = {
  title: 'Jai Shukla — Builder · Hardware ↔ Software',
  description:
    'Jai Shukla builds the whole stack — precision machines, embedded firmware, full-stack software, and AI systems.',
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
            <>
              JAI<span>/</span>SHUKLA
            </>
          }
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
