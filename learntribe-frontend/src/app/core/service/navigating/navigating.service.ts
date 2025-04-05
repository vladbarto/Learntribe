import { Injectable } from '@angular/core';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavigatingService {

  constructor(private router: Router) { }

  public goToPage(pageName: string): void {
    this.router.navigate([`${pageName}`]);
  }
}
