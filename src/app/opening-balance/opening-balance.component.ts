/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-tabs */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable max-len */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-empty-function */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-constructor */
import {
  Component, OnInit, TemplateRef, ViewChild,
} from '@angular/core';
import {
  FormBuilder, FormControl, FormGroup, Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Globals } from 'src/app/globals';
import { SubSink } from 'subsink/dist/subsink';
import * as XLSX from 'xlsx';
import Swal from 'sweetalert2';
import { DatePipe, formatDate } from '@angular/common';
import { Subject, fromEvent } from 'rxjs';
import { Modal } from 'bootstrap';

import {
  trigger, style, animate, transition,
} from '@angular/animations';
import { CommonService } from 'src/app/services/common.service';
import { ItemserviceService } from 'src/app/services/itemservice.service';
import { AccServiceService } from 'src/app/services/acc-service.service';
import { AccountPostingDialogComponent } from 'src/app/commonComponents/accountPostingDialog/accountPostingDialog.component';

type AOA = any[][];

@Component({
  selector: 'app-opening-balance',
  templateUrl: './opening-balance.component.html',
  styleUrls: ['./opening-balance.component.scss'],
  animations: [
    trigger('enterAnimation', [
      transition(':enter', [
        style({ transform: 'translateX(100%)', opacity: 0 }),
        animate('300ms', style({ transform: 'translateX(0)', opacity: 1 })),
      ]),
      transition(':leave', [
        style({ transform: 'translateX(0)', opacity: 1 }),
        animate('200ms', style({ transform: 'translateX(100%)', opacity: 0 })),
      ]),
    ]),
    trigger('fadeInOut', [
      transition(':enter', [ // :enter is alias to 'void => *'
        style({ opacity: 0 }),
        animate('500ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [ // :leave is alias to '* => void'
        animate('200ms', style({ opacity: 0 })),
      ]),
    ]),
  ],
})
// eslint-disable-next-line import/prefer-default-export
export class OpeningBalanceComponent implements OnInit {
  private subs = new SubSink();

  Loading = false;

  NoteInformation = true;

  AccInfoToggle = false;

  AccInfoForm:FormGroup;

  NoteInformationForm :FormGroup;

  accTypes:any = [];

  trnTypes:any = [];

  AllFBList: any[];

  FbOneArr: any[];

  viewSearch = '';

  HeaderList = ['S.No', 'Warehouse', 'GL Account', 'Supplier', 'Sup.Addr', 'Sup.State', 'InvNo', 'InvAmt', 'InvDate', 'OutStandAmt', 'PayTerm', 'Narration', 'Action']

  HeaderListPrint = ['S.No', 'Warehouse', 'GL Account', 'Supplier', 'InvNo', 'InvAmt', 'InvDate', 'OutSt.Amt', 'PayTerm', 'Narration']

  AccTableData = [];

  data = [];

  receiptStatus = ['ALL', 'FRESH', 'AUTHORIZED', 'REJECTED', 'DELETED'];

  receiptStatusApp = ['ALL', 'FRESH', 'APPROVED', 'REJECTED'];

  MapOption = new FormControl('')

  bulkHeader = [
    'SNo',
    'WarehouseCode',
    'WarehouseName',
    'GLAccCode',
    'GLAccName',
    'SupplierCode',
    'SupplierName',
    'SupplierAddress',
    'SupplierState',
    'InvoiceNo',
    'InvoiceAmount',
    'InvoiceDate',
    'OutStandingAmount',
    'PayTerm',
    'Narration',
  ]

  BulkDataSource: any[];

  InvalidText: string;

    invalidAccArr = [];

  inputValue: any;

  SupplierNameArr: any[] = [];

  poLocationList: any[] = [];

  CompanyList: any = [];

  CompanyArr: any;

  ShowForm: boolean = true;

  searchSelect: string= '' ;

  TableBrList: any =[];

  GMenu: string = '' ;

  datePipe: DatePipe;

  Viewloading: boolean = false;

  approveLoad: boolean = false;

  showApproveJv: boolean = false;

  showNormalJv: boolean = false;

  showViewJv: boolean = false;

  ApprovalArr: any;

  showAccpost: boolean = false;

  SectionTitle = 'Opening Balance';

  viewJVForm: FormGroup;

  JVApprovalForm: FormGroup;

  date = new Date();

  OnlyView: any;

  ActionMode: string;

  canExist: boolean = true;

  attachmentAvailable: boolean;

  IsFresh: boolean;

  VoucherName: string = '';

  WStatus: string;

  ReceiptStatus: string;

  viewClicked: boolean;

  Authorized: string;

  curStatusFresh: boolean;

  VoucherNo: string;

  creditFileName: string;

  debitFileName: string;

  ReverseJv: boolean = false;

  showAppRejectButton: boolean = false;

  ApprovalTableArr =[]

  latestViewRow: any;

  firstTime: any = true;

  DataSource: any = [];

  @ViewChild('JvView') JvView: TemplateRef<any>;

  ShowViewForm: boolean = true;

  finyearList: any =[];

  AccCodeList: any =[];

  GLAccCodeList: any =[];

  suplierAddr: string;

  entryTypes: any[];

  AllBranchList: any =[];

  TrnType: any;

  AcTrnId: any;

  TrnDate: any;

  ReverseGivenFlag: any;

  trnDate: any;

  EntryType: string = '';

  latestApprovalRow = 0;

  JvAprFilterList: any[] = [];

  FbThreeArr: any[] = [];

  Reason = new FormControl('', Validators.required);

  JVHistoryArr: any[] = [];

  trnsId: any;

  title: boolean;

  invalidbranchCodev: any;

  existingDataSource: any[];

  pipe: DatePipe;
  editableRow: any = null;
  classArrTable: any = [];
  selectedRowIndex: number = null;

  constructor(
    private router: Router,
    private globals: Globals,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private commonService: CommonService,
    private accService: AccServiceService,
public itemservice: ItemserviceService,

  ) { 
    this.accService.unsubscribe$= new Subject<void>();
    this.commonService.apiUrl = this.globals.gApiserver;
  }

  async ngOnInit() {
    this.GMenu = this.globals.gmainMenuSelected;
    this.datePipe = new DatePipe('en-IN');
    this.commonService.reqSendto = 'datareqsarnEleven';
    if (this.GMenu === 'OpeningBalApprove') {
      this.SectionTitle = 'Opening Balance Approval';
      this.showNormalJv = false;
      this.showApproveJv = true;
      this.ShowForm = true;
      this.FormInitialize();
      this.shortcuts();
      this.initalApiCall();
      // this.getFinYear();
      this.loadAccType();
      this.getTrnType();
      setTimeout(() => {
        this.ViewApprovalJV(this.JVApprovalForm);
      }, 300);
    } else if (this.GMenu === 'OpeningBal') {
      this.showNormalJv = true;
      this.showApproveJv = false;
      this.ShowForm = true;
      this.FormInitialize();
      this.shortcuts();
      this.initalApiCall();
      // this.getFinYear();
      this.loadAccType();
      this.getTrnType();
      setTimeout(() => {
        document.getElementById('narration')?.focus();
      }, 200);
    } else {
      this.router.navigateByUrl('/dashboard');
    }
  }

  async ViewApprovalJV(ApprovalviewForm) {
    this.commonService.reqSendto = 'datareqsarnEleven';

    if (ApprovalviewForm.valid) {
      if (this.commonService.checkTypeValitity(this.JVApprovalForm.get('finBookName').value, 'Finbook Name')
      && this.commonService.checkTypeValitity(this.JVApprovalForm.get('companyName').value, 'Company Name')) {
        const api = {
          reqMainreq: 'SR_getApprovalView',
          Usr: this.globals.gUsrid,
          brcode: this.globals.gBrcode,
          var1: formatDate(ApprovalviewForm.get('fromDate').value, 'dd-MMM-yyyy', 'en'),
          var2: formatDate(ApprovalviewForm.get('toDate').value, 'dd-MMM-yyyy', 'en'),
          var3: ApprovalviewForm.value.companyName.CmpCode,
          var4: ApprovalviewForm.value.finBookName.FbCode,
          var5: ApprovalviewForm.get('status').value,
          var7: ApprovalviewForm.get('reverseEntry').value.VoucherId,
        };
        this.ApprovalTableArr = [];
        this.approveLoad = true;
        const ArrConfirm = await this.accService.gApiCallOne(api, this.globals.gApiserver, 'datareqsarnEleven');
        this.approveLoad = false;
        ArrConfirm[0]?.StatusResponse === 'Success' ? this.ApprovalTableArr = ArrConfirm : this.ApprovalTableArr = [];
      }
    } else {
      this.commonService.openSnackbar('Fill Required inputs', 'Ok', 1500);
    }
  }

  FormInitialize() {
    const fbObj = {
      FbCode: this.globals.gUsrDefultFbCode,
      FbName: this.globals.gUsrDefultFbName,
    };
    const cmpObj = {
      company: this.globals.gUsrDefultCmpName,
      CmpCode: this.globals.gUsrDefultCmpCode,
    };

    const brObj = {
      brname: this.globals.gBrname,
      brcode: this.globals.gBrcode,
    };

    this.NoteInformationForm = this.fb.group({
      accType: ['Vendor', Validators.required],
      trnType: ['Outstanding', Validators.required],
      finyear: [''],
      Accdate: [new Date(), Validators.required],
      Company: [cmpObj, Validators.required],
      Finbook: [fbObj, Validators.required],
      warehouse: [brObj, Validators.required],
      // CAtype: ['', Validators.required],
      AcCode: ['', Validators.required],
      totalAmt: ['', Validators.required],
    });

    this.AccInfoForm = this.fb.group({
      // Acdate: [new Date(), Validators.required],
      WHCode: ['', Validators.required],
      GLCode: ['', Validators.required],
      SupCode: ['', Validators.required],
      SupName: ['', Validators.required],
      supplierAddress: ['', Validators.required],
      supplierState: ['', Validators.required],
      InvNo: ['', Validators.required],
      InvAmt: ['', Validators.required],
      OutstandingAmt: ['', Validators.required],
      InvDate: [new Date(), Validators.required],
      PayTerm: ['', Validators.required],
      Narration: ['', Validators.required],

    });

    this.viewJVForm = this.fb.group({
      fromDate: [formatDate(new Date(this.date.getFullYear(), this.date.getMonth(), 1), 'yyyy-MM-dd', 'en'), Validators.required],
      toDate: [formatDate(new Date(), 'yyyy-MM-dd', 'en'), Validators.required],
      finBookName: [fbObj, Validators.required],
      Company: [cmpObj, Validators.required],
      costCenter: [brObj, Validators.required],
      status: ['ALL', Validators.required],
      tranType: ['AMC Master', Validators.required],
    });
    this.JVApprovalForm = this.fb.group({
      companyName: [cmpObj, Validators.required],
      finBookName: [fbObj, Validators.required],
      status: ['ALL', Validators.required],
      fromDate: formatDate(new Date(this.date.getFullYear(), this.date.getMonth(), 1), 'yyyy-MM-dd', 'en'),
      toDate: formatDate(new Date(), 'yyyy-MM-dd', 'en'),
      reverseEntry: 'AMC Master',
    });
  }

  async initalApiCall() {
    this.getVoucherType();
    this.AllFBList = await this.accService.getFinbook(this.globals.gUsrDefultCmpCode, '');
    this.CompanyList = await this.accService.getCompany();
  }

  FilterFinbook(keyValue, tabIndex) {
    const key = keyValue.toLocaleUpperCase();
    if (tabIndex === 'one') {
      this.FbOneArr = this.AllFBList.filter((option) => option.FbName.toLocaleUpperCase().includes(key));
      if (this.FbOneArr.length === 0) {
        this.commonService.openSnackbar('No record found ', 'Ok', 1500);
      }
    } else if (tabIndex === 'three') {
      this.FbThreeArr = this.AllFBList.filter((option) => option.FbName.toLocaleUpperCase().includes(key));
      if (this.FbThreeArr.length === 0) {
        this.commonService.openSnackbar('No record found ', 'Ok', 1500);
      }
    } else {
      this.JvAprFilterList = this.AllFBList.filter((option) => option.FbName.toLocaleUpperCase().includes(key));
      if (this.JvAprFilterList.length === 0) {
        this.commonService.openSnackbar('No record found ', 'Ok', 1500);
      }
    }
  }

  FocusNext(event:any, id: string) {
    if (event.source.selected && event.isUserInput) {
      setTimeout(() => {
        document.getElementById(id)?.focus();
      }, 100);
    }
  }

  async cmpSelected(event:any, company) {
    if (event.source.selected) {
      this.NoteInformationForm.get('Finbook').reset();
      this.NoteInformationForm.get('warehouse').reset();
      this.FbOneArr = [];
      this.TableBrList = [];
      this.AllFBList = await this.accService.getFinbook(company.CmpCode, '');
      setTimeout(() => {
        document.getElementById('Finbook')?.focus();
      }, 100);
    }
  }

  async cmpSelectedView(event:any, company) {
    if (event.source.selected) {
      this.viewJVForm.get('finBookName').reset();
      this.viewJVForm.get('costCenter').reset();
      this.FbThreeArr = [];
      this.AllBranchList = [];
      this.AllFBList = await this.accService.getFinbook(company.CmpCode, '');
      setTimeout(() => {
        document.getElementById('finBookName')?.focus();
      }, 100);
    }
  }

  async cmpSelectedApprove(event:any, company) {
    if (event.source.selected) {
      this.JVApprovalForm.get('finBookName').reset();
      this.JvAprFilterList = [];
      this.AllFBList = await this.accService.getFinbook(company.CmpCode, '');
      setTimeout(() => {
        document.getElementById('finBookName1')?.focus();
      }, 100);
    }
  }

  keytab(event:any, id: string) {
    if (event.key === 'Enter') {
      if (event.target.value !== '') {
        setTimeout(() => {
          document.getElementById(id)?.focus();
        }, 100);
      }
    }
  }

  openBulkDialog(Template: TemplateRef<any>) {
    this.BulkDataSource = [];
    this.InvalidText = '';
    this.ShowForm = false;
    this.EntryType = 'Bulk';

    this.BulkDataSource = [{

      SNo: '1',
      WarehouseCode: '1',
      WarehouseName: 'ADYAR SHOP',
      GLAccCode: '401001',
      GLAccName: ' Bank Interest - Income',
      SupplierCode: '46',
      SupplierName: 'Vasantham Productions',
      SupplierAddress: '1-Tamil Nadu, CHENNAI',
      SupplierState: '51, WEST JONES ROAD SAIDAPET',
      InvoiceNo: 'INV-001',
      InvoiceAmount: '3000',
      InvoiceDate: '20-Apr-2023',
      OutStandingAmount: '2000',
      PayTerm: '10',
      Narration: 'Test Entry',
    },
    ];

    this.dialog.open(Template, {
      minWidth: '85vw', maxHeight: '99vh', disableClose: true, autoFocus: false, panelClass: 'gDialogBox',
    });
  }

  compareFn1(o1: any, o2: any) {
    if (o1 && o2 && o1.AccountType === o2.AccountType) {
      return o2;
    } return '';
  }

  compareFn3(o1: any, o2: any) {
    if (o1 && o2 && o1.fyear === o2.fyear) {
      return o2;
    } return '';
  }

  compareFn2(o1: any, o2: any) {
    if (o1 && o2 && o1.TrnType === o2.TrnType) {
      return o2;
    } return '';
  }

  browsebutton() {
    document.getElementById('import').click();
  }

  shortcuts() {
    const keydown$ = fromEvent(window, 'keydown');
    this.subs.add(keydown$.subscribe((event: KeyboardEvent) => {
      if (this.GMenu === 'OpeningBal') {
        if (event.altKey && (event.key === 's' || event.key === 'S')) {
          event.preventDefault();
          if (!this.OnlyView && this.ActionMode !== 'Edit' && this.showNormalJv) {
            document.getElementById('SaveButton')?.focus();
            this.SaveJv('save');
          }else{
            document.getElementById('SaveButton')?.focus();
          }
        }
        if (event.altKey && (event.key === 'v' || event.key === 'V')) {
          event.preventDefault();
          document.getElementById('ViewButton')?.focus();
          this.ViewJv(this.JvView);
        }
        if (event.altKey && (event.key === 'c' || event.key === 'C')) {
          event.preventDefault();
          document.getElementById('ResetButton')?.focus();
          this.ResetJV();
        }
        if (event.altKey && (event.key === 'X' || event.key === 'x')) {
          event.preventDefault();
this.BackClickedFromNormal()
        }
        if (event.altKey && (event.key === 'f' || event.key === 'F')) {
          event.preventDefault();
          document.getElementById('search')?.focus();
        }
 
        if (event.altKey && (event.key === 'd' || event.key === 'D')) {
          if(this.IsFresh && !this.OnlyView && this.ActionMode === 'Edit' &&  this.showNormalJv){
          event.preventDefault();
          document.getElementById('deleteBtn')?.focus();
          this.DeleteJv();
        }
        
      }
      if (event.altKey && (event.key === 'a' || event.key === 'A')) {
        if(this.OnlyView && this.Authorized === 'AUTHORIZED' && !this.ReverseJv && this.showNormalJv){
        event.preventDefault();
        document.getElementById('accPost')?.focus();
        this.JVACCPosting();
      }
      
    }
 
      }else{
        if (event.altKey && (event.key === 'f' || event.key === 'F')) {
          event.preventDefault();
          document.getElementById('search')?.focus();
        }
        if (event.altKey && (event.key === 'X' || event.key === 'x')) {
          event.preventDefault();
this.BackClicked()
        }
        if (event.altKey && (event.key === 'a' || event.key === 'A')) {
          if(!this.showApproveJv && this.curStatusFresh && this.showAppRejectButton){
            event.preventDefault();
            document.getElementById('aprbtn')?.focus();
            this.ApproveJV()
            
          }
        }
        if (event.altKey && (event.key === 'r' || event.key === 'R')) {
          if(!this.showApproveJv && this.curStatusFresh && this.showAppRejectButton){
            event.preventDefault();
            document.getElementById('rjtbtn')?.focus();
            document.getElementById('rjtbtn')?.click();
            setTimeout(() => {
              document.getElementById('reasonInput')?.focus();
            }, 500);
          }
        }
      }
	  }));
  }

  SaveJv(action) {
    if (this.NoteInformationForm.invalid) {
      Swal.fire({ text: 'Please fill all Note Information' });
      return;
    }
    if (this.AccTableData.length === 0) {
      Swal.fire({ text: 'Please fill all Accounting Information' });
      return;
    }
    // if (typeof this.NoteInformationForm.value.finyear !== 'object') {
    //   Swal.fire({ text: 'Please choose valid FinYear' });
    //   return;
    // }
    if (typeof this.NoteInformationForm.value.Company !== 'object') {
      Swal.fire({ text: 'Please choose valid Company' });

      return;
    }
    if (typeof this.NoteInformationForm.value.Finbook !== 'object') {
      Swal.fire({ text: 'Please choose valid Finbook' });
      return;
    }
    if (typeof this.NoteInformationForm.value.warehouse !== 'object') {
      Swal.fire({ text: 'Please choose valid Warehouse' });
      return;
    }
    if (typeof this.NoteInformationForm.value.AcCode !== 'object') {
      Swal.fire({ text: 'Please choose valid Account Code' });
      return;
    }
    if (this.AccTableData.length === 0) {
      Swal.fire({ text: 'No record in Accounting Information Table' });
      return;
    }
    if (this.totalOutStAmt() !== this.NoteInformationForm.value.totalAmt) {
      Swal.fire({ text: 'Note Information Total and Invoice Total should be same' });
      return;
    }
    this.SaveApiCall(action);
  }

  async SaveApiCall(action) {
    this.Loading = true;
    let VoucherNo = '';
    let EntryDate = '';    
    if (action === 'update') {
      VoucherNo = this.VoucherNo;
      EntryDate = this.trnDate;

    } else {
      VoucherNo = '';
      EntryDate = '';
    }

    const note = this.NoteInformationForm.value;
    const account = this.AccInfoForm.value;

    const data = {
      reqMainreq: 'S@/OpeningBalance/E@',
      Usr: this.globals.gUsrid,
      ReceiptRoute: '',
      ReceiptMode: '',
      ReceivedFrm: '',
      VoucherType: '',
      InstrumentRecNo: '',
      InstDate: '',
      InstBankCode: '',
      InstBankName: '',
      AcDate: formatDate(note.Accdate, 'dd-MMM-yyyy', 'en'),
      Narration: '',
      BankOrCashCode: '',
      VoucherAmt: note.totalAmt,
      InstAmt: '0',
      Currency: 'INR',
      DivId: 'RESTAURANT',
      SubDivId: 'North Indian',
      AnalysisCode: 'Ca',
      SubAnalysisCode: 'Sca',
      MICRno: '12121212',
      DeviceUniId: '',
      VersionNo: '',
      VoucherNo,
      ActrnId: '',
      RevReason: '',
      EntryDate,
      ExtraVar1: this.EntryType,
      ExtraVar2: note.accType.AccountType,
      ExtraVar3: '',
      ExtraVar4: '',
      ExtraVar5: '',
      ExtraVar6: '',
      ExtraVar7: note.trnType.TrnType,
      ExtraVar8: note.accType.ATcode,
      ExtraVar9: note.trnType.ATcode,
      ExtraVar10: '',
      L1: [{
        DrCr: 'Dr',
        Ssno: '1',
        CmpCode: note.Company.CmpCode,
        FbCode: note.Finbook.FbCode,
        BrCode: note.warehouse.brcode,
        AcSelectionType: 'Account Code',
        AcUsCode: note.AcCode.AcCode,
        GstAmt: '0',
        BaseAmt: '0',
        TrnAmt: note.totalAmt,
        Remarks: '',
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
        AttachmentYN: 'N',
        AcDocN: 'aaa',
        AcDoc: 'aasddd',
      },
      ],
      L2: [
      ],

    };

    this.AccTableData.forEach((element) => {
      const l2 = {
        DrCr: 'Cr',
        Ssno: '1',
        CmpCode: note.Company.CmpCode,
        FbCode: note.Finbook.FbCode,
        BrCode: element.WHCode.brcode,
        AcSelectionType: 'Account Code',
        AcUsCode: element.GLCode.AcCode,
        GstAmt: element.InvAmt,
        BaseAmt: element.OutstandingAmt,
        TrnAmt: element.OutstandingAmt,
        Remarks: element.Narration,
        IntrFbCmpCode: '',
        IntrFbFbCode: '',
        IntrFbBrCode: '',
        IntrFbAcCode: '',
        Num1: element.SupName.supcode,
        Num2: '0',
        Var1: element.supplierAddress,
        Var2: element.InvNo,
        Var3: formatDate(element.InvDate, 'dd-MMM-yyyy', 'en'),
        Var4: element.PayTerm,
        Var5: element.supplierState,
        AcDocUniqId: '',
        AttachmentYN: 'N',
        AcDocN: '',
        AcDoc: '',
      };
      data.L2.push(l2);
    });

    const DynamicApiCall = await this.accService.gApiCallWithConfirm(action, data, this.globals.gApiserver, 'AccEntryS1');
    this.Loading = false;

    if (DynamicApiCall && DynamicApiCall[0]?.StatusResponse === 'Success') {
      if (action === 'save') {
        Swal.fire({ text: ' Saved successfully' });
        this.firstTime = true;
        this.ResetJV();
      } else {
        Swal.fire({ text: 'Updated successfully' });
        this.firstTime = true;
        this.ViewJv(this.JvView);
      }
    }
  }

  selectTranType(event, type) {
    setTimeout(() => {
      if (this.viewJVForm.valid) {
        type === 'view' ? this.SubmitViewJv(this.viewJVForm) : this.ViewApprovalJV(this.JVApprovalForm);
      } else {
        document.getElementById('button')?.focus();
      }
    }, 100);
  }

  async DeleteJv() {
    const ReqJson = {
      reqMainreq: 'OB_DeleteEntry',
      Usr: this.globals.gUsrid,
      var1: this.VoucherNo,
      var2: this.TrnDate,
      var5: this.TrnType,
    };
    const ArrConfirm = await this.accService.gApiCallWithConfirm('delete', ReqJson, this.globals.gApiserver, 'datareqsarnEleven');
    this.NoteInformationForm.enable();
    this.VoucherName = '';
    this.WStatus = '';
    this.ReceiptStatus = '';
    if (ArrConfirm[0]?.StatusResponse === 'Success') {
      Swal.fire({ text: 'Voucher  deleted successfully' });
      this.Loading = true;
      this.ResetJV();
      setTimeout(() => {
        this.Loading = false;
        this.firstTime = true;
        this.ViewJv(this.JvView);
      }, 200);
      this.OnlyView = !this.OnlyView;
      this.AccTableData = [];
    }
  }

  JVACCPosting() {
    this.title = true;
    this.trnsId = this.ApprovalArr[0].AcTrnId;
    this.dialog.open(AccountPostingDialogComponent, {
      minWidth: '100vw',
      height: '100vh',
      disableClose: true,
      data: this.trnsId,
      panelClass: 'gDialogBox',
    });
  }

  ViewJv(JvView: any) {
    this.showNormalJv = false;
    this.showViewJv = true;
    this.showApproveJv = false;
    this.SectionTitle = 'View Opening Balance';
    setTimeout(() => {
      const tbody = document.getElementById('viewTable').querySelectorAll('tr');
      tbody[this.latestViewRow]?.focus();
    }, 100);
    if (this.firstTime) {
      setTimeout(() => {
        this.SubmitViewJv(this.viewJVForm);
      }, 200);
      this.firstTime = false;
    }
  }

  SubmitViewJv(viewForm) {
    this.commonService.reqSendto = 'datareqsarnEleven';
    if (viewForm.valid) {
      if (this.commonService.checkTypeValitity(this.viewJVForm.get('finBookName').value, 'Finbook')
       && this.commonService.checkTypeValitity(this.viewJVForm.get('costCenter').value, 'Cost center')) {
        if (this.Viewloading) {
          return;
        }
        this.Viewloading = true;
        const api = {
          reqMainreq: 'SR_EntryView',
          Usr: this.globals.gUsrid,
          brcode: this.globals.gBrcode,
          var1: formatDate(viewForm.get('fromDate').value, 'dd-MMM-yyyy', 'en'),
          var2: formatDate(viewForm.get('toDate').value, 'dd-MMM-yyyy', 'en'),
          var3: 'All',
          var4: 'All',
          var5: viewForm.value.costCenter.brcode,
          var6: viewForm.get('Company').value.CmpCode,
          var7: viewForm.get('finBookName').value.FbCode,
          var8: viewForm.get('status').value,
          var9: this.viewJVForm.get('tranType')?.value.VoucherId,
        };
        this.DataSource = [];
        this.subs.add(
          this.commonService.sendReqst(api).subscribe({
            next: (response) => {
              this.Viewloading = false;
              if (response?.length > 0) {
                response[0]?.StatusResponse === 'Success' ? this.DataSource = [...response] : this.DataSource = [];
              } else {
                this.DataSource = [];
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
      this.commonService.openSnackbar('Fill all required inputs', 'Ok', 1500);
    }
  }

  previewclick(type) {
    const arrayOfArray = [
      {
        SNo: null,
        WarehouseCode: null,
        WarehouseName: null,
        GLAccCode: null,
        GLAccName: null,
        SupplierCode: null,
        SupplierName: null,
        SupplierAddress: null,
        SupplierState: null,
        InvoiceNo: null,
        InvoiceAmount: null,
        InvoiceDate: null,
        OutStandingAmount: null,
        PayTerm: null,
        Narration: null,
      },
    ];
    this.commonService.exportAsExcelFile(arrayOfArray, 'OpeningBalance');
  }

  suplierCodeenter(supcode, type, event?) {
    if (!this.AccInfoForm.get('SupCode').invalid) {
      this.getsupplierDetails(supcode, type);
    } else {
      this.AccInfoForm.get('SupName').reset();
      this.AccInfoForm.get('supplierAddress').reset();
      this.AccInfoForm.get('supplierState').reset();
      if (event.type !== 'focusout') {
        // Swal.fire({ text: `Enter ${this.DCType} Code` });
      }
    }
  }

  getsupplierDetails(supcode, type?) {
    this.Loading = true;
    const api = {
      reqMainreq: 'SupLocFilter',
      Usr: this.globals.gUsrid,
      brcode: this.globals.gBrcode,
      var3: supcode,
    };
    this.commonService.reqSendto = 'KarSyApiFour';
    this.AccInfoForm.get('SupName').setValue('');
    this.AccInfoForm.get('supplierAddress').setValue('');
    this.AccInfoForm.get('supplierState').setValue('');
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
              this.AccInfoForm.get('supplierState').setValue(response[0].Address);
              this.AccInfoForm.get('supplierAddress').setValue(response[0].SLocCode);
              this.AccInfoForm.get('SupName').setValue(SuplierNameObj);
              this.suplierAddr = `${response[0].SLocCode} - ${response[0].Statename} - ${response[0].City}`;
              setTimeout(() => {
                document.getElementById('InvNo')?.focus();
              }, 100);
              this.Loading = false;
            } else {
              Swal.fire(response[0].StatusRes);
              this.Loading = false;
            }
          } else {
            Swal.fire('No data found.');
            this.Loading = false;
          }
        },
        error: (error) => {
          this.Loading = false;
          Swal.fire({ text: error.message ?? 'Http failure response' });
        },
        complete: () => { this.Loading = false; },
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

  supplierSelected(event, supplier) {
    if (event.source.selected) {
      this.AccInfoForm.get('SupCode').setValue(supplier.supcode);
      this.getsupplierDetails(supplier.supcode);
      this.AccInfoForm.get('supplierState').setValue(supplier.supcode);
      document.getElementById('supplierNoteNo')?.focus();
      setTimeout(() => {
        this.SupplierNameArr = [];
      }, 100);
    }
  }

  keyEnter(event, keyValue) {
    if (event.key === 'Enter') {
      if (this.AccInfoForm.get('SupCode').valid) {
        this.getsupplierDetails(keyValue);
      }
    }
  }

  setsupstate(event, data) {
    if (event.source.selected && event.isUserInput) {
      this.AccInfoForm.get('supplierState').setValue(data.Address);
      this.suplierAddr = `${data.SLocCode} - ${data.Statename} - ${data.City}`;
      setTimeout(() => {
        document.getElementById('InvNo')?.focus();
      }, 100);
    }
  }

  totalInvAmt() {
    let total = 0;
    this.AccTableData.forEach((element) => {
      total = element.InvAmt + total;
    });
    return total;
  }

  totalOutStAmt() {
    let total = 0;
    this.AccTableData.forEach((element) => {
      total = element.OutstandingAmt + total;
    });
    return total;
  }

  onFileChange(evt: any, templateRef: TemplateRef<any>, type) {
    const target: DataTransfer = <DataTransfer>evt.target;
    const filName = this.inputValue;

    if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary', raw: false });

      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];
      this.data = <AOA>XLSX.utils.sheet_to_json(ws);
    };
    reader.readAsBinaryString(target.files[0]);

    this.Loading = true;
    setTimeout(() => {
      this.AccvalidationCheck(filName, templateRef);
    }, 200);
  }

  AccvalidationCheck(filName, templateRef: TemplateRef<any>) {
    this.existingDataSource = [...this.AccTableData];
    const tableJson = [];
    const sample = {};
    this.invalidbranchCodev = [];
    let counter = 1;
    if (this.data.length === 0) {
      Swal.fire({ text: 'No record found please check the file !' });
      this.Loading = false;
      return;
    }

    this.data.forEach((element, index) => {
      if (element.SNo && element.WarehouseCode && element.WarehouseName && element.GLAccCode && element.GLAccName
        && element.SupplierCode && element.SupplierName && element.SupplierAddress && element.SupplierState && element.InvoiceNo
        && element.InvoiceAmount && element.InvoiceDate && element.OutStandingAmount && element.PayTerm && element.Narration) {
        const ExistArr = this.AccTableData.some(
          (e) => e.SupName.supcode === element.SupplierCode && e.InvNo === element.InvoiceNo,
        );
        if (!ExistArr) {
          const WHCode = {
            brcode: element.WarehouseCode,
            brname: element.WarehouseName,

          };
          const GLCode = {
            AcCode: element.GLAccCode,
            AcName: element.GLAccName,
          };
          const SupName = {
            supcode: element.SupplierCode,
            SupName: element.SupplierName,
          };
          element.InvoiceDate = this.datePipe.transform(new Date(Math.round((element.InvoiceDate - 25569) * 86400 * 1000)), 'dd-MMM-yyyy');
          const tableObj = {
            WHCode,
            GLCode,
            SupName,
            supplierAddress: element.SupplierAddress,
            supplierState: element.SupplierState,
            InvNo: element.InvoiceNo,
            InvAmt: element.InvoiceAmount,
            OutstandingAmt: element.OutStandingAmount,
            InvDate: new Date(element.InvoiceDate),
            PayTerm: element.PayTerm,
            Narration: element.Narration,
          };
          tableJson.push(tableObj);
        } else {
          this.invalidbranchCodev.push(element);
        }
      } else {
        counter += 1;
        this.invalidbranchCodev.push(element);
      }
    });
    if (counter !== 1) {
      Swal.fire({ text: `${counter - 1} Empty row(s) are there,  please check the file !` });
      this.Loading = false;
      return;
    }
    if (this.invalidbranchCodev.length > 0) {
      this.dialog.open(templateRef, {
        minWidth: '95vw', maxHeight: '99vh', disableClose: true, autoFocus: false, panelClass: 'gDialogBox',
      });
      this.InvalidText = 'The following row(s) has invalid content / already exist, please check the file';
      this.BulkDataSource = this.invalidbranchCodev;
      this.Loading = false;
      this.creditFileName = '';
      return;
    }
    this.inputValue = '';
    if (tableJson.length > 0) {
      this.InvalidText = '';
      this.dialog.closeAll();
    if(this.AccTableData.length  > 0){


      Swal.fire({
        title: 'There is aleady a file in table, what do you want to do ?  ',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'OverWrite',
        denyButtonText: `Merge`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          this.AccTableData = tableJson;
          this.creditFileName = filName;
          Swal.fire({ text: 'XL data(s) fetched to table' });
          this.inputValue = '';
          this.ShowForm = false;
        } else if (result.isDenied) {
          this.AccTableData.push(...tableJson);
          this.creditFileName = filName;
          Swal.fire({ text: 'XL data(s) fetched to table' });
          this.inputValue = '';
          this.ShowForm = false;
        }
      })

    }else{
      this.AccTableData = tableJson;
      this.creditFileName = filName;
      Swal.fire({ text: 'XL data(s) fetched to table' });
      this.inputValue = '';
      this.ShowForm = false;
    }

    }
    this.Loading = false;
  }

  addRow() {
    this.ShowForm = true;
    this.EntryType = 'Individual';
    setTimeout(() => {
      document.getElementById('WHCode')?.focus();
    }, 100);
  }

  deleteAll() {
    this.commonService.taskConfirmation('Are you sure to remove all ?', '', true, 'Yes', '').then((res) => {
      if (res.isConfirmed) {
        this.AccTableData = [];
      }
    });
  }

  filterCmp(key) {
    this.CompanyArr = this.CompanyList.filter((option) => option.company.toLocaleUpperCase().includes(key.toLocaleUpperCase()));
  }

  async getTableLocation(keyValue) {
    if (typeof this.NoteInformationForm.get('Company') !== 'object') {
      Swal.fire({ text: 'Please enter valid company name' });
    }
    if (typeof this.NoteInformationForm.get('Finbook') !== 'object') {
      Swal.fire({ text: 'Please enter valid finbook name' });
    }
    const FBCode = this.NoteInformationForm.get('Finbook').value.FbCode;
    const { CmpCode } = this.NoteInformationForm.get('Company').value;

    const api = {
      reqMainreq: 'SR_brSearch',
      Usr: this.globals.gUsrid,
      brcode: this.globals.gBrcode,
      var1: keyValue,
      var2: CmpCode,
      var3: FBCode,
    };

    this.TableBrList = await this.accService.gApiCallOne(api, this.globals.gApiserver, 'datareqsarnEleven');
  }

  tablSelected(event, id) {
    if (event.source.selected) {
      setTimeout(() => {
        this.TableBrList = [];
        document.getElementById(id)?.focus();
      }, 100);
    }
  }
  
  tablSelected2(event, id,data) {
    if (event.source.selected) {
      setTimeout(() => {
     
        if(this.AccTableData.length > 0){
const exist = this.AccTableData.find(element => element.GLCode.AcCode === data.AcCode)
if(exist){
  Swal.fire({text:'Same Account code already exist in table'})
  this.NoteInformationForm.get('AcCode').reset();
  return
}else{
  this.TableBrList = [];
  document.getElementById(id)?.focus()
}
        }else{
          this.TableBrList = [];
          document.getElementById(id)?.focus()
        }
      }, 100);
    }
  }
  tablSelected1(event, id, data) {
    if (event.source.selected) {
        if(data.AcCode == this.NoteInformationForm.get('AcCode').value.AcCode){
          Swal.fire({text:'Same Account code already exist in Note Information'})
          this.AccInfoForm.get('GLCode').reset();
          return
        }else{
          setTimeout(() => {
          this.GLAccCodeList = [];
          document.getElementById(id)?.focus();
        }, 100);
        }
      
    }
  }
  ResetJV() {
    this.Loading = true;
    this.canExist = true;
    this.showNormalJv = true;
    this.showApproveJv = false;
    this.showViewJv = false;
    this.Viewloading = false;

    this.approveLoad = false;

    this.showApproveJv = false;

    this.showNormalJv = true;

    this.showAccpost = false;

    this.OnlyView = false;

    this.ShowForm = true;
    this.MapOption.reset();

    this.viewSearch = '';
    this.attachmentAvailable = false;
    this.viewSearch = '';
    this.IsFresh = false;
    this.VoucherName = '';
    this.WStatus = '';
    this.ReceiptStatus = '';
    this.viewClicked = false;
    this.Authorized = '';

    this.curStatusFresh = false;

    this.VoucherNo = '';

    this.ActionMode = 'View';

    this.creditFileName = '';

    this.debitFileName = '';
    this.AccTableData = [];
    this.formReset();

    document.getElementById('narration')?.focus();
    setTimeout(() => {
      this.Loading = false;
    }, 100);
  }

  formReset() {
    this.resetNoteForm();
    this.ResetAccInfoForm();
  }

  resetNoteForm() {
    this.NoteInformationForm.enable();
    this.NoteInformationForm.reset();
    const fbObj = {
      FbCode: this.globals.gUsrDefultFbCode,
      FbName: this.globals.gUsrDefultFbName,
    };
    const cmpObj = {
      company: this.globals.gUsrDefultCmpName,
      CmpCode: this.globals.gUsrDefultCmpCode,
    };

    const brObj = {
      brname: this.globals.gBrname,
      brcode: this.globals.gBrcode,
    };

    this.NoteInformationForm = this.fb.group({
      accType: ['Vendor', Validators.required],
      trnType: ['Outstanding', Validators.required],
      finyear: [''],
      Accdate: [new Date(), Validators.required],
      Company: [cmpObj, Validators.required],
      Finbook: [fbObj, Validators.required],
      warehouse: [brObj, Validators.required],
      AcCode: ['', Validators.required],
      totalAmt: ['', Validators.required],
    });
    this.NoteInformationForm.get('trnType').setValue(this.trnTypes[0]);
    this.NoteInformationForm.get('accType').setValue(this.accTypes[0]);
    // this.NoteInformationForm.get('finyear').setValue(this.finyearList[0]);
  }

  ResetAccInfoForm() {
    this.AccInfoForm.reset();
    this.AccInfoForm.get('InvDate').setValue(new Date());
    this.AccInfoForm.enable();
  }

  AutoSelectdefault(id) {
    this.searchSelect = '';
    setTimeout(() => {
      document.getElementById(id)?.focus();
    }, 100);
  }

  timedOutCloser;

  mouseEnter(trigger1) {
    if (this.timedOutCloser) {
      clearTimeout(this.timedOutCloser);
    }
    trigger1.openMenu();
  }

  mouseLeave(trigger1) {
    this.timedOutCloser = setTimeout(() => {
      trigger1.closeMenu();
    }, 50);
  }

  getFinYear() {
    const post:any = {};
    post.reqMainreq = 'Financialyearload';
    post.Usr = this.globals.gUsrid;
    post.var9 = this.globals.gclientServer;
    if (this.globals.gclientServer === 'Client') {
      this.itemservice.get_salesrep_URL = `${this.globals.gApiserver}/api/datareqrshTen`;
      this.itemservice.get_URL = `${this.globals.gApiserver}/api/datareqrshTen`;
    } else {
      this.itemservice.get_salesrep_URL = `${this.globals.gServerApiUrl}/api/datareqrshTen`;
      this.itemservice.get_URL = `${this.globals.gServerApiUrl}/api/datareqrshTen`;
    }
    this.finyearList = [];
    this.subs.add(
      this.itemservice.getSalesReportAPI(post).subscribe({
        next: (response) => {
          if (response.length > 0) {
            this.finyearList = response;
            this.NoteInformationForm.get('finyear').setValue(this.finyearList[0]);
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

  async loadAccType() {
    const api = {
      reqMainreq: 'OB_ControlAccountType',
      Usr: this.globals.gUsrid,
      brcode: this.globals.gBrcode,
    };
    this.accTypes = await this.accService.gApiCallOne(api, this.globals.gApiserver, 'datareqsarnEleven');
    if (this.accTypes.length === 0) {
      this.commonService.openSnackbar('No Control Account Types.', 'Ok', 1500);
    }
    this.NoteInformationForm.get('accType').setValue(this.accTypes[0]);
  }

  async getTrnType() {
    const api = {
      reqMainreq: 'OB_TrnType',
      Usr: this.globals.gUsrid,
      brcode: this.globals.gBrcode,
    };
    this.trnTypes = await this.accService.gApiCallOne(api, this.globals.gApiserver, 'datareqsarnEleven');
    this.NoteInformationForm.get('trnType').setValue(this.trnTypes[0]);
  }

  async getAcCode(keyValue, number) {
    if (typeof this.NoteInformationForm.get('Company') !== 'object') {
      Swal.fire({ text: 'Please enter valid company name' });
    }
    if (typeof this.NoteInformationForm.get('Finbook') !== 'object') {
      Swal.fire({ text: 'Please enter valid finbook name' });
    }

    const api = {
      reqMainreq: 'FBAccSearch',
      Usr: this.globals.gUsrid,
      brcode: this.globals.gBrcode,
      var1: keyValue,
      var2: this.NoteInformationForm.get('Company').value.CmpCode,
      var3: this.NoteInformationForm.get('Finbook').value.FbCode,
      var4: 'OpeningBalance',
    };
    if (number === 1) {
      this.AccCodeList = await this.accService.gApiCallOne(api, this.globals.gApiserver, 'datareqsarnEight');
    } else {
      this.GLAccCodeList = await this.accService.gApiCallOne(api, this.globals.gApiserver, 'datareqsarnEight');
    }
  }

  AddAcInfoToble() {
    if (this.AccInfoForm.valid) {
      if (typeof this.AccInfoForm.value.WHCode !== 'object') {
        return;
      }
      if (typeof this.AccInfoForm.value.GLCode !== 'object') {
        return;
      }
      if (typeof this.AccInfoForm.value.SupName !== 'object') {
        return;
      }

    
      if(this.editableRow === null){

      const exist = this.AccTableData.find((option) => option?.SupName?.supcode == this.AccInfoForm.value?.SupName.supcode && option?.InvNo == this.AccInfoForm.value?.InvNo);
      if (exist) {
        Swal.fire({ text: 'Invoice number with selected Supplier is already added' });
    
      } else {
        this.Loading = true;
        setTimeout(() => {
          
          this.AccInfoForm.value.supplierAddress = this.suplierAddr;
          this.AccTableData.push(this.AccInfoForm.value);
          this.suplierAddr = '';
          this.ResetAccInfoForm();
          this.resetAcForm()
          this.Loading = false;
        }, 50);
      }

    }else{
      this.AccInfoForm.value.supplierAddress = this.suplierAddr;
      this.AccTableData[this.editableRow] =  this.AccInfoForm.value
      this.suplierAddr = '';
      this.ResetAccInfoForm();
      this.resetAcForm()
      this.Loading = false;
    }







    } else {
      Swal.fire({ text: 'Please fill all details in Accounting Information ' });
    }
  }

  JVDetails(tabledata: any, flag: any, rowIndex) {
    const api = {
      reqMainreq: 'OB_DetailsView',
      Usr: this.globals.gUsrid,
      brcode: this.globals.gBrcode,
      var1: tabledata.VoucherNo,
      var2: formatDate(tabledata.tdate, 'dd-MMM-yyyy', 'en'),
      var5: this.viewJVForm.get('tranType').value.VoucherId,
    };
    this.Loading = true;
    // this.DebitTableArr = [];
    // this.CreditTableArr = [];
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
              this.TrnType = response[0].TrnType;
this.MapOption.reset();
              this.showNormalJv = true;
              this.showViewJv = false;
              this.showApproveJv = false;
              this.Loading = false;
              this.canExist = false;
              this.EntryType = response[0].OBUpload;
              this.VoucherName = `Voucher No:   ${response[0].VoucherNo}`;
              this.VoucherNo = response[0].VoucherNo;
              this.setEnteryScreenValue(response, tabledata);
              this.TrnDate = response[0].tdate;
              this.Authorized = response[0].TrnStatus;
              this.AcTrnId = response[0].AcTrnId;
              this.ShowForm = false;
              // this.voucherInformationForm.get('JvType').setValue(response[0].VoucherType);
              // this.voucherInformationForm.get('narration').setValue(response[0].Narration);
              // this.voucherInformationForm.get('accDate').setValue(formatDate(response[0].AcDate, 'yyyy-MM-dd', 'en'));
              this.ApprovalArr = response;
              this.ReverseGivenFlag = response[0].ReverseGiven;
              tabledata.WStatus === 'FRESH' ? this.IsFresh = true : this.IsFresh = false;
              const TrnValue = this.viewJVForm.get('tranType').value.VoucherType;
              if (TrnValue === 'Opening Balance Reversal') {
                this.ReverseJv = true;
                if (flag === 'JVView' || flag === 'JVEdit') {
                  this.NoteInformationForm.disable();
                  this.OnlyView = true;
                  if (!this.IsFresh) {
                    this.NoteInformationForm.disable();
                    this.OnlyView = true;
                  } else {
                    this.NoteInformationForm.enable();
                    this.ShowForm = false;
                    this.OnlyView = false;
                  }
                  this.trnDate = tabledata.tdate;
                  this.ActionMode = 'Edit';
                } else if (flag === 'JvReEntry') {
                  this.NoteInformationForm.enable();
                  this.OnlyView = false;
                  this.trnDate = tabledata.tdate;
                  this.ActionMode = 'ReUse';
                  this.ShowForm = false;
                }
              } else if (TrnValue === 'Opening Balance') {
                this.ReverseJv = false;
                if (flag === 'JVView' || flag === 'JVEdit') {
                  if (!this.IsFresh) {
                    this.NoteInformationForm.disable();
                    this.OnlyView = true;
                  } else {
                    this.NoteInformationForm.enable();
                    this.ShowForm = false;
                    this.OnlyView = false;
                  }

                  this.trnDate = tabledata.tdate;
                  this.ActionMode = 'Edit';
                } else if (flag === 'JvReEntry') {
                  this.NoteInformationForm.enable();
                  this.OnlyView = false;
                  this.trnDate = tabledata.tdate;
                  this.ActionMode = 'ReUse';
                  this.ShowForm = false;
                }
              }
            } else {
              Swal.fire({ text: `${response[0].StatusResponse}` });
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
    // this.SRDelete = true;
  }

  async approvalJVDetails(row, index) {
    const api = {
      reqMainreq: 'OB_getAprvlDetsView',
      Usr: this.globals.gUsrid,
      var1: row.Trnid,
      var2: row.Date,
      var4: row.CmpCode,
      var5: row.FbCode,
      var7: this.JVApprovalForm.get('reverseEntry').value.VoucherId,
    };
    this.latestApprovalRow = index + 1;
    this.Loading = true;
    const ArrConfirm = await this.accService.gApiCallOne(api, this.globals.gApiserver, 'datareqsarnEleven');
    if (ArrConfirm[0]?.StatusResponse === 'Success') {
      this.ApprovalArr = ArrConfirm;
      this.AccTableData = [];
      // ArrConfirm.forEach((element) => {
      //   element.DrCr === 'Dr' ? this.DebitTableArr.push(element) : this.CreditTableArr.push(element);
      // });
      this.TrnType = this.JVApprovalForm.get('reverseEntry').value.VoucherId;
      this.VoucherNo = row.Trnid;
      this.setEnteryScreenValue(ArrConfirm, row);
      this.NoteInformationForm.disable();
      this.showNormalJv = true;
      this.showApproveJv = false;
      this.ShowForm = false;
      this.Authorized = row.TrnStatus;
      this.VoucherName = `Journal No: ${row.Trnid}`;
      this.WStatus = `WStatus: ${row.WStatus}`;
      this.ReceiptStatus = `DC Status: ${row.VStatus}`;
      row.CurStatus === 'FRESH' ? this.curStatusFresh = true : this.curStatusFresh = false;
      ArrConfirm[0].TrnStatus === 'FRESH' ? this.showAccpost = true : this.showAccpost = false;
      this.Loading = false;
      ArrConfirm[0].ApproveOnly === 'N' ? this.showAppRejectButton = false : this.showAppRejectButton = true;
      this.OnlyView = true;
      this.Loading = false;
    }
    this.Loading = false;
  }

  async ApproveJV() {
    const api = {
      reqMainreq: 'SR_VoucherApproval',
      Usr: this.globals.gUsrid,
      var1: this.ApprovalArr[0].VoucherNo,
      var2: this.ApprovalArr[0].tdate,
      var4: this.ApprovalArr[0].CmpCode,
      var5: this.ApprovalArr[0].FbCode,
      var7: this.JVApprovalForm.get('reverseEntry').value.VoucherId,
    };
    const ArrConfirm = await this.accService.gApiCallWithConfirm('approve this Voucher', api, this.globals.gApiserver, 'datareqsarnEleven');
    if (ArrConfirm[0]?.StatusResponse === 'Success') {
      Swal.fire({ text: 'Voucher Approved Successfully' });
      this.Loading = true;
      setTimeout(() => {
        this.Loading = false;
        this.BackClicked();
        this.ViewApprovalJV(this.JVApprovalForm);
      }, 200);
    }
  }

  async ReverselJv1(template:TemplateRef<any>) {
    this.Reason.reset();
    this.dialog.open(template, {
      data: 'Reversel',
      panelClass: 'gDialogBox',
      disableClose: true,
    });
  }

  RejectJV1(template:TemplateRef<any>) {
    this.Reason.reset();
    this.dialog.open(template, {
      data: 'Reject',
      panelClass: 'gDialogBox',
      disableClose: true,
    });
  }

  async JVHistory(tabledata) {
    if (typeof this.viewJVForm.get('Company') !== 'object') {
      Swal.fire({ text: 'Please enter valid company name' });
    }
    if (typeof this.viewJVForm.get('finBookName') !== 'object') {
      Swal.fire({ text: 'Please enter valid finbook name' });
    }
    const ReqJson = {
      reqMainreq: 'WorkFlowAprovalUsr',
      Usr: this.globals.gUsrid,
      brcode: this.globals.gBrcode,
      var1: formatDate(tabledata.tdate, 'dd-MMM-yyyy', 'en'),
      var2: this.viewJVForm.get('Company').value.CmpCode,
      var3: this.viewJVForm.get('finBookName').value.FbCode,
      var4: this.viewJVForm.get('tranType').value.VoucherId,
      var5: tabledata.VoucherNo,
    };
    this.Loading = true;
    this.JVHistoryArr = [];
    const ArrConfirm = await this.accService.gApiCallOne(ReqJson, this.globals.gApiserver, 'datareqsarnSix');
    this.Loading = false;
    if (ArrConfirm[0]?.StatusResponse === 'Success') {
      this.JVHistoryArr = ArrConfirm;
      const element = document.getElementById('reqStatusVendorModal') as HTMLElement;
      const myModal = new Modal(element);
      myModal.show();
    } else {
      this.commonService.openSnackbar('No record found', 'Ok', 1500);
    }
  }

  setEnteryScreenValue(response, tabledata) {
    this.AccTableData = [];
    response.forEach((element) => {
      if (element.DrCr === 'Dr') {
        const note = this.NoteInformationForm;
        const fbObj = {
          FbCode: element.FbCode,
          FbName: element.FbName,
        };
        const cmpObj = {
          CmpCode: element.CmpCode,
          company: element.CmpName,
        };

        const brObj = {
          brname: element.BrName,
          brcode: element.BrCode,
        };

        const AccObj = {
          AcCode: element.AcCode,
          AcName: element.AcName,
        };

        const CATypeObj = {
          AccountType: element.OBCtrlType,
          ATcode: element.OBCtrlCode,
          StatusResponse: 'Success',
        };

        const TrnTypeObj = {
          ATcode: element.VoucherCode,
          StatusResponse: 'Success',
          TrnType: element.VoucherType,
        };

        // const FinYrObj = {
        //   CurrentFyear: element.Fyear,
        //   fyear: element.Fyear,
        // };

        note.get('accType').setValue(CATypeObj);
        note.get('trnType').setValue(TrnTypeObj);
        // note.get('finyear').setValue(FinYrObj);
        note.get('Accdate').setValue(new Date(element.AcDate));
        note.get('Company').setValue(cmpObj);
        note.get('Finbook').setValue(fbObj);
        note.get('warehouse').setValue(brObj);
        note.get('AcCode').setValue(AccObj);
        note.get('totalAmt').setValue(element.VoucherAmt);
      } else {
        const WHCode = {
          brcode: element.BrCode,
          brname: element.BrName,

        };
        const GLCode = {
          AcCode: element.AcCode,
          AcName: element.AcName,
        };
        const SupName = {
          supcode: element.VndrCliCode,
          SupName: element.VCName,
        };
        const tableObj = {
          WHCode,
          GLCode,
          SupName,
          supplierAddress: element.SupAdd,
          supplierState: element.SupState,
          InvNo: element.InvNo,
          InvAmt: element.InvAmt,
          OutstandingAmt: element.OutStandingAmt,
          InvDate: new Date(element.InvDate),
          PayTerm: element.PayTerm,
          Narration: element.Remarks,
        };
        this.AccTableData.push(tableObj);
      }
    });
  }

  toggleFormView() {
    this.ShowViewForm = !this.ShowViewForm;
  }

  removdatafromTable(i, GLAcc) {
    this.commonService.taskConfirmation(`Are you sure to remove ${GLAcc} ?`, '', true, 'Yes', '').then((res) => {
      if (res.isConfirmed) {
        this.AccTableData.splice(i, 1);
      }
    });
  }

  async getViewBranchName(keyValue) {
    if (typeof this.viewJVForm.get('Company') !== 'object') {
      Swal.fire({ text: 'Please enter valid company name' });
    }
    if (typeof this.viewJVForm.get('finBookName') !== 'object') {
      Swal.fire({ text: 'Please enter valid finbook name' });
    }

    const FBCode = this.viewJVForm.get('finBookName').value.FbCode;
    const Company = this.viewJVForm.get('Company').value.CmpCode;

    const api = {
      reqMainreq: 'SR_brSearchRPT',
      Usr: this.globals.gUsrid,
      brcode: this.globals.gBrcode,
      var1: keyValue,
      var2: Company,
      var3: FBCode,
    };
    this.AllBranchList = await this.accService.gApiCallOne(api, this.globals.gApiserver, 'datareqsarnEleven');
  }

  getVoucherType() {
    const api = {
      reqMainreq: 'VoucherList',
      Usr: this.globals.gUsrid,
      brcode: this.globals.gBrcode,
      var1: '',
      var2: 'Opening Balance',
    };
    this.commonService.reqSendto = 'datareqsarnEleven';
    this.subs.add(
      this.commonService.sendReqst(api).subscribe({
        next: (response) => {
          if (response[0].StatusResponse === 'Success') {
            this.entryTypes = response;
            this.viewJVForm.get('tranType').setValue(response[0]);
            this.JVApprovalForm.get('reverseEntry').setValue(response[0]);
          } else {
            this.commonService.openSnackbar(response[0].StatusResponse, 'Ok', 1500);
          }
        },
        error: (error) => {
          Swal.fire({ text: error.message ?? 'Http failure response' });
        },
        complete: () => {},
      }),
    );
  }

  viewFbchange(event, type) {
    if (event.source.selected) {
      setTimeout(() => {
        if (type === 'view') {
          this.AllBranchList = [];
          this.viewJVForm.get('costCenter').setValue('');
          document.getElementById('viewCostCenter')?.focus();
        } else {
          this.JVApprovalForm.valid ? this.ViewApprovalJV(this.JVApprovalForm) : document.getElementById('approvalFromDate')?.focus();
        }
      }, 100);
    }
  }

  BackClickedFromView() {
    this.ResetJV();
  }

  BackClicked() {
    if (this.showNormalJv === true) {
      this.showNormalJv = false;
      this.showApproveJv = true;
      setTimeout(() => {
        const tbody = document.getElementById('ApprovalTable').querySelectorAll('tr');
        tbody[this.latestApprovalRow]?.focus();
      }, 100);
    } else {
      this.router.navigate(['/dashboard']);
    }
  }

  BackClickedFromNormal() {
    if (this.GMenu !== 'OpeningBalApprove' && this.showNormalJv) {
      if (this.canExist) {
        this.router.navigate(['/dashboard']);
      } else {
        this.showNormalJv = false;
        this.showApproveJv = false;
        this.showViewJv = true;
        setTimeout(() => {
          const tbody = document.getElementById('viewTable').querySelectorAll('tr');
          tbody[this.latestViewRow]?.focus();
        }, 100);
      }
    } else {
      this.ResetJV();
    }
  }

  mapOptionChoosed(temp:TemplateRef<any>) {
    setTimeout(() => {
      if (this.MapOption.value === 'Individual') {
        this.addRow();
      } else {
        this.ShowForm = false;
        this.openBulkDialog(temp);
      }
    }, 10);
  }

  async ReverselJv(reason) {
    if (this.AccTableData.length > 0) {
      const note = this.NoteInformationForm.value;
      const account = this.AccInfoForm.value;
      const data = {
        reqMainreq: 'S@/OpeningBalance_Rev/E@',
        Usr: this.globals.gUsrid,
        ReceiptRoute: '',
        ReceiptMode: '',
        ReceivedFrm: '',
        VoucherType: '',
        InstrumentRecNo: '',
        InstDate: '',
        InstBankCode: '',
        InstBankName: '',
        AcDate: formatDate(note.Accdate, 'dd-MMM-yyyy', 'en'),
        Narration: '',
        BankOrCashCode: '',
        VoucherAmt: note.totalAmt,
        InstAmt: '0',
        Currency: 'INR',
        DivId: 'RESTAURANT',
        SubDivId: 'North Indian',
        AnalysisCode: 'Ca',
        SubAnalysisCode: 'Sca',
        MICRno: '12121212',
        DeviceUniId: '',
        VersionNo: '',
        VoucherNo: this.VoucherNo,
        ActrnId: this.AcTrnId,
        RevReason: reason,
        EntryDate: this.trnDate,
        ExtraVar1: this.EntryType, // entry type
        ExtraVar2: note.accType.AccountType,
        ExtraVar3:'',
        ExtraVar4: '',
        ExtraVar5: '',
        ExtraVar6: '',
        ExtraVar7: note.trnType.TrnType,
        ExtraVar8: note.accType.ATcode,
        ExtraVar9: note.trnType.ATcode,
        ExtraVar10: '',
        L1: [{
          DrCr: 'Dr',
          Ssno: '1',
          CmpCode: note.Company.CmpCode,
          FbCode: note.Finbook.FbCode,
          BrCode: note.warehouse.brcode,
          AcSelectionType: 'Account Code',
          AcUsCode: note.AcCode.AcCode,
          GstAmt: '0',
          BaseAmt: '0',
          TrnAmt: '0',
          Remarks: '',
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
          AttachmentYN: 'N',
          AcDocN: 'aaa',
          AcDoc: 'aasddd',
        },
        ],
        L2: [
        ],

      };

      this.AccTableData.forEach((element) => {
        const l2 = {
          DrCr: 'Cr',
          Ssno: '1',
          CmpCode: note.Company.CmpCode,
          FbCode: note.Finbook.FbCode,
          BrCode: element.WHCode.brcode,
          AcSelectionType: 'Account Code',
          AcUsCode: element.GLCode.AcCode,
          GstAmt: element.InvAmt,
          BaseAmt: element.OutstandingAmt,
          TrnAmt: element.InvAmt + element.OutstandingAmt,
          Remarks: element.Narration,
          IntrFbCmpCode: '',
          IntrFbFbCode: '',
          IntrFbBrCode: '',
          IntrFbAcCode: '',
          Num1: element.SupName.supcode,
          Num2: '0',
          Var1: element.supplierAddress,
          Var2: element.InvNo,
          Var3: formatDate(element.InvDate, 'dd-MMM-yyyy', 'en'),
          Var4: element.PayTerm,
          Var5: element.supplierState,
          AcDocUniqId: '',
          AttachmentYN: 'N',
          AcDocN: '',
          AcDoc: '',
        };
        data.L2.push(l2);
      });
      const DynamicApiCall = await this.accService.gApiCallWithConfirm('reverse this Voucher ', data, this.globals.gApiserver, 'AccEntryS1');

      if (DynamicApiCall[0]?.StatusResponse === 'Success') {
        Swal.fire({ text: 'Voucher Reversed Successfully' });
        this.dialog.closeAll();
        this.Loading = true;
        this.ResetJV();
        setTimeout(() => {
          this.Loading = false;
          this.firstTime = true;
          this.ViewJv(this.JvView);
        }, 200);
        this.OnlyView = !this.OnlyView;
        this.AccTableData = [];
      }
    } else {
      this.commonService.openSnackbar('No data to reverse', 'Ok', 1500);
    }
  }

  async PrintJV(templateRef:TemplateRef<any>) {
    const api = {
      reqMainreq: 'SR_BrAddressLogo',
      Usr: this.globals.gUsrid,
      var1: this.globals.gBrcode,
    };
    const ArrConfirm = await this.accService.gApiCallOne(api, this.globals.gApiserver, 'datareqsarnEleven');
    if (ArrConfirm[0]?.StatusResponse === 'Success') {
      this.dialog.open(templateRef, {
        width: '1010px',
        maxHeight: '690px',
        disableClose: true,
        data: ArrConfirm[0],
        panelClass: 'gDialogBox',
      });
    }
  }

  async RejectJV(reason) {
    const api = {
      reqMainreq: 'SR_VoucherReject',
      Usr: this.globals.gUsrid,
      var1: this.ApprovalArr[0].VoucherNo,
      var2: this.ApprovalArr[0].tdate,
      var3: reason,
      var4: this.ApprovalArr[0].CmpCode,
      var5: this.ApprovalArr[0].FbCode,
      var7: this.JVApprovalForm.get('reverseEntry').value.VoucherId,
    };
    const ArrConfirm = await this.accService.gApiCallWithConfirm('reject this Voucher', api, this.globals.gApiserver, 'datareqsarnEleven');

    if (ArrConfirm[0]?.StatusResponse === 'Success') {
      Swal.fire({ text: 'Voucher Rejected Successfully' });
      this.dialog.closeAll();
      this.Loading = true;
      setTimeout(() => {
        this.Loading = false;
        this.BackClicked();
        this.ViewApprovalJV(this.JVApprovalForm);
      }, 200);
    }
  }

  selectApprovalStatus(event: any, type) {
    setTimeout(() => {
      if (this.viewJVForm.valid) {
        type === 'view' ? this.SubmitViewJv(this.viewJVForm) : this.ViewApprovalJV(this.JVApprovalForm);
      } else {
        document.getElementById('entrType')?.focus();
      }
    }, 100);
  }

  rejectSR(type, reason) {
    if (this.Reason.valid) {
      type === 'Reverse' ? this.ReverselJv(reason) : this.RejectJV(reason);
    } else {
      Swal.fire({ text: `Please enter ${type} Reason` });
    }
  }

  displayFb = (option: { FbName: any; }) => (option && option.FbName ? option.FbName : '');

  displayCmp= (option: { company: any; }) => (option && option.company ? option.company : '');

  displayFinYr= (option: { fyear: any; }) => (option && option.fyear ? option.fyear : '');

  displaySuplier = (option) => (option && option.SupName ? option.SupName : '');

  displayBr = (option) => (option && option.brname ? `${option.brcode} - ${option.brname}` : '');

  displayAc = (option) => (option && option.AcName ? `${option.AcCode} - ${option.AcName}` : '');


    XLExportBranchMapTable(tabledata) {
    if (tabledata.length > 0) {
      let arr = []
      tabledata.forEach((element, index) => {

        
        const obj = {
          SNo: index+1,
          WarehouseCode: element.WHCode.brcode,
          WarehouseName:  element.WHCode.brname,
          GLAccCode:  element.GLCode.AcCode,
          GLAccName:  element.GLCode.AcName,
          SupplierCode: element.SupName.supcode,
          SupplierName: element.SupName.SupName,
          SupplierAddress: element.supplierAddress,
          SupplierState: element.supplierState,
          InvoiceNo: element.InvNo,
          InvoiceAmount: element.InvAmt,
          InvoiceDate: this.datePipe.transform(element.InvDate,'dd-MMM-yyyy'),
          OutStandingAmount: element.OutstandingAmt,
          PayTerm: element.PayTerm,
          Narration: element.Narration,
        }
        arr.push(obj)

      }); 
      
      this.commonService.exportAsExcelFile(arr, 'OpeningBalance');
    } else {
    Swal.fire({text:'No data to export !'})
    }
  }

  rowClick(index : number) {
    this.selectedRowIndex = index;

    for (let i = 0; i < this.AccTableData.length; i++) {
      if (i === index) {
        this.classArrTable[i] = true;
      } else {
        this.classArrTable[i] = false;
      }
    }
  }



  editTableDate(data, index, type){
    if(type === 'edit'){
      this.editableRow = index
    }else{
      this.editableRow = null
    }

    this.rowClick(index)
    this.MapOption.setValue('Individual');
    this.ShowForm = true

    this.AccInfoForm.reset()
    this.AccInfoForm = this.fb.group({
      WHCode: [data.WHCode, Validators.required],
      GLCode: [data.GLCode, Validators.required],
      SupCode: [Number(data.SupName.supcode), Validators.required], 
      SupName: [data.SupName, Validators.required],
      supplierAddress: [data.supplierAddress, Validators.required],
      supplierState: [data.supplierState, Validators.required],
      InvNo: [data.InvNo, Validators.required],
      InvAmt: [data.InvAmt, Validators.required],
      OutstandingAmt: [data.OutstandingAmt, Validators.required],
      InvDate: [new Date(data.InvDate), Validators.required],
      PayTerm: [Number(data.PayTerm), Validators.required],
      Narration: [data.Narration, Validators.required],

    });
    this.getsupplierDetails(Number(data.SupName.supcode))
    
  }

  resetAcForm(){
    this.AccInfoForm.reset();
    this.AccInfoForm.get('InvDate').setValue(new Date())
    this.editableRow = null
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
    this.dialog.closeAll();
    this.accService.unsubscribe$.next();
    this.accService.unsubscribe$.complete();
  }
}
