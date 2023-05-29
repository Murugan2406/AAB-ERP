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
  selector: 'app-form4-ee',
  templateUrl: './form4-ee.component.html',
  styleUrls: ['./form4-ee.component.css', '../common.scss'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class Form4EEComponent implements OnInit {
  select = 'manualindenthome';

  dataview: boolean = false;

  loading: boolean = false;

  Region = new FormControl();

  RegionOptions :any[];

  Branch = new FormControl({ value: '', disabled: true }, Validators.required);

  BranchOptions :any[];

  festival = new FormControl({ value: '', disabled: true }, Validators.required);

  FestivalOptions :any[];

  Month = new FormControl(moment(), Validators.required);

  private subs = new SubSink();

  branchCode;

  festivalDate;

  SuccessResponse: boolean;

  ResponseStatus: any;

  form4EEList:any[] = [];

  add1;

  add2;

  companyName;

  city;

  pincode;

  responseFestivalDate;

  toggleContent = false;

  constructor(
private router: Router,
    public globals: Globals,
     public dialog: MatDialog,
     private muruganService: murgnService,
  ) { }

  ngOnInit(): void {
    this.getRegions();
  }

  // eslint-disable-next-line max-len
  setToMonthAndYear(normalizedMonthAndYear: moment.Moment, datepicker: MatDatepicker<moment.Moment>) {
    const ctrlValue = this.Month.value!;
    ctrlValue.month(normalizedMonthAndYear.month());
    ctrlValue.year(normalizedMonthAndYear.year());
    this.Month.setValue(ctrlValue);
    datepicker.close();
    setTimeout(() => {
      document.getElementById('Regions').focus();
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

  getRegions() {
    const APIJson = [
      {
        reqMainreq: 'PFRegionList',
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
        reqMainreq: 'PFRegionBranch',
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
          response.shift();

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

  getFestival() {
    const Monthvalue = moment(this.Month.value).format('YYYY-MM-01');
    const APIJson = [
      {
        reqMainreq: 'RegionHolidays',
        Usr: this.globals.gUsrid,
        brcode: this.globals.gBrcode,
        var1: this.Region.value,
        var7: Monthvalue,
      },
    ];
    this.subs.add(this.muruganService.ESIType(APIJson[0]).subscribe({
      next: (response) => {
        // eslint-disable-next-line no-param-reassign
        if (response.length === 0) {
          this.muruganService.openSnackBar('No data available');
        } else if (response[0].StatusRes === 'Success') {
          this.FestivalOptions = response;
        } else if (response[0].StatusRes === 'Nil') {
          this.FestivalOptions = response;
          this.muruganService.openSnackBar('No Festivals in Selected date');
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

  RegionSelected(e:any, pfRegion) {
    if (e.source.selected) {
      this.getBranch(pfRegion);
      setTimeout(() => {
        document.getElementById('branch').focus();
      }, 100);
      this.Branch.enable();
    }
  }

  branchSelected(e:any, brcode) {
    if (e.source.selected) {
      this.getFestival();
      this.branchCode = brcode;
      setTimeout(() => {
        document.getElementById('Festival').focus();
      }, 100);
      this.festival.enable();
    }
  }

  festivalSelected(e, Holiday) {
    if (e.source.selected) {
      this.festivalDate = moment(Holiday).format('YYYY-MM-DD');
      setTimeout(() => {
        document.getElementById('submit').focus();
      }, 100);
    }
  }

  Submit(templateRef: TemplateRef<any>) {
    if (this.RequireChecking() && this.RegionValidation() && this.BranchValidation() && this.FestivalValidation()) {
      const APIJson = [
        {
          reqMainreq: 'FORM-IV-EE',
          Usr: this.globals.gUsrid,
          brcode: this.globals.gBrcode,
          var1: this.Region.value,
          var2: this.branchCode,
          var3: this.festival.value,
          var7: this.festivalDate,

        },
      ];
      this.subs.add(this.muruganService.ESIType(APIJson[0]).subscribe({
        next: (response) => {
          this.loading = false;
          if (response.length > 0) {
            if (response[0].StatusRes === 'Success') {
              this.SuccessResponse = true;
              this.form4EEList = response;

              this.add1 = response[0].Address1;

              this.add2 = response[0].Address2;

              this.companyName = response[0].Company;

              this.city = response[0].City;

              this.responseFestivalDate = response[0].FestivalDate;

              this.pincode = response[0].Pincode;
              this.toggleContent = true;
              // this.dialog.open(templateRef, {
              //   width: 'auto', maxHeight: '630px', disableClose: true,
              // });
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

  RequireChecking() {
    if (this.Region.valid && this.Branch.valid && this.festival.valid) {
      return true;
    }
    this.muruganService.openSnackBar('Please Fill All the Fields');
    return false;
  }

  RegionValidation() {
    if (this.RegionOptions.find(({ pfregion }) => pfregion === this.Region.value)) {
      return true;
    }
    this.muruganService.openSnackBar('Please choose Valid Region Value');
    return false;
  }

  BranchValidation() {
    if (this.BranchOptions.find(({ BranchName }) => BranchName === this.Branch.value)) {
      return true;
    }
    this.muruganService.openSnackBar('Please choose Valid Branch Value');
    return false;
  }

  FestivalValidation() {
    if (this.FestivalOptions.find(({ Reason }) => Reason === this.festival.value)) {
      return true;
    }
    this.muruganService.openSnackBar('Please choose Valid Festival Value');
    return false;
  }

  onNoClick(): void {
    this.toggleContent = false;
    this.form4EEList = [];
  }

  onCloseDialog():void {
    this.dialog.closeAll();
    this.form4EEList = [];
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
