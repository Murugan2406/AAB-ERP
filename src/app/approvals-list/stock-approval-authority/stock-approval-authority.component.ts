/* eslint-disable class-methods-use-this */
/* eslint-disable no-empty */
/* eslint-disable max-len */
/* eslint-disable eqeqeq */
/* eslint-disable no-shadow */
/* eslint-disable no-sequences */
/* eslint-disable no-unused-expressions */
/* eslint-disable import/order */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { debounceTime } from 'rxjs/operators';
import { Globals } from 'src/app/globals';
import { ItemserviceService } from 'src/app/updatation/services/itemservice.service';

import { SubSink } from 'subsink';
import Swal from 'sweetalert2';
// import { Globals } from '../globals';
// import { ItemserviceService } from '../services/itemservice.service';
declare let $: any;
@Component({
  selector: 'app-stock-approval-authority',
  templateUrl: './stock-approval-authority.component.html',
  styleUrls: ['./stock-approval-authority.component.css'],
})
export class StockApprovalAuthorityComponent implements OnInit {
  private subs = new SubSink();

 Enamecntrl: FormControl;

 post: any;

 regionList = [];

 Cost = [];

 branchlist: any = []

  selid: any;

 patchcostcenter = 'ALL';

 patchregion = 'ALL';

 patchauthname = '';

 Empnamedata = []

  column: any;

 direction: any;

 constructor(
public itemservice: ItemserviceService,
public snackbar: MatSnackBar,
    public router: Router,
public fb: FormBuilder,
private globals: Globals,
private http: HttpClient,
 ) {
   this.selid = this.globals.SelectDashboard;
   this.itemservice.get_URL = `${this.globals.gApiserver}/api/datareqsarnTwo`;
   this.itemservice.getstockapprove = `${this.globals.gApiserver}/api/datareqrshSeven`;
   this.Enamecntrl = new FormControl();
 }

 ngOnInit(): void {
   this.modelename();
   this.regionlist();
   this.costcenter();
   this.getbranchlist();
 }

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

 getbranchlist() {
   this.post = {};
   this.post.reqMainreq = 'Applauthoritybrnameload', this.post.Usr = this.globals.gUsrid;
   this.post.var1 = this.patchregion, this.post.var2 = this.patchcostcenter;
   this.subs.add(this.itemservice.getstkaproval(this.post).subscribe((data) => {
     this.branchlist = data;
   }));
 }

 modelename() {
   this.Empnamedata = [];
   this.subs.add(this.Enamecntrl.valueChanges.pipe(debounceTime(600)).subscribe((data) => {
     this.post = {};
     this.post.reqMainreq = 'ApplauthorityUsersearch', this.post.Usr = this.globals.gUsrid,
     this.post.var1 = data;
     if (data != '') {
       this.subs.add(this.itemservice.getstkaproval(this.post).subscribe((data) => {
         this.Empnamedata = data;
       }));
     }
   }));
 }

  level = '';

 editindex = 0;

 brname = ''

 editname(level: any, i: any) {
   this.level = level;
   this.editindex = i;
   this.brname = this.branchlist[this.editindex].brname;
   this.getviewlist();
 }

 Update() {
   if (this.patchauthname != '') {
     this.post = {};
     this.post.reqMainreq = 'ApplauthoritySave', this.post.Usr = this.globals.gUsrid,
     this.post.var1 = this.branchlist[this.editindex].brname; this.post.var2 = this.branchlist[this.editindex].brcode;
     this.post.var3 = this.patchauthname;
     this.post.var4 = this.level;
     this.subs.add(this.itemservice.getstkaproval(this.post).subscribe((data) => {
       if (data[0].StatusResponse === 'Success') {
         this.getviewlist();
         this.snackbar.open('Level Authority Updated Successfully', 'Stock', {
           duration: 3000,
           verticalPosition: 'top',
           panelClass: ['green-snackbar'],
           horizontalPosition: 'right',
         });
         this.patchauthname = '';
         this.getbranchlist();
         this.Empnamedata = [];
       } else {
         this.snackbar.open(data[0].StatusResponse, 'Stock', {
           duration: 3000,
           verticalPosition: 'top',
           panelClass: ['red-snackbar'],
           horizontalPosition: 'right',
         });
       }
     }));
   } else {
     Swal.fire({
       title: 'Enter Authority Name',
       showCancelButton: false,
       width: '350px',
       confirmButtonText: 'Close',
     });
   }
 }

  viewlist=[]

  getviewlist() {
    this.viewlist = [];
    this.post = {};
    this.post.reqMainreq = 'ApplauthorityView', this.post.Usr = this.globals.gUsrid;
    this.post.var4 = this.level, this.post.var2 = this.branchlist[this.editindex].brcode;
    this.subs.add(this.itemservice.getstkaproval(this.post).subscribe((data) => {
      this.viewlist = data;
    }));
  }

  delete(list:any) {
    Swal.fire({
      title: 'Are you sure?',
      showCancelButton: true,
      width: '350px',
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        this.post = {};
        this.post.reqMainreq = 'ApplauthorityDelete', this.post.Usr = this.globals.gUsrid;
        this.post.var4 = this.level, this.post.var3 = list.FirstLevelAppAuthority, this.post.var2 = this.branchlist[this.editindex].brcode;
        this.subs.add(this.itemservice.getstkaproval(this.post).subscribe((data) => {
          this.snackbar.open(data[0].StatusResponse, 'Stock', {
            duration: 3000,
            verticalPosition: 'top',
            panelClass: ['red-snackbar'],
            horizontalPosition: 'right',
          });
          this.getviewlist();
        }));
      } else if (result.dismiss === Swal.DismissReason.cancel) {

      }
    });
  }

  view() {
    this.getbranchlist();
    this.branchlist = [];
  }

  closelist() {
    $('#getviewlist').modal('hide');
  }

  isDesc = false;

  sort(property: any) {
    this.isDesc = !this.isDesc;
    this.column = property;
    this.direction = this.isDesc ? 1 : -1;
  }

  backNavigation() {
    if (this.globals.SelectDashboard == this.selid) {
      if (this.globals.gmainMenuSelected === 'ReqFromGrpData') {
        this.globals.SelectDashboard = 'GROUPDATA';
        this.router.navigate(['/dashboard']);
      } else {
        this.router.navigate(['/dashboard']);
      }
    }
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
