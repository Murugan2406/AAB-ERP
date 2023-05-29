/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-empty-function */
/* eslint-disable no-useless-constructor */
/* eslint-disable import/prefer-default-export */

import {
  Component, ElementRef, OnInit, TemplateRef, ViewChild,
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { SubSink } from 'subsink';

import { murgnService } from 'src/app/services/murgn.service';

import { Globals } from 'src/app/globals';
import { MatDialog } from '@angular/material/dialog';
import moment from 'moment';
import { MatDatepicker } from '@angular/material/datepicker';
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
  selector: 'app-esiforms',
  templateUrl: './esiforms.component.html',
  styleUrls: ['./esiforms.component.css', '../common.scss'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class ESIFormsComponent implements OnInit {
  select = 'manualindenthome';

  dataview: boolean = false;

  EsiFormType = new FormControl();

  EsiFormTypeOptions :any[];

  EsiFormRegion = new FormControl({ value: '', disabled: true }, Validators.required);

  EsiFormRegionOptions :any[];

  EsiFormBranch = new FormControl({ value: '', disabled: true }, Validators.required);

  EsiFormBranchOptions :any[];

  private subs = new SubSink();

  loading = false;

  EmlpoyeeNameFilter: any[];

  emplyeename = new FormControl({ value: '', disabled: true }, Validators.required);

  emplyeeCode = new FormControl({ value: '', disabled: true }, Validators.required);

  @ViewChild('TABLE') table: ElementRef;

  reportType = new FormControl({ value: '', disabled: true }, Validators.required);

  FromDate = new FormControl(moment(), Validators.required);

  ToDate = new FormControl(moment(), Validators.required);

  SuccessResponse = false;

  ResponseStatus: string;

  formXVList : any[];

  branchCode;

  form3EmpNo;

  form3EmpName;

  form3DOJ;

  form3FHName;

  form3InsNo;

  form3add1;

  form3add2;

  form3add3;

  form3company;

  form3City;

  form3Pincode;

  form3ESICode;

  form3ESIExempt;

  form3Region;

  form3StartDate;

  form3EndDate;

  currentdate = new Date();

  toggleContent = false;

  @ViewChild('fromDp') datePicker: MatDatepicker<Date>;

  @ViewChild('Todp') TodatePicker: MatDatepicker<Date>;

  constructor(
    private router: Router,
    private muruganService: murgnService,
     public globals: Globals,
     public dialog: MatDialog,
  ) { }

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

  ngOnInit(): void {
    this.getEsiFormType();
  }

  getEsiFormType() {
    const APIJson = [
      {
        reqMainreq: 'ESIFormTypes',
        Usr: this.globals.gUsrid,
        brcode: this.globals.gBrcode,
      },
    ];
    this.subs.add(this.muruganService.ESIType(APIJson[0]).subscribe({
      next: (response) => {
        if (response.length === 0) {
          this.muruganService.openSnackBar('No data available');
        } else if (response[0].StatusRes === 'Success') {
          this.EsiFormTypeOptions = response;
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

  typeSelected(e:any, type) {
    if (e.source.selected) {
      this.SuccessResponse = false;
      if (type === 'FORM XV') {
        setTimeout(() => {
          this.EsiFormBranch.enable();
        }, 100);

        const APIJson = [
          {
            reqMainreq: 'ESIFormRegionBranch',
            Usr: this.globals.gUsrid,
            brcode: this.globals.gBrcode,

          },
        ];
        this.subs.add(this.muruganService.ESIType(APIJson[0]).subscribe({
          next: (response) => {
            if (response) {
              if (response.length === 0) {
                this.muruganService.openSnackBar('No data available');
              } else if (response[0].StatusRes === 'Success') {
                this.EsiFormBranchOptions = response;
              } else {
                this.muruganService.openSnackBar(response[0].StatusRes);
              }
            }
          },
          error: (error) => {
            this.muruganService.openSnackBar(error.statusText);
          },
          complete: () => {},
        }));
        setTimeout(() => {
          document.getElementById('branch').focus();
        }, 100);
      } else {
        this.EsiFormRegion.enable();
        this.EsiFormRegion.setValue('');
        setTimeout(() => {
          document.getElementById('Regions').focus();
        }, 100);
        const APIJson = [
          {
            reqMainreq: 'ESIFormRegionList',
            Usr: this.globals.gUsrid,
            brcode: this.globals.gBrcode,
          },
        ];
        this.EsiFormRegionOptions = [];
        this.subs.add(this.muruganService.ESIType(APIJson[0]).subscribe({
          next: (response) => {
            if (response.length === 0) {
              this.muruganService.openSnackBar('No data available');
            } else if (response[0].StatusRes === 'Success') {
              this.EsiFormRegionOptions = response;
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
    }
  }

  branchSelected(e, code) {
    if (e.source.selected) {
      this.branchCode = code;
      setTimeout(() => {
        document.getElementById('submit').focus();
      }, 100);
    }
  }

  RegionSelected(e:any, data, datepicker: MatDatepicker<moment.Moment>) {
    if (e.source.selected) {
      if (this.EsiFormType.value === 'FORM 3' || this.EsiFormType.value === 'FORM 37') {
        setTimeout(() => {
          document.getElementById('empCode').focus();
        }, 100);
        this.emplyeeCode.enable();
        this.emplyeename.enable();
      } else {
        this.reportType.enable();
      }
    }
  }

  getEmployeeName(keyValue) {
    const APIJson = [
      {
        reqMainreq: 'ESIFormEmployeeFilter',
        Usr: this.globals.gUsrid,
        brcode: this.globals.gBrcode,
        var1: this.EsiFormRegion.value,
        var4: keyValue,
        var5: this.EsiFormType.value,
      },
    ];
    this.subs.add(this.muruganService.ESIType(APIJson[0]).subscribe({
      next: (response) => {
        if (response) {
          if (response.length === 0) {
            this.muruganService.openSnackBar('No data available');
            this.EmlpoyeeNameFilter = [];
          } else if (response[0].StatusRes === 'Success') {
            this.EmlpoyeeNameFilter = response.slice(0, 100);
          } else {
            this.muruganService.openSnackBar(response[0].StatusRes);
            this.EmlpoyeeNameFilter = [];
          }
        } else {
          this.EmlpoyeeNameFilter = [];
        }
      },
      error: (error) => {
        this.muruganService.openSnackBar(error.statusText);
      },
      complete: () => {},
    }));
  }

  setEmpName(e:any, empname, gender) {
    if (e.source.selected) {
      this.emplyeename.setValue(empname);
      this.reportType.setValue(gender);
      setTimeout(() => {
        document.getElementById('submit').focus();
      }, 100);
    }
  }

  setEmpCode(e:any, empCode, gender) {
    if (e.source.selected) {
      this.emplyeeCode.setValue(empCode);
      this.reportType.setValue(gender);
    }
  }

  Submit(templateRef: TemplateRef<any>, Type) {
    // eslint-disable-next-line default-case
    switch (Type) {
      case 'FORM 3':
        if (this.Form3Requires() && this.EsiTypeValidation() && this.EsiRegionValidation() && this.empcodeValidation(this.emplyeename.value, this.emplyeeCode.value)) {
          this.loading = true;
          this.fetchForm3Data(templateRef, 'FORM 3');
        }
        break;
      case 'FORM 6':
        if (this.Form6Requires() && this.EsiTypeValidation() && this.EsiRegionValidation()) {
          this.loading = true;
          this.fetchForm6Data(templateRef);
        }
        break;
      case 'FORM 37':
        if (this.Form3Requires() && this.EsiTypeValidation() && this.EsiRegionValidation() && this.empcodeValidation(this.emplyeename.value, this.emplyeeCode.value)) {
          this.loading = true;
          this.fetchForm3Data(templateRef, 'FORM 37');
        }
        break;
      case 'FORM XV':
        if (this.FormXVRequires() && this.EsiTypeValidation() && this.EsiBranchValidation()) {
          this.loading = true;
          this.fetchFormXvData(templateRef, 'FORM XV');
        }
        break;
      default:
        this.muruganService.openSnackBar('Please Fill All the Fields');
    }
  }

  fetchForm3Data(templateRef: TemplateRef<any>, type) {
    const APIJson = [
      {
        reqMainreq: 'ESIFormGeneration',
        Usr: this.globals.gUsrid,
        brcode: this.globals.gBrcode,
        var1: this.EsiFormRegion.value,
        var2: '',
        var4: this.emplyeeCode.value,
        var5: type,
        var6: '',
        var7: '',
        var8: '',

      },
    ];

    this.subs.add(this.muruganService.ESIType(APIJson[0]).subscribe({
      next: (response) => {
        this.loading = false;
        if (response.length > 0) {
          if (response[0].StatusRes === 'Success') {
            this.SuccessResponse = true;
            if (type === 'FORM 3') {
              this.form3printfetch(response, templateRef);
            } else if (type === 'FORM 37') {
              this.form37printfetch(response, templateRef);
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

  fetchFormXvData(templateRef: TemplateRef<any>, type) {
    const APIJson = [
      {
        reqMainreq: 'ESIFormGeneration',
        Usr: this.globals.gUsrid,
        brcode: this.globals.gBrcode,
        var1: this.EsiFormRegion.value,
        var2: this.branchCode,
        var4: '',
        var5: type,
        var6: '',
        var7: '',
        var8: '',

      },
    ];

    this.subs.add(this.muruganService.ESIType(APIJson[0]).subscribe({
      next: (response) => {
        this.loading = false;
        if (response.length > 0) {
          if (response[0].StatusRes === 'Success') {
            this.SuccessResponse = true;
            this.formXVList = response;
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

  form3printfetch(response, templateRef: TemplateRef<any>) {
    this.form3EmpNo = response[0].empno;

    this.form3EmpName = response[0].empname;

    this.form3DOJ = response[0].doj;

    this.form3FHName = response[0].fathername;

    this.form3InsNo = response[0].ESINO;

    this.form3add1 = response[0].Add1;
    this.form3add2 = response[0].Add2;
    this.form3add3 = response[0].Add3;
    this.form3company = response[0].company;
    this.form3City = response[0].City;
    this.form3Pincode = response[0].Pincode;
    this.form3ESICode = response[0].ESICode;
    this.form3ESIExempt = response[0].ESIExempt;
    this.toggleContent = true;
    // this.dialog.open(templateRef, {
    //   width: 'auto', maxHeight: '630px', disableClose: true,
    // });
  }

  form37printfetch(response, templateRef: TemplateRef<any>) {
    this.form3EmpNo = response[0].empno;

    this.form3EmpName = response[0].empname;

    this.form3FHName = response[0].fathername;

    this.form3InsNo = response[0].ESINO;

    this.form3add1 = response[0].Address1;
    this.form3add2 = response[0].Address2;
    this.form3company = response[0].Company;
    this.form3City = response[0].City;
    this.form3Pincode = response[0].Pincode;
    this.form3ESICode = response[0].ESICode;

    this.form3Region = response[0].Regname;
    this.form3StartDate = response[0].StartDate;
    this.form3EndDate = response[0].EndDate;
    this.toggleContent = true;
    // this.dialog.open(templateRef, {
    //   width: 'auto', maxHeight: '630px', disableClose: true,
    // });
  }

  fetchForm6Data(templateRef: TemplateRef<any>) {
    const FromDate = moment(this.FromDate.value).format('YYYY-MMM-01');
    const ToDate = moment(this.ToDate.value).format('YYYY-MMM-01');

    const APIJson = [
      {
        reqMainreq: 'ESIFormGeneration',
        Usr: this.globals.gUsrid,
        brcode: this.globals.gBrcode,
        var1: this.EsiFormRegion.value,
        var2: '',
        var3: '',
        var4: '',
        var5: 'FORM 6',
        var6: this.reportType.value,
        var7: FromDate,
        var8: ToDate,

      },
    ];

    this.subs.add(this.muruganService.ESIType(APIJson[0]).subscribe({
      next: (response) => {
        this.loading = false;
        if (response.length > 0) {
          if (response[0].StatusRes === 'Success') {
            this.SuccessResponse = false;
            this.muruganService.openSnackBar('design not yet given ask KK sir');
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

  setMonthAndYear(normalizedMonthAndYear: moment.Moment, datepicker: MatDatepicker<moment.Moment>) {
    const ctrlValue = this.FromDate.value!;
    ctrlValue.month(normalizedMonthAndYear.month());
    ctrlValue.year(normalizedMonthAndYear.year());
    this.FromDate.setValue(ctrlValue);
    datepicker.close();
  }

  setToMonthAndYear(normalizedMonthAndYear: moment.Moment, datepicker: MatDatepicker<moment.Moment>) {
    const ctrlValue = this.ToDate.value!;
    ctrlValue.month(normalizedMonthAndYear.month());
    ctrlValue.year(normalizedMonthAndYear.year());
    this.ToDate.setValue(ctrlValue);
    datepicker.close();
  }

  Form3Requires() {
    if (this.EsiFormType.valid && this.EsiFormRegion.valid && this.emplyeeCode.valid && this.emplyeename.valid) {
      return true;
    }
    this.muruganService.openSnackBar('Please Fill All the Fields');
    return false;
  }

  Form6Requires() {
    if (this.EsiFormType.valid && this.EsiFormRegion.valid && this.FromDate.valid && this.ToDate.valid && this.reportType.valid) {
      return true;
    }
    this.muruganService.openSnackBar('Please Fill All the Fields');
    return false;
  }

  FormXVRequires() {
    if (this.EsiFormType.valid && this.EsiFormBranch.valid) {
      return true;
    }
    this.muruganService.openSnackBar('Please Fill All the Fields');
    return false;
  }

  EsiTypeValidation() {
    if (this.EsiFormTypeOptions.find(({ val }) => val === this.EsiFormType.value)) {
      return true;
    }
    this.muruganService.openSnackBar('Please choose Valid ESI Type');
    return false;
  }

  EsiRegionValidation() {
    if (this.EsiFormRegionOptions.find(({ region }) => region === this.EsiFormRegion.value)) {
      return true;
    }
    this.muruganService.openSnackBar('Please choose Valid Region Value');
    return false;
  }

  EsiBranchValidation() {
    if (this.EsiFormBranchOptions.find(({ branchname }) => branchname === this.EsiFormBranch.value)) {
      return true;
    }
    this.muruganService.openSnackBar('Please choose Valid Branch Value');
    return false;
  }

  empcodeValidation(emplyeename, empCode) {
    if (this.EmlpoyeeNameFilter.find(({ empname }) => empname === emplyeename) && this.EmlpoyeeNameFilter.find(({ empcode }) => empcode === empCode)) {
      return true;
    }

    this.muruganService.openSnackBar('Please choose Valid Employee Details');
    return false;
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
