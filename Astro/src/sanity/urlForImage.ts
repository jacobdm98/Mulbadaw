// src/sanity/urlForImage.ts
import { createImageUrlBuilder, type SanityImageSource } from '@sanity/image-url';

const builder = createImageUrlBuilder({
  projectId: 'tyk7mbom',
  dataset: 'production',
});

export function urlForImage(source: SanityImageSource) {
  return builder.image(source);
}