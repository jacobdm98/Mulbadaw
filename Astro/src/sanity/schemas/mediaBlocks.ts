// src/sanity/schemaTypes/mediaBlocks.ts
import { defineField, defineType } from 'sanity';

const imageLayouts = [
  { title: 'Standard - centered', value: 'standard' },
  { title: 'Wide - full content width', value: 'wide' },
  { title: 'Small - image on the left, text wraps beside it', value: 'floatLeft' },
  { title: 'Small - image on the right, text wraps beside it', value: 'floatRight' },
];

export const imageBlock = defineType({
  name: 'imageBlock',
  title: 'Single Image',
  options: { collapsible: false },
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
      name: 'layout',
      title: 'Image Layout',
      description: 'Choose a ready-made layout. Small layouts let text wrap beside the image.',
      type: 'string',
      initialValue: 'standard',
      options: { list: imageLayouts },
    }),
  ],
  preview: {
    select: { image: 'image', layout: 'layout' },
    prepare(selection) {
      return { 
        title: selection.layout ? `Single Image - ${imageLayouts.find((layout) => layout.value === selection.layout)?.title || 'Standard'}` : 'Single Image',
        media: selection.image 
      };
    }
  }
});

export const imageGalleryBlock = defineType({
  name: 'imageGalleryBlock',
  title: 'Image Gallery',
  options: { collapsible: false },
  type: 'object',
  fields: [
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
        {
          name: 'galleryImage',
          title: 'Image',
          type: 'object',
          fields: [
            defineField({
              name: 'image',
              type: 'image',
              title: 'Image',
              options: { hotspot: true },
              validation: (Rule) => Rule.required(),
            }),
            defineField({ name: 'captionEn', title: 'Caption (English)', type: 'string' }),
            defineField({ name: 'captionSw', title: 'Caption (Swahili)', type: 'string' }),
          ],
          preview: {
            select: { image: 'image', caption: 'captionEn' },
            prepare(selection: { image?: unknown; caption?: string }) {
              return { title: selection.caption || 'Gallery image', media: selection.image };
            },
          },
        },
      ],
      validation: (Rule) => Rule.min(2).max(6),
    }),
  ],
  preview: {
    select: { images: 'images' },
    prepare(selection: { images?: unknown[] }) {
      const count = selection.images?.length || 0;
      return { title: `Image Gallery (${count} ${count === 1 ? 'image' : 'images'})` };
    },
  },
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
      name: 'layout',
      title: 'Video Size',
      type: 'string',
      initialValue: 'standard',
      options: {
        list: [
          { title: 'Standard - centered', value: 'standard' },
          { title: 'Wide - full content width', value: 'wide' },
        ],
      },
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Video Block' };
    }
  }
});