/* eslint-disable no-param-reassign */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
/* eslint-disable grouped-accessor-pairs */
/* eslint-disable no-underscore-dangle */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-empty-function */
/* eslint-disable no-useless-constructor */
/* eslint-disable import/prefer-default-export */
import {
  Component, EventEmitter, Input, OnInit, Output, ViewChild,
} from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { findColumnValue as _findColumnValue } from 'src/app/services/murgn.service';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.scss', '../../../gStyle.scss'],
})
export class TableListComponent implements OnInit {
  DataSource = new MatTableDataSource([]);

  isSTicky = true

  // displayedColumns = [];

  displayedColumnsO: Array<string>;

  displayedColumnsS: Array<string>;

  @ViewChild(MatSort) set matSort(sort: MatSort) {
    this.DataSource.sort = sort;
  }

  private _tableData:any;

  searchTemp =''

  findColumnValue = _findColumnValue;

  NewFooter: {};

  @Input()
  get gDataSource(): any {
    return this._tableData;
  }

  set gDataSource(tableData: any) {
    this.DataSource = tableData;
  }

  @Input() Footer: any = [];

  // @Input() DataSource: any

  @Input() displayedColumns:Array<string>

  @Input() loading:boolean = true;

  @Input() maxHeight:Number;

  @Input() TableName:String;

  @Output() public editClicked = new EventEmitter<any>();

  @Output() public deleteClicked = new EventEmitter<any>();

  @Output() public viewClicked = new EventEmitter<any>();

  @Input() columnParsingFn?:(elm:unknown, clm:string)=>string;

  @Input() columnHeaders: Record<string, string>;

  constructor() { }

  ngOnInit(): void {

  }

  editSelectedRow(row) {
    this.editClicked.emit(row);
  }

  deleteSelectedRow(row) {
    this.deleteClicked.emit(row);
  }

  viewSelectedRow(row) {
    this.viewClicked.emit(row);
  }
}
