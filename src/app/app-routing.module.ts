import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginFormComponent } from './login/login-form/login-form.component';

const routes: Routes = [

    { path: '', redirectTo: '/login-form', pathMatch: 'full' },
    { path: 'login-form', component: LoginFormComponent },
    { path: '**', component: LoginFormComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
