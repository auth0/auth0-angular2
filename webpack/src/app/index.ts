// App
export * from './app.component';
export * from './app.service';

import {AppState} from './app.service';
import { AuthGuard } from './auth/auth.service';
import {AUTH_PROVIDERS} from 'angular2-jwt';

// Application wide providers
export const APP_PROVIDERS = [
  AppState,
  AuthGuard,
  AUTH_PROVIDERS
];
