import { Component, OnInit } from '@angular/core';
import { Dashboard } from '../dashboard/dashboard';
import { DatePipe } from '@angular/common';
import { WeatherService } from '../../services/weather.service';
import { WeatherCard } from '../weather-card/weather-card';
import { DayOfWeekPipe } from '../../pipes/day-of-week-pipe';
import { MatDivider } from '@angular/material/list';

@Component({
  selector: 'app-weather',
  imports: [Dashboard, DatePipe, WeatherCard, DayOfWeekPipe, MatDivider],
  templateUrl: './weather.html',
  styleUrl: './weather.scss',
  standalone: true,
})
export class Weather implements OnInit{
  constructor(public weatherService: WeatherService) {}
  ngOnInit() {
    this.weatherService.getweather();
  }
}
