import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NavigatingService} from '../../../core/service/navigating/navigating.service';
import {AuthService} from '../../../core/service/auth/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  errorMessage?: string;
  loginSubscription?: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private navigator: NavigatingService
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    // Dacă utilizatorul este deja autentificat, redirecționează-l la pagina principală
    if (this.authService.isLoggedIn()) {
      this.navigator.goToPage('home');
    }
  }

  public login() {
    if (this.loginForm.invalid) {
      this.errorMessage = 'Please fill in all fields';
      return;
    }

    const { username, password } = this.loginForm.value;

    this.loginSubscription = this.authService.login(username, password).subscribe({
      next: () => {
        console.log('Login successful');
        this.navigator.goToPage('home');
      },
      error: (error) => {
        console.error('Login failed', error);
        this.errorMessage = 'Authentication failed. Please double-check username and password fields';
      }
    });
  }

  ngOnDestroy(): void {
    if (this.loginSubscription) {
      this.loginSubscription.unsubscribe();
    }
  }
}
