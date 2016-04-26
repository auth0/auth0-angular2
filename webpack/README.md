# Auth0 + Angular 2 with angular2-jwt and Webpack

This is an example app that shows how to use Auth0 with Angular 2. It uses Auth0's [angular2-jwt](https://github.com/auth0/angular2-jwt) module. The example app is based off of [angular2-webpack-starter](https://github.com/AngularClass/angular2-webpack-starter) by [gdi2290](https://github.com/gdi2290).

## Installation

Clone the repo, then:

```bash
npm install
```

## Add Your Auth0 Credentials

If you haven't already done so, [sign up](https://auth0.com/signup) for your free Auth0 account. Once you have the client ID and client domain for your app, replace the argumentts in `Auth0Lock` within `auth.service.ts` with them.

## Start the App

```bash
npm run server
```

The app will be served at `localhost:3000`.

## Key Parts

### Create an Injectable Auth Service

The best way to have authentication utilities available across the application is to use an `Injectable` service. This is provided in `auth.service.ts` and is the spot where Auth0Lock is set up.

```ts
// app/auth/auth.service.ts
import {Injectable, NgZone} from 'angular2/core';
import {Router} from 'angular2/router';
import {AuthHttp, tokenNotExpired} from 'angular2-jwt';

// Avoid name not found warnings
declare var Auth0Lock: any;

@Injectable()
export class Auth {
  lock = new Auth0Lock('YOUR_AUTH0_CLIENT_ID', 'YOUR_AUTH0_DOMAIN');
  refreshSubscription: any;
  user: Object;
  zoneImpl: NgZone;

...
```

### Make Calls to a Secure API

The `AuthHttp` class is used to automatically attach the user's JWT as an `Authorization` header when making requests. Making secure HTTP calls looks the same as it would with regular `Http`.

```ts
// ping.component.ts

...

securedPing() {
  this.authHttp.get(`${this.API_URL}/secured/ping`)
    .map(res => res.json())
    .subscribe(
      data => this.message= data.text,
      error => this.message = error._body
    );
}

...
```

### Where is the Server?

There is a simple NodeJS server in the `server` directory. See the readme there for instructions on starting it.

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