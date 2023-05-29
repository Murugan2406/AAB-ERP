/* eslint-disable no-sequences */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-empty */
/* eslint-disable no-plusplus */
/* eslint-disable no-shadow */
/* eslint-disable prefer-destructuring */
/* eslint-disable max-len */
/* eslint-disable class-methods-use-this */
/* eslint-disable import/extensions */
/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */
/* eslint-disable import/no-unresolved */
import {
  Component, ElementRef, OnInit, TemplateRef, ViewChild,
} from '@angular/core';
import { SubSink } from 'subsink';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DatePipe, formatDate } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { debounceTime, filter, distinctUntilChanged } from 'rxjs/operators';
import { fromEvent } from 'rxjs';
import { CommonService } from 'src/app/services/common.service';
import { Globals } from 'src/app/globals';
import { AccountPostingDialogComponent } from 'src/app/commonComponents/accountPostingDialog/accountPostingDialog.component';
@Component({
  selector: 'app-petty-cash',
  templateUrl: './petty-cash.component.html',
  styleUrls: ['./petty-cash.component.css'],
})
export class PettyCashComponent implements OnInit {
  private subs = new SubSink();

  pipe: DatePipe;

  SRTitleHeader: String = 'Petty Cash';

  voucherInformation = true;

  viewSearch = '';

  InstrumentInformation = true;

  AccountingInformation = true;

  voucherInformationForm: FormGroup;

  receiptRoutes: any[] = [];

  receiptModes: any[] = [];

  cashCodes: any[] = [];

  instrumentInformationForm: FormGroup;

  accountingInformationForm: FormGroup;

  accountingDetails: any[] = [];

  view: boolean = false;

  viewRecepitNo: boolean = false;

  fileName = 'Select a file to upload';

  costCenter: string;

  accountTypes: any[] = [];

  entryTypes: any[] = [];

  receiptViewStatus = ['ALL', 'FRESH', 'AUTHORIZED', 'REJECTED', 'DELETED'];

  receiptStatus = ['ALL', 'FRESH', 'AUTHORIZED', 'UNAPPROVED', 'REJECTED'];

  viewSundryReceiptForm: FormGroup;

  entryPage: boolean = true;

  receiptNo: any;

  Doctype: any;

  tempArr: any[];

  sundryReceiptApprovalForm: FormGroup;

  isLoading = false;

  sundryReceiptsEntry = 'sundryReceiptsEntry';

  SRDelete: boolean = false;

  today = this.globals.gkDate;

  show: boolean = false;

  rejectflag: boolean = false;

  printFlag: boolean = false;

  formsubmitted: boolean = false;

  accFormsubmitted: boolean = false;

  totalAmount:number = 0

  AccInfo: boolean = false

  viewSundryscreen = false;

  public sundryReceiptApprovalDialog: TemplateRef<any>;

  @ViewChild('SRRejectDialog') reject: TemplateRef<any>;

  @ViewChild('SRReverseDialog') reverse: TemplateRef<any>;

  @ViewChild('viewSundryReceiptDialog') viewdialog: TemplateRef<any>;

  approvalDialog: any;

  bankOrCashCode: any[];

  accountNames: any[] = [];

  branchNames: any[];

  accBranchNames: any[] = [];

  CostCenterOrBr: any;

  AccDocYN: any;

  accDocYN: any;

  AccBrcode: any;

  FileImage: any;

  filename: any;

  base64File: any;

  viewBranchNames: any[];

  filterViewSRData: any[]=[];

  branchCode: any;

  sundryReceiptDetails: any[] = [];

  AttachedFilePath: any;

  attachedFilePath: any;

  minTemp: any;

  approvalSundryReceipts: any[] = [];

  approvalSRViewDetails: any[];

  @ViewChild('sundryReceiptApprovalDialog') content: TemplateRef<any>;

  @ViewChild('accountPostingDialog') accPost: TemplateRef<any>;

  divCode: any;

  currency: any;

  subDivCodes: any[];

  subDivCode: any;

  divCodes: any[];

  instrument: boolean;

  Accountflage: boolean = false;

  versionNo: string;

  accPostData: any[];

  User: any;

  bankorcashCodes: any[];

  bccode: any[] = [];

  Size: number;

  bankorcash: any;

  bankorcashcode: any;

  sundraydataDetails: any;

  public cmpName = this.globals.gUsrDefultCmpName;

  public cmpCode = this.globals.gUsrDefultCmpCode;

  public finBook = this.globals.gUsrDefultFbName;

  public finCode = this.globals.gUsrDefultFbCode;

  finbooklist: any[] = [];

  selectedAccName: any;

  selectedAccCode: any;

  receiptModess: any[] = [];

  voucherBranchNames: any[];

  voucherNo: any;

  trnsDate: any;

  srRejectForm: FormGroup;

  fblist: any[];

  approvefinCode: any;

  accName: boolean = true;

  ussageNames: any[];

  selectedUssageCode: any;

  selectedUssageName: any;

  finbook2: string;

  finbook3: string;

  AllFBList: any[] = [];

  FbTwoArr: any[];

  FbOneArr: any[];

  FbThreeArr: any[];

  finbook1: string;

  finbook: any;

  vFbCode: any;

  AccFbCode: any;

  viewFbCode: any;

  SundryApprovalList: any[];

  sundryAprFilterList: any[];

  loading: boolean;

  aprroveFBCode: any;

  vNo: any;

  sundryShopDetails: any[];

  trnsId: any;

  imgUrl: any;

  CompanyName: any;

  city: any;

  state: any;

  shopAddress: any;

  phoneNumber: any;

  gst: any;

  pinCode: any;

  webSite: any;

  title: boolean;

  viewMode: boolean = true;

  viewMode1:boolean = false;

  srReverseForm: FormGroup;

  reverseReason: any;

  datasundry: any;

  RecptAmt: any;

  entryDate: any;

  trnType: any;

  authorizedview: any;

  DrCr: any;

  DocId: any;

  tempArr1: any;

  tranType: any;

  voucherType: any;

  status: string = 'ALL';

  viewBrCode: any;

  IsFresh: boolean = false;

  submainmenu: any;

  aproviewfbform: any;

  statuss: any;

  sundryReceiptsEntrys: string;

  viewsudryfdate: any;

  costviewsry: any;

  wstatus: any = '';

  reuseFlag: boolean = true;

  accDelete: boolean = true;

  shows: boolean = true;

  apidata: any;

  handIconHide: boolean = true;

  dStatus: any= '';

  tblRowIndex: any;

  constructor(
    private router: Router,
    private globals: Globals,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private commonService: CommonService,
    public snackbar: MatSnackBar,

  ) {
    if (this.globals.gclientServer === 'Client') {
      this.commonService.apiUrl = this.globals.gServerApiUrl;
      this.commonService.reqSendto = 'datareqsarnEleven';
    } else {
      this.commonService.apiUrl = this.globals.gApiserver;
      this.commonService.reqSendto = 'datareqsarnEleven';
    }
    this.pipe = new DatePipe('en-US');
    this.finBook = this.globals.gUsrDefultFbName;

    this.currency = this.globals.gCurrency;
    this.CostCenterOrBr = this.globals.gBrcode;
    this.AccBrcode = this.globals.gBrcode;
    this.versionNo = this.globals.gversionid;
    this.submainmenu = this.globals.gmainMenuSelected;
  }

  backNavigation1() {
    if (this.globals.gmainMenuSelected === 'sundryReceiptsApproval') {
      this.sundryReceiptsEntry = 'sundryReceiptsApproval';
      this.router.navigate(['/dashboard']);
    }
  }

  backNavigation(type) {
    this.sundryReceiptsEntry === 'sundryReceiptsEntry';
    if (type === 'sundryReceiptsEntry') {
      this.router.navigate(['/dashboard']);
    } else if (type === 'sundryReceiptsApproval') {
      this.submainmenu = 'sundryReceiptsApproval';
      this.filterApprovalSR();
    }
  }

  homeNavigate() {
    this.globals.SelectDashboard = 'GROUPLIST';
    this.router.navigate(['/dashboard']);
  }

  toggleVoucherData() {
    this.voucherInformation = !this.voucherInformation;
  }

  toggleInstrumentData() {
    this.InstrumentInformation = !this.InstrumentInformation;
  }

  toggleAccountingData() {
    this.AccountingInformation = !this.AccountingInformation;
  }

  // Input field Numbers only allowed function
  onInputChange(event: any, inpPattern: string): void {
    const input = event.key;
    if (input.match(inpPattern) == null) {
      event.preventDefault();
    }
  }

  // Only Numbers with Decimals allowed function
  Decimal(event: any) {
    return (
      (event.charCode === 46 && event.target.value.indexOf('.') === -1)
      || (event.charCode >= 48 && event.charCode <= 57)
    );
  }

  ngOnInit() {
    this.getReceiptRoute();
    this.vFbCode = this.globals.gUsrDefultFbCode;
    this.AccFbCode = this.globals.gUsrDefultFbCode;
    this.viewFbCode = 'ALL';
    this.globals.gBeginTran = '';
    if (this.globals.gmainMenuSelected === 'sundryReceiptsEntry') {
      this.sundryReceiptsEntry = 'sundryReceiptsEntry';
      this.entryPage = true;
    } else if (this.globals.gmainMenuSelected === 'sundryReceiptsApproval') {
      this.sundryReceiptsEntry = 'sundryReceiptsApproval';
      const AllFbObj = { FbCode: 'ALL', FbName: 'ALL', FbCodeName: 'ALL' };
      this.sundryReceiptApprovalForm = this.fb.group({
        tranType: 'RecVcr_SunRec',
        companyName: [this.cmpName, Validators.required],
        finBookName: [AllFbObj, Validators.required],
        status: ['FRESH', Validators.required],
        fromDate: formatDate(new Date(), 'yyyy-MM-dd', 'en'),
        toDate: formatDate(new Date(), 'yyyy-MM-dd', 'en'),
      });
      this.filterApprovalSR();
    } else {
      this.submainmenu = 'sundryReceiptsEntry';
    }
    this.formInialization();
    this.getReceiptRoute();
    this.getTrantype();
    this.getReceiptMode();
    this.getAccountType();
    this.getInstrumentBank();
    this.getDivCode();
    this.getCurrency();
    this.getBranchName();
    this.getAccoountingBranchName();
    this.getFinbook();
    if (this.viewSundryReceiptForm.get('costCenter').value === 'ALL') {
      this.viewBrCode = '0';
    }
    this.getApproveFinbook();
    this.shortcuts();
  }

