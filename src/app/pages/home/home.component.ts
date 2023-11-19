import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  userName: string = '';

  constructor(private userService: UserService) { }


  ngOnInit() {
    this.userService.userName$.subscribe(name => {
      this.userName = name;
    });
  }

}
