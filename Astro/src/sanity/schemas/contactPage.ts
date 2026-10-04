import { defineArrayMember, defineField, defineType } from 'sanity';
import { localizedString, localizedTitlePreview } from './BiLingual';

const contactDetails = (title: string) =>
  defineField({
    name: 'details',
    title,
    type: 'object',
    fields: [
      localizedString('label', 'Section Label'),
      localizedString('email', 'Email'),
      localizedString('phone', 'Phone'),
      localizedString('address', 'Address'),
    ],
  });

export const contactPage = defineType({
  name: 'contactPage',
  title: 'Contact Page',
  type: 'document',
  __experimental_actions: ['update', 'publish'],
  preview: localizedTitlePreview('Contact Page'),
  fields: [
    localizedString('title', 'Page Title'),
    localizedString('intro', 'Introduction'),
    contactDetails('Official Farm Contact'),
    defineField({
      name: 'employees',
      title: 'Employees',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'employee',
          title: 'Employee',
          type: 'object',
          fields: [
            defineField({
              name: 'photo',
              title: 'Photo',
              type: 'image',
              options: { hotspot: true },
            }),
            localizedString('name', 'Name'),
            localizedString('role', 'Role / Job Title'),
            localizedString('email', 'Email'),
            localizedString('phone', 'Phone'),
            localizedString('address', 'Address'),
          ],
          preview: {
            select: {
              title: 'name.en',
              subtitle: 'role.en',
              media: 'photo',
            },
            prepare(selection) {
              return {
                title: selection.title || 'Employee',
                subtitle: selection.subtitle || '',
                media: selection.media,
              };
            },
          },
        }),
      ],
    }),
  ],
});
