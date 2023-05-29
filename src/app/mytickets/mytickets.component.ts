/* eslint-disable consistent-return */
/* eslint-disable no-plusplus */
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
import { Globals } from 'src/app/globals';
import { Router } from '@angular/router';
import { MisReportService } from 'src/app/updatation/services/mis-report.service';
import { TicketService } from 'src/app/updatation/services/ticket.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-mytickets',
  templateUrl: './mytickets.component.html',
  styleUrls: ['./mytickets.component.css'],
})
export class MyticketsComponent implements OnInit {
  progressval = '';

  selectStatus: any;

  selectUser: any;

  isFilter = false;

  // isHeaderView = true;
  isTicketList = true;

  isTicketDetails = false;

  header: any;

  isDetailsView = false;

  rightToAll: string;

  sideMenuSelected: any;

  p: any;

 filter: any;

 checklist: any;

  isDesc = false;

 isSearch = false;

  direction: any;

 itemsPerPage = 20;

  column: any;

  status = ['UnAssigned', 'Open', 'In-progress', 'Resolved', 'Closed', 'ApprovalPending'];

  deptNames:any = [];

 UserNames:any = [];

  deptName: any;

  selectDept: any;

  subject = '';

 subjects:any = '';

 constructor(
private globals: Globals,
private router: Router,
private ticketservice: TicketService,
    private misService: MisReportService,
 ) {
   this.rightToAll = this.globals.gCamefrom;
   this.deptName = this.ticketservice.userDept;
   this.selectDept = this.ticketservice.userDept;
   this.ticketservice.body.usr = this.globals.gUsrid;
   this.ticketservice.body.brcode = this.globals.gBrcodeString;
   if (this.globals.gclientServer === 'Client') {
     this.globals.gApiserverBOTH = this.globals.gServerApiUrl;
     this.ticketservice.apiURL = this.globals.gApiserverBOTH;
   } else {
     this.globals.gApiserverBOTH = this.globals.gApiserver;
     this.ticketservice.apiURL = this.globals.gApiserverBOTH;
   }
 }

  fromdate = '';

 todate = '';

 ngOnInit() {
   this.subject = 'ALL';
   this.fromdate = this.changeFinalDateFormat(this.ticketservice.body.extra1, 'yyyy-MM-dd');
   this.todate = this.changeFinalDateFormat(this.ticketservice.body.extra2, 'yyyy-MM-dd');
   // console.log(' ==> ' + this.globals.gsideMenuSelected);
   if (this.globals.gsideMenuSelected === 'inbox') {
     this.header = 'MY INBOX';
     this.ticketservice.body.reqMain = 'Inbox';
     this.sideMenuSelected = this.globals.gsideMenuSelected;
     this.getDetails();
   } else if (this.globals.gsideMenuSelected === 'outbox') {
     this.header = 'MY OUTBOX';
     this.ticketservice.body.reqMain = 'Outbox';
     this.sideMenuSelected = this.globals.gsideMenuSelected;
     this.getDetails();
   } else if (this.globals.gsideMenuSelected === 'unassigned') {
     this.header = 'NEW REQUESTS';
     this.ticketservice.body.reqMain = 'Unassigned';
     this.sideMenuSelected = this.globals.gsideMenuSelected;
     this.getDetails();
   } else if (this.globals.gsideMenuSelected === 'pendings') {
     this.header = 'MY NEW TICKETS';
     this.ticketservice.body.reqMain = 'MyPendings';
     this.sideMenuSelected = this.globals.gsideMenuSelected;
     this.getDetails();
   } else if (this.globals.gsideMenuSelected === 'overdue') {
     this.header = 'OVERDUE';
     this.ticketservice.body.reqMain = 'Overdue';
     this.sideMenuSelected = this.globals.gsideMenuSelected;
     this.getDetails();
   } else if (this.globals.gsideMenuSelected === 'trash') {
     this.header = 'MY INBOX';
     this.ticketservice.body.reqMain = 'Trash';
     this.sideMenuSelected = this.globals.gsideMenuSelected;
     this.getDetails();
   } else if (this.globals.gsideMenuSelected === 'apprpendings') {
     this.header = 'APPROVAL PENDINGS';
     this.ticketservice.body.reqMain = 'MyApprovalPendings';
     this.sideMenuSelected = this.globals.gsideMenuSelected;
     this.getDetails();
   } else if (this.globals.gsideMenuSelected === 'approval') {
     this.header = 'APPROVAL TICKETS';
     this.ticketservice.body.reqMain = 'Approved';
     this.sideMenuSelected = this.globals.gsideMenuSelected;
     this.getDetails();
   } else if (this.globals.gsideMenuSelected === 'rejected') {
     this.header = 'REJECTED TICKTES';
     this.ticketservice.body.reqMain = 'Rejected';
     this.sideMenuSelected = this.globals.gsideMenuSelected;
     this.getDetails();
   } else if (this.globals.gsideMenuSelected === 'reports') {
     this.isFilter = true;
     this.header = 'TICKET REPORTS';
     this.sideMenuSelected = this.globals.gsideMenuSelected;
     this.itemsPerPage = 15;
     this.getReports();
   } else if (this.globals.gsideMenuSelected === 'deptTicket') {
     this.isFilter = true;
     this.header = 'MY DEPARTMENT TICKETS';
     this.ticketservice.body.reqMain = 'DepartmentComplaints';
     this.selectStatus = this.ticketservice.body.extra4;
     this.deptName = this.ticketservice.body.extra5; // this.deptName;
     this.selectUser = this.ticketservice.body.extra3;
     this.sideMenuSelected = this.globals.gsideMenuSelected;
     this.itemsPerPage = 15;
     this.getDetails();
     if (this.rightToAll === 'Y') {
       this.getDeptName();
       this.loadSubjects();
     } else {
       this.getDeptName();
       this.sideMenuSelected = this.globals.gsideMenuSelected;
       this.loadSubjects();
     }
   } else {
     this.ticketservice.body.reqMain = 'Inbox';
     this.sideMenuSelected = this.globals.gsideMenuSelected;
     this.getDetails();
   }
   //  console.log(this.selectUser);
   this.getDeptUsers();
 }

