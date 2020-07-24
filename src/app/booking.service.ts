import { Injectable } from '@angular/core';
import {ErrorService} from "./error.service";
import {environment} from "../environments/environment";
import {catchError, finalize, retry} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(
    private http: HttpClient,
    private errorService: ErrorService
  ) { }

  book (booking) {
    return this
      .http
      .post(`${environment.apiUrl}/bookings`, booking)
      .pipe(
        catchError((error) => this.errorService.handleError(error))
      )
  }
}
