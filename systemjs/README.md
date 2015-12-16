# Auth0 + Angular 2 with angular2-jwt and SystemJS

This is an example app that shows how to use Auth0 with Angular 2. It uses Auth0's [angular2-jwt](https://github.com/auth0/angular2-jwt) module. The example app is based off of [ng2-play](https://github.com/pkozlowski-opensource/ng2-play) by [Pawel Kozlowski](https://twitter.com/pkozlowski_os).

## Installation

```bash
npm install -g gulp
npm install
```

## Start the App

```bash
gulp play
```

The app will be served at `localhost:9000`.

## Key Parts

### Map to angular2-jwt

```html
  <!-- index.html -->
  <script>
    //configure system loader
    System.config({
      defaultJSExtensions: true,
      packages: {
        "/angular2-jwt": {
          "defaultExtension": "js"
        }
      },
      map: {
        "angular2-jwt": "node_modules/angular2-jwt/angular2-jwt"
      }
    });
  </script>
```

### Import the Required **Angular 2** and **angular2-jwt** Classes

```ts
// src/app.ts

import {bootstrap} from 'angular2/platform/browser';
import {Component, View, provide} from 'angular2/core';
import {RouteConfig, Router, APP_BASE_HREF, ROUTER_PROVIDERS, ROUTER_DIRECTIVES, CanActivate} from 'angular2/router';
import {HTTP_PROVIDERS, Http} from 'angular2/http';
import {AuthHttp, tokenNotExpired, JwtHelper} from 'angular2-jwt';
```

### Include Auth0's Lock

```html
  <!-- index.html -->

  <!-- Auth0 Lock script and AngularJS module -->
  <script src="//cdn.auth0.com/js/lock-7.12.min.js"></script>
```

### Set up a Basic Application Component

```ts
// src/app.ts

@Component({
  directives: [ ROUTER_DIRECTIVES ],
  selector: 'app',
  template: `
    <h1>Welcome to Angular2 with Auth0</h1>
    <button *ngIf="!loggedIn()" (click)="login()">Login</button>
    <button *ngIf="loggedIn()" (click)="logout()">Logout</button>
  `
})

export class AuthApp {

  lock: Auth0Lock = new Auth0Lock(YOUR_CLIENT_ID, YOUR_CLIENT_DOMAIN);

  constructor() {}

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

}
```

### Make Authenticated Requests with AuthHttp

The `AuthHttp` class is used to make authenticated HTTP requests. The class uses Angular 2's **Http** module but includes the `Authorization` header for you.

```ts
// src/app.ts

...

constructor(public authHttp: AuthHttp) {}

getSecretThing() {
  this.authHttp.get('http://example.com/api/secretthing')
    .subscribe(
      data => console.log(data.json()),
      err => console.log(err),
      () => console.log('Complete')
    );
  );
}

...

bootstrap(AuthApp, [
  HTTP_PROVIDERS,
  provide(AuthHttp, { useFactory: () => {
    return new AuthHttp();
  }})
])
```

### Protect Private Routes by Checking Token Expiry

Although data from the API will be protected and require a valid JWT to access, users that aren't authenticated will be able to get to any route by default. We can use the `@CanActivate` life-cycle hook from Angular 2's router to limit navigation on certain routes to only those with a non-expired JWT.

```ts
// src/app.ts

...

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
  directives: [ ROUTER_DIRECTIVES ],
  selector: 'app',
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

  `
})

@RouteConfig([
  { path: '/public-route', component: PublicRoute, as: 'PublicRoute' }
  { path: '/private-route', component: PrivateRoute, as: 'PrivateRoute' }
])

export class AuthApp {

...

}

bootstrap(AuthApp, [
  HTTP_PROVIDERS,
  ROUTER_PROVIDERS, 
  provide(AuthHttp, { useFactory: () => {
    return new AuthHttp();
  }}),
  provide(APP_BASE_HREF, {useValue:'/'})
])
```

### Use the JWT as an Observable

If you wish to use the JWT as an observable stream, you can call `tokenStream` from `AuthHttp`.

```ts
// src/app.ts

tokenSubscription() {
  this.authHttp.tokenStream.subscribe(
      data => console.log(data),
      err => console.log(err),
      () => console.log('Complete')
    );
}
```

This can be useful for cases where you want to make HTTP requests out of obsevable streams. The `tokenStream` can be mapped and combined with other streams at will.
```

### Using JwtHelper in Components

The `JwtHelper` class has several useful methods that can be utilized in your components:

* `decodeToken`
* `getTokenExpirationDate`
* `isTokenExpired`

You can use these methods by passing in the token to be evaluated.

```ts
// src/app.ts

...

jwtHelper: JwtHelper = new JwtHelper();

...

useJwtHelper() {
  var token = localStorage.getItem('id_token');
  
  console.log(
    this.jwtHelper.decodeToken(token),
    this.jwtHelper.getTokenExpirationDate(token),
    this.jwtHelper.isTokenExpired(token)
  );
}

...
```

## What is Auth0?

Auth0 helps you to:

* Add authentication with [multiple authentication sources](https://docs.auth0.com/identityproviders), either social like **Google, Facebook, Microsoft Account, LinkedIn, GitHub, Twitter, Box, Salesforce, amont others**, or enterprise identity systems like **Windows Azure AD, Google Apps, Active Directory, ADFS or any SAML Identity Provider**.
* Add authentication through more traditional **[username/password databases](https://docs.auth0.com/mysql-connection-tutorial)**.
* Add support for **[linking different user accounts](https://docs.auth0.com/link-accounts)** with the same user.
* Support for generating signed [Json Web Tokens](https://docs.auth0.com/jwt) to call your APIs and **flow the user identity** securely.
* Analytics of how, when and where users are logging in.
* Pull data from other sources and add it to the user profile, through [JavaScript rules](https://docs.auth0.com/rules).

## Create a free account in Auth0

1. Go to [Auth0](https://auth0.com) and click Sign Up.
2. Use Google, GitHub or Microsoft Account to login.

## Author

[Auth0](https://auth0.com)

## License

This project is licensed under the MIT license. See the [LICENSE](LICENSE.txt) file for more info.
