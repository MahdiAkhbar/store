import { HttpClient } from '@angular/common/http';
import { Injectable} from '@angular/core';
import { Product } from './product.model';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient) { }

  storeProduct(product: Product) {
    return this.http.post<Product>(
      'https://store-shop-2bb1e-default-rtdb.firebaseio.com/products.json',
      // 'http://localhost:3000/products',
      product
    )
  }
  fetchProducts() {
    return this.http.get<Product[]>('https://store-shop-2bb1e-default-rtdb.firebaseio.com/products.json')
    // return this.http.get<Product[]>('http://localhost:3000/products')
    .pipe(
      map((response) => {
        const productList: Product[] = [];
        for (let key in response) {
          productList.push({ ...response[key], id: key })
        }
        return productList;
      })
    )
  }
}
