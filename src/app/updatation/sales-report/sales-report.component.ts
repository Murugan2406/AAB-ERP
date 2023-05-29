/* eslint-disable no-useless-concat */
/* eslint-disable no-redeclare */
/* eslint-disable camelcase */
/* eslint-disable block-scoped-var */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-param-reassign */
/* eslint-disable no-var */
/* eslint-disable vars-on-top */
/* eslint-disable no-loop-func */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-shadow */
/* eslint-disable eqeqeq */
/* eslint-disable max-len */
/* eslint-disable no-sequences */
/* eslint-disable no-plusplus */
/* eslint-disable no-unused-expressions */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-duplicates */
/* eslint-disable no-unused-vars */
import {
  Component, ElementRef, OnInit, ViewChild,
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import * as XLSX from 'xlsx';
import { Router } from '@angular/router';
import { debounceTime } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { Globals } from 'src/app/globals';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE, DateAdapter } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import * as _moment from 'moment';
import { SubSink } from 'subsink';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Moment } from 'moment';
import moment from 'moment';
import { InventoryService } from '../services/inventory.service';
import { ItemserviceService } from '../services/itemservice.service';

declare let $: any;
export const MY_FORMATS = {
  parse: {
    dateInput: 'DD-MMM-YYYY',
  },
  display: {
    dateInput: 'DD-MMM-YYYY',
    monthYearLabel: 'DD MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'DD MMM YYYY',
  },
};
@Component({
  selector: 'app-sales-report',
  templateUrl: './sales-report.component.html',
  styleUrls: ['./sales-report.component.css'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class SalesReportComponent implements OnInit {
  @ViewChild('picker') picker: any;

 @ViewChild('picker1') picker1: any;

  @ViewChild('datepickerFooter') datepickerFooter: ElementRef | any;

  @ViewChild('datepickerFooter1') datepickerFooter1: ElementRef | any;

 private subs = new SubSink();

 selectedValue: any;

 patchrate = 'INR';

 patchcompany = 'ADYAR ANANDA BHAVAN';

 patchstate = 'ALL';

  patchregion = 'ALL';

 patchcostcntr = 'ALL';

 patchbranch = 'ALL';

 patchformat = 'Datewise';

 patchfromdate: any;

 patchtax = 'With Tax';

 patchtodate: any;

 selid = 'GROUPLIST';

 patchproduct = 'ALL';

  Branchlocation: any;

 Branchloccntrl: FormControl;

 SalesReportform: FormGroup | any;

 dropdownList1: any;

 patchcat: any;

 showtrue1: boolean = true;

 terminallist: any;

 checkboxval = 0;

 check = true;

  dropdownSettings: any;

 showtrue = true;

 post: any;

 dropdownSettings1: any;

 Brname: any;

 brcode: any;

 date: any;

 items: any;

 subcatlist: any;

 loaddefaultSubCat: any;

 loaddefaultSubCat1: any;

 loaddefaultCat: any;

 loaddefaultCat1: any;

  regionList: any;

 stateslist: any;

 company: any;

 companyID: any;

 stateID = 'ALL';

 patchfyear = '';

 patchmode = 'GST';

 Financial: any;

 GSTVAT: any;

  regionid: any;

 costid: any;

 Fixedloc: any;

 Fixedloc1: any;

 SelectedLoc: any;

 BRcode = '0';

 todate: any;

 fromdate: any;

 dateval1: any;

 dateval: any;

 Defaultload: any;

 changeYr: any;

 Defaultyear: any;

 tname = `ZHSTK${this.globals.gSessionId}`

  frmtdate: any;

 frmtdate1: any;

 isload: boolean = false;

 patchfromdate1: any;

 patchtodate1: any;

 tRegion: any;

  branchlist: any = [];

 brname = 'ALL';

 GclientServer: boolean = false;

 startDate = '01-04-2021';

 limitSelection = true;

 dropdownList: any;

 salestype: any;

 option: any;

 taxdata: any;

 report: any;

 rate: any;

 format: any;

 patchterminal: any;

 patchoption = 'All Type Of Sales';

 patchsalestype = 'ALL';

 selectedYr: any;

 formatID: any;

 SalesONE = true;

 SalesTWO = false;

 salesdata: any;

 salesviewdata: any = [];

 salesview: any[] = [];

  Total: number = 0;

 Sales: number = 0;

 Outdoor: number = 0;

 Hall: number = 0;

 Cst: number = 0;

 Lodge: number = 0;

 Scrap: number = 0;

 salesviewhead: any;

 salesviewslice: any;

 salesviewone: any;

 salesviewjson: any;

 showempty: boolean = false;

 id: any;

 result: any;

 keyItem: any;

 grpfinal: any;

 keyitem2: any;

  Taxper: number = 0;

 NetAmt: number = 0;

 SGST: number = 0;

 CGST: number = 0;

 IGST: number = 0;

 Cess: number = 0;

 GrossAmt: number = 0;

 thirdarr: any;

 thirdkey: any;

 keyitem3: any;

  taxarr: any;

 coinage: any;

 total: number = 0;

 Cash: number = 0;

 Card: number = 0;

 Credit: number = 0;

 Token: number = 0;

 resultARR: any;

 consolidatedData: any;

 A2B_GREENS: any;

 BAKERY: any;

 ICE_CREAMS: any;

 RESTAURANT: any;

 SAVOURIES: any;

 SWEETS: any;

 TOTAL: any;

  Sertax: any;

 Vat: any;

 Billamt: any;

 Serchar: any;

 Stax: any;

 Transport: any;

 Vessels: any;

 Others: any;

 Coi: any;

 Taxamount: any;

 TaxValue: any;

 Svalue: any;

 constructor(
private fb: FormBuilder,
   public itemservice: ItemserviceService,
    public snackbar: MatSnackBar,
private datePipe: DatePipe,
     public globals: Globals,
private router: Router,
 ) {
   this.itemservice.get_salesrep_URL = `${this.globals.gApiserver}/api/datareqrshFive`;
   this.itemservice.get_URL = `${this.globals.gApiserver}/api/datareqsarnTwo`;
   this.SalesReportform = this.fb.group({
     company: [''], state: [''], region: [''], rtype: [''], cat: [''], tax: [''], opt: [''], frmt: [''], stype: [''], fromdate: [''], todate: [''], terminal: [''], fyear: [''], mode: [''], own: [''], currency: [''],
   });
   this.Branchloccntrl = new FormControl();
   this.selid = this.globals.SelectDashboard;
 }

 ngOnInit() {
   if (this.globals.gclientServer == 'Client') {
     this.GclientServer = true;
   } else {
     this.GclientServer = false;
   }
   this.modelChange();
   this.defaultterminal();
   this.getsalestype();
   this.regionlist();
   this.statelist();
   this.companylist();
   this.formLoaddefault();
   this.defaultcategory();
   this.getFinancialYear();
   this.getgstvat(); this.getcurrency();
   this.dateformat();
   this.optionlist();
   this.reporttype();
   this.taxformat();
   this.dropdownSettings = {
     singleSelection: false, idField: 'cat4', textField: 'cat4', enableCheckAll: true, allowSearchFilter: true, selectAllText: 'ALL', unSelectAllText: 'ALL', itemsShowLimit: 2, dropDownSelect: false,
   };
   this.dropdownSettings1 = {
     singleSelection: false, idField: 'saletype', textField: 'saletype', enableCheckAll: true, allowSearchFilter: true, selectAllText: 'ALL', unSelectAllText: 'ALL', itemsShowLimit: 2, dropDownSelect: false,
   };
   if (this.salesviewjson != undefined) {
     this.salesviewone = JSON.parse(localStorage.getItem('salesview') || '');
   }
 }

 getFinancialYear() {
   this.post = {};
   this.post.reqMainreq = 'Financialyearload', this.post.Usr = this.globals.gUsrid;
   this.subs.add(this.itemservice.getSalesReportAPI(this.post).subscribe((data) => {
     this.Financial = data;
     this.patchfyear = this.Financial[0].CurrentFyear;
   }));
 }

 getgstvat() {
   this.post = {};
   this.post.reqMainreq = 'GstVatload', this.post.Usr = this.globals.gUsrid;
   this.subs.add(this.itemservice.getSalesReportAPI(this.post).subscribe((data) => {
     this.GSTVAT = data;
   }));
 }

 getcurrency() {
   this.post = {};
   this.post.reqMainreq = 'Currencyload', this.post.Usr = this.globals.gUsrid;
   this.subs.add(this.itemservice.getSalesReportAPI(this.post).subscribe((data) => {
     this.rate = data;
   }));
 }

 formLoaddefault() {
   this.post = {};
   this.post.reqMainreq = 'FormLoadDefault', this.post.Usr = this.globals.gUsrid, this.post.brcode = '0', this.post.var1 = '0', this.post.var2 = '0', this.post.var3 = '0', this.post.var4 = '0',
   this.post.var5 = '0', this.post.var6 = '0', this.post.var7 = '0', this.post.var8 = '0', this.post.var9 = '0', this.post.var10 = '0', this.post.var11 = '0', this.post.var12 = '0', this.post.var13 = '0', this.post.var14 = '0', this.post.var15 = '0',
   this.post.var16 = '0', this.post.var17 = '0', this.post.var18 = '0', this.post.var19 = '0', this.post.var20 = '0',
   this.subs.add(this.itemservice.getItemMovement(this.post).subscribe((data) => {
     this.Defaultload = data;
     for (let index = 0; index < this.Defaultload.length; index++) {
       const element = this.Defaultload[index];
       this.selectedValue = element.Company;
       this.patchregion = element.Region;
       this.patchstate = element.State;
     }
   }));
   const val = 1;
   this.post = {};
   this.post.var2 = val;
   this.post.reqMainreq = 'ChangeFinancialYear',
   this.post.Usr = this.globals.gUsrid,
   this.post.brcode = '0', this.post.var1 = 'ALL', this.post.var3 = '0', this.post.var4 = '0', this.post.var5 = '0',
   this.post.var6 = '0', this.post.var7 = '0', this.post.var8 = '0', this.post.var9 = '0', this.post.var10 = '0', this.post.var11 = '0', this.post.var12 = '0', this.post.var13 = '0',
   this.post.var14 = '0', this.post.var15 = '0', this.post.var16 = '0', this.post.var17 = '0', this.post.var18 = '0', this.post.var19 = '0', this.post.var20 = '0',
   this.subs.add(this.itemservice.getItemMovement(this.post).subscribe((data) => {
     this.changeYr = data;
     for (let index = 0; index < this.changeYr.length; index++) {
       const element = this.changeYr[index];
       this.Defaultyear = element.fyear;
       this.patchfromdate = element.FromDate;
       this.patchtodate = element.Todate;
     }
     this.patchfromdate1 = this.datePipe.transform(this.patchfromdate, 'dd-MMM-yyyy');
     this.patchtodate1 = this.datePipe.transform(this.patchtodate, 'dd-MMM-yyyy');
   }));
 }

 companylist() {
   this.post = {};
   this.post.reqMainreq = 'Companyload', this.post.Usr = this.globals.gUsrid, this.post.brcode = '0', this.post.var1 = '0', this.post.var2 = '0',
   this.post.var3 = '0', this.post.var4 = '0', this.post.var5 = '0', this.post.var6 = '0', this.post.var7 = '0', this.post.var8 = '0', this.post.var9 = '0',
   this.post.var10 = '0', this.post.var11 = '0', this.post.var12 = '0', this.post.var13 = '0', this.post.var14 = '0',
   this.post.var15 = '0', this.post.var16 = '0', this.post.var17 = '0', this.post.var18 = '0', this.post.var19 = '0', this.post.var20 = '0',
   this.subs.add(this.itemservice.getSalesReportAPI(this.post).subscribe((data) => {
     this.company = data;
   }));
 }

 getsalestype() {
   this.post = {};
   this.post.reqMainreq = 'Saletypeload', this.post.Usr = this.globals.gUsrid, this.post.brcode = '0';
   if (this.patchmode == 'GST') {
     this.post.var1 = 'gst';
   } else if (this.patchmode == 'VAT') {
     this.post.var1 = 'vat';
   }
   this.subs.add(this.itemservice.getSalesReportAPI(this.post).subscribe((data) => {
     this.salestype = data;
   }));
 }

 statelist() {
   this.post = {};
   this.post.reqMainreq = 'Stateload',
   this.post.Usr = this.globals.gUsrid, this.post.brcode = '0', this.post.var1 = '0', this.post.var2 = '0', this.post.var3 = '0', this.post.var4 = '0', this.post.var5 = '0', this.post.var6 = '0', this.post.var7 = '0', this.post.var8 = '0', this.post.var9 = '0', this.post.var10 = '0', this.post.var11 = '0', this.post.var12 = '0', this.post.var13 = '0', this.post.var14 = '0', this.post.var15 = '0',
   this.post.var16 = '0', this.post.var17 = '0', this.post.var18 = '0', this.post.var19 = '0', this.post.var20 = '0',
   this.subs.add(this.itemservice.getSalesReportAPI(this.post).subscribe((data) => {
     this.stateslist = data;
   }));
 }

 regionlist() {
   this.post = {};
   this.post.reqMainreq = 'Regionload', this.post.Usr = this.globals.gUsrid, this.post.brcode = '0',
   this.post.var1 = this.stateID,
   this.subs.add(this.itemservice.getSalesReportAPI(this.post).subscribe((data) => {
     this.regionList = data;
   }));
 }

 dateformat() {
   this.post = {};
   this.post.reqMainreq = 'Dateformatload', this.post.Usr = this.globals.gUsrid;
   this.subs.add(this.itemservice.getSalesReportAPI(this.post).subscribe((data) => {
     this.format = data;
   }));
 }

 taxformat() {
   this.post = {};
   this.post.reqMainreq = 'Taxformatload', this.post.Usr = this.globals.gUsrid;
   if (this.patchmode == 'GST') {
     this.post.var1 = 'gst';
   } else if (this.patchmode == 'VAT') {
     this.post.var1 = 'vat';
   }
   this.subs.add(this.itemservice.getSalesReportAPI(this.post).subscribe((data) => {
     this.taxdata = data;
   }));
 }

 optionlist() {
   this.post = {};
   this.post.reqMainreq = 'Optionsload', this.post.Usr = this.globals.gUsrid;
   if (this.patchmode == 'GST') {
     this.post.var1 = 'gst';
   } else if (this.patchmode == 'VAT') {
     this.post.var1 = 'vat';
   }
   this.post.var2 = this.patchsalestype, this.post.var3 = this.patchtax, this.post.var4 = this.patchformat;
   this.subs.add(this.itemservice.getSalesReportAPI(this.post).subscribe((data) => {
     this.option = data;
     this.reporttype();
   }));
 }

  patchrtype = 'Detailed'

  reporttype() {
    this.post = {};
    this.post.reqMainreq = 'Reporttypeload', this.post.Usr = this.globals.gUsrid;
    if (this.patchmode == 'GST') {
      this.post.var1 = 'gst';
    } else if (this.patchmode == 'VAT') {
      this.post.var1 = 'vat';
    }
    this.post.var2 = this.patchsalestype, this.post.var3 = this.patchtax, this.post.var4 = this.patchformat,
    this.post.var5 = this.patchoption;
    this.subs.add(this.itemservice.getSalesReportAPI(this.post).subscribe((data) => {
      this.report = data;
    }));
  }

  changesel() {
    this.patchoption = '';
    this.patchformat = '';
    this.patchsalestype = '';
    this.patchrtype = '';
    this.reporttype();
    this.optionlist();
    this.taxformat();
    this.dateformat();
    this.getsalestype();
  }

  changetax() {
    this.reporttype();
    this.optionlist();
  }

  changedatefrmt() {
    this.reporttype();
    this.optionlist();
  }

  changeopt() {
    this.reporttype();
  }

  styperchange() {
    this.reporttype();
    this.optionlist();
  }

  changeloc(evt: any, brcode: any) {
    if (evt.source.selected) {
      this.SelectedLoc = evt.source.value;
      this.BRcode = brcode;
    }
  }

  companychange(id: any) {
    this.companyID = id;
    this.post = {};
    this.post.var1 = id, this.post.reqMainreq = 'Sel_Change_Cmp_State', this.post.Usr = this.globals.gUsrid, this.post.brcode = '0', this.post.var1 = id, this.post.var2 = '0', this.post.var3 = '0', this.post.var5 = '0',
    this.post.var6 = '0', this.post.var7 = '0', this.post.var8 = '0', this.post.var9 = '0', this.post.var10 = '0', this.post.var11 = '0', this.post.var12 = '0', this.post.var13 = '0', this.post.var14 = '0',
    this.post.var15 = '0', this.post.var16 = '0', this.post.var17 = '0', this.post.var18 = '0', this.post.var19 = '0',
    this.post.var20 = '0', this.subs.add(this.itemservice.getItemMovement(this.post).subscribe((data) => {
      this.stateslist = data;
      this.patchstate = 'ALL';
    }));
    this.post = {};
    this.post.reqMainreq = 'Sel_Change_Cmp_Region', this.post.Usr = this.globals.gUsrid, this.post.brcode = '0', this.post.var1 = id, this.post.var2 = '0', this.post.var3 = '0', this.post.var4 = '0',
    this.post.var5 = '0', this.post.var6 = '0', this.post.var7 = '0', this.post.var8 = '0', this.post.var9 = '0',
    this.post.var10 = '0', this.post.var11 = '0', this.post.var12 = '0', this.post.var13 = '0',
    this.post.var14 = '0', this.post.var15 = '0', this.post.var16 = '0', this.post.var17 = '0', this.post.var18 = '0', this.post.var19 = '0',
    this.post.var20 = '0',
    this.subs.add(this.itemservice.getItemMovement(this.post).subscribe((data) => {
      this.regionList = data;
      this.patchregion = 'ALL';
    }));
    this.post = {};
    if (this.stateID == undefined || this.stateID == '') {
      this.post.var4 = 'ALL';
    } else {
      this.post.var4 = this.stateID;
    }
    if (this.regionid == undefined || this.regionid == '') {
      this.post.var5 = 'ALL';
    } else {
      this.post.var5 = this.regionid;
    }
    if (this.costid == undefined) {
      this.post.var6 = 'ALL';
    } else {
      this.post.var6 = this.costid;
    }
    this.post.reqMainreq = 'BranchSelection', this.post.Usr = this.globals.gUsrid, this.post.brcode = '0', this.post.var1 = '',
    this.post.var2 = '0', this.post.var3 = id, this.post.var7 = '0', this.post.var8 = '0', this.post.var9 = '0', this.post.var10 = '0', this.post.var11 = '0',
    this.post.var12 = '0', this.post.var13 = '0', this.post.var14 = '0', this.post.var15 = '0', this.post.var16 = '0', this.post.var17 = '0', this.post.var18 = '0', this.post.var19 = '0',
    this.post.var20 = '0',
    this.subs.add(this.itemservice.getItemMovement(this.post).subscribe((data) => {
      this.Branchlocation = data;
      this.Fixedloc = [];
      for (let index = 0; index < this.Branchlocation.length; index++) {
        const element = this.Branchlocation[index];
        this.Fixedloc.push(element);
        this.patchbranch = '';
        this.regionid = '';
        this.stateID = '';
      }
    }));
  }

  statechange(state: any) {
    this.stateID = state.State;
    this.post = {};
    if (this.companyID == undefined) {
      this.post.var1 = 'ADYAR ANANDA BHAVAN';
    } else {
      this.post.var1 = this.companyID;
    }
    this.post.reqMainreq = 'Sel_Change_State_Region', this.post.Usr = this.globals.gUsrid,
    this.post.brcode = '0', this.post.var2 = this.stateID, this.post.var3 = '0', this.post.var4 = '0', this.post.var5 = '0',
    this.post.var6 = '0', this.post.var7 = '0', this.post.var8 = '0', this.post.var9 = '0',
    this.post.var10 = '0', this.post.var11 = '0', this.post.var12 = '0', this.post.var13 = '0', this.post.var14 = '0',
    this.post.var15 = '0', this.post.var16 = '0', this.post.var17 = '0', this.post.var18 = '0', this.post.var19 = '0',
    this.post.var20 = '0',
    this.subs.add(this.itemservice.getItemMovement(this.post).subscribe((data) => {
      this.regionList = data;
    }));
    this.post = {};
    if (this.companyID == undefined) {
      this.post.var3 = 'ADYAR ANANDA BHAVAN';
    } else {
      this.post.var3 = this.companyID;
    }
    if (this.regionid == undefined || this.regionid == '') {
      this.post.var5 = 'ALL';
    } else {
      this.post.var5 = this.regionid;
    }
    if (this.costid == undefined || this.costid == '') {
      this.post.var6 = 'ALL';
    } else {
      this.post.var6 = this.costid;
    }
    this.post.reqMainreq = 'BranchSelection', this.post.Usr = this.globals.gUsrid, this.post.brcode = '0', this.post.var1 = '', this.post.var2 = '0',
    this.post.var4 = this.stateID, this.post.var7 = '0', this.post.var8 = '0', this.post.var9 = '0', this.post.var10 = '0', this.post.var11 = '0', this.post.var12 = '0', this.post.var13 = '0', this.post.var14 = '0',
    this.post.var15 = '0', this.post.var16 = '0', this.post.var17 = '0', this.post.var18 = '0', this.post.var19 = '0',
    this.post.var20 = '0',
    this.subs.add(this.itemservice.getItemMovement(this.post).subscribe((data) => {
      this.Branchlocation = data;
      this.Fixedloc = [];
      for (let index = 0; index < this.Branchlocation.length; index++) {
        const element = this.Branchlocation[index];
        this.Fixedloc.push(element);
        this.patchbranch = '';
      }
    }));
  }

  Regionchange(state: any) {
    this.regionid = state.Region;
    this.post = {};
    if (this.companyID == undefined) {
      this.post.var3 = 'ADYAR ANANDA BHAVAN';
    } else {
      this.post.var3 = this.companyID;
    }
    if (this.stateID == undefined || this.stateID == '') {
      this.post.var4 = 'ALL';
    } else {
      this.post.var4 = this.stateID;
    }
    if (this.costid == undefined || this.costid == '') {
      this.post.var6 = 'ALL';
    } else {
      this.post.var6 = this.costid;
    }
    this.post.reqMainreq = 'BranchSelection',
    this.post.Usr = this.globals.gUsrid, this.post.brcode = '0', this.post.var1 = '', this.post.var2 = '0',
    this.post.var5 = this.regionid, this.post.var7 = '0', this.post.var8 = '0', this.post.var9 = '0',
    this.post.var10 = '0', this.post.var11 = '0', this.post.var12 = '0', this.post.var13 = '0', this.post.var14 = '0', this.post.var15 = '0', this.post.var16 = '0', this.post.var17 = '0', this.post.var18 = '0', this.post.var19 = '0',
    this.post.var20 = '0',
    this.subs.add(this.itemservice.getItemMovement(this.post).subscribe((data) => {
      this.Branchlocation = data;
      this.Fixedloc1 = [];
      for (let index = 0; index < this.Branchlocation.length; index++) {
        const element = this.Branchlocation[index];
        this.Fixedloc1.push(element);
        this.patchbranch = '';
      }
    }));
  }

  Fyearchange(yr: any) {
    const val = 1;
    this.selectedYr = yr;
    this.post = {};
    if (this.formatID == undefined) {
      this.post.var2 = val;
    } else {
      this.post.var2 = val;
    }
    this.post.reqMainreq = 'ChangeFinancialYear',
    this.post.Usr = this.globals.gUsrid, this.post.brcode = '0', this.post.var1 = yr, this.post.var3 = '0', this.post.var4 = '0', this.post.var5 = '0', this.post.var6 = '0', this.post.var7 = '0',
    this.post.var8 = '0', this.post.var9 = '0', this.post.var10 = '0', this.post.var11 = '0', this.post.var12 = '0', this.post.var13 = '0', this.post.var14 = '0', this.post.var15 = '0',
    this.post.var16 = '0', this.post.var17 = '0', this.post.var18 = '0', this.post.var19 = '0', this.post.var20 = '0',
    this.subs.add(this.itemservice.getItemMovement(this.post).subscribe((data) => {
      this.changeYr = data;
      for (let index = 0; index < this.changeYr.length; index++) {
        const element = this.changeYr[index];
        this.patchfyear = element.fyear;
        this.patchfromdate = element.FromDate;
        this.patchtodate = element.Todate;
        this.patchfromdate1 = this.datePipe.transform(this.patchfromdate, 'dd-MMM-yyyy');
        this.patchtodate1 = this.datePipe.transform(this.patchtodate, 'dd-MMM-yyyy');
        if (element.fyear == undefined) {
          this.patchfyear = 'ALL';
        }
      }
    }));
  }

  modelChange() {
    this.subs.add(this.Branchloccntrl.valueChanges.pipe(debounceTime(600)).subscribe((data) => {
      this.post = {};
      if (this.patchcompany == undefined) {
        this.post.var1 = 'ADYAR ANANDA BHAVAN';
      } else {
        this.post.var1 = this.patchcompany;
      }
      if (this.patchstate == 'undefined' || this.patchstate == undefined || this.patchstate == '') {
        this.post.var2 = 'ALL';
      } else {
        this.post.var2 = this.patchstate;
      }
      if (this.patchregion == 'undefined' || this.patchregion == undefined || this.patchregion == '') {
        this.post.var3 = 'ALL';
      } else {
        this.post.var3 = this.patchregion;
      }
      if (this.patchcostcntr == undefined) {
        this.post.var6 = 'ALL';
      } else {
        this.post.var6 = this.patchcostcntr;
      }
      this.post.reqMainreq = 'Branchload',
      this.post.Usr = this.globals.gUsrid, this.post.brcode = '0',
      this.post.var4 = data,
      this.Brname = data;
      if (data.length > 1) {
        this.subs.add(this.itemservice.getSalesReportAPI(this.post).subscribe((data) => {
          this.Branchlocation = data;
          for (let index = 0; index < data.length; index++) {
            const element = data[index];
            if (this.Brname == element.brname) {
              this.brcode = element.brcode;
            }
          }
        }));
      }
    }));
  }

  chosenMonthHandler(normlizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.date.value;
    ctrlValue.month(normlizedMonth.month());
    this.date.setValue(ctrlValue);
    datepicker.close();
  }

  inputEvent1(event: any) {
    this.dateval1 = event.value;
    this.fromdate = event.value;
    const changedate = this.fromdate;
    this.patchfromdate1 = this.datePipe.transform(changedate, 'dd-MMM-yyyy');
    if (this.dateval1 > this.dateval || this.dateval < this.dateval1) {
      $('#getdate').modal('show');
    }
  }

  inputEvent(event: any) {
    this.dateval = event.value;
    this.todate = event.value;
    const changedate = this.todate;
    this.patchtodate1 = this.datePipe.transform(changedate, 'dd-MMM-yyyy');
    if (this.dateval1 > this.dateval || this.dateval < this.dateval1) {
      $('#getdate').modal('show');
    }
  }

  onOpen() {
    this.appendFooter();
  }

  today() {
    const todaydate = new Date(moment().locale('en').format('MMM DD, YYYY HH:MM'));
    this.SalesReportform.get('fromdate').setValue(todaydate);
    this.patchfromdate1 = this.datePipe.transform(this.SalesReportform.value.fromdate, 'dd-MMM-yyyy');
    this.picker.close();
  }

  onOpen1() {
    this.appendFooter1();
  }

  today1() {
    const todaydate = new Date(moment().locale('en').format('MMM DD, YYYY HH:MM'));
    this.SalesReportform.get('todate').setValue(todaydate);
    this.patchtodate1 = this.datePipe.transform(this.SalesReportform.value.todate, 'dd-MMM-yyyy');
    this.picker1.close();
  }

  private appendFooter1() {
    const matCalendar = document.getElementsByClassName('mat-datepicker-content')[0] as HTMLElement;
    matCalendar.appendChild(this.datepickerFooter1.nativeElement);
  }

  private appendFooter() {
    const matCalendar = document.getElementsByClassName('mat-datepicker-content')[0] as HTMLElement;
    matCalendar.appendChild(this.datepickerFooter.nativeElement);
  }

  closelist() {
    $('#getviewlist').modal('hide');
  }

  closedate() {
    $('#getdate').modal('hide');
  }

  defaultterminal() {
    this.post = {};
    this.post.reqMainreq = 'Terminalload', this.post.Usr = this.globals.gUsrid,
    this.subs.add(this.itemservice.getSalesReportAPI(this.post).subscribe((data) => {
      this.loaddefaultSubCat = data;
      this.dropdownList1 = this.loaddefaultSubCat;
      this.patchterminal = this.loaddefaultSubCat;
      this.loaddefaultSubCat1 = [];
      const obj = [];
      for (let index = 0; index < this.loaddefaultSubCat.length; index++) {
        const element = this.loaddefaultSubCat[index];
        if (element.saletype == 'ALL') { this.loaddefaultSubCat.splice(index, 1); }
        this.loaddefaultSubCat1.push(element);
        this.dropdownList1 = this.loaddefaultSubCat;
        this.patchterminal = this.loaddefaultSubCat;
        obj.push(element);
      }
      const skillData = this.patchterminal.map((obj: any) => obj.saletype);
      const concatKey = skillData;
      this.terminallist = concatKey;
    }));
  }

  defaultcategory() {
    this.post = {};
    this.post.reqMainreq = 'Categoryload',
    this.post.Usr = this.globals.gUsrid,
    this.subs.add(this.itemservice.getSalesReportAPI(this.post).subscribe((data) => {
      this.loaddefaultCat = data;
      this.dropdownList = this.loaddefaultCat;
      this.patchcat = this.loaddefaultCat;
      this.loaddefaultCat1 = [];
      for (let index = 0; index < this.loaddefaultCat.length; index++) {
        const element = this.loaddefaultCat[index];
        if (element.cat4 == 'ALL') { this.loaddefaultCat.splice(index, 1); }
        this.loaddefaultCat1.push(element);
        this.dropdownList = this.loaddefaultCat;
        this.patchcat = this.loaddefaultCat;
      }
      const skillData = this.patchcat.map((obj: any) => obj.cat4);
      const concatKey = skillData;
      this.subcatlist = concatKey;
    }));
  }

  handleLimitSelection() {
    if (this.limitSelection) {
      this.dropdownSettings = { ...this.dropdownSettings, limitSelection: 2 };
    } else {
      this.dropdownSettings = { ...this.dropdownSettings, limitSelection: null };
    }
  }

  onSelectAll(items: any) {
    this.items = items;
    this.showtrue = true;
    this.showtrue1 = true;
    const obj: any[] = [];
    for (let index = 0; index < items.length; index++) {
      const element = items[index];
      obj.push(element);
    }
    const skillData = items.map((obj: any) => obj.cat4);
    const concatKey = skillData;
    this.subcatlist = concatKey;
  }

  len1 = 0

  onItemSelect() {
    this.showtrue = false;
    this.showtrue1 = true;
    const skillData = this.patchcat.map((obj: any) => obj.cat4);
    const concatKey = skillData;
    this.subcatlist = concatKey;
  }

  onItemDeSelect() {
    this.showtrue = false;
    this.showtrue1 = true;
    const skillData = this.patchcat.map((obj: any) => obj.cat4);
    const concatKey = skillData;
    this.subcatlist = concatKey;
  }

  onDeselectAll() {
    this.showtrue = false;
    this.showtrue1 = true;
    const skillData = this.patchcat.map((obj: any) => obj.cat4);
    const concatKey = skillData;
    this.subcatlist = concatKey;
  }

  onSelectAll1(items: any) {
    this.showtrue1 = true;
    const skillData = items.map((obj: any) => obj.saletype);
    const concatKey = skillData;
    this.terminallist = concatKey;
  }

  len = 0

  onItemSelect1(itm: any) {
    this.showtrue1 = false;
    this.len = itm.length + this.len;
    const skillData = this.patchterminal.map((obj: any) => obj.saletype);
    const concatKey = skillData;
    this.terminallist = concatKey;
  }

  onItemDeSelect1(e: any) {
    this.showtrue1 = false;
    const skillData = this.patchterminal.map((obj: any) => obj.saletype);
    const concatKey = skillData;
    this.terminallist = concatKey;
  }

  closecat() {
    $('#getcat').modal('hide');
  }

  closesub() {
    $('#getsubcat').modal('hide');
  }

  onDeselectAll1(item: any) {
    this.items = item;
    this.showtrue1 = false;
  }

  checkCheckBoxvalue(event: any) {
    if (event.checked == true) {
      this.checkboxval = 0;
    } else {
      this.checkboxval = 1;
    }
  }

  closeRec() {
    $('#getRec').modal('hide');
  }

  showcommontable = false

  viewsales() {
    this.SalesTWO = true;
    this.SalesONE = false;
    this.globals.SelectDashboard = 'SALEPAGETWO';
    this.salesviewjson = {};
    this.salesviewjson.subcategorylist = this.subcatlist;
    if (this.patchcat.length == this.dropdownList1.length) {
      this.salesviewjson.terminallist = 'ALL';
    } else {
      this.salesviewjson.terminallist = this.terminallist;
    }
    localStorage.setItem('salesview', JSON.stringify(this.salesviewjson));
    this.salesviewone = JSON.parse(localStorage.getItem('salesview') || '');
    this.post = {};
    this.post.reqMainreq = 'Salestaxtypewise';
    this.post.brcode = this.BRcode;
    if (this.patchmode == 'GST') {
      this.post.var15 = 'gst';
    } else if (this.patchmode == 'VAT') {
      this.post.var15 = 'vat';
    }
    this.post.var2 = this.patchsalestype;
    this.post.var3 = this.patchtax;
    this.post.var4 = this.patchformat;
    this.post.var5 = this.patchoption;
    this.post.var6 = this.patchrtype;
    this.post.var7 = this.patchfromdate1;
    this.post.var8 = this.patchtodate1;
    this.post.var9 = this.patchcompany;
    this.post.var10 = this.patchstate;
    this.post.var11 = this.patchregion;
    this.post.var12 = this.checkboxval;
    this.post.var13 = this.patchrate;
    this.post.var14 = '0';
    this.post.var19 = 'Branchwisesales';
    this.post.Usr = this.globals.gUsrid;
    if (this.patchoption == 'Category_Terminalwise Sales') {
      this.post.var20 = `${this.terminallist},`;
      this.post.var1 = `${this.subcatlist},`;
    } else if (this.patchoption == 'Hall Sales' || 'Outdoor Sales') {
      this.post.var20 = 'ALL';
      this.post.var1 = 0;
    } else {
      this.post.var20 = 0;
      this.post.var1 = 0;
    } this.salesviewdata = [];
    this.salesdata = [];
    this.isload = true;
    this.subs.add(this.itemservice.getSalesReportAPI(this.post).subscribe((data) => {
      this.salesdata = data;
      this.isload = false;
      // this.salesdata.forEach((r:any)=>{
      //   let rValues = Object.entries(r);
      //   rValues.forEach(function(e){
      //     // e[0] is the key and e[1] is the value
      //     let n = Number(e[1]);
      //     if (!isNaN(n)) {
      //       r[e[0]] = Number(n.toFixed(2));
      //     }
      //   })
      // })
      const res = data;
      if (this.salesdata != null && this.salesdata.length != 0) {
        this.showempty = false;
        for (let index = 0; index < this.salesdata.length; index++) {
          const element = this.salesdata[index];
          this.salesviewdata = element;
          this.Total = data.reduce((acc: any, cur: any) => acc + cur.R_Total, 0).toFixed(2);
          this.Sales = data.reduce((acc: any, cur: any) => acc + cur.R_Sales, 0).toFixed(2);
          this.Outdoor = data.reduce((acc: any, cur: any) => acc + cur.R_Outdoor, 0).toFixed(2);
          this.Hall = data.reduce((acc: any, cur: any) => acc + cur.R_Hall, 0).toFixed(2);
          this.Cst = data.reduce((acc: any, cur: any) => acc + cur.R_Cst, 0).toFixed(2);
          this.Lodge = data.reduce((acc: any, cur: any) => acc + cur.R_Lodge, 0).toFixed(2);
          this.Scrap = data.reduce((acc: any, cur: any) => acc + cur.R_OtherSale, 0).toFixed(2);
          this.Taxper = data.reduce((acc: any, cur: any) => acc + cur.R_Taxper, 0).toFixed(2);
          this.NetAmt = data.reduce((acc: any, cur: any) => acc + cur.R_NetAmt, 0).toFixed(2);
          this.SGST = data.reduce((acc: any, cur: any) => acc + cur.R_SGST, 0).toFixed(2);
          this.CGST = data.reduce((acc: any, cur: any) => acc + cur.R_CGST, 0).toFixed(2);
          this.IGST = data.reduce((acc: any, cur: any) => acc + cur.R_IGST, 0).toFixed(2);
          this.Cess = data.reduce((acc: any, cur: any) => acc + cur.R_Cess, 0).toFixed(2);
          this.GrossAmt = data.reduce((acc: any, cur: any) => acc + cur.R_GrossAmt, 0).toFixed(2);
          this.total = data.reduce((acc: any, cur: any) => acc + cur.R_Total, 0).toFixed(2);
          this.Cash = data.reduce((acc: any, cur: any) => acc + cur.R_Cash, 0).toFixed(2);
          this.Card = data.reduce((acc: any, cur: any) => acc + cur.R_Card, 0).toFixed(2);
          this.Credit = data.reduce((acc: any, cur: any) => acc + cur.R_Credit, 0).toFixed(2);
          this.Token = data.reduce((acc: any, cur: any) => acc + cur.R_Token, 0).toFixed(2);
          this.A2B_GREENS = data.reduce((acc: any, cur: any) => acc + cur.R_A2B_GREENS, 0).toFixed(2);
          this.BAKERY = data.reduce((acc: any, cur: any) => acc + cur.R_BAKERY, 0).toFixed(2);
          this.ICE_CREAMS = data.reduce((acc: any, cur: any) => acc + cur.R_ICE_CREAMS, 0).toFixed(2);
          this.RESTAURANT = data.reduce((acc: any, cur: any) => acc + cur.R_RESTAURANT, 0).toFixed(2);
          this.SAVOURIES = data.reduce((acc: any, cur: any) => acc + cur.R_SAVOURIES, 0).toFixed(2);
          this.SWEETS = data.reduce((acc: any, cur: any) => acc + cur.R_SWEETS, 0).toFixed(2);
          this.TOTAL = data.reduce((acc: any, cur: any) => acc + cur.R_TOTAL, 0).toFixed(2);
          this.coinage = data.reduce((acc: any, cur: any) => acc + cur.R_Coinage, 0).toFixed(2);
        }
        if (this.patchoption === 'All Type Of Sales') {
          if (this.patchrtype == 'Detailed') {
            this.salesview = Object.keys(this.salesviewdata);
            this.salesview.splice(0, 2);
            this.getregData(res);
            this.showcommontable = false;
          } else {
            this.salesview = Object.keys(this.salesviewdata);
            this.salesview.splice(0, 1);
            this.getregData(res);
            this.showcommontable = false;
          }
        } else if (this.patchoption === 'Billwise Sales') {
          if (this.patchrtype == 'Detailed') {
            this.salesview = Object.keys(this.salesviewdata);
            this.salesview.splice(0, 2);
            this.getbillwisesales(res);
            this.showcommontable = false;
          } else {
            this.salesview = Object.keys(this.salesviewdata);
            this.salesview.splice(0, 1);
            this.getbillwisesales(res);
            this.showcommontable = false;
          }
        }
        if (this.patchoption === 'Sales BillCount') {
          if (this.patchrtype == 'Detailed') {
            this.salesview = Object.keys(this.salesviewdata);
            this.salesview.splice(0, 2);
            this.getregData(res);
            this.showcommontable = false;
          } else {
            this.salesview = Object.keys(this.salesviewdata);
            this.salesview.splice(0, 1);
            this.getregData(res);
            this.showcommontable = false;
          }
        } else if (this.patchoption === 'Tax Payable ( Sweet_Rest )') {
          this.salesview = Object.keys(this.salesviewdata);
          this.salesview.splice(0, 3);
          this.getregData(res);
          this.showcommontable = false;
        } else if (this.patchoption === 'Tax Payable') {
          this.getregDataother(res);
          this.salesview = Object.keys(this.salesviewdata);
          this.salesview.splice(0, 2);
          this.showcommontable = false;
        } else if (this.patchoption === 'Tax Payable Branchwise') {
          this.getregDataother(res);
          this.salesview = Object.keys(this.salesviewdata);
          this.salesview.splice(0, 2);
          this.showcommontable = false;
        } else if (this.patchoption === 'Category_Terminalwise Sales') {
          this.salesview = Object.keys(this.salesviewdata);
          this.salesview.splice(0, 2);
          this.getregData(res);
          this.showcommontable = false;
        } else if (this.patchoption === 'Taxwise Sales') {
          this.salesview = Object.keys(this.salesviewdata);
          this.salesview.splice(0, 3);
          this.gettaxpayable(res);
          this.showcommontable = false;
        } else if (this.patchoption === 'Taxwise Sales (Sweet_Rest )') {
          this.salesview = Object.keys(this.salesviewdata);
          this.salesview.splice(0, 4);
          this.gettaxpayable4subcat(res);
          this.showcommontable = false;
        } else if (this.patchoption === 'Taxwise Sales (Sweet_Rest_Veg )') {
          this.salesview = Object.keys(this.salesviewdata);
          this.salesview.splice(0, 3);
          this.gettaxpayableSweet_Rest_Veg(res);
          this.showcommontable = false;
        } else if (this.patchoption === 'Salemodewise Sales') {
          this.salesview = Object.keys(this.salesviewdata);
          this.salesview.splice(0, 2);
          this.getSalemodewise(res);
          this.showcommontable = false;
        } else if (this.patchoption === 'Sales With BillNo') {
          this.salesview = Object.keys(this.salesviewdata);
          this.salesview.splice(0, 2);
          this.getSalemodewise(res);
          this.showcommontable = false;
        } else if (this.patchoption === 'Catwise Sales [SW/SA/RS/BK/IC]') {
          this.salesview = Object.keys(this.salesviewdata);
          if (this.patchrtype === 'Detailed') {
            this.salesview.splice(0, 1);
            this.get5catwise(res);
            this.showcommontable = false;
          }
          this.get5catwise(res);
          this.showcommontable = false;
        } else if (this.patchoption === 'Coinage') {
          this.salesview = Object.keys(this.salesviewdata);
          if (this.patchrtype === 'Detailed') {
            this.salesview.splice(0, 2);
          } else {
            this.salesview.splice(0, 1);
          }
          this.getCoinage(res);
          this.showcommontable = false;
        } else if (this.patchoption === 'Bill Receipts') {
          this.salesview = Object.keys(this.salesviewdata);
          this.salesview.splice(0, 1);
          this.getBillreceipts(res);
          this.showcommontable = false;
        } else if (this.patchoption == 'Branchwise Sales') {
          this.salesview = Object.keys(this.salesviewdata);
          if (this.patchrtype === 'Detailed') {
            this.salesview.splice(0, 2);
          } else {
            this.salesview.splice(0, 1);
          }
          this.getbranchwise(res);
          this.showcommontable = false;
        }
      } else {
        this.showempty = true;
        this.showcommontable = false;
      }
    }));
  }

  getBillreceipts(res: any) {
    this.consolidatedData = [];
    const groups = res.reduce((r: any, a: any) => {
      r[a.L_Brname] = [...r[a.L_Brname] || [], a];
      return r;
    }, {});
    const keys = Object.keys(groups);
    for (let i = 0; i < keys.length; i++) {
      this.result = groups[keys[i]];
      this.consolidatedData.push({
        date: keys[i], values: this.result,
      });
    }

    this.consolidatedData.forEach((r: any) => {
      const rValues = Object.entries(r);
      rValues.forEach((e) => {
        // e[0] is the key and e[1] is the value
        const n = Number(e[1]);
        if (!isNaN(n)) {
          r[e[0]] = Number(n.toFixed(2));
        }
      });
    });
  }

  get5catwise(res: any) {
    // res.forEach((r:any)=>{
    //   let rValues = Object.entries(r);
    //   rValues.forEach(function(e){
    //     // e[0] is the key and e[1] is the value
    //     let n = Number(e[1]);
    //     if (!isNaN(n)) {
    //       r[e[0]] = Number(n.toFixed(2));
    //     }
    //   })
    // })
    this.consolidatedData = [];
    const groups = res.reduce((r: any, a: any) => {
      r[a.L_Trandate] = [...r[a.L_Trandate] || [], a];
      return r;
    }, {});
    const keys = Object.keys(groups);
    for (let i = 0; i < keys.length; i++) {
      this.result = groups[keys[i]];
      var A2B_GREENS = 0; var BAKERY = 0; var ICE_CREAMS = 0; var RESTAURANT = 0; var SAVOURIES = 0; var SWEETS = 0; var TOTAL = 0;
      this.result.forEach((e: any) => {
        A2B_GREENS += e.R_A2B_GREENS; BAKERY += e.R_BAKERY; ICE_CREAMS += e.R_ICE_CREAMS;
        RESTAURANT += e.R_RESTAURANT; SAVOURIES += e.R_SAVOURIES; SWEETS += e.R_SWEETS; TOTAL += e.R_TOTAL;
      });

      this.consolidatedData.push({
        date: keys[i],
        values: this.result,
        A2B_GREENS,
        BAKERY,
        ICE_CREAMS,
        RESTAURANT,
        SAVOURIES,
        SWEETS,
        TOTAL,
      });
    }
    this.consolidatedData.forEach((r: any) => {
      const rValues = Object.entries(r);
      rValues.forEach((e) => {
        // e[0] is the key and e[1] is the value
        const n = Number(e[1]);
        if (!isNaN(n)) {
          r[e[0]] = Number(n.toFixed(2));
        }
      });
    });
  }

  getregData(res: any) {
    if (this.patchoption === 'Category_Terminalwise Sales') {
      var groups1 = res.reduce((r: any, a: any) => {
        r[a.L_Category] = [...r[a.L_Category] || [], a];
        return r;
      }, {});
    } else {
      var groups1 = res.reduce((r: any, a: any) => {
        r[a.L_Trandate] = [...r[a.L_Trandate] || [], a];
        return r;
      }, {});
    }
    const keys = Object.keys(groups1);
    this.result = [];
    for (let i = 0; i < keys.length; i++) {
      this.keyItem = []; this.grpfinal = [];
      this.keyItem = groups1[keys[i]];
      if (this.patchoption === 'All Type Of Sales') {
        var grp2 = this.keyItem.reduce((r: any, a: any) => {
          r[a.L_Region] = [...r[a.L_Region] || [], a];
          return r;
        }, {});
      } else if (this.patchoption === 'Sales BillCount') {
        var grp2 = this.keyItem.reduce((r: any, a: any) => {
          r[a.L_Region] = [...r[a.L_Region] || [], a];
          return r;
        }, {});
      } else if (this.patchoption === 'Tax Payable ( Sweet_Rest )') {
        var grp2 = this.keyItem.reduce((r: any, a: any) => {
          r[a.L_Category] = [...r[a.L_Category] || [], a];
          return r;
        }, {});
      } else if (this.patchoption === 'Category_Terminalwise Sales') {
        var grp2 = this.keyItem.reduce((r: any, a: any) => {
          r[a.L_Terminal] = [...r[a.L_Terminal] || [], a];
          return r;
        }, {});
      }
      const keys2 = Object.keys(grp2);
      for (let j = 0; j < keys2.length; j++) {
        this.keyitem2 = grp2[keys2[j]];
        var R_Total = 0; var R_Sales = 0; var R_Outdoor = 0; var R_Hall = 0; var R_Cst = 0; var R_Lodge = 0; var R_OtherSale = 0; var R_GrossAmt = 0;
        var R_Taxper = 0; var R_NetAmt = 0; var R_SGST = 0; var R_CGST = 0; var R_IGST = 0; var R_Cess = 0; var RCoinage = 0;
        this.keyitem2.forEach((e: any) => {
          R_Total += e.R_Total; R_Sales += e.R_Sales; R_Outdoor += e.R_Outdoor; RCoinage = e.R_Coinage;
          R_Hall += e.R_Hall; R_Cst += e.R_Cst; R_Lodge += e.R_Lodge; R_OtherSale += e.R_OtherSale;
          R_Taxper += e.R_Taxper; R_NetAmt += e.R_NetAmt; R_SGST += e.R_SGST; R_CGST += e.R_CGST;
          R_IGST += e.R_IGST; R_Cess += e.R_Cess; R_GrossAmt += e.R_GrossAmt;
        });
        this.grpfinal.push({
          region: keys2[j],
          regionwise: this.keyitem2,
          R_Total,
          R_Sales,
          R_Outdoor,
          R_Hall,
          R_Cst,
          R_Lodge,
          R_OtherSale,
          R_Taxper,
          R_NetAmt,
          R_SGST,
          R_CGST,
          R_Coinage: RCoinage,
          R_IGST,
          R_Cess,
          R_GrossAmt,
        });
        this.keyitem2.forEach((r: any) => {
          const rValues = Object.entries(r);
          rValues.forEach((e) => {
            // e[0] is the key and e[1] is the value
            const n = Number(e[1]);
            if (!isNaN(n)) {
              r[e[0]] = (n.toFixed(2));
            }
          });
        });
      }
      var RTotal = 0; var RSales = 0; var ROutdoor = 0; var RHall = 0; var RCst = 0; var RLodge = 0; var RScrap = 0; var RCess = 0;
      var RTaxper = 0; var RNetAmt = 0; var RSGST = 0; var RCGST = 0; var RIGST = 0; var RCess = 0; var RGrossAmt = 0; var RCoinage = 0;
      this.grpfinal.forEach((e: any) => {
        RTotal += e.R_Total; RSales += e.R_Sales; ROutdoor += e.R_Outdoor; RCoinage = e.R_Coinage;
        RHall += e.R_Hall; RCst += e.R_Cst; RLodge += e.R_Lodge; RScrap += e.R_OtherSale; RCess += e.R_Cess;
        RTaxper += e.R_Taxper; RNetAmt += e.R_NetAmt; RSGST += e.R_SGST; RCGST += e.R_CGST; RIGST += e.R_IGST; RCess += e.R_Cess; RGrossAmt += e.R_GrossAmt;
      });
      this.result.push({
        date: keys[i],
        Datewise: this.grpfinal,
        RTotal,
        RCoinage,
        RSales,
        ROutdoor,
        RHall,
        RCst,
        RLodge,
        RScrap,
        RTaxper,
        RNetAmt,
        RSGST,
        RCGST,
        RIGST,
        RCess,
        RGrossAmt,
      });
      this.grpfinal.forEach((r: any) => {
        const rValues = Object.entries(r);
        rValues.forEach((e) => {
          // e[0] is the key and e[1] is the value
          const n = Number(e[1]);
          if (!isNaN(n)) {
            r[e[0]] = (n.toFixed(2));
          }
        });
      });
    }
    this.result.forEach((r: any) => {
      const rValues = Object.entries(r);
      rValues.forEach((e) => {
        // e[0] is the key and e[1] is the value
        const n = Number(e[1]);
        if (!isNaN(n)) {
          r[e[0]] = (n.toFixed(2));
        }
      });
    });
  }

  getbillwisesales(res: any) {
    const groups1 = res.reduce((r: any, a: any) => {
      r[a.L_Brname] = [...r[a.L_Brname] || [], a];
      return r;
    }, {});
    const keys = Object.keys(groups1);
    this.result = [];
    for (let i = 0; i < keys.length; i++) {
      this.keyItem = []; this.grpfinal = [];
      this.keyItem = groups1[keys[i]];
      const grp2 = this.keyItem.reduce((r: any, a: any) => {
        r[a.L_Trandate] = [...r[a.L_Trandate] || [], a];
        return r;
      }, {});
      const keys2 = Object.keys(grp2);
      for (let j = 0; j < keys2.length; j++) {
        this.keyitem2 = grp2[keys2[j]];
        this.grpfinal.push({
          region: keys2[j], regionwise: this.keyitem2,
        });
      }
      var RTotal = 0; var RSales = 0; var ROutdoor = 0; var RHall = 0; var RCst = 0; var RLodge = 0; var RScrap = 0; var RCess = 0;
      var RTaxper = 0; var RNetAmt = 0; var RSGST = 0; var RCGST = 0; var RIGST = 0; var RCess = 0; var RGrossAmt = 0; var RCoinage = 0;
      this.grpfinal.forEach((e: any) => {
        RTotal += e.R_Total; RSales += e.R_Sales; ROutdoor += e.R_Outdoor; RCoinage = e.R_Coinage;
        RHall += e.R_Hall; RCst += e.R_Cst; RLodge += e.R_Lodge; RScrap += e.R_OtherSale; RCess += e.R_Cess;
        RTaxper += e.R_Taxper; RNetAmt += e.R_NetAmt; RSGST += e.R_SGST; RCGST += e.R_CGST; RIGST += e.R_IGST; RCess += e.R_Cess; RGrossAmt += e.R_GrossAmt;
      });
      this.result.push({
        date: keys[i], Datewise: this.grpfinal,
      });
    }
    this.result.forEach((r: any) => {
      const rValues = Object.entries(r);
      rValues.forEach((e) => {
        // e[0] is the key and e[1] is the value
        const n = Number(e[1]);
        if (!isNaN(n)) {
          r[e[0]] = Number(n.toFixed(2));
        }
      });
    });
  }

  getCoinage(res: any) {
    const groups1 = res.reduce((r: any, a: any) => {
      r[a.L_Saletype] = [...r[a.L_Saletype] || [], a];
      return r;
    }, {});
    const keys = Object.keys(groups1);
    this.resultARR = [];
    for (let i = 0; i < keys.length; i++) {
      let keyItem = []; const grpfinalSALE = [];
      keyItem = groups1[keys[i]];
      const grp2 = keyItem.reduce((r: any, a: any) => {
        r[a.L_Brname] = [...r[a.L_Brname] || [], a];
        return r;
      }, {});
      const keys2 = Object.keys(grp2);
      for (let j = 0; j < keys2.length; j++) {
        const keyitem2 = grp2[keys2[j]];
        var R_Coinage = 0;
        keyitem2.forEach((e: any) => {
          R_Coinage += e.R_Coinage;
        });
        grpfinalSALE.push({
          region: keys2[j],
          regionwise: keyitem2,
          R_Coinage,
        });
      }
      var RCoinage = 0;
      grpfinalSALE.forEach((e: any) => {
        RCoinage += e.R_Coinage;
      });
      this.resultARR.push({
        date: keys[i], Datewise: grpfinalSALE, RCoinage,
      });
    }
    this.resultARR.forEach((r: any) => {
      const rValues = Object.entries(r);
      rValues.forEach((e) => {
        // e[0] is the key and e[1] is the value
        const n = Number(e[1]);
        if (!isNaN(n)) {
          r[e[0]] = Number(n.toFixed(2));
        }
      });
    });
  }

  getSalemodewise(res: any) {
    res.forEach((r: any) => {
      const rValues = Object.entries(r);
      rValues.forEach((e) => {
        // e[0] is the key and e[1] is the value
        const n = Number(e[1]);
        if (!isNaN(n)) {
          r[e[0]] = Number(n.toFixed(2));
        }
      });
    });
    const groups1 = res.reduce((r: any, a: any) => {
      r[a.L_Trandate] = [...r[a.L_Trandate] || [], a];
      return r;
    }, {});
    const keys = Object.keys(groups1);
    this.resultARR = [];
    for (let i = 0; i < keys.length; i++) {
      let keyItem = []; const grpfinalSALE = [];
      keyItem = groups1[keys[i]];
      const grp2 = keyItem.reduce((r: any, a: any) => {
        r[a.L_Region] = [...r[a.L_Region] || [], a];
        return r;
      }, {});
      const keys2 = Object.keys(grp2);
      for (let j = 0; j < keys2.length; j++) {
        const keyitem2 = grp2[keys2[j]];
        var RS_Total = 0; var RS_Cash = 0; var RS_Card = 0; var RS_Credit = 0; var RS_Token = 0;
        keyitem2.forEach((e: any) => {
          RS_Total += e.R_Total; RS_Cash += e.R_Cash; RS_Card += e.R_Card; RS_Credit += e.R_Credit; RS_Token += e.R_Token;
        });
        grpfinalSALE.push({
          region: keys2[j],
          regionwise: keyitem2,
          RS_Total,
          RS_Cash,
          RS_Card,
          RS_Credit,
          RS_Token,
        });
        keyitem2.forEach((r: any) => {
          const rValues = Object.entries(r);
          rValues.forEach((e) => {
            // e[0] is the key and e[1] is the value
            const n = Number(e[1]);
            if (!isNaN(n)) {
              r[e[0]] = Number(n.toFixed(2));
            }
          });
        });
      }
      var RTotal = 0; var RCash = 0; var RCard = 0; var RCredit = 0; var RToken = 0;
      grpfinalSALE.forEach((e: any) => {
        RTotal += e.R_Total; RCash += e.R_Cash; RCard += e.R_Card; RCredit += e.R_Credit; RToken += e.R_Token;
      });
      this.resultARR.push({
        date: keys[i], Datewise: grpfinalSALE, RTotal, RCash, RCard, RCredit, RToken,
      });
      grpfinalSALE.forEach((r: any) => {
        const rValues = Object.entries(r);
        rValues.forEach((e) => {
          // e[0] is the key and e[1] is the value
          const n = Number(e[1]);
          if (!isNaN(n)) {
            r[e[0]] = Number(n.toFixed(2));
          }
        });
      });
    }
    this.resultARR.forEach((r: any) => {
      const rValues = Object.entries(r);
      rValues.forEach((e) => {
        // e[0] is the key and e[1] is the value
        const n = Number(e[1]);
        if (!isNaN(n)) {
          r[e[0]] = Number(n.toFixed(2));
        }
      });
    });
  }

  getbranchwise(res: any) {
    const groups1 = res.reduce((r: any, a: any) => {
      r[a.L_Trandate] = [...r[a.L_Trandate] || [], a];
      return r;
    }, {});
    const keys = Object.keys(groups1);
    this.resultARR = [];
    for (let i = 0; i < keys.length; i++) {
      let keyItem = []; const grpfinalSALE = [];
      keyItem = groups1[keys[i]];
      const grp2 = keyItem.reduce((r: any, a: any) => {
        r[a.L_Saletype] = [...r[a.L_Saletype] || [], a];
        return r;
      }, {});
      const keys2 = Object.keys(grp2);
      for (let j = 0; j < keys2.length; j++) {
        const keyitem2 = grp2[keys2[j]];
        var R_GrossAmt = 0; var R_NetAmt = 0; var R_Sertax = 0; var R_Vat = 0;
        keyitem2.forEach((e: any) => {
          R_GrossAmt += e.R_GrossAmt; R_NetAmt += e.R_NetAmt; R_Sertax += e.R_Sertax; R_Vat += e.R_Vat;
        });
        grpfinalSALE.push({
          region: keys2[j],
          regionwise: keyitem2,
          R_GrossAmt,
          R_NetAmt,
          R_Sertax,
          R_Vat,
        });
      }
      var R_GrossAmt = 0; var R_NetAmt = 0; var R_Sertax = 0; var R_Vat = 0;
      grpfinalSALE.forEach((e: any) => {
        R_GrossAmt += e.R_GrossAmt; R_NetAmt += e.R_NetAmt; R_Sertax += e.R_Sertax; R_Vat += e.R_Vat;
      });
      this.resultARR.push({
        date: keys[i], Datewise: grpfinalSALE, R_GrossAmt, R_NetAmt, R_Sertax, R_Vat,
      });
    }
    this.resultARR.forEach((r: any) => {
      const rValues = Object.entries(r);
      rValues.forEach((e) => {
        // e[0] is the key and e[1] is the value
        const n = Number(e[1]);
        if (!isNaN(n)) {
          r[e[0]] = Number(n.toFixed(2));
        }
      });
    });
  }

  gettaxpayableSweet_Rest_Veg(res: any) {
    const groups1 = res.reduce((r: any, a: any) => {
      r[a.L_Brname] = [...r[a.L_Brname] || [], a];
      return r;
    }, {});
    const keys = Object.keys(groups1);
    this.result = []; let keyItem = [];
    for (let i = 0; i < keys.length; i++) {
      keyItem = [];
      const rkeyItem = groups1[keys[i]];
      // date wise
      const group2 = rkeyItem.reduce((r: any, a: any) => {
        r[a.L_Cat] = [...r[a.L_Cat] || [], a];
        return r;
      }, {});
      const keys2 = Object.keys(group2);
      for (let j = 0; j < keys2.length; j++) {
        const rkeyitem2 = group2[keys2[j]];
        // gst wise
        const group3 = rkeyitem2.reduce((r: any, a: any) => {
          r[a.L_Gst] = [...r[a.L_Gst] || [], a];
          return r;
        }, {});
        const key3 = Object.keys(group3); const keyitem3 = [];
        for (let k = 0; k < key3.length; k++) {
          // keyitem3 = []
          const rkeyitem3 = group3[key3[k]];
          // TOTAL
          var GrossAmt = 0; var Cess = 0;
          var NetAmt = 0; var SGST = 0; var CGST = 0;
          rkeyitem3.forEach((e: any) => {
            NetAmt += e.R_NetAmt; SGST += e.R_SGST; CGST += e.R_CGST;
            Cess += e.R_Cess; GrossAmt += e.R_GrossAmt;
          });
          keyitem3.push({
            gst: key3[k],
            gstwise: rkeyitem3,
            NetAmt,
            SGST,
            CGST,
            Cess,
            GrossAmt,
          });
        }
        keyItem.push({ date: keys2[j], datewise: keyitem3 });
        keyitem3.forEach((r: any) => {
          const rValues = Object.entries(r);
          rValues.forEach((e) => {
            // e[0] is the key and e[1] is the value
            const n = Number(e[1]);
            if (!isNaN(n)) {
              r[e[0]] = (n.toFixed(2));
            }
          });
        });
      }
      var RGrossAmt = 0; var RCess = 0;
      var RNetAmt = 0; var RSGST = 0; var RCGST = 0;
      rkeyItem.forEach((e: any) => {
        RNetAmt += e.R_NetAmt; RSGST += e.R_SGST; RCGST += e.R_CGST;
        RCess += e.R_Cess; RGrossAmt += e.R_GrossAmt;
      });
      this.result.push({
        branch: keys[i],
        branchwise: keyItem,
        RNetAmt,
        RSGST,
        RCGST,
        RCess,
        RGrossAmt,
      });
      keyItem.forEach((r: any) => {
        const rValues = Object.entries(r);
        rValues.forEach((e) => {
          // e[0] is the key and e[1] is the value
          const n = Number(e[1]);
          if (!isNaN(n)) {
            r[e[0]] = (n.toFixed(2));
          }
        });
      });
    }
    this.result.forEach((r: any) => {
      const rValues = Object.entries(r);
      rValues.forEach((e) => {
        // e[0] is the key and e[1] is the value
        const n = Number(e[1]);
        if (!isNaN(n)) {
          r[e[0]] = (n.toFixed(2));
        }
      });
    });
  }

  //
  gettaxpayable(res: any) {
    const groups1 = res.reduce((r: any, a: any) => {
      r[a.L_Brname] = [...r[a.L_Brname] || [], a];
      return r;
    }, {});
    const keys = Object.keys(groups1);
    this.result = []; let keyItem = [];
    for (let i = 0; i < keys.length; i++) {
      keyItem = [];
      const rkeyItem = groups1[keys[i]];
      // date wise
      const group2 = rkeyItem.reduce((r: any, a: any) => {
        r[a.L_Trandate] = [...r[a.L_Trandate] || [], a];
        return r;
      }, {});
      const keys2 = Object.keys(group2);
      for (let j = 0; j < keys2.length; j++) {
        const rkeyitem2 = group2[keys2[j]];
        // gst wise
        const group3 = rkeyitem2.reduce((r: any, a: any) => {
          r[a.L_Gst] = [...r[a.L_Gst] || [], a];
          return r;
        }, {});
        const key3 = Object.keys(group3); const keyitem3 = [];
        for (let k = 0; k < key3.length; k++) {
          const rkeyitem3 = group3[key3[k]];
          // TOTAL
          var GrossAmt = 0; var Cess = 0;
          var NetAmt = 0; var SGST = 0; var CGST = 0;
          rkeyitem3.forEach((e: any) => {
            NetAmt += e.R_NetAmt; SGST += e.R_SGST; CGST += e.R_CGST;
            Cess += e.R_Cess; GrossAmt += e.R_GrossAmt;
          });
          keyitem3.push({
            gst: key3[k],
            gstwise: rkeyitem3,
            NetAmt,
            SGST,
            CGST,
            Cess,
            GrossAmt,
          });
        }
        //
        var GrossAmt = 0;
        var NetAmt = 0; var SGST = 0; var CGST = 0; var Cess = 0;
        rkeyitem2.forEach((e: any) => {
          NetAmt += e.R_NetAmt; SGST += e.R_SGST; CGST += e.R_CGST;
          Cess += e.R_Cess; GrossAmt += e.R_GrossAmt;
        });
        keyItem.push({
          date: keys2[j],
          datewise: keyitem3,
          NetAmt,
          SGST,
          CGST,
          Cess,
          GrossAmt,
        });
      }
      //
      var RGrossAmt = 0; var RCess = 0;
      var RNetAmt = 0; var RSGST = 0; var RCGST = 0;
      rkeyItem.forEach((e: any) => {
        RNetAmt += e.R_NetAmt; RSGST += e.R_SGST; RCGST += e.R_CGST;
        RCess += e.R_Cess; RGrossAmt += e.R_GrossAmt;
      });
      this.result.push({
        branch: keys[i],
        branchwise: keyItem,
        RNetAmt,
        RSGST,
        RCGST,
        RCess,
        RGrossAmt,
      });
    }
    this.result.forEach((r: any) => {
      const rValues = Object.entries(r);
      rValues.forEach((e) => {
        // e[0] is the key and e[1] is the value
        const n = Number(e[1]);
        if (!isNaN(n)) {
          r[e[0]] = (n.toFixed(2));
        }
      });
    });
  }

  gettaxpayable4subcat(res: any) {
    // branchwise
    const groups1 = res.reduce((r: any, a: any) => {
      r[a.L_Brname] = [...r[a.L_Brname] || [], a];
      return r;
    }, {});
    const keys = Object.keys(groups1);
    this.result = []; let keyItem = [];
    for (let i = 0; i < keys.length; i++) {
      keyItem = [];
      const rkeyItem = groups1[keys[i]];
      // date wise
      const group2 = rkeyItem.reduce((r: any, a: any) => {
        r[a.L_Trandate] = [...r[a.L_Trandate] || [], a];
        return r;
      }, {});
      const keys2 = Object.keys(group2);
      let keyitem2 = [];
      for (let j = 0; j < keys2.length; j++) {
        keyitem2 = [];
        const rkeyitem2 = group2[keys2[j]];
        // cat wise
        const group3 = rkeyitem2.reduce((r: any, a: any) => {
          r[a.L_Cat] = [...r[a.L_Cat] || [], a];
          return r;
        }, {});
        const key3 = Object.keys(group3); let keyitem3 = [];
        for (let k = 0; k < key3.length; k++) {
          keyitem3 = [];
          const rkeyitem3 = group3[key3[k]];
          // gst wise
          const group4 = rkeyitem3.reduce((r: any, a: any) => {
            r[a.L_Gst] = [...r[a.L_Gst] || [], a];
            return r;
          }, {});
          const key4 = Object.keys(group4);
          for (let l = 0; l < key4.length; l++) {
            const rkeyitem4 = group4[key4[l]];
            // total
            var R_GrossAmt = 0;
            var R_NetAmt = 0; var R_SGST = 0; var R_CGST = 0; var R_Cess = 0;
            rkeyitem4.forEach((e: any) => {
              R_NetAmt += e.R_NetAmt; R_SGST += e.R_SGST; R_CGST += e.R_CGST;
              R_Cess += e.R_Cess; R_GrossAmt += e.R_GrossAmt;
            });
            keyitem3.push({
              gst: key4[l],
              gstwise: rkeyitem4,
              R_NetAmt,
              R_SGST,
              R_CGST,
              R_Cess,
              R_GrossAmt,
            });
          }
          //
          var RTGrossAmt = 0;
          var RTNetAmt = 0; var RTSGST = 0; var RTCGST = 0; var RTCess = 0;
          rkeyitem3.forEach((e: any) => {
            RTNetAmt += e.R_NetAmt; RTSGST += e.R_SGST; RTCGST += e.R_CGST;
            RTCess += e.R_Cess; RTGrossAmt += e.R_GrossAmt;
          });
          keyitem2.push({
            cat: key3[k],
            catwise: keyitem3,
            RTNetAmt,
            RTSGST,
            RTCGST,
            RTCess,
            RTGrossAmt,
          });
        }
        //
        var GrossAmt = 0;
        var NetAmt = 0; var SGST = 0; var CGST = 0; var Cess = 0;
        rkeyitem2.forEach((e: any) => {
          NetAmt += e.R_NetAmt; SGST += e.R_SGST; CGST += e.R_CGST;
          Cess += e.R_Cess; GrossAmt += e.R_GrossAmt;
        });
        keyItem.push({
          date: keys2[j],
          datewise: keyitem2,
          NetAmt,
          SGST,
          CGST,
          Cess,
          GrossAmt,
        });
        //
      }
      var RGrossAmt = 0; var RCess = 0;
      var RNetAmt = 0; var RSGST = 0; var RCGST = 0;
      rkeyItem.forEach((e: any) => {
        RNetAmt += e.R_NetAmt; RSGST += e.R_SGST; RCGST += e.R_CGST;
        RCess += e.R_Cess; RGrossAmt += e.R_GrossAmt;
      });
      this.result.push({
        branch: keys[i],
        branchwise: keyItem,
        RNetAmt,
        RSGST,
        RCGST,
        RCess,
        RGrossAmt,
      });
    }
    this.result.forEach((r: any) => {
      const rValues = Object.entries(r);
      rValues.forEach((e) => {
        // e[0] is the key and e[1] is the value
        const n = Number(e[1]);
        if (!isNaN(n)) {
          r[e[0]] = Number(n.toFixed(2));
        }
      });
    });
  }

  getregDataother(res: any) {
    this.result = []; this.grpfinal = [];
    const groups = res.reduce((r: any, a: any) => {
      r[a.L_Trandate] = [...r[a.L_Trandate] || [], a];
      return r;
    }, {});
    const keys = Object.keys(groups);
    for (let i = 0; i < keys.length; i++) {
      this.grpfinal = groups[keys[i]];
      var RTotal = 0; var RSales = 0; var ROutdoor = 0; var RHall = 0; var RCst = 0; var RLodge = 0; var RScrap = 0;
      var RTaxper = 0; var RNetAmt = 0; var RSGST = 0; var RCGST = 0; var RIGST = 0; var RCess = 0; var RGrossAmt = 0; var RCoinage = 0;
      this.grpfinal.forEach((e: any) => {
        RTotal += e.R_Total; RSales += e.R_Sales; ROutdoor += e.R_Outdoor;
        RHall += e.R_Hall; RCst += e.R_Cst; RLodge += e.R_Lodge; RScrap += e.R_OtherSale;
        RTaxper += e.R_Taxper; RNetAmt += e.R_NetAmt; RSGST += e.R_SGST;
        RCGST += e.R_CGST; RIGST += e.R_IGST; RCess += e.R_Cess; RGrossAmt += e.R_GrossAmt; RCoinage = e.R_Coinage;
      });
      this.result.push({
        date: keys[i],
        Datewise: this.grpfinal,
        RTotal,
        RSales,
        ROutdoor,
        RHall,
        RCst,
        RLodge,
        RScrap,
        RTaxper,
        RNetAmt,
        RSGST,
        RCoinage,
        RCGST,
        RIGST,
        RCess,
        RGrossAmt,
      });
      this.grpfinal.forEach((r: any) => {
        const rValues = Object.entries(r);
        rValues.forEach((e) => {
          // e[0] is the key and e[1] is the value
          const n = Number(e[1]);
          if (!isNaN(n)) {
            r[e[0]] = (n.toFixed(2));
          }
        });
      });
    }
    this.result.forEach((r: any) => {
      const rValues = Object.entries(r);
      rValues.forEach((e) => {
        // e[0] is the key and e[1] is the value
        const n = Number(e[1]);
        if (!isNaN(n)) {
          r[e[0]] = Number(n.toFixed(2));
        }
      });
    });
  }

  exportexcel(): void {
    const element = document.getElementById('tableexcelone');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheets');
    XLSX.writeFile(wb, `fyear${this.patchfyear
    }/cmpny/${this.patchcompany}/branch/${
      this.patchbranch}/fdate/${this.patchfromdate1}/tdate/${this.patchtodate1
      //  +'/gstvat/'+ this.patchmode+'/rate/' + this.patchrate + '/tax/' + this.patchtax
      // + '/format/' + this.patchformat+'/option/' + this.patchoption +'/rtype/' + this.patchrtype
    }/` + 'SalesReport.xlsx');
  }

  backNavigation() {
    if (this.globals.SelectDashboard === this.selid) {
      if (this.globals.gmainMenuSelected === 'ReqFromGrpData') {
        this.globals.SelectDashboard = 'GROUPDATA';
        this.router.navigate(['/dashboard']);
      } else {
        this.router.navigate(['/dashboard']);
      }
    } else if (this.globals.SelectDashboard === 'SALEPAGETWO') {
      this.SalesTWO = false;
      this.SalesONE = true;
      this.globals.SelectDashboard = this.selid;
    }
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}

function typeOf(arg0: any) {
  throw new Error('Function not implemented.');
}
