
// import { LoginComponent } from './components/login/login.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
// import { SignupComponent } from './components/signup/signup.component';
// import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  // {path: '',component: DashboardComponent}
  // {path: 'login',component: LoginComponent},
  // {path: 'signup',component: SignupComponent},
  // {path: 'dashboard',component: DashboardComponent, canActivate:[AuthGuard]},
  {path: 'dashboard',component: DashboardComponent},
  {path: '', redirectTo: '/dashboard', pathMatch: 'full' }, //to be kept
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
