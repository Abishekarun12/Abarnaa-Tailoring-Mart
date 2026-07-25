/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Shared Studio config, used both by the standalone CLI Studio
 * (`sanity.config.ts`, `npm run studio`) and by the copy embedded in the
 * Next.js app at a secret URL (see `src/middleware.ts` and
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

const projectId =
  process.env.SANITY_STUDIO_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'x2z5b5vj';
const dataset =
  process.env.SANITY_STUDIO_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';

export function createStudioConfig(basePath = '/') {
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
}
