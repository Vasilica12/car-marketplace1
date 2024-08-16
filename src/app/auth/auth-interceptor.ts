// import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
// import { Injectable } from "@angular/core";
// import { AuthService } from "./auth.service";
// import { Observable } from "rxjs";

// @Injectable()
// export class AuthInterceptor implements HttpInterceptor {
//   constructor(private authService: AuthService) {}
//   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     const authToken = this.authService.getToken();
//     console.log("interceptor");
//     if(authToken) {
//       console.log('Token exists: ' + authToken);
//       const authRequest = req.clone({
//         headers: req.headers.set('Authrozation', 'Bearer ' + authToken)
//       })
//       return next.handle(authRequest);
//     }
//     console.log('req without token!');
//     return next.handle(req);
//   }
// }

import { HttpRequest, HttpHandlerFn, HttpInterceptorFn, HttpEvent } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
  const authService = inject(AuthService); // Inject AuthService
  const authToken = authService.getToken();
  console.log(authToken);
  
  const authRequest = req.clone({
    headers: req.headers.set('Authorization', `Bearer ${authToken}`)
  });

  return next(authRequest);
};