/* eslint-disable class-methods-use-this */
/* eslint-disable import/extensions */
/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */
/* eslint-disable import/no-unresolved */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as FileSaver from 'file-saver';
import { MonoTypeOperatorFunction, Observable } from 'rxjs';
import * as XLSX from 'xlsx';
import { Globals } from '../globals';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable({
  providedIn: 'root',
})

export class murgnService {
  pipe(arg0: MonoTypeOperatorFunction<unknown>) {
    throw new Error('Method not implemented.');
  }

  apiUrl = 'https://10.200.201.86:9001/api/KarSyApiOne';

  httpOptions = {
    headers: new HttpHeaders({
      'x-api-key': this.gb.TmpCdeFedG,
      'content-type': 'application/json',
    }),
  };

  // Json for filtering branch name
  branchFilterJson = [
    {
      reqMainreq: 'BranchFilter',
      Usr: this.gb.gUsrid,
      brcode: this.gb.gBrcode,
      var20: 'Gandhipu',
    },

  ];

  // Json for getting  branch name  in add new card settlement dialog
  dialogbranchJson = [
    {
      reqMainreq: 'GetBankNames',
      Usr: this.gb.gUsrid,
      brcode: this.gb.gBrcode,
      var1: 7,
      var20: 'Gandhipu',
    },

  ];

  // Json for listing data in table
  fetchTableJson = [
    {
      reqMainreq: 'GetCardSales',
      Usr: this.gb.gUsrid,
      brcode: this.gb.gBrcode,
      var1: 0,
      var2: '',
    },
  ];

  // Json for getting T-id in add new card settlement dialog
  getTidJson = [
    {
      reqMainreq: 'GetCardSales',
      Usr: this.gb.gUsrid,
      brcode: this.gb.gBrcode,
      var1: 0,
      var2: '',
      var20: '',
    },
  ];

  // Json for Save All record
  overAllSaveJson = [
    {
      ReqMain: 'S@/SaveCardSalesCorrection/E@',
      WHcode: 'ST',
      Usr: this.gb.gUsrid,
      brcode: 0,
      billdate: '2022-04-27',
      SaveItems: [],
    },
  ];

  PFRegionJson = [
    {
      reqMainreq: 'PFRegionFilter',
      Usr: this.gb.gUsrid,
      brcode: this.gb.gBrcode,
      var20: '',
    },

  ];

  PFRegionPreloadJson = [
    {
      reqMainreq: '',
      Usr: this.gb.gUsrid,
      brcode: this.gb.gBrcode,
    },
  ];

  PFProcessJson = [
    {
      reqMainreq: '',
      Usr: this.gb.gUsrid,
      brcode: this.gb.gBrcode,
      var1: '',
      var2: '',
    },
  ];

  // var1= region var2 = month

  // eslint-disable-next-line no-useless-constructor, no-empty-function
  constructor(private http: HttpClient, private gb: Globals, private snackBar: MatSnackBar) {}

  getdata(postData: any): Observable<any[]> {
    this.branchFilterJson[0].var20 = postData;
    this.branchFilterJson[0].Usr = this.gb.gUsrid;
    this.branchFilterJson[0].brcode = this.gb.gBrcode;
    return this.http.post<any>(`${this.gb.gApiserver}/api/KarSyApiOne`, this.branchFilterJson[0], this.httpOptions);
  }

  getBranch(postData: any, brcode: number): Observable<any[]> {
    this.dialogbranchJson[0].reqMainreq = 'GetBankNames';
    this.dialogbranchJson[0].var20 = postData;
    this.dialogbranchJson[0].var1 = brcode;
    return this.http.post<any>(`${this.gb.gApiserver}/api/KarSyApiOne`, this.dialogbranchJson[0], this.httpOptions);
  }

  getTid(brcode: any, postData: string, Tid:string): Observable<any[]> {
    this.getTidJson[0].reqMainreq = 'GetBankTids';
    this.getTidJson[0].var2 = postData;
    this.getTidJson[0].var1 = brcode;
    this.getTidJson[0].var20 = Tid;
    return this.http.post<any>(`${this.gb.gApiserver}/api/KarSyApiOne`, JSON.stringify(this.getTidJson[0]), this.httpOptions);
  }

  fetchTable(brCode: any, date: any): Observable<any[]> {
    this.fetchTableJson[0].var1 = brCode;
    this.fetchTableJson[0].var2 = date;
    return this.http.post<any>(`${this.gb.gApiserver}/api/KarSyApiOne`, this.fetchTableJson[0], this.httpOptions);
  }

