import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userName = new BehaviorSubject<string>('');

  userName$ = this.userName.asObservable();

  setUserName(name: string) {
    this.userName.next(name);
  }
}