/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable max-len */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-empty-function */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved */
/* eslint-disable comma-dangle */
/* eslint-disable no-useless-constructor */
/* eslint-disable import/prefer-default-export */

import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import moment from 'moment';
import { murgnService } from 'src/app/services/murgn.service';
import { Globals } from 'src/app/globals';
import { SubSink } from 'subsink';
import * as _ from 'lodash';
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
  selector: 'app-advance-payment',
  templateUrl: './advance-payment.component.html',
  styleUrls: ['../common.scss'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class AdvancePaymentComponent implements OnInit {
  select = 'manualindenthome';

  dataview: boolean = false;

  loading: boolean = false;

  advanceReportType = new FormControl();

  advanceReportTypeOptions :any[];

  advanceType = new FormControl();

  advanceTypeOptions :any[];

  Region = new FormControl();

  RegionOptions :any[];

  Branch = new FormControl({ value: '', disabled: true }, Validators.required);

  BranchOptions :any[];

  Month = new FormControl(moment(), Validators.required);

  finalmonth = '';

  private subs = new SubSink();

  branchCode;

  advancetypeCode;

  SuccessResponse: boolean;

  ResponseStatus: any;

  form4EEList:any[] = [];

  reducedGroups = [];

  add1;

  add2;

  companyName;

  city;

  pincode;

  responseFestivalDate;

  displayedColumns: string[] = [];

  columnsToDisplay: string[] = this.displayedColumns.slice();

  grandPFTotal: any;

  mergedArray:any[] = [];

  finalArray :any[] = [];

  toggleContent = false;

  constructor(
private router: Router,
    public globals: Globals,
     public dialog: MatDialog,
     private muruganService: murgnService,
  ) { }

  ngOnInit(): void {
    this.getRegions();
    this.getAdvanceReportTypes();
    this.getAdvanceTypes();
  }

  // eslint-disable-next-line max-len
  setToMonthAndYear(normalizedMonthAndYear: moment.Moment, datepicker: MatDatepicker<moment.Moment>) {
    const ctrlValue = this.Month.value!;
    ctrlValue.month(normalizedMonthAndYear.month());
    ctrlValue.year(normalizedMonthAndYear.year());
    this.Month.setValue(ctrlValue);
    datepicker.close();
    setTimeout(() => {
      document.getElementById('submit').focus();
    }, 100);
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

  getAdvanceReportTypes() {
    const APIJson = [
      {
        reqMainreq: 'AdvanceReportTypes',
        Usr: this.globals.gUsrid,
        brcode: this.globals.gBrcode,
      },
    ];
    this.subs.add(this.muruganService.ESIType(APIJson[0]).subscribe({
      next: (response) => {
        if (response.length === 0) {
          this.muruganService.openSnackBar('No data available');
        } else if (response[0].StatusRes === 'Success') {
          this.advanceReportTypeOptions = response;
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

  getAdvanceTypes() {
    const APIJson = [
      {
        reqMainreq: 'AdvanceTypes',
        Usr: this.globals.gUsrid,
        brcode: this.globals.gBrcode,
      },
    ];
    this.subs.add(this.muruganService.ESIType(APIJson[0]).subscribe({
      next: (response) => {
        if (response.length === 0) {
          this.muruganService.openSnackBar('No data available');
        } else if (response[0].StatusRes === 'Success') {
          this.advanceTypeOptions = response;
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

  getRegions() {
    const APIJson = [
      {
        reqMainreq: 'ADVPFRegionList',
        Usr: this.globals.gUsrid,
        brcode: this.globals.gBrcode,
      },
    ];
    this.subs.add(this.muruganService.ESIType(APIJson[0]).subscribe({
      next: (response) => {
        if (response.length === 0) {
          this.muruganService.openSnackBar('No data available');
        } else if (response[0].StatusRes === 'Success') {
          this.RegionOptions = response;
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

  getBranch(region) {
    const APIJson = [
      {
        reqMainreq: 'ADVPFRegionBranch',
        Usr: this.globals.gUsrid,
        brcode: this.globals.gBrcode,
        var1: region,
      },
    ];
    this.subs.add(this.muruganService.ESIType(APIJson[0]).subscribe({
      next: (response) => {
        if (response.length === 0) {
          this.muruganService.openSnackBar('No data available');
        } else if (response[0].StatusRes === 'Success') {
          this.BranchOptions = response;
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

  advanceReportSelected(e:any, data) {
    if (e.source.selected) {
      setTimeout(() => {
        document.getElementById('advance').focus();
      }, 100);
    }
  }

  advanceTypeSelected(e:any, code) {
    if (e.source.selected) {
      this.advancetypeCode = code;
      this.SuccessResponse = false;
      setTimeout(() => {
        document.getElementById('Regions').focus();
      }, 100);
    }
  }

  RegionSelected(e:any, pfRegion) {
    if (e.source.selected) {
      this.getBranch(pfRegion);
      this.Branch.enable();
      setTimeout(() => {
        document.getElementById('branch').focus();
      }, 100);
    }
  }

  branchSelected(e:any, brcode, datepicker: MatDatepicker<moment.Moment>) {
    if (e.source.selected) {
      this.branchCode = brcode;
      if (this.advanceReportType.value !== 'Advance Balance') {
        setTimeout(() => {
          document.getElementById('Month').focus();
        }, 100);
      } else {
        setTimeout(() => {
          document.getElementById('submit').focus();
        }, 100);
      }
    }
  }

  Submit(templateRef: TemplateRef<any>) {
    if (this.RequireChecking() && this.advanceReportTypeValidation() && this.advanceTypeValidation() && this.RegionValidation() && this.BranchValidation()) {
      const month = moment(this.Month.value).format('YYYY-MM-01');

      this.finalmonth = moment(this.Month.value).format('MMM - YYYY');

      let regionValue;
      let advanceType;
      this.loading = true;

      if (this.Region.value === 'ALL') {
        regionValue = 0;
      } else {
        regionValue = this.Region.value;
      }

      if (this.advanceType.value === 'ALL') {
        advanceType = 0;
      } else {
        advanceType = this.advanceType.value;
      }

      const APIJson = [
        {
          reqMainreq: 'AdvanceIssue',
          Usr: this.globals.gUsrid,
          brcode: this.globals.gBrcode,
          var1: regionValue,
          var2: this.branchCode,
          var3: advanceType,
          var4: month
        },
      ];

      if (this.advanceReportType.value === 'Advance Payment') {
        APIJson[0].reqMainreq = 'AdvanceIssue';
      } else if (this.advanceReportType.value === 'Advance Deduction') {
        APIJson[0].reqMainreq = 'AdvanceDeduction';
      } else if (this.advanceReportType.value === 'Advance Balance') {
        APIJson[0].reqMainreq = 'AdvanceBalance';
      }

      this.form4EEList = [];
      this.subs.add(this.muruganService.ESIType(APIJson[0]).subscribe({

        next: (response) => {
          this.loading = false;

          if (response.length > 0) {
            if (response[0].StatusRes === 'Success') {
              this.toggleContent = true;
              this.SuccessResponse = true;

              response.forEach((element, index) => {
                element = Object.assign(element, { SNo: index + 1 });
              });
              this.form4EEList = this.groupByLatest('typ', response, this.reducedGroups);

              if (this.advanceReportType.value === 'Advance Payment') {
                this.displayedColumns = ['SNo', 'brcode', 'brname', 'empcode', 'empname', 'issuedate', 'advanceamt'];
              } else if (this.advanceReportType.value === 'Advance Deduction') {
                this.displayedColumns = ['SNo', 'brcode', 'brname', 'empcode', 'empname', 'deducteddate', 'advDeductionAmt'];
              } else if (this.advanceReportType.value === 'Advance Balance') {
                this.displayedColumns = ['SNo', 'brcode', 'brname', 'empcode', 'empname', 'BalanceAmt'];
              }
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
          this.muruganService.openSnackBar(error.statusText);
        },
        complete: () => {},
      }));
    }
    return false;
  }

  /**
   * Groups the @param data by distinct values of a @param column
   * This adds group lines to the dataSource
   * @param reducedGroups is used localy to keep track of the colapsed groups
   */

  RequireChecking() {
    if (this.advanceReportType.valid && this.advanceType.valid && this.Region.valid && this.Branch.valid) {
      return true;
    }
    this.muruganService.openSnackBar('Please Fill All the Fields');
    return false;
  }

  RegionValidation() {
    if (this.RegionOptions.find(({ pfregion }) => pfregion === this.Region.value)) {
      return true;
    }
    this.muruganService.openSnackBar('Please choose Valid Region value');
    return false;
  }

  BranchValidation() {
    if (this.BranchOptions.find(({ BranchName }) => BranchName === this.Branch.value)) {
      return true;
    }
    this.muruganService.openSnackBar('Please choose Valid Branch value');
    return false;
  }

  advanceReportTypeValidation() {
    if (this.advanceReportTypeOptions.find(({ Val }) => Val === this.advanceReportType.value)) {
      return true;
    }
    this.muruganService.openSnackBar('Please choose valid Advance Report type value');
    return false;
  }

  advanceTypeValidation() {
    if (this.advanceTypeOptions.find(({ val }) => val === this.advanceType.value)) {
      return true;
    }
    this.muruganService.openSnackBar('Please choose valid Advance type value');
    return false;
  }

  ontoggleContent() {
    this.toggleContent = false;
  }

  onNoClick(): void {
    this.toggleContent = false;
    // this.dialog.closeAll();
    this.form4EEList = [];
    this.form4EEList = this.groupByLatest('typ', this.form4EEList, this.reducedGroups);
    this.groupByLatestRegion('region', this.form4EEList, this.reducedGroups);
  }

  onCloseDialog():void {
    this.dialog.closeAll();
    this.form4EEList = [];
    this.form4EEList = this.groupByLatest('typ', this.form4EEList, this.reducedGroups);
    this.groupByLatestRegion('region', this.form4EEList, this.reducedGroups);
  }

  groupByLatest(column: string, data: any[], reducedGroups?: any[]) {
    this.finalArray = [];
    this.mergedArray = [];
    if (!column) return data;
    let collapsedGroups = reducedGroups;
    if (!reducedGroups) collapsedGroups = [];
    const customReducer = (accumulator, currentValue) => {
      const currentGroup = currentValue[column];
      const x = 'ADVANCE TYPE ';
      if (!accumulator[currentGroup]) {
        accumulator[currentGroup] = [{
          groupName: `${x} : ${currentValue[column]}`,
          value: currentValue[column],
          subtotalTYPE: `${'SUB TOTAL TYPE'}: ${currentValue.subtotalTYPE}`,
          isGroup: true,
          isType: true,
          reduced: collapsedGroups.some((group) => group.value === currentValue[column]),
        }];
      }

      accumulator[currentGroup].push(currentValue);

      return accumulator;
    };
    const groups = data.reduce(customReducer, {});

    const groupArray = Object.keys(groups).map((key) => groups[key]);

    groupArray.forEach((element) => {
      const first : any[] = [];
      first.push(element.shift());

      // eslint-disable-next-line no-param-reassign
      element = this.groupByLatestRegion('region', element, this.reducedGroups);
      const merged = first.concat(element);

      this.mergedArray.push(merged);
    });

    this.mergedArray.forEach((element) => {
      this.finalArray = this.finalArray.concat(element);
    });

    return this.finalArray;
  }

  groupByLatestRegion(column: string, data: any[], reducedGroups?: any[]) {
    if (!column) return data;
    let collapsedGroups = reducedGroups;
    if (!reducedGroups) collapsedGroups = [];
    const customReducer = (accumulator, currentValue) => {
      const currentGroup = currentValue[column];
      if (!accumulator[currentGroup]) {
        accumulator[currentGroup] = [{
          groupName: `${'REGION NAME'} : ${currentValue[column]}`,
          value: currentValue[column],
          isGroup: true,
          isType: false,
          reduced: collapsedGroups.some((group) => group.value === currentValue[column]),
        }];
      }

      accumulator[currentGroup].push(currentValue);

      return accumulator;
    };
    const groups = data.reduce(customReducer, {});

    const groupArray = Object.keys(groups).map((key) => groups[key]);

    if (this.advanceReportType.value === 'Advance Payment') {
      groupArray.forEach((element) => {
        const array = [{
          advanceamt: element[1].subtotalREGION,
          subtotal: true,
          empname: 'REGION SUB TOTAL'
        }];
        element.push(array[0]);

        this.grandPFTotal = element[1].GrandTotal;
      });
    } else if (this.advanceReportType.value === 'Advance Deduction') {
      groupArray.forEach((element) => {
        const array = [{
          advDeductionAmt: element[1].subtotalREGION,
          subtotal: true,
          empname: 'REGION SUB TOTAL'
        }];
        element.push(array[0]);
        this.grandPFTotal = element[1].GrandTotal;
      });
    } else if (this.advanceReportType.value === 'Advance Balance') {
      groupArray.forEach((element) => {
        const array = [{
          BalanceAmt: element[1].subtotalREGION,
          subtotal: true,
          empname: 'REGION SUB TOTAL'
        }];
        element.push(array[0]);
        this.grandPFTotal = element[1].GrandTotal;
      });
    }

    const flatList = groupArray.reduce((a, c) => a.concat(c), []);

    const muru = flatList.filter((rawLine) => rawLine.isGroup
    || collapsedGroups.every((group) => rawLine[column] !== group.value));

    return muru;
  }

  isGroup(index, item): boolean {
    return item.isGroup;
  }

  reduceGroup(row) {
    // eslint-disable-next-line no-param-reassign
    row.reduced = !row.reduced;
    if (row.reduced) { this.reducedGroups.push(row); } else { this.reducedGroups = this.reducedGroups.filter((el) => el.value !== row.value); }

    this.form4EEList = this.groupByLatest('typ', this.form4EEList, this.reducedGroups);
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
