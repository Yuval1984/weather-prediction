import { Component, effect, Input, OnInit, signal } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { Temperature, ThreeDayWeatherForecast, ThreeHoursForcast, TimeOfDay, WeatherDescription } from '../../types/interfaces';
import { DatePipe, NgClass, NgStyle } from '@angular/common';

@Component({
  selector: 'app-weather-card',
  imports: [DatePipe, NgClass, NgStyle],
  templateUrl: './weather-card.html',
  styleUrl: './weather-card.scss',
  standalone: true,
})
export class WeatherCard{
  @Input() weatherCard: ThreeHoursForcast | null = null;
  constructor(public weatherService: WeatherService) {}

  get weatherDescription(): string {
    return this.weatherCard?.weather?.[0]?.description ?? '';
  }

  get weatherIcon(): string {
    return this.weatherCard?.weather?.[0]?.icon ?? '';
  }

  getTemperatureFillPercent(temp?: number | null): string {
    if (temp == null) {
      return '0%';
    }
    // Handle negative temperatures (cold/ice)
    if (temp < 0) {
      const clamped = Math.max(-50, Math.min(0, temp));
      // Convert -50 to 0 range to 0% to 100% (inverse: colder = higher percentage)
      const percent = Math.round((Math.abs(clamped) / 50) * 100);
      return percent + '%';
    }
    // Handle positive temperatures (hot/orange)
    const clamped = Math.max(0, Math.min(50, temp));
    const percent = Math.round((clamped / 50) * 100);
    return percent + '%';
  }

  isColdTemperature(temp?: number | null): boolean {
    return temp != null && temp < 0;
  }

  getTemperature() {
    return this.weatherCard?.main?.temp?.toFixed(1);
  }
}
