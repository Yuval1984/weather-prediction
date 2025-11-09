import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { GeolocationResults, GeoResult, GeoSearchResponse } from '../types/interfaces';
import { debounce, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GeolocationApi {
  cityName = signal<string>('');
  apiUrlStart = 'https://api.geoapify.com/v1/geocode/autocomplete?text=';
  API_KEY = 'f552e4f2c0434ff490a99b824c4e4f7f';

  constructor(private http: HttpClient) {
  }

  searchCity(cityName: string) {
    return this.http.get<GeoSearchResponse>(`${this.apiUrlStart}${cityName}&type=city&limit=3&lang=en&format=json&apiKey=${this.API_KEY}`)
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
