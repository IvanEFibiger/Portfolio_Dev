import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';
import { API_ORIGIN } from './core/tokens/api-origin.token';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    // URL interna del backend para las peticiones SSR (ver apiBaseInterceptor).
    {
      provide: API_ORIGIN,
      useFactory: () => process.env['API_PROXY_TARGET'] ?? 'http://localhost:3000',
    },
  ],
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
