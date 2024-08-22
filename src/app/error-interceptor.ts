import { HttpRequest, HttpHandlerFn, HttpInterceptorFn, HttpEvent, HttpErrorResponse } from '@angular/common/http';

import { catchError, Observable, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {

  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      console.log(err);
      // alert(err.error.error.message);
      return throwError(err);
    })
  );
};