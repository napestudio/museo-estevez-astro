// @ts-check
import { defineConfig, passthroughImageService } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  image: {
    service: passthroughImageService(),
  },
  vite: {
    // @ts-ignore - pnpm resolves two vite instances with different peer deps, causing a false TS conflict
    plugins: [tailwindcss()],
  },
});
