import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Client } from 'src/app/interfaces/client';
import { User } from 'src/app/interfaces/user';
import { Supplier } from 'src/app/interfaces/supplier';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private loginUrl = 'http://localhost:8080/auth/login';
  private registerUrl = 'http://localhost:8080/auth/register';
  private registerClientUrl = 'http://localhost:8080/clients';
  private registerSupplierUrl = 'http://localhost:8080/fornecedor';
  private _isAuthenticated = false;

  constructor(private http: HttpClient) { }

  login(user: User): Observable<any> {
    return this.http.post<any>(this.loginUrl, user)
      .pipe(
        tap((response) => {
          if (response && response.token) {
            localStorage.setItem('token', response.token);
          }
        })
      );
  }

  register(user: User): Observable<any> {
    return this.http.post<any>(this.registerUrl, user )
      .pipe(
        tap((response) => {
          if (response && response.token) {
            localStorage.setItem('token', response.token);
          }
        })
      );
  }

  registerClient(client: Client): Observable<any> {
    return this.http.post<any>(this.registerClientUrl, client)
  }

  registerSupplier(suppliert: Supplier): Observable<any> {
    return this.http.post<any>(this.registerSupplierUrl, suppliert)
  }


  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }

  logout(): void {
    localStorage.removeItem('token');
    this._isAuthenticated = false;
  }

}
