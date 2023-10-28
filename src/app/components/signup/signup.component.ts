import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/shared/product.service';

import { User } from 'src/app/shared/user.model';
import { UsersService } from 'src/app/shared/users.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  constructor(private usersService: UsersService) {}

  signupForm!: FormGroup;

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'lastName': new FormControl(null, Validators.required),
      'email':    new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, this.minlength])
    });
  }
  onSubmit() {
    let user: User = {...this.signupForm.value};
    this.usersService.signup(user);
    this.signupForm.reset();
  }
  minlength(control: FormControl): { [s: string]: boolean } | null {
    if (control.value === null)
      return null;
    if (control.value.length < 6)
      return { 'minLength': true };
    return null;
  }
  getUsers() {
  fetch('https://store-shop-2bb1e-default-rtdb.firebaseio.com/users.json')
  .then(users => users.json())
  .then(users => console.log(users))
  .catch((err) => {
    console.log('errore : ' + err.message);
  })
  }
}