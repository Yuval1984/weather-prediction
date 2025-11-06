import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Weather } from './components/weather/weather';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Weather],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('weather-channel');
}
