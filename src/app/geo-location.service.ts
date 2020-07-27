import {Injectable, Output} from '@angular/core';
import {ReplaySubject} from "rxjs";
import {GeoLocation} from "./geo-location";

@Injectable({
  providedIn: 'root'
})
export class GeoLocationService {

  @Output() locationFetched: ReplaySubject<GeoLocation> = new ReplaySubject()

  fetchLocation() {
    if (!navigator.geolocation) {
      return this.locationFetched.error(new Error('Location service not available'))
    }

    navigator.geolocation.getCurrentPosition((position) => {
      this.locationFetched.next(position.coords)
    }, (error) => {
      // Error
      this.locationFetched.error(error)
    })
  }

  constructor() {
    setTimeout(() => this.fetchLocation(), 200)
  }
}
