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
    ) {
      this.loggedIn.subscribe(value => this.loginStatus = value);
    }

  user!: User;
  loggedIn: Subject<boolean> = new Subject();
  loginStatus: boolean = false;


  editUser(user: User) {
    return this.http.patch<User>(this.url + '/users/' + user.id + '.json', user);
  }
  getUser() {
    return this.http.get<User[]>(this.url + '/users.json')
    .pipe(
      map((response) => {
        let userslist = [];
        for (let key in response) {
          userslist.push({ ...response[key], id: key });
        }
        return userslist;
      })
    )
  }
  signup(user: User) {
    this.loggedIn.next(true);
    this.http.post<User>(this.url + '/users.json', user)
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
