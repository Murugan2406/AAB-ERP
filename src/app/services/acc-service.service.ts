/* eslint-disable class-methods-use-this */
/* eslint-disable consistent-return */
/* eslint-disable no-undef */
/* eslint-disable no-return-assign */
/* eslint-disable no-empty-function */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-constructor */
/* eslint-disable import/prefer-default-export */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, firstValueFrom, takeUntil } from 'rxjs';
import { Globals } from 'src/app/globals';
import { SubSink } from 'subsink';
import Swal from 'sweetalert2';
import { CommonService } from '../services/common.service';

@Injectable({
  providedIn: 'root',
})
export class AccServiceService {
  private subs = new SubSink();

  FBList = [];

  httpOptions = {
    headers: new HttpHeaders({
      'x-api-key': this.globals.TmpCdeFedG,
      'content-type': 'application/json',
    }),
  };

  BranchList: any;

  ReceiptRouteList: any ;

  ReceiptModeList: any ;

  BankCodeList: any ;

  divCodeList: any ;

  CurrencyList: any ;

  ApproveFinbookList: any ;

  CompanyList: any ;

  ConfirmCallArr: any;

  HavePermission: any;

  public unsubscribe$: Subject<void> = new Subject<void>();

  constructor(
private globals: Globals,
    private commonService: CommonService,
    private http: HttpClient,
  ) {
    this.commonService.apiUrl = this.globals.gApiserver;
    this.commonService.reqSendto = 'datareqsarnEleven';
  }

  async getReceiptRoute() {
    const api = {
      reqMainreq: 'SR_ReceiptRoute',
      Usr: this.globals.gUsrid,
      brcode: this.globals.gBrcode,
    };
    await firstValueFrom(this.http.post<any>(`${this.globals.gApiserver}/api/datareqsarnEleven`, api, this.httpOptions).pipe( takeUntil(this.unsubscribe$)) ).then((data: any) => {
      if (data.length > 0) {
        if (data[0].StatusResponse === 'Success') {
          this.ReceiptRouteList = data;
        } else {
          this.commonService.openSnackbar(data[0].StatusResponse, 'Ok', 1500);
        }
      } else {
        // this.commonService.openSnackbar('No data found.', 'Ok', 1500);
      }
    }).catch((error: any) => {
      Swal.fire({ text: error.statusText });
    });
    return this.ReceiptRouteList;
  }

  async getReceiptMode() {
    const api = {
      reqMainreq: 'SR_ReceiptMode',
      Usr: this.globals.gUsrid,
      brcode: this.globals.gBrcode,
    };
    await firstValueFrom(this.http.post<any>(`${this.globals.gApiserver}/api/datareqsarnEleven`, api, this.httpOptions).pipe( takeUntil(this.unsubscribe$)) ).then((data: any) => {
      if (data.length > 0) {
        if (data[0].StatusResponse === 'Success') {
          this.ReceiptModeList = data;
        } else {
          this.commonService.openSnackbar(data[0].StatusResponse, 'Ok', 1500);
        }
      } else {
        // this.commonService.openSnackbar('No data found.', 'Ok', 1500);
      }
    }).catch((error: any) => {
      Swal.fire({ text: error.statusText });
    });
    return this.ReceiptModeList;
  }

  async getBankCode(receiptRouteValue: any) {
    const api = {
      reqMainreq: 'SR_BankCash',
      Usr: this.globals.gUsrid,
      brcode: this.globals.gBrcode,
      var1: receiptRouteValue,
    };
    await firstValueFrom(this.http.post<any>(`${this.globals.gApiserver}/api/datareqsarnEleven`, api, this.httpOptions).pipe( takeUntil(this.unsubscribe$)) ).then((data: any) => {
      this.BankCodeList = data;
      if (data.length > 0) {
        if (data[0].StatusResponse === 'Success') {
          this.BankCodeList = data;
        } else {
          this.commonService.openSnackbar(data[0].StatusResponse, 'Ok', 1500);
        }
      } else {
        // this.commonService.openSnackbar('No data found.', 'Ok', 1500);
      }
    }).catch((error: any) => {
      Swal.fire({ text: error.statusText });
    });
    return this.BankCodeList;
  }

  async getDivCode() {
    const api = {
      reqMainreq: 'SR_DivisionCode',
    };
    await firstValueFrom(this.http.post<any>(`${this.globals.gApiserver}/api/datareqsarnEleven`, api, this.httpOptions).pipe( takeUntil(this.unsubscribe$)) ).then((data: any) => {
      if (data.length > 0) {
        if (data[0].StatusResponse === 'Success') {
          this.divCodeList = data;
        } else {
          this.commonService.openSnackbar(data[0].StatusResponse, 'Ok', 1500);
        }
      } else {
        // this.commonService.openSnackbar('No data found.', 'Ok', 1500);
      }
    }).catch((error: any) => {
      Swal.fire({ text: error.statusText });
    });
    return this.divCodeList;
  }

