import { Component } from '@angular/core';
import {NavigatingService} from '../../../core/service/navigating/navigating.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  constructor(public navigate: NavigatingService) {}
}
