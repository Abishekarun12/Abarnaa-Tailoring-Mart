/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Config for the standalone CLI Studio (`npm run studio`, `npm run
 * studio:build`, `npm run studio:deploy`) — fast local iteration without
 * rebuilding the whole Next.js app. The version editors actually use in
 * production is embedded in the Next.js app instead; see `studio/config.ts`.
 */

import { createStudioConfig } from './studio/config';

export default createStudioConfig();
