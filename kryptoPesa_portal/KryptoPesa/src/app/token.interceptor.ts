import { Injectable } from '@angular/core';


import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

// 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
@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const localToken = localStorage.getItem('access_token');

    request = request.clone({
      headers :request.headers.set(
           'Authorization', 'Bearer ' + localToken
      ),
    })

    // if (localToken){
    // request = request.clone({
    //   headers:request.headers.set(
    //        'Authorization', 'Bearer' + localToken
    //   )
    //   // setHeaders:{Authorization: `Bearer ${localToken}`}
    // })
    // }
    return next.handle(request);
  }
}
