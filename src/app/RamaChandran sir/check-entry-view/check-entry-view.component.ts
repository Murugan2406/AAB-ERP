/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-empty-function */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-constructor */
/* eslint-disable import/prefer-default-export */
import { DatePipe } from '@angular/common';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Globals } from 'src/app/globals';
import { murgnService } from 'src/app/services/murgn.service';
import { SubSink } from 'subsink';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-check-entry-view',
  templateUrl: './check-entry-view.component.html',
  styleUrls: ['./check-entry-view.component.scss'],
})
export class CheckEntryViewComponent implements OnInit {
  OverAllbranchLists: any = [];

  branchLists: any = [];

  loading:boolean = false;

  CustomerSearch:any ='';

  datasource = new MatTableDataSource([])

  displayedColumns: string[] = ['sno', 'Brcode', 'Branch', 'EntryTime', 'EntryUser', 'Flag', 'InstrAmt', 'InstrBank', 'InstrDate', 'InstrNo', 'PayMode', 'Trndate'];

  columnHeaders = {
    sno: 'S.No',
    Brcode: 'Branch Code',
    Branch: 'Branch Name',
    EntryTime: 'EntryTime',
    EntryUser: 'EntryUser',
    Flag: 'Flag',
    InstrAmt: 'InstrAmt',
    InstrBank: 'InstrBank',
    InstrDate: 'InstrDate',
    InstrNo: 'InstrNo',
    PayMode: 'PayMode',
    Trndate: 'Trndate',

  };

  private subs = new SubSink();

  OverAllRegionList: any[];

  RegionList : any = [];

  date = new Date();

  datePipe: DatePipe;

  searchTemp = '';

  CheckEntryForm = this.fbuilder.group({
    RegionName: ['', Validators.required],
    BranchName: ['', Validators.required],
    FromDate: [new Date(this.date.getFullYear(), this.date.getMonth(), (this.date.getDate() - 1000 * 60 * 60 * 24)), Validators.required],
    ToDate: [new Date(), Validators.required],
  });

  constructor(
    public dialog: MatDialog,
    private fbuilder: FormBuilder,
    private globals: Globals,
    private muruganService: murgnService,
  ) {
    this.datePipe = new DatePipe('en-IN');
  }

  ngOnInit(): void {
    const dte = new Date();
    dte.setDate(dte.getDate() - 1);
    this.CheckEntryForm.get('FromDate').setValue(dte);

    this.getAllRegionList();
    const regionObj = {
      StatusRes: 'Success',
      Trntype: 'Region',
      Trnvalue: 'ALL',
    };
    const branchObj = {
      code: '0',
      name: 'ALL',
    };
    this.CheckEntryForm.get('RegionName').setValue(regionObj);
    this.CheckEntryForm.get('BranchName').setValue(branchObj);
    setTimeout(() => {
      this.getTableData();
    }, 100);
  }

  getAllRegionList() {
    const APIJson = {
      reqMainreq: 'LoadRegionForChequeEntry',
      Usr: this.globals.gUsrid,
      brcode: this.globals.gBrcode,
    };
    this.subs.add(this.muruganService.CheckEntryView(APIJson).subscribe({
      next: (response) => {
        if (response.length === 0) {
          this.muruganService.openSnackBar('No data available');
        } else if (response[0].StatusRes === 'Success') {
          this.OverAllRegionList = response;
        } else {
          this.muruganService.openSnackBar(response[0].StatusRes);
        }
      },
      error: (error) => {
        this.muruganService.openSnackBar(error.statusText);
      },
      complete: () => {},
    }));
  }

  getBranchName(keyValue) {
    if (this.CheckEntryForm.get('RegionName').valid) {
      if (typeof this.CheckEntryForm.get('RegionName').value === 'object') {
        const APIJson = {
          reqMainreq: 'LoadBranchByAutoComplete',
          Usr: this.globals.gUsrid,
          brcode: this.globals.gBrcode,
          var1: keyValue,
          var2: this.CheckEntryForm.get('RegionName').value.Trnvalue,
        };
        this.subs.add(this.muruganService.CheckEntryView(APIJson).subscribe({
          next: (response) => {
            if (response.length === 0) {
              this.muruganService.openSnackBar('No data available');
            } else {
              this.branchLists = response;
            }
          },
          error: (error) => {
            this.muruganService.openSnackBar(error.statusText);
          },
          complete: () => {},
        }));
      } else {
        this.muruganService.openSnackBar('Please choose Valid region name');
      }
    } else {
      this.muruganService.openSnackBar('Please choose region name');
    }
  }

