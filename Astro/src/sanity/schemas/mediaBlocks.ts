// src/sanity/schemaTypes/mediaBlocks.ts
import { defineType } from 'sanity';
import { localizedString } from './BiLingual';

export const imageBlock = defineType({
  name: 'imageBlock',
  title: 'Image Block',
  type: 'object',
  // Forces the block to open in a stable popup modal instead of collapsing inline
  options: {
    modal: { type: 'dialog' },
  },
  fields: [
    { name: 'image', type: 'image', title: 'Image', options: { hotspot: true } },
    localizedString('caption', 'Caption'),
  ],
  preview: {
    select: { imageUrl: 'image.asset.url', title: 'caption.en' },
    prepare(selection) {
      return { title: selection.title || 'Image Block', media: selection.imageUrl };
    }
  }
});

export const videoBlock = defineType({
  name: 'videoBlock',
  title: 'Video Block',
  type: 'object',
  options: {
    modal: { type: 'dialog' },
  },
  fields: [
    { name: 'videoFile', type: 'file', title: 'Video File' },
    localizedString('caption', 'Caption'),
  ],
  preview: {
    select: { title: 'caption.en' },
    prepare(selection) {
      return { title: selection.title || 'Video Block' };
    }
  }
});