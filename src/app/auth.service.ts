import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ILogin, IRegister } from './models/login';
import jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggednIn() {
    throw new Error('Method not implemented.');
  }
  role: string | null = '';
  constructor(private _HttpClient: HttpClient) {
    if (localStorage.getItem('userToken') !== null) {
      this.getProfile();
    }
  }

  getProfile() {
    let encoded: any = localStorage.getItem('userToken');
    let decoded: any = jwtDecode(encoded);
    console.log(decoded);
    localStorage.setItem('role', decoded.userGroup);
    localStorage.setItem('userName', decoded.userName);
    this.getRole();
  }

  getRole() {
    if (
      localStorage.getItem('userToken') !== null &&
      localStorage.getItem('role')
    ) {
      this.role = localStorage.getItem('role');
    }
  }
  onLogin(data: ILogin) {
    return this._HttpClient.post('Users/Login', data);
  }

  onRegister(data: any) {
    return this._HttpClient.post('Users/Register', data);
  }

  onVerifyAccount(data: any) {
    return this._HttpClient.put('Users/verify', data);
  }
  onReuestResetPassword(data: string) {
    return this._HttpClient.post('Users/Reset/Request', { email: data });
  }
  onResetPassword(data: string) {
    return this._HttpClient.post('Users/Reset', data);
  }
  onChangePassword(data: string) {
    return this._HttpClient.put('Users/ChangePassword', data);
  }
}