 keydownEvent(event:any) {
   if (event.key === 'Enter') {
     this.getHeader();
   }
 }

 /** *** find previous page Url and rounting**** */
 backNavigation() {
   //  this.router.navigate(['RequestTracker']);
   if (this.isTicketList) {
     this.isTicketDetails = false;
     if (this.sideMenuSelected === 'reports') {
       this.router.navigate(['/ClientServerCommon/filter-tickets']);
     } else {
       this.router.navigate(['/ClientServerCommon/RequestTracker']);
     }
     // this.isTicketList = false;
   } else {
     this.getHeader();
     this.isTicketDetails = false;
     this.isTicketList = true;
   }
 }

 /** *** find and set header value**** */
 getHeader() {
   //  this.ngOnInit();
   if (this.sideMenuSelected === 'inbox') {
     this.ticketservice.body.reqMain = 'Inbox';
     this.header = 'MY INBOX';
     this.getDetails();
   } else if (this.sideMenuSelected === 'outbox') {
     this.ticketservice.body.reqMain = 'Outbox';
     this.header = 'SEND ITEMS';
     this.getDetails();
   } else if (this.sideMenuSelected === 'unassigned') {
     this.ticketservice.body.reqMain = 'Unassigned';
     this.header = 'NEW REQUESTS';
     this.getDetails();
   } else if (this.sideMenuSelected === 'pendings') {
     this.ticketservice.body.reqMain = 'MyPendings';
     this.header = 'MY NEW TICKETS';
     this.getDetails();
   } else if (this.sideMenuSelected === 'overdue') {
     this.header = 'OVERDUE';
     this.ticketservice.body.reqMain = 'Overdue';
     this.getDetails();
   } else if (this.sideMenuSelected === 'trash') {
     this.header = 'TRASH';
     this.ticketservice.body.reqMain = 'Trash';
     this.getDetails();
   } else if (this.sideMenuSelected === 'approval') {
     this.ticketservice.body.reqMain = 'Approved';
     this.header = 'APPROVED TICKETS';
     this.getDetails();
   } else if (this.sideMenuSelected === 'apprpendings') {
     this.ticketservice.body.reqMain = 'MyApprovalPendings';
     this.header = 'APPROVAL PENDINGS';
     this.getDetails();
   } else if (this.sideMenuSelected === 'rejected') {
     this.ticketservice.body.reqMain = 'Rejected';
     this.header = 'REJECTED TICKETS';
     this.getDetails();
   } else if (this.sideMenuSelected === 'deptTicket') {
     this.header = 'MY DEPARTMENT TICKETS';
     this.ticketservice.body.reqMain = 'DepartmentComplaints';
     this.ticketservice.body.extra4 = this.selectStatus;
     this.ticketservice.body.extra5 = this.deptName; // this.deptName;
     this.ticketservice.body.extra3 = this.selectUser;
     this.getDetails();
     this.loadSubjects();
   } else if (this.sideMenuSelected === 'reports') {
     this.header = 'TICKET REPORTS';
     // this.itemsPerPage = 15;
     this.ticketservice.body.reqMain = 'TicketFiltersDetailsSubjectwise';
     this.ticketservice.body.extra4 = this.selectStatus;
     this.ticketservice.body.extra5 = this.deptName;
     this.ticketservice.body.extra3 = this.selectUser;
     this.getDetails();
   } else {
     this.header = 'SEND ITEMS';
   }
   // this.ngOnInit();
 }

