/* eslint-disable import/no-duplicates */
/* eslint-disable array-callback-return */
/* eslint-disable import/order */
/* eslint-disable max-len */
/* eslint-disable no-console */
/* eslint-disable space-before-blocks */
/* eslint-disable no-param-reassign */
/* eslint-disable import/extensions */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable import/no-unresolved */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-empty-function */
/* eslint-disable no-useless-constructor */
/* eslint-disable import/prefer-default-export */
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder, FormControl, FormGroup, Validators,
} from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { SubSink } from 'subsink';
import { Globals } from '../globals';

import { CommonService } from '../services/common.service';
import { murgnService } from '../services/murgn.service';
import { findColumnValue as _findColumnValue } from 'src/app/services/murgn.service';
import { MatDatepicker } from '@angular/material/datepicker';
// eslint-disable-next-line import/newline-after-import
import moment from 'moment';
import { Moment } from 'moment';
import Swal from 'sweetalert2';
import { AccServiceService } from '../services/acc-service.service';

@Component({
  selector: 'app-table-test',
  templateUrl: './table-test.component.html',
  styleUrls: ['./table-test.component.scss'],
})
export class TableTestComponent implements OnInit {
  public form: FormGroup;

  private subs = new SubSink();

  unsubcribe: any;

  Companyname: any;

  edit = 'edit';

  CurrArr = ['Amount', 'Amount1']

  public fields: any[] = [
    {
      type: 'text',
      name: 'firstName',
      label: 'First Name',
      value: '',
      style: 'col-12 col-md-6 mt-2',
    }, {
      type: 'text',
      name: 'lastName',
      label: 'last Name',
      value: '',
      style: 'col-12 col-md-6 mt-2',
    },
    {
      type: 'date',
      name: 'To Date',
      label: 'To Date',
      value: new Date(),
      style: 'col-12 col-md-6 mt-2',
    },
    // {
    //   type: 'radio',
    //   name: 'Gender',
    //   label: 'Gender',
    //   style: 'col-6 col-md-3 mt-2',
    //   options: [
    //     { key: 'm', label: 'Male' },
    //     { key: 'f', label: 'Female' },
    //   ],
    // },
    // {
    //   type: 'checkbox',
    //   name: 'Skill',
    //   label: 'Skill',

    //   style: 'col-6 col-md-3 mt-2',
    //   options: [
    //     { key: 'Angular', label: 'Angular' },
    //     { key: 'NodeJS', label: 'Node JS' },
    //   ],
    // },
    {
      type: 'autoComplete',
      name: 'BranchName',
      label: 'BranchName',
      defaultFilter: true,
      style: 'col-12 col-md-6 mt-2',
      options: [],
    },
    {
      type: 'dropdown',
      name: 'CompanyName',
      label: 'CompanyName',
      style: 'col-12 col-md-6 mt-2',
      options: [],
    },
    {
      type: 'date',
      name: 'FromData',
      label: 'From Data',

      value: new Date(),
      style: 'col-12 col-md-6 mt-2',
    },
    {
      type: 'autoComplete',
      name: 'BranchNameOne',
      label: 'BranchNameOne',
      defaultFilter: false,
      style: 'col-12 col-md-6 mt-2',
      options: [],
    },
  ];

  firstFormValue: any;

  secondFormValue: any;

  CompanyList: any;

  CurrenyList: any;

  AllBranchList: any;

  ReceiptModeList: any;

  BankCodeList: any;

  AllReceiptRoute: any;

  DivCodeList: any;

  AllFBList: any[];

  ApproveFinbookList: any;

  // ================================== For New Table ===========================================
  maxHeight = 50;

  TableName = 'gNormalTable-md';

  footerRow = ['', '', '', 'total', 'Rs.5000.00'];

  configArr: any[] = [
    // {
    //   name: 'S.No',
    //   display: 'S.No',
    // },
    // {
    //   name: 'CmpCode',
    //   display: 'Company Code',
    // },
    // {
    //   name: 'company',
    //   display: 'Company Name',
    // },
    // {
    //   name: 'Edit',
    //   display: 'Edit',
    // },
    // {
    //   name: 'View',
    //   display: 'View',
    // },
    // {
    //   name: 'Delete',
    //   display: 'Delete',
    // },
    // {
    //   name: 'Amount',
    //   display: 'Amount',
    // },
  ];

  showFooter = true;

  displayedColumns: any[] = this.configArr.map((col) => col.name);

  DataSource = new MatTableDataSource([]);

  loading = true;

  filterValue = '';

  brList: any;

  firstFormGroup = this.fb.group({
    firstCtrl: ['', Validators.required],
  });

