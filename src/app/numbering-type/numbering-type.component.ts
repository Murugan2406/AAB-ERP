/* eslint-disable no-unused-expressions */
/* eslint-disable max-len */
import { FormControl, FormBuilder, Validators } from '@angular/forms';
/* eslint-disable no-plusplus */
/* eslint-disable import/no-unresolved */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
/* eslint-disable no-empty-function */
/* eslint-disable no-useless-constructor */
/* eslint-disable import/prefer-default-export */
import { Component, OnInit } from '@angular/core';
import { SubSink } from 'subsink';
import Swal from 'sweetalert2';
import { Globals } from 'src/app/globals';
import { fromEvent } from 'rxjs';
import { Router } from '@angular/router';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-numbering-type',
  templateUrl: './numbering-type.component.html',
  styleUrls: ['./numbering-type.component.scss'],
})
export class NumberingTypeComponent implements OnInit {
  NumericReport:any = [];

  viewSearch ='';

  showFiller = false;

  NumericForm:any;

  column: any;

  direction: number;

  isDesc: boolean = false;

  classArrTable : any[] = [];

  private subs = new SubSink();

  HeaderList = ['S.No', 'Transaction Type', 'Running Format', 'PreFix-1', 'PreFix-2', 'Sno', 'BrCode str', 'Action'];

  loading = false

  companyList: any[];

  Company = new FormControl('', Validators.required);

  TrnCategory = new FormControl('', Validators.required)

  CampNameListArr: any[];

  RecommandedSNO ;

  runningFormat = '';

  TrnList: any[];

  selectedIndex: number = 0;

  constructor(
private fbuilder: FormBuilder,
private commonService: CommonService,
    public globals: Globals,
    private router: Router,
  ) {
    if (this.globals.gclientServer === 'Client') {
      this.commonService.apiUrl = this.globals.gServerApiUrl;
      this.commonService.reqSendto = 'datareqrachnEight';
    } else {
      this.commonService.apiUrl = this.globals.gApiserver;
      this.commonService.reqSendto = 'datareqrachnEight';
    }
  }

  ngOnInit(): void {
    this.getTrnCate('category');
    if (this.globals.gclientServer === 'Server') {
      this.geCompany();
    }

    const cmpObj = {
      CmpCode: this.globals.gUsrDefultCmpCode,
      StatusRes: 'Success',
      compname: this.globals.gUsrDefultCmpName,
    };
    this.Company.setValue(cmpObj);
    this.shortcuts();
    this.NumericForm = this.fbuilder.group({
      trnType: ['', Validators.required],
      prefix1: ['', Validators.required],
      prefix2: ['', Validators.required],
      sno: ['', Validators.required],
      lockme: ['', Validators.required],
      brcodeStr: ['', Validators.required],
    });
  }

  getTrnCate(type) {
    const api = {
      reqMainreq: 'LoadTrnCategoryDetail',
      Usr: this.globals.gUsrid,
      brcode: this.globals.gBrcode,
      var8: this.globals.gclientServer,
    };
    this.loading = true;
    this.companyList = [];
    this.TrnList = [];
    this.commonService.reqSendto = 'datareqrachnEight';
    this.subs.add(
      this.commonService.sendReqst(api).subscribe({
        next: (response) => {
          if (response.length > 0) {
            if (response[0].StatusRes === 'Success') {
              this.TrnList = response;
              this.TrnCategory.setValue(response[0]);
              this.getTableData();
            } else {
              Swal.fire(response[0].StatusRes);
            }
            this.loading = false;
          }
        },
        error: (error) => {
          this.loading = false;
          Swal.fire({ text: error.message ?? 'Http failure response' });
        },
        complete: () => {},
      }),
    );
  }

  geCompany() {
    const api = {
      reqMainreq: 'LoadCompanyForEmpRoles',
      Usr: this.globals.gUsrid,
      brcode: this.globals.gBrcode,
    };
    this.loading = true;
    this.companyList = [];
    this.TrnList = [];
    this.commonService.reqSendto = 'datareqrachnTen';
    this.subs.add(
      this.commonService.sendReqst(api).subscribe({
        next: (response) => {
          if (response.length > 0) {
            if (response[0].StatusRes === 'Success') {
              this.companyList = response;
              this.CampNameListArr = response;
              this.Company.setValue(response[0]);
            } else {
              Swal.fire(response[0].StatusRes);
            }
            this.loading = false;
          }
        },
        error: (error) => {
          this.loading = false;
          Swal.fire({ text: error.message ?? 'Http failure response' });
        },
        complete: () => {},
      }),
    );
  }

  ItemSelected(event, type) {
    if (event.source.selected && event.isUserInput) {
      setTimeout(() => {
        if (type === 'company') {
          document.getElementById('category')?.focus();
          this.getTableData();
        } else {
          this.getTableData();
        }
      }, 100);
    }
  }

  getTableData() {
    if (this.Company.invalid || typeof this.Company.value !== 'object') {
      Swal.fire({ text: 'Please enter valid Company Name' });
      return;
    }

    if (this.TrnCategory.invalid) {
      Swal.fire({ text: 'Please enter valid Trn Category' });
      return;
    }
    this.loading = true;
    const api = {
      reqMainreq: 'LoadTrnNumberingSeriesDetail',
      Usr: this.globals.gUsrid,
      brcode: this.globals.gBrcode,
      var1: this.Company.value.CmpCode ?? '',
      var2: this.TrnCategory.value.TrnCategory ?? '',
      var8: this.globals.gclientServer,

    };
    this.NumericReport = [];
    this.commonService.reqSendto = 'datareqrachnEight';
    this.subs.add(
      this.commonService.sendReqst(api).subscribe({
        next: (response) => {
          if (response.length > 0) {
            if (response[0].StatusRes === 'Success') {
              this.NumericReport = response;
              for (let i = 0; i < response.length; i++) {
                this.classArrTable[i] = false;
              }
              this.rowClick(this.selectedIndex);
            } else {
              Swal.fire(response[0].StatusRes);
            }
            this.loading = false;
          }
        },
        error: (error) => {
          this.loading = false;
          Swal.fire({ text: error.message ?? 'Http failure response' });
        },
        complete: () => {},
      }),
    );
  }

