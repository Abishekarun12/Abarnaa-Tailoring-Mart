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

import { createClient, type SanityClient } from '@sanity/client';

// Strips accidental wrapping quotes/whitespace — a common paste error when
// copying a value like `NEXT_PUBLIC_SANITY_PROJECT_ID="x2z5b5vj"` from an
// .env file straight into a host's env var UI (which takes it literally).
function cleanEnvValue(value: string | undefined): string | undefined {
  const trimmed = value?.trim().replace(/^["']|["']$/g, '').trim();
  return trimmed || undefined;
}

const projectId = cleanEnvValue(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID);
const dataset = cleanEnvValue(process.env.NEXT_PUBLIC_SANITY_DATASET) || 'production';
const apiVersion = cleanEnvValue(process.env.NEXT_PUBLIC_SANITY_API_VERSION) || '2024-01-01';

function buildClient(): { client: SanityClient; configured: boolean } {
  if (!projectId) {
    return {
      client: createClient({ projectId: 'placeholder', dataset: 'production', apiVersion, useCdn: true }),
      configured: false,
    };
  }
  try {
    return {
      client: createClient({ projectId, dataset, apiVersion, useCdn: true }),
      configured: true,
    };
  } catch (error) {
    console.warn(
      `[Sanity] NEXT_PUBLIC_SANITY_PROJECT_ID ("${projectId}") isn't a valid Sanity project ID — falling back ` +
        'to static content. Project IDs may only contain lowercase letters, numbers, and dashes; check for stray ' +
        'quotes or whitespace in the env var.',
      error
    );
    return {
      client: createClient({ projectId: 'placeholder', dataset: 'production', apiVersion, useCdn: true }),
      configured: false,
    };
  }
}

const { client, configured } = buildClient();

// True once a real project ID is configured; used to skip network calls
// (and fall back to static content) on a fresh checkout that hasn't set .env yet.
export const isSanityConfigured = configured;
export const sanityClient = client;
