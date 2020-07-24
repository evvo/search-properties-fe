import { Component } from '@angular/core';
import {CurrentPropertyService} from "./current-property.service";
import { environment } from '../environments/environment';

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

  location = {
    latitude: 0,
    longitude: 0
  }

  fetchLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.propertyService.locationFetched.emit(position.coords)
        this.showPosition(position)
      }, (error) => {
        this.isPositionDeclined = true
      })
    } else {
      this.isPositionDeclined = true
    }
  }

  showPosition(position) {
    this.isPositionEnabled = true
    this.location.latitude = position.coords.latitude;
    this.location.longitude = position.coords.longitude;
  }

  constructor(
    private propertyService: CurrentPropertyService,
  ) {
  }

  ngOnInit(): void {
    setTimeout(() => this.fetchLocation(), 200)
  }
}