  formInialization() {
    const fbObj = {
      FbCode: this.globals.gUsrDefultFbCode,
      FbName: this.globals.gUsrDefultFbName,
    };
    // this.costCenter = this.globals.gBrname;
    const brObj = {
      brname: this.globals.gBrname,
      brcode: this.globals.gBrcode,
    };
    this.voucherInformationForm = this.fb.group({
      finBookName: [fbObj, Validators.required],
      costCenter: [brObj, Validators.required],
      receiptRoute: ['Bank', Validators.required],
      receiptDate: formatDate(new Date(), 'yyyy-MM-dd', 'en'),
      cashCode: ['', Validators.required],
      remitter: ['', Validators.required],
      receiptAmount: ['', Validators.required],
      attachments: '',
      narration: ['', Validators.required],
      divCode: ['', Validators.required],
      subDivCode: ['', Validators.required],
    });
    this.instrumentInformationForm = this.fb.group({
      receiptMode: ['', Validators.required],
      instrumentNo: ['', Validators.required],
      instrumentDate: formatDate(new Date(), 'yyyy-MM-dd', 'en'),
      micrNo: ['', Validators.required],
      InstrumentBank: ['', Validators.required],
      instrumentAmount: ['', Validators.required],
    });
    this.accountingInformationForm = this.fb.group({
      accountType: ['', Validators.required],
      finBookName: [fbObj, Validators.required],
      AccName: ['', Validators.required],
      amount: ['', Validators.required],
      costCenter: [brObj, Validators.required],
      remarks: ['', Validators.required],
    });
    this.viewSundryReceiptForm = this.fb.group({
      tranType: 'RecVcr_SunRec',
      fromDate: formatDate(new Date(), 'yyyy-MM-dd', 'en'),
      toDate: formatDate(new Date(), 'yyyy-MM-dd', 'en'),
      finBookName: fbObj,
      receiptRoute: ['All', Validators.required],
      receiptMode: ['All', Validators.required],
      costCenter: ['ALL', Validators.required],
      status: ['ALL', Validators.required],
    });
    this.srReverseForm = this.fb.group({
      reverseReason: ['', Validators.required],
    });
    this.srRejectForm = this.fb.group({
      Reason: ['', Validators.required],
    });
  }

  shortcuts() {
    const keydown$ = fromEvent(window, 'keydown');
    this.subs.add(
      keydown$.subscribe((event: KeyboardEvent) => {
        if (event.altKey && event.key === 'c') {
          this.clearSundryReceipt();
          return;
        }
        if (event.altKey && event.key === 's') {
          this.saveSundryReceipt();
          return;
        }
        if (event.altKey && event.key === 'v') {
          this.viewSundryReceipt();
          return;
        }
        if (event.altKey && event.key === 'x') {
          this.router.navigate(['/dashboard']);
        }
      }),
    );
  }

  onNarrationSelect(event: any) {
    if (event.key === 'Enter' || event.key === 'Tab') {
      if (this.voucherInformationForm.get('receiptRoute').value === 'Bank') {
        setTimeout(() => {
          document.getElementById('divCode')?.focus();
        });
      } else {
        setTimeout(() => {
          document.getElementById('divCode')?.focus();
        });
      }
    }
  }

  selectDivCode(event: any) {
    if (!event.isUserInput) {
      return;
    }

    setTimeout(() => {
      this.getSubDivCode();
      document.getElementById('subDivCode')?.focus();
    }, 100);
  }

  selectSubDivCode(event: any) {
    if (!event.isUserInput) {
      return;
    }
    setTimeout(() => {
      if (event.source.value) {
        if (this.voucherInformationForm.get('receiptRoute').value === 'Bank') {
          document.getElementById('receiptMode')?.focus();
        } else {
          document.getElementById('accountType')?.focus();
        }
      }
    }, 100);
  }

  keytab(e: any, id: any): void {
    if (e.key === 'Enter') {
      if (e.target.value === '') {
      } else {
        setTimeout(() => {
          document.getElementById(id)?.focus();
        }, 100);
      }
    }
  }

  remarksSelection(e: any, form: any) {
    if (e.key === 'Enter') {
      if (e.target.value === '') {
      } else {
        this.addAccountingDetails(form);
      }
    }
  }

  change(e: any, id: any): void {
    console.log(e.isUserInput);

    if (!e.isUserInput) {
      return;
    }
    console.log(e);

    if (e.source.value !== '') {
      setTimeout(() => {
        document.getElementById(id)?.focus();
      }, 100);
    }
  }

  changeAccName(e: any) {
    if (!e.isUserInput) {
      return;
    }
    setTimeout(() => {
      if (e.source.value === 'Account Code') {
        this.accountingInformationForm.get('AccName').reset();
        this.accountNames = [];
        this.ussageNames = [];
        this.getAccountName();
        this.accName = true;
        setTimeout(() => {
          document.getElementById('accname')?.focus();
        }, 100);
      } else {
        this.accountNames = [];
        this.ussageNames = [];
        this.accName = !this.accName;
        this.accountingInformationForm.get('AccName').reset();
        this.getUssageName();
        setTimeout(() => {
          document.getElementById('ussageName')?.focus();
        }, 100);
      }
    }, 100);
  }

  onfromDateSelect(event: any) {
    this.minTemp = event.target.value;
    if (event.key === 'Enter' || event.key === 'Tab') {
      setTimeout(() => {
        document.getElementById('toDate')?.focus();
      });
    }
  }

  onToDateSelect(event: any) {
    if (event.key === 'Enter' || event.key === 'Tab') {
      setTimeout(() => {
        document.getElementById('viewReceiptRoute')?.focus();
      });
    }
  }

  selectViewReceiptRoute(event: any) {
    if (!event.isUserInput) {
      return;
    }
    setTimeout(() => {
      if (event.source.value) {
        setTimeout(() => {
          document.getElementById('viewReceiptMode')?.focus();
        });
        this.filterViewSR();
      }
    }, 100);
  }

  selectViewReceiptMode(event: any) {
    if (!event.isUserInput) {
      return;
    }
    setTimeout(() => {
      if (event.source.value) {
        document.getElementById('status')?.focus();

        this.filterViewSR();
      }
    }, 100);
  }

  onApprovalFromDate(event: any) {
    if (event.key === 'Enter' || event.key === 'Tab') {
      setTimeout(() => {
        document.getElementById('approvalToDate')?.focus();
      });
    }
  }

  onApprovalToDate(event: any) {
    if (event.key === 'Enter' || event.key === 'Tab') {
      setTimeout(() => {
        document.getElementById('status')?.focus();
      });
    }
  }

  selectStatus(event: any) {
    if (!event.isUserInput) {
      return;
    }
    setTimeout(() => {
      this.statuss = event.source.value;
      if (event.source.value) {
        document.getElementById('button')?.focus();

        this.filterViewSR();
      }
    }, 100);
  }

  selectApprovalStatus(event: any) {
    if (!event.isUserInput) {
      return;
    }
    setTimeout(() => {
      this.statuss = event.source.value;
      if (event.source.value) {
        if (event.source.value === 'AUTHORIZED') {
          this.status = 'APPROVED';
        } else {
          this.status = event.source.value;
        }
        this.filterApprovalSR();

        document.getElementById('button')?.focus();
      }
    }, 100);
  }

  getTrantype() {
    const api = {
      reqMainreq: 'VoucherList',
      Usr: this.globals.gUsrid,
      brcode: this.globals.gBrcode,
      var1: 'Petty Cash',
    };
    this.subs.add(
      this.commonService.sendReqst(api).subscribe({
        next: (response) => {
          console.log(response);

          if (response.length > 0) {
            if (response[0]?.StatusResponse === 'Success') {
              this.entryTypes = response;
            } else {
              Swal.fire(response[0]?.StatusResponse);
            }
          } else {

          }
        },
        error: (error) => {
          Swal.fire({ text: 'Http failure response' });
        },
        complete: () => {},
      }),
    );
  }

  getReceiptRoute() {
    const api = {
      reqMainreq: 'SR_ReceiptRoute',
      Usr: this.globals.gUsrid,
      brcode: this.globals.gBrcode,
    };
    this.subs.add(
      this.commonService.sendReqst(api).subscribe({
        next: (response) => {
          if (response[0].StatusResponse === 'Success') {
            this.receiptRoutes = response;
          } else {
            Swal.fire(response[0].StatusResponse);
          }
        },
        error: (error) => {
          Swal.fire({ text: 'Http failure response' });
        },
        complete: () => {},
      }),
    );
  }

  getReceiptMode() {
    const api = {
      reqMainreq: 'SR_ReceiptMode',
      Usr: this.globals.gUsrid,
      brcode: this.globals.gBrcode,
    };
    this.subs.add(
      this.commonService.sendReqst(api).subscribe({
        next: (response) => {
          if (response[0].StatusResponse === 'Success') {
            this.receiptModes = response;
            this.receiptModess = this.receiptModes.map((l) => ({ value: l.ReceiptMode }));
            setTimeout(() => {
              document.getElementById('status')?.focus();
            });
          } else {
            Swal.fire(response[0].StatusResponse);
          }
        },
        error: (error) => {
          Swal.fire({ text: 'Http failure response' });
        },
        complete: () => {},
      }),
    );
  }

  getAccountType() {
    const api = {
      reqMainreq: 'SR_Acctype',
      Usr: this.globals.gUsrid,
      brcode: this.globals.gBrcode,
    };
    this.subs.add(
      this.commonService.sendReqst(api).subscribe({
        next: (response) => {
          if (response[0].StatusResponse === 'Success') {
            this.accountTypes = response;
          } else {
            Swal.fire(response[0].StatusResponse);
          }
        },
        error: (error) => {
          Swal.fire({ text: 'Http failure response' });
        },
        complete: () => {},
      }),
    );
  }

  getInstrumentBank() {
    this.commonService.reqSendto = 'datareqsarnEleven';
    const api = {
      reqMainreq: 'SR_BankCash',
      Usr: this.globals.gUsrid,
      brcode: this.globals.gBrcode,
      var1: this.voucherInformationForm.get('receiptRoute').value,
    };
    this.subs.add(
      this.commonService.sendReqst(api).subscribe({
        next: (response) => {
          if (response.length > 0) {
            if (response[0].StatusResponse === 'Success') {
              if (
                this.voucherInformationForm.get('receiptRoute').value === 'Bank'
              ) {
                this.bankorcashCodes = response;
                this.bccode = [];
                this.bccode = this.bankorcashCodes.map((l) => ({ value: l.BankCode }));
                if (this.bccode.length === 1) {
                  this.voucherInformationForm
                    .get('cashCode')
                    .patchValue(this.bankorcashCodes[0].BankCode);
                } else {
                  this.voucherInformationForm.get('cashCode').patchValue('');
                  this.voucherInformationForm.controls.cashCode.patchValue(
                    this.bankorcash,
                  );
                }
              } else if (
                this.voucherInformationForm.get('receiptRoute').value === 'Cash'
              ) {
                this.bankorcashCodes = response;
                this.bccode = [];
                this.bccode = this.bankorcashCodes.map((j) => ({ value: j.CshCode }));
                if (this.bccode.length === 1) {
                  this.voucherInformationForm
                    .get('cashCode')
                    .patchValue(this.bankorcashCodes[0].CshCode);
                } else {
                  this.voucherInformationForm.get('cashCode').patchValue('');
                  this.voucherInformationForm.controls.cashCode.patchValue(
                    this.bankorcash,
                  );
                }
              }
            } else {
              this.bankorcashCodes = [];
              Swal.fire(response[0].StatusResponse);
            }
          }
          //  else {
          //   Swal.fire("No data found.");
          // }
        },
        error: (error) => {
          Swal.fire({ text: 'Http failure response' });
        },
        complete: () => {},
      }),
    );
  }

