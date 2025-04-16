import { Component } from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Subscription} from 'rxjs';
import {NavigatingService} from '../../../core/service/navigating/navigating.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  loginForm: FormGroup = new FormGroup({});
  errorMessage?: string;
  loginSubscription?: Subscription;
  getInfoSubscription?: Subscription;

  constructor(private navigator: NavigatingService) {
  }
  public register() {
    console.log('login attempted');
    this.navigator.goToPage('home');
  }
}
