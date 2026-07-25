/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Custom desk structure: groups the site's four content types under a
 * single "Site Content" section (icons + friendly labels, sorted by each
 * document's `order` field) instead of the default alphabetical schema list.
 */

import { Instagram, MapPin, Settings, Shirt } from 'lucide-react';
import type { StructureResolver } from 'sanity/structure';

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Site Content')
    .items([
      S.listItem()
        .title('Blouses')
        .icon(Shirt)
        .child(
          S.documentTypeList('blouse')
            .title('Blouses')
            .defaultOrdering([{ field: 'order', direction: 'asc' }])
        ),
      S.listItem()
        .title('Sewing Products')
        .icon(Settings)
        .child(
          S.documentTypeList('product')
            .title('Sewing Products')
            .defaultOrdering([{ field: 'order', direction: 'asc' }])
        ),
      S.listItem()
        .title('Instagram Posts')
        .icon(Instagram)
        .child(
          S.documentTypeList('instagramItem')
            .title('Instagram Posts')
            .defaultOrdering([{ field: 'order', direction: 'asc' }])
        ),
      S.listItem()
        .title('Branches')
        .icon(MapPin)
        .child(
          S.documentTypeList('branch')
            .title('Branches')
            .defaultOrdering([{ field: 'order', direction: 'asc' }])
        ),
    ]);
