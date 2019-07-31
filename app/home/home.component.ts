import { Component, OnInit } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';

import { CountryService } from './country.service';
import { EMPTY, Subject, combineLatest, BehaviorSubject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Countries } from './countries';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit{
  countryVal: any;
  searchVal: any;
  p: number = 1;
  
  private errorMessageSubject = new Subject<string>();
  errorMessage$ = this.errorMessageSubject.asObservable();
  
  countries$ = this.countriesService.countries$.pipe(
    catchError(err => {
      this.errorMessageSubject.next(err);
      return EMPTY;
    })
  );
 
  errorMessage: any;

  constructor(private countriesService: CountryService) { }
    ngOnInit(): void {
      this.countryVal = null;
      this.searchVal = null;
  }
  btnClicked(val: any) {
    this.countryVal = null;
    this.searchVal = null;
      this.countries$.subscribe(
        countries => {
          
          this.countryVal = countries.filter(countries => countries.region === val);
          
        },
        error => this.errorMessage = <any>error
      );
   // }

  }
  searchByCountryCode(val: any) {
    
    this.countryVal = null;
    this.searchVal = null;
    this.countries$.subscribe(
      countries => {
        //debugger;
        this.countryVal = countries.filter(countries => countries.name.toLowerCase().includes(val));

      },
      error => this.errorMessage = <any>error
    );
  }
  funcDetails(val: any) {
    this.searchVal = null;

    this.countries$.subscribe(
      countries => {
       // debugger;
        this.searchVal = countries.filter(countries => countries.name===val);

      },
      error => this.errorMessage = <any>error
    );
  }
  btnClear() {
    this.searchVal = null;
    this.countryVal = null;
  }
}
