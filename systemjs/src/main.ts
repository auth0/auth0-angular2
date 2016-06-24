import { bootstrap } from '@angular/platform-browser-dynamic';
import { provide } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { provideRouter } from '@angular/router';
import { HTTP_PROVIDERS } from '@angular/http';
import { AUTH_PROVIDERS } from 'angular2-jwt';
import { AuthGuard } from './auth.service';
import { routes } from './app.routes';

import { App } from './app.component';

bootstrap(App, [
  provideRouter(routes),
  AuthGuard,
  HTTP_PROVIDERS,
  AUTH_PROVIDERS,
  provide(LocationStrategy, { useClass: HashLocationStrategy })
])
