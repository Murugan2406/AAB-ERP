/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-return-assign */
/* eslint-disable no-use-before-define */
/* eslint-disable max-classes-per-file */
/* eslint-disable class-methods-use-this */
/* eslint-disable max-len */
/* eslint-disable array-callback-return */
/* eslint-disable no-plusplus */
/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */

import {
  Component, OnInit, OnDestroy, Inject,
} from '@angular/core';
import { SubSink } from 'subsink';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { WebcamImage } from 'ngx-webcam';
import Swal from 'sweetalert2';
import CryptoJS from 'crypto-js';
import { Globals } from 'src/app/globals';
import { InventoryService } from '../services/inventory.service';
import { AuthourizedService } from '../services/authourized.service';
import { FaceapicrossverifyComponent } from '../faceapicrossverify/faceapicrossverify.component';
import { FaceapiService } from '../services/faceapi.service';

export interface CommonDialogData {
  dialogType: string;
  data: string;
  authorityFlg: string;
  smsCaption: string;
  keyCaption: string;
}

@Component({
  selector: 'app-common-authourity',
  templateUrl: './common-authourity.component.html',
  styleUrls: ['./common-authourity.component.scss'],
})

export class CommonAuthourityComponent implements OnInit, OnDestroy {
  constructor(
private globals: Globals,
public dialogRef: MatDialogRef<CommonAuthourityComponent>,
private service: AuthourizedService,
    @Inject(MAT_DIALOG_DATA) public dialogData: CommonDialogData,
private faceservice: FaceapiService,
private invservice: InventoryService,
    private matDialog: MatDialog,
  ) {
    this.faceservice.apiUrl = this.globals.gApiserver;
    this.keyClientUrl = this.globals.gApiserver;
    this.invservice.apiUrl = this.globals.gApiserver;
    this.Usr = this.globals.gUsrid;
    this.brcode = this.globals.gBrcodeString;
    // this.mainOption = dialogData.dialogType;
    if (this.globals.gclientServer === 'Client') {
      this.otpClientUrl = this.globals.gServerApiUrl;
    } else {
      this.otpClientUrl = this.globals.gApiserver;
    }
  }

  pwUsr = '';

  private subs = new SubSink();

 progressval = '';

  isType: string;

 isOption = '';

 mainOption = '';
 // Common  // Nill   // Otp  // Key // Face

  ApprUsrs = [];

 Usr: string;

 brcode: string;

 otpClientUrl: string;

 keyClientUrl: string;

  authName = '';

 authMob: string;

 authValue: string;

 authKey: string;

 userImg = '';

  checkData = 'Check';

  isError = '';

 isSend = true;

 actionView = 'key';

 feedbackMsg = '';

 errMsg = '';

  public webcamImage: WebcamImage = null;

  public Authdata: AuthPermission = new AuthPermission();

  public faceOption = 'Both' // FaceOnly // PasswordOnly //Both

  public faceVerify = ''; // Success // Failed

  public passwrd = '';

 finalEmpcode = '';

 ngOnInit() {
   this.pwUsr = this.globals.Pwrusr;
   this.mainOption = 'ALL';
   this.getApprUsrs();
   // this.loadPermissionType();
   if (this.faceOption === 'PasswordOnly') {
     this.faceVerify = 'Success';
   } else {
     this.faceVerify = '';
   }
   setTimeout(() => {
     document.getElementById('authority')?.focus();
   }, 1000);
 }

