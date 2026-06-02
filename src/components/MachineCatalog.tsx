/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Settings, PenTool, CheckCircle, Tag, Sparkles } from 'lucide-react';
import { SEWING_PRODUCTS } from '../data';

export default function MachineCatalog() {
  const [activeCategory, setActiveCategory] = useState<'all' | 'machine' | 'spare'>('all');

  // Filtered lists logic
  const filteredProducts = SEWING_PRODUCTS.filter((prod) => {
    if (activeCategory === 'all') return true;
    return prod.type === activeCategory;
  });

  return (
    <section id="catalog" className="py-20 bg-stone-50 border-t border-b border-gold-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Machinery Banner Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          <div className="lg:col-span-7 flex flex-col items-start">
            <span className="text-[11px] font-display uppercase tracking-widest text-gold-600 font-bold mb-2">Original Sewing Spares & Mechanics</span>
            <div className="inline-flex items-center gap-1 text-xs text-amber-800 font-display font-semibold uppercase bg-amber-100 px-3 py-1 rounded-full mb-4 border border-gold-200">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Official Showroom & Dealership</span>
            </div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-stone-900 mb-6">
              Premium Sewing Machinery & Spares
            </h2>
            <div className="h-[2px] w-16 bg-gold-400 mb-6"></div>
            <p className="text-stone-600 text-sm font-sans leading-relaxed max-w-xl">
              Beyond master bridal couture, Abarnaa Tailoring Mart is Thiruthuraipoondi's trusted partner for modern sewing machinery sales and genuine mechanical spare parts. 
              We stock standard bobbins, heavy duty motors, genuine carbon hooks, and computerized automatic zig-zag machines from global giants like Usha and Singer with complete warranty coverage.
            </p>
          </div>

          {/* Banner Graphic Frame */}
          <div className="lg:col-span-5 relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-lg border-4 border-white stitch-border">
              <img
                src="/images/sewing_machine_catalog_1780409491706.png"
                alt="Boutique Sewing Machine Assembly and threads"
                className="w-full h-full object-cover select-none"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>

        {/* Categories selector anchors */}
        <div className="flex justify-center gap-3 mb-12">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-5 py-2 rounded-full font-display text-xs uppercase tracking-wider font-semibold border transition-all ${
              activeCategory === 'all'
                ? 'bg-amber-800 border-amber-800 text-stone-50 shadow-sm'
                : 'bg-white border-gold-300 text-stone-700 hover:bg-gold-50/50'
            }`}
          >
            All Inventory
          </button>
          <button
            onClick={() => setActiveCategory('machine')}
            className={`px-5 py-2 rounded-full font-display text-xs uppercase tracking-wider font-semibold border transition-all ${
              activeCategory === 'machine'
                ? 'bg-amber-800 border-amber-800 text-stone-50 shadow-sm'
                : 'bg-white border-gold-300 text-stone-700 hover:bg-gold-50/50'
            }`}
          >
            Mechanical & Auto Machines
          </button>
          <button
            onClick={() => setActiveCategory('spare')}
            className={`px-5 py-2 rounded-full font-display text-xs uppercase tracking-wider font-semibold border transition-all ${
              activeCategory === 'spare'
                ? 'bg-amber-800 border-amber-800 text-stone-50 shadow-sm'
                : 'bg-white border-gold-300 text-stone-700 hover:bg-gold-50/50'
            }`}
          >
            Tailoring Spares & Accs
          </button>
        </div>

        {/* Machinery Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((prod) => (
            <motion.div
              layout
              key={prod.id}
              className="bg-white rounded-2xl border border-gold-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              {/* Product Visual Container */}
              <div className="relative aspect-[4/3] bg-stone-100 overflow-hidden border-b border-stone-100">
                <img
                  src={prod.imageUrl}
                  alt={prod.name}
                  className="w-full h-full object-cover p-3 rounded-2xl grayscale hover:grayscale-0 transition-all duration-500"
                  referrerPolicy="no-referrer"
                />
                <span className={`absolute top-3 right-3 text-[9px] font-display uppercase font-bold tracking-wider px-2 py-1 rounded shadow-sm ${
                  prod.type === 'machine' ? 'bg-amber-800 text-white' : 'bg-gold-200 text-gold-900 border border-gold-400'
                }`}>
                  {prod.type === 'machine' ? 'Sewing Machine' : 'Genuine Spares'}
                </span>
                
                {/* Brand label */}
                <span className="absolute bottom-3 left-3 bg-stone-900/60 backdrop-blur-sm text-white px-2 py-0.5 text-[9px] font-mono rounded tracking-wider uppercase font-semibold">
                  {prod.brand}
                </span>
              </div>

              {/* Product specs writeup */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-serif font-bold text-stone-800 text-base mb-1.5 leading-tight hover:text-gold-600 transition-colors">
                    {prod.name}
                  </h4>
                  <p className="text-stone-500 text-xs font-sans leading-relaxed mb-4">
                    {prod.description}
                  </p>
                </div>

                <div>
                  {/* Price range indicator */}
                  <div className="flex items-center gap-1 text-gold-700 font-display font-black text-sm mb-4 bg-gold-100/50 py-1.5 px-3 rounded-lg border border-gold-200/50 w-fit">
                    <Tag className="w-3.5 h-3.5 text-gold-600" />
                    <span>Estimated: {prod.priceRange}</span>
                  </div>

                  {/* Specs microbullets */}
                  <div className="border-t border-gold-150 pt-3">
                    <h5 className="text-[9px] font-display uppercase tracking-widest text-stone-400 font-extrabold mb-2">Technical Stats</h5>
                    <ul className="space-y-1">
                      {prod.specs.map((spec, index) => (
                        <li key={index} className="text-[10.5px] text-stone-600 font-sans flex items-center gap-1.5 font-medium">
                          <CheckCircle className="w-3 h-3 text-gold-500 shrink-0" />
                          <span>{spec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Dynamic call-out */}
        <div className="mt-12 bg-amber-800 text-stone-100 p-6 sm:p-8 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-6 stitch-border border-gold-400">
          <div className="flex flex-col sm:items-start text-center sm:text-left">
            <h4 className="font-serif text-lg font-bold">In search of bulk spares or a specific industrial model?</h4>
            <p className="text-stone-200 text-xs font-sans leading-tight mt-1 max-w-lg">
              We supply tailor shops, sewing training institutes, and small-scale garment units across Tamil Nadu. Contact us below for tailor-made quotation parameters.
            </p>
          </div>
          <a
            href="#contact"
            className="bg-white text-amber-900 font-display font-semibold text-xs py-3 px-6 rounded-full hover:bg-gold-50 uppercase tracking-widest shadow transition-transform active:scale-95 shrink-0"
          >
            Get Custom Quote
          </a>
        </div>

      </div>
    </section>
  );
}