  async getCurrency() {
    const api = {
      reqMainreq: 'SR_currency',
    };
    await firstValueFrom(this.http.post<any>(`${this.globals.gApiserver}/api/datareqsarnEleven`, api, this.httpOptions).pipe( takeUntil(this.unsubscribe$)) ).then((data: any) => {
      if (data.length > 0) {
        if (data[0].StatusResponse === 'Success') {
          this.CurrencyList = data;
        } else {
          this.commonService.openSnackbar(data[0].StatusResponse, 'Ok', 1500);
        }
      } else {
        // this.commonService.openSnackbar('No data found.', 'Ok', 1500);
      }
    }).catch((error: any) => {
      Swal.fire({ text: error.statusText });
    });
    return this.CurrencyList;
  }

  async getApproveFinbook(cmpCode: string) {
    const api = {
      reqMainreq: 'SR_FBSearchForView',
      Usr: this.globals.gUsrid,
      brcode: this.globals.gBrcode,
      var1: cmpCode,
      var2: '',
    };

    await firstValueFrom(this.http.post<any>(`${this.globals.gApiserver}/api/datareqsarnEleven`, api, this.httpOptions).pipe( takeUntil(this.unsubscribe$)) ).then((data: any) => {
      if (data.length > 0) {
        if (data[0].StatusResponse === 'Success') {
          this.ApproveFinbookList = data;
        } else {
          this.commonService.openSnackbar(data[0].StatusResponse, 'Ok', 1500);
        }
      } else {
        // this.commonService.openSnackbar('No data found.', 'Ok', 1500);
      }
    }).catch((error: any) => {
      Swal.fire({ text: error.statusText });
    });
    return this.ApproveFinbookList;
  }

  // =========================== Common Api Calls For All  ========================================

  async getCompany() {
    const api = {
      reqMainreq: 'CompanyName',
      Usr: this.globals.gUsrid,
      brcode: this.globals.gBrcode,

    };
    await firstValueFrom(this.http.post<any>(`${this.globals.gApiserver}/api/datareqsarnEight`, api, this.httpOptions).pipe( takeUntil(this.unsubscribe$)) ).then((data: any) => {
      if (data.length > 0) {
        if (data[0].StatusResponse === 'Success') {
          this.CompanyList = data;
        } else {
          this.commonService.openSnackbar(data[0].StatusResponse, 'Ok', 1500);
        }
      } else {
        // this.commonService.openSnackbar('No data found.', 'Ok', 1500);
      }
    }).catch((error: any) => {
      Swal.fire({ text: error.statusText });
    });
    return this.CompanyList;
  }

  async getFinbook(cmpcode: string, keyvalue: string) {
    const api = {
      reqMainreq: 'SR_FBSearch',
      Usr: this.globals.gUsrid,
      brcode: this.globals.gBrcode,
      var1: cmpcode,
      var2: keyvalue,
    };
    this.FBList = [];
    await firstValueFrom(this.http.post<any>(`${this.globals.gApiserver}/api/datareqsarnEleven`, api, this.httpOptions).pipe( takeUntil(this.unsubscribe$)) ).then((data: any) => {
      if (data.length > 0) {
        if (data[0].StatusResponse === 'Success') {
          this.FBList = data;
        } else {
          this.commonService.openSnackbar(data[0].StatusResponse, 'Ok', 1500);
        }
      } else {
        // this.commonService.openSnackbar('No data found.', 'Ok', 1500);
      }
    }).catch((error: any) => {
      Swal.fire({ text: error.statusText });
    });
    return this.FBList;
  }

  async getFbBasedBranch(cmpcode: string, finbook: string, keyvalue: string) {
    const api = {
      reqMainreq: 'SR_brSearch',
      Usr: this.globals.gUsrid,
      brcode: this.globals.gBrcode,
      var1: keyvalue,
      var2: cmpcode,
      var3: finbook,
    };
    this.BranchList = [];
    await firstValueFrom(this.http.post<any>(`${this.globals.gApiserver}/api/datareqsarnEleven`, api, this.httpOptions).pipe( takeUntil(this.unsubscribe$)) ).then((data: any) => {
      this.BranchList = data;

      if (data.length > 0) {
        if (data[0].StatusResponse === 'Success') {
          this.BranchList = data;
        } else {
          this.commonService.openSnackbar(data[0].StatusResponse, 'Ok', 1500);
        }
      } else {
        // this.commonService.openSnackbar('No data found.', 'Ok', 1500);
      }
    }).catch((error: any) => {
      Swal.fire({ text: error.statusText });
    });
    return this.BranchList;
  }
 
