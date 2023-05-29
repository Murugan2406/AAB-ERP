/* eslint-disable max-len */
/* eslint-disable camelcase */
/* eslint-disable no-useless-constructor */
/* eslint-disable class-methods-use-this */
/* eslint-disable import/prefer-default-export */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
/* eslint-disable no-empty-function */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  map, timeout, debounceTime, catchError,
} from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Globals } from '../globals';

@Injectable({
  providedIn: 'root',
})
export class RecordsService {
  constructor(private http: HttpClient, private globals: Globals) { }

  private urbanpiperApiurl = '';

 smsApiurl = '';

 urpanpiperapikey = '';

  public salesManid = '';

 httpOptions2 = {
   timeout: 180000,
   headers: new HttpHeaders({
     'Content-Type': 'application/x-www-form-urlencoded',
     'x-api-key': this.globals.TmpCdeFedG,
   }),
 };

 getHRDatas(
   reqMainreq,
   fdate,
   tdate,
   bname,
   con,
   flg,
   usr,
   region,
   company,
   grcr,
   subregion,
   var2,
   var3,
   num1,
   num2,
   num3,
   oth1,
   oth2,
   oth3,
 ): any {
   return this.http.post(
     `${this.globals.gApiserver}/api/dutyRequest`,
     JSON.stringify({
       reqMainreq,
       fdate,
       tdate,
       bname,
       con,
       flg,
       usr,
       region,
       company,
       grcr,
       subregion,
       var2,
       var3,
       num1,
       num2,
       num3,
       oth1,
       oth2,
       oth3,
     }),

     this.httpOptions2,
   );
 }

 doSmsAPIAIRTEL(varBody) {
   this.urbanpiperApiurl = 'http://digimate.airtel.in:15181/BULK_API/InstantJsonPush';
   return this.http.post(this.urbanpiperApiurl, JSON.stringify(varBody));
 }

 doSmsAPI(argmobileno, argmessage) {
   // tslint:disable-next-line:max-line-length
   this.smsApiurl = `http://api.mVaayoo.com/mvaayooapi/MessageCompose?user=raj@embryobiz.com:aab@123&senderID=AABRPT&receipientno=${argmobileno}&msgtxt=${argmessage}&state=4`;
   const httpOptions = {
     headers: new HttpHeaders({
       'Content-Type': 'application/x-www-form-urlencoded',
     }),
   };
   return this.http.get(this.smsApiurl, httpOptions);
 }

 doUrbpShopenabledisable(location_ref_id, platforms, action, region, extApikey) {
   this.urpanpiperapikey = extApikey;
   this.urbanpiperApiurl = this.globals.extPltfmShopOpnClsUrl;
   // this.urbanpiperApiurl = 'https://api.urbanpiper.com/hub/api/v1/location/';

   const httpOptions = {
     headers: new HttpHeaders({
       'Content-Type': 'application/x-www-form-urlencoded',
       Authorization: this.urpanpiperapikey,
     }),
   };
   return this.http.post(
     this.urbanpiperApiurl,
     { location_ref_id, platforms, action },
     httpOptions,
   );
 }

 doUrbpitmenabledisable(location_ref_id, platforms, item_ref_ids, action, region, webApikey) {
   this.urpanpiperapikey = webApikey;
   this.urbanpiperApiurl = this.globals.extPltfmOutofStkUrl;
   // this.urbanpiperApiurl = 'https://api.urbanpiper.com/hub/api/v1/items/';

   const httpOptions = {
     headers: new HttpHeaders({
       'Content-Type': 'application/x-www-form-urlencoded',
       Authorization: this.urpanpiperapikey,
     }),
   };
   return this.http.post(
     this.urbanpiperApiurl,
     {
       location_ref_id, platforms, item_ref_ids, action,
     },
     httpOptions,
   );
 }

 // tslint:disable-next-line:variable-name ** Importent do not change new_status to newstatus
 doUrbanpiperStatusUpdate(new_status, message, extra, varMediatorId, region) {
   this.urpanpiperapikey = this.globals.urpanpiperapikey;

   this.urbanpiperApiurl = `${this.globals.extPltfmStsUpdUrl + varMediatorId}/status/`;
   // this.urbanpiperApiurl = 'https://api.urbanpiper.com/external/api/v1/orders/' + varMediatorId + '/status/';

   const httpOptions = {
     headers: new HttpHeaders({
       'Content-Type': 'application/json',
       Authorization: this.urpanpiperapikey,
     }),
   };
   return this.http.put(
     this.urbanpiperApiurl,
     { new_status, message, extra },
     httpOptions,
   );
 }

