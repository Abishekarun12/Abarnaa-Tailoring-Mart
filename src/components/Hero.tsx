/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Calendar, ArrowDown, ShieldCheck } from 'lucide-react';

export default function Hero() {
  return (
    <section id="home" className="relative bg-stone-100 overflow-hidden py-16 md:py-24">
      {/* Delicate background sewing line patterns */}
      <div className="absolute inset-0 tailor-pattern" />
      
      {/* Decorative vertical satin strips */}
      <div className="absolute top-0 right-10 w-[1px] h-full bg-gold-300 hidden md:block" />
      <div className="absolute top-0 right-20 w-[1px] h-full bg-gold-200 hidden md:block" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Texts Column */}
        <div className="lg:col-span-7 flex flex-col items-start">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-gold-300 bg-gold-50/70 text-gold-700 font-display text-xs font-semibold uppercase tracking-widest mb-6"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Thiruthuraipoondi's Premier Ladies Couture</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-stone-900 leading-[1.08] mb-6"
          >
            Design, Stich & <br />
            <span className="text-gold-600 italic">Embark in Elegance</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-stone-600 text-sm md:text-base font-sans leading-relaxed max-w-xl mb-8"
          >
            Welcome to <strong>Abarnaa Tailoring Mart</strong>—where we turn fine fabrics into works of art. 
            We specialize in bespoke custom blouses, stunning bridal Aari work, master ladies stitching, 
            and supply genuine high-speed sewing machines & accessories across two premium showrooms in Madurai.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
          >
            <a
              href="#calendar"
              className="px-6 py-3.5 rounded-full bg-amber-800 text-stone-50 font-display font-medium text-xs uppercase tracking-widest hover:bg-amber-900 transition-all flex items-center justify-center gap-2 shadow-md hover:-translate-y-0.5 active:translate-y-0"
            >
              <Calendar className="w-4 h-4" />
              Book Fitting Session
            </a>
            <a
              href="#gallery"
              className="px-6 py-3.5 rounded-full border border-gold-400 text-gold-800 bg-gold-100/30 hover:bg-gold-100/60 font-display font-medium text-xs uppercase tracking-widest transition-all text-center flex items-center justify-center gap-1.5"
            >
              Explore Collection
              <ArrowDown className="w-3.5 h-3.5" />
            </a>
          </motion.div>

          {/* Social Proof/Capabilities list */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mt-12 grid grid-cols-2 gap-6 pt-8 border-t border-gold-200/60 w-full"
          >
            <div className="flex items-start gap-2.5">
              <ShieldCheck className="w-5 h-5 text-gold-600 shrink-0 mt-0.5" />
              <div>
                <dt className="text-xs font-serif font-bold text-stone-800">100% Cotton Lining</dt>
                <dd className="text-[11px] text-stone-500 font-sans leading-tight">Comfort and durability for ladies wear</dd>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <ShieldCheck className="w-5 h-5 text-gold-600 shrink-0 mt-0.5" />
              <div>
                <dt className="text-xs font-serif font-bold text-stone-800">Original Machinery</dt>
                <dd className="text-[11px] text-stone-500 font-sans leading-tight">Usha & Singer spares with warranties</dd>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Hero Visual Image Display */}
        <div className="lg:col-span-5 relative w-full flex justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative max-w-md w-full aspect-square border-8 border-white rounded-2xl shadow-xl overflow-hidden stitch-border"
          >
            <img
              src="/images/bridal_blouse_aari_1780409427966.png"
              alt="Intricate Bridal Aari Embroidery Blouse"
              className="w-full h-full object-cover select-none"
              referrerPolicy="no-referrer"
            />
            
            {/* Elegant overlay badge */}
            <div className="absolute bottom-6 left-6 right-6 bg-stone-50/90 backdrop-blur-sm border border-gold-300 p-4 rounded-xl flex items-center justify-between">
              <div>
                <p className="text-[10px] font-display uppercase tracking-widest text-gold-600 font-semibold mb-0.5">Featured Work</p>
                <h4 className="font-serif text-sm font-bold text-stone-800">Crimson Royal Bridal Blouse</h4>
              </div>
              <span className="text-[10px] font-mono text-stone-500 font-semibold uppercase bg-stone-200/50 px-2.5 py-1 rounded">Handmade</span>
            </div>
          </motion.div>

          {/* Floating design frame decoration */}
          <div className="absolute -top-4 -left-4 w-12 h-12 border-t-2 border-l-2 border-gold-500 hidden md:block"></div>
          <div className="absolute -bottom-4 -right-4 w-12 h-12 border-b-2 border-r-2 border-gold-500 hidden md:block"></div>
        </div>
      </div>
    </section>
  );
}
