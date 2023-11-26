import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/shared/services/orders.service';
import { UsersService } from 'src/app/shared/services/users.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(private ordersService: OrdersService, private usersService: UsersService) {}

  basketIsEmpty: boolean = true;
  whishlistIsEmpty: boolean = true;
  loggedIn: boolean = false || JSON.parse(<string>localStorage.getItem('loginStatus'));

  ngOnInit(): void {
    this.usersService.loggedIn.subscribe((value) => this.loggedIn = value);
    this.ordersService.basketIsEmpty.subscribe(value => this.basketIsEmpty = value);
    this.ordersService.whishlistIsEmpty.subscribe(value => this.whishlistIsEmpty = value);
  }

}
