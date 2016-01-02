import {bootstrap} from 'angular2/platform/browser';
import {Component, View, provide} from 'angular2/core';
import {RouteConfig, Router, APP_BASE_HREF, ROUTER_PROVIDERS, ROUTER_DIRECTIVES, CanActivate} from 'angular2/router';
import {HTTP_PROVIDERS, Http} from 'angular2/http';
import {AuthHttp, AuthConfig, tokenNotExpired, JwtHelper} from 'angular2-jwt';

declare var Auth0Lock;

@Component({
  selector: 'public-route'
})
@View({
  template: `<h1>Hello from a public route</h1>`
})
class PublicRoute {}

@Component({
  selector: 'private-route'
})

@View({
  template: `<h1>Hello from private route</h1>`
})

@CanActivate(() => tokenNotExpired())

class PrivateRoute {}

@Component({
  selector: 'app',
  directives: [ ROUTER_DIRECTIVES ],
  template: `
    <h1>Welcome to Angular2 with Auth0</h1>
    <button *ngIf="!loggedIn()" (click)="login()">Login</button>
    <button *ngIf="loggedIn()" (click)="logout()">Logout</button>
    <hr>
    <div>
      <button [routerLink]="['./PublicRoute']">Public Route</button>
      <button *ngIf="loggedIn()" [routerLink]="['./PrivateRoute']">Private Route</button>
      <router-outlet></router-outlet>
    </div>
    <hr>
    <button (click)="getThing()">Get Thing</button>
    <button *ngIf="loggedIn()" (click)="tokenSubscription()">Show Token from Observable</button>
    <button (click)="getSecretThing()">Get Secret Thing</button>
    <button *ngIf="loggedIn()" (click)="useJwtHelper()">Use Jwt Helper</button>
  `
})

@RouteConfig([
  { path: '/public-route', component: PublicRoute, as: 'PublicRoute' },
  { path: '/private-route', component: PrivateRoute, as: 'PrivateRoute' }
])

export class App {

  lock = new Auth0Lock('YOUR_CLIENT_ID', 'YOUR_CLIENT_DOMAIN');
  jwtHelper: JwtHelper = new JwtHelper();

  constructor(public http: Http, public authHttp: AuthHttp) {}

  login() {
    this.lock.show((err: string, profile: string, id_token: string) => {

      if (err) {
        throw new Error(err);
      }

      localStorage.setItem('profile', JSON.stringify(profile));
      localStorage.setItem('id_token', id_token);

    });
  }

  logout() {
    localStorage.removeItem('profile');
    localStorage.removeItem('id_token');
  }

  loggedIn() {
    return tokenNotExpired();
  }

  getThing() {
    this.http.get('http://localhost:3001/ping')
      .subscribe(
        data => console.log(data.json()),
        err => console.log(err),
        () => console.log('Complete')
      );
  }

  getSecretThing() {
    this.authHttp.get('http://localhost:3001/secured/ping')
      .subscribe(
        data => console.log(data.json()),
        err => console.log(err),
        () => console.log('Complete')
      );
  }

  tokenSubscription() {
    this.authHttp.tokenStream.subscribe(
        data => console.log(data),
        err => console.log(err),
        () => console.log('Complete')
      );
  }

  useJwtHelper() {
    var token = localStorage.getItem('id_token');

    console.log(
      this.jwtHelper.decodeToken(token),
      this.jwtHelper.getTokenExpirationDate(token),
      this.jwtHelper.isTokenExpired(token)
    );
  }
}


bootstrap(App, [
  HTTP_PROVIDERS,
  ROUTER_PROVIDERS,
  provide(AuthConfig, { useFactory: () => {
    return new AuthConfig();
  }}),
  AuthHttp,
  provide(APP_BASE_HREF, {useValue:'/'})
]);
