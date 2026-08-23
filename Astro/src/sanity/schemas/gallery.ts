// src/sanity/schemaTypes/gallery.ts
import { defineField, defineType } from 'sanity';

export const gallery = defineType({
  name: 'gallery',
  title: 'Photo & Video Gallery',
  type: 'document',
  fields: [
    defineField({
      name: 'photos',
      title: 'Media Items',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'imageItem',
          title: 'Image',
          fields: [
            { 
              name: 'image', 
              type: 'image', 
              title: 'Image', 
              options: { hotspot: true } 
            },
            { name: 'caption', type: 'string', title: 'Caption' },
            { name: 'alt', type: 'string', title: 'Alt Text' },
          ],
        },
        {
          type: 'object',
          name: 'videoItem',
          title: 'Video',
          fields: [
            { 
              name: 'videoFile', 
              type: 'file', 
              title: 'Video File (MP4, WebM)',
              options: { accept: 'video/*' } 
            },
            { name: 'caption', type: 'string', title: 'Caption' },
            { name: 'alt', type: 'string', title: 'Alt Text' },
          ],
        },
      ],
    }),
  ],
});