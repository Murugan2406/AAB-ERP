/* eslint-disable linebreak-style */
/* eslint-disable camelcase */
/* eslint-disable no-useless-concat */
/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable no-empty-function */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
/* eslint-disable linebreak-style */
/* eslint-disable no-useless-constructor */
/* eslint-disable import/prefer-default-export */
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Globals } from 'src/app/globals';

@Injectable({
  providedIn: 'root',
})
export class InventoryService {
  constructor(private http: HttpClient, private globals: Globals) { }

  dcraiseBranch: any = '';

 dcraise_brcode: any = '';

  apiUrl = '';

  inventry = {
    ReqMain: 'BranchSelection',
    ReqSub: '0',
    TerCode: '0',
    StkWhCode: '0',
    Subcat: '0',
    Cat: '0',
    icode: '0',
    phyqty: '0',
    fdate: '0',
    tdate: '0',
    usr: '0',
    var1: '0',
    var2: '0',
    var3: '0',
  };

  Approval = {
    reqMainreq: 'ApprovedByUsers',
    raFlag: 'DcDelete_ThumbApproval',
    aprStatus: '0',
    Usr: '',
    reqfromDTAP: '0',
    reqfromIp: '0',
    TrnNo: '0',
    brcode: '0',
    appby: '0',
    splreason: '',
    extra1: '0',
    extra2: '0',
    extra3: '0',
  };

