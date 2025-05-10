import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { KycManagementComponent } from './components/kyc-management/kyc-management.component';
import { ComplaintsViewerComponent } from './components/complaints-viewer/complaints-viewer.component';
import { SharedModule } from '../shared/shared.module';
import { AdminGuard } from '../core/guards/admin.guard';

const routes: Routes = [
  {
    path: '',
    component: AdminDashboardComponent,
    canActivate: [AdminGuard],
    children: [
      { path: 'kyc', component: KycManagementComponent },
      { path: 'complaints', component: ComplaintsViewerComponent },
      { path: '', redirectTo: 'kyc', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  declarations: [
    AdminDashboardComponent,
    KycManagementComponent,
    ComplaintsViewerComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class AdminModule { } 