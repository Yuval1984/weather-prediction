import { Component, computed, effect, signal } from '@angular/core';
import { Dashboard } from '../dashboard/dashboard';
import { WeatherService } from '../../services/weather.service';
import { WeatherCard } from '../weather-card/weather-card';
import { DayOfWeekPipe } from '../../pipes/day-of-week-pipe';
import { PopulationPipe } from '../../pipes/population-pipe';
import { sunTimePipe } from '../../pipes/sun-time-pipe';
import { TimezoneOffsetPipe } from '../../pipes/timezone-pipe';
import { CityMapComponent } from '../city-map/city-map';

@Component({
  selector: 'app-weather',
  imports: [Dashboard, WeatherCard, DayOfWeekPipe, PopulationPipe, sunTimePipe, TimezoneOffsetPipe, CityMapComponent],
  templateUrl: './weather.html',
  styleUrl: './weather.scss',
  standalone: true,
})
export class Weather{
  isCityFound = signal<boolean>(false);
  private isDataSourceSet = computed(() => this.weatherService.dataSource() != null);
  
  constructor(public weatherService: WeatherService) {
    effect(() => {
      if (this.weatherService.selectedCity() && !this.isDataSourceSet()) {
        console.log('selectedCity: ', this.weatherService.selectedCity());
        this.weatherService.getweather(this.weatherService.selectedCity() ?? '');
      }
    });

    effect(() => {
      if (this.isDataSourceSet()) {
        this.isCityFound.set(true);
      } else {
        this.isCityFound.set(false);
      }
    });
  }
}
