'use client';

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import type { StitchIcon } from '../data/stitchingGuide';

interface IconProps {
  className?: string;
}

/** Shared dashed "stitch" line used as a decorative running-thread accent. */
function StitchLine({ d, delay = 0 }: { d: string; delay?: number }) {
  return (
    <path
      d={d}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeDasharray="5 5"
      strokeLinecap="round"
      className="stitch-dash text-maroon-500"
      style={{ animationDelay: `${delay}s` }}
    />
  );
}

const frameProps = {
  viewBox: '0 0 200 200',
  className: 'w-full h-full',
  xmlns: 'http://www.w3.org/2000/svg',
};

function Measure({ className }: IconProps) {
  return (
    <svg {...frameProps} className={className}>
      <rect x="30" y="70" width="140" height="26" rx="6" fill="#fbf5e6" stroke="#bc7c31" strokeWidth="3" />
      {Array.from({ length: 12 }).map((_, i) => (
        <line key={i} x1={40 + i * 11} y1="70" x2={40 + i * 11} y2={i % 2 === 0 ? 84 : 78} stroke="#9c5f25" strokeWidth="1.5" />
      ))}
      <text x="100" y="88" textAnchor="middle" fontSize="10" fill="#663a1b" fontFamily="monospace">36 · 38 · 40</text>
      <StitchLine d="M30 130 Q100 155 170 130" delay={0.2} />
      <circle cx="30" cy="70" r="6" fill="#832836" />
      <circle cx="170" cy="70" r="6" fill="#832836" />
    </svg>
  );
}

function Pattern({ className }: IconProps) {
  return (
    <svg {...frameProps} className={className}>
      <rect x="35" y="30" width="130" height="140" rx="4" fill="#fdfbf7" stroke="#e0b66b" strokeWidth="3" />
      <path
        d="M60 60 Q100 40 140 60 L150 110 Q100 130 50 110 Z"
        fill="#f5e6c4"
        stroke="#9e3745"
        strokeWidth="2.5"
        strokeDasharray="6 4"
      />
      <line x1="55" y1="145" x2="145" y2="145" stroke="#bc7c31" strokeWidth="2" strokeDasharray="4 4" />
      <line x1="55" y1="155" x2="120" y2="155" stroke="#bc7c31" strokeWidth="2" strokeDasharray="4 4" />
      <circle cx="45" cy="45" r="4" fill="#832836" />
    </svg>
  );
}

function Cut({ className }: IconProps) {
  return (
    <svg {...frameProps} className={className}>
      <path d="M20 100 H150" stroke="#e0b66b" strokeWidth="18" strokeLinecap="round" opacity={0.5} />
      <StitchLine d="M20 100 H150" />
      <g className="scissor-anim" style={{ transformOrigin: '150px 100px' }}>
        <circle cx="150" cy="85" r="10" fill="none" stroke="#663a1b" strokeWidth="4" />
        <circle cx="150" cy="115" r="10" fill="none" stroke="#663a1b" strokeWidth="4" />
        <path d="M150 100 L185 78" stroke="#663a1b" strokeWidth="5" strokeLinecap="round" />
        <path d="M150 100 L185 122" stroke="#663a1b" strokeWidth="5" strokeLinecap="round" />
      </g>
    </svg>
  );
}

function Pin({ className }: IconProps) {
  return (
    <svg {...frameProps} className={className}>
      <rect x="40" y="60" width="120" height="90" rx="6" fill="#fbf5e6" stroke="#e0b66b" strokeWidth="3" />
      <StitchLine d="M50 75 H150" />
      <StitchLine d="M50 130 H150" delay={0.15} />
      {[70, 110, 150].map((x, i) => (
        <g key={x}>
          <line x1={x} y1="55" x2={x} y2="95" stroke="#40121b" strokeWidth="2.5" />
          <circle cx={x} cy="50" r="6" fill="#9e3745" />
        </g>
      ))}
    </svg>
  );
}

function Dart({ className }: IconProps) {
  return (
    <svg {...frameProps} className={className}>
      <path d="M60 40 L140 40 L100 165 Z" fill="#fdfbf7" stroke="#e0b66b" strokeWidth="3" />
      <StitchLine d="M80 55 L100 150" delay={0.1} />
      <StitchLine d="M120 55 L100 150" delay={0.25} />
      <circle cx="100" cy="150" r="4" fill="#832836" />
    </svg>
  );
}

function Machine({ className }: IconProps) {
  return (
    <svg {...frameProps} className={className}>
      <path d="M35 140 Q35 90 90 85 L150 80 Q165 78 165 95 L165 110 Q165 120 150 120 L120 120" fill="none" stroke="#663a1b" strokeWidth="6" strokeLinecap="round" />
      <rect x="30" y="140" width="145" height="12" rx="4" fill="#40121b" />
      <circle cx="118" cy="100" r="5" fill="#9e3745" />
      <line x1="118" y1="105" x2="118" y2="135" stroke="#9e3745" strokeWidth="3" />
      <StitchLine d="M50 152 H160" delay={0.2} />
    </svg>
  );
}

function Sleeve({ className }: IconProps) {
  return (
    <svg {...frameProps} className={className}>
      <path d="M70 40 Q100 25 130 40 L150 90 L115 105 L100 75 L85 105 L50 90 Z" fill="#f5e6c4" stroke="#bc7c31" strokeWidth="3" />
      <StitchLine d="M70 40 Q100 25 130 40" delay={0.1} />
      <StitchLine d="M50 90 L85 105" delay={0.25} />
      <StitchLine d="M150 90 L115 105" delay={0.35} />
    </svg>
  );
}

