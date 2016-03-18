# Auth0 + Angular 2 with angular2-jwt and Webpack

This is an example app that shows how to use Auth0 with Angular 2. It uses Auth0's [angular2-jwt](https://github.com/auth0/angular2-jwt) module. The example app is based off of [angular2-webpack-starter](https://github.com/AngularClass/angular2-webpack-starter) by [gdi2290](https://github.com/gdi2290).

## Installation

Clone the repo, then:

```bash
npm install
```

## Start the App

```bash
npm run server
```

The app will be served at `localhost:3000`.

## Key Parts

### Import the Required **Angular 2** and **angular2-jwt** Classes

```ts
// src/app/app.ts

import {Component, View} from 'angular2/core';
import {RouteConfig, Router, ROUTER_DIRECTIVES, CanActivate} from 'angular2/router';
import {Http} from 'angular2/http';
import {FORM_PROVIDERS} from 'angular2/common';
import {AuthHttp, tokenNotExpired, JwtHelper} from 'angular2-jwt';
```

### Include Auth0's Lock

```html
  <!-- src/public/index.html -->

  <!-- Auth0 Lock script and AngularJS module -->
  <script src="//cdn.auth0.com/js/lock-9.0.js"></script>
```

### Set up a Basic Application Component

```ts
// src/app/app.ts

@Component({
  directives: [ ROUTER_DIRECTIVES ],
  selector: 'app',
  template: `
    <h1>Welcome to Angular2 with Auth0</h1>
    <button *ng-if="!loggedIn()" (click)="login()">Login</button>
    <button *ng-if="loggedIn()" (click)="logout()">Logout</button>
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
// src/app/app.ts

...

constructor(public authHttp: AuthHttp) {}

getSecretThing() {
  this.authHttp.get('http://localhost:3001/secured/ping')
    .subscribe(
      data => console.log(data.json()),
      err => console.log(err),
      () => console.log('Complete')
    );
}
```

Bootstrap the application in `src/bootstrap.ts`.

```ts
// src/app/app.ts

...

bootstrap(App, [
  HTTP_PROVIDERS,
  provide(AuthHttp, {
    useFactory: (http) => {
      return new AuthHttp(new AuthConfig(), http);
    },
    deps: [Http]
  })
]);

...
```

### Protect Private Routes by Checking Token Expiry

Although data from the API will be protected and require a valid JWT to access, users that aren't authenticated will be able to get to any route by default. We can use the `@CanActivate` life-cycle hook from Angular 2's router to limit navigation on certain routes to only those with a non-expired JWT.

```ts
// src/app/app.ts

import {RouteConfig, Router, ROUTER_DIRECTIVES, CanActivate} from 'angular2/router';

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
    <button *ng-if="!loggedIn()" (click)="login()">Login</button>
    <button *ng-if="loggedIn()" (click)="logout()">Logout</button>
    <hr>
    <div>
      <button [routerLink]="['./PublicRoute']">Public Route</button>
      <button *ng-if="loggedIn()" [routerLink]="['./PrivateRoute']">Private Route</button>
      <router-outlet></router-outlet>
    </div>

  `
})

@RouteConfig([
  { path: '/public-route', component: PublicRoute, as: 'PublicRoute' }
  { path: '/private-route', component: PrivateRoute, as: 'PrivateRoute' }
])

...


```

### Use the JWT as an Observable

If you wish to use the JWT as an observable stream, you can call `tokenStream` from `AuthHttp`.

```ts
// src/app/app.ts

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
// src/app/app.ts

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
