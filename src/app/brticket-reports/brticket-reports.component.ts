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
import { Component, OnInit, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Globals } from 'src/app/globals';
import { MisReportService } from 'src/app/updatation/services/mis-report.service';
import { TicketService } from 'src/app/updatation/services/ticket.service';

@Component({
  selector: 'app-brticket-reports',
  templateUrl: './brticket-reports.component.html',
  styleUrls: ['./brticket-reports.component.css'],
})
export class BrticketReportsComponent implements OnInit {
  progressval = '';

  dept: string;

  constructor(
private router: Router,
private ticketService: TicketService,
    private globals: Globals,
private reportService: MisReportService,
private dialog: MatDialog,
  ) {
    this.reportService.apiUrl = this.globals.gApiserver;
    this.dept = this.ticketService.body.dept;
    this.ticketService.body.usr = this.globals.gUsrid;
    this.ticketService.body.brcode = this.globals.gBrcodeString;
  }

  DepartMents: any = [];

  startDate: any;

  endDate: any;

  today: Date = new Date();

  ListJds: any = [];

 selSub = '';

  hidden = true;

  isOption = 'Subject_Wise'; // 'Branch_Wise';

  column:any='';

  isDesc:any='';

  direction:any ='';

  subcolumn:any='';

  subDesc:any='';

  subdirection:any ='';

  ngOnInit() {
    this.getDefaultDate();
    this.getAllDepartMents();
  }

  getAllDepartMents() {
    this.ticketService.body.reqMain = 'DeptRightsToUser';
    this.ticketService.getBody(this.ticketService.body).subscribe((result: any) => {
      this.DepartMents = result;
    }, (err: any) => {
    });
  }

  sort(property:any) {
    this.isDesc = !this.isDesc;
    this.column = property;
    this.direction = this.isDesc ? 1 : -1;
  }

  sortSub(property:any) {
    this.subDesc = !this.subDesc;
    this.subcolumn = property;
    this.subdirection = this.subDesc ? 1 : -1;
  }

  getDefaultDate() {
    const today = new Date();
    this.startDate = this.changeFinalDateFormat(today, 'yyyy-MM-dd');
    this.endDate = this.changeFinalDateFormat(today, 'yyyy-MM-dd');
  }

  onChangeDept(event: any) {
    this.dept = event.value;
  }

  backNavigation() {
    if (this.isOption == 'Branch_Wise') {
      this.isOption = 'Subject_Wise';
    } else {
      this.router.navigate(['/ClientServerCommon/RequestTracker']);
    }
  }

  getFilter() {
    this.ListJds = [];
    this.progressval = 'indeterminate';
    this.reportService.getRachnTen({
      reqMainreq: 'GetRtrackSubjectBasedCountDetail',
      Usr: this.globals.gUsrid,
      brcode: this.globals.gBrcode,
      var1: this.changeFinalDateFormat(this.startDate, 'dd-MMM-yyyy'),
      var2: this.changeFinalDateFormat(this.endDate, 'dd-MMM-yyyy'),
      var3: this.dept,
      var4: '0',
      var5: '0',
      var6: '0',
      var7: '0',
      var8: '0',
      var9: '0',
      var10: '0',
      var11: '0',
      var12: '0',
      var13: '0',
      var14: '0',
      var15: '0',
      var16: '0',
      var17: '0',
      var18: '0',
      var19: '0',
      var20: '0',
    }).subscribe((result: any) => {
      let data: any = [];
      data = result;
      this.progressval = '';
      if (data.length > 0 && data[0].StatusRes == 'Success') {
        this.ListJds = result;
      }
    }, (err: any) => {
      this.progressval = '';
    });
  }

  BrList:any = [];

  getBrFilter(subject:any) {
    this.selSub = subject;
    this.BrList = [];
    this.progressval = 'indeterminate';
    this.reportService.getRachnTen({
      reqMainreq: 'GetRtrackSubjectBasedBrwiseCountDetail',
      Usr: this.globals.gUsrid,
      brcode: this.globals.gBrcode,
      var1: this.changeFinalDateFormat(this.startDate, 'dd-MMM-yyyy'),
      var2: this.changeFinalDateFormat(this.endDate, 'dd-MMM-yyyy'),
      var3: this.dept,
      var4: this.selSub,
      var5: '0',
      var6: '0',
      var7: '0',
      var8: '0',
      var9: '0',
      var10: '0',
      var11: '0',
      var12: '0',
      var13: '0',
      var14: '0',
      var15: '0',
      var16: '0',
      var17: '0',
      var18: '0',
      var19: '0',
      var20: '0',
    }).subscribe((result: any) => {
      let data: any = [];
      data = result;
      this.progressval = '';
      if (data.length > 0 && data[0].StatusRes == 'Success') {
        this.BrList = result;
        this.isOption = 'Branch_Wise';
      }
    }, (err: any) => {
      this.progressval = '';
    });
  }

  detailList:any = [];

  selBrname:any = '';

 selBrcode:any ='';

 getDetails(reqdata:any) {
   this.detailList = [];
   this.selBrname = reqdata.RequestedBrname; this.selBrcode = reqdata.RequestedBrcode;
   this.progressval = 'indeterminate';
   this.reportService.getRachnTen({
     reqMainreq: 'GetRtrackSubjectBasedReqBranchDetail',
     Usr: this.globals.gUsrid,
     brcode: this.selBrcode,
     var1: this.changeFinalDateFormat(this.startDate, 'dd-MMM-yyyy'),
     var2: this.changeFinalDateFormat(this.endDate, 'dd-MMM-yyyy'),
     var3: this.dept,
     var4: this.selSub,
     var5: '0',
     var6: '0',
     var7: '0',
     var8: '0',
     var9: '0',
     var10: '0',
     var11: '0',
     var12: '0',
     var13: '0',
     var14: '0',
     var15: '0',
     var16: '0',
     var17: '0',
     var18: '0',
     var19: '0',
     var20: '0',
   }).subscribe((result: any) => {
     let data: any = [];
     data = result;
     this.progressval = '';
     if (data.length > 0 && data[0].StatusRes == 'Success') {
       this.detailList = result;
       this.hidden = false;
     }
   }, (err: any) => {
     this.progressval = '';
   });
 }

 changeFinalDateFormat(startDate: any, format: any): any {
   const locale = 'en-US';
   const date = formatDate(startDate, format, locale);
   return date;
 }

 exportAsXLSX() {
   this.reportService.exportAsExcelFile(this.ListJds, 'SubjectwiseDetails');
 }

 exportAsXLSXBr() {
   this.reportService.exportAsExcelFile(this.BrList, 'BranchwiseDetails');
 }

 exportAsXLSXtickets() {
   this.reportService.exportAsExcelFile(this.detailList, 'TicketDetails');
 }

 ticketDetails(template:TemplateRef<any>, ticketId:any) {
   this.globals.gTrnNo = ticketId;
   this.dialog.open(template, {
     panelClass: 'gDialogBox',
     disableClose: true,
     minWidth: '85vw',
   });
 }
}
