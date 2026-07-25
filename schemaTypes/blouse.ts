/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'blouse',
  title: 'Blouse',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'collection', title: 'Collection', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 4 }),
    defineField({ name: 'specs', title: 'Specs', type: 'array', of: [{ type: 'string' }] }),
    defineField({
      name: 'order',
      title: 'Display order',
      type: 'number',
      description: 'Lower numbers show first in the showcase slider.',
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'collection', media: 'image' },
  },
});
