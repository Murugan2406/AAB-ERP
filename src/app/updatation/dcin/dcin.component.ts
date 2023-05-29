/* eslint-disable eqeqeq */
/* eslint-disable no-undef */
import {
  HostListener,
  Component, OnInit, OnDestroy, ViewChild,
} from '@angular/core';
/* eslint-disable no-underscore-dangle */
import { MatTableDataSource } from '@angular/material/table';
/* eslint-disable import/order */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-shadow */
/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
/* eslint-disable no-empty */
/* eslint-disable max-classes-per-file */
/* eslint-disable class-methods-use-this */
/* eslint-disable max-len */
/* eslint-disable array-callback-return */
/* eslint-disable no-plusplus */
/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */

import { Router } from '@angular/router';
import { Globals } from 'src/app/globals';
import { MatDialog } from '@angular/material/dialog';
import { formatDate } from '@angular/common';
import { InventoryService } from '../services/inventory.service';
import { debounceTime } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { FormControl, Validators } from '@angular/forms';
import { SubSink } from 'subsink';
import { InventryItem } from '../dcout/dcout.component';
import { CommonAuthourityComponent } from '../common-authourity/common-authourity.component';
import { MatSort } from '@angular/material/sort';
import { CommonService } from 'src/app/services/common.service';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-dcin',
  templateUrl: './dcin.component.html',
  styleUrls: ['./dcin.component.scss'],
})

export class DcinComponent implements OnInit, OnDestroy {
  column: any;

  direction: number;

  collape1 = false;

collape3 = false;

searchTemp = '';

  searchTempOne = ''

  isItems: boolean = true;

  classArrTable: any = [];

  constructor(
public dialog: MatDialog,
private inventryService: InventoryService,
private router: Router,
private commonservice: CommonService,
    private globals: Globals,
  ) {
    this.Dctype = this.globals.gDcSaveMethod;
    this.fromBrcode = this.globals.gBrcodeString;
    this.inventry.TerCode = this.globals.gTerCode;
    this.fromUsr = this.globals.gUsrid;
    this.inventryService.apiUrl = this.globals.gApiserver;
    this.inventry.usr = this.fromUsr;
    this.inventry.Cat = this.fromBrcode;
    this.subs.add(this.searchItem.valueChanges.pipe(debounceTime(300)).subscribe((myvardatas) => {
      this.inventry.phyqty = 'DC_IN'; // Newchange
      this.inventry.ReqMain = 'ItemSearch';
      this.inventry.var3 = myvardatas;
      this.subs.add(this.inventryService.getReport(this.inventry).subscribe((data) => {
        this.items = data;
      }, (err) => Swal.fire({ text: 'Server Response Failed ..' })));
    }));

    this.subs.add(this.myControl.valueChanges.pipe(debounceTime(300)).subscribe((data) => {
      this.inventry.ReqMain = 'BranchSelectionInward';
      this.inventry.var2 = this.checkOthState();
      this.inventry.var3 = data;

      this.subs.add(this.inventryService.getReport(this.inventry).subscribe((result) => {
        this.branches = result;
      }, (err) => Swal.fire({ text: 'Server Response Failed ..' })));
    }));

    this.subs.add(this.vehSearchControl.valueChanges.pipe(debounceTime(300)).subscribe((data) => {
      //  this.loadDatas('VehicleNoSearch', data);
      this.inventry.ReqMain = 'VehicleNoSearch';
      this.inventry.var2 = 'ISSUES_BR';
      this.inventry.var1 = data;
      this.subs.add(this.inventryService.getReport(this.inventry).subscribe((result) => {
        this.vehList = result;
      }, (err) => Swal.fire({ text: 'Server Response Failed ..' })));
    }));
  }

  vehSearchControl = new FormControl({}, Validators.required);

  displayedColumns = ['SNo', 'RecdBrname', 'DcNo', 'todaydate', 'TrnTime', 'TrnNo', 'Print', 'Option']

   vehList:any = [];

   @ViewChild(MatSort) set matSort(sort: MatSort) {
     this.individuals.sort = sort;
   }

 isOtherState = false;

 isOtherStateView = false

  itemDetail: InventryItem = new InventryItem();

 today: any;

  private subs = new SubSink();

 myControl = new FormControl({}, Validators.required);

 searchItem = new FormControl();

  isSelectOption = 'online';

  isViewOption = false;

  isSearch = true;

  isScanView = false;

  isOption = true;

  islist = false;

  isView = false;

  status = false;

  progressval: any;

  fromBrcode: string;

  fromUsr = '';

  ip = '';

  branches: any = [];

  items: any = [];

  JsonList: any = [];

  printList: any = [];

  ListLines: any = [];

  individuals = new MatTableDataSource([]);

  selectDriname = '';

  selectVehicle = '';

  selectbrCode = '';

  branch: any;

  dcnum: any;

  tment = 'Tray';

  file: any;

  filename = '';

  dcDate: any;

  trnFrdate: any;

  trntodate: any;

  trnNo: any;

  prntTotal = 0;

  qty: any;

  tray: any ;

  subtotal = '0.00';

  taxAmount = '0.00';

  finalAmount = '0.00';

  inventry: any = {
    ReqMain: 'BranchSelection',
    ReqSub: '0',
    TerCode: '0',
    StkWhCode: '0',
    Subcat: '0',
    Cat: '0',
    icode: '0',
    phyqty: '0',
    fdate: '0',
    tdate: '0',
    usr: '0',
    var1: '0',
    var2: '0',
    var3: '0',
  };

  Dctype: string;

 permission = '';

 isKeyVerify = false;

