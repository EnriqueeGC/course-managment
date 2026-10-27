import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
const config = defineConfig({
  plugins: [react(), tsconfigPaths(), tailwindcss()],
});

export default config;
