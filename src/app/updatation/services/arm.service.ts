import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as FileSaver from 'file-saver';
import { Observable } from 'rxjs';
import * as XLSX from 'xlsx';
import { Globals } from '../globals';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable({
  providedIn: 'root'
})

export class armservice {
  httpOptions = {
    headers: new HttpHeaders
      ({
        'x-api-key': this.gb.TmpCdeFedG,
        'content-type': 'application/json'
      })
  }
  apiUrl: string;

    // getData() : Promise<any>{
  //   return this.http.get('https://jsonplaceholder.typicode.com/todos').
  //   toPromise();
  // }

  constructor(private http: HttpClient, private gb: Globals, private snackBar: MatSnackBar) { }

  getdataRjsEight(postData: any): Observable<any[]> {
    return this.http.post<any>(`${this.apiUrl}`, postData, this.httpOptions)
  }
  getdataRjsNine(postData: any): Observable<any[]> {
    return this.http.post<any>(`${this.apiUrl}`, postData, this.httpOptions)
  }
  getdataRjseight(postData: any): Observable<any[]> {
    return this.http.post<any>(`${this.gb.gApiserver}/api/datareqrshEight`, postData, this.httpOptions)
  }
  getdataRjsnine(postData: any): Observable<any[]> {
    return this.http.post<any>(`${this.gb.gApiserver}/api/datareqrshNine`, postData, this.httpOptions)
  }
  getdataSarnEight(postData: any): Observable<any[]> {
    return this.http.post<any>(`${this.gb.gApiserver}/api/datareqsarnEight`, postData, this.httpOptions)
  }
  getdataSarnNine(postData: any): Observable<any[]> {
    return this.http.post<any>(`${this.gb.gApiserver}/api/datareqsarnNine`, postData, this.httpOptions)
  }
  getdataRMC(postData: any): Observable<any[]> {
    return this.http.post<any>(`${this.gb.gApiserver}/api/datareqrachnNine`, postData, this.httpOptions)
  }
  getjsonSarnOne(postData: any): Observable<any[]> {
    return this.http.post<any>(`${this.gb.gApiserver}/api/JsonPayloadSaran1`, postData, this.httpOptions)
  }
  getjsonSarnTwo(postData: any): Observable<any[]> {
    return this.http.post<any>(`${this.gb.gApiserver}/api/JsonPayloadSaran2`, postData, this.httpOptions)
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

  openSnackBar(message: string) {
    this.snackBar.open(message, 'close', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 2000,
    });
  }
}
