import { Injectable } from '@angular/core';
import { User } from './user';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { ConfigService } from './../services/config.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private configService: ConfigService
  ) { }

  login(user: User): Observable<boolean> {
    let config = this.configService.get();

    return this.http.post<{token: string}>(config.url + '/auth/login', user)
      .pipe(
        map(result => {
          if (result.token) {
            localStorage.setItem('token', result.token);
            return true;
          }
        })
      );
  }

  logout() {
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('token') ? true : false;
  }

  getAuthToken() {
    return localStorage.getItem('token');
  }
}