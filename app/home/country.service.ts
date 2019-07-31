import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError, combineLatest, BehaviorSubject, Subject, merge } from 'rxjs';
import { catchError, tap, map, scan, shareReplay } from 'rxjs/operators';
import { Countries } from './countries';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
    
  private countriesUrl = 'https://restcountries.eu/rest/v2';
  
    

  constructor(private http: HttpClient) { }
  
  countries$ = this.http.get<Countries[]>(this.countriesUrl)
    .pipe(
      tap(data => JSON.stringify(data)),
       // console.log('Countries: ', JSON.stringify(data))),
      catchError(this.handleError)
  );
  
  private handleError(err: any) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }

}
