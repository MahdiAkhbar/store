import { Injectable, inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";

import { UsersService } from "../services/users.service";

@Injectable({
    providedIn: 'root'
})
class AuthGuard {
    constructor(private usersService: UsersService, private router: Router) {}
    logedin : boolean = false;

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Promise<boolean> {
        let status = this.usersService.getLoginStatus();
        if (status)
            return true;
        else
            this.router.navigate(['/']);
            return false;
    }
}
export const authGuard: CanActivateFn = (route, state) => {
    return inject(AuthGuard).canActivate(route, state);
}