/*
 * Angular 2 decorators and services
 */
import {Component, ViewEncapsulation} from '@angular/core';
import {RouteConfig} from '@angular/router-deprecated';

import {Home} from './home';
import {Ping} from './ping';
import {Profile} from './profile';
import {Auth} from './auth';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  providers: [ Auth ],
  encapsulation: ViewEncapsulation.None,
  styles: [ 
    require('normalize.css'), 
    `md-toolbar button { color: #fff !important }`
  ],
  template: require('./app.template.html')
})
@RouteConfig([
  { path: '/',      name: 'Index', component: Home, useAsDefault: true },
  { path: '/home',  name: 'Home',  component: Home },
  { path: '/ping',  name: 'Ping',  component: Ping },
  { path: '/profile',  name: 'Profile',  component: Profile }
])
export class App {

  constructor(private auth: Auth) {}

}