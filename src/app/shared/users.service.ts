import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Subject, map } from 'rxjs';
import { Router } from '@angular/router';

import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject('API_URL') private url:string
    ) { }

  user!: User;
  loggedIn: Subject<boolean> = new Subject();


  createUser(user: User) {
    return this.http.post<User>(this.url + '/users.json', user);
    // return this.http.post<User>(this.localUrl + '/users', user);
  }
  getUser() {
    return this.http.get<User[]>(this.url + '/users.json')
    // return this.http.get<User[]>(this.localUrl + '/users')
  }
  signup(user: User) {
    this.loggedIn.next(true);
    this.http.post<User>(this.url + '/users.json', user)
    // this.http.post<User>(this.localUrl + '/users', user)
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
