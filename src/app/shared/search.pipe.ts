import { Pipe, PipeTransform } from '@angular/core';
import { Product } from './product.model';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value: Product[], arg: string): any {
    if (value.length < 1 || arg === '')
      return value;
    let list = [];
    for (let item of value) {
      if (item.name.includes(arg))
        list.push(item);
    }
    return list;
  }

}
