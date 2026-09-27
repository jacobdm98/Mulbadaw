import { defineField, defineType } from 'sanity';
import { localizedBlock, localizedString } from './BiLingual';

export const aboutPage = defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  __experimental_actions: ['update', 'publish'],
  fields: [
    localizedString('title', 'Page Title'),
    localizedBlock('content', 'Page Content'),
  ],
});
