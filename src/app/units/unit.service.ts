import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

import { environment } from '../../environments/environment';

import { ConfigService } from './../services/config.service';
import { Unit } from './unit';

@Injectable({
  providedIn: 'root'
})
export class UnitService {
  apiUrl: string = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private configService: ConfigService
  ) { }

  /*
  get apiUrl(): string {
    let config = this.configService.get();
    return config.url;
  } */

  getAll(): Observable<any> {
    return this.http.get<Unit[]>(
        `${this.apiUrl}/units`
      );
  }

  get(id: number): Observable<any> {
    return this.getAll()
      .pipe(
        map((units: Unit[]) => units.find(u => u.id === id))
      );
  }

  updateUserUnit(userId: number, unitId: number): Observable<any> {
    return this.http.put<Unit>(
        `${this.apiUrl}/users/${userId}/units/${unitId}`,
        {}
      )
      .pipe(
        tap(data => console.log('All: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';

    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    return throwError(errorMessage);
  }
}
