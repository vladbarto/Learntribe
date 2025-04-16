import { Component } from '@angular/core';
import {Subscription} from 'rxjs';
import {FormGroup} from '@angular/forms';
import {NavigatingService} from '../../../core/service/navigating/navigating.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup = new FormGroup({});
  errorMessage?: string;
  loginSubscription?: Subscription;
  getInfoSubscription?: Subscription;

  constructor(private navigator: NavigatingService) {
  }

  public login() {
    console.log('login attempted');
    this.navigator.goToPage('home');
  }
}
