import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './register/login/login.component';

const routes: Routes = [
  {path:'', redirectTo:'login', pathMatch: 'full'},
  {path:'login', component: LoginComponent},
  {path:'home', loadChildren:()=> import('./home/home.module').then(mod => mod.HomeModule), data: {breadcrumb: 'Home'} },
  {path:'**', redirectTo:'not-found', pathMatch: 'full'},
];
@NgModule({
  imports: [RouterModule.forRoot(routes,{
    useHash: true
  })],
 
  exports: [RouterModule]
})
export class AppRoutingModule { }
