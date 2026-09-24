import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';
import { Navigation } from '../components/Navigation';

export const metadata: Metadata = {
  title: 'Jai Shukla — Founder-Operator · Business Bets to Shipped Outcomes',
  description: "Jai Shukla: founder-operator who takes business bets to shipped outcomes — enterprise ship inside PowerPoint, 10µm precision machines, 5-week store push.",
  icons: {
    icon: [
      { url: '/favicon.png', type: 'image/png' },
      { url: '/mjx_avatar.png', type: 'image/png' }
    ],
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link rel="shortcut icon" type="image/png" href="/favicon.png" />
        <link rel="apple-touch-icon" href="/favicon.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Silkscreen:wght@400;700&family=JetBrains+Mono:wght@400;500;700&family=IBM+Plex+Mono:wght@400;600&display=swap" rel="stylesheet" />
      </head>
      <body>
        <Navigation />
        <main>{children}</main>
        <footer className="retro-footer">
          <div className="wrap">
            <p style={{ marginBottom: '8px' }}>
              © 2026 JAI SHUKLA · FOUNDER-OPERATOR
            </p>
            <p>
              MADE USING ALLR
            </p>
          </div>
        </footer>
        <Analytics />
      </body>
    </html>
  );
}
