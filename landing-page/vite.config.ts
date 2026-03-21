import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'node:fs';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, __dirname, '');
  const appRoot = path.resolve(__dirname, '..');
  const pageRoutes = [
    ['login', 'login.html'],
    ['register', 'register.html'],
    ['terms', 'terms.html'],
    ['privacy-policy', 'privacy-policy.html'],
    ['refund-policy', 'refund-policy.html'],
    ['help', 'help.html'],
  ] as const;
  const devStaticFiles = new Map<string, string>([
    ...pageRoutes.flatMap(([route, file]) => [
      [`/${route}`, path.join(appRoot, file)] as const,
      [`/${route}/`, path.join(appRoot, file)] as const,
      [`/${file}`, path.join(appRoot, file)] as const,
    ]),
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
