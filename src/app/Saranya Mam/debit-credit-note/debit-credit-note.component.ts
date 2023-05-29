/* eslint-disable no-param-reassign */
/* eslint-disable eqeqeq */
/* eslint-disable no-empty */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-plusplus */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable prefer-destructuring */
/* eslint-disable class-methods-use-this */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/prefer-default-export */

import {
  Component, OnInit, TemplateRef, ViewChild,
} from '@angular/core';
import { SubSink } from 'subsink';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import {
  FormBuilder, FormControl, FormGroup, Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DatePipe, formatDate } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { debounceTime, filter, distinctUntilChanged } from 'rxjs/operators';
import { Subject, fromEvent, merge } from 'rxjs';
import { CommonService } from 'src/app/services/common.service';
import { Globals } from 'src/app/globals';
import { Modal } from 'bootstrap';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { AccServiceService } from 'src/app/services/acc-service.service';
import { AccountPostingDialogComponent } from 'src/app/commonComponents/accountPostingDialog/accountPostingDialog.component';
import { ItemserviceService } from 'src/app/services/itemservice.service';


@Component({
  selector: 'app-debit-credit-note',
  templateUrl: './debit-credit-note.component.html',
  styleUrls: ['./debit-credit-note.component.scss'],
})
export class DebitCreditNoteComponent implements OnInit {
  private subs = new SubSink();

  pipe: DatePipe;

  voucherInformation = true;

  NoteInformation = true;

  viewSearch = '';

  InstrumentInformation = true;

  AccountingInformation = true;

  voucherInfoForm: FormGroup;

  viewDataSource =[]

  instrumentInformationForm: FormGroup;

  AccInformationForm: FormGroup;

  accountingDetails: any[] = [];

  view: boolean = false;

  viewRecepitNo: boolean = false;

  fileName = 'Select a file to upload';

  costCenter: string;

  accountTypes: any[] = [];

  entryTypes: any[] = [];

  receiptViewStatus = ['ALL', 'FRESH', 'APPROVED', 'REJECTED', 'DELETED'];

  receiptStatus = ['ALL', 'FRESH', 'AUTHORIZED', 'REJECTED', 'DELETED'];

  NoteTypes = ['Debit Note', 'Credit Note'];

  DCType: string = '';

  SectionTitle = ''

  TrnNoteType = []

  viewDCNoteForm: FormGroup;

  entryPage: boolean = true;

  receiptNo: any;

  Doctype: any;

  tempArr: any[];

  Loading = false;

  accFormsubmitted: boolean = false;

  totalAmount:number = 0

  AccInfo: boolean = false

  bankOrCashCode: any[];

  accountNames: any[] = [];

  accBranchNames: any[] = [];

  CostCenterOrBr: any;

  AccBrcode: any;

  FileImage: any;

  filename: any;

  base64File: any;

  viewBranchNames: any[];

  filterViewSRData: any[]=[];

  branchCode: any;

  DCNoteDetails: any[] = [];

  AttachedFilePath: any;

  attachedFilePath: any;

  divCode: any;

  currency: any;

  subDivCodes: any[];

  subDivCode: any;

  divCodes: any[];

  instrument: boolean;

  versionNo: string;

  Size: number;

  public cmpCode = this.globals.gUsrDefultCmpCode;

  public finBook = this.globals.gUsrDefultFbName;

  public finCode = this.globals.gUsrDefultFbCode;

  selectedAccName: any;

  selectedAccCode: any;

  voucherBranchNames: any[];

  accName: boolean = true;

  ussageNames: any[] = [];

  selectedUssageCode: any;

  selectedUssageName: any;

  AllFBList: any[] = [];

  FbTwoArr: any[];

  FbOneArr: any[];

  FbThreeArr: any[];

  vFbCode: any;

  AccFbCode: any;

  SundryApprovalList: any[];

  trnsId: any;

  trnType: any;

  DrCr: any;

  DocId: any;

  tempArr1: any;

  tranType: any;

  status: string = 'ALL';

  viewBrCode: any;

  IsFresh: boolean = false;

  GMenu: any;

  aproviewfbform: any;

  NoteInformationForm :FormGroup;

  DCApprovalForm:FormGroup;

  SupplierNameArr: any[] =[];

  poLocationList: any[] = [];

  subcodeloading: boolean = false;

  Viewloading: boolean = false;

  WStatus: string;

  latestViewRow: any;

  ReceiptStatus: string;

  viewClicked: boolean;

  showNormalDCNote: boolean = true

  showViewDCNote: boolean;

  showApproveDCNote: boolean;

  VoucherName: string;

  VoucherNo: any;

  TrnType: any;

  TrnDate: any;

  Authorized: any;

  AcTrnId: any;

  ApprovalArr: any[];

  ReverseGivenFlag: any;

  ReverseDCNote: boolean;

  OnlyView: boolean;

  trnDate: any;

  ActionMode: string = 'View';

  ShowForm: boolean;

  SupplierAcCodeArr: any[] = [];

  accCodeLoading: boolean = false;

  CommonTrntype = new FormControl('', Validators.required)

  customerSalesReport = new FormControl('', Validators.required)

  DCHistoryArr: any[] = [];

  ApprovalTableArr: any[] = [];

  approveLoad: boolean = false;

  latestApprovalRow: any = 0;

  curStatusFresh: boolean = false;

  showAccpost: boolean = false;

  showAppRejectButton: boolean = false;

  Reason = new FormControl('', Validators.required);

  canExist: boolean = true;

  attachmentAvailable: boolean = false;

  firstTime:boolean = true;

  gMainMenuName: any = '';

  shortDCType: string = '';

  docVerify = false

  verified = false;

  reverseReqMain: any = '';

  saveReqMain: any = '';

  payableData: any = [];

  searchSelect1: string = '';

  searchSelect2: string = '';

  payableAcCode ='';

  displayedArr = [

    {
      name: 'finBookName',
      display: true,
      lable: 'FBame',
    },
    {
      name: 'costCenter',
      display: true,
      lable: 'CostCenter',
    },
    // {
    //   name: 'AccType',
    //   display: true,
    //   lable: 'AccType',
    // },
    {
      name: 'AccCode',
      display: true,
      lable: 'ICode',
    },
    {
      name: 'AccName',
      display: true,
      lable: 'IName',
    },

    {
      name: 'trnType',
      display: true,
      lable: 'TrnType',
    },
    {
      name: 'PayableAcCode',
      display: true,
      lable: 'PayableAcCode',
    },
    {
      name: 'InvDate',
      display: true,
      lable: 'InvDate',
    },
    {
      name: 'InvNo',
      display: true,
      lable: 'InvNo',
    },
    {
      name: 'BaseAmt',
      display: true,
      lable: 'BaseAmt',
    },
    {
      name: 'GstAmtAuto',
      display: true,
      lable: 'GstAmtAuto',
    },
    {
      name: 'remarks',
      display: true,
      lable: 'Remarks',
    },
    {
      name: 'TotalAmt',
      display: true,
      lable: 'TotalAmt',
    },
 
  ]

  displayedArrCustomer = [

    {
      name: 'finBookName',
      display: true,
      lable: 'FBame',
    },
    {
      name: 'costCenter',
      display: true,
      lable: 'CostCenter',
    },
    // {
    //   name: 'AccType',
    //   display: true,
    //   lable: 'AccType',
    // },
    {
      name: 'AccCode',
      display: true,
      lable: 'ICode',
    },
    {
      name: 'AccName',
      display: true,
      lable: 'IName',
    },
    {
      name: 'salesType',
      display: true,
      lable: 'salesType',
    },

    {
      name: 'trnType',
      display: true,
      lable: 'TrnType',
    },
    {
      name: 'PayableAcCode',
      display: true,
      lable: 'PayableAcCode',
    },
    {
      name: 'InvDate',
      display: true,
      lable: 'InvDate',
    },
    {
      name: 'InvNo',
      display: true,
      lable: 'InvNo',
    },
    {
      name: 'BaseAmt',
      display: true,
      lable: 'BaseAmt',
    },
    {
      name: 'GstAmtAuto',
      display: true,
      lable: 'GstAmtAuto',
    },
    {
      name: 'remarks',
      display: true,
      lable: 'Remarks',
    },
    {
      name: 'TotalAmt',
      display: true,
      lable: 'TotalAmt',
    },
 
  ]


  displayedColumns = []

  SaleTypeList: any = [];

  entryTypesApp: any[] =[];

