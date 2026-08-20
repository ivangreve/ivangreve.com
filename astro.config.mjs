// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://ivangreve.com',
  trailingSlash: 'ignore',
  build: {
    // One stylesheet instead of per-page <style> blocks: the whole site is two pages.
    inlineStylesheets: 'auto',
  },
});
