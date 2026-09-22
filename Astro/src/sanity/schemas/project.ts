// src/sanity/schemaTypes/project.ts
import { defineField, defineType } from 'sanity';
import { localizedBlock, localizedString } from './BiLingual';

export const project = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Project Title',
      type: 'object',
      fields: [
        { name: 'en', title: 'English', type: 'string' },
        { name: 'sw', title: 'Swahili (Kiswahili)', type: 'string' },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title.en', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Project Image',
      type: 'image',
      options: { hotspot: true }, // Allows you to crop the image in the admin panel
    }),
    defineField({
      name: 'description',
      title: 'Short Summary',
      type: 'object',
      fields: [
        { name: 'en', title: 'English', type: 'text', rows: 3 },
        { name: 'sw', title: 'Swahili (Kiswahili)', type: 'text', rows: 3 },
      ],
    }),
    localizedBlock('content', 'Full Project Details'),
  ],
});