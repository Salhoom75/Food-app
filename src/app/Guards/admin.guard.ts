import { CanActivateFn } from '@angular/router';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';



@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router:Router, private _AuthService: AuthService) {
    _AuthService.getProfile()
  }

  canActivate(
    _next: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot ): Observable<boolean> | Promise<boolean> | boolean {
   
  if (localStorage.getItem('userToken') !== null && localStorage.getItem('role') =='SuperAdmin') {
    return true;
  }
    else {
      this.router.navigate(['/dashboard'])
    return false;
  }
  

}
}

