import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class GlobalInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token=localStorage.getItem('token');
    const baseUrl: string='http://http://upskilling-egypt.com:3002/docs/api/v1';
    let newRequest={};
    if(token!==null){
      newRequest= {
        'Authorization':` Bearer ${token}`
      }
    }

    newRequest=request.clone({
      setHeaders:newRequest,url:baseUrl+request.url
    })
    
    return next.handle(request);
  }
}
