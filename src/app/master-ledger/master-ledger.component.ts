/* eslint-disable no-mixed-operators */
/* eslint-disable no-shadow */
/* eslint-disable no-tabs */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-unreachable */
import { SubSink } from 'subsink';
/* eslint-disable no-alert */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-useless-return */
/* eslint-disable no-restricted-globals */
/* eslint-disable max-len */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-param-reassign */
/* eslint-disable no-undef */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-empty-function */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-useless-constructor */
/* eslint-disable padded-blocks */
/* eslint-disable import/prefer-default-export */
import {
  Component, HostListener, Input, OnInit, ViewChild,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Globals } from 'src/app/globals';
import { CommonService } from 'src/app/services/common.service';
import { firstValueFrom, fromEvent } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { Clipboard } from '@angular/cdk/clipboard';
import { MatTableDataSource } from '@angular/material/table';
import { MatSidenav } from '@angular/material/sidenav';
import {
  animate, group, query, style, transition, trigger,
} from '@angular/animations';
import { MatSort } from '@angular/material/sort';
import { Chart } from 'chart.js';
import { AccServiceService } from '../services/acc-service.service';

const left = [
  query(':enter, :leave', style({ position: 'fixed', width: '100%' }), { optional: true }),
  group([
    query(':enter', [style({ transform: 'translateX(-100%)' }), animate('0.3s ease-out', style({ transform: 'translateX(-25%)' }))], {
      optional: true,
    }),
    query(':leave', [style({ transform: 'translateX(0%)' }), animate('0.3s ease-out', style({ transform: 'translateX(100%)' }))], {
      optional: true,
    }),
  ]),
];

const right = [
  query(':enter, :leave', style({ position: 'fixed', width: '100%' }), { optional: true }),
  group([
    query(':enter', [style({ transform: 'translateX(100%)' }), animate('0s ease-out', style({ transform: 'translateX(0%)' }))], {
      optional: true,
    }),
    query(':leave', [style({ transform: 'translateX(0%)' }), animate('0s ease-out', style({ transform: 'translateX(-100%)' }))], {
      optional: true,
    }),
  ]),
];

@Component({
  selector: 'app-master-ledger',
  templateUrl: './master-ledger.component.html',
  styleUrls: ['./master-ledger.component.scss'],
  animations: [
    trigger('animImageSlider', [
      transition(':enter', left),
      transition(':leave', right),
    ]),
    trigger('animImageSlider1', [
      transition(':enter', right),
      transition(':leave', left),
    ]),
  ],
})
export class MasterLedgerComponent implements OnInit {
  subs = new SubSink()

  gmenu: any = '';

  DebtorForm: any;

  loading :boolean = false;

  fYear:any[] = [];

  stateLoad :any[]=[];

  CampNameList = [];

  FinBookList = [];

  ledgerNameArr = [];

  FinYearList = [];

  voucherInformation: any = true;

  public sidebarShow: boolean = true;

  showFiller = true;

  prevOpBal = 0

  prevCrTotal = 0

  prevDrTotal = 0

  prevClBal = 0

  CurrencyArr = ['BillAmt', 'Receivables']

  datasourceOne = new MatTableDataSource([]);

  datasourceDetailed = new MatTableDataSource([]);

  datasourceConsolidated = new MatTableDataSource([]);

  searchTempOne ='';

  searchTempTwo ='';

  searchTempThree ='';

  innerWidth: any;

  sidebarMode = 'side';

  pipe: DatePipe = new DatePipe('en-US');

  @ViewChild('drawer') drawer: MatSidenav;

  sideNavOpen = true;

  NormalTable = true

  httpOptions = {
    headers: new HttpHeaders({
      'x-api-key': this.global.TmpCdeFedG,
      'content-type': 'application/json',
    }),
  };

  ledgerType = ['General Ledger', 'Debtors Ledger', 'Creditor Ledger'];

  Option1Arr = ['Monthly', 'Consolidated'];

  Option1Normal = ['Monthly', 'Consolidated'];

  Option1Detailed = ['Monthly', 'Consolidated', 'Detailed'];

  Option2Arr = ['ClosingBalance', 'OP|DR|CR|CL']

  monthlyColumn = ['SNo', 'MonthsName', 'YearsName', 'View', 'DrAmt', 'CrAmt', 'Balance'];

  monthlyColumnOne = ['a', 'b', 'c', 'd', 'e', 'f', 'g']

  hide: boolean = true;

  formList: any;

  CampNameListAll: any = [];

  detailedColumn: any = ['SNo', 'AcDate', 'Narration', 'TrnType', 'DrAmt', 'CrAmt'];

  MonthlySecFooter: any = ['a', 'b', 'c', 'd', 'e', 'f'];

  consolidatedColumn = ['SNo', 'AcCode', 'AcName', 'View', 'DrAmt', 'CrAmt'];

  consolidatedSecFooter = ['a', 'b', 'c', 'd', 'e', 'f'];

  DisplayedOption1Arr: string[] = [];

  DisplayedOption2Arr: string[] = [];

  DetailedStartDate: string = '';

  DetailedEndDate: string = '';

