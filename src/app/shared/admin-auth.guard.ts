import { 
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { Injectable, inject } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root'})
class AdminGaurd {
  constructor(private authService: AuthService, private router: Router) {}
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Promise<boolean | UrlTree> {
    return this.authService.isAdmin()
    .then((isAdmin) => {
      if (isAdmin)
        return true;
      else
        return this.router.createUrlTree(['/']);
    })
  }
}

export const adminAuthGuard: CanActivateFn = (route, state) => {
  return inject(AdminGaurd).canActivate(route, state);
}
