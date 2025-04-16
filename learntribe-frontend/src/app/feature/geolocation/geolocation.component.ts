import {Component, OnInit} from '@angular/core';
import {GeolocationService} from '../../core/service/geolocation/geolocation.service';

@Component({
  selector: 'app-geolocation',
  templateUrl: './geolocation.component.html',
  styleUrl: './geolocation.component.css'
})

export class GeolocationComponent implements OnInit {
  currentLocation: { latitude: number, longitude: number, timestamp: string } | null = null;
  errorMessage: string | null = null;
  isLoading = false;
  storageType: 'localStorage' | 'cookies' = 'localStorage';

  constructor(private geolocationService: GeolocationService) { }

  ngOnInit(): void {
    this.loadSavedLocation();
  }

  /**
   * Încarcă locația salvată în funcție de tipul de stocare selectat
   */
  loadSavedLocation(): void {
    if (this.storageType === 'localStorage') {
      this.currentLocation = this.geolocationService.getSavedLocation();
    } else {
      this.currentLocation = this.geolocationService.getSavedLocationFromCookies();
    }
  }

  /**
   * Solicită și obține locația curentă a utilizatorului
   */
  getLocation(): void {
    this.isLoading = true;
    this.errorMessage = null;

    this.geolocationService.getCurrentPosition().subscribe({
      next: (position) => {
        this.currentLocation = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          timestamp: new Date().toISOString()
        };
        this.saveLocation();
        this.isLoading = false;
      },
      error: (error) => {
        this.handleError(error);
        this.isLoading = false;
      }
    });
  }

  /**
   * Salvează locația în funcție de tipul de stocare selectat
   */
  saveLocation(): void {
    if (!this.currentLocation) return;

    if (this.storageType === 'localStorage') {
      this.geolocationService.saveLocationToStorage(
        this.currentLocation.latitude,
        this.currentLocation.longitude
      );
    } else {
      this.geolocationService.saveLocationToCookies(
        this.currentLocation.latitude,
        this.currentLocation.longitude
      );
    }
  }

  /**
   * Șterge locația salvată în funcție de tipul de stocare selectat
   */
  clearLocation(): void {
    if (this.storageType === 'localStorage') {
      this.geolocationService.clearSavedLocation();
    } else {
      this.geolocationService.clearSavedLocationFromCookies();
    }
    this.currentLocation = null;
  }

  /**
   * Gestionează eroarea de geolocation
   */
  private handleError(error: any): void {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        this.errorMessage = 'Utilizatorul a refuzat cererea de geolocation.';
        break;
      case error.POSITION_UNAVAILABLE:
        this.errorMessage = 'Informațiile de locație nu sunt disponibile.';
        break;
      case error.TIMEOUT:
        this.errorMessage = 'Cererea de locație a expirat.';
        break;
      default:
        this.errorMessage = `Eroare de geolocation: ${error.message}`;
    }
  }

  /**
   * Schimbă tipul de stocare și încarcă datele corespunzătoare
   */
  changeStorageType(type: 'localStorage' | 'cookies'): void {
    this.storageType = type;
    this.loadSavedLocation();
  }

  /**
   * Deschide harta Google cu locația curentă
   */
  openMap(): void {
    if (this.currentLocation) {
      const url = `https://www.google.com/maps?q=${this.currentLocation.latitude},${this.currentLocation.longitude}`;
      window.open(url, '_blank');
    }
  }
}
