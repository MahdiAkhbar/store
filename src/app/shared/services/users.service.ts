import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject('LOCAL_URL') private localUrl:string
    ) {
      this.loggedIn.subscribe(value => this.loginStatus = value);
    }

  user!: User;
  loggedIn: Subject<boolean> = new Subject();
  loginStatus: boolean = false;


  editUser(user: User) {
    return this.http.put<User>(this.localUrl + '/users/' + user.id, user);
  }
  getUser() {
    return this.http.get<User[]>(this.localUrl + '/users');
  }
  signup(user: User) {
    this.loggedIn.next(true);
    this.http.post<User>(this.localUrl + '/users', user)
    .subscribe(() => {
      this.user = user;
      this.router.navigate(['/profile']);
    });
  }
  login(user: User) {
    this.loggedIn.next(true);
    this.user = user;
    this.router.navigate(['/profile']);
  }
  logout() {
    this.loggedIn.next(false);
    this.router.navigate(['/']);
  }
  getLoginStatus() {
    return this.loginStatus;
  }
}