  getReport(body: any): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/api/inventoryrequest`,
      JSON.stringify(body),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'x-api-key': this.globals.TmpCdeFedG,

        },
      },
    );
  }

  getCusReport(body: any): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/api/datareqrsh`,
      JSON.stringify(body),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'x-api-key': this.globals.TmpCdeFedG,

        },
      },
    );
  }

  getdatareqrsh(body: any): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/api/datareqrsh`,
      JSON.stringify(body),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'x-api-key': this.globals.TmpCdeFedG,

        },
      },
    );
  }

  getdatareqkrsh(body: any): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/api/datareqkrsh`,
      JSON.stringify(body),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'x-api-key': this.globals.TmpCdeFedG,
        },
      },
    );
  }

  datareqrachnTwo(body: any): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/api/datareqrachnTwo`,
      JSON.stringify(body),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'x-api-key': this.globals.TmpCdeFedG,

        },
      },
    );
  }

  datareqrachnThree(body: any): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/api/datareqrachnThree`,
      JSON.stringify(body),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'x-api-key': this.globals.TmpCdeFedG,

        },
      },
    );
  }

  datareqrachnFour(body: any): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/api/datareqrachnFour`,
      JSON.stringify(body),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'x-api-key': this.globals.TmpCdeFedG,

        },
      },
    );
  }

  datareqrachnSix(body: any): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/api/datareqrachnSix`,
      JSON.stringify(body),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'x-api-key': this.globals.TmpCdeFedG,

        },
      },
    );
  }

  getInvenReport(body: any): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/api/inventoryrequestv2`,
      JSON.stringify(body),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'x-api-key': this.globals.TmpCdeFedG,
        },
      },
    );
  }

  getapprovalReqJson(body: any, Url: any): Observable<any> {
    console.log(body);
    return this.http.post(
      `${Url}/api/approvalReq`,
      JSON.stringify(body),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'x-api-key': this.globals.TmpCdeFedG,
        },
      },
    );
  }

  getapprovalReqTwo(body: any): any {
    return this.http.post(
      `${this.apiUrl}/api/approvalReqTwo`,
      JSON.stringify(body),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'x-api-key': this.globals.TmpCdeFedG,
        },
      },
    );
  }

  scanTextFile(data: any): any {
    return this.http.post(
      `${this.apiUrl}/api/fileReadWriteOperation`,
      JSON.stringify(data),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'x-api-key': this.globals.TmpCdeFedG,

        },
      },
    );
  }

  getBody(body: any): any { // this.apiUrl
    // return this.http.post(
    //   'http:10.20.209.21:9000' + '/api/ipPrint',
    //   JSON.stringify(body),
    //   {
    //     headers: {
    //       'Content-Type': 'application/json',
    //       // 'x-api-key': this.globals.TmpCdeFedG

    //     },
    //   },
    // );
    return this.http.post(
      `${this.apiUrl}/api/ipPrint`,
      JSON.stringify(body),
      {
        headers: {
          'Content-Type': 'application/json',
          // 'x-api-key': this.globals.TmpCdeFedG

        },
      },
    );
  }

  JsonPayloadSngl(body: any): any {
    return this.http.post(
      `${this.apiUrl}/api/JsonPayloadSngl`,
      JSON.stringify(body),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'x-api-key': this.globals.TmpCdeFedG,
        },
      },
    );
  }

  JsonPayloadSaran1(body: any): any {
    return this.http.post(
      `${this.apiUrl}/api/JsonPayloadSaran1`,
      JSON.stringify(body),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'x-api-key': this.globals.TmpCdeFedG,
        },
      },
    );
  }

  getInventryReport(
    main: any,
    submain: any,
    Tcode: any,
    stkWhCode: any,
    subcat: any,
    brcode: any,
    itemcode: any,
    qty: any,
    date1: any,
    date2: any,
    user: any,
    Var1: any,
    Var2: any,
    Var3: any,
  ): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/api/inventoryrequest`,
      JSON.stringify({
        ReqMain: main,
        ReqSub: submain,
        TerCode: Tcode,
        StkWhCode: stkWhCode,
        Subcat: subcat,
        Cat: brcode,
        icode: itemcode,
        phyqty: qty,
        fdate: date1,
        tdate: date2,
        usr: user,
        var1: Var1,
        var2: Var2,
        var3: Var3,
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'x-api-key': this.globals.TmpCdeFedG,

        },
      },
    );
  }

  getInventryPrint(
    main: any,
    submain: any,
    Tcode: any,
    stkWhCode: any,
    subcat: any,
    brcode: any,
    itemcode: any,
    qty: any,
    date1: any,
    date2: any,
    user: any,
    Var1: any,
    Var2: any,
    Var3: any,
  ): any {
    // tslint:disable-next-line: max-line-length   this.apiUrl
    return this.http.post(
      'http://10.20.209.10:4000' + '/api/ipPrint',
      JSON.stringify({
        ReqMain: main,
        ReqSub: submain,
        TerCode: Tcode,
        StkWhCode: stkWhCode,
        Subcat: subcat,
        Cat: brcode,
        icode: itemcode,
        phyqty: qty,
        fdate: date1,
        tdate: date2,
        usr: user,
        var1: Var1,
        var2: Var2,
        var3: Var3,
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          // 'x-api-key': this.globals.TmpCdeFedG

        },
      },
    );
  }

  InventryScanFile(
    main: any,
    submain: any,
    Tcode: any,
    stkWhCode: any,
    subcat: any,
    brcode: any,
    itemcode: any,
    qty: any,
    date1: any,
    date2: any,
    user: any,
    Var1: any,
    Var2: any,
    Var3: any,
  ): any {
    // tslint:disable-next-line: max-line-length
    return this.http.post(
      `${this.apiUrl}/api/fileReadWriteOperation`,
      JSON.stringify({
        ReqMain: main,
        ReqSub: submain,
        TerCode: Tcode,
        StkWhCode: stkWhCode,
        Subcat: subcat,
        Cat: brcode,
        icode: itemcode,
        phyqty: qty,
        fdate: date1,
        tdate: date2,
        usr: user,
        var1: Var1,
        var2: Var2,
        var3: Var3,
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'x-api-key': this.globals.TmpCdeFedG,

        },
      },
    );
  }

  // GetBillDtlsForBillNo
  getBillDetails(main: any, user: any, udept: any, Subject: any, ReqBody: any, ReqfromIp: any, AttachmentIfany: any, Brcode: any, Extra1: any, Extra2: any, Extra3: any, Extra4: any, Extra5: any): any {
    return this.http.post(
      `${this.apiUrl}/api/myRequest`,
      JSON.stringify({
        reqMain: main,
        usr: user,
        dept: udept,
        subject: Subject,
        reqBody: ReqBody,
        reqfromIp: ReqfromIp,
        attachmentIfany: AttachmentIfany,
        brcode: Brcode,
        extra1: Extra1,
        extra2: Extra2,
        extra3: Extra3,
        extra4: Extra4,
        extra5: Extra5,
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'x-api-key': this.globals.TmpCdeFedG,

        },
      },
    );
  }

  datareqsarn(body: any): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/api/datareqsarn`,
      JSON.stringify(body),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'x-api-key': this.globals.TmpCdeFedG,

        },
      },
    );
  }

  datareqKarSmyOne(body: any): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/api/datareqKarSmyOne`,
      JSON.stringify(body),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'x-api-key': this.globals.TmpCdeFedG,

        },
      },
    );
  }

  datareqKarSmyThree(body: any): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/api/datareqKarSmyThree`,
      JSON.stringify(body),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'x-api-key': this.globals.TmpCdeFedG,

        },
      },
    );
  }

  getEofprocess(body: any): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/api/eofprocess`,
      JSON.stringify(body),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'x-api-key': this.globals.TmpCdeFedG,
        },
      },
    );
  }

  getEofprocessV2(body: any): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/api/eofprocessV2`,
      JSON.stringify(body),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'x-api-key': this.globals.TmpCdeFedG,
        },
      },
    );
  }

  getJsonPayloadRjs(body: any): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/api/JsonPayloadRjs`,
      JSON.stringify(body),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'x-api-key': this.globals.TmpCdeFedG,
        },
      },
    );
  }

  datareqrachn(body: any): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/api/datareqrachn`,
      JSON.stringify(body),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'x-api-key': this.globals.TmpCdeFedG,
        },
      },
    );
  }

  datareqsarnThree(body: any): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/api/datareqsarnThree`,
      body,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'x-api-key': this.globals.TmpCdeFedG,

        },
      },
    );
  }

  datareqsarnSix(body: any): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/api/datareqsarnSix`,
      body,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'x-api-key': this.globals.TmpCdeFedG,

        },
      },
    );
  }

  datareqsarnFour(body: any): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/api/datareqsarnFour`,
      body,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'x-api-key': this.globals.TmpCdeFedG,

        },
      },
    );
  }

  datareqsarnFive(body: any): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/api/datareqsarnFive`,
      body,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'x-api-key': this.globals.TmpCdeFedG,

        },
      },
    );
  }

  datareqsarnseven(body: any): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/api/datareqsarnSeven`,
      body,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'x-api-key': this.globals.TmpCdeFedG,

        },
      },
    );
  }

  // datareqsarn2(body): Observable<any> {
  //   return this.http.post(this.apiUrl + '/api/datareqsarn', body,
  //     {
  //       headers: {
  //         'Content-Type' : 'application/x-www-form-urlencoded',
  //         'x-api-key': this.globals.TmpCdeFedG

  //       }
  //     });
  //   }
}
