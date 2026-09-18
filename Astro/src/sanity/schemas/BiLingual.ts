// src/sanity/schemas/BiLingual.ts
import { defineField } from 'sanity';

export const localizedString = (name: string, title: string) => 
  defineField({
    name,
    title,
    type: 'object',
    fields: [
      { name: 'en', title: 'English', type: 'string' },
      { name: 'sw', title: 'Swahili (Kiswahili)', type: 'string' },
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
        of: [{ type: 'block' }, { type: 'imageBlock' }, { type: 'videoBlock' }] 
      },
      { 
        name: 'sw', 
        title: 'Swahili Content (Kiswahili)', 
        type: 'array', 
        of: [{ type: 'block' }, { type: 'imageBlock' }, { type: 'videoBlock' }] 
      },
    ],
  });