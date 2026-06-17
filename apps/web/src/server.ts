import { APP_BASE_HREF } from '@angular/common';
import { CSP_NONCE } from '@angular/core';
import { CommonEngine, isMainModule } from '@angular/ssr/node';
import compression from 'compression';
import express from 'express';
import helmet from 'helmet';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { randomBytes } from 'node:crypto';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import bootstrap from './main.server';

const serverDistFolder = dirname(fileURLToPath(import.meta.url));
const browserDistFolder = resolve(serverDistFolder, '../browser');
const indexHtml = join(serverDistFolder, 'index.server.html');

const apiTarget = process.env['API_PROXY_TARGET'] ?? 'http://localhost:3000';
const rawSsrCacheTtl = Number(process.env['SSR_CACHE_TTL_MS'] ?? 60000);
const SSR_CACHE_TTL_MS =
  Number.isFinite(rawSsrCacheTtl) && rawSsrCacheTtl > 0 ? rawSsrCacheTtl : 0;
const SSR_CACHE_MAX_ENTRIES = 200;

const app = express();
app.use(compression());
// CSP desactivado: el HTML hidratado de Angular usa estilos/scripts inline y
// una CSP estricta lo rompería. El resto de headers de helmet sí aplican.
app.use(helmet({ contentSecurityPolicy: false }));
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
    // Propaga el IP del cliente a la API (X-Forwarded-For) para el conteo de
    // visitantes únicos. En prod nginx ya lo setea; esto cubre el caso local.
    xfwd: true,
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
 * Caché en memoria del HTML renderizado por SSR para rutas públicas.
 * La clave es el path normalizado (req.originalUrl). Se limita el tamaño
 * del Map para evitar fugas de memoria a largo plazo.
 */
interface SsrCacheEntry {
  html: string;
  nonce: string;
  expires: number;
}

const ssrCache = new Map<string, SsrCacheEntry>();

function isAdminRoute(url: string): boolean {
  return url.startsWith('/admin');
}

function hasSessionIndicators(req: express.Request): boolean {
  return Boolean(req.headers.authorization ?? req.headers.cookie);
}

function isCacheableRequest(req: express.Request): boolean {
  if (req.method !== 'GET') return false;
  if (SSR_CACHE_TTL_MS <= 0) return false;
  if (isAdminRoute(req.originalUrl)) return false;
  if (hasSessionIndicators(req)) return false;
  return true;
}

function cleanupExpiredCache(): void {
  const now = Date.now();
  for (const [key, entry] of ssrCache) {
    if (entry.expires <= now) {
      ssrCache.delete(key);
    }
  }
}

function enforceCacheLimit(): void {
  if (ssrCache.size <= SSR_CACHE_MAX_ENTRIES) return;
  cleanupExpiredCache();
  while (ssrCache.size > SSR_CACHE_MAX_ENTRIES) {
    const oldestKey = ssrCache.keys().next().value as string | undefined;
    if (oldestKey) {
      ssrCache.delete(oldestKey);
    }
  }
}

function createCspNonce(): string {
  return randomBytes(16).toString('base64');
}

function createContentSecurityPolicy(nonce: string): string {
  return [
    "default-src 'self'",
    `script-src 'self' 'nonce-${nonce}'`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: https:",
    "font-src 'self'",
    "connect-src 'self'",
    "object-src 'none'",
    "base-uri 'self'",
    "frame-ancestors 'none'",
    "form-action 'self'",
  ].join('; ');
}

function setContentSecurityPolicy(res: express.Response, nonce: string): void {
  res.setHeader('Content-Security-Policy', createContentSecurityPolicy(nonce));
}

function applyCspNonce(html: string, nonce: string): string {
  return html.replace(
    /<script(?![^>]*\bsrc=)(?![^>]*\bnonce=)/g,
    `<script nonce="${nonce}"`,
  );
}

function disableInlineStylesheetOnloadHandlers(html: string): string {
  return html.replace(
    /<link rel="stylesheet" href="([^"]+)" media="print" onload="this\.media='all'">/g,
    '<link rel="stylesheet" href="$1">',
  );
}

function applyCspCompatibility(html: string, nonce: string): string {
  return disableInlineStylesheetOnloadHandlers(applyCspNonce(html, nonce));
}

function getCachedHtml(key: string): SsrCacheEntry | undefined {
  const entry = ssrCache.get(key);
  if (!entry) return undefined;
  if (entry.expires <= Date.now()) {
    ssrCache.delete(key);
    return undefined;
  }
  return entry;
}

function setCachedHtml(key: string, html: string, nonce: string): void {
  enforceCacheLimit();
  ssrCache.set(key, { html, nonce, expires: Date.now() + SSR_CACHE_TTL_MS });
}

/**
 * Handle all other requests by rendering the Angular application.
 */
app.get('**', (req, res) => {
  const { protocol, originalUrl, baseUrl, headers } = req;
  const cacheable = isCacheableRequest(req);
  const cacheKey = originalUrl;

  if (cacheable) {
    const cachedEntry = getCachedHtml(cacheKey);
    if (cachedEntry !== undefined) {
      setContentSecurityPolicy(res, cachedEntry.nonce);
      res.setHeader('X-SSR-Cache', 'HIT');
      res.setHeader(
        'Cache-Control',
        `public, max-age=${SSR_CACHE_TTL_MS / 1000}`,
      );
      res.send(cachedEntry.html);
      return;
    }
  }

  const nonce = createCspNonce();

  commonEngine
    .render({
      bootstrap,
      documentFilePath: indexHtml,
      url: `${protocol}://${headers.host}${originalUrl}`,
      publicPath: browserDistFolder,
      providers: [
        { provide: APP_BASE_HREF, useValue: baseUrl },
        { provide: CSP_NONCE, useValue: nonce },
      ],
    })
    .then((html) => {
      const cspCompatibleHtml = applyCspCompatibility(html, nonce);
      setContentSecurityPolicy(res, nonce);
      if (cacheable) {
        setCachedHtml(cacheKey, cspCompatibleHtml, nonce);
        res.setHeader('X-SSR-Cache', 'MISS');
        res.setHeader(
          'Cache-Control',
          `public, max-age=${SSR_CACHE_TTL_MS / 1000}`,
        );
      } else {
        res.setHeader('X-SSR-Cache', 'BYPASS');
        res.setHeader('Cache-Control', 'no-store');
      }
      res.send(cspCompatibleHtml);
    })
    .catch((err) => {
      console.error('SSR render error:', err);
      res.status(500).send('Internal Server Error');
    });
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
