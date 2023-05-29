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
import {
  FormGroup, FormControl, Validators, FormBuilder,
} from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MisReportService } from 'src/app/updatation/services/mis-report.service';
import { TicketService } from 'src/app/updatation/services/ticket.service';
import { BillDetails } from 'src/app/updatation/services/BillDetails';
import { formatDate } from '@angular/common';
import { WebcamImage } from 'ngx-webcam';
import { SubSink } from 'subsink';
import { debounceTime } from 'rxjs';
import { Globals } from 'src/app/globals';

@Component({
  selector: 'app-create-ticket',
  templateUrl: './create-ticket.component.html',
  styleUrls: ['./create-ticket.component.css'],
})

export class CreateTicketComponent implements OnInit {
  progressval = '';

  subs = new SubSink();

  constructor(public globals: Globals, private router: Router, private ticketService: TicketService, private reportService: MisReportService) {
    this.profileForm = new FormGroup({
      html: new FormControl(),
      reqto: new FormControl('', Validators.required),
      subject: new FormControl('', Validators.required),
      prority: new FormControl('', Validators.required),
      branch: new FormControl(''),
      brcode: new FormControl(''),
    });

    if (this.globals.gclientServer === 'Client') {
      this.globals.gApiserverBOTH = this.globals.gServerApiUrl;
      this.ticketService.apiURL = this.globals.gApiserverBOTH;
      this.reportService.apiUrl = this.globals.gServerApiUrl;
    } else {
      this.globals.gApiserverBOTH = this.globals.gApiserver;
      this.ticketService.apiURL = this.globals.gApiserverBOTH;
      this.reportService.apiUrl = this.globals.gApiserver;
      this.profileForm.controls.branch.addValidators(Validators.required);
      this.profileForm.controls.brcode.addValidators(Validators.required);

      this.profileForm.controls.branch.setValue(globals.gBrname);
      this.profileForm.controls.brcode.setValue(globals.gBrcode);
    }

    this.subs.add(this.profileForm.controls.branch.valueChanges.pipe(debounceTime(600)).subscribe((data) => {
      if (data) {
        this.loadDatas('BranchSearch', '0', data, '0', '0', '0', '0', '0', '0', '0', '0', '0', '0');
      }
    }));
  }

  get f() { return this.profileForm.controls; }

  isCreateTicket = false;

 isCreateSubject = false;

 dept: any;

  isEditSubject = false;

 isDeleteSubject = false;

 header = '';

  editsub: any;

  modalalert: any;

  reqto: any;

 subject: any;

 prority: any;

 fileName: any;

 fileType: any;

  urlnew: any = [];

 JDS: any = [];

 dataList: any = [];

 DepartMents: any = [];

 billsDetailslist: any = [];

  groupList: any = [];

 saleTypes: any = [];

 approvedNames: any = [];

 reasonList: any = [];

  prorities = ['High', 'Low', 'Medium', 'Critical'];

  submitted = false;

 isAttachFiles = false;

 isBillDetails = false;

 isModalalert = false;

  html: any;

  billDetail: BillDetails = new BillDetails();

  profileForm: FormGroup;

  billForm!: FormGroup;

  today: Date = new Date();

  isTicketAlart = false;

 ticketAlart: any;

 billaltList: any = [];

  Cardtype = '';

 cardno = '';

 trnDate = '';

 trnId = '';

 cardAmt = '';

  altbillNo = '';

 altbilldate = '';

 altbillamt: any = '';

  config: any = {
    height: '200px',
    toolbar: false,
  };

  isToolBar = false;

  editorConfig: any = {
    height: '200px',
    toolbar: [
      ['misc', ['codeview', 'undo', 'redo']],
      ['font', ['bold', 'italic', 'underline', 'strikethrough', 'superscript', 'subscript', 'clear']],
      ['fontsize', ['fontname', 'fontsize', 'color']],
      ['para', ['style0', 'ul', 'ol', 'paragraph', 'height']],
      ['insert', ['table', 'picture', 'link', 'hr']],
      ['customButtons', ['testBtn']],
    ],
  };

  public webcamImage: WebcamImage | any;