 doUrbanpiperZomatoRiderTmpUpdate(action, order_id, temp, region) {
   this.urpanpiperapikey = this.globals.urpanpiperapikey;

   this.urbanpiperApiurl = 'https://api.urbanpiper.com/external/api/v1/aggregator/zomato/feature-action/';
   const httpOptions = {
     headers: new HttpHeaders({
       'Content-Type': 'application/json',
       Authorization: this.urpanpiperapikey,
     }),
   };
   return this.http.post(
     this.urbanpiperApiurl,
     { action, order_id, temp },
     httpOptions,
   );
 }

 doUrbanpipercancel(newStatus, message, extra, varMediatorId, region) {
   this.urpanpiperapikey = this.globals.urpanpiperapikey;

   this.urbanpiperApiurl = this.globals.extPltfmOrderCancelUrl + varMediatorId;
   // this.urbanpiperApiurl = 'https://api.urbanpiper.com/api/v2/order/status/?id=' + varMediatorId;

   const httpOptions = {
     headers: new HttpHeaders({
       'Content-Type': 'application/x-www-form-urlencoded',
       Authorization: this.urpanpiperapikey,
     }),
   };
   return this.http.put(
     this.urbanpiperApiurl,
     { newStatus, message, extra },
     httpOptions,
   );
 }
 // FOOD READY : same as order cancellation

 checkStockSngOrMulVer2BOTH(MySId, ShopCode, ItemDetails) {
   const httpOptions = {
     headers: new HttpHeaders({
       'Content-Type': 'application/x-www-form-urlencoded',
       'x-api-key': this.globals.TmpCdeFedG,
     }),
   };
   return this.http.post(
     `${this.globals.gApiserverBOTH}/api/itemavailabilitycheck`,
     { MySId, ShopCode, ItemDetails },
     httpOptions,
   );
 }

 checkStockSngOrMulVer2(MySId, ShopCode, ItemDetails) {
   const httpOptions = {
     headers: new HttpHeaders({
       'Content-Type': 'application/x-www-form-urlencoded',
       'x-api-key': this.globals.TmpCdeFedG,
     }),
   };
   return this.http.post(
     `${this.globals.gApiserver}/api/itemavailabilitycheck`,
     { MySId, ShopCode, ItemDetails },
     httpOptions,
   );
 }

 checkStockSngOrMulti(ReplyWhat, itemDetails) {
   const httpOptions = {
     headers: new HttpHeaders({
       'Content-Type': 'application/x-www-form-urlencoded',
       'x-api-key': this.globals.TmpCdeFedG,
     }),
   };
   return this.http.post(
     `${this.globals.gApiserver}/api/stkChkMulti`,
     { ReplyWhat, itemDetails },
     httpOptions,
   );
 }

 getApprJson(reqMainreq, raFlag, aprStatus, Usr, reqfromDTAP, reqfromIp, TrnNo, brcode, appby, splreason, extra1, extra2, extra3) {
   const httpOptions = {
     headers: new HttpHeaders({
       'Content-Type': 'application/x-www-form-urlencoded',
       'x-api-key': this.globals.TmpCdeFedG,
     }),
   };
   return this.http.post(
     `${this.globals.gApiserverBOTH}/api/approvalReqTwo`,
     {
       reqMainreq,
       raFlag,
       aprStatus,
       Usr,
       reqfromDTAP,
       reqfromIp,
       TrnNo,
       brcode,
       appby,
       splreason,
       extra1,
       extra2,
       extra3,
     },
     httpOptions,
   );
 }

 getapprovalReqJsonBOTH(
   reqMainreq,
   raFlag,
   aprStatus,
   Usr,
   reqfromDTAP,
   reqfromIp,
   TrnNo,
   brcode,
   appby,
   splreason,
   extra1,
   extra2,
   extra3,
 ) {
   const httpOptions = {
     headers: new HttpHeaders({
       'Content-Type': 'application/x-www-form-urlencoded',
       'x-api-key': this.globals.TmpCdeFedG,
     }),
   };
   return this.http.post(
     `${this.globals.gApiserverBOTH}/api/approvalReq`,
     {
       reqMainreq,
       raFlag,
       aprStatus,
       Usr,
       reqfromDTAP,
       reqfromIp,
       TrnNo,
       brcode,
       appby,
       splreason,
       extra1,
       extra2,
       extra3,
     },
     httpOptions,
   );
 }

