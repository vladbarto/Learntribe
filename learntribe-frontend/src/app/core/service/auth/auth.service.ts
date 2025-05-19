import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import {UserModel} from '../../../shared/components/model/UserModel';
import {environment} from '../../../../environments/environment.development';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.endpoint.AUTH.base;
  private currentUserSubject = new BehaviorSubject<UserModel | null>(null);
  public currentUser = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    // Verifică dacă există un utilizator în session storage la inițializare
    const storedUser = sessionStorage.getItem('currentUser');
    if (storedUser) {
      this.currentUserSubject.next(JSON.parse(storedUser));
    }
  }

  public get currentUserValue(): UserModel | null {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${environment.endpoint.AUTH.login}`, { username, password })
      .pipe(
        tap(response => {
          if (response?.access_token) {
            sessionStorage.setItem('token', response.access_token);
            sessionStorage.setItem('currentUser', JSON.stringify(response.user));
            this.currentUserSubject.next(response.user);
          }
        })
      );
  }

  logout() {
    // Șterge utilizatorul din session storage
    sessionStorage.clear();
    this.currentUserSubject.next(null);
    this.router.navigate(['/home']);
  }

  register(user: UserModel): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${environment.endpoint.AUTH.register}`, user);
  }

  isLoggedIn(): boolean {
    return !!this.currentUserValue;
  }

  isStudent(): boolean {
    return this.currentUserValue?.role === 'student';
  }

  isTeacher(): boolean {
    return this.currentUserValue?.role === 'teacher';
  }

  getUserId() {
    return JSON.parse(sessionStorage.getItem('currentUser')!)._id;
  }
}
