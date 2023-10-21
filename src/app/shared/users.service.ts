import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, map } from 'rxjs';
import { Router } from '@angular/router';

import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private http: HttpClient,
    private router: Router
    ) { }

  user!: User;
  loggedIn: Subject<boolean> = new Subject();


  createUser(user: User) {
    return this.http.post<User>('https://store-shop-2bb1e-default-rtdb.firebaseio.com/users.json', user);
    // return this.http.post<User>('http://localhost:3000/users', user);
  }
  getUser() {
    return this.http.get<User[]>('https://store-shop-2bb1e-default-rtdb.firebaseio.com/users.json')
    // return this.http.get<User[]>('http://localhost:3000/users')
  }
  signup(user: User) {
    this.loggedIn.next(true);
    this.http.post<User>('https://store-shop-2bb1e-default-rtdb.firebaseio.com/users.json', user)
    // this.http.post<User>('http://localhost:3000/users', user)
    .subscribe((user) => {      
      this.user = user;
      this.router.navigate(['/profile']);
    });
  }
  login(user: User) {
    this.loggedIn.next(true);
    this.getUser().subscribe((users) => {
      let loginuser = users.find(u => u === user);
      if (loginuser)
        this.user = loginuser;
      else
        this.router.navigate(['/']);
    });
    this.router.navigate(['/profile']);
  }
  logout() {
    this.loggedIn.next(false);
    this.router.navigate(['/']);
  }
}
