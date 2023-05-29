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
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Location, DatePipe } from '@angular/common';
import { MisReportService } from 'src/app/updatation/services/mis-report.service';
import { TicketService } from 'src/app/updatation/services/ticket.service';
import { TicketDetails } from 'src/app/updatation/services/ticketDetails';
import { WebcamImage } from 'ngx-webcam';
import { Globals } from 'src/app/globals';

@Component({
  selector: 'app-ticket-details',
  templateUrl: './ticket-details.component.html',
  styleUrls: ['./ticket-details.component.css'],
})
export class TicketDetailsComponent implements OnInit {
  progressval = '';

  constructor(
private location: Location,
private globals: Globals,
              private ticketservice: TicketService,
private route: ActivatedRoute,
  ) {
    this.replyForm = new FormGroup({
      replyHtml: new FormControl('', Validators.required),
      toUser: new FormControl('', Validators.required),
    });
    // tslint:disable-next-line: align
    if (this.globals.gclientServer === 'Client') {
      this.globals.gApiserverBOTH = this.globals.gServerApiUrl;
      this.ticketservice.apiURL = this.globals.gApiserverBOTH;
    } else {
      this.globals.gApiserverBOTH = this.globals.gApiserver;
      this.ticketservice.apiURL = this.globals.gApiserverBOTH;
    }
  }

  get f() {
    return this.replyForm.controls;
  }

  approvalAuth = '';

  multiRights = '';

  viewOption = true;

 removable = true;

 reply = false;

 isAttachFiles = false;

  replyForm: FormGroup;

  ticketDetail: TicketDetails = new TicketDetails() ;

  ticketDetailsList:any = [];

 attachFiles:any = [];

 Names:any = [];

  assignUsr: any;

 fileName: any;

 fileType: any;

 toUsr: any;

 fromUser: any;

  dataList:any = [];

 groupList: any = [];

 replyFiles:any = [];

  additionalInfo:any = [];

  menuOption: any;

 apprOption: any;

 viewsubIdFile: any;

  reason: any;

 ticketid: any;

  assignButton = [
    { type: 'Assing To User', value: 'user' },
    { type: 'Approve and Assign to Department', value: 'department' },
  ];

  assignChoice: any;

  toolbar: any = {
    height: '200px',
    config: [
      ['style', ['style']],
      ['font', ['bold', 'italic', 'underline', 'clear']],
      ['fontname', ['fontname']],
      ['color', ['color']],
      ['para', ['ul', 'ol', 'paragraph']],
      ['height', ['height']],
      ['table', ['table']],
      ['insert', ['link', 'picture', 'hr']],
      ['view', ['fullscreen', 'codeview']],
      ['help', ['help']],
    ],
  };

  isToolbar = false;

  config: any = {
    height: '200px',
    toolbar: false,
  };

  public webcamImage: WebcamImage|any = null;

  captureImage:any = [];

  ngOnInit() {
    this.ticketservice.body.usr = this.globals.gUsrid;
    this.ticketservice.body.brcode = this.globals.gBrcodeString;
    this.ticketservice.Create.usr = this.globals.gUsrid;
    this.ticketservice.Create.brcodeWhReq = this.globals.gBrcodeString;
    this.approvalAuth = this.ticketservice.approvalAuth;
    this.multiRights = this.ticketservice.assignAuthority;
    // console.log(this.approvalAuth);
    this.fromUser = this.globals.usrCaption;
    this.menuOption = this.globals.gsideMenuSelected;
    this.ticketid = this.globals.gTrnNo;
    // console.log('MENU : '+this.menuOption);
    // console.log('RIGHTS : '+this.multiRights);

    this.getDelailsById();
  }

