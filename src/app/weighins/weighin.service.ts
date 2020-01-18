import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

import { ConfigService } from './../services/config.service';
import { IWeighin } from './weighin';

@Injectable({
  providedIn: 'root'
}) 

export class WeighinService {
  constructor(
    private http: HttpClient,
    private configService: ConfigService
  ) { }

  get(): Observable<IWeighin[]> {
    let config = this.configService.get();

    return this.http.get<IWeighin[]>(
        config.url + '/weighins'
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
