import { formatDate } from "@angular/common";
import { Component, Inject, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { SubSink } from "subsink";

import { Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import Swal from "sweetalert2";
import { Globals } from "src/app/globals";
import { CommonService } from "src/app/services/common.service";

@Component({
  selector: "app-accountPostingDialog",
  templateUrl: "./accountPostingDialog.component.html",
  styleUrls: ["./accountPostingDialog.component.scss"],
})
export class AccountPostingDialogComponent implements OnInit {
  private subs = new SubSink();
  accpostingL1table: any[] = [];
  SRTitleHeader: String = "Account Posting";
  searchText = "";
  accPostData: any[] = [];
  accpostingL2table: any[] = [];
  templateArr1: any[] = [];
  accountPostingForm: FormGroup;
  voucherTypes: any[] = [];
  totalDrAmount: number;
  template1: boolean = false;
  template2: boolean = true;
  title: boolean;
  hideSCCode: boolean;

  @ViewChild("sundryReceiptApprovalDialog") content: TemplateRef<any>;
  splitSection: any[] = [];
  reducedGroups: any[] = [];
  voucherType: any;
  accDate: string;
  transId: any;
  voucherNo: any;
  division: any;
  subDiv: any;
  supCode: any;
  supName: any;
  createdBy: any;
  createdOn: any;

  constructor(
    private fb: FormBuilder,
    private globals: Globals,
    private dialog: MatDialog,
    private router: Router,
    // private gCurrencyPipe: gCurrencyPipe,
    private commonService: CommonService,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<AccountPostingDialogComponent>
  ) {
    this.dialogRef.updateSize("100vw");
    if (this.globals.gclientServer === "Client") {
      this.commonService.apiUrl = this.globals.gServerApiUrl;
      this.commonService.reqSendto = "datareqsarnEleven";
    } else {
      this.commonService.apiUrl = this.globals.gApiserver;
      this.commonService.reqSendto = "datareqsarnEleven";
    }
  }

  ngOnInit() {
    // if (this.globals.gmainMenuSelected == "sundryReceiptsEntry") {
    // } else if (this.globals.gmainMenuSelected == "sundryReceiptsApproval") {
    //   // this.sundryReceiptsEntry = "sundryReceiptsApproval";
    //   // this.entryPage = false;
    // }
    this.title = true;
    this.getAccPostTableData(this.data);
    this.accountPostingForm = this.fb.group({
      voucherType: "",
      accDate: formatDate(new Date(), "yyyy-MM-dd", "en"),
      transId: "",
      voucherNo: "",
      division: "",
      subDivision: "",
      createdBy: "",
      createdOn: "",
      supCode: "",
      supName: "",
    });
  }

  //Account Posting Entries Table data load
  getAccPostTableData(data: any) {
    this.commonService.apiUrl = this.globals.gServerApiUrl;
    this.commonService.reqSendto = "datareqsarnEleven";
    let api = {
      reqMainreq: "AcPostingView",
      Usr: this.globals.gUsrid,
      brcode: this.globals.gBrcode,
      var1: data,
    };
    this.subs.add(
      this.commonService.sendReqst(api).subscribe((response) => {
        if (response[0].StatusResponse === "Success") {
          this.accPostData = response;
          this.templateArr1 = [...this.accPostData];
       this.voucherType = this.accPostData[0].VcrName;
       this.accDate = formatDate(this.accPostData[0].AcDate, "yyyy-MM-dd", "en");
       this.transId = this.accPostData[0].AcTrnId;
       this.voucherNo = this.accPostData[0].VoucherNo;
       this.division = this.accPostData[0].Divission;
       this.subDiv= this.accPostData[0].SubDivission;
       this.supCode = this.accPostData[0].SCCode;
       this.supName = this.accPostData[0].ScrName;
       this.createdBy = this.accPostData[0].Usr;
       this.createdOn = this.accPostData[0].TimeNow;
       this.accountPostingForm
            .get("voucherType")
            .setValue(this.accPostData[0].VcrName);
          this.accountPostingForm
            .get("accDate")
            .setValue(
              formatDate(this.accPostData[0].AcDate, "yyyy-MM-dd", "en")
            );
          this.accountPostingForm
            .get("transId")
            .setValue(this.accPostData[0].AcTrnId);
          this.accountPostingForm
            .get("voucherNo")
            .setValue(this.accPostData[0].VoucherNo);
          this.accountPostingForm
            .get("division")
            .setValue(this.accPostData[0].Divission);
          this.accountPostingForm
            .get("subDivision")
            .setValue(this.accPostData[0].SubDivission);
          this.accountPostingForm
            .get("createdBy")
            .setValue(this.accPostData[0].Usr);
          this.accountPostingForm
            .get("createdOn")
            .setValue(this.accPostData[0].TimeNow);
          this.accountPostingForm
            .get("supCode")
            .setValue(this.accPostData[0].SCCode);
          this.accountPostingForm
            .get("supName")
            .setValue(this.accPostData[0].ScrName);
          if (this.template1 === true) {
            this.accPostData.forEach((element) => {
              if (element.DrCr === "Dr") {
                this.accpostingL1table.push(element);
              } else if (element.DrCr === "Cr") {
                this.accpostingL2table.push(element);
              }
            });
          } else if (this.template2 === true) {
            const CrArr = [];
            const DrArr = [];

            const element = this.groupByLatestBranch(
              "Remarks",
              this.templateArr1,
              this.reducedGroups
            );
            let i = 0;
            this.templateArr1 = element;
          }
          if (this.accPostData[0].SCCode === "0") {
            this.hideSCCode = false;
          } else {
            this.hideSCCode = true;
          }
          // this.commonService.apiUrl = this.globals.gApiserver;
          // this.commonService.reqSendto = "datareqsarnEleven";
        } else {
          Swal.fire(response[0].StatusResponse);
          // this.commonService.apiUrl = this.globals.gApiserver;
          // this.commonService.reqSendto = "datareqsarnEleven";
        }
      })
    );
    // this.commonService.apiUrl = this.globals.gApiserver;
    // this.commonService.reqSendto = "datareqsarnEleven";
  }

  groupByLatestBranch(column: string, data: any[], reducedGroups?: any[]) {
    if (!column) return data;
    let collapsedGroups = reducedGroups;
    if (!reducedGroups) collapsedGroups = [];
    const customReducer = (accumulator, currentValue) => {
      const currentGroup = currentValue[column];
      if (!accumulator[currentGroup]) {
        accumulator[currentGroup] = [
          {
            DrCr: 'Dr',
            AcName: "",
            TrnAmt: `${currentValue[column]}`,
            CrtAmt: "",
          },
        ];
      }
      accumulator[currentGroup].push(currentValue);
      return accumulator;
    };
    const groups = data.reduce(customReducer, {});
    this.splitSection = [];
    const groupArray = Object.keys(groups).map((key) => groups[key]);
    this.splitSection = groupArray;
    let FinalArr = []
    groupArray.forEach((element, index) => {
      let crtotal = 0
      let drtotal = 0
      let DrArr = [];
      let CrArr = [];
      let i = 0;
      let j = 0;
      element.forEach(ele => {
      
        if(!isNaN(ele.DrAmt) && !isNaN(ele.CrAmt)){
          drtotal =ele.DrAmt +drtotal
        crtotal=ele.CrAmt +crtotal
        }
        if(ele.DrCr === 'Cr'){
          CrArr.push(ele)
          if (ele.AcName !== "" && ele.AcName !== "Grand Total" ) {
          ele = Object.assign(ele, { SNo: i + 1 }); i += 1
          }
        }else{
          DrArr.push(ele)
          if (ele.AcName !== "" && ele.AcName !== "Grand Total" ) {
          ele = Object.assign(ele, { SNo: j + 1 }); j += 1
          }
        }       
      });
      element =[]
      element = DrArr
      CrArr.forEach(data => {
        element.push(data)
      })
      element.push({
        DrCr: '',
        AcName: "Grand Total",
        DrAmt: drtotal,
        CrAmt: crtotal,
      })
      FinalArr.push(...element)
    });
    return FinalArr;
  }

  onConfirmClick(): void {
    this.dialogRef.close(true);
  }
  closeViewSundryReceipt() {
    this.dialogRef.close(true);
  }

  // getDrTotal() {
  //   let DrTotal = 0;
  //   for (var i = 0; i < this.accpostingL1table.length; i++) {
  //     if (this.accpostingL1table[i].TrnAmt) {
  //       DrTotal += Number(this.accpostingL1table[i].TrnAmt);
  //       this.totalDrAmount = DrTotal;
  //     }
  //   }
  //   return DrTotal.toFixed(2);
  // }

  // getCrTotal() {
  //   let CrTotal = 0;
  //   for (var i = 0; i < this.accpostingL2table.length; i++) {
  //     if (this.accpostingL2table[i].TrnAmt) {
  //       CrTotal += Number(this.accpostingL2table[i].TrnAmt);
  //       this.totalDrAmount = CrTotal;
  //     }
  //   }
  //   return CrTotal.toFixed(2);
  // }

  backClicked() {
    this.dialog.closeAll();
  }
}
