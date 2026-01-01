import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {


  // Use environment variable for base URL
  private BASE_URL = `${environment.apiUrl}/auth`;
  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http.post(
      `${this.BASE_URL}/login`,
      { email, password },
      { withCredentials: true }   // ⭐ IMPORTANT
    );
  }

  logout() {
    return this.http.post(
      `${this.BASE_URL}/logout`,
      {},
      { withCredentials: true }   // ⭐ IMPORTANT
    );
  }

  register(email: string, password: string) {
    return this.http.post(
      `${this.BASE_URL}/register`,
      {email,password},
      { withCredentials: true }   // ⭐ IMPORTANT
    );
  }

  checkLogin() {
    return this.http.get(
      `${this.BASE_URL}/me`,
      { withCredentials: true }   // ⭐ IMPORTANT
    );
  }
}
