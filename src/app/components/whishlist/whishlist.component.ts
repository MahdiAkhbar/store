import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/shared/services/orders.service';
import { Product } from 'src/app/shared/models/product.model';
import { UsersService } from 'src/app/shared/services/users.service';

@Component({
  selector: 'app-whishlist',
  templateUrl: './whishlist.component.html',
  styleUrls: ['./whishlist.component.css']
})
export class WhishlistComponent implements OnInit {
  constructor(private ordersService: OrdersService, private usersService: UsersService) {}

  orders: Product[] = [];
  loginStatus: boolean = false;

  ngOnInit(): void {
    this.loginStatus = this.usersService.getLoginStatus();
    this.orders = this.ordersService.getWhishlistOrders();
  }
  remove(order: Product) {
    this.ordersService.removeFromWhishlist(order);    
  }
  onAddToBasket(product: Product) {
    this.ordersService.addToBasket(product)
  }
}
