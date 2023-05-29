/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-constructor */
/* eslint-disable no-empty-function */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/prefer-default-export */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { Globals } from 'src/app/globals';
// import { TreeviewItem } from 'ngx-treeview';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable({
  providedIn: 'root',
})
export class VinthService {
  testurl: any;

 ItemForrateEdit: any;

 reqitem: any;

 ItemoldrateEdit: any;

  changeitem: any;

 Tranid: any;

  Uniqueid: any;

 expensestesturl: any;

 Pandlurl: any;

  httpOptions = {
    headers: new HttpHeaders({ 'x-api-key': this.gb.TmpCdeFedG, 'content-type': 'application/json' }),
  }

  constructor(private http: HttpClient, private gb: Globals) { }

  getPeopleFromObject(postData: any): Observable<any[]> {
    return this.http.post<any>(`${this.gb.gApiserver}/api/datareqrshThree`, postData, this.httpOptions);
  }

  getPeoplehrObject(postData: any): Observable<any[]> {
    return this.http.post<any>(`${this.gb.gApiserver}/api/datareqrachnTwo`, postData, this.httpOptions);
  }

  getExpencesObject(postData: any): Observable<any[]> {
    return this.http.post<any>(`${this.gb.gApiserver}/api/datareqrshFour`, postData, this.httpOptions);
  }

  getAsmApprovalObject(postData: any): Observable<any[]> {
    return this.http.post<any>(`${this.gb.gApiserver}/api/datareqrachnThree`, postData, this.httpOptions);
  }

  getAttendanceObject(postData: any): Observable<any[]> {
    return this.http.post<any>(`${this.gb.gApiserver}/api/datareqkrshTwo`, postData, this.httpOptions);
  }

  getApplicationObject(postData: any): Observable<any[]> {
    return this.http.post<any>(`${this.testurl}/api/datareqkrshTwo`, postData, this.httpOptions);
  }

  getAsmApprovalItem(postData: any): Observable<any[]> {
    return this.http.post<any>(`${this.gb.gApiserver}/api/approvalReq`, postData, this.httpOptions);
  }

  getexpensesreport(postData: any): Observable<any[]> {
    return this.http.post<any>(`${this.expensestesturl}/api/datareqkrshThree`, postData, this.httpOptions);
  }

  getdairypandl(postData: any): Observable<any[]> {
    return this.http.post<any>(`${this.Pandlurl}/api/datareqrshFive`, postData, this.httpOptions);
  }

  getaaberpramco(postData: any): Observable<any[]> {
    return this.http.post<any>(`${this.gb.gApiserver}/api/datareqrshFour`, postData, this.httpOptions);
  }

  getwastagedata(postData: any): Observable<any[]> {
    return this.http.post<any>(`${this.gb.gApiserver}/api/datareqsarnItemMovements`, postData, this.httpOptions);
  }

  getcarddet(postData: any): Observable<any[]> {
    return this.http.post<any>(`${this.gb.gApiserver}/api/datareqrshFive`, postData, this.httpOptions);
  }

  getcarddet1(postData: any): Observable<any[]> {
    return this.http.post<any>(`${this.gb.gApiserver}/api/JsonPayloadRjs`, postData, this.httpOptions);
  }

  getmenudata(postData: any): Observable<any[]> {
    return this.http.post<any>(`${this.gb.gApiserver}/api/datareqsarnFour`, postData, this.httpOptions);
  }

  getmenudata1(postData: any): Observable<any[]> {
    return this.http.post<any>(`${this.gb.gApiserver}/api/JsonPayloadSaran1`, postData, this.httpOptions);
  }

  getcardMTdata(postData: any): Observable<any[]> {
    return this.http.post<any>(`${this.gb.gApiserver}/api/datareqsarnThree`, postData, this.httpOptions);
  }

  getsavedata(postData: any): Observable<any[]> {
    return this.http.post<any>(`${this.gb.gApiserver}/api/JsonPayloadRam`, postData, this.httpOptions);
  }

