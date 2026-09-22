import { defineArrayMember, defineField, defineType } from 'sanity';
import { localizedString } from './BiLingual';

export const gallery = defineType({
  name: 'gallery',
  title: 'Gallery',
  type: 'document',
  __experimental_actions: ['update', 'publish'],
  fields: [
    defineField({
      name: 'photos',
      title: 'Media Items',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'imageItem',
          title: 'Image',
          fields: [
            defineField({
              name: 'image',
              type: 'image',
              title: 'Image',
              options: { hotspot: true },
              validation: (Rule) => Rule.required(),
            }),
            localizedString('caption', 'Caption'),
            defineField({ name: 'alt', type: 'string', title: 'Alt Text' }),
          ],
        }),
        defineArrayMember({
          type: 'object',
          name: 'videoItem',
          title: 'Video',
          fields: [
            defineField({
              name: 'videoFile',
              type: 'file',
              title: 'Video File',
              options: { accept: 'video/*' },
              validation: (Rule) => Rule.required(),
            }),
            localizedString('caption', 'Caption'),
            defineField({ name: 'alt', type: 'string', title: 'Alt Text' }),
          ],
        }),
      ],
    }),
  ],
});