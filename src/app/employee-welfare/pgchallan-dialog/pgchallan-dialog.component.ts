/* eslint-disable class-methods-use-this */
/* eslint-disable no-cond-assign */
/* eslint-disable no-plusplus */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-useless-constructor */
/* eslint-disable no-empty-function */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/prefer-default-export */
import {
  Component, ElementRef, Inject, OnInit, ViewChild,
} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import moment from 'moment';
import * as XLSX from 'xlsx';

export interface DialogData {
  title: any;
  Entries: any;
  region: any;
  PFMonth: any;
  set: any;
}

@Component({
  selector: 'app-pgchallan-dialog',
  templateUrl: './pgchallan-dialog.component.html',
  styleUrls: ['./pgchallan-dialog.component.css', '../common.scss'],
})
export class PGChallanDialogComponent implements OnInit {
  Title :any;

  Employees :any = [];

  region: number;

  PFMonth: any;

  set: any;

  displayedColumns: string[] = [];

  dataSource :any = [];

  columnsToDisplay: string[] = this.displayedColumns.slice();

   @ViewChild('TABLE') table: ElementRef;

   constructor(
public dialog: MatDialog,
    public dialogRef: MatDialogRef<PGChallanDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
   ) { }

   ngOnInit(): void {
     this.Title = this.data.title;
     this.Employees = this.data.Entries;
     this.region = this.data.region;
     this.PFMonth = this.data.PFMonth;
     this.set = this.data.set;
     this.dataSource = this.data.Entries;

     this.newMethod();
   }

   private newMethod() {
     if (this.data.set === 'set1' && this.Title === 'DifferenceWithValue') {
       this.displayedColumns = ['S.No', 'Add', 'Balance', 'CurrChallan', 'Differ', 'ExemptedTransfer', 'Left', 'Opening'];
       this.columnsToDisplay = this.displayedColumns.slice();
     }
     if (this.data.set === 'set1' && this.Title === 'UAN not found') {
       this.displayedColumns = ['S.No', 'EmpCode', 'EmpName'];
       this.columnsToDisplay = this.displayedColumns.slice();
     }
   }

   onNoClick(): void {
     this.dialogRef.close();
   }

   XLExport() {
     const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.table.nativeElement);
     const wb: XLSX.WorkBook = XLSX.utils.book_new();
     XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

     const pfmonth = moment(this.PFMonth).format('MMM_YY');

     XLSX.writeFile(wb, `${this.region}_${pfmonth}_UANnotFound.xlsx`);
     this.dialogRef.close();
   }
}
