import react from '@vitejs/plugin-react';
import path from 'path';
import type { UserConfig } from 'vitest/config';
import { defineConfig } from 'vitest/config';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'happy-dom',
    globals: true,
    watch: false,
    include: ['**/*.test.ts', '**/*.test.tsx'],
    exclude: ['node_modules/**/*'],
    coverage: {
      include: ['src/**/**', '!src/generated/**'],
    },
    setupFiles: 'vite-setup.ts',
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@images': path.resolve(__dirname, './public'),
    },
  },
} as UserConfig);
