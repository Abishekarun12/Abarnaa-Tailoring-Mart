/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'product',
  title: 'Sewing Product',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'brand', title: 'Brand', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({
      name: 'type',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          { title: 'Sewing Machine', value: 'machine' },
          { title: 'Genuine Spares', value: 'spare' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 4 }),
    defineField({
      name: 'priceRange',
      title: 'Price Range',
      type: 'string',
      description: 'e.g. ₹9,800 - ₹11,200',
    }),
    defineField({ name: 'specs', title: 'Specs', type: 'array', of: [{ type: 'string' }] }),
    defineField({
      name: 'order',
      title: 'Display order',
      type: 'number',
      description: 'Lower numbers show first in the catalog grid.',
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'brand', media: 'image' },
  },
});
