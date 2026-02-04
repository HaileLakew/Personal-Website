import { SpeedInsights } from '@vercel/speed-insights/next';

import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <meta name="theme-color" content="#000000"></meta>
      <body>
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