 getapprovalReqJson(reqMainreq, raFlag, aprStatus, Usr, reqfromDTAP, reqfromIp, TrnNo, brcode, appby, splreason, extra1, extra2, extra3) {
   const httpOptions = {
     headers: new HttpHeaders({
       'Content-Type': 'application/x-www-form-urlencoded',
       'x-api-key': this.globals.TmpCdeFedG,
     }),
   };
   return this.http.post(
     `${this.globals.gApiserver}/api/approvalReq`,
     {
       reqMainreq,
       raFlag,
       aprStatus,
       Usr,
       reqfromDTAP,
       reqfromIp,
       TrnNo,
       brcode,
       appby,
       splreason,
       extra1,
       extra2,
       extra3,
     },
     httpOptions,
   );
 }

 getapprovalReqThree(reqMainreq, raFlag, aprStatus, Usr, reqfromDTAP, reqfromIp, TrnNo, brcode, appby, splreason, extra1, extra2, extra3) {
   const httpOptions = {
     headers: new HttpHeaders({
       'Content-Type': 'application/x-www-form-urlencoded',
       'x-api-key': this.globals.TmpCdeFedG,
     }),
   };
   return this.http.post(
     `${this.globals.gApiserver}/api/approvalReqThree`,
     {
       reqMainreq,
       raFlag,
       aprStatus,
       Usr,
       reqfromDTAP,
       reqfromIp,
       TrnNo,
       brcode,
       appby,
       splreason,
       extra1,
       extra2,
       extra3,
     },
     httpOptions,
   );
 }

 getapprovalReqJsonServer(
   reqMainreq,
   raFlag,
   aprStatus,
   Usr,
   reqfromDTAP,
   reqfromIp,
   TrnNo,
   brcode,
   appby,
   splreason,
   extra1,
   extra2,
   extra3,
 ) {
   const httpOptionsServer = {
     headers: new HttpHeaders({
       'Content-Type': 'application/x-www-form-urlencoded',
       'x-api-key': this.globals.TmpCdeFedG,
     }),
   };

   return this.http.post(
     `${this.globals.gServerApiUrl}/api/approvalReq`,
     {
       reqMainreq,
       raFlag,
       aprStatus,
       Usr,
       reqfromDTAP,
       reqfromIp,
       TrnNo,
       brcode,
       appby,
       splreason,
       extra1,
       extra2,
       extra3,
     },
     httpOptionsServer,
   );
 }

 getapprovalNewJsonmodal(body): Observable<any> {
   return this.http.post(
     `${this.globals.gServerApiUrl}/api/approvalReq`,
     JSON.stringify(body),
     {
       headers: {
         'Content-Type': 'application/x-www-form-urlencoded',
         'x-api-key': this.globals.TmpCdeFedG,
       },
     },
   );
 }

 getDashboardAPI1(
   reqMainreq,
   fdate,
   tdate,
   bname,
   con,
   flg,
   usr,
   region,
   company,
   grcr,
   subregion,
   var2,
   var3,
   num1,
   num2,
   num3,
   oth1,
   oth2,
   oth3,
 ) {
   const httpOptions = {
     timeout: 180000,
     headers: new HttpHeaders({
       'Content-Type': 'application/x-www-form-urlencoded',
       'x-api-key': this.globals.TmpCdeFedG,
     }),
   };
   return this.http.post(
     `${this.globals.gApiserver}/api/dashboardver1`,
     {
       reqMainreq,
       fdate,
       tdate,
       bname,
       con,
       flg,
       usr,
       region,
       company,
       grcr,
       subregion,
       var2,
       var3,
       num1,
       num2,
       num3,
       oth1,
       oth2,
       oth3,
     },
     httpOptions,
   );
 }

 doDlyOrderCancel(MySId, ShopCode, OnlineOrderNo, reason) {
   const httpOptions = {
     headers: new HttpHeaders({
       'Content-Type': 'application/x-www-form-urlencoded',
       'x-api-key': this.globals.TmpCdeFedG,
     }),
   };
   return this.http.post(
     `${this.globals.gApiserver}/api/cancelonlineorder`,
     {
       MySId, ShopCode, OnlineOrderNo, reason,
     },
     httpOptions,
   );
 }

