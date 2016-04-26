import {Component} from 'angular2/core';
import {CanActivate} from 'angular2/router';
import {tokenNotExpired} from 'angular2-jwt';
import {Auth} from '../auth/auth.service';

@Component({
  selector: 'profile',
  template: require('./profile.template.html')
})

@CanActivate(() => tokenNotExpired())

export class Profile {
  
  constructor(private auth: Auth) {}
}