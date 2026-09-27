// src/sanity/schemaTypes/mediaBlocks.ts
import { defineField, defineType } from 'sanity';

export const imageBlock = defineType({
  name: 'imageBlock',
  title: 'Image Block',
  options : { collapsible: false,},
  type: 'object',
  fields: [
    defineField({
      name: 'image',
      type: 'image',
      title: 'Image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'captionEn',
      title: 'Caption (English)',
      type: 'string', // Changed from 'text' to 'string' to prevent popover closing bugs
    }),
    defineField({
      name: 'captionSw',
      title: 'Caption (Swahili)',
      type: 'string', // Changed from 'text' to 'string'
    }),
    defineField({
      name: 'width',
      title: 'Display Width (%)',
      type: 'number',
      initialValue: 100,
      min: 25,
      max: 100,
    }),
  ],
  preview: {
    select: { image: 'image' },
    prepare(selection) {
      return { 
        title: 'Image Block', 
        media: selection.image 
      };
    }
  }
});

export const videoBlock = defineType({
  name: 'videoBlock',
  title: 'Video Block',
  type: 'object',
  fields: [
    defineField({
      name: 'videoFile',
      type: 'file',
      title: 'Video File',
      options: { accept: 'video/*' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'captionEn',
      title: 'Caption (English)',
      type: 'string', // Changed from 'text' to 'string'
    }),
    defineField({
      name: 'captionSw',
      title: 'Caption (Swahili)',
      type: 'string', // Changed from 'text' to 'string'
    }),
    defineField({
      name: 'width',
      title: 'Display Width (%)',
      type: 'number',
      initialValue: 100,
      min: 25,
      max: 100,
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Video Block' };
    }
  }
});