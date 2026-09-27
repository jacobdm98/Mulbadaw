import { defineField, defineType } from 'sanity';
import { localizedBlock, localizedString } from './BiLingual';

export const historyPage = defineType({
  name: 'historyPage',
  title: 'History Page',
  type: 'document',
  __experimental_actions: ['update', 'publish'],
  fields: [
    localizedString('title', 'Page Title'),
    localizedBlock('content', 'Page Content'),
  ],
});
