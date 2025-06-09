import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-super-admin-dashboard',
  templateUrl: './super-admin-dashboard.component.html',
  styleUrls: ['./super-admin-dashboard.component.scss']
})
export class SuperAdminDashboardComponent {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  handleLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
} 