/* eslint-disable no-self-assign */
/* eslint-disable eqeqeq */
/* eslint-disable import/no-duplicates */
/* eslint-disable max-classes-per-file */
import { Validators } from '@angular/forms';
/* eslint-disable import/no-duplicates */
/* eslint-disable no-redeclare */
/* eslint-disable max-classes-per-file */
/* eslint-disable no-underscore-dangle */
/* eslint-disable max-classes-per-file */
import { MatTable, MatTableDataSource } from '@angular/material/table';
/* eslint-disable no-param-reassign */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-empty */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-use-before-define */
/* eslint-disable import/order */
/* eslint-disable max-classes-per-file */
/* eslint-disable class-methods-use-this */
/* eslint-disable max-len */
/* eslint-disable array-callback-return */
/* eslint-disable no-plusplus */
/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import {
  HostListener, Pipe, PipeTransform, ViewChild,
} from '@angular/core';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Globals } from 'src/app/globals';
// import { DateAdapter, MAT_DATE_FORMATS }  from '@angular/material/core';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { InventoryService } from '../services/inventory.service';
import { SubSink } from 'subsink';
import { DatePipe, formatDate } from '@angular/common';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { CommonAuthourityComponent } from '../common-authourity/common-authourity.component';
import { CommonService } from 'src/app/services/common.service';
import { fromEvent } from 'rxjs';
import { MatSort } from '@angular/material/sort';

declare let $: any;

@Component({
  selector: 'app-dcout',
  templateUrl: './dcout.component.html',
  styleUrls: ['./dcout.component.scss'],
})
export class DcoutComponent implements OnInit, OnDestroy {
  gCmplogo: string;

  collape2 = false;

  collape3 = false;

  MainOption = 'MANUAL';

  isSelectOption = 'scan'; // scan // online // view  // InterChange

  isOption = 'OPTION'; // OPTION // ITEMLIST  //VIEWLIST //SINGLEVIEW // SAVEVIEW

  vehSearchControl = new FormControl({}, Validators.required);

  vehList: any = [];

  myControl = new FormControl({}, Validators.required);

  searchItem = new FormControl();

  private subs = new SubSink();

  dcoutItems: DcOutItems = new DcOutItems();

  itemDetail: InventryItem = new InventryItem();

  isSearch = true;

  searchTemp = '';

  searchTempOne= ''

 fromBrcode = '';

 fromUsr = '';

 issueType = '';

 progressval = '';

  branch: any = '';

  selectbrCode: any = '';

  selectDriname: any = '';

  selectVehicle: any = '';

  qty: any;

 tment = 'Tray';

 tray: any;

  trnFrdate: any;

 trntodate: any;

 today = new Date();

  isPrint = true;

  subtotal = '0.00';

 taxAmount = '0.00';

 finalAmount = '0.00';

 prntTotal = 0;

  branches: any = [];

  individuals = new MatTableDataSource([]);

  printList: any = [];

  items: any = [];

  isKeyVerify: boolean = false;

  qrType: boolean = false;

  ewayList: any = [];

  selDcnum = '';

  indentDate: any;

  selList: any = [];

  themeModel:any ;

  selIndent = '';

  isDesc: boolean = false;

  column: any;

 direction: any;

  classArrTable: any = [];

 @ViewChild(MatSort) set matSort(sort: MatSort) {
    this.individuals.sort = sort;
  }

  displayedColumns = ['SNo', 'DestiBrname', 'todaydate', 'TrnTime', 'TrnNo', 'View', 'Option']

  themeS: any[] = [{
    title: 'Bright Gray', value: 'Green', primary: '#30d493', secoundry: '#ffffff', checked: true,
  },
  {
    title: 'Shadow Blue', value: 'Blue', primary: '#193482', secoundry: '#ffffff', checked: false,
  }]

  constructor(
    public dialog: MatDialog,
    private inventryService: InventoryService,
    private router: Router,
    private globals: Globals,
private datePipe: DatePipe,
private commonservice: CommonService,

  ) {
    this.fromBrcode = this.globals.gBrcodeString;
    this.fromUsr = this.globals.gUsrid;
    this.inventryService.apiUrl = this.globals.gApiserver;
    this.issueType = this.globals.gmainMenuSelected;

    this.subs.add(this.searchItem.valueChanges.pipe(debounceTime(300)).subscribe((myvardatas) => {
      this.loadDatas('ItemSearch', myvardatas);
    }));

    this.subs.add(this.myControl.valueChanges.pipe(debounceTime(300)).subscribe((data) => {
      this.loadDatas('BranchSelection', data);
    }));

    this.subs.add(this.vehSearchControl.valueChanges.pipe(debounceTime(300)).subscribe((data) => {
      this.loadDatas('VehicleNoSearch', data);
    }));
  }

  ngOnInit() {
    if (!this.issueType) {
      this.router.navigateByUrl('/dashboard');
    }
    this.MainOption = 'MANUAL';
    this.isKeyVerify = true;
    this.gCmplogo = this.globals.gCmplogo;
    this.tment = 'Tray';
    const index = localStorage.getItem('setThemeIndex') || '0';
    this.shortcuts();
  }

