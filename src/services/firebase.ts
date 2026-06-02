/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut, User } from 'firebase/auth';
import firebaseConfig from '../../firebase-applet-config.json';

// Initialize Firebase App
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Configure Google OAuth provider with scopes
export const googleProvider = new GoogleAuthProvider();
googleProvider.addScope('https://www.googleapis.com/auth/drive.readonly');
googleProvider.addScope('https://www.googleapis.com/auth/drive.file');
googleProvider.addScope('https://www.googleapis.com/auth/calendar.events');
googleProvider.addScope('https://www.googleapis.com/auth/gmail.send');

// Strict prompt to allow selecting different Google accounts and enforce consent if needed
googleProvider.setCustomParameters({
  prompt: 'consent'
});

// Flag to track sign-in in progress
let isSigningIn = false;
// Cached access token (in memory only, NOT in localStorage)
let cachedAccessToken: string | null = null;

// Initialize Authentication listener
export const initAuth = (
  onAuthSuccess: (user: User, token: string) => void,
  onAuthFailure: () => void
) => {
  return onAuthStateChanged(auth, async (user) => {
    if (user) {
      if (cachedAccessToken) {
        onAuthSuccess(user, cachedAccessToken);
      } else if (!isSigningIn) {
        // No cached token but user is active. In this case, standard login popup may be needed to re-acquire token
        // Keep it clean. Clear cache and trigger failure so the user clicks and authorizes
        cachedAccessToken = null;
        onAuthFailure();
      }
    } else {
      cachedAccessToken = null;
      onAuthFailure();
    }
  });
};

// Sign in trigger with popup
export const googleSignIn = async (): Promise<{ user: User; accessToken: string } | null> => {
  try {
    isSigningIn = true;
    const result = await signInWithPopup(auth, googleProvider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    
    if (!credential?.accessToken) {
      throw new Error('Could not retrieve access token from Google Auth.');
    }
    
    cachedAccessToken = credential.accessToken;
    return { user: result.user, accessToken: cachedAccessToken };
  } catch (err) {
    console.error('Google Sign-in failed:', err);
    throw err;
  } finally {
    isSigningIn = false;
  }
};

// Utility to fetch active access token
export const getAccessToken = (): string | null => {
  return cachedAccessToken;
};

// Sign out trigger
export const logoutUser = async () => {
  await signOut(auth);
  cachedAccessToken = null;
};
