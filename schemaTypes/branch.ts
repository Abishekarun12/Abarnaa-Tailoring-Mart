/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'branch',
  title: 'Branch',
  type: 'document',
  fields: [
    defineField({ name: 'city', title: 'City / Area', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'name', title: 'Branch Name', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'address', title: 'Address', type: 'text', rows: 2, validation: (Rule) => Rule.required() }),
    defineField({ name: 'phone', title: 'Phone', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'hours', title: 'Hours', type: 'string' }),
    defineField({ name: 'mapsUrl', title: 'Google Maps URL', type: 'url' }),
    defineField({
      name: 'order',
      title: 'Display order',
      type: 'number',
      description: 'Lower numbers show first in the branches footer.',
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'city' },
  },
});
