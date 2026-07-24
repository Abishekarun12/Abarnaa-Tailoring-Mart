/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Heart, MessageCircle, Instagram, ExternalLink, Sparkles } from 'lucide-react';
import { INSTAGRAM_ITEMS } from '../data';
import ScrollReveal from './ScrollReveal';

export default function InstagramFeed() {
  // Simple local state to simulate double tap liking for interactive luxury
  const [likes, setLikes] = useState<Record<string, { count: number; liked: boolean }>>(() => {
    const initial: Record<string, { count: number; liked: boolean }> = {};
    INSTAGRAM_ITEMS.forEach((item) => {
      initial[item.id] = { count: item.likes, liked: false };
    });
    return initial;
  });

  const handleLikeToggle = (itemId: string) => {
    setLikes((prev) => {
      const current = prev[itemId];
      if (current.liked) {
        return {
          ...prev,
          [itemId]: { count: current.count - 1, liked: false }
        };
      } else {
        return {
          ...prev,
          [itemId]: { count: current.count + 1, liked: true }
        };
      }
    });
  };

  return (
    <section className="py-20 bg-stone-100 border-b border-gold-200 relative overflow-hidden">
      <div className="absolute inset-0 tailor-pattern opacity-5 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Gallery Segment Heading */}
        <ScrollReveal className="flex flex-col sm:flex-row items-center sm:items-stretch sm:justify-between mb-12 gap-4">
          <div className="text-center sm:text-left">
            <span className="text-[11px] font-display uppercase tracking-widest text-gold-600 font-bold mb-1.5 block">Instagram Showcase</span>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-stone-900 flex items-center gap-2 justify-center sm:justify-start">
              <Instagram className="w-5 h-5 text-gold-600" />
              Latest Arrivals Studio Feed
            </h2>
          </div>

          <a
            href="https://www.instagram.com/abarnaa.tails?igsh=bjZ5bTZ2NTJqYTM5&utm_source=qr"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-full border border-gold-300 bg-white hover:bg-gold-50/50 text-gold-800 text-xs font-display font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-colors self-center shadow-sm"
          >
            <span>Follow @abarnaa.tails</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </ScrollReveal>

        {/* Showcase Grid */}
        <ScrollReveal stagger className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {INSTAGRAM_ITEMS.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl overflow-hidden border border-gold-200/60 shadow-md group flex flex-col justify-between"
            >
              {/* Header profile details */}
              <div className="p-4 flex items-center justify-between border-b border-stone-150">
                <div className="flex items-center gap-2.5">
                  <div className="bg-gradient-to-tr from-yellow-500 via-pink-500 to-purple-600 p-[1.5px] rounded-full">
                    <div className="bg-white p-[1px] rounded-full">
                      <img
                        src="/images/logo.png"
                        alt="Boutique Logo Profile Mini"
                        className="w-7 h-7 rounded-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xs font-display font-extrabold text-stone-800">abarnaa_tailoring_mart</h4>
                    <p className="text-[9px] text-stone-400 font-sans">Vedai Road, Thiruthuraipoondi</p>
                  </div>
                </div>

                <span className="text-[9px] font-mono text-stone-400 font-semibold bg-stone-100/80 px-2 py-0.5 rounded border border-stone-200/50">
                  {item.date}
                </span>
              </div>

              {/* Feed Image display */}
              <div 
                className="aspect-square relative overflow-hidden bg-stone-200 cursor-pointer"
                onDoubleClick={() => handleLikeToggle(item.id)}
              >
                <img
                  src={item.imageUrl}
                  alt="Aari designer blouse details"
                  className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />

                {/* Overlaid stats layout on hover */}
                <div className="absolute inset-0 bg-stone-900/45 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-6">
                  <div className="flex items-center gap-1.5 text-white font-display text-sm font-bold">
                    <Heart className="w-5 h-5 fill-current" />
                    <span>{likes[item.id].count}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-white font-display text-sm font-bold">
                    <MessageCircle className="w-5 h-5 fill-current" />
                    <span>{item.comments}</span>
                  </div>
                </div>

                <div className="absolute bottom-3 right-3 bg-white/70 backdrop-blur-sm p-1.5 rounded-full border border-gold-300 block group-hover:hidden transition-all shadow-sm">
                  <Sparkles className="w-3.5 h-3.5 text-gold-600 animate-pulse" />
                </div>
              </div>

              {/* Interaction icons bar */}
              <div className="p-4 flex-1 flex flex-col justify-between bg-stone-50/50">
                <div>
                  <div className="flex items-center gap-4 mb-3">
                    <button
                      onClick={() => handleLikeToggle(item.id)}
                      className="transition-transform active:scale-90"
                    >
                      <Heart className={`w-5 h-5 ${likes[item.id].liked ? 'text-red-500 fill-red-500' : 'text-stone-700 hover:text-red-500'}`} />
                    </button>
                    <button className="text-stone-700 hover:text-maroon-800 transition-colors">
                      <MessageCircle className="w-5 h-5" />
                    </button>
                  </div>

                  <p className="text-xs font-display font-extrabold text-stone-800 mb-1.5 h-4 select-none">
                    {likes[item.id].count} Likes
                  </p>

                  <p className="text-xs text-stone-600 font-sans leading-relaxed line-clamp-3">
                    <span className="font-display font-extrabold text-stone-800 mr-1.5">abarnaa_tailoring_mart</span>
                    {item.caption}
                  </p>
                </div>

                <p className="text-[10px] text-gold-600 font-display font-bold uppercase tracking-wider border-t border-gold-200/50 pt-2.5 mt-4">
                  #AbarnaaBridalSignature
                </p>
              </div>
            </div>
          ))}
        </ScrollReveal>

      </div>
    </section>
  );
}