  // Receipt Route selection change event
  selectReceiptRoute(event: any) {
    console.log(event.isUserInput);
    if (!event.isUserInput) {
      return;
    }
    setTimeout(() => {
      if (event.source.value === 'Bank') {
        this.voucherInformationForm.get('cashCode').setValue('');
        this.getInstrumentBank();
        this.InstrumentInformation = true;
        this.instrumentInformationForm.reset({
          receiptMode: '',
          instrumentNo: '',
          instrumentDate: formatDate(new Date(), 'yyyy-MM-dd', 'en'),
          micrNo: '',
          InstrumentBank: '',
          instrumentAmount: '',
        });
        this.instrument = false;
      } else {
        this.voucherInformationForm.get('cashCode').reset();
        this.getInstrumentBank();
        this.instrument = true;
      }
      this.formsubmitted = false;

      document.getElementById('receiptDate')?.focus();
    }, 100);
  }

  receiptRoute(event: any) {
    if (event === 'Bank') {
      this.InstrumentInformation = true;
      this.instrument = false;
    } else {
      this.voucherInformationForm.get('cashCode').reset();
      this.instrument = true;
    }
  }

  selectTranType(event: any) {
    if (!event.isUserInput) {
      return;
    }
    setTimeout(() => {
      if (event.source.value) {
        this.tranType = event.source.value;
        if (this.tranType === 'RecVcr_SunRec') {
          this.SRTitleHeader = 'Petty Cash Approval';
          this.filterApprovalSR();
        } else if (this.tranType === 'RecVcr_SunRec_Rev') {
          this.SRTitleHeader = 'Petty Cash Reverse Approval';
          this.filterApprovalSR();
        }
      }
    }, 100);
  }

  selectViewTranType(event: any) {
    if (!event.isUserInput) {
      return;
    }
    setTimeout(() => {
      if (event.source.value) {
        this.tranType = event.source.value;
        if (this.tranType === 'RecVcr_SunRec') {
          this.SRTitleHeader = 'Debit Credit Note';
          this.filterViewSR();
        } else if (this.tranType === 'RecVcr_SunRec_Rev') {
          this.SRTitleHeader = 'Petty Cash Reversal Request';
          this.filterViewSR();
        }
      }

      document.getElementById('vFinBookName')?.focus();
    }, 100);
  }

  getAccountName() {
    this.accountingInformationForm
      .get('AccName')
      .valueChanges.pipe(
        filter((res) => res !== null),
        debounceTime(600),
        distinctUntilChanged(),
      )
      .subscribe((data: string) => {
        const api = {
          reqMainreq: 'SR_AccNameSearch',
          Usr: this.globals.gUsrid,
          brcode: this.globals.gBrcode,
          var1: data,
          var2: this.cmpCode,
          var3: this.accountingInformationForm.get('finBookName').value.FbCode,
        };
        this.subs.add(
          this.commonService.sendReqst(api).subscribe({
            next: (response) => {
              if (response.length > 0) {
                if (response[0].StatusResponse === 'Success') {
                  this.accountNames = response;
                } else {
                  this.accountNames = [];
                }
              } else {
                this.accountNames = [];
                this.commonService.openSnackbar('No data found.', '', 1000);
              }
            },
            error: (error) => {
              Swal.fire({ text: 'Http failure response' });
            },
            complete: () => {},
          }),
        );
      });
  }

  getUssageName() {
    this.accountingInformationForm
      .get('AccName')
      .valueChanges.pipe(
        filter((res) => res !== null),
        debounceTime(600),
        distinctUntilChanged(),
      )
      .subscribe((data: string) => {
        const api = {
          reqMainreq: 'SR_UssageIdSearch',
          Usr: this.globals.gUsrid,
          var1: data,
          var2: this.cmpCode,
          var3: this.accountingInformationForm.get('finBookName').value.FbCode,
          var4: this.AccBrcode,
        };
        this.subs.add(
          this.commonService.sendReqst(api).subscribe({
            next: (response) => {
              if (response.length > 0) {
                if (response[0].StatusResponse === 'Success') {
                  this.ussageNames = response;
                } else {
                  this.ussageNames = [];
                }
              } else {
                this.ussageNames = [];
                this.commonService.openSnackbar('No data found.', '', 1000);
              }
            },
            error: (error) => {
              Swal.fire({ text: 'Http failure response' });
            },
            complete: () => {},
          }),
        );
      });
  }

  getFinbook() {
    const api = {
      reqMainreq: 'SR_FBSearch',
      Usr: this.globals.gUsrid,
      brcode: this.globals.gBrcode,
      var1: this.cmpCode,
      var2: '',
    };
    this.subs.add(
      this.commonService.sendReqst(api).subscribe({
        next: (response) => {
          if (response.length > 0) {
            if (response[0].StatusResponse === 'Success') {
              this.AllFBList = response;
              this.finCode = response[0].FbCode;
            } else {
              Swal.fire(response[0].StatusResponse);
            }
          } else {
            Swal.fire('No data found.');
          }
        },
        error: (error) => {
          Swal.fire({ text: 'Http failure response' });
        },
        complete: () => {},
      }),
    );
  }

  FilterFinbook(keyValue, tabIndex) {
    const key = keyValue.toLocaleUpperCase();
    if (tabIndex === 'one') {
      this.FbOneArr = this.AllFBList.filter((option) => option.FbName.toLocaleUpperCase().includes(key));
    } else if (tabIndex === 'two') {
      this.FbTwoArr = this.AllFBList.filter((option) => option.FbName.toLocaleUpperCase().includes(key));
    } else if (tabIndex === 'three') {
      this.FbThreeArr = this.AllFBList.filter((option) => option.FbName.toLocaleUpperCase().includes(key));
    }
  }

  finbvalue(e: any, code, flag) {
    if (flag === 1) {
      if (e.source.selected) {
        this.vFbCode = code;
        this.aproviewfbform = e.source.value;
        this.voucherInformationForm.get('costCenter').reset();
        setTimeout(() => {
          document.getElementById('costCenter').focus();
        }, 100);
      }
    } else if (flag === 2) {
      if (e.source.selected) {
        this.AccFbCode = code;
        this.aproviewfbform = e.source.value;
        this.accountingInformationForm.get('costCenter').reset();
        setTimeout(() => {
          document.getElementById('AccCostCenter').focus();
        }, 100);
      }
    } else if (flag === 3) {
      if (e.source.selected) {
        this.viewFbCode = code;
        this.aproviewfbform = e.source.value;
        this.filterApprovalSR();
      }
    } else if (flag === 4) {
      if (e.source.selected) {
        this.viewFbCode = code;
        this.aproviewfbform = e.source.value;
        this.filterViewSR();
      }
    }
  }

  brSelected(event, object, flag) {
    if (event.source.selected) {
      if (flag === 1) {
        setTimeout(() => {
          document.getElementById('receiptRoute').focus();
        }, 100);
      } else if (flag === 2) {
        setTimeout(() => {
          document.getElementById('accountType').focus();
        }, 100);
      }
    }
  }

  displayFb = (option) => (option && option.FbName ? option.FbName : '');

  displayBr = (option) => (option && option.brname ? option.brname : '');

  filtergetApproveFinbook(keyValue) {
    const key = keyValue.toLocaleUpperCase();
    this.sundryAprFilterList = this.SundryApprovalList.filter((option) => option.FbName.toLocaleUpperCase().includes(key));
  }

  getApproveFinbook() {
    const api = {
      reqMainreq: 'SR_FBSearchForView',
      Usr: this.globals.gUsrid,
      brcode: this.globals.gBrcode,
      var1: this.cmpCode,
      var2: '',
    };
    this.subs.add(
      this.commonService.sendReqst(api).subscribe({
        next: (response) => {
          if (response.length > 0) {
            if (response[0].StatusResponse === 'Success') {
              this.SundryApprovalList = response;
            } else {
              Swal.fire(response[0].StatusResponse);
            }
          }
          // else {
          //   Swal.fire("No data found.");
          // }
        },
        error: (error) => {
          Swal.fire({ text: 'Http failure response' });
        },
        complete: () => {},
      }),
    );
  }

  getAccoountingBranchName() {
    this.commonService
      .autoComplete(
        this.accountingInformationForm.get('costCenter').valueChanges,
      )
      .subscribe((data: any) => {
        const api = {
          reqMainreq: 'SR_brSearch',
          Usr: this.globals.gUsrid,
          brcode: this.globals.gBrcode,
          var1: data,
          var2: this.cmpCode,
          var3: this.AccFbCode,
        };
        this.subs.add(
          this.commonService.sendReqst(api).subscribe({
            next: (response) => {
              if (response.length > 0) {
                if (response[0].StatusResponse === 'Success') {
                  this.accBranchNames = response;
                  this.AccBrcode = response[0].brcode;
                } else {
                  this.accBranchNames = [];
                  Swal.fire(response[0].StatusResponse);
                }
              } else {
                this.accBranchNames = [];
                this.commonService.openSnackbar('No data found.', '', 1000);
              }
            },
            error: (error) => {
              Swal.fire({ text: 'Http failure response' });
            },
            complete: () => {},
          }),
        );
      });
  }

  selectedFinBook(event: any) {}

  // File Selection
  selectFile(event: any) {
    try {
      this.FileImage = event.target.files[0];
      this.Size = this.FileImage.size;
      const fReader = new FileReader();
      fReader.readAsDataURL(this.FileImage);
      fReader.onloadend = (event: any) => {
        this.filename = this.FileImage.name;
        if (this.Size > 1e6) {
          this.snackbar.open('File is too large. Over 1MB', '', {
            duration: 3000,
            panelClass: ['warning'],
            verticalPosition: 'top',
            horizontalPosition: 'right',
          });
          setTimeout(() => {
            document.getElementById('fileupload')?.focus();
          }, 100);
        } else {
          setTimeout(() => {
            document.getElementById('narration')?.focus();
          }, 100);
        }
        this.base64File = event.target.result;
      };
    } catch (error) {
      this.base64File = null;
      this.fileName = 'Select a file to upload';
    }
    if (event.target.value === '') {
      this.fileName = 'Select a file to upload';
    } else {
      this.fileName = event.target.files[0].name;
    }
  }

  getBranchName() {
    this.commonService
      .autoComplete(
        this.voucherInformationForm.controls.costCenter.valueChanges,
      )
      .subscribe((data: any) => {
        const api = {
          reqMainreq: 'SR_brSearch',
          Usr: this.globals.gUsrid,
          brcode: this.globals.gBrcode,
          var1: data,
          var2: this.cmpCode,
          var3: this.vFbCode,
        };
        this.subs.add(
          this.commonService.sendReqst(api).subscribe({
            next: (response) => {
              if (response.length > 0) {
                if (response[0].StatusResponse === 'Success') {
                  this.voucherBranchNames = response;
                  this.CostCenterOrBr = response[0].brcode;
                } else {
                  this.voucherBranchNames = [];
                  Swal.fire(response[0].StatusResponse);
                }
              } else {
                this.voucherBranchNames = [];
                this.commonService.openSnackbar('No data found.', '', 1000);
              }
            },
            error: (error) => {
              Swal.fire({ text: 'Http failure response' });
            },
            complete: () => {},
          }),
        );
      });
  }

  viewBrSelect(e: any, brcode) {
    if (e.source.selected) {
      this.costviewsry = e.source.value;
      this.viewBrCode = brcode;
    }
  }

