'use client';

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { MapPin, Phone, Clock, Compass } from 'lucide-react';
import { BRANCHES_DATA } from '../data';
import { BranchDetails } from '../types';
import { getBranches } from '../services/sanityApi';
import ScrollReveal from './ScrollReveal';

export default function Footer() {
  // Branches come from Sanity; BRANCHES_DATA renders immediately while that loads.
  const [branches, setBranches] = useState<BranchDetails[]>(BRANCHES_DATA);

  useEffect(() => {
    let cancelled = false;
    getBranches().then((data) => {
      if (!cancelled && data.length > 0) setBranches(data);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <footer id="branches" className="bg-stone-900 text-stone-300 pt-16 pb-8 border-t-4 border-gold-500">
      <div className="absolute inset-0 tailor-pattern opacity-5 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Double branches bento showcase row */}
        <div className="mb-16">
          <div className="text-center md:text-left mb-10">
            <span className="text-[10px] font-display uppercase tracking-widest text-gold-400 font-bold mb-2 block">Our Locations Area</span>
            <h3 className="font-serif text-2xl md:text-3xl font-bold text-white leading-tight">
              Visit Our Boutique with Couching & Machinery Shops
            </h3>
            <p className="text-stone-400 text-xs font-sans mt-2">
              We have three branches in Thiruthuraipoondi. Each branch serves dedicated customer requirements.
            </p>
          </div>

          <ScrollReveal stagger className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {branches.map((branch, index) => (
              <div
                key={index}
                className="bg-stone-800/80 border border-gold-900/60 p-6 sm:p-8 rounded-3xl flex flex-col justify-between hover:bg-stone-800 transition-colors duration-300 relative"
              >
                {/* Decorative branch ID tag */}
                <span className="absolute top-6 right-6 text-[10px] font-display font-extrabold tracking-widest text-gold-500 uppercase bg-stone-900 px-3 py-1.5 rounded-full border border-gold-900">
                  Branch {index + 1}
                </span>

                <div>
                  <span className="text-gold-400 text-[10px] font-display tracking-widest uppercase font-extrabold mb-1 block">
                    {branch.city}
                  </span>
                  
                  <h4 className="font-serif text-lg font-bold text-white mb-6 pr-20">
                    {branch.name}
                  </h4>

                  <div className="space-y-4 text-xs font-sans text-stone-300">
                    <div className="flex gap-3">
                      <MapPin className="w-4 h-4 text-gold-500 shrink-0 mt-0.5" />
                      <p className="leading-relaxed">{branch.address}</p>
                    </div>

                    <div className="flex gap-3">
                      <Phone className="w-4 h-4 text-gold-500 shrink-0 mt-0.5" />
                      <a href={`tel:${branch.phone}`} className="hover:text-gold-400 transition-colors font-medium">
                        {branch.phone}
                      </a>
                    </div>

                    <div className="flex gap-3">
                      <Clock className="w-4 h-4 text-gold-500 shrink-0 mt-0.5" />
                      <p className="leading-relaxed">{branch.hours}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-stone-700/60">
                  <a
                    href={branch.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[10.5px] font-display uppercase tracking-widest text-gold-400 hover:text-gold-300 font-extrabold"
                  >
                    <Compass className="w-4 h-4" />
                    Open in Google Maps
                  </a>
                </div>
              </div>
            ))}
          </ScrollReveal>
        </div>

        {/* Outer bottom copyright deck */}
{/* Outer bottom copyright deck */}
<div className="border-t border-stone-800 pt-8 mt-12 flex flex-col md:flex-row items-center justify-between gap-6 text-stone-400 text-xs">
  
  {/* Trademark block */}
  <div className="flex items-center gap-3">
    <div className="w-9 h-9 rounded-full border border-gold-700/60 overflow-hidden shrink-0">
      <img
        src="/images/logo.png"
        alt="Abarnaa Tailoring Mart Logo"
        className="w-full h-full object-cover"
        referrerPolicy="no-referrer"
      />
    </div>
    <div className="flex flex-col">
      <span className="font-serif text-sm font-semibold text-white">
        Abarnaa Tailoring Mart
      </span>
      <span className="text-[9px] font-mono tracking-widest text-gold-500 uppercase font-bold mt-0.5">
        ESTD 2015 • THIRUTHURAIPOONDI
      </span>
    </div>
  </div>

  {/* Developer Credit */}
  <div className="flex items-center justify-center">
    <a
      href="https://abishek-portfolio.vercel.app"
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-2 px-4 py-2 rounded-full border border-stone-700 hover:border-gold-500 transition-all duration-300 bg-stone-800/50"
    >
      <span className="text-stone-400 text-[11px]">
        Made with ❤️ by
      </span>
      <span className="font-serif font-bold text-gold-500 group-hover:text-gold-400">
        Ravanaa
      </span>
    </a>
  </div>

  {/* Copyright block */}
  <p className="text-center md:text-right text-[10.5px]">
    &copy; {new Date().getFullYear()} Abarnaa Tailoring Mart. All rights reserved.
    <br />
    <span className="text-[9.5px] text-stone-600 block mt-1">
      Ladies Blouse Specialist & Sewing Machine Distributors | Secure Client Portal
    </span>
  </p>

</div>

      </div>
    </footer>
  );
}