  changeTheme(event: any, i: any, theme: any) {
    for (let index = 0; index < this.themeS.length; index++) {
      this.themeS[index].checked = false;
    }
    this.themeS[i].checked = true;
    localStorage.setItem('setThemeIndex', i);
    document.scrollingElement.setAttribute('data-theme', theme.value);
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  selectOptions(option: any) {
    this.myControl.setValue('');
    this.vehSearchControl.setValue('');

    if (option === 'manual') {
      if (this.MainOption === 'SCAN') {
        this.isKeyVerify = false;
        this.openKeyDialog('DcInOffline', 'branchselect', 'KEYONLY');
      } else {
        this.isKeyVerify = true;
      }
    } else if (option === 'view') {
      this.trnFrdate = this.today;
      this.trntodate = this.today;
    } else if (option === 'InterChange') {
      this.isKeyVerify = false;
      this.openKeyDialog('DcInOffline', 'dcnum', 'OTPONLY');
    }
    this.items = [];
    this.branch = undefined;
    this.selectbrCode = undefined;
    this.selectDriname = undefined;
    this.selectVehicle = undefined;
    this.individuals = new MatTableDataSource([]); this.isSelectOption = option;
    this.myControl.reset(); this.searchItem.reset();
  }

  importDcitems() {
    this.progressval = 'indeterminate';
    this.subs.add(this.inventryService.InventryScanFile(
      'DcOutReadQrFile',
      '0',
      this.globals.gTerCode,
      '0',
      '0',
      this.fromBrcode,
      '0',
      this.issueType,
      '0',
      '0',
      this.fromUsr,
      this.globals.gApiserver,
      this.globals.gFileSharingPath,
      this.globals.gFileShareBackupPath,
    ).subscribe((result: any) => {
      this.progressval = '';
      const data = result;
      if (data != null && data.length > 0) {
        if (data[0].Result === 'Success') {
          Swal.fire({ text: 'Barcodes imported successfully' });
        } else if (data[0].Result === 'Failed') {
          Swal.fire({ text: data[0].errorMsg });
        } else {
          Swal.fire({ text: 'Barcodes Imported Failed' });
        }
      } else {
        Swal.fire({ text: 'Barcodes Imported Failed' });
      }
    }, (err: any) => {
      this.progressval = '';
      Swal.fire({ html: err.error });
    }));
  }

  viewUnsavedDcs() {
    this.progressval = 'indeterminate';
    this.subs.add(this.inventryService.getInventryReport(
      'ConsView_Qrcode_Uploaded_But_Dc_OUT_NotSaved',
      '0',
      this.globals.gTerCode,
      '0',
      '0',
      this.fromBrcode,
      '0',
      '0',
      '0',
      '0',
      this.fromUsr,
      '0',
      '0',
      '0',
    ).subscribe((result) => {
      this.progressval = '';
      const val = result;
      if (val != null && val.length > 0) {
        this.items = val;
      } else {
        Swal.fire({ text: 'No Data Found ..' });
      }
    }, (err) => {
      this.progressval = '';

      Swal.fire({ html: err.error });
    }));
  }

  viewQrcodeWise(option: any, brcode: any, brname: any, qrtype: any) {
    this.qrType = qrtype;
    this.branch = brname;
    this.selectbrCode = brcode;
    this.progressval = 'indeterminate';
    this.subs.add(this.inventryService.getInventryReport(
      'SngleDc_Qrcode_Uploaded_But_Dc_OUT_NotSaved',
      '0',
      this.globals.gTerCode,
      '0',
      '0',
      this.fromBrcode,
      '0',
      '0',
      '0',
      '0',
      this.fromUsr,
      '0',
      option,
      brcode,
    ).subscribe((result) => {
      this.progressval = '';
      const val = result;
      if (val != null && val.length > 0) {
        this.individuals = new MatTableDataSource(val);
        this.isOption = 'SCANITEMS';
      } else {
        Swal.fire({ text: 'No Data Found ..' });
      }
    }, (err) => {
      this.progressval = '';
      Swal.fire({ html: err.error });
    }));
  }

  qrcodeRemove(qrcode: any) {
    this.commonservice.taskConfirmation('Are you sure to Remove ?', '', true, 'Remove', '').then((res) => {
      if (res.isConfirmed) {
        this.progressval = 'indeterminate';
        this.subs.add(this.inventryService.getInventryReport(
          'RemoveDCOUTScanned_Trays',
          '0',
          this.globals.gTerCode,
          '0',
          '0',
          this.fromBrcode,
          '0',
          '0',
          '0',
          '0',
          this.fromUsr,
          '0',
          qrcode,
          this.selectbrCode,
        ).subscribe((result) => {
          this.progressval = '';
          const val = result;
          if (val != null && val.length > 0) {
            this.viewQrcodeWise('QrcodeWise', this.selectbrCode, this.branch, true);
          } else {
            Swal.fire({ text: 'Qrcode Delete Failed ..' });
          }
        }, (err) => {
          this.progressval = '';

          Swal.fire({ html: err.error });
        }));
      }
    });
  }

  selectscanDri(event: any) {
    if (event.key === 'Enter') {
      if (this.selectDriname === null || this.selectDriname === undefined || this.selectDriname === '') {
        Swal.fire({ text: 'Enter the driver name' });
        document.getElementById('scanDriver')?.focus();
      } else {
        document.getElementById('scanvehicle')?.focus();
      }
    }
  }

  selectscanVeh(event: any) {
    if (event.key === 'Enter') {
      if (this.selectVehicle === null || this.selectVehicle === undefined || this.selectVehicle === '') {
        if (this.isSelectOption === 'InterChange') {
          Swal.fire({ text: 'Enter the DC number' });
          document.getElementById('dcnum')?.focus();
        } else {
          Swal.fire({ text: 'Enter the Vehicle number' });
          document.getElementById('scanvehicle')?.focus();
        }
      } else if (this.isSelectOption === 'InterChange') {
        document.getElementById('branchselect2')?.focus();
      } else {
        document.getElementById('scanSave')?.focus();
      }
    }
  }

  scanSave() {
    if (this.selectDriname === null || this.selectDriname === undefined || this.selectDriname === '') {
      document.getElementById('scanDriver')?.focus();
      Swal.fire({ text: 'Enter the driver name' });
    } else if (this.selectVehicle === null || this.selectVehicle === undefined || this.selectVehicle === '') {
      Swal.fire({ text: 'Enter the Vehicle number' });
      document.getElementById('scanvehicle')?.focus();
    } else {
      this.saveOption();
    }
  }

  openKeyDialog(value: any, focusoption: any, option: any) {
    let dialogData: any;
    const dialogRef = this.dialog.open(CommonAuthourityComponent, {
      width: '450px',
      data: {
        data: 'N/A',
        authorityFlg: 'DcDelete_ThumbApproval',
        smsCaption: value,
        dialogType: option,
        keyCaption: value,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      dialogData = result;
      if (dialogData === undefined) {

      } else if (dialogData.event === 'Success') {
        this.isKeyVerify = true;
        document.getElementById(focusoption)?.focus();
      } else if (dialogData.event === 'Failed') {
        this.isKeyVerify = false;
        Swal.fire({ text: ' Key authentication failed..!' });
      } else {
        this.isKeyVerify = false;
      }
    });
  }

  SelectView() {
    this.progressval = 'indeterminate';
    this.subs.add(this.inventryService.getInventryReport(
      'GTNViewAllDate',
      '0',
      this.globals.gTerCode,
      '0',
      '0',
      this.fromBrcode,
      '0',
      this.issueType,
      this.changeFinalDateFormat(this.trnFrdate),
      this.changeFinalDateFormat(this.trntodate),
      this.fromUsr,
      '0',
      this.issueType,
      '0',
    ).subscribe((result) => {
      this.progressval = '';
      const val = result;
      if (val != null && val.length > 0) {
        this.individuals = new MatTableDataSource(val);
        this.isOption = 'VIEWLIST';
      } else {
        Swal.fire({ text: 'No Data Found ..' });
      }
    }, (err) => {
      this.progressval = '';
      Swal.fire({ html: err.error });
    }));
  }

  openDialog(trnNo: any, i: any) {
    let dialogData: any; let List = [];
    const dialogRef = this.dialog.open(CommonAuthourityComponent, {
      width: '450px',
      data: {
        dialogType: 'ALL',
        data: trnNo,
        authorityFlg: 'DcDelete_ThumbApproval',
        smsCaption: 'DC_Deletion',
        keyCaption: '0',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      dialogData = result;

      if (dialogData === undefined) {

      } else if (dialogData.event === 'Success') {
        Swal.fire({
          title: 'Are you sure?',
          showCancelButton: true,
          confirmButtonText: 'Yes',
          cancelButtonText: 'No',
          confirmButtonColor: '#4caf50',
          cancelButtonColor: '#ff80ab',
        }).then((result) => {
          if (result.value) {
            this.progressval = 'indeterminate';
            const tdate = this.individuals.data.find((x: { TrnNo: any; }) => x.TrnNo === dialogData.data).todaydate;
            this.subs.add(this.inventryService.getInventryReport(
              'DeleteGTNDateSno',
              '0',
              this.globals.gTerCode,
              '0',
              '0',
              this.fromBrcode,
              '0',
              this.issueType,
              '0',
              '0',
              this.fromUsr,
              dialogData.approvalAuthname,
              this.changeFinalDateFormat(tdate),
              dialogData.data,
            ).subscribe((data) => {
              this.progressval = '';
              List = data;

              if (List.length > 0) {
                if (List[0].StatusMsg === 'Success') {
                  this.individuals.data.splice(i, 1);
                  this.progressval = '';
                  Swal.fire({ text: 'DC Delete Success' });
                } else if (List[0].StatusMsg !== 'Success') {
                  this.progressval = '';
                  Swal.fire({ text: ' Dc Delete Failed' });
                }
              } else {
                this.progressval = '';
                Swal.fire({ text: ' Dc Delete Failed' });
              }
            }, (err) => {
              this.progressval = '';
              Swal.fire({ html: err.error });
            }));
          } else if (result.dismiss === Swal.DismissReason.cancel) { }
        });
      } else {
        Swal.fire({ text: ' Dc Delete Failed' });
      }
    });
  }

  viewById(trnno: any, date: any) {
    this.printList = []; this.prntTotal = 0;
    this.progressval = 'indeterminate';
    this.subs.add(this.inventryService.getInventryReport(
      'GTNViewDateSno',
      '0',
      this.globals.gTerCode,
      '0',
      '0',
      this.fromBrcode,
      '0',
      this.issueType,
      '0',
      '0',
      this.fromUsr,
      '0',
      this.changeFinalDateFormat(date),
      trnno,
    ).subscribe((result) => {
      this.progressval = '';
      const List = result;
      this.dcoutItems = List[0];

      if (List.length > 0) {
        for (let i = 0; i < List.length; i++) {
          this.prntTotal += (List[i].irate * List[i].qty);
        }

        const groubedByTeam = this.getGroupBY(List, 'subcat');
        const keys = Object.keys(groubedByTeam);
        let index = 1;

        for (let i = 0; i < keys.length; i++) {
          const taxItem = groubedByTeam[keys[i]];

          for (let j = 0; j < taxItem.length; j++) {
            taxItem[j].sno = index + j;
          }

          index += taxItem.length;
          this.printList.push({ subcat: keys[i], result: taxItem });
        }

        this.isOption = 'SINGLEVIEW';
      } else {
        Swal.fire({ text: 'No Data Found ..' });
        this.progressval = '';
      }
    }, (err) => {
      this.progressval = '';
      Swal.fire({ html: err.error });
    }));
  }

  viewPrint(date: any, trnNo: any) {
    if (this.globals.gprinterForterminal4080 === '40') {
      this.progressval = 'indeterminate';
      this.subs.add(this.inventryService.getInventryPrint(
        'DcOutprinting',
        '0',
        this.globals.gTerCode,
        this.globals.TmpCdeFedG,
        '0',
        this.fromBrcode,
        '0',
        this.issueType,
        this.inventryService.apiUrl,
        this.globals.gNetworkprinterIp,
        this.fromUsr,
        '0',
        date,
        trnNo,
      ).subscribe((print: any) => {
        this.progressval = '';
        const prnResul = print;
        if (prnResul[0].statusMsg === 'Done') {
          Swal.fire({ text: 'DC Reprint Success' });
        } else {
          Swal.fire({ text: prnResul[0].errorMsg });
        }
      }, (err: any) => {
        this.progressval = '';
        Swal.fire({ html: err.error });
      }));
    } else if (this.globals.gprinterForterminal4080 === '80') {
      document.getElementById('print_dcbtn')?.click();
    }
  }

  loadDatas(ReqMain: any, var3: any) {
    let extra1 = '0';
    if (ReqMain === 'VehicleNoSearch') {
      extra1 = var3;
    }
    if (ReqMain === 'ItemSearch') {
      this.items = [];
    } else if (ReqMain === 'VehicleNoSearch') {
      this.vehList = [];
    } else {
      this.branches = [];
    }
    this.inventryService.getInventryReport(
      ReqMain,
      '0',
      this.globals.gTerCode,
      '0',
      '0',
      this.fromBrcode,
      '0',
      this.issueType,
      '0',
      '0',
      this.fromUsr,
      extra1,
      this.issueType,
      var3,
    ).subscribe((result) => {
      const val = result;
      if (val != null && val.length > 0) {
        if (ReqMain === 'ItemSearch') {
          this.items = val;
        } else if (ReqMain === 'VehicleNoSearch') {
          this.vehList = val;
        } else {
          this.branches = val;
        }
      } else { }
    }, (err) => {
      Swal.fire({ html: err.error });
    });
  }

  selectNext() {
    if (this.myControl.invalid) {
      Swal.fire({ text: 'Enter the DC To' });
    } else if (typeof this.myControl.value !== 'object') {
      Swal.fire({ text: 'Enter the valid DC To' });
    } else if (this.selectDriname === null || this.selectDriname === undefined || this.selectDriname === '') {
      Swal.fire({ text: 'Enter the driver name', timer: 400 });
      document.getElementById('Driver').focus();
    } else if (this.vehSearchControl.invalid) {
      Swal.fire({ text: 'Enter the Vehicle No' });
    } else if (typeof this.vehSearchControl.value !== 'object') {
      Swal.fire({ text: 'Enter the Valid Vehicle No' });
    } else {
      // console.log(this.branches, this.branch);

      // this.selectbrCode = this.branches.find((x) => x.brname === this.branch).brcode;

      // console.log(this.selectbrCode);

      this.selectbrCode = this.myControl.value.brcode;
      this.isOption = 'ITEMLIST';
      this.clear();
      this.individuals = new MatTableDataSource([]);
      setTimeout(() => { document.getElementById('icode').focus(); this.tment = 'Tray'; }, 200);
    }
  }

  Allclear() {
    this.searchItem.setValue('');
    this.itemDetail.iname = '';
    this.itemDetail.iqty = '';
    this.qty = '';
    this.tray = '';
    this.itemDetail.icode = '';
    this.individuals.data = [];
    this.tment = 'Tray';
    setTimeout(() => {
      document.getElementById('icode')?.focus();
    }, 100);
  }

  clear() {
    this.searchItem.setValue('');
    this.itemDetail.iname = '';
    this.itemDetail.iqty = '';
    this.qty = '';
    this.tray = '';
    this.itemDetail.icode = '';
    this.tment = 'Tray';
    setTimeout(() => {
      document.getElementById('icode')?.focus();
    }, 100);
  }

  shortcuts() {
    const keydown$ = fromEvent(window, 'keydown');
    this.subs.add(keydown$.subscribe((event: KeyboardEvent) => {
      if (event.altKey && (event.key === 'c' || event.key === 'C')) {
        if (this.isOption !== 'ITEMLIST') {
          return;
        }
        event.preventDefault();
        this.clear();
        this.individuals = new MatTableDataSource([]);
      }
      if (event.altKey && (event.key === 's' || event.key === 'S')) {
        if (this.isOption !== 'ITEMLIST') {
          return;
        }
        event.preventDefault();
        this.getSaveValues();
      }
      if (event.altKey && (event.key === 'x' || event.key === 'X')) {
        if (this.isOption !== 'ITEMLIST') {
          return;
        }
        event.preventDefault();
        this.backNavigation();
      }
    }));
  }

  openSearch() {
    if (this.isSearch) {
      this.isSearch = false;
      this.items = [];
      setTimeout(() => {
        document.getElementById('searchitem')?.focus();
        this.searchItem.reset();
      }, 400);
    } else {
      this.isSearch = true;
    }
  }

  focusNext(event, id) {
    if (event.key === 'Enter' && event.target.value !== '') {
      setTimeout(() => {
        document.getElementById(id)?.focus();
      }, 100);
    }
  }

  selectEvent(event: any, option: any) {
    if (event.key === 'Enter' && event.target.value !== '') {
      this.selectFocus(event, option);
    }
  }

  selectTrayEvent(event: any, option: any) {
    if (event.key === 'Enter') {
      if (this.tray === undefined || this.tray === null || this.tray === '' || this.tray === '0') {
        this.selectFocus(event, 'tray');
      } else {
        this.checkItems('CheckAndUpdate');
      }
    }
  }

  selectTrayEvent1(event: any, option: any) {
    if (event.source.selected) {
      setTimeout(() => {
        if (this.tray === undefined || this.tray === null || this.tray === '' || this.tray === '0') {
          this.selectFocus(event, 'tray');
        } else {
          document.getElementById('addBtn')?.focus();
        }
      }, 100);
    }
  }

  checkValidation() {
    if (this.itemDetail.icode === undefined || this.itemDetail.icode === null || this.itemDetail.icode === '') {
      Swal.fire({ text: 'Enter the Item Code' });
      return false;
    } if (this.itemDetail.iname === null || this.itemDetail.iname === '' || this.itemDetail.iname === undefined) {
      Swal.fire({ text: 'Enter Item name' });
      return false;
    } if (this.qty === null || this.qty === '' || this.qty === undefined || Number(this.qty) <= 0) {
      Swal.fire({ text: 'Enter the Item Qty' });
      return false;
    } if (this.tray === null || this.tray === '' || this.tray === undefined) {
      Swal.fire({ text: 'Enter Tray' });
      return false;
    }
    return true;
  }

  checkItems(option: any) {
    if (this.checkValidation()) {
      let checkResult = [];
      const checkItem = `${this.itemDetail.icode}|${this.qty}|NP|Nil`;
      this.progressval = 'indeterminate';
      this.subs.add(this.inventryService.getInventryReport(
        'StockCheckForIcodes',
        '0',
        this.globals.gTerCode,
        '0',
        '0',
        this.fromBrcode,
        '0',
        this.issueType,
        '0',
        '0',
        this.fromUsr,
        '0',
        this.issueType,
        checkItem,
      ).subscribe((result) => {
        this.progressval = '';
        checkResult = result;
        if (checkResult[0].statusMsg === 'OK') {
          if (option === 'CheckAndUpdate') {
            if (this.tray === undefined || this.tray === null || this.tray === '' || this.tray === '0') {
              Swal.fire({ text: 'Enter the Tray' });
              this.selectFocus(option, 'tray');
            } else {
              setTimeout(() => {
                this.selectFocus(option, 'icode');
              }, 10);

              this.getItemDetails('itemWithQty');
            }
          } else {
            this.tray = '1';

            setTimeout(() => {
              this.selectFocus(option, 'tray');
            }, 100);
          }
        } else {
          Swal.fire({ text: checkResult[0].statusMsg });
        }
      }, (err: any) => {
        this.progressval = '';
        Swal.fire({ html: err.error });
      }));
    }
  }

  getItemDetails(option: any) {
    if (this.itemDetail?.icode && this.itemDetail?.icode !== '') {
      this.isSearch = true;
      let details: any = [];
      this.progressval = 'indeterminate';
      this.subs.add(this.inventryService.getInventryReport(
        'GetItemDetailsCode',
        '0',
        this.globals.gTerCode,
        '0',
        '0',
        this.fromBrcode,
        this.itemDetail.icode,
        this.issueType,
        '0',
        '0',
        this.fromUsr,
        '0',
        this.issueType,
        '0',
      ).subscribe((result) => {
        this.progressval = '';
        details = result;
        const uom = this.itemDetail.mment;
        if (details !== null) {
          this.itemDetail = details[0];
        }
        if (this.itemDetail.result === 'OK' && this.itemDetail.iname) {
          if (this.itemDetail.mment !== uom) {
            this.qty = '';
            this.selectFocus(option, 'qty');
            return;
          }
          if (option === 'itemWithQty' && this.checkValidation()) {
            this.itemDetails();
          }
        } else if (this.itemDetail.result === 'NOK') {
          Swal.fire({ text: 'Invalid Item Code', timer: 1000 });

          setTimeout(() => {
            this.selectFocus(option, 'icode');
          }, 100);
        } else {
          Swal.fire({ text: 'Invalid Item code' });
        }
      }, (err) => {
        this.progressval = '';
        Swal.fire({ html: err.error });
      }));
    }
  }

  itemDetails() {
    this.itemDetail.tmment = this.tment;
    this.itemDetail.tray = Number(this.tray);
    this.itemDetail.iqty = Number(this.qty);
    this.itemDetail.value = this.itemDetail.dcrate * this.itemDetail.iqty;
    this.itemDetail.gstValue = this.getTaxCalculate(this.itemDetail.dcrate, this.itemDetail.gst);
    this.itemDetail.cessValue = this.getTaxCalculate(this.itemDetail.dcrate, this.itemDetail.cess);
    this.addItem();
  }

  getItemByCode(event: any) {
    if (event.key === 'Enter' && event.target.value !== '') {
      this.getItemDetails('onlyitem');
    }
  }

  InterChange(event: any, id) {
    if (event.key === 'Enter' && event.target.value !== '') {
      this.selectFocus(event, 'itemDetail');
    }
  }

  getSelectedIcode(event: any, item) {
    if (event.source.selected) {
      this.itemDetail.iname = item.iname;
      this.itemDetail.icode = item.icode;
      this.isSearch = true;
      this.selectFocus(event, 'qty');
      this.getItemDetails('onlyitem');
      this.searchItem.reset();
    }
  }

  getItemCheck(event: any) {
    if (event.key === 'Enter') {
      if (this.qty === '' || this.qty === null || this.qty === undefined) {
        Swal.fire({ text: 'Enter the Quantity..' });
      } else {
        document.getElementById('tray')?.focus();
      }
    }
  }

  addItem() {
    if (this.individuals.data.length === 0) {
      this.individuals.data.push(this.itemDetail);
      this.pushItems();
      this.clear();
    } else {
      const index = this.individuals.data.findIndex((x: { icode: string; }) => x.icode === this.itemDetail.icode);
      if (index === -1) {
        this.individuals.data.push(this.itemDetail);
        this.pushItems();
        this.clear();
      } else {
        this.commonservice.openSnackbar('Item Already added', 'OK', 2500);
        document.getElementById('icode')?.focus();

        this.searchItem.setValue('');
        // this.itemDetail.iname = '';
        // this.itemDetail.iqty = '';
        // this.qty = '';
        // this.tray = '';
        // this.itemDetail.icode = '';
        // this.tment = 'Tray';
        // this.itemDetail = new InventryItem();
      }
    }
  }

  pushItems() {
    this.itemDetail = new InventryItem();
    this.qty = undefined;
    this.tment = 'Tray'; this.tray = undefined;
    this.selectFocus('select', 'icode');

    this.getFinalValues();
  }

  getTaxCalculate(cost: number, tax: number): any {
    let taxAmt = 0;
    taxAmt = (cost * tax) / 100;
    return taxAmt;
  }

  getFinalValues() {
    let totalgst = 0; let totalcess = 0; let subValue = 0; this.subtotal = '0.00';
    this.taxAmount = '0.00'; let finalAmt = 0; let finalTax = 0;

    for (let i = 0; i < this.individuals.data.length; i++) {
      subValue += this.individuals.data[i].value;
      totalgst += this.individuals.data[i].gstValue;
      totalcess += this.individuals.data[i].cessValue;
    }

    finalTax = totalgst + totalcess;
    finalAmt = subValue + finalTax;
    this.subtotal = Number(subValue).toFixed(2);
    this.taxAmount = Number(finalTax).toFixed(2);
    this.finalAmount = Number(finalAmt).toFixed(2);
    this.progressval = '';
  }

  getDcnumForDetails() {
    if (this.selDcnum === '' || this.selDcnum === undefined || this.selDcnum === null) {
      Swal.fire({ text: 'Enter dc number .....' });
    } else {
      this.loadDatasSaranApi('getDcBranch', this.globals.gBrcode, this.selDcnum, '0', '0', '0', '0', '0', '0', '0', '0', '0', '0');
    }
  }

  isItems = true;

  itemShow() {
    this.isItems = !this.isItems;
    setTimeout(() => {
      document.getElementById('icode')?.focus();
    }, 500);
  }

  datechange(id) {
    setTimeout(() => {
      document.getElementById(id)?.focus();
    }, 100);
  }

  getItemsList(data: any) {
    if (data.length > 0) {
      if (data[0].StatusResponse === 'Success') {
        data.forEach((e: any) => {
          e.dcrate = e.rate;
          e.value = e.dcrate * e.iqty;
          e.gstValue = this.getTaxCalculate(e.dcrate, e.gst);
          e.cessValue = this.getTaxCalculate(e.dcrate, e.cess);
        });
        this.individuals = new MatTableDataSource(data);
        $('#filterModal').modal('hide');
      } else {
        Swal.fire({ text: data[0].StatusResponse });
      }
    } else {
      Swal.fire({ text: 'Items not found' });
    }
  }

  getDateForList() {
    if (this.indentDate === '' || this.indentDate === undefined || this.indentDate === null) {
      Swal.fire({ text: 'Enter indent date .....' });
    } else {
      this.selList = [];
      this.selIndent = '';
      this.loadDatasSaranApi('Indent_ShiftList', '0', this.datePipe.transform(this.indentDate, 'dd-MMM-yyyy'), this.selectbrCode, '0', '0', '0', '0', '0', '0', '0', '0', '0');
    }
  }

  getItems() {
    if (this.indentDate === '' || this.indentDate === undefined || this.indentDate === null) {
      Swal.fire({ text: 'Enter indent date .....' });
    } else if (this.selIndent === '' || this.selIndent === undefined || this.selIndent === null) {
      Swal.fire({ text: 'Select Indent list .....' });
    } else {
      this.loadDatasSaranApi('GetIndentList', '0', this.changeFinalDateFormat(this.indentDate), this.selectbrCode, this.selIndent, '0', '0', '0', '0', '0', '0', '0', '0');
    }
  }

  loadDatasSaranApi(reqmain: any, brcode: any, extra1: any, extra2: any, extra3: any, extra4: any, extra5: any, extra6: any, extra7: any, extra8: any, extra9: any, extra10: any, extra11: any) {
    this.progressval = 'indeterminate';
    this.subs.add(this.inventryService.datareqsarnSix({
      reqMainreq: reqmain,
      Usr: this.globals.gUsrid,
      brcode,
      var1: extra1,
      var2: extra2,
      var3: extra3,
      var4: extra4,
      var5: extra5,
      var6: extra6,
      var7: extra7,
      var8: extra8,
      var9: extra9,
      var10: extra10,
      var11: extra11,
      var12: '0',
      var13: '0',
      var14: '0',
      var15: '0',
      var16: '0',
      var17: '0',
      var18: '0',
      var19: '0',
      var20: '0',
    }).subscribe((result: any) => {
      this.progressval = '';
      const val = result;
      if (reqmain === 'getDcBranch') {
        this.getDcRsponse(val);
      }
      if (reqmain === 'Indent_ShiftList') {
        this.selList = val;
        this.selIndent = '';
      }
      if (reqmain === 'GetIndentList') {
        this.getItemsList(val);
      }
    }, (err: any) => {
      this.progressval = '';
      Swal.fire({ html: err.error });
    }));
  }

  getDcRsponse(data: any) {
    if (data.length > 0) {
      if (data[0].StatusResponse === 'Success') {
        this.selectbrCode = data[0].tobrcode;
        this.selectVehicle = data[0].Vehino;
        const BrObj = {
          brcode: data[0].tobrcode,
          brname: data[0].towhere,
        };
        this.myControl.setValue(BrObj);
        this.branch = data[0].towhere;
        this.oldvehicle = data[0].Vehino;
        const vehicalObj = {
          Result: 'Success',
          vehicleno: data[0].Vehino,
        };
        this.vehSearchControl.setValue(vehicalObj);
      } else {
        Swal.fire({ text: data[0].StatusResponse });
      }
    } else {
      Swal.fire({ text: 'Dc not found...' });
    }
  }

  itemRemove(index: any) {
    this.commonservice.taskConfirmation('Are you sure to Remove ?', '', true, 'Remove', '').then((res) => {
      if (res.isConfirmed) {
        this.individuals.data.splice(index, 1);
        this.getFinalValues();
      }
    });
  }

  keydownEvent(event: any, index: any) {
    if (event.key === 'Enter') {
      if (index < this.individuals.data.length) {
        document.getElementById(this.individuals.data[index + 1].icode)?.focus();
      }
    }
  }

  changeValueNumericList(event: any, id: any): any {
    if (event.keyCode >= 48 && event.keyCode <= 57) {
      return true;
    } if (event.keyCode === 46) {
      if (this.individuals.data[id].iqty.indexOf('.') > -1) {
        return false;
      }
      return true;
    }
    return false;
  }

  @ViewChild(MatTable) itemTable: MatTable<any>;

  changeValue(event: any) {
    if (event.keyCode >= 48 && event.keyCode <= 57) {
      return true;
    } if (event.keyCode === 46) {
      if (this.isSelectOption === 'manual') {
        if (this.qty.indexOf('.') > -1) {
          return false;
        }
        return true;
      }
      if (event.keyCode > 31 && (event.keyCode < 48 || event.keyCode > 57)) {
        return false;
      }
      return true;
    }
    return false;
  }

  changeTrayValue(event: any) {
    if (event.keyCode >= 48 && event.keyCode <= 57) {
      return true;
    } if (event.keyCode === 46) {
      if (this.tray.indexOf('.') > -1) {
        return false;
      }
      return true;
    }
    return false;
  }

  itemGty = 0;

  hide = false;

  hidetray = false

  editqty(i: any, event: any, qty, id) {
    if (event.target.value == 0) {
      setTimeout(() => {
        this.individuals.data[i].iqty = 1;
        this.individuals.data[i].value = this.individuals.data[i].dcrate * this.individuals.data[i].iqty;
        this.checkItemResult(i);
        this.hide = false;
        this.individuals = new MatTableDataSource(this.individuals.data);
        this.individuals._updateChangeSubscription();
      }, 100);
    }

    if (event.target.value == '') {
      this.individuals.data[i].iqty = 1;
      this.individuals.data[i].value = this.individuals.data[i].dcrate * this.individuals.data[i].iqty;
      this.individuals = new MatTableDataSource(this.individuals.data);
      this.individuals._updateChangeSubscription();
      const input:any = document.getElementById(id);

      this.hide = false;
      input.defaultValue = 'Goofy';
    } else {
      this.individuals.data[i].iqty = event.target.value;
      this.checkItemResult(i);
      this.hide = false;
    }
  }

  checkItemResult(i: any) {
    let checkResult = [];
    const var3 = `${this.individuals.data[i].icode}|${this.individuals.data[i].iqty}|NP|Nil`;
    this.progressval = 'indeterminate';
    this.subs.add(this.inventryService.getInventryReport(
      'StockCheckForIcodes',
      '0',
      this.globals.gTerCode,
      '0',
      '0',
      this.fromBrcode,
      '0',
      this.issueType,
      '0',
      '0',
      this.fromUsr,
      '0',
      this.issueType,
      var3,
    ).subscribe((result) => {
      this.progressval = '';
      checkResult = result;
      if (checkResult[0].statusMsg !== 'OK') {
        this.individuals.data[i].iqty = 0;
        Swal.fire({ text: checkResult[0].statusMsg });
      }
      this.individuals.data[i].value = this.individuals.data[i].dcrate * this.individuals.data[i].iqty;
      this.getFinalValues();
    }, (err) => {
      this.progressval = '';
      this.individuals.data[i].iqty = 0;
      this.individuals.data[i].value = this.individuals.data[i].dcrate * this.individuals.data[i].iqty;
      this.getFinalValues();
      Swal.fire({ html: err.error });
    }));
  }

  editTray(i: any, event: any) {
    if (event.target.value === '') {
      this.individuals.data[i].tray = 1;
      this.hidetray = false;
      this.checkItemResult(i);
    } else if (event.target.value == 0) {
      this.individuals.data[i].tray = 1;
      this.checkItemResult(i);
      this.hidetray = false;
    } else {
      this.individuals.data[i].tray = event.target.value;
      this.checkItemResult(i);
      this.hidetray = false;
    }
  }

  getSaveValues() {
    if (this.individuals.data.length > 0) {
      this.saveOption();
    } else {
      Swal.fire({ text: 'Enter The Dc Items' });
    }
  }

  saveOption() {
    Swal.fire({
      title: 'Are you sure to save ?',
      showCancelButton: true,
      confirmButtonText: 'YES',
      cancelButtonText: 'NO',
      confirmButtonColor: '#4caf50',
      cancelButtonColor: '#ff80ab',
    }).then((result) => {
      if (result.value) {
        if (this.isSelectOption === 'manual') {
          this.saveItems('Issue_Manl');
        } else {
          this.saveItems('Issue_Scan');
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) { }
    });
  }

  saveItems(option: any) {
    let items = '';
    let saveItems: any = [];

    if (this.isSelectOption === 'manual') {
      for (let i = 0; i < this.individuals.data.length; i++) {
        items = `${items + this.individuals.data[i].icode}|${this.individuals.data[i].iqty}|NP|Nil|${this.individuals.data[i].tray}|${this.individuals.data[i].tmment}~`;
      }
    } else {
      for (let i = 0; i < this.individuals.data.length; i++) {
        items = `${items + this.individuals.data[i].icode}|${this.individuals.data[i].qty}|NP|Nil|${this.individuals.data[i].TryCnt}|${this.individuals.data[i].TryUom}~`;
      }
    }

    const desc = '0';

    this.subs.add(this.inventryService.getInventryReport(
      'GoodsOutSave',
      this.selectbrCode,
      this.globals.gTerCode,
      this.selectVehicle,
      this.selectDriname,
      this.fromBrcode,
      '0',
      this.issueType,
      '0',
      desc,
      this.fromUsr,
      items.substring(0, items.length - 1),
      this.issueType,
      option,
    ).subscribe((result) => {
      saveItems = result;
      this.progressval = '';

      if (saveItems.length > 0) {
        if (saveItems[0].statusMsg === 'Sucees') {
          Swal.fire({
            text: `DC saved successfully, Trn No: ${saveItems[0].TrnNo} Do you want Print ?`,
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
            confirmButtonColor: '#4caf50',
            cancelButtonColor: '#ff80ab',
          }).then((result) => {
            if (result.value) {
              if (this.globals.gprinterForterminal4080 === '40') {
                this.printReq(saveItems[0].TrnDate, saveItems[0].TrnNo);
              } else {
                this.printdiv(saveItems[0].TrnNo, saveItems[0].TrnDate);
              }
              this.clearData();
            } else if (result.dismiss === Swal.DismissReason.cancel) {
              this.clearData();
            }
          });
        } else {
          Swal.fire({ text: saveItems[0].statusMsg });
        }
      } else {
        Swal.fire({ text: 'Dc Out Saved Failed' });
      }
    }, (err) => {
      this.progressval = '';
      Swal.fire({ html: err.error });
    }));
  }

  clearData() {
    this.myControl.reset(); this.individuals = new MatTableDataSource([]);
    this.selectVehicle = ''; this.selectDriname = ''; this.branch = '';
    this.subtotal = '0.00'; this.taxAmount = '0.00'; this.finalAmount = '0.00';
    this.vehSearchControl.reset();
  }

  printReq(TrnDate: any, TrnNo: any) {
    this.progressval = 'indeterminate';

    this.subs.add(this.inventryService.getInventryPrint(
      'DcOutprinting',
      '0',
      this.globals.gTerCode,
      this.globals.TmpCdeFedG,
      '0',
      this.fromBrcode,
      '0',
      this.issueType,
      this.inventryService.apiUrl,
      this.globals.gNetworkprinterIp,
      this.fromUsr,
      '0',
      this.changeFinalDateFormat(TrnDate),
      TrnNo,
    ).subscribe((print: any) => {
      const prnResul = print;
      this.progressval = '';
      if (prnResul[0].statusMsg === 'Done') {
        Swal.fire({ text: 'DC Reprint Success' });
      } else {
        Swal.fire({ text: prnResul[0].errorMsg });
      }
      this.isOption = 'OPTION';
    }, (err: any) => {
      this.isOption = 'OPTION';
      this.progressval = '';
      Swal.fire({ html: err.error });
    }));
  }

  printdiv(trnum: any, today: any) {
    this.printList = []; this.prntTotal = 0;
    this.progressval = 'indeterminate';
    this.subs.add(this.inventryService.getInventryReport(
      'GTNViewDateSno',
      '0',
      this.globals.gTerCode,
      '0',
      '0',
      this.fromBrcode,
      '0',
      this.issueType,
      '0',
      '0',
      this.fromUsr,
      '0',
      this.changeFinalDateFormat(today),
      trnum,
    ).subscribe((result) => {
      this.progressval = '';
      const List = result;
      this.dcoutItems = List[0];
      if (List.length > 0) {
        for (let i = 0; i < List.length; i++) {
          this.prntTotal += (List[i].irate * List[i].qty);
        }

        const groubedByTeam = this.getGroupBY(List, 'subcat');
        const keys = Object.keys(groubedByTeam);
        let index = 1;

        for (let i = 0; i < keys.length; i++) {
          const taxItem = groubedByTeam[keys[i]];

          for (let j = 0; j < taxItem.length; j++) {
            taxItem[j].sno = index + j;
          }

          index += taxItem.length;
          this.printList.push({ subcat: keys[i], result: taxItem });
        }

        this.isOption = 'SAVEVIEW';
      } else {
        Swal.fire({ text: 'No Data Found ..' });
        this.progressval = '';
      }
    }, (err) => {
      this.progressval = '';
      Swal.fire({ html: err.error });
    }));
  }

  oldvehicle = '';

  interChangeBranch() {
    if (this.selDcnum === null || this.selDcnum === undefined || this.selDcnum === '') {
      Swal.fire({ text: 'Enter the dc number' });
    } else if (this.myControl.invalid) {
      Swal.fire({ text: 'Enter the branch name' });
    } else if (typeof this.myControl.value !== 'object') {
      Swal.fire({ text: 'Enter the Valid branch name' });
    } else if (this.vehSearchControl.invalid) {
      Swal.fire({ text: 'Enter the Vehicle No' });
    } else if (typeof this.vehSearchControl.value !== 'object') {
      Swal.fire({ text: 'Enter the Valid Vehicle No' });
    } else {
      this.subs.add(this.inventryService.getInventryReport(
        'ChangeBrcodeForDcNo',
        this.selectVehicle,
        this.globals.gTerCode,
        this.oldvehicle,
        '0',
        this.fromBrcode,
        '0',
        this.issueType,
        '0',
        '0',
        this.fromUsr,
        '0',
        this.selDcnum,
        this.selectbrCode,
      ).subscribe((result) => {
        this.progressval = '';
        const data = result;
        if (data.length > 0) {
          if (data[0].Result === 'Success') {
            Swal.fire({ text: 'Dc to branch interchange success' });
            this.selectVehicle = undefined; this.branch = undefined; this.selectbrCode = undefined; this.myControl.reset();
            this.vehSearchControl.reset(); this.selDcnum = '';
          } else {
            Swal.fire({ text: data[0].Result });
          }
        } else {
          Swal.fire({ text: 'Dc interchange failed' });
        }
      }, (err) => {
        this.progressval = '';
        Swal.fire({ html: err.error });
      }));
    }
  }

  loadEwayform(dcnum: any, date: any) {
    this.subs.add(this.inventryService.getInventryReport(
      'DcUomwiseForGst',
      '0',
      this.globals.gTerCode,
      '0',
      '0',
      this.fromBrcode,
      '0',
      this.issueType,
      date,
      '0',
      this.fromUsr,
      '0',
      '0',
      dcnum,
    ).subscribe((result) => {
      this.progressval = '';
      this.ewayList = result;
      if (this.ewayList.length > 0) {
        this.dcoutItems.BranchName = this.ewayList[0].BranchName;
        setTimeout(() => {
          document.getElementById('print_eway')?.click();
        }, 400);
      } else {
        Swal.fire({ text: 'E-way form data load failed' });
      }
    }, (err) => {
      this.progressval = '';
      Swal.fire({ html: err.error });
    }));
  }

  getGroupBY(xs: any, key: any) {
    return xs.reduce((rv: any, x: any) => {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  }

  changeFinalDateFormat(startDate: any): any {
    const format = 'dd-MM-yyyy';
    const locale = 'en-US';
    const date = formatDate(startDate, format, locale);
    return date;
  }

  selectFocus(event: any, option: any) {
    setTimeout(() => {
      if (event?.source?.selected) {
        if (option === 'dri') {
          this.branch = this.myControl.value.brname;
          this.selectbrCode = this.myControl.value.brcode;
          if (this.isSelectOption === 'manual') {
            document.getElementById('Driver')?.focus();
          } else {
            document.getElementById('vehicle1')?.focus();
          }
        }
      } else if (option === 'veh') {
        document.getElementById('vehicle')?.focus();
      } else if (option === 'icode') {
        document.getElementById('icode')?.focus();
      } else if (option === 'qty') {
        document.getElementById('qty')?.focus();
      } else if (option === 'search') {
        document.getElementById('searchitem')?.focus();
      } else if (option === 'next') {
        document.getElementById('next')?.focus();
      } else if (option === 'tuom') {
        document.getElementById('tuom')?.focus();
      } else if (option === 'add') {
        document.getElementById('addBtn')?.focus();
      } else if (option === 'tray') {
        document.getElementById('tray')?.focus();
      } else if (option === 'itemDetail') {
        document.getElementById('itemDetail')?.focus();
      }
    }, 100);
  }

  selectVeh(event: any, vehicleno, id) {
    if (event.source.selected) {
      this.selectVehicle = vehicleno;

      setTimeout(() => {
        document.getElementById(id)?.focus();
      }, 100);
    }
  }

  backNavigation() {
    this.progressval = '';
    if (this.isOption === 'OPTION') {
      this.router.navigate(['/dashboard']);
    } else if (this.isOption === 'ITEMLIST' || this.isOption === 'SCANITEMS') {
      this.isOption = 'OPTION';
    } else if (this.isOption === 'VIEWLIST') {
      this.isOption = 'OPTION';
    } else if (this.isOption === 'SINGLEVIEW') {
      this.isOption = 'VIEWLIST';
    } else if (this.isOption === 'SAVEVIEW') {
      this.isOption = 'OPTION';
    }
  }

  @HostListener('paste', ['$event'])
  onPaste($event) {
    $event.preventDefault();
  }

  onDragStart(event: DragEvent) {
    event.preventDefault();
  }

  restrictNumericwithdot(e: any, uom: any) {
    if (e.metaKey || e.ctrlKey) {
      return true;
    }
    if (e.which === 32) {
      return false;
    }
    if (uom == 'KGS' || uom == 'LTRS' || uom == 'MTRS' || uom == 'ROLLS' || uom == 'RIM') {
      if (e.which === 46) {
        // return true;
        if ((e.target.value) && (e.target.value.indexOf('.') >= 0)) return false;
        return true;
      }
    }
    if (e.which === 0) {
      return true;
    }
    if (e.which < 33) {
      return true;
    }
    // eslint-disable-next-line prefer-const
    const input = String.fromCharCode(e.which);
    return !!/[\d\s]/.test(input);
  }

  homeNavigate() {
    this.globals.SelectDashboard = 'GROUPLIST';
    this.router.navigate(['/dashboard']);
  }

  applyFilter(event, type) {
    if (type === 'one') {
      this.individuals.filter = event.trim().toLowerCase();
    }
  }

  downloadXlOne(dataSource) {
    if (dataSource.data.length > 0) {
      const newArr = dataSource.data;
      this.commonservice.exportAsExcelFile(dataSource._renderData._value, 'DC_OUT');
    } else {
      this.commonservice.openSnackbar('No data to export', 'Ok', 1500);
    }
  }

  sorts(property: any) {
    this.isDesc = !this.isDesc;
    this.column = property;
    this.direction = this.isDesc ? 1 : -1;
  }

  displayDCTo(user: any): string {
    return user && user.brname ? user.brname : '';
  }

  displayVehicle(user: any): string {
    return user && user.vehicleno ? user.vehicleno : '';
  }

  rowClick(index : number) {
    for (let i = 0; i < this.individuals.data.length; i++) {
      if (i === index) {
        this.classArrTable[i] = true;
      } else {
        this.classArrTable[i] = false;
      }
    }
  }

  keyTab1(event: any, i) {
    if (event.key === 'Enter') {
      // Button click function here

      this.rowClick(i);
    }
  }
}

export class InventryItem {
  result: any;

  icode: any;

  iname: any;

  iqty: any;

  rate: any;

  dcrate: any;

  mment: any;

  gst: any;

  cess: any;

  value: any;

  tax: any;

  gstValue: any;

  cessValue: any;

  tray: any;

  tmment: any;
}

export class DcOutItems {
  DestiBrcode: any;

  DestiBrname: any;

  TrnNo: any;

  todaydate: any;

  TrnTime: any;

  subcat: any;

  icode: any;

  iname: any;

  qty: any;

  uom: any;

  irate: any;

  TrayCnt: any;

  TrayUom: any;

  VehicleNo: any;

  DriverName: any;

  Usr: any;

  MyCompanyName: any;

  MyAdd1: any;

  MyAdd2: any;

  Mycity: any;

  Mypin: any;

  Myphone: any;

  myStates: any;

  MyGstNo: any;

  DGstNo: any;

  DcmpName: any;

  Dadd1: any;

  Dadd2: any;

  Dcity: any;

  Dpincode: any;

  Dphone: any;

  Dstates: any;

  BranchName: any;

  Descript: any;
}
