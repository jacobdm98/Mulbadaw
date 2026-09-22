// src/sanity/schemaTypes/article.ts
import { defineField, defineType } from 'sanity';
import { localizedString, localizedBlock } from './BiLingual';

export const article = defineType({
  name: 'article',
  title: 'News Article',
  type: 'document',
  fields: [
    localizedString('title', 'Article Title'),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title.en', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: 'mainImage', title: 'Main Cover Image', type: 'image', options: { hotspot: true } }),
    localizedBlock('body', 'Article Body & Page Builder'),
  ],
});