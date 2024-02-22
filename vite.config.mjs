import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import "dotenv/config";

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  define: {
    'process.env' : process.env
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './vitest.setup.mjs',
  },
});
