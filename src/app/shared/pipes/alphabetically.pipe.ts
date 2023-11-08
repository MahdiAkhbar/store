import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'alphabetically'
})
export class AlphabeticallyPipe implements PipeTransform {

  transform(value: any, arg: boolean | string): any {
    if (arg === '' || !arg === true)
      return value;
    else
      return value.reverse();
  }

}
