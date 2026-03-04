// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  vite: {
    // @ts-ignore - pnpm resolves two vite instances with different peer deps, causing a false TS conflict
    plugins: [tailwindcss()],
  },
});
