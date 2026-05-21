import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  integrations: [tailwind()],
  output: 'static',
  compressHTML: true,
  build: {
    // Asset hash for cache-busting
    assets: '_assets',
  },
});
