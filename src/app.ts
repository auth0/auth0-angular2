import {View, Component, bootstrap, provide, CORE_DIRECTIVES, NgIf} from 'angular2/angular2';
import {HTTP_PROVIDERS} from 'angular2/http';
import {AuthHttp, tokenNotExpired, JwtHelper} from 'angular2-jwt/dist/angular2-jwt';
import {RouteConfig, ROUTER_DIRECTIVES, APP_BASE_HREF, ROUTER_PROVIDERS, CanActivate} from 'angular2/router';

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
  directives: [ CORE_DIRECTIVES, ROUTER_DIRECTIVES, NgIf ],
  selector: 'app',
  template: `
    <h1>Welcome to Angular2 with Auth0</h1>
    <button *ng-if="!loggedIn()" (click)="login()">Login</button>
    <button *ng-if="loggedIn()" (click)="logout()">Logout</button>
    <hr>
    <div>
      <button [router-link]="['./PublicRoute']">Public Route</button>
      <button *ng-if="loggedIn()" [router-link]="['./PrivateRoute']">Private Route</button>
      <router-outlet></router-outlet>
    </div>
    <hr>
    <button (click)="tokenSubscription()">Show Token from Observable</button>
    <button (click)="getSecretThing()">Get Secret Thing</button>
    <button (click)="useJwtHelper()">Use Jwt Helper</button>


  `
})

@RouteConfig([
  { path: '/public-route', component: PublicRoute, as: 'PublicRoute' }
  { path: '/private-route', component: PrivateRoute, as: 'PrivateRoute' }
])

export class AuthApp {

  lock = new Auth0Lock('w4ibtscMzP2Zs3jk6MteHwXZ422gGyQc', 'blogtest.auth0.com');
  jwtHelper: JwtHelper = new JwtHelper();

  constructor(public authHttp:AuthHttp) {}

  login() {
    this.lock.show(function(err, profile, id_token) {

      if(err) {
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

  getSecretThing() {
    this.authHttp.get('http://localhost:3001/secured/ping')
      .map(res => res.json())
      .subscribe(
        data => console.log(data),
        err => console.log(err),
        () => console.log('Complete')
      );
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

bootstrap(AuthApp, [
  HTTP_PROVIDERS,
  ROUTER_PROVIDERS, 
  provide(AuthHttp, { useFactory: () => {
    return new AuthHttp();
  }}),
  provide(APP_BASE_HREF, {useValue:'/'})
])