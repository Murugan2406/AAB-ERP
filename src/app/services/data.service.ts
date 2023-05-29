/* eslint-disable max-len */
/* eslint-disable no-empty-function */
/* eslint-disable no-useless-constructor */
/* eslint-disable import/extensions */
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-underscore-dangle */
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import {
  catchError, first, map, tap,
} from 'rxjs/operators';
import { Injectable } from '@angular/core';
// import { debounceTime } from 'rxjs/internal/operators/debounceTime';
import { Globals } from 'src/app/globals';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  airtelUrl = '0';

 apiUrl = '';

 uri;

 check;

 Brcode;

 Brname;

 SelFlag;

  SelectionType='';

SelectedDate='';

 SelectedNewDate='';

  reqData:any = {};

 view:boolean= false;

  public SelectedStr = '';

  constructor(private _http: HttpClient, private globals: Globals) { }

  doSmsAPIAIRTEL(varBody) {
    this.airtelUrl = 'http://digimate.airtel.in:15181/BULK_API/InstantJsonPush';
    return this._http.post(this.airtelUrl, JSON.stringify(varBody));
  }

  Airtelsmsobj = {
    keyword: '',
    timeStamp: '071818163530',
    dataSet:
      [{
        UNIQUE_ID: 'Nill',
        MESSAGE: '',
        OA: '',
        MSISDN: '',
        CHANNEL: 'SMS',
        CAMPAIGN_NAME: 'anand_u',
        CIRCLE_NAME: '',
        USER_NAME: 'anand_htu',
      }],
  };

httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' }),
};

// tslint:disable-next-line:max-line-length
StockApiRequestCall(ReqMain: string, ReqSub: string, TerCode: string, StkWhCode: string, Subcat: string, Cat: string, icode: string, phyqty: string, fdate: string, tdate: string, usr: string, var1: string, var2: string, var3: string) {
  this.uri = this.globals.gApiserver;
  // console.log (this.uri);
  // console.log (ReqMain,ReqSub,TerCode,StkWhCode,Subcat,Cat,icode,phyqty,fdate,tdate,usr,var1,var2,var3);
  // tslint:disable-next-line:max-line-length
  return this._http.post<any>(`${this.uri}/api/stockrequest`, {
    ReqMain, ReqSub, TerCode, StkWhCode, Subcat, Cat, icode, phyqty, fdate, tdate, usr, var1, var2, var3,
  }, this.httpOptions).pipe(
    map(
      (data: any) => (
        data.length !== 0 ? data as any[] : []
      ),
    ),
  );
}

datareqrachn(body): Observable<any> {
  this.apiUrl = this.globals.gApiserver;
  return this._http.post(
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

datareqrachn2(body): Observable<any> {
  this.apiUrl = this.globals.gApiserver;
  return this._http.post(
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

GetPineLabTrnStatus(body): Observable<any> {
  return this._http.post(
    `${this.apiUrl}/api/PineLabTransactionCheck`,
    JSON.stringify(body),
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    },
  );
}

OTPApiRequestCall(ReqMain: string, ReqSub: string, TerCode: string, StkWhCode: string, Subcat: string, Cat: string, icode: string, phyqty: string, fdate: string, tdate: string, usr: string, var1: string, var2: string, var3: string) {
  this.uri = 'http://digimate.airtel.in:15181/BULK_API/InstantJsonPush';

  let NewParams;
  // eslint-disable-next-line prefer-const
  NewParams = {
    keyword: 'DEMO',
    timeStamp: '071818163530',
    dataSet:
      [
        {
          UNIQUE_ID: 'ddddd345555',
          MESSAGE: 'Hi how are you',
          OA: 'DIGITL',
          MSISDN: '9941389398',
          CHANNEL: 'SMS',
          CAMPAIGN_NAME: 'anand_u',
          CIRCLE_NAME: 'TRANSACTIONAL SMS',
          USER_NAME: 'anand_htu',
        },
      ],
  };

  // var finalstring = JSON.stringify(NewParams);
  // console.log(NewParams);
  // console.log(finalstring);

  return this._http.post<any>(`${this.uri}`, { NewParams }, this.httpOptions).pipe(
    map(
      (data: any) => (
        data.length !== 0 ? data as any[] : [{ WD: 'No Record Found' } as any]
      ),
    ),
  );
}
}
