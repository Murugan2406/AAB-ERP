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
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';
import { MisReportService } from 'src/app/updatation/services/mis-report.service';
import { TicketService } from 'src/app/updatation/services/ticket.service';
import { Globals } from 'src/app/globals';

@Component({
  selector: 'app-filter-tickets',
  templateUrl: './filter-tickets.component.html',
  styleUrls: ['./filter-tickets.component.css'],
})
export class FilterTicketsComponent implements OnInit {
  progressval = '';

  dept: string;

  constructor(
private router: Router,
private ticketService: TicketService,
              private globals: Globals,
private reportService: MisReportService,
  ) {
    this.dept = this.ticketService.body.dept;
    this.ticketService.body.usr = this.globals.gUsrid;
    this.ticketService.body.brcode = this.globals.gBrcodeString;
  }

  DepartMents:any = [];

 Subjects:any = [];

  subject = 'ALL';

  startDate: any;

  endDate: any;

  today: Date = new Date();

  dashbordTable:any = [];

  ngOnInit() {
    this.startDate = this.globals.gFromdate;
    this.endDate = this.globals.gTodate;
    this.getAllDepartMents();
    // this.getToday();
    // this.getAllUsers();
    this.getFilter();
    this.getAllJds();
  }

  getAllDepartMents() {
    this.ticketService.body.reqMain = 'DeptRightsToUser';
    this.ticketService.getBody(this.ticketService.body).subscribe((result:any) => {
      // console.log(result);
      this.DepartMents = result;
    }, (err:any) => {
    });
  }

  onChangeDept(event:any) {
    this.subject = 'ALL';
    this.dept = event.value;
    this.getAllJds();
    this.getFilter();
  }

  onChangeSubject(event:any) {
    this.subject = event.value;
    this.getFilter();
  }

  onChangeStart(event:any) {
    // console.log(event);
    this.startDate = event.value;
    this.getFilter();
  }

  onChangeEnd(event:any) {
    // console.log(event);
    this.endDate = event.value;
    this.getFilter();
  }

  getAllJds() {
    this.ticketService.body.reqMain = 'GetlDeptJDS';
    this.ticketService.body.dept = this.dept;
    this.ticketService.getBody(this.ticketService.body).subscribe((result:any) => {
      this.Subjects = result;
    }, (err:any) => {
    });
  }

  getToday() {
    const dateLimit = new Date(new Date().setDate(this.today.getDate() - 30));
    //  this.getFilterDatas(dateLimit, this.today);
    this.endDate = this.today;
    this.startDate = dateLimit;
    this.changeDateFormat(this.startDate, this.endDate);
  }

  changeDateFormat(startDate:any, endDate:any) {
    const format = 'yyyy-MM-dd';
    const locale = 'en-US';
    this.startDate = formatDate(startDate, format, locale);
    this.endDate = formatDate(endDate, format, locale);
  }

  backNavigation() {
    this.router.navigate(['/ClientServerCommon/RequestTracker']);
  }

  goToTickets(subject:any, status:any) {
    this.ticketService.body.subject = subject;
    this.ticketService.body.extra4 = status;
    this.ticketService.body.extra3 = 'ALL';
    this.ticketService.body.extra5 = this.dept;
    this.globals.gsideMenuSelected = 'reports';
    this.ticketService.body.extra1 = this.startDate;
    this.ticketService.body.extra2 = this.endDate;
    this.router.navigate(['/ClientServerCommon/tickets']);
  }

  getFilter() {
    //  console.log(this.dept);
    this.ticketService.body.reqMain = 'TicketFiltersforUsers';
    this.ticketService.body.dept = this.dept;
    this.ticketService.body.subject = this.subject;
    this.ticketService.body.extra4 = this.changeFinalDateFormat(this.endDate, 'dd-MMM-yyyy');
    this.ticketService.body.extra3 = this.changeFinalDateFormat(this.startDate, 'dd-MMM-yyyy');
    this.progressval = 'indeterminate';
    this.ticketService.getBody(this.ticketService.body).subscribe((result:any) => {
    //  console.log(result);
      this.progressval = '';
      const data = result;
      data.forEach((e:any) => {
        e.CreatedT = 0;
        e.CreatedT += Number(e.Unassigned);
        e.CreatedT += Number(e.OpenTicket);
        e.CreatedT += Number(e.Inprogress);
        e.CreatedT += Number(e.ApprovalPending);
        e.CreatedT += Number(e.ResolvedT);
        e.CreatedT += Number(e.ClosedT);
      });
      this.dashbordTable = data;
    }, (err:any) => {
      this.progressval = '';
    });
  }

  changeFinalDateFormat(startDate:any, format:any): any {
    const locale = 'en-US';
    const date = formatDate(startDate, format, locale);
    return date;
  }

  exportAsXLSX() {
    this.reportService.exportAsExcelFile(this.dashbordTable, 'TicketDetails');
  }
}
