import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { Product } from 'src/app/shared/models/product.model';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private productService: ProductService
  ) {}

  sortArg: string = '';
  alphabetArg: boolean | string = '';
  isFetching: boolean = true;
  searchValue: string = '';
  products: Product[] = [];
  
  ngOnInit(): void {
    
    this.productService.fetchProducts().subscribe((response) => {
        this.isFetching = false;
        this.products = response;
      });
    }
  sortPar(value: string) {
    this.sortArg = value;
  }
  onAlphabet(value: boolean) {
    this.alphabetArg = value;
  }
}
