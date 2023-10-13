import { Injectable } from '@angular/core';
import { Product } from './product.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor() { }

  basketList: Product[] = [];
  whishList:  Product[] = [];
  basketIsEmpty = new Subject<boolean>();
  whishlistIsEmpty = new Subject<boolean>();

  addToBasket(order: Product) {
    this.basketList.push(order);
    this.basketIsEmpty.next(false);
  }
  removeFromBasket(order: Product) {
    this.basketList.splice(this.basketList.indexOf(order), 1);
    if (this.basketList.length < 1)
      this.basketIsEmpty.next(true);
  }
  addToWhishlist(order: Product) {
    if (!this.whishList.includes(order)) {
      this.whishList.push(order);
    }
    this.whishlistIsEmpty.next(false);
  }
  removeFromWhishlist(order: Product) {
    this.whishList.splice(this.whishList.indexOf(order), 1);
    if (this.whishList.length < 1)
      this.whishlistIsEmpty.next(true);
  } 
  getBasketOrders() {
    return this.basketList;
  }
  getWhishlistOrders() {
    return this.whishList;
  }
  getBasketArrayLength() {
    return this.basketList.length < 1 ? true : false;
  }
}
