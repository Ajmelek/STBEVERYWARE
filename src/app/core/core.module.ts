import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { SectionHeaderComponent } from './section-header/section-header.component';
import { BreadcrumbModule } from 'xng-breadcrumb';
import { FooterComponent } from './footer/footer.component';
import { ProfilComponent } from './profil/profil.component';
import { AuthService } from '../shared/services/auth.service';

@NgModule({
  declarations: [
    NavBarComponent,
    SectionHeaderComponent,
    FooterComponent,
    ProfilComponent
  ],
  imports: [
    CommonModule,
    BreadcrumbModule
  ],
  providers: [
    AuthService
  ],
  exports:[ 
    NavBarComponent,
    SectionHeaderComponent,
    FooterComponent,
    ProfilComponent
  ]
})
export class CoreModule { }
