import {Component} from '@angular/core';
import {tokenNotExpired} from 'angular2-jwt';
import {Auth} from '../auth/auth.service';

@Component({
  selector: 'profile',
  template: require('./profile.template.html')
})

export class Profile {
  
  constructor(private auth: Auth) {}
}