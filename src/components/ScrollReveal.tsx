/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useEffect, ReactNode } from 'react';
import { gsap, prefersReducedMotion } from '../lib/gsap';

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  direction?: 'up' | 'left' | 'right';
  delay?: number;
  /** Stagger the direct children in rather than animating this element as one block. */
  stagger?: boolean;
}

const OFFSETS: Record<NonNullable<ScrollRevealProps['direction']>, { x: number; y: number }> = {
  up: { x: 0, y: 40 },
  left: { x: -40, y: 0 },
  right: { x: 40, y: 0 },
};

export default function ScrollReveal({
  children,
  className = '',
  direction = 'up',
  delay = 0,
  stagger = false,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    const offset = OFFSETS[direction];
    const targets = stagger ? Array.from(el.children) : el;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { opacity: 0, x: offset.x, y: offset.y },
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration: 0.8,
          delay,
          ease: 'power3.out',
          stagger: stagger ? 0.12 : 0,
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            once: true,
          },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, [direction, delay, stagger]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
