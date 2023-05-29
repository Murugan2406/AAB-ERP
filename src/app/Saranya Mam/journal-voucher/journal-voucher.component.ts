/* eslint-disable consistent-return */
/* eslint-disable eqeqeq */
/* eslint-disable no-undef */
/* eslint-disable no-tabs */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable import/order */
/* eslint-disable no-unreachable */
/* eslint-disable no-useless-constructor */
/* eslint-disable no-empty-function */
/* eslint-disable no-extra-boolean-cast */
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
import Swal from 'sweetalert2';
import {
  FormControl, FormBuilder, FormGroup, Validators,
} from '@angular/forms';

import {
  Component,
  OnInit,
  QueryList,
  TemplateRef,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { SubSink } from 'subsink';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  trigger, transition, animate, style,
} from '@angular/animations';
import * as XLSX from 'xlsx';
import { DatePipe, formatDate } from '@angular/common';
import { CommonService } from '../../services/common.service';
import { Globals } from '../../globals';

import { Subject, fromEvent, retry } from 'rxjs';
import { Modal } from 'bootstrap';
import { AccServiceService } from 'src/app/services/acc-service.service';
import { AccountingInformationComponent } from 'src/app/commonComponents/accounting-information/accounting-information.component';
import { AccountPostingDialogComponent } from 'src/app/commonComponents/accountPostingDialog/accountPostingDialog.component';

type AOA = any[][];

