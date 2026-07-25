/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type { Metadata } from 'next';
import './globals.css';

const title = 'Abarnaa Tailoring Mart';
const description =
  'Premium ladies tailoring, bridal blouse stitching, Aari work, and sewing machine sales in Thiruthuraipoondi.';

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    type: 'website',
    images: ['/images/logo.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description: 'Premium ladies tailoring, bridal blouse stitching, Aari work, and sewing machine sales.',
    images: ['/images/logo.png'],
  },
  icons: {
    icon: '/images/logo.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
