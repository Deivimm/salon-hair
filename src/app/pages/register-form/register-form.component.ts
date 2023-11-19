import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { FormsModule, FormGroup, FormControl, Validators, AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'register',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {
  registerForm: FormGroup = new FormGroup({});
  registerError: string = '';

  constructor
    (
      private authenticationService: AuthenticationService,
      private router: Router,
      private userService: UserService
    ) { }

  passwordsMatchValidator(control: AbstractControl): { [s: string]: boolean } | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (password && confirmPassword && password.value !== confirmPassword.value) {
      return { 'passwordsNotMatching': true };
    }
    return null;
  }

  ngOnInit() {
    this.registerForm = new FormGroup({
      'name': new FormControl('', Validators.required),
      'email': new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl('', [Validators.required, Validators.minLength(8), this.passwordValidator]),
      'confirmPassword': new FormControl('', Validators.required)
    }, this.passwordsMatchValidator);
  }

  passwordValidator(control: FormControl): { [s: string]: boolean } {
    if (!/(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[.!@#$%^&*])/.test(control.value)) {
      return { 'passwordInvalid': true };
    }
    return {};
  }

  register(): void {
    if (this.registerForm && this.registerForm.valid) {
      this.authenticationService.register(this.registerForm.value.name, this.registerForm.value.email, this.registerForm.value.password).subscribe(
        success => {
          this.userService.setUserName(this.registerForm.value.name);
          this.router.navigate(['/home']);
        },
        error => {
          this.registerError = 'Houve um erro ao registrar o usuário';
        }
      );
    }
  }
};

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    RegisterFormComponent,
    RegisterFormComponent
  ]
})
export class RegisterFormModule { }
