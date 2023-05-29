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
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Globals } from 'src/app/globals';
import { InventoryService } from 'src/app/updatation/services/inventory.service';

import { SubSink } from 'subsink';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-production-view',
  templateUrl: './production-view.component.html',
  styleUrls: ['./production-view.component.scss'],
})
export class ProductionViewComponent implements OnInit {
  constructor(private service: InventoryService, private globals: Globals, private router: Router) {
    this.service.apiUrl = this.globals.gServerApiUrl;
  }

  progressval = '';

 subs = new SubSink();

  viewList: any = [];

  viewfrDate: any;

 viewtoDate: any;

 viewSearch1 = ''

 ngOnInit(): void {
   this.viewfrDate = this.changeFinalDateFormat(this.globals.gkDate, 'yyyy-MM-dd');
   this.viewtoDate = this.changeFinalDateFormat(this.globals.gkDate, 'yyyy-MM-dd');
   setTimeout(() => {
     document.getElementById('viewfrdate').focus();
   }, 100);
 }

 viewDataAll() {
   if (this.viewfrDate == '' || this.viewfrDate == null || this.viewfrDate == null) {
     Swal.fire({ text: 'Select from date..' });
   } else if (this.viewtoDate == '' || this.viewtoDate == null || this.viewtoDate == null) {
     Swal.fire({ text: 'Select to date..' });
   } else {
     this.viewList = [];
     this.loadDatas('ViewProductionWM', this.globals.gBrcode, this.globals.gTerCode, 'FinishedPrd', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', this.changeFinalDateFormat(this.viewfrDate, 'yyyy-MM-dd'), this.changeFinalDateFormat(this.viewtoDate, 'yyyy-MM-dd'), '0');
   }
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
     const data = result;
     if (reqmain == 'ViewProductionWM') {
       if (data && data[0].StatusRes == 'Success') {
         this.viewList = data;
       } else {
         Swal.fire({ text: data[0]?.StatusRes });
       }
     }
   }, (err: any) => {
     this.progressval = '';
     Swal.fire({ html: err.error });
   }));
 }

 changeFinalDateFormat(startDate: any, format: any): any {
   const locale = 'en-US';
   const date = formatDate(startDate, format, locale);
   return date;
 }

 enterKeyEvent(event: any, option:any) {
   if (event.key === 'Enter') {
     setTimeout(() => {
       document.getElementById(option).focus();
     }, 100);
   }
 }
}
