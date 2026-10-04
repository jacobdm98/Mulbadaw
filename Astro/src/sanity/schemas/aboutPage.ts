import { defineField, defineType } from 'sanity';
import { localizedBlock, localizedString, localizedTitlePreview } from './BiLingual';

export const aboutPage = defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  __experimental_actions: ['update', 'publish'],
  preview: localizedTitlePreview('About Page'),
  fields: [
    localizedString('title', 'Page Title'),
    localizedBlock('content', 'Page Content'),
  ],
});
