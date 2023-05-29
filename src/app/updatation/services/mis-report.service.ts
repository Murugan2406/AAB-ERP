/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-empty-function */
/* eslint-disable import/extensions */
/* eslint-disable no-useless-constructor */
/* eslint-disable import/prefer-default-export */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-plusplus */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { Globals } from 'src/app/globals';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable({
  providedIn: 'root',
})
export class MisReportService {
  apiUrl = '';

  defaultCmp = 'ADYAR ANANDA BHAVAN';

  defaultState = 'ALL';

 selectBrcode:any;

  body = {
    username: '', seltype: 'CompanyLoad', arg1: '', arg2: '', arg3: '', oth: '',
  };

  data = {
    fdate: '',
    tdate: '',
    brcode: '',
    cmp: '',
    groupSel: 'Groupselection',
    RegOrState: 'ALL',
    BrOrKit: 'ALL',
    RecordDisplay: '',
    selectiontype: 'Sales',
    Modesel: '',
    finalyear: '',
    usr: '',
    sel1: '',
    sel2: '',
  };

  jsonCatData = {
    reqMainreq: '0',
    raFlag: '0',
    aprStatus: '0',
    Usr: '0',
    reqfromDTAP: '0',
    reqfromIp: '0',
    TrnNo: '0',
    brcode: '0',
    appby: '0',
    splreason: '',
    extra1: '',
    extra2: '',
    extra3: '',
  };

  jsonListData = {
    reqMain: '0',
    usr: '0',
    dept: '0',
    subject: '0',
    reqBody: '0',
    reqfromIp: '0',
    attachmentIfany: '',
    brcode: 0,
    extra1: '0',
    extra2: '0',
    extra3: '0',
    extra4: 0,
    extra5: 'nil',
  };

  dutyReport = {
    WhichSelection: '0',
    cmp: '0',
    states: '0',
    subregion: '0',
    brcode: '0',
    usr: '0',
    fdate: '0',
    tdate: '0',
    bhname: '0',
    serviceproduction: '0',
    RecordDisplay: '0',
    extra1: '0',
    extra2: '0',
    extra3: '0',
    extra4: '0',
    extra5: '0',
  };

  constructor(private http: HttpClient, private globals:Globals) { }

