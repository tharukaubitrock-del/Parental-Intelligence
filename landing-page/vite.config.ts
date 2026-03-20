import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'node:fs';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, __dirname, '');
  const appRoot = path.resolve(__dirname, '..');
  const devStaticFiles = new Map<string, string>([
    ['/login.html', path.join(appRoot, 'login.html')],
    ['/register.html', path.join(appRoot, 'register.html')],
    ['/terms.html', path.join(appRoot, 'terms.html')],
    ['/help.html', path.join(appRoot, 'help.html')],
    ['/style.css', path.join(appRoot, 'style.css')],
    ['/script.js', path.join(appRoot, 'script.js')],
  ]);
  const contentTypes: Record<string, string> = {
    '.css': 'text/css; charset=utf-8',
    '.gif': 'image/gif',
    '.html': 'text/html; charset=utf-8',
    '.ico': 'image/x-icon',
    '.js': 'application/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.png': 'image/png',
    '.svg': 'image/svg+xml',
  };

  const chatbotDevBridge = {
    configureServer(server: any) {
      server.middlewares.use((req: any, res: any, next: any) => {
        const requestPath = (req.url || '').split('?')[0];
        const directFile = devStaticFiles.get(requestPath);

        if (directFile && fs.existsSync(directFile)) {
          res.setHeader('Content-Type', contentTypes[path.extname(directFile)] || 'application/octet-stream');
          fs.createReadStream(directFile).pipe(res);
          return;
        }

        if (requestPath.startsWith('/img/')) {
          const imgFile = path.join(appRoot, requestPath.slice(1));
          if (fs.existsSync(imgFile)) {
            res.setHeader('Content-Type', contentTypes[path.extname(imgFile)] || 'application/octet-stream');
            fs.createReadStream(imgFile).pipe(res);
            return;
          }
        }

        next();
      });
    },
  };

  return {
    base: '/',
    plugins: [react(), tailwindcss(), chatbotDevBridge],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