@Component({
  selector: 'app-journal-voucher',
  templateUrl: './journal-voucher.component.html',
  styleUrls: ['./journal-voucher.component.scss'],
  animations: [
    trigger('enterAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('0ms', style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class JournalVoucherComponent implements OnInit {
  private subs = new SubSink();

  voucherInformation = true;

  CreditInformation = true;

  DebitInformation = true;

  viewSearch = '';

  viewSearch1 = '';

  OnlyView = false;

  voucherInformationForm: FormGroup;

  JvTypes: any[] = ['Regular JV', 'Memorandum JV', 'Tax Jv'];

  AccountTypeS: any[] = ['Debit', 'Credit'];

  receiptModes: any[] = [];

  datePipe: DatePipe;

  CreditTableArr = [];

  invalidAccArr = [];

  datnew = ['SNo', 'FinBookCode', 'FinBookName', 'CostCenterCode', 'CostCenterName', 'AcSelectionType', 'AccName_UssageName', 'AccCode_UssageCode', 'Amount', 'Remarks'];

  data = [];

  InvaliddisplayedColumns = ['SNo', 'FinBookCode', 'FinBookName', 'CostCenterCode', 'CostCenterName', 'AcSelectionType', 'AccName_UssageName', 'AccCode_UssageCode', 'Amount', 'Remarks']

  existingDataSource: any[];

  invalidbranchCodev: any[];

  InvalidText: string;

  BulkDataSource: any[];

  inputValue: string;

  DebitTableArr: any = [];

  ShowForm = false;

  ShowFormCr = true;

  viewJVForm: FormGroup;

  showFooter = false;

  filterValue = '';

  loading = false;

  DataSource:any = []

  FbThreeArr: any;

  AllFBList: any[] = [];

  AllBranchList: any = [];

  receiptStatus = ['ALL', 'FRESH', 'AUTHORIZED', 'REJECTED', 'DELETED'];

  receiptStatusApp = ['ALL', 'FRESH', 'APPROVED', 'REJECTED'];

  entryTypes: any;

  DebitAccArr: any = [];

  CreditAccArr: any = [];

  VoucherNo: any = '';

  VoucherName: string;

  @ViewChild('JvView') JvView: TemplateRef<any>;

  JVApprovalForm: FormGroup;

  ApprovalTableArr =[]

  JvAprFilterList: any[];

  GMenu: any = '';

  IsFresh: boolean = false;

  viewClicked: boolean = false;

  date = new Date();

  SectionTitle = 'Journal Voucher';

  AccountType = new FormControl('Debit', Validators.required);

  Reason = new FormControl('', Validators.required);

  attachments = new FormControl('');

  TrnType: any;

  TrnDate: any;

  Viewloading: boolean = false;

  approveLoad: boolean = false;

  showApproveJv: boolean = false;

  showNormalJv: boolean = false;

  showViewJv: boolean = false;

  ApprovalArr: any;

  showAccpost: boolean = false;

  @ViewChild('accountPostingDialog') accPost: TemplateRef<any>;

  title: boolean;

  trnsId: any;

  Authorized: any = '';

  AcTrnId: any;

  curStatusFresh: boolean = false;

  fetchLoading: boolean = false;

  totalDebitAmt: any = 0;

  totalCreditAmt: any = 0;

  WStatus = '';

  ReceiptStatus = '';

  trnDate: any;

  ActionMode: string = 'View';

  firstTime = true;

  latestViewRow: any = 0;

  latestApprovalRow: any = 0;

  ReverseGivenFlag: any = 'No';

  JVHistoryArr = [];

  @ViewChild('content') Content: any;

  canExist: boolean = true;

  showAppRejectButton: boolean = false;

  creditFileName = '';

  debitFileName = '';

  ReverseJv: boolean = false;

  filename: any ='';

  base64File: any = '';

  FileImage: any = '';

  Size: any = '';

  AttachedFilePath: any = '';

  DocId: any;

  attachmentAvailable: boolean;

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private commonService: CommonService,
    public snackbar: MatSnackBar,
    private global: Globals,
    private accService: AccServiceService,
    private router: Router,
  ) {
    this.accService.unsubscribe$= new Subject<void>();
    this.commonService.apiUrl = this.global.gApiserver;
  }

  toggleVoucherData() {
    this.voucherInformation = !this.voucherInformation;
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

  async ngOnInit() {
    this.datePipe = new DatePipe('en-IN');
    this.commonService.reqSendto = 'datareqsarnEleven';
    this.GMenu = this.global.gmainMenuSelected;
    if (this.GMenu === 'JVApprovel') {
      this.SectionTitle = 'Journal Voucher Approval';
      this.showNormalJv = false;
      this.showApproveJv = true;
      this.ShowForm = true;
      this.formIInitalization();
      this.shortcuts();
      this.getTrantype();

      this.AllFBList = await this.accService.getFinbook(this.global.gUsrDefultCmpCode, '');
      setTimeout(() => {
        this.ViewApprovalJV(this.JVApprovalForm);
      }, 300);
    } else if (this.GMenu === 'JVNormal') {
      this.showNormalJv = true;
      this.showApproveJv = false;
      this.ShowForm = true;
      this.formIInitalization();
      this.shortcuts();
      this.getTrantype();

      this.AllFBList = await this.accService.getFinbook(this.global.gUsrDefultCmpCode, '');
      setTimeout(() => {
        document.getElementById('narration')?.focus();
      }, 200);
    } else {
      this.router.navigateByUrl('/dashboard');
    }
  }

  formIInitalization() {
    this.voucherInformationForm = this.fb.group({
      JvType: ['Regular JV', Validators.required],
      narration: ['', Validators.required],
      accDate: [new Date(), Validators.required],
    });
    const fbObj = {
      FbCode: this.global.gUsrDefultFbCode,
      FbName: this.global.gUsrDefultFbName,
    };
    const BrObj = {
      brname: this.global.gBrname,
      brcode: this.global.gBrcode,
    };
    this.viewJVForm = this.fb.group({
      fromDate: [formatDate(new Date(this.date.getFullYear(), this.date.getMonth(), 1), 'yyyy-MM-dd', 'en'), Validators.required],
      toDate: [formatDate(new Date(), 'yyyy-MM-dd', 'en'), Validators.required],
      finBookName: [fbObj, Validators.required],
      costCenter: [BrObj, Validators.required],
      status: ['ALL', Validators.required],
      tranType: ['Journal Voucher', Validators.required],
    });
    this.JVApprovalForm = this.fb.group({
      companyName: [this.global.gUsrDefultCmpName, Validators.required],
      finBookName: [fbObj, Validators.required],
      status: ['ALL', Validators.required],
      fromDate: formatDate(new Date(this.date.getFullYear(), this.date.getMonth(), 1), 'yyyy-MM-dd', 'en'),
      toDate: formatDate(new Date(), 'yyyy-MM-dd', 'en'),
      reverseEntry: '',
    });
  }

  @ViewChildren(AccountingInformationComponent)
  childGames: QueryList<AccountingInformationComponent>

  accFormSubmit(debitForm) {
    if (this.voucherInformationForm.valid) {
      if (this.AccountType.valid) {
        this.AccountType.value === 'Debit' ? this.debitForm1(debitForm) : this.CreditForm(debitForm);
        this.childGames.forEach((c) => c.reset());
        this.filename = '';
        this.attachments.setValue('');
        this.base64File = '';
        document.getElementById('AccountType')?.focus();
      } else {
        this.commonService.openSnackbar('Please Fill Transaction Type.', 'Ok', 2500);
      }
    } else {
      this.commonService.openSnackbar('Please fill all fields in Voucher Information.', 'Ok', 2500);
      document.getElementById('narration')?.focus();
    }
  }

  debitForm1(debitForm) {
    const formValue = debitForm.value;
    if (this.DebitTableArr.length > 0) {
      const CostCenter = debitForm.get('costCenter').value.brname;
      let ExistArr;
      if (formValue.accountType === 'Account Code') {
        const accCode = debitForm.get('AccName_UssageName').value.accCode;
        ExistArr = this.DebitTableArr.some(
          (e) => e.AccCode_UssageCode === accCode && e.costCenter === CostCenter,
        );
        if (ExistArr) {
          this.commonService.openSnackbar('Same record already exist', 'Ok', 2500);
          return;
        }
      } else {
        const accCode = debitForm.get('AccName_UssageName').value.UsageIdCode;
        ExistArr = this.DebitTableArr.some(
          (e) => e.AccCode_UssageCode === accCode && e.costCenter === CostCenter,
        );
        if (ExistArr) {
          this.commonService.openSnackbar('Same record already exist', 'Ok', 2500);
          return;
        }
      }
    }
    let accCode = '';
    if (formValue.accountType === 'Account Code') {
      accCode = debitForm.get('AccName_UssageName').value.accCode;
    } else {
      accCode = debitForm.get('AccName_UssageName').value.UsageIdCode;
    }
    const ExistArr1 = this.CreditTableArr.some(
      (e) => e.AccCode_UssageCode === accCode,
    );
    if (ExistArr1) {
      Swal.fire({ text: 'Same record already exist in credit table' });
      // document.getElementById('debitaccname')?.focus();
      return;
    }
    this.DebitTableArr.push({
      AcSelectionType: formValue.accountType,
      AccCode_UssageCode: formValue.AccName_UssageName.accCode ?? formValue.AccName_UssageName.UsageIdCode,
      AccName_UssageName: formValue.AccName_UssageName.AcCodeName ?? formValue.AccName_UssageName.UsageCodeName,
      Amount: parseFloat(formValue.Amount).toFixed(2),
      remarks: formValue.remarks,
      FinBookName: formValue.FinBookName.FbName,
      FinBookCode: formValue.FinBookName.FbCode,
      costCenter: formValue.costCenter.brname,
      CostCenterCode: formValue.costCenter.brcode,
      fileName: this.filename,
      base64file: this.base64File,
    });
  }

  CreditForm(creditForm) {
    const formValue = creditForm.value;
    if (this.CreditTableArr.length > 0) {
      const CostCenter = creditForm.get('costCenter').value.brname;
      let ExistArr;
      if (formValue.accountType === 'Account Code') {
        const accCode = creditForm.get('AccName_UssageName').value.accCode;
        ExistArr = this.CreditTableArr.some(
          (e) => e.AccCode_UssageCode === accCode && e.costCenter === CostCenter,
        );
        if (ExistArr) {
          this.commonService.openSnackbar('Same record already exist', 'Ok', 2500);
          return;
        }
      } else {
        const accCode = creditForm.get('AccName_UssageName').value.UsageIdCode;
        ExistArr = this.CreditTableArr.some(
          (e) => e.AccCode_UssageCode === accCode && e.costCenter === CostCenter,
        );
        if (ExistArr) {
          this.commonService.openSnackbar('Same record already exist', 'Ok', 2500);
          return;
        }
      }
    }
    let accCode = '';
    if (formValue.accountType === 'Account Code') {
      accCode = creditForm.get('AccName_UssageName').value.accCode;
    } else {
      accCode = creditForm.get('AccName_UssageName').value.UsageIdCode;
    }
    const ExistArr1 = this.DebitTableArr.some(
      (e) => e.AccCode_UssageCode === accCode,
    );
    if (ExistArr1) {
      Swal.fire({ text: 'Same record already exist in debit table' });
      // document.getElementById('debitaccname')?.focus();
      return;
    }

    this.CreditTableArr.push({
      AcSelectionType: formValue.accountType,
      AccCode_UssageCode: formValue.AccName_UssageName.accCode ?? formValue.AccName_UssageName.UsageIdCode,
      AccName_UssageName: formValue.AccName_UssageName.AcCodeName ?? formValue.AccName_UssageName.UsageCodeName,
      Amount: parseFloat(formValue.Amount).toFixed(2),
      remarks: formValue.remarks,
      FinBookName: formValue.FinBookName.FbName,
      FinBookCode: formValue.FinBookName.FbCode,
      costCenter: formValue.costCenter.brname,
      CostCenterCode: formValue.costCenter.brcode,
      fileName: this.filename,
      base64file: this.base64File,

    });
  }

  getDebitTotalAmount() {
    let TotalAmt = 0;
    for (let i = 0; i < this.DebitTableArr.length; i++) {
      if (this.DebitTableArr[i].Amount ?? this.DebitTableArr[i].TrnAmt) {
        TotalAmt += Number(this.DebitTableArr[i].Amount ?? this.DebitTableArr[i].TrnAmt);
      }
    }

    this.totalDebitAmt = TotalAmt.toFixed(2);
    return TotalAmt.toFixed(2);
  }

  DebitBulk(Template: TemplateRef<any>, data) {
    this.BulkDataSource = [];
    this.InvalidText = '';

    this.BulkDataSource = [{
      SNo: '1',
      FinBookCode: 'TNFB',
      FinBookName: 'TAMILNADU FB',
      CostCenterCode: '1',
      CostCenterName: 'ADYAR SHOP',
      AcSelectionType: 'Account Code',
      AccName_UssageName: '108012',
      AccCode_UssageCode: '	AAB Bakery',
      Amount: '100',
      Remarks: 'test',
    },
    {
      SNo: '1',
      FinBookCode: 'TNFB',
      FinBookName: 'TAMILNADU FB',
      CostCenterCode: '1',
      CostCenterName: 'ADYAR SHOP',
      AcSelectionType: 'Ussage Ids',
      AccName_UssageName: 'AAB SWEET & SNACK_0',
      AccCode_UssageCode: 'ADYAR ANANDA BHAVAN SWEETS & SNACKS',
      Amount: '100',
      Remarks: 'test',
    }];

    this.dialog.open(Template, {
      minWidth: '95vw', maxHeight: '99vh', disableClose: true, autoFocus: false, data, panelClass: 'gDialogBox',
    });
  }

  browsebutton() {
    document.getElementById('import').click();
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
    this.fetchLoading = true;
    setTimeout(() => {
      this.AccvalidationCheck(type, filName);
    }, 200);
  }

  AccvalidationCheck(type, filName) {
    this.existingDataSource = [...this.DebitTableArr];
    const tableJson = [];
    const sample = {};
    this.invalidbranchCodev = [];
    let counter = 1;
    this.data.forEach((element, index) => {
      if (element.FinBookCode && element.FinBookName && element.CostCenterCode && element.CostCenterName && element.AccName_UssageName
        && element.AccCode_UssageCode && element.Amount && element.Remarks) {
        const ExistArr = this.DebitTableArr.some(
          (e) => e.AccCode_UssageCode == element.AccCode_UssageCode,
        );
        const ExistArr1 = this.CreditTableArr.some(
          (e) => e.AccCode_UssageCode == element.AccCode_UssageCode,
        );
        if (!ExistArr && !ExistArr1) {
          tableJson.push(element);
        } else {
          this.invalidbranchCodev.push(element);
        }
      } else {
        counter += 1;
        this.invalidbranchCodev.push(element);
      }
    });

    const accCode = '';
    // if (formValue.accountType === 'Account Code') {
    //   accCode = creditForm.get('AccName_UssageName').value.accCode;
    // } else {
    //   accCode = creditForm.get('AccName_UssageName').value.UsageIdCode;
    // }
    const ExistArr1 = this.DebitTableArr.some(
      (e) => e.AccCode_UssageCode === accCode,
    );
    if (ExistArr1) {
      Swal.fire({ text: 'Same record already exist in debit table' });
      return;
    }
    if (counter !== 1) {
      this.commonService.openSnackbar(`${counter - 1} Empty row(s) are removed`, 'Ok', 1500);
    }
    if (this.invalidbranchCodev.length > 0) {
      this.InvalidText = 'The following row(s) has invalid content / already exist, please check the file';
      this.BulkDataSource = this.invalidbranchCodev;
      this.fetchLoading = false;
      if (type === 'debit') {
        this.debitFileName = '';
      } else {
        this.creditFileName = '';
      }
      return;
    }
    this.inputValue = '';
    if (tableJson.length > 0) {
      this.InvalidText = '';
      this.dialog.closeAll();
      if (type === 'debit') {
        this.DebitTableArr = tableJson;
        this.debitFileName = filName;
      } else {
        this.CreditTableArr = tableJson;
        this.creditFileName = filName;
      }
      this.commonService.openSnackbar('data(s) fetched to table', 'Ok', 1500);

      this.inputValue = '';
      this.ShowForm = false;
    }
    this.fetchLoading = false;
  }

  previewclick(type) {
    const arrayOfArray = [
      {
        SNo: '',
        FinBookCode: '',
        FinBookName: '',
        CostCenterCode: '',
        CostCenterName: '',
        AcSelectionType: '',
        AccName_UssageName: '',
        AccCode_UssageCode: '',
        Amount: '',
        Remarks: '',
      },
    ];
    this.commonService.exportAsExcelFile(arrayOfArray, `${type}_AccDetails`);
  }

  getCreditTotalAmount() {
    let TotalAmt = 0;
    for (let i = 0; i < this.CreditTableArr.length; i++) {
      if (this.CreditTableArr[i].Amount ?? this.CreditTableArr[i].TrnAmt) {
        TotalAmt += Number(this.CreditTableArr[i].Amount ?? this.CreditTableArr[i].TrnAmt);
      }
    }
    this.totalCreditAmt = TotalAmt.toFixed(2);
    return TotalAmt.toFixed(2);
  }

  deleteAccountingData = (index, type) => {
    this.commonService.taskConfirmation('Are you sure to remove ?', '', true, 'Remove', '').then((res) => {
      if (res.isConfirmed) {
        type === 'Credit' ? this.CreditTableArr.splice(index, 1) : this.DebitTableArr.splice(index, 1);
      }
    });
  }

  clearTable = (type) => { type === 'Credit' ? this.CreditTableArr = [] : this.DebitTableArr = []; }

  async SaveJv(action) {
    if (this.voucherInformationForm.invalid) {
      this.commonService.openSnackbar('Please fill all Voucher Information', 'Ok', 1500);
      return;
    }
    if (this.DebitTableArr.length > 0 || this.CreditTableArr.length > 0) {
      if (this.totalCreditAmt !== this.totalDebitAmt) {
        Swal.fire({ text: 'Debit & Credit total must be equal' });
        return;
      }
      let VoucherNo = '';
      let EntryDate = '';
      if (this.ActionMode === 'Edit') {
        VoucherNo = this.VoucherNo;
        EntryDate = this.trnDate;
      } else {
        VoucherNo = '';
        EntryDate = '';
      }
      const ReqJson = {
        reqMainreq: 'S@/JVoucher/E@',
        Usr: this.global.gUsrid,
        ReceiptRoute: '',
        ReceiptMode: '',
        ReceivedFrm: '',
        VoucherType: this.voucherInformationForm.value.JvType,
        InstrumentRecNo: '',
        InstDate: '',
        InstBankCode: '',
        InstBankName: '',
        AcDate: this.datePipe.transform(this.voucherInformationForm.value.accDate, 'dd-MMM-yyyy'),
        Narration: this.voucherInformationForm.value.narration,
        BankOrCashCode: '',
        VoucherAmt: this.totalCreditAmt,
        InstAmt: '0',
        Currency: 'INR',
        DivId: '',
        SubDivId: '',
        AnalysisCode: '',
        SubAnalysisCode: '',
        MICRno: '',
        DeviceUniId: '',
        VersionNo: '',
        VoucherNo,
        ActrnId: '',
        RevReason: '',
        EntryDate,
        ExtraVar1: '',
        ExtraVar2: '',
        ExtraVar3: '',
        ExtraVar4: '',
        ExtraVar5: '',
        ExtraVar6: '',
        ExtraVar7: '',
        ExtraVar8: '',
        ExtraVar9: '',
        ExtraVar10: '',
        L1: [],
        L2: [],

      };
      const NewDebitArr = [];
      if (this.DebitTableArr.length > 0) {
        this.DebitTableArr.forEach((element, index) => {
          let AttachmentYN = 'N';
          if (element.fileName !== '') {
            AttachmentYN = 'Y';
          } else {
            AttachmentYN = 'N';
          }

          const AccObj = {
            DrCr: 'Dr',
            Ssno: index + 1,
            CmpCode: this.global.gUsrDefultCmpCode,
            FbCode: element.FinBookCode ?? element.FbCode,
            BrCode: element.CostCenterCode ?? element.BrCode,
            AcSelectionType: element.AcSelectionType,
            AcUsCode: element.AccCode_UssageCode ?? element.AcUsCode,
            GstAmt: '0',
            BaseAmt: '0',
            TrnAmt: element.Amount ?? element.TrnAmt,
            Remarks: element.remarks ?? element.Remarks,
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
            AcDocN: element.fileName,
            AcDoc: element.base64file,
          };

          NewDebitArr.push(AccObj);
        });
      }
      const NewCreditArr = [];
      if (this.CreditTableArr.length > 0) {
        this.CreditTableArr.forEach((element, index) => {
          let AttachmentYN = 'N';
          if (element.fileName !== '') {
            AttachmentYN = 'Y';
          } else {
            AttachmentYN = 'N';
          }

          const AccObj = {
            DrCr: 'Cr',
            Ssno: index + 1,
            CmpCode: this.global.gUsrDefultCmpCode,
            FbCode: element.FinBookCode ?? element.FbCode,
            BrCode: element.CostCenterCode ?? element.BrCode,
            AcSelectionType: element.AcSelectionType,
            AcUsCode: element.AccCode_UssageCode ?? element.AcUsCode,
            GstAmt: '0',
            BaseAmt: '0',
            TrnAmt: element.Amount ?? element.TrnAmt,
            Remarks: element.remarks ?? element.Remarks,
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
            AcDocN: element.fileName,
            AcDoc: element.base64file,
          };

          NewCreditArr.push(AccObj);
        });
      }

      // =====================

      ReqJson.L1 = NewDebitArr;
      ReqJson.L2 = NewCreditArr;

      const DynamicApiCall = await this.accService.gApiCallWithConfirm(action, ReqJson, this.global.gApiserver, 'AccEntryS1');
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

        // this.OnlyView = !this.OnlyView;
        this.DebitTableArr = [];
        this.CreditTableArr = [];
        this.VoucherName = '';
        this.WStatus = '';
        this.ReceiptStatus = '';

        this.voucherInformationForm = this.fb.group({
          JvType: ['Regular JV', Validators.required],
          narration: ['', Validators.required],
          accDate: [new Date(), Validators.required],
        });
      }
    } else {
      this.commonService.openSnackbar('No data to Save', 'Ok', 1500);
    }
  }

  selectTranType(event, type) {
    setTimeout(() => {
      if (this.viewJVForm.valid) {
        type === 'view' ? this.SubmitViewJv(this.viewJVForm) : this.ViewApprovalJV(this.JVApprovalForm);
      } else {
        document.getElementById('button').focus();
      }
    }, 100);
  }

  SubmitViewJv(viewForm) {
    this.commonService.reqSendto = 'datareqsarnEleven';
    if (viewForm.valid) {
      if (this.commonService.checkTypeValitity(this.viewJVForm.get('finBookName').value, 'Finbook')
       && this.commonService.checkTypeValitity(this.viewJVForm.get('costCenter').value, 'Cost center')) {
        this.Viewloading = true;
        const api = {
          reqMainreq: 'SR_EntryView',
          Usr: this.global.gUsrid,
          brcode: this.global.gBrcode,
          var1: formatDate(viewForm.get('fromDate').value, 'dd-MMM-yyyy', 'en'),
          var2: formatDate(viewForm.get('toDate').value, 'dd-MMM-yyyy', 'en'),
          var3: '',
          var4: '',
          var5: viewForm.value.costCenter.brcode,
          var6: this.global.gUsrDefultCmpCode,
          var7: viewForm.get('finBookName').value.FbCode,
          var8: viewForm.get('status').value,
          var9: this.viewJVForm.get('tranType')?.value.VoucherId,
        };
        this.DataSource = [];
        this.commonService.reqSendto = 'datareqsarnEleven';
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

  ViewJv(ViewTemplate:TemplateRef<any>) {
    this.showNormalJv = false;
    this.showViewJv = true;
    this.showApproveJv = false;
    this.SectionTitle = 'View Journal Voucher';
    // this.dialog.open(ViewTemplate, {
    //   maxWidth: '98vw', width: '90vw', maxHeight: '99vh', disableClose: true, autoFocus: false, panelClass: 'gDialogBox',
    // });
    setTimeout(() => {
      const tbody = document.getElementById('viewTable').querySelectorAll('tr');
      tbody[this.latestViewRow]?.focus();
    }, 100);
    if (this.firstTime) {
      setTimeout(() => {
        this.SubmitViewJv(this.viewJVForm);
      }, 200);
      this.firstTime = false;
    } else {
    }
  }

  FilterFinbook(keyValue, tabIndex) {
    const key = keyValue.toLocaleUpperCase();
    if (tabIndex === 'three') {
      this.FbThreeArr = this.AllFBList.filter((option) => option.FbName.toLocaleUpperCase().includes(key));
    } else {
      this.JvAprFilterList = this.AllFBList.filter((option) => option.FbName.toLocaleUpperCase().includes(key));
    }
  }

  viewFbchange(event, type) {
    if (event.source.selected) {
      setTimeout(() => {
        if (type === 'view') {
          this.AllBranchList = [];
          this.viewJVForm.get('costCenter').setValue('');
          document.getElementById('viewCostCenter').focus();
        } else {
          this.JVApprovalForm.valid ? this.ViewApprovalJV(this.JVApprovalForm) : document.getElementById('approvalFromDate').focus();
        }
      }, 100);
    }
  }

  onfromDateSelect(_event: any) {
    if (_event.key === 'Enter' || _event.key === 'Tab') {
      setTimeout(() => {
        document.getElementById('toDate')?.focus();
      });
    }
  }

  onToDateSelect(_event: any) {
    if (_event.key === 'Enter' || _event.key === 'Tab') {
      setTimeout(() => {
        document.getElementById('status')?.focus();
      });
    }
  }

  selectApprovalStatus(event: any, type) {
    setTimeout(() => {
      if (this.viewJVForm.valid) {
        type === 'view' ? this.SubmitViewJv(this.viewJVForm) : this.ViewApprovalJV(this.JVApprovalForm);
      } else {
        document.getElementById('entrType').focus();
      }
    }, 100);
  }

  viewBrchange(event, Finbook) {
    if (event.source.selected) {
      this.AllBranchList = [];
      setTimeout(() => {
        this.viewJVForm.valid ? this.SubmitViewJv(this.viewJVForm) : document.getElementById('fromDate').focus();
      }, 100);
    }
  }

  async getViewBranchName(keyValue) {
    const FBCode = this.viewJVForm.get('finBookName').value.FbCode;
    const api = {
      reqMainreq: 'SR_brSearchRPT',
      Usr: this.global.gUsrid,
      brcode: this.global.gBrcode,
      var1: keyValue,
      var2: this.global.gUsrDefultCmpCode,
      var3: FBCode,
    };
    this.AllBranchList = await this.accService.gApiCallOne(api, this.global.gApiserver, 'datareqsarnEleven');
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

  FocusNext(event, id) {
    if (event.source.selected) {
      setTimeout(() => {
        document.getElementById(id).focus();
      }, 100);
    }
  }

  displayFb3 = (option) => (option && option.FbName ? option.FbName : '');

  displayBr = (option) => (option && option.brname ? option.brname : '');

  ngOnDestroy() {
    this.subs.unsubscribe();
    this.dialog.closeAll();
    this.accService.unsubscribe$.next();
    this.accService.unsubscribe$.complete();
  }

  toggleForm() {
    this.ShowForm = !this.ShowForm;
  }

  toggleFormCr() {
    this.ShowFormCr = !this.ShowFormCr;
  }

  getTrantype() {
    const api = {
      reqMainreq: 'VoucherList',
      Usr: this.global.gUsrid,
      brcode: this.global.gBrcode,
      var1: '',
      var2: 'JVoucher',
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

  async settableData(response, tabledata) {
    await response.forEach(async (element) => {
      element.DrCr === 'Dr' ? this.DebitTableArr.push(element) : this.CreditTableArr.push(element);
      if (element.AttachmentYN == 'Y') {
        this.attachmentAvailable = true;
        // this.DocId = element.AcDocUniqId;
        this.getAttachements(element, element.AcDocUniqId);
      } else {
        this.AttachedFilePath = response[0].AttachmentFile;
        this.base64File = this.AttachedFilePath;
        this.attachmentAvailable = false;
        Object.assign(element, { fileName: '' });
        Object.assign(element, { base64file: '' });
      }
    });
  }

  getAttachements(element, DocId) {
    const api = {
      reqMainreq: 'SR_AttachedFileView',
      Usr: this.global.gUsrid,
      brcode: this.global.gBrcode,
      var1: this.VoucherNo,
      var2: this.TrnType,
      var4: DocId,
    };
    this.commonService.reqSendto = 'datareqsarnEleven';
    this.subs.add(
      this.commonService.sendReqst(api).subscribe({
        next: (response):any => {
          if (response.length > 0) {
            if (response[0].StatusResponse === 'Success') {
              this.AttachedFilePath = response[0].AttachmentFile;
              Object.assign(element, { fileName: response[0].DocName });
              Object.assign(element, { base64file: response[0].AttachmentFile });
              // this.filename = response[0].DocName;
              // this.base64File = this.AttachedFilePath;
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
        complete: () => '',
      }),
    );
  }

  JVDetails(tabledata: any, flag: any, rowIndex) {
    const api = {
      reqMainreq: 'JV_DetailsView',
      Usr: this.global.gUsrid,
      brcode: this.global.gBrcode,
      var1: tabledata.VoucherNo,
      var2: formatDate(tabledata.tdate, 'dd-MMM-yyyy', 'en'),
      var5: this.viewJVForm.get('tranType').value.VoucherId,
    };
    this.fetchLoading = true;
    this.DebitTableArr = [];
    this.CreditTableArr = [];
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

              this.showNormalJv = true;
              this.showViewJv = false;
              this.showApproveJv = false;
              this.fetchLoading = false;
              this.canExist = false;

              this.VoucherName = `Journal No: ${response[0].VoucherNo}`;
              this.VoucherNo = response[0].VoucherNo;
              this.settableData(response, tabledata);
              this.TrnDate = response[0].tdate;
              this.Authorized = response[0].TrnStatus;
              this.AcTrnId = response[0].AcTrnId;
              this.voucherInformationForm.get('JvType').setValue(response[0].VoucherType);
              this.voucherInformationForm.get('narration').setValue(response[0].Narration);
              this.voucherInformationForm.get('accDate').setValue(formatDate(response[0].AcDate, 'yyyy-MM-dd', 'en'));
              this.ApprovalArr = response;
              this.ReverseGivenFlag = response[0].ReverseGiven;
              tabledata.WStatus === 'FRESH' ? this.IsFresh = true : this.IsFresh = false;
              const TrnValue = this.viewJVForm.get('tranType').value.VoucherType;
              if (TrnValue === 'Journal Voucher Reversal') {
                this.ReverseJv = true;
                if (flag === 'JVView' || flag === 'JVEdit') {
                  // this.voucherInformationForm.disable();
                  // this.OnlyView = true;
                  if (!this.IsFresh) {
                    this.voucherInformationForm.disable();
                    this.OnlyView = true;
                  } else {
                    this.voucherInformationForm.enable();
                    this.ShowForm = false;
                    this.OnlyView = false;
                  }
                  this.trnDate = tabledata.tdate;
                  this.ActionMode = 'Edit';
                } else if (flag === 'JvReEntry') {
                  this.voucherInformationForm.enable();
                  this.OnlyView = false;
                  this.trnDate = tabledata.tdate;
                  this.ActionMode = 'ReUse';
                  this.ShowForm = false;
                }
              } else if (TrnValue === 'Journal Voucher') {
                this.ReverseJv = false;
                if (flag === 'JVView' || flag === 'JVEdit') {
                  if (!this.IsFresh) {
                    this.voucherInformationForm.disable();
                    this.OnlyView = true;
                  } else {
                    this.voucherInformationForm.enable();
                    this.ShowForm = false;
                    this.OnlyView = false;
                  }

                  this.trnDate = tabledata.tdate;
                  this.ActionMode = 'Edit';
                } else if (flag === 'JvReEntry') {
                  this.voucherInformationForm.enable();
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
          this.fetchLoading = false;
        },
        error: (error) => {
          this.fetchLoading = false;
          Swal.fire({ text: error.message ?? 'Http failure response' });
        },
        complete: () => {},
      }),
    );
    // this.SRDelete = true;
  }

  async JVHistory(tabledata) {
    const ReqJson = {
      reqMainreq: 'WorkFlowAprovalUsr',
      Usr: this.global.gUsrid,
      brcode: this.global.gBrcode,
      var1: formatDate(tabledata.tdate, 'dd-MMM-yyyy', 'en'),
      var2: this.global.gUsrDefultCmpCode,
      var3: this.viewJVForm.get('finBookName').value.FbCode,
      var4: this.viewJVForm.get('tranType').value.VoucherId,
      var5: tabledata.VoucherNo,
    };
    this.fetchLoading = true;
    this.JVHistoryArr = [];
    const ArrConfirm = await this.accService.gApiCallOne(ReqJson, this.global.gApiserver, 'datareqsarnSix');
    this.fetchLoading = false;
    if (ArrConfirm[0]?.StatusResponse === 'Success') {
      this.JVHistoryArr = ArrConfirm;
      const element = document.getElementById('reqStatusVendorModal') as HTMLElement;
      const myModal = new Modal(element);
      myModal.show();
    } else {
      this.commonService.openSnackbar('No record found', 'Ok', 1500);
    }
  }

  async DeleteJv() {
    const ReqJson = {
      reqMainreq: 'JV_DeleteEntry',
      Usr: this.global.gUsrid,
      var1: this.VoucherNo,
      var2: this.TrnDate,
      var5: this.TrnType,
    };
    const ArrConfirm = await this.accService.gApiCallWithConfirm('delete', ReqJson, this.global.gApiserver, 'datareqsarnEleven');
    this.voucherInformationForm.enable();
    this.VoucherName = '';
    this.WStatus = '';
    this.ReceiptStatus = '';
    if (ArrConfirm[0]?.StatusResponse === 'Success') {
      Swal.fire({ text: 'Journal deleted successfully' });
      this.fetchLoading = true;
      this.ResetJV();
      setTimeout(() => {
        this.fetchLoading = false;
        this.firstTime = true;
        this.ViewJv(this.JvView);
      }, 200);
      this.OnlyView = !this.OnlyView;
      this.DebitTableArr = [];
      this.CreditTableArr = [];
    }
  }

  async ViewApprovalJV(ApprovalviewForm) {
    this.commonService.reqSendto = 'datareqsarnEleven';

    if (ApprovalviewForm.valid) {
      if (this.commonService.checkTypeValitity(this.JVApprovalForm.get('finBookName').value, 'Finbook Name')) {
        this.Viewloading = true;
        const api = {
          reqMainreq: 'SR_getApprovalView',
          Usr: this.global.gUsrid,
          brcode: this.global.gBrcode,
          var1: formatDate(ApprovalviewForm.get('fromDate').value, 'dd-MMM-yyyy', 'en'),
          var2: formatDate(ApprovalviewForm.get('toDate').value, 'dd-MMM-yyyy', 'en'),
          var3: this.global.gUsrDefultCmpCode,
          var4: ApprovalviewForm.value.finBookName.FbCode,
          var5: ApprovalviewForm.get('status').value,
          var7: ApprovalviewForm.get('reverseEntry').value.VoucherId ?? 'JVoucher',
        };
        this.ApprovalTableArr = [];
        this.approveLoad = true;
        const ArrConfirm = await this.accService.gApiCallOne(api, this.global.gApiserver, 'datareqsarnEleven');
        this.approveLoad = false;
        ArrConfirm[0]?.StatusResponse === 'Success' ? this.ApprovalTableArr = ArrConfirm : this.ApprovalTableArr = [];
      }
    } else {
      this.commonService.openSnackbar('Fill Required inputs', 'Ok', 1500);
    }
  }

  async approvalJVDetails(row, index) {
    const api = {
      reqMainreq: 'JV_getApprovalDetailsView',
      Usr: this.global.gUsrid,
      var1: row.Trnid,
      var2: row.Date,
      var4: row.CmpCode,
      var5: row.FbCode,
      var7: this.JVApprovalForm.get('reverseEntry').value.VoucherId,
    };
    this.latestApprovalRow = index + 1;
    this.fetchLoading = true;
    const ArrConfirm = await this.accService.gApiCallOne(api, this.global.gApiserver, 'datareqsarnEleven');
    if (ArrConfirm[0]?.StatusResponse === 'Success') {
      this.ApprovalArr = ArrConfirm;
      this.DebitTableArr = [];
      this.CreditTableArr = [];
      // ArrConfirm.forEach((element) => {
      //   element.DrCr === 'Dr' ? this.DebitTableArr.push(element) : this.CreditTableArr.push(element);
      // });
      this.TrnType = this.JVApprovalForm.get('reverseEntry').value.VoucherId;
      this.VoucherNo = row.Trnid;
      this.settableData(ArrConfirm, row);
      this.showNormalJv = true;
      this.showApproveJv = false;

      this.Authorized = row.TrnStatus;
      this.VoucherName = `Journal No: ${row.Trnid}`;
      this.WStatus = `WStatus: ${row.WStatus}`;
      this.ReceiptStatus = `DC Status: ${row.VStatus}`;
      row.CurStatus === 'FRESH' ? this.curStatusFresh = true : this.curStatusFresh = false;
      ArrConfirm[0].TrnStatus === 'FRESH' ? this.showAccpost = true : this.showAccpost = false;
      this.loading = false;
      ArrConfirm[0].ApproveOnly === 'N' ? this.showAppRejectButton = false : this.showAppRejectButton = true;
      this.voucherInformationForm.get('JvType').setValue(ArrConfirm[0].VoucherType);
      this.voucherInformationForm.get('narration').setValue(ArrConfirm[0].Narration);
      this.voucherInformationForm.get('accDate').setValue(formatDate(ArrConfirm[0].AcDate, 'yyyy-MM-dd', 'en'));
      this.voucherInformationForm.disable();
      this.OnlyView = true;
      this.fetchLoading = false;
    }
    this.fetchLoading = false;
  }

  async RejectJV(reason) {
    const api = {
      reqMainreq: 'SR_VoucherReject',
      Usr: this.global.gUsrid,
      var1: this.ApprovalArr[0].VoucherNo,
      var2: this.ApprovalArr[0].tdate,
      var3: reason,
      var4: this.ApprovalArr[0].CmpCode,
      var5: this.ApprovalArr[0].FbCode,
      var7: this.JVApprovalForm.get('reverseEntry').value.VoucherId,
    };
    const ArrConfirm = await this.accService.gApiCallWithConfirm('reject this JV', api, this.global.gApiserver, 'datareqsarnEleven');

    if (ArrConfirm[0]?.StatusResponse === 'Success') {
      this.commonService.openSnackbar('Journal Rejected Successfully', 'Ok', 1500);
      this.dialog.closeAll();
      this.fetchLoading = true;
      setTimeout(() => {
        this.fetchLoading = false;
        this.BackClicked();
        this.ViewApprovalJV(this.JVApprovalForm);
      }, 200);
    }
  }

  async ApproveJV() {
    const api = {
      reqMainreq: 'SR_VoucherApproval',
      Usr: this.global.gUsrid,
      var1: this.ApprovalArr[0].VoucherNo,
      var2: this.ApprovalArr[0].tdate,
      var4: this.ApprovalArr[0].CmpCode,
      var5: this.ApprovalArr[0].FbCode,
      var7: this.JVApprovalForm.get('reverseEntry').value.VoucherId,
    };
    const ArrConfirm = await this.accService.gApiCallWithConfirm('approve this JV', api, this.global.gApiserver, 'datareqsarnEleven');
    if (ArrConfirm[0]?.StatusResponse === 'Success') {
      this.commonService.openSnackbar('Journal Approved Successfully', 'Ok', 1500);
      this.fetchLoading = true;
      setTimeout(() => {
        this.fetchLoading = false;
        this.BackClicked();
        this.ViewApprovalJV(this.JVApprovalForm);
      }, 200);
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

  rejectSR(type, reason) {
    if (this.Reason.valid) {
      type === 'Reverse' ? this.ReverselJv(reason) : this.RejectJV(reason);
    } else {
      this.commonService.openSnackbar(`Please enter ${type} Reason`, 'Ok', 1500);
    }
  }

  async ReverselJv(reason) {
    if (this.DebitTableArr.length > 0 || this.CreditTableArr.length > 0) {
      const ReqJson = {
        reqMainreq: 'S@/JVoucher_Rev/E@',
        Usr: this.global.gUsrid,
        ReceiptRoute: '',
        ReceiptMode: '',
        ReceivedFrm: '',
        VoucherType: this.voucherInformationForm.value.JvType,
        InstrumentRecNo: '',
        InstDate: '',
        InstBankCode: '',
        InstBankName: '',
        AcDate: this.datePipe.transform(this.voucherInformationForm.value.accDate, 'dd-MMM-yyyy'),
        Narration: this.voucherInformationForm.value.narration,
        BankOrCashCode: '',
        VoucherAmt: this.totalCreditAmt,
        InstAmt: '0',
        Currency: 'INR',
        DivId: '',
        SubDivId: '',
        AnalysisCode: '',
        SubAnalysisCode: '',
        MICRno: '',
        DeviceUniId: '',
        VersionNo: '',
        VoucherNo: this.VoucherNo,
        ActrnId: this.AcTrnId,
        RevReason: reason,
        EntryDate: this.trnDate,
        ExtraVar1: '',
        ExtraVar2: '',
        ExtraVar3: '',
        ExtraVar4: '',
        ExtraVar5: '',
        ExtraVar6: '',
        ExtraVar7: '',
        ExtraVar8: '',
        ExtraVar9: '',
        ExtraVar10: '',
        L1: [],
        L2: [],

      };
      const NewDebitArr = [];
      if (this.DebitTableArr.length > 0) {
        this.DebitTableArr.forEach((element, index) => {
          let AttachmentYN = 'N';
          if (element.fileName !== '') {
            AttachmentYN = 'Y';
          } else {
            AttachmentYN = 'N';
          }
          const AccObj = {
            DrCr: 'Dr',
            Ssno: index + 1,
            CmpCode: this.global.gUsrDefultCmpCode,
            FbCode: element.FinBookCode ?? element.FbCode,
            BrCode: element.CostCenterCode ?? element.BrCode,
            AcSelectionType: element.AcSelectionType,
            AcUsCode: element.AccCode_UssageCode ?? element.AcUsCode,
            TrnAmt: element.Amount ?? element.TrnAmt,
            Remarks: element.remarks ?? element.Remarks,
            IntrFbCmpCode: '',
            IntrFbFbCode: '',
            IntrFbBrCode: '',
            IntrFbAcCode: '',
            AcDocUniqId: '',
            AttachmentYN,
            AcDocN: element.fileName,
            AcDoc: element.base64file,
          };

          NewDebitArr.push(AccObj);
        });
      }
      const NewCreditArr = [];
      if (this.CreditTableArr.length > 0) {
        this.CreditTableArr.forEach((element, index) => {
          let AttachmentYN = 'N';
          if (element.fileName !== '') {
            AttachmentYN = 'Y';
          } else {
            AttachmentYN = 'N';
          }
          const AccObj = {
            DrCr: 'Cr',
            Ssno: index + 1,
            CmpCode: this.global.gUsrDefultCmpCode,
            FbCode: element.FinBookCode ?? element.FbCode,
            BrCode: element.CostCenterCode ?? element.BrCode,
            AcSelectionType: element.AcSelectionType,
            AcUsCode: element.AccCode_UssageCode ?? element.AcUsCode,
            TrnAmt: element.Amount ?? element.TrnAmt,
            Remarks: element.remarks ?? element.Remarks,
            IntrFbCmpCode: '',
            IntrFbFbCode: '',
            IntrFbBrCode: '',
            IntrFbAcCode: '',
            AcDocUniqId: '',
            AttachmentYN,
            AcDocN: element.fileName,
            AcDoc: element.base64file,
          };

          NewCreditArr.push(AccObj);
        });
      }

      // =====================

      ReqJson.L1 = NewDebitArr;
      ReqJson.L2 = NewCreditArr;
      const DynamicApiCall = await this.accService.gApiCallWithConfirm('reverse this JV ', ReqJson, this.global.gApiserver, 'AccEntryS1');
      if (DynamicApiCall[0]?.StatusResponse === 'Success') {
        this.commonService.openSnackbar('Journal Reversed Successfully', 'ok', 2500);
        this.dialog.closeAll();
        this.fetchLoading = true;
        this.ResetJV();
        setTimeout(() => {
          this.fetchLoading = false;
          this.firstTime = true;
          this.ViewJv(this.JvView);
        }, 200);
        this.OnlyView = !this.OnlyView;
        this.DebitTableArr = [];
        this.CreditTableArr = [];
      }
    } else {
      this.commonService.openSnackbar('No data to reverse', 'Ok', 1500);
    }
  }

  async PrintJV(templateRef:TemplateRef<any>) {
    const api = {
      reqMainreq: 'SR_BrAddressLogo',
      Usr: this.global.gUsrid,
      var1: this.global.gBrcode,
    };
    const ArrConfirm = await this.accService.gApiCallOne(api, this.global.gApiserver, 'datareqsarnEleven');
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

  BackClickedFromView() {
    // this.showNormalJv = true;
    // this.showApproveJv = false;
    // this.showViewJv = false;
    this.ResetJV();
  }

  BackClickedFromNormal() {
    if (this.GMenu !== 'JVApprovel' && this.showNormalJv) {
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

  ResetJV() {
    this.fetchLoading = true;
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

    this.voucherInformationForm.enable();

    this.voucherInformationForm = this.fb.group({
      JvType: ['Regular JV', Validators.required],
      narration: ['', Validators.required],
      accDate: [new Date(), Validators.required],
    });

    this.DebitTableArr = [];

    this.CreditTableArr = [];

    this.viewSearch = '';

    this.viewSearch1 = '';

    this.IsFresh = false;

    this.VoucherName = '';

    this.WStatus = '';
    this.ReceiptStatus = '';

    this.viewClicked = false;

    this.Authorized = '';

    this.curStatusFresh = false;

    this.VoucherNo = '';

    this.ActionMode = 'View';

    this.childGames.forEach((c) => c.reset());

    this.creditFileName = '';

    this.debitFileName = '';

    document.getElementById('narration')?.focus();
    setTimeout(() => {
      this.fetchLoading = false;
    }, 100);
  }

  shortcuts() {
    const keydown$ = fromEvent(window, 'keydown');
    this.subs.add(keydown$.subscribe((event: KeyboardEvent) => {
      if (this.GMenu !== 'JVNormal') {
        return;
      }
      if (event.altKey && (event.key === 's' || event.key === 'S')) {
        event.preventDefault();
        if (!this.OnlyView && this.GMenu !== 'JVApprovel' && this.ActionMode !== 'Edit' && this.showNormalJv) {
          document.getElementById('SaveButton')?.focus();
          this.SaveJv('save');
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
        // this.BackClickedFromNormal();
        this.router.navigateByUrl('/dashboard');
      }
	  }));
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
            document.getElementById('attachmentbtn')?.focus();
          }, 100);
        } else {
          setTimeout(() => {
            document.getElementById('debitfinBookName1')?.focus();
          }, 100);
        }
        this.base64File = event.target.result;
      };
    } catch (error) {
      this.base64File = null;
      this.filename = '';
    }
    if (event.target.value === '') {
      this.filename = '';
    } else {
      this.filename = event.target.files[0].name;
    }
  }

  attachmentpreview(row, templateRef:TemplateRef<any>) {
    this.dialog.open(templateRef, {
      width: 'auto',
      maxHeight: '600px',
      disableClose: true,
      data: row,
      panelClass: 'gDialogBox',
    });
  }

  downloadFile(AttachedFilePath, filename) {
    if (AttachedFilePath) {
      const data1 = AttachedFilePath;
      const a = document.createElement('a'); // Create <a>
      a.href = data1; // Image Base64 Goes here
      a.download = filename; // File name Here
      a.click(); // Downloaded file
    }
  }
}
