import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private loginUrl = 'http://localhost:8080/auth/login';
  private registerUrl = 'http://localhost:8080/auth/register';

  constructor(private http: HttpClient) { }

  login(login: string, password: string): Observable<any> {
    return this.http.post<any>(this.loginUrl, { login, password });
  }

  register(name: String, login: string, password: string): Observable<any> {
    return this.http.post<any>(this.registerUrl, { name, login, password });
  }

}