 loadPermissionType() {
   this.progressval = 'indeterminate';
   this.subs.add(this.invservice.getapprovalReqTwo({
     reqMainreq: 'RightsForComponent',
     raFlag: '0',
     aprStatus: this.globals.gmainMenuSelected,
     Usr: this.globals.gUsrid,
     reqfromDTAP: '0',
     reqfromIp: '0',
     TrnNo: '0',
     brcode: this.globals.gBrcode,
     appby: '0',
     splreason: '0',
     extra1: '0',
     extra2: '0',
     extra3: '0',
   }).subscribe((result: any[]) => {
     this.progressval = '';
     let data = [];
     data = result;
     if (data.length > 0) {
       if (data[0].StatusMsg === 'Success') {
         // eslint-disable-next-line prefer-destructuring
         this.Authdata = data[0];
         if (data[0].AllRights === 'Yes') {
           this.mainOption = 'ALL';
         } else if (data[0].NoAuth === 'Yes') {
           this.isType = 'Nill';
         } else if (data[0].Otp === 'Yes' && data[0].KeyAuth === 'No' && data[0].Face === 'No') {
           this.mainOption = 'OTPONLY';
         } else if (data[0].Otp === 'No' && data[0].KeyAuth === 'Yes' && data[0].Face === 'No') {
           this.mainOption = 'KEYONLY';
         } else if (data[0].Otp === 'No' && data[0].KeyAuth === 'No' && data[0].Face === 'Yes') {
           this.mainOption = 'FACEONLY';
           this.isOption = 'Face';
         } else if (data[0].Otp === 'No' && data[0].KeyAuth === 'No' && data[0].Face === 'No') {
           this.isType = 'Nill';
         } else {
           this.mainOption = 'ALL';
         }
       }
     } else {
       this.isType = 'Nill';
     }
   }, (err: any) => { this.progressval = ''; }));
 }

 ngOnDestroy() {
   this.subs.unsubscribe();
 }

 getApprUsrs() {
   this.progressval = 'indeterminate';
   // tslint:disable-next-line: max-line-length
   this.subs.add(this.service.getOtpValidation(
     this.globals.gApiserver,
     'ApprovedByUsers',
     this.dialogData.authorityFlg,
     '0',
     this.Usr,
     '0',
     '0',
     this.dialogData.data,
     this.brcode,
     '0',
     '0',
     '0',
     '0',
     '0',
   ).subscribe((data: any[]) => {
     this.progressval = '';
     this.ApprUsrs = data;
   }, (err: any) => this.progressval = ''));
 }

 handleImage(webcamImage: WebcamImage) {
   this.webcamImage = webcamImage;
   this.isError = '';
 }

 retakepicture() {
   this.progressval = '';
   this.checkData = '';
   this.feedbackMsg = '';
   this.isError = '';
   this.webcamImage = null;
 }

  faceId1 = '';

 empcode = '';

  faceId2 = '';

  changeAuthourity(event: string) {
    this.empcode = event;
    this.faceId1 = '';
    this.faceId2 = '';
    this.actionView = 'key';
    this.isError = '';
    this.authMob = this.ApprUsrs.find((x) => x.empcode === event).mobileno;
    this.authName = this.ApprUsrs.find((x) => x.empcode === event).empname;
    this.userImg = this.ApprUsrs.find((x) => x.empcode === event).FaceImage;
    this.faceId1 = this.ApprUsrs.find((x) => x.empcode === event).faceId1;
    const AuthReq = this.ApprUsrs.find((x) => x.empcode === event).AuthReqYN;
    this.passwrd = '';
    // const AuthReq = 'Yes';
    if (AuthReq === 'Yes') {
      this.isType = 'Common';
    } else {
      this.isType = 'Nill';
    }

    this.loadPermissionType();
  }

  selOption = '';

  checkAuthority(option: string) {
    this.passwrd = '';
    this.selOption = option;
    this.isError = '';
    this.actionView = 'key';
    if (this.authMob === undefined || this.authMob === null) {
      this.getError('AUTHORITY', 'Select authourity name');
    } else if (option === 'Otp') {
      this.getOtp();
    } else if (option === 'Face') {
      this.isOption = option;
    } else {
      this.getKey();
    }
  }

  getOtp() {
    this.actionView = 'key'; this.isError = '';
    let otpData = [];
    this.progressval = 'indeterminate';
    // tslint:disable-next-line: max-line-length
    this.subs.add(this.service.getOtpValidation(this.globals.gServerApiUrl, 'GetOTP', this.dialogData.smsCaption, '0', this.Usr, '0', '0', '0', this.brcode, '0', '0', '0', this.authMob, this.dialogData.data).subscribe((data: any[]) => {
      this.progressval = '';
      otpData = data;
      if (otpData.length > 0) {
        if (otpData[0].result === 'OK') {
          this.isOption = 'Otp';
          this.isSend = false;
          this.authKey = otpData[0].Otpkey;
          this.actionView = 'value';
          setTimeout(() => {
            this.isSend = true;
          }, 1000);
        } else if (otpData[0].result !== 'OK') {
          this.getError('OTPLimits', 'You reached allowed otp limits');
        }
      } else if (otpData.length === 0) {
        this.getError('GETOTP', ' Otp request failed');
      }
    }, (err: any) => {
      this.getError('OTPSERVER', ' Server error otp request failed');
    }));
  }

