/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/newline-after-import */
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';
import { Clipboard } from '@angular/cdk/clipboard';
import {
  catchError, debounceTime, distinctUntilChanged, filter, Observable, tap, throwError,
} from 'rxjs';
import Swal from 'sweetalert2';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { ToastrService } from 'ngx-toastr';
import { Globals } from 'src/app/globals';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  apiUrl: any;

  reqSendto: any;

  datePipe: DatePipe;

  httpOptions = {
    headers: new HttpHeaderss({
      'x-api-key': this.gb.TmpCdeFedG,
      'content-type': 'application/json',
    }),
  }

  constructor(
private http: HttpClient,
private gb: Globals,
    private clipboard: Clipboard,
private snackbar: MatSnackBar,
private toastr: ToastrService,
  ) {
    this.datePipe = new DatePipe('en-IN');
    this.toastr.toastrConfig.enableHtml = true;
  }

  sendReqst = (postData: any): Observable<any[]> => this.http.post<any>(`${this.apiUrl}/api/${this.reqSendto}`, postData, this.httpOptions)

  // .pipe(catchError(this.handleError));
  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    Swal.fire({ text: errorMessage });
    return throwError(() => new Error(errorMessage));
  }

  clipBoard = (value: any) => {
    this.clipboard.copy(value);
    this.snackbar.open(`${value} copied`, 'OK', {
      duration: 3000,
      panelClass: ['black-snackbar'],
      verticalPosition: 'top',
      horizontalPosition: 'right',
    });
  }

  taskConfirmation = (Title: String, Text: any, showCancelBtn: boolean, confirmBtnText: String, denyBtnText: String) => Swal.fire({
    title: Title,
    text: Text,
    showCancelButton: showCancelBtn,
    confirmButtonColor: '#0157b4',
    cancelButtonColor: '#3a3d4',
    confirmButtonText: `${confirmBtnText}`,
    denyButtonText: 'sfsf',
  })

  saveConfirmation = (Text: any) => Swal.fire({
    text: `Are you sure to ${Text}`,
    showCancelButton: true,
    confirmButtonColor: '#0157b4',
    cancelButtonColor: '#3a3d4',
    confirmButtonText: 'Confirm',
    denyButtonText: 'Cancel',
  })

  autoComplete = (Obs: any): Observable<any[]> => Obs.pipe(filter((res) => res !== null), debounceTime(600), distinctUntilChanged())

  showStatusPopup = (Text: any) => Swal.fire({ text: Text })

  dateFormatChange = (date: any, dFormat: any) => this.datePipe.transform(date, dFormat)

  openSnackbar = (message: string, action?: string, duration?: number, verticalPos?: any, horizontalPos?: any) => this.snackbar.open(message, action, {
    duration,
    panelClass: ['black-snackbar'],
    verticalPosition: verticalPos ?? 'top',
    horizontalPosition: horizontalPos ?? 'right',
  })

  focusNext(event: any, id: any):void {
    if (event.key === 'Enter') {
      if (event.target.value !== '') {
        document.getElementById(id)?.focus();
      }
    }
  }

  AutoFocusForm(e: any) {
    if (e.key.toLowerCase() === 'enter') {
      const { form } = e.target;
      const index = [...form].indexOf(e.target);
      form.elements[index + 1].focus();
      e.preventDefault();
    }
  }

  checkTypeValitity(autoValue, autoName) {
    if (typeof autoValue === 'object') {
      return true;
    }
    this.openSnackbar(`Please choose valid ${autoName}`);
    return false;
  }

  checkValidity(autoValue) {
    if (autoValue.valid) {
      return true;
    }
    this.openSnackbar('please fill all the fields');
    return false;
  }

  // option = selectedRowvalues
  displayFn = (option, value) => (option && option[value] ? option[value] : '')

  //   if (this.murgnservice.checkValidity(this.companyName)
  //   && this.murgnservice.checkTypeValitity(this.companyName.value, 'Company Name')) {
  //   this.LoadMasterValue(mastername);
  // }

  // <div class="col-12 d-flex p-0  col-xl-12">
  //   <input class="datepickerInput branchInInput" (input)="filterCmp($event.target.value, 'one')" #autoCompleteInput [matAutocomplete]="autocmpsingle" [formControl]="companyName" matInput>
  //   <mat-autocomplete autoActiveFirstOption id="autocmpsingle" #autocmpsingle="matAutocomplete" [displayWith]="displayFn">
  //       <mat-option *ngFor="let option of CampNameOptionsList" [value]="option" (onSelectionChange)="CmpSelected($event,'inputs')">
  //           {{option.company}}
  //       </mat-option>
  //   </mat-autocomplete>

  // </div>
  public exportAsExcelFile(json: any[], excelFileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE,
    });
    // let url = window.URL.createObjectURL(blob);
    // let pwa = window.open(url);
    FileSaver.saveAs(data, `${fileName}_export_${new Date().getTime()}${EXCEL_EXTENSION}`);
  }

  excelExportAsTable(tableId : any, fileName :any) {
    let file:any; let element:any;
    file = `${fileName}.xlsx`;
    element = document.getElementById(tableId);
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet');
    XLSX.writeFile(wb, file);
  }

  success(message: string, keepAfterNavigationChange = false) {
    this.toastr.success(message);
  }

  error(message: string, keepAfterNavigationChange = false) {
    this.toastr.error(message);
  }

  warning(message: string, keepAfterNavigationChange = false) {
    this.toastr.warning(message);
  }

  info(message: string, keepAfterNavigationChange = false) {
    this.toastr.info(message);
  }
}

export const findColumnValue = (
  element:unknown,
  column:string,
  parsingFn?:(elm:unknown, clm:string)=>string,
):string => {
  if (parsingFn) {
    const pVal = parsingFn(element, column);
    if (pVal) {
      return pVal;
    }
  }
  return <string> column.split('.').reduce((acc, cur) => acc[cur] ?? '', element);
};
