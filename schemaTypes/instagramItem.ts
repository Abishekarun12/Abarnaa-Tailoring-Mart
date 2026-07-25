/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'instagramItem',
  title: 'Instagram Showcase Item',
  type: 'document',
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: 'caption', title: 'Caption', type: 'text', rows: 3, validation: (Rule) => Rule.required() }),
    defineField({ name: 'likes', title: 'Likes', type: 'number', initialValue: 0 }),
    defineField({ name: 'comments', title: 'Comments', type: 'number', initialValue: 0 }),
    defineField({
      name: 'date',
      title: 'Date label',
      type: 'string',
      description: 'Free text shown on the card, e.g. "2 Days ago".',
    }),
    defineField({
      name: 'order',
      title: 'Display order',
      type: 'number',
      description: 'Lower numbers show first in the feed grid.',
    }),
  ],
  preview: {
    select: { title: 'caption', media: 'image' },
  },
});