function Hook({ className }: IconProps) {
  return (
    <svg {...frameProps} className={className}>
      <rect x="55" y="30" width="20" height="140" rx="4" fill="#fdfbf7" stroke="#e0b66b" strokeWidth="2.5" />
      <rect x="125" y="30" width="20" height="140" rx="4" fill="#fdfbf7" stroke="#e0b66b" strokeWidth="2.5" />
      {[55, 95, 135].map((y, i) => (
        <g key={y}>
          <path d={`M75 ${y} Q95 ${y} 95 ${y + 12} Q95 ${y + 24} 75 ${y + 20}`} fill="none" stroke="#40121b" strokeWidth="3" />
          <circle cx="130" cy={y + 10} r="5" fill="none" stroke="#9c5f25" strokeWidth="2.5" />
        </g>
      ))}
    </svg>
  );
}

function HandStitch({ className }: IconProps) {
  return (
    <svg {...frameProps} className={className}>
      <path d="M30 110 Q100 60 170 110" fill="none" stroke="#e0b66b" strokeWidth="16" strokeLinecap="round" opacity={0.5} />
      <StitchLine d="M35 108 Q100 65 165 108" />
      <path d="M150 95 L175 80" stroke="#663a1b" strokeWidth="4" strokeLinecap="round" />
      <circle cx="175" cy="80" r="5" fill="#9e3745" />
    </svg>
  );
}

function Iron({ className }: IconProps) {
  return (
    <svg {...frameProps} className={className}>
      <path d="M45 150 L60 95 Q65 80 90 80 L140 80 Q160 80 160 105 L160 150 Z" fill="#f5e6c4" stroke="#663a1b" strokeWidth="3" />
      <rect x="80" y="55" width="45" height="28" rx="6" fill="#40121b" />
      <path className="steam-anim" d="M110 50 Q118 40 110 32 Q102 24 110 15" fill="none" stroke="#d49842" strokeWidth="3" strokeLinecap="round" opacity={0.7} />
      <path className="steam-anim" style={{ animationDelay: '0.4s' }} d="M130 50 Q138 40 130 32 Q122 24 130 15" fill="none" stroke="#d49842" strokeWidth="3" strokeLinecap="round" opacity={0.5} />
      <StitchLine d="M50 150 H155" delay={0.2} />
    </svg>
  );
}

function Zipper({ className }: IconProps) {
  return (
    <svg {...frameProps} className={className}>
      <rect x="90" y="30" width="20" height="140" rx="4" fill="#fdfbf7" stroke="#e0b66b" strokeWidth="2.5" />
      {Array.from({ length: 10 }).map((_, i) => (
        <line key={i} x1="90" y1={38 + i * 13} x2="110" y2={45 + i * 13} stroke="#663a1b" strokeWidth="2.5" />
      ))}
      <rect x="82" y="90" width="36" height="20" rx="4" fill="#9c5f25" />
      <circle cx="100" cy="115" r="5" fill="#40121b" />
    </svg>
  );
}

function Hem({ className }: IconProps) {
  return (
    <svg {...frameProps} className={className}>
      <path d="M35 60 L165 60 L165 120 Q100 140 35 120 Z" fill="#fdfbf7" stroke="#e0b66b" strokeWidth="3" />
      <path d="M35 120 Q100 140 165 120 L165 140 Q100 158 35 140 Z" fill="#f5e6c4" stroke="#bc7c31" strokeWidth="2.5" />
      <StitchLine d="M42 130 Q100 148 158 130" delay={0.15} />
    </svg>
  );
}

function Elastic({ className }: IconProps) {
  return (
    <svg {...frameProps} className={className}>
      <path
        d="M35 100 Q45 70 55 100 Q65 130 75 100 Q85 70 95 100 Q105 130 115 100 Q125 70 135 100 Q145 130 155 100"
        fill="none"
        stroke="#9e3745"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <StitchLine d="M35 130 H155" delay={0.2} />
    </svg>
  );
}

function Fold({ className }: IconProps) {
  return (
    <svg {...frameProps} className={className}>
      <path d="M40 60 H160 V110 H40 Z" fill="#fdfbf7" stroke="#e0b66b" strokeWidth="3" />
      <path d="M40 110 Q100 130 160 110 V140 Q100 160 40 140 Z" fill="#f5e6c4" stroke="#bc7c31" strokeWidth="2.5" />
      <path d="M60 90 L80 75 M60 90 L80 105" stroke="#832836" strokeWidth="3" strokeLinecap="round" fill="none" />
      <StitchLine d="M45 115 Q100 132 155 115" delay={0.2} />
    </svg>
  );
}

function Check({ className }: IconProps) {
  return (
    <svg {...frameProps} className={className}>
      <circle cx="100" cy="100" r="65" fill="#fbf5e6" stroke="#e0b66b" strokeWidth="4" strokeDasharray="8 6" />
      <path d="M70 102 L92 124 L132 78" fill="none" stroke="#832836" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" className="check-anim" />
    </svg>
  );
}

const ICONS: Record<StitchIcon, React.FC<IconProps>> = {
  measure: Measure,
  pattern: Pattern,
  cut: Cut,
  pin: Pin,
  dart: Dart,
  machine: Machine,
  sleeve: Sleeve,
  hook: Hook,
  'hand-stitch': HandStitch,
  iron: Iron,
  zipper: Zipper,
  hem: Hem,
  elastic: Elastic,
  fold: Fold,
  check: Check,
};

export default function StitchIllustration({ icon, className = '' }: { icon: StitchIcon; className?: string }) {
  const Cmp = ICONS[icon];
  return <Cmp className={className} />;
}
