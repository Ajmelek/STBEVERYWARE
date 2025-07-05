import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './register/login/login.component';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {path:'', redirectTo:'login', pathMatch: 'full'},
  {path:'login', component: LoginComponent},
  {
    path:'home', 
    loadChildren:()=> import('./home/home.module').then(mod => mod.HomeModule), 
    data: {breadcrumb: 'Home'},
    canActivate: [AuthGuard]
  },
  {
    path:'admin',
    loadChildren:()=> import('./admin/admin.module').then(mod => mod.AdminModule),
    data: {breadcrumb: 'Admin'}
  },
  {
    path:'super-admin',
    loadChildren:()=> import('./super-admin/super-admin.module').then(mod => mod.SuperAdminModule),
    data: {breadcrumb: 'Super Admin'}
  },
  {path:'**', redirectTo:'not-found', pathMatch: 'full'},
];
@NgModule({
  imports: [RouterModule.forRoot(routes,{
    useHash: true
  })],
 
  exports: [RouterModule]
})
export class AppRoutingModule { }