  saveTableApi(branchCode:any, billdate:any, SaveItems:any): Observable<any[]> {
    this.overAllSaveJson[0].billdate = billdate;
    this.overAllSaveJson[0].brcode = branchCode;
    this.overAllSaveJson[0].SaveItems = SaveItems;
    return this.http.post<any>(`${this.gb.gApiserver}/api/JsonObjKarSy`, this.overAllSaveJson[0], this.httpOptions);
  }

  getPFRegion(keyWord: any): Observable<any[]> {
    this.PFRegionJson[0].var20 = keyWord;
    return this.http.post<any>(`${this.gb.gApiserver}/api/KarSyApiOne`, this.PFRegionJson[0], this.httpOptions);
  }

  preloadPFRegion(value): Observable<any[]> {
    if (value === 'pfType') {
      this.PFRegionPreloadJson[0].reqMainreq = 'PFFormList';
    } else {
      this.PFRegionPreloadJson[0].reqMainreq = 'PFRegionList';
    }
    return this.http.post<any>(`${this.gb.gApiserver}/api/KarSyApiOne`, this.PFRegionPreloadJson[0], this.httpOptions);
  }

  PFProcess(PFMonth, regionName, pfType): Observable<any[]> {
    if (pfType === 'PF Challan Report') {
      const PFProcesswithBranch = [
        {
          reqMainreq: 'PFReport',
          Usr: this.gb.gUsrid,
          brcode: this.gb.gBrcode,
          var1: regionName,
          var2: PFMonth,
          var3: 0,
        },
      ];
      return this.http.post<any>(`${this.gb.gApiserver}/api/KarSyApiOne`, PFProcesswithBranch[0], this.httpOptions);
    }

    if (pfType === 'PF Challan Regular') {
      this.PFProcessJson[0].reqMainreq = 'PFProcess';
    } else if (pfType === 'PF Challan Arrear') {
      this.PFProcessJson[0].reqMainreq = 'PFArrearProcess';
    }

    this.PFProcessJson[0].var2 = PFMonth;
    this.PFProcessJson[0].var1 = regionName;

    return this.http.post<any>(`${this.gb.gApiserver}/api/KarSyApiOne`, this.PFProcessJson[0], this.httpOptions);
  }

  PFProcesswithBranch(PFMonth, regionName, pfType, brcode): Observable<any[]> {
    const PFProcesswithBranch = [
      {
        reqMainreq: 'PFRegionBranch',
        Usr: this.gb.gUsrid,
        brcode: this.gb.gBrcode,
        var1: regionName,
        var2: PFMonth,
        var3: brcode,
      },
    ];

    if (pfType === 'PF Challan Report') {
      PFProcesswithBranch[0].reqMainreq = 'PFReport';
    } else if (pfType === 'PF Employee wise') {
      PFProcesswithBranch[0].reqMainreq = 'PFEmpWise';
    }

    return this.http.post<any>(`${this.gb.gApiserver}/api/KarSyApiOne`, PFProcesswithBranch[0], this.httpOptions);
  }

  getregionbasedbranch(regionName): Observable<any[]> {
    const branchwisePFProcessJson = [
      {
        reqMainreq: 'PFRegionBranch',
        Usr: this.gb.gUsrid,
        brcode: this.gb.gBrcode,
        var1: regionName,
      },
    ];
    return this.http.post<any>(`${this.gb.gApiserver}/api/KarSyApiOne`, branchwisePFProcessJson[0], this.httpOptions);
  }

  getEmployeeNameCode(ketValue): Observable<any[]> {
    const EmployeeNameCodeJson = [
      {
        reqMainreq: 'EmployeeFilter',
        Usr: this.gb.gUsrid,
        brcode: this.gb.gBrcode,
        var7: ketValue,
      },
    ];
    return this.http.post<any>(`${this.gb.gApiserver}/api/KarSyApiOne`, EmployeeNameCodeJson[0], this.httpOptions);
  }

  getFinYear(): Observable<any[]> {
    const EmployeeNameCodeJson = [
      {
        reqMainreq: 'FinYearList',
        Usr: this.gb.gUsrid,
        brcode: this.gb.gBrcode,
      },
    ];
    return this.http.post<any>(`${this.gb.gApiserver}/api/KarSyApiOne`, EmployeeNameCodeJson[0], this.httpOptions);
  }

