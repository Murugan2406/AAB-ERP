/* eslint-disable linebreak-style */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-empty-function */
/* eslint-disable no-useless-constructor */
import { Globals } from 'src/app/globals';
/* eslint-disable linebreak-style */
/* eslint-disable no-restricted-globals */
/* eslint-disable linebreak-style */
/* eslint-disable prefer-destructuring */
/* eslint-disable linebreak-style */
/* eslint-disable no-plusplus */
/* eslint-disable no-unused-vars */
/* eslint-disable linebreak-style */
/* eslint-disable no-console */
/* eslint-disable linebreak-style */
/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this */
/* eslint-disable import/prefer-default-export */
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'gCurrencyPipe',
})

export class gCurrencyPipe implements PipeTransform {
//   transform(value: any, arg?) {
//     let overAllValue;
//     console.log(arg);
//     let curSymbol = '₹';
//     if (arg.toUpperCase() === 'INR') {
//       curSymbol = '₹';
//     } else if (arg.toUpperCase() === 'RM') {
//       curSymbol = 'Rm';
//     } else if (arg.toUpperCase() === 'KSh') {
//       curSymbol = 'Ksh';
//     }

  //     if (isNaN(value)) {
  //       throw new Error(`invalidPipeArgument: ${value} is not a number for pipe gCurrency`);
  //     }

  //     if (value > 0) {
  //       const splited = value.toString().split('.');
  //       let firstString = splited[0];
  //       let lastString = splited[1] ?? '00';

  //       const splited1 = splited[0].toString().split('');
  //       let idx = 3;
  //       if (splited[0].length > 3) {
  //         const arr1:any = [];
  //         do {
  //           if (idx === 3) {
  //             arr1.push(splited[0].substr(splited[0].length - idx));
  //             idx += 2;
  //           } else {
  //             arr1.push(splited[0].substr((splited[0].length - idx), 2));

  //             idx = 2 + idx;
  //           }
  //         }
  //         while (idx <= splited[0].length);
  //         arr1.reverse();
  //         console.log(arr1.join(''), arr1.join('').length, splited[0].length);
  //         let arr2:any = [];
  //         if (arr1.join('').length === splited[0].length) {
  //           arr2 = arr1.join(',');
  //         } else {
  //           arr2 = `${splited[0].substr(0, 1)},${arr1.join(',')}`;
  //         }
  //         firstString = arr2;
  //       } else {
  //         firstString = splited[0];
  //       }
  //       if (lastString.length === 1) {
  //         lastString += '0';
  //       }
  //       lastString = String(lastString).substring(0, 2);

  //       overAllValue = ` ${curSymbol}${firstString}.${lastString}`;

  //       return overAllValue;
  //     }
  //     if (value === 0) {
  //       overAllValue = 0;
  //       overAllValue = ` ${curSymbol}${overAllValue.toFixed(2)}`;

  //       return overAllValue;
  //     }
  //     return value;
  //   }

  constructor(
    public global: Globals,
  ) {}

  transform(value: number, arg?): string {
    if (value === null || value === undefined) {
      return '';
    }

    const formatter = new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: arg || this.global.gCurrency,
      minimumFractionDigits: 2,
    });

    return formatter.format(value);
  }
}
