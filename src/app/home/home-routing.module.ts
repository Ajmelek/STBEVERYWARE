import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateAccountComponent } from './create-account/create-account.component';
import { HomeComponent } from './home.component';
import { InformationsComponent } from './informations/informations.component';
import { RequestCardComponent } from './request-card/request-card.component';
import { RequestCheckComponent } from './request-check/request-check.component';

const routes: Routes = [
  {path:'', component: HomeComponent , data: { breadcrumb: 'Home' },
  children: [
      { path: 'RequestAccount', component: CreateAccountComponent, data: { breadcrumb: 'Creation Compte' }},
      { path: 'RequestCard', component: RequestCardComponent, data: { breadcrumb: 'Demander Carte' }},

      { path: 'RequestCheck', component: RequestCheckComponent, data: { breadcrumb: 'Demande Chequier' }},
      { path: 'Informations', component: InformationsComponent, data: { breadcrumb: 'Mes Informations' }},

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
