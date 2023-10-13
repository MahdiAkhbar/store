import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/shared/orders.service';

import { Product } from 'src/app/shared/product.model';
import { ProductService } from 'src/app/shared/product.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {
  constructor(private ordersService: OrdersService, private productService: ProductService) {}

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
    this.productService.fetchProducts()
    .subscribe((products) => {
      this.products = products;
    });

    this.orders = this.ordersService.getBasketOrders();
    this.orders.forEach((order) => {
      this.totalPrice += +order.price;
    })
  }

  remove(order: Product) {
    this.ordersService.removeFromBasket(order);
    this.totalPrice -= order.price;
  }

  increase(order: Product) {
    let product = this.findIndex(this.orders, order);
    product.count += 1;
    this.totalPrice += +order.price
  }
  decrease(order: Product) {
    let index = this.orders.indexOf(<Product>this.orders.find(o => o.id === order.id));
    this.orders[index].count -= 1;
    this.totalPrice -= +order.price;
  }
  findIndex(array: Product[], order: Product) {
    let index = this.orders.indexOf(<Product>this.orders.find(o => o.id === order.id));
    let product = this.orders[index];
    return product;
  }
}
