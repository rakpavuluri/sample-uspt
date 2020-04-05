import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { retry, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GenerateReportService {

  generateReportObj = {
    type: null,
    values: [],
    fromDate: null,
    toDate: null
  };
  constructor(private http: HttpClient) { }

  getReportResults() {
    return this.http.post('/', this.generateReportObj).pipe(
      retry(10),
      catchError(this.handleError)
    );
  }

  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `${error.statusText}`;
    }
    return throwError(errorMessage);
  }
}
