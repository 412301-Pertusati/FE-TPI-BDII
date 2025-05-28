import { Injectable } from '@angular/core';
import {CanActivateChild, Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivateChild {

  constructor( private router: Router) {}

  private isAuthenticated(): boolean {
    return localStorage.getItem('token') !== null;
  }

  canActivateChild(): boolean {
    if (this.isAuthenticated()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
