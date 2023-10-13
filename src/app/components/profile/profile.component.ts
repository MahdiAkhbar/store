import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/shared/user.model';
import { UsersService } from 'src/app/shared/users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  constructor(private usersService: UsersService) {}

  user!: User;
  onSubmit(form: NgForm) {
    this.user = form.value;    
    this.usersService.createUser(this.user)
    .subscribe(() => {
      console.log('User', this.user, 'successfully created');
      form.reset();
    })
  }
}
