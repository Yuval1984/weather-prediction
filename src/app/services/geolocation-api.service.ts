import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { GeolocationResults, GeoResult, GeoSearchResponse } from '../types/interfaces';
import { debounce, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GeolocationApi {
  cityName = signal<string>('');
  private readonly API_BASE_URL = 'https://metrics-server-yjqf.onrender.com/v1/weather-channel';

  constructor(private http: HttpClient) {
  }

  searchCity(cityName: string) {
    return this.http.get<GeoSearchResponse>(`${this.API_BASE_URL}/autocomplete?text=${encodeURIComponent(cityName)}`)
      .pipe(
        map((data: GeoSearchResponse) => {
          const citiesOnly = data.results.filter((result: GeoResult) => !!result.city);
          const mapped = citiesOnly.map((result: GeoResult): GeolocationResults => ({
            city_short_name: result.city || '',
            city_long_name: result.address_line2 || '',
            country: result.country,
            lat: result.lat,
            lon: result.lon,
          }));

          // Normalize function for deduplication
          const normalize = (name: string) =>
            name.toLowerCase().replace(/[\s\-']/g, '');

           // Remove duplicates by normalized name
           const unique = mapped.filter(
            (item, index, self) =>
              index ===
              self.findIndex(
                (t) => normalize(t.city_short_name) === normalize(item.city_short_name)
              )
          );

          // Limit to 3 unique cities
          return unique.slice(0, 3);
        })
      );
  }
}
