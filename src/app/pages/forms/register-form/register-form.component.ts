import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { FormsModule, FormGroup, FormControl, Validators, AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { TitleService } from './services/titleregister.service';
import { UserService } from '../../home/services/user.service';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/app/interfaces/user';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'register',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {
  registerForm: FormGroup = new FormGroup({});
  registerError: string = '';
  title: string = '';

  constructor
    (
      public dialogRef: MatDialogRef<RegisterFormComponent>,
      private authenticationService: AuthenticationService,
      private router: Router,
      private userService: UserService,
      private titleService: TitleService,
      private snackBar: MatSnackBar
    ) {}

  ngOnInit() {
    this.titleService.currentTitle.subscribe(title => this.title = title);
    this.registerForm = new FormGroup({
      'name': new FormControl('', Validators.required),
      'email': new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl('', [Validators.required, Validators.minLength(8), this.passwordValidator]),
      'confirmPassword': new FormControl('', Validators.required)
    }, this.passwordsMatchValidator);
  }

  passwordsMatchValidator(control: AbstractControl): { [s: string]: boolean } | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (password && confirmPassword && password.value !== confirmPassword.value) {
      return { 'passwordsNotMatching': true };
    }
    return null;
  }

  passwordValidator(control: FormControl): { [s: string]: boolean } {
    if (!/(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[.!@#$%^&*])/.test(control.value)) {
      return { 'passwordInvalid': true };
    }
    return {};
  }

  register(): void {
    if (this.registerForm && this.registerForm.valid) {
      const user: User = {
        name: this.registerForm.value.name,
        login: this.registerForm.value.email,
        password: this.registerForm.value.password
      };

      this.authenticationService.register(user).subscribe(
        success => {
          this.userService.setUserName(this.registerForm.value.name);
          this.snackBar.open('Cadastrado realizado com sucesso!', 'Fechar', {
            duration: 5000,
          });
        },
        error => {
          this.snackBar.open('Houve um erro ao cadastrar o usuário', 'Fechar', {
            duration: 2000,
          });
        }
      );
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

};

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatSnackBarModule,
    ReactiveFormsModule
  ],
  declarations: [
    RegisterFormComponent
  ],
  exports: [
    RegisterFormComponent
  ]
})
export class RegisterFormModule { }
