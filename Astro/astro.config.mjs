// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sanity from '@sanity/astro';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [
    react(),
    sanity({
      projectId: 'tyk7mbom',
      dataset: 'production',
      useCdn: false,
      studioBasePath: '/admin',
    }),
  ],
});