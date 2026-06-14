import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine, isMainModule } from '@angular/ssr/node';
import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import bootstrap from './main.server';

const serverDistFolder = dirname(fileURLToPath(import.meta.url));
const browserDistFolder = resolve(serverDistFolder, '../browser');
const indexHtml = join(serverDistFolder, 'index.server.html');

const apiTarget = process.env['API_PROXY_TARGET'] ?? 'http://localhost:3000';

const app = express();
// `NG_ALLOWED_HOSTS` (env) tiene precedencia; este fallback evita que el
// render caiga silenciosamente a CSR al ejecutar el server localmente sin env.
const commonEngine = new CommonEngine({ allowedHosts: ['localhost'] });

/**
 * Proxy de la API: reemplaza el rol que tenía nginx en producción.
 * `/api/x` -> `${apiTarget}/x` (se elimina el prefijo `/api`).
 */
app.use(
  '/api',
  createProxyMiddleware({
    target: apiTarget,
    changeOrigin: true,
    pathRewrite: { '^/api': '' },
  }),
);

/**
 * Proxy de SEO: sitemap.xml y robots.txt los genera el backend NestJS.
 * Se reenvían tal cual (sin reescribir el path) para que sean accesibles
 * desde el dominio público y no caigan en el catch-all de Angular.
 */
app.use(
  createProxyMiddleware({
    pathFilter: ['/sitemap.xml', '/robots.txt'],
    target: apiTarget,
    changeOrigin: true,
  }),
);

/**
 * Serve static files from /browser
 */
app.get(
  '**',
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: 'index.html',
  }),
);

/**
 * Handle all other requests by rendering the Angular application.
 */
app.get('**', (req, res, next) => {
  const { protocol, originalUrl, baseUrl, headers } = req;

  commonEngine
    .render({
      bootstrap,
      documentFilePath: indexHtml,
      url: `${protocol}://${headers.host}${originalUrl}`,
      publicPath: browserDistFolder,
      providers: [{ provide: APP_BASE_HREF, useValue: baseUrl }],
    })
    .then((html) => res.send(html))
    .catch((err) => next(err));
});

/**
 * Start the server if this module is the main entry point.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
if (isMainModule(import.meta.url)) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

export default app;