  async gApiCallOne(reqJson: any, ApiUrl, port) {
    this.CompanyList = [];
    await firstValueFrom(this.http.post<any>(`${ApiUrl}/api/${port}`, reqJson, this.httpOptions).pipe( takeUntil(this.unsubscribe$)) ).then((data: any) => {
      this.CompanyList = data;
      if (data.length > 0) {
        if (data[0].StatusResponse === 'Success') {


          // this.commonService.openSnackbar(data[0].StatusResponse, 'Ok', 1500);
        } else {
          Swal.fire({ text: data[0].StatusResponse });
        }
      } else {
        // this.commonService.openSnackbar('No data found.', 'Ok', 1500);
      }
    }).catch((error: any) => {
      this.CompanyList = error;
      Swal.fire({ text: error.statusText });
    });
    return this.CompanyList;
  }

  async gApiCallWithConfirm(action, reqJson:any, ApiUrl, port) {
    this.ConfirmCallArr = [];
    const shouldDelete = await Swal.fire({
      text: `Are you sure to ${action} ?`, icon: 'warning', showCancelButton: true, confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
        return true;
      } return false;
    });
    if (shouldDelete) {
      this.ConfirmCallArr = [];
      await firstValueFrom(this.http.post<any>(`${ApiUrl}/api/${port}`, reqJson, this.httpOptions).pipe( takeUntil(this.unsubscribe$)) ).then((data: any) => {
        this.ConfirmCallArr = data;
        if (data.length > 0) {
          if (data[0].StatusResponse === 'Success') {
            // this.commonService.openSnackbar(data[0].StatusResponse, 'Ok', 1500);
          } else {
            Swal.fire({ text: data[0].StatusResponse });
          }
        } else {
          this.commonService.openSnackbar('No data found.', 'Ok', 1500);
        }
      }).catch((error: any) => {
        this.ConfirmCallArr = error;
        Swal.fire({ text: error.statusText });
      });
      return this.ConfirmCallArr;
    } return this.ConfirmCallArr;
  }

  async CheckUserRights(cmponentName) {
    const api = {
      reqMainreq: 'UserRights',
      Usr: this.globals.gUsrid,
      var1: cmponentName,
    };
    await firstValueFrom(this.http.post<any>(`${this.globals.gApiserver}/api/datareqsarnEight`, api, this.httpOptions).pipe( takeUntil(this.unsubscribe$)) ).then((data: any) => {
      this.HavePermission = data;

      if (data.length > 0) {
        if (data[0].StatusResponse === 'Success') {
          if (data[0].Permission === 'Y') {
            this.HavePermission = true;
          } else {
            this.HavePermission = false;
          }
        } else {
          this.commonService.openSnackbar(data[0].StatusResponse, 'Ok', 1500);
        }
      } else {
        this.commonService.openSnackbar('No data found.', 'Ok', 1500);
      }
    }).catch((error: any) => {
      Swal.fire({ text: error.statusText });
    });
    return this.HavePermission;
  }

  async ProdNameSearch(keyvalue: string) {
    const api = {
      reqMainreq: 'AMC_ProdSearch',
      Usr: this.globals.gUsrid,
      brcode: this.globals.gBrcode,
      var1: keyvalue,
    };
    let prod = [];
    await firstValueFrom(this.http.post<any>(`${this.globals.gApiserver}/api/datareqsarnTwelve`, api, this.httpOptions).pipe( takeUntil(this.unsubscribe$)) ).then((data: any) => {
      if (data.length > 0) {
        if (data[0].StatusResponse === 'Success') {
          prod = data.splice(0, 500);
        } else {
          this.commonService.openSnackbar(data[0].StatusResponse, 'Ok', 1500);
        }
      } else {
        // this.commonService.openSnackbar('No data found.', 'Ok', 1500);
      }
    }).catch((error: any) => {
      Swal.fire({ text: error.statusText });
    });
    return prod;
  }

  async getTrantype(componentName) {
    const api = {
      reqMainreq: 'VoucherList',
      Usr: this.globals.gUsrid,
      brcode: this.globals.gBrcode,
      var1: '',
      var2: componentName,
    };

    let vList = [];
    await firstValueFrom(this.http.post<any>(`${this.globals.gApiserver}/api/datareqsarnEleven`, api, this.httpOptions).pipe( takeUntil(this.unsubscribe$)) ).then((data: any) => {
      vList = data;
      if (data.length > 0) {
        if (data[0].StatusResponse === 'Success') {
          vList = data;
        } else {
          this.commonService.openSnackbar(data[0].StatusResponse, 'Ok', 1500);
        }
      }
    }).catch((error: any) => {
      Swal.fire({ text: error.statusText });
    });
    return vList;
  }
}
