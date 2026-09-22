// src/sanity/schemas/BiLingual.ts
import { defineArrayMember, defineField } from 'sanity';

export const localizedString = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: 'object',
    fields: [
      { name: 'en', title: 'English', type: 'text', rows: 2 },
      { name: 'sw', title: 'Swahili (Kiswahili)', type: 'text', rows: 2 },
    ],
  });

export const localizedBlock = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: 'object',
    fields: [
      { 
        name: 'en', 
        title: 'English Content', 
        type: 'array', 
        // References global types by string name
        of: [
          defineArrayMember({ type: 'block' }),
          defineArrayMember({ type: 'imageBlock' }),
          defineArrayMember({ type: 'videoBlock' }),
        ],
      },
      { 
        name: 'sw', 
        title: 'Swahili Content (Kiswahili)', 
        type: 'array', 
        of: [
          defineArrayMember({ type: 'block' }),
          defineArrayMember({ type: 'imageBlock' }),
          defineArrayMember({ type: 'videoBlock' }),
        ],
      },
    ],
  });