import { HttpClient } from '@angular/common/http';
import { Inject, Injectable} from '@angular/core';
import { Product } from '../models/product.model';
import { map } from 'rxjs';

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
    return this.http.get<Product[]>(this.localUrl + '/products' )
    // .pipe(
    //   map((response) => {
    //     const productList: Product[] = [];
    //     for (let key in response) {
    //       productList.push({ ...response[key], id: key })
    //     }
    //     return productList;
    //   })
    // )
  }
}
