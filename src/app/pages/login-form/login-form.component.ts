import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

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
    private router: Router
    ) { }

    login(): void {
      this.authenticationService.login(this.email, this.password).subscribe(
        success => {
          this.router.navigate(['/home']);
        },
        error => {
          this.loginError = 'Usuário ou senha inválidos';
        }
      );
    }
}
@NgModule({
  imports: [
    CommonModule,
      FormsModule
  ],
  declarations: [
      LoginFormComponent
  ]
})
export class LoginFormModule { }