  visible = true;

 selectable = true;

 removable = true;

 addOnBlur = true;

  dcNumbers: any = [];

  scanOption = '';

  reasons :any= ['Qrcode received, but item not received', 'Tray unpacked', 'Some qty missing', 'Item not usable', 'Item Damaged'];

  Delreas:any = '';

 index = '';

  brcode = '';

  ngOnInit() {
    this.today = this.globals.gkDate;
    if (this.Dctype === 'Manual Save') {
      this.isSelectOption = 'manual';
      this.permission = 'manual';
    } else if (this.Dctype === 'Scan Dc') {
      this.isSelectOption = 'scan';
      this.permission = 'scan';
    } else {
      this.isSelectOption = 'online';
      this.permission = 'online';
    }
    this.dcDate = this.today;
    this.trnFrdate = this.today;
    this.trntodate = this.today;
    this.shortcuts();
  }

  checkOthState():any {
    if (this.isOtherState) { return 'OtherState'; } return '';
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  changeFinalDateFormat(startDate:any): any {
    const format = 'dd-MM-yyyy';
    const locale = 'en-US';
    const date = formatDate(startDate, format, locale);
    return date;
  }

  @HostListener('paste', ['$event'])
  onPaste($event) {
    if ($event.target.id !== 'dcnumber2') {
      $event.preventDefault();
    }
  }

  getSelect(focusoption: string) {
    this.myControl.reset(); this.searchItem.reset();
    this.selectDriname = ''; this.selectVehicle = ''; this.selectbrCode = '';
    this.branch = ''; this.dcnum = '';
    this.isViewOption = false; this.isKeyVerify = false;
    if (this.isSelectOption === 'online' || this.isSelectOption === 'manual') {
      document.getElementById(focusoption)?.focus();
    }
  }

  SelectManual() {
    if (this.Dctype === 'Manual Save') {
      this.isSelectOption = 'manual';
      this.permission = 'manual';
      this.getSelect('branchselect2');
    } else {
      if (this.permission === 'online' || this.permission === 'scan') {
        this.openKeyDialog('DcInOffline', 'branchselect2');
      }
      this.isSelectOption = 'manual';
      this.getSelect('branchselect2');
    }
  }

  SelectOnline() {
    if (this.Dctype === 'Get Dc Online') {
      this.isSelectOption = 'online';
      this.permission = 'online';
      this.getSelect('brancheselect1');
    } else {
      if (this.permission === 'scan' || this.permission === 'manual') {
        this.openKeyDialog('DcInOnline', 'brancheselect1');
      }
      this.isSelectOption = 'online';
      this.getSelect('brancheselect1');
    }
  }

  SelectScan() {
    // if (this.permission === 'manual') {
    //   this.openKeyDialog('DcInOnline', 'brancheselect1');
    // }
    this.isSelectOption = 'scan';
  }

  getViewClick() {
    this.isViewOption = true;
    this.isSelectOption = 'View';
    // if (this.isViewOption) {
    //   this.isViewOption = false;
    // } else {
    //   this.isViewOption = true;
    // }
  }

  dcInOnLineSaved() {
    if (this.myControl.invalid) {
      Swal.fire({ text: 'Enter the DC From' });
    } else if (typeof this.myControl.value !== 'object') {
      Swal.fire({ text: 'Enter the valid DC From' });
    } else if (this.branch === undefined || this.branch === null || this.branch === '') {
      Swal.fire({ text: 'Select Branch Name' });
    } else if (this.dcDate === undefined || this.dcDate === null || this.dcDate === '') {
      Swal.fire({ text: 'Enter Dc Date' });
    } else if (this.dcnum === undefined || this.dcnum === null || this.dcnum === '') {
      Swal.fire({ text: 'Enter Dc Number' });
    } else {
      // this.brcode =  this.branches.find(x => x.brname == this.branch).brcode
      this.inventry.ReqMain = 'GetOnlineDCitems';
      this.inventry.var2 = this.brcode;
      this.inventry.var3 = this.dcnum;
      this.inventry.fdate = this.changeFinalDateFormat(this.dcDate);
      this.progressval = 'indeterminate';
      this.subs.add(this.inventryService.getReport(this.inventry).subscribe((result) => {
        this.progressval = '';
        this.individuals = new MatTableDataSource(result);
        if (this.individuals.data != null && this.individuals.data.length > 0) {
          if (this.individuals.data[0].Result === 'Sucess') {
            let dcAmt = 0;
            this.individuals.data.forEach((element: any) => {
              dcAmt += (element.irate * element.qty);
            });
            this.subtotal = dcAmt.toFixed(2);
            this.islist = true; this.isOption = false;
          } else {
            Swal.fire({ text: this.individuals.data[0].Result });
          }
        } else {
          Swal.fire({ text: 'Dc Not Found' });
        }
      }, (err) => {
        this.progressval = '';
        Swal.fire({ text: 'Server Response Failed' });
      }));
    }
  }

  saveOption() {
    if (this.individuals.data.length > 0) {
      Swal.fire({
        title: 'Are you sure?',
        showCancelButton: true,
        confirmButtonText: 'YES',
        cancelButtonText: 'NO',
        confirmButtonColor: '#4caf50',
        cancelButtonColor: '#ff80ab',
      }).then((result) => {
        if (result.value) {
          this.toItems();
        } else if (result.dismiss === Swal.DismissReason.cancel) { }
      });
    } else {
      Swal.fire({ text: 'Enter The Dc Items' });
    }
  }

  toItems() {
    let items = '';
    if (this.isSelectOption === 'manual') {
      this.individuals.data.forEach((element: any) => {
        // tslint:disable-next-line: max-line-length
        items = `${items + element.icode}|${element.iqty}|NP|Nil|${element.tray}|${element.tmment}|${element.dcrate}|${element.mment}~`;
      });
      this.inventry.var3 = this.selectVehicle;
      this.inventry.var2 = this.selectDriname;
    } else if (this.isSelectOption === 'online') {
      this.individuals.data.forEach((element: any) => {
        if (element.trayCnt === 'U') {
          element.trayCnt = '1';
        }
        if (element.trayUom === 'U') {
          element.trayUom = 'Tray';
        }
        // tslint:disable-next-line: max-line-length
        items = `${items + element.icode}|${element.qty}|NP|Nil|${element.trayCnt}|${element.trayUom}|${element.irate}|${element.typ}~`;
      });
      this.selectbrCode = this.brcode;
    } else if (this.isSelectOption === 'scan') {
      this.individuals.data.forEach((element: any) => {
        // tslint:disable-next-line: max-line-length
        items = `${items + element.icode}|${element.qty}|NP|Nil|${element.trayCnt}|${element.trayUom}|${element.irate}|${element.typ}~`;
      });
    } else { }
    this.inventry.fdate = this.changeFinalDateFormat(this.dcDate);
    this.inventry.StkWhCode = this.dcnum;
    this.inventry.var1 = items.substring(0, items.length - 1);
    this.inventry.ReqSub = this.selectbrCode;
    this.inventry.Subcat = this.getPermission();
    this.saveItems();
  }

  getPermission(): any {
    if (this.permission === 'manual') {
      return 'OFFLINE_SAVE';
    } if (this.permission === 'online') {
      return 'ONL_REC';
    } if (this.permission === 'scan') {
      return 'SCAN_REC';
    }
  }

  // Goods in save
  saveItems() {
    let saveItems: any = [];
    this.inventry.icode = '0';
    this.inventry.ReqMain = 'GoodsInSave';
    this.inventry.phyqty = 'INTR';
    this.progressval = 'indeterminate';
    this.subs.add(this.inventryService.getReport(this.inventry).subscribe((result) => {
      saveItems = result;
      this.progressval = '';
      if (saveItems.length > 0) {
        if (saveItems[0].StatusMsg === 'Sucees') {
          if (this.globals.gprinterForterminal4080 === '40') {
            Swal.fire({
              text: `DC save successfully, Trn No: ${saveItems[0].TrnNo} Do you want Print ?`,
              showCancelButton: true,
              confirmButtonText: 'Yes',
              cancelButtonText: 'No',
              confirmButtonColor: '#4caf50',
              cancelButtonColor: '#ff80ab',
            }).then((result) => {
              if (result.value) {
                this.print(this.branch, this.dcDate, this.today, this.dcnum, saveItems[0].TrnNo);
                this.clearRcds();
              } else if (result.dismiss === Swal.DismissReason.cancel) {
                this.clearRcds();
              }
            });
          } else {
            Swal.fire({ text: `Thermal Printer Not Connected but Dc saved , Trn No: ${saveItems[0].TrnNo}` });
            this.clearRcds();
          }
        } else {
          Swal.fire({ text: saveItems[0].StatusMsg });
        }

        this.progressval = '';
      } else {
        Swal.fire({ text: 'DC Saved Failed' });
      }
    }, (err) => {
      this.progressval = '';
      Swal.fire({ text: 'Server Response Failed' });
    }));
  }

  clearRcds() {
    this.myControl.reset(); this.individuals = new MatTableDataSource([]); this.vehSearchControl.reset();
    this.selectVehicle = ''; this.selectDriname = '';
    this.branch = ''; this.subtotal = '0.00'; this.dcnum = '';
    this.taxAmount = '0.00'; this.finalAmount = '0.00';
    this.islist = false; this.isOption = true; this.isView = false; this.isKeyVerify = false; this.isScanView = false;
  }

  otherStateView() {

  }

  print(branch: any, dcFrDate: any, dcReDate: any, dcnum: any, trnNo: string) {
    if (this.globals.gprinterForterminal4080 === '40') {
      this.inventry.ReqMain = 'DcInprint';
      this.inventry.StkWhCode = dcnum;
      this.inventry.icode = branch;
      this.inventry.var1 = this.changeFinalDateFormat(dcFrDate);
      this.inventry.var2 = this.changeFinalDateFormat(dcReDate);
      this.inventry.var3 = trnNo;
      this.inventry.fdate = this.inventryService.apiUrl;
      this.inventry.tdate = this.globals.gNetworkprinterIp;
      this.progressval = 'indeterminate';
      this.subs.add(this.inventryService.getBody(this.inventry).subscribe((print: any) => {
        const prnResul = print;
        this.progressval = '';

        if (prnResul === 'Done') {
          Swal.fire({ text: 'Print Success' });
        } else {
          Swal.fire({ text: 'Printer Connection Failed' });
        }
      }, (err: any) => {
        this.progressval = '';
        Swal.fire({ text: 'Print Server Error' });
      }));
    } else {
      Swal.fire({ text: 'Thermal Printer Not Connected' });
    }
  }

  getView() {
    this.islist = false; this.isOption = false;
    this.isView = true;
  }

  selectView() {
    if (this.trnFrdate === undefined || this.trnFrdate === null) {
      Swal.fire({ text: 'Enter From Date' });
    } else if (this.trntodate === undefined || this.trntodate === null) {
      Swal.fire({ text: 'Enter To Date' });
    } else {
      this.inventry.Subcat = this.getPermission();
      if (this.isOtherStateView) {
        this.inventry.phyqty = 'PUR';
        this.inventry.var1 = 'OtherState';
      } else {
        this.inventry.phyqty = 'INTR';
        this.inventry.var1 = '';
      }
      this.inventry.ReqMain = 'GoodsRecdNoteViewAllDate';
      this.inventry.fdate = this.changeFinalDateFormat(this.trnFrdate);
      this.inventry.tdate = this.changeFinalDateFormat(this.trntodate);
      this.progressval = 'indeterminate';
      this.subs.add(this.inventryService.getReport(this.inventry).subscribe((result) => {
        this.progressval = '';
        this.individuals = new MatTableDataSource(result);
        if (this.individuals.data != null && this.individuals.data.length > 0) {
          this.isOption = false;
          this.islist = true;
        } else {
          Swal.fire({ text: 'No Data Found ..' });
        }
      }, (err) => {
        this.progressval = '';
        Swal.fire({ text: 'Server Response Failed' });
      }));
    }
  }

  openDialog(trnNo: string, i: number) {
    this.commonservice.taskConfirmation('Are you sure to Delete ?', '', true, 'Delete', '').then((res) => {
      if (res.isConfirmed) {
        let dialogData: any; let List = [];

        this.progressval = 'indeterminate';
        const tdate = this.individuals.data.find((x: any) => x.TrnNo === trnNo)?.todaydate;
        this.inventry.ReqMain = 'DeleteGoodsRecdNoteDateSno';
        this.inventry.var1 = this.globals.gUsrid;
        this.inventry.var2 = this.changeFinalDateFormat(tdate);
        this.inventry.var3 = trnNo;
        this.subs.add(this.inventryService.getReport(this.inventry).subscribe((data) => {
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
          Swal.fire({ text: 'Server Response Failed' });
        }));
      }
    });
  }

  getEnterDri(event: any, option: any) {
    if (event.key === 'Enter') {
      if (this.selectDriname === null || this.selectDriname === undefined || this.selectDriname === '') {
        setTimeout(() => {
          Swal.fire({ text: 'Enter the driver name' });
        }, 100);
      } else {
        this.selectFocus(event, option);
      }
    }
  }

  keyTab(event: any, id: any) {
    if (event.key === 'Enter') {
      if (event.target.value !== '') {
        setTimeout(() => {
          document.getElementById(id)?.focus();
        }, 100);
      }
    }
  }

  getDCNumEvent(event: any, option: string) {
    if (event.key === 'Enter') {
      if (this.dcnum === null || this.dcnum === undefined || this.dcnum === '') {
        setTimeout(() => {
          Swal.fire({ text: 'Enter the DC number' });
        }, 100);
      } else {
        document.getElementById(option)?.focus();
      }
    }
  }

  getEnterVeh(event: any, option: any) {
    if (event.key === 'Enter') {
      if (this.vehSearchControl.invalid || typeof this.vehSearchControl.value !== 'object' || this.selectVehicle === null || this.selectVehicle === undefined || this.selectVehicle === '') {
        setTimeout(() => {
          Swal.fire({ text: 'Enter the Vehicle number' });
        }, 100);
      } else {
        document.getElementById('dcDatemanual')?.focus();
      }
    }
  }

  changeEvent(event: any, data, id: string) {
    if (event.source.selected) {
      this.branch = data.brname;
      // this.selectbrCode = this.branches.find((x: { brname: any; }) => x.brname === this.branch).brcode;
      this.selectbrCode = data.brcode;
      this.brcode = data.brcode;
      setTimeout(() => {
        document.getElementById(id)?.focus();
      }, 100);
    }
  }

  selectNext() {
    if (this.myControl.invalid) {
      Swal.fire({ text: 'Enter the DC From' });
    } else if (typeof this.myControl.value !== 'object') {
      Swal.fire({ text: 'Enter the valid DC From' });
    } else if (this.branch === null || this.branch === undefined || this.branch === '') {
      Swal.fire({ text: 'Enter the branch name' });
    } else if (this.selectDriname === null || this.selectDriname === undefined || this.selectDriname === '') {
      Swal.fire({ text: 'Enter the driver name' });
    } else if (this.vehSearchControl.invalid || typeof this.vehSearchControl.value !== 'object' || this.selectVehicle === null || this.selectVehicle === undefined || this.selectVehicle === '') {
      Swal.fire({ text: 'Enter the Vehicle number' });
    } else if (this.dcDate === undefined || this.dcDate === null || this.dcDate === '') {
      Swal.fire({ text: 'Enter Dc Date' });
    } else if (this.dcnum === undefined || this.dcnum === null || this.dcnum === '') {
      Swal.fire({ text: 'Enter Dc Number' });
    } else {
      this.islist = true; this.isOption = false;
      this.clear();
      this.individuals = new MatTableDataSource([]);
      setTimeout(() => {
        this.tment = 'Tray';
        this.selectFocus('any', 'icode');
      }, 100);
    }
  }

  getEnderQty(event: any) {
    if (event.key === 'Enter') {
      if (this.qty === null || this.qty === undefined || this.qty === 0) {
        setTimeout(() => {
          Swal.fire({ text: 'Enter the Quantity' });
        }, 100);
      } else {
        document.getElementById('tray').focus();
        // this.selectFocus(event, 'tray');
      }
    }
  }

  getEnderTray(event: any) {
    if (event.key === 'Enter') {
      if (this.tray === null || this.tray === undefined || this.tray === 0) {
        setTimeout(() => {
          Swal.fire({ text: 'Enter the Tray Value' });
        }, 100);
      } else {
        setTimeout(() => {
          this.checkItems('CheckAndUpdate');
          // this.selectFocus(event, 'tuom');
        }, 200);
      }
    }
  }

  getSelectedIcode(event: any, item) {
    if (event.source.selected) {
      this.itemDetail.iname = item.iname;
      this.itemDetail.icode = item?.icode;
      this.isSearch = true;
      this.selectFocus(event, 'qty');
      this.getItemDetails('onlyitem');
      this.searchItem.reset();
    }
  }

  getItemByCode(event: any) {
    if (event.key === 'Enter') {
      if (this.itemDetail.icode === undefined || this.itemDetail.icode === null || this.itemDetail.icode === '') {
        setTimeout(() => {
          Swal.fire({ text: 'Enter the Item Code' });
        }, 100);
      } else {
        this.getItemDetailsByCode('click');
      }
    }
  }

  selectTrayEvent(event: any, option: any) {
    if (event.key === 'Enter') {
      if (this.tment === undefined || this.tment === null || this.tment === 'select' || this.tment === '') {
        setTimeout(() => {
          Swal.fire({ text: 'Select Tray Type' });
        }, 100);
      } else {
        document.getElementById('addBtn')?.focus();
      }
    }
  }

  openSearch() {
    if (this.isSearch) {
      this.isSearch = false;
      this.items = [];
      this.searchItem.reset();
      setTimeout(() => {
        this.selectFocus(this.isSearch, 'search');
      }, 500);
    } else {
      this.isSearch = true;
    }
  }

  checkValidation() {
    if (this.itemDetail.icode === undefined || this.itemDetail.icode === null || this.itemDetail.icode === '') {
      Swal.fire({ text: 'Enter the Item Code', timer: 1000 });

      return false;
    } if (this.itemDetail.iname === null || this.itemDetail.iname === '' || this.itemDetail.iname === undefined) {
      Swal.fire({ text: 'Enter Item name' });

      return false;
    } if (this.qty === null || this.qty === undefined || this.qty <= 0) {
      Swal.fire({ text: 'Enter the Item Qty', timer: 1000 });

      return false;
    } if (this.tray === undefined || this.tray === null || this.tray <= 0) {
      Swal.fire({ text: 'Enter the Tray', timer: 1000 });

      return false;
    } if (this.tment === undefined || this.tment === null || this.tment === 'select' || this.tment === '') {
      Swal.fire({ text: 'Select Tray', timer: 1000 });
      return false;
    }
    return true;
  }

  checkItems(option: any) {
    if (this.itemDetail.icode === undefined || this.itemDetail.icode === null || this.itemDetail.icode === '') {
      Swal.fire({ text: 'Enter the Item Code', timer: 1000 });
      setTimeout(() => {
        this.selectFocus('any', 'icode');
      }, 100);
    } else if (this.itemDetail.iname === null || this.itemDetail.iname === '' || this.itemDetail.iname === undefined) {
      Swal.fire({ text: 'Enter Item name' });
    } else if (this.qty === null || this.qty === undefined || this.qty <= 0) {
      Swal.fire({ text: 'Enter the Item Qty', timer: 1000 });
    } else if (this.tray === undefined || this.tray === null || this.tray <= 0) {
      Swal.fire({ text: 'Enter the Tray', timer: 1000 });
    } else if (this.tment === undefined || this.tment === null || this.tment === 'select' || this.tment === '') {
      Swal.fire({ text: 'Select Tray', timer: 1000 });
    } else {
      this.getItemDetails('itemWithQty');
    }
  }

  getItemDetailsByCode(type) {
    if (this.itemDetail.icode === undefined || this.itemDetail.icode === null || this.itemDetail.icode === '') {
      if (type !== 'focus') {
        Swal.fire({ text: 'Enter the Item Code' });
      }
    } else {
      this.getItemDetails('OnlyItem');
    }
  }

  getItemqty() {
    if (this.itemDetail.icode === undefined || this.itemDetail.icode === null || this.itemDetail.icode === '') {
      Swal.fire({ text: 'Enter the Item Code' });
    } else if (this.qty === null || this.qty === undefined || this.qty <= 0) {
      Swal.fire({ text: 'Enter the Item Qty', timer: 1000 });
    } else {
      this.selectFocus('event', 'tray');
    }
  }

  getItemDetails(option: string) {
    this.isSearch = true;
    let details = [];
    this.progressval = 'indeterminate';
    this.inventry.ReqMain = 'GetItemDetailsCode';
    // this.inventry.phyqty = 'DC_IN';  //Newchange
    this.inventry.phyqty = 'ISSUES_BR'; // Newchange
    this.inventry.icode = this.itemDetail.icode;
    this.subs.add(this.inventryService.getReport(this.inventry).subscribe((result) => {
      this.progressval = '';
      const uom = this.itemDetail.mment;
      details = result;
      this.itemDetail = details[0];
      if (this.itemDetail.result === 'OK' && !this.itemDetail.iname) {
        Swal.fire({ text: 'Invalid Item Code' });
      } else if (this.itemDetail.result === 'OK' && this.itemDetail.iname) {
        if (this.itemDetail.mment !== uom) {
          this.qty = '';
          this.selectFocus(option, 'qty');
          document.getElementById('qty')?.focus();
          return;
        }
        console.log(option === 'itemWithQty' && this.checkValidation());

        if (option === 'itemWithQty' && this.checkValidation()) {
          this.itemDetails();
        } else {
          setTimeout(() => {
            document.getElementById('qty')?.focus();
            this.tray = '';
          }, 100);
        }
      } else if (this.itemDetail.result === 'NOK') {
        Swal.fire({ text: 'Invalid Item Code' });
      } else {
        this.selectFocus(option, 'icode');
      }
    }, (err) => {
      this.progressval = '';
      Swal.fire({ text: 'Server Response Failed ..' });
    }));
  }

  itemDetails() {
    this.itemDetail.tmment = this.tment;
    this.itemDetail.tray = this.tray;
    this.itemDetail.iqty = this.qty;
    this.itemDetail.value = this.itemDetail.dcrate * this.itemDetail.iqty;
    this.itemDetail.gstValue = this.getTaxCalculate(this.itemDetail.dcrate, this.itemDetail.gst);
    this.itemDetail.cessValue = this.getTaxCalculate(this.itemDetail.dcrate, this.itemDetail.cess);
    this.addItem();
  }

  addItem() {
    if (this.individuals.data.length === 0) {
      this.individuals.data.push(this.itemDetail);
      this.pushItems();
    } else {
      const index = this.individuals.data.findIndex((x: { iname: any; }) => x.iname === this.itemDetail?.iname);
      if (index === -1) {
        this.individuals.data.push(this.itemDetail);
        this.pushItems();
      } else {
        Swal.fire({ text: 'Item Already added' });
      }
    }
  }

  pushItems() {
    // tslint:disable-next-line: no-use-before-declare
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
    // tslint:disable-next-line: prefer-for-of
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

  itemRemove(index: number) {
    this.commonservice.taskConfirmation('Are you sure to Remove ?', '', true, 'Remove', '').then((res) => {
      if (res.isConfirmed) {
        this.individuals.data.splice(index, 1);
        this.getFinalValues();
      }
    });
  }

  changeValue(event: any) {
    if (event.keyCode >= 48 && event.keyCode <= 57) {
      return true;
    } if (event.keyCode === 46) {
      if (event.target.textContent.indexOf('.') > -1) {
        return false;
      }
      return true;
    }
    return false;
  }

  hideQty = false;

  editqty(i: any, event: any, qty) {
    if (event.target.value == qty) {
      this.hideQty = false;
      return;
    }
    if (event.target.value === '') {
      this.individuals.data[i].iqty = 1;
      this.individuals.data[i].value = this.individuals.data[i].dcrate * this.individuals.data[i].iqty;
      this.getFinalValues();
      this.hideQty = false;
    } else if (event.target.value == 0) {
      this.individuals.data[i].iqty = 1;
      this.individuals.data[i].value = this.individuals.data[i].dcrate * this.individuals.data[i].iqty;
      this.getFinalValues();
      this.hideQty = false;
    } else {
      this.individuals.data[i].iqty = event.target.value;
      this.individuals.data[i].value = this.individuals.data[i].dcrate * this.individuals.data[i].iqty;
      this.getFinalValues();
      this.hideQty = false;
    }
  }

  hideTray = false

  editTray(i: any, event: any) {
    if (event.target.value === '') {
      this.individuals.data[i].tray = 1;
      this.hideTray = false;
    } else if (event.target.value == 0) {
      this.individuals.data[i].tray = 1;
      this.hideTray = false;
    } else {
      this.individuals.data[i].tray = event.target.value;
      this.hideTray = false;
    }
  }

  printdiv(trnum: string, today: any) {
    this.printList = []; this.prntTotal = 0;
    this.inventry.ReqMain = 'GoodsRecdNoteViewDateSno';
    this.inventry.var2 = this.changeFinalDateFormat(today);
    this.inventry.var3 = trnum;
    this.progressval = 'indeterminate';
    this.subs.add(this.inventryService.getReport(this.inventry).subscribe((result) => {
      this.progressval = '';
      this.printList = result;
      if (this.printList.length > 0) {
        // tslint:disable-next-line: prefer-for-of
        for (let i = 0; i < this.printList.length; i++) {
          // tslint:disable-next-line: max-line-length
          this.prntTotal += (this.printList[i].irate * this.printList[i].qty);
        }
        this.getView();
      } else {
        Swal.fire({ text: 'No record found' });
      }
    }, (err) => {
      this.progressval = '';
      Swal.fire({ text: 'Server Response Failed' });
    }));
  }

  clear() {
    this.searchItem.setValue('');
    this.itemDetail.icode = '';
    this.itemDetail.iname = '';
    this.itemDetail.iqty = '';

    this.qty = '';
    this.tray = 'Tray';
    this.tment = '';
    setTimeout(() => {
      document.getElementById('icode')?.focus();
    }, 100);
  }

  shortcuts() {
    const keydown$ = fromEvent(window, 'keydown');
    this.subs.add(keydown$.subscribe((event: KeyboardEvent) => {
      if (event.altKey && (event.key === 'c' || event.key === 'C')) {
        if (this.isSelectOption === 'manual' && !this.isViewOption) {
          event.preventDefault();
          this.clear();
          this.individuals = new MatTableDataSource([]);
        }
      }
      if (event.altKey && (event.key === 's' || event.key === 'S')) {
        event.preventDefault();
        if (this.isSelectOption === 'manual' && !this.isViewOption) {
          this.saveOption();
        }
      }
      if (event.altKey && (event.key === 'x' || event.key === 'X')) {
        event.preventDefault();

        this.backNavigation();
      }
    }));
  }

  selectVeh(event:any, vehical) {
    if (event.source.selected) {
      this.selectVehicle = vehical.vehicleno;
      setTimeout(() => {
        document.getElementById('dcDatemanual')?.focus();
      }, 100);
    }
  }

  optionSelected(event) {
    if (event.source.selected) {
      setTimeout(() => {
        document.getElementById('addBtn')?.focus();
      }, 100);
    }
  }

  sorts(property: any) {
    this.isDesc = !this.isDesc;
    this.column = property;
    this.direction = this.isDesc ? 1 : -1;
  }

  selectFocus(event:any, option: any) {
    setTimeout(() => {
      if (option === 'dri') {
        this.branch = this.myControl.value.brname;
        this.brcode = this.myControl.value.brcode;
        // this.branch = event;
        // this.brcode = this.branches.find((x: { brname: string | undefined; }) => x.brname === this.branch).brcode;
        document.getElementById('Drivername')?.focus();
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
      } else if (option === 'dcnum') {
        document.getElementById('dcnumber')?.focus();
      } else if (option === 'manualnext') {
        document.getElementById('manualnext')?.focus();
      } else if (option === 'dcdate') {
        this.branch = event;
        this.brcode = this.myControl.value?.brcode;
        document.getElementById('dcdate')?.focus();
      } else if (option === 'dcnumber2') {
        document.getElementById('dcnumber2')?.focus();
      }
    }, 100);
  }

  openKeyDialog(value: string, focusoption: string) {
    let dialogData: any;
    const dialogRef = this.dialog.open(CommonAuthourityComponent, {
      width: '450px',
      disableClose: true,
      data: {
        data: 'N/A',
        authorityFlg: 'DcDelete_ThumbApproval',
        smsCaption: value,
        dialogType: 'KEYONLY',
        keyCaption: value,

      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      dialogData = result;
      if (dialogData === undefined) {
        // Swal.fire({  text: ' Dc Delete Failed'});
      } else if (dialogData.event === 'Success') {
        this.isKeyVerify = true;
        if (value === 'DcInOffline') {
          this.permission = 'manual';
        } else {
          this.permission = 'online';
        }
        document.getElementById(focusoption)?.focus();
      } else if (dialogData.event === 'Failed') {
        this.isKeyVerify = false;
      } else {
        this.isKeyVerify = false;
      }
    });
  }

  add(event: any): void {
    const { input } = event;
    const { value } = event;

    // Add our chip list
    if ((value || '').trim()) {
      if (this.dcNumbers.length >= 1) {
        if (this.dcNumbers.some((e: { dcnum: string; }) => e.dcnum === value.trim())) {
          Swal.fire({ text: ' Dc Number Already Exits' });
          input.value = '';
        } else {
          this.dcNumbers.push({ dcnum: value.trim() });
          input.value = '';
        }
      } else {
        this.dcNumbers.push({ dcnum: value.trim() });
        input.value = '';
      }
    }
  }

  remove(i: any): void {
    const index = this.dcNumbers.indexOf(i);

    if (index >= 0) {
      this.dcNumbers.splice(index, 1);
    }
  }

  getQrcodes() {
    if (this.myControl.invalid) {
      Swal.fire({ text: 'Enter the Branch name' });
    } else if (typeof this.myControl.value !== 'object') {
      Swal.fire({ text: 'Enter the valid Branch name' });
    } else if (this.branch === undefined || this.branch === null || this.branch === '') {
      Swal.fire({ text: 'Select Branch Name' });
      // tslint:disable-next-line: max-line-length
    } else if (this.dcDate === undefined || this.dcDate === null || this.dcDate === '') {
      Swal.fire({ text: 'Enter Dc Date' });
    } else if (this.dcNumbers.length <= 0) {
      Swal.fire({ text: 'Enter Dc Number' });
    } else {
      let dcstr: any = '';
      this.selectbrCode = this.myControl.value?.brcode;
      this.dcNumbers.forEach((e: { dcnum: any; }) => {
        dcstr = `${dcstr + e.dcnum},`;
      });
      this.inventry.var3 = dcstr.substring(0, dcstr.length - 1);
      this.inventry.var2 = this.selectbrCode;
      this.inventry.fdate = this.changeFinalDateFormat(this.dcDate);
      this.getQrFromDC();
    }
  }

  getQrFromDC() {
    let details = [];
    this.progressval = 'indeterminate';
    this.inventry.ReqMain = 'GetDcQrcodesForDcNo';
    this.inventry.var1 = this.globals.gFileSharingPath;
    // tslint:disable-next-line: max-line-length
    this.subs.add(this.inventryService.getReport(this.inventry).subscribe((result) => {
      this.progressval = '';
      details = result;
      if (details.length > 0) {
        if (details[0].Result === 'Success') {
          Swal.fire({ text: 'QR Codes Saved Successfully' });
          this.dcNumbers = []; this.myControl.reset();
          this.dcDate = this.today;
        } else {
          Swal.fire({ text: details[0].Result });
        }
      } else {
        Swal.fire({ text: 'QRCodes Not Found Enter Correct Dc Numbers' });
      }
    }, (err) => {
      this.progressval = '';
      Swal.fire({ text: 'Server response Failed ..' });
    }));
  }

  changeReason(event:any) {
    this.Delreas = event.target.value;
  }

  getReadScanFile() {
    let data = [];
    this.inventry.ReqMain = 'ReadQrFile';
    this.inventry.var1 = this.globals.gApiserver;
    this.inventry.var2 = this.globals.gFileSharingPath;
    this.inventry.var3 = this.globals.gFileShareBackupPath;
    this.progressval = 'indeterminate';

    // tslint:disable-next-line: max-line-length
    this.subs.add(this.inventryService.scanTextFile(this.inventry).subscribe((result: any[]) => {
      this.progressval = '';
      data = result;

      if (data.length > 0) {
        if (data[0].Result === 'Success') {
          Swal.fire({ text: 'Barcodes imported successfully' });
          this.getUnReceiveditems();
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
      Swal.fire({ text: 'Server Response Failed ..' });
    }));
  }

  getUnReceiveditems() {
    this.ListLines = [];
    this.progressval = 'indeterminate';
    this.inventry.ReqMain = 'GetQrcodeUploaded_ButDcNotSaved_Cons';

    // tslint:disable-next-line: max-line-length
    this.subs.add(this.inventryService.getReport(this.inventry).subscribe((result) => {
      this.progressval = '';
      const data = result;
      if (data != null && data.length > 0) {
        if (data[0].Result === 'Sucess') {
          this.ListLines = data;
        } else {
          Swal.fire({ text: data[0].Result });
        }
      } else {
        Swal.fire({ text: 'Unsaved Dc Not Found' });
      }
    }, (err) => {
      this.progressval = '';
      Swal.fire({ text: 'Server Response Failed ..' });
    }));
  }

  getQrWithDcitems(brcode: string, dcDate: any, dcnum: string | undefined, branch: string | undefined, option: string) {
    this.progressval = 'indeterminate';
    this.branch = branch;
    this.dcDate = dcDate;
    this.dcnum = dcnum;
    this.selectbrCode = brcode;
    if (option === 'Save') {
      this.scanOption = 'QR_ITEMS';
      this.inventry.ReqMain = 'GetScannedDcItemwise_ToSave';
    } else {
      this.scanOption = 'QR_CODES';
      this.inventry.ReqMain = 'GetQrcodeUploaded_ButDcNotSaved_Dtls_SnglDc';
    }
    this.inventry.var1 = brcode;
    this.inventry.var2 = this.changeFinalDateFormat(dcDate);
    this.inventry.var3 = dcnum;

    // tslint:disable-next-line: max-line-length
    this.subs.add(this.inventryService.getReport(this.inventry).subscribe((result) => {
      this.progressval = '';
      const data = result;
      if (data.length > 0) {
        if (data[0].Result === 'Sucess') {
          this.individuals = new MatTableDataSource(data);
          // this.getscanBack()
          this.isScanView = true;
        } else {
          Swal.fire({ text: data[0].Result });
        }
      } else {
        Swal.fire({ text: 'Items Not Found' });
      }
    }, (err) => {
      this.progressval = '';
      Swal.fire({ text: 'Server Response Failed ..' });
    }));
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

  getscanBack() {
    if (this.isScanView) {
      if (this.ListLines.length > 0) {
        this.getUnReceiveditems();
      }
      this.isScanView = false; this.branch = '';
      this.dcDate = this.today;
      this.dcnum = ''; this.selectbrCode = '';
    } else {
      this.isScanView = true;
    }
  }

  selectIndex(i: any) {
    this.index = i;
  }

  deleteScanedQr() {
    if (this.Delreas === null || this.Delreas === undefined || this.Delreas === '') {
      Swal.fire({ text: ' Select Reason' });
    } else {
      document.getElementById('deleteQr')?.click();
      this.progressval = 'indeterminate';
      this.inventry.ReqMain = 'RemoveScanned_Trays';
      this.inventry.Subcat = this.Delreas;
      this.inventry.icode = this.individuals.data[this.index].Qrcode;
      this.inventry.var1 = this.individuals.data[this.index].fcode;
      this.inventry.var2 = this.changeFinalDateFormat(this.individuals.data[this.index].DcDate);
      this.inventry.var3 = this.individuals.data[this.index].DcNo;
      this.subs.add(this.inventryService.getReport(this.inventry).subscribe((result) => {
        this.progressval = '';
        const data = result;
        if (data.length > 0) {
          if (data[0].Result === 'Success') {
            this.Delreas = '';
            this.getQrWithDcitems(
              this.individuals.data[this.index].fcode,
              this.individuals.data[this.index].DcDate,
              this.individuals.data[this.index].DcNo,
              this.branch,
              'View',
            );
          } else {
            Swal.fire({ text: data[0].Result });
          }
        } else {
          Swal.fire({ text: 'Items Not Found' });
        }
      }, (err) => {
        this.progressval = '';
        Swal.fire({ text: 'Server Response Failed ..' });
      }));
    }
  }

  backNavigation() {
    this.progressval = '';
    if (this.isScanView) {
      this.getscanBack();
    } else if (this.isOption) {
      this.router.navigate(['/dashboard']); // this is also navigate to dashboard
    } else if (this.isViewOption) {
      if (this.isView) {
        this.isView = false; this.islist = true; this.isOption = false;
      } else if (this.islist) {
        this.islist = false; this.isOption = true; this.isView = false;
      } else {
        this.isView = false; this.islist = false; this.isOption = true;
      }
    } else if (this.isSelectOption === 'online') {
      this.isView = false; this.isOption = true; this.islist = false;
    } else if (this.isSelectOption === 'manual') {
      this.isView = false; this.isOption = true; this.islist = false;
    } else if (this.isSelectOption === 'scan') {
      this.isView = false; this.isOption = true; this.islist = false;
    }
  }

  homeNavigate() {
    this.globals.SelectDashboard = 'GROUPLIST';
    this.router.navigate(['/dashboard']);
  }

  isDesc: boolean = false;

  applyFilter(event, type) {
    if (type === 'one') {
      this.individuals.filter = event.trim().toLowerCase();
    }
  }

  downloadXlOne(dataSource) {
    if (dataSource.data.length > 0) {
      const newArr = dataSource.data;
      this.commonservice.exportAsExcelFile(dataSource._renderData._value, 'DC_IN');
    } else {
      this.commonservice.openSnackbar('No data to export', 'Ok', 1500);
    }
  }

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