  getDelailsById() {
    this.ticketservice.body.reqMain = 'GetTicketDetailsUsingTID';
    this.ticketservice.body.extra5 = this.ticketid;
    this.progressval = 'indeterminate';
    this.ticketservice.getBody(this.ticketservice.body).subscribe((result:any) => {
      this.progressval = '';
      this.ticketDetailsList = result;
      // console.log(this.ticketDetailsList);
      const index = this.ticketDetailsList.length - 1;
      this.ticketDetail = this.ticketDetailsList[index];
      // console.log(this.ticketDetail);
      this.toUsr = this.ticketDetail.CreatedUser;
      if (this.ticketDetail.subjectJd === 'CARD TO CASH' || 'CASH TO CARD') {
        this.getAdditionalInfo();
      } else if (this.ticketDetail.subjectJd === 'BILL CANCEL') {
        this.getAdditionalInfo();
      } else {
      }
    }, (err:any) => {
      this.progressval = '';
    });
  }

  /** ********** Toolbar view or disable **************** */
  changeToolOption() {
    if (this.isToolbar) {
      this.isToolbar = false;
    } else {
      this.isToolbar = true;
    }
  }

  /** ********** Change Assign Type **************** */
  changeAssignType(event:any) {
    this.assignChoice = event.value;
    if (this.assignChoice === 'user') {
      this.ticketservice.body.reqMain = 'ListofDeptMembersToAssign';
      this.getUsers();
    } else {
      this.ticketservice.body.reqMain = 'GetAllDepartments';
      this.getUsers();
    }
  }

  /** *** get the Additional Information Ex(billdetails) ***** */
  getAdditionalInfo() {
    this.ticketservice.body.reqMain = 'GetAdditionalInfoUsingTID';
    this.ticketservice.body.extra4 = this.ticketDetail.subId;
    this.progressval = 'indeterminate';
    this.ticketservice.getBody(this.ticketservice.body).subscribe((result:any) => {
      this.progressval = '';
      this.additionalInfo = result;
    }, (err:any) => {
      this.progressval = '';
    });
  }

  /** *** go to back url ***** */
  backNavigation() {
    this.location.back();
  }

  /** ****** get Assign users names ******** */
  getUsers() {
    this.ticketservice.getBody(this.ticketservice.body).subscribe((result:any) => {
      this.Names = result;
      // console.log( this.Names);
    }, (err:any) => {
    });
  }

  /** ****** view multiple replies ******** */
  viewReplyCard() {
    if (this.reply === true) {
      this.reply = false;
    } else {
      this.reply = true;
    }
  }

  /** ****** download attached files ******** */
  downloadFile(filename:any, filedata:any) {
    const linkSource = filedata;
    const downloadLink = document.createElement('a');
    const fileName = filename;
    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
  }

  /** ****** select assign user ******** */
  onChange(event:any) {
    this.assignUsr = event.value;
  }

  /** ****** assign ticket selected user ******** */
  assign() {
    if (this.ticketDetail.statusCmp === 'Rejected') {
      Swal.fire({ title: 'Oops...', text: 'Ticket is rejected do not assign any user' });
    } else if (this.assignUsr === 'select') {
      Swal.fire({ title: 'Oops...', text: 'Please select the User or department!' });
    } else if (this.assignUsr === undefined) {
      Swal.fire({ title: 'Oops...', text: 'Please select the User or department!' });
    } else {
      Swal.fire({
        title: 'Are you sure ?',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#fa8100',
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
      }).then((result) => {
        this.ticketservice.body.extra5 = this.ticketid;
        this.ticketservice.body.extra3 = this.assignUsr;
        if (result.value) {
          if (this.assignChoice === 'user') {
            this.ticketservice.body.reqMain = 'AssignToUser';
            this.assignRequest();
          } else {
            this.ticketservice.body.reqMain = 'AssignToDept';
            this.assignRequest();
          }
        }
      });
    }
  }

  /** *** send Assign Request ****** */
  assignRequest() {
    this.progressval = 'indeterminate';
    this.ticketservice.getBody(this.ticketservice.body).subscribe((body:any) => {
      this.progressval = '';
      Swal.fire('Done!', 'ticket has been assigned success.', 'success');
      this.ngOnInit();
    }, (err:any) => {
      this.progressval = '';
      Swal.fire({ position: 'center', text: err });
    });
  }

