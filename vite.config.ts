import { defineConfig } from 'vite';
import { contentPlugin } from './scripts/content-plugin.ts';

// yxh1126.github.io is a user page → served from root.
export default defineConfig({
  base: '/',
  plugins: [contentPlugin()],
  server: {
    host: true,
  },
});