  Form3A(finYear, empcode): Observable<any[]> {
    const Form3AJson = [
      {
        reqMainreq: 'PrepareForm3A',
        Usr: this.gb.gUsrid,
        brcode: this.gb.gBrcode,
        var3: finYear,
        var7: empcode,
      },
    ];
    return this.http.post<any>(`${this.gb.gApiserver}/api/KarSyApiOne`, Form3AJson[0], this.httpOptions);
  }

  Form5(month, region): Observable<any[]> {
    const Form5Json = [
      {
        reqMainreq: 'PrepareForm5',
        Usr: this.gb.gUsrid,
        brcode: this.gb.gBrcode,
        var1: region,
        var3: month,

      },
    ];
    return this.http.post<any>(`${this.gb.gApiserver}/api/KarSyApiOne`, Form5Json[0], this.httpOptions);
  }

  Form6A(finyear, region, leftvalue, zerovalue): Observable<any[]> {
    const Form6AJson = [
      {
        reqMainreq: 'PrepareForm6A',
        Usr: this.gb.gUsrid,
        brcode: this.gb.gBrcode,
        var1: region,
        var3: finyear,
        var5: leftvalue,
        var6: zerovalue,

      },
    ];
    return this.http.post<any>(`${this.gb.gApiserver}/api/KarSyApiOne`, Form6AJson[0], this.httpOptions);
  }

  Form10(PFMonth, regionName): Observable<any[]> {
    const PFProcesswithBranch = [
      {
        reqMainreq: 'PrepareForm10',
        Usr: this.gb.gUsrid,
        brcode: this.gb.gBrcode,
        var1: regionName,
        var3: PFMonth,
      },
    ];
    return this.http.post<any>(`${this.gb.gApiserver}/api/KarSyApiOne`, PFProcesswithBranch[0], this.httpOptions);
  }

  ESIType(data): Observable<any[]> {
    return this.http.post<any>(`${this.gb.gApiserver}/api/KarSyApiOne`, data, this.httpOptions);
  }

  public exportAsExcelFile(json: any[], excelFileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE,
    });
    FileSaver.saveAs(data, `${fileName}_export_${new Date().getTime()}${EXCEL_EXTENSION}`);
  }

  FinBookView(data:any) {
    return this.http.post<any>(`${this.gb.gApiserver}/api/datareqsarnEight`, data, this.httpOptions);
  }

  SaveBookView(data:any) {
    return this.http.post<any>(`${this.gb.gApiserver}/api/JsonPayloadSaran1`, data, this.httpOptions);
  }

  VendorGroupApi(data:any) {
    return this.http.post<any>(`${this.gb.gApiserver}/api/datareqsarnTen`, data, this.httpOptions);
  }

  VendorGroupSaveApi(data:any) {
    return this.http.post<any>(`${this.gb.gApiserver}/api/JsonPayloadSaran3`, data, this.httpOptions);
  }

  CustomerOnAccountBalance(data:any) {
    return this.http.post<any>(`${this.gb.gApiserver}/api/datareqrachnNine`, data, this.httpOptions);
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'close', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 2500,
    });
  }

  openSnackBarWithDuration(message: string, time:number) {
    this.snackBar.open(message, 'close', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: time,
    });
  }

  focusNext(event: any, id: any):void {
    if (event.key === 'Enter') {
      if (event.target.value !== '') {
        document.getElementById(id)?.focus();
      }
    }
  }

  checkTypeValitity(autoValue, autoName) {
    if (typeof autoValue === 'object') {
      return true;
    }
    this.openSnackBar(`Please choose valid ${autoName}`);
    return false;
  }

  checkValidity(autoValue) {
    if (autoValue.valid) {
      return true;
    }
    this.openSnackBar('please fill all the fields');
    return false;
  }

  newArr = [1, 2, 3, 4];
  // async testing() {
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       'x-api-key': this.gb.TmpCdeFedG,
  //       'content-type': 'application/json',
  //     }),
  //   };
  //   // eslint-disable-next-line no-plusplus
  //   for (let index = 0; index < this.newArr.length; index++) {
  //     const element = this.newArr[index];
  //     console.log(index);

  //     const APIJson = {
  //       reqMainreq: 'ADVPFRegionList',
  //       Usr: this.gb.gUsrid,
  //       brcode: this.gb.gBrcode,
  //       data: this.newArr[index],
  //     };
  //     // eslint-disable-next-line no-await-in-loop
  //     await firstValueFrom(this.http.post<any>('https://10.200.201.86:9001/api/KarSyApiOne', APIJson, httpOptions)).then((data) => console.log(data));
  //   }
  // }
}
