import { Component, AfterViewInit, OnDestroy, effect, ElementRef, ViewChild, HostListener } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import * as L from 'leaflet';

@Component({
  selector: 'app-city-map',
  imports: [],
  templateUrl: './city-map.html',
  styleUrl: './city-map.scss',
  standalone: true,
})
export class CityMapComponent implements AfterViewInit, OnDestroy {
  @ViewChild('mapContainer', { static: false }) mapContainer!: ElementRef;
  private map: L.Map | null = null;
  private marker: L.Marker | null = null;
  private resizeTimeout: any;

  constructor(public weatherService: WeatherService) {
    effect(() => {
      const coordinates = this.weatherService.cityCoordinates();
      if (coordinates && this.map) {
        this.updateMap(coordinates);
      }
    });
  }

  ngAfterViewInit() {
    // Delay to ensure DOM is fully rendered and ViewChild is available
    setTimeout(() => {
      this.initMap();
    }, 100);
  }

  ngOnDestroy() {
    if (this.map) {
      this.map.remove();
    }
    if (this.resizeTimeout) {
      clearTimeout(this.resizeTimeout);
    }
  }

  @HostListener('window:resize')
  onResize() {
    // Debounce resize events
    if (this.resizeTimeout) {
      clearTimeout(this.resizeTimeout);
    }
    this.resizeTimeout = setTimeout(() => {
      if (this.map) {
        this.map.invalidateSize();
      }
    }, 250);
  }

  private initMap() {
    if (!this.mapContainer || !this.mapContainer.nativeElement) {
      console.error('Map container not found');
      return;
    }
    
    // Default center (can be updated when coordinates are available)
    const defaultCenter: [number, number] = [0, 0];
    
    try {
      this.map = L.map(this.mapContainer.nativeElement, {
        center: defaultCenter,
        zoom: 2,
        zoomControl: true,
      });

      // Add OpenStreetMap tiles
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19,
      }).addTo(this.map);

      // Invalidate size after a short delay to ensure proper rendering
      setTimeout(() => {
        if (this.map) {
          this.map.invalidateSize();
          console.log('Map initialized and size invalidated');
        }
      }, 200);

      // Update map when coordinates are available
      const coordinates = this.weatherService.cityCoordinates();
      if (coordinates) {
        setTimeout(() => {
          this.updateMap(coordinates);
        }, 300);
      }
    } catch (error) {
      console.error('Error initializing map:', error);
    }
  }

  private updateMap(coordinates: { lat: number; lon: number }) {
    if (!this.map) return;

    const latlng: [number, number] = [coordinates.lat, coordinates.lon];

    // Invalidate size first to ensure proper rendering
    this.map.invalidateSize();

    // Set map view to the city location
    this.map.setView(latlng, 13);

    // Remove existing marker if any
    if (this.marker) {
      this.map.removeLayer(this.marker);
    }

    // Create custom icon
    const icon = L.icon({
      iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });

    // Add marker for the city
    this.marker = L.marker(latlng, { icon }).addTo(this.map);
    
    // Add popup with city name
    const cityName = this.weatherService.city()?.name || this.weatherService.selectedCity();
    if (cityName) {
      this.marker.bindPopup(`<b>${cityName}</b>`).openPopup();
    }
  }
}

