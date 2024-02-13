import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/shared/models/user.model';
import { UsersService } from 'src/app/shared/services/users.service';

@Component({
  selector: 'app-changeinfo',
  templateUrl: './changeinfo.component.html',
  styleUrls: ['./changeinfo.component.css']
})
export class ChangeinfoComponent {
  constructor(private usersService: UsersService) { }

  loggedinUser: User = JSON.parse(<string>localStorage.getItem('user'));
  editedUser!: User;

  onSubmit(form: NgForm) {
    this.editedUser = { ...form.value };
    localStorage.setItem('user', JSON.stringify(this.editedUser));
    this.usersService.editUser(this.editedUser)
      .subscribe((response) => {
        console.log(response);
      })
  }

}