 doKotCancellation(TrnType, kotsno, icode, kotssno, reason, apprby, custcode, usr) {
   const httpOptions = {
     headers: new HttpHeaders({
       'Content-Type': 'application/x-www-form-urlencoded',
       'x-api-key': this.globals.TmpCdeFedG,
     }),
   };
   return this.http.post(
     `${this.globals.gApiserver}/api/doCancelKot`,
     {
       TrnType, kotsno, icode, kotssno, reason, apprby, custcode, usr,
     },
     httpOptions,
   );
 }

 doInvCancellation(brcode, gbilling, BilldateGiven, txtBillno, reason, gkthumAppBy, usr, txtalternate, reqfrom) {
   const httpOptions = {
     headers: new HttpHeaders({
       'Content-Type': 'application/x-www-form-urlencoded',
       'x-api-key': this.globals.TmpCdeFedG,
     }),
   };
   return this.http.post(
     `${this.globals.gApiserver}/api/doCancelInv`,
     {
       brcode,
       gbilling,
       BilldateGiven,
       txtBillno,
       reason,
       gkthumAppBy,
       usr,
       txtalternate,
       reqfrom,
     },
     httpOptions,
   );
 }

 doApprovalConfirm(
   MainFlag,
   IsRejectOrApprove,
   Bcode,
   TrnNoCollection,
   ApprUsr,
   ApprDatetime,
   Reason,
   TrnNoForserver,
   ApprDate,
   var1,
   var2,
   statusmsg,
 ) {
   const httpOptions = {
     headers: new HttpHeaders({
       'Content-Type': 'application/x-www-form-urlencoded',
       'x-api-key': this.globals.TmpCdeFedG,
     }),
   };
   return this.http.post(
     `${this.globals.gApiserver}/api/approvalConfirm`,
     {
       MainFlag,
       IsRejectOrApprove,
       Bcode,
       TrnNoCollection,
       ApprUsr,
       ApprDatetime,
       Reason,
       TrnNoForserver,
       ApprDate,
       var1,
       var2,
       statusmsg,
     },
     httpOptions,
   );
 }

 doRtlOrderConfirm(
   ItemDetails,
   PaymentYN,
   Paymode,
   Paidamt,
   ChqBankname,
   ChqNo,
   Chqdate,
   AmtCreditedBank,
   Usr,
   Delidate,
   Delitime,
   Spldes,
   Quoteno,
   extra1,
   extra2,
   extra3,
 ) {
   const httpOptions = {
     headers: new HttpHeaders({
       'Content-Type': 'application/x-www-form-urlencoded',
       'x-api-key': this.globals.TmpCdeFedG,
     }),
   };
   return this.http.post(
     `${this.globals.gApiserver}/api/rtlOrderConfirm`,
     {
       ItemDetails,
       PaymentYN,
       Paymode,
       Paidamt,
       ChqBankname,
       ChqNo,
       Chqdate,
       AmtCreditedBank,
       Usr,
       Delidate,
       Delitime,
       Spldes,
       Quoteno,
       extra1,
       extra2,
       extra3,
     },
     httpOptions,
   );
 }

 doKOTConfirm(towhere, name1, sup, usr, billamt, pax, WhichTerm, itemDetails, CustMobile, CustName, kotSerSno, orderno) {
   const httpOptions = {
     headers: new HttpHeaders({
       'Content-Type': 'application/x-www-form-urlencoded',
       'x-api-key': this.globals.TmpCdeFedG,
     }),
   };
   return this.http.post(
     `${this.globals.gApiserver}/api/kotOrderConfirm`,
     {
       towhere, name1, sup, usr, billamt, pax, WhichTerm, itemDetails, CustMobile, CustName, kotSerSno, orderno,
     },
     httpOptions,
   );
 }

 doInvConfirm(tblSelMethod, WhichTerm, towhere, name1, usr, fromdevice, Custcode, discPer, authBy, itemDetails, ServeType, wtrCode) {
   const httpOptions = {
     headers: new HttpHeaders({
       'Content-Type': 'application/x-www-form-urlencoded',
       'x-api-key': this.globals.TmpCdeFedG,
     }),
   };
   return this.http.post(
     `${this.globals.gApiserver}/api/invConfirm`,
     {
       tblSelMethod, WhichTerm, towhere, name1, usr, fromdevice, Custcode, discPer, authBy, itemDetails, ServeType, wtrCode,
     },
     httpOptions,
   );
 }

