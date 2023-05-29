/* eslint-disable no-useless-concat */
/* eslint-disable radix */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-shadow */
/* eslint-disable eqeqeq */
/* eslint-disable camelcase */
/* eslint-disable max-len */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-param-reassign */
import {
  AfterViewInit, Component, HostListener, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef,
} from '@angular/core';
import {
  AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators,
} from '@angular/forms';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import {
  DateAdapter, MatOptionSelectionChange, MAT_DATE_FORMATS, MAT_DATE_LOCALE,
} from '@angular/material/core';
import { SubSink } from 'subsink';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { debounceTime } from 'rxjs/operators';
import { DatePipe, formatDate } from '@angular/common';
import * as XLSX from 'xlsx';
import { MatDatepicker } from '@angular/material/datepicker';
import moment from 'moment';
import { DhibhaDataService } from 'src/app/services/dhibhaData.service';
import { Globals } from 'src/app/globals';
import { CommonService } from 'src/app/services/common.service';

export const MY_FORMATS = {
  parse: {
    dateInput: 'DD-MMM-YYYY',
  },
  display: {
    dateInput: 'DD-MMM-YYYY',
    monthYearLabel: 'DD-MMM-YYYY',
    dateA11yLabel: 'DD-MMM-YYYY',
    monthYearA11yLabel: 'YYYY',
  },
};
@Component({
  selector: 'app-debtor-ledger',
  templateUrl: './debtor-ledger.component.html',
  styleUrls: ['./debtor-ledger.component.css'],
  providers: [{
    provide: DateAdapter,
    useClass: MomentDateAdapter,
    deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
  },
  { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})

export class DebtorLedgerComponent implements OnInit, AfterViewInit {
  @ViewChild('datepickerFooter', { static: false }) datepickerFooter: ElementRef|any;

  @ViewChild('datepickerFooter1', { static: false }) datepickerFooter1: ElementRef|any;

  @ViewChild('picker', { static: false }) picker: MatDatepicker<any>|any;

  @ViewChild('picker1', { static: false }) picker1: MatDatepicker<any>|any;

  name = 'Parent';

  msgFromChild1: any;

  currentMsgToChild1 = '';

  currentMsgToParent = '';

  // @Input() childMessage: string;
  DocType: any;

TranType: any;

tax: any;

totamt=0;

PBno: any;

utrno: any;

credLocation: any;

  loccode=0;

  debtorLoc: any;

  @HostListener('window:scroll', ['$event']) onScrollEvent($event:any) {
    sessionStorage.scrollPos = window.scrollY;
  }

  private subs = new SubSink();

  isSelect: any;

 backNav: any;

 debtor: any = 'ALL';

 creditor: any;

  DebtorForm: FormGroup|any;

  SelectedView:any = 'Consolidated';

  loading = false;

 isloader!: boolean;

  fYear:any = [];

 stateLoad:any = [];

 DbrhLoad:any = [];

 CbrhLoad:any = [];

  debtorControl: FormControl;

 creditorControl: FormControl;

  DebtorlocControl: FormControl;

 CreditorlocControl: FormControl

  debtorList:any = [];

 creditorList:any = [];

  branchcode = 0;

 pipe: DatePipe;

  customerCode: any;

 branchname: any;

 customername: any;

  ConsolidatedData:any = [];

 DetailedData:any = [];

 LedgerDetailList:any = [];

  DLocation:any;

 CLocation: any;

  credittot = 0;

 debittot = 0;

  varOpnSecond:any;

 TotDrOpening: any;

 TotCrOpening: any;

  ClosingReceivable: any;

 ClosingPayable: any;

 closingBal: any;

  MonthFdate: any;

 MonthTdate: any;

  value: any;

 HighlightRow: any;

 HighlightRow1: any;

 HighlightRow2: any;

  payablestot:any;

 receivabletot:any;

  detsalestot = 0;

 detreceipttot = 0;

 OpenBalpayable: any;

 OpenBalreceivable: any;

  debtorname: any;

 InvDetailedpayable: any;

 InvDetailedreceivable: any;

  OpenBal: any;

 openingAmt: any;

 InvDetailedcloBal: any;

  salestot: any;

 receipttot: any;

 minDate: Date|any;

 maxDate: Date|any;

 option: any;

  CreditorS_name: any;

 CreditorS_code: any;

 creditorname: any;

  SelectedType = 'Closing Balance';

 number = 2;

  Trnno: any;

 Trndate: any;

 fbid: any;

 Supname: any;

 Invno: any;

  showModal = false;

  StatorPBno: any;

  constructor(private router: Router, private service: DhibhaDataService, private fb: FormBuilder, private globals: Globals) {
    this.service.apiurl = this.globals.gApiserver;
    this.debtorControl = new FormControl();
    this.creditorControl = new FormControl();
    this.pipe = new DatePipe('en');
    this.DebtorlocControl = new FormControl();
    this.CreditorlocControl = new FormControl();
  }

  ngAfterViewInit() {
    window.scrollTo(0, sessionStorage.scrollPos);
  }

  ngOnInit(): void {
    this.globals.gmainMenuSelected = 'creditorLedger';
    if (this.globals.gmainMenuSelected == 'debtorLedger') {
      this.isSelect = 'form'; this.option = 'debtor';
    } else if (this.globals.gmainMenuSelected == 'creditorLedger') {
      this.isSelect = 'form'; this.option = 'creditor';
    }
    this.DebtorForm = this.fb.group({
      fdate: ['', Validators.required],
      tdate: ['', Validators.required],
      defaultYear: [''],
      stateValue: ['ALL'],
    });

    this.FinancialYear();
    this.StateList();
    this.DebtorBranchLoad();
    this.CreditorBranchLoad();
    this.DebtorLoad();
    this.CreditorLoad();
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  home() {
    this.globals.SelectDashboard = 'GROUPLIST';
    this.router.navigate(['/dashboard']);
  }

  backNavigation() {
    if (this.backNav == 'gotodashboard') {
      this.router.navigate(['/dashboard']);
    } else if (this.backNav == 'initial') {
      this.isSelect = 'form';
      this.ConsolidatedData = [];
      this.MonthlyData = [];
      this.DetailedData = [];
      this.HighlightRow = '';
      this.HighlightRow1 = '';
      this.SelectedType = 'Closing Balance';
      this.backNav = 'gotodashboard';
    } else if (this.backNav == 'gototble1') {
      this.ConsolidatedData = [];
      this.value = 'Consolidated';
      this.isSelect = 'ListTblMonthly';
      this.HighlightRow1 = '';
      if (this.service.OptSelected == 'ConsolidatedReport') {
        this.backNav = 'gotoCreDsahboard';
      } else {
        this.backNav = 'initial';
      }
    } else if (this.backNav == 'gototble2') {
      this.DetailedData = [];
      this.isSelect = 'ListTblConstd';
      this.backNav = 'gototble1';
    } else if (this.backNav == 'backtoconsolidate') {
      this.DetailedData = [];
      this.SelectedView = 'Consolidated';
      this.isSelect = 'ListTblConstd';
      if (this.service.OptSelected == 'ConsolidatedReport') {
        this.backNav = 'gotoCreDsahboard';
      } else {
        this.backNav = 'initial';
      }
    } else if (this.backNav == 'gotoCreDsahboard') {
      this.router.navigate(['/accounts/CreditorsDb']);
      this.service.OptSelected = 'BacktoCreDashboard';
    } else {
      this.router.navigate(['/dashboard']);
    }
  }

  keytab(event:any) {
    if (event.keyCode === 13 && event.target.nodeName === 'INPUT') {
      const { form } = event.target;
      const index = Array.prototype.indexOf.call(form, event.target);
      form.elements[index + 1].focus();
      event.preventDefault();
    }
  }

  ShowContable(data:any) {
    this.HighlightRow = data.Month;
    this.payablestot = 0;
    this.receivabletot = 0;
    this.ConsolidatedData = [];
    this.isloader = true;
    if (this.option == 'debtor') {
      this.SelectedType = 'Closing Balance';
      const reqForConsData = {
        whichData: 'Ledgerwise', RptType: this.value, fdate: data.location, tdate: data.Particulars, Comp: 'ADYAR ANANDA BHAVAN', loc: this.branchcode, sup: this.customerCode, username: this.globals.gUsrid, type: this.SelectedType, type2: '', reg: this.DebtorForm.value.stateValue, FYear: this.DebtorForm.value.defaultYear, ExtraVar1: '', ExtraVar2: '', Extranum1: 0, Extranum2: 0,
      };
      this.MonthFdate = data.location;
      this.MonthTdate = data.Particulars;
      this.subs.add(this.service.PostDebtorTable(reqForConsData).subscribe((result: any) => {
        const response = result;
        this.isSelect = 'ListTblConstd';
        this.backNav = 'gototble1';
        this.value = 'InvDetailed';
        this.isloader = false;
        if (response.length > 0) {
          this.ConsolidatedData = response;
          this.HighlightRow1 = this.ConsolidatedData[0];
          this.ConsolidatedData.forEach((data:any) => {
            this.payablestot += parseInt(data.Payables);
            this.receivabletot += parseInt(data.Receivables);
          });
        } else {
          this.payablestot = 0;
          this.receivabletot = 0;
        }
      }, (err) => {
        Swal.fire({ text: 'Server Response Failed' });
        this.isloader = false;
      }));
    } else if (this.option == 'creditor') {
      if (this.CLocation == 'All' || this.CLocation == 'ALL') {
        this.loccode = 0;
      } else {
        this.loccode = this.CLocation;
      }
      this.SelectedType = 'Closing Balance';
      const reqForCreConsData = {
        reqMainreq: 'PURLEDGMONTHLY', Usr: this.globals.gUsrid, var1: this.value, var2: data.location, var3: data.Particulars, var4: this.loccode, var5: this.CreditorS_code, var6: this.DebtorForm.value.defaultYear, var7: this.SelectedType, var8: this.DebtorForm.value.stateValue,
      };
      this.MonthFdate = data.location;
      this.MonthTdate = data.Particulars;
      this.subs.add(this.service.PostCreditor(reqForCreConsData).subscribe((result: any) => {
        const response = result;
        this.isSelect = 'ListTblConstd';
        this.backNav = 'gototble1';
        this.value = 'InvDetailed';
        this.isloader = false;
        if (response.length > 0) {
          this.ConsolidatedData = response;
          this.HighlightRow1 = this.ConsolidatedData[0];
          this.ConsolidatedData.forEach((data:any) => {
            this.payablestot += data.Payables;
            this.receivabletot += data.Receivables;
          });
        } else {
          this.payablestot = 0;
          this.receivabletot = 0;
        }
      }));
    }
  }

  ShowDettable(getdata:any) {
    this.detsalestot = 0; this.detreceipttot = 0; this.OpenBalpayable = ''; this.OpenBalreceivable = ''; this.InvDetailedpayable = ''; this.InvDetailedreceivable = ''; this.openingAmt = ''; this.OpenBal = ''; this.InvDetailedcloBal = '';
    this.DetailedData = []; this.salestot = 0; this.receipttot = 0; let reqForDetData;
    if (this.option == 'debtor') {
      this.HighlightRow1 = getdata.Debtors;
      this.debtorname = getdata.Debtors;
      this.debtorLoc = getdata.loccode;
      this.isloader = true;
      if (this.value == 'InvDetailed') {
        this.backNav = 'gototble2';
        reqForDetData = {
          whichData: 'Ledgerwise', RptType: this.value, fdate: this.MonthFdate, tdate: this.MonthTdate, Comp: 'ADYAR ANANDA BHAVAN', loc: getdata.loccode, sup: getdata.CCode, username: this.globals.gUsrid, type: this.SelectedType, type2: '', reg: this.DebtorForm.value.stateValue, FYear: this.DebtorForm.value.defaultYear, ExtraVar1: '', ExtraVar2: '', Extranum1: 0, Extranum2: 0,
        };
      } else {
        this.SelectedView = 'InvDetailed';
        this.backNav = 'backtoconsolidate';
        reqForDetData = {
          whichData: 'Ledgerwise', RptType: this.SelectedView, fdate: this.pipe.transform(this.DebtorForm.value.fdate, 'dd-MMM-yyyy'), tdate: this.pipe.transform(this.DebtorForm.value.tdate, 'dd-MMM-yyyy'), Comp: 'ADYAR ANANDA BHAVAN', loc: getdata.loccode, sup: getdata.CCode, username: this.globals.gUsrid, type: this.SelectedType, type2: '', reg: this.DebtorForm.value.stateValue, FYear: this.DebtorForm.value.defaultYear, ExtraVar1: '', ExtraVar2: '', Extranum1: 0, Extranum2: 0,
        };
      }
      this.subs.add(this.service.PostDebtorTable(reqForDetData).subscribe((result: any) => {
        const response = result;
        this.isloader = false;
        this.isSelect = 'ListTblDetailed';
        if (response.length > 0 && response[0].ResultSet == 'OK') {
          this.DetailedData = response;
          this.HighlightRow2 = this.DetailedData[0];
          this.DetailedData.forEach((data:any) => {
            this.detsalestot += data.Sales;
            this.detreceipttot += data.Receipts;
          });
          if (response[0].openingAmt > 0) {
            this.OpenBalreceivable = Math.abs(response[0].openingAmt);
          } else if (response[0].openingAmt < 0) {
            this.OpenBalpayable = Math.abs(response[0].openingAmt);
          } else if (response[0].openingAmt == null) {
            this.openingAmt = 0;
          }
          this.salestot = this.detsalestot + this.OpenBalreceivable;
          this.receipttot = this.detreceipttot + this.OpenBalpayable;
          if (this.salestot - this.receipttot < 0) {
            this.InvDetailedpayable = Math.abs(this.salestot - this.receipttot);
          } else if (this.salestot - this.receipttot > 0) {
            this.InvDetailedreceivable = Math.abs(this.salestot - this.receipttot);
          } else if (this.salestot - this.receipttot == 0) {
            this.InvDetailedcloBal = Math.abs(this.salestot - this.receipttot);
          }
        } else if (response[0].ResultSet == 'OnlyOpening') {
          this.detsalestot = 0; this.detreceipttot = 0;
          if (response[0].openingAmt > 0) {
            this.OpenBalreceivable = Math.abs(response[0].openingAmt);
          } else if (response[0].openingAmt < 0) {
            this.OpenBalpayable = Math.abs(response[0].openingAmt);
          } else if (response[0].openingAmt == null) {
            this.openingAmt = 0;
          }
          this.salestot = this.detsalestot + this.OpenBalreceivable;
          this.receipttot = this.detreceipttot + this.OpenBalpayable;
          if (this.salestot - this.receipttot < 0) {
            this.InvDetailedpayable = Math.abs(this.salestot - this.receipttot);
          } else if (this.salestot - this.receipttot > 0) {
            this.InvDetailedreceivable = Math.abs(this.salestot - this.receipttot);
          } else if (this.salestot - this.receipttot == 0) {
            this.InvDetailedcloBal = Math.abs(this.salestot - this.receipttot);
          }
        }
      }, (err) => {
        Swal.fire({ text: 'Server Response Failed' });
        this.isloader = false;
      }));
    } else if (this.option == 'creditor') {
      this.HighlightRow1 = getdata.Creditors;
      this.creditorname = getdata.Creditors;
      this.credLocation = getdata.Location;
      let code;
      this.isloader = true;
      if (this.CLocation == 'All' || this.CLocation == 'ALL') {
        this.loccode = 0;
      } else {
        this.loccode = this.CLocation;
      }
      if (this.SelectedType == 'Closing Balance') {
        code = getdata.CCode;
      } else if (this.SelectedType == 'OP|DR|CR|CL') {
        code = getdata.Supcode;
      }

      if (this.value == 'InvDetailed') {
        this.backNav = 'gototble2';
        reqForDetData = {
          reqMainreq: 'PURLEDGMONTHLY', Usr: this.globals.gUsrid, var1: this.value, var2: this.MonthFdate, var3: this.MonthTdate, var4: getdata.Location, var5: code, var6: this.DebtorForm.value.defaultYear, var7: this.SelectedType, var8: this.DebtorForm.value.stateValue,
        };
      } else {
        this.SelectedView = 'InvDetailed';
        this.backNav = 'backtoconsolidate';
        reqForDetData = {
          reqMainreq: 'PURLEDGMONTHLY', Usr: this.globals.gUsrid, var1: this.SelectedView, var2: this.pipe.transform(this.DebtorForm.value.fdate, 'dd-MMM-yyyy'), var3: this.pipe.transform(this.DebtorForm.value.tdate, 'dd-MMM-yyyy'), var4: getdata.Location, var5: code, var6: this.DebtorForm.value.defaultYear, var7: this.SelectedType, var8: this.DebtorForm.value.stateValue,
        };
      }
      this.subs.add(this.service.PostCreditor(reqForDetData).subscribe((result: any) => {
        const response = result;
        this.isloader = false;
        this.isSelect = 'ListTblDetailed';
        if (response.length > 0 && response[0].ResultSet == 'OK') {
          this.DetailedData = response;
          this.HighlightRow2 = this.DetailedData[0];
          this.DetailedData.forEach((data:any) => {
            this.detsalestot += data.Sales;
            this.detreceipttot += data.Receipts;
          });
          if (response[0].openingAmt > 0) {
            this.OpenBalreceivable = Math.abs(response[0].openingAmt);
          } else if (response[0].openingAmt < 0) {
            this.OpenBalpayable = Math.abs(response[0].openingAmt);
          } else if (response[0].openingAmt == null || response[0].openingAmt == 0) {
            this.openingAmt = 0;
          }
          this.salestot = this.detsalestot + this.OpenBalreceivable;
          this.receipttot = this.detreceipttot + this.OpenBalpayable;
          if (this.salestot - this.receipttot < 0) {
            this.InvDetailedpayable = Math.abs(this.salestot - this.receipttot);
          } else if (this.salestot - this.receipttot > 0) {
            this.InvDetailedreceivable = Math.abs(this.salestot - this.receipttot);
          } else if (this.salestot - this.receipttot == 0) {
            this.InvDetailedcloBal = Math.abs(this.salestot - this.receipttot);
          }
        } else if (response[0].ResultSet == 'OnlyOpening') {
          this.detsalestot = 0; this.detreceipttot = 0;
          if (response[0].openingAmt > 0) {
            this.OpenBalreceivable = Math.abs(response[0].openingAmt);
          } else if (response[0].openingAmt < 0) {
            this.OpenBalpayable = Math.abs(response[0].openingAmt);
          } else if (response[0].openingAmt == null || response[0].openingAmt == 0) {
            this.openingAmt = 0;
          }
          this.salestot = this.detsalestot + this.OpenBalreceivable;
          this.receipttot = this.detreceipttot + this.OpenBalpayable;
          if (this.salestot - this.receipttot < 0) {
            this.InvDetailedpayable = Math.abs(this.salestot - this.receipttot);
          } else if (this.salestot - this.receipttot > 0) {
            this.InvDetailedreceivable = Math.abs(this.salestot - this.receipttot);
          } else if (this.salestot - this.receipttot == 0) {
            this.InvDetailedcloBal = Math.abs(this.salestot - this.receipttot);
          }
        }
      }));
    }
  }

  ShowLedgerDetails(getdata:any) {
    this.isloader = true;
    const reqForCLedgerDetaildata = {
      reqMainreq: 'PURLEDGDETAILS', Usr: this.globals.gUsrid, var1: getdata.TransType, var2: getdata.Dbtno,
    };
    this.subs.add(this.service.PostCreditor(reqForCLedgerDetaildata).subscribe((result: any) => {
      const response = result;
      if (response.length > 0) {
        this.TranType = getdata.Trans;
        this.Trndate = formatDate(getdata.Dbtdate, 'dd-MM-yyyy', 'en');
        if (getdata.Sales) {
          this.totamt = getdata.Sales;
        } else {
          this.totamt = getdata.Receipts;
        }
        this.LedgerDetailList = response;
        this.DocType = response[0].DocType;
        this.Supname = response[0].Supcode;
        if (this.TranType == 'Purchase' || this.TranType == 'Rev_Purchase') {
          this.tax = response[0].TaxAmount;
          this.totamt = response[0].TotalAmount;
          this.Invno = response[0].Invno;
          this.Trnno = response[0].Tranno;
          this.fbid = response[0].Fb_id;
        } else if (this.TranType == 'DR_Note' || this.TranType == 'CR_Note') {
          this.Invno = response[0].RefDocno;
          this.Trnno = response[0].Tranno;
          this.fbid = this.CLocation;
        } else if (this.TranType == 'Payment') {
          this.PBno = response[0].Paybatch_No;
          this.utrno = response[0].UTRNo;
          this.totamt = response[0].VoucherNo[1];
          this.Trnno = response[0].VoucherNo[0];
          this.fbid = this.CLocation;
        } else if (this.TranType == 'Adjustment') {
          this.Trnno = response[0].VoucherNo;
          this.fbid = response[0].fb_id;
        } this.isloader = false; this.showModal = true;
      } else {
        this.showModal = false;
        this.isloader = false;
        Swal.fire({ text: 'No Records Found' });
      }
    }));
  }

  hide() {
    this.showModal = false;
  }

  highlgtdet(index:any) {
    this.HighlightRow2 = this.DetailedData[index];
  }

  highlgtCon(index:any) {
    this.HighlightRow1 = this.ConsolidatedData[index];
  }

  highlgtMonth(index:any) {
    this.HighlightRow = this.MonthlyData[index];
  }

  FinancialYear() {
    const reqForYear = {
      username: this.globals.gUsrid, seltype: 'FinancialYearLoad', arg1: '0', arg2: '0', arg3: '0', oth: '0',
    };
    this.subs.add(this.service.PostDebtor(reqForYear).subscribe((data: any) => {
      this.fYear = data;
      if (this.fYear.length > 0) {
        this.fYear.forEach((element:any) => {
          if (element.currentyear == 1) {
            this.DebtorForm.get('defaultYear').setValue(element.fyear);
            this.Date();
          }
        });
      }
    }));
  }

  YearOnChange() {
    this.Date();
  }

  f1date:any;

t1date:any;

Date() {
  const reqForDate = {
    username: this.globals.gUsrid, seltype: 'FinancialYearsFirstDate', arg1: this.DebtorForm.value.defaultYear, arg2: '0', arg3: '0', oth: '0',
  };
  this.subs.add(this.service.PostDebtor(reqForDate).subscribe((data: any) => {
    const response = data;
    if (response.length > 0) {
      response.forEach((element:any) => {
        this.DebtorForm.get('fdate').setValue(element.fdate);
        this.DebtorForm.get('tdate').setValue(element.tdate);
        this.f1date = this.pipe.transform(element.fdate, 'yyyy');
        this.t1date = this.pipe.transform(element.tdate, 'yyyy');
        this.minDate = new Date(this.f1date, 3, 1);
        this.maxDate = new Date(this.t1date, 2, 31);
        if (element.currentyear == 1) {
          const todaydate = new Date();
          this.DebtorForm.get('tdate').setValue(todaydate);
        }
        this.DashboardValue();
      });
    }
  }));
}

StateOnChange(e:any) {
  this.DebtorForm.get('stateValue').setValue(e.value);
  this.DLocation = ''; this.CLocation = '';
  this.debtor = ''; this.creditor = '';
  this.DbrhLoad = []; this.CbrhLoad = [];
}

StateList() {
  const reqForStateLoad = {
    username: this.globals.gUsrid, seltype: 'StateLoad', arg1: 'ADYAR ANANDA BHAVAN', arg2: '0', arg3: '0', oth: '0',
  };
  this.subs.add(this.service.PostDebtor(reqForStateLoad).subscribe((data: any) => {
    this.stateLoad = data;
  }));
}

DebtorBranchOnChange(event: MatOptionSelectionChange, branch: any) {
  if (event.isUserInput) {
    this.debtorList = [];
    this.branchcode = branch.brcode;
    this.branchname = branch.brname;
    this.debtor = '';
  }
}

DebtorBranchLoad() {
  this.subs.add(this.DebtorlocControl.valueChanges.pipe(debounceTime(600)).subscribe((brname: any) => {
    const reqForDebBrhLoad = {
      username: this.globals.gUsrid, seltype: 'StatesBranchLoad', arg1: this.DebtorForm.value.stateValue, arg2: 'ADYAR ANANDA BHAVAN', arg3: '0', oth: brname,
    };
    this.subs.add(this.service.PostDebtor(reqForDebBrhLoad).subscribe((data: any) => {
      this.DbrhLoad = data;
    }));
  }));
}

CreditorBranchOnChange(event: MatOptionSelectionChange, branch: any) {
  if (event.isUserInput) {
    this.creditorList = []; this.creditor = '';
  }
}

CreditorBranchLoad() {
  this.subs.add(this.CreditorlocControl.valueChanges.pipe(debounceTime(600)).subscribe((brname: any) => {
    const reqForCreBrhLoad = {
      reqMainreq: 'PURFB', Usr: this.globals.gUsrid, var1: this.DebtorForm.value.stateValue, var2: brname,
    };
    this.subs.add(this.service.PostCreditor(reqForCreBrhLoad).subscribe((data: any) => {
      this.CbrhLoad = data;
    }));
  }));
}

detorOnChange(customer:any) {
  this.customername = customer.CustomerName;
  this.customerCode = customer.custcode;
  if (customer.CustomerName == 'ALL') {
    this.SelectedView = 'Consolidated';
  }
}

DebtorLoad() {
  this.subs.add(this.debtorControl.valueChanges.pipe(debounceTime(600)).subscribe((data: any) => {
    const reqForDebtorLoad = {
      username: this.globals.gUsrid, seltype: 'LocationsCustomersLoad', arg1: this.branchcode, arg2: '0', arg3: '0', oth: data,
    };
    this.subs.add(this.service.PostDebtor(reqForDebtorLoad).subscribe((res: any) => {
      this.debtorList = res;
    }));
  }));
}

creditorOnChange(option:any) {
  this.CreditorS_name = option.Suppliername;
  if (option.Supcode == 'ALL') {
    this.SelectedView = 'Consolidated';
    this.CreditorS_code = 0;
  } else {
    this.CreditorS_code = option.Supcode;
  }
}

CreditorLoad() {
  this.subs.add(this.creditorControl.valueChanges.pipe(debounceTime(600)).subscribe((data: any) => {
    const reqForCreditorLoad = { reqMainreq: 'PURCRDTS', Usr: this.globals.gUsrid, var1: data };
    if (data) {
      this.subs.add(this.service.PostCreditor(reqForCreditorLoad).subscribe((res: any) => {
        this.creditorList = res;
      }));
    }
  }));
}

ViewOnChange(event:any) {
  this.SelectedView = event.value;
}

  openStk:any = 0;

 MonthlyData:any = [];

 openstkdr:any = 0

 proceed() {
   const from = formatDate(this.DebtorForm.get('fdate').value, 'yyyy', 'en');
   const to = formatDate(this.DebtorForm.get('tdate').value, 'yyyy', 'en');
   if ((from == this.f1date || from == this.t1date) && (to == this.t1date || to == this.f1date)) {
     if ((this.DebtorForm.get('fdate').value > this.DebtorForm.get('tdate').value) || (this.DebtorForm.get('tdate').value < this.DebtorForm.get('fdate').value)) {
       Swal.fire('From date is greater than to date');
     } else if (this.DebtorForm.valid) {
       this.DebtorForm.get('fdate').clearValidators();
       this.DebtorForm.get('fdate').updateValueAndValidity();
       this.DebtorForm.get('tdate').clearValidators();
       this.DebtorForm.get('tdate').updateValueAndValidity();
       this.payablestot = 0;
       this.receivabletot = 0;
       this.detsalestot = 0;
       this.detreceipttot = 0;
       this.salestot = 0; this.receipttot = 0;

       this.ConsolidatedData = []; this.DetailedData = [];
       this.debittot = 0; this.credittot = 0; this.MonthFdate = ''; this.MonthTdate = ''; this.ClosingReceivable = ''; this.ClosingPayable = ''; this.closingBal = '';
       this.openStk = 0; this.openstkdr = 0; this.detsalestot = 0; this.detreceipttot = 0; this.OpenBalpayable = ''; this.OpenBalreceivable = ''; this.InvDetailedpayable = ''; this.InvDetailedreceivable = ''; this.openingAmt = ''; this.OpenBal = ''; this.InvDetailedcloBal = '';

       if (this.option == 'debtor') {
         if (this.debtor != '' && this.debtor != undefined) {
           if (this.DLocation) {
             this.loading = true; let reqForTableData;
             if (this.SelectedView == 'Monthly') {
               this.SelectedType = 'Closing Balance';
               reqForTableData = {
                 whichData: 'Ledgerwise', RptType: this.SelectedView, fdate: this.pipe.transform(this.DebtorForm.value.fdate, 'dd-MMM-yyyy'), tdate: this.pipe.transform(this.DebtorForm.value.tdate, 'dd-MMM-yyyy'), Comp: 'ADYAR ANANDA BHAVAN', loc: this.branchcode, sup: this.customerCode, username: this.globals.gUsrid, type: this.SelectedType, type2: '', reg: this.DebtorForm.value.stateValue, FYear: this.DebtorForm.value.defaultYear, ExtraVar1: '', ExtraVar2: '', Extranum1: 0, Extranum2: 0,
               };
             } else if (this.SelectedView == 'Consolidated') {
               reqForTableData = {
                 whichData: 'Ledgerwise', RptType: this.SelectedView, fdate: this.pipe.transform(this.DebtorForm.value.fdate, 'dd-MMM-yyyy'), tdate: this.pipe.transform(this.DebtorForm.value.tdate, 'dd-MMM-yyyy'), Comp: 'ADYAR ANANDA BHAVAN', loc: this.branchcode, sup: this.customerCode, username: this.globals.gUsrid, type: this.SelectedType, type2: '', reg: this.DebtorForm.value.stateValue, FYear: this.DebtorForm.value.defaultYear, ExtraVar1: '', ExtraVar2: '', Extranum1: 0, Extranum2: 0,
               };
             } else {
               this.SelectedType = 'Closing Balance';
               reqForTableData = {
                 whichData: 'Ledgerwise', RptType: this.SelectedView, fdate: this.pipe.transform(this.DebtorForm.value.fdate, 'dd-MMM-yyyy'), tdate: this.pipe.transform(this.DebtorForm.value.tdate, 'dd-MMM-yyyy'), Comp: 'ADYAR ANANDA BHAVAN', loc: this.branchcode, sup: this.customerCode, username: this.globals.gUsrid, type: this.SelectedType, type2: '', reg: this.DebtorForm.value.stateValue, FYear: this.DebtorForm.value.defaultYear, ExtraVar1: '', ExtraVar2: '', Extranum1: 0, Extranum2: 0,
               };
             }
             this.subs.add(this.service.PostDebtorTable(reqForTableData).subscribe((result: any) => {
               const response = result;
               this.loading = false;
               if (response.length > 0) {
                 if (this.SelectedView == 'Monthly') {
                   this.value = 'Consolidated';
                   if (this.service.OptSelected == 'ConsolidatedReport') {
                     this.backNav = 'gotoCreDsahboard';
                   } else {
                     this.backNav = 'initial';
                   }

                   if (response[0].CrOpening > 0) {
                     this.openStk = response[0].CrOpening;
                   }
                   if (response[0].DrOpening > 0) {
                     this.openstkdr = response[0].DrOpening;
                   }
                   this.MonthlyData = response;
                   const index = this.MonthlyData.findIndex((element:any) => element.Sales != null);
                   this.HighlightRow = this.MonthlyData[index];
                   this.isSelect = 'ListTblMonthly';
                   this.MonthlyData.forEach((element:any) => {
                     this.debittot += element.Sales;
                     this.credittot += element.Receipts;
                     let varOpn = 0;
                     varOpn = (element.Varopntot + this.credittot) - this.debittot;
                     if (varOpn < 0) {
                       element.Closing = `${new Intl.NumberFormat('en-IN', { minimumFractionDigits: this.number, maximumFractionDigits: this.number }).format(Math.abs(varOpn))} ` + 'Dr';
                     } else {
                       element.Closing = `${new Intl.NumberFormat('en-IN', { minimumFractionDigits: this.number, maximumFractionDigits: this.number }).format(Math.abs(varOpn))} ` + ' Cr';
                     }
                   });
                   this.debittot += this.openStk;
                   this.credittot += this.openstkdr;
                   this.TotDrOpening = this.debittot;
                   this.TotCrOpening = this.credittot;
                   if ((this.TotDrOpening - this.TotCrOpening) < 0) {
                     this.ClosingPayable = Math.abs(this.TotDrOpening - this.TotCrOpening);
                   } else if (this.TotDrOpening - this.TotCrOpening > 0) {
                     this.ClosingReceivable = Math.abs(this.TotDrOpening - this.TotCrOpening);
                   } else if ((this.TotDrOpening - this.TotCrOpening) == 0) {
                     this.closingBal = Math.abs(this.TotDrOpening - this.TotCrOpening);
                   }
                 } else if (this.SelectedView == 'Consolidated') {
                   this.ConsolidatedData = response;
                   this.isSelect = 'ListTblConstd';
                   this.value = 'Detailed';
                   if (this.service.OptSelected == 'ConsolidatedReport') {
                     this.backNav = 'gotoCreDsahboard';
                   } else {
                     this.backNav = 'initial';
                   }

                   this.HighlightRow1 = this.ConsolidatedData[0];
                   this.ConsolidatedData.forEach((data:any) => {
                     if (this.SelectedType == 'Closing Balance') {
                       this.payablestot += parseFloat(data.Payables);
                       this.receivabletot += parseFloat(data.Receivables);
                     } else if (this.SelectedType == 'OP|DR|CR|CL') {
                       this.payablestot += parseFloat(data.Payable.replace(/,/g, ''));
                       this.receivabletot += parseFloat(data.Receivable.replace(/,/g, ''));
                     }
                   });
                 } else if (this.SelectedView == 'InvDetailed') {
                   this.isSelect = 'ListTblDetailed';
                   if (this.service.OptSelected == 'ConsolidatedReport') {
                     this.backNav = 'gotoCreDsahboard';
                   } else {
                     this.backNav = 'initial';
                   }

                   this.DetailedData = response;
                   this.HighlightRow2 = this.DetailedData[0];
                   if (response.length > 0 && response[0].ResultSet == 'OK') {
                     this.DetailedData.forEach((data:any) => {
                       this.detsalestot += data.Sales;
                       this.detreceipttot += data.Receipts;
                     });
                     if (response[0].openingAmt > 0) {
                       this.OpenBalreceivable = Math.abs(response[0].openingAmt);
                     } else if (response[0].openingAmt < 0) {
                       this.OpenBalpayable = Math.abs(response[0].openingAmt);
                     } else {
                       this.openingAmt = 0;
                     }
                     this.salestot = this.detsalestot + this.OpenBalreceivable;
                     this.receipttot = this.detreceipttot + this.OpenBalpayable;
                     if (this.salestot - this.receipttot < 0) {
                       this.InvDetailedpayable = Math.abs(this.salestot - this.receipttot);
                     } else if (this.salestot - this.receipttot > 0) {
                       this.InvDetailedreceivable = Math.abs(this.salestot - this.receipttot);
                     } else if (this.salestot - this.receipttot == 0) {
                       this.InvDetailedcloBal = Math.abs(this.salestot - this.receipttot);
                     }
                   } else if (response[0].ResultSet == 'OnlyOpening') {
                     this.detsalestot = 0; this.detreceipttot = 0;
                     if (response[0].openingAmt > 0) {
                       this.OpenBalreceivable = Math.abs(response[0].openingAmt);
                     } else if (response[0].openingAmt < 0) {
                       this.OpenBalpayable = Math.abs(response[0].openingAmt);
                     } else {
                       this.openingAmt = 0;
                     }
                     this.salestot = this.detsalestot + this.OpenBalreceivable;
                     this.receipttot = this.detreceipttot + this.OpenBalpayable;
                     if (this.salestot - this.receipttot < 0) {
                       this.InvDetailedpayable = Math.abs(this.salestot - this.receipttot);
                     } else if (this.salestot - this.receipttot > 0) {
                       this.InvDetailedreceivable = Math.abs(this.salestot - this.receipttot);
                     } else if (this.salestot - this.receipttot == 0) {
                       this.InvDetailedcloBal = Math.abs(this.salestot - this.receipttot);
                     }
                   }
                 }
               } else {
                 Swal.fire({ text: 'No Records Found' });
               }
             }, (err) => {
               Swal.fire({ text: 'Server Response Failed' });
               this.loading = false;
             }));
           } else {
             Swal.fire({ text: 'Select  Location' });
           }
         } else {
           Swal.fire({ text: 'Please Select Debtors !!' });
         }
       } else if (this.option == 'creditor') {
         if (this.creditor != '' && this.creditor != undefined) {
           if (this.SelectedView) {
             if (this.CLocation) {
               if (this.CLocation == 'All' || this.CLocation == 'ALL') {
                 this.loccode = 0;
               } else {
                 this.loccode = this.CLocation;
               }
               this.isloader = true;
               this.loading = true; let reqForCLedgerdata;

               if (this.SelectedView == 'Monthly') {
                 this.SelectedType = 'Purchase';
                 reqForCLedgerdata = {
                   reqMainreq: 'PURLEDGMONTHLY', Usr: this.globals.gUsrid, var1: this.SelectedView, var2: this.pipe.transform(this.DebtorForm.value.fdate, 'dd-MMM-yyyy'), var3: this.pipe.transform(this.DebtorForm.value.tdate, 'dd-MMM-yyyy'), var4: this.loccode, var5: this.CreditorS_code, var6: this.DebtorForm.value.defaultYear, var7: this.SelectedType, var8: this.DebtorForm.value.stateValue,
                 };
               } else if (this.SelectedView == 'Consolidated') {
                 reqForCLedgerdata = {
                   reqMainreq: 'PURLEDGMONTHLY', Usr: this.globals.gUsrid, var1: this.SelectedView, var2: this.pipe.transform(this.DebtorForm.value.fdate, 'dd-MMM-yyyy'), var3: this.pipe.transform(this.DebtorForm.value.tdate, 'dd-MMM-yyyy'), var4: this.loccode, var5: this.CreditorS_code, var6: this.DebtorForm.value.defaultYear, var7: this.SelectedType, var8: this.DebtorForm.value.stateValue,
                 };
               } else {
                 this.SelectedType = 'Purchase';
                 reqForCLedgerdata = {
                   reqMainreq: 'PURLEDGMONTHLY', Usr: this.globals.gUsrid, var1: this.SelectedView, var2: this.pipe.transform(this.DebtorForm.value.fdate, 'dd-MMM-yyyy'), var3: this.pipe.transform(this.DebtorForm.value.tdate, 'dd-MMM-yyyy'), var4: this.loccode, var5: this.CreditorS_code, var6: this.DebtorForm.value.defaultYear, var7: this.SelectedType, var8: this.DebtorForm.value.stateValue,
                 };
               }
               this.subs.add(this.service.PostCreditor(reqForCLedgerdata).subscribe((result: any) => {
                 const response = result;
                 this.loading = false; this.isloader = false;
                 if (response.length > 0) {
                   if (this.SelectedView == 'Monthly') {
                     this.value = 'Consolidated';
                     if (this.service.OptSelected == 'ConsolidatedReport') {
                       this.backNav = 'gotoCreDsahboard';
                     } else {
                       this.backNav = 'initial';
                     }

                     if (response[0].CrOpening > 0) {
                       this.openStk = response[0].CrOpening;
                     }
                     if (response[0].DrOpening > 0) {
                       this.openstkdr = response[0].DrOpening;
                     }
                     this.MonthlyData = response;
                     this.HighlightRow = this.MonthlyData[0];
                     this.isSelect = 'ListTblMonthly';
                     this.MonthlyData.forEach((element:any) => {
                       this.debittot += element.Sales;
                       this.credittot += element.Receipts;
                       let varOpn = 0;
                       varOpn = (element.Varopntot + this.credittot) - this.debittot;
                       if (varOpn < 0) {
                         element.Closing = `${new Intl.NumberFormat('en-IN', { minimumFractionDigits: this.number, maximumFractionDigits: this.number }).format(Math.abs(varOpn))} ` + 'Dr';
                       } else {
                         element.Closing = `${new Intl.NumberFormat('en-IN', { minimumFractionDigits: this.number, maximumFractionDigits: this.number }).format(Math.abs(varOpn))} ` + ' Cr';
                       }
                     });
                     this.debittot += this.openStk;
                     this.credittot += this.openstkdr;
                     this.TotDrOpening = this.debittot;
                     this.TotCrOpening = this.credittot;
                     if ((this.TotDrOpening - this.TotCrOpening) < 0) {
                       this.ClosingPayable = Math.abs(this.TotDrOpening - this.TotCrOpening);
                     } else if (this.TotDrOpening - this.TotCrOpening > 0) {
                       this.ClosingReceivable = Math.abs(this.TotDrOpening - this.TotCrOpening);
                     } else if ((this.TotDrOpening - this.TotCrOpening) == 0) {
                       this.closingBal = Math.abs(this.TotDrOpening - this.TotCrOpening);
                     }
                   } else if (this.SelectedView == 'Consolidated') {
                     this.isSelect = 'ListTblConstd';
                     this.value = 'Detailed';
                     if (this.service.OptSelected == 'ConsolidatedReport') {
                       this.backNav = 'gotoCreDsahboard';
                     } else {
                       this.backNav = 'initial';
                     }

                     this.ConsolidatedData = response;
                     this.HighlightRow1 = this.ConsolidatedData[0];
                     this.ConsolidatedData.forEach((data:any) => {
                       if (this.SelectedType == 'Closing Balance') {
                         this.payablestot += data.Payables;
                         this.receivabletot += data.Receivables;
                       } else if (this.SelectedType == 'OP|DR|CR|CL') {
                         this.payablestot += parseFloat(data.ClosingPayble.replace(/,/g, ''));
                         this.receivabletot += parseFloat(data.ClosingPurchase.replace(/,/g, ''));
                       }
                     });
                   } else if (this.SelectedView == 'InvDetailed') {
                     this.isSelect = 'ListTblDetailed';
                     if (this.service.OptSelected == 'ConsolidatedReport') {
                       this.backNav = 'gotoCreDsahboard';
                     } else {
                       this.backNav = 'initial';
                     }

                     this.DetailedData = response;
                     this.HighlightRow2 = this.DetailedData[0];
                     if (response.length > 0 && response[0].ResultSet == 'OK') {
                       this.DetailedData.forEach((data:any) => {
                         this.detsalestot += data.Sales;
                         this.detreceipttot += data.Receipts;
                       });
                       if (response[0].openingAmt > 0) {
                         this.OpenBalreceivable = Math.abs(response[0].openingAmt);
                       } else if (response[0].openingAmt < 0) {
                         this.OpenBalpayable = Math.abs(response[0].openingAmt);
                       } else {
                         this.openingAmt = 0;
                       }
                       this.salestot = this.detsalestot + this.OpenBalreceivable;
                       this.receipttot = this.detreceipttot + this.OpenBalpayable;
                       if (this.salestot - this.receipttot < 0) {
                         this.InvDetailedpayable = Math.abs(this.salestot - this.receipttot);
                       } else if (this.salestot - this.receipttot > 0) {
                         this.InvDetailedreceivable = Math.abs(this.salestot - this.receipttot);
                       } else if (this.salestot - this.receipttot == 0) {
                         this.InvDetailedcloBal = Math.abs(this.salestot - this.receipttot);
                       }
                     } else if (response[0].ResultSet == 'OnlyOpening') {
                       this.detsalestot = 0; this.detreceipttot = 0;
                       if (response[0].openingAmt > 0) {
                         this.OpenBalreceivable = Math.abs(response[0].openingAmt);
                       } else if (response[0].openingAmt < 0) {
                         this.OpenBalpayable = Math.abs(response[0].openingAmt);
                       } else {
                         this.openingAmt = 0;
                       }
                       this.salestot = this.detsalestot + this.OpenBalreceivable;
                       this.receipttot = this.detreceipttot + this.OpenBalpayable;
                       if (this.salestot - this.receipttot < 0) {
                         this.InvDetailedpayable = Math.abs(this.salestot - this.receipttot);
                       } else if (this.salestot - this.receipttot > 0) {
                         this.InvDetailedreceivable = Math.abs(this.salestot - this.receipttot);
                       } else if (this.salestot - this.receipttot == 0) {
                         this.InvDetailedcloBal = Math.abs(this.salestot - this.receipttot);
                       }
                     }
                   }
                 } else {
                   Swal.fire({ text: 'No Record Found' });
                 }
               }, (err) => {
                 Swal.fire({ text: 'Server Response Failed' });
                 this.loading = false;
               }));
             } else {
               Swal.fire({ text: 'Select Finbook' });
             }
           } else {
             Swal.fire({ text: 'Please Select View !!' });
           }
         } else {
           Swal.fire({ text: 'Please Select Creditors !!' });
         }
       }
     }
   } else {
     Swal.fire('Choose dates between the financial year');
   }
 }

 consoltdexcel(): void {
   let file:any;
   if (this.option == 'debtor') {
     if (this.MonthFdate && this.MonthTdate) {
       file = `${this.customername}-${this.branchname}-${this.MonthFdate}-${this.MonthTdate}.xlsx`;
     } else {
       file = `${this.customername}-${this.branchname}-${this.pipe.transform(this.DebtorForm.get('fdate').value, 'dd-MMM-yyyy')}-${this.pipe.transform(this.DebtorForm.get('tdate').value, 'dd-MMM-yyyy')}.xlsx`;
     }
   } else if (this.option == 'creditor') {
     if (this.MonthFdate && this.MonthTdate) {
       file = `${this.CreditorS_name}-${this.CLocation}-${this.MonthFdate}-${this.MonthTdate}.xlsx`;
     } else {
       file = `${this.CreditorS_name}-${this.CLocation}-${this.pipe.transform(this.DebtorForm.get('fdate').value, 'dd-MMM-yyyy')}-${this.pipe.transform(this.DebtorForm.get('tdate').value, 'dd-MMM-yyyy')}.xlsx`;
     }
   }
   // let file = "Organization level Consolidated Ledgerwise Report" + '.xlsx'
   const element = document.getElementById('info_consolidate');
   const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
   const wb: XLSX.WorkBook = XLSX.utils.book_new();
   XLSX.utils.book_append_sheet(wb, ws, 'Sheet');
   XLSX.writeFile(wb, file);
 }

 Detailedexcel(): void {
   let file:any;
   if (this.option == 'debtor') {
     if (this.value != 'Detailed' && this.SelectedView == 'InvDetailed') {
       file = `${this.customername}-${this.branchname}-${this.pipe.transform(this.DebtorForm.get('fdate').value, 'dd-MMM-yyyy')}-${this.pipe.transform(this.DebtorForm.get('tdate').value, 'dd-MMM-yyyy')}.xlsx`;
     } else if (this.value == 'Detailed' && this.SelectedView == 'InvDetailed') {
       file = `${this.debtorname}-${this.branchname}-${this.pipe.transform(this.DebtorForm.get('fdate').value, 'dd-MMM-yyyy')}-${this.pipe.transform(this.DebtorForm.get('tdate').value, 'dd-MMM-yyyy')}.xlsx`;
     } else {
       file = `${this.debtorname}-${this.branchname}-${this.MonthFdate}-${this.MonthTdate}.xlsx`;
     }
   } else if (this.option == 'creditor') {
     if (this.SelectedView == 'InvDetailed') {
       file = `${this.CreditorS_name}-${this.CLocation}-${this.pipe.transform(this.DebtorForm.get('fdate').value, 'dd-MMM-yyyy')}-${this.pipe.transform(this.DebtorForm.get('tdate').value, 'dd-MMM-yyyy')}.xlsx`;
     } else {
       file = `${this.creditorname}-${this.CLocation}-${this.MonthFdate}-${this.MonthTdate}.xlsx`;
     }
   }
   // let file = "Organization level Detailed Ledgerwise Report" + '.xlsx'
   const element = document.getElementById('info_detailed');
   const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
   const wb: XLSX.WorkBook = XLSX.utils.book_new();
   XLSX.utils.book_append_sheet(wb, ws, 'Sheet');
   XLSX.writeFile(wb, file);
 }

 DashboardValue() {
   if (this.service.OptSelected == 'ConsolidatedReport') {
     this.option = 'creditor';
     this.SelectedView = this.service.ReportType;
     this.DebtorForm.get('fdate').setValue(this.service.From);
     this.DebtorForm.get('tdate').setValue(this.service.To);
     this.SelectedType = this.service.Status;
     this.DebtorForm.get('defaultYear').setValue(this.service.FinYear);
     this.DebtorForm.get('stateValue').setValue(this.service.region);
     this.CreditorS_code = 0;
     this.loccode = 0; this.creditor = 'ALL';
     this.CreditorS_name = 'ALL'; this.CLocation = 'All';
     this.backNav = 'gotoCreDsahboard';
     this.proceed();
     this.isSelect = 'ListTblConstd';
   }
 }

 onOpen() {
   this.appendFooter();
 }

 onOpen1() {
   this.appendFooter1();
 }

 today(date:any) {
   const todaydate = new Date(moment().locale('en').format('MMM DD, YYYY HH:MM'));
   // formatDate(new Date(),'yyyy-MM-dd','en');
   this.DebtorForm.get(date).setValue(todaydate);
   if (date == 'fdate') {
     this.picker.close();
   } else {
     this.picker1.close();
   }
 }

 private appendFooter() {
   const matCalendar = document.getElementsByClassName('mat-datepicker-content')[0] as HTMLElement;
   matCalendar.appendChild(this.datepickerFooter.nativeElement);
 }

 private appendFooter1() {
   const matCalendar1 = document.getElementsByClassName('mat-datepicker-content')[0] as HTMLElement;
   matCalendar1.appendChild(this.datepickerFooter1.nativeElement);
 }
}
