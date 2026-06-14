import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { BROWSER_STORAGE } from '../tokens/storage.token';

interface LoginResponse {
  accessToken: string;
  expiresIn: number;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly storage = inject(BROWSER_STORAGE);
  private readonly tokenKey = 'portfolio_admin_token';
  private readonly tokenState = signal<string | null>(this.readInitialToken());

  readonly token = this.tokenState.asReadonly();
  readonly isLoggedIn = computed(
    () => Boolean(this.tokenState()) && !this.isTokenExpired(this.tokenState()),
  );

  login(email: string, password: string): Observable<LoginResponse> {
    if (environment.useMocks) {
      return of({ accessToken: `mock-token-${email}`, expiresIn: 3600 }).pipe(
        tap((response) => this.storeToken(response.accessToken)),
      );
    }

    return this.http
      .post<LoginResponse>(`${environment.apiBaseUrl}/admin/auth/login`, { email, password })
      .pipe(tap((response) => this.storeToken(response.accessToken)));
  }

  isAuthenticated(): boolean {
    const token = this.tokenState();
    if (!token) {
      return false;
    }

    if (this.isTokenExpired(token)) {
      this.logout();
      return false;
    }

    return true;
  }

  getValidToken(): string | null {
    return this.isAuthenticated() ? this.tokenState() : null;
  }

  logout(): void {
    this.storage.removeItem(this.tokenKey);
    this.tokenState.set(null);
  }

  logoutAndRedirect(): void {
    this.logout();
    void this.router.navigate(['/admin/login']);
  }

  private storeToken(token: string): void {
    this.storage.setItem(this.tokenKey, token);
    this.tokenState.set(token);
  }

  private readInitialToken(): string | null {
    const token = this.storage.getItem(this.tokenKey);
    if (!token || this.isTokenExpired(token)) {
      this.storage.removeItem(this.tokenKey);
      return null;
    }

    return token;
  }

  private isTokenExpired(token: string | null): boolean {
    if (!token || environment.useMocks) {
      return false;
    }

    const payload = this.decodeJwtPayload(token);
    if (!payload?.exp || typeof payload.exp !== 'number') {
      return true;
    }

    const expirationMs = payload.exp * 1000;
    return expirationMs <= Date.now();
  }

  private decodeJwtPayload(token: string): { exp?: number } | null {
    const [, payload] = token.split('.');
    if (!payload || typeof globalThis.atob !== 'function') {
      return null;
    }

    try {
      const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
      const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), '=');
      return JSON.parse(globalThis.atob(padded)) as { exp?: number };
    } catch {
      return null;
    }
  }
}
