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
      this.loggedIn.subscribe((value) => { 
        localStorage.setItem('loginStatus', JSON.stringify(value))
      });
    }
    
    user!: User;
    loggedIn: Subject<boolean> = new Subject();
    loginStatus: boolean = false;

  editUser(user: User) {
    return this.http.put(this.localUrl + '/users/' + user.email, user, { responseType: 'text' });
  }
  getUsers() {
    return this.http.get<User[]>(this.localUrl + '/users');
  }

  getOneUser(email: string) {
    return fetch('http://localhost:3000/users/' + email)
  }

  signup(user: User) {
    this.loggedIn.next(true);
    this.http.post<User>(this.localUrl + '/users', user)
    .subscribe(() => {
      localStorage.setItem('user', JSON.stringify(user));
      this.user = user;
      this.router.navigate(['/profile']);
    });
  }
  login(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
    this.loggedIn.next(true);
    this.user = user;
    this.router.navigate(['/profile']);
  }
  logout() {
    localStorage.removeItem('user');
    this.loggedIn.next(false);
    this.router.navigate(['/']);
  }
  getLoginStatus() {
    this.loginStatus = JSON.parse(<string>localStorage.getItem('loginStatus'));
    
    return this.loginStatus;
  }
}
