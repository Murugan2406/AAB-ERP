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
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Globals } from 'src/app/globals';
import { InventoryService } from 'src/app/updatation/services/inventory.service';

import { SubSink } from 'subsink';
import Swal from 'sweetalert2';

declare let $: any;

@Component({
  selector: 'app-dcraise',
  templateUrl: './dcraise.component.html',
  styleUrls: ['./dcraise.component.scss', '../../../app/ProductionStyle.scss'],
})
export class DcraiseComponent implements OnInit {
  branch = '';

  constructor(private service: InventoryService, private globals: Globals, private router: Router) {
    this.service.apiUrl = this.globals.gApiserver;
    this.branch = this.service.dcraiseBranch;
    this.brcode = this.service.dcraise_brcode;
  }

  fromdate: any;

  todate: any;

  vfdate: any;

  vtdate: any;

  subs = new SubSink();

  brcode: any;

 barcode: any;

  tdate: any;

  progressval = '';

  UnrcdDcs: any = [];

  dcraised_despatch_items: any = [];

  dcissuesSnoList: any = [];

  viewList: any =[];

 receivedBy: any = '';

  isOption = 'Save' // View //UnsavedDc

  ngOnInit(): void {
    this.defaultData();
    this.getDc_RaisedDesptachItems();
  }

  defaultData() {
    this.tdate = this.changeFinalDateFormat(new Date(), 'yyyy-MM-dd');
    this.fromdate = this.changeFinalDateFormat(new Date(), 'yyyy-MM-dd');
    this.todate = this.changeFinalDateFormat(new Date(), 'yyyy-MM-dd');
    this.vfdate = this.changeFinalDateFormat(new Date(), 'yyyy-MM-dd');
    this.vtdate = this.changeFinalDateFormat(new Date(), 'yyyy-MM-dd');
  }

  getUnsavedDcDetails(i: any) {
    this.dcraised_despatch_items = [];
    this.loadDatas('DesIssueDetailsByDCno', this.globals.gBrcode, '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', this.UnrcdDcs[i].sno, '0', this.changeFinalDateFormat(this.tdate, 'yyyy-MM-dd'), this.changeFinalDateFormat(this.tdate, 'yyyy-MM-dd'), '');
  }

  selindex: any;

  getViewDcDetails(i: any) {
    this.selindex = i;
    this.dcraised_despatch_items = [];
    this.loadDatas('DesIssueDetailsBySno', this.globals.gBrcode, '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', this.viewList[i].sno, '0', this.changeFinalDateFormat(this.tdate, 'yyyy-MM-dd'), this.changeFinalDateFormat(this.tdate, 'yyyy-MM-dd'), '');
  }

  getDc_RaisedDesptachItems() {
    this.isOption = 'Save';
    this.dcraised_despatch_items = [];
    this.loadDatas('DCRaiseDespathItems', this.globals.gBrcode, '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', this.brcode, '0', '0', '0', '0', '');
  }

  getViewList() {
    this.viewList = [];
    this.loadDatas('DesIssueDetailsSnoList', this.globals.gBrcode, '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', this.brcode, '0', '0', this.changeFinalDateFormat(this.fromdate, 'yyyy-MM-dd'), this.changeFinalDateFormat(this.todate, 'yyyy-MM-dd'), '');
  }

  viewData() {
    $('#ViewDcModal').modal('show');
    if (this.dcissuesSnoList.length > 0) {
      this.getViewList();
    }
  }

  getUnreceivedDcs() {
    this.isOption = 'UnsavedDc';
    $('#unsaveDcModal').modal('show');
    // $('#unsaveDcModal').modal({backdrop: 'static', keyboard: false, show: true})  
    if (this.UnrcdDcs.length > 0) {
      this.getDcList();
    }
  }

  getDcList() {
    this.UnrcdDcs = [];
    this.loadDatas('GetUnReceivedDcList', this.globals.gBrcode, this.globals.gTerCode, '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', this.brcode, '0', '0', this.changeFinalDateFormat(this.tdate, 'yyyy-MM-dd'), '0', '');
  }

  getDelete(i: any) {
    Swal.fire({
      title: 'Are you sure?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      confirmButtonColor: '#4caf50',
      cancelButtonColor: '#ff80ab',
    }).then((result) => {
      if (result.value) {
        this.loadDatas('DeleteDCRaisedItems', this.brcode, this.globals.gTerCode, '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', this.brcode, this.dcraised_despatch_items[i], '0', this.changeFinalDateFormat(this.vfdate, 'yyyy-MM-dd'), this.changeFinalDateFormat(this.vtdate, 'yyyy-MM-dd'), '');
      } else if (result.dismiss === Swal.DismissReason.cancel) { }
    });
  }