  secondFormGroup = this.fb.group({
    secondCtrl: ['', Validators.required],
  });

  isEditable = false;

  //  ================================= For New Table  ========================================

  constructor(
private http: HttpClient,
private global: Globals,
    private commonservice: CommonService,
    private muruganservice: murgnService,
    private accService: AccServiceService,
    private fb: FormBuilder,
  ) {
    this.form = new FormGroup({
      fields: new FormControl(JSON.stringify(this.fields)),
    });
    this.unsubcribe = this.form.valueChanges.subscribe((update) => {
      // console.log(update);
      this.fields = JSON.parse(update.fields);
    });
  }

  async ngOnInit() {
    console.log(this.fields[0].value = 'muurga');

    this.loading = true;
    this.CompanyList = await this.accService.getCompany();
    this.getCmp();
    this.getBr();

    this.CompanyList.forEach((element, index) => {
      element.Amount = 100 * index;
      element.Amount1 = 200 * index;
    });
    this.DataSource = new MatTableDataSource(this.CompanyList);
    const Header = Object.keys(
      this.DataSource.data[0],
    );
    console.log(Header);
    // Header.splice(0, 1);

    this.configArr = Header;

    console.log(this.configArr);

    this.loading = false;
    this.commonApiCalls();
  }

  async commonApiCalls(){
    const ReqJson = {
      reqMainreq: 'CompanyName',
      Usr: this.global.gUsrid,
      brcode: this.global.gBrcode,
    };
    const DynamicApiCall = await this.accService.gApiCallOne(ReqJson, this.global.gApiserver, 'datareqsarnEight');
    console.log(DynamicApiCall);

    const userRights = await this.accService.CheckUserRights('VendorGroup');

    console.log(userRights);

    // const ArrConfirm = await this.accService.gApiCallWithConfirm('Delete', ReqJson, this.global.gApiserver, 'datareqsarnEight');

    // console.log(ArrConfirm);
  }

  async initialAPICalls() {
    this.commonApiCalls();
    this.getCmp();
    this.getBr();
    const CompCode = this.global.gUsrDefultCmpCode;
    const FBCode = this.global.gUsrDefultFbCode;

    this.CompanyList = await this.accService.getCompany();
    this.AllFBList = await this.accService.getFinbook(CompCode, '');
    this.AllBranchList = await this.accService.getFbBasedBranch(CompCode, FBCode, '');
    this.AllReceiptRoute = await this.accService.getReceiptRoute();
    this.ReceiptModeList = await this.accService.getReceiptMode();
    this.BankCodeList = await this.accService.getBankCode(this.AllReceiptRoute[0].ReceiptRoute);
    this.DivCodeList = await this.accService.getDivCode();
    this.CurrenyList = await this.accService.getCurrency();
    this.ApproveFinbookList = await this.accService.getApproveFinbook(CompCode);
    console.log(this.CompanyList);
    console.log(this.AllBranchList);
    console.log(this.AllReceiptRoute);
    console.log(this.ReceiptModeList);
    console.log(this.BankCodeList);
    console.log(this.DivCodeList);
    console.log(this.CurrenyList);
    console.log(this.ApproveFinbookList);
  }

  getCmp() {
    const APIJson = {
      reqMainreq: 'CompanyName',
      Usr: this.global.gUsrid,
      brcode: this.global.gBrcode,
    };

    this.subs.add(this.muruganservice.FinBookView(APIJson).subscribe({
      next: (response) => {
        if (response.length === 0) {
          this.commonservice.openSnackbar('No data available', 'Ok', 2000);
        } else if (response[0].StatusResponse === 'Success') {
          console.log(this.fields[4].options = response, this.fields[4].name);

          this.fields[4].options.forEach((element) => {
            element.key3 = 'company';
          });
          console.log(this.fields[4].options);
        } else {
          this.commonservice.openSnackbar(response[0].StatusResponse, 'Ok', 2000);
        }
      },
      error: (error) => {
        if (error.statusText === 'Unknown Error') {
          this.commonservice.openSnackbar('Server not connected', 'Ok', 2000);
        } else {
          this.commonservice.openSnackbar(error.statusText, 'Ok', 2000);
        }
      },
      complete: () => { },
    }));
    return this.Companyname;
  }

