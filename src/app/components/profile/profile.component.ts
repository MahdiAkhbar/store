import { Component, OnInit } from '@angular/core';

import { User } from 'src/app/shared/models/user.model';
import { UsersService } from 'src/app/shared/services/users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  constructor(private usersService: UsersService) {}

  loggedInUser!: User;
  loginStatus: boolean = false;

  ngOnInit(): void {
    this.loggedInUser = JSON.parse(<string>localStorage.getItem('user'));
    this.loginStatus = this.usersService.getLoginStatus();
  }
  logout() {
    this.usersService.logout();
  }
}
