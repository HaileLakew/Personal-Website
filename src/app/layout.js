import { SpeedInsights } from '@vercel/speed-insights/next';

import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en" style={{background: 'black'}}>
      <body>
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
