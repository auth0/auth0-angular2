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
var home_component_1 = require('./home.component');
var ping_component_1 = require('./ping.component');
var profile_component_1 = require('./profile.component');
var auth_service_1 = require('./auth.service');
var App = (function () {
    function App(auth) {
        this.auth = auth;
    }
    App = __decorate([
        core_1.Component({
            selector: 'app',
            providers: [auth_service_1.Auth],
            directives: [router_deprecated_1.ROUTER_DIRECTIVES],
            templateUrl: 'src/app.template.html',
            styles: [".btn-margin { margin-top: 5px}"]
        }),
        router_deprecated_1.RouteConfig([
            { path: '/home', name: 'Home', component: home_component_1.Home, useAsDefault: true },
            { path: '/ping', name: 'Ping', component: ping_component_1.Ping },
            { path: '/profile', name: 'Profile', component: profile_component_1.Profile }
        ]), 
        __metadata('design:paramtypes', [auth_service_1.Auth])
    ], App);
    return App;
}());
exports.App = App;
//# sourceMappingURL=app.component.js.map