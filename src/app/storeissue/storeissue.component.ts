/* eslint-disable prefer-destructuring */
/* eslint-disable no-empty */
/* eslint-disable eqeqeq */
/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */
/* eslint-disable no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-param-reassign */
/* eslint-disable max-len */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-empty-function */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-constructor */
/* eslint-disable no-undef */
import { DatePipe, formatDate } from '@angular/common';
import {
  Component, Input, OnDestroy, OnInit, ViewChild,
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Globals } from 'src/app/globals';
import { InventoryService } from 'src/app/updatation/services/inventory.service';

import { SubSink } from 'subsink';
import Swal from 'sweetalert2';
import { debounceTime } from 'rxjs/operators';
import { MatSidenav } from '@angular/material/sidenav';
import { fromEvent } from 'rxjs';
import { MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'app-storeissue',
  templateUrl: './storeissue.component.html',
  styleUrls: ['./storeissue.component.scss'],
})
export class StoreissueComponent implements OnInit, OnDestroy {
  constructor(private service: InventoryService, private globals: Globals, private router: Router) {
    this.service.apiUrl = this.globals.gServerApiUrl;
    this.subs.add(this.batchnumControl.valueChanges.pipe(debounceTime(600)).subscribe((data) => {
      this.loadDatas('BatchFilter', this.globals.gBrcode, '', '', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', data);
    }));
    this.subs.add(this.itemControl.valueChanges.pipe(debounceTime(600)).subscribe((data) => {
      this.loadDatas('ItemFilter', this.globals.gBrcode, this.globals.gTerCode, '', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', data);
    }));
  }

  sidebarMode = 'side';

  pipe: DatePipe = new DatePipe('en-US');

  @ViewChild('drawer') drawer: MatSidenav;

  sideNavOpen = true;

  NormalTable = true

  progressval = '';

 subs = new SubSink();

  batchnumControl = new FormControl('', Validators.required);

 batchList :any = [];

  itemControl = new FormControl('', Validators.required);

 itemList:any = [];

  st_issue_list: any = [];

  batch_issue: any = [];

  icode: any = '';

 batch: any;

  fromdate: any;

 todate: any;

  List: any = [];

  store_issue: any = [];

  sf_production: any = [];

  sf_items_stockbalview: any = [];

  fg_production: any = [];

  sf_issue: any = [];

  production: any = [];

  ngOnInit(): void {
    this.fromdate = this.changeFinalDateFormat(this.globals.gkDate, 'yyyy-MM-dd');
    this.todate = this.changeFinalDateFormat(this.globals.gkDate, 'yyyy-MM-dd');
    this.shortcuts();
    setTimeout(() => {
      document.getElementById('batchno').focus();
    }, 500);
    // this.getIssue();
  }

  changeFinalDateFormat(startDate: any, format: any): any {
    const locale = 'en-US';
    const date = formatDate(startDate, format, locale);
    return date;
  }

  getItemToIcode(event:any) {
    this.icode = this.itemList.find((e: any) => e.iname == event).icode;
    setTimeout(() => {
      document.getElementById('fromDate').focus();
    }, 100);
    // this.getIcodeDetails();
  }

  getIcodeDetails() {
    if (this.icode == '') {
      Swal.fire({ text: 'Enter Item code' });
    } else {
      this.loadDatas('ItemInfo', this.globals.gBrcode, this.globals.gTerCode, true, '0', '0', this.icode, '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0');
    }
  }

  icodeEnterEvet(event:any, option:any) {
    if (event.key === 'Enter' && event.target.value) {
      this.getIcodeDetails();
      this.selectFocus(option);
    }
  }

  getIssue() {
    if (this.batchnumControl.invalid) {
      Swal.fire({ text: 'Please enter batch name' });
      return;
    }
    if (this.icode === '') {
      Swal.fire({ text: 'Please enter Item code' });
      return;
    }
    if (this.itemControl.invalid) {
      Swal.fire({ text: 'Please enter Item name' });
      return;
    }
    this.st_issue_list = [];
    this.batch_issue = [];
    this.List = [];
    this.store_issue = [];
    this.sf_production = [];
    this.sf_items_stockbalview = [];
    this.fg_production = [];
    this.sf_issue = [];
    this.production = [];

    this.loadDatas('StoreIssues', this.globals.gBrcode, this.globals.gTerCode, '0', '0', '0', this.icode, '0', this.batch, '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', this.changeFinalDateFormat(this.fromdate, 'yyyy-MM-dd'), this.changeFinalDateFormat(this.todate, 'yyyy-MM-dd'), '0');
    this.loadDatas('BatchSelStoreIssues', this.globals.gBrcode, this.globals.gTerCode, '0', '0', '0', this.icode, '0', this.batch, '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', this.changeFinalDateFormat(this.fromdate, 'yyyy-MM-dd'), this.changeFinalDateFormat(this.todate, 'yyyy-MM-dd'), '0');
  }

  getSelectedBatch(event:any) {
    this.selectFocus('icode');
  }

  loadDatas(
    reqmain: any,
    brcode: any,
    extra1: any,
    extra2: any,
    extra3: any,
    extra4: any,
    extra5: any,
    extra6: any,
    extra7: any,
    extra8: any,
    extra9: any,
    extra10: any,
    extra11: any,
    extra12: any,
    extra13: any,
    extra14: any,
    extra15: any,
    extra16: any,
    extra17: any,
    extra18: any,
    extra19: any,
    extra20: any,
  ) {
    this.progressval = 'indeterminate';
    this.subs.add(this.service.datareqKarSmyThree({
      reqMainreq: reqmain,
      Usr: this.globals.gUsrid,
      brcode,
      var1: extra1,
      var2: extra2,
      var3: extra3,
      var4: extra4,
      var5: extra5,
      var6: extra6,
      var7: extra7,
      var8: extra8,
      var9: extra9,
      var10: extra10,
      var11: extra11,
      var12: extra12,
      var13: extra13,
      var14: extra14,
      var15: extra15,
      var16: extra16,
      var17: extra17,
      var18: extra18,
      var19: extra19,
      var20: extra20,
    }).subscribe((result: any) => {
      this.progressval = '';
      if (result.length > 0) {
        const data = result;
        if (reqmain == 'BatchFilter') { this.batchList = data; }
        if (reqmain == 'StoreIssues') {
          if (data.lenght > 0 && data[0].StatusRes == 'Success') {
            this.List = data;
          }
        }
        if (reqmain == 'BatchSelStoreIssues') {
          if (data.lenght > 0 && data[0].StatusRes == 'Success') {
            this.getRecords(data);
          }
        }
        if (reqmain == 'ItemFilter') { this.itemList = data; }
        if (reqmain == 'ItemInfo') { this.getItemInfoResponse(data); }
      } else if (reqmain == 'BatchSelStoreIssues') {
        Swal.fire({ text: 'No record found' });
      }
    }, (err: any) => {
      this.progressval = '';
      Swal.fire({ html: err.error });
    }));
  }

  getItemInfoResponse(data: any) {
    if (data.length > 0) {
      if (data[0].StatusRes == 'Success') {
        this.itemControl.setValue(data[0].iname);

        document.getElementById('item')?.focus();
      } else {
        Swal.fire({ text: data[0].StatusRes });
      }
    } else {
      Swal.fire({ text: 'Item not found..' });
    }
  }

  enterKeyEvent(event: any, option:any) {
    if (event.key === 'Enter') {
      this.selectFocus(option);
    }
  }

  selectFocus(option: any) {
    setTimeout(() => {
      document.getElementById(option)?.focus();
    }, 100);
  }

  getRecords(data: any) {
    const groubedByTeam = this.getGroupBY(data, 'trntype');
    if (groubedByTeam.storeissue) {
      this.store_issue = groubedByTeam.storeissue;
    }
    if (groubedByTeam.sfproduction) {
      this.sf_production = groubedByTeam.sfproduction;
    }

    if (groubedByTeam.sfitemsstockbalview) {
      this.sf_items_stockbalview = groubedByTeam.sfitemsstockbalview;
    }

    if (groubedByTeam.fgproduction) {
      this.fg_production = groubedByTeam.fgproduction;
    }

    if (groubedByTeam.sfissue) {
      this.sf_issue = groubedByTeam.sfissue;
    }

    if (groubedByTeam.production) {
      this.production = groubedByTeam.production;
    }
  }

  OnlyNumericDecimal(event: any): any {
    if (event.keyCode >= 48 && event.keyCode <= 57) {
      return true;
    }
    return false;
  }

  getGroupBY(xs: any, key: any) {
    return xs.reduce((rv: any, x: any) => {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  }

  existApp() {
    this.router.navigateByUrl('dashboard');
  }

  clearDetails() {
    this.batchnumControl.reset();
    this.icode = '';
    this.itemControl.reset();
    this.fromdate = this.changeFinalDateFormat(this.globals.gkDate, 'yyyy-MM-dd');
    this.todate = this.changeFinalDateFormat(this.globals.gkDate, 'yyyy-MM-dd');
  }

  shortcuts() {
    const keydown$ = fromEvent(window, 'keydown');
    this.subs.add(keydown$.subscribe((event: KeyboardEvent) => {
      if (event.altKey && (event.key === 'c' || event.key === 'C')) {
        event.preventDefault();
        this.clearDetails();
      }
      if (event.altKey && (event.key === 'v' || event.key === 'V')) {
        event.preventDefault();
        this.getIssue();
      }
      if (event.altKey && (event.key === 'a' || event.key === 'A')) {
        event.preventDefault();
        this.drawer.toggle();
      }
      if (event.altKey && (event.key === 'x' || event.key === 'X')) {
        event.preventDefault();
        this.existApp();
      }
    }));
  }

  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;

  someMethod() {
    console.log('asdf');

    this.trigger.openMenu();
  }

  timedOutCloser;

  mouseEnter(trigger1) {
    if (this.timedOutCloser) {
      clearTimeout(this.timedOutCloser);
    }
    trigger1.openMenu();
  }

  mouseLeave(trigger2) {
    this.timedOutCloser = setTimeout(() => {
      trigger2.closeMenu();
    }, 50);
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
