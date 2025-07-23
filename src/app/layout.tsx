import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { APP_CONFIG } from '@/config/app';

export const metadata: Metadata = {
  title: APP_CONFIG.APP_NAME,
  description: 'Find your focus, one scroll at a time.',
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
    other: [
      {
        rel: 'apple-touch-icon-precomposed',
        url: '/apple-touch-icon.png',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Ubuntu:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#4B0082" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content={APP_CONFIG.APP_NAME} />
      </head>
      <body className="antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
