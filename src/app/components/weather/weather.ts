import { Component, computed, effect, signal } from '@angular/core';
import { Dashboard } from '../dashboard/dashboard';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { WeatherService } from '../../services/weather.service';
import { WeatherCard } from '../weather-card/weather-card';
import { DayOfWeekPipe } from '../../pipes/day-of-week-pipe';
import { MatDivider } from '@angular/material/list';
import { PopulationPipe } from '../../pipes/population-pipe';
import { sunTimePipe } from '../../pipes/sun-time-pipe';
import { TimezoneOffsetPipe } from '../../pipes/timezone-pipe';
import { CityMapComponent } from '../city-map/city-map';

@Component({
  selector: 'app-weather',
  imports: [Dashboard, DatePipe, WeatherCard, DayOfWeekPipe, MatDivider, CurrencyPipe, PopulationPipe, sunTimePipe, TimezoneOffsetPipe, CityMapComponent],
  templateUrl: './weather.html',
  styleUrl: './weather.scss',
  standalone: true,
})
export class Weather{
  isCityFound = signal<boolean>(false);
  constructor(public weatherService: WeatherService) {
    effect(() => {
      if (this.weatherService.selectedCity()) {
        console.log('selectedCity: ', this.weatherService.selectedCity());
        this.weatherService.getweather(this.weatherService.selectedCity() ?? '');
        const isDataSourceSet = computed(() => this.weatherService.dataSource() != null);
        if (isDataSourceSet()) {
          this.isCityFound.set(true);
        } else {
          this.isCityFound.set(false);
        }
      }
    });
  }
}
