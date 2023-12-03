import { Component, Input, OnInit } from '@angular/core';

import { OrdersService } from 'src/app/shared/services/orders.service';
import { Product } from 'src/app/shared/models/product.model';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {
  constructor(private ordersService: OrdersService) {}

  @Input() product!: Product;
  isFavorite: boolean = false;

  ngOnInit(): void {
    let prod = this.product;
    let localStorageWhishList: Product[] | null = JSON.parse(<string>localStorage.getItem('whishList'));
    if (localStorageWhishList) {
      for (let item of localStorageWhishList) {
        if (item._id === prod._id) {
          this.isFavorite = true;
          break;
        }
      }
    }
  }

  onAddToBasket(order: Product) {
    this.ordersService.addToBasket(order);
  }
  onAddToWhishlist(order: Product) {
    this.isFavorite = true;
    this.ordersService.addToWhishlist(order);
  }

  onRemoveFromWhishlist(order: Product) {
    this.isFavorite = false;
    this.ordersService.removeFromWhishlist(order);
  }

}
