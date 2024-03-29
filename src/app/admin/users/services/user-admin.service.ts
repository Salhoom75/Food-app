import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserAdminService {

constructor(private _HttpClient:HttpClient) { }


getAllUsers(parms:any):Observable<any>{
  return this._HttpClient.get('users',{params:parms})
}
}
