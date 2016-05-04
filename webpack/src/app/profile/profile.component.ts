import {Component} from '@angular/core';
import {CanActivate} from '@angular/router-deprecated';
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