  captureImage: any = [];

  brList: any = [];

  ngOnInit() {
    this.ticketService.body.usr = this.globals.gUsrid;
    this.ticketService.body.brcode = this.globals.gBrcodeString;
    this.ticketService.Create.usr = this.globals.gUsrid;
    this.ticketService.Create.brcodeWhReq = this.globals.gBrcodeString;
    if (this.globals.gsideMenuSelected === 'deleteSubject') {
      this.isDeleteSubject = true;
      this.header = 'DELETE SUBJECT';
      this.getAllDepartMents();
    } else if (this.globals.gsideMenuSelected === 'editSubject') {
      this.isEditSubject = true;
      this.header = 'EDIT SUBJECT';
      this.getAllDepartMents();
    } else if (this.globals.gsideMenuSelected === 'createSubject') {
      this.header = 'CREATE SUBJECT';
      this.isCreateSubject = true;
      this.getAllDepartMents();
    } else {
      this.isCreateTicket = true;
      this.header = 'CREATE TICKET';
      this.getAllDepartMents();
    }
  }

  loadDatas(reqmain: any, brcode: any, extra1: any, extra2: any, extra3: any, extra4: any, extra5: any, extra6: any, extra7: any, extra8: any, extra9: any, extra10: any, extra11: any) {
    this.progressval = 'indeterminate';
    this.subs.add(this.reportService.datareqsarnEight({
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
      this.progressval = '';
      const val = result;
      if (reqmain == 'BranchSearch') { this.brList = val; }
    }, (err: any) => {
      this.progressval = '';
    }));
  }

  getAllDepartMents() {
    if (this.globals.gsideMenuSelected === 'createTicket') {
      this.ticketService.body.reqMain = 'GetAllDepartments';
    } else {
      this.ticketService.body.reqMain = 'GetAllDepartments';
    }
    this.ticketService.getBody(this.ticketService.body).subscribe((result: any) => {
      // console.log(result);
      this.DepartMents = result;
    }, (err: any) => {
    });
  }

  changeToolOption() {
    if (this.isToolBar) {
      this.isToolBar = false;
    } else {
      this.isToolBar = true;
    }
  }

  /** ****** get the subjactJds ********* */
  onChange(deviceValue: any) {
    this.profileForm.controls.branch.reset();
    this.profileForm.controls.brcode.reset();
    this.isBillDetails = false;

    this.ticketService.body.reqMain = 'GetlDeptJDS';
    this.ticketService.body.dept = deviceValue.value;
    this.ticketService.getBody(this.ticketService.body).subscribe((result: any) => {
      this.JDS = result;
    }, (err: any) => {
    });
  }

  onChangeDept(event: any) {
    this.dept = event.value;

    // console.log(this.subject);
  }

  onChangeSubject(event: any) {
    this.subject = event.value;
    // console.log(this.subject);
  }

  /** ****** find the subjactJds use fill details ********* */
  onJds(listofjds: any) {
    this.profileForm.controls.branch.reset();
    this.profileForm.controls.brcode.reset();
    this.subject = listofjds.value;
    if (this.subject === 'BILL CANCEL') {
      this.isBillDetails = true;
    } else if (this.subject === 'CARD TO CASH') {
      this.isBillDetails = true;
    } else if (this.subject === 'CASH TO CARD') {
      this.isBillDetails = true;
    } else {
      this.isBillDetails = false;
    }
  }

  selectbybranch(event: any) {
    const brcode: any = this.brList.find((e: any) => e.brname == event).brcode;
    this.profileForm.controls.brcode.setValue(brcode);
  }

  totamt = 0;

  getTotalamt() {
    let tot = 0;
    this.billaltList.forEach((e: any) => {
      tot += Number(e.TrnAmt);
    });
    this.totamt = Number(tot.toFixed(2));
  }

