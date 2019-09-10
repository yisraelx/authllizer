import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { Authllizer } from '@authllizer/core';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private auth: Authllizer, private router: Router) {
    }

    canActivate({data: {auth}}: ActivatedRouteSnapshot): boolean {
        if (this.auth.isAuthenticated() !== auth) {
            this.router.navigateByUrl(auth ? '/signin' : '/');
            return false;
        }

        return true;
    }

}
