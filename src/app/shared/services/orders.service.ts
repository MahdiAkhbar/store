import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor() {
    let localStorageWhishList: Product[] | undefined = JSON.parse(<string>localStorage.getItem('whishList'));
    let localStorageBasketList: Product[] | null = JSON.parse(<string>localStorage.getItem('basketList'));
    if (localStorageWhishList) {
      this.whishList = JSON.parse(<string>localStorage.getItem('whishList'));
    }
    if (localStorageBasketList)
      this.basketList = localStorageBasketList
  }

  basketList: Product[] = [];
  whishList:  Product[] = [];
  basketIsEmpty = new Subject<boolean>();
  whishlistIsEmpty = new Subject<boolean>();

  addToBasket(order: Product) {
      const existingOrder = this.basketList.find(item => item._id === order._id);
      if(existingOrder) {
        let index = this.basketList.indexOf(existingOrder);
        this.basketList[index].count += 1;
      }
      else {
        this.basketList.push(order);
      }
      localStorage.setItem('basketList', JSON.stringify(this.basketList));
      this.basketIsEmpty.next(false);
  }
  removeFromBasket(order: Product) {
    this.basketList.splice(this.basketList.indexOf(order), 1);
    if (this.basketList.length < 1)
      this.basketIsEmpty.next(true);
    localStorage.setItem('basketList', JSON.stringify(this.basketList));
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
