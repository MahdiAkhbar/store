import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor() {
    let localStorageWhishList: Product[] | undefined = JSON.parse(<string>localStorage.getItem('whishList'));
    if (localStorageWhishList) {
      this.whishList = JSON.parse(<string>localStorage.getItem('whishList'));
    }
  }

  basketList: Product[] = [];
  whishList:  Product[] = [];
  basketIsEmpty = new Subject<boolean>();
  whishlistIsEmpty = new Subject<boolean>();

  addToBasket(order: Product) {
    if (this.basketList.includes(order)) {
      let index = this.basketList.indexOf(order);
      this.basketList[index].count += 1;
    }
    else {
      this.basketList.push(order);
    }
    this.basketIsEmpty.next(false);
  }
  removeFromBasket(order: Product) {
    this.basketList.splice(this.basketList.indexOf(order), 1);
    if (this.basketList.length < 1)
      this.basketIsEmpty.next(true);
  }
  addToWhishlist(order: Product) {
    this.whishList.push(order);
    localStorage.setItem('whishList', JSON.stringify(this.whishList));
    this.whishlistIsEmpty.next(false);
  }
  removeFromWhishlist(order: Product) {
    let index;
    for (let item of this.whishList) {
      if (item._id === order._id) {
        index = this.whishList.indexOf(item);
        this.whishList.splice(index, 1);
        break;
      }
    }
    localStorage.setItem('whishList', JSON.stringify(this.whishList));
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
