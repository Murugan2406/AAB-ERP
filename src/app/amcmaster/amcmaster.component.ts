/* eslint-disable no-unreachable */
/* eslint-disable eqeqeq */
/* eslint-disable no-tabs */
/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-shadow */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-unused-expressions */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-empty-function */
/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-constructor */
/* eslint-disable import/no-unresolved */
import { MatTableDataSource } from '@angular/material/table';

import Swal from 'sweetalert2';
import {
  FormControl, FormBuilder, FormGroup, Validators, FormArray,
} from '@angular/forms';
import {
  trigger, style, animate, transition,
} from '@angular/animations';
import {
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { SubSink } from 'subsink';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import * as XLSX from 'xlsx';
import { DatePipe, formatDate } from '@angular/common';
import { CommonService } from 'src/app/services/common.service';
import { Globals } from 'src/app/globals';
import { Subject, fromEvent } from 'rxjs';
import { Modal } from 'bootstrap';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatMenuTrigger } from '@angular/material/menu';
import { AccServiceService } from 'src/app/services/acc-service.service';
import { AccountPostingDialogComponent } from 'src/app/commonComponents/accountPostingDialog/accountPostingDialog.component';
import * as pdfjsLib from 'pdfjs-dist';
type AOA = any[][];

export interface Transaction {
  location:any,
  department:any,
  productName:any,
  productType:any,
  Others1:any,
  Others2:any,
  Others3:any,
  Others4:any,
  Others5:any,
}

