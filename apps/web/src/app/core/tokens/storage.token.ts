import { inject, InjectionToken, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

// Almacenamiento no-op para SSR: en el servidor no existe `localStorage`,
// y AuthService (providedIn: 'root') se instancia durante el render por el
// interceptor de auth. Devolver un Storage inerte evita el crash en servidor.
const NOOP_STORAGE: Storage = {
  length: 0,
  clear: () => undefined,
  getItem: () => null,
  key: () => null,
  removeItem: () => undefined,
  setItem: () => undefined,
};

export const BROWSER_STORAGE = new InjectionToken<Storage>('Browser storage', {
  providedIn: 'root',
  factory: () => (isPlatformBrowser(inject(PLATFORM_ID)) ? localStorage : NOOP_STORAGE),
});
