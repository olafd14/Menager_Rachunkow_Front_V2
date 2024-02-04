import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {
    constructor(private cookieService: CookieService, private router: Router) { }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const userMail = this.cookieService.get('userMail');
        if (userMail) {
            return true;
        } else {
            this.router.navigate(['/login']);
            return false;
        }
    }
}