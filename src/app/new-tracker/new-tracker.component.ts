/* eslint-disable no-plusplus */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-empty-function */
/* eslint-disable no-useless-constructor */
/* eslint-disable import/prefer-default-export */

import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { TicketService } from 'src/app/updatation/services/ticket.service';
import { ChartOptions } from 'chart.js';
import {
  Label, monkeyPatchChartJsTooltip, monkeyPatchChartJsLegend, Color,
} from 'ng2-charts';
import { formatDate } from '@angular/common';
import { RequestTracker } from 'src/app/updatation/services/requestTracker';
import { MediaMatcher } from '@angular/cdk/layout';
import { Globals } from 'src/app/globals';

@Component({
  selector: 'app-new-tracker',
  templateUrl: './new-tracker.component.html',
  styleUrls: ['./new-tracker.component.scss'],
})
export class NewTrackerComponent implements OnInit {
  progressval = '';

  clientServer = '';

  userNameShort: string[];

  constructor(
    hangeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
     public globals: Globals,
 private ticketservice: TicketService,
 private router: Router,
  ) {
    this.clientServer = this.globals.gclientServer;
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => hangeDetectorRef.detectChanges();
    // tslint:disable-next-line: deprecation
    this.mobileQuery.addListener(this._mobileQueryListener);
    if (this.globals.gclientServer === 'Client') {
      this.globals.gApiserverBOTH = this.globals.gServerApiUrl;
      this.ticketservice.apiURL = this.globals.gApiserverBOTH;
    } else {
      this.globals.gApiserverBOTH = this.globals.gApiserver;
      this.ticketservice.apiURL = this.globals.gApiserverBOTH;
    }
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }

   mobileQuery: MediaQueryList;

   fillerNav = Array.from({ length: 50 }, (_, i) => `Nav Item ${i + 1}`);

   private _mobileQueryListener: () => void;

   public lineChartData: any[] = [
     {
       data: [],
       label: 'Tickets Created',
       borderColor: 'hsl(212, 42%, 48%)',
       backgroundColor: 'rgba(91,37,245, 0.2)',
     },
     {
       data: [], label: 'Resolved', borderColor: 'rgb(6, 178, 109)', backgroundColor: 'rgba(91,37,245, 0.2)',
     },
     {
       data: [], label: 'Closed', borderColor: 'rgb(255, 119, 119)', backgroundColor: 'rgba(91,37,245, 0.2)',
     },
   ];

   public lineChartLabels: Label[] = [];

   public lineChartOptions: ChartOptions = {
     maintainAspectRatio: false,
     responsive: true,
     plugins: {
       datalabels: {
         display: false,
       },
     },
     scales: {
       yAxes: [{
         gridLines: {
           display: true,
           color: 'rgba(91,37,245, 0.03)',
         },
         ticks: {
           maxTicksLimit: 5,
         },
       }],
       xAxes: [{}],
     },
     legend: {
       position: 'bottom',
       labels: {
         boxWidth: 12,
         padding: 8,
         fontSize: 11,
         fontColor: '#000',
         //  boxWidth: 30,
         //  padding:
       },
     },
     elements: {
       arc: {
         borderWidth: 0,
       },
     },
   };

   public lineChartColors: Color[] = [
     { borderColor: 'hsl(212, 42%, 48%)' },
     { borderColor: 'rgb(1,163,98)' },
     { borderColor: 'rgb(255,81,81)' },
   ];

   public lineChartLegend = true;

   public lineChartType:any = 'line';

   public lineChartPlugins: any = [];

   assignButton: any = [
     { type: 'Assing To User', value: 'user' },
     { type: 'Approve and Assign to Department', value: 'department' },
   ];

   selectTicket: any = [];

   inboxCount: any;

   UnAssignedCount: any;

   Trash: any;

   pendingCount: any;

   overdueCount: any;

   approvalPending: any;

   isApprovalview: any;

   userName = '';

   startDate: any;

   endDate: any;

   DepartMents:any = [];

   deptName: any;

   reqto: any;

