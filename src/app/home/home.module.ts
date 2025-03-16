import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { CreateAccountComponent } from './create-account/create-account.component';
import { RequestCheckComponent } from './request-check/request-check.component';
import { RequestCardComponent } from './request-card/request-card.component';
import { HomeComponent } from './home.component';
import { InformationsComponent } from './informations/informations.component';


@NgModule({
  declarations: [
    CreateAccountComponent,
    RequestCheckComponent,
    RequestCardComponent,
    InformationsComponent
   ],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
