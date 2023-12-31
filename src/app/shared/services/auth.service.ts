import { Inject, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../models/user.model';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit{
  constructor(
    private router: Router,
    @Inject('API_URL') private url: string,
    private usersService: UsersService) { }
  
  isLoggedIn: boolean = false;

  ngOnInit(): void {
    this.usersService.loggedIn.subscribe((value: boolean) => {
      this.isLoggedIn = value;
    })
  }
  isAdmin() {
    const user = this.usersService.user;
    let promise = new Promise((resolve) => {
      fetch(this.url + '/users.json')
      .then(response => response.json())
      .then((users) => {
        let usersList = [];
        for (let key in users)
          usersList.push(users[key]);
        return usersList;
      })
      .then((users: User[]) => {
        let loginUser = users.find(u => u.name === user.name && u.password === user.password);
        if (loginUser)
          resolve(loginUser.isAdmin);
        else
          this.router.navigate(['/']);
      })
    })
    return promise;
  }
  isLogedIn() {
    return this.isLoggedIn;
  }
}