   today: Date = new Date();

   requestDetails: RequestTracker = new RequestTracker();

   isReportView = true;

   isStatisctics = true;

  isSubject = false;

   dashbordTable: any = [];

   currentDepartment: any;

   chartDept:any;

   ngOnInit() {
     if (this.globals.gFromdate === '') {
       this.getToday();
     } else {
       this.startDate = this.globals.gFromdate;
       this.endDate = this.globals.gTodate;
     }
     if (this.globals.gclientServer === 'Client') {
       this.globals.gsideMenuSelected = 'outbox';
     } else {
       this.globals.gsideMenuSelected = 'inbox';
     }

     this.userName = this.globals.usrCaption;
     this.userNameShort = this.userName.split('@');

     this.getSideCout();
   }

   getSideCout() {
     this.ticketservice.body.usr = this.globals.gUsrid;
     this.ticketservice.body.brcode = this.globals.gBrcodeString;
     this.ticketservice.body.extra1 = this.changeFinalDateFormat(this.startDate, 'dd-MMM-yyyy');
     this.ticketservice.body.extra2 = this.changeFinalDateFormat(this.endDate, 'dd-MMM-yyyy');
     this.ticketservice.body.reqMain = 'Sidecount';
     this.progressval = 'indeterminate';
     this.ticketservice.getBody(this.ticketservice.body).subscribe((result: any) => {
       this.progressval = '';
       this.selectTicket = result;
       this.requestDetails = this.selectTicket[0];
       this.ticketservice.userDept = this.requestDetails.UserDepart;
       this.deptName = this.requestDetails.UserDepart;
       this.currentDepartment = this.requestDetails.UserDepart;
       this.chartDept = this.requestDetails.UserDepart;
       this.globals.gCamefrom = this.requestDetails.MultiDeptRights;
       this.ticketservice.approvalAuth = this.requestDetails.approvalAuthYN;
       this.ticketservice.assignAuthority = this.requestDetails.AsgnAuthority;
       this.ticketservice.body.extra5 = this.deptName;
       this.getChartDetail();
       if (this.globals.gCamefrom === 'Y') {
         this.getDept();
       } else {
         this.getDept();
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

   /** ***** find and change subject options  ******* */
   changeSubject() {
     if (this.isSubject === false) {
       this.isSubject = true;
     } else {
       this.isSubject = false;
     }
   }

   /** ***** find the current date
    * And get the previous 30th day
    * ******** */
   getToday() {
     const dateLimit = new Date(new Date().setDate(this.today.getDate() - 30));
     this.endDate = this.today;
     this.startDate = dateLimit;
     this.changeDateFormat(dateLimit, this.endDate);
   }

   /** ***** change date format ******* */
   changeDateFormat(startDate: any, endDate: any) {
     const format = 'yyyy-MM-dd';
     const locale = 'en-US';
     this.startDate = formatDate(startDate, format, locale);
     this.endDate = formatDate(endDate, format, locale);
   }

   /** ***** find and change collapse report body ******* */
   isReportChange() {
     if (this.isReportView) {
       this.isReportView = false;
     } else {
       this.isReportView = true;
     }
   }

   /** ***** find and change collapse statistics body ******* */
   isStatisticsChange() {
     if (this.isStatisctics) {
       this.isStatisctics = false;
     } else {
       this.isStatisctics = true;
     }
   }

   /** **** find the departmentsnames in user rights based******** */
   getDept() {
     // console.log(this.deptName);
     let dept = [];
     this.ticketservice.body.reqMain = 'DeptRightsToUser';
     // console.log(this.ticketservice.body);
     this.ticketservice.getBody(this.ticketservice.body).subscribe((result: any) => {
       dept = result;
       // console.log(dept);
       // tslint:disable-next-line: prefer-for-of
       for (let i = 0; i < dept.length; i++) {
         this.DepartMents.push(dept[i].deptname);
       }
       // console.log(this.DepartMents);
     }, (err: any) => {
     });
   }

   /** **** find the dates in startdate and end date,
    * return dates list
    * ******** */
   getDates(startDate: any, endDate: any) {
     const dates = [];
     let currentDate = new Date(
       startDate.getFullYear(),
       startDate.getMonth(),
       startDate.getDate(),
     );
     while (currentDate <= endDate) {
       dates.push(currentDate);
       currentDate = new Date(
         currentDate.getFullYear(),
         currentDate.getMonth(),
         currentDate.getDate() + 1,
       );
     }
     return dates;
   }

   /** ***** find department name ******* */
   onChangeDepartment() {
     this.getChartDetail();
   }

   /** ***** find dashboard chart values
    * set the line chart variables values
    ******** */
   getChartDetail() {
     this.ticketservice.body.extra5 = this.chartDept;
     this.lineChartLabels = [];
     this.lineChartData[0].data = [];
     this.lineChartData[1].data = [];
     this.lineChartData[2].data = [];
     this.getChartValues();
   }

   getChartValues() {
     let dashBordChart = [];
     this.ticketservice.body.reqMain = 'TicketDashboardORC';
     this.ticketservice.body.extra4 = this.changeFinalDateFormat(this.endDate, 'dd-MMM-yyyy');
     this.ticketservice.body.extra3 = this.changeFinalDateFormat(this.startDate, 'dd-MMM-yyyy');
     this.ticketservice.getBody(this.ticketservice.body).subscribe((result: any) => {
       dashBordChart = result;
       // tslint:disable-next-line: prefer-for-of
       for (let i = 0; i < dashBordChart.length; i++) {
         this.lineChartLabels.push(dashBordChart[i].tdate);
         this.lineChartData[0].data.push(dashBordChart[i].CreatedT);
         this.lineChartData[1].data.push(dashBordChart[i].ResolvedT);
         this.lineChartData[2].data.push(dashBordChart[i].ClosedT);
       }
       this.getDashbordTable();
     }, (err: any) => {
     });
   }

   /** ***** find dashboard table values
    * set the table values
    ******** */
   getDashbordTable() {
     // console.log(this.endDate + '\n' + this.endDate);
     this.ticketservice.body.reqMain = 'TicketDashboardORCDept';
     this.ticketservice.body.extra5 = this.deptName;
     this.ticketservice.body.extra4 = this.changeFinalDateFormat(this.endDate, 'dd-MMM-yyyy');
     this.ticketservice.body.extra3 = this.changeFinalDateFormat(this.startDate, 'dd-MMM-yyyy');
     this.ticketservice.getBody(this.ticketservice.body).subscribe((result: any) => {
       const data = result;
       data.forEach((e: any) => {
         e.CreatedT = 0;
         e.CreatedT += Number(e.Unassigned);
         e.CreatedT += Number(e.OpenTicket);
         e.CreatedT += Number(e.Inprogress);
         e.CreatedT += Number(e.ApprovalPending);
         e.CreatedT += Number(e.ResolvedT);
         e.CreatedT += Number(e.ClosedT);
       });
       this.dashbordTable = result;
     }, (err: any) => {
     });
   }

   /** **** find witch count card ,
    * set the api details and
    * routing department tickets list ****** */
   onChange(event: any) {
     this.ticketservice.body.extra4 = 'ALL';
     this.ticketservice.body.extra5 = this.currentDepartment;
     this.ticketservice.body.extra3 = 'ALL';
     if (event === 'deptNew') {
       this.ticketservice.body.extra4 = 'UnAssigned';
     } else if (event === 'Inbox') {
       this.ticketservice.body.extra3 = this.userName;
     } else if (event === 'deptOpen') {
       this.ticketservice.body.extra4 = 'Open';
     } else if (event === 'Mytickets') {
       this.ticketservice.body.extra4 = 'Open';
       this.ticketservice.body.extra3 = this.userName;
     } else if (event === 'resolvedDept') {
       this.ticketservice.body.extra4 = 'Resolved';
     } else if (event === 'resolvedMe') {
       this.ticketservice.body.extra4 = 'Resolved';
       this.ticketservice.body.extra3 = this.userName;
     } else if (event === 'apprPending') {
       this.ticketservice.body.extra4 = 'ApprovalPending';
     } else if (event === 'inprogress') {
       this.ticketservice.body.extra4 = 'In-progress';
     } else {
       this.ticketservice.body.extra4 = 'ALL';
       this.ticketservice.body.extra5 = this.currentDepartment;
       this.ticketservice.body.extra3 = 'ALL';
     }
     this.goToMenu('deptTicket');
   }

   gotoFilter(dept: any) {
     this.globals.gFromdate = this.startDate;
     this.globals.gTodate = this.endDate;
     this.ticketservice.body.dept = dept;
     this.router.navigate(['/ClientServerCommon/filter-tickets']);
   }

   gotoBranchwiseFilter(dept:any) {
     this.ticketservice.body.dept = dept;
     this.router.navigate(['/ClientServerCommon/filter2-tickets']);
   }

   /** ****** navigate to previous url ******* */
   backNavigation() {
     this.router.navigate(['/dashboard']);
   }

   /** ******** find the sidemenu selection
    * And routing table list
    ************* */
   goToMenu(option: any) {
     this.ticketservice.body.extra1 = this.startDate;
     this.ticketservice.body.extra2 = this.endDate;
     this.globals.gFromdate = this.startDate;
     this.globals.gTodate = this.endDate;
     this.ticketservice.body.extra2 = this.endDate;
     if (option === 'inbox') {
       this.globals.gsideMenuSelected = 'inbox';
       this.routingTable();
     } else if (option === 'outbox') {
       this.globals.gsideMenuSelected = 'outbox';
       this.routingTable();
     } else if (option === 'unassigned') {
       this.globals.gsideMenuSelected = 'unassigned';
       this.routingTable();
     } else if (option === 'pendings') {
       this.globals.gsideMenuSelected = 'pendings';
       this.routingTable();
     } else if (option === 'overdue') {
       this.globals.gsideMenuSelected = 'overdue';
       this.routingTable();
     } else if (option === 'trash') {
       this.globals.gsideMenuSelected = 'trash';
       this.routingTable();
     } else if (option === 'approval') {
       this.globals.gsideMenuSelected = 'approval';
       this.routingTable();
     } else if (option === 'unapproval') {
       this.globals.gsideMenuSelected = 'apprpendings';
       this.routingTable();
     } else if (option === 'rejected') {
       this.globals.gsideMenuSelected = 'rejected';
       this.routingTable();
     } else if (option === 'deptTicket') {
       this.globals.gsideMenuSelected = 'deptTicket';
       this.routingTable();
     } else if (option === 'createSubject') {
       this.globals.gsideMenuSelected = 'createSubject';
       this.routingSubject();
     } else if (option === 'editSubject') {
       this.globals.gsideMenuSelected = 'editSubject';
       this.routingSubject();
     } else if (option === 'deleteSubject') {
       this.globals.gsideMenuSelected = 'deleteSubject';
       this.routingSubject();
     } else if (option === 'createTicket') {
       this.globals.gsideMenuSelected = 'createTicket';
       this.routingSubject();
     } else {
       this.globals.gsideMenuSelected = 'inbox';
       this.routingTable();
     }
   }

   /** ************ routing url in table component ************* */
   routingTable() {
     this.router.navigate(['/ClientServerCommon/tickets']);
   }

   /** ************ routing url in subject component ************* */
   routingSubject() {
     this.router.navigate(['/ClientServerCommon/CreateTicket']);
   }

   /** ************ routing url in departmentTickets component ************* */
   dashBoardTable(dept: any, status: any) {
     this.ticketservice.body.extra4 = status;
     this.ticketservice.body.extra5 = dept;
     this.ticketservice.body.extra3 = 'ALL';
     this.goToMenu('deptTicket');
   }

   // tslint:disable-next-line: use-lifecycle-interface
   ngOnDestroy(): void {
     // tslint:disable-next-line: deprecation
     this.mobileQuery.removeListener(this._mobileQueryListener);
   }
}
