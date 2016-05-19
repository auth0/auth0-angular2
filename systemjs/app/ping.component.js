"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var angular2_jwt_1 = require('angular2-jwt');
var auth_service_1 = require('./auth.service');
require('rxjs/add/operator/map');
var Ping = (function () {
    function Ping(http, authHttp, auth) {
        this.http = http;
        this.authHttp = authHttp;
        this.auth = auth;
        this.API_URL = 'http://localhost:3001';
    }
    Ping.prototype.ping = function () {
        var _this = this;
        this.http.get(this.API_URL + "/ping")
            .map(function (res) { return res.json(); })
            .subscribe(function (data) { return _this.message = data.text; }, function (error) { return _this.message = error._body; });
    };
    Ping.prototype.securedPing = function () {
        var _this = this;
        this.authHttp.get(this.API_URL + "/secured/ping")
            .map(function (res) { return res.json(); })
            .subscribe(function (data) { return _this.message = data.text; }, function (error) { return _this.message = error._body; });
    };
    Ping = __decorate([
        core_1.Component({
            selector: 'ping',
            template: "\n    <h1>Send a Ping to the Server</h1>\n    <p *ngIf=\"!auth.authenticated()\">Log In to Get Access to a Secured Ping</p>\n    <button class=\"btn btn-primary\" (click)=\"ping()\">Ping</button>\n    <button class=\"btn btn-primary\" (click)=\"securedPing()\" *ngIf=\"auth.authenticated()\">Secured Ping</button>\n    <h2>{{message}}</h2>\n  "
        }), 
        __metadata('design:paramtypes', [http_1.Http, angular2_jwt_1.AuthHttp, auth_service_1.Auth])
    ], Ping);
    return Ping;
}());
exports.Ping = Ping;
//# sourceMappingURL=ping.component.js.map