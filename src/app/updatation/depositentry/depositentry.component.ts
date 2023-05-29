/* eslint-disable no-useless-concat */
/* eslint-disable eqeqeq */
/* eslint-disable no-plusplus */
/* eslint-disable no-shadow */
/* eslint-disable no-sequences */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved */
import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder, FormControl, FormGroup,
} from '@angular/forms';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { debounceTime } from 'rxjs/operators';
import { Globals } from 'src/app/globals';
import { SubSink } from 'subsink';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
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
  selector: 'app-depositentry',
  templateUrl: './depositentry.component.html',
  styleUrls: ['./depositentry.component.css'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class DepositentryComponent implements OnInit {
  startDate= '21-Mar-2021';

  patchcompany = 'ADYAR ANANDA BHAVAN';

 patchccenter = 'ALL';

 patchbranch = 'ALL';

 patchregion = 'ALL';

  patchstate = 'ALL';

 Fdate = new Date(new Date().getTime() - 24 * 60 * 60 * 1000);

 Tdate = new Date(new Date().getTime() - 24 * 60 * 60 * 1000);

  Branchloccntrl: FormControl;

 private subs = new SubSink();

 post: any;

 selid: any;

 showPageONE = true;

 showPageTWO = false;

 isload = false;

 Reportform: FormGroup;

  column: any;

 direction: any;

 ID = 'Consolidated';

 myModel: boolean = true;

 myModelOUT = false;

 showPageTHREE = false

 constructor(
private fb: FormBuilder,
public itemservice: ItemserviceService,
public snackbar: MatSnackBar,
    public globals: Globals,
private router: Router,
private datePipe: DatePipe,
 ) {
   this.selid = this.globals.SelectDashboard;
   this.itemservice.get_URL = `${this.globals.gApiserver}/api/datareqsarnTwo`;
   this.itemservice.getstockapprove = `${this.globals.gApiserver}/api/datareqrshSeven`;
   this.Reportform = this.fb.group({
     ccnter: [''], terminal: [''], company: [''], region: [''], state: [''], saletype: [''], fromdate: [''], todate: [''], mode: [''],
   });
   this.Branchloccntrl = new FormControl();
 }

 ngOnInit(): void {
   this.globals.gmainMenuSelected = 'ReqFromGrpData';
   this.companylist(),
   this.statelist(), this.regionlist(), this.costcenter(),
   this.modelChange();
 }

  regionList: any = []

  regionlist() {
    this.post = {};
    this.post.reqMainreq = 'ListOfRegion', this.post.Usr = this.globals.gUsrid, this.post.brcode = '0',
    this.post.var1 = '0', this.post.var2 = '0', this.post.var3 = '0', this.post.var4 = '0', this.post.var5 = '0', this.post.var6 = '0',
    this.post.var7 = '0', this.post.var8 = '0', this.post.var9 = '0', this.post.var10 = '0',
    this.post.var11 = '0', this.post.var12 = '0', this.post.var13 = '0', this.post.var14 = '0', this.post.var15 = '0', this.post.var16 = '0',
    this.post.var17 = '0', this.post.var18 = '0', this.post.var19 = '0', this.post.var20 = '0',
    this.subs.add(this.itemservice.getItemMovement(this.post).subscribe((data) => {
      this.regionList = data;
    }));
  }

  stateslist:any = []

  statelist() {
    this.post = {};
    this.post.reqMainreq = 'ListOfState',
    this.post.Usr = this.globals.gUsrid, this.post.brcode = '0', this.post.var1 = '0', this.post.var2 = '0', this.post.var3 = '0', this.post.var4 = '0', this.post.var5 = '0', this.post.var6 = '0', this.post.var7 = '0', this.post.var8 = '0', this.post.var9 = '0', this.post.var10 = '0', this.post.var11 = '0', this.post.var12 = '0', this.post.var13 = '0', this.post.var14 = '0', this.post.var15 = '0',
    this.post.var16 = '0', this.post.var17 = '0', this.post.var18 = '0', this.post.var19 = '0', this.post.var20 = '0',
    this.subs.add(this.itemservice.getItemMovement(this.post).subscribe((data) => {
      this.stateslist = data;
    }));
  }

  Cost:any = []

  costcenter() {
    this.post = {};
    this.post.reqMainreq = 'CostCenter', this.post.Usr = this.globals.gUsrid, this.post.brcode = '0', this.post.var1 = '0', this.post.var2 = '0', this.post.var3 = '0', this.post.var4 = '0', this.post.var5 = '0', this.post.var6 = '0',
    this.post.var7 = '0', this.post.var8 = '0', this.post.var9 = '0', this.post.var10 = '0', this.post.var11 = '0',
    this.post.var12 = '0', this.post.var13 = '0', this.post.var14 = '0', this.post.var15 = '0',
    this.post.var16 = '0', this.post.var17 = '0', this.post.var18 = '0', this.post.var19 = '0', this.post.var20 = '0',
    this.subs.add(this.itemservice.getItemMovement(this.post).subscribe((data) => {
      this.Cost = data;
    }));
  }

  company:any = []

  companylist() {
    this.post = {};
    this.post.reqMainreq = 'CompanyList', this.post.Usr = this.globals.gUsrid, this.post.brcode = '0', this.post.var1 = 'OUT', this.post.var2 = '0',
    this.post.var3 = '0', this.post.var4 = '0', this.post.var5 = '0', this.post.var6 = '0', this.post.var7 = '0', this.post.var8 = '0', this.post.var9 = '0',
    this.post.var10 = '0', this.post.var11 = '0', this.post.var12 = '0', this.post.var13 = '0', this.post.var14 = '0',
    this.post.var15 = '0', this.post.var16 = '0', this.post.var17 = '0', this.post.var18 = '0', this.post.var19 = '0', this.post.var20 = '0',
    this.subs.add(this.itemservice.getItemMovement(this.post).subscribe((data) => {
      this.company = data;
    }));
  }

  Brname = [];

 brcode = 0;

 Branchdata:any = []

 modelChange() {
   this.subs.add(this.Branchloccntrl.valueChanges.pipe(debounceTime(600)).subscribe((data) => {
     this.post = {};
     this.post.var3 = this.patchcompany;
     this.post.var4 = this.patchstate;
     this.post.var5 = this.patchregion;
     this.post.var6 = this.patchccenter;
     this.post.reqMainreq = 'BranchSelection', this.post.Usr = this.globals.gUsrid, this.post.brcode = '0',
     this.post.var1 = data, this.post.var2 = '0', this.post.var7 = '0', this.post.var8 = '0', this.post.var9 = '0', this.post.var10 = '0',
     this.post.var11 = '0', this.post.var12 = '0', this.post.var13 = '0', this.post.var14 = '0', this.post.var15 = '0', this.post.var16 = '0',
     this.post.var17 = '0', this.post.var18 = this.globals.gclientServer;
     this.post.var19 = '0', this.post.var20 = '0',
     this.Brname = data;
     this.subs.add(this.itemservice.getItemMovement(this.post).subscribe((data) => {
       this.Branchdata = data;
       for (let index = 0; index < data.length; index++) {
         const element = data[index];
         if (this.Brname == element.brname) {
           this.brcode = element.brcode;
         }
       }
     }));
   }));
 }

 changeloc(brcode: any) {
   this.brcode = brcode;
 }

  Fixedloc1 :any= []

  companychange(id: any) {
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
    this.post.var14 = '0', this.post.var15 = '0', this.post.var16 = '0', this.post.var17 = '0', this.post.var18 = '0', this.post.var19 = '0', this.post.var20 = '0',
    this.subs.add(this.itemservice.getItemMovement(this.post).subscribe((data) => {
      this.regionList = data;
      this.patchregion = 'ALL';
    }));
    this.post = {};
    this.post.var4 = this.patchstate;
    this.post.var5 = this.patchregion;
    this.post.var6 = this.patchccenter;
    this.post.reqMainreq = 'BranchSelection', this.post.Usr = this.globals.gUsrid, this.post.brcode = '0', this.post.var1 = '',
    this.post.var2 = '0', this.post.var3 = id, this.post.var7 = '0', this.post.var8 = '0', this.post.var9 = '0', this.post.var10 = '0', this.post.var11 = '0',
    this.post.var12 = '0', this.post.var13 = '0', this.post.var14 = '0', this.post.var15 = '0', this.post.var16 = '0', this.post.var17 = '0', this.post.var18 = '0', this.post.var19 = '0', this.post.var20 = '0',
    this.subs.add(this.itemservice.getItemMovement(this.post).subscribe((data) => {
      this.Branchdata = data;
      this.Fixedloc1 = [];
      for (let index = 0; index < this.Branchdata.length; index++) {
        const element = this.Branchdata[index];
        this.Fixedloc1.push(element);
        this.patchbranch = '';
        this.patchregion = '';
        this.patchstate = '';
      }
    }));
  }

  statechange(state: any) {
    this.post = {};
    this.post.var1 = this.patchcompany;
    this.post.reqMainreq = 'Sel_Change_State_Region', this.post.Usr = this.globals.gUsrid,
    this.post.brcode = '0', this.post.var2 = state, this.post.var3 = '0', this.post.var4 = '0', this.post.var5 = '0',
    this.post.var6 = '0', this.post.var7 = '0', this.post.var8 = '0', this.post.var9 = '0',
    this.post.var10 = '0', this.post.var11 = '0', this.post.var12 = '0', this.post.var13 = '0', this.post.var14 = '0',
    this.post.var15 = '0', this.post.var16 = '0', this.post.var17 = '0', this.post.var18 = '0', this.post.var19 = '0', this.post.var20 = '0',
    this.subs.add(this.itemservice.getItemMovement(this.post).subscribe((data) => {
      this.regionList = data;
    }));
    this.post = {};
    this.post.var3 = this.patchcompany;
    this.post.var5 = this.patchregion;
    this.post.var6 = this.patchccenter;
    this.post.reqMainreq = 'BranchSelection', this.post.Usr = this.globals.gUsrid, this.post.brcode = '0', this.post.var1 = '', this.post.var2 = '0',
    this.post.var4 = this.patchstate, this.post.var7 = '0', this.post.var8 = '0', this.post.var9 = '0', this.post.var10 = '0', this.post.var11 = '0', this.post.var12 = '0', this.post.var13 = '0', this.post.var14 = '0',
    this.post.var15 = '0', this.post.var16 = '0', this.post.var17 = '0', this.post.var18 = '0', this.post.var19 = '0', this.post.var20 = '0',
    this.subs.add(this.itemservice.getItemMovement(this.post).subscribe((data) => {
      this.Branchdata = data;
      this.Fixedloc1 = [];
      for (let index = 0; index < this.Branchdata.length; index++) {
        const element = this.Branchdata[index];
        this.Fixedloc1.push(element);
        this.patchbranch = '';
        this.patchregion = 'ALL';
      }
    }));
  }

  Regionchange(state: any) {
    this.patchregion = state;
    this.post = {};
    this.post.var3 = this.patchcompany;
    this.post.var4 = this.patchstate;
    this.post.var6 = this.patchccenter;
    this.post.reqMainreq = 'BranchSelection',
    this.post.Usr = this.globals.gUsrid, this.post.brcode = '0', this.post.var1 = 'ALL', this.post.var2 = '0',
    this.post.var5 = state, this.post.var7 = '0', this.post.var8 = '0', this.post.var9 = '0',
    this.post.var10 = '0', this.post.var11 = '0', this.post.var12 = '0', this.post.var13 = '0', this.post.var14 = '0', this.post.var15 = '0', this.post.var16 = '0', this.post.var17 = '0', this.post.var18 = '0', this.post.var19 = '0', this.post.var20 = '0',
    this.subs.add(this.itemservice.getItemMovement(this.post).subscribe((data) => {
      this.Branchdata = data;
      this.Fixedloc1 = [];
      for (let index = 0; index < this.Branchdata.length; index++) {
        const element = this.Branchdata[index];
        this.Fixedloc1.push(element);
        this.patchbranch = '';
      }
    }));
  }

  Costcntrchange(state: any) {
    this.post = {};
    this.post.var3 = this.patchcompany;
    this.post.var4 = this.patchstate;
    this.post.var5 = this.patchregion;
    this.post.reqMainreq = 'BranchSelection',
    this.post.Usr = this.globals.gUsrid, this.post.brcode = '0', this.post.var1 = '',
    this.post.var2 = '0', this.post.var6 = state, this.post.var7 = '0', this.post.var8 = '0', this.post.var9 = '0', this.post.var10 = '0',
    this.post.var11 = '0', this.post.var12 = '0', this.post.var13 = '0', this.post.var14 = '0',
    this.post.var15 = '0', this.post.var16 = '0', this.post.var17 = '0', this.post.var18 = '0', this.post.var19 = '0', this.post.var20 = '0',
    this.subs.add(this.itemservice.getItemMovement(this.post).subscribe((data) => {
      this.Branchdata = data;
      const Fixedloc = [];
      for (let index = 0; index < this.Branchdata.length; index++) {
        const element = this.Branchdata[index];
        Fixedloc.push(element);
        this.patchbranch = '';
      }
    }));
  }

  myClick(id: any) {
    this.ID = id;
  }

  tabledata:any=[];

depamt=0

viewreport() {
  if (this.Fdate > this.Tdate || this.Tdate < this.Fdate) {
    this.snackbar.open('Fromdate Should not be greater than Todate', 'Date', {
      duration: 3000,
      verticalPosition: 'top',
      panelClass: ['red-snackbar'],
      horizontalPosition: 'right',
    });
  } else {
    this.depamt = 0;
    this.post = {};
    this.post.reqMainreq = 'BranchDepositEntryView';
    this.post.var1 = this.patchcompany;
    this.post.var2 = this.patchstate;
    this.post.var3 = this.patchregion;
    this.post.var4 = this.patchccenter;
    this.post.var5 = this.brcode;
    this.post.var6 = this.datePipe.transform(this.Fdate, 'dd-MMM-yyyy');
    this.post.var7 = this.datePipe.transform(this.Tdate, 'dd-MMM-yyyy');
    this.post.var8 = this.ID;
    this.post.var9 = this.globals.gclientServer;
    this.post.Usr = this.globals.gUsrid;
    this.isload = true;
    this.subs.add(this.itemservice.getstkaproval(this.post).subscribe((data) => {
      this.tabledata = data;
      this.isload = false;
      if (data.length > 0) {
        this.depamt = Math.round(data.reduce((acc: any, cur: any) => acc + cur.Depamt, 0));
        this.showPageONE = false;
        this.showPageTWO = true;
        this.showPageTHREE = false;
        this.globals.SelectDashboard = 'TWO';
      } else {
        this.snackbar.open('No Record Found', 'Data', {
          duration: 4000,
          verticalPosition: 'top',
          panelClass: ['red-snackbar'],
          horizontalPosition: 'right',
        });
      }
    }));
  }
}

  detaildata:any=[];

branch='';

depamt1=0

viewdetail(list:any) {
  this.branch = list.brname;
  this.post = {};
  this.post.reqMainreq = 'BranchDepositEntryView';
  this.post.var1 = this.patchcompany;
  this.post.var2 = this.patchstate;
  this.post.var3 = this.patchregion;
  this.post.var4 = this.patchccenter;
  this.post.var5 = list.brcode;
  this.post.var6 = this.datePipe.transform(this.Fdate, 'dd-MMM-yyyy');
  this.post.var7 = this.datePipe.transform(this.Tdate, 'dd-MMM-yyyy');
  this.post.var8 = 'Datewise';
  this.post.var9 = this.globals.gclientServer;
  this.post.Usr = this.globals.gUsrid;
  this.isload = true;
  this.subs.add(this.itemservice.getstkaproval(this.post).subscribe((data) => {
    this.detaildata = data;
    this.isload = false;
    this.depamt1 = 0;
    if (data.length > 0) {
      this.depamt1 = Math.round(data.reduce((acc: any, cur: any) => acc + cur.Depamt, 0));
      this.showPageONE = false;
      this.showPageTWO = false;
      this.showPageTHREE = true;
      this.globals.SelectDashboard = 'THREE';
    } else {
      this.snackbar.open('No Record Found', 'Data', {
        duration: 4000,
        verticalPosition: 'top',
        panelClass: ['red-snackbar'],
        horizontalPosition: 'right',
      });
    }
  }));
}

  isDesc = false;

  sort(property: any) {
    this.isDesc = !this.isDesc;
    this.column = property;
    this.direction = this.isDesc ? 1 : -1;
  }

  exportexcel(): void {
    const file = `${'Deposit' + '/' + 'Branch'}${this.patchbranch}/` + 'Dfdate' + `/${this.datePipe.transform(this.Fdate, 'dd-MMM-yyyy')}/`
    + 'Dtdate' + `/${this.datePipe.transform(this.Tdate, 'dd-MMM-yyyy')}/` + '.xlsx';
    const element = document.getElementById('tableexcel');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet');
    XLSX.writeFile(wb, file);
  }

  exportexcel1(): void {
    const file = `${'Deposit' + '/' + 'Branch'}${this.patchbranch}/` + 'Dfdate' + `/${this.datePipe.transform(this.Fdate, 'dd-MMM-yyyy')}/`
      + 'Dtdate' + `/${this.datePipe.transform(this.Tdate, 'dd-MMM-yyyy')}/` + '.xlsx';
    const element = document.getElementById('tableexcelone');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet');
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
    } else if (this.globals.SelectDashboard == 'THREE') {
      this.showPageONE = false;
      this.showPageTWO = true;
      this.showPageTHREE = false;
      this.globals.SelectDashboard = 'TWO';
    } else if (this.globals.SelectDashboard == 'TWO') {
      this.ID = 'Consolidated';
      this.myModel = true; this.myModelOUT = false;
      this.showPageONE = true;
      this.showPageTWO = false;
      this.showPageTHREE = false;
      this.globals.SelectDashboard = this.selid;
    }
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
