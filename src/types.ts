/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface UserInfo {
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
}

export interface DriveFileItem {
  id: string;
  name: string;
  mimeType: string;
  thumbnailLink?: string;
  webContentLink?: string;
  webViewLink?: string;
}

export interface BookingDetails {
  id?: string;
  name: string;
  email: string;
  phone: string;
  fittingType: 'Blouse Stitching' | 'Bridal Aari Work' | 'Premium Lehengas / Salwars' | 'General Ladies Fitting';
  date: string;
  time: string;
  notes?: string;
}

export interface SewingProduct {
  id: string;
  name: string;
  brand: string;
  type: 'machine' | 'spare';
  imageUrl: string;
  description: string;
  priceRange: string;
  specs: string[];
}

export interface InstagramShowcaseItem {
  id: string;
  imageUrl: string;
  caption: string;
  likes: number;
  comments: number;
  date: string;
}

export interface BranchDetails {
  city: string;
  name: string;
  address: string;
  phone: string;
  hours: string;
  mapsUrl: string;
}
