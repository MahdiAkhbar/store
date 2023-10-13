import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) { }
  user!: User;
  
  isAdmin() {
    let promise = new Promise((resolve) => {
      fetch('https://store-shop-2bb1e-default-rtdb.firebaseio.com/users.json')
      .then(response => response.json())
      .then((users) => {
        let usersList = [];
        for (let key in users)
          usersList.push(users[key]);
        return usersList;
      })
      .then((users: User[]) => {
        let loginUser = users.find(u => u.name === this.user.name && u.password === this.user.password);
        if (loginUser)
          resolve(loginUser.isAdmin);
        else
          this.router.navigate(['/']);
      })
    })
    return promise;
  }

  login(user: User) {
    this.user = user;
  }
  signup(user: User) {
    this.user = user;
  }
}
