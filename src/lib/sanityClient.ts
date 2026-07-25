/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * ----------------------------------------------------
 * SANITY CLIENT
 * ----------------------------------------------------
 * Read-only client for fetching published site content from Sanity.
 * See SANITY_SETUP.md for how to configure the project/dataset and run the Studio.
 */

import { createClient } from '@sanity/client';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01';

// True once a real project ID is configured; used to skip network calls
// (and fall back to static content) on a fresh checkout that hasn't set .env yet.
export const isSanityConfigured = Boolean(projectId);

export const sanityClient = createClient({
  projectId: projectId || 'placeholder',
  dataset,
  apiVersion,
  useCdn: true,
});
