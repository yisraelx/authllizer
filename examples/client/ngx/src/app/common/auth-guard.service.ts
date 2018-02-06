import { Injectable } from '@angular/core';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanLoad,
  Route
} from '@angular/router';
import { Authllizer } from '@authllizer/core';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private auth: Authllizer, private router: Router) { }

  canLoad(route: Route): boolean {
    return !this.auth.isAuthenticated()
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!this.auth.isAuthenticated()) {
      this.router.navigateByUrl('/login')
      return false;
    }

    return true;
  }

}
