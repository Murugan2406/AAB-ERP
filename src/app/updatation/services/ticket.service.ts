/* eslint-disable no-tabs */
/* eslint-disable no-empty-function */
/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
/* eslint-disable import/prefer-default-export */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-useless-constructor */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Globals } from 'src/app/globals';

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  approvalAuth = '';

  assignAuthority = '';

  userDept = '';

  apiURL = '0';

  constructor(private http: HttpClient, private globals: Globals) { }

  body = {
    reqMain: '0',
    usr: '',
    dept: '0',
    subject: '0',
    reqBody: '0',
    reqfromIp: '0',
    attachmentIfany: '0',
    brcode: '',
    extra1: '0',
    extra2: '0',
    extra3: '0',
    extra4: '0',
    extra5: '0',
  };

  Create = {
    usr: '',
    brcode: '',
    dept: '0',
    subjects: '0',
    cardtype: '',
    cardno: 0,
    cardamount: 0,
    cardtrnno: 0,
    cardtrndate: '',
    altBillno: 0,
    altbilldate: '',
    altbillamount: 0,
    reqBody: '0',
    problemDescTxt: '0',
    reqfromIp: '0',
    brcodeWhReq: '',
    prioritys: '0',
    ccTo: '0',
    othIfany: 'Nill',
    attachmentObject:	[{}],
    additionalInfo: [{}],
  };

  getBody(body): any {
    return this.http.post(
      `${this.apiURL}/api/myRequest`,
      JSON.stringify(body),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'x-api-key': this.globals.TmpCdeFedG,
        },
      },
    );
  }

  getTracker(body): any {
    //  console.log(body);
    return this.http.post(
      `${this.apiURL}/api/reqtracker`,
      JSON.stringify(body),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'x-api-key': this.globals.TmpCdeFedG,
        },
      },
    );
  }

  sendReply(body) {
    // console.log(JSON.stringify(body));
    return this.http.post(
      `${this.apiURL}/api/reqtrackreply`,
      JSON.stringify(body),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'x-api-key': this.globals.TmpCdeFedG,
        },
      },
    );
  }
}
