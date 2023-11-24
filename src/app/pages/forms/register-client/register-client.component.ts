import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Client } from 'src/app/interfaces/client';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';


@Component({
  selector: 'app-register-client',
  templateUrl: './register-client.component.html',
  styleUrls: ['./register-client.component.scss']
})
export class RegisterClientComponent implements OnInit {
  registerForm: FormGroup = new FormGroup({});
  registerError: string = '';

  constructor(
    public dialogRef: MatDialogRef<RegisterClientComponent>,
    private authenticationService: AuthenticationService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.registerForm = new FormGroup({
      'cpf': new FormControl('', Validators.required),
      'name': new FormControl('', Validators.required),
      'secondName': new FormControl('', Validators.required),
      'endereco': new FormControl('', Validators.required),
      'cidade': new FormControl('', Validators.required),
      'uf': new FormControl('', Validators.required),
      'cep': new FormControl('', Validators.required),
      'rg': new FormControl(''),
      'dateNasc': new FormControl('', Validators.required),
      'fone': new FormControl(''),
      'celular1': new FormControl('', Validators.required),
      'celular2': new FormControl(''),
      'email': new FormControl('', [Validators.required, Validators.email])
    });
  }

  register(): void {
    if (this.registerForm && this.registerForm.valid) {
      const client: Client = {
        cpf: this.registerForm.value.cpf,
        name: this.registerForm.value.name,
        secondName: this.registerForm.value.secondName,
        endereco: this.registerForm.value.endereco,
        cidade: this.registerForm.value.cidade,
        uf: this.registerForm.value.uf,
        cep: this.registerForm.value.cep,
        rg: this.registerForm.value.rg,
        dateNasc: this.registerForm.value.dateNasc,
        fone: this.registerForm.value.fone,
        celular1: this.registerForm.value.celular1,
        celular2: this.registerForm.value.celular2,
        email: this.registerForm.value.email
      };

      this.authenticationService.registerClient(client).subscribe(
        success => {
          this.registerForm.reset();
          this.snackBar.open('Cliente cadastrado com sucesso!', 'Fechar', {
            duration: 5000,
          });
        },
        error => {
          this.snackBar.open('Houve um erro ao cadastrar o cliente', 'Fechar', {
            duration: 2000,
          });
        }
      );
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}

@NgModule({
  declarations: [
    RegisterClientComponent
  ],
  imports: [
    ReactiveFormsModule,
    MatSnackBarModule,
    CommonModule
  ],
  exports: [
    RegisterClientComponent
  ]
})
export class RegisterClientFormModule {}