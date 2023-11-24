import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Supplier } from 'src/app/interfaces/supplier';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register-supplier',
  templateUrl: './register-supplier.component.html',
  styleUrls: ['./register-supplier.component.scss']
})
export class RegisterSupplierComponent implements OnInit {
  registerForm: FormGroup = new FormGroup({});
  registerError: string = '';
  isSubmitting = false;

  constructor(
    public dialogRef: MatDialogRef<RegisterSupplierComponent>,
    private authenticationService: AuthenticationService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.registerForm = new FormGroup({
      'cnpj': new FormControl('', Validators.required),
      'razaoSocial': new FormControl('', Validators.required),
      'nomeFantasia': new FormControl('', Validators.required),
      'endereco': new FormControl('', Validators.required),
      'cidade': new FormControl('', Validators.required),
      'uf': new FormControl('', Validators.required),
      'cep': new FormControl('', Validators.required),
      'fone': new FormControl('', Validators.required),
      'celular': new FormControl('', Validators.required),
      'email': new FormControl('', [Validators.required, Validators.email])
    });
  }


  register(): void {
    if (this.registerForm && this.registerForm.valid) {
      const supplier: Supplier = {
        cnpj: this.registerForm.value.cnpj,
        razaoSocial: this.registerForm.value.razaoSocial,
        nomeFantasia: this.registerForm.value.nomeFantasia,
        endereco: this.registerForm.value.endereco,
        cidade: this.registerForm.value.cidade,
        uf: this.registerForm.value.uf,
        cep: this.registerForm.value.cep,
        fone: this.registerForm.value.fone,
        celular: this.registerForm.value.celular,
        email: this.registerForm.value.email
      };
      this.authenticationService.registerSupplier(supplier).subscribe(
        success => {
          this.registerForm.reset();
          this.snackBar.open('Fornecedor cadastrado com sucesso!', 'Fechar', {
            duration: 5000,
          });
        },
        error => {
          this.snackBar.open('Houve um erro ao cadastrar o fornecedor', 'Fechar', {
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
    RegisterSupplierComponent
  ],
  imports: [
    ReactiveFormsModule,
    MatSnackBarModule,
    CommonModule
  ],
  exports: [
    RegisterSupplierComponent
  ]
})
export class RegisterSupplierFormModule {}