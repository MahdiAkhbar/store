import { 
  Component,
  ElementRef,
  Inject,
  Renderer2,
  ViewChild 
} from '@angular/core';
import { NgForm } from '@angular/forms';

import { UsersService } from 'src/app/shared/users.service';
import { User } from 'src/app/shared/user.model';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent {
  constructor(
    private usersService: UsersService,
    @Inject('API_URL') private url: string,
    private r2: Renderer2
  ) {}

  notEditedUser: User = {
    id: '',
    name: '',
    lastName: '',
    email: '',
    password: '',
  }
  editedUser!: User;
  @ViewChild('nr', { static: true }) nr!: ElementRef;

  onSubmit(form: NgForm) {
    this.editedUser = { ...form.value, id: this.notEditedUser.id };
    this.usersService.editUser(this.editedUser)
    .subscribe(() => {
      console.log('User', this.editedUser, 'successfully edited!');
      form.reset();
    })
  }
  
  fetchUser(email: string) {
    this.usersService.getUser()
    .subscribe((users) => {
      let user =  users.find(u => u.email === email);
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
