import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SuperAdminDashboardComponent } from './components/super-admin-dashboard/super-admin-dashboard.component';
import { ClientAccountViewerComponent } from './components/client-account-viewer/client-account-viewer.component';
import { SuperAdminClientManagementComponent } from './components/super-admin-client-management/super-admin-client-management.component';
import { SharedModule } from '../shared/shared.module';
import { SuperAdminGuard } from '../core/guards/super-admin.guard';

const routes: Routes = [
  {
    path: '',
    component: SuperAdminDashboardComponent,
    canActivate: [SuperAdminGuard],
    children: [
      { path: 'clients', component: SuperAdminClientManagementComponent },
      { path: 'client-account-viewer', component: ClientAccountViewerComponent },
      { path: '', redirectTo: 'clients', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  declarations: [
    SuperAdminDashboardComponent,
    ClientAccountViewerComponent,
    SuperAdminClientManagementComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class SuperAdminModule { } 