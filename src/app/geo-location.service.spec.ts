import { TestBed } from '@angular/core/testing';

import {GeoLocationService} from "./geo-location.service";

describe('GeolocationService', () => {
  let service: GeoLocationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeoLocationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
