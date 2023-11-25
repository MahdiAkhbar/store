import { 
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { Inject, Injectable, inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root'})
class AdminGaurd {
  constructor(@Inject(AuthService) private authService: AuthService, private router: Router) {}
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Promise<boolean | UrlTree> {
    return this.authService.isAdmin()
    .then((isAdmin) => {
      if (isAdmin)
        return true;
      else
        return false
        // return this.router.createUrlTree(['/']);
    })
  }
}

export const adminGuard: CanActivateFn = (route, state) => {
  return inject(AdminGaurd).canActivate(route, state);
}
