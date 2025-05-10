import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  template: `
    <div class="admin-dashboard">
      <nav class="admin-nav">
        <ul>
          <li><a routerLink="kyc" routerLinkActive="active">KYC Management</a></li>
          <li><a routerLink="complaints" routerLinkActive="active">Complaints Viewer</a></li>
        </ul>
      </nav>
      <div class="content">
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
  styles: [`
    .admin-dashboard {
      display: flex;
      height: 100vh;
    }
    .admin-nav {
      width: 250px;
      background: #f5f5f5;
      padding: 20px;
      border-right: 1px solid #ddd;
    }
    .admin-nav ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    .admin-nav li {
      margin-bottom: 10px;
    }
    .admin-nav a {
      display: block;
      padding: 10px;
      text-decoration: none;
      color: #333;
      border-radius: 4px;
    }
    .admin-nav a:hover {
      background: #e0e0e0;
    }
    .admin-nav a.active {
      background: #007bff;
      color: white;
    }
    .content {
      flex: 1;
      padding: 20px;
    }
  `]
})
export class AdminDashboardComponent {} 