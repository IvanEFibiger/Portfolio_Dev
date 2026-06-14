import { InjectionToken } from '@angular/core';

// Origen absoluto del backend para peticiones hechas durante SSR.
// En el navegador queda vacío (se usan rutas relativas `/api`); en el
// servidor se sobreescribe desde `app.config.server.ts` con la URL interna
// del API (p. ej. http://api:3000 dentro de Docker).
export const API_ORIGIN = new InjectionToken<string>('API origin (SSR)', {
  providedIn: 'root',
  factory: () => '',
});