  verifyOtp() {
    this.isSend = true; this.isError = '';
    let List = [];
    this.progressval = 'indeterminate';
    // tslint:disable-next-line: max-line-length
    this.subs.add(this.service.getOtpValidation(this.globals.gServerApiUrl, 'verifyOTP', this.dialogData.smsCaption, '0', this.Usr, '0', '0', '0', this.brcode, '0', this.authKey, this.authValue, this.authMob, this.dialogData.data).subscribe((data: any[]) => {
      this.progressval = '';
      List = data;
      if (List.length > 0) {
        if (List[0].StatusMsg === 'Success') {
          this.checkData = 'Success';
          this.feedbackMsg = 'Otp validation Success';
          setTimeout(() => {
            this.dialogRef.close({
              event: List[0].StatusMsg,
              data: this.dialogData.data,
              approvalAuthname: this.authName,
              empcode: this.empcode,
            });
          }, 700);
        } else if (List[0].StatusMsg !== 'Success') {
          this.checkData = 'Failed';
          this.feedbackMsg = 'Invalid Otp';
        }
      } else if (List.length === 0) {
        this.checkData = 'Failed';
        this.feedbackMsg = 'Otp validation failed';
      }
    }, (err: any) => this.getError('OTPVALIDATE', 'Server error otp validation failed')));
  }

  getKey() {
    this.actionView = 'key'; this.isError = '';
    let List = [];
    this.progressval = 'indeterminate';
    // tslint:disable-next-line: max-line-length
    this.subs.add(this.service.getKeyValidation(
      this.keyClientUrl,
      'GetAuthKeyword',
      this.dialogData.keyCaption,
      this.globals.gTerCode,
      '0',
      '0',
      this.brcode,
      '0',
      '0',
      '0',
      '0',
      this.Usr,
      '0',
      '0',
      '0',
    ).subscribe((result: any[]) => {
      this.progressval = '';
      List = result;
      if (List.length > 0) {
        if (List[0].statusMsg === 'Success') {
          this.isOption = 'Key';
          this.authKey = List[0].UsethisKeyword;
          this.actionView = 'value';
        } else {
          this.getError('GETKEY', 'Get key failed try again !!!');
        }
      } else {
        this.getError('GETKEY', ' Get key failed try again !!!');
      }
    }, (err: any) => {
      this.getError('KEYSERVER', ' Server error get  Key failed');
    }));
  }

  verifyKey() {
    this.isError = '';
    let List = [];
    this.progressval = 'indeterminate';
    // tslint:disable-next-line: max-line-length
    this.subs.add(this.service.getKeyValidation(
      this.keyClientUrl,
      'VerifyYourKey',
      this.dialogData.keyCaption,
      this.globals.gTerCode,
      '0',
      '0',
      this.brcode,
      '0',
      '0',
      '0',
      '0',
      this.Usr,
      '0',
      this.authKey,
      this.authValue,
    ).subscribe((data: any[]) => {
      this.progressval = '';
      List = data;
      if (List.length > 0) {
        if (List[0].statusMsg === 'Success') {
          this.checkData = 'Success';
          this.feedbackMsg = 'Key validation success';
          setTimeout(() => {
            this.dialogRef.close({
              event: List[0].statusMsg,
              approvalAuthname: this.authName,
              empcode: this.empcode,
              data: this.dialogData.data,
            });
          }, 700);
        } else if (List[0].statusMsg !== 'Success') {
          this.checkData = 'Failed';
          this.feedbackMsg = 'Key validation failed';
        }
      } else if (List.length === 0) {
        this.checkData = 'Failed';
        this.feedbackMsg = 'Key validation failed';
      }
    }, (err: any) => this.getError('KEYVALIDATE', 'Server error key validation failed')));
  }

