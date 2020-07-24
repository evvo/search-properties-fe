import {EventEmitter, Injectable, Output} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from "rxjs";
import { environment } from '../environments/environment';
import {catchError, retry} from "rxjs/operators";
import {ErrorService} from "./error.service";


@Injectable({
  providedIn: 'root'
})
export class CurrentPropertyService {
  public properties: Array<any> = []
  current: any = null
  currentLocation = {
    latitude: 0,
    longitude: 0
  }

  @Output() change: EventEmitter<object> = new EventEmitter();

  @Output() onFetchedItems: EventEmitter<object> = new EventEmitter()

  @Output() locationFetched: EventEmitter<object> = new EventEmitter()

  constructor(
    private http: HttpClient,
    private errorService: ErrorService
  ) {
    this.locationFetched.subscribe((location) => {
      this.currentLocation = location

      // TODO: Warning
      this.getProperties().subscribe(
        (data) => this.handleFetchedItems(data)
      )
    })
  }

  handleFetchedItems(data) {
    this.properties = data.data

    this.onFetchedItems.emit(data.data)

    if (data.data.length > 0) {
      this.changeCurrent(this.properties[0])
    }
  }

  changeCurrent(current) {
    this.current = current
    this.change.emit(this.current)
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status > 0) {
      this.errorService.errorsChanged.emit(error.error.data.errors)
    } else {
      this.errorService.errorsChanged.emit([{
        msg:'Cannot Connect to server',
        param:'server',
        location: 'server'
      }])
    }

    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.')
  }

  public getProperties(): Observable<any> {
    return this
      .http
      .get(`${environment.apiUrl}/properties?LAT=${this.currentLocation.latitude}&LONG=${this.currentLocation.longitude}`)
      .pipe(
        retry(2),
        catchError((error) => this.handleError(error))
      )
  }
}
