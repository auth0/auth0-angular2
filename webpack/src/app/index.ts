// App
export * from './app.component';
export * from './app.service';

import {AppState} from './app.service';
import {AUTH_PROVIDERS} from 'angular2-jwt';

// Application wide providers
export const APP_PROVIDERS = [
  AppState,
  AUTH_PROVIDERS
];
