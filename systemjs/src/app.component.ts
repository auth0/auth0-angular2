import {bootstrap} from 'angular2/platform/browser';
import {LocationStrategy, HashLocationStrategy} from 'angular2/platform/common';
import {provide, Component} from 'angular2/core';
import {RouteConfig, ROUTER_PROVIDERS, ROUTER_DIRECTIVES} from 'angular2/router';
import {HTTP_PROVIDERS} from 'angular2/http';
import {AUTH_PROVIDERS} from 'angular2-jwt';

import {Home} from './home.component';
import {Ping} from './ping.component';
import {Profile} from './profile.component';
import {Auth} from './auth.service';

@Component({
  selector: 'app',
  providers: [ Auth ],
  directives: [ ROUTER_DIRECTIVES ],
  templateUrl: 'src/app.template.html',
  styles: [`.btn-margin { margin-top: 5px}`]
})
@RouteConfig([
  { path: '/home',  name: 'Home',  component: Home, useAsDefault: true },
  { path: '/ping',  name: 'Ping',  component: Ping },
  { path: '/profile',  name: 'Profile',  component: Profile }
])
export class App {

  constructor(private auth: Auth) {}

}

bootstrap(App, [
  HTTP_PROVIDERS,
  ROUTER_PROVIDERS,
  AUTH_PROVIDERS,
  provide(LocationStrategy, { useClass: HashLocationStrategy })
])