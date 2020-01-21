import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthService } from './../auth/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) { }

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let isAuthUrl = req.url.search(/\/auth\/login/) > 0 ? true : false,
        isJsonFile = req.url.search(/json/) > 0 ? true : false;

    if (isAuthUrl === false && isJsonFile === false) {
      const token = this.authService.getAuthToken();

      //console.log(`AUTH CHECK: ${req.url}`);

      req = req.clone({
        setHeaders: {'Authorization': `Bearer ${token}`}
      });
    }
		return next.handle(req);
	}
}
