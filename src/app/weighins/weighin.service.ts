import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

import { NgbDateStruct, NgbCalendar, NgbDate } from '@ng-bootstrap/ng-bootstrap';

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

  get apiUrl(): string {
    let config = this.configService.get();
    return config.url;
  }

  getAll(offset: number, limit: number): Observable<any> {
    return this.http.get<any>(
        `${this.apiUrl}/weighins?page=${offset}&count=${limit}&sort=date_desc`,
        { observe: 'response', withCredentials: true }
      );
  }

  get(id: number): Observable<IWeighin> {
    return this.http.get<IWeighin>(
        `${this.apiUrl}/weighins/${id}`
      )
      .pipe(
        map(
          w => {
            let date = new Date(w.date);

            w.date = new NgbDate(
              date.getFullYear(),
              date.getMonth() + 1,
              date.getDate()
            );

            return w;
          }
        ),
        tap(data => console.log('All: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  add(weighIn: IWeighin): Observable<any> {
    /*
    return this.http.post<IWeighin>('${this.apiUrl}/weighins', weighIn)
      .pipe(
        map(result => {
          console.log('Add Result');
          console.log(result);
        })
      ); */

    return this.http.post<any>(
      `${this.apiUrl}/weighins`,
      weighIn,
      { observe: 'response' }
    );
  }

  edit(weighIn: IWeighin): Observable<any> {
    console.log('E', weighIn);
    //console.log('E', weighIn.id);

    return this.http.put<any>(
      `${this.apiUrl}/weighins/${weighIn.id}`,
      weighIn,
      { observe: 'response' }
    );
  }

  delete(id: number) {
    return this.http.delete<any>(`${this.apiUrl}/weighins/${id}`);
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