  /** ****** find the saleTtype, Approved User and Reasons ********* */
  getbillDetails() {
    this.AltBillNoReq = '';
    this.billaltList = JSON.parse(JSON.stringify(this.billsDetailslist));
    this.getTotalamt();

    const format = 'yyyy-MM-dd';
    const myDate = this.today;
    const locale = 'en-US';
    this.billDetail.TrnDate = formatDate(myDate, format, locale);
    this.altbilldate = formatDate(myDate, format, locale);
    this.trnDate = formatDate(myDate, format, locale);
    this.ticketService.body.reqMain = 'SaleType';
    this.ticketService.getBody(this.ticketService.body).subscribe((result: any) => {
      this.saleTypes = result;
    }, (err: any) => {
    });
    this.ticketService.body.reqMain = 'ApprovedBy';
    this.ticketService.body.extra5 = this.globals.gBrcodeString;
    this.ticketService.getBody(this.ticketService.body).subscribe((result: any) => {
      this.approvedNames = result;
    }, (err: any) => {
    });
    this.ticketService.body.reqMain = 'Reasons';
    if (this.subject === 'BILL CANCEL') {
      this.ticketService.body.extra5 = 'BillCancelReasons';
      this.getList();
    } else if (this.subject === 'CARD TO CASH') {
      this.ticketService.body.extra5 = 'BillCancelReasons';
      this.getList();
    } else {
      this.ticketService.body.extra5 = 'BillCancelReasons';
      this.getList();
    }
  }

  /** ****** find the Reasons ********* */
  getList() {
    if (this.ticketService.body.reqMain === 'Reasons') {
      this.ticketService.getBody(this.ticketService.body).subscribe((result: any) => {
        this.reasonList = result;
      }, (err: any) => {
      });
    } else {
      this.ticketService.getBody(this.ticketService.body).subscribe((result: any) => {
        if (result.length === 0) {
          this.billDetail.TrnAmt = null;
          this.isModalalert = true;
          this.modalalert = 'Fill the valid Sales Type, Date and Bill Number';
        } else if (result[0].result === 'OK') {
          this.billDetail.TrnAmt = result[0].InvAmt;
          this.isModalalert = false;
        } else {
          this.billDetail.TrnAmt = null;
          this.isModalalert = true;
          this.modalalert = result[0].result;
        }
      }, (err: any) => {
        //  console.log(err);
        this.isModalalert = true;
        this.modalalert = 'Fill the valid Sale Type, Date and Bill Number';
      });
    }
  }

  getcheckbill() {
    if (this.subject === 'BILL CANCEL') {
      if (this.billaltList.length <= 0) {
        this.getDetailsSubmit();
      } else {
        Swal.fire({ text: 'One bill only allow for bill cancel...' });
      }
    } else {
      this.getDetailsSubmit();
    }
  }

  AltBillNoReq = '';

  /** ******* submit the bill details ************* */
  getDetailsSubmit() {
    if (this.billDetail.TrnType === 'select' || this.billDetail.TrnType === undefined) {
      Swal.fire({ text: 'select the sales Type....' });
    } else if (this.billDetail.TrnDate === undefined) {
      Swal.fire({ text: 'select the Date...' });
    } else if (this.billDetail.TrnNo === undefined) {
      Swal.fire({ text: 'Enter the Bill Number...' });
    } else if (this.billDetail.TrnAprUsr === 'select' || this.billDetail.TrnAprUsr === undefined) {
      Swal.fire({ text: 'select the ApprovalBy Name...' });
    } else if (this.billDetail.Reason === 'select' || this.billDetail.Reason === undefined) {
      Swal.fire({ text: 'select the Reason...' });
    } else if (this.billDetail.TrnAmt === undefined || this.billDetail.TrnAmt === null) {
      Swal.fire({ text: 'Bill Amount is Required...' });
    } else {
      this.isModalalert = false;
      const obj = {
        TrnType: this.billDetail.TrnType,
        TrnDate: this.billDetail.TrnDate,
        TrnNo: this.billDetail.TrnNo,
        TrnAmt: this.billDetail.TrnAmt,
        TrnAprUsr: this.billDetail.TrnAprUsr,
        Reason: this.billDetail.Reason,
        Extra1: '0',
        Extra2: '0',
      };
      this.billaltList.push(obj);
      this.AltBillNoReq = this.reasonList.find((x: any) => x.ReasonNames == this.billDetail.Reason).AltBillNoReq;
      this.getTotalamt(); this.billDetail.TrnNo = ''; this.billDetail.TrnAmt = '';
      // this.billDetail = new BillDetails();
    }
  }

