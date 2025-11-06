import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { API_KEY, API_URL } from '../weather-config';
import { City, main, ThreeDayWeatherForecast, ThreeHoursForcast } from '../types/interfaces';
import { catchError, EMPTY, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  city = signal<City | null>(null);
  weatherDates = signal<string[]>([]);
  mapDateToWeatherCard = signal<{ date: string, weather: ThreeHoursForcast[] }[]>([]);
  dataSource = signal<ThreeDayWeatherForecast | null>(null);
  constructor(private http: HttpClient) {}
  getweather() {
    this.http.get<ThreeDayWeatherForecast>(`${API_URL}${API_KEY}&units=metric`).pipe(
      tap((data: ThreeDayWeatherForecast) => {
        console.log('data: ', data);
        this.dataSource.set(data);
        this.city.set(data.city);
        const dates = Array.from(new Set(data.list.map(item => item.dt_txt.split(' ')[0])));
        const mapDateToWeatherCard = dates.map(date => {
          return {
            date: date,
            weather: data.list.filter(item => item.dt_txt.split(' ')[0] === date)
          }
        });
        this.mapDateToWeatherCard.set(mapDateToWeatherCard);
        this.weatherDates.set(dates);
      }),
      catchError((err) => {
        console.error('Weather request failed:', err);
        this.dataSource.set(null);
        return EMPTY;
      })
    ).subscribe();
  }
  
}
