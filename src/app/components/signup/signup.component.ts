import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
import { Product } from 'src/app/shared/product.model';
import { ProductService } from 'src/app/shared/product.service';

import { User } from 'src/app/shared/user.model';
import { UsersService } from 'src/app/shared/users.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  constructor(
    private usersService: UsersService,
    private http: HttpClient,
    private productService: ProductService) {}

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
  // createUser() {
  //   let user: User = {
  //     name: 'user2',
  //     lastName: 'user2lastname',
  //     email: 'user2@user2.com',
  //     password: '12345678'
  //   };
  //   this.http.post('http://localhost:3000/users', user).subscribe(() => {
  //     console.log('user created successfully');
  //   })
  // }
  // createProduct() {
  //   let product: Product = {
  //     id: 'fgj',
  //     imagePath: 'https://cdn.aboutstatic.com/file/images/457f217bf7c0e895e95774d7249c766b.jpg?quality=75&height=480&width=360',
  //     name: 'only & sons',
  //     available: true,
  //     price: 47,
  //     count: 1
  //   };
  //   this.http.post('http://localhost:3000/products', product).subscribe((value) => {
  //     console.log('added successfully' + value);
      
  //   });
  // }
  getprod() {
    console.log(this.usersService.getLoginStatus());
  }
}