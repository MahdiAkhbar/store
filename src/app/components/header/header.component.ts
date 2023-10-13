import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/shared/orders.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(private ordersService: OrdersService) {}

  basketIsEmpty: boolean = true;
  whishlistIsEmpty: boolean = true;

  ngOnInit(): void {
    // this.basketIsEmpty = this.ordersService.getBasketArrayLength()
    this.ordersService.basketIsEmpty.subscribe(value => this.basketIsEmpty = value);
    this.ordersService.whishlistIsEmpty.subscribe(value => this.whishlistIsEmpty = value);
  }

}
