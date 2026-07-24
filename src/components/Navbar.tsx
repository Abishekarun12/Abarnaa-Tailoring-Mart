/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Calendar, Phone } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-stone-50/90 backdrop-blur-md border-b border-gold-200">
      {/* Dynamic boutique banner ticker */}
      <div className="bg-maroon-900 text-stone-100 py-1.5 px-4 text-xs font-display tracking-widest text-center flex items-center justify-center gap-2 overflow-hidden whitespace-nowrap">
        <span>✨ Town Branch & Samiyappa Nagar Branch Active ✨</span>
        <span className="hidden md:inline">• PHONE BOOKINGS OPEN: +91 73971 33105</span>
        <span className="hidden lg:inline">• PREMIUM AARI EMBROIDERY & DESIGNER STITCHING</span>
      </div>

      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Brand logo details */}
        <a href="#home" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-full border border-gold-400 shadow-sm overflow-hidden shrink-0 transition-transform duration-300 group-hover:rotate-12">
            <img
              src="/images/logo.png"
              alt="Abarnaa Tailoring Mart Logo"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-lg leading-tight md:text-xl font-bold tracking-tight text-stone-800">
              Abarnaa Tailoring Mart
            </span>
            <span className="text-[10px] font-display tracking-widest text-gold-600 uppercase font-semibold">
              Ladies Designer Boutique & Machinery Spares
            </span>
          </div>
        </a>

        {/* Action controls (Anchor Links + CTA) */}
        <div className="flex items-center gap-4">
          <ul className="hidden md:flex items-center gap-6 font-display text-xs font-medium tracking-wider text-stone-600 uppercase">
            <li>
              <a href="#about" className="hover:text-gold-600 transition-colors">About</a>
            </li>
            <li>
              <a href="#gallery" className="hover:text-gold-600 transition-colors">Boutique Gallery</a>
            </li>
            <li>
              <a href="#calendar" className="hover:text-gold-600 transition-colors">Book Fitting</a>
            </li>
            <li>
              <a href="#catalog" className="hover:text-gold-600 transition-colors">Machinery Catalog</a>
            </li>
            <li>
              <a href="#branches" className="hover:text-gold-600 transition-colors">Branches</a>
            </li>
          </ul>

          <div className="border-l border-gold-200 pl-4 h-6 hidden md:block"></div>

          <div className="flex items-center gap-2.5">
            <a
              href="tel:+917397133105"
              className="hidden sm:inline-flex p-2 rounded-full text-stone-500 hover:text-maroon-800 hover:bg-stone-100 transition-colors"
              title="Call Abarnaa Tailoring Mart"
            >
              <Phone className="w-4 h-4" />
            </a>
            <a
              href="#calendar"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-maroon-800 hover:bg-maroon-900 text-stone-50 font-display text-xs font-semibold uppercase tracking-wider transition-colors shadow-sm"
            >
              <Calendar className="w-3.5 h-3.5" />
              Book Fitting
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}
