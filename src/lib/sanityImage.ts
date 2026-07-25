/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { createImageUrlBuilder } from '@sanity/image-url';
import type { Image } from 'sanity';
import { sanityClient } from './sanityClient';

const builder = createImageUrlBuilder(sanityClient);

export function urlForImage(source: Image) {
  return builder.image(source);
}
