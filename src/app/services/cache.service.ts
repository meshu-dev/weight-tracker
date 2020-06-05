import { Injectable } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CacheService {
  private static CACHE_HEADERS = ['X-Total-Count'];
  private requests: any = {};

  constructor() { }

  setResponse(url: string, response: HttpResponse<any>): void {
    const httpHeaders = this.getHttpHeaders(response);

    if (Object.keys(httpHeaders).length > 0) {
      localStorage.setItem(`${url}-headers`, JSON.stringify(httpHeaders));
    }

    localStorage.setItem(url, JSON.stringify(response));
  }

  getResponse(url: string): HttpResponse<any> | undefined {
    return JSON.parse(localStorage.getItem(url));
  }

  getHeaders(url: string): any {
    const headerValues = JSON.parse(localStorage.getItem(`${url}-headers`));
    let headers = new HttpHeaders();

    for (const key in headerValues) {
      if (headerValues.hasOwnProperty(key)) {
        headers = headers.set(key, headerValues[key]);
      }
    }
    return headers;
  }

  deleteResponse(url: string): void {
    localStorage.removeItem(url);
  }

  deleteHeader(url: string): void {
    localStorage.removeItem(`${url}-headers`);
  }

  deleteByUrlMatch(url: string): void {
    for (const localStorageKey in localStorage) {
      if (localStorage.hasOwnProperty(localStorageKey)) {
        const index = localStorageKey.indexOf(url);

        if (index > -1) {
          localStorage.removeItem(localStorageKey);
        }
      }
    }
  }

  deleteAll(): void {
    localStorage.clear();
  }

  private getHttpHeaders(response: HttpResponse<any>): object {
    const httpHeaders = {};

    for (const header of CacheService.CACHE_HEADERS) {
      const headerValue = response.headers.get(header);

      if (headerValue) {
        httpHeaders[header] = headerValue;
      }
    }
    return httpHeaders;
  }
}
