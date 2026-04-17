import path from "path"
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'serve-brain-media',
      configureServer(server) {
        server.middlewares.use('/media/generator', (req, res, next) => {
          const reqUrl = req.url?.split('?')[0];
          if (reqUrl) {
            const brainDir = 'C:\\Users\\ANUJ\\.gemini\\antigravity\\brain\\34c18d17-9aff-4636-814a-eeaf593d88fc';
            const fileName = path.basename(reqUrl);
            const filePath = path.join(brainDir, fileName);
            if (fs.existsSync(filePath)) {
              res.setHeader('Content-Type', filePath.endsWith('.jpg') ? 'image/jpeg' : 'image/png');
              const stream = fs.createReadStream(filePath);
              stream.pipe(res);
              return;
            }
          }
          next();
        });
      }
    }
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  assetsInclude: ['**/*.glb'],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'router': ['react-router-dom'],
          'motion': ['framer-motion'],
          'gsap-vendor': ['gsap'],
          'lenis': ['lenis'],
        },
      },
    },
    // Enable chunk size reporting
    chunkSizeWarningLimit: 500,
  },
});

