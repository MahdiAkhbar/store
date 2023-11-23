import { HttpClient } from '@angular/common/http';
import { Inject, Injectable} from '@angular/core';

import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient, @Inject('LOCAL_URL') private localUrl: string) { }

  storeProduct(product: Product) {
    return this.http.post<Product>(
      this.localUrl + '/products',
      product
    )
  }
  fetchProducts() {
    return this.http.get<Product[]>(this.localUrl + '/products' );
  }
}
