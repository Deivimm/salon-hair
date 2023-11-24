import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TitleService } from '../forms/register-form/services/titleregister.service';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { MatDialog } from '@angular/material/dialog';
import { RegisterFormComponent } from '../forms/register-form/register-form.component';
import { RegisterClientComponent } from '../forms/register-client/register-client.component';
import { RegisterSupplierComponent } from '../forms/register-supplier/register-supplier.component';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  showMenu = false;

  constructor(
    private titleService: TitleService,
    private router: Router,
    private authService: AuthenticationService,
    public dialog: MatDialog
  ) { }

  openDialogRegisterUser(): void {
    this.titleService.changeTitle('Cadastrar usuário');
    const dialogRef = this.dialog.open(RegisterFormComponent);
    document.body.classList.add('modal-open');
    dialogRef.afterClosed().subscribe(() => {
      document.body.classList.remove('modal-open');
    });
  }

  openDialogRegisterClient(): void {
    const dialogRef = this.dialog.open(RegisterClientComponent);
    document.body.classList.add('modal-open');
    dialogRef.afterClosed().subscribe(() => {
      document.body.classList.remove('modal-open');
    });
  }

  openDialogRegisterSupplier(): void {
    const dialogRef = this.dialog.open(RegisterSupplierComponent);
    document.body.classList.add('modal-open');
    dialogRef.afterClosed().subscribe(() => {
      document.body.classList.remove('modal-open');
    });
  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
