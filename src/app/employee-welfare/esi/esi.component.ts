/* eslint-disable import/no-duplicates */
/* eslint-disable space-before-blocks */
/* eslint-disable max-len */
/* eslint-disable class-methods-use-this */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-useless-constructor */
import {
  Component, ElementRef, OnInit, TemplateRef, ViewChild,
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SubSink } from 'subsink';
import { MatDatepicker } from '@angular/material/datepicker';
import { murgnService } from 'src/app/services/murgn.service';
import moment from 'moment';
import { Moment } from 'moment';
import { DatePipe } from '@angular/common';
import { Globals } from 'src/app/globals';
import { MatDialog } from '@angular/material/dialog';
import { ComponentType } from '@angular/cdk/portal';
import * as XLSX from 'xlsx';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';

export const MY_FORMATS = {
  parse: {
    dateInput: 'MMM-YYYY',
  },
  display: {
    dateInput: 'MMM-YYYY',
    monthYearLabel: 'DD MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'DD MMM YYYY',
  },
};
@Component({
  selector: 'app-esi',
  templateUrl: './esi.component.html',
  styleUrls: ['./esi.component.css', '../common.scss'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class ESIComponent implements OnInit {
  select = 'manualindenthome';

  dataview: boolean = false;

  EsiType = new FormControl();

  EsiTypeOptions :any[];

  EsiRegion = new FormControl({ value: '', disabled: true }, Validators.required);

  EsiRegionOptions :any[];

  EsiBranch = new FormControl({ value: '', disabled: true }, Validators.required);

  EsiBranchOptions :any[];

  EsiBranchCode = null;

  EsiMonth = new FormControl(moment(), Validators.required);

  pipe:DatePipe;

  startDate = new Date(1990, 0, 1);

  loading = false;

  private subs = new SubSink();

  ResponseStatus: string;

  SuccessResponse = false;

  displayedColumns: string[] = [];

  columnsToDisplay: string[] = this.displayedColumns.slice();

  dataSource = [];

  reducedGroups = [];

  ESIReportList = [];

  TotalESIAmount: any;

  TotalESIdeduction: any;

  monthyear :any;

  toggleContent = false;

  @ViewChild('TABLE') table: ElementRef;

  constructor(
public router: Router,
private muruganService: murgnService,
 private snackBar: MatSnackBar,
 public globals: Globals,
 public dialog: MatDialog,
  // eslint-disable-next-line no-empty-function
  ) { }

  ngOnInit(): void {
    this.getEsiType();
  }

  getEsiType() {
    const APIJson = [
      {
        reqMainreq: 'ReportTypes',
        Usr: this.globals.gUsrid,
        brcode: this.globals.gBrcode,
      },
    ];
    this.subs.add(this.muruganService.ESIType(APIJson[0]).subscribe({
      next: (response) => {
        if (response.length === 0) {
          this.openSnackBar('No data available');
        } else if (response[0].StatusRes === 'Success') {
          this.EsiTypeOptions = response;
        } else {
          this.openSnackBar(response[0].StatusRes);
        }
      },
      error: (error) => {
        this.openSnackBar(error.statusText);
      },
      complete: () => {},
    }));
  }

  typeSelected(type: any) {
    this.SuccessResponse = false;
    this.EsiRegion.enable();
    this.EsiRegion.setValue('');
    this.EsiBranch.setValue('');
    const APIJson = [
      {
        reqMainreq: 'RegionList',
        Usr: this.globals.gUsrid,
        brcode: this.globals.gBrcode,
        var1: type,
      },
    ];
    this.EsiRegionOptions = [];
    this.subs.add(this.muruganService.ESIType(APIJson[0]).subscribe({
      next: (response) => {
        if (response.length === 0) {
          this.openSnackBar('No data available');
        } else if (response[0].StatusRes === 'Success') {
          this.EsiRegionOptions = response;
        } else {
          this.openSnackBar(response[0].StatusRes);
        }
      },
      error: (error) => {
        this.openSnackBar(error.statusText);
      },
      complete: () => {},
    }));
  }

  RegionSelected(region: any) {
    if (this.EsiType.value !== 'ESI CHALLAN TEMPLATE'){
      this.EsiBranch.enable();
      this.EsiBranch.setValue('');
      const APIJson = [
        {
          reqMainreq: 'RegionBranch',
          Usr: this.globals.gUsrid,
          brcode: this.globals.gBrcode,
          var1: this.EsiRegion.value,

        },
      ];
      this.EsiBranchOptions = [];
      this.subs.add(this.muruganService.ESIType(APIJson[0]).subscribe({
        next: (response) => {
          if (response.length === 0) {
            this.openSnackBar('No data available');
          } else if (response[0].StatusRes === 'Success') {
            this.EsiBranchOptions = response;
            setTimeout(() => {
              document.getElementById('branch').focus();
            }, 100);
          } else {
            this.openSnackBar(response[0].StatusRes);
          }
        },
        error: (error) => {
          this.openSnackBar(error.statusText);
        },
        complete: () => {},
      }));
    }
  }

  typeEnter(e: { key: string; target: { value: string; }; }, esiType: any) {
    if (e.key === 'Enter') {
      if (e.target.value !== '') {
        const empArr = this.EsiTypeOptions.find(({ val }) => val === esiType);
        if (empArr) {
          this.typeSelected(esiType);
        }
      }
    }
  }

  RegionEnter(e: { key: string; target: { value: string; }; }, regionValue: any) {
    if (e.key === 'Enter') {
      if (e.target.value !== '') {
        if (this.EsiRegionOptions.find(({ region }) => region === regionValue)) {
          this.RegionSelected(regionValue);
        }
      }
    }
  }

  branchEnter(e: { key: string; target: { value: string; }; }, branchValue: any) {
    if (e.key === 'Enter') {
      if (e.target.value !== '') {
        const empArr = this.EsiBranchOptions.find(({ branchname }) => branchname === branchValue);
        if (empArr) {
          this.EsiBranchCode = empArr.brcode;
        }
      }
    }
  }

  backNavigation() {
    if (this.select === 'viewpage') {
      this.dataview = false;
      this.select = 'idCardPreparation';
    } else {
      this.router.navigate(['/dashboard']);
    }
  }

  homeNavigate() {
    this.globals.SelectDashboard = 'GROUPLIST';
    this.router.navigate(['/dashboard']);
  }

  setMonthAndYear(normalizedMonthAndYear: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.EsiMonth.value!;
    ctrlValue.month(normalizedMonthAndYear.month());
    ctrlValue.year(normalizedMonthAndYear.year());
    this.EsiMonth.setValue(ctrlValue);
    setTimeout(() => {
      document.getElementById('Region').focus();
    }, 100);
    datepicker.close();
  }

  Submit(templateRef: TemplateRef<any>) {
    if (this.EsiType.value !== 'ESI CHALLAN TEMPLATE'){
      if (this.EsiRequireValidation() && this.EsiTypeValidation() && this.EsiRegionValidation() && this.EsiBranchValidation()) {
        this.loading = true;
        const Month = moment(this.EsiMonth.value).format('YYYY-MM-01');

        const APIJson = [
          {
            reqMainreq: '',
            Usr: this.globals.gUsrid,
            brcode: this.globals.gBrcode,
            var1: this.EsiRegion.value,
            var2: this.EsiBranchCode,
            var3: Month,

          },
        ];
        if (this.EsiType.value === 'ESI'){
          APIJson[0].reqMainreq = 'ESIReport';
        } else if (this.EsiType.value === 'ESI BRANCH WISE') {
          APIJson[0].reqMainreq = 'ESIReportBrWise';
        } else if (this.EsiType.value === 'ESI ARREAR'){
          APIJson[0].reqMainreq = 'ESIArrearReport';
        }
        this.subs.add(this.muruganService.ESIType(APIJson[0]).subscribe({
          next: (response) => {
            this.loading = false;
            if (response.length > 0) {
              if (response[0].StatusRes === 'Success') {
                this.SuccessResponse = true;
                this.ESIReportList = response;

                this.monthyear = response[0].monthyear;
                this.fetchTable(response, templateRef);
              } else {
                this.ResponseStatus = response[0].StatusRes;
                this.SuccessResponse = false;
                this.dialog.open(templateRef, {
                  width: 'auto', maxHeight: '630px', disableClose: true,
                });
              }
            } else {
              this.ResponseStatus = 'No data available';
              this.SuccessResponse = false;
              this.dialog.open(templateRef, {
                width: 'auto', maxHeight: '630px', disableClose: true,
              });
            }
          },
          error: (error) => {
            this.openSnackBar(error.statusText);
          },
          complete: () => {},
        }));
      }
    } else if (this.EsiType.value === 'ESI CHALLAN TEMPLATE'){
      if (this.EsiType.valid && this.EsiRegion.valid && this.EsiMonth.valid && this.EsiTypeValidation() && this.EsiRegionValidation()) {
        this.loading = true;
        const Month = moment(this.EsiMonth.value).format('YYYY-MM-01');

        const APIJson = [
          {
            reqMainreq: 'ESITemplate',
            Usr: this.globals.gUsrid,
            brcode: this.globals.gBrcode,
            var1: this.EsiRegion.value,
            var2: this.EsiBranchCode,
            var3: Month,

          },
        ];

        this.subs.add(this.muruganService.ESIType(APIJson[0]).subscribe({
          next: (response) => {
            this.loading = false;
            if (response.length > 0) {
              if (response[0].StatusRes === 'Success') {
                this.SuccessResponse = true;
                this.ESIReportList = response;
                this.monthyear = moment(this.EsiMonth.value).format('MMM - YYYY');
                this.fetchTable(response, templateRef);
              } else {
                this.ResponseStatus = response[0].StatusRes;
                this.SuccessResponse = false;
                this.dialog.open(templateRef, {
                  width: 'auto', maxHeight: '630px', disableClose: true,
                });
              }
            } else {
              this.ResponseStatus = 'No data available';
              this.SuccessResponse = false;
              this.dialog.open(templateRef, {
                width: 'auto', maxHeight: '630px', disableClose: true,
              });
            }
          },
          error: (error) => {
            this.openSnackBar(error.statusText);
          },
          complete: () => {},
        }));
      }
    }
  }

  fetchTable(response: any[], templateRef: TemplateRef<any> | ComponentType<unknown>) {
    // eslint-disable-next-line no-return-assign, no-param-reassign
    response.map((i: { SNo: any; }, index: number) => i.SNo = index + 1, 0);
    if (this.EsiType.value === 'ESI' || this.EsiType.value === 'ESI ARREAR'){
      this.displayedColumns = ['SNo', 'empcode', 'empname', 'Code', 'WD', 'Amount', 'Deduction'];
      this.dataSource = this.groupBy('branchname', response, this.reducedGroups);
      const Arry = [{
        SNo: '',
        empcode: '',
        empname: 'Grand Total',
        Code: '',
        WD: '',
        Amount: response[0].TotalAmount,
        Deduction: response[0].TotalDeduction,
      }];
      this.dataSource.push(Arry[0]);
    } else if (this.EsiType.value === 'ESI BRANCH WISE') {
      this.displayedColumns = ['SNo', 'branchname', 'brcode', 'WD', 'Amount', 'Deduction'];
      this.dataSource = response;
      const Arry = [{
        SNo: '',
        brcode: '',
        branchname: 'Grand Total',
        WD: '',
        Amount: response[0].TotalAmount,
        Deduction: response[0].TotalDeduction,
      }];
      this.dataSource.push(Arry[0]);
    } else if (this.EsiType.value === 'ESI CHALLAN TEMPLATE'){
      this.displayedColumns = ['SNo', 'IP Number', 'IP Name', 'No Days', 'Monthly Wages', 'Reason Code', 'Last Date'];
      this.dataSource = response;
    }
    this.toggleContent = true;
  }

  /**
   * Groups the @param data by distinct values of a @param column
   * This adds group lines to the dataSource
   * @param reducedGroups is used localy to keep track of the colapsed groups
   */

  groupBy(column: string, data: any[], reducedGroups?: any[]) {
    // eslint-disable-next-line no-return-assign, no-param-reassign

    this.TotalESIAmount = data[0].TotalAmount;
    this.TotalESIdeduction = data[0].TotalDeduction;

    if (!column) return data;
    const brName = ' BranchName :';
    let collapsedGroups = reducedGroups;
    if (!reducedGroups) collapsedGroups = [];
    const customReducer = (accumulator: { [x: string]: any[]; }, currentValue: { [x: string]: any; }) => {
      const currentGroup = currentValue[column];
      if (!accumulator[currentGroup]) {
        accumulator[currentGroup] = [{
          groupName: `${brName} ${currentValue[column]}`,
          value: currentValue[column],
          isGroup: true,
          reduced: collapsedGroups.some((group) => group.value === currentValue[column]),
        }];
      }

      accumulator[currentGroup].push(currentValue);

      return accumulator;
    };
    const groups = data.reduce(customReducer, {});

    const groupArray = Object.keys(groups).map((key) => groups[key]);
    groupArray.forEach((element) => {
      const array = [{
        Amount: element[1].subTotalAmount,
        Deduction: element[1].subTotalDeduction,
        subtotal: true,
        empname: 'Sub Total',
      }];
      element.push(array[0]);
    });

    const flatList = groupArray.reduce((a, c) => a.concat(c), []);

    return flatList.filter((rawLine: { [x: string]: any; isGroup: any; }) => rawLine.isGroup
        || collapsedGroups.every((group) => rawLine[column] !== group.value));
  }

  isGroup(index: any, item: { isGroup: boolean; }): boolean {
    return item.isGroup;
  }

  reduceGroup(row: { reduced: boolean; value: any; }) {
    // eslint-disable-next-line no-param-reassign
    row.reduced = !row.reduced;
    if (row.reduced) { this.reducedGroups.push(row); } else { this.reducedGroups = this.reducedGroups.filter((el) => el.value !== row.value); }

    this.dataSource = this.groupBy('branchname', this.ESIReportList, this.reducedGroups);
  }

  XLExport(){
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.table.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    const Esimonth = moment(this.EsiMonth.value).format('MMM_YY');

    XLSX.writeFile(wb, `${this.EsiRegion.value}_${Esimonth}_ESI_CHALLAN_TEMPLATE.xlsx`);
    this.onNoClick();
  }

  EsiRequireValidation() {
    if (this.EsiType.valid && this.EsiRegion.valid && this.EsiBranch.valid && this.EsiMonth.valid) {
      return true;
    }
    this.openSnackBar('Please Fill All the Fields');
    return false;
  }

  EsiTypeValidation() {
    if (this.EsiTypeOptions.find(({ val }) => val === this.EsiType.value)) {
      return true;
    }
    this.openSnackBar('Please choose Valid ESI Type');
    return false;
  }

  EsiRegionValidation() {
    if (this.EsiRegionOptions.find(({ region }) => region === this.EsiRegion.value)) {
      return true;
    }
    this.openSnackBar('Please choose Valid Region Value');
    return false;
  }

  EsiBranchValidation() {
    if (this.EsiBranchOptions.find(({ branchname }) => branchname === this.EsiBranch.value)) {
      return true;
    }
    this.openSnackBar('Please choose Valid Branch Name');
    return false;
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'close', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 1000,
    });
  }

  onNoClick(): void {
    this.dialog.closeAll();
  }

  ontoggleContent():void {
    this.toggleContent = false;
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
