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
    const baseUrl='https://upskilling-egypt.com:3006/api/v1/'

    if(localStorage.getItem('token')!=null){

      const token=localStorage.getItem('token')

      let req =request.clone({
        url:baseUrl+request.url,
        setHeaders:{
          'Authorization':`${token}`
        }
      })
      
      return next.handle(req);

    }

    else{

      let req =request.clone({
        url:baseUrl+request.url
      })
      
      return next.handle(req);

    }
  }
}
