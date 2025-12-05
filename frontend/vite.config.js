import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

export default defineConfig({
  base: './',
  plugins: [
    react(),
    nodePolyfills({
      protocolImports: true,
    }),
  ],

  define: {
    global: 'globalThis',
  },

  build: {
    outDir: 'dist',
    target: 'esnext',
  },
})