  getViewBranchName() {
    this.commonService
      .autoComplete(this.viewSundryReceiptForm.get('costCenter').valueChanges)
      .subscribe((data: any) => {
        setTimeout(() => {
          const api = {
            reqMainreq: 'SR_brSearchRPT',
            Usr: this.globals.gUsrid,
            brcode: this.globals.gBrcode,
            var1: data,
            var2: this.cmpCode,
            var3: this.viewSundryReceiptForm.get('finBookName').value.FbCode,
          };
          this.subs.add(
            this.commonService.sendReqst(api).subscribe({
              next: (response) => {
                if (response.length > 0) {
                  if (response[0].StatusResponse === 'Success') {
                    this.viewBranchNames = response;
                    this.branchCode = this.viewBranchNames[0].brcode;
                    if (
                      this.viewSundryReceiptForm.get('costCenter').value
                      === 'ALL'
                    ) {
                      this.viewBrCode = '0';
                    }
                    this.filterViewSR();
                  } else {
                    this.viewBranchNames = [];
                    this.commonService.openSnackbar('No data found.', '', 1000);
                  }
                } else {
                  this.commonService.openSnackbar('No data found', '', 1000);
                  this.viewBranchNames = [];
                  this.viewSundryReceiptForm.get('costCenter').setValue('');
                  this.viewBrCode = '';
                }
              },
              error: (error) => {
                Swal.fire({ text: 'Http failure response' });
              },
              complete: () => {},
            }),
          );
        }, 10);
      });
  }

  displayAccName = (option) => (option && option.accName ? option.accName : '');

  AccountNameSelected(event, accName) {
    if (event.source.selected) {
      this.selectedAccName = event.source.value.accName;
      this.selectedAccCode = event.source.value.accCode;
      setTimeout(() => {
        document.getElementById('amount')?.focus();
      }, 100);
    }
  }

  displayUssageName = (option) => (option && option.UsageCodeName ? option.UsageCodeName : '');

  UssageNameSelected(event, usgName) {
    if (event.source.selected) {
      this.selectedUssageName = event.source.value.UsageIdName;
      this.selectedUssageCode = event.source.value.UsageIdCode;
      setTimeout(() => {
        document.getElementById('amount')?.focus();
      }, 100);
    }
  }

  addAccountingDetails(form: any) {
    this.accFormsubmitted = true;
    if (this.accountingInformationForm.invalid) {
      Swal.fire('Fill the required fields');
    } else if (this.accountingInformationForm.valid) {
      const checkIcode = this.accountingDetails.some(
        (e) => e.AccCode === form.AccName.accCode,
      );
      const checkIcode1 = this.accountingDetails.some(
        (e) => e.AccCode === form.AccName.UsageIdCode,
      );
      if (checkIcode || checkIcode1) {
        Swal.fire({ text: 'Same Account Code/ Usage Code already exist' });
      } else if (
        Number(this.voucherInformationForm.value.receiptAmount)
            >= Number(this.totalAmount) + Number(form.amount)
      ) {
        this.accountingDetails.push({
          AccType: form.accountType,
          AccName: form.AccName.accName
            ? form.AccName.accName
            : form.AccName.UsageIdName,
          AccCode: form.AccName.accCode
            ? form.AccName.accCode
            : form.AccName.UsageIdCode,
          amount: Number(form.amount),
          finBookName: form.finBookName.FbName,
          costCenter: form.costCenter,
          remarks: form.remarks,
        });
        const fbObj = {
          FbCode: this.globals.gUsrDefultFbCode,
          FbName: this.globals.gUsrDefultFbName,
        };
        this.accountingInformationForm.reset({
          costCenter: this.costCenter,
          finBookName: fbObj,
        });
        setTimeout(() => {
          document.getElementById('accountType')?.focus();
        });
        this.ussageNames = [];
        this.accountNames = [];
      } else {
        Swal.fire('Amount mismatch');
      }
      this.accFormsubmitted = false;
    } else {
      Swal.fire('select valid input');
    }
  }

