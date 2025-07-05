import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateAccountComponent } from './create-account/create-account.component';
import { HomeComponent } from './home.component';
import { InformationsComponent } from './informations/informations.component';
import { RequestCardComponent } from './request-card/request-card.component';
import { RequestCheckComponent } from './request-check/request-check.component';
import { ProfileComponent } from './profile/profile.component';
import { ReclamationComponent } from './reclamation/reclamation.component';
import { RequestWalletComponent } from './request-wallet/request-wallet.component';
import { AccountDeactivationComponent } from '../account-deactivation/account-deactivation.component';

const routes: Routes = [
  {path:'', component: HomeComponent , data: { breadcrumb: 'Home' },
  children: [
      { path: 'RequestAccount', component: CreateAccountComponent, data: { breadcrumb: 'Consulter' }},
      { path: 'RequestCard', component: RequestCardComponent, data: { breadcrumb: 'Demander Carte' }},
      { path: 'RequestCheck', component: RequestCheckComponent, data: { breadcrumb: 'Demande Chequier' }},
      { path: 'KycForm', component: InformationsComponent, data: { breadcrumb: 'KycForm' }},
      { path: 'Informations', component: ProfileComponent, data: { breadcrumb: 'Mes Informations' }},
      { path: 'reclamation', component: ReclamationComponent, data: { breadcrumb: 'Réclamation' }},
      { path: 'request-wallet', component: RequestWalletComponent, data: { breadcrumb: 'Demande de Wallet' } },
      { path: 'account-deactivation', component: AccountDeactivationComponent, data: { breadcrumb: 'Désactivation du compte' } },

      //     { path: 'paiement', component : PaiementComponent, data: { breadcrumb: 'Paiement' } },
  
  //     { path: 'mabanque', component : MabanqueComponent, data: { breadcrumb: 'Ma banque' } },
  //     { path: 'engagements', component : EngagementsComponent, data: { breadcrumb: 'Engagements' } },
  //     { path: 'dashboardclient', component : DashboardclientComponent, data: { breadcrumb: 'DashboardClient' } },
  //     { path: 'bancaireetrangere', component : BancaireetrangereComponent, data: { breadcrumb: 'Bancaire étrangère' } },
  // {path:'**', redirectTo:'not-found', pathMatch: 'full'},

]}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {}
