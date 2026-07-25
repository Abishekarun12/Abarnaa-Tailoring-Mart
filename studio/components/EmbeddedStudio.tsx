/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Client-only wrapper around the Studio. Keeps the (large, browser-oriented)
 * `sanity` package out of the Next.js Server Component graph — importing
 * `studio/config.ts` directly from a Server Component breaks the Turbopack
 * build (some of Sanity's dependencies ship a "react-server" export
 * condition that isn't compatible with being pulled into server code).
 */

'use client';

import { NextStudio } from 'next-sanity/studio';
import { createStudioConfig } from '../config';

export function EmbeddedStudio({ basePath }: { basePath: string }) {
  return <NextStudio config={createStudioConfig(basePath)} />;
}
