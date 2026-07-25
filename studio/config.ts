/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Shared Studio config, used both by the standalone CLI Studio
 * (`sanity.config.ts`, `npm run studio`) and by the copy embedded in the
 * Next.js app at a secret URL (see `src/proxy.ts` and
 * `src/app/studio-internal/[[...tool]]/page.tsx`). `basePath` differs
 * between the two — everything else is identical.
 */

import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from '../schemaTypes';
import { studioTheme } from './theme';
import { structure } from './structure';
import { StudioIcon, StudioLogo } from './components/StudioLogo';

// Strips accidental wrapping quotes/whitespace — a common paste error when
// copying a value like `NEXT_PUBLIC_SANITY_PROJECT_ID="x2z5b5vj"` from an
// .env file straight into a host's env var UI (which takes it literally).
function cleanEnvValue(value: string | undefined): string | undefined {
  const trimmed = value?.trim().replace(/^["']|["']$/g, '').trim();
  return trimmed || undefined;
}

// Sanity's own client only validates these formats lazily, deep inside the
// Studio's browser runtime (long after `defineConfig` has already accepted
// them) — so an invalid value doesn't fail until an editor is actually using
// the Studio. Validating here means we always hand Sanity something valid,
// falling back to the known-good hardcoded values instead.
const PROJECT_ID_PATTERN = /^[a-z0-9-]+$/;
const DATASET_PATTERN = /^[a-z0-9_-]+$/;

function resolveEnvValue(
  pattern: RegExp,
  label: string,
  fallback: string,
  ...candidates: (string | undefined)[]
): string {
  for (const candidate of candidates) {
    const cleaned = cleanEnvValue(candidate);
    if (cleaned && pattern.test(cleaned)) return cleaned;
    if (cleaned) {
      console.warn(
        `[Sanity Studio] Ignoring invalid ${label} "${cleaned}" — check for stray quotes or whitespace in the env var.`
      );
    }
  }
  return fallback;
}

const projectId = resolveEnvValue(
  PROJECT_ID_PATTERN,
  'project ID',
  'x2z5b5vj',
  process.env.SANITY_STUDIO_PROJECT_ID,
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
);
const dataset = resolveEnvValue(
  DATASET_PATTERN,
  'dataset name',
  'production',
  process.env.SANITY_STUDIO_DATASET,
  process.env.NEXT_PUBLIC_SANITY_DATASET
);

export function createStudioConfig(basePath = '/') {
  try {
    return defineConfig({
      basePath,
      name: 'default',
      title: 'Abarnaa Tailoring Mart',
      projectId,
      dataset,
      icon: StudioIcon,
      theme: studioTheme,
      studio: {
        components: {
          logo: StudioLogo,
        },
      },
      plugins: [structureTool({ structure }), visionTool()],
      schema: {
        types: schemaTypes,
      },
    });
  } catch (error) {
    // A misconfigured Studio must never take down the whole site build —
    // fall back to a minimal, non-functional config that still compiles.
    console.warn(
      `[Sanity Studio] Invalid project config (projectId "${projectId}") — check SANITY_STUDIO_PROJECT_ID / ` +
        'NEXT_PUBLIC_SANITY_PROJECT_ID for stray quotes or whitespace.',
      error
    );
    return defineConfig({
      basePath,
      name: 'default',
      title: 'Abarnaa Tailoring Mart (misconfigured)',
      projectId: 'placeholder',
      dataset: 'production',
      plugins: [structureTool(), visionTool()],
      schema: {
        types: schemaTypes,
      },
    });
  }
}
