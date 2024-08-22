import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';

import { authInterceptor } from './auth/auth-interceptor';
import { AuthGuard } from './auth/auth.guard';
import { errorInterceptor } from './error-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideClientHydration(), 
    provideAnimationsAsync(), 
    provideHttpClient(withFetch(), withInterceptors([authInterceptor, errorInterceptor])),
    AuthGuard
    // { provide: HTTP_INTERCEPTORS, useClass: authInterceptor, multi: true}
  ]
};
