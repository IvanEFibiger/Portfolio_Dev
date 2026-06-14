import { HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformServer } from '@angular/common';
import { API_ORIGIN } from '../tokens/api-origin.token';

// Durante SSR, las URLs relativas (`/api/...`) no son válidas para `fetch` en
// Node. Reescribimos al origen absoluto del backend, replicando el strip de
// `/api` que hacía nginx en producción (`/api/x` -> `${origin}/x`).
// En el navegador y en desarrollo (apiBaseUrl absoluto) es un no-op.
export const apiBaseInterceptor: HttpInterceptorFn = (req, next) => {
  if (isPlatformServer(inject(PLATFORM_ID)) && req.url.startsWith('/api/')) {
    const origin = inject(API_ORIGIN);
    if (origin) {
      return next(req.clone({ url: origin + req.url.slice('/api'.length) }));
    }
  }

  return next(req);
};
