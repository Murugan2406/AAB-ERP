import { Globals } from 'src/app/globals';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GlserviceService {
  constructor(private http: HttpClient, private globals: Globals) { }


  Airtelsmsobj = {
    keyword: '',
    timeStamp: '',
    dataSet:
      [{
        UNIQUE_ID: 'Nill',
        MESSAGE: '',
        OA: '',
        MSISDN: '',
        CHANNEL: 'SMS',
        CAMPAIGN_NAME: 'anand_u',
        CIRCLE_NAME: '',
        USER_NAME: ''
        }]
  };

  getUserDetails(chkas, username, pwd, pwdNew, brcode, statusmsg) {
    const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded',
          'x-api-key': this.globals.TmpCdeFedG
        }) };
    return this.http.post(this.globals.gApiserver + '/api/custAuth', {
      chkas, username, pwd, pwdNew, brcode, statusmsg }, httpOptions ); }


  getRecommendeitems(selBrcode, selTercode, selRegion, selCustcode): any {
    return this.http.post(this.globals.gApiserver + '/api/approvalReq',
    // tslint:disable-next-line: max-line-length
    { reqMainreq: 'RecommendedItemsStockist', raFlag: selTercode, aprStatus: selRegion, Usr: null, reqfromDTAP: '0', reqfromIp: '0', TrnNo: '0', brcode: selBrcode, appby: '0', splreason: '0', extra1: selCustcode, extra2: '0', extra3: ''},
      {
        headers: {
          'Content-Type' : 'application/x-www-form-urlencoded',
          'x-api-key': this.globals.TmpCdeFedG
        }
      });
  }


  getfullitemList(selBrcode, selTercode, selRegion, selCustcode): any {
    return this.http.post(this.globals.gApiserver + '/api/approvalReq',
    // tslint:disable-next-line:max-line-length
    {reqMainreq: 'LoadAllitemsItemsStockist', raFlag: selTercode, aprStatus: selRegion, Usr: null, reqfromDTAP: '0', reqfromIp: '0', TrnNo: '0', brcode: selBrcode, appby: '0', splreason: '0', extra1: selCustcode, extra2: '0', extra3: ''},
      {
        headers: {
          'Content-Type' : 'application/x-www-form-urlencoded',
          'x-api-key': this.globals.TmpCdeFedG
        }
      });
  }

  getOnlyMenuitems(): any {
    return this.http.post(this.globals.gApiserver + '/api/approvalReq',
    // tslint:disable-next-line:max-line-length
    {reqMainreq: 'DisplayOnlyMenuA', raFlag: 'AC', aprStatus: 'CHI', Usr: null, reqfromDTAP: '0', reqfromIp: '0', TrnNo: '0', brcode: '12345', appby: '0', splreason: '0', extra1: '0', extra2: '0', extra3: ''},
      {
        headers: {
          'Content-Type' : 'application/x-www-form-urlencoded',
          'x-api-key': this.globals.TmpCdeFedG
        }
      });
  }

  decode(str) {
    let data = str;
    for ( let i = 0; i < data.length; i++) {
      if (data.charAt(i) === 'S') {
        data = data.replace('S', '0');
      } else if (data.charAt(i) === 'W') {
        data = data.replace('W', '1');
      } else if (data.charAt(i) === 'V') {
        data = data.replace('V', '2');
      } else if (data.charAt(i) === 'B') {
        data = data.replace('B', '3');
      } else if (data.charAt(i) === 'H') {
        data = data.replace('H', '4');
      } else if (data.charAt(i) === 'N') {
        data = data.replace('N', '5');
      } else if (data.charAt(i) === 'R') {
        data =  data.replace('R', '6');
      } else if (data.charAt(i) === 'Y') {
        data =  data.replace('Y', '7');
      } else if (data.charAt(i) === 'D') {
        data = data.replace('D', '8');
      } else if (data.charAt(i) === 'A') {
        data =  data.replace('A', '9');
      } else if (data.charAt(i) === 'X') {
        data =  data.replace('X', '-');
      } else if (data.charAt(i) === 'K') {
        data =  data.replace('K', '@');
      } else if (data.charAt(i) === 'Z') {
        data =  data.replace('Z', '%');
      } else if (data.charAt(i) === 'J') {
        data =  data.replace('J', '$');
      }
    }
    // console.log(data);
    return data;
  }

  /*** find current routing url spilt and find brcode,billdate,mode and bill number****/
  splitUrl( str, option) {
    if (option === 'tercode') {
      str = str.substring(str.lastIndexOf('$'));
      str = str.substring(1);
      if (str === '1') { str = 'TS'; }
      if (str === '2') { str = 'T2'; }
      if (str === '3') { str = 'RU'; }
      if (str === '4') { str = 'R2'; }
    } else if (option === 'brcode') {
      str = str.substring(str.indexOf('@'), str.lastIndexOf('@'));
      str = str.substring(1);
    } else if (option === 'tblno') {
      str =  str.substring(str.lastIndexOf('@'), str.lastIndexOf('%'));
      str = str.substring(1);
    } else if (option === 'custno') {
      str = str.substring(str.lastIndexOf('%'), str.lastIndexOf('$'));
      str = str.substring(1);
      if (str === '1') { str = 'A'; }
      if (str === '2') { str = 'B'; }
      if (str === '3') { str = 'C'; }
      if (str === '4') { str = 'D'; }
    }

    return str;
  }

  }
