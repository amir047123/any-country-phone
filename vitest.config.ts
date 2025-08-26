import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: ['tests/setup.ts']
    // globals: true, // সাধারণত দরকার পড়ে না; setup.ts এ expect extend করাই যথেষ্ট
  }
});
