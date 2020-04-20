import { Injectable } from '@angular/core';
import { User } from './user';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { UserService } from './../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl: string = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private userService: UserService
  ) { }

  login(user: User): Observable<boolean> {
    return this.http.post<any>(this.apiUrl + '/auth/login', user)
      .pipe(
        map(result => {
          if (result.token) {
            localStorage.setItem('token',  result.token);
            this.userService.set(result);

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