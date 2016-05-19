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
var router_deprecated_1 = require('@angular/router-deprecated');
var angular2_jwt_1 = require('angular2-jwt');
var auth_service_1 = require('./auth.service');
var Profile = (function () {
    function Profile(auth) {
        this.auth = auth;
    }
    Profile = __decorate([
        core_1.Component({
            selector: 'profile',
            template: "\n    <h1>Profile</h1>\n    <img [src]=\"auth.user.picture\">\n    <h2>{{auth.user.nickname}}</h2>\n    <span>{{auth.user.email}}</span>\n  "
        }),
        router_deprecated_1.CanActivate(function () { return angular2_jwt_1.tokenNotExpired(); }), 
        __metadata('design:paramtypes', [auth_service_1.Auth])
    ], Profile);
    return Profile;
}());
exports.Profile = Profile;
//# sourceMappingURL=profile.component.js.map