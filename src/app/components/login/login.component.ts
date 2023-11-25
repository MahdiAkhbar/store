import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { User } from 'src/app/shared/models/user.model';
import { UsersService } from 'src/app/shared/services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(
    private router: Router,
    private usersService: UsersService,
    private r2: Renderer2
    ) {}

  loginForm!: FormGroup;
  @ViewChild('failLogin', { static: true }) failLogin!: ElementRef;

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      // 'name': new FormControl(null, Validators.required),
      'email':    new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, this.minlength])
    });
  }
  onSubmit() {
    this.r2.addClass(this.failLogin.nativeElement, 'normal');
    let user: User = {...this.loginForm.value};

    this.usersService.getUsers().subscribe((users) => {
      let loginuser = users.find(u => u.email === user.email && u.password === user.password);
      if (loginuser){
        this.usersService.login(loginuser);
      }
      else{
        this.r2.removeClass(this.failLogin.nativeElement, 'normal');
        this.loginForm.reset();
      }
    });
  }
  minlength(control: FormControl): { [s: string]: boolean } | null {
    if (control.value === null)
      return null;
    if (control.value.length < 6)
      return { 'minLength': true };
    return null;
  }
}