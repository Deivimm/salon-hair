import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TitleService {
  private title = new BehaviorSubject('Criar conta');
  currentTitle = this.title.asObservable();

  constructor() { }

  changeTitle(title: string) {
    this.title.next(title);
  }
}