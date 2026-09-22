// src/sanity/schemaTypes/mediaBlocks.ts
import { defineField, defineType } from 'sanity';
import { localizedString } from './BiLingual';

export const imageBlock = defineType({
  name: 'imageBlock',
  title: 'Image Block',
  type: 'object',
  fields: [
    defineField({
      name: 'image',
      type: 'image',
      title: 'Image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    localizedString('caption', 'Caption'),
  ],
  preview: {
    select: { image: 'image', 
              title: 'caption.en'
    },
    prepare(selection) {
      return { title: selection.title || 'Image Block',
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
    localizedString('caption', 'Caption'),
  ],
  preview: {
    select: { title: 'caption.en' },
    prepare(selection) {
      return { title: selection.title || 'Video Block' };
    }
  }
});