  tableType:String = 'Monthly'

  DisplayedFinyear: any[] = [];

  selectedRowIndex = 0;

  initaialSelectedRow: any;

  consolidatedActiveRow: number;

  monthlyActiveRow: number;

  detailedActiveRow: number;

  debitArr: any[];

  creditArr: any[];

  CreditTotal: any = 0;

  DebitTotal: any = 0;

  OpeningBalance:any = 0;

  closingBalance:any = 0

  previousfinyearIndex: any = 0;

  @ViewChild(MatSort) set matSort(sort: MatSort) {
    this.datasourceDetailed.sort = sort;
    // this.datasourceOne.sort = sort;
    this.datasourceConsolidated.sort = sort;
  }

  constructor(
    private global: Globals,
    private router: Router,
    public dialog: MatDialog,
    private fbuilder: FormBuilder,
    private commonservice: CommonService,
    private accService: AccServiceService,
    private http: HttpClient,
    private clipboard: Clipboard,
  ) {
    // Chart.register(...registerables);
  }

  ngOnInit() {

    this.loading = false;
    this.innerWidth = window.innerWidth;
    if (this.innerWidth <= 1000) {
      this.sidebarMode = 'over';
    } else {
      this.sidebarMode = 'side';
    }

    this.formInialization();
    this.loadFinYear();
    this.shortcuts();
    this.tableType = 'Monthly';

  }

  public chart: any;

