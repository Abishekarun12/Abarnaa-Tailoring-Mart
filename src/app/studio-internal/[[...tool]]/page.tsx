/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * The embedded Studio. Never linked from the site and never reachable at
 * this literal path — only through the secret URL that `src/proxy.ts`
 * rewrites here (see `STUDIO_ACCESS_PATH` in `.env`).
 */

export const dynamic = 'force-static';

export { metadata, viewport } from 'next-sanity/studio';

import { EmbeddedStudio } from '../../../../studio/components/EmbeddedStudio';

const secret = process.env.STUDIO_ACCESS_PATH;
const basePath = secret ? `/${secret}` : '/studio-internal';

export default function StudioPage() {
  return <EmbeddedStudio basePath={basePath} />;
}
