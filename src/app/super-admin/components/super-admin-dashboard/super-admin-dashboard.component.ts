import { Component } from '@angular/core';

@Component({
  selector: 'app-super-admin-dashboard',
  template: `
    <div class="super-admin-dashboard">
      <nav class="super-admin-nav">
        <ul>
          <li><a routerLink="clients" routerLinkActive="active">Client Accounts</a></li>
        </ul>
      </nav>
      <div class="content">
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
  styles: [`
    .super-admin-dashboard {
      display: flex;
      height: 100vh;
    }
    .super-admin-nav {
      width: 250px;
      background: #f5f5f5;
      padding: 20px;
      border-right: 1px solid #ddd;
    }
    .super-admin-nav ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    .super-admin-nav li {
      margin-bottom: 10px;
    }
    .super-admin-nav a {
      display: block;
      padding: 10px;
      text-decoration: none;
      color: #333;
      border-radius: 4px;
    }
    .super-admin-nav a:hover {
      background: #e0e0e0;
    }
    .super-admin-nav a.active {
      background: #007bff;
      color: white;
    }
    .content {
      flex: 1;
      padding: 20px;
    }
  `]
})
export class SuperAdminDashboardComponent {} 