  enterAuthvalue(event: { key: string; }) {
    if (event.key === 'Enter') {
      this.submit();
    }
  }

  facepwdKeyPress() {
    this.checkData = '';
    this.feedbackMsg = '';
    this.errMsg = '';
    this.isError = '';
  }

  enterfacePwd(event: { key: string; }) {
    if (event.key === 'Enter') {
      this.dosubmit();
    }
  }

  getPasswordValidate() {
    if (this.passwrd === '' || this.passwrd === undefined || this.passwrd === null) {
      this.checkData = 'Failed';
      this.feedbackMsg = 'Enter valid password';
    } else {
      let empid = '';
      if (this.faceOption === 'PasswordOnly') {
        empid = this.empcode;
        this.getPwdVerifyApireq(empid);
      } else if (this.empcode === this.finalEmpcode) {
        empid = this.finalEmpcode;
        this.getPwdVerifyApireq(empid);
      } else {
        this.isError = 'IMAGE';
        this.checkData = 'Failed';
        this.errMsg = 'Invalid User Selected';
      }
    }
  }

  getPwdVerifyApireq(empid: string) {
    this.passwrd = CryptoJS.AES.encrypt(this.passwrd.trim(), this.globals.varLetBigIntFloat.trim()).toString();
    this.progressval = 'indeterminate';
    this.subs.add(this.faceservice.pwdVerify({
      username: empid, pwd: this.passwrd, pwdNew: '0', brcode: '0', statusmsg: 'ManagerUserPwdVerify',
    }).subscribe((result: any) => {
      const resData: any = result;
      if (resData.length > 0) {
        if (resData[0].result === 'Success') {
          if (this.faceOption === 'PasswordOnly') {
            this.faceResult();
          } else {
            this.saveFaceid();
          }
        } else {
          this.passwrd = '';
          this.progressval = ''; this.isError = 'IMAGE';
          this.checkData = 'Failed';
          this.errMsg = resData[0].result;
        }
      } else {
        this.passwrd = '';
        this.progressval = ''; this.isError = 'IMAGE';
        this.checkData = 'Failed';
        this.errMsg = 'Password verification failed..';
      }
    }, (err: any) => {
      this.passwrd = '';
      this.progressval = ''; this.isError = 'IMAGE';
      this.checkData = 'Failed';
      this.errMsg = 'Password verification failed..';
    }));
  }

  submit() {
    if (this.authName === undefined || this.authName === null) {
      this.getError('AUTHORITY', 'Select authourity name');
    } else if (this.isOption === 'Otp') {
      if (this.authValue === undefined || this.authValue === null) {
        this.getError('OTP', 'Enter the Otp');
      } else {
        this.verifyOtp();
      }
    } else if (this.isOption === 'Face') {
      if (this.faceOption === 'PasswordOnly') {
        this.getPasswordValidate();
      } else if (this.userImg === null || this.userImg === '') {
        this.getError('IMAGE', 'User Image register first....');
      } else if (this.webcamImage === null) {
        this.getError('IMAGE', 'Take a picture using web cam....');
      } else if (this.faceVerify === 'Success') {
        this.getPasswordValidate();
      } else if (this.faceId1 === 'N') {
        this.detectFace1();
      } else {
        this.detectFace2();
      }
    } else if (this.authValue === undefined || this.authValue === null) {
      this.getError('PASSWORD', 'Enter valid key password....');
    } else {
      this.verifyKey();
    }
  }

  dosubmit() {
    if (this.isType === 'Common') {
      this.submit();
    } else if (this.authName === undefined || this.authName === null) {
      this.getError('AUTHORITY', 'Select authourity name');
    } else {
      this.dialogRef.close({
        event: 'Success',
        data: this.dialogData.data,
        approvalAuthname: this.authName,
        empcode: this.empcode,
      });
    }
  }

