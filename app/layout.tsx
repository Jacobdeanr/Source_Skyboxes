import './globals.css';
import { Inter, JetBrains_Mono } from 'next/font/google';
import { Metadata } from 'next';

import { SITE_URL, withBase } from '@/app/lib/basepath';

const inter     = Inter({ subsets: ['latin'], variable: '--font-sans',  display: 'swap' });
const jetbrains = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono', display: 'swap' });


export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `Jacob Robbins' Free Source Engine Skyboxes`,
    template: '%s | Source Skyboxes',
  },
  description:
    'Free HDR skyboxes for Source Engine and other renderers. Download Source Engine ready sets or original 32-bit EXR files.',
  openGraph: {
    siteName: `Jacob Robbins' Free Source Engine Skyboxes`,
    type: 'website',
    locale: 'en_US',
    url: '/',
    title: `Jacob Robbins' Free Source Engine Skyboxes`,
    description:
      'High-quality skybox textures. Free download - Source Engine ready sets and original EXR.',
    images: [
      { url: withBase('/skyboxes/sky_cloudy017_hdr/images/previews/1.webp'), width: 1200, height: 630 },
    ],
  },
  keywords: [
    'skybox', 'HDRI', 'Source Engine', 'EXR', 'VTF', 'VMT',
    'HL2', 'CSGO', 'Source 2', 'TF2', 'S&box', 'Source Skyboxes',
    'GarrysMod', 'gmod', 'hammer', 'cs2', 'free textures',
  ],
  authors: [{ name: 'Jacob Robbins', url: 'https://github.com/Jacobdeanr' }],
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrains.variable}`}>
      <body>
        {children}
      </body>
    </html>
  );
}