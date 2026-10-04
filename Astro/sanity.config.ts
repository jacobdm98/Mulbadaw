import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { project } from './src/sanity/schemas/project';
import { gallery } from './src/sanity/schemas/gallery';
import { article } from './src/sanity/schemas/article';
import { imageBlock, imageGalleryBlock, videoBlock } from './src/sanity/schemas/mediaBlocks';
import { aboutPage } from './src/sanity/schemas/aboutPage';
import { historyPage } from './src/sanity/schemas/historyPage';
import { contactPage } from './src/sanity/schemas/contactPage';

export default defineConfig({
  name: 'default',
  title: 'Mulbadaw Farm',
  projectId: 'tyk7mbom',
  dataset: 'production',
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Gallery')
              .child(S.document().schemaType('gallery').documentId('gallery')),
            S.listItem()
              .title('About Page')
              .child(S.document().schemaType('aboutPage').documentId('aboutPage')),
            S.listItem()
              .title('History Page')
              .child(S.document().schemaType('historyPage').documentId('historyPage')),
            S.listItem()
              .title('Contact Page')
              .child(S.document().schemaType('contactPage').documentId('contactPage')),
            ...S.documentTypeListItems().filter((item) =>
              !['gallery', 'companyPages', 'aboutPage', 'historyPage', 'contactPage'].includes(item.getId() || ''),
            ),
          ]),
    }),
  ],
  schema: {
    types: [project, gallery, aboutPage, historyPage, contactPage, article, imageBlock, imageGalleryBlock, videoBlock],
  },
});