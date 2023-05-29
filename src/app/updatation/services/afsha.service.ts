import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';


import { Globals } from '../globals';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable({
  providedIn: 'root'
})

export class Afshaservice {
  apiUrl: any
  httpOptions = {
    headers: new HttpHeaders
      ({
        'x-api-key': this.gb.TmpCdeFedG,
      })
  }

  constructor(private http: HttpClient, private gb: Globals) { }

  getData(){
    return this.http.get('https://jsonplaceholder.typicode.com/todos?pageno=${this.currentPage}&per_page=${this.pageSize}')
  }

  getdata(postData: any): Observable<any[]> {
    return this.http.post<any>(`${this.apiUrl}/api/datareqKarSmyTwo`, postData, this.httpOptions)
  }

  getUserData(postData: any): Observable<any[]>{
      return this.http.post<any>(`${this.gb.gServerApiUrl}/api/datareqsarnEight`, postData, this.httpOptions)
  }

  getMenuCardData(postData: any): Observable<any[]>{
     return this.http.post<any>(`${this.gb.gApiserver}/api/KarSyApiTwo`, postData, this.httpOptions)
  }
  getMenuCardDatadialog(postData: any): Observable<any[]>{
    return this.http.post<any>(`${this.gb.gApiserver}/api/KarSyApiTwo`, postData, this.httpOptions)
 }

  getSaveGRNData(postData: any): Observable<any[]> {
    return this.http.post<any>(`${this.apiUrl}/api/JsonRequestGrn`, postData, this.httpOptions)
  }
  getSaveSRData(postData: any): Observable<any[]> {
    return this.http.post<any>(`${this.apiUrl}/api/AccEntryS1`, postData, this.httpOptions)
  }


  // Cost Center and Region
  // getCCR(postData: any): Observable<any[]> {
  //   return this.http.post<any>(`${this.gb.gApiserver}/api/datareqsarnTwo`, postData, this.httpOptions)
  // }
  // getApr(postData: any): Observable<any[]> {
  //   return this.http.post<any>(`${this.gb.gApiserver}/api/JsonPayloadSaran1`, postData, this.httpOptions)
  // }


  // public exportAsExcelFile(json: any[], excelFileName: string): void {
  //   const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
  //   const workbook: XLSX.WorkBook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
  //   const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  //   this.saveAsExcelFile(excelBuffer, excelFileName);
  // }

  // private saveAsExcelFile(buffer: any, fileName: string): void {
  //   const data: Blob = new Blob([buffer], {
  //     type: EXCEL_TYPE
  //   });
  //   // let url = window.URL.createObjectURL(blob);
  //   // let pwa = window.open(url);
  //   FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  // }

}
// [SarnAPIFive]
//https://10.200.201.86:9001/api/datareqsarnFive
