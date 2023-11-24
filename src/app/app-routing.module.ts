import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RegisterFormComponent } from './pages/forms/register-form/register-form.component';
import { AuthGuard } from './services/authentication/authguard.service';
import { LoginGuard } from './services/authentication/loginGuard.service';
import { LoginFormComponent } from './pages/forms/login-form/login-form.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', component: LoginFormComponent, canActivate: [LoginGuard] },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterFormComponent},
  { path: '**', component: LoginFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
