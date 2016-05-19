import {Component} from '@angular/core';
import {RouteConfig, ROUTER_PROVIDERS, ROUTER_DIRECTIVES} from '@angular/router-deprecated';
import {HTTP_PROVIDERS} from '@angular/http';
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
