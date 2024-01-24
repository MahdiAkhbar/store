import { Inject, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../models/user.model';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit {
  constructor(
    private router: Router,
    @Inject('LOCAL_URL') private localUrl: string,
    private usersService: UsersService) { }

  isLoggedIn: boolean = false;

  ngOnInit(): void {
    this.usersService.loggedIn.subscribe((value: boolean) => {
      this.isLoggedIn = value;
    })
  }
  isAdmin() {
    const user: User = JSON.parse(<string>localStorage.getItem('user'));
    let promise = new Promise((resolve) => {
      resolve(user.isAdmin);
    })
    return promise;
  }
  isLogedIn() {
    return this.isLoggedIn;
  }
}
