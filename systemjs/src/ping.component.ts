import {Component} from '@angular/core';
import {Http} from '@angular/http';

import {AuthHttp} from 'angular2-jwt';
import {Auth} from './auth.service';
import 'rxjs/add/operator/map';

@Component({
  selector: 'ping',
  template: `
    <h1>Send a Ping to the Server</h1>
    <p *ngIf="!auth.authenticated()">Log In to Get Access to a Secured Ping</p>
    <button class="btn btn-primary" (click)="ping()">Ping</button>
    <button class="btn btn-primary" (click)="securedPing()" *ngIf="auth.authenticated()">Secured Ping</button>
    <h2>{{message}}</h2>
  `
})
export class Ping {
  API_URL: string = 'http://localhost:3001';
  message: string;

  constructor(private http: Http, private authHttp: AuthHttp, private auth: Auth) {}

  ping() {
    this.http.get(`${this.API_URL}/ping`)
      .map(res => res.json())
      .subscribe(
        data => this.message = data.text,
        error => this.message = error._body
      );
  }

  securedPing() {
    this.authHttp.get(`${this.API_URL}/secured/ping`)
      .map(res => res.json())
      .subscribe(
        data => this.message= data.text,
        error => this.message = error._body
      );
  }
}
