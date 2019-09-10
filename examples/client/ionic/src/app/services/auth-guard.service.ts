import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Authllizer } from '@authllizer/core';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private auth: Authllizer, private router: Router) {
    }

    canActivate(): boolean {
        if (!this.auth.isAuthenticated()) {
            this.router.navigateByUrl('/');
            return false;
        }

        return true;
    }

}
