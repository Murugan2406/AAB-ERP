/* eslint-disable prefer-destructuring */

/* eslint-disable max-len */
/* eslint-disable no-shadow */
/* eslint-disable no-plusplus */
/* eslint-disable no-sequences */
/* eslint-disable no-empty */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-empty-function */
/* eslint-disable padded-blocks */
/* eslint-disable no-useless-constructor */
/* eslint-disable import/prefer-default-export */
import { formatDate } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { debounceTime, fromEvent } from 'rxjs';
import { Globals } from 'src/app/globals';
import { SubSink } from 'subsink';
import Swal from 'sweetalert2';
import { CommonService } from 'src/app/services/common.service';

import { Router } from '@angular/router';
import {
  trigger, transition, animate, style,
} from '@angular/animations';
import { ItemserviceService } from '../services/itemservice.service';

@Component({
  selector: 'app-customer-sales-report',
  templateUrl: './customer-sales-report.component.html',
  styleUrls: ['./customer-sales-report.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [ // :enter is alias to 'void => *'
        style({ opacity: 0 }),
        animate('500ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        // :leave is alias to '* => void'
        animate('1000ms', style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class CustomerSalesReportComponent implements OnInit {

  showForm = true;

  reportForm: FormGroup;

  post:any;

  private subs = new SubSink();

  Financial: any = [];

  stateslist: any =[];

  company: any = [];

  Branchlocation: any = [];

  stateID = 'ALL';

  patchstate = 'ALL';

 companyID: any;

 regionList: any;

 patchregion = 'ALL';

 regionid: any;

 costid: any;

 Fixedloc: any;

 Fixedloc1: any;

 SelectedLoc: any;

 BRcode = '0';

 patchcompany = 'ADYAR ANANDA BHAVAN';

 patchcostcntr = 'ALL';

 Brname: any;

 brcode: any;

 date = new Date();

 loading = false

 headers:any = ['sno', 'Brcode', 'Brname', 'InvNo', 'Custcode', 'Custname', 'InvDate', 'InvAmt'];

 DataSource = [];

 searchTemp = '';

 footerRow = [];

 CustomerArr = [];

 minDate = new Date(2021, 5, 1);

 maxDate = new Date(2022, 4, 1);

 minHeight = 240;

 column: any;

 direction: number;

 isDesc: boolean = false;

  totalAmount: number =0;

  totalPending: number =0;

  FullReport: any = 0;

  extraAvailable: boolean = false;

  backEndType = ''

  SaleTypeList: any = [];

  reportTypeList:any[]=[]

  tableType: any = 'Credit Sales';

  firstTime: any = true;

  limitData = 1500;

  firstTimeBranch: boolean = true;

  constructor(
private fb: FormBuilder,
public itemservice: ItemserviceService,
    public globals: Globals,
    private commonservice: CommonService,
    private router: Router,
  ) {

    if (this.globals.gclientServer === 'Client') {
      this.itemservice.get_salesrep_URL = `${this.globals.gApiserver}/api/datareqrshTen`;
      this.itemservice.get_URL = `${this.globals.gApiserver}/api/datareqrshTen`;

    } else {
      this.itemservice.get_salesrep_URL = `${this.globals.gServerApiUrl}/api/datareqrshTen`;
      this.itemservice.get_URL = `${this.globals.gServerApiUrl}/api/datareqrshTen`;
    }
    this.backEndType = this.globals.gclientServer;
  }

  ngOnInit(): void {
    const branchname = { brname: 'ALL', brcode: '0' };

    this.reportForm = this.fb.group({
      finyear: ['', Validators.required],
      company: ['', Validators.required],
      state: ['', Validators.required],
      branch: [branchname, Validators.required],
      fromdate: [formatDate(new Date(this.date.getFullYear(), this.date.getMonth(), 1), 'yyyy-MM-dd', 'en'), Validators.required],
      todate: [new Date(), Validators.required],
      customer: [{ Custcode: '0', Custname: 'ALL' }, Validators.required],
      saleType: ['ALL', Validators.required],
      reportType: ['Sundry Debtors Consolidated', Validators.required],
      OmitECom: ['Yes', Validators.required],

    });
    this.initalApicall();
    if (this.globals.gclientServer === 'Client') {
      this.reportForm.get('branch').disable();
    }

  }

  initalApicall() {
    this.getFinancialYear();
    this.statelist();
    this.companylist();
    this.modelChange('');
    this.shortcuts();

    this.getSaletype('Sales');

    this.getSaletype('Purchase');

    setTimeout(() => {
      document.getElementById('finyear')?.focus();
    }, 100);
  }

  toggleVoucherData() {
    this.showForm = !this.showForm;
    if (this.minHeight === 240) {
      this.minHeight = 160;
    } else {
      this.minHeight = 250;
    }

  }

  getFinancialYear() {

    const post:any = {};
    post.reqMainreq = 'Financialyearload';
    post.Usr = this.globals.gUsrid;
    post.var9 = this.globals.gclientServer;
    if (this.globals.gclientServer === 'Client') {
      this.itemservice.get_salesrep_URL = `${this.globals.gApiserver}/api/datareqrshTen`;
      this.itemservice.get_URL = `${this.globals.gApiserver}/api/datareqrshTen`;

    } else {
      this.itemservice.get_salesrep_URL = `${this.globals.gServerApiUrl}/api/datareqrshTen`;
      this.itemservice.get_URL = `${this.globals.gServerApiUrl}/api/datareqrshTen`;
    }
    this.subs.add(
      this.itemservice.getSalesReportAPI(post).subscribe({
        next: (response) => {
          if (response.length > 0) {
            this.Financial = response;
            this.reportForm.get('finyear').setValue(response[0].fyear);
            this.Financialyeardateload();
            // const fromYear = response[0].fyear.split('-');
            // this.minDate = new Date(fromYear[0], 3, 1);
            // this.maxDate = new Date(fromYear[1], 2, 1);
            // this.reportForm.get('fromdate').setValue(formatDate(new Date(fromYear[1], 1, 1), 'yyyy-MM-dd', 'en'));
            // this.reportForm.get('todate').setValue(formatDate(new Date(fromYear[1], 2, 1), 'yyyy-MM-dd', 'en'));

          } else {
            Swal.fire('No data found.');
          }
        },
        error: (error) => {
          Swal.fire({ text: error.message ?? 'Http failure response' });
        },
        complete: () => {},
      }),
    );
  }

  companylist() {
    this.post = {};
    this.post.reqMainreq = 'Companyload'; this.post.Usr = this.globals.gUsrid; this.post.brcode = '0'; this.post.var1 = '0'; this.post.var2 = '0';
    this.post.var3 = '0'; this.post.var4 = '0'; this.post.var5 = '0'; this.post.var6 = '0'; this.post.var7 = '0'; this.post.var8 = '0';
    this.post.var9 = this.globals.gclientServer; this.post.var10 = '0'; this.post.var11 = '0'; this.post.var12 = '0'; this.post.var13 = '0'; this.post.var14 = '0';
    this.post.var15 = '0'; this.post.var16 = '0'; this.post.var17 = '0'; this.post.var18 = '0'; this.post.var19 = '0'; this.post.var20 = '0';
    if (this.globals.gclientServer === 'Client') {
      this.itemservice.get_salesrep_URL = `${this.globals.gApiserver}/api/datareqrshTen`;
      this.itemservice.get_URL = `${this.globals.gApiserver}/api/datareqrshTen`;

    } else {
      this.itemservice.get_salesrep_URL = `${this.globals.gServerApiUrl}/api/datareqrshTen`;
      this.itemservice.get_URL = `${this.globals.gServerApiUrl}/api/datareqrshTen`;
    }
    this.subs.add(this.itemservice.getSalesReportAPI(this.post).subscribe({
      next: (data) => {
        this.company = data;
        if (this.globals.gclientServer === 'Client') {
          this.reportForm.get('company').setValue(data[0].Company);
        } else {
          this.reportForm.get('company').setValue(data[3].Company);
        }
      },
      error: (error) => {
        Swal.fire({ text: error.message ?? 'Http failure response' });
      },
      complete: () => {},
    }));
  }

  getSaletype(type) {
    this.loading = true;
    this.post = {};
    if (type === 'Sales') {
      this.post.reqMainreq = 'SaletypeLoad';
    } else {
      this.post.reqMainreq = 'ReporttypeLoad';
    }

    this.post.Usr = this.globals.gUsrid; this.post.brcode = '0'; this.post.var1 = '0'; this.post.var2 = '0';
    this.post.var3 = '0'; this.post.var4 = '0'; this.post.var5 = '0'; this.post.var6 = '0'; this.post.var7 = '0'; this.post.var8 = '0';
    this.post.var9 = this.globals.gclientServer; this.post.var10 = '0'; this.post.var11 = '0'; this.post.var12 = '0'; this.post.var13 = '0'; this.post.var14 = '0';
    this.post.var15 = '0'; this.post.var16 = '0'; this.post.var17 = '0'; this.post.var18 = '0'; this.post.var19 = '0'; this.post.var20 = '0';
    if (this.globals.gclientServer === 'Client') {
      this.itemservice.get_salesrep_URL = `${this.globals.gApiserver}/api/datareqrshTen`;
      this.itemservice.get_URL = `${this.globals.gApiserver}/api/datareqrshTen`;

    } else {
      this.itemservice.get_salesrep_URL = `${this.globals.gServerApiUrl}/api/datareqrshTen`;
      this.itemservice.get_URL = `${this.globals.gServerApiUrl}/api/datareqrshTen`;
    }
    this.subs.add(this.itemservice.getSalesReportAPI(this.post).subscribe({
      next: (data) => {
        this.loading = false;
        if (type === 'Sales') {
          this.SaleTypeList = data;
        } else {
          this.reportTypeList = data;
        }
      },
      error: (error) => {
        this.loading = false;
        Swal.fire({ text: 'Http failure response' });
      },
      complete: () => {},
    }));
  }

  statelist() {
    this.post = {};
    this.post.reqMainreq = 'Stateload';
    this.post.Usr = this.globals.gUsrid; this.post.brcode = '0'; this.post.var1 = '0'; this.post.var2 = '0'; this.post.var3 = '0';
    this.post.var4 = '0'; this.post.var5 = '0'; this.post.var6 = '0'; this.post.var7 = '0'; this.post.var8 = '0'; this.post.var9 = this.globals.gclientServer;
    this.post.var10 = '0'; this.post.var11 = '0'; this.post.var12 = '0'; this.post.var13 = '0'; this.post.var14 = '0'; this.post.var15 = '0';
    this.post.var16 = '0'; this.post.var17 = '0'; this.post.var18 = '0'; this.post.var19 = '0'; this.post.var20 = '0';
    if (this.globals.gclientServer === 'Client') {
      this.itemservice.get_salesrep_URL = `${this.globals.gApiserver}/api/datareqrshTen`;
      this.itemservice.get_URL = `${this.globals.gApiserver}/api/datareqrshTen`;

    } else {
      this.itemservice.get_salesrep_URL = `${this.globals.gServerApiUrl}/api/datareqrshTen`;
      this.itemservice.get_URL = `${this.globals.gServerApiUrl}/api/datareqrshTen`;
    }
    this.subs.add(this.itemservice.getSalesReportAPI(this.post).subscribe({
      next: (data) => {
        this.stateslist = data;
        this.reportForm.get('state').setValue(data[0].State);
      // this.loadbranchList();
      },
      error: (error) => {
        this.loading = false;
        Swal.fire({ text: 'Http failure response' });
      },
      complete: () => {},
    }));
  }

  loadbranchList() {

    this.post = {
      Usr: this.globals.gUsrid,
      brcode: this.globals.gBrcode,
      reqMainreq: 'BranchSelection',
      var1: '',
      var2: '0',
      var3: this.reportForm.get('company').value,
      var4: this.reportForm.get('state').value,
      var5: 'ALL',
      var6: 'ALL',
      var7: '0',
      var8: '0',
      var9: this.globals.gclientServer,
      var10: '0',
      var11: '0',
      var12: '0',
      var13: '0',
      var14: '0',
      var15: '0',
      var16: '0',
      var17: '0',
      var18: '0',
      var19: '0',
      var20: '0',
    };
    this.Branchlocation = [];
    if (this.globals.gclientServer === 'Client') {
      this.itemservice.get_salesrep_URL = `${this.globals.gApiserver}/api/datareqrshTen`;
      this.itemservice.get_URL = `${this.globals.gApiserver}/api/datareqrshTen`;

    } else {
      this.itemservice.get_salesrep_URL = `${this.globals.gServerApiUrl}/api/datareqrshTen`;
      this.itemservice.get_URL = `${this.globals.gServerApiUrl}/api/datareqrshTen`;
    }
    this.subs.add(this.itemservice.getItemMovement(this.post).subscribe({
      next: (data) => {
        this.Branchlocation = data;
      },
      error: (error) => {
        this.loading = false;
        Swal.fire({ text: 'Http failure response' });
      },
      complete: () => {},
    }));
  }

  keytab(e: any, id: any): void {
    if (e.key === 'Enter') {
      if (e.target.value === '') {
      } else {
        setTimeout(() => {
          document.getElementById(id)?.focus();
        }, 100);
      }
    }
  }

  keytabDate(e: any, id: any, type): void {
    if (e.key === 'Enter') {
      if (e.target.value === '') {
      } else {
        setTimeout(() => {
          if (type === 'From') {
            if (this.reportForm.get('fromdate').invalid) {
              Swal.fire({ text: 'Please enter valid from date' });
            } else {
              document.getElementById(id)?.focus();
            }
          } else if (type === 'To') {
            if (this.reportForm.get('fromdate').invalid) {
              Swal.fire({ text: 'Please enter valid to date' });
            } else {
              document.getElementById(id)?.focus();
            }

          }

        }, 100);
      }
    }
  }

  Fyearchange(event, value: any) {
    if (event.isUserInput && event.source.selected) {
      setTimeout(() => {
        this.Financialyeardateload();
        if (this.globals.gclientServer === 'Client') {
          document.getElementById('fromdate')?.focus();
        } else {
          document.getElementById('company')?.focus();
        }

      }, 100);
    }

  }

  companychange(event, id: any) {
    if (!event.isUserInput || !event.source.selected) {
      return;
    }
    this.companyID = id;
    this.post = {};
    this.post.var1 = id; this.post.reqMainreq = 'Sel_Change_Cmp_State'; this.post.Usr = this.globals.gUsrid; this.post.brcode = '0'; this.post.var1 = id; this.post.var2 = '0'; this.post.var3 = '0'; this.post.var5 = '0';
    this.post.var6 = '0'; this.post.var7 = '0'; this.post.var8 = '0'; this.post.var9 = this.globals.gclientServer; this.post.var10 = '0'; this.post.var11 = '0'; this.post.var12 = '0'; this.post.var13 = '0'; this.post.var14 = '0';
    this.post.var15 = '0'; this.post.var16 = '0'; this.post.var17 = '0'; this.post.var18 = '0'; this.post.var19 = '0';
    this.post.var20 = '0';
    if (this.globals.gclientServer === 'Client') {
      this.itemservice.get_salesrep_URL = `${this.globals.gApiserver}/api/datareqrshTen`;
      this.itemservice.get_URL = `${this.globals.gApiserver}/api/datareqrshTen`;

    } else {
      this.itemservice.get_salesrep_URL = `${this.globals.gServerApiUrl}/api/datareqsarnTwo`;
      this.itemservice.get_URL = `${this.globals.gServerApiUrl}/api/datareqsarnTwo`;
    }
    this.subs.add(this.itemservice.getItemMovement(this.post).subscribe({
      next: (data) => {
        this.stateslist = data;
        this.patchstate = 'ALL';
        this.reportForm.get('branch').setValue({ brname: 'ALL', brcode: '0' });
        document.getElementById('state')?.focus();
      },
      error: (error) => {
        this.loading = false;
        Swal.fire({ text: 'Http failure response' });
      },
      complete: () => {},
    }));
    this.post = {};
    if (this.stateID === undefined || this.stateID === '') {
      this.post.var4 = 'ALL';
    } else {
      this.post.var4 = this.stateID;
    }
    if (this.regionid === undefined || this.regionid === '') {
      this.post.var5 = 'ALL';
    } else {
      this.post.var5 = this.regionid;
    }
    if (this.costid === undefined) {
      this.post.var6 = 'ALL';
    } else {
      this.post.var6 = this.costid;
    }
    this.post.reqMainreq = 'BranchSelection'; this.post.Usr = this.globals.gUsrid; this.post.brcode = '0'; this.post.var1 = '';
    this.post.var2 = '0'; this.post.var3 = id; this.post.var7 = '0'; this.post.var8 = '0'; this.post.var9 = this.globals.gclientServer; this.post.var10 = '0'; this.post.var11 = '0';
    this.post.var12 = '0'; this.post.var13 = '0'; this.post.var14 = '0'; this.post.var15 = '0'; this.post.var16 = '0'; this.post.var17 = '0'; this.post.var18 = '0'; this.post.var19 = '0';
    this.post.var20 = '0';
    this.Branchlocation = [];
    if (this.globals.gclientServer === 'Client') {
      this.itemservice.get_salesrep_URL = `${this.globals.gApiserver}/api/datareqrshTen`;
      this.itemservice.get_URL = `${this.globals.gApiserver}/api/datareqrshTen`;

    } else {
      this.itemservice.get_salesrep_URL = `${this.globals.gServerApiUrl}/api/datareqrshTen`;
      this.itemservice.get_URL = `${this.globals.gServerApiUrl}/api/datareqrshTen`;
    }
    this.subs.add(this.itemservice.getItemMovement(this.post).subscribe({
      next: (data) => {
        this.Branchlocation = data;
        this.Fixedloc = [];
        for (let index = 0; index < this.Branchlocation?.length; index++) {
          const element = this.Branchlocation[index];
          this.Fixedloc.push(element);
          this.regionid = '';
          this.stateID = '';
        }
      },
      error: (error) => {
        this.loading = false;
        Swal.fire({ text: 'Http failure response' });
      },
      complete: () => {},
    }));
  }

  statechange(event, state: any) {
    if (event.isUserInput) {
      setTimeout(() => {
        document.getElementById('branch').focus();
      }, 100);
    }

  }

  changeloc(evt: any, brcode: any) {
    if (evt.source.selected) {
      this.SelectedLoc = evt.source.value;
      this.BRcode = brcode;
      setTimeout(() => {

        document.getElementById('fromdate').focus();
      }, 100);
    }
  }

  modelChange(data) {

    this.post = {};
    this.post.reqMainreq = 'Branchload';
    this.post.Usr = this.globals.gUsrid;
    this.post.brcode = '0';
    this.post.var1 = this.reportForm.get('company').value;
    this.post.var2 = this.reportForm.get('state').value;
    this.post.var3 = 'ALL';
    this.post.var4 = data;
    this.post.var9 = this.globals.gclientServer;
    this.Brname = data;

    if (this.globals.gclientServer === 'Client') {
      this.itemservice.get_salesrep_URL = `${this.globals.gApiserver}/api/datareqrshTen`;
      this.itemservice.get_URL = `${this.globals.gApiserver}/api/datareqrshTen`;

    } else {
      this.itemservice.get_salesrep_URL = `${this.globals.gServerApiUrl}/api/datareqrshTen`;
      this.itemservice.get_URL = `${this.globals.gServerApiUrl}/api/datareqrshTen`;
    }
    this.subs.add(this.itemservice.getSalesReportAPI(this.post).subscribe({
      next: (data) => {
        this.Branchlocation = data;
        if (this.globals.gclientServer === 'Client' && this.firstTimeBranch) {
          this.firstTimeBranch = false;
          this.reportForm.get('branch').setValue(data[0]);
        }
        for (let index = 0; index < data.length; index++) {
          const element = data[index];
          if (this.Brname === element.brname) {
            this.brcode = element.brcode;
          }
        }
      },
      error: (error) => {
        this.loading = false;
        Swal.fire({ text: 'Http failure response' });
      },
      complete: () => {},
    }));

  }

  getCustomername(keyValue) {
    const post:any = {};
    post.reqMainreq = 'CustomerLoad';
    post.Usr = this.globals.gUsrid;
    post.brcode = this.reportForm.get('branch').value.brcode;
    post.var1 = this.reportForm.get('company').value;
    post.var2 = this.reportForm.get('state').value;
    post.var3 = 'ALL';
    post.var7 = formatDate(this.reportForm.get('fromdate').value, 'dd-MM-yyyy', 'en');
    post.var8 = formatDate(this.reportForm.get('todate').value, 'dd-MM-yyyy', 'en');
    post.var9 = this.globals.gclientServer;
    post.var20 = keyValue;
    if (this.globals.gclientServer === 'Client') {
      this.itemservice.get_salesrep_URL = `${this.globals.gApiserver}/api/datareqrshTen`;
      this.itemservice.get_URL = `${this.globals.gApiserver}/api/datareqrshTen`;

    } else {
      this.itemservice.get_salesrep_URL = `${this.globals.gServerApiUrl}/api/datareqrshTen`;
      this.itemservice.get_URL = `${this.globals.gServerApiUrl}/api/datareqrshTen`;
    }
    this.subs.add(
      this.itemservice.getSalesReportAPI(post).subscribe({
        next: (response) => {
          if (response.length > 0) {
            this.CustomerArr = response.splice(0, 200);
          } else {
            Swal.fire('No data found.');
          }
        },
        error: (error) => {
          Swal.fire({ text: error.message ?? 'Http failure response' });
        },
        complete: () => {},
      }),
    );
  }

  displayFn(user): string {
    return user && user.Custname ? user.Custname : '';
  }

  displaybr(user): string {
    return user && user.brname ? user.brname : '';
  }

  customerChoosen(event, customer) {
    if (event.source.selected && event.isUserInput) {
      setTimeout(() => {
        document.getElementById('saleTtype')?.focus();
        this.CustomerArr = [];

      }, 100);
    }

  }

  saleTypeChange(event, id) {
    if (event.source.selected && event.isUserInput) {
      setTimeout(() => {
        document.getElementById(id)?.focus();

      }, 100);

    }
  }

  getReport() {

    if (this.reportForm.get('fromdate').invalid) {
      Swal.fire('From date not match with finyear');
      return;

    }
    if (this.reportForm.get('todate').invalid) {
      Swal.fire('To date not match with finyear');
      return;

    }
    if (this.reportForm.invalid) {
      Swal.fire('Please fill all fields');
      return;
    }

    if (typeof this.reportForm.get('branch').value !== 'object') {
      Swal.fire('Please enter valid branch name');
      return;
    }

    if (typeof this.reportForm.get('customer').value !== 'object') {
      Swal.fire('Please enter valid customer name');
      return;
    }
    const date1:any = new Date(this.reportForm.get('fromdate').value);
    const date2:any = new Date(this.reportForm.get('todate').value);
    const diffTime:any = Math.abs(date2 - date1);
    const diffDays:any = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays > 31) {
      this.commonservice.taskConfirmation('Do you want to continue to load huge volume of data ?', '', true, 'Yes', '').then((res) => {
        if (res.isConfirmed) {
          this.finalReportCall();
        }
      });

    } else {
      this.finalReportCall();
    }
  }

  finalReportCall() {
    this.loading = true;
    const post:any = {};
    post.reqMainreq = this.reportForm.get('reportType').value;
    post.Usr = this.globals.gUsrid;
    post.brcode = this.reportForm.get('branch').value.brcode;
    post.var1 = this.reportForm.get('company').value;
    post.var2 = this.reportForm.get('state').value;
    post.var3 = 'ALL';
    post.var4 = this.reportForm.get('customer').value.Custcode;
    post.var5 = this.reportForm.get('saleType').value;
    post.var7 = formatDate(this.reportForm.get('fromdate').value, 'dd-MM-yyyy', 'en');
    post.var8 = formatDate(this.reportForm.get('todate').value, 'dd-MM-yyyy', 'en');
    post.var9 = this.globals.gclientServer;
    post.var11 = this.reportForm.get('OmitECom').value;

    this.DataSource = [];
    this.FullReport = [];
    this.extraAvailable = false;
    this.tableType = this.reportForm.get('reportType').value;

    this.totalAmount = 0;
    this.totalPending = 0;
    if (this.globals.gclientServer === 'Client') {
      this.itemservice.get_salesrep_URL = `${this.globals.gApiserver}/api/datareqrshTen`;
      this.itemservice.get_URL = `${this.globals.gApiserver}/api/datareqrshTen`;

    } else {
      this.itemservice.get_salesrep_URL = `${this.globals.gServerApiUrl}/api/datareqrshTen`;
      this.itemservice.get_URL = `${this.globals.gServerApiUrl}/api/datareqrshTen`;
    }
    this.subs.add(
      this.itemservice.getSalesReportAPI(post).subscribe({
        next: (response) => {
          if (response.length > 0) {
            this.FullReport = [...response];
            const record = [...response];
            this.extraAvailable = true;
            if (this.reportForm.get('reportType').value === 'Credit Sales') {
              response.forEach((element) => {
                this.totalAmount = element.InvAmt + this.totalAmount;
              });
            } else if (this.reportForm.get('reportType').value === 'Sundry Debtors Consolidated') {
              response.forEach((element) => {
                this.totalAmount = element.Pendingamt + this.totalAmount;
              });
            } else {
              response.forEach((element) => {
                this.totalAmount = element.InvAmt + this.totalAmount;
                this.totalPending = element.Pendingamt + this.totalPending;

              });
            }

            this.DataSource = record.splice(0, this.limitData);
            this.loading = false;

          } else {
            this.DataSource = [];
            this.loading = false;
            this.extraAvailable = false;

            Swal.fire('No data found.');
          }
        },
        error: (error) => {
          this.loading = false;
          this.extraAvailable = false;

          Swal.fire({ text: error.message ?? 'Http failure response' });
        },
        complete: () => {
          this.loading = false;
        },
      }),
    );
  }

  downloadXl(data) {
    if (data.length > 0) {
      this.commonservice.exportAsExcelFile(data, `${this.reportForm.get('reportType').value}Report`);
    } else {
      Swal.fire({ text: 'No data found' });
    }

  }

  shortcuts() {
    const keydown$ = fromEvent(window, 'keydown');
    this.subs.add(keydown$.subscribe((event: KeyboardEvent) => {
      if (event.altKey && (event.key === 'V' || event.key === 'v')) {
        event.preventDefault();
        this.getReport();
      }
      if (event.altKey && (event.key === 'd' || event.key === 'D')) {
        event.preventDefault();
        this.downloadXl(this.DataSource);
      }
      if (event.altKey && (event.key === 'x' || event.key === 'X')) {
        event.preventDefault();
        this.router.navigate(['/dashboard']);
      }
    }));
  }

  sorts(property: any) {
    this.isDesc = !this.isDesc;
    this.column = property;
    this.direction = this.isDesc ? 1 : -1;
  }

  onTableScroll(length) {
    this.loading = true;
    const arr1 = [...this.FullReport];
    const extra = arr1.splice(length, this.limitData);
    if (extra.length > 0) {

      extra.forEach((element) => {
        this.DataSource.push(element);
      });
      if (this.DataSource.length === this.FullReport.length) {
        this.extraAvailable = false;
      } else {
        this.extraAvailable = true;
      }
    } else {
      this.extraAvailable = false;
    }

    this.loading = false;
  }

  onTableScrollAll(length) {
    this.loading = true;
    this.DataSource = [...this.FullReport];
    // const extra = arr1.splice(length, 1500);
    // if (extra.length > 0) {

    //   extra.forEach((element) => {
    //     this.DataSource.push(element);
    //   });
    //   if (this.DataSource.length === this.FullReport.length) {
    //     this.extraAvailable = false;
    //   } else {
    //     this.extraAvailable = true;
    //   }
    // } else {
    //   this.extraAvailable = false;
    // }

    this.loading = false;
  }

  getCurrentTotal(data) {
    let subtotal = 0;
    data.forEach((element) => {
      subtotal = element.InvAmt + subtotal;
    });
    return subtotal.toFixed(2);
  }

  getpendtingotal(data) {
    let subtotal = 0;
    data.forEach((element) => {
      subtotal = element.Pendingamt + subtotal;
    });
    return subtotal.toFixed(2);
  }

  Financialyeardateload() {

    const post:any = {};
    post.reqMainreq = 'Financialyeardateload';
    post.Usr = this.globals.gUsrid;
    post.brcode = this.reportForm.get('branch').value.brcode;
    post.var1 = this.reportForm.get('finyear').value;

    if (this.globals.gclientServer === 'Client') {
      this.itemservice.get_salesrep_URL = `${this.globals.gApiserver}/api/datareqrshTen`;
      this.itemservice.get_URL = `${this.globals.gApiserver}/api/datareqrshTen`;

    } else {
      this.itemservice.get_salesrep_URL = `${this.globals.gServerApiUrl}/api/datareqrshTen`;
      this.itemservice.get_URL = `${this.globals.gServerApiUrl}/api/datareqrshTen`;
    }
    this.subs.add(
      this.itemservice.getSalesReportAPI(post).subscribe({
        next: (response) => {
          if (response?.length > 0) {
            this.minDate = new Date(response[0].fdate);
            this.maxDate = new Date(response[0].tdate);
            // this.reportForm.get('fromdate').setValue(formatDate(new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate() - 1), 'yyyy-MM-dd', 'en'));
            // this.reportForm.get('todate').setValue(formatDate(new Date(), 'yyyy-MM-dd', 'en'));
            this.reportForm.get('fromdate').setValue(formatDate(new Date(response[0].fdate), 'yyyy-MM-dd', 'en'));
            this.reportForm.get('todate').setValue(formatDate(new Date(response[0].tdate), 'yyyy-MM-dd', 'en'));

            if (this.globals.gclientServer === 'Client' && this.firstTime) {
              this.firstTime = false;
              setTimeout(() => {
                this.getReport();
              }, 100);
            }
          } else {
            Swal.fire('No finyear found.');
          }
        },
        error: (error) => {
          Swal.fire({ text: error.message ?? 'Http failure response' });
        },
        complete: () => {},
      }),
    );
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
