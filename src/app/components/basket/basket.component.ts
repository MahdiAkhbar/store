import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/shared/services/orders.service';

import { Product } from 'src/app/shared/models/product.model';
import { ProductService } from 'src/app/shared/services/product.service';
import { UsersService } from 'src/app/shared/services/users.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {
  constructor(private ordersService: OrdersService, private usersService: UsersService) {}

  products: Product[] = [];
  totalPrice: number = 0;
  orders: Product[] = [];
  loginStatus: boolean = false;

  ngOnInit(): void {
    this.loginStatus = this.usersService.getLoginStatus();
    this.orders = this.ordersService.getBasketOrders();
    this.orders.forEach((order) => {
      this.totalPrice += order.price * order.count;
    })
  }

  remove(order: Product) {
    this.ordersService.removeFromBasket(order);
    this.totalPrice -= order.price * order.count;
  }

  increase(order: Product) {
    let product = this.findIndex(this.orders, order);
    product.count += 1;
    this.totalPrice += order.price
  }
  decrease(order: Product) {
    let index = this.orders.indexOf(<Product>this.orders.find(o => o._id === order._id));
    this.orders[index].count -= 1;
    this.totalPrice -= order.price;
  }
  findIndex(array: Product[], order: Product) {
    let index = array.indexOf(<Product>this.orders.find(o => o._id === order._id));
    let product = array[index];
    return product;
  }
}
