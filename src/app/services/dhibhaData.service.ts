/* eslint-disable linebreak-style */
/* eslint-disable no-empty-function */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-constructor */
/* eslint-disable function-paren-newline */
/* eslint-disable import/prefer-default-export */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable linebreak-style */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import { BehaviorSubject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Globals } from '../globals';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
@Injectable({
  providedIn: 'root',
})

export class DhibhaDataService {
    apiurl: any;

    empdetailsurl:any;

 vehicleurl: any;

vehicleurl1:any;

itendextraurl:any;

    billapprovalurl:any;

itemrequirementurl:any;

terminalurl:any

    autoproduction:any;

machineprodurl:any;

banksturl:any;

    petrocardurl:any;

 driverallotmenturl: any;

    dccorrectionurl: any;

    public clientUrl:any;

    public serverUrl:any;

    FinYear:any;

From:any;

To:any;

ReportType:any;

Status:any;

OptSelected:any;

region:any;

    array:any=[];

    httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-api-key': this.global.TmpCdeFedG,
      }),
    };

    private messageSource = new BehaviorSubject('default message');

    currentMessage = this.messageSource.asObservable();

    constructor(private http: HttpClient,
         public global: Globals,
         private snackBar: MatSnackBar) {}

    passMessage(message: any) {
      this.messageSource.next(message);
    }

    PostCollectData(body:any) {
      return this.http.post(`${this.global.gApiserver}/api/datareqrshThree`, JSON.stringify(body), this.httpOptions);
    }

    PostDepositData(body:any) {
      return this.http.post(`${this.global.gApiserver}/api/datareqrshThree`, JSON.stringify(body), this.httpOptions);
    }

    PostBranchCollect(body:any) {
      return this.http.post(`${this.global.gApiserver}/api/datareqrshThree`, JSON.stringify(body), this.httpOptions);
    }

    PostBranchDeposit(body:any) {
      return this.http.post(`${this.global.gApiserver}/api/datareqrshThree`, JSON.stringify(body), this.httpOptions);
    }

    PostAudit(body:any) {
      return this.http.post(`${this.global.gApiserver}/api/datareqrshThree`, JSON.stringify(body), this.httpOptions);
    }

    PostStockScan(body:any) {
      return this.http.post(`${this.apiurl}/api/datareqrachn`, JSON.stringify(body), this.httpOptions);
    }

    importScannedFile(body:any) {
      return this.http.post(`${this.apiurl}/api/JsonPayloadRam`, JSON.stringify(body), this.httpOptions);
    }

    PostDebtor(body:any) {
      return this.http.post(`${this.apiurl}/homeload`, JSON.stringify(body), this.httpOptions);
    }

    PostCreditor(body:any) {
      return this.http.post(`${this.apiurl}/api/datareqkrshThree`, JSON.stringify(body), this.httpOptions);
    }

    PostDebtorTable(body:any) {
      return this.http.post(`${this.apiurl}/api/accountsG1`, JSON.stringify(body), this.httpOptions);
    }

    PostEmpDetail(body:any) {
      return this.http.post(`${this.empdetailsurl}/api/datareqkrshTwo`, JSON.stringify(body), this.httpOptions);
    }

    getVehicleDashboardAPI(body:any) {
      return this.http.post(`${this.vehicleurl}/api/datareqsarn`, JSON.stringify(body), this.httpOptions);
    }

    vehiclemasterSave(body:any) {
      return this.http.post(`${this.vehicleurl}/api/JsonPayloadSngl`, JSON.stringify(body), this.httpOptions);
    }

    BillingApproval(body:any) {
      return this.http.post(`${this.clientUrl}/api/datareqsarnThree`, JSON.stringify(body), this.httpOptions);
    }

    BillingApprovalEcheck(body:any) {
      return this.http.post(`${this.clientUrl}/api/datareqsarn`, JSON.stringify(body), this.httpOptions);
    }

    BillingApprovalCusdetail(body:any) {
      return this.http.post(`${this.clientUrl}/api/datareqsarnThree`, JSON.stringify(body), this.httpOptions);
    }

    ViewApproval(body:any) {
      return this.http.post(`${this.serverUrl}/api/datareqsarn`, JSON.stringify(body), this.httpOptions);
    }

    ItemRequirement(body:any) {
      return this.http.post(`${this.itemrequirementurl}/api/datareqsarnThree`, JSON.stringify(body), this.httpOptions);
    }

    SaveItemRequirement(body:any) {
      return this.http.post(`${this.itemrequirementurl}/api/JsonPayloadSaran1`, JSON.stringify(body), this.httpOptions);
    }

    Dutychart(body:any) {
      return this.http.post(`${this.apiurl}/api/datareqrshFive`, JSON.stringify(body), this.httpOptions);
    }

    Dutychart1(body:any) {
      return this.http.post(`${this.apiurl}/api/JsonPayloadRjs`, JSON.stringify(body), this.httpOptions);
    }

    Autoproduction(body:any) {
      return this.http.post(`${this.autoproduction}/api/datareqsarnFour`, JSON.stringify(body), this.httpOptions);
    }

    SaveAutoProdn(body:any) {
      return this.http.post(`${this.autoproduction}/api/JsonPayloadSaran1`, JSON.stringify(body), this.httpOptions);
    }

    TerminalstoUser(body:any) {
      return this.http.post(`${this.terminalurl}/api/datareqsarnFour`, JSON.stringify(body), this.httpOptions);
    }

    SaveTerminal(body:any) {
      return this.http.post(`${this.terminalurl}/api/JsonPayloadSaran1`, JSON.stringify(body), this.httpOptions);
    }

    IntendExtras(body:any) {
      return this.http.post(`${this.itendextraurl}/api/datareqkrsh`, JSON.stringify(body), this.httpOptions);
    }

    MachineProdLogs(body:any) {
      return this.http.post(`${this.machineprodurl}/api/datareqsarnFour`, JSON.stringify(body), this.httpOptions);
    }

    BankStatement(body:any) {
      return this.http.post(`${this.banksturl}/api/datareqrshSix`, JSON.stringify(body), this.httpOptions);
    }

    MachinetoItemMapping(body:any) {
      return this.http.post(`${this.apiurl}/api/datareqsarnFour`, JSON.stringify(body), this.httpOptions);
    }

    MachinetoItemMapping1(body:any) {
      return this.http.post(`${this.apiurl}/api/datareqrshSeven`, JSON.stringify(body), this.httpOptions);
    }

    DcCorrection(body:any) {
      return this.http.post(`${this.dccorrectionurl}/api/datareqsarnFour`, JSON.stringify(body), this.httpOptions);
    }

    PetroCard(body:any) {
      return this.http.post(`${this.petrocardurl}/api/datareqrachnFive`, JSON.stringify(body), this.httpOptions);
    }

    DriverAllotment(body:any) {
      return this.http.post(`${this.driverallotmenturl}/api/datareqsarnThree`, JSON.stringify(body), this.httpOptions);
    }

    CompanyMasterSave(body:any) {
      return this.http.post(`${this.apiurl}/api/JsonPayloadRam`, JSON.stringify(body), this.httpOptions);
    }

    CompanyMasterView(body:any) {
      return this.http.post(`${this.apiurl}/api/datareqrachnFour`, JSON.stringify(body), this.httpOptions);
    }

    EmpTransfer(body:any) {
      return this.http.post(`${this.apiurl}/api/datareqsarnFive`, JSON.stringify(body), this.httpOptions);
    }

    EmpTransferRegion(body:any) {
      return this.http.post(`${this.apiurl}/api/datareqsarnTwo`, JSON.stringify(body), this.httpOptions);
    }

    EmpTransferPayApprvl(body:any) {
      return this.http.post(`${this.apiurl}/api/datareqrachnFive`, JSON.stringify(body), this.httpOptions);
    }

    GenerateCertificate(body:any) {
      return this.http.post(`${this.apiurl}/api/datareqkrshTwo`, JSON.stringify(body), this.httpOptions);
    }

    PoMasters(body:any) {
      return this.http.post(`${this.apiurl}/api/datareqrachnSix`, JSON.stringify(body), this.httpOptions);
    }

    RshSeven(body:any) {
      return this.http.post(`${this.apiurl}/api/datareqrshSeven`, JSON.stringify(body), this.httpOptions);
    }

    RshEight(body:any) {
      return this.http.post(`${this.apiurl}/api/datareqrshEight`, JSON.stringify(body), this.httpOptions);
    }

    SarnSix(body:any) {
      return this.http.post(`${this.apiurl}/api/datareqsarnSix`, JSON.stringify(body), this.httpOptions);
    }

    SarnEight(body:any) {
      return this.http.post(`${this.apiurl}/api/datareqsarnEight`, JSON.stringify(body), this.httpOptions);
    }

    JsonDataSarn1(body:any) {
      return this.http.post(`${this.apiurl}/api/JsonPayloadSaran1`, JSON.stringify(body), this.httpOptions);
    }

    RachnEight(body:any) {
      return this.http.post(`${this.apiurl}/api/datareqrachnEight`, JSON.stringify(body), this.httpOptions);
    }

    RachnNine(body:any) {
      return this.http.post(`${this.apiurl}/api/datareqrachnNine`, JSON.stringify(body), this.httpOptions);
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
        // let url = window.URL.createObjectURL(blob);
        // let pwa = window.open(url);
      FileSaver.saveAs(data, `${fileName}_export_${new Date().getTime()}${EXCEL_EXTENSION}`);
    }

    openSnackBar(message: string) {
      this.snackBar.open(message, 'close', {
        horizontalPosition: 'end',
        verticalPosition: 'top',
        duration: 3500,
      });
    }
}