  getReport(body): any {
    // console.log(body);
    return this.http.post(
      `${this.apiUrl}/homeload`,
      JSON.stringify(body),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'x-api-key': this.globals.TmpCdeFedG,
        },
      },
    );
  }

  datarachnNine(body:any): any {
    return this.http.post(
      `${this.apiUrl}/api/datareqrachnNine`,
      JSON.stringify(body),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'x-api-key': this.globals.TmpCdeFedG,
        },
      },
    );
  }

  datarachnEight(body:any): any {
    return this.http.post(
      `${this.apiUrl}/api/datareqrachnEight`,
      JSON.stringify(body),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'x-api-key': this.globals.TmpCdeFedG,
        },
      },
    );
  }

  datareqsarnEight(body:any): any {
    return this.http.post(
      `${this.apiUrl}/api/datareqsarnEight`,
      JSON.stringify(body),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'x-api-key': this.globals.TmpCdeFedG,
        },
      },
    );
  }

  getList(data): any {
    return this.http.post(
      `${this.apiUrl}/api/myRequest`,
      JSON.stringify(data),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'x-api-key': this.globals.TmpCdeFedG,
        },
      },
    );
  }

  datareqrshSeven(body): any {
    return this.http.post(
      `${this.apiUrl}/api/datareqrshSeven`,
      JSON.stringify(body),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'x-api-key': this.globals.TmpCdeFedG,
        },
      },
    );
  }

  getJsonPayloadRjs(body): any {
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

  PostPlBudget(body):any {
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

  datarachnFive(body): any {
    return this.http.post(
      `${this.apiUrl}/api/datareqrachnFive`,
      JSON.stringify(body),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'x-api-key': this.globals.TmpCdeFedG,
        },
      },
    );
  }

  dataGetRequestV4(body): any {
    return this.http.post(
      `${this.apiUrl}/api/dataGetRequestV4`,
      JSON.stringify(body),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'x-api-key': this.globals.TmpCdeFedG,
        },
      },
    );
  }

  datareqrshSix(body): any {
    return this.http.post(
      `${this.apiUrl}/api/datareqrshSix`,
      JSON.stringify(body),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'x-api-key': this.globals.TmpCdeFedG,

        },
      },
    );
  }

  getDataList(data): any {
  //  console.log(data);
    return this.http.post(
      `${this.apiUrl}/getdata`,
      JSON.stringify(data),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'x-api-key': this.globals.TmpCdeFedG,
        },
      },
    );
  }

  getOptionsList(data): any {
    return this.http.post(
      `${this.apiUrl}/api/approvalReq`,
      JSON.stringify(data),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'x-api-key': this.globals.TmpCdeFedG,

        },
      },
    );
  }

  datareqsarnFour(body): any {
    return this.http.post(
      `${this.apiUrl}/api/datareqsarnFour`,
      JSON.stringify(body),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'x-api-key': this.globals.TmpCdeFedG,

        },
      },
    );
  }

  getDutyChartData(data): any {
    return this.http.post(
      `${this.apiUrl}/api/dutychart`,
      JSON.stringify(data),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'x-api-key': this.globals.TmpCdeFedG,
        },
      },
    );
  }

  datarachnFour(body): any {
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

  datareqrshFour(body): any {
    return this.http.post(
      `${this.apiUrl}/api/datareqrshFour`,
      JSON.stringify(body),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'x-api-key': this.globals.TmpCdeFedG,

        },
      },
    );
  }

  datareqrshFive(body): any {
    return this.http.post(
      `${this.apiUrl}/api/datareqrshFive`,
      JSON.stringify(body),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'x-api-key': this.globals.TmpCdeFedG,

        },
      },
    );
  }

  datarachnThree(body): any {
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

  JsonPayloadRachn(body): any {
    return this.http.post(
      `${this.apiUrl}/api/JsonPayloadRachn`,
      JSON.stringify(body),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'x-api-key': this.globals.TmpCdeFedG,

        },
      },
    );
  }

  updateUrbanInventory(brcode, partner, region, rgnKy, data): any {
    const head = rgnKy;

    return this.http.post(
      `https://api.urbanpiper.com/external/api/v1/inventory/locations/${brcode}/`,
      JSON.stringify(data),
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: head,
        },
      },
    );
  }

  getApprThree(data): any {
    return this.http.post(
      `${this.apiUrl}/api/approvalReqThree`,
      JSON.stringify(data),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'x-api-key': this.globals.TmpCdeFedG,
        },
      },
    );
  }

  getApprJson(data): any {
    return this.http.post(
      `${this.apiUrl}/api/approvalReqTwo`,
      JSON.stringify(data),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'x-api-key': this.globals.TmpCdeFedG,
        },
      },
    );
  }

  getApprFileJson(data): any {
    return this.http.post(
      `${this.apiUrl}/api/approvalFileService`,
      JSON.stringify(data),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'x-api-key': this.globals.TmpCdeFedG,
        },
      },
    );
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

  public getUserImage(object): any {
    // console.log(this.finalList);
    const imagedata = object.data;
    const imageUrl = this.arrayBufferToBase64(imagedata);
    // this.isSelected = 'viewImage';
    return imageUrl;
  }

  public CalculateAge(birthdate): any {
    // birthdate = '1998-10-11T00:00:00.000Z';
    let age = 0;
    if (birthdate) {
      const timeDiff = Math.abs(Date.now() - new Date(birthdate).getTime());
      age = Math.floor(timeDiff / (1000 * 3600 * 24) / 365.25);
    }
    return age;
  }

  public calculateExperience(joindate): any {
    let experience = '';
    let months;
    let years;

    let diff = Math.abs(Date.now() - new Date(joindate).getTime());
    // let diff = Date.now() - new Date(joindate);
    years = Math.floor((diff) / (1000 * 60 * 60 * 24 * 365));
    diff = Math.floor((diff) % (1000 * 60 * 60 * 24 * 365));
    months = Math.floor((diff) / (1000 * 60 * 60 * 24 * 30));
    diff = Math.floor((diff) % (1000 * 60 * 60 * 24 * 30));
    // console.log('year : ' + years + '\n' + 'month : ' + months );
    experience = `${years} Yrs ${months} Mnts`;
    return experience;
  }

  arrayBufferToBase64(buffer): any {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }

  getRachnTen(data:any): any {
    return this.http.post(
      `${this.apiUrl}/api/datareqrachnTen`,
      JSON.stringify(data),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'x-api-key': this.globals.TmpCdeFedG,
        },
      },
    );
  }
}