  getsavedatatest(postData: any): Observable<any[]> {
    return this.http.post<any>(`${this.gb.gApiserver}/api/JsonPayloadRachn`, postData, this.httpOptions);
  }

  getcardbandet(postData: any): Observable<any[]> {
    return this.http.post<any>(`${this.gb.gApiserver}/api/datareqrshSix`, postData, this.httpOptions);
  }

  getrestproduction(postData: any): Observable<any[]> {
    return this.http.post<any>(`${this.gb.gApiserver}/api/datareqrachnFour`, postData, this.httpOptions);
  }

  getmonthlyreport(postData: any): Observable<any[]> {
    return this.http.post<any>(`${this.gb.gApiserver}/api/datareqkrshFour`, postData, this.httpOptions);
  }

  getApplicationhr(postData: any): Observable<any[]> {
    return this.http.post<any>(`${this.gb.gApiserver}/api/datareqkrshTwo`, postData, this.httpOptions);
  }

  getincrdata(postData: any): Observable<any[]> {
    return this.http.post<any>(`${this.gb.gApiserver}/api/datareqrachnFive`, postData, this.httpOptions);
  }

  getDccorrectiondata(postData: any): Observable<any[]> {
    return this.http.post<any>(`${this.gb.gApiserver}/api/datareqsarnSix`, postData, this.httpOptions);
  }

  getitemswapdet(postData: any): Observable<any[]> {
    return this.http.post<any>(`${this.gb.gApiserver}/api/datareqrshSeven`, postData, this.httpOptions);
  }

  getmanualdet(postData: any): Observable<any[]> {
    return this.http.post<any>(`${this.gb.gApiserver}/api/datareqkrshFive`, postData, this.httpOptions);
  }

  getfiledownloadapi(postData: any): Observable<any[]> {
    return this.http.post<any>(`${this.gb.gApiserver}/api/ExcelReadWriteOperation`, postData, this.httpOptions);
  }

  getFinaldata(postData: any): Observable<any[]> {
    return this.http.post<any>(`${this.gb.gApiserver}/api/datareqrachnSix`, postData, this.httpOptions);
  }

  getsupplierreport(postData: any): Observable<any[]> {
    return this.http.post<any>(`${this.gb.gApiserver}/homeload`, postData, this.httpOptions);
  }

  getsupreport(postData: any): Observable<any[]> {
    return this.http.post<any>(`${this.gb.gApiserver}/api/datareqkrshThree`, postData, this.httpOptions);
  }

  getFsupplierdet(postData: any): Observable<any[]> {
    return this.http.post<any>(`${this.gb.gApiserver}/api/datareqrshEight`, postData, this.httpOptions);
  }

  getitemratetest(postData: any): Observable<any[]> {
    return this.http.post<any>(`${this.gb.gApiserver}/api/JsonPayloadRachnTwo`, postData, this.httpOptions);
  }

  getratedata(postData: any): Observable<any[]> {
    return this.http.post<any>(`${this.gb.gApiserver}/api/datareqrachnSeven`, postData, this.httpOptions);
  }

  getVehicledata(postData: any): Observable<any[]> {
    return this.http.post<any>(`${this.gb.gApiserver}/api/datareqsarn`, postData, this.httpOptions);
  }

  getdeptdesign(postData: any): Observable<any[]> {
    return this.http.post<any>(`${this.gb.gApiserver}/api/datareqrachnEight`, postData, this.httpOptions);
  }

  getnewuserapi(postData: any): Observable<any[]> {
    return this.http.post<any>(`${this.gb.gApiserver}/api/approvalReqThree`, postData, this.httpOptions);
  }

  public exportAsExcelFile(json: any[], excelFileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    FileSaver.saveAs(data, `${fileName}_export_${new Date().getTime()}${EXCEL_EXTENSION}`);
  }
}