  deleteAccountingData(index: number) {
    Swal.fire({
      text: 'Are you sure want to delete ?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
        this.accountingDetails.splice(index, 1);
      }
    });
  }

  getDivCode() {
    const api = {
      reqMainreq: 'SR_DivisionCode',
    };
    this.subs.add(
      this.commonService.sendReqst(api).subscribe({
        next: (response) => {
          if (response.length > 0) {
            if (response[0].StatusResponse === 'Success') {
              this.divCodes = response;
            } else {
              Swal.fire(response[0].StatusResponse);
            }
          } else {
            Swal.fire('No data found.');
          }
        },
        error: (error) => {
          Swal.fire({ text: 'Http failure response' });
        },
        complete: () => {},
      }),
    );
  }

  getSubDivCode() {
    const api = {
      reqMainreq: 'SR_SubDivisionCode',
      var1: this.voucherInformationForm.get('divCode').value,
    };
    this.subs.add(
      this.commonService.sendReqst(api).subscribe({
        next: (response) => {
          if (response.length > 0) {
            if (response[0].StatusResponse === 'Success') {
              this.subDivCodes = response;
            } else {
              Swal.fire(response[0].StatusResponse);
            }
          } else {
            Swal.fire('No data found.');
          }
        },
        error: (error) => {
          Swal.fire({ text: 'Http failure response' });
        },
        complete: () => {},
      }),
    );
  }

  getCurrency() {
    const api = {
      reqMainreq: 'SR_currency',
    };
    this.subs.add(
      this.commonService.sendReqst(api).subscribe({
        next: (response) => {
          if (response.length > 0) {
            if (response[0].StatusResponse === 'Success') {
              this.currency = response[0].currency;
            } else {
              Swal.fire(response[0].StatusResponse);
            }
          } else {
            Swal.fire('No data found.');
          }
        },
        error: (error) => {
          Swal.fire({ text: 'Http failure response' });
        },
        complete: () => {},
      }),
    );
  }

  saveSRApi() {
    this.apidata = '';
    Swal.fire({
      text: 'Are you sure ?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
        this.formsubmitted = false;
        if (this.wstatus === '') {
          const saveApi = {
            reqMainreq: 'S@/SunReceiptSave/E@',
            Usr: this.globals.gUsrid,
            ReceiptRoute: this.voucherInformationForm.get('receiptRoute').value,
            ReceiptMode:
              this.instrumentInformationForm.get('receiptMode').value,
            ReceivedFrm: this.voucherInformationForm.get('remitter').value,
            VoucherType: '',
            InstrumentRecNo:
              this.instrumentInformationForm.get('instrumentNo').value,
            InstDate:
              this.instrumentInformationForm.get('instrumentDate').value,
            InstInstrumentBank: this.instrumentInformationForm.get('InstrumentBank').value,
            InstBankName: this.instrumentInformationForm.get('InstrumentBank').value,
            AcDate: this.voucherInformationForm.get('receiptDate').value,
            Narration: this.voucherInformationForm.get('narration').value,
            BankOrCashCode: this.voucherInformationForm.get('cashCode').value,
            VoucherAmt: Number(
              this.voucherInformationForm.get('receiptAmount').value,
            ),
            InstAmt: Number(
              this.instrumentInformationForm.get('instrumentAmount').value,
            ),
            Currency: this.currency,
            DivId: this.voucherInformationForm.value.divCode,
            SubDivId: this.voucherInformationForm.value.subDivCode,
            AnalysisCode: 'Ca',
            SubAnalysisCode: 'Sca',
            MICRno: this.instrumentInformationForm.get('micrNo').value,
            DeviceUniId: 0,
            VersionNo: this.versionNo,
            VoucherNo: '',
            ActrnId: '',
            RevReason: '',
            EntryDate: '',
            ExtraVar1: 'AXIS-0713',
            ExtraVar2: '',
            ExtraVar3: 'SCB-3867',
            ExtraVar4: '',
            ExtraVar5: 'CshToCsh',
            ExtraVar6: 'BANK',
            ExtraVar7: 'BANK',
            ExtraVar8: '',
            ExtraVar9: '',
            ExtraVar10: '',
            L1: [...this.tempArr],
            L2: [...this.tempArr1],
          };
          this.apidata = saveApi;
        } else if (this.wstatus === 'FRESH') {
          const saveApi = {
            reqMainreq: 'S@/SunReceiptSave/E@',
            Usr: this.globals.gUsrid,
            ReceiptRoute: this.voucherInformationForm.get('receiptRoute').value,
            ReceiptMode:
              this.instrumentInformationForm.get('receiptMode').value,
            ReceivedFrm: this.voucherInformationForm.get('remitter').value,
            VoucherType: '',
            InstrumentRecNo:
              this.instrumentInformationForm.get('instrumentNo').value,
            InstDate:
              this.instrumentInformationForm.get('instrumentDate').value,
            InstInstrumentBank: this.instrumentInformationForm.get('InstrumentBank').value,
            InstBankName: this.instrumentInformationForm.get('InstrumentBank').value,
            AcDate: this.voucherInformationForm.get('receiptDate').value,
            Narration: this.voucherInformationForm.get('narration').value,
            BankOrCashCode: this.voucherInformationForm.get('cashCode').value,
            VoucherAmt: Number(
              this.voucherInformationForm.get('receiptAmount').value,
            ),
            InstAmt: Number(
              this.instrumentInformationForm.get('instrumentAmount').value,
            ),
            Currency: this.currency,
            DivId: this.voucherInformationForm.value.divCode,
            SubDivId: this.voucherInformationForm.value.subDivCode,
            AnalysisCode: 'Ca',
            SubAnalysisCode: 'Sca',
            MICRno: this.instrumentInformationForm.get('micrNo').value,
            DeviceUniId: 0,
            VersionNo: this.versionNo,
            VoucherNo: this.sundryReceiptDetails[0].VoucherNo,
            ActrnId: '',
            RevReason: '',
            EntryDate: this.sundryReceiptDetails[0].tdate,
            L1: [...this.tempArr],
            L2: [...this.tempArr1],
          };
          this.apidata = saveApi;
        } else {
          const saveApi = {
            reqMainreq: 'S@/SunReceiptSave/E@',
            Usr: this.globals.gUsrid,
            ReceiptRoute: this.voucherInformationForm.get('receiptRoute').value,
            ReceiptMode:
              this.instrumentInformationForm.get('receiptMode').value,
            ReceivedFrm: this.voucherInformationForm.get('remitter').value,
            VoucherType: '',
            InstrumentRecNo:
              this.instrumentInformationForm.get('instrumentNo').value,
            InstDate:
              this.instrumentInformationForm.get('instrumentDate').value,
            InstInstrumentBank: this.instrumentInformationForm.get('InstrumentBank').value,
            InstBankName: this.instrumentInformationForm.get('InstrumentBank').value,
            AcDate: this.voucherInformationForm.get('receiptDate').value,
            Narration: this.voucherInformationForm.get('narration').value,
            BankOrCashCode: this.voucherInformationForm.get('cashCode').value,
            VoucherAmt: Number(
              this.voucherInformationForm.get('receiptAmount').value,
            ),
            InstAmt: Number(
              this.instrumentInformationForm.get('instrumentAmount').value,
            ),
            Currency: this.currency,
            DivId: this.voucherInformationForm.value.divCode,
            SubDivId: this.voucherInformationForm.value.subDivCode,
            AnalysisCode: 'Ca',
            SubAnalysisCode: 'Sca',
            MICRno: this.instrumentInformationForm.get('micrNo').value,
            DeviceUniId: 0,
            VersionNo: this.versionNo,
            VoucherNo: '',
            ActrnId: '',
            RevReason: '',
            EntryDate: '',
            L1: [...this.tempArr],
            L2: [...this.tempArr1],
          };
          this.apidata = saveApi;
        }

        this.globals.gBeginTran = 'BeginTran';
        this.commonService.reqSendto = 'AccEntryS1';
        this.subs.add(
          this.commonService.sendReqst(this.apidata).subscribe({
            next: (response) => {
              this.globals.gBeginTran = '';
              if (response.length > 0) {
                if (response[0].StatusResponse === 'Success') {
                  Swal.fire('Record saved successfully');
                  this.clearSundryReceipt();
                  this.base64File = '';
                  this.commonService.reqSendto = 'datareqsarnEleven';
                } else {
                  Swal.fire(response[0].StatusResponse);
                  this.commonService.reqSendto = 'datareqsarnEleven';
                }
              } else {
                this.commonService.reqSendto = 'datareqsarnEleven';
                Swal.fire('No data found.');
              }
            },
            error: (error) => {
              this.commonService.reqSendto = 'datareqsarnEleven';
              Swal.fire({ text: 'Http failure response' });
              this.globals.gBeginTran = '';
            },
            complete: () => {},
          }),
        );
      }
    });
  }

  // Save Petty Cash
  saveSundryReceipt() {
    if (this.globals.gBeginTran === 'BeginTran') {
      return;
    }
    this.formsubmitted = true;
    if (this.voucherInformationForm.get('receiptRoute').value === 'Cash') {
      const invaid = Object.keys(this.voucherInformationForm.controls).find(
        (key) => this.voucherInformationForm.controls[key].status === 'INVALID',
      );
      const lables:any = document.querySelectorAll('label');
      let M = '';
      const oinner = lables.forEach((element) => {
        if (element.htmlFor === invaid) {
          M = element.innerHTML;
        }
        return M;
      });
      if (invaid) {
        Swal.fire({ text: `Select ${M}` });
        return;
      }

      if (this.accountingDetails.length !== 0 && this.voucherInformationForm.valid) {
        if (this.voucherInformationForm.get('attachments').value) {
          this.Doctype = 'Yes';
          this.accDocYN = 'Y';
        } else {
          this.Doctype = 'No';
          this.accDocYN = 'N';
        }
        if (
          Number(this.voucherInformationForm.value.receiptAmount)
          === Number(this.totalAmount)
        ) {
          this.tempArr = [];
          this.tempArr1 = [];
          this.tempArr = [
            {
              DrCr: 'Dr',
              Ssno: '1',
              CmpCode: this.cmpCode,
              FbCode:
                this.voucherInformationForm.get('finBookName').value.FbCode,
              BrCode: this.CostCenterOrBr,
              AcSelectionType: '',
              AcUsCode: '',
              AcUsName: '',
              TrnAmt: this.voucherInformationForm.get('receiptAmount').value,
              Remarks: '',
              IntrFbCmpCode: '',
              IntrFbFbCode: '',
              IntrFbBrCode: '',
              IntrFbAcCode: '',
              AcDocUniqId: '',
              AttachmentYN: this.accDocYN,
              AcDocN: this.filename,
              AcDoc: this.base64File,
            },
          ];
          this.accountingDetails.forEach((data, i) => {
            this.tempArr1.push({
              DrCr: 'Cr',
              Ssno: i + 1,
              CmpCode: this.cmpCode,
              FbCode: this.AccFbCode,
              BrCode: this.AccBrcode,
              AcSelectionType: data.AccType,
              AcUsCode: data.AccCode,
              TrnAmt: data.amount,
              Remarks: data.remarks,
              IntrFbCmpCode: '',
              IntrFbFbCode: '',
              IntrFbBrCode: '',
              IntrFbAcCode: '',
              AcDocUniqId: '',
              AttachmentYN: 'N',
              AcDocN: '',
              AcDoc: '',
            });
          });
          this.saveSRApi();
        } else {
          Swal.fire({ text: 'Receipt amount and Total amount is not equal' });
        }
      } else {
        Swal.fire('Fill Accounting information');
      }
    } else if (this.voucherInformationForm.get('receiptRoute').value === 'Bank') {
      const invaid = Object.keys(this.voucherInformationForm.controls).find(
        (key) => this.voucherInformationForm.controls[key].status === 'INVALID',
      );
      const lables:any = document.querySelectorAll('label');
      let M = '';
      const inner = lables.forEach((element) => {
        if (element.htmlFor === invaid) {
          M = element.innerHTML;
        }
        return M;
      });

      if (invaid) {
        Swal.fire({ text: `Select ${M} ` });
        return;
      }

      const invaid1 = Object.keys(this.instrumentInformationForm.controls).find(
        (key) => this.instrumentInformationForm.controls[key].status === 'INVALID',
      );
      const lables1:any = document.querySelectorAll('label');
      let M1 = '';
      const inner1 = lables1.forEach((element) => {
        if (element.htmlFor === invaid1) {
          M1 = element.innerHTML;
        }
        return M1;
      });

      if (invaid1) {
        Swal.fire({ text: `Select ${M1} ` });
        return;
      }

      if (this.accountingDetails.length !== 0 && this.voucherInformationForm.valid && this.instrumentInformationForm.valid) {
        if (this.voucherInformationForm.get('attachments').value) {
          this.Doctype = 'Yes';
          this.accDocYN = 'Y';
        } else {
          this.Doctype = 'No';
          this.accDocYN = 'N';
        }
        if (
          Number(this.voucherInformationForm.value.receiptAmount)
            === Number(this.totalAmount)
          && Number(this.instrumentInformationForm.value.instrumentAmount)
            === Number(this.totalAmount)
        ) {
          this.tempArr = [];
          this.tempArr1 = [];
          this.tempArr = [
            {
              DrCr: 'Dr',
              Ssno: '1',
              CmpCode: this.cmpCode,
              FbCode:
                this.voucherInformationForm.get('finBookName').value.FbCode,
              BrCode: this.CostCenterOrBr,
              AcSelectionType: '',
              AcUsCode: '',
              AcUsName: '',
              TrnAmt: this.voucherInformationForm.get('receiptAmount').value,
              Remarks: '',
              IntrFbCmpCode: '',
              IntrFbFbCode: '',
              IntrFbBrCode: '',
              IntrFbAcCode: '',
              AcDocUniqId: '',
              AttachmentYN: this.accDocYN,
              AcDocN: this.filename,
              AcDoc: this.base64File,
            },
          ];
          this.accountingDetails.forEach((data, i) => {
            this.tempArr1.push({
              DrCr: 'Cr',
              Ssno: i + 1,
              CmpCode: this.cmpCode,
              FbCode: this.AccFbCode,
              BrCode: this.AccBrcode,
              AcSelectionType: data.AccType,
              AcUsCode: data.AccCode,
              TrnAmt: data.amount,
              Remarks: data.remarks,
              IntrFbCmpCode: '',
              IntrFbFbCode: '',
              IntrFbBrCode: '',
              IntrFbAcCode: '',
              AcDocUniqId: '',
              AttachmentYN: 'N',
              AcDocN: '',
              AcDoc: '',
            });
          });
          this.saveSRApi();
        } else {
          Swal.fire({
            text: 'Receipt amount, Instrument amount and Total amount is not equal',
          });
        }
      } else {
        Swal.fire('Fill Accounting information');
      }
    }
  }

  openAccountPostingDialog() {
    this.title = true;
    this.authorizedview = this.sundraydataDetails;
    this.trnsId = this.sundraydataDetails[0].AcTrnId;
    const dialogRef = this.dialog.open(AccountPostingDialogComponent, {
      width: '100vw',
      maxWidth: '',
      height: '100vh',
      disableClose: true,
      data: this.trnsId,
    });
  }

  viewSundryReceipt() {
    this.viewSundryscreen = true;
    setTimeout(() => {
      const tbody = document.getElementById('viewTable').querySelectorAll('tr');
      tbody[this.tblRowIndex + 1]?.focus();
    }, 100);
  }

  closeViewSundryReceipt() {
    this.sundryReceiptsEntrys = '';
    this.viewSundryscreen = false;
    this.dialog.closeAll();
    this.clearSundryReceipt();
  }

  getTotalAmount() {
    this.totalAmount = 0;
    let TotalAmt = 0;
    for (let i = 0; i < this.accountingDetails.length; i++) {
      if (this.accountingDetails[i].amount) {
        TotalAmt += Number(this.accountingDetails[i].amount);
        this.totalAmount = TotalAmt;
      }
    }
    return TotalAmt.toFixed(2);
  }

  closePrintPreview() {
    this.dialog.closeAll();
  }

  backClicked(type, templateRef: TemplateRef<any>) {
    if (type === 'sundryReceiptsEntry') {
      if (this.sundryReceiptsEntrys === 'viewSundryReceiptDialog') {
        this.viewSundryReceipt();
        this.viewSundryscreen = true;
      } else {
        this.router.navigate(['/dashboard']);
      }
    } else if (type === 'sundryReceiptsApproval') {
      this.submainmenu = 'sundryReceiptsApproval';
      this.filterApprovalSR();
      this.approvalSundryReceipts = [];
    }
  }

  filterViewSR() {
    this.commonService.reqSendto = 'datareqsarnEleven';
    if (this.viewSundryReceiptForm.valid) {
      this.loading = true;
      this.viewsudryfdate = formatDate(
        this.viewSundryReceiptForm.get('fromDate').value,
        'dd-MMM-yyyy',
        'en',
      );
      const api = {
        reqMainreq: 'SR_EntryView',
        Usr: this.globals.gUsrid,
        brcode: this.globals.gBrcode,
        var1: formatDate(
          this.viewSundryReceiptForm.get('fromDate').value,
          'dd-MMM-yyyy',
          'en',
        ),
        var2: formatDate(
          this.viewSundryReceiptForm.get('toDate').value,
          'dd-MMM-yyyy',
          'en',
        ),
        var3: this.viewSundryReceiptForm.get('receiptRoute').value,
        var4: this.viewSundryReceiptForm.get('receiptMode').value,
        var5: this.viewBrCode,
        var6: this.cmpCode,
        var7: this.viewSundryReceiptForm.get('finBookName').value.FbCode,
        var8: this.viewSundryReceiptForm.get('status').value,
        var9: this.viewSundryReceiptForm.value.tranType,
      };
      this.filterViewSRData = [];
      this.subs.add(
        this.commonService.sendReqst(api).subscribe({
          next: (response) => {
            this.loading = false;
            if (response.length > 0) {
              if (response[0].StatusResponse === 'Success') {
                this.filterViewSRData = response;
                this.trnType = this.filterViewSRData[0].transtype;
                if (this.trnType === 'RecVcr_SunRec_Rev') {
                  this.handIconHide = false;
                } else {
                  this.handIconHide = true;
                }
              } else {
                this.filterViewSRData = [];
              }
            } else {
              this.filterViewSRData = [];
            }
          },
          error: (error) => {
            this.loading = false;
            Swal.fire({ text: 'Http failure response' });
          },
          complete: () => {},
        }),
      );
    } else {
      Swal.fire('Fill Required inputs');
    }
  }

  deleteSundryReceipt() {
    if (
      this.voucherInformationForm.invalid
      && this.instrumentInformationForm.invalid
      && this.accountingDetails.length === 0
    ) {
    } else {
      Swal.fire({
        text: 'Are you sure want to delete ?',
        showCancelButton: true,
        confirmButtonText: 'Yes',
      }).then((result) => {
        if (result.isConfirmed) {
          const api = {
            reqMainreq: 'SR_DeleteEntry',
            Usr: this.globals.gUsrid,
            brcode: this.globals.gBrcode,
            var1: this.vNo,
            var2: formatDate(
              this.sundryReceiptDetails[0].tdate,
              'dd-MMM-yyyy',
              'en',
            ),
            var5: this.trnType,
          };
          this.commonService.reqSendto = 'datareqsarnEleven';
          this.subs.add(
            this.commonService.sendReqst(api).subscribe({
              next: (response) => {
                if (response.length > 0) {
                  if (response[0].StatusResponse === 'Success') {
                    Swal.fire('Deleted successfully');
                    this.clearSundryReceipt();
                    this.totalAmount = 0;
                    this.InstrumentInformation = true;
                  } else {
                    Swal.fire(response[0].StatusResponse);
                  }
                } else {
                  Swal.fire('No data found.');
                }
              },
              error: (error) => {
                Swal.fire({ text: 'Http failure response' });
              },
              complete: () => {},
            }),
          );
        }
      });
    }
  }

  closeModal() {
    this.dialog.closeAll();
  }

  getAttachedFile() {
    const api = {
      reqMainreq: 'SR_AttachedFileView',
      Usr: this.globals.gUsrid,
      brcode: this.globals.gBrcode,
      var1: this.vNo,
      var2: this.tranType,
      var4: this.DocId,
    };
    this.subs.add(
      this.commonService.sendReqst(api).subscribe({
        next: (response) => {
          if (response.length > 0) {
            if (response[0].StatusResponse === 'Success') {
              this.AttachedFilePath = response[0].AttachmentFile;
              this.filename = response[0].DocName;
              this.base64File = this.AttachedFilePath;
            } else {
              Swal.fire(response[0].StatusResponse);
            }
          } else {
            this.viewMode1 = false;
            this.filename = '';
            this.AttachedFilePath = '';
          }
        },
        error: (error) => {
          Swal.fire({ text: 'Http failure response' });
        },
        complete: () => {},
      }),
    );
  }

  downloadFile() {
    if (this.AttachedFilePath) {
      const data1 = this.AttachedFilePath;
      const a = document.createElement('a'); // Create <a>
      a.href = data1; // Image Base64 Goes here
      a.download = this.filename; // File name Here
      a.click(); // Downloaded file
    } else {
    }
  }

  SRDetails(tabledata: any, flag: any, i) {
    this.tblRowIndex = i;
    this.wstatus = tabledata.WStatus;
    this.dStatus = tabledata.ReceiptStatus;
    const api = {
      reqMainreq: 'SR_DetailsView',
      Usr: this.globals.gUsrid,
      brcode: this.globals.gBrcode,
      var1: tabledata.VoucherNo,
      var2: formatDate(tabledata.tdate, 'dd-MMM-yyyy', 'en'),
      var3: this.viewSundryReceiptForm.get('tranType').value,
    };
    this.subs.add(
      this.commonService.sendReqst(api).subscribe({
        next: (response) => {
          if (response.length > 0) {
            if (response[0].StatusResponse === 'Success') {
              this.viewSundryscreen = false;
              this.sundryReceiptDetails = response;
              this.tranType = this.sundryReceiptDetails[0].TrnType;
              if (
                this.tranType === 'RecVcr_SunRec'
                && this.sundryReceiptDetails[0].IsReversed === 'No'
              ) {
                this.view = true;
              } else if (
                this.tranType === 'RecVcr_SunRec'
                && this.sundryReceiptDetails[0].IsReversed === 'Yes'
              ) {
                this.view = false;
              } else {
                this.view = false;
              }
              const fbObj = {
                FbCode: this.sundryReceiptDetails[0].FbCode,
                FbName: this.sundryReceiptDetails[0].FbName,
              };
              this.User = this.sundryReceiptDetails[0].Usr;
              this.vNo = this.sundryReceiptDetails[0].VoucherNo;
              this.trnsId = this.sundryReceiptDetails[0].AcTrnId;
              this.trnsDate = formatDate(
                this.sundryReceiptDetails[0].tdate,
                'dd-MMM-yyyy',
                'en',
              );
              this.sundraydataDetails = this.sundryReceiptDetails;
              this.RecptAmt = this.sundryReceiptDetails[0].VoucherAmt;
              this.bankorcash = this.sundryReceiptDetails[0].BankOrCashCode;
              this.entryDate = formatDate(
                this.sundryReceiptDetails[0].tdate,
                'dd-MMM-yyyy',
                'en',
              );
              this.voucherInformationForm.get('finBookName').setValue(fbObj);
              this.voucherInformationForm
                .get('receiptRoute')
                .setValue(this.sundryReceiptDetails[0].ReceiptRoute);
              this.receiptRoute(this.sundryReceiptDetails[0].ReceiptRoute);
              this.voucherInformationForm
                .get('receiptDate')
                .setValue(
                  formatDate(
                    this.sundryReceiptDetails[0].AcDate,
                    'yyyy-MM-dd',
                    'en',
                  ),
                );
              this.getInstrumentBank();
              this.voucherInformationForm.controls.cashCode.patchValue(
                this.sundryReceiptDetails[0].BankOrCashCode,
              );
              this.voucherInformationForm
                .get('divCode')
                .setValue(this.sundryReceiptDetails[0].DivId);
              this.getSubDivCode();
              this.voucherInformationForm.controls.subDivCode.setValue(
                this.sundryReceiptDetails[0].SubDivId,
              );
              this.voucherInformationForm.controls.attachments.setValue('');
              this.voucherInformationForm
                .get('remitter')
                .setValue(this.sundryReceiptDetails[0].ReceivedFrm);
              this.voucherInformationForm
                .get('receiptAmount')
                .setValue(this.sundryReceiptDetails[0].VoucherAmt);
              this.voucherInformationForm
                .get('costCenter')
                .setValue(this.sundryReceiptDetails[0].BrName);
              this.voucherInformationForm
                .get('narration')
                .setValue(this.sundryReceiptDetails[0].Narration);
              this.getReceiptMode();
              this.instrumentInformationForm
                .get('receiptMode')
                .setValue(this.sundryReceiptDetails[0].ReceiptMode);
              this.instrumentInformationForm
                .get('instrumentNo')
                .setValue(this.sundryReceiptDetails[0].InstrumentRecNo);
              this.instrumentInformationForm
                .get('instrumentDate')
                .setValue(
                  formatDate(
                    this.sundryReceiptDetails[0].InstDate,
                    'yyyy-MM-dd',
                    'en',
                  ),
                );
              this.instrumentInformationForm
                .get('micrNo')
                .setValue(this.sundryReceiptDetails[0].MICRno);
              this.instrumentInformationForm
                .get('InstrumentBank')
                .setValue(this.sundryReceiptDetails[0].InstBankName);
              this.instrumentInformationForm
                .get('instrumentAmount')
                .setValue(this.sundryReceiptDetails[0].InstAmt);

              if (flag === 'SRView') {
                if (this.tranType === 'RecVcr_SunRec') {
                  if (this.wstatus === 'FRESH') {
                    this.viewRecepitNo = true;
                    this.voucherInformationForm.enable();
                    this.instrumentInformationForm.enable();
                    this.accountingInformationForm.enable();
                    this.AccountingInformation = false;
                    this.viewMode = true;
                    this.viewMode1 = true;
                    this.shows = true;
                    this.SRDelete = true;
                    this.accDelete = true;
                    this.Accountflage = false;
                    this.show = false;
                    this.rejectflag = false;
                  } else {
                    this.viewRecepitNo = true;
                    this.Accountflage = true;
                    this.voucherInformationForm.disable();
                    this.instrumentInformationForm.disable();
                    this.accountingInformationForm.disable();
                    this.shows = false;
                    this.viewMode = false;
                    this.viewMode1 = true;
                    this.SRDelete = false;
                    this.accDelete = false;
                  }
                  if (this.sundryReceiptDetails[0].TrnStatus === 'AUTHORIZED') {
                    this.viewRecepitNo = true;
                    this.show = true;
                    this.rejectflag = true;
                    this.printFlag = true;
                  } else {
                    this.view = false;
                    this.printFlag = false;
                    this.rejectflag = false;
                    this.show = false;
                  }
                } else if (this.tranType === 'RecVcr_SunRec_Rev') {
                  this.viewRecepitNo = true;
                  this.Accountflage = true;
                  this.voucherInformationForm.disable();
                  this.instrumentInformationForm.disable();
                  this.accountingInformationForm.disable();
                  this.shows = false;
                  this.viewMode = false;
                  this.viewMode1 = true;
                  this.SRDelete = false;
                  this.accDelete = false;
                  this.rejectflag = false;
                  this.show = false;
                  this.printFlag = false;
                  if (this.sundryReceiptDetails[0].TrnStatus === 'AUTHORIZED') {
                    this.show = true;
                    this.rejectflag = true;
                  } else if (this.wstatus === 'FRESH') {
                    this.SRDelete = true;
                  }
                }
                this.accountingDetails = [];
                this.sundryReceiptDetails.forEach((items) => {
                  if (items.DrCr === 'Cr') {
                    this.accountingDetails.push({
                      AccType: items.AcSelectionType,
                      AccCode: items.AcUsCode,
                      AccName: items.AcUsName,
                      amount: items.TrnAmt,
                      finBookName: items.FbName,
                      costCenter: items.BrName,
                      remarks: items.Remarks,
                    });
                  } else {
                    this.DocId = items.AcDocUniqId;
                    this.getAttachedFile();
                  }
                });
              } else if (flag === 'SRreEntry') {
                this.filename = '';
                this.voucherInformationForm.enable();
                this.instrumentInformationForm.enable();
                this.accountingInformationForm.enable();
                this.Accountflage = false;
                this.AccountingInformation = true;
                this.viewRecepitNo = false;
                this.view = false;
                this.accDelete = true;
                this.shows = true;
                this.SRDelete = false;
                this.viewMode = true;
                this.viewMode1 = false;
                this.printFlag = false;
                this.wstatus = '';
                this.rejectflag = false;
                this.show = false;
                if (this.tranType === 'RecVcr_SunRec_Rev') {
                  this.SRTitleHeader = 'Petty Cash';
                }
                this.accountingDetails = [];
                this.sundryReceiptDetails.forEach((items) => {
                  if (items.DrCr === 'Cr') {
                    this.accountingDetails.push({
                      AccType: items.AcSelectionType,
                      AccCode: items.AcUsCode,
                      AccName: items.AcUsName,
                      amount: items.TrnAmt,
                      finBookName: items.FbName,
                      costCenter: items.BrName,
                      remarks: items.Remarks,
                    });
                  } else {
                    this.DocId = '';
                  }
                });
              }
              this.dialog.closeAll();
              this.sundryReceiptsEntrys = 'viewSundryReceiptDialog';
              if (
                this.viewSundryReceiptForm.get('costCenter').value === 'All'
              ) {
                this.viewBrCode = '0';
              }
            } else {
              Swal.fire(response[0].StatusResponse);
            }
          }
          // else {
          //   Swal.fire("No data found.");
          // }
        },
        error: (error) => {
          Swal.fire({ text: 'Http failure response' });
        },
        complete: () => {},
      }),
    );
  }

  filterApprovalSR() {
    this.commonService.reqSendto = 'datareqsarnEleven';
    if (this.sundryReceiptApprovalForm.valid) {
      this.loading = true;
      const api = {
        reqMainreq: 'SR_getApprovalView',
        Usr: this.globals.gUsrid,
        brcode: this.globals.gBrcode,
        var1: formatDate(
          this.sundryReceiptApprovalForm.get('fromDate').value,
          'dd-MMM-yyyy',
          'en',
        ),
        var2: formatDate(
          this.sundryReceiptApprovalForm.get('toDate').value,
          'dd-MMM-yyyy',
          'en',
        ),
        var3: this.cmpCode,
        var4: this.sundryReceiptApprovalForm.value.finBookName.FbCode,
        var5: this.status,
        var7: this.sundryReceiptApprovalForm.value.tranType,
      };
      this.approvalSundryReceipts = [];
      this.subs.add(
        this.commonService.sendReqst(api).subscribe({
          next: (response) => {
            this.loading = false;
            this.commonService.reqSendto = 'datareqsarnEleven';
            if (response.length > 0) {
              if (response[0].StatusResponse === 'Success') {
                this.approvalSundryReceipts = response;
                this.wstatus = this.approvalSundryReceipts[0].WStatus;
                this.show = false;
              } else {
                Swal.fire(response[0].StatusResponse);
                this.approvalSundryReceipts = [];
              }
              this.show = false;
            } else {
              this.approvalSundryReceipts = [];
            }
          },
          error: (error) => {
            this.loading = false;
            this.commonService.reqSendto = 'datareqsarnEleven';
            Swal.fire({ text: 'Http failure response' });
          },
          complete: () => {},
        }),
      );
    } else {
      this.snackbar.open('No data found', '', {
        duration: 3000,
        panelClass: 'warning',
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
      });
    }
  }

  closeApprovalScreen() {
    this.sundryReceiptApprovalForm.reset({
      tranType: 'RecVcr_SunRec',
      status: 'ALL',
      fromDate: formatDate(new Date(), 'yyyy-MM-dd', 'en'),
      toDate: formatDate(new Date(), 'yyyy-MM-dd', 'en'),
    });
    this.approvalSundryReceipts = [];
    this.dialog.closeAll();
    this.globals.gmainMenuSelected === 'sundryReceiptsApproval';
  }

  clearSundryReceipt() {
    const fbObj = {
      FbCode: this.globals.gUsrDefultFbCode,
      FbName: this.globals.gUsrDefultFbName,
    };
    this.voucherInformationForm.reset({
      receiptDate: formatDate(new Date(), 'yyyy-MM-dd', 'en'),
      finBookName: fbObj,
      costCenter: this.costCenter,
      receiptRoute: 'Bank',
    });
    this.voucherInformationForm.enable();
    this.getInstrumentBank();
    this.bankorcash = '';
    this.instrumentInformationForm.enable();
    this.instrumentInformationForm.reset({
      receiptMode: '',
      instrumentNo: '',
      instrumentDate: formatDate(new Date(), 'yyyy-MM-dd', 'en'),
      micrNo: '',
      InstrumentBank: '',
      instrumentAmount: '',
    });
    this.accountingInformationForm.enable();
    this.accountingInformationForm.reset({
      finBookName: fbObj,
      costCenter: this.costCenter,
    });
    this.accDelete = true;
    this.Accountflage = false;
    this.accountingDetails = [];
    this.AccountingInformation = true;
    this.SRDelete = false;
    this.sundryReceiptsEntrys = 'sundryReceiptsEntry';
    this.instrument = false;
    this.totalAmount = 0;
    this.viewMode = true;
    this.viewMode1 = false;
    this.show = false;
    this.viewRecepitNo = false;
    this.view = false;
    this.wstatus = '';
    this.formsubmitted = false;
    this.accFormsubmitted = false;
    this.printFlag = false;
    this.tblRowIndex = 0;
  }

  approvalSRDetails(tabledata: any) {
    const api = {
      reqMainreq: 'SR_getApprovalDetailsView',
      Usr: this.globals.gUsrid,
      brcode: this.globals.gBrcode,
      var1: tabledata.Trnid,
      var2: formatDate(tabledata.Time, 'dd-MMM-yyyy', 'en'),
      var4: this.cmpCode,
      var5: tabledata.FbCode,
      var7: this.sundryReceiptApprovalForm.value.tranType,
    };
    this.subs.add(
      this.commonService.sendReqst(api).subscribe({
        next: (response) => {
          this.commonService.reqSendto = 'datareqsarnEleven';
          if (response.length > 0) {
            if (response[0].StatusResponse === 'Success') {
              this.approvalSRViewDetails = response;
              this.wstatus = tabledata.WStatus;
              this.dStatus = tabledata.VStatus;
              this.viewMode1 = true;
              this.viewMode = false;
              if (this.approvalSRViewDetails[0].TrnType === 'RecVcr_SunRec') {
                this.SRTitleHeader = 'Sundry Receipt Approval';
              } else if (this.approvalSRViewDetails[0].TrnType === 'RecVcr_SunRec_Rev') {
                this.SRTitleHeader = 'Sundry Receipt Reverse Approval';
              }
              if (
                tabledata.CurStatus === 'FRESH' && this.approvalSRViewDetails[0].TrnType === 'RecVcr_SunRec'
                && this.approvalSRViewDetails[0].ApproveOnly === 'Y'
              ) {
                this.IsFresh = true;
              } else if (tabledata.CurStatus === 'FRESH' && this.approvalSRViewDetails[0].TrnType === 'RecVcr_SunRec_Rev'
              && this.approvalSRViewDetails[0].ApproveOnly === 'Y') {
                this.IsFresh = true;
              } else {
                this.IsFresh = false;
              }
              if (this.approvalSRViewDetails[0].TrnStatus === 'AUTHORIZED') {
                this.show = true;
                this.view = false;
                this.viewRecepitNo = true;
                this.rejectflag = true;
              } else {
                this.show = false;
                this.view = false;
                this.viewRecepitNo = true;
              }
              this.Accountflage = true;
              this.voucherInformationForm.disable();
              this.instrumentInformationForm.disable();
              this.accountingInformationForm.disable();
              this.sundraydataDetails = this.approvalSRViewDetails;
              this.tranType = this.approvalSRViewDetails[0].TrnType;
              this.User = this.approvalSRViewDetails[0].Usr;
              (this.voucherType = this.approvalSRViewDetails[0].VoucherType),
              (this.trnsId = this.approvalSRViewDetails[0].AcTrnId);
              this.RecptAmt = this.approvalSRViewDetails[0].VoucherAmt;
              this.bankorcash = this.approvalSRViewDetails[0].BankOrCashCode;
              this.vNo = this.approvalSRViewDetails[0].VoucherNo;
              this.trnsDate = formatDate(
                this.approvalSRViewDetails[0].tdate,
                'dd-MMM-yyyy',
                'en',
              );
              this.entryDate = formatDate(
                this.approvalSRViewDetails[0].tdate,
                'dd-MMM-yyyy',
                'en',
              );
              this.aprroveFBCode = this.approvalSRViewDetails[0].FbCode;
              this.submainmenu = 'sundryReceiptsEntry';
              this.voucherInformationForm
                .get('receiptRoute')
                .setValue(this.approvalSRViewDetails[0].ReceiptRoute);
              this.receiptRoute(this.approvalSRViewDetails[0].ReceiptRoute);
              this.voucherInformationForm
                .get('receiptDate')
                .setValue(
                  formatDate(
                    this.approvalSRViewDetails[0].AcDate,
                    'yyyy-MM-dd',
                    'en',
                  ),
                );
              this.getInstrumentBank();
              this.voucherInformationForm.controls.cashCode.patchValue(
                this.bankorcash,
              );
              this.voucherInformationForm
                .get('remitter')
                .setValue(this.approvalSRViewDetails[0].ReceivedFrm);
              this.voucherInformationForm
                .get('divCode')
                .setValue(this.approvalSRViewDetails[0].DivId);
              this.getSubDivCode();
              this.voucherInformationForm
                .get('subDivCode')
                .setValue(this.approvalSRViewDetails[0].SubDivId);
              this.voucherInformationForm
                .get('receiptAmount')
                .setValue(this.approvalSRViewDetails[0].VoucherAmt);
              this.voucherInformationForm
                .get('costCenter')
                .setValue(this.approvalSRViewDetails[0].BrName);
              this.voucherInformationForm
                .get('narration')
                .setValue(this.approvalSRViewDetails[0].Narration);
              this.instrumentInformationForm
                .get('receiptMode')
                .setValue(this.approvalSRViewDetails[0].ReceiptMode);
              this.instrumentInformationForm
                .get('instrumentNo')
                .setValue(this.approvalSRViewDetails[0].InstrumentRecNo);
              this.instrumentInformationForm
                .get('instrumentDate')
                .setValue(
                  formatDate(
                    this.approvalSRViewDetails[0].InstDate,
                    'yyyy-MM-dd',
                    'en',
                  ),
                );
              this.instrumentInformationForm
                .get('micrNo')
                .setValue(this.approvalSRViewDetails[0].MICRno);
              this.instrumentInformationForm
                .get('InstrumentBank')
                .setValue(this.approvalSRViewDetails[0].InstBankName);
              this.instrumentInformationForm
                .get('instrumentAmount')
                .setValue(this.approvalSRViewDetails[0].InstAmt);
              this.accountingDetails = [];
              this.AccountingInformation = false;
              this.approvalSRViewDetails.forEach((items) => {
                if (items.DrCr === 'Cr') {
                  this.accountingDetails.push({
                    AccType: items.AcSelectionType,
                    AccCode: items.AcUsCode,
                    AccName: items.AcUsName,
                    amount: items.TrnAmt,
                    finBookName: items.FbName,
                    costCenter: items.BrName,
                    remarks: items.Remarks,
                  });
                  this.instrumentInformationForm.disable();
                } else {
                  this.DocId = items.AcDocUniqId;
                  this.getAttachedFile();
                }
              });
            } else {
              Swal.fire(response[0].StatusResponse);
            }
            this.viewSundryReceiptForm.reset({
              tranType: 'RecVcr_SunRec',
              fromDate: formatDate(new Date(), 'yyyy-MM-dd', 'en'),
              toDate: formatDate(new Date(), 'yyyy-MM-dd', 'en'),
              finBookName: this.finBook,
              receiptRoute: 'All',
              receiptMode: 'All',
              status: 'ALL',
              costCenter: 'ALL',
            });
          }
          // else {
          //   Swal.fire("No data found.");
          // }
        },
        error: (error) => {
          this.commonService.reqSendto = 'datareqsarnEleven';
          Swal.fire({ text: 'Http failure response' });
        },
        complete: () => {},
      }),
    );
    this.SRDelete = true;
  }

  approveSR() {
    Swal.fire({
      text: 'Do you want to approve?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
        const approveApi = {
          reqMainreq: 'SR_VoucherApproval',
          Usr: this.globals.gUsrid,
          brcode: this.globals.gBrcode,
          var1: this.vNo,
          var2: this.trnsDate,
          var4: this.cmpCode,
          var5: this.aprroveFBCode,
          var7: this.tranType,
        };
        this.commonService.reqSendto = 'datareqsarnEleven';
        this.subs.add(
          this.commonService.sendReqst(approveApi).subscribe({
            next: (response) => {
              if (response[0].StatusResponse === 'Success') {
                this.commonService.openSnackbar(
                  response[0].StatusResponse,
                  '',
                  1000,
                );
                this.clearSundryReceipt();
                this.sundryReceiptsEntry = 'sundryReceiptsApproval';
                this.submainmenu = 'sundryReceiptsApproval';
                this.filterApprovalSR();
                this.approvalSundryReceipts = [];
              } else {
                Swal.fire(response[0].StatusResponse);
              }
            },
            error: (error) => {
              Swal.fire({ text: 'Http failure response' });
            },
            complete: () => {},
          }),
        );
      }
    });
  }

  reverseSR() {
    this.dialog.open(this.reverse, {
      width: '50vw',
      height: '32vh',
      maxWidth: '',
      disableClose: true,
    });
  }

  reverseSRData(form: any) {
    if (this.srReverseForm.valid) {
      this.reverseReason = this.srReverseForm.get('reverseReason').value;
      if (this.voucherInformationForm.get('attachments').value) {
        this.Doctype = 'Yes';
        this.accDocYN = 'Y';
      } else {
        this.Doctype = 'No';
        this.accDocYN = 'N';
      }
      if (this.voucherInformationForm.get('receiptRoute').value === 'Cash') {
        if (
          Number(this.voucherInformationForm.value.receiptAmount)
          === Number(this.totalAmount)
        ) {
          this.tempArr = [];
          this.tempArr1 = [];
          this.tempArr = [
            {
              DrCr: 'Dr',
              Ssno: '1',
              CmpCode: this.cmpCode,
              FbCode:
                this.voucherInformationForm.get('finBookName').value.FbCode,
              BrCode: this.CostCenterOrBr,
              AcSelectionType: '',
              AcUsCode: '',
              AcUsName: '',
              TrnAmt: this.voucherInformationForm.get('receiptAmount').value,
              Remarks: '',
              IntrFbCmpCode: '',
              IntrFbFbCode: '',
              IntrFbBrCode: '',
              IntrFbAcCode: '',
              AcDocUniqId: this.DocId,
              AttachmentYN: this.accDocYN,
              AcDocN: this.filename,
              AcDoc: this.AttachedFilePath,
            },
          ];
          this.accountingDetails.forEach((data, i) => {
            this.tempArr1.push({
              DrCr: 'Cr',
              Ssno: i + 1,
              CmpCode: this.cmpCode,
              FbCode: this.AccFbCode,
              BrCode: this.AccBrcode,
              AcSelectionType: data.AccType,
              AcUsCode: data.AccCode,
              TrnAmt: data.amount,
              Remarks: data.remarks,
              IntrFbCmpCode: '',
              IntrFbFbCode: '',
              IntrFbBrCode: '',
              IntrFbAcCode: '',
              AcDocUniqId: '',
              AttachmentYN: 'N',
              AcDocN: '',
              AcDoc: '',
            });
          });
          this.reverseApi();
        } else {
          Swal.fire({ text: 'Receipt amount and Total amount is not equal' });
        }
      } else if (
        this.voucherInformationForm.get('receiptRoute').value === 'Bank'
      ) {
        if (
          Number(this.voucherInformationForm.value.receiptAmount)
            === Number(this.totalAmount)
          && Number(this.instrumentInformationForm.value.instrumentAmount)
            === Number(this.totalAmount)
        ) {
          this.tempArr = [];
          this.tempArr1 = [];
          this.tempArr = [
            {
              DrCr: 'Dr',
              Ssno: '1',
              CmpCode: this.cmpCode,
              FbCode:
                this.voucherInformationForm.get('finBookName').value.FbCode,
              BrCode: this.CostCenterOrBr,
              AcSelectionType: '',
              AcUsCode: '',
              AcUsName: '',
              TrnAmt: this.voucherInformationForm.get('receiptAmount').value,
              Remarks: '',
              IntrFbCmpCode: '',
              IntrFbFbCode: '',
              IntrFbBrCode: '',
              IntrFbAcCode: '',
              AcDocUniqId: this.DocId,
              AttachmentYN: this.accDocYN,
              AcDocN: this.filename,
              AcDoc: this.AttachedFilePath,
            },
          ];
          this.accountingDetails.forEach((data, i) => {
            this.tempArr1.push({
              DrCr: 'Cr',
              Ssno: i + 1,
              CmpCode: this.cmpCode,
              FbCode: this.AccFbCode,
              BrCode: this.AccBrcode,
              AcSelectionType: data.AccType,
              AcUsCode: data.AccCode,
              TrnAmt: data.amount,
              Remarks: data.remarks,
              IntrFbCmpCode: '',
              IntrFbFbCode: '',
              IntrFbBrCode: '',
              IntrFbAcCode: '',
              AcDocUniqId: '',
              AttachmentYN: 'N',
              AcDocN: '',
              AcDoc: '',
            });
          });
          this.reverseApi();
        } else {
          Swal.fire({
            text: 'Receipt amount, Instrument amount and Total amount is not equal',
          });
        }
      }
      this.closeReverse();
    } else {
      Swal.fire('Fill reverse reason');
    }
  }

  reverseApi() {
    Swal.fire({
      text: 'Are you sure want to reverse?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
        const reverseApi = {
          reqMainreq: 'S@/SunReceiptRevSave/E@',
          Usr: this.globals.gUsrid,
          ReceiptRoute: this.voucherInformationForm.get('receiptRoute').value,
          ReceiptMode: this.instrumentInformationForm.get('receiptMode').value,
          ReceivedFrm: this.voucherInformationForm.get('remitter').value,
          VoucherType: this.voucherType,
          InstrumentRecNo:
            this.instrumentInformationForm.get('instrumentNo').value,
          InstDate: this.instrumentInformationForm.get('instrumentDate').value,
          InstInstrumentBank: this.instrumentInformationForm.get('InstrumentBank').value,
          InstBankName: this.instrumentInformationForm.get('InstrumentBank').value,
          AcDate: this.voucherInformationForm.get('receiptDate').value,
          Narration: this.voucherInformationForm.get('narration').value,
          BankOrCashCode: this.voucherInformationForm.get('cashCode').value,
          VoucherAmt: Number(
            this.voucherInformationForm.get('receiptAmount').value,
          ),
          InstAmt: Number(
            this.instrumentInformationForm.get('instrumentAmount').value,
          ),
          Currency: this.currency,
          DivId: this.voucherInformationForm.value.divCode,
          SubDivId: this.voucherInformationForm.value.subDivCode,
          AnalysisCode: 'Ca',
          SubAnalysisCode: 'Sca',
          MICRno: this.instrumentInformationForm.get('micrNo').value,
          DeviceUniId: 0,
          VersionNo: this.versionNo,
          VoucherNo: this.vNo,
          ActrnId: this.trnsId,
          RevReason: this.reverseReason,
          EntryDate: this.entryDate,
          L1: [...this.tempArr],
          L2: [...this.tempArr1],
        };
        this.globals.gBeginTran = 'BeginTran';
        this.commonService.reqSendto = 'AccEntryS1';
        this.subs.add(
          this.commonService.sendReqst(reverseApi).subscribe({
            next: (response) => {
              this.globals.gBeginTran = '';
              if (response.length > 0) {
                if (response[0].StatusResponse === 'Success') {
                  Swal.fire('Reverse request sent successfully');
                  this.clearSundryReceipt();
                  this.viewSundryReceipt();
                  this.filterViewSR();
                  this.accountingInformationForm.enable();
                  this.base64File = '';
                  this.wstatus = '';
                  this.commonService.reqSendto = 'datareqsarnEleven';
                } else {
                  Swal.fire(response[0].StatusResponse);
                  this.commonService.reqSendto = 'datareqsarnEleven';
                }
              } else {
                Swal.fire('No data found.');
              }
            },
            error: (error) => {
              this.commonService.reqSendto = 'datareqsarnEleven';
              Swal.fire({ text: 'Http failure response' });
              this.globals.gBeginTran = '';
            },
            complete: () => {},
          }),
        );
      }
    });
  }

  rejectSRReason() {
    if (this.vNo === '' || this.vNo === null || this.vNo === undefined) {
      Swal.fire('View SR details and then reject');
    } else {
      this.dialog.open(this.reject, {
        width: '50vw',
        height: '20vh',
        maxWidth: '',
        disableClose: true,
      });
    }
  }

  rejectSR() {
    if (this.srRejectForm.get('Reason').value) {
      Swal.fire({
        text: 'Do you want to reject?',
        showCancelButton: true,
        confirmButtonText: 'Yes',
      }).then((result) => {
        if (result.isConfirmed) {
          const rejectApi = {
            reqMainreq: 'SR_VoucherReject',
            Usr: this.globals.gUsrid,
            brcode: this.globals.gBrcode,
            var1: this.vNo,
            var2: this.trnsDate,
            var3: this.srRejectForm.get('Reason').value,
            var4: this.cmpCode,
            var5: this.aprroveFBCode,
            var7: this.tranType,
          };
          this.commonService.reqSendto = 'datareqsarnEleven';
          this.subs.add(
            this.commonService.sendReqst(rejectApi).subscribe({
              next: (response) => {
                if (response[0].StatusResponse === 'Success') {
                  this.srRejectForm.reset();
                  this.dialog.closeAll();
                  this.submainmenu = 'sundryReceiptsApproval';
                  this.clearSundryReceipt();
                  const AllFbObj = {
                    FbCode: 'ALL',
                    FbName: 'ALL',
                    FbCodeName: 'ALL',
                  };
                  this.filterApprovalSR();
                  this.approvalSundryReceipts = [];
                } else {
                  Swal.fire(response[0].StatusResponse);
                  this.srRejectForm.reset();
                  this.dialog.closeAll();
                }
              },
              error: (error) => {
                Swal.fire({ text: 'Http failure response' });
              },
              complete: () => {},
            }),
          );
        }
      });
    } else {
      Swal.fire('Fill reject reason');
    }
  }

  closeReject() {
    this.dialog.closeAll();
    this.srRejectForm.reset();
  }

  closeReverse() {
    this.dialog.closeAll();
    this.srReverseForm.reset();
  }

  printSR(templateRef: TemplateRef<any>) {
    this.dialog.open(templateRef, {
      width: '80vw',
      height: '80vh',
      maxWidth: '',
      disableClose: true,
    });
    const api = {
      reqMainreq: 'SR_BrAddressLogo',
      Usr: this.globals.gUsrid,
      var1: this.globals.gBrcode,
    };
    this.subs.add(
      this.commonService.sendReqst(api).subscribe({
        next: (response) => {
          this.sundryShopDetails = response;
          this.imgUrl = this.sundryShopDetails[0].CmpLogo;
          this.CompanyName = this.sundryShopDetails[0].Company;
          (this.shopAddress = this.sundryShopDetails[0].add1),
          this.sundryShopDetails[0].add2;
          this.city = this.sundryShopDetails[0].add3;
          this.state = this.sundryShopDetails[0].States;
          this.pinCode = this.sundryShopDetails[0].pincode;
          this.phoneNumber = this.sundryShopDetails[0].phone;
          this.webSite = this.sundryShopDetails[0].RegOffWebsite;
          this.gst = this.sundryShopDetails[0].tin;
        },
        error: (error) => {
          Swal.fire({ text: 'Http failure response' });
        },
        complete: () => {},
      }),
    );
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
    this.dialog.closeAll();
  }
}
