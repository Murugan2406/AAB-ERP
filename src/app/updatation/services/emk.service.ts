import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

import { Globals } from '../globals';
import { formatDate } from '@angular/common';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable({
  providedIn: 'root'
})

export class EMKservice {
  apiUrl: any
  httpOptions = {
    headers: new HttpHeaders
      ({
        'x-api-key': this.gb.TmpCdeFedG,
        'content-type': 'application/json'
      })
  }

  constructor(private http: HttpClient, private gb: Globals) { }

  // getData() : Promise<any>{
  //   return this.http.get('https://jsonplaceholder.typicode.com/todos').
  //   toPromise();
  // }


  getDataKrish2(postData: any): Observable<any[]> {
    return this.http.post<any>(`${this.apiUrl}/api/datareqkrshTwo`, postData, this.httpOptions)
  }


  getdata(postData: any): Observable<any[]> {
    return this.http.post<any>(`${this.apiUrl}/api/datareqsarnFive`, postData, this.httpOptions)
  }
  getDataRMCH(postData: any): Observable<any[]> {
    return this.http.post<any>(`${this.apiUrl}/api/datareqrachnEight`, postData, this.httpOptions)
  }

  getDataRjs4(postData: any): Observable<any[]> {
    return this.http.post<any>(`${this.apiUrl}/api/datareqrshFour`, postData, this.httpOptions)
  }

  getDataKrish(postData: any): Observable<any[]> {
    return this.http.post<any>(`${this.apiUrl}/api/datareqkrshFive`, postData, this.httpOptions)
  }

  getDataRMCH6(postData: any): Observable<any[]> {
    return this.http.post<any>(`${this.apiUrl}/api/datareqrachnSix`, postData, this.httpOptions)
  }

  getDataRMCH9(postData: any): Observable<any[]> {
    return this.http.post<any>(`${this.apiUrl}/api/datareqrachnNine`, postData, this.httpOptions)
  }
  // Cost Center and Region
  getCCR(postData: any): Observable<any[]> {
    return this.http.post<any>(`${this.gb.gApiserver}/api/datareqsarnTwo`, postData, this.httpOptions)
  }
  getApr(postData: any): Observable<any[]> {
    return this.http.post<any>(`${this.gb.gApiserver}/api/JsonPayloadSaran1`, postData, this.httpOptions)
  }
  changeDateFormat(date:any){
    const locale = 'en-US';
    return formatDate(date,this.gb.gdateformat, locale);
  }

  public exportAsExcelFile(json: any[], excelFileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    // let url = window.URL.createObjectURL(blob);
    // let pwa = window.open(url);
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }

}



