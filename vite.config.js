import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  build: {
    chunkSizeWarningLimit: 1000, // Set the limit to 500KB
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor'; // Create a separate chunk for vendor libraries
          }
          if (id.includes('specific-directory')) {
            return 'specific-chunk'; // Create a chunk for specific modules
          }
        },
      },
    },
  },
  plugins: [react()],
});
