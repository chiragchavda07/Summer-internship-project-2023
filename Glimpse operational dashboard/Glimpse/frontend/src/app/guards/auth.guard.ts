import { AuthService } from '../services/auth/auth.service';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private auth: AuthService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
        const isLoggedin = this.auth.getLoggedin();
        const token = localStorage.getItem('token');
        if (isLoggedin && token) {
            // User is logged in, allow access to the dashboard
            console.log('already loggedin ',this.auth.getLoggedin());
            return true;
          } else {
            // User is not logged in, restrict access to login and signup
            console.log('Please login first ',this.auth.getLoggedin()); 
            this.router.navigate(['/login']); // Redirect to the login page
            return false;
          }
  }
}
// import { CanActivateFn } from '@angular/router';

// export const authGuard: CanActivateFn = (route, state) => {
//   return true;
// };


// import { ActivatedRouteSnapshot, CanActivateChildFn, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
// import { Injectable, inject } from "@angular/core";
// import { Observable } from 'rxjs';
// import { AuthService } from './auth.service';


// // export const canActivate: CanActivateFn = (
// //     route: ActivatedRouteSnapshot,
// //     state: RouterStateSnapshot
// //   ) => {
// //     const authService = inject(AuthService);
// //     const router = inject(Router);
  
// //     return true;
// //   };
  
// //   export const canActivateChild: CanActivateChildFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => canActivate(route, state)
// @Injectable({
//     providedIn: 'root'
//   })
// export class PermissionsService {
  
//     constructor(private router: Router,private authservice:AuthService) {}
  
//     canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean>  {
//         const isLoggedin = this.authservice.getLoggedin();
//         console.log(isLoggedin);
//         if (isLoggedin) {
//             // User is logged in, allow access to the dashboard
//             console.log('already login');
//             return true;
//           } else {
//             // User is not logged in, restrict access to login and signup
//             console.log('not login');
//             this.router.navigate(['/login']); // Redirect to the login page
//             return false;
//           }
//     }
// }
  
// export const AuthGuard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean| Observable<boolean> | Promise<boolean>  => {
//     return inject(PermissionsService).canActivate(next, state);
// }