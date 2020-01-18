import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
}) 

export class CacheService {
  private requests: any = {};

  constructor() { }

  set(url: string, response: HttpResponse<any>): void {
    localStorage.setItem(url, JSON.stringify(response));
  }

  get(url: string): HttpResponse<any> | undefined {
    return JSON.parse(localStorage.getItem(url));
  }

  clear(url: string): void {
    localStorage.removeItem(url);
  }

  clearAll(): void {
    localStorage.clear();
  }
}
