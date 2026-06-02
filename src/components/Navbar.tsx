/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Scissors, LogOut, ChevronRight } from 'lucide-react';
import { User } from 'firebase/auth';

interface NavbarProps {
  user: User | null;
  needsAuth: boolean;
  isLoggingIn: boolean;
  onLogin: () => void;
  onLogout: () => void;
}

export default function Navbar({
  user,
  needsAuth,
  isLoggingIn,
  onLogin,
  onLogout
}: NavbarProps) {
  return (
    <header className="sticky top-0 z-50 bg-stone-50/90 backdrop-blur-md border-b border-gold-200">
      {/* Dynamic boutique banner ticker */}
      <div className="bg-amber-800 text-stone-100 py-1.5 px-4 text-xs font-display tracking-widest text-center flex items-center justify-center gap-2 overflow-hidden whitespace-nowrap">
        <span>✨ MEENAKSHI AMMAN TEMPLE - TOWN BRANCH & BYPASS BRANCH ACTIVE ✨</span>
        <span className="hidden md:inline">• PHONE BOOKINGS OPEN: +91 73971 33105</span>
        <span className="hidden lg:inline">• PREMIUM AARI EMBROIDERY & DESIGNER STITCHING</span>
      </div>

      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Brand logo details */}
        <a href="#home" className="flex items-center gap-2.5 group">
          <div className="bg-amber-100 border border-gold-400 p-2 rounded-full text-gold-700 transition-transform duration-300 group-hover:rotate-12">
            <Scissors className="w-5 h-5" />
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

        {/* Action controls (Auth + Anchor Links) */}
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

          {/* Authentic Google Sign In Implementation */}
          {user ? (
            <div className="flex items-center gap-3">
              <div className="flex flex-col items-end text-right">
                <span className="text-xs font-semibold text-stone-800 line-clamp-1">
                  {user.displayName || 'Authorized Client'}
                </span>
                <span className="text-[10px] text-green-700 font-mono flex items-center gap-1 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                  GDrive Connected
                </span>
              </div>
              <img
                src={user.photoURL || 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y'}
                alt={user.displayName || 'User Photo'}
                className="w-8 h-8 rounded-full border border-gold-300 object-cover"
                referrerPolicy="no-referrer"
              />
              <button
                onClick={onLogout}
                className="p-1.5 rounded-full text-stone-500 hover:text-red-700 hover:bg-stone-100 transition-colors"
                title="De-authorize Drive Access"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={onLogin}
              disabled={isLoggingIn}
              className="gsi-material-button text-xs py-1.5 h-auto transition-transform active:scale-95 border-gold-300"
            >
              <div className="gsi-material-button-state"></div>
              <div className="gsi-material-button-content-wrapper">
                <div className="gsi-material-button-icon">
                  <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" style={{ display: 'block' }}>
                    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                    <path fill="none" d="M0 0h48v48H0z"></path>
                  </svg>
                </div>
                <span className="gsi-material-button-contents font-display text-[11px] font-semibold tracking-wider">
                  {isLoggingIn ? 'Connecting...' : 'Connect Google Drive'}
                </span>
              </div>
            </button>
          )}
        </div>
      </nav>
    </header>
  );
}
