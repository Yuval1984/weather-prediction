import { HttpClient } from '@angular/common/http';
import { computed, Injectable, signal } from '@angular/core';
import { API_BASE_URL, FORECAST_ENDPOINT } from '../weather-config';
import { City, ThreeDayWeatherForecast, ThreeHoursForcast } from '../types/interfaces';
import { catchError, EMPTY, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  selectedCity = signal<string | null>(null);
  city = signal<City | null>(null);
  cityCoordinates = signal<{ lat: number; lon: number } | null>(null);
  weatherDates = signal<string[]>([]);
  weatherSpinner = signal<boolean>(false);
  weatherStatus = signal<'loading' | 'error' | 'success'>('loading');
  // Store the original unfiltered data
  allMapDateToWeatherCard = signal<{ date: string, weather: ThreeHoursForcast[] }[]>([]);
  // Computed signal that filters based on selectedForcastDays
  mapDateToWeatherCard = computed(() => {
    const allData = this.allMapDateToWeatherCard();
    const days = this.selectedForcastDays();
    if (days > 0 && allData.length > 0) {
      return allData.slice(0, days);
    }
    return allData;
  });
  dataSource = signal<ThreeDayWeatherForecast | null>(null);
  selectedForcastDays = signal<number>(1);
  constructor(private http: HttpClient) {
  }

  getweather(city: string) {
    this.weatherSpinner.set(true);
    this.weatherStatus.set('loading');
    this.http.get<ThreeDayWeatherForecast>(`${API_BASE_URL}${FORECAST_ENDPOINT}?city=${encodeURIComponent(city)}`).pipe(
      tap((data: ThreeDayWeatherForecast) => {
        console.log('data: ', data);
        this.weatherStatus.set('success');
        this.weatherSpinner.set(false);
        this.dataSource.set(data);
        this.city.set(data.city);
        const dates = Array.from(new Set(data.list.map(item => item.dt_txt.split(' ')[0])));
        const mapDateToWeatherCard = dates.map(date => {
          return {
            date: date,
            weather: data.list.filter(item => item.dt_txt.split(' ')[0] === date)
          }
        });
        this.allMapDateToWeatherCard.set(mapDateToWeatherCard);
        this.weatherDates.set(dates);
      }),
      catchError((err) => {
        console.error('Weather request failed:', err);
        this.weatherStatus.set('error');
        this.weatherSpinner.set(false);
        this.dataSource.set(null);
        return EMPTY;
      })
    ).subscribe();
  }
  
}
