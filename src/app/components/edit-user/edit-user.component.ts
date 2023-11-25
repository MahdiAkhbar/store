import { 
  Component,
  ElementRef,
  Renderer2,
  ViewChild 
} from '@angular/core';
import { NgForm } from '@angular/forms';

import { UsersService } from 'src/app/shared/services/users.service';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent {
  constructor(
    private usersService: UsersService,
    private r2: Renderer2
  ) {}

  notEditedUser: User = {
    id: '',
    name: '',
    lastName: '',
    email: '',
    password: '',
    isAdmin: false
  }
  editedUser!: User;
  @ViewChild('notRegistered', { static: true }) nr!: ElementRef;

  onSubmit(form: NgForm) {
    this.editedUser = { ...form.value };
    this.usersService.editUser(this.editedUser)
    .subscribe((response) => {
      console.log(response);
      form.reset();
    })
  }
  
  fetchUser(email: string) {
    this.usersService.getOneUser(email)
    .then(value => value.json())
    .then((value) => {
      let user = value;
      if (user) {
        this.notEditedUser = user;
        this.r2.addClass(this.nr.nativeElement, 'not-registerd')
      }
      else {
        this.r2.removeClass(this.nr.nativeElement, 'not-registerd');
      }
    })
  }
}
