import { TestBed } from '@angular/core/testing';

import { GeolocationApi } from './geolocation-api.service';

describe('GeolocationApi', () => {
  let service: GeolocationApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeolocationApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
