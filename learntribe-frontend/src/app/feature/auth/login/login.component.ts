import { Component } from '@angular/core';
import {Subscription} from 'rxjs';
import {FormGroup} from '@angular/forms';

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

  public login() {
    console.log('login attempted');
  }
}
