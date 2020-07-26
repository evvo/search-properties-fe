import {EventEmitter, Injectable, Output} from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import {throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  @Output() errorsChanged: EventEmitter<object> = new EventEmitter()

  constructor() { }

  handleError(error: HttpErrorResponse) {
    if (error.status > 0) {
      this.errorsChanged.emit(error.error.data.errors)
    } else {
      this.errorsChanged.emit([{
        msg:'Cannot Connect to server',
        param:'server',
        location: 'server'
      }])
    }

    // Return an observable with a user-facing error message.
    return throwError('Error occurred')
  }
}
