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
var Auth = (function () {
    function Auth(authHttp, zone, router) {
        this.authHttp = authHttp;
        this.router = router;
        this.lock = new Auth0Lock('YOUR_AUTH0_CLIENT_ID', 'YOUR_AUTH0_DOMAIN');
        this.zoneImpl = zone;
        this.user = JSON.parse(localStorage.getItem('profile'));
    }
    Auth.prototype.authenticated = function () {
        // Check if there's an unexpired JWT
        return angular2_jwt_1.tokenNotExpired();
    };
    Auth.prototype.login = function () {
        var _this = this;
        // Show the Auth0 Lock widget
        this.lock.show({}, function (err, profile, token) {
            if (err) {
                alert(err);
                return;
            }
            // If authentication is successful, save the items
            // in local storage
            localStorage.setItem('profile', JSON.stringify(profile));
            localStorage.setItem('id_token', token);
            _this.zoneImpl.run(function () { return _this.user = profile; });
        });
    };
    Auth.prototype.logout = function () {
        var _this = this;
        localStorage.removeItem('profile');
        localStorage.removeItem('id_token');
        this.zoneImpl.run(function () { return _this.user = null; });
        this.router.navigate(['Home']);
    };
    Auth = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [angular2_jwt_1.AuthHttp, core_1.NgZone, router_deprecated_1.Router])
    ], Auth);
    return Auth;
}());
exports.Auth = Auth;
//# sourceMappingURL=auth.service.js.map