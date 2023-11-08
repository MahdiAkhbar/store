import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(value: any, arg: string): any {
    if (value.length < 1 || arg === '')
      return value;
    return value.sort((a: { [x: string]: any; }, b: { [x: string]: any; }) => {
      if (a[arg] > b[arg])
        return 1
      else
        return -1
    })
  }

}
