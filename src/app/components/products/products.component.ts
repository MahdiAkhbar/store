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
  // products: Product[] = [
  //   {
  //     name: 'abbas',
  //     available: true,
  //     imagePath: 'https://cdn.aboutstatic.com/file/b11e9ecd767b1364b095175d6b9e8d0e?bg=F4F4F5&quality=75&trim=1&height=480&width=360',
  //     price: 22
  //   },
  //   {
  //     name: 'karim',
  //     available: true,
  //     imagePath: 'https://cdn.aboutstatic.com/file/b11e9ecd767b1364b095175d6b9e8d0e?bg=F4F4F5&quality=75&trim=1&height=480&width=360',
  //     price: 11
  //   },
  //   {
  //     name: 'batool',
  //     available: true,
  //     imagePath: 'https://cdn.aboutstatic.com/file/b11e9ecd767b1364b095175d6b9e8d0e?bg=F4F4F5&quality=75&trim=1&height=480&width=360',
  //     price: 33
  //   },
  //   {
  //     name: 'khavar',
  //     available: true,
  //     imagePath: 'https://cdn.aboutstatic.com/file/b11e9ecd767b1364b095175d6b9e8d0e?bg=F4F4F5&quality=75&trim=1&height=480&width=360',
  //     price: 88
  //   },
  //   {
  //     name: 'test',
  //     available: true,
  //     imagePath: 'https://cdn.aboutstatic.com/file/b11e9ecd767b1364b095175d6b9e8d0e?bg=F4F4F5&quality=75&trim=1&height=480&width=360',
  //     price: 55
  //   },
  //   {
  //     name: 'test',
  //     available: true,
  //     imagePath: 'https://cdn.aboutstatic.com/file/b11e9ecd767b1364b095175d6b9e8d0e?bg=F4F4F5&quality=75&trim=1&height=480&width=360',
  //     price: 99
  //   },
  //   {
  //     name: 'test',
  //     available: true,
  //     imagePath: 'https://cdn.aboutstatic.com/file/b11e9ecd767b1364b095175d6b9e8d0e?bg=F4F4F5&quality=75&trim=1&height=480&width=360',
  //     price: 22
  //   },
  //   {
  //     name: 'kal yadi',
  //     available: true,
  //     imagePath: 'https://cdn.aboutstatic.com/file/b11e9ecd767b1364b095175d6b9e8d0e?bg=F4F4F5&quality=75&trim=1&height=480&width=360',
  //     price: 77
  //   },
  //   {
  //     name: 'karim2',
  //     available: true,
  //     imagePath: 'https://cdn.aboutstatic.com/file/b11e9ecd767b1364b095175d6b9e8d0e?bg=F4F4F5&quality=75&trim=1&height=480&width=360',
  //     price: 22
  //   },
  //   {
  //     name: 'test',
  //     available: true,
  //     imagePath: 'https://cdn.aboutstatic.com/file/b11e9ecd767b1364b095175d6b9e8d0e?bg=F4F4F5&quality=75&trim=1&height=480&width=360',
  //     price: 22
  //   },
  // ];

  ngOnInit(): void {
    
    this.productService.fetchProducts().subscribe((response) => {
        this.isFetching = false;
        this.products = response;
        console.log(response);
        console.log(this.products);
      });
    }
  sortPar(value: string) {
    this.sortArg = value;
  }
  onAlphabet(value: boolean) {
    this.alphabetArg = value;
  }
}
