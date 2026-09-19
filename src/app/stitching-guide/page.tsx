/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type { Metadata } from 'next';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import StitchingGuide from '../../components/StitchingGuide';

export const metadata: Metadata = {
  title: 'Learn Stitching | Abarnaa Tailoring Mart',
  description:
    'A free, step-by-step bilingual (English & Tamil) visual guide to stitching a blouse, chudithar, frock, and saree fall from scratch.',
};

export default function StitchingGuidePage() {
  return (
    <div className="min-h-screen bg-stone-50 select-text selection:bg-gold-200 selection:text-gold-950 font-sans antialiased text-stone-800">
      <Navbar />
      <main>
        <StitchingGuide />
      </main>
      <Footer />
    </div>
  );
}
