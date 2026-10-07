import { SpeedInsights } from '@vercel/speed-insights/next';

import "./globals.css";

export const metadata = { title: 'Haile Lakew · Senior Software Engineer' }

export default function RootLayout({ children }) {
  return (
    <html lang="en" style={{ background: '#0E0E0E' }}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,100..900&family=Space+Mono:wght@400;700&display=swap" />
      </head>
      <body>
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
