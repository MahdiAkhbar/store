import { Component, Input } from '@angular/core';

import { OrdersService } from 'src/app/shared/services/orders.service';
import { Product } from 'src/app/shared/models/product.model';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent {
  constructor(private ordersService: OrdersService) {}

  @Input() product!: Product;

  onAddToBasket(order: Product) {
    this.ordersService.addToBasket(order);
  }
  onAddToWhishlist(order: Product) {
    this.ordersService.addToWhishlist(order);
  }

}
