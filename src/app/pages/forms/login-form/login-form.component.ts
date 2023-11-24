import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { TitleService } from '../register-form/services/titleregister.service';
import { MatDialog } from '@angular/material/dialog';
import { RegisterFormComponent } from '../register-form/register-form.component';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'login',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {

  email: string = '';
  password: string = '';
  loginError: string = '';

  constructor
    (
      private authenticationService: AuthenticationService,
      private router: Router,
      private titleService: TitleService,
      public dialog: MatDialog
    ) { }

  login(): void {
    const user: User = {
      login: this.email,
      password: this.password
    };
    this.authenticationService.login(user).subscribe(
      success => {
        this.router.navigate(['/home']);
      },
      error => {
        this.loginError = 'Usuário ou senha inválidos';
      }
    );
  }

  openDialogRegister(): void {
    this.titleService.changeTitle('Criar conta');
    this.dialog.open(RegisterFormComponent);
  }

}
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
  ],
  declarations: [
    LoginFormComponent
  ]
})
export class LoginFormModule { }
