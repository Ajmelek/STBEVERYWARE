import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { HomeRoutingModule } from './home-routing.module';
import { CreateAccountComponent } from './create-account/create-account.component';
import { RequestCheckComponent } from './request-check/request-check.component';
import { RequestCardComponent } from './request-card/request-card.component';
import { HomeComponent } from './home.component';
import { InformationsComponent } from './informations/informations.component';
import { ProfileComponent } from './profile/profile.component';
import { ReclamationComponent } from './reclamation/reclamation.component';
import { RequestWalletComponent } from './request-wallet/request-wallet.component';
import { AccountDeactivationComponent } from '../account-deactivation/account-deactivation.component';

@NgModule({
  declarations: [
    CreateAccountComponent,
    RequestCheckComponent,
    RequestCardComponent,
    InformationsComponent,
    ProfileComponent,
    ReclamationComponent,
    RequestWalletComponent,
    AccountDeactivationComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class HomeModule { }
