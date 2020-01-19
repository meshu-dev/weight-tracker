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
    let httpHeaders = this.getHttpHeaders(response);

    if (Object.keys(httpHeaders).length > 0) {
      localStorage.setItem(`${url}-headers`, JSON.stringify(httpHeaders));
    }
    
    localStorage.setItem(url, JSON.stringify(response));
  }

  getResponse(url: string): HttpResponse<any> | undefined {
    return JSON.parse(localStorage.getItem(url));
  }

  getHeaders(url: string): any {
    let headerValues = JSON.parse(localStorage.getItem(`${url}-headers`));
    let headers = new HttpHeaders();

    for (let key in headerValues) {
      headers = headers.set(key, headerValues[key]);
    }
    return headers;
  }

  delete(url: string): void {
    localStorage.removeItem(url);
  }

  deleteByUrlMatch(url: string): void {
    for (let localStorageKey in localStorage) {
      let index = localStorageKey.indexOf(url);

      if (index > -1) {
        this.delete(localStorageKey);
      }
    }
  }

  clearAll(): void {
    localStorage.clear();
  }

  private getHttpHeaders(response: HttpResponse<any>): object {
    let httpHeaders = {};

    for (let header of CacheService.CACHE_HEADERS) {
      let headerValue = response.headers.get(header);
      
      if (headerValue) {
        httpHeaders[header] = headerValue;
      }
    }
    return httpHeaders;
  }
}