  constructor(
    private router: Router,
    private globals: Globals,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private commonService: CommonService,
    public snackbar: MatSnackBar,
    public bottomSheet: MatBottomSheet,
    private accService: AccServiceService,
    public itemservice: ItemserviceService,

  ) {
    if (this.globals.gmainMenuSelected === 'SupplierEntry' || this.globals.gmainMenuSelected === 'customerEntry') {
      this.GMenu = 'DCNoteEntry';
    } else if (this.globals.gmainMenuSelected === 'SupplierApproval' || this.globals.gmainMenuSelected === 'customerApproval') {
      this.GMenu = 'DCNoteApproval';
this.getTrantype();
    } else {
      this.router.navigate(['/dashboard']);
      return;
    }
    this.commonService.apiUrl = this.globals.gApiserver;
    this.commonService.reqSendto = 'datareqsarnEleven';

    this.pipe = new DatePipe('en-US');
    this.finBook = this.globals.gUsrDefultFbName;
    this.accService.unsubscribe$= new Subject<void>();
    this.currency = this.globals.gCurrency;
    this.CostCenterOrBr = this.globals.gBrcode;
    this.AccBrcode = this.globals.gBrcode;
    this.versionNo = this.globals.gversionid;
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

  toggleNoteData() {
    this.NoteInformation = !this.NoteInformation;
  }

  headerLoad() {
    this.displayedColumns = [];
    setTimeout(() => {
      if( this.DCType === 'Supplier'){
        this.displayedArr.forEach((element:any) => {
          if (element.display === true) {
            this.displayedColumns.push(element.name);
          }
        });
      }else{
        this.displayedArrCustomer.forEach((element:any) => {
          if (element.display === true) {
            this.displayedColumns.push(element.name);
          }
        });
      }
   
      this.bottomSheet.dismiss();
    }, 100);
  }

  headerLoadAll() {
    this.displayedColumns = [];
         if( this.DCType === 'Supplier'){
    this.displayedArr.forEach((element:any) => {
      element.display = true;
      if (element.display === true) {
        this.displayedColumns.push(element.name);
      }
    });
  }else{
        this.displayedArrCustomer.forEach((element:any) => {
      element.display = true;
      if (element.display === true) {
        this.displayedColumns.push(element.name);
      }
    });
  }
    this.bottomSheet.dismiss();
  }

  ngOnInit() {
    this.vFbCode = this.globals.gUsrDefultFbCode;
    this.AccFbCode = this.globals.gUsrDefultFbCode;
    this.globals.gBeginTran = '';
    this.gMainMenuName = this.globals.gmainMenuSelected;

    // array.forEach(element => {

    // });

    if (this.globals.gmainMenuSelected === 'SupplierEntry' || this.globals.gmainMenuSelected === 'SupplierApproval') {
      this.DCType = 'Supplier';
      this.shortDCType = 'Sup';
    } else if (this.globals.gmainMenuSelected === 'customerEntry' || this.globals.gmainMenuSelected === 'customerApproval') {
      this.DCType = 'Customer';
      this.shortDCType = 'Cust';
      this.getSaletype();
    } else {
      this.router.navigate(['/dashboard']);
      this.DCType = '';
      this.shortDCType = '';
      return;
    }
    if (this.GMenu === 'DCNoteEntry') {
      this.headerLoad();
      this.GMenu = 'DCNoteEntry';
      this.entryPage = true;

      this.showNormalDCNote = true;
      this.showApproveDCNote = false;
      this.showViewDCNote = false;
      this.DCType === 'Supplier' ? this.SectionTitle = 'Supplier Debit Note / Credit Note' : this.SectionTitle = 'Customer Debit Note / Credit Note';
    } else if (this.GMenu === 'DCNoteApproval') {
      this.showNormalDCNote = false;
      this.showApproveDCNote = true;
      this.showViewDCNote = false;
      this.GMenu = 'DCNoteApproval';
      this.DCType === 'Supplier' ? this.SectionTitle = 'Supplier Debit/Credit Note Approval' : this.SectionTitle = 'Customer Debit/Credit Note Approval';
    } else {
      this.router.navigate(['/dashboard']);
    }
    this.formInialization();
    this.getTrnType();
    this.getAccountType();
    this.getDivCode();
    this.getCurrency();
    this.getAprovalTrantype();

    this.getFinbook();

    this.getApproveFinbook();
    this.shortcuts();
    this.verifiedStatusChange();
    this.loadPayableAcCode();
  }

  formInialization() {
    const fbObj = {
      FbCode: this.globals.gUsrDefultFbCode,
      FbName: this.globals.gUsrDefultFbName,
    };
    const brObj = {
      brname: this.globals.gBrname,
      brcode: this.globals.gBrcode,
    };

    this.NoteInformationForm = this.fb.group({
      noteType: ['Debit Note', Validators.required],
      accDate: [new Date(), Validators.required],
    });
    this.voucherInfoForm = this.fb.group({
      finBookName: [fbObj, Validators.required],
      costCenter: [brObj, Validators.required],
      Supcode: [null, Validators.required],
      supplierName: ['', Validators.required],
      supplierAddress: ['', Validators.required],
      supplierState: ['', Validators.required],
      supplierAccCode: ['10013-001', Validators.required],
      // supplierAccDec: ['', Validators.required],
      supplierNoteNo: ['', Validators.required],
      supplierNoteDate: [new Date(), Validators.required],
      supplierNoteAmount: ['', Validators.required],
      attachments: [''],
      divCode: ['', Validators.required],
      subDivCode: ['', Validators.required],
      narration: ['', Validators.required],
    });
    this.instrumentInformationForm = this.fb.group({
      receiptMode: ['', Validators.required],
      instrumentNo: ['', Validators.required],
      instrumentDate: [formatDate(new Date(), 'yyyy-MM-dd', 'en'), Validators.required],
      micrNo: ['', Validators.required],
      InstrumentBank: ['', Validators.required],
      instrumentAmount: ['', Validators.required],
    });
    const trnObj = {
      StatusResponse: 'Success',
      TrnId: '5',
      Trntype: 'Advance',
    };
    this.CommonTrntype.setValue(trnObj);
    this.AccInformationForm = this.fb.group({
      accountType: ['Tax_Service', Validators.required],
      finBookName: [fbObj, Validators.required],
      AccName: ['', Validators.required],
      amount: ['', Validators.required],
      costCenter: [brObj, Validators.required],
      remarks: ['', Validators.required],
      trnGst: ['', Validators.required],
      totalAmount: ['', Validators.required],
      InvoiceNo: ['INV2122/214/44', Validators.required],
      InvoiceDate: ['2023-02-10', Validators.required],

    });

    this.viewDCNoteForm = this.fb.group({
      finBookName: fbObj,
      costCenter: [brObj, Validators.required],
      fromDate: formatDate(new Date(new Date().getFullYear(), new Date().getMonth(), 1), 'yyyy-MM-dd', 'en'),
      toDate: formatDate(new Date(), 'yyyy-MM-dd', 'en'),
      status: ['ALL', Validators.required],
      // noteType: ['Debit Note', Validators.required],
      tranType: ['', Validators.required],
    });
    this.getBranchName();
    this.getAccoountingBranchName();

    this.getViewBranchName();

    this.DCApprovalForm = this.fb.group({
      company: [this.globals.gUsrDefultCmpName, Validators.required],
      finBookName: [fbObj, Validators.required],
      fromDate: formatDate(new Date(new Date().getFullYear(), new Date().getMonth(), 1), 'yyyy-MM-dd', 'en'),
      toDate: formatDate(new Date(), 'yyyy-MM-dd', 'en'),
      status: ['ALL', Validators.required],
      // noteType: ['Debit Note', Validators.required],
      tranType: ['Debit Note Supplier', Validators.required],
    });

    // this.getTrantype();
  }

  shortcuts() {
    const keydown$ = fromEvent(window, 'keydown');
    this.subs.add(
      keydown$.subscribe((event: KeyboardEvent) => {
        if (this.GMenu !== 'DCNoteApproval') {
          if ((event.altKey && event.key === 'c') || (event.altKey && event.key === 'C')) {
            this.clearDCNote();
            return;
          }
          if ((event.altKey && event.key === 's') || (event.altKey && event.key === 'S')) {
            this.saveDCNote('save');
            return;
          }
          if ((event.altKey && event.key === 'v') || (event.altKey && event.key === 'V')) {
            this.viewDCNote();
            return;
          }
          if ((event.altKey && event.key === 'x') || (event.altKey && event.key === 'x')) {
            this.BackClickedFromNormal();
          }
        } else {
          if ((event.altKey && event.key === 'x') || (event.altKey && event.key === 'x')) {
            this.BackClicked();
          }
          if (event.altKey && event.key === 'a') {
            this.ApproveDCNote();
            return;
          } if (event.altKey && event.key === 'r') {
            document.getElementById('rejectButton')?.click();
          }
        }
      }),
    );
  }

  selectDivCode(event: any) {
    if (!event.source.selected) {
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
        document.getElementById('narration1')?.focus();
      }
    }, 100);
  }

  keytab(e: any, id: any): void {
    if (e.key === 'Enter') {
      if (e.target.value !== '') {
        setTimeout(() => {
          document.getElementById(id)?.focus();
        }, 100);
      }
    }
  }

  keytabBaseAmnt(e: any, id: any): void {
    if (e.key === 'Enter') {
      if (e.target.value !== '') {
        this.calcTaxDetails();
      }
    }
  }

  changeAccName(e: any) {
    if (!e.isUserInput) {
      return;
    }
    setTimeout(() => {
      if (e.source.value === 'Account Code') {
        this.AccInformationForm.get('AccName').reset();
        this.accountNames = [];
        this.ussageNames = [];
        this.accName = true;
        setTimeout(() => {
          document.getElementById('accname')?.focus();
        }, 100);
      } else {
        this.accountNames = [];
        this.ussageNames = [];
        this.accName = !this.accName;
        this.AccInformationForm.get('AccName').reset();
        setTimeout(() => {
          document.getElementById('ussageName')?.focus();
        }, 100);
      }
    }, 100);
  }

  onfromDateSelect(event: any) {
    if (event.key === 'Enter' && event.target.value !== '') {
      setTimeout(() => {
        document.getElementById('toDate')?.focus();
      });
    }
  }

  onToDateSelect(event: any) {
    if (event.key === 'Enter' && event.target.value !== '') {
      setTimeout(() => {
        document.getElementById('viewStatus')?.focus();
      });
    }
  }

  searchSelect = ''

  getAccountType() {
    const api = {
      reqMainreq: 'SR_Acctype',
      Usr: this.globals.gUsrid,
      brcode: this.globals.gBrcode,
    };
    this.accountTypes = [];
    this.commonService.reqSendto = 'datareqsarnEleven';
    this.subs.add(
      this.commonService.sendReqst(api).subscribe({
        next: (response) => {
          if (response.length > 0) {
            if (response[0]?.StatusResponse === 'Success') {
              // this.accountTypes = response;
              this.accountTypes = [{
                Acctype: 'Tax_Service',
                StatusResponse: 'Success',
              }];
            } else {
              Swal.fire(response[0]?.StatusResponse);
            }
          } else {
            Swal.fire({ text: 'No record found' });
          }
        },
        error: (error) => {
          Swal.fire({ text: error.message ?? 'Http failure response' });
        },
        complete: () => {},
      }),
    );
  }

  getTrnType() {
    const api = {
      reqMainreq: 'CNDN_TrnType',
      Usr: this.globals.gUsrid,
      brcode: this.globals.gBrcode,
    };
    this.TrnNoteType = [];
    this.commonService.reqSendto = 'datareqsarnEleven';
    this.subs.add(
      this.commonService.sendReqst(api).subscribe({
        next: (response) => {
          if (response.length > 0) {
            if (response[0]?.StatusResponse === 'Success') {
              this.TrnNoteType = response;
            } else {
              Swal.fire(response[0]?.StatusResponse);
            }
          } else {
            Swal.fire({ text: 'No record found' });
          }
        },
        error: (error) => {
          Swal.fire({ text: error.message ?? 'Http failure response' });
        },
        complete: () => {},
      }),
    );
  }

  filterSupliername(keyValue) {
    const api = {
      reqMainreq: 'CNDN_SNSearch',
      Usr: this.globals.gUsrid,
      brcode: this.globals.gBrcode,
      var1: keyValue,
    };
    this.SupplierNameArr = [];
    this.commonService.reqSendto = 'datareqsarnEleven';
    this.subs.add(
      this.commonService.sendReqst(api).subscribe({
        next: (response) => {
          if (response.length > 0) {
            this.SupplierNameArr = response.splice(0, 200);
          } else {
            Swal.fire({ text: 'No record found' });
          }
        },
        error: (error) => {
          Swal.fire({ text: error.message ?? 'Http failure response' });
        },
        complete: () => {},
      }),
    );
  }

  payableCodeSelected(event, id) {
    if (event.isUserInput) {
      setTimeout(() => {
        document.getElementById(id)?.focus();
      }, 100);
    }
  }

  getSaletype() {
    const post:any = {};
    post.reqMainreq = 'SaletypeLoad';
    post.Usr = this.globals.gUsrid; post.brcode = '0'; post.var1 = '0'; post.var2 = '0';
    post.var3 = '0'; post.var4 = '0'; post.var5 = '0'; post.var6 = '0'; post.var7 = '0'; post.var8 = '0';
    post.var9 = this.globals.gclientServer; post.var10 = '0'; post.var11 = '0'; post.var12 = '0'; post.var13 = '0'; post.var14 = '0';
    post.var15 = '0'; post.var16 = '0'; post.var17 = '0'; post.var18 = '0'; post.var19 = '0'; post.var20 = '0';
    if (this.globals.gclientServer === 'Client') {
      this.itemservice.get_salesrep_URL = `${this.globals.gApiserver}/api/datareqrshTen`;
      this.itemservice.get_URL = `${this.globals.gApiserver}/api/datareqrshTen`;
    } else {
      this.itemservice.get_salesrep_URL = `${this.globals.gServerApiUrl}/api/datareqrshTen`;
      this.itemservice.get_URL = `${this.globals.gServerApiUrl}/api/datareqrshTen`;
    }
    this.subs.add(this.itemservice.getSalesReportAPI(post).subscribe({
      next: (data) => {
        this.SaleTypeList = data;
      },
      error: (error) => {
        Swal.fire({ text: 'Http failure response' });
      },
      complete: () => {},
    }));
  }

  selectTranType(event: any) {
    if (!event.isUserInput) {
      return;
    }
    setTimeout(() => {
      if (event.source.value) {
        document.getElementById('ViewDialogbutton').focus();
      }
    }, 100);
  }

  AutoSelectdefault(id) {
    this.searchSelect = '';
    this.searchSelect1 = '';
    setTimeout(() => {
      document.getElementById(id)?.focus();
    }, 100);
  }

  getAccountName(data) {
    const api = {
      reqMainreq: 'CNDN_ServicetaxItemSel',
      Usr: this.globals.gUsrid,
      brcode: this.globals.gBrcode,
      var1: data,
    };
    this.accountNames = [];
    this.commonService.reqSendto = 'datareqsarnEleven';
    this.subs.add(
      this.commonService.sendReqst(api).subscribe({
        next: (response) => {
          if (response.length > 0) {
            if (response[0].StatusResponse === 'Success') {
              this.ussageNames = response;
            } else {
              this.accountNames = [];
            }
          } else {
            this.accountNames = [];
            this.commonService.openSnackbar('No data found.', '', 1000);
          }
        },
        error: (error) => {
          this.accountNames = [];
          Swal.fire({ text: error.message ?? 'Http failure response' });
        },
        complete: () => {},
      }),
    );
    // });
  }

  getUssageName() {
    this.AccInformationForm
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
          var3: this.AccInformationForm.get('finBookName').value.FbCode,
          var4: this.AccBrcode,
        };
        this.ussageNames = [];
        this.commonService.reqSendto = 'datareqsarnEleven';
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
              Swal.fire({ text: error.message ?? 'Http failure response' });
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
    this.AllFBList = [];
    this.commonService.reqSendto = 'datareqsarnEleven';
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
          Swal.fire({ text: error.message ?? 'Http failure response' });
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
        this.vFbCode = code.FbCode;
        this.aproviewfbform = e.source.value;
        this.voucherInfoForm.get('costCenter').reset();
        this.AccInformationForm.get('finBookName').setValue(code);
        this.AccInformationForm.get('costCenter').setValue('');
        this.voucherBranchNames = [];
        setTimeout(() => {
          document.getElementById('costCenter').focus();
        }, 100);
      }
    } else if (flag === 2) {
      if (e.source.selected) {
        this.AccFbCode = code.FbCode;
        this.aproviewfbform = e.source.value;
        this.AccInformationForm.get('costCenter').reset();
        setTimeout(() => {
          document.getElementById('AccCostCenter').focus();
        }, 100);
      }
    }
  }

  brSelected(event, object, flag) {
    if (event.source.selected) {
      if (flag === 1) {
        this.AccInformationForm.get('costCenter').setValue(object);
        setTimeout(() => {
          document.getElementById('Supcode').focus();
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

  displaySuplier = (option) => (option && option.SupName ? option.SupName : '');

  displayUssageName = (option) => (option && option.iname ? option.iname : '');

  displayAccName = (option) => (option && option.accName ? option.accName : '');

  getApproveFinbook() {
    const api = {
      reqMainreq: 'SR_FBSearchForView',
      Usr: this.globals.gUsrid,
      brcode: this.globals.gBrcode,
      var1: this.cmpCode,
      var2: '',
    };
    this.SundryApprovalList = [];
    this.commonService.reqSendto = 'datareqsarnEleven';
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
        },
        error: (error) => {
          Swal.fire({ text: error.message ?? 'Http failure response' });
        },
        complete: () => {},
      }),
    );
  }

  getAccoountingBranchName() {
    this.commonService
      .autoComplete(
        this.AccInformationForm.get('costCenter').valueChanges,
      )
      .subscribe((data: any) => {
        const api = {
          reqMainreq: 'SR_brSearch',
          Usr: this.globals.gUsrid,
          brcode: this.globals.gBrcode,
          var1: data.brcode,
          var2: this.cmpCode,
          var3: this.AccFbCode,
        };
        this.accBranchNames = [];
        this.commonService.reqSendto = 'datareqsarnEleven';
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
              }
            },
            error: (error) => {
              Swal.fire({ text: error.message ?? 'Http failure response' });
            },
            complete: () => {},
          }),
        );
      });
  }

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
            document.getElementById('divCode')?.focus();
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
    this.commonService.autoComplete(this.voucherInfoForm.get('costCenter').valueChanges).subscribe((data: any) => {
        const api = {
          reqMainreq: 'SR_brSearch',
          Usr: this.globals.gUsrid,
          brcode: this.globals.gBrcode,
          var1: data,
          var2: this.cmpCode,
          var3: this.vFbCode,
        };
        this.voucherBranchNames = [];
        this.commonService.reqSendto = 'datareqsarnEleven';
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
              }
            },
            error: (error) => {
              Swal.fire({ text: error.message ?? 'Http failure response' });
            },
            complete: () => {},
          }),
        );
      });
  }

  getViewBranchName() {
    this.commonService
      .autoComplete(this.viewDCNoteForm.get('costCenter').valueChanges)
      .subscribe((data: any) => {
        setTimeout(() => {
          const api = {
            reqMainreq: 'SR_brSearchRPT',
            Usr: this.globals.gUsrid,
            brcode: this.globals.gBrcode,
            var1: data,
            var2: this.cmpCode,
            var3: this.viewDCNoteForm.get('finBookName').value.FbCode,
          };
          this.viewBranchNames = [];
          this.commonService.reqSendto = 'datareqsarnEleven';
          this.subs.add(
            this.commonService.sendReqst(api).subscribe({
              next: (response) => {
                if (response.length > 0) {
                  if (response[0].StatusResponse === 'Success') {
                    this.viewBranchNames = response;
                    this.branchCode = this.viewBranchNames[0].brcode;
                    if (this.viewDCNoteForm.get('costCenter').value === 'ALL') {
                      this.viewBrCode = '0';
                    }
                  } else {
                    this.viewBranchNames = [];
                    this.commonService.openSnackbar('No data found.', '', 1000);
                  }
                } else {
                  this.viewBranchNames = [];
                  this.viewDCNoteForm.get('costCenter').setValue('');
                  this.viewBrCode = '';
                }
              },
              error: (error) => {
                Swal.fire({ text: error.message ?? 'Http failure response' });
              },
              complete: () => {},
            }),
          );
        }, 10);
      });
  }

  AccountNameSelected(event, accName) {
    if (event.source.selected) {
      this.selectedAccName = event.source.value.accName;
      this.selectedAccCode = event.source.value.accCode;
      setTimeout(() => {
        document.getElementById('remarks')?.focus();
      }, 100);
    }
  }

  UssageNameSelected(event, usgName) {
    if (event.source.selected) {
      setTimeout(() => {
        this.searchSelect = '';
        document.getElementById('amount')?.focus();
      }, 100);
    }
  }

  trnchanged(event, usgName) {
    if (event.source.selected) {
      setTimeout(() => {
        document.getElementById('ussageName')?.focus();
      }, 100);
    }
  }

  addAccountingDetails(form: any) {
    this.accFormsubmitted = true;
    if (this.AccInformationForm.invalid) {
      Swal.fire('Fill the required fields');
    } else if (this.AccInformationForm.valid) {
      const checkIcode = this.accountingDetails.some(
        (e) => e.AccCode === form.AccName.accCode,
      );
      const checkIcode1 = this.accountingDetails.some(
        (e) => e.AccCode === form.AccName.UsageIdCode,
      );
      if (checkIcode || checkIcode1) {
        Swal.fire({ text: 'Same Account Code/ Usage Code already exist' });
      } else if (
        Number(this.voucherInfoForm.value.receiptAmount)
            >= Number(this.totalAmount) + Number(form.amount)
      ) {
        this.accountingDetails.push({
          AccType: form.accountType,
          AccName: form.iname,
          AccCode: form.icode,
          amount: Number(form.amount),
          finBookName: form.finBookName.FbName,
          costCenter: form.costCenter,
          remarks: form.remarks,
          salesType: this.customerSalesReport.value ?? '',
        });
        const fbObj = {
          FbCode: this.globals.gUsrDefultFbCode,
          FbName: this.globals.gUsrDefultFbName,
        };
        this.AccInformationForm.reset({
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
      text: 'Are you sure to remove ?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
        this.accountingDetails.splice(index, 1);
      }
    });
  }

  deleteAllData() {
    Swal.fire({
      text: 'Are you sure to remove all ?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
        this.accountingDetails = [];
      }
    });
  }

  getDivCode() {
    const api = {
      reqMainreq: 'SR_DivisionCode',
    };
    this.divCodes = [];
    this.commonService.reqSendto = 'datareqsarnEleven';
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
          Swal.fire({ text: error.message ?? 'Http failure response' });
        },
        complete: () => {},
      }),
    );
  }

  getSubDivCode() {
    const api = {
      reqMainreq: 'SR_SubDivisionCode',
      var1: this.voucherInfoForm.get('divCode').value,
    };
    this.subDivCodes = [];
    this.commonService.reqSendto = 'datareqsarnEleven';
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
          Swal.fire({ text: error.message ?? 'Http failure response' });
        },
        complete: () => {},
      }),
    );
  }

  getCurrency() {
    const api = {
      reqMainreq: 'SR_currency',
    };
    this.currency = '';
    this.commonService.reqSendto = 'datareqsarnEleven';
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
          Swal.fire({ text: error.message ?? 'Http failure response' });
        },
        complete: () => {},
      }),
    );
  }

  async saveDCNote(action) {
    if (this.CheckAllFormValid('save') === false) {
      return;
    }

    if (this.accountingDetails.length === 0) {
      Swal.fire('No records found in accounting information table');
      return;
    }
    if (this.getTotalAmount() !== this.voucherInfoForm.value.supplierNoteAmount) {
      Swal.fire('Total Amount & Sup Note Amount Must be equal');
      return;
    }
    const noteForm = this.NoteInformationForm.value;
    const voucherForm = this.voucherInfoForm.value;
    const accountForm = this.AccInformationForm.value;

    let VoucherNo = '';
    let EntryDate = '';
    if (this.ActionMode === 'Edit') {
      VoucherNo = this.VoucherNo;
      EntryDate = this.trnDate;
    } else {
      VoucherNo = '';
      EntryDate = '';
    }
    const Api = {
      reqMainreq: `S@/${this.saveReqMain}/E@`,
      Usr: this.globals.gUsrid,
      ReceiptRoute: '',
      ReceiptMode: '',
      ReceivedFrm: '',
      VoucherType: noteForm.noteType,
      InstrumentRecNo: voucherForm.supplierNoteNo,
      InstDate: this.pipe.transform(voucherForm.supplierNoteDate, 'dd-MMM-yyyy'),
      InstBankCode: '',
      InstBankName: '',
      AcDate: this.pipe.transform(noteForm.accDate, 'dd-MMM-yyyy'),
      Narration: '',
      BankOrCashCode: voucherForm.Supcode,
      VoucherAmt: voucherForm.supplierNoteAmount,
      InstAmt: '0',
      Currency: this.currency,
      DivId: voucherForm.divCode,
      SubDivId: voucherForm.subDivCode,
      AnalysisCode: 'Ca',
      SubAnalysisCode: 'Sca',
      MICRno: '12121212',
      DeviceUniId: '',
      VersionNo: '',
      VoucherNo,
      ActrnId: '',
      RevReason: '',
      EntryDate,
      ExtraVar1: voucherForm.supplierAddress,
      ExtraVar2: '',
      ExtraVar3: '',
      ExtraVar4: '',
      ExtraVar5: this.CommonTrntype.value.TrnId,
      ExtraVar6: '',
      ExtraVar7: '',
      ExtraVar8: '',
      ExtraVar9: '',
      ExtraVar10: '',
      L1: [],
      L2: [],
    };
    let AttachmentYN = '';

    if (voucherForm.attachments) {
      AttachmentYN = 'Y';
    } else {
      AttachmentYN = 'N';
    }

    const L1Arr = [
      {
        DrCr: 'Dr',
        Ssno: 1,
        CmpCode: this.globals.gUsrDefultCmpCode,
        FbCode: voucherForm.finBookName.FbCode,
        BrCode: voucherForm.costCenter.brcode,
        AcSelectionType: 'Sup Account Code',
        AcUsCode: voucherForm.supplierAccCode,
        GstAmt: '0',
        BaseAmt: '0',
        TrnAmt: voucherForm.supplierNoteAmount,
        Remarks: voucherForm.narration,
        IntrFbCmpCode: '',
        IntrFbFbCode: '',
        IntrFbBrCode: '',
        IntrFbAcCode: '',
        Num1: '0',
        Num2: '0',
        Var1: '',
        Var2: '',
        Var3: '',
        Var4: '',
        Var5: '',
        AcDocUniqId: '',
        AttachmentYN,
        AcDocN: this.filename ?? '',
        AcDoc: this.base64File ?? '',
      },
    ];

    const L2Arr = [];
    this.accountingDetails.forEach((element, index) => {
      const AccObj = {
        DrCr: 'Cr',
        Ssno: index + 1,
        CmpCode: this.globals.gUsrDefultCmpCode,
        FbCode: element.FbCode,
        BrCode: Number(element.BrCode),
        AcSelectionType: element.AccType,
        AcUsCode: element.AccCode,
        GstAmt: element.GstAmtAuto,
        BaseAmt: element.BaseAmt,
        TrnAmt: element.TotalAmt,
        Remarks: element.remarks,
        IntrFbCmpCode: '',
        IntrFbFbCode: '',
        IntrFbBrCode: '',
        IntrFbAcCode: '',
        Num1: '0',
        Num2: '0',
        Var1: element.InvNo,
        Var2: element.InvDate,
        Var3: '',
        Var4: '',
        Var5: element.salesType ?? '',
        AcDocUniqId: '',
        AttachmentYN: 'N',
        AcDocN: '',
        AcDoc: '',
      };

      L2Arr.push(AccObj);
    });
    Api.L1 = L1Arr;
    Api.L2 = L2Arr;
this.Loading = true
    const SaveResponse = await this.accService.gApiCallWithConfirm(action, Api, this.globals.gApiserver, 'AccEntryS1');
    this.Loading = false

    if (SaveResponse && SaveResponse[0]?.StatusResponse === 'Success') {
      if (action === 'save') {
        Swal.fire({ text: `Saved successfully , Voucher No : ${SaveResponse[0].VoucherNo}` });
        this.firstTime = true;
        this.clearDCNote();
      } else {
        Swal.fire({ text: `${this.VoucherNo} Updated successfully` });
        this.firstTime = true;
        this.clearDCNote();
        this.showNormalDCNote = false;
        this.showViewDCNote = true;
        this.SubmitViewDCNote(this.viewDCNoteForm);
      }
      this.accountingDetails = [];
      this.VoucherName = '';
      this.WStatus = '';
      this.ReceiptStatus = '';
    }
  }

  notetypeChange(event) {
    if (event.isUserInput) {
      setTimeout(() => {
        // this.getTrantype();
        document.getElementById('entrType')?.focus();
        this.viewDCNoteForm.get('tranType').reset();
      }, 100);
    }
  }

  ApprovalnotetypeChange(event) {
    if (event.isUserInput) {
      setTimeout(() => {
        // this.getAprovalTrantype();
        document.getElementById('entrType')?.focus();
        this.DCApprovalForm.get('tranType').reset();
      }, 100);
    }
  }

  getAprovalTrantype() {
    let notetype = '';

    if (this.globals.gmainMenuSelected === 'SupplierEntry' || this.globals.gmainMenuSelected === 'SupplierApproval') {
      if (this.NoteInformationForm.value.noteType === 'Debit Note') {
        notetype = 'DebitNoteSupplier';
      } else {
        notetype = 'CreditNoteSupplier';
      }
    } else if (this.globals.gmainMenuSelected === 'customerEntry' || this.globals.gmainMenuSelected === 'customerApproval') {
      if (this.NoteInformationForm.value.noteType === 'Debit Note') {
        notetype = 'DebitNoteCustomer';
      } else {
        notetype = 'CreditNoteCustomer';
      }
    }

    const api = {
      reqMainreq: 'VoucherList',
      Usr: this.globals.gUsrid,
      brcode: this.globals.gBrcode,
      var1: '',
      var2: notetype,
    };

    this.commonService.reqSendto = 'datareqsarnEleven';
    this.subs.add(
      this.commonService.sendReqst(api).subscribe({
        next: (response) => {
          if (response.length > 0) {
            if (response[0].StatusResponse === 'Success') {
              this.entryTypes = response;
              this.viewDCNoteForm.get('tranType').setValue(response[0]);
              this.DCApprovalForm.get('tranType').setValue(response[0]);
              this.saveReqMain = response[0].VoucherId;
              this.reverseReqMain = response[1].VoucherId;

            } else {
              this.commonService.openSnackbar(response[0].StatusResponse, 'Ok', 1500);
            }
          }
        },
        error: (error) => {
          Swal.fire({ text: error.message ?? 'Http failure response' });
        },
        complete: () => {},
      }),
    );
  }

  getTrantype() {
    let notetype = '';

    if (this.globals.gmainMenuSelected === 'SupplierEntry' || this.globals.gmainMenuSelected === 'SupplierApproval') {
      notetype = 'Supplier';
    } else if (this.globals.gmainMenuSelected === 'customerEntry' || this.globals.gmainMenuSelected === 'customerApproval') {
      notetype = 'Customer';
    }
    const api = {
      reqMainreq: 'VoucherListForSupCust',
      Usr: this.globals.gUsrid,
      brcode: this.globals.gBrcode,
      var1: notetype,
    };
    this.commonService.reqSendto = 'datareqsarnEleven';
    this.subs.add(
      this.commonService.sendReqst(api).subscribe({
        next: (response) => {
          if (response?.length > 0) {
            if (response[0].StatusResponse === 'Success') {
              this.entryTypes = response;
              this.entryTypesApp = response;  
              this.viewDCNoteForm.get('tranType').setValue(response[0]);
              this.DCApprovalForm.get('tranType')?.setValue(response[0]);
            } else {
              this.commonService.openSnackbar(response[0].StatusResponse, 'Ok', 1500);
            }
          } else {
            this.commonService.openSnackbar('No record found', 'Ok', 1500);
          }
        },
        error: (error) => {
          Swal.fire({ text: error.message ?? 'Http failure response' });
        },
        complete: () => {},
      }),
    );
  }

  viewDCNote() {
    this.showNormalDCNote = false;
    this.showViewDCNote = true;
    this.SectionTitle = 'View Debit Note / Credit Note';
    this.getViewBranchName();
    this.getTrantype();
    setTimeout(() => {
      const tbody = document.getElementById('viewTable').querySelectorAll('tr');
      tbody[this.latestViewRow]?.focus();
    }, 100);

    if (this.firstTime) {
      setTimeout(() => {
        this.SubmitViewDCNote(this.viewDCNoteForm);
      }, 200);
      this.firstTime = false;
    }
  }

  getTotalAmount() {
    let totalAmount = 0;
    for (let i = 0; i < this.accountingDetails.length; i++) {
      if (this.accountingDetails[i].TotalAmt) {
        totalAmount += Number(this.accountingDetails[i].TotalAmt);
      }
    }
    return totalAmount;
  }

  closePrintPreview() {
    this.dialog.closeAll();
  }

  downloadFile() {
    if (this.AttachedFilePath) {
      const data1 = this.AttachedFilePath;
      const a = document.createElement('a');
      a.href = data1;
      a.download = this.filename;
      a.click();
    }
  }

  clearDCNote() {
    this.canExist = true;
    this.showNormalDCNote = true;
    this.showApproveDCNote = false;
    this.showViewDCNote = false;
    this.Viewloading = false;
    this.voucherInfoForm.enable();
    this.NoteInformationForm.enable();
    this.accountingDetails = [];
    this.viewDataSource = [];
    this.formInialization();

    this.ActionMode = 'View';

    this.ShowForm = true;

    this.approveLoad = false;

    this.showAccpost = false;

    this.viewSearch = '';

    this.IsFresh = false;

    this.VoucherName = '';

    this.WStatus = '';

    this.ReceiptStatus = '';

    this.viewClicked = false;

    this.Authorized = '';

    this.curStatusFresh = false;

    this.VoucherNo = '';

    this.base64File = '';

    this.fileName = '';

    this.attachmentAvailable = false;

    this.ActionMode = 'View';

    this.verified = false;

    this.OnlyView = false;

    this.poLocationList = [];
    setTimeout(() => {
      document.getElementById('noteType')?.focus();
    }, 500);
  }

  FocusNext(event, id) {
    if (event.source.selected && event.isUserInput) {
      setTimeout(() => {
        if (this.GMenu === 'DCNoteEntry') {
          this.DCType === 'Supplier' ? this.SectionTitle = 'Supplier Debit Note / Credit Note' : this.SectionTitle = 'Customer Debit Note / Credit Note';
        } else if (this.GMenu === 'DCNoteApproval') {
          this.DCType === 'Supplier' ? this.SectionTitle = 'Supplier Debit/Credit Note Approval' : this.SectionTitle = 'Customer Debit/Credit Note Approval';
        }
       if(id === 'accDate'){
        //  this.getTrantype();
         this.getAprovalTrantype();
       }
        document.getElementById(id).focus();
      }, 100);
    }
  }

  suplierCodeenter(supcode, type, event?) {
    if (!this.voucherInfoForm.get('Supcode').invalid) {
      this.getsupplierDetails(supcode, type);
    } else {
      this.voucherInfoForm.get('supplierName').reset();
      this.voucherInfoForm.get('supplierAddress').reset();
      this.voucherInfoForm.get('supplierState').reset();
      if (event.type !== 'focusout') {
        Swal.fire({ text: `Enter ${this.DCType} Code` });
      }
    }
  }

  getsupplierDetails(supcode, type?) {
    this.subcodeloading = true;
    const api = {
      reqMainreq: 'SupLocFilter',
      Usr: this.globals.gUsrid,
      brcode: this.globals.gBrcode,
      var3: supcode,
    };
    this.commonService.reqSendto = 'KarSyApiFour';
    this.voucherInfoForm.get('supplierName').setValue('');
    this.voucherInfoForm.get('supplierAddress').setValue('');
    this.voucherInfoForm.get('supplierState').setValue('');
    this.subs.add(
      this.commonService.sendReqst(api).subscribe({
        next: (response) => {
          if (response.length > 0) {
            if (response[0].StatusRes === 'Success') {
              this.poLocationList = response;
              const SuplierNameObj = {
                supcode: response[0].supcode,
                SupName: response[0].supname,
              };
              if (type) {
                const supCode = this.voucherInfoForm.get('Supcode').value;
                if (type === 'view') {
                  this.voucherInfoForm.get('supplierState').setValue(response[0].Address);
                }
              } else {
                this.voucherInfoForm.get('supplierAddress').setValue('');
                this.voucherInfoForm.get('supplierState').setValue('');
              }
              this.voucherInfoForm.get('supplierName').setValue(SuplierNameObj);

              setTimeout(() => {
                document.getElementById('supplierAddress')?.focus();
              }, 100);
              this.subcodeloading = false;
            } else {
              Swal.fire(response[0].StatusRes);
              this.subcodeloading = false;
            }
          } else {
            Swal.fire('No data found.');
            this.subcodeloading = false;
          }
        },
        error: (error) => {
          this.subcodeloading = false;
          Swal.fire({ text: error.message ?? 'Http failure response' });
        },
        complete: () => { this.subcodeloading = false; },
      }),
    );
  }

  setsupstate(event, data) {
    if (event.source.selected && event.isUserInput) {
      this.voucherInfoForm.get('supplierState').setValue(data.Address);
      setTimeout(() => {
        document.getElementById('supplierAccCode')?.focus();
      }, 100);
    }
  }

  supplierSelected(event, supplier) {
    if (event.source.selected) {
      this.voucherInfoForm.get('Supcode').setValue(supplier.supcode);
      this.getsupplierDetails(supplier.supcode);
      this.voucherInfoForm.get('supplierState').setValue(supplier.supcode);
      document.getElementById('supplierNoteNo')?.focus();
      setTimeout(() => {
        this.SupplierNameArr = [];
      }, 100);
    }
  }

  keyEnter(event, keyValue) {
    if (event.key === 'Enter') {
      if (this.voucherInfoForm.get('Supcode').valid) {
        this.getsupplierDetails(keyValue);
      }
    }
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
    this.dialog.closeAll();
    this.accService.unsubscribe$.next();
    this.accService.unsubscribe$.complete();
  }

  CheckAllFormValid(type) {
    if (this.NoteInformationForm.invalid) {
      Swal.fire({ text: 'Invalid Note Information ' });
    }
    if (this.voucherInfoForm.invalid) {
      Swal.fire({ text: 'Invalid Voucher Information ' });

      return false;
    }
    if (this.accountingDetails.length === 0) {
      Swal.fire({ text: 'No data in accounting table' });
      return false;
    }

    if (this.accountingDetails.length === 0) {
      Swal.fire({ text: 'No data in accounting table' });
      return false;
    }

    if (Number(this.voucherInfoForm.get('supplierNoteAmount').value.toFixed(2)) !== Number(this.getTotalAmount().toFixed(2))) {
      Swal.fire({ text: `${this.shortDCType} Note Amount and Table total amount are not equal` });
      return false;
    }
    return true;
  }

  AddDataToTable() {
    if (this.AccInformationForm.invalid) {
      Swal.fire({ text: 'Invalid Accounting Information' });
      return;
    }
    if (
      this.commonService.checkTypeValitity(this.AccInformationForm.get('finBookName').value, 'Accounting Finbook')
       && this.commonService.checkTypeValitity(this.AccInformationForm.get('costCenter').value, 'Accounting Cost center')
       && this.commonService.checkTypeValitity(this.AccInformationForm.get('AccName').value, 'Accounting Name / Ussage Name')
    ) {
      if (!this.verified) {
        Swal.fire({ text: 'Invoice details are not verified' });
        return;
      }
      const form = this.AccInformationForm.value;
      this.accountingDetails.push({
        finBookName: form.finBookName.FbName,
        FbCode: form.finBookName.FbCode,
        costCenter: form.costCenter.brname,
        BrCode: form.costCenter.brcode,
        AccType: form.accountType,
        AccName: form.AccName.iname,
        AccCode: form.AccName.icode,
        remarks: form.remarks,
        BaseAmt: Number(form.amount),
        GstAmtAuto: Number(form.trnGst),
        TotalAmt: Number(form.totalAmount),
        InvDate: form.InvoiceDate,
        InvNo: form.InvoiceNo,
        trnType: this.CommonTrntype.value.Trntype,
        PayableAcCode: this.payableAcCode ?? 'Nill',
        salesType: this.customerSalesReport.value ?? 'Nill',
      });
      const fbObj = {
        FbCode: this.globals.gUsrDefultFbCode,
        FbName: this.globals.gUsrDefultFbName,
      };
      const brObj = {
        brname: this.globals.gBrname,
        brcode: this.globals.gBrcode,
      };
      this.verified = false;
      this.AccInformationForm = this.fb.group({
        accountType: ['Tax_Service', Validators.required],
        finBookName: [fbObj, Validators.required],
        AccName: ['', Validators.required],
        amount: ['', Validators.required],
        costCenter: [brObj, Validators.required],
        remarks: ['', Validators.required],
        trnGst: ['', Validators.required],
        totalAmount: ['', Validators.required],
        InvoiceNo: ['INV2122/214/44', Validators.required],
        InvoiceDate: ['2023-02-10', Validators.required],
      });
      setTimeout(() => {
        document.getElementById('ussageName')?.focus();
      }, 100);
    }
  }

  viewFbchange(event, type) {
    if (event.source.selected) {
      setTimeout(() => {
        if (type === 'view') {
          this.viewDCNoteForm.get('costCenter').setValue('');
          this.viewBranchNames = [];
          document.getElementById('viewCostCenter').focus();
        } else {
          document.getElementById('viewCostCenter').focus();
        }
      }, 100);
    }
  }

  viewBrchange(event, Finbook) {
    if (event.source.selected) {
      setTimeout(() => {
        this.viewBranchNames = [];
        this.viewDCNoteForm.valid ? document.getElementById('fromDate').focus() : this.SubmitViewDCNote(this.viewDCNoteForm);
      }, 100);
    }
  }

  SubmitViewDCNote(viewForm) {
    this.commonService.reqSendto = 'datareqsarnEleven';
    if (viewForm.valid) {
      if (this.commonService.checkTypeValitity(this.viewDCNoteForm.get('finBookName').value, 'Finbook')
       && this.commonService.checkTypeValitity(this.viewDCNoteForm.get('costCenter').value, 'Cost center')) {
        this.Viewloading = true;
        const api = {
          reqMainreq: 'SR_EntryView',
          Usr: this.globals.gUsrid,
          brcode: this.globals.gBrcode,
          var1: formatDate(viewForm.get('fromDate').value, 'dd-MMM-yyyy', 'en'),
          var2: formatDate(viewForm.get('toDate').value, 'dd-MMM-yyyy', 'en'),
          var3: 'ALL',
          var4: 'ALL',
          var5: viewForm.value.costCenter.brcode,
          var6: this.globals.gUsrDefultCmpCode,
          var7: viewForm.get('finBookName').value.FbCode,
          var8: viewForm.get('status').value,
          var9: this.viewDCNoteForm.get('tranType')?.value.VoucherId,
        };
        this.viewDataSource = [];
        this.subs.add(
          this.commonService.sendReqst(api).subscribe({
            next: (response) => {
              this.Viewloading = false;
              if (response?.length > 0) {
                response[0]?.StatusResponse === 'Success' ? this.viewDataSource = [...response] : this.viewDataSource = [];
              } else {
                this.viewDataSource = [];
              }
            },
            error: (error) => {
              this.Viewloading = false;
              Swal.fire({ text: error.message ?? 'Http failure response' });
            },
            complete: () => {},
          }),
        );
      }
    } else {
      // this.commonService.openSnackbar('Fill all required inputs', 'Ok', 1500);
    }
  }

  DCNoteDetailedView(tabledata: any, flag: any, rowIndex) {
    let reqMainreq = '';

    if (this.DCType === 'Supplier') {
      reqMainreq = 'DN_DetailsView';
    } else {
      reqMainreq = 'CN_DetailsView';
    }
    const api = {
      reqMainreq,
      Usr: this.globals.gUsrid,
      brcode: this.globals.gBrcode,
      var1: tabledata.VoucherNo,
      var2: formatDate(tabledata.tdate, 'dd-MMM-yyyy', 'en'),
      var5: this.viewDCNoteForm.value.tranType.VoucherId,
    };
    this.Loading = true;
    this.accountingDetails = [];
    this.latestViewRow = rowIndex + 1;
    this.WStatus = `WStatus: ${tabledata.WStatus}`;
    this.ReceiptStatus = `DC Status: ${tabledata.ReceiptStatus}`;
    this.commonService.reqSendto = 'datareqsarnEleven';
    this.subs.add(
      this.commonService.sendReqst(api).subscribe({
        next: (response) => {
          this.viewClicked = true;
          if (response.length > 0) {
            if (response[0].StatusResponse === 'Success') {
              this.showNormalDCNote = true;
              this.showViewDCNote = false;
              this.showNormalDCNote = true;
              this.showViewDCNote = false;
              this.showApproveDCNote = false;
              this.Loading = false;
              this.AccountingInformation = false
              this.VoucherNo = response[0].VoucherNo;
              this.TrnType = response[0].TrnType;
              this.canExist = false;
              response.forEach((element) => {
                if (element.DrCr === 'Cr') {
                  const selectedrnType = this.TrnNoteType.find((data) => data.TrnId === element.VoucherCode);
                  const trnType = {
                    Trntype: selectedrnType.Trntype,
                    TrnId: element.VoucherCode,
                    StatusResponse: 'Success',
                  };
                  this.CommonTrntype.setValue(trnType);
                  this.accountingDetails.push({
                    finBookName: element.FbName,
                    FbCode: element.FbCode,
                    costCenter: element.BrName,
                    BrCode: element.BrCode,
                    AccType: element.AcSelectionType,
                    AccName: element.AcUsName,
                    AccCode: element.AcUsCode,
                    remarks: element.Remarks,
                    BaseAmt: Number(element.BaseAmt),
                    GstAmtAuto: Number(element.GstAmt),
                    TotalAmt: Number(element.TrnAmt),
                    InvDate: element.InvDate,
                    InvNo: element.InvNo,
                    trnType: trnType.Trntype,
                    PayableAcCode: `${element?.AcCode}-${element?.AcName}` ?? 'Nill',
                    salesType: element.Saletype ?? 'Nill',
                  });
                } else {
                  const fbObj = {
                    FbCode: element.FbCode,
                    FbName: element.FbName,
                  };

                  const BrObj = {
                    brname: element.BrName,
                    brcode: element.BrCode,
                  };

                  const subObj = {
                    SupName: element.VCName,
                    supcode: element.VndrCliCode,
                  };
                  this.voucherInfoForm.get('finBookName').setValue(fbObj);
                  this.voucherInfoForm.get('costCenter').setValue(BrObj);
                  this.voucherInfoForm.get('Supcode').setValue(element.VndrCliCode);
                  this.voucherInfoForm.get('supplierName').setValue(subObj);
                  this.suplierCodeenter(element.VndrCliCode, 'view');
                  this.voucherInfoForm.get('supplierAccCode').setValue(element.AcCode);
                  this.voucherInfoForm.get('divCode').setValue(element.DivId);
                  this.voucherInfoForm.get('subDivCode').setValue(element.SubDivId);
                  this.voucherInfoForm.get('narration').setValue(element.Remarks);
                  this.voucherInfoForm.get('attachments').setValue(element.AttachmentYN);
                  this.voucherInfoForm.get('supplierNoteAmount').setValue(element.VoucherAmt);

                  this.voucherInfoForm.get('supplierNoteNo').setValue(element.SCNoteNo);
                  this.voucherInfoForm.get('supplierNoteDate').setValue(formatDate(element.SCNoteDate, 'yyyy-MM-dd', 'en'));
                  this.payableAcCode = '';
                  this.attachmentAvailable = false;
                  if (element.AttachmentYN === 'Y') {
                    this.attachmentAvailable = true;
                    this.DocId = element.AcDocUniqId;
                    this.getAttachedFile(tabledata.VoucherNo);
                  } else {
                    this.AttachedFilePath = response[0].AttachmentFile;
                    this.filename = response[0].DocName;
                    this.base64File = this.AttachedFilePath;
                    this.attachmentAvailable = false;
                  }
                  setTimeout(() => {
                    this.voucherInfoForm.get('supplierAddress').setValue(element.SLocCode);
                  }, 200);
                }
              });

              this.VoucherNo = response[0].VoucherNo;
              this.VoucherName = `${this.viewDCNoteForm.get('tranType').value.VoucherType} : ${response[0].VoucherNo}`;
              this.TrnDate = response[0].tdate;
              this.Authorized = response[0].TrnStatus;
              this.AcTrnId = response[0].AcTrnId;
              this.NoteInformationForm.get('noteType').setValue(response[0].VoucherType);

              this.NoteInformationForm.get('accDate').setValue(formatDate(response[0].AcDate, 'yyyy-MM-dd', 'en'));
              this.ApprovalArr = response;
              this.ReverseGivenFlag = response[0].ReverseGiven;
              tabledata.WStatus === 'FRESH' ? this.IsFresh = true : this.IsFresh = false;
              const TrnValue = this.viewDCNoteForm.get('tranType').value.VoucherType;

              if (TrnValue === 'Credit Note Supplier Reversal' || TrnValue === 'Debit Note Supplier Reversal'
              || TrnValue === 'Credit Note Customer Reversal' || TrnValue === 'Debit Note Customer Reversal') {
                this.ReverseDCNote = true;
                if (flag === 'DCNoteView') {
                  this.NoteInformationForm.disable();
                  this.voucherInfoForm.disable();

                  this.OnlyView = true;
                } else if (flag === 'DCNoteReEntry') {
                  this.NoteInformationForm.enable();
                  this.voucherInfoForm.enable();
                  this.OnlyView = false;
                  this.trnDate = tabledata.tdate;
                  this.ActionMode = 'ReUse';
                  this.ShowForm = false;

                  this.attachmentAvailable = false;
                }
              } else {
                this.ReverseDCNote = false;
                if (flag === 'DCNoteView') {
                  if (!this.IsFresh) {
                    this.NoteInformationForm.disable();
                    this.voucherInfoForm.disable();
                    this.OnlyView = true;
                  } else {
                    this.NoteInformationForm.enable();
                    this.voucherInfoForm.enable();
                    this.ShowForm = false;

                    this.OnlyView = false;
                    this.attachmentAvailable = false;
                  }

                  this.trnDate = tabledata.tdate;
                  this.ActionMode = 'Edit';
                } else if (flag === 'DCNoteReEntry') {
                  this.NoteInformationForm.enable();
                  this.voucherInfoForm.enable();
                  this.OnlyView = false;
                  this.trnDate = tabledata.tdate;
                  this.ActionMode = 'ReUse';
                  this.ShowForm = false;
                }
              }
            } else {
              this.commonService.openSnackbar(response[0].StatusResponse, 'Ok', 1500);
            }
          } else {
            this.commonService.openSnackbar('No data found.', 'Ok', 1500);
          }
          this.Loading = false;
        },
        error: (error) => {
          this.Loading = false;
          Swal.fire({ text: error.message ?? 'Http failure response' });
        },
        complete: () => {},
      }),
    );
  }

  compareFn(o1: any, o2: any) {
    if (o1 && o2 && o1.Trntype === o2.Trntype) {
      return o2;
    } return '';
  }

  async DeleteDCNote() {
    let reqMainreq = '';
    let noteType = '';
    if (this.DCType === 'Supplier') {
      reqMainreq = 'DN_DeleteEntry';
    } else {
      reqMainreq = 'CN_DeleteEntry';
    }

    if (this.NoteInformationForm.get('noteType').value === 'Debit Note') {
      noteType = 'Debit note';
    } else {
      noteType = 'Credit note';
    }

    const ReqJson = {
      reqMainreq,
      Usr: this.globals.gUsrid,
      var1: this.VoucherNo,
      var2: this.TrnDate,
      var5: this.TrnType,
    };
    this.Loading = true
    const ArrConfirm = await this.accService.gApiCallWithConfirm('delete', ReqJson, this.globals.gApiserver, 'datareqsarnEleven');
    this.Loading = false

    this.VoucherName = '';
    this.WStatus = '';
    this.ReceiptStatus = '';

    if (ArrConfirm[0]?.StatusResponse === 'Success') {
      Swal.fire({ text: `${noteType} -  ${this.VoucherNo} deleted successfully` });
      this.clearDCNote();
      this.Loading = true;
      setTimeout(() => {
        this.Loading = false;
      }, 200);
      this.accountingDetails = [];
    }
  }

  selectApprovalStatus(event: any) {
    if (!event.isUserInput) {
      return;
    }

    setTimeout(() => {
      document.getElementById('notetype')?.focus();
    }, 100);
  }

  async DCNoteHistory(tabledata) {
    const ReqJson = {
      reqMainreq: 'WorkFlowAprovalUsr',
      Usr: this.globals.gUsrid,
      brcode: this.globals.gBrcode,
      var1: formatDate(tabledata.tdate, 'dd-MMM-yyyy', 'en'),
      var2: this.globals.gUsrDefultCmpCode,
      var3: this.viewDCNoteForm.get('finBookName').value.FbCode,
      var4: this.viewDCNoteForm.get('tranType').value.VoucherId,
      var5: tabledata.VoucherNo,
    };
    this.Loading = true;
    this.DCHistoryArr = [];
    const ArrConfirm = await this.accService.gApiCallOne(ReqJson, this.globals.gApiserver, 'datareqsarnSix');
    this.Loading = false;
    if (ArrConfirm[0]?.StatusResponse === 'Success') {
      this.DCHistoryArr = ArrConfirm;
      const element = document.getElementById('reqStatusVendorModal') as HTMLElement;
      const myModal = new Modal(element);
      myModal.show();
    } else {
      this.commonService.openSnackbar('No record found', 'Ok', 1500);
    }
  }

  async ViewApprovalForm(ApprovalviewForm) {
    this.commonService.reqSendto = 'datareqsarnEleven';

    if (ApprovalviewForm.valid) {
      if (this.commonService.checkTypeValitity(this.DCApprovalForm.get('finBookName').value, 'Finbook Name')) {
        this.Viewloading = true;
        const api = {
          reqMainreq: 'SR_getApprovalView',
          Usr: this.globals.gUsrid,
          brcode: this.globals.gBrcode,
          var1: formatDate(ApprovalviewForm.get('fromDate').value, 'dd-MMM-yyyy', 'en'),
          var2: formatDate(ApprovalviewForm.get('toDate').value, 'dd-MMM-yyyy', 'en'),
          var3: this.globals.gUsrDefultCmpCode,
          var4: ApprovalviewForm.value.finBookName.FbCode,
          var5: ApprovalviewForm.get('status').value,
          var7: ApprovalviewForm.get('tranType').value.VoucherId ?? 'DebitNote',
        };
        this.ApprovalTableArr = [];
        this.approveLoad = true;
        const ArrConfirm = await this.accService.gApiCallOne(api, this.globals.gApiserver, 'datareqsarnEleven');
        this.approveLoad = false;
        ArrConfirm[0]?.StatusResponse === 'Success' ? this.ApprovalTableArr = ArrConfirm : this.ApprovalTableArr = [];
      }
    } else {
      // this.commonService.openSnackbar('Fill Required inputs', 'Ok', 1500);
    }
  }

  async approvalDCNoteDetails(row, index) {
    let reqMainreq = '';
    if (this.DCType === 'Supplier') {
      reqMainreq = 'DN_getAprvlDetsView';
    } else {
      reqMainreq = 'CN_getAprvlDetsView';
    }

    const api = {
      reqMainreq,
      Usr: this.globals.gUsrid,
      var1: row.Trnid,
      var2: row.Date,
      var4: row.CmpCode,
      var5: row.FbCode,
      var7: this.DCApprovalForm.get('tranType').value.VoucherId,
    };
    this.latestApprovalRow = index + 1;
    this.Loading = true;
    this.accountingDetails = [];
    const ArrConfirm = await this.accService.gApiCallOne(api, this.globals.gApiserver, 'datareqsarnEleven');
    if (ArrConfirm[0]?.StatusResponse === 'Success') {
      this.ApprovalArr = ArrConfirm;
      this.TrnType = ArrConfirm[0].TrnType;
      this.NoteInformationForm.get('noteType').setValue(ArrConfirm[0].VoucherType);

      this.NoteInformationForm.get('accDate').setValue(formatDate(ArrConfirm[0].AcDate, 'yyyy-MM-dd', 'en'));
      this.headerLoad();
      ArrConfirm.forEach((element) => {
        if (element.DrCr === 'Cr') {
          const selectedrnType = this.TrnNoteType.find((data) => data.TrnId === element.VoucherCode);
          const trnTypea = {
            Trntype: selectedrnType.Trntype,
            TrnId: element.VoucherCode,
            StatusResponse: 'Success',
          };
          this.CommonTrntype.setValue(trnTypea);
          this.accountingDetails.push({
            finBookName: element.FbName,
            FbCode: element.FbCode,
            costCenter: element.BrName,
            BrCode: element.BrCode,
            AccType: element.AcSelectionType,
            AccName: element.AcUsName,
            AccCode: element.AcUsCode,
            remarks: element.Remarks,
            BaseAmt: Number(element.BaseAmt),
            GstAmtAuto: Number(element.GstAmt),
            TotalAmt: Number(element.TrnAmt),
            InvDate: element.InvDate,
            InvNo: element.InvNo,
            trnType: trnTypea.Trntype,
            PayableAcCode: `${element.AcCode}-${element.AcName}` ?? 'Nill',
            salesType: this.customerSalesReport.value ?? 'Nill',
          });
        } else {
          const fbObj = {
            FbCode: element.FbCode,
            FbName: element.FbName,
          };

          const BrObj = {
            brname: element.BrName,
            brcode: element.BrCode,
          };

          const subObj = {
            SupName: element.VCName,
            supcode: element.VndrCliCode,
          };
          this.voucherInfoForm.get('finBookName').setValue(fbObj);
          this.voucherInfoForm.get('costCenter').setValue(BrObj);
          this.voucherInfoForm.get('Supcode').setValue(element.VndrCliCode);
          this.voucherInfoForm.get('supplierName').setValue(subObj);
          this.suplierCodeenter(element.VndrCliCode, 'view');
          this.voucherInfoForm.get('supplierAccCode').setValue(element.AcCode);
          // this.voucherInfoForm.get('supplierAccDec').setValue(element.AcUsName);
          this.voucherInfoForm.get('supplierNoteDate').setValue(formatDate(element.SCNoteDate, 'yyyy-MM-dd', 'en'));
          this.voucherInfoForm.get('supplierNoteNo').setValue(element.SCNoteNo);
          this.voucherInfoForm.get('supplierNoteAmount').setValue(element.VoucherAmt);
          this.voucherInfoForm.get('attachments').setValue(element.AttachmentYN);
          this.voucherInfoForm.get('divCode').setValue(element.DivId);
          this.voucherInfoForm.get('subDivCode').setValue(element.SubDivId);
          this.voucherInfoForm.get('narration').setValue(element.Remarks);
          
          this.attachmentAvailable = false;
          if (element.AttachmentYN === 'Y') {
            this.attachmentAvailable = true;
            this.DocId = element.AcDocUniqId;
            this.getAttachedFile(element.VoucherNo);
          } else {
            this.AttachedFilePath = ArrConfirm[0].AttachmentFile;
            this.filename = ArrConfirm[0].DocName;
            this.base64File = this.AttachedFilePath;
            this.attachmentAvailable = false;
          }
          setTimeout(() => {
            this.voucherInfoForm.get('supplierAddress').setValue(element.SLocCode);
          }, 200);
        }
      });
      this.showNormalDCNote = true;
      this.showApproveDCNote = false;
      this.Authorized = row.TrnStatus;
      let noteType = '';
      if (row.transtype === 'CreditNoteSupplier' || row.transtype === 'Credit Note Supplier Reversal') {
        noteType = 'CN No :';
      } else {
        noteType = 'DN No :';
      }
      // if (this.DCApprovalForm.get('noteType').value === 'Debit Note') {
      //   noteType = 'DN No :';
      // } else {
      //   noteType = 'CN No :';
      // }
      this.VoucherName = `${noteType} ${row.Trnid}`;
      this.WStatus = `WStatus: ${row.WStatus}`;
      this.ReceiptStatus = `Dc Status: ${row.VStatus}`;
      row.CurStatus === 'FRESH' ? this.curStatusFresh = true : this.curStatusFresh = false;
      ArrConfirm[0].ApproveOnly === 'N' ? this.showAppRejectButton = false : this.showAppRejectButton = true;
      this.OnlyView = true;
      this.Loading = false;
      this.voucherInfoForm.disable();
      this.NoteInformationForm.disable();
    }
    this.Loading = false;
  }

  async ApproveDCNote() {
    const api = {
      reqMainreq: 'SR_VoucherApproval',
      Usr: this.globals.gUsrid,
      var1: this.ApprovalArr[0].VoucherNo,
      var2: this.ApprovalArr[0].tdate,
      var4: this.ApprovalArr[0].CmpCode,
      var5: this.ApprovalArr[0].FbCode,
      var7: this.DCApprovalForm.get('tranType').value.VoucherId,
    };
    let noteType = '';


    if (this.NoteInformationForm.get('noteType').value === 'Debit Note') {
      noteType = 'Debit note';
    } else {
      noteType = 'Credit Note';
    }
  
    this.Loading = true
    
    const ArrConfirm = await this.accService.gApiCallWithConfirm(`approve this ${noteType}`, api, this.globals.gApiserver, 'datareqsarnEleven');
    this.Loading = false
   
    if (ArrConfirm[0]?.StatusResponse === 'Success') {
      this.commonService.openSnackbar(`${noteType} Approved Successfully`, 'Ok', 1500);
      this.Loading = true;

      setTimeout(() => {
        this.Loading = false;
        this.BackClicked();
        this.ViewApprovalForm(this.DCApprovalForm);
      }, 200);
    }
  }

  async ReverseDCNote1(template:TemplateRef<any>) {
    this.Reason.reset();
    this.dialog.open(template, {
      data: 'Reversel',
      panelClass: 'gDialogBox',
      disableClose: true,
      maxWidth: '450px',
    });
  }

  RejectDCNote1(template:TemplateRef<any>) {
    this.Reason.reset();
    this.dialog.open(template, {
      data: 'Reject',
      panelClass: 'gDialogBox',
      disableClose: true,
      maxWidth: '450px',
    });
  }

  BackClicked() {
    if (this.showNormalDCNote === true) {
      this.showNormalDCNote = false;
      this.showApproveDCNote = true;
      setTimeout(() => {
        const tbody = document.getElementById('ApprovalTable').querySelectorAll('tr');
        tbody[this.latestApprovalRow]?.focus();
      }, 100);
    } else {
      this.router.navigate(['/dashboard']);
    }
  }

  rejectDCNote(type, reason) {
    if (this.Reason.valid) {
      type === 'Reverse' ? this.ReverselDCNote(reason) : this.RejectDCNote(reason);
    } else {
      this.commonService.openSnackbar(`Please enter ${type} Reason`, 'Ok', 1500);
    }
  }

  async RejectDCNote(reason) {
    const api = {
      reqMainreq: 'SR_VoucherReject',
      Usr: this.globals.gUsrid,
      var1: this.ApprovalArr[0].VoucherNo,
      var2: this.ApprovalArr[0].tdate,
      var3: reason,
      var4: this.ApprovalArr[0].CmpCode,
      var5: this.ApprovalArr[0].FbCode,
      var7: this.DCApprovalForm.get('tranType').value.VoucherId,
    };
    let noteType = '';
    if (this.NoteInformationForm.get('noteType').value === 'Debit Note') {
      noteType = 'Debit note';
    } else {
      noteType = 'Credit Note';
    }
    this.Loading = true

    const ArrConfirm = await this.accService.gApiCallWithConfirm(`reject this ${noteType}`, api, this.globals.gApiserver, 'datareqsarnEleven');
    this.Loading = false

    if (ArrConfirm[0]?.StatusResponse === 'Success') {
      this.commonService.openSnackbar(`${noteType} Rejected Successfully`, 'Ok', 1500);
      this.dialog.closeAll();
      this.Loading = true;
      setTimeout(() => {
        this.Loading = false;
        this.BackClicked();
        this.ViewApprovalForm(this.DCApprovalForm);
      }, 200);
    }
  }

  async ReverselDCNote(reason) {
    const noteForm = this.NoteInformationForm.value;
    const voucherForm = this.voucherInfoForm.value;
    const accountForm = this.AccInformationForm.value;
    const Api = {
      reqMainreq: `S@/${this.reverseReqMain}/E@`,
      Usr: this.globals.gUsrid,
      ReceiptRoute: '',
      ReceiptMode: '',
      ReceivedFrm: '',
      VoucherType: noteForm.noteType,
      InstrumentRecNo: voucherForm.supplierNoteNo,
      InstDate: this.pipe.transform(voucherForm.supplierNoteDate, 'dd-MMM-yyyy'),
      InstBankCode: '',
      InstBankName: '',
      AcDate: this.pipe.transform(noteForm.accDate, 'dd-MMM-yyyy'),
      Narration: '',
      BankOrCashCode: voucherForm.Supcode,
      VoucherAmt: voucherForm.supplierNoteAmount,
      InstAmt: '0',
      Currency: 'INR',
      DivId: voucherForm.divCode,
      SubDivId: voucherForm.subDivCode,
      AnalysisCode: 'Ca',
      SubAnalysisCode: 'Sca',
      MICRno: '12121212',
      DeviceUniId: '',
      VersionNo: '',
      VoucherNo: this.VoucherNo,
      ActrnId: this.AcTrnId,
      RevReason: reason,
      EntryDate: this.trnDate,
      ExtraVar1: voucherForm.supplierAddress,
      ExtraVar2: '',
      ExtraVar3: '',
      ExtraVar4: '',
      ExtraVar5: this.CommonTrntype.value.TrnId,
      ExtraVar6: '',
      ExtraVar7: '',
      ExtraVar8: '',
      ExtraVar9: '',
      ExtraVar10: '',
      L1: [],
      L2: [],
    };
    let AttachmentYN = '';

    if (voucherForm.attachments) {
      AttachmentYN = 'Y';
    } else {
      AttachmentYN = 'N';
    }

    const L1Arr = [
      {
        DrCr: 'Dr',
        Ssno: 1,
        CmpCode: this.globals.gUsrDefultCmpCode,
        FbCode: voucherForm.finBookName.FbCode,
        BrCode: voucherForm.costCenter.brcode,
        AcSelectionType: 'Sup Account Code',
        AcUsCode: voucherForm.supplierAccCode,
        GstAmt: '0',
        BaseAmt: '0',
        TrnAmt: voucherForm.supplierNoteAmount,
        Remarks: voucherForm.narration,
        IntrFbCmpCode: '',
        IntrFbFbCode: '',
        IntrFbBrCode: '',
        IntrFbAcCode: '',
        Num1: '0',
        Num2: '0',
        Var1: '',
        Var2: '',
        Var3: '',
        Var4: '',
        Var5: '',
        AcDocUniqId: '',
        AttachmentYN,
        AcDocN: this.filename ?? '',
        AcDoc: this.base64File ?? '',
      },
    ];

    const L2Arr = [];
    this.accountingDetails.forEach((element, index) => {
      const AccObj = {
        DrCr: 'Cr',
        Ssno: index + 1,
        CmpCode: this.globals.gUsrDefultCmpCode,
        FbCode: element.FbCode,
        BrCode: Number(element.BrCode),
        AcSelectionType: element.AccType,
        AcUsCode: element.AccCode,
        GstAmt: element.GstAmtAuto,
        BaseAmt: element.BaseAmt,
        TrnAmt: element.TotalAmt,
        Remarks: element.remarks,
        IntrFbCmpCode: '',
        IntrFbFbCode: '',
        IntrFbBrCode: '',
        IntrFbAcCode: '',
        Num1: '0',
        Num2: '0',
        Var1: element.InvNo,
        Var2: element.InvDate,
        Var3: '',
        Var4: '',
        Var5: '',
        AcDocUniqId: '',
        AttachmentYN: 'N',
        AcDocN: '',
        AcDoc: '',
      };

      L2Arr.push(AccObj);
    });
    Api.L1 = L1Arr;
    Api.L2 = L2Arr;
    let noteType = '';

    if (this.NoteInformationForm.get('noteType').value === 'Debit Note') {
      noteType = 'Debit note';
    } else {
      noteType = 'Credit note';
    }this.Loading = true
    const DynamicApiCall = await this.accService.gApiCallWithConfirm(`reverse this ${noteType}`, Api, this.globals.gApiserver, 'AccEntryS1');
    this.Loading = false
    if (DynamicApiCall[0]?.StatusResponse === 'Success') {
      this.commonService.openSnackbar(`${noteType} Reversed Successfully`, 'ok', 2500);
      this.dialog.closeAll();
      this.Loading = true;
      this.clearDCNote();
      setTimeout(() => {
        this.Loading = false;
        this.firstTime = true;
        this.SubmitViewDCNote(this.viewDCNoteForm);
      }, 200);
      this.OnlyView = !this.OnlyView;
      this.accountingDetails = [];
    } else {
      this.commonService.openSnackbar('No data to reverse', 'Ok', 1500);
    }
  }

  DCNoteACCPosting() {

    this.trnsId = this.ApprovalArr[0].AcTrnId;
    this.dialog.open(AccountPostingDialogComponent, {
      minWidth: '100vw',
      height: '100vh',
      disableClose: true,
      data: this.trnsId,
      panelClass: 'gDialogBox',
    });
  }

  async PrintDCNote(templateRef:TemplateRef<any>) {
    const api = {
      reqMainreq: 'SR_BrAddressLogo',
      Usr: this.globals.gUsrid,
      var1: this.globals.gBrcode,
    };
    const ArrConfirm = await this.accService.gApiCallOne(api, this.globals.gApiserver, 'datareqsarnEleven');
    if (ArrConfirm[0]?.StatusResponse === 'Success') {
      this.dialog.open(templateRef, {
        width: '90vw',
        maxWidth: '95vw',
        maxHeight: '690px',
        disableClose: true,
        data: ArrConfirm[0],
        panelClass: 'gDialogBox',
      });
    }
  }

  BackClickedFromNormal() {
    if (this.GMenu !== 'DCNoteApproval' && this.showNormalDCNote) {
      if (this.canExist) {
        this.router.navigate(['/dashboard']);
      } else {
        this.showNormalDCNote = false;
        this.showApproveDCNote = false;
        this.showViewDCNote = true;
        setTimeout(() => {
          const tbody = document.getElementById('viewTable').querySelectorAll('tr');
          tbody[this.latestViewRow];
          tbody[this.latestViewRow]?.focus();
        }, 100);
      }
    } else {
      this.clearDCNote();
    }
  }

  getAttachedFile(vohcerNo) {
    const api = {
      reqMainreq: 'SR_AttachedFileView',
      Usr: this.globals.gUsrid,
      brcode: this.globals.gBrcode,
      var1: vohcerNo,
      var2: this.TrnType,
      var4: this.DocId,
    };
    this.commonService.reqSendto = 'datareqsarnEleven';
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

  verifiedStatusChange() {
    this.commonService
      .autoComplete(
        merge(
          this.voucherInfoForm.get('Supcode').valueChanges,
          this.AccInformationForm.get('InvoiceDate').valueChanges,
          this.AccInformationForm.get('InvoiceNo').valueChanges,
        ),
      )
      .subscribe((data: any) => {
        this.verified = false;

        this.AccInformationForm.get('trnGst').setValue('');
        this.AccInformationForm.get('totalAmount').setValue('');
      });
  }

  getGSTDetails() {
    if (!this.voucherInfoForm.get('Supcode').value) {
      Swal.fire({ text: `Please enter ${this.DCType} Code` });
      return;
    }
    if (this.AccInformationForm.get('finBookName').invalid) {
      Swal.fire({ text: 'Please enter InvoiceDate' });
      return;
    }
    if (this.AccInformationForm.get('InvoiceDate').invalid) {
      Swal.fire({ text: 'Please enter InvoiceDate' });
      return;
    }
    if (this.AccInformationForm.get('InvoiceNo').invalid) {
      Swal.fire({ text: 'Please enter InvoiceNo' });
      return;
    }
    this.verified = false;
    this.Loading = true;
    let var6 = '';
    this.DCType === 'Customer' ? var6 = 'Sales' : var6 = 'Purchase';
    const api = {
      reqMainreq: 'VerifySupplierInvoiceBillno',
      Usr: this.globals.gUsrid,
      brcode: this.globals.gBrcode,
      var1: this.globals.gUsrDefultCmpCode,
      var2: this.AccInformationForm.get('finBookName').value.FbCode,
      var3: formatDate(this.AccInformationForm.get('InvoiceDate').value, 'dd-MMM-yyyy', 'en'),
      var4: this.AccInformationForm.get('InvoiceNo').value,
      var5: this.voucherInfoForm.get('Supcode').value,
      var6,
    };

    this.commonService.reqSendto = 'KarSyApiFour';
    this.subs.add(
      this.commonService.sendReqst(api).subscribe({
        next: (response) => {
          if (response.length > 0) {
            if (response[0].StatusRes === 'Success') {
              setTimeout(() => {
                this.verified = true;
                this.Loading = false;
                document.getElementById('remarks').focus();
              }, 100);
            } else {
              this.Loading = false;
              Swal.fire({ text: response[0].StatusRes });
            }
          } else {
            this.Loading = false;
            Swal.fire({ text: 'No record found' });
          }
        },
        error: (error) => {
          this.Loading = false;
          Swal.fire({ text: error.message ?? 'Http failure response' });
        },
        complete: () => {
        },
      }),
    );
  }

  calcTaxDetails() {
    if (this.voucherInfoForm.get('Supcode').invalid) {
      Swal.fire({ text: `Please enter ${this.DCType} code` });
      return;
    }
    if (this.voucherInfoForm.get('supplierAddress').invalid) {
      Swal.fire({ text: `Please enter ${this.DCType} address` });
      return;
    }
    if (this.AccInformationForm.get('AccName').invalid) {
      Swal.fire({ text: 'Please enter service name' });
      return;
    }
    if (this.AccInformationForm.get('amount').invalid) {
      Swal.fire({ text: 'Please enter base amount' });
      return;
    }

    this.Loading = true;
    const api = {
      reqMainreq: 'CNDN_TaxDetails',
      Usr: this.globals.gUsrid,
      brcode: this.globals.gBrcode,
      var1: this.AccInformationForm.get('AccName').value.icode,
      var3: Number(this.voucherInfoForm.get('Supcode').value),
      var5: this.voucherInfoForm.get('supplierAddress').value,
      var7: this.AccInformationForm.get('amount').value,
      var8: 1,
      var9: 0,
      var10: this.voucherInfoForm.get('costCenter').value.brcode,
    };

    this.commonService.reqSendto = 'datareqsarnEleven';
    this.subs.add(
      this.commonService.sendReqst(api).subscribe({
        next: (response) => {
          if (response.length > 0) {
            if (response[0].StatusRes === 'Success') {
              let totalgst = 0;
              response.forEach((element:any) => {
                totalgst = element.taxamount + totalgst;
              });
              this.AccInformationForm.get('trnGst').setValue(totalgst);
              const baseamt = this.AccInformationForm.get('amount').value;
              this.AccInformationForm.get('totalAmount').setValue(Number(totalgst) + Number(baseamt));
              this.Loading = false;

              setTimeout(() => {
                if (this.DCType === 'Supplier') {
                  document.getElementById('InvoiceNo')?.focus();
                } else {
                  document.getElementById('salestype')?.focus();
                }
              }, 100);
            } else {
              this.Loading = false;
              Swal.fire({ text: response[0].StatusResponse });
            }
          } else {
            this.Loading = false;
            Swal.fire({ text: 'No record found' });
          }
        },
        error: (error) => {
          this.Loading = false;
          Swal.fire({ text: error.message ?? 'Http failure response' });
        },
        complete: () => {
          // this.docVerify = false;
        },
      }),
    );
  }

  async loadPayableAcCode() {
    const api = {
      reqMainreq: 'CNDN_PayableAc',
      Usr: this.globals.gUsrid,
      var1: this.globals.gUsrDefultCmpCode,
      var2: this.voucherInfoForm.get('finBookName').value.FbCode,
    };
    const ArrConfirm = await this.accService.gApiCallOne(api, this.globals.gApiserver, 'datareqsarnEleven');
    if (ArrConfirm[0]?.StatusResponse === 'Success') {
      this.payableData = ArrConfirm;
    }
  }

  openBottomSheet(Template:TemplateRef<any>): void {
    this.bottomSheet.open(Template, {

      disableClose: true,
      panelClass: 'bottomSheetContainer',

    });
  }
}
