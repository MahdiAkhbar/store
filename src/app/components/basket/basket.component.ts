import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/shared/services/orders.service';

import { Product } from 'src/app/shared/models/product.model';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {
  constructor(private ordersService: OrdersService) {}

  products: Product[] = [];
  totalPrice: number = 0;
  orders: Product[] = [];
  // orders: Product[] = [
  //   {
  //     name: 'test1',
  //     available: true,
  //     imagePath: 'https://cdn.aboutstatic.com/file/b11e9ecd767b1364b095175d6b9e8d0e?bg=F4F4F5&quality=75&trim=1&height=480&width=360',
  //     price: 99
  //   },
  //   {
  //     name: 'test2',
  //     available: true,
  //     imagePath: 'https://cdn.aboutstatic.com/file/b11e9ecd767b1364b095175d6b9e8d0e?bg=F4F4F5&quality=75&trim=1&height=480&width=360',
  //     price: 99
  //   },
  //   {
  //     name: 'test3',
  //     available: true,
  //     imagePath: 'https://cdn.aboutstatic.com/file/b11e9ecd767b1364b095175d6b9e8d0e?bg=F4F4F5&quality=75&trim=1&height=480&width=360',
  //     price: 99
  //   }
  // ];

  ngOnInit(): void {
    // this.productService.fetchProducts()
    // .subscribe((products) => {
    //   this.products = products;
    // });

    this.orders = this.ordersService.getBasketOrders();
    this.orders.forEach((order) => {
      this.totalPrice += order.price;
    })
  }

  remove(order: Product) {
    this.ordersService.removeFromBasket(order);
    this.totalPrice -= order.price;
  }

  increase(order: Product) {
    // let index = this.orders.indexOf(<Product>this.orders.find(o => o === order));
    let product = this.findIndex(this.orders, order);
    // let product = this.orders[index];
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
