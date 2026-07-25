/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * ----------------------------------------------------
 * SANITY CONTENT SERVICE
 * ----------------------------------------------------
 * Fetches editable site content (blouses, sewing products, Instagram posts,
 * branches) from Sanity. Falls back to the static defaults in `data.ts`
 * whenever Sanity isn't configured, the dataset is empty, or the request
 * fails, so the site never breaks because of a CMS outage.
 * See SANITY_SETUP.md for how to configure and populate the Studio.
 */

import type { Image } from 'sanity';
import { isSanityConfigured, sanityClient } from '../lib/sanityClient';
import { urlForImage } from '../lib/sanityImage';
import { StaticBlouse, DEFAULT_BLOUSES, SEWING_PRODUCTS, INSTAGRAM_ITEMS, BRANCHES_DATA } from '../data';
import { SewingProduct, InstagramShowcaseItem, BranchDetails } from '../types';

async function fetchDocs<T>(query: string): Promise<T[]> {
  if (!isSanityConfigured) return [];
  try {
    const docs = await sanityClient.fetch<T[]>(query);
    return docs ?? [];
  } catch (error) {
    console.warn('[Sanity] Content fetch failed, using static fallback:', error);
    return [];
  }
}

interface BlouseDoc {
  id: string;
  name: string;
  collection: string;
  image: Image;
  description: string;
  specs: string[];
}

export async function getBlouses(): Promise<StaticBlouse[]> {
  const docs = await fetchDocs<BlouseDoc>(
    `*[_type == "blouse"] | order(order asc, _createdAt asc) {
      "id": _id, name, collection, image, description, specs
    }`
  );
  if (docs.length === 0) return DEFAULT_BLOUSES;
  return docs.map((doc) => ({
    id: doc.id,
    name: doc.name,
    collection: doc.collection,
    imageUrl: urlForImage(doc.image).width(1200).auto('format').url(),
    description: doc.description,
    specs: doc.specs ?? [],
  }));
}

interface ProductDoc {
  id: string;
  name: string;
  brand: string;
  type: 'machine' | 'spare';
  image: Image;
  description: string;
  priceRange: string;
  specs: string[];
}

export async function getSewingProducts(): Promise<SewingProduct[]> {
  const docs = await fetchDocs<ProductDoc>(
    `*[_type == "product"] | order(order asc, _createdAt asc) {
      "id": _id, name, brand, type, image, description, priceRange, specs
    }`
  );
  if (docs.length === 0) return SEWING_PRODUCTS;
  return docs.map((doc) => ({
    id: doc.id,
    name: doc.name,
    brand: doc.brand,
    type: doc.type,
    imageUrl: urlForImage(doc.image).width(800).auto('format').url(),
    description: doc.description,
    priceRange: doc.priceRange,
    specs: doc.specs ?? [],
  }));
}

interface InstagramItemDoc {
  id: string;
  image: Image;
  caption: string;
  likes: number;
  comments: number;
  date: string;
}

export async function getInstagramItems(): Promise<InstagramShowcaseItem[]> {
  const docs = await fetchDocs<InstagramItemDoc>(
    `*[_type == "instagramItem"] | order(order asc, _createdAt asc) {
      "id": _id, image, caption, likes, comments, date
    }`
  );
  if (docs.length === 0) return INSTAGRAM_ITEMS;
  return docs.map((doc) => ({
    id: doc.id,
    imageUrl: urlForImage(doc.image).width(800).auto('format').url(),
    caption: doc.caption,
    likes: doc.likes ?? 0,
    comments: doc.comments ?? 0,
    date: doc.date,
  }));
}

export async function getBranches(): Promise<BranchDetails[]> {
  const docs = await fetchDocs<BranchDetails>(
    `*[_type == "branch"] | order(order asc, _createdAt asc) {
      city, name, address, phone, hours, mapsUrl
    }`
  );
  if (docs.length === 0) return BRANCHES_DATA;
  return docs;
}
