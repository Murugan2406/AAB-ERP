import { Globals } from 'src/app/globals';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class EbillService {
  constructor(private http: HttpClient, private globals: Globals) { }


  apiURL = this.globals.gApiserver;

  body = {
    reqMain: 'GetBillDtlsForBillNo',
    usr: '0',
    dept: '0',
    subject: '0',
    reqBody: '0',
    reqfromIp: '0',
    attachmentIfany: '0',
    brcode: '0',
    extra1: '0',
    extra2: '0',
    extra3: '0',
    extra4: '0',
    extra5: '0'
  };


  getEncrypted(value, key) {
    var iv  = "mHGFxENnZLbienLyANoi.e"; //length=22
    var keys = CryptoJS.enc.Base64.parse(key);
    //key is now e8b7b40e031300000000da247441226a, length=32
    var ivs = CryptoJS.enc.Base64.parse(iv);
    //iv is now 987185c4436764b6e27a72f2fffffffd, length=32
    var cipherData = CryptoJS.AES.encrypt(value, keys, { iv: ivs });
    var data =cipherData.toString();
    data =  data.replace(/[/]/g, '_');
    return data;
  }

  getDecrypted(value, key) {
    var iv  = "mHGFxENnZLbienLyANoi.e"; //length=22
    var keys = CryptoJS.enc.Base64.parse(key);
    //key is now e8b7b40e031300000000da247441226a, length=32
    var ivs = CryptoJS.enc.Base64.parse(iv);
    value =  value.replace(/_/g, '/');
    var encydata = CryptoJS.AES.decrypt(value, keys, { iv: ivs });
    var data =encydata.toString(CryptoJS.enc.Utf8);
    return data;
  }


  // getEncrypted(value, key) {
  //   var iv  = "mHGFxENnZLbienLyANoi.e"; //length=22
  //   var keys = CryptoJS.enc.Base64.parse(key);
  //   //key is now e8b7b40e031300000000da247441226a, length=32
  //   var ivs = CryptoJS.enc.Base64.parse(iv);
  //   //iv is now 987185c4436764b6e27a72f2fffffffd, length=32
  //   var cipherData = CryptoJS.AES.encrypt(value, keys, { iv: ivs });
  //   return cipherData.toString()
  // }

  // getDecrypted(value, key) {
  //   var iv  = "mHGFxENnZLbienLyANoi.e"; //length=22
  //   var keys = CryptoJS.enc.Base64.parse(key);
  //   //key is now e8b7b40e031300000000da247441226a, length=32
  //   var ivs = CryptoJS.enc.Base64.parse(iv);
  //   var data = CryptoJS.AES.decrypt(value, keys, { iv: ivs });
  //   return data.toString(CryptoJS.enc.Utf8);
  // }


  getapprovalReqJson(reqMainreq, raFlag, aprStatus, Usr, reqfromDTAP, reqfromIp, TrnNo, brcode, appby, splreason, extra1, extra2, extra3) {
    const httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded',
        'x-api-key': this.globals.TmpCdeFedG
      })
      };
    return this.http.post(this.apiURL + '/api/approvalReq', {reqMainreq, raFlag, aprStatus, Usr,
     reqfromDTAP, reqfromIp, TrnNo, brcode, appby, splreason, extra1, extra2, extra3}
    , httpOptions);
  }

  getDetails(body): any {
    return this.http.post(this.apiURL + '/api/myRequest', JSON.stringify(body),
      {
        headers: {
          'Content-Type' : 'application/x-www-form-urlencoded',
          'x-api-key': this.globals.TmpCdeFedG
        }
    });
  }

  decode(str) {
    let data = str;
    // tslint:disable-next-line: prefer-for-of
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
    if (option === 'mode') {
      str = str.substring(str.lastIndexOf('$'));
    } else if (option === 'br') {
      str = str.substring(str.indexOf('@'), str.lastIndexOf('@'));
    } else if (option === 'date') {
      str =  str.substring(str.lastIndexOf('@'), str.lastIndexOf('%'));
    } else {
      str = str.substring(str.lastIndexOf('%'), str.lastIndexOf('$'));
    }
    return str.substring(1);
  }

}
