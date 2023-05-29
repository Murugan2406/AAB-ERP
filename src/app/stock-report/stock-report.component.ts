/* eslint-disable camelcase */
/* eslint-disable no-redeclare */
/* eslint-disable no-useless-concat */
/* eslint-disable no-dupe-else-if */
/* eslint-disable no-mixed-operators */
/* eslint-disable no-empty */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-shadow */
/* eslint-disable no-sequences */
/* eslint-disable eqeqeq */
/* eslint-disable lines-between-class-members */
/* eslint-disable max-len */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-plusplus */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-empty-function */
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-useless-constructor */
/* eslint-disable import/no-unresolved */
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import * as XLSX from 'xlsx';
import { Router } from '@angular/router';
import { debounceTime } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { ItemserviceService } from 'src/app/updatation/services/itemservice.service';
import { Globals } from 'src/app/globals';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE, DateAdapter } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import * as _moment from 'moment';
import { SubSink } from 'subsink';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Moment } from 'moment';
import Swal from 'sweetalert2';

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
  selector: 'app-stock-report',
  templateUrl: './stock-report.component.html',
  styleUrls: ['./stock-report.component.css'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class StockReportComponent implements OnInit {
  @ViewChild(MatDatepicker) picker: any; private subs = new SubSink(); term2 = '';term1 = ''; FILTERform: FormGroup; selectedValue: any; patch = 'Subcat'; patchrate = 'Std'; patchcompany = 'ADYAR ANANDA BHAVAN'; patchstate = 'ALL';
  patchregion = 'ALL'; patchcostcntr = 'ALL'; patchbranch = 'ALL'; patchsubcat: any=''; patchgrid = 'Vertical'; patchcatitem = 'Categorywise'; patchdatecon = 'Consolidate'; patchfromdate: any; patchtodate: any; selid = 'GROUPLIST'; patchproduct = 'ALL'; selectedCar: any;
   Branchlocation: any; Branchloccntrl: FormControl; Productlist: any=[];
  Productcntrl: FormControl; showpageONE = true; StockReportform: FormGroup;
  dropdownList1: any; patchcat: any; showtrue1: boolean = false; catlist: any; showdaategroup: boolean = false; patch1: any; patchcatitem1 = 'Categorywise'; showicondate: boolean = false; stockview: any; stockviewone: any; checkboxval = 'STK_cat'; opt = 'optSubcat'; sel = 'Subcat';
  dropdownSettings: any ; showtrue = true; post: any; dropdownSettings1: any ; Brname: any; brcode: any; date: any; items: any; subcatlist: any; loaddefaultSubCat: any; loaddefaultSubCat1: any; loaddefaultCat: any; loaddefaultCat1: any;
  showpageTWO: boolean = false; showpageTHREE: boolean = false; showpageFOUR: boolean = false; HORIZONTALview: boolean = false; VERTICALview: boolean = false; Cost: any; regionList: any; stateslist: any; company: any; companyID: any; stateID: any;
  regionid: any; costid: any; Fixedloc: any; Fixedloc1: any; SelectedLoc: any; BRcode = '0'; todate: any; fromdate: any; dateval1: any; dateval: any; Defaultload: any; changeYr: any; Defaultyear: any; prodid: any; Icode = '0'; itemlist: any; Prodautocomplete: any; tname = `ZHSTK${this.globals.gSessionId}`; catitem: any; showstockviewtwo: any[] = []; patchqty = 'Valuewise'; tablebodydata: any;
  assign: any; lrec: any; result: any; tablebodydata1: any; id: any; frmtdate: any; storedata: any[] = []; frmtdate1: any; isload: boolean = false; patchfromdate1: any; patchtodate1: any; currentpage: any; tname1: any; branchlist:any=[]; gvar: any;
  total = 0;datelist: any; brname='ALL';user: any;empty='';totalbr: number=0;icodes: any;qtytot:number=0;listname = 0; br: any; category: any; finalview :any=[]; head: any; Sub_Grid_Captione: any; brright: any; pusharr: any; GclientServer: boolean = false; startDate = '01-04-2021'; limitSelection = true; dropdownList: any;
  gridview = [{
    grid: 'Horizontal',
  },
  {
    grid: 'Vertical',
  }]
  catitems = [{
    citem: 'Categorywise',
  },
  {
    citem: 'Itemwise',
  }]
  datecons = [
    {
      dcon: 'Datewise',
    },
    {
      dcon: 'Consolidate',
    }]
  SUBLOW = [{
    item: 'Subcat',
  },
  {
    item: 'Low level cat',
  }]
  rate = [{
    item: 'Std',
  },
  {
    item: 'Weighted Avg Rate',
  }]
  qtywise = [{
    qty: 'Qtywise',
  },
  {
    qty: 'Valuewise',
  }]
  constructor(
private fb: FormBuilder,
public itemservice: ItemserviceService,
public snackbar: MatSnackBar,
    private datePipe: DatePipe,
public globals: Globals,
private router: Router,
  ) {
    this.itemservice.get_URL = `${this.globals.gApiserver}/api/datareqsarnTwo`;
    this.itemservice.get_URL_ITEM = `${this.globals.gApiserver}/api/datareqsarnItemMovements`;
    this.StockReportform = this.fb.group({
      company: [''],
      state: [''],
      region: [''],
      costcntr: [''],
      subcat: [''],
      grid: [''],
      catitem: [''],
      datecon: [''],
      fromdate: [''],
      todate: [''],
      cat: [''],
    });
    this.FILTERform = this.fb.group({
      cat: [''], rate: [''], display: [''], qty: [''],
    });
    this.Branchloccntrl = new FormControl();
    this.Productcntrl = new FormControl();
    this.selid = this.globals.SelectDashboard;
  }
  ngOnInit() {
    this.empty = '';
    if (this.globals.gclientServer == 'Client') {
      this.GclientServer = true;
    } else {
      this.GclientServer = false;
    }
    console.log(this.GclientServer, !this.GclientServer);

    this.modelChange(); this.CategorySubDefault(); this.costcenter(); this.regionlist(); this.statelist(); this.companylist(); this.formLoaddefault(); this.modelChangeitem(); this.defaultcategory();
    this.dropdownSettings = {
      singleSelection: false, idField: 'subcat', textField: 'subcat', enableCheckAll: true, allowSearchFilter: true, selectAllText: 'ALL', unSelectAllText: 'ALL', itemsShowLimit: 2, dropDownSelect: false,
    };
    this.dropdownSettings1 = {
      singleSelection: false, idField: 'cat', textField: 'cat', enableCheckAll: true, allowSearchFilter: true, selectAllText: 'ALL', unSelectAllText: 'ALL', itemsShowLimit: 2, dropDownSelect: false,
    };
    if (this.stockview != undefined) {
      this.stockviewone = JSON.parse(localStorage.getItem('stockview') || '');
    }
  }
  showsearchicon = true
  clickevt() {
    this.showsearchicon = !this.showsearchicon;
  }
  formLoaddefault() {
    this.post = {};
    this.post.reqMainreq = 'FormLoadDefault', this.post.Usr = this.globals.gUsrid, this.post.brcode = '0', this.post.var1 = '0', this.post.var2 = '0', this.post.var3 = '0', this.post.var4 = '0',
    this.post.var5 = '0', this.post.var6 = '0', this.post.var7 = '0', this.post.var8 = '0', this.post.var9 = '0', this.post.var10 = '0', this.post.var11 = '0', this.post.var12 = '0', this.post.var13 = '0', this.post.var14 = '0', this.post.var15 = '0',
    this.post.var16 = '0', this.post.var17 = '0', this.post.var18 = '0', this.post.var19 = '0', this.post.var20 = '0',
    this.subs.add(this.itemservice.getItemMovement(this.post).subscribe({
      next: (data) => {
        if (data[0].StatusResponse == 'Success') {
          this.Defaultload = data;
          for (let index = 0; index < this.Defaultload.length; index++) {
            const element = this.Defaultload[index];
            this.selectedValue = element.Company;
            this.patchregion = element.Region;
            this.patchcostcntr = element.Costcenter;
            this.patchstate = element.State;
          }
        } else {
          Swal.fire({ text: data[0].StatusResponse });
        }
      },
      error: (e) => {
        Swal.fire({ text: e.message }); this.isload = false;
      },
    }));
    const val = 1;
    this.post = {};
    this.post.var2 = val;
    this.post.reqMainreq = 'ChangeFinancialYear',
    this.post.Usr = this.globals.gUsrid,
    this.post.brcode = '0', this.post.var1 = 'ALL', this.post.var3 = '0', this.post.var4 = '0', this.post.var5 = '0',
    this.post.var6 = '0', this.post.var7 = '0', this.post.var8 = '0', this.post.var9 = '0', this.post.var10 = '0', this.post.var11 = '0', this.post.var12 = '0', this.post.var13 = '0',
    this.post.var14 = '0', this.post.var15 = '0', this.post.var16 = '0', this.post.var17 = '0', this.post.var18 = '0', this.post.var19 = '0', this.post.var20 = '0',
    this.subs.add(this.itemservice.getItemMovement(this.post).subscribe({
      next: (data) => {
        if (data[0].StatusResponse == 'Success') {
          this.changeYr = data;
          for (let index = 0; index < this.changeYr.length; index++) {
            const element = this.changeYr[index];
            this.Defaultyear = element.fyear;
            this.patchfromdate = element.FromDate;
            this.patchtodate = element.Todate;
          }
          this.patchfromdate1 = this.datePipe.transform(this.patchfromdate, 'dd-MMM-yy');
          this.patchtodate1 = this.datePipe.transform(this.patchtodate, 'dd-MMM-yy');
        } else {
          Swal.fire({ text: data[0].StatusResponse });
        }
      },
      error: (e) => {
        Swal.fire({ text: e.message }); this.isload = false;
      },
    }));
  }
  costcenter() {
    this.post = {};
    this.post.reqMainreq = 'CostCenter', this.post.Usr = this.globals.gUsrid, this.post.brcode = '0', this.post.var1 = '0', this.post.var2 = '0', this.post.var3 = '0', this.post.var4 = '0', this.post.var5 = '0', this.post.var6 = '0',
    this.post.var7 = '0', this.post.var8 = '0', this.post.var9 = '0', this.post.var10 = '0', this.post.var11 = '0',
    this.post.var12 = '0', this.post.var13 = '0', this.post.var14 = '0', this.post.var15 = '0',
    this.post.var16 = '0', this.post.var17 = '0', this.post.var18 = '0', this.post.var19 = '0', this.post.var20 = '0',
    this.subs.add(this.itemservice.getItemMovement(this.post).subscribe({
      next: (data) => {
        this.Cost = data;
      },
      error: (e) => {
        Swal.fire({ text: e.message }); this.isload = false;
      },
    }));
  }
  regionlist() {
    this.post = {};
    this.post.reqMainreq = 'ListOfRegion', this.post.Usr = this.globals.gUsrid, this.post.brcode = '0',
    this.post.var1 = '0', this.post.var2 = '0', this.post.var3 = '0', this.post.var4 = '0', this.post.var5 = '0', this.post.var6 = '0',
    this.post.var7 = '0', this.post.var8 = '0', this.post.var9 = '0', this.post.var10 = '0',
    this.post.var11 = '0', this.post.var12 = '0', this.post.var13 = '0', this.post.var14 = '0', this.post.var15 = '0', this.post.var16 = '0',
    this.post.var17 = '0', this.post.var18 = '0', this.post.var19 = '0', this.post.var20 = '0',
    this.subs.add(this.itemservice.getItemMovement(this.post).subscribe({
      next: (data) => {
        this.regionList = data;
      },
      error: (e) => {
        Swal.fire({ text: e.message }); this.isload = false;
      },
    }));
  }
  statelist() {
    this.post = {};
    this.post.reqMainreq = 'ListOfState',
    this.post.Usr = this.globals.gUsrid, this.post.brcode = '0', this.post.var1 = '0', this.post.var2 = '0', this.post.var3 = '0', this.post.var4 = '0', this.post.var5 = '0', this.post.var6 = '0', this.post.var7 = '0', this.post.var8 = '0', this.post.var9 = '0', this.post.var10 = '0', this.post.var11 = '0', this.post.var12 = '0', this.post.var13 = '0', this.post.var14 = '0', this.post.var15 = '0',
    this.post.var16 = '0', this.post.var17 = '0', this.post.var18 = '0', this.post.var19 = '0', this.post.var20 = '0',
    this.subs.add(this.itemservice.getItemMovement(this.post).subscribe({
      next: (data) => {
        this.stateslist = data;
      },
      error: (e) => {
        Swal.fire({ text: e.message }); this.isload = false;
      },
    }));
  }
  companylist() {
    this.post = {};
    this.post.reqMainreq = 'CompanyList', this.post.Usr = this.globals.gUsrid, this.post.brcode = '0', this.post.var1 = 'OUT', this.post.var2 = '0',
    this.post.var3 = '0', this.post.var4 = '0', this.post.var5 = '0', this.post.var6 = '0', this.post.var7 = '0', this.post.var8 = '0', this.post.var9 = '0',
    this.post.var10 = '0', this.post.var11 = '0', this.post.var12 = '0', this.post.var13 = '0', this.post.var14 = '0',
    this.post.var15 = '0', this.post.var16 = '0', this.post.var17 = '0', this.post.var18 = '0', this.post.var19 = '0', this.post.var20 = '0',
    this.subs.add(this.itemservice.getItemMovement(this.post).subscribe({
      next: (data) => {
        this.company = data;
      },
      error: (e) => {
        Swal.fire({ text: e.message }); this.isload = false;
      },
    }));
  }

  changeloc(evt: any, brcode: any) {
    if (evt.source.selected) {
      this.SelectedLoc = evt.source.value;
      this.BRcode = brcode;
    }
  }
  CategorySubDefault() {
    this.post = {};
    this.post.reqMainreq = 'Stock_DefaultSubcat', this.post.Usr = this.globals.gUsrid,
    this.subs.add(this.itemservice.getItemMovement(this.post).subscribe({
      next: (data) => {
        this.loaddefaultSubCat = data;
        this.dropdownList = this.loaddefaultSubCat;
        this.patchsubcat = this.loaddefaultSubCat;
        this.loaddefaultSubCat1 = [];
        const obj = [];
        for (let index = 0; index < this.loaddefaultSubCat.length; index++) {
          const element = this.loaddefaultSubCat[index];
          if (element.subcat == 'ALL') { this.loaddefaultSubCat.splice(index, 1); }
          this.loaddefaultSubCat1.push(element);
          this.dropdownList = this.loaddefaultSubCat;
          this.patchsubcat = this.loaddefaultSubCat;
          obj.push(element);
        }
        const skillData = this.patchsubcat.map((obj: any) => obj.subcat);
        const concatKey = skillData;
        this.subcatlist = concatKey;
      },
      error: (e) => {
        Swal.fire({ text: e.message }); this.isload = false;
      },
    }));
  }
  defaultcategory() {
    this.post = {};
    this.post.var4 = 'ALL';
    this.post.var20 = 'ALL';
    this.post.var19 = 'ALL';
    this.post.var3 = 'ALL';
    this.post.reqMainreq = 'Stock_DefaultLowlevelcat',
    this.post.Usr = this.globals.gUsrid,
    this.subs.add(this.itemservice.getItemMovement(this.post).subscribe({
      next: (data) => {
        this.loaddefaultCat = data;
        this.dropdownList1 = this.loaddefaultCat;
        this.patchcat = this.loaddefaultCat;
        this.loaddefaultCat1 = [];
        for (let index = 0; index < this.loaddefaultCat.length; index++) {
          const element = this.loaddefaultCat[index];
          if (element.cat == 'ALL') { this.loaddefaultCat.splice(index, 1); }
          this.loaddefaultCat1.push(element);
          this.dropdownList1 = this.loaddefaultCat;
          this.patchcat = this.loaddefaultCat;
          if (this.patchcatitem == 'Itemwise') {
            this.patchproduct = 'ALL';
          } else {
            this.patchproduct = '';
          }
          this.itemlist = [];
        }
        this.modelChangeitem();
      },
      error: (e) => {
        Swal.fire({ text: e.message }); this.isload = false;
      },
    }));
  }
  companychange(id: any) {
    this.companyID = id;
    this.post = {};
    this.post.var1 = id, this.post.reqMainreq = 'Sel_Change_Cmp_State', this.post.Usr = this.globals.gUsrid, this.post.brcode = '0', this.post.var1 = id, this.post.var2 = '0', this.post.var3 = '0', this.post.var5 = '0',
    this.post.var6 = '0', this.post.var7 = '0', this.post.var8 = '0', this.post.var9 = '0', this.post.var10 = '0', this.post.var11 = '0', this.post.var12 = '0', this.post.var13 = '0', this.post.var14 = '0',
    this.post.var15 = '0', this.post.var16 = '0', this.post.var17 = '0', this.post.var18 = '0', this.post.var19 = '0',
    this.post.var20 = '0', this.subs.add(this.itemservice.getItemMovement(this.post).subscribe({
      next: (data) => {
        this.stateslist = data;
        this.patchstate = 'ALL';
      },
      error: (e) => {
        Swal.fire({ text: e.message }); this.isload = false;
      },
    }));
    this.post = {};
    this.post.reqMainreq = 'Sel_Change_Cmp_Region', this.post.Usr = this.globals.gUsrid, this.post.brcode = '0', this.post.var1 = id, this.post.var2 = '0', this.post.var3 = '0', this.post.var4 = '0',
    this.post.var5 = '0', this.post.var6 = '0', this.post.var7 = '0', this.post.var8 = '0', this.post.var9 = '0',
    this.post.var10 = '0', this.post.var11 = '0', this.post.var12 = '0', this.post.var13 = '0',
    this.post.var14 = '0', this.post.var15 = '0', this.post.var16 = '0', this.post.var17 = '0', this.post.var18 = '0', this.post.var19 = '0',
    this.post.var20 = '0',
    this.subs.add(this.itemservice.getItemMovement(this.post).subscribe({
      next: (data) => {
        this.regionList = data;
        this.patchregion = 'ALL';
      },
      error: (e) => {
        Swal.fire({ text: e.message }); this.isload = false;
      },
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
    this.subs.add(this.itemservice.getItemMovement(this.post).subscribe({
      next: (data) => {
        this.Branchlocation = data;
        this.Fixedloc = [];
        for (let index = 0; index < this.Branchlocation.length; index++) {
          const element = this.Branchlocation[index];
          this.Fixedloc.push(element);
          this.patchbranch = '';
          this.regionid = '';
          this.stateID = '';
        }
      },
      error: (e) => {
        Swal.fire({ text: e.message }); this.isload = false;
      },
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
    this.subs.add(this.itemservice.getItemMovement(this.post).subscribe({
      next: (data) => {
        this.regionList = data;
      },
      error: (e) => {
        Swal.fire({ text: e.message }); this.isload = false;
      },
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
    this.subs.add(this.itemservice.getItemMovement(this.post).subscribe({
      next: (data) => {
        this.Branchlocation = data;
        this.Fixedloc = [];
        for (let index = 0; index < this.Branchlocation.length; index++) {
          const element = this.Branchlocation[index];
          this.Fixedloc.push(element);
          this.patchbranch = '';
        }
      },
      error: (e) => {
        Swal.fire({ text: e.message }); this.isload = false;
      },
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
    this.subs.add(this.itemservice.getItemMovement(this.post).subscribe({
      next: (data) => {
        this.Branchlocation = data;
        this.Fixedloc1 = [];
        for (let index = 0; index < this.Branchlocation.length; index++) {
          const element = this.Branchlocation[index];
          this.Fixedloc1.push(element);
          this.patchbranch = '';
        }
      },
      error: (e) => {
        Swal.fire({ text: e.message }); this.isload = false;
      },
    }));
  }
  Costcntrchange(state: any) {
    this.costid = state.Costcenter;
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
    if (this.regionid == undefined || this.regionid == '') {
      this.post.var5 = 'ALL';
    } else {
      this.post.var5 = this.regionid;
    }
    this.post.reqMainreq = 'BranchSelection',
    this.post.Usr = this.globals.gUsrid, this.post.brcode = '0', this.post.var1 = '',
    this.post.var2 = '0', this.post.var6 = this.costid, this.post.var7 = '0', this.post.var8 = '0', this.post.var9 = '0', this.post.var10 = '0',
    this.post.var11 = '0', this.post.var12 = '0', this.post.var13 = '0', this.post.var14 = '0',
    this.post.var15 = '0', this.post.var16 = '0', this.post.var17 = '0', this.post.var18 = '0', this.post.var19 = '0',
    this.post.var20 = '0',
    this.subs.add(this.itemservice.getItemMovement(this.post).subscribe({
      next: (data) => {
        this.Branchlocation = data;
        this.Fixedloc = [];
        for (let index = 0; index < this.Branchlocation.length; index++) {
          const element = this.Branchlocation[index];
          this.Fixedloc.push(element);
          this.patchbranch = '';
        }
      },
      error: (e) => {
        Swal.fire({ text: e.message }); this.isload = false;
      },
    }));
  }
  modelChange() {
    this.subs.add(this.Branchloccntrl.valueChanges.pipe(debounceTime(600)).subscribe({
      next: (data) => {
        this.post = {};
        if (this.patchcompany == undefined) {
          this.post.var3 = 'ADYAR ANANDA BHAVAN';
        } else {
          this.post.var3 = this.patchcompany;
        }
        if (this.patchstate == 'undefined' || this.patchstate == undefined || this.patchstate == '') {
          this.post.var4 = 'ALL';
        } else {
          this.post.var4 = this.patchstate;
        }
        if (this.patchregion == 'undefined' || this.patchregion == undefined || this.patchregion == '') {
          this.post.var5 = 'ALL';
        } else {
          this.post.var5 = this.patchregion;
        }
        if (this.patchcostcntr == undefined) {
          this.post.var6 = 'ALL';
        } else {
          this.post.var6 = this.patchcostcntr;
        }
        this.post.reqMainreq = 'BranchSelection', this.post.Usr = this.globals.gUsrid, this.post.brcode = '0',
        this.post.var1 = data, this.post.var2 = '0', this.post.var7 = '0', this.post.var8 = '0', this.post.var9 = '0', this.post.var10 = '0',
        this.post.var11 = '0', this.post.var12 = '0', this.post.var13 = '0', this.post.var14 = '0', this.post.var15 = '0', this.post.var16 = '0',
        this.post.var17 = '0', this.post.var18 = this.globals.gclientServer;
        this.post.var19 = '0', this.post.var20 = '0',
        this.Brname = data;
        this.subs.add(this.itemservice.getItemMovement(this.post).subscribe((data) => {
          this.Branchlocation = data;
          for (let index = 0; index < data.length; index++) {
            const element = data[index];
            if (this.Brname == element.brname) {
              this.brcode = element.brcode;
            }
          }
        }));
      },
      error: (e) => {
        Swal.fire({ text: e.message }); this.isload = false;
      },
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
    this.patchfromdate1 = this.datePipe.transform(changedate, 'dd-MMM-yy');

    if (this.dateval1 > this.dateval || this.dateval < this.dateval1) {
      $('#getdate').modal('show');
    }
  }
  inputEvent(event: any) {
    this.dateval = event.value;
    this.todate = event.value;
    const changedate = this.todate;
    this.patchtodate1 = this.datePipe.transform(changedate, 'dd-MMM-yy');
    if (this.dateval1 > this.dateval || this.dateval < this.dateval1) {
      $('#getdate').modal('show');
    }
  }
  closelist() {
    $('#getviewlist').modal('hide');
  }
  closedate() {
    $('#getdate').modal('hide');
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
    const skillData = items.map((obj: any) => obj.subcat);
    const concatKey = skillData;
    this.subcatlist = concatKey;
    this.post = {};
    this.post.var1 = '0', this.post.reqMainreq = 'Stock_Lowlevelcat',
    this.post.Usr = this.globals.gUsrid,
    this.post.var19 = concatKey,
    this.subs.add(this.itemservice.getItemMovement(this.post).subscribe({
      next: (data) => {
        if (data[0].StatusResponse == 'Success') {
          this.loaddefaultCat = data;
          this.loaddefaultCat1 = [];
          for (let index = 0; index < this.loaddefaultCat.length; index++) {
            const element = this.loaddefaultCat[index];
            if (element.cat == 'ALL') {
              this.loaddefaultCat.splice(index, 1);
              this.loaddefaultCat1.push(element);
              this.dropdownList1 = this.loaddefaultCat;
              this.patchcat = this.loaddefaultCat;
              if (this.patchcatitem == 'Itemwise') {
                this.patchproduct = 'ALL';
              } else {
                this.patchproduct = '';
              }
              this.itemlist = [];
            }
          }
        } else {
          Swal.fire({ text: data[0].StatusResponse });
        }
      },
      error: (e) => {
        Swal.fire({ text: e.message }); this.isload = false;
      },
    }));
  }
  len1 = 0
  onItemSelect(itm: any) {
    this.showtrue = false;
    this.showtrue1 = true;
    const skillData = this.patchsubcat.map((obj: any) => obj.subcat);
    const concatKey = skillData;
    this.subcatlist = concatKey;
    this.post = {};
    this.post.var1 = '0';
    this.post.reqMainreq = 'Stock_Lowlevelcat', this.post.Usr = this.globals.gUsrid,
    this.post.var19 = concatKey;
    if (concatKey.length >= 49) {
      $('#getsubcat').modal('show');
    } else {
      $('#getsubcat').modal('hide');
      this.subs.add(this.itemservice.getItemMovement(this.post).subscribe({
        next: (data) => {
          if (data[0].StatusResponse == 'Success') {
            this.loaddefaultCat = data;
            this.loaddefaultCat1 = [];
            for (let index = 0; index < this.loaddefaultCat.length; index++) {
              const element = this.loaddefaultCat[index];
              if (element.cat == 'ALL') {
                this.loaddefaultCat.splice(index, 1);
                this.loaddefaultCat1.push(element);
                this.dropdownList1 = this.loaddefaultCat;
                this.patchcat = this.loaddefaultCat;
                if (this.patchcatitem == 'Itemwise') {
                  this.patchproduct = 'ALL';
                } else {
                  this.patchproduct = '';
                }
                this.itemlist = [];
              }
            }
          } else {
            Swal.fire({ text: data[0].StatusResponse });
          }
        },
        error: (e) => {
          Swal.fire({ text: e.message }); this.isload = false;
        },
      }));
    }
  }

  onItemDeSelect(e: any) {
    this.showtrue = false;
    this.showtrue1 = true;
    const skillData = this.patchsubcat.map((obj: any) => obj.subcat);
    const concatKey = skillData;
    this.subcatlist = concatKey;
    this.post = {};
    this.post.var1 = '0';
    this.post.reqMainreq = 'Stock_Lowlevelcat', this.post.Usr = this.globals.gUsrid,
    this.post.var19 = concatKey;
    if (concatKey.length >= 49) {
      $('#getsubcat').modal('show');
    } else {
      $('#getsubcat').modal('hide');
      this.subs.add(this.itemservice.getItemMovement(this.post).subscribe({
        next: (data) => {
          this.loaddefaultCat = data;
          this.loaddefaultCat1 = [];
          for (let index = 0; index < this.loaddefaultCat.length; index++) {
            const element = this.loaddefaultCat[index];
            if (element.cat == 'ALL') {
              this.loaddefaultCat.splice(index, 1);
              this.loaddefaultCat1.push(element);
              this.dropdownList1 = this.loaddefaultCat;
              this.patchcat = this.loaddefaultCat;
              if (this.patchcatitem == 'Itemwise') {
                this.patchproduct = 'ALL';
              } else {
                this.patchproduct = '';
              }
              this.itemlist = [];
            }
          }
        // this.defaultcategory()
        },
        error: (e) => {
          Swal.fire({ text: e.message }); this.isload = false;
        },
      }));
    }
  }
  onDeselectAll(item: any) {
    this.showtrue = false;
    this.showtrue1 = true;
    const skillData = this.patchsubcat.map((obj: any) => obj.subcat);
    const concatKey = skillData;
    this.subcatlist = concatKey;
    this.post = {};
    this.post.reqMainreq = 'Stock_Lowlevelcat', this.post.Usr = this.globals.gUsrid,
    this.post.var19 = concatKey;
    this.subs.add(this.itemservice.getItemMovement(this.post).subscribe({
      next: (data) => {
        this.loaddefaultCat = data;
        this.loaddefaultCat1 = [];
        for (let index = 0; index < this.loaddefaultCat.length; index++) {
          const element = this.loaddefaultCat[index];
          if (element.cat == 'ALL') {
            this.loaddefaultCat.splice(index, 1);
            this.loaddefaultCat1.push(element);
            this.dropdownList1 = this.loaddefaultCat;
            this.patchcat = this.loaddefaultCat;
            if (this.patchcatitem == 'Itemwise') {
              this.patchproduct = 'ALL';
            } else {
              this.patchproduct = '';
            }
            this.itemlist = [];
          }
        }
      },
      error: (e) => {
        Swal.fire({ text: e.message }); this.isload = false;
      },
    }));
  }
  onSelectAll1(items: any) {
    this.catitem = items;
    this.showtrue1 = true;
    const skillData = items.map((obj: any) => obj.cat);
    const concatKey = skillData;
    this.catlist = concatKey;
    if (this.patchcatitem == 'Itemwise') {
      this.patchproduct = 'ALL';
    } else {
      this.patchproduct = '';
    }
    this.itemlist = [];
  }
  len = 0
  onItemSelect1(itm: any) {
    this.showtrue1 = false;
    this.len = itm.length + this.len;
    const skillData = this.patchcat.map((obj: any) => obj.cat);
    const concatKey = skillData;
    this.catlist = concatKey;
    if (concatKey.length >= 49) {
      $('#getcat').modal('show');
    } else {
      $('#getcat').modal('hide');

      if (this.patchcatitem == 'Itemwise') {
        this.patchproduct = 'ALL';
      } else {
        this.patchproduct = '';
      }
      this.itemlist = [];
    }
  }
  onItemDeSelect1(e: any) {
    this.showtrue1 = false;
    const skillData = this.patchcat.map((obj: any) => obj.cat);
    const concatKey = skillData;
    this.catlist = concatKey;
    if (concatKey.length >= 49) {
      $('#getcat').modal('show');
    } else {
      $('#getcat').modal('hide');
      if (this.patchcatitem == 'Itemwise') {
        this.patchproduct = 'ALL';
      } else {
        this.patchproduct = '';
      }
      this.itemlist = [];
    }
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
    if (this.patchcatitem == 'Itemwise') {
      this.patchproduct = 'ALL';
    } else {
      this.patchproduct = '';
    }
    this.itemlist = [];
  }
  changesel(sel: any) {
    this.sel = sel;
    if (sel == 'Low level cat') {
      this.opt = 'optCat';
    } else {
      this.opt = 'optSubcat';
    }
  }

  modelChangeitem() {
    this.subs.add(this.Productcntrl.valueChanges.pipe(debounceTime(600)).subscribe((event) => {
      this.post = {};
      if (event == undefined) {
        this.post.var1 = '';
      } else {
        this.post.var1 = event;
      }
      if (isNaN(event) || event == undefined || event == '') {
        this.post.reqMainreq = 'Stock_ItemWise';
      } else {
        this.post.reqMainreq = 'Stock_ItemCode';
      }
      this.post.Usr = this.globals.gUsrid,
      this.post.var3 = this.patchgrid,
      this.post.var2 = this.opt;
      if (this.opt == 'optCat') {
        if (this.patchcat.length == this.dropdownList1.length || this.patchcat == undefined) {
          this.post.var19 = 'ALL';
        } else {
          this.post.var19 = this.catlist;
        }
      } else if (this.opt == 'optSubcat') {
        if (this.patchsubcat.length == this.dropdownList.length || this.patchsubcat == undefined) {
          this.post.var19 = this.subcatlist;
        } else {
          this.post.var19 = this.subcatlist;
        }
      }
      this.subs.add(this.itemservice.getItemMovement(this.post).subscribe({
        next: (data) => {
          this.itemlist = data;
        },
        error: (e) => {
          Swal.fire({ text: e.message }); this.isload = false;
        },
      }));
    }));
  }
  Productchange(state: any, icode: any) {
    this.prodid = state;
    this.Icode = icode;
  }
  checkCheckBoxvalue(event: any) {
    if (event.checked == true) {
      this.checkboxval = 'AllCat';
    } else {
      this.checkboxval = 'STK_cat';
    }
  }
  closeRec() {
    $('#getRec').modal('hide');
  }
  searchFilter() {
    this.patch1 = this.patch;
    this.patchcatitem1 = this.patchcatitem;
    this.post = {};
    this.post.reqMainreq = 'Stock_DisplayAllCat',
    this.post.var1 = this.checkboxval;
    this.subs.add(this.itemservice.getItemMovement(this.post).subscribe({
      next: (data) => {
        if (data[0].StatusResponse == 'Success') {
          this.loaddefaultSubCat = data;
          this.dropdownList = this.loaddefaultSubCat;
          this.patchsubcat = this.loaddefaultSubCat;
          this.loaddefaultSubCat1 = [];
          for (let index = 0; index < this.loaddefaultSubCat.length; index++) {
            const element = this.loaddefaultSubCat[index];
            if (element.subcat == 'ALL') { this.loaddefaultSubCat.splice(index, 1); }
            this.loaddefaultSubCat1.push(element);
            this.dropdownList = this.loaddefaultSubCat;
            this.patchsubcat = this.loaddefaultSubCat;
            this.showtrue1 = true;
            this.showtrue = true;
          }
          this.dropdownSettings = {
            singleSelection: false, idField: 'subcat', textField: 'subcat', allowSearchFilter: true, selectAllText: 'ALL', unSelectAllText: 'ALL', itemsShowLimit: 2, dropDownSelect: false,
          };
          this.dropdownSettings1 = {
            singleSelection: false, idField: 'cat', textField: 'cat', allowSearchFilter: true, selectAllText: 'ALL', unSelectAllText: 'ALL', itemsShowLimit: 2, dropDownSelect: false,
          };
        } else {
          Swal.fire({ text: data[0].StatusResponse });
          this.loaddefaultSubCat = [];
        }
      },
      error: (e) => {
        Swal.fire({ text: e.message }); this.isload = false;
      },
    }));
  }
  showicon() {
    this.showdaategroup = false;
    this.showicondate = true;
  }
  showdate() {
    this.showdaategroup = true;
    this.showicondate = false;
  }
  changeitem(pachitm: any) {
    if (pachitm == 'Itemwise') {
      this.patchqty = 'Qtywise';
    } else {
      this.patchqty = '';
    }
    if (this.patchcatitem == 'Itemwise') {
      this.patchproduct = 'ALL';
    } else {
      this.patchproduct = '';
    }
  }
  StockviewONE() {
    if (this.patchbranch == '' || this.patchbranch == undefined || this.patchbranch == 'undefined') {
      this.snackbar.open('Choose Branch', 'Branch', {
        duration: 3000,
      });
    } else {
      if (this.patchsubcat.length == 0 || this.patchcat.length == 0) {
        this.snackbar.open('Select Category', 'Stock', {
          duration: 3000,
        });
        return;
      }
      this.globals.SelectDashboard = 'PAGETWO';
      this.stockview = {};
      this.stockview.subcategorylist = this.subcatlist;
      if (this.patchcat.length == this.dropdownList1.length) {
        this.stockview.categorylist = 'ALL';
      } else {
        this.stockview.categorylist = this.catlist;
      }
      localStorage.setItem('stockview', JSON.stringify(this.stockview));
      this.stockviewone = JSON.parse(localStorage.getItem('stockview') || '');
      this.showpageTWO = true;
      this.showpageONE = false;
      this.showpageTHREE = false;
      this.showpageFOUR = false;
      this.showsearchicon = true;
      this.getcondition();
      if (this.patchgrid == 'Vertical' && this.patchdatecon == 'Datewise') {
        this.post = {};
        this.post.reqMainreq = 'Stock_Gridviewheader',
        this.post.Usr = this.globals.gUsrid, this.post.var3 = this.patchgrid,
        this.subs.add(this.itemservice.getItemMovement(this.post).subscribe({
          next: (data) => {
            if (data[0].StatusResponse == 'Success') {
              this.showstockviewtwo = data;
            } else {
              Swal.fire({ text: data[0].StatusResponse });
            }
            this.showstockviewtwo.sort((x, y) => x.Lsno - y.Lsno);
          },
          error: (e) => {
            Swal.fire({ text: e.message }); this.isload = false;
          },
        }));
        this.post = {};
        this.post.reqMainreq = 'StockManagement',
        this.post.fdate = this.patchfromdate1,
        this.post.tdate = this.patchtodate1,
        this.post.brcode = this.BRcode;
        if (this.patchcatitem == 'Itemwise') {
          this.post.icode = this.Icode;
        } else {
          this.post.icode = '0';
        }
        this.post.repSelID = this.patchcatitem,
        this.post.transType = this.patchdatecon;
        if (this.patchrate === 'Std' && this.patchqty != 'Qtywise') {
          this.post.TransWiseBr = 'CurRateChecked';
        } else if (this.patchrate === 'Std' && this.patchqty === 'Valuewise') {
          this.post.TransWiseBr = 'CurRateChecked';
        } else if (this.patchqty === 'Qtywise') {
          this.post.TransWiseBr = 'QtywiseChecked';
        } else if (this.patchrate === 'Weighted Avg Rate' && this.patchqty != 'Qtywise') {
          this.post.TransWiseBr = 'ActRateChecked';
        } else if (this.patchrate === 'Weighted Avg Rate' && this.patchqty === 'Valuewise') {
          this.post.TransWiseBr = 'ActRateChecked';
        }
        this.post.usr = this.globals.gUsrid,
        this.post.CurOrPLRate = '',
        this.post.tname = this.tname,
        this.post.CustomName = '',
        this.post.ViewType = this.patchgrid,
        this.post.Company = this.patchcompany,
        this.post.Region = this.patchregion;
        if (this.patchsubcat.length == 1) {
          this.post.subcat = `${this.stockview.subcategorylist},`;
        } else {
          this.post.subcat = `${this.stockview.subcategorylist},`;
        }
        if (this.stockview.categorylist == 'ALL') {
          this.post.cat = this.stockview.categorylist;
        } else {
          this.post.cat = `${this.stockview.categorylist},`;
        }
        this.post.datesel = '',
        this.post.CostCntr = this.patchcostcntr,
        this.post.ClientOrServ = this.globals.gclientServer,
        this.post.State = this.patchstate,
        this.post.CustomSel = '',
        this.post.CustomCat = this.opt,
        this.post.CustBrGrp = '',
        this.post.ExptOwnSale = '',
        this.post.var1 = '',
        this.post.Custbr = '',
        this.post.var2 = '';
        this.storedata = [];
        this.tname1 = this.post.tname;
        this.isload = true;
        this.subs.add(this.itemservice.getItemMovementFinalView(this.post).subscribe({
          next: (data) => {
            this.tablebodydata1 = data;
            this.isload = false;
            if (data[0].StatusResponse == 'Success') {
              for (let index = 0; index < this.tablebodydata1.length; index++) {
                const element = this.tablebodydata1[index];
                this.storedata.push(element);
              }

              this.result = [];
              const map = new Map();
              for (const item of data) {
                if (!map.has(item.Date)) {
                  map.set(item.Date, true); // set any value to Map
                  this.result.push({
                    id: item.Date,
                  });
                }
              }
              this.storedata = [];
              this.id = this.patchfromdate1;
              for (let index = 0; index < this.tablebodydata1.length; index++) {
                const element = this.tablebodydata1[index];
                if (this.id == element.Date) {
                  this.storedata.push(element);
                  this.currentpage = this.id;
                }
              }
            } else {
              Swal.fire({ text: data[0].StatusResponse });
            }
          },
          error: (e) => {
            Swal.fire({ text: e.message }); this.isload = false;
          },
        }));
      } else if (this.patchgrid == 'Vertical' && this.patchdatecon == 'Consolidate') {
        this.post = {};
        this.post.reqMainreq = 'Stock_Gridviewheader',
        this.post.Usr = this.globals.gUsrid, this.post.var3 = this.patchgrid,
        this.subs.add(this.itemservice.getItemMovement(this.post).subscribe({
          next: (data) => {
            if (data[0].StatusResponse == 'Success') {
              this.showstockviewtwo = data;
            } else {
              Swal.fire({ text: data[0].StatusResponse });
            }

            this.showstockviewtwo.sort((x, y) => x.Lsno - y.Lsno);
          },
          error: (e) => {
            Swal.fire({ text: e.message }); this.isload = false;
          },
        }));
        this.post = {};
        this.post.reqMainreq = 'StockManagement',
        this.post.fdate = this.patchfromdate1,
        this.post.tdate = this.patchtodate1,
        this.post.brcode = this.BRcode;
        if (this.patchcatitem == 'Itemwise') {
          this.post.icode = this.Icode;
        } else {
          this.post.icode = '0';
        }
        this.post.repSelID = this.patchcatitem,
        this.post.transType = this.patchdatecon;
        if (this.patchrate === 'Std' && this.patchqty != 'Qtywise') {
          this.post.TransWiseBr = 'CurRateChecked';
        } else if (this.patchrate === 'Std' && this.patchqty === 'Valuewise') {
          this.post.TransWiseBr = 'CurRateChecked';
        } else if (this.patchqty === 'Qtywise') {
          this.post.TransWiseBr = 'QtywiseChecked';
        } else if (this.patchrate === 'Weighted Avg Rate' && this.patchqty != 'Qtywise') {
          this.post.TransWiseBr = 'ActRateChecked';
        } else if (this.patchrate === 'Weighted Avg Rate' && this.patchqty === 'Valuewise') {
          this.post.TransWiseBr = 'ActRateChecked';
        }
        this.post.usr = this.globals.gUsrid,
        this.post.CurOrPLRate = '',
        this.post.tname = this.tname,
        this.post.CustomName = '',
        this.post.ViewType = this.patchgrid,
        this.post.Company = this.patchcompany,
        this.post.Region = this.patchregion;
        if (this.patchsubcat.length == 1) {
          this.post.subcat = `${this.stockview.subcategorylist},`;
        } else {
          this.post.subcat = `${this.stockview.subcategorylist},`;
        }
        if (this.stockview.categorylist == 'ALL') {
          this.post.cat = this.stockview.categorylist;
        } else {
          this.post.cat = `${this.stockview.categorylist},`;
        }
        this.post.datesel = '',
        this.post.CostCntr = this.patchcostcntr,
        this.post.ClientOrServ = this.globals.gclientServer,
        this.post.State = this.patchstate,
        this.post.CustomSel = '',
        this.post.CustomCat = this.opt,
        this.post.CustBrGrp = '',
        this.post.ExptOwnSale = '',
        this.post.var1 = '',
        this.post.Custbr = '',
        this.post.var2 = '';
        this.storedata = [];
        this.tname1 = this.post.tname;
        this.isload = true;
        this.subs.add(this.itemservice.getItemMovementFinalView(this.post).subscribe({
          next: (data) => {
            this.tablebodydata1 = data;
            this.isload = false;
            if (data[0].StatusResponse == 'Success') {
              for (let index = 0; index < this.tablebodydata1.length; index++) {
                const element = this.tablebodydata1[index];
                this.storedata.push(element);
              }
            } else if (data?.length == 0) {
              Swal.fire({ text: 'No record found' });
            } else {
              Swal.fire({ text: data[0].StatusResponse });
            }
          },
          error: (e) => {
            Swal.fire({ text: e.message }); this.isload = false;
          },
        }));
      } else if (this.patchgrid == 'Horizontal' && this.patchdatecon == 'Datewise') {
        if (this.patchsubcat.length == 1 || this.patchcat.length == 1) {
          this.showdaategroup = false;
          this.post = {};
          this.post.reqMainreq = 'Stock_Gridviewheader',
          this.post.Usr = this.globals.gUsrid, this.post.var3 = this.patchgrid,
          this.post.var4 = this.patchcatitem, this.post.var5 = this.patchdatecon;
          if (this.patchcatitem == 'Categorywise') {
            this.post.var7 = '',
            this.post.var6 = this.patchsubcat.length;
          } else {
            this.post.var7 = this.patchproduct,
            this.post.var6 = this.patchcat.length;
          }
          this.subs.add(this.itemservice.getItemMovement(this.post).subscribe({
            next: (data) => {
              if (data[0].StatusResponse == 'Success') {
                this.showstockviewtwo = data;
              } else {
                Swal.fire({ text: data[0].StatusResponse });
              }
            },
            error: (e) => {
              Swal.fire({ text: e.message }); this.isload = false;
            },
          }));
          this.post = {};
          this.post.reqMainreq = 'StockManagement',
          this.post.fdate = this.patchfromdate1,
          this.post.tdate = this.patchtodate1,
          this.post.brcode = this.BRcode;
          if (this.patchcatitem == 'Itemwise') {
            this.post.icode = this.Icode;
          } else {
            this.post.icode = '0';
          }
          this.post.repSelID = this.patchcatitem,
          this.post.transType = this.patchdatecon;
          if (this.patchrate === 'Std' && this.patchqty != 'Qtywise') {
            this.post.TransWiseBr = 'CurRateChecked';
          } else if (this.patchrate === 'Std' && this.patchqty === 'Valuewise') {
            this.post.TransWiseBr = 'CurRateChecked';
          } else if (this.patchqty === 'Qtywise') {
            this.post.TransWiseBr = 'QtywiseChecked';
          } else if (this.patchrate === 'Weighted Avg Rate' && this.patchqty != 'Qtywise') {
            this.post.TransWiseBr = 'ActRateChecked';
          } else if (this.patchrate === 'Weighted Avg Rate' && this.patchqty === 'Valuewise') {
            this.post.TransWiseBr = 'ActRateChecked';
          }
          this.post.usr = this.globals.gUsrid,
          this.post.CurOrPLRate = '',
          this.post.tname = this.tname,
          this.post.CustomName = '',
          this.post.ViewType = this.patchgrid,
          this.post.Company = this.patchcompany,
          this.post.Region = this.patchregion;
          if (this.patchsubcat.length == 1) {
            this.post.subcat = `${this.stockview.subcategorylist},`;
          } else {
            this.post.subcat = `${this.stockview.subcategorylist},`;
          }
          if (this.stockview.categorylist == 'ALL') {
            this.post.cat = this.stockview.categorylist;
          } else {
            this.post.cat = `${this.stockview.categorylist},`;
          }
          this.post.datesel = '',
          this.post.CostCntr = this.patchcostcntr,
          this.post.ClientOrServ = this.globals.gclientServer,
          this.post.State = this.patchstate,
          this.post.CustomSel = '',
          this.post.CustomCat = this.opt,
          this.post.CustBrGrp = '',
          this.post.ExptOwnSale = '',
          this.post.var1 = '',
          this.post.Custbr = '',
          this.post.var2 = '';
          this.storedata = [];
          this.tname1 = this.post.tname;
          this.isload = true;
          this.subs.add(this.itemservice.getItemMovementFinalView(this.post).subscribe({
            next: (data) => {
              this.tablebodydata1 = data;
              this.isload = false;
              if (data[0].StatusResponse == 'Success') {
                for (let index = 0; index < this.tablebodydata1.length; index++) {
                  const element = this.tablebodydata1[index];
                  this.storedata.push(element);
                }
              } else if (data.length == 0) {

              } else {
                Swal.fire({ text: data[0].StatusResponse });
              }
            },
            error: (e) => {
              Swal.fire({ text: e.message }); this.isload = false;
            },
          }));
        } else {
          this.showdaategroup = true;
          this.post = {};
          this.post.reqMainreq = 'Stock_Gridviewheader',
          this.post.Usr = this.globals.gUsrid, this.post.var3 = this.patchgrid,
          this.post.var4 = this.patchcatitem, this.post.var5 = this.patchdatecon;
          if (this.patchcatitem == 'Categorywise') {
            this.post.var7 = '',
            this.post.var6 = this.patchsubcat.length;
          } else {
            this.post.var7 = this.patchproduct,
            this.post.var6 = this.patchcat.length;
          }
          this.subs.add(this.itemservice.getItemMovement(this.post).subscribe({
            next: (data) => {
              this.showstockviewtwo = data;
              for (let index = 0; index < this.showstockviewtwo.length; index++) {
                const element = this.showstockviewtwo[index];
              }
            },
            error: (e) => {
              Swal.fire({ text: e.message }); this.isload = false;
            },
          }));
          this.post = {};
          this.post.reqMainreq = 'StockManagement',
          this.post.fdate = this.patchfromdate1,
          this.post.tdate = this.patchtodate1,
          this.post.brcode = this.BRcode;
          if (this.patchcatitem == 'Itemwise') {
            this.post.icode = this.Icode;
          } else {
            this.post.icode = '0';
          }
          this.post.repSelID = this.patchcatitem,
          this.post.transType = this.patchdatecon;
          if (this.patchrate === 'Std' && this.patchqty != 'Qtywise') {
            this.post.TransWiseBr = 'CurRateChecked';
          } else if (this.patchrate === 'Std' && this.patchqty === 'Valuewise') {
            this.post.TransWiseBr = 'CurRateChecked';
          } else if (this.patchqty === 'Qtywise') {
            this.post.TransWiseBr = 'QtywiseChecked';
          } else if (this.patchrate === 'Weighted Avg Rate' && this.patchqty != 'Qtywise') {
            this.post.TransWiseBr = 'ActRateChecked';
          } else if (this.patchrate === 'Weighted Avg Rate' && this.patchqty === 'Valuewise') {
            this.post.TransWiseBr = 'ActRateChecked';
          }
          this.post.usr = this.globals.gUsrid,
          this.post.CurOrPLRate = '',
          this.post.tname = this.tname,
          this.post.CustomName = '',
          this.post.ViewType = this.patchgrid,
          this.post.Company = this.patchcompany,
          this.post.Region = this.patchregion;
          if (this.patchsubcat.length == 1) {
            this.post.subcat = `${this.stockview.subcategorylist},`;
          } else {
            this.post.subcat = `${this.stockview.subcategorylist},`;
          }
          if (this.stockview.categorylist == 'ALL') {
            this.post.cat = this.stockview.categorylist;
          } else {
            this.post.cat = `${this.stockview.categorylist},`;
          }
          this.post.datesel = '',
          this.post.CostCntr = this.patchcostcntr,
          this.post.ClientOrServ = this.globals.gclientServer,
          this.post.State = this.patchstate,
          this.post.CustomSel = '',
          this.post.CustomCat = this.opt,
          this.post.CustBrGrp = '',
          this.post.ExptOwnSale = '',
          this.post.var1 = '',
          this.post.Custbr = '',
          this.post.var2 = '';
          this.storedata = [];
          this.tname1 = this.post.tname;
          this.isload = true;
          this.subs.add(this.itemservice.getItemMovementFinalView(this.post).subscribe({
            next: (data) => {
              this.tablebodydata1 = data;
              this.isload = false;
              if (data.length != 0) {
                if (data[0].StatusResponse == 'Success') {
                  for (let index = 0; index < this.tablebodydata1.length; index++) {
                    const element = this.tablebodydata1[index];
                    this.storedata.push(element);
                  }
                  this.result = [];
                  const map = new Map();
                  for (const item of data) {
                    if (!map.has(item.Date)) {
                      map.set(item.Date, true);
                      // set any value to Map
                      this.result.push({
                        id: item.Date,
                      });
                    }
                  }
                  this.storedata = [];
                  this.id = this.patchfromdate1;
                  for (let index = 0; index < this.tablebodydata1.length; index++) {
                    const element = this.tablebodydata1[index];
                    if (this.id == element.Date) {
                      this.storedata.push(element);
                      this.currentpage = this.id;
                    }
                  }
                } else {
                  Swal.fire({ text: data[0].StatusResponse });
                }
              } else if (data.length == 0) {

              }
            },
            error: (e) => {
              Swal.fire({ text: e.message }); this.isload = false;
            },
          }));
        }
      } else if (this.patchgrid == 'Horizontal' && this.patchdatecon == 'Consolidate') {
        this.post = {};
        this.post.reqMainreq = 'Stock_Gridviewheader',
        this.post.Usr = this.globals.gUsrid, this.post.var3 = this.patchgrid,
        this.post.var4 = this.patchcatitem, this.post.var5 = this.patchdatecon;
        if (this.patchcatitem == 'Categorywise') {
          this.post.var7 = '',
          this.post.var6 = this.patchsubcat.length;
        } else {
          this.post.var7 = this.patchproduct,
          this.post.var6 = this.patchcat.length;
        }
        this.subs.add(this.itemservice.getItemMovement(this.post).subscribe({
          next: (data) => {
            this.showstockviewtwo = data;
          },
          error: (e) => {
            Swal.fire({ text: e.message }); this.isload = false;
          },
        }));
        this.post = {};
        this.post.reqMainreq = 'StockManagement',
        this.post.fdate = this.patchfromdate1,
        this.post.tdate = this.patchtodate1,
        this.post.brcode = this.BRcode;
        if (this.patchcatitem == 'Itemwise') {
          this.post.icode = this.Icode;
        } else {
          this.post.icode = '0';
        }
        this.post.repSelID = this.patchcatitem,
        this.post.transType = this.patchdatecon;
        if (this.patchrate === 'Std' && this.patchqty != 'Qtywise') {
          this.post.TransWiseBr = 'CurRateChecked';
        } else if (this.patchrate === 'Std' && this.patchqty === 'Valuewise') {
          this.post.TransWiseBr = 'CurRateChecked';
        } else if (this.patchqty === 'Qtywise') {
          this.post.TransWiseBr = 'QtywiseChecked';
        } else if (this.patchrate === 'Weighted Avg Rate' && this.patchqty != 'Qtywise') {
          this.post.TransWiseBr = 'ActRateChecked';
        } else if (this.patchrate === 'Weighted Avg Rate' && this.patchqty === 'Valuewise') {
          this.post.TransWiseBr = 'ActRateChecked';
        }
        this.post.usr = this.globals.gUsrid,
        this.post.CurOrPLRate = '',
        this.post.tname = this.tname,
        this.post.CustomName = '',
        this.post.ViewType = this.patchgrid,
        this.post.Company = this.patchcompany,
        this.post.Region = this.patchregion;
        if (this.patchsubcat.length == 1) {
          this.post.subcat = `${this.stockview.subcategorylist},`;
        } else {
          this.post.subcat = `${this.stockview.subcategorylist},`;
        }
        if (this.stockview.categorylist == 'ALL') {
          this.post.cat = this.stockview.categorylist;
        } else {
          this.post.cat = `${this.stockview.categorylist},`;
        }
        this.post.datesel = '',
        this.post.CostCntr = this.patchcostcntr,
        this.post.ClientOrServ = this.globals.gclientServer,
        this.post.State = this.patchstate,
        this.post.CustomSel = '',
        this.post.CustomCat = this.opt,
        this.post.CustBrGrp = '',
        this.post.ExptOwnSale = '',
        this.post.var1 = '',
        this.post.Custbr = '',
        this.post.var2 = '';
        this.tname1 = this.post.tname;
        this.isload = true;
        this.subs.add(this.itemservice.getItemMovementFinalView(this.post).subscribe({
          next: (data) => {
            this.tablebodydata1 = data;
            this.isload = false;
            if (data.length != 0) {
              if (data[0].StatusResponse == 'Success') {
                this.storedata = [...this.tablebodydata1];
                // for (let index = 0; index < this.tablebodydata1.length; index++) {
                //   const element = this.tablebodydata1[index];
                //   this.storedata.push(element);
                // }
                console.log(this.storedata);
              } else {
                Swal.fire({ text: data[0].StatusResponse });
              }
            } else if (data.length == 0) {

            }
          },
          error: (e) => {
            Swal.fire({ text: e.message }); this.isload = false;
          },
        }));
      }
    }
  }

  getcondition() {
    if (this.patchgrid == 'Horizontal' && this.patchdatecon == 'Consolidate') {
      this.HORIZONTALview = true;
      this.VERTICALview = false;
      this.showdaategroup = false;
    } else if (this.patchgrid == 'Horizontal' && this.patchdatecon == 'Datewise') {
      if (this.patchsubcat.length === 1 || this.patchcat.length === 1) {
        this.showdaategroup = false;
        this.HORIZONTALview = true;
        this.VERTICALview = false;
      } else {
        this.HORIZONTALview = true;
        this.VERTICALview = false;
        this.showdaategroup = true;
      }
    } else if (this.patchgrid == 'Vertical' && this.patchdatecon == 'Datewise') {
      if (this.patchsubcat.length === 1 || this.patchcat.length === 1) {
        this.showdaategroup = false;
        this.HORIZONTALview = false;
        this.VERTICALview = true;
      } else {
        this.HORIZONTALview = false;
        this.VERTICALview = true;
        this.showdaategroup = true;
      }
    } else if (this.patchgrid == 'Vertical' && this.patchdatecon == 'Consolidate') {
      this.HORIZONTALview = false;
      this.VERTICALview = true;
      this.showdaategroup = false;
    }
  }

  StockviewTWOhor(kk: any, head: any, item: any, opt: any, list: any) {
    this.brright = kk.RecordField;
    this.head = kk.TransName;
    this.gvar = opt;
    this.listname = item;
    this.category = head;
    this.datelist = list.Date;
    this.icodes = list.var2;
    if (this.patchbranch == 'ALL') {
      this.globals.SelectDashboard = 'PAGETHREE';
      this.showpageTWO = false;
      this.showpageONE = false;
      this.showpageTHREE = true;
      this.showpageFOUR = false;
      this.showdaategroup = false;
      this.showicondate = false;
      this.showsearchicon = true;
      this.post = {};
      this.post.usr = this.globals.gUsrid,
      this.post.reqMainreq = 'Stock_AllBranch',
      this.post.tname = this.tname1,
      this.post.ViewType = this.patchgrid,
      this.post.var1 = kk.RecordField,
      this.post.repSelID = this.patchcatitem,
      this.post.transType = this.patchdatecon,
      this.post.brcode = this.BRcode;
      if (this.patchcatitem == 'Itemwise') {
        this.post.icode = list.var2;
      } else {
        this.post.icode = this.Icode;
      }
      if (this.patchcatitem == 'Itemwise') {
        if (this.patchsubcat.length == 1) {
          this.post.subcat = `${this.stockview.subcategorylist},`;
        } else {
          this.post.subcat = `${this.stockview.subcategorylist},`;
        }
      }
      if (this.patchcatitem == 'Categorywise' && this.patchgrid == 'Horizontal') {
        this.post.subcat = head;
        if (this.patchdatecon === 'Datewise' && this.patchsubcat.length != 1 || this.patchcat.length != 1) {
          this.post.fdate = list.Date;
          this.post.tdate = list.Date;
        }
      } else if (this.patchcatitem != 'Categorywise' && this.patchgrid != 'Horizontal') {
        if (this.patchsubcat.length == 1) {
          this.post.subcat = `${this.stockview.subcategorylist},`;
        } else {
          this.post.subcat = `${this.stockview.subcategorylist},`;
        }
      }
      if (this.patchdatecon === 'Datewise' && this.patchsubcat.length == 1 || this.patchcat.length == 1) {
        this.post.fdate = list.Date;
        this.post.tdate = list.Date;
      } else if (this.patchdatecon === 'Datewise' && this.patchsubcat.length != 1 && this.patchcat.length != 1) {
        this.post.fdate = this.currentpage;
        this.post.tdate = this.currentpage;
      } else if (this.patchdatecon === 'Consolidate') {
        this.post.fdate = this.patchfromdate1;
        this.post.tdate = this.patchfromdate1;
      }
      this.isload = true;
      this.subs.add(this.itemservice.getItemMovementFinalView(this.post).subscribe({
        next: (data) => {
          this.isload = false;

          if (data.length != 0 && data != '') {
            if (data[0].StatusResponse == 'Success') {
              this.branchlist = data;
              this.Sub_Grid_Captione = data[0].Sub_Grid_Caption;
              this.totalbr = (data.reduce((acc: any, cur: any) => acc + cur.BrTransTot, 0));
            } else {
              Swal.fire({ text: data[0].StatusResponse });
            }
          } else {
            this.Sub_Grid_Captione = 'BRANCH';
            this.totalbr = 0;
          }
        },
        error: (e) => {
          Swal.fire({ text: e.message }); this.isload = false;
          this.branchlist = [];
        },
      }));
    } else if (this.brright === 'opening' || this.brright === 'distemp' || this.brright === 'physical' && kk.OptSel != 'CatWishOnly') {
      this.snackbar.open('No Record', 'STOCK', {
        duration: 3000,
      });
    } else {
      this.StockviewTHREE(this.br, this.brname);
    }
  }
  StockviewTWO(kk: any, head: any, name: any, list: any, OPT: any) {
    this.head = name;
    this.brright = head;
    this.gvar = OPT;
    this.listname = list;

    if (this.patchbranch == 'ALL') {
      this.globals.SelectDashboard = 'PAGETHREE';
      this.showpageTWO = false;
      this.showpageONE = false;
      this.showpageTHREE = true;
      this.showpageFOUR = false;
      this.showdaategroup = false;
      this.showicondate = false;
      this.showsearchicon = true;
      this.post = {};
      this.post.usr = this.globals.gUsrid,
      this.post.reqMainreq = 'Stock_AllBranch',
      this.post.tname = this.tname1,
      this.post.ViewType = this.patchgrid,
      this.post.var1 = head,
      this.post.repSelID = this.patchcatitem,
      this.post.transType = this.patchdatecon,
      this.post.brcode = this.BRcode;
      if (this.patch == 'Subcat') {
        if (this.patchsubcat.length == 1) {
          this.post.subcat = this.stockview.subcategorylist;
        } else {
          this.post.subcat = `${this.stockview.subcategorylist},`;
        }
      } else if (this.stockview.categorylist == 'ALL') {
        this.post.subcat = this.stockview.categorylist;
      } else {
        this.post.subcat = `${this.stockview.categorylist},`;
      }
      if (this.patchdatecon === 'Datewise' && this.patchsubcat.length == 1 || this.patchcat.length == 1) {
        this.post.fdate = kk.Date;
        this.post.tdate = kk.Date;
      } else if (this.patchdatecon === 'Datewise' && this.patchsubcat.length != 1 && this.patchcat.length != 1) {
        this.post.fdate = this.currentpage;
        this.post.tdate = this.currentpage;
      } else if (this.patchdatecon === 'Consolidate') {
        this.post.fdate = this.patchfromdate1;
        this.post.tdate = this.patchfromdate1;
      }
      if (this.patchcatitem == 'Itemwise') {
        this.post.icode = this.Icode;
      } else {
        this.post.icode = '0';
      }
      this.isload = true;
      this.subs.add(this.itemservice.getItemMovementFinalView(this.post).subscribe({
        next: (data) => {
          this.isload = false;

          if (data.length != 0 && data != '') {
            if (data[0].StatusResponse == 'Success') {
              this.branchlist = data;
              this.Sub_Grid_Captione = data[0].Sub_Grid_Caption;
              this.totalbr = (data.reduce((acc: any, cur: any) => acc + cur.BrTransTot, 0));
            } else {
              Swal.fire({ text: data[0].StatusResponse });
            }
          } else {
            this.Sub_Grid_Captione = 'BRANCH';
            this.totalbr = 0;
          }
        },
        error: (e) => {
          this.branchlist = [];
          Swal.fire({ text: e.message }); this.isload = false;
        },
      }));
    } else if (this.brright === 'opening' || this.brright === 'distemp' || this.brright === 'physical' && OPT != 'CatWishOnly') {
      this.snackbar.open('No Record', 'STOCK', {
        duration: 3000,
      });
    } else {
      this.StockviewTHREE(this.br, this.brname);
    }
  }
  filterdate(id: any) {
    this.id = this.datePipe.transform(id, 'dd-MMM-yy');

    this.storedata = [];
    for (let index = 0; index < this.tablebodydata1.length; index++) {
      const element = this.tablebodydata1[index];
      if (this.id == element.Date) {
        this.storedata.push(element);
        this.currentpage = this.id;
      }
    }
  }
  StockviewTHREE(br: any, brname:any) {
    // if(this.patchcatitem == 'Itemwise'){
    //   this.snackbar.open('No Record','Stock',{
    //     duration: 3000
    //   })
    //   return
    // }else{

    this.br = br;
    this.brname = brname;
    this.globals.SelectDashboard = 'PAGEFOUR';
    this.showpageTWO = false;
    this.showpageONE = false;
    this.showpageTHREE = false;
    this.showpageFOUR = true;
    this.showdaategroup = false;
    this.showicondate = false;
    this.showsearchicon = true;
    this.post = {};
    this.post.reqMainreq = 'Stock_AllBranch';
    this.post.usr = this.globals.gUsrid;
    if (this.BRcode == '0') {
      this.post.brcode = this.br;
    } else {
      this.post.brcode = this.BRcode;
    }
    this.post.var1 = this.brright;
    this.post.repSelID = this.patchcatitem,
    this.post.transType = this.patchdatecon;
    this.post.tname = `ZHITM${this.globals.gSessionId}`;
    this.post.ClientOrServ = this.globals.gclientServer,
    this.post.CustomCat = this.opt;
    this.post.ViewType = this.patchgrid;
    if (this.patchgrid == 'Vertical') {
      if (this.patchcatitem == 'Itemwise') {
        this.post.icode = this.Icode;
      } else {
        this.post.icode = '0';
      }
      if (this.patchdatecon == 'Datewise' && this.patchsubcat.length != 1 && this.patchcat.length != 1) {
        this.post.fdate = this.currentpage,
        this.post.tdate = this.currentpage;
        if (this.patchrate === 'Std') {
          this.post.datesel = this.patchtodate1; // curratechecked
        } else if (this.currentpage == undefined) {
          this.post.datesel = this.datelist; // actrate
        } else {
          this.post.datesel = this.currentpage; // actrate
        }
      } else {
        this.post.fdate = this.currentpage,
        this.post.tdate = this.currentpage;

        if (this.patchrate === 'Std') {
          this.post.datesel = this.patchtodate1; // curratechecked
        } else {
          this.post.datesel = this.datelist; // actrate
        }
      }

      if (this.opt == 'optSubcat') {
        if (this.patchsubcat.length == 1) {
          this.post.subcat = this.stockview.subcategorylist;
          this.post.cat = 'ALL';
        } else {
          this.post.subcat = `${this.stockview.subcategorylist},`;
          this.post.cat = 'ALL';
        }
      } else if (this.stockview.categorylist == 'ALL') {
        this.post.cat = this.stockview.categorylist;
        this.post.subcat = 'ALL';
      } else {
        this.post.cat = `${this.stockview.categorylist},`;
        this.post.subcat = 'ALL';
      }
    } else if (this.patchgrid == 'Horizontal') {
      if (this.patchcatitem == 'Itemwise') {
        if (this.Icode == '0') {
          this.post.icode = this.icodes;
        } else {
          this.post.icode = this.Icode;
        }
        if (this.opt == 'optSubcat') {
          if (this.patchsubcat.length == 1) {
            this.post.subcat = this.stockview.subcategorylist;
            this.post.cat = 'ALL';
          } else {
            this.post.subcat = `${this.stockview.subcategorylist},`;
            this.post.cat = 'ALL';
          }
        }
      } else if (this.patchcatitem == 'Categorywise') {
        if (this.opt == 'optSubcat') {
          this.post.subcat = this.category,
          this.post.cat = 'ALL';
        } else {
          this.post.cat = this.category;
          this.post.subcat = 'ALL';
        }
      }
    }
    if (this.gvar === 'physical adjustment manual option') {
      this.post.CurOrPLRate = this.listname;
    } else {
      this.post.CurOrPLRate = '0';
    }
    if (this.patchrate === 'Std') {
      this.post.TransWiseBr = 'CurRateChecked';
      this.post.var2 = 'ValuewiseChecked';
    } else if (this.patchrate === 'Weighted Avg Rate') {
      this.post.TransWiseBr = 'ActRateChecked';
      this.post.var2 = 'ValuewiseChecked';
    } else if (this.patchqty === 'Qtywise' && this.patchdatecon === 'Datewise') {
      this.post.var2 = 'QtywiseChecked';
      if (this.patchsubcat.length == 1 || this.patchcat.length == 1) {
        this.post.datesel = this.patchtodate1;
      } else {
        this.post.datesel = this.currentpage;
      }
    } else if (this.patchqty === 'Valuewise') {
      this.post.var2 = 'ValuewiseChecked';
    } else if (this.patchqty === 'Qtywise' && this.patchdatecon === 'Consolidate') {
      this.post.var2 = 'QtywiseChecked';
      this.post.datesel = this.patchtodate1;
    } else if (this.patchqty === 'Valuewise') {
      this.post.var2 = 'ValuewiseChecked';
    }
    if (this.patchdatecon == 'Datewise' && this.patchcatitem == 'Categorywise' && this.patchgrid == 'Horizontal'
    && (this.patchsubcat.length == 1 || this.patchcat.length == 1)) {
      this.post.fdate = this.datelist,
      this.post.tdate = this.datelist;

      if (this.patchrate === 'Std') {
        this.post.datesel = this.patchtodate1; // curratechecked
      } else {
        this.post.datesel = this.datelist; // actrate
      }
      if (this.opt == 'optSubcat') {
        this.post.subcat = this.category,
        this.post.cat = 'ALL';
      } else {
        this.post.cat = this.category;
        this.post.subcat = 'ALL';
      }
    } else if (this.patchdatecon == 'Datewise' && this.patchcatitem == 'Itemwise' && this.patchgrid == 'Horizontal' && this.Icode != '0'
    && (this.patchsubcat.length == 1 || this.patchcat.length == 1)) {
      this.post.fdate = this.datelist,
      this.post.tdate = this.datelist;

      if (this.patchrate === 'Std') {
        this.post.datesel = this.patchtodate1; // curratechecked
      } else {
        this.post.datesel = this.datelist; // actrate
      }
    } else if (this.patchdatecon == 'Datewise' && this.patchcatitem == 'Itemwise' && this.patchgrid == 'Horizontal' && this.Icode == '0'
  && (this.patchsubcat.length == 1 || this.patchcat.length == 1)) {
      this.post.fdate = this.datelist,
      this.post.tdate = this.datelist;
      if (this.patchrate === 'Std') {
        this.post.datesel = this.patchtodate1; // curratechecked
      } else {
        this.post.datesel = this.datelist; // actrate
      }
    }
    if (this.patchdatecon == 'Consolidate') {
      this.post.fdate = this.patchfromdate1,
      this.post.tdate = this.patchtodate1;
      this.post.datesel = this.patchtodate1; // curratechecked
    } else if (this.patchdatecon == 'Datewise' && this.patchsubcat.length != 1 && this.patchcat.length != 1) {
      this.post.fdate = this.currentpage,
      this.post.tdate = this.currentpage;
      if (this.patchrate === 'Std') {
        this.post.datesel = this.patchtodate1; // curratechecked
      } else if (this.currentpage == undefined) {
        this.post.datesel = this.datelist; // actrate
      } else {
        this.post.datesel = this.currentpage; // actrate
      }
    } else if (this.patchrate === 'Std') {
      this.post.datesel = this.patchtodate1; // curratechecked
    } else if (this.currentpage == undefined) {
      this.post.datesel = this.datelist; // actrate
    } else {
      this.post.datesel = this.currentpage; // actrate
    }
    this.isload = true;
    this.subs.add(this.itemservice.getItemMovementFinalView(this.post).subscribe({
      next: (data) => {
        if (data[0].StatusResponse == 'Success') {
          this.finalview = data;
          this.isload = false;
          this.total = (data.reduce((acc: any, cur: any) => acc + cur.ivalue, 0));
          this.qtytot = (data.reduce((acc: any, cur: any) => acc + cur.qty, 0));
        } else {
          Swal.fire({ text: data[0].StatusResponse });
        }
      },
      error: (e) => {
        Swal.fire({ text: e.message }); this.isload = false;
        this.finalview = [];
      },
    }));
  }
  // }
  exportexcelone(): void {
    const file = 'Stock Report' + '.xlsx';
    const element = document.getElementById('tableexcelone');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheets');
    XLSX.writeFile(wb, `/${
      this.patchcompany}//branch//${
      this.patchbranch}//fdate//${
      this.patchfromdate1}//tdate//${
      this.patchtodate1}////${
      this.patchcatitem}////${
      this.patchdatecon}/` + 'Stock Report' + '.xlsx');
  }
  exportexceltwo(): void {
    const file = 'Stock Report' + '.xlsx';
    const element = document.getElementById('tableexceltwo');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheets');
    XLSX.writeFile(wb, file);
  }
  exportexcelthree(): void {
    const file = 'Stock Report' + '.xlsx';
    const element = document.getElementById('tableexcelthree');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheets');
    XLSX.writeFile(wb, file);
  }
  backNavigation() {
    if (this.globals.SelectDashboard == this.selid) {
      if (this.globals.gmainMenuSelected === 'ReqFromGrpData') {
        this.globals.SelectDashboard = 'GROUPDATA';
        this.router.navigate(['/dashboard']);
      } else {
        this.router.navigate(['/dashboard']);
      }
    } else if (this.globals.SelectDashboard === 'PAGETHREE') {
      if (this.patchsubcat.length === 1 || this.patchcat.length === 1) {
        this.showpageTWO = true;
        this.showpageONE = false;
        this.showpageTHREE = false;
        this.showpageFOUR = false;
        this.showdaategroup = false;
        this.globals.SelectDashboard = 'PAGETWO';
        this.getcondition();
      } else {
        this.showpageTWO = true;
        this.showpageONE = false;
        this.showpageTHREE = false;
        this.showpageFOUR = false;
        this.showdaategroup = true;
        this.globals.SelectDashboard = 'PAGETWO';
        this.getcondition();
      }
    } else if (this.patchbranch == 'ALL' && this.globals.SelectDashboard === 'PAGEFOUR') {
      if (this.patchsubcat.length === 1 || this.patchcat.length === 1) {
        this.showpageTWO = false;
        this.showpageONE = false;
        this.showpageTHREE = true;
        this.showpageFOUR = false;
        this.showsearchicon = false;
        this.globals.SelectDashboard = 'PAGETHREE';
        this.showdaategroup = false;
        this.showicondate = false;
      } else {
        this.showpageTWO = false;
        this.showpageONE = false;
        this.showpageTHREE = true;
        this.showpageFOUR = false;
        this.showsearchicon = false;
        this.globals.SelectDashboard = 'PAGETHREE';
        this.showdaategroup = true;
        this.showicondate = false;
      }
    } else if (this.patchbranch != 'ALL' && this.globals.SelectDashboard === 'PAGEFOUR') {
      if (this.patchsubcat.length === 1 || this.patchcat.length === 1) {
        this.showpageTWO = true;
        this.showpageONE = false;
        this.showpageTHREE = false;
        this.showpageFOUR = false;
        this.showdaategroup = false;
        this.showicondate = false;
        this.globals.SelectDashboard = 'PAGETWO';
        this.getcondition();
      } else {
        this.showpageTWO = true;
        this.showpageONE = false;
        this.showpageTHREE = false;
        this.showpageFOUR = false;
        this.showdaategroup = true;
        this.globals.SelectDashboard = 'PAGETWO';
        this.getcondition();
      }
    } else if (this.globals.SelectDashboard === 'PAGETWO') {
      this.showpageTWO = false;
      this.showpageONE = true;
      this.showpageTHREE = false;
      this.showpageFOUR = false;
      this.globals.SelectDashboard = this.selid;
      this.showdaategroup = true;
      this.showicondate = false;
      this.showsearchicon = false;
    }
  }
  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
