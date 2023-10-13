import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/shared/orders.service';
import { Product } from 'src/app/shared/product.model';

@Component({
  selector: 'app-whishlist',
  templateUrl: './whishlist.component.html',
  styleUrls: ['./whishlist.component.css']
})
export class WhishlistComponent implements OnInit {
  constructor(private ordersService: OrdersService) {}

  orders: Product[] = [];

  ngOnInit(): void {
    this.orders = this.ordersService.getWhishlistOrders();
  }
  remove(order: Product) {
    this.ordersService.removeFromWhishlist(order);    
  }
  onAddToBasket(product: Product) {
    this.ordersService.addToBasket(product)
  }
}
