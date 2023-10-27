import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { User } from 'src/app/shared/user.model';
import { UsersService } from 'src/app/shared/users.service';

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
    this.loggedInUser = this.usersService.user;
    this.loginStatus = this.usersService.getLoginStatus();
  }
  logout() {
    this.usersService.logout();
  }
}
