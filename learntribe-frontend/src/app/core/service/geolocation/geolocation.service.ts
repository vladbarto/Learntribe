// geolocation.service.ts
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {
  private readonly LOCATION_KEY = 'user_location';

  constructor() { }

  /**
   * Verifică dacă browser-ul suportă Geolocation API
   */
  isGeolocationSupported(): boolean {
    return 'geolocation' in navigator;
  }

  /**
   * Obține coordonatele curente ale utilizatorului
   */
  getCurrentPosition(): Observable<GeolocationPosition> {
    return new Observable(observer => {
      if (!this.isGeolocationSupported()) {
        observer.error('Geolocation nu este suportat de acest browser.');
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          observer.next(position);
          observer.complete();

          // Salvează automat locația după ce a fost obținută
          this.saveLocationToStorage(position.coords.latitude, position.coords.longitude);
        },
        (error) => {
          observer.error(error);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        }
      );
    });
  }

  /**
   * Salvează locația în localStorage
   */
  saveLocationToStorage(latitude: number, longitude: number): void {
    const locationData = {
      latitude,
      longitude,
      timestamp: new Date().toISOString()
    };

    try {
      localStorage.setItem(this.LOCATION_KEY, JSON.stringify(locationData));
    } catch (e) {
      console.error('Error when saving into localStorage:', e);
    }
  }

  /**
   * Salvează locația în cookies
   */
  saveLocationToCookies(latitude: number, longitude: number, expiryDays: number = 30): void {
    const locationData = {
      latitude,
      longitude,
      timestamp: new Date().toISOString()
    };

    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + expiryDays);

    const cookieValue = encodeURIComponent(JSON.stringify(locationData));
    document.cookie = `${this.LOCATION_KEY}=${cookieValue}; expires=${expiryDate.toUTCString()}; path=/; SameSite=Strict`;
  }

  /**
   * Obține locația salvată din localStorage
   */
  getSavedLocation(): { latitude: number, longitude: number, timestamp: string } | null {
    try {
      const locationData = localStorage.getItem(this.LOCATION_KEY);
      return locationData ? JSON.parse(locationData) : null;
    } catch (e) {
      console.error('Error when reading from localStorage:', e);
      return null;
    }
  }

  /**
   * Obține locația salvată din cookies
   */
  getSavedLocationFromCookies(): { latitude: number, longitude: number, timestamp: string } | null {
    const cookies = document.cookie.split(';');
    const locationCookie = cookies.find(c => c.trim().startsWith(`${this.LOCATION_KEY}=`));

    if (!locationCookie) return null;

    try {
      const locationValue = locationCookie.split('=')[1];
      return JSON.parse(decodeURIComponent(locationValue));
    } catch (e) {
      console.error('Error when reading from cookies:', e);
      return null;
    }
  }

  /**
   * Șterge locația salvată din localStorage
   */
  clearSavedLocation(): void {
    localStorage.removeItem(this.LOCATION_KEY);
  }

  /**
   * Șterge locația salvată din cookies
   */
  clearSavedLocationFromCookies(): void {
    document.cookie = `${this.LOCATION_KEY}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }
}
