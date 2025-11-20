import { Component, effect, signal } from '@angular/core';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { GeolocationApi } from '../../services/geolocation-api.service';
import { debounceTime, distinctUntilChanged, filter, tap } from 'rxjs';
import { MatInputModule } from '@angular/material/input';
import { GeolocationResults, GeoResult } from '../../types/interfaces';
import { WeatherService } from '../../services/weather.service';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
@Component({
  selector: 'app-dashboard',
  imports: [MatAutocompleteModule, MatInputModule, ReactiveFormsModule, MatSelectModule, MatFormFieldModule, MatDividerModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
  standalone: true,
})
export class Dashboard {
  spinner = signal<boolean>(false);
  cities = signal<GeolocationResults[]>([]);
  search: FormControl = new FormControl('');
  selectedForcastDays: FormControl<number | null> = new FormControl<number | null>(1);
  forecastDays = signal<number[]>([1, 2, 3, 4, 5]);
  constructor(private geolocationApi: GeolocationApi, private weatherService: WeatherService) {}
  
  ngOnInit() {
    this.selectedForcastDays.valueChanges.pipe(
      tap(value => {
        if(value != null){
          this.weatherService.selectedForcastDays.set(value);
        }
      })
    ).subscribe();
    this.search.valueChanges.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      tap(value => {
        if (!value || value.length <= 2) {
          // Only clear if the value doesn't match any existing city
          const matchesExistingCity = this.cities().some(city => 
            city.city_short_name === value || city.city_long_name === value
          );
          if (!matchesExistingCity) {
            this.cities.set([]);
          }
          this.spinner.set(false);
        }
      }),
      filter(value => {
        if (!value || value.length <= 2) {
          return false;
        }
        // Don't trigger search if value matches an existing city (user selected it)
        const matchesExistingCity = this.cities().some(city => 
          city.city_short_name === value || city.city_long_name === value
        );
        return !matchesExistingCity;
      }),
      tap(() => this.spinner.set(true))
    ).subscribe({
      next: value => {
        this.geolocationApi.searchCity(value).subscribe((data: GeolocationResults[]) => {
          this.cities.set(data);
          this.spinner.set(false);
        });
      },
      error: (error: Error) => {
        this.cities.set([]);
        console.error('error: ', error);
        this.spinner.set(false);
      },
      complete: () => {
        this.spinner.set(false);
      }
    });
  }

  onCitySelected(event: MatAutocompleteSelectedEvent) {
    const selectedCityName = event.option.value;
    this.weatherService.selectedCity.set(selectedCityName);
    
    // Find the full city object with coordinates
    const selectedCity = this.cities().find(city => city.city_short_name === selectedCityName);
    if (selectedCity) {
      this.weatherService.cityCoordinates.set({
        lat: selectedCity.lat,
        lon: selectedCity.lon
      });
    }
  }
}
