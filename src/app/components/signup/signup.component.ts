import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';

import { User } from 'src/app/shared/user.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

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
    let user: User = this.signupForm.value
    this.authService.signup(user);
    this.router.navigate(['/profile']);
    this.signupForm.reset();
  }
  minlength(control: FormControl): { [s: string]: boolean } | null {
    if (control.value === null)
      return null;
    if (control.value.length < 6)
      return { 'minLength': true };
    return null;
  }
}