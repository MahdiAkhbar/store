import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
import { User } from 'src/app/shared/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private router: Router, private authService: AuthService) {}

  loginForm!: FormGroup;

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      'name': new FormControl(null, Validators.required),
      // 'email':    new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, this.minlength])
    });
  }
  onSubmit() {
    let user: User = this.loginForm.value
    this.authService.login(user);
    this.router.navigate(['/profile']);
    this.loginForm.reset();
  }
  minlength(control: FormControl): { [s: string]: boolean } | null {
    if (control.value === null)
      return null;
    if (control.value.length < 6)
      return { 'minLength': true };
    return null;
  }
}