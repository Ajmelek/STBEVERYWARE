import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SuperAdminDashboardComponent } from './components/super-admin-dashboard/super-admin-dashboard.component';
import { ClientAccountViewerComponent } from './components/client-account-viewer/client-account-viewer.component';
import { SharedModule } from '../shared/shared.module';
import { SuperAdminGuard } from '../core/guards/super-admin.guard';

const routes: Routes = [
  {
    path: '',
    component: SuperAdminDashboardComponent,
    canActivate: [SuperAdminGuard],
    children: [
      { path: 'clients', component: ClientAccountViewerComponent },
      { path: '', redirectTo: 'clients', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  declarations: [
    SuperAdminDashboardComponent,
    ClientAccountViewerComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class SuperAdminModule { } 