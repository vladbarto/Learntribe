import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../core/service/auth/auth.service';
import { NavigatingService } from '../../../core/service/navigating/navigating.service';
import {UserModel} from '../../../shared/components/model/UserModel';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit, OnDestroy {
  registerForm: FormGroup;
  errorMessage?: string;
  registerSubscription?: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private navigator: NavigatingService
  ) {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(2)]],
      role: ['student', Validators.required]
    });
  }

  ngOnInit(): void {
    // Dacă utilizatorul este deja autentificat, redirecționează-l la pagina principală
    if (this.authService.isLoggedIn()) {
      this.navigator.goToPage('home');
    }
  }

  register() {
    if (this.registerForm.invalid) {
      this.errorMessage = 'Vă rugăm să completați corect toate câmpurile.';
      return;
    }

    const registerRequest: UserModel = {
      email: this.registerForm.get('email')?.value,
      username: this.registerForm.get('username')?.value,
      password: this.registerForm.get('password')?.value,
      role: this.registerForm.get('role')?.value
    };

    this.registerSubscription = this.authService.register(registerRequest).subscribe({
      next: () => {
        console.log('Successful registration');
        this.navigator.goToPage('auth/login');
      },
      error: (error) => {
        console.error('Failed registration', error);
        if (error.status === 409) {
          this.errorMessage = 'Already existing username or email';
        } else {
          this.errorMessage = 'Registration failed. Please try again';
        }
      }
    });
  }

  ngOnDestroy(): void {
    if (this.registerSubscription) {
      this.registerSubscription.unsubscribe();
    }
  }
}
