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

  // getTimeOfDay(date: string): TimeOfDay {
  //   const fixed = date.replace(' ', 'T');
  //   const dateObj = new Date(fixed);
  //   const hours = dateObj.getHours();
  //   return hours >= 6 && hours < 22 ? TimeOfDay.DAY : TimeOfDay.NIGHT;
  // }

  // getTemperature(temperature: number): Temperature {
  //   return  temperature > 15 && temperature < 25 ? Temperature.WARM :temperature > 25 && temperature < 30 ? Temperature.HOT : temperature > 30 ? Temperature.VERY_HOT : Temperature.COLD;
  // }

  // getWindSpeed(speed: number): string {
  //   console.log('speed: ', speed);
  //   return speed > 0 && speed < 10 ? 'wind_speed_0_10' : speed > 10 && speed < 20 ? 'wind_speed_10_20' : speed > 20 && speed < 30 ? 'wind_speed_20_30' : 'wind_speed_30_plus';
  // }
}
