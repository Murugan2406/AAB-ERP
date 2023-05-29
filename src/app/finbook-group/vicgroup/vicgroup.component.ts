/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-param-reassign */
/* eslint-disable max-len */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-empty-function */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-constructor */
/* eslint-disable no-undef */
import {
  animate, style, transition, trigger,
} from '@angular/animations';
import { DatePipe } from '@angular/common';
import {
  Component, OnInit, TemplateRef, ViewChild,
} from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { cloneDeep } from 'lodash';
import { firstValueFrom, Observable } from 'rxjs';
import { Globals } from 'src/app/globals';
import { murgnService } from 'src/app/services/murgn.service';
import { SubSink } from 'subsink';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import moment from 'moment';
import { CommonService } from 'src/app/services/common.service';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatSort } from '@angular/material/sort';

type AOA = any[][];

@Component({
  selector: 'app-vicgroup',
  templateUrl: './vicgroup.component.html',
  styleUrls: ['./vicgroup.component.scss'],
  animations: [
    trigger('enterAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('100ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('0ms', style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class VICGroupComponent implements OnInit {
  mainMenuSelected: string;

  private subs = new SubSink();

  FirstTabName:string;

  SecondTabName:String;

  ThirdTabName:String;

  CampNameOptions = [];

  CampNameOptionsList = [];

  CampNameOptionsListTwo = [];

  CampNameOptionsListThree = [];

  ViewCampNameOptionsListOne = [];

  ViewCampNameOptionsListTwo = [];

  ViewCampNameOptionsListThree = [];

  VGnameListTwo = [];

  VGnameListTwoView = [];

  VGnameListThree = [];

  VGnameListThreeView = [];

  SupplierNameList = [];

  companyName = new FormControl(null, Validators.required);

  finbookName = new FormControl(null, Validators.required);

  finbookNameTwo = new FormControl(null, Validators.required);

  companyNameTwo = new FormControl(null, Validators.required);

  companyNameThree = new FormControl(null, Validators.required);

  VGNameTwo = new FormControl(null, Validators.required);

  VGNameThree = new FormControl(null, Validators.required);

  SupplierName = new FormControl(null, Validators.required);

  EffDateThree = new FormControl(new Date(), Validators.required);

  FinBookThree = new FormControl(null, Validators.required);

  disableDate = new FormControl(new Date(), Validators.required);

  displayedColumns = [];

  displayedColumnsTwo = [];

  displayedColumnsThree = [];

  AcCodeListTwoView = []

  searchTemp = '';

  searchTempTwo = '';

  searchTempThree = '';

  datasource = new MatTableDataSource([]);

  datasourceTwo = new MatTableDataSource([]);

  datasourceThree = new MatTableDataSource([]);

  SuplierMapFilterList = new MatTableDataSource([]);

  viewcmpCode: any;

  VGOptionsList = [];

  HaveAccess: boolean ;

  inputValue: any;

  MapOption = new FormControl('', Validators.required);

  date = new Date();

  datnew = ['SNo', 'supcode', 'SupName'];

  MapFilterdisplayedColumns = ['SNo', 'Action', 'VgName', 'TrnNo', 'TrnType', 'tdate', 'Createdby', 'Createdtime'];

  data = [];

  editableVGId: any;

  invalidbranchCodev = [];

  existingDataSource = [];

  FinBookOptions = [];

  FinBookOptionsView = [];

  FinBookOptionsListTwo = [];

  FinBookOptionsListThree = [];

  pipe: DatePipe = new DatePipe('en-US');

  onlyView: boolean = false;

  TabClickedIndex: number = 0;

  loading:boolean ;

  loadingTwo :boolean;

  loadingThree: boolean;

  groupName:string = '';

  IndName:string = '';

  FinBookOptionsList = [];

  ViewFinBookOptionsList = []

  FinBookOptionsTwo: any[] = [];

  FinBookOptionsTwoPopUp: any[] = [];

  FinBookOptionsListTwoView: any[];

  PaymentOptions:String[] = ['Payable', 'Prepayment', 'Deposits'];

  @ViewChild(MatSort) set matSort(sort: MatSort) {
    this.datasource.sort = sort;
  }

  @ViewChild('table2', { read: MatSort, static: true }) sort2: MatSort;

@ViewChild('table3', { read: MatSort, static: true }) sort3: MatSort;

  CreateMasterForm = this.fbuilder.group({
    campName: ['', Validators.required],
    FbName: ['', Validators.required],
    VgId: ['', Validators.required],
    VgName: ['', Validators.required],
  });

  MapAcVGForm = this.fbuilder.group({
    campName: ['', Validators.required],
    FinBook: ['', Validators.required],
    VgName: ['', Validators.required],
    pytype: [''],
    AcCode: ['', Validators.required],
    payableAccCode: [''],
    AdvAccCode: [''],
    DepAccCode: [''],
    EffDate: [new Date(), Validators.required],
    EffToDate: [new Date()],
  });

  ViewSupplierVGForm = this.fbuilder.group({
    campName: ['', Validators.required],
    finbook: ['', Validators.required],
    VgName: ['', Validators.required],
    viewstartDate: [new Date(this.date.getFullYear(), this.date.getMonth(), 1), Validators.required],
    viewendDate: [new Date(), Validators.required],
  });

  EditThirdTabForm = this.fbuilder.group({
    campName: ['', Validators.required],
    finbook: ['', Validators.required],
    vgName: ['', Validators.required],
    vendor: ['', Validators.required],
    fromDate: [new Date(this.date.getFullYear(), this.date.getMonth(), 1), Validators.required],
    toDate: [new Date(), Validators.required],
  });

  MasterEdit: boolean = false;

  AccMapEdit: boolean = false;

  FinBookOptionsViewThree: any[];

  FbTabThree: any[];

  FbTabThreeView: any[] = [];

  thirdTabEdit: boolean;

  thirdCmpCode: any;

  thirdFbCode: any;

  thirdVGCode: any;

  thirdVendorCode: any;

  viewMoreLoad: boolean = false;

  viewMoreClicked: boolean = false;

  bulkMapNotification: string = '';

  ShowMapInput: boolean = false

  PayableAcCodeListTwoView: any[];

  AdvanceAcCodeListTwoView: any[];

  DepositAcCodeListTwoView: any[];

  toggleForm = true;

  limitData = 500;

  extraAvailable = false;

  FullReport: any[] = [];

  displayedArr:any = [];

  selectedRow: any;

  constructor(
    private global: Globals,
    private router: Router,
    private muruganservice: murgnService,
    private commonservice: CommonService,
    public bottomSheet: MatBottomSheet,
    public dialog: MatDialog,
    private fbuilder: FormBuilder,
    private http: HttpClient,
  ) { }

  ngOnInit() {
    this.mainMenuSelected = this.global.gmainMenuSelected;

    if (this.mainMenuSelected) {
      this.setDefaultValues();
      this.getCompanyname();

      this.initializGmainselected(this.mainMenuSelected);
      this.getBrFinBook('initial', 'initial');
    } else {
      this.router.navigate(['/dashboard']);
    }
    if (this.mainMenuSelected === 'ItemGroup') {
      this.MapAcVGForm.get('payableAccCode').addValidators(Validators.required);
      this.MapAcVGForm.get('AdvAccCode').addValidators(Validators.required);
      this.MapAcVGForm.get('DepAccCode').addValidators(Validators.required);
    } else {
      this.MapAcVGForm.get('payableAccCode').removeValidators(Validators.required);
      this.MapAcVGForm.get('AdvAccCode').removeValidators(Validators.required);
      this.MapAcVGForm.get('DepAccCode').removeValidators(Validators.required);
    }
  }

  setDefaultValues() {
    const cmpObject = {
      company: this.global.gUsrDefultCmpName,
      CmpCode: this.global.gUsrDefultCmpCode,
    };

    const FbObject = {
      FbCode: this.global.gUsrDefultFbCode,
      FbName: this.global.gUsrDefultFbName,
    };

    this.companyName.setValue(cmpObject);
    this.companyNameTwo.setValue(cmpObject);
    this.companyNameThree.setValue(cmpObject);
    this.CreateMasterForm.get('campName').setValue(cmpObject);
    this.MapAcVGForm.get('campName').setValue(cmpObject);
    this.ViewSupplierVGForm.get('campName').setValue(cmpObject);

    this.finbookName.setValue(FbObject);
    this.finbookNameTwo.setValue(FbObject);
    this.FinBookThree.setValue(FbObject);
    this.CreateMasterForm.get('FbName').setValue(FbObject);
    this.MapAcVGForm.get('FinBook').setValue(FbObject);
    this.ViewSupplierVGForm.get('finbook').setValue(FbObject);
  }

  async initializGmainselected(mainMenuSelected:string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'x-api-key': this.global.TmpCdeFedG,
        'content-type': 'application/json',
      }),
    };
    switch (mainMenuSelected) {
      case 'VendorGroup': {
        this.groupName = 'Vendor Group';
        this.IndName = 'Supplier';
        this.FirstTabName = 'Vendor Group Master';

        this.SecondTabName = 'Map Account Code to VendorGroup';

        this.ThirdTabName = 'Map Supplier to VendorGroup';
        this.MapFilterdisplayedColumns = ['SNo', 'Action', 'VgName', 'TrnNo', 'TrnType', 'tdate', 'Createdby', 'Createdtime'];
        const APIJson = {
          reqMainreq: 'UserRights',
          Usr: this.global.gUsrid,
          var1: 'VendorGroup',
        };

        await firstValueFrom(this.http.post<any>(`${this.global.gApiserver}/api/datareqsarnEight`, APIJson, httpOptions)).then((data) => {
          if (data) {
            if (data.length > 0) {
              if (data[0].StatusResponse === 'Success') {
                if (data[0].Permission === 'N') {
                  this.HaveAccess = false;
                } else if (data[0].Permission === 'Y') {
                  this.HaveAccess = true;
                } else {
                  this.HaveAccess = false;
                }
                if (this.HaveAccess) {
                  this.displayedColumns = ['SNo', 'VgId', 'VgName', 'Action'];

                  this.displayedColumnsTwo = ['SNo', 'VgId', 'VgName', 'AcType', 'FromDate', 'AcCode', 'AcName', 'Action'];
                  this.displayedColumnsThree = ['SNo', 'supcode', 'SupName', 'FromDate', 'Action'];
                } else {
                  this.displayedColumns = ['SNo', 'VgId', 'VgName'];

                  this.displayedColumnsTwo = ['SNo', 'VgId', 'VgName', 'AcType', 'AcCode', 'FromDate', 'AcName'];
                  this.displayedColumnsThree = ['SNo', 'supcode', 'SupName', 'FromDate'];
                }
              }
            }
          }
        });
        this.refreshMasterTab('VendorGroupMasterView');

        break;
      }
      case 'ItemGroup': {
        this.groupName = 'Item Group';
        this.IndName = 'Item';
        this.FirstTabName = 'Item Group Master';

        this.SecondTabName = 'Map Account Code to ItemGroup';

        this.ThirdTabName = 'Map Item to ItemGroup';

        this.MapFilterdisplayedColumns = ['SNo', 'Action', 'IgName', 'TrnNo', 'TrnType', 'tdate', 'Createdby', 'Createdtime'];

        const APIJson = {
          reqMainreq: 'UserRights',
          Usr: this.global.gUsrid,
          var1: 'ItemGroup',
        };

        await firstValueFrom(this.http.post<any>(`${this.global.gApiserver}/api/datareqsarnEight`, APIJson, httpOptions)).then((data) => {
          if (data) {
            if (data.length > 0) {
              if (data[0].StatusResponse === 'Success') {
                if (data[0].Permission === 'N') {
                  this.HaveAccess = false;
                } else if (data[0].Permission === 'Y') {
                  this.HaveAccess = true;
                } else {
                  this.HaveAccess = false;
                }
                if (this.HaveAccess) {
                  this.displayedColumns = ['SNo', 'IgCode', 'IgName', 'Action'];
                  this.displayedArr = [
                    {
                      name: 'SNo',
                      display: true,
                      leble: 'SNo',
                    },
                    {
                      name: 'IgCode',
                      leble: 'IG Code',
                      display: true,
                    },
                    {
                      name: 'IgName',
                      leble: 'Ig Name',
                      display: true,
                    },
                    {
                      name: 'AcCode',
                      leble: 'Stock Acc Code',
                      display: true,
                    },
                    {
                      name: 'AcName',
                      leble: 'Stock Acc name',
                      display: true,
                    },
                    {
                      name: 'PayableAcCode',
                      leble: 'PayableAcCode',
                      display: true,
                    },
                    {
                      name: 'PayableAcName',
                      leble: 'PayableAcName',
                      display: true,
                    },
                    {
                      name: 'AdvanceAcCode',
                      leble: 'AdvanceAcCode',
                      display: true,
                    },
                    {
                      name: 'AdvanceAcName',
                      leble: 'AdvanceAcName',
                      display: true,
                    },
                    {
                      name: 'DepositsAcCode',
                      leble: 'DepositsAcCode',
                      display: true,
                    },
                    {
                      name: 'DepositsAcName',
                      leble: 'DepositsAcName',
                      display: true,
                    },
                    {
                      name: 'FromDate',
                      leble: 'FromDate',
                      display: true,
                    },
                    {
                      name: 'Action',
                      leble: 'Action',
                      display: true,
                    },
                  ];
                  this.displayedColumnsTwo = ['SNo', 'IgCode', 'IgName', 'AcCode', 'AcName', 'PayableAcCode', 'PayableAcName', 'AdvanceAcCode', 'AdvanceAcName', 'DepositsAcCode', 'DepositsAcName', 'FromDate', 'Action'];
                  this.displayedColumnsThree = ['SNo', 'Icode', 'Iname', 'FromDate', 'Action'];
                } else {
                  this.displayedColumns = ['SNo', 'IgCode', 'IgName'];
                  this.displayedArr = [
                    {
                      name: 'SNo',
                      display: true,
                      leble: 'SNo',
                    },
                    {
                      name: 'IgCode',
                      leble: 'IG Code',
                      display: true,
                    },
                    {
                      name: 'IgName',
                      leble: 'Ig Name',
                      display: true,
                    },
                    {
                      name: 'AcCode',
                      leble: 'Stock Acc Code',
                      display: true,
                    },
                    {
                      name: 'AcName',
                      leble: 'Stock Acc name',
                      display: true,
                    },
                    {
                      name: 'PayableAcCode',
                      leble: 'PayableAcCode',
                      display: true,
                    },
                    {
                      name: 'PayableAcName',
                      leble: 'PayableAcName',
                      display: true,
                    },
                    {
                      name: 'AdvanceAcCode',
                      leble: 'AdvanceAcCode',
                      display: true,
                    },
                    {
                      name: 'AdvanceAcName',
                      leble: 'AdvanceAcName',
                      display: true,
                    },
                    {
                      name: 'DepositsAcCode',
                      leble: 'DepositsAcCode',
                      display: true,
                    },
                    {
                      name: 'DepositsAcName',
                      leble: 'DepositsAcName',
                      display: true,
                    },
                    {
                      name: 'FromDate',
                      leble: 'FromDate',
                      display: true,
                    },
                  ];
                  this.displayedColumnsTwo = ['SNo', 'IgCode', 'IgName', 'AcCode', 'AcName', 'PayableAcCode', 'PayableAcName', 'AdvanceAcCode', 'AdvanceAcName', 'DepositsAcCode', 'DepositsAcName', 'FromDate'];
                  this.displayedColumnsThree = ['SNo', 'Icode', 'Iname', 'FromDate'];
                }
                this.refreshMasterTab('ItemGroupMasterView');
                this.loadAcCodeToVGdata();
              }
            }
          }
        });

        break;
      }
      case 'CustomerGroup': {
        this.groupName = 'Customer Group';
        this.IndName = 'Customer';
        this.FirstTabName = 'Customer Group Master';

        this.SecondTabName = 'Map Account Code to CustomerGroup';

        this.ThirdTabName = 'Map Customer to CustomerGroup';
        this.MapFilterdisplayedColumns = ['SNo', 'Action', 'CgName', 'TrnNo', 'TrnType', 'tdate', 'Createdby', 'Createdtime'];

        const APIJson = {
          reqMainreq: 'UserRights',
          Usr: this.global.gUsrid,
          var1: 'CustomerGroup',
        };

        await firstValueFrom(this.http.post<any>(`${this.global.gApiserver}/api/datareqsarnEight`, APIJson, httpOptions)).then((data) => {
          if (data) {
            if (data.length > 0) {
              if (data[0].StatusResponse === 'Success') {
                if (data[0].Permission === 'N') {
                  this.HaveAccess = false;
                } else if (data[0].Permission === 'Y') {
                  this.HaveAccess = true;
                } else {
                  this.HaveAccess = false;
                }
                if (this.HaveAccess) {
                  this.displayedColumns = ['SNo', 'CgCode', 'CgName', 'Action'];
                  this.displayedColumnsTwo = ['SNo', 'CgCode', 'CgName', 'FromDate', 'AcCode', 'AcName', 'Action'];
                  this.displayedColumnsThree = ['SNo', 'supcode', 'SupName', 'FromDate', 'Action'];
                } else {
                  this.displayedColumns = ['SNo', 'CgCode', 'CgName'];
                  this.displayedColumnsTwo = ['SNo', 'AcCode', 'AcName', 'FromDate'];
                  this.displayedColumnsThree = ['SNo', 'supcode', 'SupName', 'FromDate'];
                }
                this.refreshMasterTab('CustomerGroupView');
              }
            }
          }
        });

        break;
      }
      default: {
        this.router.navigate(['/dashboard']);
        break;
      }
    }
  }

  // ===================================================================================================================================
  //                                      Vendor group master
  // ===================================================================================================================================

  CmpSelected = (event:any, type:string) => {
    if (event.source.selected) {
      setTimeout(() => {
        if (type === 'inputs') {
          this.FinBookOptionsList = [];

          this.getBrFinBook('One', type);
          this.finbookName.reset();
          this.CampNameOptionsList = [];
          this.datasource = new MatTableDataSource([]);
          setTimeout(() => {
            document.getElementById('brFB').focus();
          }, 100);

          this.CreateMasterForm.get('campName').setValue(this.companyName.value);
        } else {
          this.ViewFinBookOptionsList = [];

          this.CreateMasterForm.get('FbName').reset();
          document.getElementById('FbName').focus();
          this.getBrFinBook('One', type);
          if (this.TabClickedIndex === 2) {
            this.submitMapSupVgDialog('change');
          }
        }
      }, 100);
    }
  }

  refreshMasterTab = (mastername:string) => {
    if (this.muruganservice.checkValidity(this.companyName)
      && this.muruganservice.checkTypeValitity(this.companyName.value, 'Company Name')
      && this.muruganservice.checkValidity(this.finbookName)
      && this.muruganservice.checkTypeValitity(this.finbookName.value, 'Finance book')) {
      this.LoadMasterValue(mastername);
    }
  }

  LoadMasterValue = (groupName:string) => {
    const APIJson = {
      reqMainreq: groupName,
      var1: this.companyName.value.CmpCode,
      var2: this.finbookName.value.FbCode,
    };
    if (this.loading) {
      return;
    }
    this.loading = true;
    this.datasource.data = [];
    this.subs.add(this.muruganservice.VendorGroupApi(APIJson).subscribe({
      next: (response) => {
        if (response.length === 0) {
          setTimeout(() => {
            this.loading = false;
            this.muruganservice.openSnackBar('No data available');
          }, 100);
        } else if (response[0].StatusResponse === 'Success') {
          setTimeout(() => {
            this.loading = false;
            this.datasource.data = response;
          }, 100);
        } else {
          this.loading = false;
          this.muruganservice.openSnackBar(response[0].StatusResponse);
        }
      },
      error: (error) => {
        this.loading = false;
        if (error.statusText === 'Unknown Error') {
          this.muruganservice.openSnackBar('Server not connected');
        } else {
          this.muruganservice.openSnackBar(error.statusText);
        }
      },
      complete: () => { this.loading = false; },
    }));
  }

  submitMasterCreateDialog = (action: string) => {
    const cmp = this.CreateMasterForm;
    const cmpValue = this.CreateMasterForm.get('campName').value;
    const fbValue = this.CreateMasterForm.get('FbName').value;
    if (this.muruganservice.checkValidity(cmp) && this.muruganservice.checkTypeValitity(cmpValue, 'Company Name')
    && this.muruganservice.checkTypeValitity(fbValue, 'Finance Book')) {
      let tileAction:String;
      action === 'Create' ? tileAction = 'save' : tileAction = 'update';
      Swal.fire({

        title: `Are you sure to ${tileAction}?`,

        icon: 'warning',

        showCancelButton: true,

        confirmButtonColor: '#3085d6',

        cancelButtonColor: '#d33',

        confirmButtonText: 'Yes, Save it!',

      }).then((result) => {
        if (result.isConfirmed) {
          let APIJson;
          switch (this.mainMenuSelected) {
            case 'VendorGroup': {
              APIJson = {
                reqMainreq: 'S@/VendorGroupSave/E@',
                usr: this.global.gUsrid,
                getList: {
                  CmpCode: this.CreateMasterForm.get('campName').value.CmpCode,
                  FbCode: this.CreateMasterForm.get('FbName').value.FbCode,
                  VgId: this.CreateMasterForm.get('VgId').value || this.editableVGId,
                  VgName: this.CreateMasterForm.get('VgName').value,
                },
              };
              break;
            }

            case 'ItemGroup': {
              APIJson = {
                reqMainreq: 'S@/ItemGroupSave/E@',
                usr: this.global.gUsrid,
                brcode: this.global.gBrcode,
                getList: [{
                  CmpCode: this.CreateMasterForm.get('campName').value.CmpCode,
                  FbCode: this.CreateMasterForm.get('FbName').value.FbCode,
                  IgCode: this.CreateMasterForm.get('VgId').value || this.editableVGId,
                  IgName: this.CreateMasterForm.get('VgName').value,
                }],
              };
              break;
            }
            default: {
              APIJson = {
                reqMainreq: 'S@/CustomerGroupSave/E@',
                usr: this.global.gUsrid,
                brcode: this.global.gBrcode,
                getList: [{
                  CmpCode: this.CreateMasterForm.get('campName').value.CmpCode,
                  FbCode: this.CreateMasterForm.get('FbName').value.FbCode,
                  CgCode: this.CreateMasterForm.get('VgId').value || this.editableVGId,
                  CgName: this.CreateMasterForm.get('VgName').value,
                }],
              };
              break;
            }
          }

          this.subs.add(this.muruganservice.VendorGroupSaveApi(APIJson).subscribe({
            next: (response) => {
              this.dialog.closeAll();
              if (response.length === 0) {
                this.muruganservice.openSnackBar('No data available');
              } else if (response[0].StatusResponse === 'Success') {
                if (action === 'Create') {
                  this.muruganservice.openSnackBar('New record(s) saved succesfully');
                } else {
                  this.muruganservice.openSnackBar('Changes Updated succesfully');
                }
                if (this.mainMenuSelected === 'CustomerGroup') {
                  this.LoadMasterValue(`${this.mainMenuSelected}View`);
                } else {
                  this.LoadMasterValue(`${this.mainMenuSelected}MasterView`);
                }
              } else {
                this.muruganservice.openSnackBar(response[0].StatusResponse);
              }
            },
            error: (error) => {
              this.dialog.closeAll();
              if (error.statusText === 'Unknown Error') {
                this.muruganservice.openSnackBar('Server not connected');
              } else {
                this.muruganservice.openSnackBar(error.statusText);
              }
            },
            complete: () => { },
          }));
        }
      });
    }
  }

  editMasterTable = (row:Object | any, createVendorGroup: TemplateRef<any>) => {
    this.MasterEdit = true;
    const cmpObject = {
      company: row.CmpName,
      CmpCode: row.CmpCode,
    };
    const FbObject = {
      FbCode: row.FbCode,
      FbName: row.FbName,
    };

    this.editableVGId = row.VgId || row.IgCode;
    this.CreateMasterForm.get('campName').setValue(cmpObject);
    this.CreateMasterForm.get('VgId').setValue(row.VgId || row.IgCode || row.CgCode);
    this.CreateMasterForm.get('FbName').setValue(FbObject);
    this.CreateMasterForm.get('VgId').disable();
    this.CreateMasterForm.get('VgName').setValue(row.VgName || row.IgName || row.CgName);
    this.openCreateDialog(createVendorGroup, 'Edit');
  }

  checkcmpselected(key) {
    if (this.companyName.invalid) {
      this.muruganservice.openSnackBar('Please choose company name');
      return;
    } if (typeof this.companyName.value !== 'object') {
      this.muruganservice.openSnackBar('Please enter valid company name');
      return;
    }
    key = key.toLocaleUpperCase();

    const startsWithN = this.FinBookOptions.filter((option) => option.FbName.toLocaleUpperCase().includes(key));
    this.FinBookOptionsList = startsWithN;
  }

  checkcmpselectedMC(key) {
    if (this.CreateMasterForm.get('campName').invalid) {
      this.muruganservice.openSnackBar('Please choose company name');
      return;
    } if (typeof this.CreateMasterForm.get('campName').value !== 'object') {
      this.muruganservice.openSnackBar('Please enter valid company name');
      return;
    }
    key = key.toLocaleUpperCase();

    const startsWithN = this.FinBookOptionsView.filter((option) => option.FbName.toLocaleUpperCase().includes(key));
    this.ViewFinBookOptionsList = startsWithN;
  }

  checkcmpselectedTwo(key, type) {
    if (this.companyNameTwo.invalid) {
      this.muruganservice.openSnackBar('Please choose company name');
      return;
    } if (typeof this.companyNameTwo.value !== 'object') {
      this.muruganservice.openSnackBar('Please enter valid company name');
      return;
    }

    key = key.toLocaleUpperCase();
    if (type === 'inputs') {
      const startsWithN = this.FinBookOptionsTwo.filter((option) => option.FbName.toLocaleUpperCase().includes(key));
      this.FinBookOptionsListTwo = startsWithN;
    } else {
      const startsWithN = this.FinBookOptionsTwoPopUp.filter((option) => option.FbName.toLocaleUpperCase().includes(key));
      this.FinBookOptionsListTwoView = startsWithN;
    }
  }

  getBrFinBook(tabNumber, type) {
    let cmpCode = '';
    if (tabNumber === 'One') {
      if (type === 'inputs') {
        cmpCode = this.companyName.value.CmpCode;
        this.FinBookOptions = [];
      } else {
        cmpCode = this.CreateMasterForm.get('campName').value.CmpCode;
        this.FinBookOptionsView = [];
      }
    } else if (tabNumber === 'Two') {
      if (type === 'inputs') {
        cmpCode = this.companyNameTwo.value.CmpCode;
        this.FinBookOptionsTwo = [];
      } else {
        cmpCode = this.MapAcVGForm.get('campName').value.CmpCode;
        this.FinBookOptionsTwoPopUp = [];
      }
    } else if (tabNumber === 'Three') {
      if (type === 'inputs') {
        cmpCode = this.companyNameThree.value.CmpCode;
        this.FinBookOptionsListThree = [];
        this.FbTabThree = [];
        this.FinBookThree.reset();
      } else {
        cmpCode = this.CreateMasterForm.get('campName').value.CmpCode;
        this.FinBookOptionsViewThree = [];
      }
    } else if (tabNumber === 'initial') {
      cmpCode = this.global.gUsrDefultCmpCode;
      this.FinBookOptions = [];
      this.FinBookOptionsView = [];
      this.FinBookOptionsTwo = [];
      this.FinBookOptionsTwoPopUp = [];
      this.FinBookOptionsListThree = [];
      this.FinBookOptionsViewThree = [];
    }

    const APIJson = {
      reqMainreq: 'FinBookSearch',
      Usr: this.global.gUsrid,
      brcode: this.global.gBrcode,
      var1: '',
      var2: cmpCode,
    };

    this.subs.add(this.muruganservice.FinBookView(APIJson).subscribe({
      next: (response) => {
        if (response.length === 0) {
          this.muruganservice.openSnackBar('No finbook available for selected company');
        } else if (response[0].StatusResponse === 'Success') {
          if (tabNumber === 'One') {
            if (type === 'inputs') {
              this.FinBookOptions = response;
              document.getElementById('brFB')?.focus();
            } else {
              this.FinBookOptionsView = response;
              document.getElementById('FbName1')?.focus();
            }
          } else if (tabNumber === 'Two') {
            if (type === 'inputs') {
              this.FinBookOptionsTwo = response;
            } else {
              this.FinBookOptionsTwoPopUp = response;
            }
          } else if (tabNumber === 'Three') {
            if (type === 'inputs') {
              this.FinBookOptionsListThree = response;
            } else {
              this.FinBookOptionsViewThree = response;
            }
          } else if (tabNumber === 'initial') {
            this.FinBookOptions = response;
            this.FinBookOptionsView = response;
            this.FinBookOptionsTwo = response;
            this.FinBookOptionsTwoPopUp = response;
            this.FinBookOptionsListTwo = response;
            this.FinBookOptionsListTwoView = response;
            this.FinBookOptionsListThree = response;
            this.FinBookOptionsViewThree = response;
          }
        } else {
          this.muruganservice.openSnackBar(response[0].StatusResponse);
        }
      },
      error: (error) => {
        this.muruganservice.openSnackBar(error.statusText);
      },
      complete: () => {},
    }));
  }

  brFbSelected(event, FbCode, type) {
    if (event.source.selected) {
      setTimeout(() => {
        if (type === 'inputs') {
          if (this.mainMenuSelected === 'CustomerGroup') {
            this.refreshMasterTab(`${this.mainMenuSelected}View`);
          } else {
            this.refreshMasterTab(`${this.mainMenuSelected}MasterView`);
          }
        } else {
          document.getElementById('vgCode')?.focus();
        }
      }, 100);
    }
  }

  masterReload(MasteTabName) {
    this.refreshMasterTab(`${MasteTabName}MasterView`);
  }

  // =================================================================================================================================
  //                                      Vendor group map to account code
  // =================================================================================================================================

  FbSelectedTwo(event, FbCode, type) {
    if (event.source.selected) {
      setTimeout(() => {
        if (type === 'inputs') {
          this.FinBookOptionsListTwo = [];
          if (this.mainMenuSelected === 'CustomerGroup') {
            this.loadAcCodeToVGdata();
          } else {
            this.loadAcCodeToVGdata();
          }
        } else {
          document.getElementById('vgCodeView')?.focus();
          this.MapAcVGForm.get('VgName').reset();
          this.VGnameListTwoView = [];
          this.MapAcVGForm.get('AcCode').reset();
          this.AcCodeListTwoView = [];
        }
      }, 100);
    }
  }

  MapcmpSelected = (event:any, type:String) => {
    if (event.source.selected) {
      setTimeout(() => {
        if (type === 'inputs') {
          this.CampNameOptionsListTwo = [];

          this.datasourceTwo.data = [];
          this.finbookNameTwo.reset();
          this.FinBookOptionsListTwo = [];
          this.getBrFinBook('Two', 'inputs');
          document.getElementById('fbookTwo').focus();
        } else {
          this.MapAcVGForm.get('FinBook').reset();

          this.MapAcVGForm.get('VgName').reset();
          this.MapAcVGForm.get('AcCode').reset();
          this.FinBookOptionsListTwoView = [];
          this.VGnameListTwoView = [];
          this.AcCodeListTwoView = [];
          this.getBrFinBook('Two', 'view');
          document.getElementById('fbookTwoView').focus();
        }
      }, 100);
    }
  }

  filterVGName = (keyValue :String, type:String) => {
    if (type === 'inputs') {
      if (this.muruganservice.checkValidity(this.companyNameTwo)
        && this.muruganservice.checkTypeValitity(this.companyNameTwo.value, 'Company Name')) {
        this.LoadVGNameList(keyValue, type, 'two');
      }
    } else if (this.muruganservice.checkValidity(this.MapAcVGForm.get('campName'))
      && this.muruganservice.checkTypeValitity(this.MapAcVGForm.get('campName').value, 'Company Name')
      && this.muruganservice.checkValidity(this.MapAcVGForm.get('FinBook'))
      && this.muruganservice.checkTypeValitity(this.MapAcVGForm.get('FinBook').value, 'Finbook Name')) {
      this.LoadVGNameList(keyValue, type, 'two', this.MapAcVGForm.get('FinBook').value.FbCode);
    }
  }

  filterVGNameThree= (keyValue :String, type:String) => {
    if (type === 'inputs') {
      if (this.muruganservice.checkValidity(this.companyNameThree)
        && this.muruganservice.checkTypeValitity(this.companyNameThree.value, 'Company Name')
        && this.muruganservice.checkValidity(this.FinBookThree)
        && this.muruganservice.checkTypeValitity(this.FinBookThree.value, 'Finbook Name')) {
        this.LoadVGNameList(keyValue, type, 'three', this.FinBookThree.value.FbCode);
      }
    } else if (this.muruganservice.checkValidity(this.ViewSupplierVGForm.get('campName'))
      && this.muruganservice.checkTypeValitity(this.ViewSupplierVGForm.get('campName').value, 'Company Name')
      && this.muruganservice.checkValidity(this.ViewSupplierVGForm.get('finbook'))
      && this.muruganservice.checkTypeValitity(this.ViewSupplierVGForm.get('finbook').value, 'fiance book Name')) {
      this.LoadVGNameList(keyValue, type, 'three', this.ViewSupplierVGForm.get('finbook').value.FbCode);
    }
  }

  LoadVGNameList = (keyValue:String, type:String, tabIndex:String, fbCode?:any) => {
    const APIJson = {
      reqMainreq: `${this.mainMenuSelected}NameSearch`,
      Usr: this.global.gUsrid,
      brcode: this.global.gBrcode,
      var1: keyValue,
      var2: this.companyNameTwo.value.CmpCode,
      var3: fbCode,
    };
    if (this.mainMenuSelected === 'CustomerGroup') {
      APIJson.reqMainreq = 'CustomerGroupSearch';
    }
    if (tabIndex === 'two') {
      if (type === 'inputs') {
        this.VGnameListTwo = [];
        APIJson.var2 = this.companyNameTwo.value.CmpCode;
      } else {
        this.VGnameListTwoView = [];
        APIJson.var2 = this.MapAcVGForm.get('campName').value.CmpCode;
      }
    } else if (tabIndex === 'three') {
      if (type === 'inputs') {
        this.VGnameListThree = [];
        APIJson.var2 = this.companyNameThree.value.CmpCode;
      } else {
        this.VGnameListThreeView = [];
        APIJson.var2 = this.ViewSupplierVGForm.get('campName').value.CmpCode;
      }
    }
    let newObs$:Observable<any>;
    if (this.mainMenuSelected === 'VendorGroup' || this.mainMenuSelected === 'CustomerGroup') {
      newObs$ = this.muruganservice.VendorGroupApi(APIJson);
    } else {
      newObs$ = this.muruganservice.FinBookView(APIJson);
    }
    this.subs.add(newObs$.subscribe({
      next: (response) => {
        if (response.length === 0) {
          this.muruganservice.openSnackBar('No data available');
        } else if (response[0].StatusResponse === 'Success') {
          if (tabIndex === 'two') {
            if (type === 'inputs') {
              this.VGnameListTwo = response;
            } else {
              this.VGnameListTwoView = response;
            }
          } else if (tabIndex === 'three') {
            if (type === 'inputs') {
              this.VGnameListThree = response;
            } else {
              let allFinbok;
              if (this.mainMenuSelected === 'CustomerGroup') {
                allFinbok = [{
                  CgCode: 'All',
                  CgName: 'All',
                  StatusResponse: 'Success',
                }];
              } else if (this.mainMenuSelected === 'ItemGroup') {
                allFinbok = [{
                  IgCode: 'All',
                  IgName: 'All',
                  StatusResponse: 'Success',
                }];
              } else if (this.mainMenuSelected === 'VendorGroup') {
                allFinbok = [{
                  VgId: 'All',
                  VgName: 'All',
                  StatusResponse: 'Success',
                }];
              }
              response.forEach((element) => {
                allFinbok.push(element);
              });
              this.VGnameListThreeView = allFinbok;
            }
          }
        } else {
          this.muruganservice.openSnackBar(response[0].StatusResponse);
        }
      },
      error: (error) => {
        if (error.statusText === 'Unknown Error') {
          this.muruganservice.openSnackBar('Server not connected');
        } else {
          this.muruganservice.openSnackBar(error.statusText);
        }
      },
      complete: () => { },
    }));
  }

  filterAcCode= (keyValue :String, type:String, level) => {
    if (type === 'view') {
      if (this.muruganservice.checkValidity(this.MapAcVGForm.get('campName'))
        && this.muruganservice.checkTypeValitity(this.MapAcVGForm.get('campName').value, 'Company Name')
        && this.muruganservice.checkValidity(this.MapAcVGForm.get('FinBook'))
        && this.muruganservice.checkTypeValitity(this.MapAcVGForm.get('FinBook').value, 'Finbook Name')) {
        this.LoadAcCodeList(keyValue, level);
      }
    }
  }

  LoadAcCodeList = (keyValue:String, level) => {
    const APIJson = {
      reqMainreq: 'AccSearchBasedOnFB',
      Usr: this.global.gUsrid,
      brcode: this.global.gBrcode,
      var1: keyValue,
      var2: this.MapAcVGForm.get('campName').value.CmpCode,
      var3: this.MapAcVGForm.get('FinBook').value.FbCode,
    };
    if (level === 'normal') {
      this.AcCodeListTwoView = [];
    } else if (level === 'payable') {
      this.PayableAcCodeListTwoView = [];
    } else if (level === 'advance') {
      this.AdvanceAcCodeListTwoView = [];
    } else if (level === 'deposit') {
      this.DepositAcCodeListTwoView = [];
    }
    this.subs.add(this.muruganservice.FinBookView(APIJson).subscribe({
      next: (response) => {
        if (response.length === 0) {
          this.muruganservice.openSnackBar('No data available');
        } else if (response[0].StatusResponse === 'Success') {
          if (level === 'normal') {
            this.AcCodeListTwoView = response;
          } else if (level === 'payable') {
            this.PayableAcCodeListTwoView = response;
          } else if (level === 'advance') {
            this.AdvanceAcCodeListTwoView = response;
          } else if (level === 'deposit') {
            this.DepositAcCodeListTwoView = response;
          }
        } else {
          this.muruganservice.openSnackBar(response[0].StatusResponse);
        }
      },
      error: (error) => {
        if (error.statusText === 'Unknown Error') {
          this.muruganservice.openSnackBar('Server not connected');
        } else {
          this.muruganservice.openSnackBar(error.statusText);
        }
      },
      complete: () => { },
    }));
  }

  vgnameThreeselected = (event:any, type:String) => {
    if (event.source.selected) {
      setTimeout(() => {
        this.VGnameListThree = [];
        type === 'inputs' ? this.loadThirdTabData() : document.getElementById('AcCode')?.focus();
      }, 100);
    }
  }

  loadAcCodeToVGdata = () => {
    if (this.companyNameTwo.valid) {
      const APIJson = {
        reqMainreq: `${this.mainMenuSelected}ToAcCodeView`,
        usr: this.global.gUsrid,
        brcode: this.global.gBrcode,
        var1: this.companyNameTwo.value.CmpCode,
        var2: this.finbookNameTwo.value.FbCode,
      };
      this.datasourceTwo.data = [];
      if (this.loadingTwo) {
        return;
      }
      this.loadingTwo = true;
      let newObs$:Observable<any>;
      if (this.mainMenuSelected === 'VendorGroup' || this.mainMenuSelected === 'CustomerGroup') {
        newObs$ = this.muruganservice.VendorGroupApi(APIJson);
      } else {
        newObs$ = this.muruganservice.FinBookView(APIJson);
      }

      this.subs.add(newObs$.subscribe({
        next: (response) => {
          if (response.length === 0) {
            this.loadingTwo = false;
            this.muruganservice.openSnackBar('No data available');
          } else if (response[0].StatusResponse === 'Success') {
            this.loadingTwo = false;
            this.datasourceTwo.data = response;
          } else {
            this.loadingTwo = false;
            this.muruganservice.openSnackBar(response[0].StatusResponse);
          }
        },
        error: (error) => {
          this.loadingTwo = false;
          if (error.statusText === 'Unknown Error') {
            this.muruganservice.openSnackBar('Server not connected');
          } else {
            this.muruganservice.openSnackBar(error.statusText);
          }
        },
        complete: () => { this.loadingTwo = false; },
      }));
    }
  }

  mapOptionChoosed() {
    if (this.viewMoreClicked) {
      this.loadThirdTabData();
    }
  }

  loadThirdTabData = () => {
    if (this.companyNameThree.valid && this.FinBookThree.valid && this.VGNameThree.valid) {
      this.viewMoreClicked = false;
      let APIJson;
      let newObs$ : Observable<any>;
      switch (this.mainMenuSelected) {
        case 'VendorGroup': {
          APIJson = {
            reqMainreq: 'Overall_VendorToVendorGroup',
            Usr: this.global.gUsrid,
            brcode: this.global.gBrcode,
            var1: this.companyNameThree.value.CmpCode,
            var2: this.VGNameThree.value.VgId,
            var3: this.FinBookThree.value.FbCode,
          };
          newObs$ = this.muruganservice.VendorGroupApi(APIJson);
          break;
        }
        case 'ItemGroup': {
          APIJson = {
            reqMainreq: 'Overall_ItemToItemGroupView',
            Usr: this.global.gUsrid,
            brcode: this.global.gBrcode,
            var1: this.companyNameThree.value.CmpCode,
            var2: this.VGNameThree.value.IgCode,
            var3: this.FinBookThree.value.FbCode,
          };
          newObs$ = this.muruganservice.FinBookView(APIJson);
          break;
        }
        case 'CustomerGroup': {
          APIJson = {
            reqMainreq: 'Overall_CustomerToCustomerGroupView',
            Usr: this.global.gUsrid,
            brcode: this.global.gBrcode,
            var1: this.companyNameThree.value.CmpCode,
            var2: this.VGNameThree.value.CgCode,
            var3: this.FinBookThree.value.FbCode,
          };
          newObs$ = this.muruganservice.VendorGroupApi(APIJson);
          break;
        }
        default: {
          break;
        }
      }
      this.FullReport = [];
      this.extraAvailable = false;
      this.datasourceThree.data = [];
      this.onlyView = false;
      if (this.viewMoreLoad) {
        return;
      }
      this.viewMoreLoad = true;
      this.subs.add(newObs$.subscribe({
        next: (response) => {
          if (response.length === 0) {
            this.viewMoreLoad = false;
            this.muruganservice.openSnackBar('No data available');
          } else if (response[0].StatusResponse === 'Success') {
            if (response.length > this.limitData) {
              this.extraAvailable = true;
            }
            this.datasourceThree.data = [...response].splice(0, this.limitData);

            this.FullReport = [...response];
            this.viewMoreLoad = false;
          } else {
            this.viewMoreLoad = false;
            this.muruganservice.openSnackBar(response[0].StatusResponse);
          }
        },
        error: (error) => {
          this.viewMoreLoad = false;
          if (error.statusText === 'Unknown Error') {
            this.muruganservice.openSnackBar('Server not connected');
          } else {
            this.muruganservice.openSnackBar(error.statusText);
          }
        },
        complete: () => { this.viewMoreLoad = false; },
      }));
    }
  }

  submitMapAcVgDialog = () => {
    if (this.mainMenuSelected === 'VendorGroup') {
      this.MapAcVGForm.get('pytype').addValidators(Validators.required);
    } else {
      this.MapAcVGForm.get('pytype').removeValidators(Validators.required);
    }
    if (this.mainMenuSelected === 'ItemGroup') {
      this.MapAcVGForm.get('payableAccCode').addValidators(Validators.required);
      this.MapAcVGForm.get('AdvAccCode').addValidators(Validators.required);
      this.MapAcVGForm.get('DepAccCode').addValidators(Validators.required);
    } else {
      this.MapAcVGForm.get('payableAccCode').removeValidators(Validators.required);
      this.MapAcVGForm.get('AdvAccCode').removeValidators(Validators.required);
      this.MapAcVGForm.get('DepAccCode').removeValidators(Validators.required);
    }

    if (this.MapAcVGForm.valid) {
      if (this.mainMenuSelected !== 'ItemGroup') {
        if (this.muruganservice.checkTypeValitity(this.MapAcVGForm.get('campName').value, 'Company name')
        && this.muruganservice.checkTypeValitity(this.MapAcVGForm.get('FinBook').value, 'Finance book name')
        && this.muruganservice.checkTypeValitity(this.MapAcVGForm.get('VgName').value, `${this.groupName} name`)
        && this.muruganservice.checkTypeValitity(this.MapAcVGForm.get('AcCode').value, 'Account code')) {
          if (this.companyNameTwo.value.CmpCode === this.MapAcVGForm.get('campName').value.CmpCode) {
            switch (this.mainMenuSelected) {
              case 'VendorGroup': {
                let existArr = [];
                existArr = this.datasourceTwo.data.filter((data) => data.VgId === this.MapAcVGForm.get('VgName').value.VgId
              && data.AcType === this.MapAcVGForm.get('pytype').value);
                if (existArr.length > 0) {
                  this.muruganservice.openSnackBarWithDuration('This Vendor group already mapped With Account Code', 10000);
                  return;
                }
                break;
              }

              case 'ItemGroup': {
                const existArr = this.datasourceTwo.data.filter((data) => data.IgCode === this.MapAcVGForm.get('VgName').value.IgCode);
                if (existArr.length > 0) {
                  this.muruganservice.openSnackBarWithDuration('This Item group already mapped', 10000);
                  return;
                }
                break;
              }
              case 'CustomerGroup': {
                const existArr = this.datasourceTwo.data.filter((data) => data.CgCode === this.MapAcVGForm.get('VgName').value.CgCode);
                if (existArr.length > 0) {
                  this.muruganservice.openSnackBarWithDuration('This Customer group already mapped', 10000);
                  return;
                }
                break;
              }
              default: {
                break;
              }
            }
          }

          Swal.fire({

            title: 'Are you sure to Map ?',

            icon: 'warning',

            showCancelButton: true,

            confirmButtonColor: '#3085d6',

            cancelButtonColor: '#d33',

            confirmButtonText: 'Yes, Save it!',

          }).then((result) => {
            if (result.isConfirmed) {
              let APIJson;

              let newObs$:Observable<any>;

              const newDate = moment(this.MapAcVGForm.get('EffDate').value).format('YYYY-MM-DD');
              if (this.mainMenuSelected === 'VendorGroup') {
                APIJson = {
                  reqMainreq: 'S@/MapVendorGroupToAccount/E@',
                  usr: this.global.gUsrid,
                  TrnType: 'Ind',
                  getList: [{
                    CmpCode: this.MapAcVGForm.get('campName').value.CmpCode,
                    Fbcode: this.MapAcVGForm.get('FinBook').value.FbCode,
                    AcCode: this.MapAcVGForm.get('AcCode').value.AcCode,
                    AcType: this.MapAcVGForm.get('pytype').value,
                    VgCode: this.MapAcVGForm.get('VgName').value.VgId,
                    Edate: newDate,
                  }],
                };
                newObs$ = this.muruganservice.VendorGroupSaveApi(APIJson);
              } else if (this.mainMenuSelected === 'ItemGroup') {
                APIJson = {
                  reqMainreq: 'S@/MapItemsToAccountGroup/E@',
                  usr: this.global.gUsrid,
                  Trntype: 'Ind',
                  getList: [{
                    CmpCode: this.MapAcVGForm.get('campName').value.CmpCode,
                    Fbcode: this.MapAcVGForm.get('FinBook').value.FbCode,
                    AcCode: this.MapAcVGForm.get('AcCode').value.AcCode,
                    IgCode: this.MapAcVGForm.get('VgName').value.IgCode,
                    Edate: newDate,
                  }],
                };
                newObs$ = this.muruganservice.SaveBookView(APIJson);
              } else if (this.mainMenuSelected === 'CustomerGroup') {
                APIJson = {
                  reqMainreq: 'S@/MapCustGroupToAccount/E@',
                  usr: this.global.gUsrid,
                  TrnType: 'Ind',
                  getList: [{
                    CmpCode: this.MapAcVGForm.get('campName').value.CmpCode,
                    Fbcode: this.MapAcVGForm.get('FinBook').value.FbCode,
                    AcCode: this.MapAcVGForm.get('AcCode').value.AcCode,
                    CgCode: this.MapAcVGForm.get('VgName').value.CgCode,
                    Edate: newDate,
                  }],
                };
                newObs$ = this.muruganservice.VendorGroupSaveApi(APIJson);
              }
              this.subs.add(newObs$.subscribe({
                next: (response) => {
                  if (response.length === 0) {
                    this.muruganservice.openSnackBar('No data available');
                    this.dialog.closeAll();
                  } else if (response[0].StatusResponse === 'Success') {
                    this.muruganservice.openSnackBar('New record(s) saved succesfully');
                    this.dialog.closeAll();
                    this.loadAcCodeToVGdata();
                  } else {
                    Swal.fire(response[0].StatusResponse);
                  }
                },
                error: (error) => {
                  this.dialog.closeAll();
                  if (error.statusText === 'Unknown Error') {
                    this.muruganservice.openSnackBar('Server not connected');
                  } else {
                    this.muruganservice.openSnackBar(error.statusText);
                  }
                },
                complete: () => { },
              }));
            }
          });
        }
      } else if (this.mainMenuSelected === 'ItemGroup') {
        if (this.muruganservice.checkTypeValitity(this.MapAcVGForm.get('campName').value, 'Company name')
  && this.muruganservice.checkTypeValitity(this.MapAcVGForm.get('FinBook').value, 'Finance book name')
  && this.muruganservice.checkTypeValitity(this.MapAcVGForm.get('VgName').value, `${this.groupName} name`)
  && this.muruganservice.checkTypeValitity(this.MapAcVGForm.get('AcCode').value, 'Account code')
  && this.muruganservice.checkTypeValitity(this.MapAcVGForm.get('payableAccCode').value, 'Payable Account code')
  && this.muruganservice.checkTypeValitity(this.MapAcVGForm.get('AdvAccCode').value, 'Advance Account code')
  && this.muruganservice.checkTypeValitity(this.MapAcVGForm.get('DepAccCode').value, 'Deposite Account code')) {
          if (this.companyNameTwo.value.CmpCode === this.MapAcVGForm.get('campName').value.CmpCode) {
            const existArr = this.datasourceTwo.data.filter((data) => data.IgCode === this.MapAcVGForm.get('VgName').value.IgCode);
            if (existArr.length > 0) {
              this.muruganservice.openSnackBarWithDuration('This Item group already mapped', 10000);
              return;
            }
          }

          Swal.fire({

            title: 'Are you sure to Map ?',

            icon: 'warning',

            showCancelButton: true,

            confirmButtonColor: '#3085d6',

            cancelButtonColor: '#d33',

            confirmButtonText: 'Yes, Save it!',

          }).then((result) => {
            if (result.isConfirmed) {
              let APIJson;

              let newObs$:Observable<any>;

              const newDate = moment(this.MapAcVGForm.get('EffDate').value).format('YYYY-MM-DD');
              if (this.mainMenuSelected === 'VendorGroup') {
                APIJson = {
                  reqMainreq: 'S@/MapVendorGroupToAccount/E@',
                  usr: this.global.gUsrid,
                  TrnType: 'Ind',
                  getList: [{
                    CmpCode: this.MapAcVGForm.get('campName').value.CmpCode,
                    Fbcode: this.MapAcVGForm.get('FinBook').value.FbCode,
                    AcCode: this.MapAcVGForm.get('AcCode').value.AcCode,
                    AcType: this.MapAcVGForm.get('pytype').value,
                    VgCode: this.MapAcVGForm.get('VgName').value.VgId,
                    Edate: newDate,
                  }],
                };
                newObs$ = this.muruganservice.VendorGroupSaveApi(APIJson);
              } else if (this.mainMenuSelected === 'ItemGroup') {
                APIJson = {
                  reqMainreq: 'S@/MapItemsToAccountGroup/E@',
                  usr: this.global.gUsrid,
                  Trntype: 'Ind',
                  getList: [{
                    CmpCode: this.MapAcVGForm.get('campName').value.CmpCode,
                    Fbcode: this.MapAcVGForm.get('FinBook').value.FbCode,
                    AcCode: this.MapAcVGForm.get('AcCode').value.AcCode,
                    PayAcode: this.MapAcVGForm.get('payableAccCode').value.AcCode,
                    AdvAcode: this.MapAcVGForm.get('AdvAccCode').value.AcCode,
                    DepAcode: this.MapAcVGForm.get('DepAccCode').value.AcCode,
                    IgCode: this.MapAcVGForm.get('VgName').value.IgCode,
                    Edate: newDate,
                  }],
                };
                newObs$ = this.muruganservice.SaveBookView(APIJson);
              } else if (this.mainMenuSelected === 'CustomerGroup') {
                APIJson = {
                  reqMainreq: 'S@/MapCustGroupToAccount/E@',
                  usr: this.global.gUsrid,
                  TrnType: 'Ind',
                  getList: [{
                    CmpCode: this.MapAcVGForm.get('campName').value.CmpCode,
                    Fbcode: this.MapAcVGForm.get('FinBook').value.FbCode,
                    AcCode: this.MapAcVGForm.get('AcCode').value.AcCode,
                    CgCode: this.MapAcVGForm.get('VgName').value.CgCode,
                    Edate: newDate,
                  }],
                };
                newObs$ = this.muruganservice.VendorGroupSaveApi(APIJson);
              }
              this.subs.add(newObs$.subscribe({
                next: (response) => {
                  if (response.length === 0) {
                    this.muruganservice.openSnackBar('No data available');
                    this.dialog.closeAll();
                  } else if (response[0].StatusResponse === 'Success') {
                    this.muruganservice.openSnackBar('New record(s) saved succesfully');
                    this.dialog.closeAll();
                    this.loadAcCodeToVGdata();
                  } else {
                    Swal.fire(response[0].StatusResponse);
                  }
                },
                error: (error) => {
                  this.dialog.closeAll();
                  if (error.statusText === 'Unknown Error') {
                    this.muruganservice.openSnackBar('Server not connected');
                  } else {
                    this.muruganservice.openSnackBar(error.statusText);
                  }
                },
                complete: () => { },
              }));
            }
          });
        }
      }
    } else {
      this.muruganservice.openSnackBar('Please fill all the fields');
    }
  }

  deleteAcCodeMappedData = (row:Object | any) => {
    let APIJson;
    let newObs$:Observable<any>;
    switch (this.mainMenuSelected) {
      case 'VendorGroup': {
        APIJson = {
          reqMainreq: 'DeleteVendorGroupToAcCode',
          Usr: this.global.gUsrid,
          brcode: this.global.gBrcode,
          var1: row.VgId,
          var2: row.CmpCode,
          var3: row.AcCode,
          var4: row.FbCode,
          var5: row.AcType,
        };
        newObs$ = this.muruganservice.VendorGroupApi(APIJson);
        break;
      }
      case 'ItemGroup': {
        APIJson = {
          reqMainreq: 'DeleteItemGroupToAcCode',
          Usr: this.global.gUsrid,
          brcode: this.global.gBrcode,
          var1: row.IgCode,
          var2: row.CmpCode,
          var3: row.AcCode,
          var4: row.FbCode,
        };
        newObs$ = this.muruganservice.FinBookView(APIJson);
        break;
      }
      default: {
        APIJson = {
          reqMainreq: 'DeleteCustomerGroupToAcCode',
          Usr: this.global.gUsrid,
          brcode: this.global.gBrcode,
          var1: row.CgCode ? row.CgCode : row.VgId,
          var2: row.CmpCode,
          var3: row.AcCode,
          var4: row.FbCode,
        };
        newObs$ = this.muruganservice.VendorGroupApi(APIJson);
        break;
      }
    }
    this.subs.add(newObs$.subscribe({
      next: (response) => {
        if (response.length === 0) {
          this.muruganservice.openSnackBar('No data available');
        } else if (response[0].StatusResponse === 'Success') {
          this.muruganservice.openSnackBar('Selected row was deleted successffuly');
          this.loadAcCodeToVGdata();
        } else {
          Swal.fire({ title: response[0].StatusResponse });
        }
      },
      error: (error) => {
        this.muruganservice.openSnackBar(error.statusText);
      },
      complete: () => { },
    }));
  }

  EditAccMap(row, Template: TemplateRef<any>, gmenu) {
    this.AccMapEdit = true;

    const cmpObject = {
      company: row.CmpName,
      CmpCode: row.CmpCode,
    };
    const FbObject = {
      FbCode: row.FbCode,
      FbName: row.FbName,
    };
    const AccObject = {
      AcCode: row.AcCode,
      AcCodeName: row.AcName,
    };

    let VGObj = {};
    if (this.mainMenuSelected === 'VendorGroup') {
      VGObj = {
        VgId: row.VgId,
        VgName: row.VgName,
      };
      this.MapAcVGForm.get('pytype').setValue(row.AcType);
    } else if (this.mainMenuSelected === 'ItemGroup') {
      VGObj = {
        IgCode: row.IgCode,
        IgName: row.IgName,
      };
    } else if (this.mainMenuSelected === 'CustomerGroup') {
      VGObj = {
        CgCode: row.CgCode,
        CgName: row.CgName,
      };
    }
    this.MapAcVGForm.get('campName').setValue(cmpObject);
    this.MapAcVGForm.get('FinBook').setValue(FbObject);
    this.MapAcVGForm.get('VgName').setValue(VGObj);
    this.MapAcVGForm.get('AcCode').setValue(AccObject);
    if (this.mainMenuSelected === 'ItemGroup') {
      const PayableAccObject = {
        AcCode: row.PayableAcCode,
        AcCodeName: row.PayableAcName,
      };
      const AdvAccObject = {
        AcCode: row.AdvanceAcCode,
        AcCodeName: row.AdvanceAcName,
      };
      const DepositAccObject = {
        AcCode: row.DepositsAcCode,
        AcCodeName: row.DepositsAcName,
      };
      this.MapAcVGForm.get('payableAccCode').setValue(PayableAccObject);
      this.MapAcVGForm.get('AdvAccCode').setValue(AdvAccObject);
      this.MapAcVGForm.get('DepAccCode').setValue(DepositAccObject);
    }
    this.MapAcVGForm.get('EffDate').setValue(this.pipe.transform(row.FromDate, 'yyyy-MM-dd'));
    this.MapAcVGForm.get('EffToDate').setValue(this.pipe.transform(row.ToDate, 'yyyy-MM-dd'));
    if (this.mainMenuSelected === 'ItemGroup') {
      this.selectedRow = row;
      this.dialog.open(Template, {
        maxWidth: '55vw', width: '900px', maxHeight: '630px', disableClose: true, autoFocus: false, data: 'Edit', panelClass: 'gDialogBox',
      });
    } else {
      this.dialog.open(Template, {
        maxWidth: '55vw', maxHeight: '630px', disableClose: true, autoFocus: false, data: 'Edit', panelClass: 'gDialogBox',
      });
    }
  }

  UpdateAcMapVIC(formValue) {
    if (this.mainMenuSelected === 'VendorGroup') {
      this.MapAcVGForm.get('pytype').addValidators(Validators.required);
    } else {
      this.MapAcVGForm.get('pytype').removeValidators(Validators.required);
    }
    if (this.MapAcVGForm.valid) {
      if (this.muruganservice.checkTypeValitity(this.MapAcVGForm.get('campName').value, 'Company name')
      && this.muruganservice.checkTypeValitity(this.MapAcVGForm.get('FinBook').value, 'Finance book name')
      && this.muruganservice.checkTypeValitity(this.MapAcVGForm.get('VgName').value, `${this.groupName} name`)
      && this.muruganservice.checkTypeValitity(this.MapAcVGForm.get('AcCode').value, 'Account code')) {
        this.commonservice.taskConfirmation('Are you sure to update ?', '', true, 'Update', '').then((res) => {
          if (res.isConfirmed) {
            const FromDate = moment(formValue.EffDate).format('DD-MMM-yyyy');
            const ToDate = moment(formValue.EffToDate).format('DD-MMM-yyyy');

            let APIJson:any = {
              reqMainreq: 'UpdateVendorGroupToAcCode',
              var1: formValue.VgName.VgId,
              var2: formValue.campName.CmpCode,
              var3: formValue.AcCode.AcCode,
              var4: formValue.FinBook.FbCode,
              var5: FromDate,
              var6: ToDate,
              var7: formValue.pytype,
            };
            let newObs$:Observable<any>;
            if (this.mainMenuSelected === 'VendorGroup') {
              APIJson = {
                reqMainreq: 'UpdateVendorGroupToAcCode',
                var1: formValue.VgName.VgId,
                var2: formValue.campName.CmpCode,
                var3: formValue.AcCode.AcCode,
                var4: formValue.FinBook.FbCode,
                var5: FromDate,
                var6: ToDate,
                var7: formValue.pytype,

              };
              APIJson.reqMainreq = 'UpdateVendorGroupToAcCode';
              newObs$ = this.muruganservice.VendorGroupApi(APIJson);
              APIJson.var1 = formValue.VgName.VgId;
            } else if (this.mainMenuSelected === 'ItemGroup') {
              APIJson = {
                reqMainreq: 'UpdateItemGroupToAcCode',
                var1: formValue.VgName.VgId,
                var2: formValue.campName.CmpCode,
                var3: this.selectedRow.AcCode,
                var4: formValue.FinBook.FbCode,
                var5: FromDate,
                var6: ToDate,
                var7: this.selectedRow.PayableAcCode,
                var8: this.selectedRow.AdvanceAcCode,
                var9: this.selectedRow.DepositsAcCode,
                var14: formValue.payableAccCode.AcCode,
                var15: formValue.AdvAccCode.AcCode,
                var16: formValue.DepAccCode.AcCode,
                var17: formValue.AcCode.AcCode,
              };
              APIJson.reqMainreq = 'UpdateItemGroupToAcCode';
              newObs$ = this.muruganservice.FinBookView(APIJson);
              APIJson.var1 = formValue.VgName.IgCode;
            } else if (this.mainMenuSelected === 'CustomerGroup') {
              APIJson = {
                reqMainreq: 'UpdateVendorGroupToAcCode',
                var1: formValue.VgName.VgId,
                var2: formValue.campName.CmpCode,
                var3: formValue.AcCode.AcCode,
                var4: formValue.FinBook.FbCode,
                var5: FromDate,
                var6: ToDate,
                var7: formValue.pytype,
              };
              APIJson.reqMainreq = 'UpdateCustomerGroupToAcCode';
              APIJson.var1 = formValue.VgName.CgCode;
              newObs$ = this.muruganservice.VendorGroupApi(APIJson);
            }
            this.subs.add(newObs$.subscribe({
              next: (response) => {
                if (response.length === 0) {
                  this.muruganservice.openSnackBar('No data available');
                } else if (response[0].StatusResponse === 'Success') {
                  this.muruganservice.openSnackBar('Selected row was Updated successffuly');
                  this.loadAcCodeToVGdata();
                  this.dialog.closeAll();
                } else {
                  Swal.fire({ title: response[0].StatusResponse });
                }
              },
              error: (error) => {
                this.muruganservice.openSnackBar(error.statusText);
              },
              complete: () => { },
            }));
          }
        });
      }
    } else {
      this.muruganservice.openSnackBar('Please fill all the fields');
    }
  }

  // ===================================================================================================================================
  //                                      Vendor group map to Supplier
  // ===================================================================================================================================

  CmpSelectedThree = (event:any, type:String) => {
    if (event.source.selected) {
      setTimeout(() => {
        if (type === 'inputs') {
          this.CampNameOptionsListThree = [];
          this.VGnameListThree = [];
          this.datasourceThree.data = [];
          this.FullReport = [];
          this.VGNameThree.reset();
          this.getBrFinBook('Three', 'inputs');

          document.getElementById('fbookThree')?.focus();
        } else {
          this.FinBookOptionsViewThree = [];
          this.getBrFinBook('Three', 'view');
          this.VGnameListThreeView = [];
          this.ViewCampNameOptionsListThree = [];
          this.SuplierMapFilterList.data = [];
          this.ViewSupplierVGForm.get('finbook').reset();
          this.ViewSupplierVGForm.get('VgName').reset();
          document.getElementById('fbookThreeView')?.focus();
          if (this.TabClickedIndex === 2) {
            this.submitMapSupVgDialog('change');
          }
        }
      }, 100);
    }
  }

  supplierNameSearch = (keyValue:String, type:String) => {
    if (type === 'inputs') {
      let APIJson;
      let newObs$:Observable<any>;
      if (this.mainMenuSelected === 'VendorGroup') {
        APIJson = {
          reqMainreq: 'SuplierNameSearch',
          Usr: this.global.gUsrid,
          brcode: this.global.gBrcode,
          var1: keyValue,
        };
        newObs$ = this.muruganservice.VendorGroupApi(APIJson);
      }
      if (this.mainMenuSelected === 'ItemGroup') {
        APIJson = {
          reqMainreq: 'ItemNameSearch',
          Usr: this.global.gUsrid,
          brcode: this.global.gBrcode,
          var1: keyValue,
          var2: this.companyNameThree.value.CmpCode,
        };
        newObs$ = this.muruganservice.FinBookView(APIJson);
      }
      if (this.mainMenuSelected === 'CustomerGroup') {
        APIJson = {
          reqMainreq: 'CustomerNameSearch',
          Usr: this.global.gUsrid,
          brcode: this.global.gBrcode,
          var1: keyValue,
          var2: this.companyNameThree.value.CmpCode,
        };
        newObs$ = this.muruganservice.FinBookView(APIJson);
      }
      this.SupplierNameList = [];
      this.subs.add(newObs$.subscribe({
        next: (response) => {
          if (response.length === 0) {
            this.muruganservice.openSnackBar('No data available');
          } else if (response[0].StatusResponse === 'Success') {
            this.SupplierNameList = response.slice(0, 200);
          } else {
            this.muruganservice.openSnackBar(response[0].StatusResponse);
          }
        },
        error: (error) => {
          if (error.statusText === 'Unknown Error') {
            this.muruganservice.openSnackBar('Server not connected');
          } else {
            this.muruganservice.openSnackBar(error.statusText);
          }
        },
        complete: () => { },
      }));
    }
  }

  SupplierMapToVg = (mapType:String) => {
    if (mapType === 'single') {
      let indname;
      if (this.mainMenuSelected === 'VendorGroup') {
        indname = 'Supplier Name';
      } else if (this.mainMenuSelected === 'ItemGroup') {
        indname = 'Item Name';
      } else if (this.mainMenuSelected === 'CustomerGroup') {
        indname = 'Customer Name';
      }
      if (this.companyNameThree.valid && this.FinBookThree.valid && this.VGNameThree.valid && this.SupplierName.valid) {
        if (this.muruganservice.checkTypeValitity(this.companyNameThree.value, 'company name')
        && this.muruganservice.checkTypeValitity(this.FinBookThree.value, 'finance book name')
          && this.muruganservice.checkTypeValitity(this.VGNameThree.value, `${this.groupName} name`)
          && this.muruganservice.checkTypeValitity(this.SupplierName.value, `${indname} name`)) {
          const addfound = this.FullReport.filter((e: any) => (Number(e.supcode) === this.SupplierName.value.supcode));
          if (addfound.length > 0) {
            this.muruganservice.openSnackBar('Supplier Name already Exist');
          } else {
            Swal.fire({

              title: 'Are you sure to Save?',

              icon: 'warning',

              showCancelButton: true,

              confirmButtonColor: '#3085d6',

              cancelButtonColor: '#d33',

              confirmButtonText: 'Yes, Save it!',

            }).then((result) => {
              if (result.isConfirmed) {
                this.callSingleSuppliermapFunc();
              }
            });
          }
        }
      } else {
        this.muruganservice.openSnackBar('please fill all the fields');
      }
    } else if (this.companyNameThree.valid && this.FinBookThree.valid && this.VGNameThree.valid) {
      if (this.muruganservice.checkTypeValitity(this.companyNameThree.value, 'Company name')
        && this.muruganservice.checkTypeValitity(this.FinBookThree.value, 'finance book name')
        && this.muruganservice.checkTypeValitity(this.VGNameThree.value, `${this.groupName} name`)) {
        if (this.FullReport.length === 0) {
          this.muruganservice.openSnackBar('No Data to map');
          return;
        }
        if (this.onlyView === false) {
          this.muruganservice.openSnackBar('No changes made');
          return;
        }

        Swal.fire({

          title: 'Are you sure to Save?',

          icon: 'warning',

          showCancelButton: true,

          confirmButtonColor: '#3085d6',

          cancelButtonColor: '#d33',

          confirmButtonText: 'Yes, Save it!',

        }).then((result) => {
          if (result.isConfirmed) {
            this.callSingleSuppliermapFunc();
          }
        });
      }
    } else {
      this.muruganservice.openSnackBar('please fill all the fields');
    }
  }

  callSingleSuppliermapFunc = () => {
    let savejson = [];
    let type;
    let newArr;
    let APIJson;

    let newObs$:Observable<any>;
    if (this.mainMenuSelected === 'VendorGroup') {
      if (this.MapOption.value === 'single') {
        type = 'Ind';
        this.pipe.transform(this.ViewSupplierVGForm.value.viewstartDate, 'dd-MMM-yyyy');
        savejson = [{
          CmpCode: this.companyNameThree.value.CmpCode,
          FbCode: this.FinBookThree.value.FbCode,
          VgCode: this.VGNameThree.value.VgId,
          SupCode: this.SupplierName.value.supcode,
          Edate: this.pipe.transform(this.EffDateThree.value, 'dd-MMM-yyyy'),
        }];
      } else if (this.MapOption.value === 'bulk') {
        savejson = this.FullReport;
        type = 'bulk';
        newArr = cloneDeep(this.FullReport);

        savejson.forEach((element) => {
          delete element.SupName;
          element = Object.assign(element, { SupCode: element.supcode });
          element = Object.assign(element, { FbCode: this.FinBookThree.value.FbCode });
          element = Object.assign(element, { Edate: this.pipe.transform(this.EffDateThree.value, 'dd-MMM-yyyy') });
          delete element.supcode;
        });
      }
      APIJson = {
        reqMainreq: 'S@/VendorGroupWithSup/E@',
        usr: this.global.gUsrid,
        TrnType: type,
        getList: savejson,

      };
      newObs$ = this.muruganservice.VendorGroupSaveApi(APIJson);
    } else if (this.mainMenuSelected === 'ItemGroup') {
      if (this.MapOption.value === 'single') {
        type = 'Ind';
        savejson = [{
          CmpCode: this.companyNameThree.value.CmpCode,
          FbCode: this.FinBookThree.value.FbCode,
          IgCode: this.VGNameThree.value.IgCode,
          icode: this.SupplierName.value.icode,
          Edate: this.pipe.transform(this.EffDateThree.value, 'dd-MMM-yyyy'),
        }];
      } else if (this.MapOption.value === 'bulk') {
        savejson = this.FullReport;
        type = 'bulk';
        newArr = cloneDeep(this.FullReport);
        savejson.forEach((element) => {
          delete element.Iname;
          element = Object.assign(element, { icode: element.Icode });
          delete element.Icode;
          element = Object.assign(element, { FbCode: this.FinBookThree.value.FbCode });
          element = Object.assign(element, { Edate: this.pipe.transform(this.EffDateThree.value, 'dd-MMM-yyyy') });
        });
      }
      APIJson = {
        reqMainreq: 'S@/MapItemsToItemGroup/E@',
        usr: this.global.gUsrid,
        Trntype: type,
        getList: savejson,

      };
      newObs$ = this.muruganservice.SaveBookView(APIJson);
    } else if (this.mainMenuSelected === 'CustomerGroup') {
      if (this.MapOption.value === 'single') {
        type = 'Ind';
        savejson = [{
          CmpCode: this.companyNameThree.value.CmpCode,
          FbCode: this.FinBookThree.value.FbCode,
          CgCode: this.VGNameThree.value.CgCode,
          AcCode: this.SupplierName.value.CustCode,
          Edate: this.pipe.transform(this.EffDateThree.value, 'dd-MMM-yyyy'),
        }];
      } else if (this.MapOption.value === 'bulk') {
        savejson = this.FullReport;
        type = 'bulk';
        newArr = cloneDeep(this.FullReport);

        savejson.forEach((element) => {
          delete element.SupName;
          element = Object.assign(element, { CustCode: element.CustCode });
          element = Object.assign(element, { FbCode: this.FinBookThree.value.FbCode });
          element = Object.assign(element, { Edate: this.pipe.transform(this.EffDateThree.value, 'dd-MMM-yyyy') });
          delete element.CustCode;
        });
      }
      APIJson = {
        reqMainreq: 'S@/MapCustomerToCustomerGroup/E@',
        usr: this.global.gUsrid,
        TrnType: type,
        getList: savejson,

      };
      newObs$ = this.muruganservice.SaveBookView(APIJson);
    }

    this.subs.add(newObs$.subscribe({
      next: (response) => {
        this.dialog.closeAll();
        if (this.mainMenuSelected === 'VendorGroup') {
          if (this.HaveAccess) {
            this.displayedColumnsThree = ['SNo', 'supcode', 'SupName', 'FromDate', 'Action'];
          } else {
            this.displayedColumnsThree = ['SNo', 'supcode', 'SupName', 'FromDate'];
          }
        } else if (this.mainMenuSelected === 'ItemGroup') {
          if (this.HaveAccess) {
            this.displayedColumnsThree = ['SNo', 'Icode', 'Iname', 'FromDate', 'Action'];
          } else {
            this.displayedColumnsThree = ['SNo', 'Icode', 'Iname', 'FromDate'];
          }
        } else if (this.HaveAccess) {
          this.displayedColumnsThree = ['SNo', 'CgCode', 'CgName', 'FromDate', 'Action'];
        } else {
          this.displayedColumnsThree = ['SNo', 'CgCode', 'CgName', 'FromDate'];
        }
        if (response.length === 0) {
          this.muruganservice.openSnackBar('No data available');
        } else if (response[0].StatusResponse === 'Success') {
          this.bulkMapNotification = '';
          this.muruganservice.openSnackBar('New record(s) Mapped succesfully');
          if (this.MapOption.value === 'single') {
            document.getElementById('brCCenter').focus();
            this.SupplierNameList = [];
            this.SupplierName.reset();
          }

          this.loadThirdTabData();
        } else {
          this.loadThirdTabData();
          Swal.fire({ text: response[0].StatusResponse });
        }
      },
      error: (error) => {
        this.dialog.closeAll();
        if (error.statusText === 'Unknown Error') {
          this.muruganservice.openSnackBar('Server not connected');
        } else {
          this.muruganservice.openSnackBar(error.statusText);
        }
      },
      complete: () => { },
    }));
  }

  browsebutton = () => {
    if (this.companyNameThree.valid && this.FinBookThree.valid && this.VGNameThree.valid) {
      if (this.muruganservice.checkTypeValitity(this.companyNameThree.value, 'Company name')
        && this.muruganservice.checkTypeValitity(this.FinBookThree.value, 'finance book name')
        && this.muruganservice.checkTypeValitity(this.VGNameThree.value, `${this.groupName} name`)) {
        document.getElementById('import').click();
      }
    } else {
      this.muruganservice.openSnackBar('Please fill all the fields');
    }
  }

  onFileChange = (evt: any, templateRef: TemplateRef<any>) => {
    const target: DataTransfer = <DataTransfer>evt.target;
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary', raw: false });
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];
      this.data = <AOA>XLSX.utils.sheet_to_json(ws);
      if (this.data.length > 0) {
        const Bankdata = this.data[0];
        const keys = Object.keys(Bankdata);
        this.datnew = keys;
      }
    };
    reader.readAsBinaryString(target.files[0]);

    setTimeout(() => {
      if (this.mainMenuSelected === 'VendorGroup') {
        this.BulkSupMapToVG(templateRef);
      } else if (this.mainMenuSelected === 'ItemGroup') {
        this.BulkSupMapToItemGroup(templateRef);
      }
    }, 100);
  }

  previewclick = () => {
    let arrayOfArray;
    if (this.mainMenuSelected === 'VendorGroup') {
      arrayOfArray = [
        {
          SNo: '',
          supcode: '',
          SupName: '',
        },
      ];
      this.muruganservice.exportAsExcelFile(arrayOfArray, 'SupplierToVendorgroupMapping');
    } else if (this.mainMenuSelected === 'ItemGroup') {
      arrayOfArray = [
        {
          SNo: '',
          Itemcode: '',
          ItemName: '',
        },
      ];
      this.muruganservice.exportAsExcelFile(arrayOfArray, 'ItemToItemGroupMap');
    } else if (this.mainMenuSelected === 'CustomerGroup') {
      arrayOfArray = [
        {
          SNo: '',
          supcode: '',
          SupName: '',
        },
      ];
      this.muruganservice.exportAsExcelFile(arrayOfArray, 'CustomerToCustomerGroupMap');
    }
  }

  BulkSupMapToVG = (templateRef: TemplateRef<any>) => {
    this.existingDataSource = [...this.FullReport];
    const tableJson = [];
    let sample = {};
    this.invalidbranchCodev = [];
    let counter = 1;

    this.data.forEach((element, index) => {
      this.existingDataSource.forEach((e: any) => {
        if (Number(e.supcode) === element.supcode) {
          this.invalidbranchCodev.push(element);
          this.data = this.data.filter((u) => Number(u.supcode) !== element.supcode);
        }
      });
    });

    this.data.forEach((element, index) => {
      if (element.supcode && element.SupName) {
        if (typeof element.supcode === 'number') {
          sample = {
            CmpCode: this.companyNameThree.value.CmpCode,
            VgCode: this.VGNameThree.value.VgId,
            supcode: element.supcode,
            SupName: element.SupName,
          };
          tableJson.push(sample);
        } else {
          this.invalidbranchCodev.push(element);
        }
      } else {
        counter += 1;
        this.invalidbranchCodev.push(element);
      }
    });
    if (counter !== 1) {
      this.muruganservice.openSnackBar(`${counter - 1} Empty row(s) are removed`);
    }
    if (this.invalidbranchCodev.length > 0) {
      this.dialog.open(templateRef, {
        maxWidth: '600px', maxHeight: '630px', disableClose: true, autoFocus: false, panelClass: 'gDialogBox',
      });
    }

    this.inputValue = '';
    if (tableJson.length > 0) {
      this.applyFilter('');
      this.datasourceThree = new MatTableDataSource([]);
      this.datasourceThree = new MatTableDataSource(tableJson);

      this.FullReport = tableJson;
      this.muruganservice.openSnackBar('data(s) fetched to table');
      this.bulkMapNotification = 'Records are not saved yet';
      this.displayedColumnsThree = ['SNo', 'supcode', 'SupName'];
      this.inputValue = '';
      this.onlyView = true;
    }
  }

  BulkSupMapToItemGroup =(templateRef: TemplateRef<any>) => {
    this.existingDataSource = [...this.FullReport];
    const tableJson = [];
    let sample = {};
    this.invalidbranchCodev = [];
    let counter = 1;

    this.data.forEach((element, index) => {
      this.existingDataSource.forEach((e: any) => {
        if (Number(e.Icode) === element.Icode) {
          this.invalidbranchCodev.push(element);
          this.data = this.data.filter((u) => Number(u.Itemcode) !== element.Icode);
        }
      });
    });

    this.data.forEach((element, index) => {
      if (element.Itemcode && element.ItemName) {
        if (typeof element.Itemcode === 'number') {
          sample = {
            CmpCode: this.companyNameThree.value.CmpCode,
            IgCode: this.VGNameThree.value.IgCode,
            Icode: element.Itemcode,
            Iname: element.ItemName,
          };
          tableJson.push(sample);
        } else {
          this.invalidbranchCodev.push(element);
        }
      } else {
        counter += 1;
        this.invalidbranchCodev.push(element);
      }
    });
    if (counter !== 1) {
      this.muruganservice.openSnackBar(`${counter - 1} Empty row(s) are removed`);
    }
    if (this.invalidbranchCodev.length > 0) {
      this.dialog.open(templateRef, {
        maxWidth: '600px', maxHeight: '630px', disableClose: true, autoFocus: false, panelClass: 'gDialogBox',
      });
    }

    this.inputValue = '';
    if (tableJson.length > 0) {
      this.applyFilter('');
      this.datasourceThree = new MatTableDataSource([]);
      this.datasourceThree = new MatTableDataSource(tableJson);

      this.FullReport = tableJson;
      this.muruganservice.openSnackBar('data(s) fetched to table');
      this.displayedColumnsThree = ['SNo', 'Icode', 'Iname'];
      this.inputValue = '';
      this.onlyView = true;
    }
  }

  viewVIGChange(event) {
    if (event.source.selected) {
      setTimeout(() => {
        this.submitMapSupVgDialog('change');
      }, 100);
    }
  }

  submitMapSupVgDialog = (action:String) => {
    if (this.ViewSupplierVGForm.valid) {
      if (this.muruganservice.checkTypeValitity(this.ViewSupplierVGForm.get('campName').value, 'Company name')
      && this.muruganservice.checkTypeValitity(this.ViewSupplierVGForm.get('finbook').value, 'Finance book')
        && this.muruganservice.checkTypeValitity(this.ViewSupplierVGForm.get('VgName').value, `${this.groupName} name`)) {
        const APIJson = {
          reqMainreq: 'Datewise_VendorToVendorGroup',
          Usr: this.global.gUsrid,
          brcode: this.global.gBrcode,
          var1: this.ViewSupplierVGForm.get('campName').value.CmpCode,
          var2: this.pipe.transform(this.ViewSupplierVGForm.value.viewstartDate, 'dd-MMM-yyyy'),
          var3: this.pipe.transform(this.ViewSupplierVGForm.value.viewendDate, 'dd-MMM-yyyy'),
          var4: this.ViewSupplierVGForm.get('VgName').value.VgId,
          var5: this.ViewSupplierVGForm.get('finbook').value.FbCode,
        };

        let newObs$:Observable<any>;
        if (this.mainMenuSelected === 'VendorGroup') {
          APIJson.reqMainreq = 'Datewise_VendorToVendorGroup';
          newObs$ = this.muruganservice.VendorGroupApi(APIJson);
        } else if (this.mainMenuSelected === 'ItemGroup') {
          APIJson.reqMainreq = 'ItemToItemGroup';
          APIJson.var4 = this.ViewSupplierVGForm.get('VgName').value.IgCode;
          newObs$ = this.muruganservice.FinBookView(APIJson);
        } else if (this.mainMenuSelected === 'CustomerGroup') {
          APIJson.reqMainreq = 'Datewise_VendorToVendorGroup';
          newObs$ = this.muruganservice.VendorGroupApi(APIJson);
        }

        this.SuplierMapFilterList.data = [];
        if (this.viewMoreLoad) {
          return;
        }
        this.viewMoreLoad = true;
        this.subs.add(newObs$.subscribe({
          next: (response) => {
            if (response.length === 0) {
              this.muruganservice.openSnackBar('No data available');
            } else if (response[0].StatusResponse === 'Success') {
              this.SuplierMapFilterList.data = response;
              this.viewMoreLoad = false;
            } else {
              this.muruganservice.openSnackBar(response[0].StatusResponse);
            }
          },
          error: (error) => {
            if (error.statusText === 'Unknown Error') {
              this.muruganservice.openSnackBar('Server not connected');
            } else {
              this.muruganservice.openSnackBar(error.statusText);
            }
          },
          complete: () => { },
        }));
      }
    } else if (action === 'submit') {
      this.muruganservice.openSnackBar('Please fill all the fields');
    }
  }

  viewMoreBRMap = (element:any) => {
    if (this.viewMoreLoad) {
      return;
    }
    this.viewMoreLoad = true;
    let ReqMain;
    const APIJson = {
      reqMainreq: ReqMain,
      usr: this.global.gUsrid,
      var1: element.tdate,
      var2: element.TrnNo,
      var3: element.VgCode,
    };
    let newObs$:Observable<any>;
    if (this.mainMenuSelected === 'VendorGroup') {
      APIJson.reqMainreq = 'VendorToVendorGroupDets';
      newObs$ = this.muruganservice.VendorGroupApi(APIJson);
    } else if (this.mainMenuSelected === 'ItemGroup') {
      APIJson.reqMainreq = 'ItemToItemGroupDets';
      newObs$ = this.muruganservice.FinBookView(APIJson);
    }
    this.datasourceThree.data = [];
    this.FullReport = [];

    const cmpObject = {
      company: this.ViewSupplierVGForm.get('campName').value.company,
      CmpCode: this.ViewSupplierVGForm.get('campName').value.CmpCode,
    };
    const FbObject = {
      FbName: this.ViewSupplierVGForm.get('finbook').value.FbName,
      FbCode: this.ViewSupplierVGForm.get('finbook').value.FbCode,
    };
    let VGObject;

    if (this.mainMenuSelected === 'VendorGroup') {
      VGObject = {
        VgId: element.VgCode,
        VgName: element.VgName,
      };
    } else if (this.mainMenuSelected === 'ItemGroup') {
      VGObject = {
        IgCode: element.IgCode,
        IgName: element.IgName,
      };
    }
    this.companyNameThree.setValue(cmpObject);
    this.VGNameThree.setValue(VGObject);
    this.FinBookThree.setValue(FbObject);
    this.subs.add(newObs$.subscribe({
      next: (response) => {
        this.dialog.closeAll();
        this.viewMoreClicked = true;
        if (response.length > 0) {
          if (response[0].StatusResponse) {
            if (response[0].StatusResponse === 'Success') {
              // this.datasourceThree.data = response;
              // this.FullReport = response;
              if (response.length > this.limitData) {
                this.extraAvailable = true;
              }
              this.datasourceThree.data = [...response].splice(0, this.limitData);

              this.FullReport = [...response];
              this.onlyView = false;
              this.viewMoreLoad = false;
              this.dialog.closeAll();
            } else {
              this.viewMoreLoad = false;
              this.muruganservice.openSnackBar(response[0].StatusResponse);
            }
          } else {
            this.viewMoreLoad = false;
            this.muruganservice.openSnackBar(response[0]);
          }
        } else {
          this.viewMoreLoad = false;
          this.muruganservice.openSnackBar('No data Available');
        }
      },
      error: (error) => {
        this.viewMoreLoad = false;
        this.muruganservice.openSnackBar(error.statusText);
      },
      complete: () => { },
    }));
  }

  deleteSupToVGdata = (selectedSupCode:string) => {
    Swal.fire({

      title: 'Are you sure to delete?',

      icon: 'warning',

      showCancelButton: true,

      confirmButtonColor: '#3085d6',

      cancelButtonColor: '#d33',

      confirmButtonText: 'Yes, delete it!',

    }).then((result) => {
      if (result.isConfirmed) {
        if (this.onlyView) {
          this.datasourceThree.data = this.FullReport.filter((u) => u.supcode !== selectedSupCode);
        } else {
          const selectedObj = this.FullReport.filter((u) => u.supcode === selectedSupCode);

          const APIJson = {
            reqMainreq: 'DeleteVendorToVendorGroup',
            usr: this.global.gUsrid,
            var1: selectedObj[0].VgCode,
            var2: selectedObj[0].CmpCode,
            var3: selectedObj[0].supcode,
            var4: this.FinBookThree.value.FbCode,
            var5: selectedObj[0].FromDate,
            var6: selectedObj[0].ToDate,
          };

          this.subs.add(this.muruganservice.VendorGroupApi(APIJson).subscribe({
            next: (response) => {
              if (response.length > 0) {
                if (response[0].StatusResponse === 'Success') {
                  this.muruganservice.openSnackBarWithDuration('Selected row Was deleted successfully', 2500);
                  setTimeout(() => {
                    this.loadThirdTabData();
                    this.submitMapSupVgDialog('change');
                  }, 300);
                } else {
                  Swal.fire({ title: response[0].StatusResponse });
                }
              }
            },
            error: (error) => {
              this.muruganservice.openSnackBar(error.statusText);
            },
            complete: () => { },
          }));
        }
      }
    });
  }

  deleteItemToIGdata = (selectedItemCode:number) => {
    Swal.fire({

      title: 'Are you sure to delete?',

      icon: 'warning',

      showCancelButton: true,

      confirmButtonColor: '#3085d6',

      cancelButtonColor: '#d33',

      confirmButtonText: 'Yes, delete it!',

    }).then((result) => {
      if (result.isConfirmed) {
        if (this.onlyView) {
          this.datasourceThree.data = this.FullReport.filter((u) => u.Icode !== selectedItemCode);
        } else {
          const selectedObj = this.FullReport.filter((u) => u.Icode === selectedItemCode);
          const APIJson = {
            reqMainreq: 'DeleteItemToItemGroup',
            usr: this.global.gUsrid,
            var1: this.VGNameThree.value.IgCode,
            var2: selectedObj[0].CmpCode,
            var3: selectedObj[0].Icode,
            var4: this.FinBookThree.value.FbCode,
          };

          this.subs.add(this.muruganservice.FinBookView(APIJson).subscribe({
            next: (response) => {
              if (response.length > 0) {
                if (response[0].StatusResponse === 'Success') {
                  this.muruganservice.openSnackBar('Selected row Was deleted successfully');
                  this.loadThirdTabData();
                  this.submitMapSupVgDialog('change');
                } else {
                  this.muruganservice.openSnackBar(response[0].StatusResponse);
                }
              }
            },
            error: (error) => {
              this.muruganservice.openSnackBar(error.statusText);
            },
            complete: () => { },
          }));
        }
      }
    });
  }

  FbSelectedThree(event, fbcode, type) {
    if (event.source.selected) {
      if (type === 'inputs') {
        this.datasourceThree.data = [];
        this.FullReport = [];
        this.VGNameThree.reset();
        this.VGnameListThree = [];
        setTimeout(() => {
          document.getElementById('vgThreeInput').focus();
        }, 100);
      } else {
        this.datasourceThree.data = [];
        this.FullReport = [];
        this.ViewSupplierVGForm.get('VgName').reset();
        this.VGnameListThreeView = [];
        this.SuplierMapFilterList.data = [];
        setTimeout(() => {
          document.getElementById('vgCode').focus();
        }, 100);
      }
    }
  }

  EditThirdTab(row, gmenu, Template: TemplateRef<any>) {
    this.ShowMapInput = false;
    if (this.mainMenuSelected === 'VendorGroup') {
      this.thirdVGCode = row.VgCode;
      this.thirdVendorCode = row.supcode;
      this.EditThirdTabForm.get('vgName').setValue(row.VgName);
      this.EditThirdTabForm.get('vendor').setValue(row.SupName);
    } else if (this.mainMenuSelected === 'ItemGroup') {
      this.thirdVGCode = row.IgCode;
      this.thirdVendorCode = row.Icode;
      this.EditThirdTabForm.get('vgName').setValue(row.IgName);
      this.EditThirdTabForm.get('vendor').setValue(row.Iname);
    } else {
      this.thirdVGCode = row.IgCode;
      this.thirdVendorCode = row.Icode;
      this.EditThirdTabForm.get('vgName').setValue(row.IgName);
      this.EditThirdTabForm.get('vendor').setValue(row.Iname);
    }

    this.thirdTabEdit = true;
    this.thirdCmpCode = row.CmpCode;
    this.thirdFbCode = this.FinBookThree.value.FbCode;

    this.EditThirdTabForm.get('campName').setValue(row.CmpName);
    this.EditThirdTabForm.get('finbook').setValue(this.FinBookThree.value.FbName);

    this.EditThirdTabForm.get('fromDate').setValue(this.pipe.transform(row.FromDate, 'yyyy-MM-dd'));
    this.EditThirdTabForm.get('toDate').setValue(this.pipe.transform(row.ToDate, 'yyyy-MM-dd'));

    this.dialog.open(Template, {
      maxWidth: '700px', maxHeight: '630px', disableClose: true, autoFocus: false, data: 'Edit', panelClass: 'gDialogBox',
    });
  }

  UpdateThirdTabEdit(formValue) {
    if (this.EditThirdTabForm.valid) {
      this.commonservice.taskConfirmation('Are you sure to update ?', '', true, 'Update', '').then((res) => {
        if (res.isConfirmed) {
          const FromDate = moment(formValue.fromDate).format('DD-MMM-yyyy');
          const ToDate = moment(formValue.toDate).format('DD-MMM-yyyy');
          const APIJson = {
            reqMainreq: 'UpdateVendorToVendorGroup',
            var1: this.thirdVGCode,
            var2: this.thirdCmpCode,
            var3: Number(this.thirdVendorCode),
            var4: this.thirdFbCode,
            var5: FromDate,
            var6: ToDate,
          };
          let newObs$:Observable<any>;

          if (this.mainMenuSelected === 'VendorGroup') {
            APIJson.reqMainreq = 'UpdateVendorToVendorGroup';
            newObs$ = this.muruganservice.VendorGroupApi(APIJson);
          } else if (this.mainMenuSelected === 'ItemGroup') {
            APIJson.reqMainreq = 'UpdateItemToItemGroup';
            newObs$ = this.muruganservice.FinBookView(APIJson);
          } else {
            APIJson.reqMainreq = 'UpdateCustomerGroupToAcCode';
            newObs$ = this.muruganservice.VendorGroupApi(APIJson);
          }
          this.subs.add(newObs$.subscribe({
            next: (response) => {
              if (response.length === 0) {
                this.muruganservice.openSnackBar('No data available');
              } else if (response[0].StatusResponse === 'Success') {
                this.muruganservice.openSnackBar('Selected row was Updated successffuly');
                this.loadThirdTabData();
                this.dialog.closeAll();
              } else {
                Swal.fire({ title: response[0].StatusResponse });
              }
            },
            error: (error) => {
              this.muruganservice.openSnackBar(error.statusText);
            },
            complete: () => { },
          }));
        }
      });
    }
  }
  // =================================================================================================================================
  //      Common functions
  // =================================================================================================================================

  checkPermission = (componentName:String) => {
    const APIJson = {
      reqMainreq: 'UserRights',
      Usr: this.global.gUsrid,
      var1: componentName,
    };

    this.subs.add(this.muruganservice.FinBookView(APIJson).subscribe({
      next: (response) => {
        if (response.length === 0) {
          this.muruganservice.openSnackBar('No data available');
        } else if (response[0].StatusResponse === 'Success') {
          if (response[0].Permission === 'Y') {
            this.HaveAccess = true;
            if (this.mainMenuSelected === 'VendorGroup') {
              this.displayedColumns = ['SNo', 'VgId', 'VgName', 'Action'];
            }
          } else {
            this.HaveAccess = false;
            if (this.mainMenuSelected === 'VendorGroup') {
              this.displayedColumns = ['SNo', 'VgId', 'VgName'];
            }
          }
        } else {
          this.muruganservice.openSnackBar(response[0].StatusResponse);
        }
      },
      error: (error) => {
        if (error.statusText === 'Unknown Error') {
          this.muruganservice.openSnackBar('Server not connected');
        } else {
          this.muruganservice.openSnackBar(error.statusText);
        }
      },
      complete: () => { },
    }));
  }

  getCompanyname = () => {
    const APIJson = {
      reqMainreq: 'CompanyName',
      Usr: this.global.gUsrid,
      brcode: this.global.gBrcode,
    };

    this.subs.add(this.muruganservice.FinBookView(APIJson).subscribe({
      next: (response) => {
        if (response.length === 0) {
          this.muruganservice.openSnackBar('No data available');
        } else if (response[0].StatusResponse === 'Success') {
          this.CampNameOptions = response;
        } else {
          this.muruganservice.openSnackBar(response[0].StatusResponse);
        }
      },
      error: (error) => {
        if (error.statusText === 'Unknown Error') {
          this.muruganservice.openSnackBar('Server not connected');
        } else {
          this.muruganservice.openSnackBar(error.statusText);
        }
      },
      complete: () => { },
    }));
  }

  onTabChanged = (tabIndex:Number) => {
    this.datasource.data = [];
    this.datasourceTwo.data = [];
    this.datasourceThree.data = [];
    this.FullReport = [];

    switch (tabIndex) {
      case 0: {
        this.TabClickedIndex = 0;
        if (this.mainMenuSelected === 'CustomerGroup') {
          setTimeout(() => {
            this.refreshMasterTab(`${this.mainMenuSelected}View`);
          }, 300);
        } else {
          setTimeout(() => {
            this.refreshMasterTab(`${this.mainMenuSelected}MasterView`);
          }, 300);
        }
        break;
      }
      case 1: {
        this.TabClickedIndex = 1;
        setTimeout(() => {
          this.loadAcCodeToVGdata();
        }, 300);
        break;
      }
      case 2: {
        this.TabClickedIndex = 2;
        if (this.mainMenuSelected === 'VendorGroup') {
          const vgObj = {
            VgId: 'PUR',
            VgName: 'PURCHASE',
          };
          this.VGNameThree.setValue(vgObj);
          this.ViewSupplierVGForm.get('VgName').setValue(vgObj);
        }

        setTimeout(() => {
          this.loadThirdTabData();
        }, 300);

        break;
      }
      default: {
        break;
      }
    }
  }

  deleteConfirmation(row, type:String) {
    Swal.fire({

      title: 'Are you sure to Delete ?',

      icon: 'warning',

      showCancelButton: true,

      confirmButtonColor: '#3085d6',

      cancelButtonColor: '#d33',

      confirmButtonText: 'Yes, delete it!',

    }).then((result) => {
      if (result.isConfirmed) {
        if (type === 'MasterTab') {
          this.deleteMasterTableData(row);
        } else if (type === 'VgAcCodeMap') {
          this.deleteAcCodeMappedData(row);
        }
      }
    });
  }

deleteMasterTableData = (Row:Object | any) => {
  let APIJson;
  switch (this.mainMenuSelected) {
    case 'VendorGroup': {
      APIJson = {
        reqMainreq: 'DeleteVendorGroupMaster',
        Usr: this.global.gUsrid,
        brcode: this.global.gBrcode,
        var1: Row.VgId,
        var2: this.companyName.value.CmpCode,
        var3: Row.FbCode,

      };
      break;
    }

    case 'ItemGroup': {
      APIJson = {
        reqMainreq: 'DeleteItemGroupMaster',
        Usr: this.global.gUsrid,
        brcode: this.global.gBrcode,
        var1: Row.IgCode,
        var2: this.companyName.value.CmpCode,
        var3: Row.FbCode,
      };
      break;
    }
    default: {
      APIJson = {
        reqMainreq: 'DeleteCustomerGroup',
        Usr: this.global.gUsrid,
        brcode: this.global.gBrcode,
        var1: Row.CgCode,
        var2: this.companyName.value.CmpCode,
        var3: Row.FbCode,
      };
      break;
    }
  }

  this.subs.add(this.muruganservice.VendorGroupApi(APIJson).subscribe({
    next: (response) => {
      if (response.length === 0) {
        this.muruganservice.openSnackBar('No data available');
      } else if (response[0].StatusResponse === 'Success') {
        this.dialog.closeAll();
        this.muruganservice.openSnackBarWithDuration('Selected row was deleted successffuly', 2300);
        setTimeout(() => {
          if (this.mainMenuSelected === 'CustomerGroup') {
            this.LoadMasterValue(`${this.mainMenuSelected}View`);
          } else {
            this.LoadMasterValue(`${this.mainMenuSelected}MasterView`);
          }
        }, 100);
      } else {
        Swal.fire({ title: response[0].StatusResponse });
      }
    },
    error: (error) => {
      this.muruganservice.openSnackBar(error.statusText);
    },
    complete: () => { },
  }));
}

openCreateDialog(templateRef: TemplateRef<any>, action:String) {
  if (action === 'Create') {
    this.MasterEdit = false;
    this.CreateMasterForm.get('FbName').setValue(this.finbookName.value);
    this.CreateMasterForm.get('VgId').enable();
    this.CreateMasterForm.get('VgId').reset();
    this.CreateMasterForm.get('VgName').reset();
    this.dialog.open(templateRef, {
      maxWidth: '40vw', width: '800px', maxHeight: '630px', disableClose: true, autoFocus: false, data: action, panelClass: 'gDialogBox',
    });
  } else if (action === 'Two') {
    this.AccMapEdit = false;
    this.MapAcVGForm.get('VgName').reset();
    this.MapAcVGForm.get('AcCode').reset();
    this.MapAcVGForm.get('pytype').reset();
    this.MapAcVGForm.get('payableAccCode')?.reset();
    this.MapAcVGForm.get('AdvAccCode')?.reset();
    this.MapAcVGForm.get('FinBook').setValue(this.finbookNameTwo.value);
    this.MapAcVGForm.get('DepAccCode')?.reset();
    this.MapAcVGForm.get('EffDate').setValue(this.pipe.transform(new Date(), 'yyyy-MM-dd'));
    this.dialog.open(templateRef, {
      maxWidth: '55vw', maxHeight: '630px', disableClose: true, autoFocus: false, data: action, panelClass: 'gDialogBox',
    });
  } else {
    this.dialog.open(templateRef, {
      maxWidth: '40vw', width: '800px', maxHeight: '630px', disableClose: true, autoFocus: false, data: action, panelClass: 'gDialogBox',
    });
  }
  // if (action === 'Create') {
  //   this.dialog.open(templateRef, {
  //     maxWidth: '40vw', width: '800px', maxHeight: '630px', disableClose: true, autoFocus: false, data: action, panelClass: 'gDialogBox',
  //   });
  // } else {
  //   this.dialog.open(templateRef, {
  //     maxWidth: '55vw', maxHeight: '630px', disableClose: true, autoFocus: false, data: action, panelClass: 'gDialogBox',
  //   });
  // }
}

openViewDateWise(templateRef: TemplateRef<any>) {
  this.MapOption.setValue('');
  this.ShowMapInput = false;

  this.dialog.open(templateRef, {
    maxWidth: '800px', maxHeight: '630px', disableClose: true, autoFocus: false, panelClass: 'gDialogBox',
  });
}

filterCmp(keyValue, tabIndex) {
  const key = keyValue.toLocaleUpperCase();

  if (tabIndex === 'one') {
    this.CampNameOptionsList = this.CampNameOptions.filter((option) => option.company.toLocaleUpperCase().includes(key));
  } else if (tabIndex === 'two') {
    this.CampNameOptionsListTwo = this.CampNameOptions.filter((option) => option.company.toLocaleUpperCase().includes(key));
  } else if (tabIndex === 'three') {
    this.CampNameOptionsListThree = this.CampNameOptions.filter((option) => option.company.toLocaleUpperCase().includes(key));
  }
}

filterCmpPopUp(keyValue, tabIndex) {
  const key = keyValue.toLocaleUpperCase();

  if (tabIndex === 'one') {
    this.ViewCampNameOptionsListOne = this.CampNameOptions.filter((option) => option.company.toLocaleUpperCase().includes(key));
  } else if (tabIndex === 'two') {
    this.ViewCampNameOptionsListTwo = this.CampNameOptions.filter((option) => option.company.toLocaleUpperCase().includes(key));
  } else if (tabIndex === 'three') {
    this.ViewCampNameOptionsListThree = this.CampNameOptions.filter((option) => option.company.toLocaleUpperCase().includes(key));
  }
}

FBThreeInput(keyValue, type) {
  const key = keyValue.toLocaleUpperCase();

  if (type === 'inputs') {
    this.FbTabThree = this.FinBookOptionsListThree.filter((option) => option.FbName.toLocaleUpperCase().includes(key));
  } else {
    this.FbTabThreeView = this.FinBookOptionsViewThree.filter((option) => option.FbName.toLocaleUpperCase().includes(key));
  }
}

applyFilter(event: any) {
  if (this.TabClickedIndex === 0) {
    this.datasource.filter = event.trim().toLowerCase();
  } else if (this.TabClickedIndex === 1) {
    this.datasourceTwo.filter = event.trim().toLowerCase();
  } else if (this.TabClickedIndex === 2) {
    this.datasourceThree.filter = event.trim().toLowerCase();
  }
}

ShowMapOption() {
  this.ShowMapInput = true;
  setTimeout(() => {
    document.getElementById('mapping')?.focus();
  }, 100);
  this.MapOption.reset();
  this.SupplierName.reset();
}

  displayFn = (option) => (option && option.company ? option.company : '')

  displayFinbookname = (option) => (option && option.FbName ? option.FbName : '')

  displayFinbookname1 = (option) => (option && option.FbName ? option.FbName : '')

  displayFinbookname2 = (option) => (option && option.FbName ? option.FbName : '')

  displayVgName = (option) => (option && option.VgName ? option.VgName : '')

  displayIgName = (option) => (option && option.IgName ? option.IgName : '')

  displayCgName = (option) => (option && option.CgName ? option.CgName : '')

  displayAcCode = (option) => (option && option.AcCodeName ? option.AcCodeName : '')

  displaySupplier = (option) => (option && option.SupName ? `${option.supcode}-${option.SupName}` : '')

  displayItem = (option) => (option && option.iname ? `${option.icode}-${option.iname}` : '')

  displayCustomer = (option) => (option && option.CustName ? `${option.CustCode}-${option.CustName}` : '')

  keytab1 = (event: any, id: any) => this.muruganservice.focusNext(event, id);

  focusNext(id: any) {
    setTimeout(() => {
      document.getElementById(id)?.focus();
    }, 100);
  }

  XLExportBranchMapTable(tabledata, title) {
    if (tabledata.length > 0) {
      this.muruganservice.exportAsExcelFile(tabledata, title);
    } else {
      this.muruganservice.openSnackBar('No data To Export');
    }
  }

  keytab(e: any) {
    if (e.key.toLowerCase() === 'enter') {
      const { form } = e.target;
      const index = [...form].indexOf(e.target);
      form.elements[index + 1].focus();
      e.preventDefault();
    }
  }

  ngAfterViewInit() {
    this.datasourceTwo.sort = this.sort2;
    this.datasourceThree.sort = this.sort3;
  }

  onTableScroll(length) {
    this.viewMoreLoad = true;
    setTimeout(() => {
      const extra = [...this.FullReport].splice(length, this.limitData);
      if (extra.length > 0) {
        extra.forEach((element) => {
          this.datasourceThree.data.push(element);
        });
        this.datasourceThree._updateChangeSubscription();
        if (this.datasourceThree.data.length === this.FullReport.length) {
          this.extraAvailable = false;
        } else {
          this.extraAvailable = true;
        }
      } else {
        this.extraAvailable = false;
      }

      this.viewMoreLoad = false;
    }, 50);
  }

  openBottomSheet(Template:TemplateRef<any>): void {
    this.bottomSheet.open(Template, {
      disableClose: true,
      panelClass: 'bottomSheetContainer',

    });
  }

  headerLoad() {
    this.displayedColumnsTwo = [];
    this.displayedArr.forEach((element:any) => {
      if (element.display === true) {
        this.displayedColumnsTwo.push(element.name);
      }
    });
  }

  headerLoadAll() {
    this.bottomSheet.dismiss();
  }
ngOnDestroy(): void {
  //Called once, before the instance is destroyed.
  //Add 'implements OnDestroy' to the class.
  console.log('asd');
    
  Swal.close(); this.subs.unsubscribe();
  this.datasource.data = [];
  this.datasourceTwo.data = [];
  this.datasourceThree.data = [];
}
  // ngOnDestroy = () => {
  //   console.log('asd');
    
  //   Swal.close(); this.subs.unsubscribe();
  //   this.datasource.data = [];
  //   this.datasourceTwo.data = [];
  //   this.datasourceThree.data = [];
  // }
}
