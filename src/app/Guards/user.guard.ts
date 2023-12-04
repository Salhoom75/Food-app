import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router:Router ,  _AuthService:AuthService) {
    _AuthService.getProfile()
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot ): Observable<boolean> | Promise<boolean> | boolean {
   
  if (localStorage.getItem('userToken') !== null && localStorage.getItem('role') =='SystemUser') {
    return true;
  } 
  else {
    this.router.navigate(['/dashboard'])
    return false;
  }
  ;

}}