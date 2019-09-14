import { Injectable } from '@angular/core';
//import { IProduct } from './product';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
//import { Observable } from 'rxjs';
//import { catchError, tap } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class UserRepositoryService {
	private weightUrl = 'api/weights.json';

	constructor(private http: HttpClient) { }

/*
  create(params): Observable<Weight[]> {
    return this.http.get<Weight[]>(this.weightUrl)
      .pipe(
        tap(data => console.log('All: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  read(id): Observable<Weight[]> {
    return this.http.get<Weight[]>(this.weightUrl)
      .pipe(
        tap(data => console.log('All: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

	readRows(): Observable<Weight[]> {
		return this.http.get<Weight[]>(this.weightUrl)
			.pipe(
				tap(data => console.log('All: ' + JSON.stringify(data))),
				catchError(this.handleError)
			);
	}

  edit(id): Observable<Weight[]> {
    return this.http.get<Weight[]>(this.weightUrl)
      .pipe(
        tap(data => console.log('All: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  delete(id: number): Observable<{}> {
    return this.http.delete<{}>(this.weightUrl)
      .pipe(
        tap(data => console.log('All: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  } */

  private handleError(err: HttpErrorResponse) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);

    //return throwError(errorMessage);
  }
}