  detectFace1() {
    this.isSend = true; this.isError = '';
    this.progressval = 'indeterminate';
    this.subs.add(this.faceservice.scanImage(this.userImg).subscribe((result: any) => {
      this.progressval = '';
      const dataFromPromise1: any = result;
      if (dataFromPromise1.length > 0) {
        this.faceId1 = dataFromPromise1[0].faceId;
        this.detectFace2();
      } else {
        this.isError = 'IMAGE';
        this.progressval = '';
        this.checkData = 'Failed';
        this.feedbackMsg = 'No face is detected. Please take picture with face.';
      }
    }, (err: any) => {
      this.progressval = '';
      this.isError = 'IMAGE';
      this.checkData = 'Failed';
      this.feedbackMsg = 'Face api connection failed...';
    }));
  }

  detectFace2() {
    this.isSend = true; this.isError = '';
    this.progressval = 'indeterminate';
    this.subs.add(this.faceservice.scanImage(this.webcamImage.imageAsDataUrl).subscribe((result: any) => {
      this.progressval = '';
      const dataFromPromise2: any = result;
      if (dataFromPromise2.length > 0) {
        this.faceId2 = dataFromPromise2[0].faceId;
        this.getFaceVerify();
      } else {
        this.progressval = ''; this.isError = 'IMAGE';
        this.checkData = 'Failed';
        this.errMsg = 'No face is detected. Please take picture with face.';
      }
    }, (err: any) => {
      this.isError = 'IMAGE';
      this.progressval = '';
      this.checkData = 'Failed';
      this.errMsg = 'Face api connection failed...';
    }));
  }

  getFaceVerify() {
    this.isSend = true; this.isError = '';
    const reqBody = {
      faceId1: this.faceId1,
      faceId2: this.faceId2,
    };
    this.passwrd = '';
    let resData: any = [];
    this.faceservice.getFaceVerify(JSON.stringify(reqBody)).subscribe((result: any) => {
      this.progressval = '';
      resData = result;
      if (resData.confidence >= 0.5) {
        this.finalEmpcode = this.empcode;
        this.faceVerify = 'Success';
        if (this.faceOption === 'FaceOnly') {
          this.saveFaceid();
        }
      } else {
        this.isError = 'IMAGE';
        this.progressval = '';
        this.checkData = 'Failed';
        this.errMsg = 'Face validation failed';
      }
    }, (err: any) => {
      this.isError = 'IMAGE';
      this.progressval = '';
      this.checkData = 'Failed';
      this.errMsg = 'Face api connection failed...';
    });
  }

  saveFaceid() {
    this.progressval = 'indeterminate';
    this.subs.add(this.invservice.getapprovalReqTwo({
      reqMainreq: 'SaveFaceIdForEmpcode',
      raFlag: this.finalEmpcode,
      aprStatus: this.faceId1,
      Usr: this.globals.gUsrid,
      reqfromDTAP: this.globals.gmainMenuSelected,
      reqfromIp: '0',
      TrnNo: this.dialogData.data,
      brcode: this.globals.gBrcode,
      appby: '0',
      splreason: '0',
      extra1: '0',
      extra2: this.dialogData.smsCaption,
      extra3: this.webcamImage.imageAsDataUrl,
    }).subscribe((result: any) => {
      this.faceResult();
    }, (err: any) => {
      this.faceResult();
    }));
  }

  matDialogRef: MatDialogRef<FaceapicrossverifyComponent>;

  openFaceVerifyHistory() {
    this.matDialogRef = this.matDialog.open(FaceapicrossverifyComponent, {
      disableClose: true,
      hasBackdrop: false,
      width: '100vw',
      minWidth: '99vw',
      maxHeight: '99vh',
      panelClass: 'my-full-screen-dialog',
    });
  }

  faceResult() {
    this.progressval = '';
    this.checkData = 'Success';
    this.feedbackMsg = 'validation success';
    setTimeout(() => {
      this.dialogRef.close({
        event: 'Success',
        data: this.dialogData.data,
        approvalAuthname: this.authName,
        empcode: this.empcode,
      });
    }, 800);
  }

  getError(option: string, err: string) {
    this.progressval = '';
    this.isError = option;
    this.errMsg = err;
  }

  cancel() {
    this.dialogRef.close({ event: 'Cancel' });
  }
}

export class AuthPermission {
  AllRights: any;

  ComponentName: any;

  Face: any;

  GmainMenuValue: any;

  KeyAuth: any;

  NoAuth: any;

  Otp: any;
}
