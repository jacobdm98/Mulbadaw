import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
//import { gallery } from './src/sanity/schemas/gallery';
import { project } from './src/sanity/schemas/project';
import { gallery } from './src/sanity/schemas/gallery';

export default defineConfig({
  name: 'default',
  title: 'Mulbadaw Farm',
  projectId: 'tyk7mbom',
  dataset: 'production',
  plugins: [structureTool()],
  schema: {
    types: [ project, gallery ],
  },
});