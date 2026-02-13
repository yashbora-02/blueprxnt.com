import type { Metadata, Viewport } from 'next';
import { Inter, Archivo } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const archivo = Archivo({
  subsets: ['latin'],
  variable: '--font-archivo',
});

export const metadata: Metadata = {
  title: 'Blueprxnt — Performance Coaching',
  description: 'Blueprxnt is a holistic performance system that integrates health, mindset, training, nutrition, and recovery to help you build lasting performance.',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${archivo.variable} font-sans`}>{children}</body>
    </html>
  );
}
