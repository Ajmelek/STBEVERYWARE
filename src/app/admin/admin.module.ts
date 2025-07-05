import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { KycManagementComponent } from './components/kyc-management/kyc-management.component';
import { ComplaintsViewerComponent } from './components/complaints-viewer/complaints-viewer.component';
import { SharedModule } from '../shared/shared.module';
import { AdminGuard } from '../core/guards/admin.guard';
import { WalletManagementComponent } from './wallet-management/wallet-management.component';
import { CarteBancaireManagementComponent } from './components/carte-bancaire-management/carte-bancaire-management.component';
import { ChequierManagementComponent } from './components/chequier-management/chequier-management.component';
import { CoreModule } from '../core/core.module';
import { ReclamationService } from '../services/reclamation.service';
import { GestionDesactivationCompteComponent } from './components/account-deactivation-management/gestion-desactivation-compte.component';

const routes: Routes = [
  {
    path: '',
    component: AdminDashboardComponent,
    canActivate: [AdminGuard],
    children: [
      { path: 'kyc', component: KycManagementComponent },
      { path: 'complaints', component: ComplaintsViewerComponent },
      { path: 'wallets', component: WalletManagementComponent },
      { path: 'cartes-bancaires', component: CarteBancaireManagementComponent },
      { path: 'chequiers', component: ChequierManagementComponent },
      { path: 'desactivation-comptes', component: GestionDesactivationCompteComponent },
      { path: '', redirectTo: 'kyc', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  declarations: [
    AdminDashboardComponent,
    KycManagementComponent,
    ComplaintsViewerComponent,
    WalletManagementComponent,
    CarteBancaireManagementComponent,
    ChequierManagementComponent,
    GestionDesactivationCompteComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    CoreModule,
    RouterModule.forChild(routes)
  ],
  providers: [ReclamationService]
})
export class AdminModule { } 