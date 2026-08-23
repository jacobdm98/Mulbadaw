// src/sanity/schemaTypes/project.ts
import { defineField, defineType } from 'sanity';

export const project = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
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
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'content',
      title: 'Full Project Details',
      type: 'array',
      of: [{ type: 'block' }], // Enables rich text (bold, lists, etc.)
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Farm', value: 'farm' },
          { title: 'Hospital', value: 'hospital' },
        ],
      },
    }),
  ],
});