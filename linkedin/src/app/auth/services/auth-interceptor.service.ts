import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@capacitor/storage';
import { from, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptorService implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return from(
      Storage.get({
        key: 'token',
      })
    ).pipe(
      switchMap((data: { value: string }) => {
        const token = data?.value;
        if (token) {
          const clonedRequest = req.clone({
            headers: req.headers.set('Authorization', 'Bearer ' + token),
          });
          return next.handle(clonedRequest);
        }
        return next.handle(req);
      })
    );
  }

  constructor() {}
}
