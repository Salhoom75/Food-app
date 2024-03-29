import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

constructor(private _HttpClient:HttpClient) { }

getCategories(data:any): Observable<any>{
  return this._HttpClient.get('category',{params:data})

}

addCategory(data:any): Observable<any>{
  return this._HttpClient.post('category',{name:data})

}

deleteCategory(id:number): Observable<any>{
  return this._HttpClient.delete(`category/${id}`)

}

}
