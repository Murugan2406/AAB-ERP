/* eslint-disable no-param-reassign */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
/* eslint-disable grouped-accessor-pairs */
/* eslint-disable no-underscore-dangle */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-empty-function */
/* eslint-disable no-useless-constructor */
/* eslint-disable import/prefer-default-export */
import { LiveAnnouncer } from '@angular/cdk/a11y';
import {
  Component, EventEmitter, Input, AfterViewInit, Output, ViewChild,
} from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-gtable',
  templateUrl: './g-table.component.html',
  styleUrls: ['./g-table.component.scss'],
})
export class GTableComponent implements AfterViewInit {
  @Input() maxHeight:Number;

  @ViewChild(MatSort) sort: MatSort;

  FooterRow: MatSort;

  @ViewChild(MatSort) set matSort(sort: MatSort) {
    this.DataSource.sort = sort;
  }

  DataSource = new MatTableDataSource([]);

  private _Footer:any;

  @Input() TableName:String;

  @Input() gCurrency:String;

  @Input() gLoading:boolean ;

  @Input() showFooter:boolean ;

  @Input() View:boolean ;

  @Input() Edit:boolean ;

  @Input() Delete:boolean ;

  @Output() public editClicked = new EventEmitter<any>();

  @Output() public deleteClicked = new EventEmitter<any>();

  @Output() public viewClicked = new EventEmitter<any>();

private _tableData:any;

  gInitColumns :any[]=[];

  displayedColumnsO: Array<string>;

  searchValue: any;

  @Input() gFooter: Array<string>;

  // @Input()
  // get gFooter(): any {
  //   return this._Footer;
  // }

  // set gFooter(footerrow: any) {
  //   this.FooterRow = footerrow;
  // }

  @Input()
  get gDataSource(): any {
    return this._tableData;
  }

  set gDataSource(tableData: any) {
    this.DataSource = tableData;
  }

  @Input()
  get gColumnName(): any {
    return this.displayedColumnsO;
  }

  set gColumnName(displayedColumnsP: any) {
    this.displayedColumnsO = displayedColumnsP;
    this.displayedColumns = ['S.No'].concat(this.gColumnName);
  }

  displayedColumns: any[] = [];

  @Input() get gSearch(): any { return this.searchValue; }

  set gSearch(filterValue: any) { this.DataSource.filter = filterValue.trim().toLowerCase(); }

  constructor() { }

  ngAfterViewInit() {
    this.gFooter = [];
  }

  getTotal(amountA, tableArr) {
    let TotalAmt = 0;
    tableArr.forEach((element, index) => {
      if (element[amountA]) {
        TotalAmt += Number(element[amountA]);
      }
    });
    return TotalAmt;
  }

  editSelectedRow(selectedRow, selectedIndex) {
    this.editClicked.emit({ selectedRow, selectedIndex });
  }

  deleteSelectedRow(selectedRow, selectedIndex) {
    this.deleteClicked.emit({ selectedRow, selectedIndex });
  }

  viewSelectedRow(selectedRow, selectedIndex) {
    this.viewClicked.emit({ selectedRow, selectedIndex });
  }

  // announceSortChange(sortState: Sort) {
  //   // This example uses English messages. If your application supports
  //   // multiple language, you would internationalize these strings.
  //   // Furthermore, you can customize the message to add additional
  //   // details about the values being sorted.
  //   if (sortState.direction) {
  //     this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
  //   } else {
  //     this._liveAnnouncer.announce('Sorting cleared');
  //   }
  // }
}
