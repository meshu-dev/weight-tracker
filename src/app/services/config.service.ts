import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { CacheService } from './cache.service';

@Injectable({
  providedIn: 'root'
}) 

export class ConfigService {
  private readonly configUrl: string = './../../assets/config.json';
  private data: object;

  constructor(private http: HttpClient) { }

  load(resolve): void {
    this.http
        .get<object>(this.configUrl)
        .subscribe(result => {
            this.data = result;
            resolve();
        });
  }

  get(): any {
      return this.data;
  }
}
