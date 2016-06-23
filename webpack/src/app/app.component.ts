/*
 * Angular 2 decorators and services
 */
import {Component, ViewEncapsulation} from '@angular/core';

import {Auth} from './auth';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  providers: [ Auth ],
  encapsulation: ViewEncapsulation.None,
  template: require('./app.template.html'),
  styles: [`.btn-margin { margin-top: 5px}`]
})
export class App {

  constructor(private auth: Auth) {}

}