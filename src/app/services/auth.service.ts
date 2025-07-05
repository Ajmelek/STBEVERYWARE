import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasToken());
  
  constructor(private router: Router) { }

  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }

  isAuthenticated() {
    return this.isAuthenticatedSubject.asObservable();
  }

  setAuthenticated(value: boolean) {
    this.isAuthenticatedSubject.next(value);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUsername(): string | null {
    return localStorage.getItem('login');
  }

  getUserRole(): string | null {
    return localStorage.getItem('userRole');
  }

  getClientId(): string | null {
    return localStorage.getItem('clientId');
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
    this.setAuthenticated(true);
  }

  setUsername(username: string) {
    localStorage.setItem('login', username);
  }

  setUserRole(role: string) {
    localStorage.setItem('userRole', role);
  }

  setClientId(clientId: string) {
    localStorage.setItem('clientId', clientId);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('login');
    localStorage.removeItem('userRole');
    localStorage.removeItem('clientId');
    this.setAuthenticated(false);
    this.router.navigate(['/login']);
  }
} 