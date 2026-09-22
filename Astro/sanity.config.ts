import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { project } from './src/sanity/schemas/project';
import { gallery } from './src/sanity/schemas/gallery';
import { article } from './src/sanity/schemas/article';
import { imageBlock, videoBlock } from './src/sanity/schemas/mediaBlocks';

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
            ...S.documentTypeListItems().filter((item) => item.getId() !== 'gallery'),
          ]),
    }),
  ],
  schema: {
    types: [project, gallery, article, imageBlock, videoBlock],
  },
});