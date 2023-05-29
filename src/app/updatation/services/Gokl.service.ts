import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Globals } from '../globals';
// import { TreeviewItem } from 'ngx-treeview';
// new service:  apmservice

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable({
  providedIn: 'root'
})

export class Gokl {
  testurl: any; ItemForrateEdit: any; reqitem: any; ItemoldrateEdit: any;
  changeitem: any; Tranid: any;
  Uniqueid: any; expensestesturl: any; Pandlurl: any; 
  apiUrl: any;
  httpOptions = {
    headers: new HttpHeaders
      ({
        'x-api-key': this.gb.TmpCdeFedG,
        'content-type': 'application/json'
      })
  }

  constructor(private http: HttpClient, private gb: Globals) { }



  getmanualdet(postData: any): Observable<any[]> {
    return this.http.post<any>(`${this.gb.gApiserver}/api/datareqkrshFive`, postData, this.httpOptions)
  }

  getdatatable(): Observable<any> {
    return this.http.get('https://jsonplaceholder.typicode.com/posts');
  }

  getuserpermission(user): Observable<any>{

    
    return this.http.post(`${this.gb.gApiserver}/api/datareqsarnEight`, user, this.httpOptions);

  }


  getcompanyname(): Observable<any> {
    const company = [
      {
        reqMainreq: 'CompanyName',
        Usr: this.gb.gUsrid,
        brcode: this.gb.gBrcode,
      },
    ];
    return this.http.post(`${this.gb.gApiserver}/api/datareqsarnEight`, company[0], this.httpOptions)
  }

  getstate(): Observable<any> {
    const Nameofstates = [
      {
        reqMainreq: 'NameOfStates',
        Usr: this.gb.gUsrid,
        brcode: this.gb.gBrcode,
        // var1: regionName,
        // var2: PFMonth,
        // var3: brcode,
      },
    ];
    return this.http.post(`${this.gb.gApiserver}/api/datareqsarnSix`, Nameofstates[0], this.httpOptions);
  }

  getfinbook(Selectedvalue,CompanyCode): Observable<any> {
    const finbook = [
      {
        reqMainreq: 'FinBookSearch',
        Usr: this.gb.gUsrid,
        brcode: this.gb.gBrcode,
        var2: CompanyCode,
        var1: Selectedvalue,
      }
    ];
    return this.http.post(`${this.gb.gApiserver}/api/datareqsarnEight`, finbook[0], this.httpOptions);

  }


  getacccode(Selectedvalue,CompanyCode,FinanceBook): Observable<any> {
    const finbook = [
      {
        reqMainreq: 'FinBookAccSearch',
        Usr: this.gb.gUsrid,
        brcode: this.gb.gBrcode,
        var2: CompanyCode,
        var1: Selectedvalue,
        var3:FinanceBook
      }
    ];
    return this.http.post(`${this.gb.gApiserver}/api/datareqsarnEight`, finbook[0], this.httpOptions);

  }


  getcountrys(): Observable<any> {
    const NameOfCountry = [
      {
        reqMainreq: 'NameOfCountry',
        Usr: this.gb.gUsrid,
        brcode: this.gb.gBrcode,
        // var1: regionName,
        // var2: PFMonth,
        // var3: brcode,
      },
    ];
    return this.http.post(`${this.gb.gApiserver}/api/datareqsarnSix`, NameOfCountry[0], this.httpOptions);
  }

  //save api

  savebankMaster(bankmaster: any): Observable<any> {
    return this.http.post(`${this.gb.gApiserver}/api/JsonPayloadSaran1`, bankmaster, this.httpOptions);
  }

  savemapbranch(mapbank: any): Observable<any> {
    return this.http.post(`${this.gb.gApiserver}/api/JsonPayloadSaran1`, mapbank, this.httpOptions);
  }

  usagemapsave(usagemap: any): Observable<any> {
    return this.http.post(`${this.gb.gApiserver}/api/JsonPayloadSaran1`, usagemap, this.httpOptions);
  }

  //filter or search
  branchmapp(branch,fincode,compcode): Observable<any> {
    const searchdata = [{
      reqMainreq: 'BrSearch',
      Usr: this.gb.gUsrid,
      brcode: this.gb.gBrcode,
      var1: branch,
      var2:compcode,
      var3:fincode
    }
    ];
    return this.http.post(`${this.gb.gApiserver}/api/datareqsarnEight`, searchdata[0], this.httpOptions);
  }

  viewbankmaster(bankcode): Observable<any> {
    const viewdata = [
      {
        reqMainreq: 'BankMasterView',
        Usr: this.gb.gUsrid,
        brcode: this.gb.gBrcode,
        var1: bankcode,
      }
    ];
    return this.http.post(`${this.gb.gApiserver}/api/datareqsarnEight`, viewdata[0], this.httpOptions);
  }