  getBr() {
    const APIJson = {
      reqMainreq: 'Cmpcode_BranchSearch',
      Usr: this.global.gUsrid,
      var1: '',
      var2: 'AABSIPL',
    };

    this.subs.add(this.muruganservice.FinBookView(APIJson).subscribe({
      next: (response) => {
        if (response.length === 0) {
          this.commonservice.openSnackbar('No data available', 'Ok', 2000);
        } else if (response[0].StatusResponse === 'Success') {
          console.log(this.fields[6].options = response, this.fields[6].name);
          this.fields[6].options.forEach((element) => {
            element.key3 = 'brname';
          });
          this.fields[8].options = response;
          this.fields[8].options.forEach((element) => {
            element.key3 = 'brname';
          });
          this.brList = response;
        } else {
          this.commonservice.openSnackbar(response[0].StatusResponse, 'Ok', 2000);
        }
      },
      error: (error) => {
        if (error.statusText === 'Unknown Error') {
          this.commonservice.openSnackbar('Server not connected', 'Ok', 2000);
        } else {
          this.commonservice.openSnackbar(error.statusText, 'Ok', 2000);
        }
      },
      complete: () => { },
    }));
    return this.Companyname;
  }

  onUpload(e) {
    // console.log(e);
  }

  getFields() {
    return this.fields;
  }

  keytab(e: any, fieldName) {
    if (e.key.toLowerCase() === 'enter') {
      if (e.target.value){
        console.log(fieldName);
        const { form } = e.target;
        // console.log(form);

        const index = [...form].indexOf(e.target);
        console.log(form.elements[index + 1]);
        console.log(form.elements[index]);

        const dateattr = form.elements[index + 1].getAttribute('aria-label');
        if (dateattr && dateattr === 'Open calendar'){
          form.elements[index + 2]?.focus();
        } else {
          form.elements[index + 1]?.focus();
        }

        e.preventDefault();
      }
    }
  }

  async autCompleteTrigger(event) {
    // console.log(event);

    const key = event.toLocaleUpperCase();
    const CompCode = this.global.gUsrDefultCmpCode;
    const FBCode = this.global.gUsrDefultFbCode;
    this.fields[3].options = await this.accService.getFbBasedBranch(CompCode, FBCode, event);

    this.fields[3].options.forEach((element) => {
      element.key3 = 'brname';
    });
  }

  formValue = [{
    AccName_UssageName: {
      accCode: '108012', accName: 'AAB Bakery', AcCodeName: 'AAB Bakery-108012', StatusResponse: 'Success',
    },
    Amount: '100',
    FinBookName: { FbCode: 'TNFB', FbName: 'TAMILNADU FB' },
    accountType: 'Account Code',
    costCenter: {
      brcode: '1', brname: 'ADYAR SHOP', BrCodeName: 'ADYAR SHOP-1', StatusResponse: 'Success',
    },
    remarks: 'Account code based',
  },
  ]

  formUssage = [{
    AccName_UssageName: {
      UsageIdCode: 'AAB SWEET & SNACK_0', UsageIdName: 'ADYAR ANANDA BHAVAN SWEETS & SNACKS', UsageCodeName: 'ADYAR ANANDA BHAVAN SWEETS & SNACKS-AAB SWEET & SNACK_0"', StatusResponse: 'Success',
    },
    Amount: '300',
    FinBookName: { FbCode: 'TNFB', FbName: 'TAMILNADU FB' },
    accountType: 'Ussage Ids',
    costCenter: {
      brcode: '1', brname: 'ADYAR SHOP', BrCodeName: 'ADYAR SHOP-1', StatusResponse: 'Success',
    },
    remarks: 'Ussage Id based',
  },
  ]

  creditForm(event) {
    console.log('credit formValue', event.value);
    this.firstFormValue = event.value;
  }

  creditForm1(event) {
    console.log('credit formValue', event.value);
    this.secondFormValue = event.value;
  }

  debitForm(event) {
    console.log('debit formValue', event.value);
  }

  viewchange(){}

  getTotal(amountA, tableArr) {
    let TotalAmt = 0;
    tableArr.forEach((element, index) => {
      if (element[amountA]) {
        TotalAmt += Number(element[amountA]);
      }
    });
    return TotalAmt;
  }

  selectionChange(event){
    console.log(event);
  }

  viewRow(event){
    console.log(event);
  }

  editrow(event){
    console.log(event);
  }

  deleterow(event){
    console.log(event);
  }

  form1 = this.fb.group({
    yearMonth: [moment()],
    date: [moment()],
    defaultDate: [moment()],
  });

  chosenYearHandler(normalizedYear: Moment) {
    const ctrlValue = this.form1.controls.yearMonth.value;
    ctrlValue.year(normalizedYear.year());
    this.form1.controls.yearMonth.setValue(ctrlValue);
  }

  chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.form1.controls.yearMonth.value;
    ctrlValue.month(normalizedMonth.month());
    this.form1.controls.yearMonth.setValue(ctrlValue);
    datepicker.close();
  }
}
