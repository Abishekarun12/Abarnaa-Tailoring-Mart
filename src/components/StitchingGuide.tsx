'use client';

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Clock, Gauge, Languages, ListChecks, RotateCcw, Sparkles } from 'lucide-react';
import { STITCHING_CATEGORIES, UI_TEXT, type Lang, type Bilingual } from '../data/stitchingGuide';
import StitchIllustration from './StitchingIcons';
import ScrollReveal from './ScrollReveal';

const LANG_STORAGE_KEY = 'atm-stitch-lang';

function useBilingual(lang: Lang) {
  return (text: Bilingual) => text[lang];
}

export default function StitchingGuide() {
  const [lang, setLang] = useState<Lang>('en');
  const [categoryId, setCategoryId] = useState(STITCHING_CATEGORIES[0].id);
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    const saved = window.localStorage.getItem(LANG_STORAGE_KEY);
    if (saved === 'en' || saved === 'ta') setLang(saved);
  }, []);

  const toggleLang = (next: Lang) => {
    setLang(next);
    window.localStorage.setItem(LANG_STORAGE_KEY, next);
  };

  const t = useBilingual(lang);
  const category = useMemo(
    () => STITCHING_CATEGORIES.find((c) => c.id === categoryId) ?? STITCHING_CATEGORIES[0],
    [categoryId]
  );
  const totalSteps = category.steps.length;
  const isFinished = stepIndex >= totalSteps;
  const step = category.steps[Math.min(stepIndex, totalSteps - 1)];

  const selectCategory = (id: string) => {
    setCategoryId(id);
    setStepIndex(0);
  };

  return (
    <section id="learn-stitching" className="py-20 bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header + language toggle */}
        <ScrollReveal className="text-center max-w-3xl mx-auto mb-12 relative">
          <div className="flex justify-center mb-4">
            <div className="inline-flex items-center rounded-full border border-gold-300 bg-white p-1 shadow-sm">
              <button
                onClick={() => toggleLang('en')}
                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-display font-semibold tracking-wide transition-colors ${
                  lang === 'en' ? 'bg-maroon-800 text-stone-50' : 'text-stone-500 hover:text-maroon-700'
                }`}
              >
                <Languages className="w-3.5 h-3.5" />
                English
              </button>
              <button
                onClick={() => toggleLang('ta')}
                className={`px-4 py-1.5 rounded-full text-xs font-display font-semibold tracking-wide transition-colors ${
                  lang === 'ta' ? 'bg-maroon-800 text-stone-50' : 'text-stone-500 hover:text-maroon-700'
                }`}
              >
                தமிழ்
              </button>
            </div>
          </div>

          <span className="text-[11px] font-display uppercase tracking-widest text-gold-600 font-semibold mb-2 block">
            {t(UI_TEXT.eyebrow)}
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-stone-950 mb-4">{t(UI_TEXT.title)}</h2>
          <div className="h-[2px] w-16 bg-gold-400 mx-auto mb-4"></div>
          <p className="text-stone-600 text-sm font-sans leading-relaxed">{t(UI_TEXT.subtitle)}</p>
        </ScrollReveal>

        {/* Category picker */}
        <ScrollReveal delay={0.1} className="mb-10">
          <h3 className="text-center font-display text-xs uppercase tracking-widest text-stone-500 font-bold mb-5">
            {t(UI_TEXT.chooseCategory)}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 max-w-4xl mx-auto">
            {STITCHING_CATEGORIES.map((c) => {
              const active = c.id === categoryId;
              return (
                <button
                  key={c.id}
                  onClick={() => selectCategory(c.id)}
                  className={`text-left p-3.5 md:p-4 rounded-xl border transition-all ${
                    active
                      ? 'border-gold-500 bg-white shadow-md scale-[1.02]'
                      : 'border-gold-200 bg-white/60 hover:border-gold-400 hover:bg-white'
                  }`}
                >
                  <div className={`w-9 h-9 mb-2.5 ${active ? 'text-maroon-700' : 'text-gold-500'}`}>
                    <StitchIllustration icon={c.steps[0].icon} />
                  </div>
                  <div className="font-display text-xs md:text-sm font-bold text-stone-800 leading-tight">
                    {t(c.name)}
                  </div>
                  <div className="text-[10px] text-stone-500 mt-1 font-sans">{t(c.difficulty)}</div>
                </button>
              );
            })}
          </div>
        </ScrollReveal>

        {/* Active category: tagline + materials + stepper */}
        <AnimatePresence mode="wait">
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-6xl mx-auto"
          >
            {/* Sidebar: category info + materials */}
            <div className="lg:col-span-4 space-y-4">
              <div className="bg-white rounded-2xl border border-gold-200 p-5 shadow-sm">
                <h4 className="font-serif text-xl font-bold text-stone-900 mb-1.5">{t(category.name)}</h4>
                <p className="text-xs text-stone-600 leading-relaxed mb-4">{t(category.tagline)}</p>
                <div className="flex gap-3 mb-4">
                  <div className="flex-1 bg-stone-50 rounded-lg border border-gold-100 p-2.5 text-center">
                    <Gauge className="w-3.5 h-3.5 text-gold-600 mx-auto mb-1" />
                    <div className="text-[9px] uppercase tracking-wider text-stone-400 font-display font-bold">
                      {t(UI_TEXT.difficulty)}
                    </div>
                    <div className="text-[11px] font-semibold text-stone-700">{t(category.difficulty)}</div>
                  </div>
                  <div className="flex-1 bg-stone-50 rounded-lg border border-gold-100 p-2.5 text-center">
                    <Clock className="w-3.5 h-3.5 text-gold-600 mx-auto mb-1" />
                    <div className="text-[9px] uppercase tracking-wider text-stone-400 font-display font-bold">
                      {t(UI_TEXT.time)}
                    </div>
                    <div className="text-[11px] font-semibold text-stone-700">{t(category.time)}</div>
                  </div>
                </div>

                <h5 className="flex items-center gap-1.5 text-[11px] font-display uppercase tracking-wider text-stone-400 font-bold mb-2.5">
                  <ListChecks className="w-3.5 h-3.5" />
                  {t(UI_TEXT.materialsNeeded)}
                </h5>
                <ul className="space-y-1.5">
                  {category.materials.map((m, i) => (
                    <li key={i} className="text-xs text-stone-700 flex items-start gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold-400 mt-1.5 shrink-0"></span>
                      {t(m)}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Step dots overview */}
              <div className="bg-white rounded-2xl border border-gold-200 p-4 shadow-sm">
                <div className="flex flex-wrap gap-2">
                  {category.steps.map((s, i) => (
                    <button
                      key={s.id}
                      onClick={() => setStepIndex(i)}
                      title={t(s.title)}
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-display font-bold border transition-colors ${
                        i === stepIndex && !isFinished
                          ? 'bg-maroon-800 text-stone-50 border-maroon-800'
                          : i < stepIndex || isFinished
                          ? 'bg-gold-100 text-gold-700 border-gold-300'
                          : 'bg-stone-50 text-stone-400 border-gold-200'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Main step viewer */}
            <div className="lg:col-span-8">
              <div className="bg-white rounded-2xl border border-gold-200 shadow-md overflow-hidden">
                <AnimatePresence mode="wait">
                  {!isFinished ? (
                    <motion.div
                      key={step.id}
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -24 }}
                      transition={{ duration: 0.35, ease: 'easeOut' }}
                      className="grid grid-cols-1 md:grid-cols-2 items-stretch"
                    >
                      {/* Illustration */}
                      <div className="relative bg-gradient-to-br from-gold-50 to-stone-100 border-b md:border-b-0 md:border-r border-gold-200 p-8 flex items-center justify-center min-h-[260px]">
                        <div className="absolute inset-0 tailor-pattern pointer-events-none" />
                        <div className="w-40 h-40 md:w-48 md:h-48 relative z-10">
                          <StitchIllustration icon={step.icon} />
                        </div>
                      </div>

                      {/* Text */}
                      <div className="p-6 md:p-8 flex flex-col justify-center">
                        <span className="text-[10px] font-display tracking-widest text-gold-600 uppercase font-bold mb-1.5 block">
                          {t(UI_TEXT.step)} {stepIndex + 1} {t(UI_TEXT.of)} {totalSteps}
                        </span>
                        <h4 className="font-serif text-xl md:text-2xl font-bold text-stone-900 mb-3 tracking-tight">
                          {t(step.title)}
                        </h4>
                        <p className="text-stone-600 text-sm leading-relaxed mb-4">{t(step.detail)}</p>
                        {step.tip && (
                          <div className="flex gap-2 items-start bg-gold-50 border border-gold-200 rounded-lg p-3">
                            <Sparkles className="w-4 h-4 text-gold-600 shrink-0 mt-0.5" />
                            <p className="text-xs text-gold-800 leading-relaxed">
                              <span className="font-bold font-display uppercase tracking-wide">{t(UI_TEXT.proTip)}: </span>
                              {t(step.tip)}
                            </p>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="done"
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.35 }}
                      className="p-10 flex flex-col items-center text-center gap-4 min-h-[320px] justify-center"
                    >
                      <div className="w-20 h-20 text-maroon-700">
                        <StitchIllustration icon="check" />
                      </div>
                      <h4 className="font-serif text-2xl font-bold text-stone-900">{t(UI_TEXT.allDone)}</h4>
                      <p className="text-stone-600 text-sm max-w-md leading-relaxed">{t(UI_TEXT.allDoneSub)}</p>
                      <p className="text-xs text-stone-500 max-w-sm">{t(UI_TEXT.needHelp)}</p>
                      <div className="flex flex-wrap gap-3 justify-center mt-2">
                        <button
                          onClick={() => setStepIndex(0)}
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-gold-300 text-stone-700 hover:bg-stone-50 font-display text-xs font-semibold uppercase tracking-wider transition-colors"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          {t(UI_TEXT.restart)}
                        </button>
                        <a
                          href="/#calendar"
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-maroon-800 hover:bg-maroon-900 text-stone-50 font-display text-xs font-semibold uppercase tracking-wider transition-colors shadow-sm"
                        >
                          {t(UI_TEXT.bookFitting)}
                        </a>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Progress bar */}
                <div className="h-1 bg-stone-100">
                  <motion.div
                    className="h-full bg-gradient-to-r from-gold-400 to-maroon-600"
                    animate={{ width: `${(Math.min(stepIndex, totalSteps) / totalSteps) * 100}%` }}
                    transition={{ duration: 0.35 }}
                  />
                </div>

                {/* Controls */}
                {!isFinished && (
                  <div className="flex items-center justify-between px-6 py-4 border-t border-gold-100">
                    <button
                      onClick={() => setStepIndex((i) => Math.max(0, i - 1))}
                      disabled={stepIndex === 0}
                      className="inline-flex items-center gap-1 text-xs font-display font-semibold uppercase tracking-wider text-stone-500 hover:text-maroon-700 disabled:opacity-30 disabled:hover:text-stone-500 transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      {t(UI_TEXT.prev)}
                    </button>
                    <button
                      onClick={() => setStepIndex((i) => Math.min(totalSteps, i + 1))}
                      className="inline-flex items-center gap-1 px-4 py-2 rounded-full bg-maroon-800 hover:bg-maroon-900 text-stone-50 font-display text-xs font-semibold uppercase tracking-wider transition-colors shadow-sm"
                    >
                      {t(UI_TEXT.next)}
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