  viewallbankmaster(companyname): Observable<any> {
    const viewdata = [
      {
        reqMainreq: 'BankMasterOverallView',
        Usr: this.gb.gUsrid,
        brcode: this.gb.gBrcode,
        var1: companyname
      }
    ];
    return this.http.post(`${this.gb.gApiserver}/api/datareqsarnEight`, viewdata[0], this.httpOptions);
  }

  viewallbankmap(BankCode): Observable<any> {
    const viewdata = [
      {
        reqMainreq: 'MapBanktoBranchView',
        Usr: this.gb.gUsrid,
        brcode: this.gb.gBrcode,
        var1: BankCode
      }
    ];
    return this.http.post(`${this.gb.gApiserver}/api/datareqsarnEight`, viewdata[0], this.httpOptions);

  }

  viewallUsagemap(bankref, bankcode): Observable<any> {
    const viewdata = [
      {
        reqMainreq: 'BankUssageErpView',
        Usr: this.gb.gUsrid,
        brcode: this.gb.gBrcode,
        var1: bankref,
        var2: bankcode
      }
    ];
    return this.http.post(`${this.gb.gApiserver}/api/datareqsarnEight`, viewdata[0], this.httpOptions);
  }


  deletebankmaster(e): Observable<any> {
    const deletemaster = [
      {
        reqMainreq: 'DeleteBankMaster',
        Usr: this.gb.gUsrid,
        brcode: this.gb.gBrcode,
        var1: e.BankCode
      }
    ];
    return this.http.post(`${this.gb.gApiserver}/api/datareqsarnEight`, deletemaster[0], this.httpOptions);

  }

  deletebankmap(e): Observable<any> {
    const deletemapp = [
      {
        reqMainreq: 'DeleteMapBanktoBranch',
        Usr: this.gb.gUsrid,
        brcode: this.gb.gBrcode,
        var1: e.BkBrcode,
        var2: e.BankCode,
        var3: e.AccCode,
        var4: e.BankRef,
        var5: e.BrAccCode

        // brcode=@var1 and BankCode =@var2 and AccCode =@var3 and BankRef=@var4 and BrAccCode=@var5

      }
    ];
    return this.http.post(`${this.gb.gApiserver}/api/datareqsarnEight`, deletemapp[0], this.httpOptions);
  }


  deletebankusage(e): Observable<any> {
    const deleteusage = [
      {
        reqMainreq: 'DeleteBankUssageErp',
        Usr: this.gb.gUsrid,
        brcode: this.gb.gBrcode,
        var1: e.BankCode,
        var2: e.BankAccNo,
        var3: e.BankRef

      }
    ];
    return this.http.post(`${this.gb.gApiserver}/api/datareqsarnEight`, deleteusage[0], this.httpOptions);
  }


  /// edit 

  mapedit(e): Observable<any> {
    const mapedit = [
      {
        reqMainreq: 'Ind_MapBanktoBranchView',
        Usr: this.gb.gUsrid,
        brcode: this.gb.gBrcode,
        var1: e.BkBrcode,
        var2: e.BankCode,
        var3: e.AccCode,
        var4: e.BankRef,
        var5: e.BrAccCode
        // AccCode =@var3 and BankRef=@var4 and BrAccCode=@var5  

      }
    ];
    return this.http.post(`${this.gb.gApiserver}/api/datareqsarnEight`, mapedit[0], this.httpOptions);
  }



  save(cashcomp: any): Observable<any> {
    return this.http.post(`${this.gb.gApiserver}/api/JsonPayloadSaran1`, cashcomp, this.httpOptions);
  }
  save1(cashcomp: any): Observable<any> {
    return this.http.post(`${this.gb.gApiserver}/api/JsonPayloadSaran3`, cashcomp, this.httpOptions);
  }
  viewall(cash) : Observable<any>{
    return this.http.post(`${this.gb.gApiserver}/api/datareqsarnEight`, cash, this.httpOptions);
  }

  intview(codedata): Observable<any>{
    return this.http.post(`${this.gb.gApiserver}/api/datareqsarnEight`, codedata, this.httpOptions);
  }

  intview1(codedata): Observable<any>{
    return this.http.post(`${this.gb.gApiserver}/api/datareqsarnTen`, codedata, this.httpOptions);
  }

  delete(compcashcodedel): Observable<any>{
    return this.http.post(`${this.gb.gApiserver}/api/datareqsarnEight`, compcashcodedel, this.httpOptions);
  }


  intview2(codedata): Observable<any>{
    return this.http.post(`${this.gb.gApiserver}/api/datareqrachnTen`, codedata, this.httpOptions);
  }


  apiKarSmyApi(data) : Observable<any>{
    return this.http.post(`${this.gb.gApiserver}/api/KarSyApiTwo`, data, this.httpOptions);
  }



  // datareqSarnEight

  // datareqsarnEight
}
