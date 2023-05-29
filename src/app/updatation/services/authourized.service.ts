/* eslint-disable linebreak-style */
/* eslint-disable no-plusplus */
/* eslint-disable class-methods-use-this */
/* eslint-disable comma-dangle */
/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable no-empty-function */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
/* eslint-disable linebreak-style */
/* eslint-disable no-useless-constructor */
/* eslint-disable import/prefer-default-export */
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Globals } from 'src/app/globals';

@Injectable({
  providedIn: 'root'
})
export class AuthourizedService {
  constructor(private globals: Globals, private http: HttpClient) { }

  resetData = {
    authUsr: '',
    authMob: '',
    usrType: '',
    authKey: '',
    usrMob: '',
    username: ''
  }

  getOtpValidation(
    ip: string,
    req: any,
    Flag: any,
    Status: any,
    usr: any,
    reqfrom: any,
    Ip: any,
    trnNo: any,
    branchcode: any,
    appbyusr: any,
    reason: any,
    Extra1: any,
    Extra2: any,
    Extra3: any
  ): Observable<any> {
    return this.http.post(
      `${ip}/api/approvalReq`,
      JSON.stringify({
        reqMainreq: req,
        raFlag: Flag,
        aprStatus: Status,
        Usr: usr,
        reqfromDTAP: reqfrom,
        reqfromIp: Ip,
        TrnNo: trnNo,
        brcode: branchcode,
        appby: appbyusr,
        splreason: reason,
        extra1: Extra1,
        extra2: Extra2,
        extra3: Extra3
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'x-api-key': this.globals.TmpCdeFedG
        }
      }
    );
  }

  getKeyValidation(ip: string, Req: string, Sub: string, TCode: string, StkCode: string, subcat: string, cat: string, iCode: string, Phyqty: string, Fdate: string, Tdate: string, Usr: string, Var1: string, Var2: string, Var3: string): Observable<any> {
    return this.http.post(
      `${ip}/api/inventoryrequest`,
      JSON.stringify({
        ReqMain: Req,
        ReqSub: Sub,
        TerCode: TCode,
        StkWhCode: StkCode,
        Subcat: subcat,
        Cat: cat,
        icode: iCode,
        phyqty: Phyqty,
        fdate: Fdate,
        tdate: Tdate,
        usr: Usr,
        var1: Var1,
        var2: Var2,
        var3: Var3
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'x-api-key': this.globals.TmpCdeFedG
        }
      }
    );
  }

  getValidation(ip: string, data: any): Observable<any> {
    return this.http.post(
      `${ip}/api/approvalReqThree`,
      JSON.stringify(data),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'x-api-key': this.globals.TmpCdeFedG
        }
      }
    );
  }

  getValidatinWOT(ip: string, data: any): Observable<any> {
    return this.http.post(
      `${ip}/api/approvalReqFiveWOTK`,
      JSON.stringify(data),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );
  }
}
