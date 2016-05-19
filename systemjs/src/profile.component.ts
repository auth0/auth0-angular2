import {Component} from '@angular/core';
import {CanActivate} from '@angular/router-deprecated';
import {tokenNotExpired} from 'angular2-jwt';
import {Auth} from './auth.service';

@Component({
  selector: 'profile',
  template: `
    <h1>Profile</h1>
    <img [src]="auth.user.picture">
    <h2>{{auth.user.nickname}}</h2>
    <span>{{auth.user.email}}</span>
  `
})

@CanActivate(() => tokenNotExpired())

export class Profile {

  constructor(private auth: Auth) {}
}
