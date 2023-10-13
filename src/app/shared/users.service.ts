import { HttpClient } from '@angular/common/http';

import { User } from './user.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  createUser(user: User) {
    return this.http.post<User>('https://store-shop-2bb1e-default-rtdb.firebaseio.com/users.json', user);
  }
}