  getSaveCheck() {
    if (this.isOption == 'Save') {
      if (this.dcraised_despatch_items.length > 0) {
        this.receivedBy = '';
        $('#receiver').modal('show');
      } else {
        Swal.fire({ text: 'Data not found' });
      }
    } else {
      this.getDc_RaisedDesptachItems();
    }
  }

  getSave() {
    if (this.receivedBy === '' || this.receivedBy === null || this.receivedBy === undefined) {
      Swal.fire({ text: 'Enter Item Received By Name' });
      return;
    }
    Swal.fire({
      title: 'Are you to sure?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      confirmButtonColor: '#4caf50',
      cancelButtonColor: '#ff80ab',
    }).then((result) => {
      if (result.value) {
        $('#receiver').modal('hide');
        this.loadDatas('SaveRaisedDCs', this.globals.gBrcode, this.globals.gTerCode, '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', this.brcode, '0', '0', '0', '0', this.receivedBy);
      } else if (result.dismiss === Swal.DismissReason.cancel) { }
    });
  }

  reprint(data:any) {
    Swal.fire({
      title: 'Are you sure?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      confirmButtonColor: '#4caf50',
      cancelButtonColor: '#ff80ab',
    }).then((result) => {
      if (result.value) {
        this.dcPrint(data);
      } else if (result.dismiss === Swal.DismissReason.cancel) { }
    });
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
      var1: this.globals.gTerCode,
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
      if (data.length > 0) {
        if (data[0].StatusRes == 'Success') {
          if (reqmain == 'DCRaiseDespathItems') {
            this.isOption = 'Save';
            this.dcraised_despatch_items = data;
          }
          if (reqmain == 'DesIssueDetailsSnoList') { this.viewList = data; }
          if (reqmain == 'DesIssueDetailsBySno') {
            this.isOption = 'View';
            this.dcraised_despatch_items = data;
            $('#ViewDcModal').modal('hide');
          }
          if (reqmain == 'GetUnReceivedDcList') { this.UnrcdDcs = data; }
          if (reqmain == 'DesIssueDetailsByDCno') {
            this.dcraised_despatch_items = data;
            // this.isOption = 'View';
            $('#unsaveDcModal').modal('hide');
          }
          if (reqmain == 'SaveRaisedDCs') {
            Swal.fire({ text: 'Save Sucessfully' });
            this.dcPrint(data[0]);
            this.getDc_RaisedDesptachItems();
          }
          if (reqmain == 'DeleteDCRaisedItems') {
            Swal.fire({ text: 'Delete Sucessfully' });
            this.getViewDcDetails(this.selindex);
          }
        } else if (reqmain !== 'DCRaiseDespathItems') {
          Swal.fire({ text: data[0].StatusRes });
        } else {
          Swal.fire({ text: data[0].StatusRes });
        }
      } else {
        Swal.fire({ text: 'Response not found' });
      }
    }, (err: any) => {
      this.progressval = '';
      Swal.fire({ html: err.error });
    }));
  }

  dcPrint(reqdata:any) {
    this.progressval = 'indeterminate';
    this.subs.add(this.service.getBody({
      ReqMain: 'Production_DC_Print',
      usr: this.globals.gUsrid,
      var1: this.globals.gLabelprinterIp,
      var2: '1',
      var3: reqdata.Sno,
      var4: reqdata.Tobrname,
      var5: reqdata.timenow,
      var6: reqdata.usr,
      var7: '0',
      var8: '0',
      var9: '0',
      var10: '0',
    }).subscribe((result: any) => {
      const data = result;
      this.progressval = '';
      if (data.length > 0) {
        if (data[0].statusMsg === 'Success') {
          Swal.fire({ text: 'Print Successfully..' });
        } else {
          Swal.fire({ text: data[0].errorMsg });
        }
      } else {
        Swal.fire({ text: 'Failed print request..' });
      }
    }, (err: any) => {
      this.progressval = '';
      Swal.fire({ text: 'Print Server Error' });
    }));
  }

  changeFinalDateFormat(startDate: any, format: any): any {
    const locale = 'en-US';
    const date = formatDate(startDate, format, locale);
    return date;
  }

  enterKeyEvent(event: any, option: any) {
    if (event.key === 'Enter') {
      setTimeout(() => {
        document.getElementById(option)?.focus();
      }, 100);
    }
  }
}
