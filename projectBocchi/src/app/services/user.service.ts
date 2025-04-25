import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap, catchError, throwError } from 'rxjs';
import { User } from '../models/user';

@Injectable({ providedIn: 'root' })
export class UserService {
  private apiUrl = 'http://localhost:8000/users/';

  constructor(private http: HttpClient) {}

  register(data: { username: string, email: string, password: string }): Observable<any> {
    return this.http.post(this.apiUrl + 'register/', data);
  }

  login(credentials: { username: string, password: string }): Observable<any> {
    return this.http.post(this.apiUrl + 'login/', credentials).pipe(
      tap((tokens: any) => {
        localStorage.setItem('access', tokens.access);
        localStorage.setItem('refresh', tokens.refresh);
      })
    );
  }

  getProfile(): Observable<User> {
    return this.http.get<User>(this.apiUrl + 'me/', {
      headers: this.getAuthHeaders()
    }).pipe(
      catchError(error => {
        if (error.status === 401) {
          this.logout();
        }
        return throwError(() => error);
      })
    );
  }

  updateProfile(formData: FormData): Observable<User> {
    return this.http.patch<User>(this.apiUrl + 'profile/update/', formData, {
      headers: this.getAuthHeaders(true)
    }).pipe(
      catchError(error => {
        console.error('Profile update error:', error);
        return throwError(() => 
          error.error?.detail || 'Failed to update profile. Please try again.'
        );
      })
    );
  }

  updateFavoriteGroups(groupIds: number[]): Observable<User> {
    return this.http.patch<User>(this.apiUrl + 'favorite-groups/', { group_ids: groupIds }, {
      headers: this.getAuthHeaders()
    });
  }

  changePassword(data: { current_password: string, new_password: string }): Observable<any> {
    return this.http.post(this.apiUrl + 'change-password/', data, {
      headers: this.getAuthHeaders()
    });
  }

  logout(): void {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('access');
  }

  refreshToken(): Observable<any> {
    const refresh = localStorage.getItem('refresh');
    return this.http.post(this.apiUrl + 'token/refresh/', { refresh }).pipe(
      tap((tokens: any) => {
        localStorage.setItem('access', tokens.access);
      })
    );
  }

  private getAuthHeaders(isFormData: boolean = false): HttpHeaders {
    let headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('access')}`
    });
    

    if (!isFormData) {
      headers = headers.set('Content-Type', 'application/json');
    }
    
    return headers;
  }
}