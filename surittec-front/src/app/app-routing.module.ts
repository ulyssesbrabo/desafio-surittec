import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { RegisterUserComponent } from './component/register-user/register-user.component';
import { LoginComponent } from './component/login/login.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    data: { pageTitle: 'Home' }
  },
  {
    path: 'register-user',
    component: RegisterUserComponent,
    data: { pageTitle: 'Register User' }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: { pageTitle: 'Login' }
  },
  { 
    path: '', 
    redirectTo: 'login', 
    pathMatch: 'full' 
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