  /** **** file handle event ********* */
  handleFileInput(event:any) {
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
    }
    this.isAttachFiles = true;
  }

  /** **** file read and convert blob to base64 ********* */
  readThis(fileblob:any): void {
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

  /** * Remove selected files ** */
  removeFile(index:any, argE:any) {
    this.groupList.splice(index, 1);
    this.dataList.splice(argE, 1);
  }

  /** * Reply Send ** */
  sendReply(reply:any) {
    if (this.replyForm.invalid) {
      Swal.fire('Oops..', ' Comment box is empty enter comment in a box', 'error');
    } else if (this.replyForm.controls.replyHtml.value === null) {
      Swal.fire('Oops..', ' enter comment in a comment box', 'error');
    } else if (this.replyForm.controls.replyHtml.value === '') {
      Swal.fire('Oops..', ' enter comment in a comment box', 'error');
    } else if (this.replyForm.controls.replyHtml.value === undefined) {
      Swal.fire('Oops..', ' enter comment in a comment box', 'error');
    } else {
      this.appCaptureListToAttachFiles();
      // console.log(this.removeQuotation(reply));
      this.ticketservice.Create.reqBody = this.removeQuotation(reply);
      this.ticketservice.Create.attachmentObject = this.groupList;
      this.ticketservice.Create.othIfany = this.ticketid;

      this.ticketservice.sendReply(this.ticketservice.Create).subscribe((result) => {
        const res:any = result;
        if (res[0].result === 'Success') {
          Swal.fire({
            position: 'center',

            title: 'Your status has been Updated',
            showConfirmButton: false,
            timer: 1500,
          });
          this.getDelailsById();
          this.replyForm.reset();
          this.groupList = [];
          this.captureImage = [];
          this.reply = false;
        } else {
          Swal.fire({ position: 'center', text: res[0].result });
        }
      }, (err) => {
        Swal.fire({ position: 'center', text: err });
      });
    }
  }

  removeQuotation(str:any):any {
    return str.replace(/'/g, '&#39;');
  }

  /** **** Change Status ***** */
  statusChange(status:any) {
    this.ticketservice.body.reqMain = 'ChangeStatus';
    this.ticketservice.body.extra4 = status;
    Swal.fire({
      title: 'Are you sure?',
      text: 'You wan\'t be able to status change this!',

      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#fa8100',
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.value) {
        this.ticketservice.body.extra5 = this.ticketid;
        this.progressval = 'indeterminate';
        this.ticketservice.getBody(this.ticketservice.body).subscribe((body:any) => {
          this.progressval = '';
          Swal.fire('Done..!', 'Your ticket status has been changed.', 'success');
          this.ngOnInit();
        }, (err:any) => {
          this.progressval = '';
          Swal.fire({ title: 'Oops...', text: 'Doen\'t change status !' });
        });
        this.ngOnInit();
      }
    });
  }

  /** ** View Attachment Files **** */
  viewReplyFiles(subId:any, ticketid:any) {
    // console.log(this.isAttachFiles);
    if (this.isAttachFiles === true) {
      this.isAttachFiles = false;
    } else {
      this.isAttachFiles = true;
      this.ticketservice.body.reqMain = 'GetAttachmentUsingTID';
      this.ticketservice.body.extra4 = subId;
      this.ticketservice.body.extra5 = ticketid;
      this.progressval = 'indeterminate';
      this.ticketservice.getBody(this.ticketservice.body).subscribe((result:any) => {
        this.progressval = '';
        this.replyFiles = result;
        // console.log(this.replyFiles);
        // tslint:disable-next-line: prefer-for-of
        for (let i = 0; i < this.replyFiles.length; i++) {
          if (subId === this.replyFiles[i].subId) {
            this.viewsubIdFile = this.replyFiles[i].subId;
          } else {
            // console.log('files not found');
          }
        }
      }, (err:any) => {
        this.progressval = '';
        // console.log(err);
      });
    }
  }

  /** **** Change Options ****** */
  optionDetails() {
    this.viewOption = true;
  }

  /** *** Choose Reply ****** */
  optionReply() {
    this.viewOption = false;
  }

  /** ****** Send Approval Request ********** */
  sendApprRequest() {
    if (this.assignUsr === 'select') {
      Swal.fire({ title: 'Oops...', text: 'Please select the User!' });
    } else if (this.assignUsr === undefined) {
      Swal.fire({ title: 'Oops...', text: 'Please select the User!' });
    } else {
      this.ticketservice.body.extra5 = this.ticketid;
      this.ticketservice.body.extra3 = this.assignUsr;
      this.ticketservice.body.reqMain = 'SentToApproval';
      this.progressval = 'indeterminate';
      this.ticketservice.getBody(this.ticketservice.body).subscribe((result:any) => {
        this.progressval = '';
        Swal.fire('Done!', 'Approval Request has been send successful', 'success');
        this.backNavigation();
      }, (err:any) => {
        this.progressval = '';
        Swal.fire('Oops..', 'Approval Request not send', 'error');
      });
    }
  }

  /** ****** Change Approval Status ********** */
  apprStatus(status:any, comment:any) {
    this.ticketservice.body.extra3 = status;
    this.ticketservice.body.extra4 = comment;
    this.ticketservice.body.extra5 = this.ticketid;
    this.ticketservice.body.extra2 = this.ticketDetail.fromUsr;
    this.ticketservice.body.reqMain = 'Approve_Given_ID';
    this.progressval = 'indeterminate';
    this.ticketservice.getBody(this.ticketservice.body).subscribe((result:any) => {
      this.progressval = '';
      Swal.fire('Done!', '', 'success');
      this.backNavigation();
    }, (err:any) => {
      this.progressval = '';
      Swal.fire('Oops..', 'something error', 'error');
    });
  }

  /** ** Approval Authorites Names **** */
  getApprovalAuthorites() {
    this.ticketservice.body.reqMain = 'ApprovalAuthoritesToIDS';
    this.ticketservice.getBody(this.ticketservice.body).subscribe((result:any) => {
      this.Names = result;
    }, (err:any) => {
    });
  }

  openAttachFiles(data:any) {
    window.open(data);
  }

  /** ** Remove Ticket **** */
  removeTicket() {
    let deleteResult = [];
    this.ticketservice.body.reqMain = 'Delete';
    this.ticketservice.body.extra5 = this.ticketid;
    Swal.fire({
      title: 'Are you sure?',
      text: 'You wan\'t be able to Delete this ticket!',

      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#fa8100',
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.value) {
        // tslint:disable-next-line: prefer-for-of
        this.ticketservice.body.extra5 = this.ticketid;
        this.progressval = 'indeterminate';
        this.ticketservice.getBody(this.ticketservice.body).subscribe((body:any) => {
          this.progressval = '';
          deleteResult = body;
          if (deleteResult[0].result === 'Success') {
            Swal.fire('Done!', 'Your ticket has been Delete.', 'success');
            // this.backNavigation();
          } else {
            Swal.fire({ title: 'Oops...', text: deleteResult[0].result });
          }
        }, (err:any) => {
          this.progressval = 'indeterminate';
          Swal.fire({ title: 'Oops...', text: 'Doen\'t delete the Ticket!' });
        });
      }
    });
  }

  handleImage(webcamImage: WebcamImage) {
    //  console.log(webcamImage);
    this.webcamImage = webcamImage;
  }

  addCaptureImage() {
    //  console.log('Capture Image');
    //  console.log(this.webcamImage.imageData);
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
      //  console.log(this.groupList);
    }
  }

  removeSnapshot() {
    this.webcamImage = null;
  }

  removeCaptureImage(index:any) {
    //  console.log(this.captureImage);
    this.captureImage.splice(index, 1);
  }

  closeCaptureImage() {
    this.webcamImage = null;
  }
}
