import { Injectable } from '@angular/core';
import { User } from './user';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  constructor(private http: HttpClient) { }

  url = 'https://localhost:5001';

  login(user: User): Observable<boolean> {
    return this.http.post<{token: string}>(this.url + '/auth/login', user)
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