  keytab(event:any, id) {
    if (event.key === 'Enter') {
      if (event.target.value !== '') {
        setTimeout(() => {
          document.getElementById(id)?.focus();
        }, 100);
      }
    }
  }

  rowEnter(event, data) {
    if (event.key === 'Enter') {
      document.getElementById(data.TrnType)?.click();
    }
  }

  EditRow(data) {
    this.NumericForm = this.fbuilder.group({
      trnType: [data.TrnType, Validators.required],
      prefix1: [data.PreFix1, Validators.required],
      prefix2: [data.PreFix2, Validators.required],
      sno: [data.Sno, Validators.required],
      brcodeStr: [data.brcodeStr, Validators.required],
    });
    this.runningFormat = data.PreFix1 + data.PreFix2 + data.brcodeStr + data.Sno;
    this.getRecNo(data);
  }

  getRecNo(data) {
    this.loading = true;
    const api = {
      reqMainreq: 'GetTrnNumberingSeriesDetail',
      Usr: this.globals.gUsrid,
      brcode: this.globals.gBrcode,
      var1: this.Company.value.CmpCode,
      var2: this.NumericForm.get('trnType').value ?? '',
      var3: this.TrnCategory.value.TrnCategory ?? '',
      var8: this.globals.gclientServer,

    };
    this.RecommandedSNO;
    this.commonService.reqSendto = 'datareqrachnEight';
    this.subs.add(
      this.commonService.sendReqst(api).subscribe({
        next: (response) => {
          this.loading = false;
          if (response.length > 0) {
            if (response[0].StatusRes === 'Success') {
              this.RecommandedSNO = response[0].RecommendedSno;
            } else {
              document.getElementById('close')?.click();
              this.RecommandedSNO = 0;
              Swal.fire({ text: response[0].StatusRes });
            }
          }
        },
        error: (error) => {
          this.loading = false;
          Swal.fire({ text: error.message ?? 'Http failure response' });
        },
        complete: () => {},
      }),
    );
  }

  companyCmp = (option) => (option && option.compname ? option.compname : '');

  filterCmp(keyValue) {
    const key = keyValue.toLocaleUpperCase();
    this.CampNameListArr = this.companyList.filter((option) => option.compname.toLocaleUpperCase().includes(key));
  }

  rowClick(index : number) {
    this.selectedIndex = index;
    for (let i = 0; i < this.NumericReport.length; i++) {
      if (i === index) {
        this.classArrTable[i] = true;
      } else {
        this.classArrTable[i] = false;
      }
    }
  }

  UpdateNumberingType() {
    if (this.NumericForm.valid) {
      if (this.Company.invalid) {
        Swal.fire('Please fill company name');
        return;
      }
      if (typeof this.Company.value !== 'object') {
        Swal.fire('Enter valid company name');
        return;
      }
      this.commonService.taskConfirmation('Are you sure to Update ?', '', true, 'Update', '').then((res) => {
        if (res.isConfirmed) {
          this.loading = true;
          this.updateApiCall();
        }
      });
    } else {
      Swal.fire('Please fill all fields');
    }
  }

  updateApiCall() {
    const api = {
      reqMainreq: 'EditTrnNumberingSeriesDetail',
      Usr: this.globals.gUsrid,
      brcode: this.globals.gBrcode,
      var1: this.Company.value.CmpCode,
      var2: this.NumericForm.value.trnType,
      var3: this.NumericForm.value.prefix1,
      var4: this.NumericForm.value.prefix2,
      var5: this.NumericForm.value.sno,
      var6: this.NumericForm.value.brcodeStr,
      var7: this.TrnCategory.value.TrnCategory ?? '',
      var8: this.globals.gclientServer,
    };
    this.companyList = [];
    this.commonService.reqSendto = 'datareqrachnEight';
    this.subs.add(
      this.commonService.sendReqst(api).subscribe({
        next: (response) => {
          if (response.length > 0) {
            if (response[0].StatusRes === 'Success') {
              Swal.fire({ text: 'Updated Successfully' });
              setTimeout(() => {
                this.getTableData();
              }, 300);
              document.getElementById('close')?.click();
            } else {
              Swal.fire(response[0].StatusRes);
            }
            this.loading = false;
          }
        },
        error: (error) => {
          this.loading = false;
          Swal.fire({ text: error.message ?? 'Http failure response' });
        },
        complete: () => {},
      }),
    );
  }

  sorts(property: any) {
    this.isDesc = !this.isDesc;
    this.column = property;
    this.direction = this.isDesc ? 1 : -1;
  }

  useIt() {
    this.loading = true;
    this.NumericForm.get('sno').setValue(this.RecommandedSNO);
    setTimeout(() => {
      this.loading = false;
    }, 100);
  }

  shortcuts() {
    const keydown$ = fromEvent(window, 'keydown');
    this.subs.add(keydown$.subscribe((event: KeyboardEvent) => {
      if (this.loading) {
        return;
      }
      if (event.altKey && (event.key === 'f' || event.key === 'F')) {
        event.preventDefault();
        document.getElementById('search').focus();

        return;
      }
      if (event.altKey && (event.key === 'x' || event.key === 'X')) {
        event.preventDefault();
        this.router.navigateByUrl('/dashboard');
      }
    }));
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
