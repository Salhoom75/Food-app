import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ILogin } from './models/login';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _HttpClient: HttpClient) { }
  onLogin(data:ILogin){
    return this._HttpClient.post('Users/Login',data)
  }

  onReuestResetPassword(data:string){
    return this._HttpClient.post('Users/Reset/Request',{email:data})
  }
  onResetPassword(data:string){
    return this._HttpClient.post('Users/Reset',data)
  }
}

