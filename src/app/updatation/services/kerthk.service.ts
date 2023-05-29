import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// import * as FileSaver from 'file-saver';
// import * as XLSX from 'xlsx';
// import * as JSZip from 'jszip';

import { Globals } from '../globals';
// import { strict } from 'assert';
// const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
// const EXCEL_EXTENSION = '.xlsx';

@Injectable({
  providedIn: 'root'
})

export class kerthkservice {
  apiUrl: any
  httpOptions = {
    headers: new HttpHeaders
      ({
        'x-api-key': this.gb.TmpCdeFedG,
        'content-type': 'application/json'
      })
  }

  Temp = {
    headers: new HttpHeaders({
      'ContentType': 'application/json',
      'content-Type': 'application/json',
      'Accept': '*/*',
      'x-ca-key': '23262458',
      'x-ca-signature': 'YKHC81vpMVpIsvPkvlQDWhfZ/bozzruP38XjsZlGTOs=',
      'x-ca-signature-headers': 'x-ca-key',
    }),
  }



  public testURL = 'https://jsonplaceholder.typicode.com/posts';

  constructor(private http: HttpClient, private gb: Globals) { }


  getMemberData() {
    return this.http.get(this.testURL);
  }


  getdata(postData: any): Observable<any[]> {
    return this.http.post<any>(`${this.gb.gApiserver}/api/KarSyApiOne`, postData, this.httpOptions)
  }
  getKrsAPITwo(postData:any):  Observable<any[]>  {
    return this.http.post<any>(`${this.gb.gApiserver}/api/datareqkrshTwo`, postData, this.httpOptions)

  }

  GetMethod(ApiURL, httpOptions): Observable<any> {
    return this.http.get<any>(ApiURL, httpOptions);
  }



//   upload(postData: any, ApiKey): Observable<any> {
// let ApiKKey =  '/api/resource/v1/person/single/add'
//     return this.http.post<any>(ApiKKey, postData, this.Temp )
//   }




  // Asyn Api call

 // async testing() {
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       'x-api-key': this.gb.gCodeFixed,
  //       'content-type': 'application/json',
  //     }),
  //   };
  //   // eslint-disable-next-line no-plusplus
  //   for (let index = 0; index < this.newArr.length; index++) {
  //     const element = this.newArr[index];
  //     console.log(index);

  //     const APIJson = {
  //       reqMainreq: 'ADVPFRegionList',
  //       Usr: this.gb.gUsrid,
  //       brcode: this.gb.gBrcode,
  //       data: this.newArr[index],
  //     };
  //     // eslint-disable-next-line no-await-in-loop
  //     await firstValueFrom(this.http.post<any>('https://10.200.201.86:9001/api/KarSyApiOne', APIJson, httpOptions)).then((data) => console.log(data));
  //

}
