import { Component } from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Subscription} from 'rxjs';

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

  public login() {
    console.log('login attempted');
  }
}