  SortCompanyName(key) {
    const keyValue = key.toLocaleUpperCase();
    // eslint-disable-next-line max-len
    this.RegionList = this.OverAllRegionList.filter((option) => option.Trnvalue.toLocaleUpperCase().includes(keyValue));
  }

  focusNext(event: any, id?: any):void {
    if (event.source.selected) {
      setTimeout(() => {
        document.getElementById(id)?.focus();

        if (this.CheckEntryForm.valid) {
          if (typeof this.CheckEntryForm.get('RegionName').value === 'object'
          && typeof this.CheckEntryForm.get('BranchName').value === 'object') {
            this.getTableData();
          }
        }

        this.branchLists = [];

        this.RegionList = [];
      }, 200);
    }
  }

  focusNextbyEnter(event, id) {
    if (event.key === 'Enter') {
      if (this.CheckEntryForm.valid) {
        if (typeof this.CheckEntryForm.get('RegionName').value === 'object'
        && typeof this.CheckEntryForm.get('BranchName').value === 'object') {
          if (event.target.value !== '') {
            document.getElementById(id)?.focus();
          }
        }
      }
    }
  }

  dateChanged() {
    if (this.CheckEntryForm.valid) {
      if (typeof this.CheckEntryForm.get('RegionName').value === 'object'
      && typeof this.CheckEntryForm.get('BranchName').value === 'object') {
        this.getTableData();
      }
    }
  }

  reloadTable() {
    if (this.muruganService.checkValidity(this.CheckEntryForm)
       && this.muruganService.checkTypeValitity(this.CheckEntryForm.get('RegionName').value, 'Region Name')
       && this.muruganService.checkTypeValitity(this.CheckEntryForm.get('BranchName').value, 'Branch Name')) {
      this.getTableData();
    }
  }

  getTableData() {
    this.datasource = new MatTableDataSource([]);
    this.loading = true;
    const FRDate = this.datePipe.transform(this.CheckEntryForm.get('FromDate').value, 'dd-MMM-yyyy');

    const ToDateDate = this.datePipe.transform(this.CheckEntryForm.get('ToDate').value, 'dd-MMM-yyyy');

    const APIJson = {
      reqMainreq: 'GetChequeEntryDetail',
      Usr: this.globals.gUsrid,
      brcode: this.CheckEntryForm.get('BranchName').value.code,
      var1: this.CheckEntryForm.get('RegionName').value.Trnvalue,
      var2: FRDate,
      var3: ToDateDate,
    };

    this.subs.add(this.muruganService.CheckEntryView(APIJson).subscribe({
      next: (response) => {
        setTimeout(() => {
          this.loading = false;
          if (response.length === 0) {
            this.muruganService.openSnackBar('No data available');
          } else if (response[0].StatusRes === 'Success') {
            this.datasource = new MatTableDataSource(response);
            this.muruganService.openSnackBar(response[0].StatusRes);
          }
        }, 300);
      },
      error: (error) => {
        setTimeout(() => {
          this.loading = false;
        }, 300);
        this.muruganService.openSnackBar(error.statusText);
      },
      complete: () => {},
    }));
  }

  applyFilter(event: any) {
    this.datasource.filter = event.trim().toLowerCase();
  }

  displayBr = (option) => (option && option.name ? option.name : '');

  displayRegion = (option) => (option && option.Trnvalue ? option.Trnvalue : '');

  edittRow(value, templateRef?: TemplateRef<any>) {
    console.log(value);

    this.dialog.open(templateRef, {
      maxWidth: '550px', maxHeight: '630px', disableClose: true, autoFocus: false,
    });
  }

  deleteRow(value) {
    console.log(value);
    Swal.fire({ text: value });
  }

  viewRow(value) {
    console.log(value);
    Swal.fire({ text: value });
  }

  downloadXl() {
    const newArr = this.datasource.data;

    newArr.forEach((element) => {
      delete element.StatusRes;
    });
    this.muruganService.exportAsExcelFile(this.datasource.data, 'CheckEntryView');
  }
}
