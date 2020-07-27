import { Component } from '@angular/core';
import { environment } from '../environments/environment';
import {GeoLocationService} from "./geo-location.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'search-properties-fe';

  isPositionEnabled: boolean = false
  isPositionDeclined: boolean = false
  mapApiKey = environment.mapApiKey

  constructor(
    private geoLocationService: GeoLocationService
  ) {
  }

  ngOnInit(): void {
    this.geoLocationService.locationFetched.subscribe(location => {
      this.isPositionEnabled = true
    }, error => {
      console.log(error)
      this.isPositionDeclined = true
    })
  }
}