 loadSubjects() {
   this.ticketservice.body.reqMain = 'GetlDeptJDS';
   this.ticketservice.body.dept = this.deptName;
   this.ticketservice.getBody(this.ticketservice.body).subscribe((result:any) => {
     this.subjects = result;
   }, (err:any) => {
   });
 }

  listlen = 0;

  /** *** find table details list **** */
  getDetails() {
    this.ticketservice.body.subject = this.subject;
    this.ticketservice.body.extra1 = this.changeFinalDateFormat(this.fromdate, 'dd-MMM-yyyy');
    this.ticketservice.body.extra2 = this.changeFinalDateFormat(this.todate, 'dd-MMM-yyyy');
    this.progressval = 'indeterminate';
    //  console.log(this.ticketservice.body);
    this.ticketservice.getBody(this.ticketservice.body).subscribe((result:any) => {
      // console.log(result);
      this.progressval = '';
      this.checklist = result;
      this.listlen = this.checklist.length;
    }, (err:any) => {
      this.progressval = '';
    });
  }

  getReports() {
    this.ticketservice.body.reqMain = 'TicketFiltersDetailsSubjectwise';
    this.selectStatus = this.ticketservice.body.extra4;
    this.deptName = this.ticketservice.body.extra5;
    this.selectUser = this.ticketservice.body.extra3;
    this.getDetails();
  }

  /** *** find user  rights departments **** */
  getDeptName() {
    let dept = [];
    this.ticketservice.body.reqMain = 'DeptRightsToUser';
    this.ticketservice.getBody(this.ticketservice.body).subscribe((result:any) => {
      // console.log(result);
      dept = result;
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < dept.length; i++) {
        //  if (this.deptName !== dept[i].deptname) {
        this.deptNames.push(dept[i].deptname);
        // } else {
        // console.log(dept[i].deptname);
        // }
      }
    }, (err:any) => {
    });
  }

  /** *** find deptpartment users**** */
  getDeptUsers() {
    this.UserNames = [];
    let deptUsers = [];
    this.ticketservice.body.reqMain = 'ListofDeptMembersForDept';
    this.ticketservice.body.extra5 = this.selectDept;
    this.ticketservice.getBody(this.ticketservice.body).subscribe((result:any) => {
      // console.log(result);
      deptUsers = result;
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < deptUsers.length; i++) {
        if (this.deptName !== deptUsers[i].username) {
          this.UserNames.push(deptUsers[i].username);
        } else {
          // console.log(dept[i].deptname);
        }
      }
    }, (err:any) => {
    });
  }

  itemPerPage(value:any) {
    this.itemsPerPage = value;
  }

  /** ***Ticket Details**** */
  ticketDetails(ticketId:any) {
    this.header = 'TICKET DETAILS';
    this.globals.gTrnNo = ticketId;
    this.isTicketDetails = true;
    this.isTicketList = false;
  }

  sort(property:any) {
    this.isDesc = !this.isDesc;
    this.column = property;
    this.direction = this.isDesc ? 1 : -1;
  }

  changeCount(value:any) {
    this.itemsPerPage = value;
  }

  searchView() {
    if (this.isSearch === false) {
      this.isFilter = true;
      this.isSearch = true;
    } else {
      this.isSearch = false;
    }
  }

  onDeptChange(event:any) {
    this.ticketservice.body.extra5 = event.value;
    this.selectDept = event.value;
    this.subject = 'ALL';
    this.ticketservice.body.reqMain = 'DepartmentComplaints';
    this.getDetails();
    this.loadSubjects();
    this.getDeptUsers();
  }

  onSubjChange(event:any) {
    // this.ticketservice.body.subject = event;
    this.ticketservice.body.subject = event.value;
    this.ticketservice.body.reqMain = 'DepartmentComplaints';
    this.getDetails();
  }

  onStatusChange(event:any) {
    if (this.sideMenuSelected === 'reports') {
      this.ticketservice.body.reqMain = 'TicketFiltersDetailsSubjectwise';
    } else {
      this.ticketservice.body.reqMain = 'DepartmentComplaints';
    }
    this.ticketservice.body.extra4 = event.value;
    this.getDetails();
  }

  onUserChange(event:any) {
    if (this.sideMenuSelected === 'reports') {
      this.ticketservice.body.reqMain = 'TicketFiltersDetailsSubjectwise';
    } else {
      this.ticketservice.body.reqMain = 'DepartmentComplaints';
    }
    this.ticketservice.body.extra3 = event.value;
    this.getDetails();
  }

  changeFinalDateFormat(startDate:any, format:any): any {
    const locale = 'en-US';
    const date = formatDate(startDate, format, locale);
    return date;
  }

  exportAsXLSX() {
    if (this.checklist.length > 0) {
      const excelList2 = JSON.stringify(this.checklist);
      this.misService.exportAsExcelFile(JSON.parse(excelList2), 'Tickets');
    }
  }
}
