/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

// Subcomponents imports
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import GallerySlider from './components/GallerySlider';
import FittingScheduler from './components/FittingScheduler';
import MachineCatalog from './components/MachineCatalog';
import ContactForm from './components/ContactForm';
import InstagramFeed from './components/InstagramFeed';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-stone-50 select-text selection:bg-gold-200 selection:text-gold-950 font-sans antialiased text-stone-800 scroll-smooth">
      {/* Scrollable promo banner & Navigation bar */}
      <Navbar />

      <main>
        {/* Hero Designer section */}
        <Hero />

        {/* Boutique design portfolio showcase */}
        <GallerySlider />

        {/* Trial fitting appointment scheduler */}
        <FittingScheduler />

        {/* Sewing machinery & genuine spares catalog */}
        <MachineCatalog />

        {/* Instagram latest arrivals grid mockup */}
        <InstagramFeed />

        {/* Contact inquiry module */}
        <ContactForm />
      </main>

      {/* Double branches footer maps and contacts */}
      <Footer />
    </div>
  );
}
