import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../models/product.model';

@Pipe({
  name: 'alphabetically'
})
export class AlphabeticallyPipe implements PipeTransform {

  transform(value: Product[], arg: boolean | string): any {
    let list = [];
    if (arg === '')
      return value;
    else {
      list = value.sort((a, b) => {
        if (a.name.toLowerCase() < b.name.toLowerCase())
          return 1
        else
          return -1
      })
      return arg ? list.reverse() : list;
    }
    }

}
