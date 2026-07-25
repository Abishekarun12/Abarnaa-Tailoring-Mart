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

// Strips accidental wrapping quotes/whitespace — a common paste error when
// copying a value like `NEXT_PUBLIC_SANITY_PROJECT_ID="x2z5b5vj"` from an
// .env file straight into a host's env var UI (which takes it literally).
function cleanEnvValue(value: string | undefined): string | undefined {
  const trimmed = value?.trim().replace(/^["']|["']$/g, '').trim();
  return trimmed || undefined;
}

// Validated ourselves rather than left to `createClient` to throw on, so a
// bad value degrades to "not configured" (static fallback content) instead
// of crashing whatever happens to construct a client from it first.
const PROJECT_ID_PATTERN = /^[a-z0-9-]+$/;
const DATASET_PATTERN = /^[a-z0-9_-]+$/;

function resolveProjectId(value: string | undefined): string | undefined {
  const cleaned = cleanEnvValue(value);
  if (!cleaned) return undefined;
  if (!PROJECT_ID_PATTERN.test(cleaned)) {
    console.warn(
      `[Sanity] Ignoring invalid NEXT_PUBLIC_SANITY_PROJECT_ID "${cleaned}" — project IDs may only contain ` +
        'lowercase letters, numbers, and dashes. Check for stray quotes or whitespace in the env var. ' +
        'Falling back to static content.'
    );
    return undefined;
  }
  return cleaned;
}

function resolveDataset(value: string | undefined): string {
  const cleaned = cleanEnvValue(value);
  if (!cleaned) return 'production';
  if (!DATASET_PATTERN.test(cleaned)) {
    console.warn(
      `[Sanity] Ignoring invalid NEXT_PUBLIC_SANITY_DATASET "${cleaned}" — dataset names may only contain ` +
        'lowercase letters, numbers, underscores, and dashes. Check for stray quotes or whitespace in the env var.'
    );
    return 'production';
  }
  return cleaned;
}

const projectId = resolveProjectId(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID);
const dataset = resolveDataset(process.env.NEXT_PUBLIC_SANITY_DATASET);
const apiVersion = cleanEnvValue(process.env.NEXT_PUBLIC_SANITY_API_VERSION) || '2024-01-01';

// True once a real project ID is configured; used to skip network calls
// (and fall back to static content) on a fresh checkout that hasn't set .env yet.
export const isSanityConfigured = Boolean(projectId);

export const sanityClient = createClient({
  projectId: projectId || 'placeholder',
  dataset,
  apiVersion,
  useCdn: true,
});