  getModalvalues() {
    if (this.subject === 'BILL CANCEL') {
      if (this.AltBillNoReq == 'Y') {
        if (this.altbilldate === '' || this.altbilldate === undefined || this.altbilldate === null) {
          Swal.fire({ text: 'Enter alternate bill date..' });
        } else if (this.altbillNo === '' || this.altbillNo === undefined || this.altbillNo === null) {
          Swal.fire({ text: 'Enter alternate bill no..' });
        } else if (this.altbillamt === '' || this.altbillamt === undefined || this.altbillamt === null) {
          Swal.fire({ text: 'Enter alternate bill amount..' });
        } else {
          this.billsDetailslist = this.billaltList;
          (<HTMLInputElement>document.getElementById('clsbtn')).click();
          // document.getElementById('clsbtn').click();
        }
      } else {
        this.altbillNo = ''; this.altbillamt = '';
        this.billsDetailslist = this.billaltList;
        (<HTMLInputElement>document.getElementById('clsbtn')).click();
        //  document.getElementById('clsbtn').click();
      }
    } else if (this.subject === 'CASH TO CARD') {
      if (this.cardAmt === '' || this.cardAmt === undefined || this.cardAmt === null) {
        Swal.fire({ text: 'Enter card amount..' });
      } else if (this.cardno === '' || this.cardno === undefined || this.cardno === null) {
        Swal.fire({ text: 'Enter card no..' });
      } else if (this.Cardtype === '' || this.Cardtype === undefined || this.Cardtype === null) {
        Swal.fire({ text: 'Enter card type..' });
      } else if (this.trnId === '' || this.trnId === undefined || this.trnId === null) {
        Swal.fire({ text: 'Enter trn id..' });
      } else if (this.trnDate === '' || this.trnDate === undefined || this.trnDate === null) {
        Swal.fire({ text: 'Enter trn date..' });
      } else {
        const cardtrnamt = Number(this.cardAmt);
        if (cardtrnamt === this.totamt) {
          this.billsDetailslist = this.billaltList;
          // document.getElementById('clsbtn').click();
          (<HTMLInputElement>document.getElementById('clsbtn')).click();
        } else {
          Swal.fire({ text: 'Card amount not tally to total bill amount..' });
        }
      }
    } else {
      this.billsDetailslist = this.billaltList;
      // document.getElementById('clsbtn').click();
      (<HTMLInputElement>document.getElementById('clsbtn')).click();
    }
  }

  closeModal() {
    this.isModalalert = false;
    this.billDetail = new BillDetails();
  }

  /** ****** remove the bill detail ************* */
  removeBillDetail(index: any) {
    this.billaltList.splice(index, 1);
    this.getTotalamt();
  }

  /** ********** find the bill amount **************** */
  getamount() {
    this.isModalalert = false;
    this.ticketService.body.reqMain = 'GetBillAmtForBillNo';
    this.ticketService.body.brcode = this.globals.gBrcodeString;
    this.ticketService.body.extra2 = this.subject;
    this.ticketService.body.extra3 = this.billDetail.TrnType;
    this.ticketService.body.extra4 = this.billDetail.TrnNo;
    this.ticketService.body.extra5 = this.billDetail.TrnDate;
    this.getList();
  }

  getAtramount() {
    this.ticketService.body.reqMain = 'GetBillAmtForBillNo';
    this.ticketService.body.brcode = this.globals.gBrcodeString;
    this.ticketService.body.extra2 = this.subject;
    this.ticketService.body.extra3 = this.billDetail.TrnType;
    this.ticketService.body.extra4 = this.altbillNo;
    this.ticketService.body.extra5 = this.altbilldate;
    this.ticketService.getBody(this.ticketService.body).subscribe((result: any) => {
      if (result.length === 0) {
        this.billDetail.TrnAmt = null;
        this.isModalalert = true;
        this.modalalert = 'Fill the valid Sales Type, Date and Bill Number';
      } else if (result[0].result === 'OK') {
        this.altbillamt = result[0].InvAmt;
        this.isModalalert = false;
      } else {
        this.altbillamt = null;
        this.isModalalert = true;
        this.modalalert = result[0].result;
      }
    }, (err: any) => {
      //  console.log(err);
      this.isModalalert = true;
      this.modalalert = 'Fill the valid Sale Type, Date and Bill Number';
    });
  }

