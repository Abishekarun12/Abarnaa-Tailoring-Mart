'use client';

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { StaticBlouse, DEFAULT_BLOUSES } from '../data';
import { getBlouses } from '../services/sanityApi';
import ScrollReveal from './ScrollReveal';

export default function GallerySlider() {
  // Blouses come from Sanity; DEFAULT_BLOUSES renders immediately while that loads.
  const [blouses, setBlouses] = useState<StaticBlouse[]>(DEFAULT_BLOUSES);
  const [activeIndex, setActiveIndex] = useState(0);
  const autoPlayRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    let cancelled = false;
    getBlouses().then((data) => {
      if (!cancelled && data.length > 0) {
        setBlouses(data);
        setActiveIndex(0);
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);

  // Manage auto-scrolling interval for the blouse showcase
  const nextSlide = () => {
    setActiveIndex((prev) => (prev === blouses.length - 1 ? 0 : prev + 1));
  };
  const prevSlide = () => {
    setActiveIndex((prev) => (prev === 0 ? blouses.length - 1 : prev - 1));
  };

  autoPlayRef.current = nextSlide;

  useEffect(() => {
    const play = () => {
      if (autoPlayRef.current) autoPlayRef.current();
    };
    const interval = setInterval(play, 4000); // 4 seconds auto-scroll
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="gallery" className="py-20 bg-stone-50 border-t border-b border-gold-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Heading */}
        <ScrollReveal className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[11px] font-display uppercase tracking-widest text-gold-600 font-semibold mb-2 block">Our Design Portfolio</span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-stone-950 mb-4">The Designer Blouse Showcase</h2>
          <div className="h-[2px] w-16 bg-gold-400 mx-auto mb-4"></div>
          <p className="text-stone-600 text-sm font-sans leading-relaxed">
            Take a look at our premier collection of custom fitted designer blouses, delicate hand-woven
            Aari embroidery, and wedding designs. Our portfolio auto-scrolls through hand-selected favorites.
          </p>
        </ScrollReveal>

        {/* Dynamic Auto-scrolling Carousel */}
        <ScrollReveal delay={0.1} className="relative bg-stone-100 rounded-2xl overflow-hidden border border-gold-300 shadow-xl max-w-5xl mx-auto">
          <div className="absolute inset-0 tailor-pattern pointer-events-none" />

          <div className="grid grid-cols-1 md:grid-cols-12 min-h-[420px] items-stretch relative z-10">
            {/* Image display side */}
            <div className="md:col-span-6 relative aspect-square md:aspect-auto overflow-hidden bg-stone-200 border-b md:border-b-0 md:border-r border-gold-300">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeIndex}
                  src={blouses[activeIndex].imageUrl}
                  alt={blouses[activeIndex].name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.5 }}
                  className="w-full h-full object-cover absolute inset-0 select-none"
                  referrerPolicy="no-referrer"
                />
              </AnimatePresence>

              {/* Carousel Arrows */}
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-stone-50/80 hover:bg-white text-stone-800 p-2 rounded-full border border-gold-200 transition-all hover:scale-105 active:scale-95"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-stone-50/80 hover:bg-white text-stone-800 p-2 rounded-full border border-gold-200 transition-all hover:scale-105 active:scale-95"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Floating index indicator */}
              <div className="absolute bottom-4 left-4 bg-stone-900/40 backdrop-blur-sm text-stone-50 px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider">
                {activeIndex + 1} / {blouses.length}
              </div>
            </div>

            {/* Spec details specs side */}
            <div className="md:col-span-6 p-6 md:p-10 flex flex-col justify-center bg-stone-50">
              <span className="text-[10px] font-display tracking-widest text-gold-600 uppercase font-bold mb-1.5 block">
                {blouses[activeIndex].collection}
              </span>
              <h3 className="font-serif text-2xl font-bold text-stone-900 mb-4 tracking-tight">
                {blouses[activeIndex].name}
              </h3>
              <p className="text-stone-600 text-sm leading-relaxed mb-6">
                {blouses[activeIndex].description}
              </p>

              <div>
                <h4 className="text-[11px] font-display uppercase tracking-wider text-stone-400 font-bold mb-3">Stitching Specs & Fabric</h4>
                <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
                  {blouses[activeIndex].specs.map((spec, i) => (
                    <li key={i} className="text-xs text-stone-700 flex items-center gap-1.5 font-display font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold-400"></span>
                      {spec}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
