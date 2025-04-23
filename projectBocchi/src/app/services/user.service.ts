
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
  private apiUrl = 'http://localhost:8000/api/auth/';

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

  getProfile(): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('access')}`
    });
    return this.http.get(this.apiUrl + 'me/', { headers });
  }

  logout(): void {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('access');
  }
}
