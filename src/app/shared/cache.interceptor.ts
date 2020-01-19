import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

import { CacheService } from './../services/cache.service';

@Injectable()
export class CacheInterceptor implements HttpInterceptor {
	constructor(private cacheService: CacheService) { }

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		console.log(`CacheInterceptor - ${req.url}`);

		if (req.method === 'GET') {
			const httpResponse: HttpResponse<any> = this.cacheService.getResponse(req.url);

      if (httpResponse) {
        console.log(`Getting CACHED response: ${httpResponse.url}`);
        console.log(httpResponse);

        let httpHeaders = this.cacheService.getHeaders(req.url);

        let response = new HttpResponse(
          {
            headers: httpHeaders,
            body: httpResponse.body
          }
        );

        return of(response);
      }

      return next.handle(req)
        .pipe(
          tap(event => {
            if (event instanceof HttpResponse) {
              console.log(`Adding item to cache: ${req.url}`);
              console.log(event);

              this.cacheService.setResponse(req.url, event);
            } 
          })
        )
		} else {
      //this.cacheService.clearAll();

      return next.handle(req);
    }
	}
}