@Component({
  selector: 'app-amcmaster',
  templateUrl: './amcmaster.component.html',
  styleUrls: ['./amcmaster.component.scss'],
  animations: [
    trigger('enterAnimation', [
      transition(':enter', [
        style({ transform: 'translateX(100%)', opacity: 0 }),
        animate('300ms', style({ transform: 'translateX(0)', opacity: 1 })),
      ]),
      transition(':leave', [
        style({ transform: 'translateX(0)', opacity: 1 }),
        animate('100ms', style({ transform: 'translateX(100%)', opacity: 0 })),
      ]),
    ]),
    trigger('fadeInOut', [
      transition(':enter', [ // :enter is alias to 'void => *'
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [ // :leave is alias to '* => void'
        animate('200ms', style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class AMCMasterComponent implements OnInit {
  private subs = new SubSink();

  voucherInformation = true;

  CreditInformation = true;

  DebitInformation = true;

  viewSearch = '';

  viewSearch1 = '';

  OnlyView = false;

  BasicForm: FormGroup;

  AMCForm: FormGroup;

  AMCDuration: any[] = ['Yearly', 'Halfly', 'Quarterly'];

  AMCNames: any[] = [];

  receiptModes: any[] = [];

  datePipe: DatePipe;

  invalidAccArr = [];

  dataSource = new MatTableDataSource([])

  data = [];

  InvaliddisplayedColumns = [];

  TableDataSource = [];

  ShowFormProd = true;

  MapOption = new FormControl('');

  ProdCatListALL = []

  displayedArr = [
    {
      name: 'SNo',
      display: true,
    },
    {
      name: 'location',
      display: true,
    },
    {
      name: 'department',
      display: true,
    },
    {
      name: 'productName',
      display: true,
    },
    {
      name: 'productType',
      display: true,
    },
    {
      name: 'Others1',
      display: true,
    },
    {
      name: 'Others2',
      display: true,
    },
    {
      name: 'Others3',
      display: true,
    },
    {
      name: 'Others4',
      display: true,
    },
    {
      name: 'Others5',
      display: true,
    },
    {
      name: 'Action',
      display: true,
    },
  ]

  displayedColumns = [
    'SNo',
    'location',
    'department',
    'productName',
    'productType',
    'Others1',
    'Others2',
    'Others3',
    'Others4',
    'Others5',
    'Action'];

  existingDataSource: any[];

  invalidbranchCodev: any[];

  InvalidText: string;

  BulkDataSource: any[];

  inputValue: string;

  ShowFormCr = true;

  ShowForm = false;

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

  ProductForm: FormGroup;

  ApprovalTableArr =[]

  JvAprFilterList: any[];

  GMenu: any = '';

  IsFresh: boolean = false;

  viewClicked: boolean = false;

  date = new Date();

  SectionTitle = 'AMC Master';

  AccountType = new FormControl('Debit', Validators.required);

  Reason = new FormControl('', Validators.required);

  attachments = new FormControl('');

  TrnType: any;

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

  filename: any;

  base64File: any;

  FileImage: any;

  Size: any;

  AttachedFilePath: any;

  DocId: any;

  attachmentAvailable: boolean;

  voucherBranchNames: any[];

  CompanyArr: any = [];

  CompanyList: any = [];

  prodList: any[];

  SupplierNameArr: any[];

  VOForm:FormGroup

  TableBrList: any = [];

  pipe: DatePipe;

  Master: any;

  Voucher: any;

  printTable: any;

  ShowViewForm: boolean = true;

  searchSelect: string = '';

  appHeight = 'calc(100vh - 145px)'

  DeptList: any = [];

  DeptListAll: any = [];

  ProdCatList: any = [];
  ServiceCatNames: any = [];
  FilterAMCNames: any[] = [];
  FilterServiceCatNames: any = [];
  editableRow: any = null;
  selectedRowIndex: number = null;
  classArrTable: any = [];

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private commonService: CommonService,
    public snackbar: MatSnackBar,
    public global: Globals,
    private accService: AccServiceService,
    private router: Router,
    public bottomSheet: MatBottomSheet,
  ) {
    if (this.global.gmainMenuSelected === 'undefined') {
      this.router.navigateByUrl('/dashboard');
    }
    this.accService.unsubscribe$= new Subject<void>();
    this.commonService.apiUrl = this.global.gApiserver;
  }

  toggleVoucherData() {
    this.voucherInformation = !this.voucherInformation;
  }

  async ngOnInit() {
    this.GMenu = this.global.gmainMenuSelected;
    this.datePipe = new DatePipe('en-IN');
    this.commonService.reqSendto = 'datareqsarnEleven';
    if (this.GMenu === 'AMCApprovel') {
      this.SectionTitle = 'AMC Master Approval';
      this.showNormalJv = false;
      this.showApproveJv = true;
      this.ShowForm = true;
      this.ShowFormProd = true;
      this.VOForm = this.fb.group({
        VORows: this.fb.array([]),
      });
    
      this.initalApiCalls();
      this.CompanyList = await this.accService.getCompany();
      this.AllFBList = await this.accService.getFinbook(this.global.gUsrDefultCmpCode, '');
      setTimeout(() => {
        this.ViewApprovalJV(this.JVApprovalForm);
      }, 300);

    
    } else if (this.GMenu === 'AMCMaster') {
      this.showNormalJv = true;
      this.showApproveJv = false;
      this.ShowForm = true;
      this.ShowFormProd = true;
      this.VOForm = this.fb.group({
        VORows: this.fb.array([]),
      });
      this.initalApiCalls();
      this.CompanyList = await this.accService.getCompany();
      this.AllFBList = await this.accService.getFinbook(this.global.gUsrDefultCmpCode, '');
      setTimeout(() => {
        document.getElementById('narration')?.focus();
      }, 200);
    } else {
      this.router.navigateByUrl('/dashboard');
    }
  }
  initalApiCalls(){
    this.formIInitalization();
    this.shortcuts();
    this.getTrantype();
    this.getAMCNames()
    this.serviceCat()
  }



  
  async getAMCNames() {
    const FBCode = this.viewJVForm.get('finBookName').value.FbCode;
    const api = {
      reqMainreq: 'AMC_Name',
      Usr: this.global.gUsrid,
      brcode: this.global.gBrcode,
      var1: '',
    };
    this.AMCNames = await this.accService.gApiCallOne(api, this.global.gApiserver, 'datareqsarnTwelve');
  }

  
  async serviceCat() {
    const FBCode = this.viewJVForm.get('finBookName').value.FbCode;
    const api = {
      reqMainreq: 'AMC_ServiceCat',
      Usr: this.global.gUsrid,
      brcode: this.global.gBrcode,
      var1: '',
    };
    this.ServiceCatNames = await this.accService.gApiCallOne(api, this.global.gApiserver, 'datareqsarnTwelve');
  }

  NormalFormInitial() {
    const fbObj = {
      FbCode: this.global.gUsrDefultFbCode,
      FbName: this.global.gUsrDefultFbName,
    };
    const cmpObj = {
      company: this.global.gUsrDefultCmpName,
      CmpCode: this.global.gUsrDefultCmpCode,
    };

    this.BasicForm = this.fb.group({
      Company: [cmpObj, Validators.required],
      Finbook: [fbObj, Validators.required],
      vendorName: ['', Validators.required],
      ContactName: ['', Validators.required],
      ContactMobile: ['', Validators.required],
    });

    this.AMCForm = this.fb.group({
      AmcName: ['Ac Maintanance', Validators.required],
      ServiceName: ['', Validators.required],
      AmcDuration: ['Yearly', Validators.required],
      Attachments: ['', Validators.required],
      Amount: ['', Validators.required],
      FromDate: [new Date(), Validators.required],
      ToDate: [new Date(), Validators.required],
      CertificateNo: ['', Validators.required],
      CertValidFrom: [new Date(), Validators.required],
      CertUpto: [new Date(), Validators.required],
      description: ['', Validators.required],
      withSpare: ['With Spare', Validators.required],
    });

    this.ProductForm = this.fb.group({
      location: ['', Validators.required],
      department: ['', Validators.required],
      prodCategory: ['', Validators.required],
      productName: ['', Validators.required],
      productType: ['', Validators.required],
      Others1: ['', Validators.required],
      Others2: ['', Validators.required],
      Others3: [''],
      Others4: [''],
      Others5: [''],
      description: [''],
    });
  }

  viewAproveFormInitial() {
    const cmpObj = {
      company: this.global.gUsrDefultCmpName,
      CmpCode: this.global.gUsrDefultCmpCode,
    };
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
      Company: [cmpObj, Validators.required],
      costCenter: [BrObj, Validators.required],
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

  formIInitalization() {
    this.NormalFormInitial();
    this.viewAproveFormInitial();
  }

  previewclick(type) {
    const arrayOfArray = [
      {
        SNo: '',
        LocationCode: '',
        LocationName: '',
        Department: '',
        ProductCategory: '',
        ProductCode: '',
        ProductName: '',
        ProductType: '',
        ModelName: '',
        ModelNo: '',
        SerialNo: '',
        EngineNo: '',
        ChassisNo: '',
        Description: '',

      },
    ];
    this.commonService.exportAsExcelFile(arrayOfArray, 'AMC_Master');
  }

  browsebutton() {
    document.getElementById('import').click();
  }

  onFileChange(evt: any, templateRef: TemplateRef<any>) {
    const target: DataTransfer = <DataTransfer>evt.target;
    // const filName = this.inputValue;

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
      this.AccvalidationCheck(templateRef);
    }, 200);
  }

  AccvalidationCheck(templateRef: TemplateRef<any>) {
    if (this.data.length === 0) {
      Swal.fire({ text: 'No record found please check the file !' });
      this.fetchLoading = false;
      return;
    }
    this.existingDataSource = [...this.dataSource.data];
    this.BulkDataSource = [];
    this.InvalidText = '';
    const tableJson = [];
    const sample = {};
    this.invalidbranchCodev = [];
    let counter = 1;
    this.data.forEach((element, index) => {
      if (element.LocationCode && element.LocationName && element.Department && element.ProductCategory
        && element.ProductCode && element.ProductName
        && element.ProductType && element.ModelName && element.ModelNo
        && element.SerialNo && element.EngineNo && element.ChassisNo && element.Description) {
        const ExistArr = this.dataSource.data.some(
          (e) => e.LocationCode == element.LocationCode && e.ProductCode == element.ProductCode,
        );

        if (!ExistArr) {
          tableJson.push(element);
        } else {
          this.invalidbranchCodev.push(element);
        }
      } else {
        counter += 1;
        this.invalidbranchCodev.push(element);
      }
    });
    if (counter !== 1) {
      Swal.fire({ text: 'Some fields are missing, Please check the file' });
      this.fetchLoading = false;
      return;
    }
    if (this.invalidbranchCodev.length > 0) {
      this.dialog.open(templateRef, {
        minWidth: '95vw', maxHeight: '99vh', disableClose: true, autoFocus: false, panelClass: 'gDialogBox',
      });
      this.InvalidText = 'The following row(s) has invalid content / already exist, please check the file';
      this.BulkDataSource = this.invalidbranchCodev;
      this.fetchLoading = false;
      return;
    }
    this.inputValue = '';
    const tempArr1 = [];
    const tempArr2 = [];

    if (tableJson.length > 0) {
      tableJson.forEach((element, index) => {
        if (tableJson[index]?.LocationCode == tableJson[index + 1]?.LocationCode
           && tableJson[index]?.ProductCode == tableJson[index + 1]?.ProductCode) {
          tempArr1.push(tableJson[index]);
        } else {
          tempArr2.push(tableJson[index]);
        }
      });
    }
    if (tableJson.length === tempArr2.length) {
      this.InvalidText = '';
      this.dialog.closeAll();
      // this.commonService.openSnackbar('data(s) fetched to table', 'Ok', 1500);
      this.inputValue = '';
      if(this.TableDataSource.length  > 0){
        Swal.fire({
          title: 'There is aleady a file in table, what do you want to do ?  ',
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: 'OverWrite',
          denyButtonText: `Merge`,
        }).then((result) => {

          if (result.isConfirmed) {
            tableJson.forEach((element,index) => {
              let arr = []
               arr.push({
                SNo:index+1,
                LocationCode: element.LocationCode,
                LocationName: element.LocationName,
                Department: element.Department,
                ProductCategory: element.ProductCategory,
                ProductCode: element.ProductCode,
                ProductName: element.ProductName,
                ProductType: element.ProductType,
                Others1:element.ModelName,
                Others2:element.ModelNo,
                Others3:element.SerialNo,
                Others4:element.EngineNo,
                Others5:element.ChassisNo,
                Description: element.Description,
              });

              this.TableDataSource = arr
            });
            Swal.fire({ text: 'XL data(s) fetched to table' });
            this.inputValue = '';
            this.ShowForm = false;
          } else if (result.isDenied) {
let Arr = []
            tableJson.forEach((element,index) => {
              Arr.push({
                SNo:index+1,
                LocationCode: element.LocationCode,
                LocationName: element.LocationName,
                Department: element.Department,
                ProductCategory: element.ProductCategory,
                ProductCode: element.ProductCode,
                ProductName: element.ProductName,
                ProductType: element.ProductType,
                Others1:element.ModelName,
                Others2:element.ModelNo,
                Others3:element.SerialNo,
                Others4:element.EngineNo,
                Others5:element.ChassisNo,
                Description: element.Description,
              });
            });


            this.TableDataSource.push(...Arr);
            Swal.fire({ text: 'XL data(s) fetched to table' });
            this.inputValue = '';
            this.ShowForm = false;
          }
        })

      }else{
        tableJson.forEach((element,index) => {
          let arr = []
          arr.push({
            SNo:index+1,
            LocationCode: element.LocationCode,
            LocationName: element.LocationName,
            Department: element.Department,
            ProductCategory: element.ProductCategory,
            ProductCode: element.ProductCode,
            ProductName: element.ProductName,
            ProductType: element.ProductType,
            Others1:element.ModelName,
            Others2:element.ModelNo,
            Others3:element.SerialNo,
            Others4:element.EngineNo,
            Others5:element.ChassisNo,
            Description: element.Description,
          });
          this.TableDataSource = arr
        });
        Swal.fire({ text: 'XL data(s) fetched to table' });
        this.inputValue = '';
        this.ShowForm = false;
      }



    
      // this.TableDataSource = tableJson;
    } else {
      this.InvalidText = 'The following row(s) has invalid content / already exist, please check the file';
      this.BulkDataSource = tempArr1;
    }
    this.fetchLoading = false;
  }

  DataSourceReset() {
    const control = this.VOForm.get('VORows') as FormArray;
    control.controls = [];

    this.dataSource = new MatTableDataSource([]);
    this.dataSource._updateChangeSubscription();
    control.updateValueAndValidity();
    this.VOForm.updateValueAndValidity();
  }

  tableCheck() {
    let tableCheck = true;
    const control = this.VOForm.get('VORows') as FormArray;

    control.controls.forEach((element) => {
      if (element.valid) {
        this.commonService.openSnackbar('Please fill all Vendor Information', 'Ok', 1500);
      } else {
        tableCheck = false;
      }
    });
    return tableCheck;
  }

  SaveJv(action) {
    if (this.BasicForm.invalid) {
      Swal.fire({ text: 'Please fill all Basic Information' });
      return;
    }
    if (this.AMCForm.invalid) {
      Swal.fire({ text: 'Please fill all AMC Information' });
      return;
    }
    if (this.TableDataSource.length === 0) {
      Swal.fire({ text: 'Please fill Product Information' });
      return;
    }

    this.SaveApiCall(action);

  }

  async SaveApiCall(action) {
    let VoucherNo = '';
    let EntryDate = '';
    let AttachmentFile = '';
    if (this.ActionMode === 'Edit') {
      VoucherNo = this.VoucherNo;
      EntryDate = this.trnDate;
      AttachmentFile = this.AttachedFilePath;
    } else {
      VoucherNo = '';
      EntryDate = '';
      AttachmentFile = this.base64File;
    }
    const master = this.BasicForm.value;
    const vendor = this.AMCForm.value;
    const ReqJson = {
      reqMainreq: 'S@/AmcMaster/E@',
      Usr: this.global.gUsrid,
      CmpCode: master.Company.CmpCode,
      FbCode: master.Finbook.FbCode,
      AmcName: vendor.AmcName,
      ServiceCat: vendor.ServiceName,
      AmcDuration: vendor.AmcDuration,
      AttachmentYN: vendor.Attachments ? 'Y' : 'N',
      DocFileName: this.filename,
      AttachmentFile,
      Amt: vendor.Amount,
      PeriodFrom: formatDate(vendor.FromDate, 'dd-MMM-yyyy', 'en'),
      PeriodTo: formatDate(vendor.ToDate, 'dd-MMM-yyyy', 'en'),
      VendorCode: master.vendorName.supcode,
      ContName: master.ContactName,
      ContMobileNo: master.ContactMobile,
      CTFNo: vendor.CertificateNo,
      CTFfromdate: formatDate(vendor.CertValidFrom, 'dd-MMM-yyyy', 'en'),
      CTFtodate: formatDate(vendor.CertUpto, 'dd-MMM-yyyy', 'en'),
      Descr: vendor.description,
      AmcSpares: vendor.withSpare,
      VoucherNo,
      EntryDate,
      getList: [],
    };
    const L1 = [];
    // const control = this.VOForm.get('VORows') as FormArray;
    this.TableDataSource.forEach((element, index) => {
      const AccObj = {
        SSno: index + 1,
        Brcode: element.LocationCode,
        DeptOrSec: element.Department,
        ProdCategory: element.ProductCategory?.subcat ?? element.ProductCategory,
        ProdCode: element.ProductCode,
        ProdName: element.ProductName,
        ProdType: element.ProductType,
        ModelName: element.Others1,
        ModelNo: element.Others2,
        SerialNo: element.Others3,
        EngineNo: element.Others4,
        ChassisNo: element.Others5,
        OtherDescrip: element.Description,
      };
      L1.push(AccObj);
    });
    ReqJson.getList = L1;
    const DynamicApiCall = await this.accService.gApiCallWithConfirm(action, ReqJson, this.global.gApiserver, 'JsonPayloadSaran3');
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
      this.VoucherName = '';
      this.WStatus = '';
      this.ReceiptStatus = '';

      this.BasicForm.reset();
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
        if (this.Viewloading) {
          return;
        }
        this.Viewloading = true;
        const api = {
          reqMainreq: 'SR_EntryView',
          Usr: this.global.gUsrid,
          brcode: this.global.gBrcode,
          var1: formatDate(viewForm.get('fromDate').value, 'dd-MMM-yyyy', 'en'),
          var2: formatDate(viewForm.get('toDate').value, 'dd-MMM-yyyy', 'en'),
          var3: 'All',
          var4: 'All',
          var5: viewForm.value.costCenter.brcode,
          var6: this.global.gUsrDefultCmpCode,
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

  ViewJv(ViewTemplate:TemplateRef<any>) {
    this.showNormalJv = false;
    this.showViewJv = true;
    this.showApproveJv = false;
    this.SectionTitle = 'View AMC Master';
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

  FilterFinbook(keyValue, tabIndex) {
    const key = keyValue.toLocaleUpperCase();
    if (tabIndex === 'three') {
      this.FbThreeArr = this.AllFBList.filter((option) => option.FbName.toLocaleUpperCase().includes(key));
    } else {
      this.JvAprFilterList = this.AllFBList.filter((option) => option.FbName.toLocaleUpperCase().includes(key));
    }
  }

  async FilterAmcInfo(keyValue, type) {

    const FBCode = this.viewJVForm.get('finBookName').value.FbCode;
    if (type === 'amc') {
      const api = {
        reqMainreq: 'AMC_Name',
        Usr: this.global.gUsrid,
        brcode: this.global.gBrcode,
        var1: '',
      };
      this.FilterAMCNames = await this.accService.gApiCallOne(api, this.global.gApiserver, 'datareqsarnTwelve');
    } else {
      const api = {
        reqMainreq: 'AMC_ServiceCat',
        Usr: this.global.gUsrid,
        brcode: this.global.gBrcode,
        var1: '',
      };
      this.FilterServiceCatNames = await this.accService.gApiCallOne(api, this.global.gApiserver, 'datareqsarnTwelve');
    }
  }

  viewFbchange(event, type) {
    if (event.source.selected) {
      setTimeout(() => {
        if (type === 'view') {
          this.AllBranchList = [];
          this.viewJVForm.get('costCenter')?.setValue('');
          document.getElementById('viewCostCenter')?.focus();
        } 
        else if (type === 'entry') {
          this.FbThreeArr = [];
          document.getElementById('vendorName')?.focus();
        } else {
          document.getElementById('approvalFromDate')?.focus();
        }
      }, 100);
    }
  }

  matSelectChange(event, id) {
    if (event.source.selected && event.isUserInput) {
      setTimeout(() => {
              
        if(id ==="ServiceName"){
          this.FilterAMCNames = []
        }else if(id==='AmcDuration'){
this.FilterServiceCatNames =[]
        }
        document.getElementById(id)?.focus();
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
        document.getElementById('entrType')?.focus();
      }
    }, 100);
  }

  viewBrchange(event, Finbook) {
    if (event.source.selected) {
      this.AllBranchList = [];
      setTimeout(() => {
        this.viewJVForm.valid ? this.SubmitViewJv(this.viewJVForm) : document.getElementById('fromDate')?.focus();
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

  async getTableLocation(keyValue) {
    const FBCode = this.BasicForm.get('Finbook').value.FbCode;
    const api = {
      reqMainreq: 'SR_brSearch',
      Usr: this.global.gUsrid,
      brcode: this.global.gBrcode,
      var1: keyValue,
      var2: this.global.gUsrDefultCmpCode,
      var3: FBCode,
    };
    this.TableBrList = await this.accService.gApiCallOne(api, this.global.gApiserver, 'datareqsarnEleven');
  }

  keytab(e: any, id: any): void {
    if (e.key === 'Enter') {
      if (e.target.value !== '') {
        setTimeout(() => {
       this.hideAutoCompletepanle()
          document.getElementById(id)?.focus();
        }, 100);
      }
    }
  }



  FocusNext(event, id) {
    if (event.source.selected) {
      setTimeout(() => {
        document.getElementById(id)?.focus();
      }, 100);
    }
  }

  async settableData(response, tabledata) {
    if (response[0].AttachmentYN === 'Y') {
      this.attachmentAvailable = true;
      this.getAttachements(response[0], response[0].AcDocUniqId);
    } else {
      this.AttachedFilePath = response[0].AttachmentFile;
      this.base64File = this.AttachedFilePath;
      this.attachmentAvailable = false;
      Object.assign(response[0], { fileName: '' });
      Object.assign(response[0], { base64file: '' });
    }
  }

  getAttachements(element, DocId) {
    const api = {
      reqMainreq: 'SR_AttachedFileView',
      Usr: this.global.gUsrid,
      brcode: this.global.gBrcode,
      var1: this.VoucherNo,
      var2: this.viewJVForm.get('tranType')?.value.VoucherId,
      var4: DocId,
    };
    this.commonService.reqSendto = 'datareqsarnEleven';
    this.subs.add(
      this.commonService.sendReqst(api).subscribe({
        next: (response):any => {
          if (response.length > 0) {
            if (response[0].StatusResponse === 'Success') {
              this.AttachedFilePath = response[0].AttachmentFile;
              this.filename = response[0].DocName;

              Object.assign(element, { fileName: response[0].DocName });
              Object.assign(element, { base64file: response[0].AttachmentFile });
              this.AMCForm.get('Attachments')?.setValue(response[0].DocName);
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
      reqMainreq: 'AMC_DetailsView',
      Usr: this.global.gUsrid,
      brcode: this.global.gBrcode,
      var1: tabledata.VoucherNo,
      var2: formatDate(tabledata.tdate, 'dd-MMM-yyyy', 'en'),
      var5: this.viewJVForm.get('tranType')?.value.VoucherId,
    };
    this.fetchLoading = true;
    this.latestViewRow = rowIndex + 1;
    this.WStatus = `WStatus: ${tabledata.WStatus}`;
    this.ReceiptStatus = `DC Status: ${tabledata.ReceiptStatus}`;
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

              this.VoucherName = `Voucher No: ${response[0].VoucherNo}`;
              this.VoucherNo = response[0].VoucherNo;
              this.settableData(response, tabledata);


              this.trnDate = response[0].Tdate;
              this.Authorized = response[0].TrnStatus;
              this.AcTrnId = response[0].AcTrnId;
              this.ValueAssigning(response);
              // this.DataSourceReset();
              // response.forEach((element) => {
              //   this.formFieldsResponse(element);
              // });

              this.ApprovalArr = response;

              this.ReverseGivenFlag = response[0].ReverseGiven;
              tabledata.WStatus === 'FRESH' ? this.IsFresh = true : this.IsFresh = false;
              const TrnValue = this.viewJVForm.get('tranType').value.VoucherType;
              if (TrnValue === 'AMC Master Reversal') {
                this.ReverseJv = true;
                if (flag === 'JVView' || flag === 'JVEdit') {
                  if (!this.IsFresh) {
                    this.BasicForm.disable();
                    this.AMCForm.disable();

                    this.OnlyView = true;
                  } else {
                    this.BasicForm.enable();
                    this.AMCForm.enable();
                    this.OnlyView = false;
                  }
                  // this.trnDate = tabledata.Tdate;
                  this.ActionMode = 'Edit';
                } else if (flag === 'JvReEntry') {
                  this.BasicForm.enable();
                  this.AMCForm.enable();

                  this.OnlyView = false;
                  // this.trnDate = tabledata.Tdate;
                  this.ActionMode = 'ReUse';
                }
              } else if (TrnValue === 'AMC Master') {
                this.ReverseJv = false;
                if (flag === 'JVView' || flag === 'JVEdit') {
                  if (!this.IsFresh) {
                    this.BasicForm.disable();
                    this.AMCForm.disable();
                    this.OnlyView = true;
                  } else {
                    this.BasicForm.enable();
                    this.AMCForm.enable();
                    this.OnlyView = false;
                  }

                  // this.trnDate = tabledata.Tdate;
                  this.ActionMode = 'Edit';
                } else if (flag === 'JvReEntry') {
                  this.BasicForm.enable();
                  this.AMCForm.enable();

                  this.OnlyView = false;
                  // this.trnDate = tabledata.Tdate;
                  this.ActionMode = 'ReUse';
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
      reqMainreq: 'AMC_DeleteEntry',
      Usr: this.global.gUsrid,
      var1: this.VoucherNo,
      var2: this.trnDate,
      var5: this.JVApprovalForm.get('reverseEntry').value.VoucherId,
    };
    const ArrConfirm = await this.accService.gApiCallWithConfirm('delete', ReqJson, this.global.gApiserver, 'datareqsarnEleven');
    this.BasicForm.enable();
    this.AMCForm.enable();

    this.VoucherName = '';
    this.WStatus = '';
    this.ReceiptStatus = '';
    if (ArrConfirm[0]?.StatusResponse === 'Success') {
      Swal.fire({ text: 'AMC deleted successfully' });
      this.fetchLoading = true;
      this.ResetJV();
      setTimeout(() => {
        this.fetchLoading = false;
        this.firstTime = true;
        this.ViewJv(this.JvView);
      }, 200);
      this.OnlyView = !this.OnlyView;
    }
  }

  async ViewApprovalJV(ApprovalviewForm) {
    this.commonService.reqSendto = 'datareqsarnEleven';

    if (ApprovalviewForm.valid) {
      if (this.commonService.checkTypeValitity(this.JVApprovalForm.get('finBookName').value, 'Finbook Name')) {
        const api = {
          reqMainreq: 'SR_getApprovalView',
          Usr: this.global.gUsrid,
          brcode: this.global.gBrcode,
          var1: formatDate(ApprovalviewForm.get('fromDate').value, 'dd-MMM-yyyy', 'en'),
          var2: formatDate(ApprovalviewForm.get('toDate').value, 'dd-MMM-yyyy', 'en'),
          var3: this.global.gUsrDefultCmpCode,
          var4: ApprovalviewForm.value.finBookName.FbCode,
          var5: ApprovalviewForm.get('status').value,
          var7: ApprovalviewForm.get('reverseEntry').value.VoucherId,
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
      reqMainreq: 'AMC_getAprvlDetsView',
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
      this.TrnType = this.JVApprovalForm.get('reverseEntry').value.VoucherId;
      this.VoucherNo = row.Trnid;
      this.settableData(ArrConfirm, row);
      this.showNormalJv = true;
      this.showApproveJv = false;
      this.DataSourceReset();
      ArrConfirm.forEach((element) => {
        this.formFieldsResponse(element);
      });
      this.Authorized = row.TrnStatus;
      this.VoucherName = `Voucher No: ${row.Trnid}`;
      this.WStatus = `WStatus: ${row.WStatus}`;
      this.ReceiptStatus = `DC Status: ${row.VStatus}`;
      row.CurStatus === 'FRESH' ? this.curStatusFresh = true : this.curStatusFresh = false;
      ArrConfirm[0].TrnStatus === 'FRESH' ? this.showAccpost = true : this.showAccpost = false;
      this.loading = false;
      ArrConfirm[0].ApproveOnly === 'N' ? this.showAppRejectButton = false : this.showAppRejectButton = true;
      this.ValueAssigning(ArrConfirm);
      this.OnlyView = true;
      this.BasicForm.disable();
      this.AMCForm.disable();

      this.fetchLoading = false;
    }
    this.fetchLoading = false;
  }

  ValueAssigning(response) {
    const response1 = response[0];

    const fbObj = {
      FbCode: response1.FbCode,
      FbName: response1.FbName,
    };
    const cmpObj = {
      company: response1.CmpName,
      CmpCode: response1.CmpCode,
    };
    const vObj = {
      supcode: response1.VendorCode,
      SupName: response1.VendorName,
    };

    this.voucherInformation = true;
    this.ShowForm = true;
    this.ShowFormProd = false;
    this.BasicForm = this.fb.group({
      Company: [cmpObj, Validators.required],
      Finbook: [fbObj, Validators.required],
      vendorName: [vObj, Validators.required],
      ContactName: [response1.ContName, Validators.required],
      ContactMobile: [response1.ContMobileNo, Validators.required],

    });
    this.AMCForm = this.fb.group({
      AmcName: [response1.AmcName, Validators.required],
      ServiceName: [response1.ServiceCat, Validators.required],
      AmcDuration: [response1.AmcDuration, Validators.required],
      Attachments: ['', Validators.required],
      Amount: [response1.Amt, Validators.required],
      FromDate: [formatDate(response1.PeriodFrom, 'yyyy-MM-dd', 'en'), Validators.required],
      ToDate: [formatDate(response1.PeriodTo, 'yyyy-MM-dd', 'en'), Validators.required],
      CertificateNo: [response1.CTFNo, Validators.required],
      CertValidFrom: [formatDate(response1.CTFfromdate, 'yyyy-MM-dd', 'en'), Validators.required],
      CertUpto: [formatDate(response1.CTFtodate, 'yyyy-MM-dd', 'en'), Validators.required],
      description: [response1.Descr, Validators.required],
      withSpare: [response1.AmcSpares, Validators.required],
    });
    this.TableDataSource = [];
    response.forEach((element, index) => {
      this.TableDataSource.push({
        SNo: index +1,
        LocationCode: element.Brcode,
        LocationName: element.BrName,
        Department: element.DeptOrSec,
        ProductCategory: element.ProdCategory,
        ProductCode: element.ProdCode,
        ProductName: element.ProdName,
        ProductType: element.ProdType,
        Others1: element.ModelName,
        Others2: element.ModelNo,
        Others3: element.SerialNo,
        Others4: element.EngineNo,
        Others5: element.ChassisNo,
        Description: element.Descr,
      });
    });
  }

  async RejectJV(reason) {
    const api = {
      reqMainreq: 'AMC_ApprovlAndReject',
      Usr: this.global.gUsrid,
      var1: 'REJECTED',
      var2: this.ApprovalArr[0].Tdate,
      var3: reason,
      var4: this.BasicForm.get('vendorName').value.SupName,
      var5: this.ApprovalArr[0].CmpCode,
      var6: this.ApprovalArr[0].FbCode,
      var7: this.ApprovalArr[0].VoucherNo,
      var8: this.BasicForm.get('vendorName').value.supcode,
      var9: this.JVApprovalForm.get('reverseEntry').value.VoucherId,
    };
    const ArrConfirm = await this.accService.gApiCallWithConfirm('reject this AMC ', api, this.global.gApiserver, 'datareqsarnTwelve');

    if (ArrConfirm[0]?.StatusResponse === 'Success') {
      Swal.fire({ text: 'AMC Rejected Successfully' });
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
      reqMainreq: 'AMC_ApprovlAndReject',
      Usr: this.global.gUsrid,
      var1: 'APPROVED',
      var2: this.ApprovalArr[0].Tdate,
      var3: '',
      var4: this.BasicForm.get('vendorName').value.SupName,
      var5: this.ApprovalArr[0].CmpCode,
      var6: this.ApprovalArr[0].FbCode,
      var7: this.ApprovalArr[0].VoucherNo,
      var8: this.BasicForm.get('vendorName').value.supcode,
      var9: this.JVApprovalForm.get('reverseEntry').value.VoucherId,
    };
    const ArrConfirm = await this.accService.gApiCallWithConfirm('approve this AMC ', api, this.global.gApiserver, 'datareqsarnTwelve');
    if (ArrConfirm[0]?.StatusResponse === 'Success') {
      Swal.fire({ text: 'AMC Approved Successfully' });
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
  }

  async PrintJV(templateRef:TemplateRef<any>) {
    const api = {
      reqMainreq: 'SR_BrAddressLogo',
      Usr: this.global.gUsrid,
      var1: this.global.gBrcode,
    };
    this.Master = this.BasicForm.value;
    this.Voucher = this.AMCForm.value;
    const control = this.VOForm.get('VORows') as FormArray;
    this.printTable = [];
    control.controls.forEach((element) => {
      this.printTable.push(element.value);
    });

    const ArrConfirm = await this.accService.gApiCallOne(api, this.global.gApiserver, 'datareqsarnEleven');
    if (ArrConfirm[0]?.StatusResponse === 'Success') {
      this.dialog.open(templateRef, {
        minWidth: '90vw',
        maxHeight: '98vh',
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
    this.ResetJV();
  }

  BackClickedFromNormal() {
    if (this.GMenu !== 'AMCApprovel' && this.showNormalJv) {
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
    this.MapOption.reset();
    this.approveLoad = false;
    this.editableRow = null;
    this.selectedRowIndex = 0;
    this.showApproveJv = false;
this.classArrTable = []
    this.showNormalJv = true;

    this.showAccpost = false;

    this.OnlyView = false;

    this.ShowForm = true;
    this.ShowFormProd = true;
    const fbObj = {
      FbCode: this.global.gUsrDefultFbCode,
      FbName: this.global.gUsrDefultFbName,
    };
    const cmpObj = {
      company: this.global.gUsrDefultCmpName,
      CmpCode: this.global.gUsrDefultCmpCode,
    };
    this.BasicForm.reset({
      Company: cmpObj,
      Finbook: fbObj,
    });
    // this.AMCForm.reset();
    this.AMCForm = this.fb.group({
      AmcName: ['Ac Maintanance', Validators.required],
      ServiceName: ['', Validators.required],
      AmcDuration: ['Yearly', Validators.required],
      Attachments: ['', Validators.required],
      Amount: ['', Validators.required],
      FromDate: [new Date(), Validators.required],
      ToDate: [new Date(), Validators.required],
      CertificateNo: ['', Validators.required],
      CertValidFrom: [new Date(), Validators.required],
      CertUpto: [new Date(), Validators.required],
      description: ['', Validators.required],
      withSpare: ['With Spare', Validators.required],
    });
    this.BasicForm.enable();
    this.AMCForm.enable();
    this.TableDataSource = [];
    this.viewSearch = '';
    this.attachmentAvailable = false;
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

    this.creditFileName = '';

    this.debitFileName = '';

    document.getElementById('narration')?.focus();
    setTimeout(() => {
      this.fetchLoading = false;
    }, 100);
  }

  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;

  someMethod() {
    this.trigger.openMenu();
  }

  timedOutCloser;

  mouseEnter(trigger) {
    if (this.timedOutCloser) {
      clearTimeout(this.timedOutCloser);
    }
    trigger.openMenu();
  }

  mouseLeave(trigger) {
    this.timedOutCloser = setTimeout(() => {
      trigger.closeMenu();
    }, 50);
  }

  AutoSelectdefault(id) {
    this.searchSelect = '';
    setTimeout(() => {
      document.getElementById(id)?.focus();
    }, 100);
  }

  shortcuts() {
    const keydown$ = fromEvent(window, 'keydown');
    this.subs.add(keydown$.subscribe((event: KeyboardEvent) => {
      if (this.GMenu === 'AMCMaster') {
        if (event.altKey && (event.key === 's' || event.key === 'S')) {
          event.preventDefault();
          if (!this.OnlyView && this.GMenu !== 'AMCApprovel' && this.ActionMode !== 'Edit' && this.showNormalJv) {
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
        if (event.altKey && (event.key === 'd' || event.key === 'D')) {
          if(this.IsFresh && !this.OnlyView && this.GMenu !== 'OpeningBalApprove'&& this.ActionMode === 'Edit' && this.showNormalJv){
          event.preventDefault();
          document.getElementById('deleteBtn')?.focus();
          this.DeleteJv();
        }
 
        }
        if (event.altKey && (event.key === 'c' || event.key === 'C')) {
          event.preventDefault();
          document.getElementById('ResetButton')?.focus();
          this.ResetJV();
        }
        if (event.altKey && (event.key === 'f' || event.key === 'F')) {
          event.preventDefault();
          document.getElementById('search')?.focus();
        }

        if (event.altKey && (event.key === 'X' || event.key === 'x')) {      
          event.preventDefault();
            this.BackClickedFromNormal()
        }
      } else {
        if (event.altKey && (event.key === 'f' || event.key === 'F')) {
          event.preventDefault();
          document.getElementById('search')?.focus();
        }
        if (event.altKey && (event.key === 'X' || event.key === 'x')) {
          event.preventDefault();
            this.BackClicked()
        }

        if (event.altKey && (event.key === 'a' || event.key === 'A')) {
          if(!this.showApproveJv && this.GMenu === 'AMCApprovel' && this.curStatusFresh && this.showAppRejectButton){
          event.preventDefault();
          document.getElementById('aprBtn')?.focus();
          document.getElementById('aprBtn')?.click();
        }
        }
        if (event.altKey && (event.key === 'r' || event.key === 'R')) {
          if(!this.showApproveJv && this.GMenu === 'AMCApprovel' && this.curStatusFresh && this.showAppRejectButton){
          event.preventDefault();
          document.getElementById('rejectBtn')?.focus();
          document.getElementById('rejectBtn')?.click();
          setTimeout(() => {
            document.getElementById('reasonInput')?.focus();
          }, 500);
        }
        }
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
            document.getElementById('amount')?.focus();
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

  downloadFile() {
    if (this.AttachedFilePath) {
      const data1 = this.AttachedFilePath;
      const a = document.createElement('a'); // Create <filename;>
      a.href = data1; // Image Base64 Goes here
      a.download = this.filename; // File name Here
      a.click(); // Downloaded file
    }
  }

  // getBranchName() {
  //   this.commonService
  //     .autoComplete(
  //       this.ProductForm.controls.location.valueChanges,
  //     )
  //     .subscribe((data: any) => {
  //       const api = {
  //         reqMainreq: 'SR_brSearch',
  //         Usr: this.global.gUsrid,
  //         brcode: this.global.gBrcode,
  //         var1: data,
  //         var2: this.BasicForm.controls.Company.value.CmpCode,
  //         var3: this.BasicForm.controls.Finbook.value.FbCode

  //         ,
  //       };
  //       this.voucherBranchNames = [];
  //       this.commonService.reqSendto = 'datareqsarnEleven';
  //       this.subs.add(
  //         this.commonService.sendReqst(api).subscribe({
  //           next: (response) => {
  //             if (response.length > 0) {
  //               if (response[0].StatusResponse === 'Success') {
  //                 this.voucherBranchNames = response;
  //               } else {
  //                 this.voucherBranchNames = [];
  //                 Swal.fire(response[0].StatusResponse);
  //               }
  //             } else {
  //               this.voucherBranchNames = [];
  //             }
  //           },
  //           error: (error) => {
  //             Swal.fire({ text: error.message ?? 'Http failure response' });
  //           },
  //           complete: () => {},
  //         }),
  //       );
  //     });
  // }

  brSelected(event:any, id) {
    if (event.source.selected) {
      setTimeout(() => {
        document.getElementById(id)?.focus();
      }, 100);
    }
  }

  async cmpSelected(event:any, company, type) {
    if (event.source.selected) {
      if (type == 'entry') {
        this.BasicForm.get('Finbook').reset();
        this.FbThreeArr = [];
        this.AllFBList = await this.accService.getFinbook(company.CmpCode, '');
        setTimeout(() => {
          document.getElementById('Finbook')?.focus();
        }, 100);
      } else if (type == 'approve') {
        this.JVApprovalForm.get('finBookName').reset();
        this.JvAprFilterList = [];
        setTimeout(() => {
          document.getElementById('finBookName1')?.focus();
        }, 100);
        this.AllFBList = await this.accService.getFinbook(company.CmpCode, '');
      } else {
        this.viewJVForm.get('finBookName').reset();
        this.viewJVForm.get('costCenter').reset();
        this.FbThreeArr = [];
        this.AllBranchList = [];
        setTimeout(() => {
          document.getElementById('finBookName')?.focus();
        }, 100);
        this.AllFBList = await this.accService.getFinbook(company.CmpCode, '');
      }
    }
  }

  async prodNameSearch(keyValue) {
    this.prodList = await this.accService.ProdNameSearch(keyValue);
  }

  async filterSupliername(keyValue) {
    const api = {
      reqMainreq: 'CNDN_SNSearch',
      Usr: this.global.gUsrid,
      brcode: this.global.gBrcode,
      var1: keyValue,
    };
    this.SupplierNameArr = [];
    this.commonService.reqSendto = 'datareqsarnEleven';
    await this.subs.add(
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

  supplierSelected(event) {
    if (event.source.selected) {
      setTimeout(() => {
        document.getElementById('ContactName')?.focus();
      }, 100);
    }
  }

  tablSelected(event, id, brcode) {
    if (event.source.selected) {
      setTimeout(() => {
        const control = this.VOForm.get('VORows') as FormArray;
        this.TableBrList = [];
        this.ProductForm.get('department').reset();
        document.getElementById(id)?.focus();
        this.loadDeptList(brcode);
        this.getProdCategory('');
      }, 100);
    }
  }

  PCatSelected(event, id) {
    if (event.source.selected) {
      setTimeout(() => {
        this.ProdCatList = [];
        document.getElementById(id)?.focus();
      }, 100);
    }
  }

  deptSelected(event, id) {
    if (event.source.selected) {
      setTimeout(() => {
        document.getElementById(id)?.focus();
      }, 100);
    }
  }
  async loadDeptList(brcode) {
    const api = {
      reqMainreq: 'DutyChartbranchheadload',
      Usr: this.global.gUsrid,
      brcode,

    };
    this.DeptListAll = [];

    this.DeptListAll = await this.accService.gApiCallOne(api, this.global.gApiserver, 'datareqrshFive');

  }

  filterDept(key) {
    if (this.ProductForm.get('location').invalid) {
      this.commonService.openSnackbar('Please enter Location name', 'Ok', 1500);
      return;
    }
    if (typeof this.ProductForm.get('location').value !== 'object') {
      this.commonService.openSnackbar('Please enter valid Location name', 'Ok', 1500);
      return;
    }
    this.DeptList = this.DeptListAll.filter((option) => option.bhname.toLocaleUpperCase().includes(key.toLocaleUpperCase()));
  }

  filterCmp(key) {
    this.CompanyArr = this.CompanyList.filter((option) => option.company.toLocaleUpperCase().includes(key.toLocaleUpperCase()));
  }

  FilterProdCategory(key) {
    if (this.ProductForm.get('location').invalid) {
      this.commonService.openSnackbar('Please enter Location name', 'Ok', 1500);
      return;
    }
    if (typeof this.ProductForm.get('location').value !== 'object') {
      this.commonService.openSnackbar('Please enter valid Location name', 'Ok', 1500);
      return;
    }
    this.ProdCatList = this.ProdCatListALL.filter((option) => option.subcat.toLocaleUpperCase().includes(key.toLocaleUpperCase()));
  }

  displayCmp= (option: { company: any; }) => (option && option.company ? option.company : '');

  displayFb = (option) => (option && option.FbName ? option.FbName : '');



  displayBr = (option) => (option && option.brname ? `${option.brcode} - ${option.brname}` : '');


  displayProd = (option) => (option && option.ProdName ? `${option.ProdCode}-${option.ProdName}` : '');

  displaySuplier = (option) => (option && option.SupName ? `${option.supcode}-${option.SupName}` : '');
 
  ngOnDestroy() {
    this.accService.unsubscribe$.next();
    this.accService.unsubscribe$.complete();
    this.subs.unsubscribe();
    this.dialog.closeAll();
  }

  toggleForm() {
    this.ShowForm = !this.ShowForm;
  }

  toggleFormView() {
    this.ShowViewForm = !this.ShowViewForm;
    if (this.ShowViewForm) {
      this.appHeight = 'calc(100vh - 145px)';
    } else {
      this.appHeight = 'calc(100vh - 85px)';
    }
  }

  toggleFormCr() {
    this.ShowFormCr = !this.ShowFormCr;
  }

  EditAmount(VOFormElement, i) {

  }

  formFieldsResponse(data) {
    const control = this.VOForm.get('VORows') as FormArray;
    control.push(this.initiateVOFormResponse(data));

    this.dataSource = new MatTableDataSource(control.controls);
    this.dataSource._updateChangeSubscription();
    control.updateValueAndValidity();
    this.VOForm.updateValueAndValidity();
  }

  initiateVOFormResponse(data): FormGroup {
    const LObj = {
      BrCodeName: '',
      StatusResponse: 'Success',
      brcode: data.Brcode,
      brname: data.BrName,
    };
    const pObj = {
      ProdCode: data.ProdCode,
      StatusResponse: 'Success',
      ProdName: data.ProdName,
    };
    return this.fb.group({
      location: new FormControl(data.Brcode ? LObj : '', Validators.required),
      department: new FormControl(data.DeptOrSec ?? '', Validators.required),
      productName: new FormControl(data.ProdCode ? pObj : '', Validators.required),
      productType: new FormControl(data.ProdType ?? '', Validators.required),
      Others1: new FormControl(data.ModelName ?? '', Validators.required),
      Others2: new FormControl(data.ModelNo ?? '', Validators.required),
      Others3: new FormControl(data.SerialNo ?? '', Validators.required),
      Others4: new FormControl(data.EngineNo ?? '', Validators.required),
      Others5: new FormControl(data.ChassisNo ?? '', Validators.required),
    });
  }

  formFields(data) {
    const control = this.VOForm.get('VORows') as FormArray;
    control.push(this.initiateVOForm(data));

    this.dataSource = new MatTableDataSource(control.controls);
    this.dataSource._updateChangeSubscription();
    control.updateValueAndValidity();
    this.VOForm.updateValueAndValidity();
  }

  addToTable() {
    if (this.ProductForm.invalid) {
      Swal.fire({ text: 'Please fill required fields in Product Information' });
      return;
    }
    const product = this.ProductForm.value;
    if (typeof product.location !== 'object') {
      Swal.fire({ text: 'Please fill valid Location Name' });
      return;
    }
if(this.editableRow !== null){
  this.TableDataSource[this.editableRow].SNo= this.TableDataSource.length +1,
  this.TableDataSource[this.editableRow].LocationCode= product.location.brcode ,
  this.TableDataSource[this.editableRow].LocationName= product.location.brname,
  this.TableDataSource[this.editableRow].Department= product.department,
  this.TableDataSource[this.editableRow].ProductCategory= product.prodCategory,
  this.TableDataSource[this.editableRow].ProductCode= product.productName.ProdCode?? 0,
  this.TableDataSource[this.editableRow].ProductName= product.productName.ProdName?? product.productName,
  this.TableDataSource[this.editableRow].ProductType= product.productType,
  this.TableDataSource[this.editableRow].Others1= product.Others1,
  this.TableDataSource[this.editableRow].Others2= product.Others2,
  this.TableDataSource[this.editableRow].Others3= product.Others3,
  this.TableDataSource[this.editableRow].Others4= product.Others4,
  this.TableDataSource[this.editableRow].Others5= product.Others5,
  this.TableDataSource[this.editableRow].Description= product.description,
  this.editableRow = null
  this.ProductForm.reset();
  setTimeout(() => {
    document.getElementById('location').focus()
  }, 100);
      }else{
  
        this.TableDataSource.push({
          SNo: this.TableDataSource.length +1,
          LocationCode: product.location.brcode ,
          LocationName: product.location.brname,
          Department: product.department,
          ProductCategory: product.prodCategory,
          ProductCode: product.productName.ProdCode ?? 0,
          ProductName: product.productName.ProdName ?? product.productName,
          ProductType: product.productType,
          Others1: product.Others1,
          Others2: product.Others2,
          Others3: product.Others3,
          Others4: product.Others4,
          Others5: product.Others5,
          Description: product.description,
        });
        this.ProductForm.reset();
        this.editableRow = null;
        setTimeout(() => {
          document.getElementById('location').focus()
        }, 100);
      }
  }

  addRow() {
    this.ShowForm = true;
    this.ShowFormProd = true;
    return;
    if (this.dataSource.data.length > 0) {
      const control = this.VOForm.get('VORows') as FormArray;
      if (control.controls[this.dataSource.data.length - 1].valid) {
        control.push(this.initiateVOForm([]));
        this.dataSource = new MatTableDataSource(control.controls);
        this.dataSource._updateChangeSubscription();
        control.updateValueAndValidity();
        this.VOForm.updateValueAndValidity();
        setTimeout(() => {
          document.getElementById(`location${this.dataSource.data.length - 1}`)?.focus();
        }, 100);
      } else {
        Swal.fire({ text: 'Please fill all data in above row' });
      }
    } else {
      const control = this.VOForm.get('VORows') as FormArray;
      control.push(this.initiateVOForm([]));
      this.dataSource = new MatTableDataSource(control.controls);
      this.dataSource._updateChangeSubscription();
      control.updateValueAndValidity();
      this.VOForm.updateValueAndValidity();
      setTimeout(() => {
        document.getElementById(`location${this.dataSource.data.length - 1}`)?.focus();
      }, 100);
    }
  }

  initiateVOForm(data): FormGroup {

    const LObj = {
      BrCodeName: '',
      StatusResponse: 'Success',
      brcode: data.LocationCode,
      brname: data.LocationName,
    };
    const pObj = {
      ProdCode: data.ProductCode,
      StatusResponse: 'Success',
      ProdName: data.ProductName,
    };
    return this.fb.group({
      location: new FormControl(data.LocationCode ? LObj : '', Validators.required),
      department: new FormControl(data.Department ?? '', Validators.required),
      productName: new FormControl(data.ProductCode ? pObj : '', Validators.required),
      productType: new FormControl(data.ProductType ?? '', Validators.required),
      Others1: new FormControl(data.Others1 ?? '', Validators.required),
      Others2: new FormControl(data.Others2 ?? '', Validators.required),
      Others3: new FormControl(data.Others3 ?? '', Validators.required),
      Others4: new FormControl(data.Others4 ?? '', Validators.required),
      Others5: new FormControl(data.Others5 ?? '', Validators.required),
    });
  }

  deleteTableDate(index, product) {
    
    this.commonService.taskConfirmation(`Are you sure to remove  ${product} ?`, '', true, 'Remove', '').then((res) => {
      if (res.isConfirmed) {
        this.TableDataSource.splice(index, 1);
        // const control = this.VOForm.get('VORows') as FormArray;
        // control.controls.splice(index, 1);
        // this.dataSource = new MatTableDataSource(control.controls);
        // this.VOForm.updateValueAndValidity();
      }
    });
  }

  deleteAll() {
    this.commonService.taskConfirmation('Are you sure to delete all ?', '', true, 'Delete', '').then((res) => {
      if (res.isConfirmed) {
        this.DataSourceReset();
      }
    });
  }

  applyFilterConsolidated(event) {
    this.dataSource.filter = event.trim().toLowerCase();
  }

  openBottomSheet(Template:TemplateRef<any>): void {
    this.bottomSheet.open(Template, {

      disableClose: true,
      panelClass: 'bottomSheetContainer',

    });
    this.ShowForm = false;
    this.ShowFormProd = false;
  }

  headerLoad() {
    this.displayedColumns = [];
    this.displayedArr.forEach((element:any) => {
      if (element.display === true) {
        this.displayedColumns.push(element.name);
      }
    });
  }

  headerLoadAll() {
    this.ShowForm = true;
    this.ShowFormProd = true;
    this.bottomSheet.dismiss();
  }

  async getProdCategory(keyValue) {
    const api = {
      reqMainreq: 'SubcatSearch',
      Usr: this.global.gUsrid,
      brcode: this.global.gBrcode,
      var1: keyValue,
      var2: 'ASSETS',
    };
    this.ProdCatListALL = [];
    const data = await this.accService.gApiCallOne(api, this.global.gApiserver, 'datareqsarnSix');
    if (data.length > 0) {
      this.ProdCatListALL = data;
    }
  }

  async getTrantype() {
    const trnTYpes = await this.accService.getTrantype('AMCMaster');
    if (trnTYpes.length > 0) {
      this.entryTypes = trnTYpes;
      this.viewJVForm?.get('tranType')?.setValue(this.entryTypes[0]);
      this.JVApprovalForm.get('reverseEntry')?.setValue(this.entryTypes[0]);
    } else {
      this.entryTypes = [];
    }
  }


  compareFn(o1: any, o2: any) {
    if (o1 && o2 && o1.brname === o2.brname) {
      return o2;
    } return '';
  }




  changeValue(event: any, input) {
    const allowedKeycodes = [46,48, 49,50,51,52,53,54,55,56,57]; 
    if (!allowedKeycodes.includes(event.keyCode)) {
  event.preventDefault(); 
     return false;
}
    if (event.which === 46 ) {
      return false;
    }
    input = input.replace(/^0+/, '');
    if ( input.length > 9) {
      return false;
    }
    return true;
  }


  XLExportBranchMapTable(tabledata) {
    if (tabledata.length > 0) {
      this.commonService.exportAsExcelFile(tabledata, 'AMC');
    } else {
    Swal.fire({text:'No data to export !'})
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
    this.ShowFormProd = true
    const LObj = {
      BrCodeName: '',
      StatusResponse: 'Success',
      brcode: data.LocationCode,
      brname: data.LocationName,
    };
    const pObj = {
      ProdCode: data.ProductCode,
      StatusResponse: 'Success',
      ProdName: data.ProductName,
    };
    this.ProductForm .reset()
    this.ProductForm = this.fb.group({
      location: [LObj, Validators.required],
      department: [data.Department, Validators.required],
      prodCategory: [data.ProductCategory, Validators.required],
      productName: [pObj, Validators.required],
      productType: [data.ProductType, Validators.required],
      Others1: [data.Others1, Validators.required],
      Others2: [data.Others2, Validators.required],
      Others3: [data.Others3],
      Others4: [data.Others4],
      Others5: [data.Others5],
      description: [data.Description],
    });
    
  }

  hideAutoCompletepanle() {
    const autoComplete = document.getElementsByClassName('gAutoCompleteContainer');
    autoComplete[0]?.classList.remove('mat-autocomplete-visible');
  }

  
  rowClick(index : number) {
    this.selectedRowIndex = index;

    for (let i = 0; i < this.TableDataSource.length; i++) {
      if (i === index) {
        this.classArrTable[i] = true;
      } else {
        this.classArrTable[i] = false;
      }
    }
  }
}