  chartConfig(debitArr, CreditArr) {
    const canvas = document.getElementById('myChart') as unknown as HTMLCanvasElement;
    const DATA_COUNT = 7;
    const NUMBER_CFG = { count: DATA_COUNT, min: -100, max: 100 };
    this.chart = new Chart(canvas, {
      type: 'line',

      data: {
        labels: ['Apr', 'May', 'June', 'July',
          'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'March'],
        datasets: [
          {
            label: 'Debit',
            data: debitArr,
            borderWidth: 3,
            borderColor: '#ff6384',
            backgroundColor: '#ffb1c1',

            barPercentage: 1.1,
            barThickness: 'flex',
            maxBarThickness: 30,
          },
          {
            label: 'Credit',
            data: CreditArr,
            borderWidth: 3,
            borderColor: '#36a2eb',
            backgroundColor: '#9ad0f5',
            barPercentage: 1.1,
            barThickness: 'flex',
            maxBarThickness: 30,
          },
        ],
      },
      options: {

        responsive: false,
        animation: {
          // tension: {
          duration: 1000,
          easing: 'linear',
          // },
        },

        layout: {
          padding: 10,
        },
        legend: {
          labels: {

            fontSize: 10,
            fontFamily: 'system-ui',

            fontColor: 'black',

          },
        },

      },

    });
    this.chart.update();

  }

  async formInialization() {

    const fbObj = {
      FbCode: this.global.gUsrDefultFbCode,
      FbName: this.global.gUsrDefultFbName,
    };

    const cmpObj = {
      CmpCode: this.global.gUsrDefultCmpCode,
      StatusResponse: 'Success',
      company: this.global.gUsrDefultCmpName,
    };

    const ledgerObj = {
      AcCodeName: 'ALL',
      StatusResponse: 'Success',
      accCode: '0',
      accName: 'ALL',
    };

    const date = new Date();

    this.DebtorForm = this.fbuilder.group({
      LedgerType: ['General Ledger', Validators.required],
      FinYear: ['', Validators.required],
      Company: [cmpObj, Validators.required],
      Finbook: [fbObj, Validators.required],
      ledgername: [ledgerObj, Validators.required],
      fromDate: [new Date(), Validators.required],
      toDate: [new Date(), Validators.required],
      RptOpt1: ['Monthly', Validators.required],
      RptOpt2: ['ClosingBalance', Validators.required],
    });

    this.tableType = this.DebtorForm.get('RptOpt1').value;
    this.CampNameListAll = await this.accService.getCompany();
    this.CampNameListAll.forEach((element) => {
      if (element.CmpCode === this.global.gUsrDefultCmpCode) {
        this.DebtorForm.get('Company').setValue(element);
      }
    });
    setTimeout(() => {
      document.getElementById('brFB')?.focus();
    }, 100);
  }

  async loadPreviousMonthly(prevdr, prevcr, prevOp, prevCl) {

    const currYear = this.DebtorForm.get('FinYear').value;

    const prevyear = this.FinYearList[this.previousfinyearIndex];
    // prevyear ? prevyear.fyear :
    const Api = {
      reqMainreq: 'GeneralLedger',
      RptType: this.DebtorForm.get('RptOpt1').value,
      fdate: this.pipe.transform(this.DebtorForm.get('fromDate').value, 'dd-MMM-yy'),
      tdate: this.pipe.transform(this.DebtorForm.get('toDate').value, 'dd-MMM-yy'),
      CmpCode: this.DebtorForm.get('Company').value.CmpCode,
      FbCode: this.DebtorForm.get('Finbook').value.FbCode,
      AcCode: this.DebtorForm.get('ledgername').value.accCode,
      username: this.global.gUsrid,
      type: this.DebtorForm.get('RptOpt1').value,
      type2: this.DebtorForm.get('RptOpt2').value,
      FYear: prevyear ? prevyear.fyear : this.DebtorForm.get('FinYear').value,
      Var2: '',
      Var3: '',
      Var4: '',
      Var5: '',
      Var6: '',
    };
    this.prevOpBal = 0;
    this.prevCrTotal = 0;
    this.prevDrTotal = 0;
    this.prevClBal = 0;

    await firstValueFrom(this.http.post<any>(`${this.global.gApiserver}/api/accountsGL2`, Api, this.httpOptions)).then((data) => {

      if (data.length > 0) {

        const drTotal = data[0].DrTotal;
        const crTotal = data[0].CrTotal;
        const openBal = data[0].CrAmt;
        let closeBal = data[0].CrAmt;
        if (data[1]?.DrTotal > data[1]?.CrTotal) {
          const diff = data[1].DrTotal - data[1].CrTotal;
          closeBal = diff;
        } else {
          const diff = data[1].CrTotal - data[1].DrTotal;
          closeBal = diff;
        }
        const prevOpBal = ((prevOp - openBal) / openBal * 100);
        const prevCrTotal = ((prevcr - crTotal) / crTotal * 100);
        const prevDrTotal = ((prevdr - drTotal) / drTotal * 100);
        const prevClBal = ((prevCl - closeBal) / closeBal * 100);

        this.prevOpBal = Number(prevOpBal.toFixed(2)) ?? 0;
        this.prevCrTotal = Number(prevCrTotal.toFixed(2)) ?? 0;
        this.prevDrTotal = Number(prevDrTotal.toFixed(2)) ?? 0;
        this.prevClBal = Number(prevClBal.toFixed(2)) ?? 0;
        isNaN(this.prevOpBal) ? this.prevOpBal = 0 : this.prevOpBal;
        isNaN(this.prevCrTotal) ? this.prevCrTotal = 0 : this.prevCrTotal;
        isNaN(this.prevDrTotal) ? this.prevDrTotal = 0 : this.prevDrTotal;
        isNaN(this.prevClBal) ? this.prevClBal = 0 : this.prevClBal;

      }
    });

  }

  async FormSubmit() {
    if (this.loading === true) {
      return;
    }
    if (this.DebtorForm.get('RptOpt1').value.accCode !== 'Consolidated') {
      this.DebtorForm.controls.RptOpt2.removeValidators(Validators.required);
      this.DebtorForm.controls.RptOpt2.updateValueAndValidity();
    } else {
      this.DebtorForm.controls.RptOpt2.addValidators(Validators.required);
      this.DebtorForm.controls.RptOpt2.updateValueAndValidity();
    }
    if (this.DebtorForm.valid) {
      const formValue = this.DebtorForm.value;
      if (!this.ledgerType.includes(formValue.LedgerType)) {
        this.commonservice.openSnackbar('Invalid Ledger Type', 'Ok', 1500);
        return;
      }
      if (this.commonservice.checkTypeValitity(this.DebtorForm.get('Company').value, 'Company')
      && this.commonservice.checkTypeValitity(this.DebtorForm.get('Finbook').value, 'Finbook')
      && this.commonservice.checkTypeValitity(this.DebtorForm.get('ledgername').value, 'Ledger name')) {

        if (!this.Option1Arr.includes(formValue.RptOpt1)) {
          this.commonservice.openSnackbar('Invalid Report Option 1 Value', 'Ok', 1500);
          return;
        }
        if (this.DebtorForm.get('RptOpt1').value === 'Consolidated' && !this.Option2Arr.includes(formValue.RptOpt2)) {
          this.commonservice.openSnackbar('Invalid Report Option 2 Value', 'Ok', 1500);
          return;
        }
        this.loading = true;
        let RptType1 = ' ';
        if (this.DebtorForm.get('RptOpt1').value === 'Detailed') {
          RptType1 = 'Detailed';
        } else {
          RptType1 = 'GeneralLedger';
        }
        const Api = {
          reqMainreq: 'GeneralLedger',
          RptType: this.DebtorForm.get('RptOpt1').value,
          fdate: this.pipe.transform(this.DebtorForm.get('fromDate').value, 'dd-MMM-yy'),
          tdate: this.pipe.transform(this.DebtorForm.get('toDate').value, 'dd-MMM-yy'),
          CmpCode: this.DebtorForm.get('Company').value.CmpCode,
          FbCode: this.DebtorForm.get('Finbook').value.FbCode,
          AcCode: this.DebtorForm.get('ledgername').value.accCode,
          username: this.global.gUsrid,
          type: this.DebtorForm.get('RptOpt1').value,
          type2: this.DebtorForm.get('RptOpt2').value,
          FYear: this.DebtorForm.get('FinYear').value,
          Var2: '',
          Var3: '',
          Var4: '',
          Var5: '',
          Var6: '',
        };
        if (this.DebtorForm.get('RptOpt1').value === 'Monthly') {
          this.datasourceOne = new MatTableDataSource([]);

        } else if (this.DebtorForm.get('RptOpt1').value === 'Detailed') {
          this.datasourceDetailed = new MatTableDataSource([]);
        } else {
          this.datasourceConsolidated = new MatTableDataSource([]);
        }
        this.DetailedStartDate = this.pipe.transform(this.DebtorForm.get('fromDate').value, 'dd-MMM-yy');
        this.DetailedEndDate = this.pipe.transform(this.DebtorForm.get('toDate').value, 'dd-MMM-yy');
        this.tableType = this.DebtorForm.get('RptOpt1').value;
        await firstValueFrom(this.http.post<any>(`${this.global.gApiserver}/api/accountsGL2`, Api, this.httpOptions)).then((data) => {

          if (data.length > 0) {

            this.hideAutoCompletepanle();

            if (this.DebtorForm.get('RptOpt1').value === 'Monthly') {

              if (data[0].MonthsName.startsWith('Opening')) {
                let idx = 0;
                data.forEach((element, index) => {
                  if (index > 0) {
                    element = Object.assign(element, { SNo: idx + 1 });
                    idx += 1;
                  } else {
                    element = Object.assign(element, { SNo: '' });

                  }
                });
              } else {
                let idx = 0;
                data.forEach((element, index) => {
                  element = Object.assign(element, { SNo: idx + 1 });
                  idx += 1;
                });
              }

              this.datasourceOne = new MatTableDataSource(data);
              const startsWithN = data.filter((option) => option.MonthsName !== 'Opening Balance');
              this.debitArr = [];
              this.creditArr = [];
              this.CreditTotal = 0;
              this.DebitTotal = 0;
              this.OpeningBalance = data[0].CrAmt;
              startsWithN.forEach((element) => {
                this.debitArr.push(element.DrAmt || 0);
                this.creditArr.push(element.CrAmt || 0);
                this.DebitTotal = element.DrAmt + this.DebitTotal;
                this.CreditTotal = element.CrAmt + this.CreditTotal;

              });
              // this.chartConfig([], []);

              const drTotal = data[0].DrTotal;
              const crTotal = data[0].CrTotal;
              const openBal = data[0].CrAmt;
              let closeBal = data[0].CrAmt;
              if (data[1]?.DrTotal > data[1]?.CrTotal) {
                const diff = data[1].DrTotal - data[1].CrTotal;
                closeBal = diff;
              } else {
                const diff = data[1].CrTotal - data[1].DrTotal;
                closeBal = diff;
              }
              this.chartConfig([], []);

              this.chart.data.datasets[0].data = this.debitArr;
              this.chart.data.datasets[1].data = this.creditArr;
              this.chart.update();

              // this.loadPreviousMonthly(drTotal, crTotal, openBal, closeBal);

              setTimeout(() => {
                const tbody = document.querySelectorAll('tr');
                tbody[2]?.focus();
                this.selectedRowIndex = 1;
              }, 100);
            } else if (this.DebtorForm.get('RptOpt1').value === 'Detailed') {
              this.datasourceDetailed = new MatTableDataSource(data);
              setTimeout(() => {
                const tbody = document.querySelectorAll('tr');
                tbody[1]?.focus();
                this.selectedRowIndex = 1;
              }, 100);
            } else {
              setTimeout(() => {
                const tbody = document.querySelectorAll('tr');
                tbody[1]?.focus();
                this.selectedRowIndex = 1;
              }, 100);
              if (this.DebtorForm.get('RptOpt2').value === 'ClosingBalance') {
                this.consolidatedColumn = ['SNo', 'AcCode', 'AcName', 'View', 'DrAmt', 'CrAmt'];
                this.consolidatedSecFooter = ['a', 'b', 'c', 'd', 'e', 'f'];
              } else {
                this.consolidatedSecFooter = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
                this.consolidatedColumn = ['SNo', 'AcCode', 'AcName', 'View', 'OpDrAmt', 'OpCrAmt', 'DrAmt', 'CrAmt', 'ClsDrAmt', 'ClsCrAmt'];
              }
              this.datasourceConsolidated = new MatTableDataSource(data);
            }
            setTimeout(() => {

              this.loading = false;
            }, 200);

            // if (this.sideNavOpen) {
            //   this.sideNavOpen = !this.sideNavOpen;
            // }

          } else {
            this.loading = false;
            // this.commonservice.openSnackbar('No Record Found', 'Ok', 1500);
          }

        }).catch((error: any) => {
          this.loading = false;
          // this.commonservice.openSnackbar(JSON.stringify(error.statusText), 'Ok', 1500);
        });

      }
    } else {
      this.loading = false;
      this.commonservice.openSnackbar('Fill All require fields', 'Ok', 1500);

    }
  }

  rowClick(index, tabletype) {

    setTimeout(() => {
      if (tabletype === 'Monthly') {
        this.monthlyActiveRow = this.selectedRowIndex;
      } else if (tabletype === 'Consolidated') {
        this.consolidatedActiveRow = this.selectedRowIndex;
      } else {
        this.detailedActiveRow = this.selectedRowIndex;
      }
    }, 100);

  }

  async viewRow(selectedRow, fromTable) {
    setTimeout(async () => {

      let RptType = 'Monthly';
      let fdate = '';
      let tdate = '';
      let AcCode = '';
      if (fromTable === 'Monthly') {
        RptType = 'Consolidated';
        this.datasourceConsolidated = new MatTableDataSource([]);
        fdate = selectedRow.MonthStartDate;
        tdate = selectedRow.MonthEndDate;
        this.DetailedStartDate = selectedRow.MonthStartDate;
        this.DetailedEndDate = selectedRow.MonthStartDate;
        AcCode = this.DebtorForm.get('ledgername').value.accCode;
      } else if (fromTable === 'Consolidated') {
        RptType = 'Detailed';
        this.datasourceDetailed = new MatTableDataSource([]);
        fdate = this.pipe.transform(this.DebtorForm.get('fromDate').value, 'dd-MMM-yy');
        tdate = this.pipe.transform(this.DebtorForm.get('toDate').value, 'dd-MMM-yy');
        AcCode = selectedRow.AcCode;
      }
      const Api = {
        reqMainreq: 'GeneralLedger',
        RptType,
        fdate,
        tdate,
        CmpCode: this.DebtorForm.get('Company').value.CmpCode,
        FbCode: this.DebtorForm.get('Finbook').value.FbCode,
        AcCode,
        username: this.global.gUsrid,
        type: RptType,
        type2: this.DebtorForm.get('RptOpt2').value,
        FYear: this.DebtorForm.get('FinYear').value,
        Var2: '',
        Var3: '',
        Var4: '',
        Var5: '',
        Var6: '',
      };
      this.NormalTable = false;
      this.loading = true;
      this.initaialSelectedRow = this.selectedRowIndex;
      console.log(this.selectedRowIndex);

      await firstValueFrom(this.http.post<any>(`${this.global.gApiserver}/api/accountsGL2`, Api, this.httpOptions)).then((data) => {
        if (data.length > 0) {
          this.tableType = RptType;
          if (fromTable === 'Monthly') {
            this.datasourceConsolidated = new MatTableDataSource(data);
          } else if (fromTable === 'Consolidated') {
            this.datasourceDetailed = new MatTableDataSource(data);
          }
          setTimeout(() => {
            const tbody = document.querySelectorAll('tr');
            tbody[1]?.focus();
            this.selectedRowIndex = 1;
          }, 100);
          this.loading = false;
        } else {
          this.commonservice.openSnackbar('No Record Found', 'Ok', 1500);
        }

      }).catch((error: any) => {
        this.commonservice.openSnackbar(JSON.stringify(error.statusText), 'Ok', 1500);
      });
      this.loading = false;
    }, 100);
  }

  keytab(event:any) {
    if (event.key === 'Enter') {
      if (event.target.value !== '') {
        const { form } = event.target;
        this.formList = form;
        const index = Array.prototype.indexOf.call(form, event.target);
        const dateattr = form.elements[index + 1].getAttribute('aria-label');
        if (dateattr && dateattr === 'Open calendar') {
          form.elements[index + 2]?.focus();
        } else {
          form.elements[index + 1]?.focus();
        }

        event.preventDefault();
      }
    }
  }

  async loadFinYear() {

    const Api = {
      arg1: '0',
      arg2: '0',
      arg3: '0',
      oth: '0',
      seltype: 'FinancialYearLoad',
      username: 'KUMAR@SWD',
    };

    await firstValueFrom(this.http.post<any>(`${this.global.gApiserver}/homeload`, Api, this.httpOptions)).then((data) => {
      if (data.length > 0) {
        this.FinYearList = data;
        data.forEach((element, index) => {
          if (element.currentyear === 1) {
            this.previousfinyearIndex = index - 1;
            this.DebtorForm.get('FinYear').setValue(element.fyear);
            this.DebtorForm.get('fromDate').setValue(element.fdate);
            this.DebtorForm.get('toDate').setValue(element.tdate);
            this.chartConfig([], []);
            this.FormSubmit();
          }
        });

      }
    });

  }

  async loadFinbook(keyValue) {
    this.FinBookList = [];
    const cmpCode = this.DebtorForm.get('Company').value.CmpCode;
    const FBList = await this.accService.getFinbook(cmpCode, keyValue);

    if (FBList[0]?.StatusResponse === 'Success') {
      this.FinBookList = FBList;
    } else {
      this.FinBookList = [];
    }
  }

  async filterledgerName(keyValue) {
    if (this.commonservice.checkTypeValitity(this.DebtorForm.get('Company').value, 'Company')
    && this.commonservice.checkTypeValitity(this.DebtorForm.get('Finbook').value, 'Finbook')) {
      const api = {
        reqMainreq: 'SR_AccNameSearch',
        Usr: this.global.gUsrid,
        brcode: this.global.gBrcode,
        var1: keyValue,
        var2: this.DebtorForm.get('Company').value.CmpCode,
        var3: this.DebtorForm.get('Finbook').value.FbCode,
      };

      this.ledgerNameArr = [];
      await firstValueFrom(this.http.post<any>(`${this.global.gApiserver}/api/datareqsarnEleven`, api, this.httpOptions)).then((data) => {
        if (data.length > 0) {
          const ledgerObj = {
            AcCodeName: 'ALL',
            StatusResponse: 'Success',
            accCode: '0',
            accName: 'ALL',
          };
          this.ledgerNameArr = [ledgerObj, ...data];

        } else {
          // this.commonservice.openSnackbar('No Record Found', 'Ok', 1500);

        }
      }).catch((error: any) => {
        this.commonservice.openSnackbar(error.statusText, 'Ok', 1500);
      });
    }
  }

  YearOnChange(event, finyear, previousIndex) {
    if (event.source.selected) {
      setTimeout(() => {
        this.previousfinyearIndex = previousIndex;

        this.DisplayedFinyear = [];
        this.DebtorForm.get('fromDate').setValue(finyear.fdate);
        this.DebtorForm.get('toDate').setValue(finyear.tdate);
        document.getElementById('autocmpsingle').focus();
      }, 100);

    }
  }

  CmpChange(event) {
    if (event.source.selected) {
      this.FinBookList = [];
      this.CampNameList = [];
      this.DebtorForm.get('Finbook').setValue('');
      setTimeout(() => {
        document.getElementById('brFB').focus();
      }, 100);
    }

  }

  brFbSelected(event) {
    if (event.source.selected) {
      this.FinBookList = [];
      setTimeout(() => {
        document.getElementById('ledger').focus();
      }, 100);
    }

  }

  opt1Change(event, id) {
    if (event.source.selected) {
      setTimeout(() => {
        document.getElementById(id).focus();
      }, 100);
    }

  }

  datechange(id) {
    setTimeout(() => {
      document.getElementById(id).focus();
    }, 100);
  }

  ledgerSelected(event, ledgercode) {
    if (event.source.selected) {
      this.ledgerNameArr = [];
      this.DebtorForm.get('RptOpt1').setValue('');
      this.DebtorForm.get('RptOpt2').setValue('');
      if (ledgercode !== '0') {
        this.Option1Arr = ['Monthly', 'Detailed'];
      } else {
        this.Option1Arr = this.Option1Normal;
      }
      setTimeout(() => {
        document.getElementById('fromDate').focus();
      }, 100);
    }

  }

  displayFb = (option) => (option && option.FbName ? option.FbName : '');

  displayCmp = (option) => (option && option.company ? option.company : '');

  displayLedger = (option) => (option && option.AcCodeName ? option.AcCodeName : '');

  StateOnChange(event) {}

  toggleVoucherData() {

    if (!this.sideNavOpen) {
      setTimeout(() => {
        document.getElementById('brFB')?.focus();
      }, 100);
    }
    this.sideNavOpen = !this.sideNavOpen;

  }

  applyFilterDetailed(event) {
    this.datasourceDetailed.filter = event.trim().toLowerCase();
  }

  applyFilterConsolidated(event) {
    this.datasourceConsolidated.filter = event.trim().toLowerCase();
  }

  downloadXlOne(dataS) {
    if (dataS.length > 0) {
      const LedgerType = this.DebtorForm.get('LedgerType').value;
      const { tableType } = this;
      this.commonservice.exportAsExcelFile(dataS, `${LedgerType}${tableType}`);
    } else {
      this.commonservice.openSnackbar('No data to export', 'Ok', 1500);
    }
  }

  setIndex(idx, i) {
    if (this.tableType === 'Monthly') {
      if (idx === 0) {
        this.selectedRowIndex = i;
      } else {
        this.selectedRowIndex = (idx * this.monthlyColumnOne.length) + i;
      }
    } else if (this.tableType === 'Consolidated') {
      if (idx === 0) {
        this.selectedRowIndex = i;
      } else {
        this.selectedRowIndex = (idx * this.consolidatedColumn.length) + i;
      }

    } else if (this.tableType === 'Detailed') {
      if (idx === 0) {
        this.selectedRowIndex = i;
      } else {
        this.selectedRowIndex = (idx * this.detailedColumn.length) + i;
      }

    }
  }

  shortcuts() {
    const keydown$ = fromEvent(window, 'keydown');

    this.subs.add(keydown$.subscribe((event: any) => {

      if (this.loading) {
        return;
      }
      if (event.altKey && (event.key === 'f' || event.key === 'F')) {
        event.preventDefault();
        document.getElementById('search').focus();
        this.hideAutoCompletepanle();
        return;
      }
      if (event.altKey && (event.key === 'x' || event.key === 'X')) {
        event.preventDefault();
        this.exitApplication();
        this.hideAutoCompletepanle();
        return;
      }
      if (event.ctrlKey && (event.key === 'c' || event.key === 'C')) {
        if (event?.srcElement?.innerText !== '' && event?.srcElement?.innerText !== ' ') {
          this.clipboard.copy(event?.srcElement?.innerText);
        }
        return;
      }
      if (event.altKey && (event.key === 'd' || event.key === 'D')) {
        event.preventDefault();
        if (this.tableType === 'Monthly') {
          this.downloadXlOne(this.datasourceOne.data);
        } else if (this.tableType === 'Consolidated') {
          this.downloadXlOne(this.datasourceConsolidated.data);
        } else {
          this.downloadXlOne(this.datasourceDetailed.data);
        }
        this.hideAutoCompletepanle();
        return;
      }
      if (event.key === 'Escape') {
        event.preventDefault();
        this.backclick();
        return;
      }
      if (event.altKey && (event.key === 's' || event.key === 'S')) {
        this.FormSubmit();
        this.hideAutoCompletepanle();
        event.preventDefault();
        return;
      }
      if (event.altKey && (event.key === 'a' || event.key === 'A')) {
        event.preventDefault();
        this.drawer.toggle();
        if (!this.sideNavOpen) {
          setTimeout(() => {
            document.getElementById('brFB')?.focus();
          }, 100);
        }
        this.sideNavOpen = !this.sideNavOpen;
        this.hideAutoCompletepanle();
        return;
      }

      if (event.key === 'ArrowLeft') {
        const tbody = document.querySelectorAll('td');
        if (this.selectedRowIndex > 0) {
          this.selectedRowIndex -= 1;
          tbody[this.selectedRowIndex]?.focus();
        }
      }
      if (event.key === 'ArrowRight') {
        const tbody = document.querySelectorAll('td');
        if (this.tableType === 'Monthly') {
          if (((this.monthlyColumn.length * this.datasourceOne.data.length) - 1) > this.selectedRowIndex) {
            this.selectedRowIndex += 1;
            tbody[this.selectedRowIndex]?.focus();
          }
        } else if (this.tableType === 'Consolidated') {

          if (((this.consolidatedColumn.length * this.datasourceConsolidated.data.length) - 1) > this.selectedRowIndex) {
            this.selectedRowIndex += 1;
            tbody[this.selectedRowIndex]?.focus();
          }

        } else if (((this.detailedColumn.length * this.datasourceDetailed.data.length) - 1) > this.selectedRowIndex) {
          this.selectedRowIndex += 1;
          tbody[this.selectedRowIndex]?.focus();

        }
      }

      if (event.key === 'ArrowDown') {

        const autoComplete = document.getElementsByClassName('gAutoCompleteContainer');
        if (autoComplete[0]?.classList.contains('gAutoCompleteContainer')) {
          return;
        }
        event.preventDefault();
        const tbody:any = document.querySelectorAll('td');
        if (this.tableType === 'Monthly') {

          if (this.selectedRowIndex < ((this.monthlyColumn.length * this.datasourceOne.data.length) - 7)) {
            this.selectedRowIndex += this.monthlyColumn.length;
            tbody[this.selectedRowIndex]?.focus();
          }
        } else if (this.tableType === 'Consolidated') {
          if (this.selectedRowIndex < ((this.consolidatedColumn.length * this.datasourceConsolidated.data.length) - 6)) {
            this.selectedRowIndex += this.consolidatedColumn.length;
            tbody[this.selectedRowIndex]?.focus();
          }
        } else if (this.tableType === 'Detailed') {
          if (this.selectedRowIndex < ((this.detailedColumn.length * this.datasourceDetailed.data.length) - 6)) {
            this.selectedRowIndex += this.detailedColumn.length;
            tbody[this.selectedRowIndex]?.focus();
          }
        }

        // else {

        //   const tbody = document.querySelectorAll('tr');
        //   if (this.selectedRowIndex === tbody.length - 3 || this.selectedRowIndex < 0) {
        //     return;
        //   }
        //   this.selectedRowIndex += 1;
        //   tbody[this.selectedRowIndex]?.focus();
        // }

      } if (event.key === 'ArrowUp') {

        const autoComplete = document.getElementsByClassName('gAutoCompleteContainer');
        if (autoComplete[0]?.classList.contains('gAutoCompleteContainer')) {
          return;
        }
        event.preventDefault();
        // const tbody = document.querySelectorAll('tr');

        const tbody:any = document.querySelectorAll('td');
        if (this.tableType === 'Monthly') {
          if (this.selectedRowIndex < (this.monthlyColumn.length * this.datasourceOne.data.length) && this.selectedRowIndex > 6) {
            this.selectedRowIndex -= this.monthlyColumn.length;
            tbody[this.selectedRowIndex]?.focus();
          }
        } else if (this.tableType === 'Consolidated') {
          if (this.selectedRowIndex < (this.consolidatedColumn.length * this.datasourceConsolidated.data.length) && this.selectedRowIndex > 5) {
            this.selectedRowIndex -= this.consolidatedColumn.length;
            tbody[this.selectedRowIndex]?.focus();
          }
        } else if (this.tableType === 'Detailed') {
          if (this.selectedRowIndex < (this.detailedColumn.length * this.datasourceDetailed.data.length) && this.selectedRowIndex > 5) {
            this.selectedRowIndex -= this.detailedColumn.length;
            tbody[this.selectedRowIndex]?.focus();
          }
        }

        // else {
        //   this.selectedRowIndex -= 1;
        //   if (this.selectedRowIndex === tbody.length - 2 || this.selectedRowIndex <= 0) {
        //     this.selectedRowIndex += 1;
        //     return;
        //   }
        //   tbody[this.selectedRowIndex]?.focus();
        // }

      }
    }));

  }

  rowEnter(event, index, tabletype, col, row) {

    if (event.key === 'Enter') {

      if (col === 'View') {
        if (tabletype === 'Monthly') {
          if (!row.MonthsName.startsWith('Opening')) {
            this.rowClick(index, tabletype);
            this.viewRow(row, tabletype);
          }

        } else if (tabletype === 'Consolidated') {

          this.rowClick(index, tabletype);
          this.viewRow(row, tabletype);

        } else {
          this.rowClick(index, tabletype);
          this.viewRow(row, tabletype);

        }
      }
    }
  }

  cmpFilter(keyValue) {
    const key = keyValue.toLocaleUpperCase();
    const startsWithN = this.CampNameListAll.filter((option) => option.company.toLocaleUpperCase().includes(key));
    this.CampNameList = startsWithN;

  }

  FinYearFilter(keyValue) {
    const key = keyValue.toLocaleUpperCase();
    const startsWithN = this.FinYearList.filter((option) => option.fyear.toLocaleUpperCase().includes(key));
    this.DisplayedFinyear = startsWithN;

  }

  optionSelected(event, id) {
    if (event.source.selected) {
      if (id === 'opt2') {
        this.DisplayedOption1Arr = [];
        if (this.DebtorForm.get('RptOpt1').value === 'Monthly') {
          this.chartConfig([], []);
        }
      } else if (id === 'sumbit') {
        this.DisplayedOption2Arr = [];
      }
      setTimeout(() => {
        document.getElementById(id)?.focus();
      }, 100);
    }
  }

  nextFocus() {
    setTimeout(() => {
      document.getElementById('brFB').focus();
    }, 100);
  }

  getTotalCredit(data) {
    return data[0]?.CrTotal;
  }

  getTotalCreditMonth(data) {
    return data[1]?.CrTotal;
  }

  getTotalDebit(data) {
    return data[0]?.DrTotal;
  }

  getTotalDebitMonth(data) {
    return data[1]?.DrTotal;
  }

  checlTotalDebit(data) {

    if (data[0]?.DrTotal > data[0]?.CrTotal) {
      const diff = data[0].DrTotal - data[0].CrTotal;
      return diff;
    }
    return '';
  }

  checlTotalDebitMonthCard(data1, data2) {
    if (data1 > data2) {
      const diff = data1 - data2;
      return diff;
    } if (data1 < data2) {
      const diff = data2 - data1;
      return diff;
    }
    return 0;

  }

  checlTotalDebitMonth(data) {

    if (data[1]?.DrTotal > data[1]?.CrTotal) {
      const diff = data[1].DrTotal - data[1].CrTotal;
      return diff;
    }
    return '';
  }

  checlTotalCredit(data) {
    if (data[0]?.CrTotal > data[0]?.DrTotal) {
      const diff = data[0].CrTotal - data[0].DrTotal;
      return diff;
    }
    return '';

  }

  checlTotalCreditMonth(data) {
    if (data[1]?.CrTotal > data[1]?.DrTotal) {
      const diff = data[1].CrTotal - data[1].DrTotal;
      return diff;
    }
    return '';

  }

  calBalance(data, debit, credit) {
    const balance = (data[0].CrAmt + credit) - debit;
    return balance;
  }

  backclick() {

    if (this.DebtorForm.get('RptOpt1').value === this.tableType) {
      this.exitApplication();

    } else if (this.tableType === 'Consolidated' && this.DebtorForm.get('RptOpt1').value !== this.tableType) {
      this.tableType = 'Monthly';
      if (this.monthlyActiveRow > 0) {

        this.selectedRowIndex = this.monthlyActiveRow;
        setTimeout(() => {
          const tbody = document.querySelectorAll('td');
          tbody[this.monthlyActiveRow]?.focus();
          this.chartConfig([], []);
        }, 100);

        setTimeout(() => {
          this.chart.data.datasets[0].data = this.debitArr;
          this.chart.data.datasets[1].data = this.creditArr;
          this.chart.update();
        }, 500);
      }

    } else if (this.tableType === 'Detailed' && this.DebtorForm.get('RptOpt1').value !== this.tableType) {
      this.tableType = 'Consolidated';
      if (this.consolidatedActiveRow > 0) {
        this.selectedRowIndex = this.consolidatedActiveRow;
        setTimeout(() => {
          const tbody = document.querySelectorAll('td');
          tbody[this.consolidatedActiveRow]?.focus();
        }, 100);

      }

    } else {
      this.exitApplication();

    }

  }

  exitApplication() {
    this.commonservice.taskConfirmation('Are you sure to exit ?', '', true, 'Yes', '').then((res) => {
      if (res.isConfirmed) {
        this.router.navigateByUrl('/dashboard');
      }
    });
  }

  hideAutoCompletepanle() {
    const autoComplete = document.getElementsByClassName('gAutoCompleteContainer');
    autoComplete[0]?.classList.remove('mat-autocomplete-visible');
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
