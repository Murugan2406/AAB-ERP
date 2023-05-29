/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this */
/* eslint-disable import/prefer-default-export */
import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
// import * as _ from 'lodash';

@Pipe({
  name: 'orderby',
})
export class OrderbyPipe implements PipeTransform {
  // this is quick sorting method
  transform(records: any, args?: any): any {
    records = records || [];
    // tslint:disable-next-line: only-arrow-functions
    return records.sort((a:any, b:any) => {
      if (a[args.property] < b[args.property]) {
        return -1 * args.direction;
      } if (a[args.property] > b[args.property]) {
        return 1 * args.direction;
      }
      return 0;
    });
  }

  transform1(value: string) {
    const datePipe = new DatePipe('en-US');
    value = datePipe.transform(value, 'MMM-dd-yyyy');
    console.log(value);
    return value;
  }
}