 doSelfInvConfirm(
   InvSelMethod,
   WhichTerm,
   saleType,
   Salesman,
   usr,
   fromdevice,
   Custcode,
   discType,
   discPer,
   authBy,
   itemDetails,
   ServeType,
   wtrCode,
   paidAmount,
   CardCqBank,
   PayThru,
   PayTrnNo,
   payInstrDate,
   orderno,
   custQtnNo,
   dlyIncharge,
   roundedOff,
   InvAmount,
   extra1,
   extra2,
   extra3,
   extra4,
   extra5,
 ) {
   const httpOptions = {
     headers: new HttpHeaders({
       'Content-Type': 'application/x-www-form-urlencoded',
       'x-api-key': this.globals.TmpCdeFedG,
     }),
   };
   return this.http.post(
     `${this.globals.gApiserver}/api/invSelfConfirmV2`,
     {
       InvSelMethod,
       WhichTerm,
       saleType,
       Salesman,
       usr,
       fromdevice,
       Custcode,
       discType,
       discPer,
       authBy,
       itemDetails,
       ServeType,
       wtrCode,
       paidAmount,
       CardCqBank,
       PayThru,
       PayTrnNo,
       payInstrDate,
       orderno,
       custQtnNo,
       dlyIncharge,
       roundedOff,
       InvAmount,
       extra1,
       extra2,
       extra3,
       extra4,
       extra5,
     },
     httpOptions,
   );
 }

 doDepositConfirm(
   datastr,
   d2000,
   d1000,
   d500,
   d200,
   d100,
   d50,
   d20,
   d10,
   d1,
   depslipno,
   bankersidproofno,
   sigdatastr,
   sigdataManstr,
   usr,
   clientip,
   mob_desc,
   bankersempname,
   brdepinchrname,
   depslipimgstr,
   depAmt,
   depdate,
 ) {
   const httpOptions = {
     headers: new HttpHeaders({
       'Content-Type': 'application/x-www-form-urlencoded',
       'x-api-key': this.globals.TmpCdeFedG,
     }),
   };
   return this.http.post(
     `${this.globals.gApiserver}/api/depositConfirm`,
     {
       datastr,
       d2000,
       d1000,
       d500,
       d200,
       d100,
       d50,
       d20,
       d10,
       d1,
       depslipno,
       bankersidproofno,
       sigdatastr,
       sigdataManstr,
       usr,
       clientip,
       mob_desc,
       bankersempname,
       brdepinchrname,
       depslipimgstr,
       depAmt,
       depdate,
     },
     httpOptions,
   );
 }

 doDepositConfirmNew(data): any {
   return this.http.post(
     `${this.globals.gApiserver}/api/depositConfirm`,
     JSON.stringify(data),
     {
       headers: {
         'Content-Type': 'application/x-www-form-urlencoded',
         'x-api-key': this.globals.TmpCdeFedG,
       },
     },
   );
 }

 // getapprovalReqJson(reqMainreq,raFlag,aprStatus,Usr,reqfromDTAP,reqfromIp,TrnNo,brcode)
 // {
 //   const httpOptions = {headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' }) };
 //   return this.http.post('/api/approvalReq',
 //   {reqMainreq,raFlag,aprStatus,Usr,reqfromDTAP,reqfromIp,TrnNo,brcode},
 //   httpOptions )
 // }

 // PROXY
 // getapprovalReqJson(reqMainreq,raFlag,aprStatus,Usr,reqfromDTAP,reqfromIp,TrnNo,brcode){
 //   return this.http.post('/api/approvalReq',{reqMainreq,raFlag,aprStatus,Usr,reqfromDTAP,reqfromIp,TrnNo,brcode})
 // }

 getEmployee<employeeList>(username, pwd, pwdNew, brcode, statusmsg) {
   return this.http.post('/api/uidlogin', {
     username,
     pwd,
     pwdNew,
     brcode,
     statusmsg,
   });
 }

 getData() {
   // return this.http.get('http://localhost:9000/api/getData')
   return this.http.get('/api/getData');
 }

 getData2() {
   return [
     {
       name: 'Kumar G',
       online: true,
     },
     {
       name: 'Ram',
       online: true,
     },
     {
       name: 'Rathik',
       online: false,
     },
   ];
 }
}
