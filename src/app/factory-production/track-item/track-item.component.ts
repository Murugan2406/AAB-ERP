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
import { formatDate } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { localeData } from 'moment';
import { Globals } from 'src/app/globals';
import { InventoryService } from 'src/app/updatation/services/inventory.service';
import { SubSink } from 'subsink';
import Swal from 'sweetalert2';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-track-item',
  templateUrl: './track-item.component.html',
  styleUrls: ['./track-item.component.scss'],
})
export class TrackItemComponent implements OnInit, OnDestroy {
  constructor(private service:InventoryService, private globals:Globals) {
    this.service.apiUrl = this.globals.gApiserver;

    this.subs.add(this.itemControl.valueChanges.pipe(debounceTime(600)).subscribe((data) => {
      this.loadDatasReq('ItemFilter', this.globals.gBrcode, this.globals.gTerCode, '', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', data);
    }));
  }

  progressval ='';

  viewList:any = [];

  fromdate: any;

 todate: any;

 icode:any;

  subs = new SubSink();

  itemControl = new FormControl();

  itemList:any=[];

  isoption = 'Option'// List

  isDeleted = false;

  viewSearch1 = ''

  ngOnInit(): void {
    this.fromdate = this.changeFinalDateFormat(this.globals.gkDate, 'yyyy-MM-dd');
    this.todate = this.changeFinalDateFormat(this.globals.gkDate, 'yyyy-MM-dd');
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  changeFinalDateFormat(startDate: any, format: any): any {
    const locale = 'en-US';
    const date = formatDate(startDate, format, locale);
    return date;
  }

  getItem(event:any) {
    this.icode = this.itemList.find((e: any) => e.iname == event).icode;
    setTimeout(() => {
      document.getElementById('viewbtn').focus();
    }, 100);
  }

  gotoBack() {
    this.isoption = 'Option';
  }

  checkOption() {
    if (this.fromdate == null || this.fromdate == undefined || this.fromdate == '') {
      Swal.fire({ text: 'Select from date ..' });
    } else if (this.todate == null || this.todate == undefined || this.todate == '') {
      Swal.fire({ text: 'Select to date ..' });
    } else if (this.icode == null || this.icode == undefined || this.icode == '') {
      Swal.fire({ text: 'Select Item ..' });
    } else {
      let txt = 'No';
      if (this.isDeleted) {
        txt = 'Yes';
      }
      this.loadDatas(this.icode, txt);
    }
  }

  loadDatasReq(
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
      const data = result;
      if (reqmain == 'ItemFilter') { this.itemList = data; }
    }, (err: any) => {
      this.progressval = '';
      Swal.fire({ html: err.error });
    }));
  }

  loadDatas(extra6:any, extra14:any) {
    this.viewList = [];
    this.progressval = 'indeterminate';
    this.subs.add(this.service.datareqKarSmyThree({
      reqMainreq: 'TrackItemBarcodeWise',
      Usr: this.globals.gUsrid,
      brcode: this.globals.gBrcode,
      var1: '0',
      var2: '0',
      var3: '0',
      var4: '0',
      var5: '0',
      var6: extra6,
      var7: '0',
      var8: '0',
      var9: '0',
      var10: '0',
      var11: '0',
      var12: '0',
      var13: '0',
      var14: extra14,
      var15: '0',
      var16: '0',
      var17: '0',
      var18: this.changeFinalDateFormat(this.fromdate, 'yyyy-MM-dd'),
      var19: this.changeFinalDateFormat(this.todate, 'yyyy-MM-dd'),
      var20: '0',
    }).subscribe((result: any) => {
      this.progressval = '';
      const data = result;
      if (data.length > 0) {
        if (data[0].StatusRes == 'Success') {
          this.viewList = data;
          this.isoption = 'List';
        } else {
          Swal.fire({ text: data[0].StatusRes });
        }
      } else {
        Swal.fire({ text: 'No records found ..' });
      }
    }, (err: any) => {
      this.progressval = '';
      Swal.fire({ html: err.error });
    }));
  }

  enterKeyEvent(event, option) {
    if (event.key === 'Enter' && event.target.value !== '') {
      document.getElementById(option).focus();
    }
  }
}
