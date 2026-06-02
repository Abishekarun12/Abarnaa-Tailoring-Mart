/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { initAuth, googleSignIn, logoutUser } from './services/firebase';

// Subcomponents imports
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import GallerySlider from './components/GallerySlider';
import FittingScheduler from './components/FittingScheduler';
import MachineCatalog from './components/MachineCatalog';
import ContactForm from './components/ContactForm';
import InstagramFeed from './components/InstagramFeed';
import Footer from './components/Footer';

export default function App() {
  // Session details stored in safe React state hook
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [needsAuth, setNeedsAuth] = useState(true);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Initialize Auth listeners on app boot
  useEffect(() => {
    const unsubscribe = initAuth(
      (currentUser, token) => {
        setUser(currentUser);
        setAccessToken(token);
        setNeedsAuth(false);
      },
      () => {
        setUser(null);
        setAccessToken(null);
        setNeedsAuth(true);
      }
    );

    return () => {
      if (typeof unsubscribe === 'function') {
        unsubscribe();
      }
    };
  }, []);

  // Login popup trigger
  const handleGoogleLogin = async () => {
    setIsLoggingIn(true);
    try {
      const result = await googleSignIn();
      if (result) {
        setUser(result.user);
        setAccessToken(result.accessToken);
        setNeedsAuth(false);
      }
    } catch (err) {
      console.error('Boutique login failed:', err);
    } finally {
      setIsLoggingIn(false);
    }
  };

  // Sign out cleanup trigger
  const handleBoutiqueSignOut = async () => {
    try {
      await logoutUser();
      setUser(null);
      setAccessToken(null);
      setNeedsAuth(true);
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 select-text selection:bg-gold-200 selection:text-gold-950 font-sans antialiased text-stone-800 scroll-smooth">
      {/* Scrollable promo banner & Navigation bar */}
      <Navbar
        user={user}
        needsAuth={needsAuth}
        isLoggingIn={isLoggingIn}
        onLogin={handleGoogleLogin}
        onLogout={handleBoutiqueSignOut}
      />

      <main>
        {/* Hero Designer section */}
        <Hero />

        {/* Dynamic Drive-sync gallery slider */}
        <GallerySlider
          accessToken={accessToken}
          needsAuth={needsAuth}
          onLogin={handleGoogleLogin}
        />

        {/* Calendar trial fitting scheduler */}
        <FittingScheduler
          accessToken={accessToken}
          onLogin={handleGoogleLogin}
        />

        {/* Sewing machinery & genuine spares catalog */}
        <MachineCatalog />

        {/* Instagram latest arrivals grid mockup */}
        <InstagramFeed />

        {/* Secure Gmail Contact module */}
        <ContactForm
          accessToken={accessToken}
          onLogin={handleGoogleLogin}
        />
      </main>

      {/* Double branches footer maps and contacts */}
      <Footer />
    </div>
  );
}