  /** ********** find the prority **************** */
  onPrority(prority: any) {
    this.prority = prority.value;
  }

  /** ********** go to back url **************** */
  backNavigation() {
    this.router.navigate(['/ClientServerCommon/RequestTracker']);
  }

  /** *********** Attached multiple files Event ************** */
  handleFileInput(event: any) {
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < event.target.files.length; i++) {
      const fileExtension = event.target.files[i].name.split('.').pop();
      this.fileName = event.target.files[i].name;
      this.fileType = fileExtension;
      this.readThis(event.target.files[i]);
      const obj = {
        fileNames: this.fileName,
        fileType: this.fileType,
      };
      this.groupList.push(obj);
      // console.log(this.groupList);
    }
    this.isAttachFiles = true;
  }

  /** ********** File Reader **************** */
  readThis(fileblob: any): void {
    const file: File = fileblob;
    const myReader: FileReader = new FileReader();
    myReader.readAsDataURL(file);
    myReader.onloadend = (e) => {
      this.dataList.push(myReader.result);
      for (let j = 0; j < this.groupList.length && this.dataList.length; j++) {
        this.groupList[j].fileData = this.dataList[j];
      }
    };
  }

  /** ********** Remove selected files **************** */
  removeFile(index: any, argE: any) {
    this.groupList.splice(index, 1);
    this.dataList.splice(argE, 1);
  }

  /** ********** clear ticket details **************** */
  clear() {
    Swal.fire({ text: 'Clear Sucess' });
    this.profileForm.reset();
    this.groupList = [];
    this.billsDetailslist = [];
    this.captureImage = [];
    this.isAttachFiles = false;
    this.ticketService.Create.problemDescTxt = '0';
    this.brList = [];
    this.profileForm.controls.branch.reset();
    this.profileForm.controls.brcode.reset();
  }

  /** ************** Find the ticket detail values check valid or invalid and send create request*********************** */
  create(html: any) {
    // console.log(this.groupList);
    if (this.ticketService.body.dept === '0' || this.ticketService.body.dept === 'select'
      || this.ticketService.body.dept === '') {
      Swal.fire({ title: 'Oops...', text: 'Please select the Request to Department' });
    } else if (this.subject === 'select' || this.subject === undefined) {
      Swal.fire({ title: 'Oops...', text: 'Please select the subject' });
    } else if (this.prority === 'select' || this.prority === undefined) {
      Swal.fire({ title: 'Oops...', text: 'Please select the prority' });
    } else if (this.profileForm.controls.html.value === null) {
      Swal.fire({ title: 'Oops...', text: 'Please enter the something in comments' });
    } else if (this.profileForm.controls.html.value === '') {
      Swal.fire({ title: 'Oops...', text: 'Please enter the something in comments' });
    } else {
      this.submitted = true;
      this.ticketService.Create.dept = this.ticketService.body.dept;
      this.ticketService.Create.subjects = this.subject;
      this.ticketService.Create.reqBody = this.removeDoubleCode(html);
      this.ticketService.Create.prioritys = this.prority;
      this.ticketService.Create.problemDescTxt = this.removeImgTag(html);
      if (this.subject === 'BILL CANCEL') {
        if (this.billsDetailslist.length > 0) {
          this.appCaptureListToAttachFiles();
          this.ticketService.Create.attachmentObject = this.groupList;
          this.ticketService.Create.additionalInfo = this.billsDetailslist;
          if (this.AltBillNoReq == 'Y') {
            this.ticketService.Create.altBillno = Number(this.altbillNo);
            this.ticketService.Create.altbilldate = this.changeDateFormat(this.altbilldate, 'dd-MMM-yyyy');
            this.ticketService.Create.altbillamount = Number(this.altbillamt);
          } else {
            this.ticketService.Create.altBillno = 0;
            this.ticketService.Create.altbilldate = '';
            this.ticketService.Create.altbillamount = 0;
          }
          this.createRequest();
        } else {
          Swal.fire({ title: 'Oops...', text: 'update bill details using Add Bill Details Button!' });
        }
      } else if (this.subject === 'CARD TO CASH') {
        if (this.billsDetailslist.length > 0) {
          this.appCaptureListToAttachFiles();
          this.ticketService.Create.attachmentObject = this.groupList;
          this.ticketService.Create.additionalInfo = this.billsDetailslist;
          this.createRequest();
        } else {
          Swal.fire({ title: 'Oops...', text: 'update bill details using Add Bill Details Button!' });
        }
      } else if (this.subject === 'CASH TO CARD') {
        if (this.billsDetailslist.length > 0) {
          this.appCaptureListToAttachFiles();
          this.ticketService.Create.attachmentObject = this.groupList;
          this.ticketService.Create.additionalInfo = this.billsDetailslist;
          this.ticketService.Create.cardno = Number(this.cardno);
          this.ticketService.Create.cardtype = this.Cardtype;
          this.ticketService.Create.cardamount = Number(this.cardAmt);
          this.ticketService.Create.cardtrnno = Number(this.trnId);
          this.ticketService.Create.cardtrndate = this.changeDateFormat(this.trnDate, 'dd-MMM-yyyy');

          this.createRequest();
        } else {
          Swal.fire({ title: 'Oops...', text: 'update bill details using Add Bill Details Button!' });
        }
      } else {
        this.appCaptureListToAttachFiles();
        this.ticketService.Create.attachmentObject = this.groupList;
        this.createRequest();
      }
    }
  }

  /** ******** call that create ticket request request ********* */
  createRequest() {
    if (this.globals.gclientServer === 'Server') {
      if (this.profileForm.controls.brcode.invalid) {
        Swal.fire({ text: 'Select location..' });
      } else {
        if (this.profileForm.controls.brcode.value) {
          this.ticketService.Create.cardtype = this.profileForm.controls.branch.value;
          this.ticketService.Create.cardno = this.profileForm.controls.brcode.value;
        }
        this.getSaveTicket();
      }
    } else {
      this.getSaveTicket();
    }
  }

  getSaveTicket() {
    this.progressval = 'indeterminate';

    let Ticketresult = [];
    // console.log(this.ticketService.Create);
    this.ticketService.getTracker(this.ticketService.Create).subscribe((result: any) => {
      Ticketresult = result;
      //  console.log(Ticketresult);
      if (Ticketresult[0].result !== 'Success') {
        this.progressval = '';
        Swal.fire('Error !', 'Ticket not created', 'error');
      } else {
        this.progressval = '';
        Swal.fire({ text: 'Your Ticket has been Created' });
        this.profileForm.reset();
        this.groupList = [];
        this.isAttachFiles = false;
        this.billsDetailslist = [];
        this.captureImage = [];
        this.ticketService.Create.problemDescTxt = '0';
        this.AltBillNoReq = '';
        this.brList = [];
      }
    }, (err: any) => {
      this.progressval = '';
    });
  }

  handleImage(webcamImage: WebcamImage) {
    // console.log(webcamImage);
    this.webcamImage = webcamImage;
  }

  addCaptureImage() {
    // console.log('Capture Image');
    // console.log(this.webcamImage.imageData);
    this.captureImage.push(this.webcamImage.imageAsDataUrl);
    this.webcamImage = null;
  }

  appCaptureListToAttachFiles() {
    const fName = 'Image';
    const fType = 'jpeg';
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.captureImage.length; i++) {
      const obj = {
        fileNames: `${fName + i}.jpg`,
        fileType: fType,
        fileData: this.captureImage[i],
      };
      this.groupList.push(obj);
      // console.log(this.groupList);
    }
  }

  removeSnapshot() {
    this.webcamImage = null;
  }

  removeCaptureImage(index: any) {
    // console.log(this.captureImage);
    this.captureImage.splice(index, 1);
  }

  closeCaptureImage() {
    this.webcamImage = null;
  }

  createSubject() {
    if (this.dept === undefined || this.dept === 'select') {
      Swal.fire('Error !', 'Select subject', 'error');
    } else if (this.editsub === undefined) {
      Swal.fire('Error !', 'enter new subject', 'error');
    } else {
      this.ticketService.body.reqMain = 'CreateNewSubject';
      this.ticketService.body.extra4 = this.dept;
      this.ticketService.body.extra5 = this.editsub;
      //  console.log(this.ticketService.body);
      this.ticketService.getBody(this.ticketService.body).subscribe((result: any) => {
        Swal.fire('Done !', 'Create Your Subject Success !', 'success');
        this.editsub = undefined;
        // console.log(this.JdsList);
      }, (err: any) => {
        Swal.fire('Error !', 'subject not created', 'error');
      });
    }
  }

  updateSubject() {
    if (this.subject === undefined || this.subject === 'select') {
      Swal.fire('Error !', 'Select subject', 'error');
    } else if (this.ticketService.body.dept === 'select') {
      Swal.fire('Error !', 'Select Department', 'error');
    } else if (this.editsub === undefined) {
      Swal.fire('Error !', 'enter new subject', 'error');
    } else {
      this.ticketService.body.reqMain = 'EditSubject';
      this.ticketService.body.extra4 = this.ticketService.body.dept;
      this.ticketService.body.extra5 = this.editsub;
      this.ticketService.body.extra3 = this.subject;
      //  console.log(this.ticketService.body);
      this.ticketService.getBody(this.ticketService.body).subscribe((result: any) => {
        Swal.fire('Done !', 'Update Subject Success !', 'success');
        this.editsub = undefined;
        //  this.subject = 'select';
        // console.log(this.JdsList);
        this.ngOnInit();
      }, (err: any) => {
        Swal.fire('Error !', 'subject not changed', 'error');
      });
    }
  }

  deleteSubject() {
    if (this.subject === undefined || this.subject === 'select') {
      Swal.fire('Error !', 'Select subject', 'error');
    } else if (this.ticketService.body.dept === 'select') {
      Swal.fire('Error !', 'Select Department', 'error');
    } else {
      this.ticketService.body.reqMain = 'DeleteSubject';
      this.ticketService.body.extra4 = this.ticketService.body.dept;
      this.ticketService.body.extra5 = this.subject;
      //  console.log(this.ticketService.body);
      this.ticketService.getBody(this.ticketService.body).subscribe((result: any) => {
        Swal.fire('Done !', 'Delete Subject Success!', 'success');
        this.subject = undefined;
        this.ngOnInit();
        // console.log(this.JdsList);
      }, (err: any) => {
        Swal.fire('Error !', 'subject not deleted', 'error');
      });
    }
  }

  removeImgTag(html: any) {
    let content = html;
    content = content.replace(/<img[^>]*>/g, '');
    content = content.replace(/<br>/g, '');
    content = content.replace(/['"]+/g, '');
    content = content.replace(/['”]+/g, '');
    content = content.replace(/['“]+/g, '');
    //  console.log(content);
    return content;
  }

  removeDoubleCode(html: any) {
    let content = html;
    content = content.replace(/'/g, '&#39;');
    content = content.replace(/['"]+/g, '');
    content = content.replace(/['”]+/g, '');
    content = content.replace(/['“]+/g, '');
    // console.log(content);
    return content;
  }

  changeValueNumeric(event: any, id: any): any {
    if (event.keyCode >= 48 && event.keyCode <= 57) {
      return true;
    } if (event.keyCode === 46) {
      if (id === 'AltBillamt') {
        if (this.altbillamt.indexOf('.') > -1) { return false; } return true;
      }
      if (id === 'CardAmt') {
        if (this.cardAmt.indexOf('.') > -1) { return false; } return true;
      }
    } else {
      return false;
    }
  }

  changeDateFormat(startDate: any, format: any): any {
    const locale = 'en-US';
    return formatDate(startDate, format, locale);
  }
}
