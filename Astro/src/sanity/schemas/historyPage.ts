import { defineField, defineType } from 'sanity';
import { localizedBlock, localizedString, localizedTitlePreview } from './BiLingual';

export const historyPage = defineType({
  name: 'historyPage',
  title: 'History Page',
  type: 'document',
  __experimental_actions: ['update', 'publish'],
  preview: localizedTitlePreview('History Page'),
  fields: [
    localizedString('title', 'Page Title'),
    localizedBlock('content', 'Page Content'),
  ],
});
