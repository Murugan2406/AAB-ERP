/* eslint-disable prefer-destructuring */
/* eslint-disable no-empty */
/* eslint-disable eqeqeq */
/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */
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
import { formatDate } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatMenuTrigger } from '@angular/material/menu';
import { Router } from '@angular/router';
import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Globals } from 'src/app/globals';
import { InventoryService } from 'src/app/updatation/services/inventory.service';
import { SubSink } from 'subsink';
import Swal from 'sweetalert2';
declare let $: any;

@Component({
  selector: 'app-factory-production',
  templateUrl: './factory-production.component.html',
  styleUrls: ['./factory-production.component.scss', '../../app/ProductionStyle.scss'],
})
export class FactoryProductionComponent implements OnInit {
  constructor(private service: InventoryService, public globals: Globals, private router: Router) {
    this.service.apiUrl = this.globals.gServerApiUrl;
    if (!this.globals.gmainMenuSelected) {
      this.router.navigateByUrl('dashboard');
    }
    this.subs.add(this.batchnumControl.valueChanges.pipe(debounceTime(600)).subscribe((data) => {
      this.loadDatas('BatchFilter', this.globals.gBrcode, '', '', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', data);
    }));

    this.subs.add(this.branchControl.valueChanges.pipe(debounceTime(600)).subscribe((data) => {
      this.loadDatas('DespatchFilter', this.globals.gBrcode, '', '', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', data);
    }));

    this.subs.add(this.itemControl.valueChanges.pipe(debounceTime(600)).subscribe((data) => {
      if (this.isicode) {
        this.isicode = !this.isicode;
      } else {
        this.loadDatas('ItemFilter', this.globals.gBrcode, this.globals.gTerCode, '', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', data);
      }
    }));

    this.subs.add(this.issueItemControl.valueChanges.pipe(debounceTime(600)).subscribe((data) => {
      this.loadDatas2('ToItemFilter', this.globals.gBrcode, this.globals.gTerCode, '', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', data);
    }));

    this.subs.add(this.issuebatchnumControl.valueChanges.pipe(debounceTime(600)).subscribe((data) => {
      this.loadDatas2('BatchFilter', this.globals.gBrcode, '', '', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', data);
    }));
  }

  progressval = '';

  progressval1: string = '';

 subs = new SubSink();

  isOption = 'Save'; // ViewAll // StoreIssue

  isSecondSelection = 'Save' // TareWeight

  batchnumControl = new FormControl('', Validators.required);

 issuebatchnumControl = new FormControl('', Validators.required);

  branchControl = new FormControl('', Validators.required);

 issueItemControl = new FormControl('', Validators.required);

  itemControl = new FormControl('', Validators.required);

  isLoadFull = false;

 addDespatch = false;

 isClear = false;

  icode: any;

 cross_weight: any;

 tare_weight: any;

 net_weight: any;

 indwt: any;

  batch: any;

 locate_code: any;

 label_size = 1;

 item_name: any;

 uom: any;

 price: any;

  lebel_list: any = [];

 batch_list: any = [];

 brname_list: any = [];

  menuList: any = [];

 itemList: any;

  trnDate: any;

 trn_no: any;

  issue_batch_list: any = [];

 issue_itemList: any = [];

 issue_itemcode: any;

  _paneldata: any = {
    barcode: '',
    icode: '',
  }

  _defaultData = {
    PrdnBatchSelMnlMech: '',
    PrdnItmSelTerwise: '',
    PrdnTareMnl_Barc: '',
    StatusRes: '',
    VmasterQrMnlScn: '',
    billdate: '',
    brname: '',
    companyname: '',
    defaultDespatchBrname: '',
    defaultDespatchBrcode: '',
    PrintRequired: '',
    WMIp: '',
    WMPort: '',
  }

  viewList: any = [];

  ManualorMachine = '';

  ngOnInit(): void {
     $('#scanModal').modal('show')
    this.loadDatas('LoadSettings', this.globals.gBrcode, this.globals.gTerCode, true, '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0');
    this.loadDatas('LabelList', this.globals.gBrcode, this.globals.gTerCode, true, '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0');
    this.loadDatas('MenuList', this.globals.gBrcode, this.globals.gTerCode, true, '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0');
    this.viewData();
    this.shortcuts();
    setTimeout(() => {
      document.getElementById('scanBarcode')?.focus();
    }, 1000);
  }

  clearDetails() {
    this.clearRcds();
    console.log(this._defaultData.PrdnBatchSelMnlMech);
    
    if (this.globals.gmainMenuSelected !== 'IssueOnlyToproduct' && this._defaultData.PrdnBatchSelMnlMech == 'Scan') {
      this.open_BatchSelecPopup();
    }
  }

  clearRcds() {
    this.branchControl.reset(); this.issueItemControl.reset();
    this.itemControl.reset();
    this.isLoadFull = false; this.addDespatch = false; this.isClear = false;
    this.icode = ''; this.cross_weight = ''; this.tare_weight = ''; this.net_weight = ''; this.indwt = '';
    this.batch = ''; this.locate_code = ''; this.label_size = 1; this.item_name = ''; this.uom = ''; this.price = '';
    this.batch_list = []; this.brname_list = [];
    this.itemList = [];
    this.issue_batch_list = []; this.issue_itemList = []; this.issue_itemcode = '';
    this._paneldata.barcode = '';
    this._paneldata.icode = '';

    // if(this.globals.gmainMenuSelected !== 'IssueOnlyToproduct' && this._defaultData.PrdnBatchSelMnlMech !=='Manual') {
    //   this.selectFocus('scanBarcode')
    // }
  }

  changeOption(option: any) {
    this.isOption = option;
    setTimeout(() => {
      if (option === 'TrackItem') {
        document.getElementById('itemName')?.focus();
      }
    }, 500);
  }

  chooseDc_raise(option: any) {
    if (this.branchControl.value) {
      this.service.dcraiseBranch = this.branchControl.value;
      this.service.dcraise_brcode = this.locate_code;
      this.isOption = option;
    } else {
      Swal.fire('Select despatch..');
    }
  }

  getBarcodeDetails() {
    if (this._paneldata.barcode == '' || this._paneldata.barcode == null || this._paneldata.barcode == undefined) {
      Swal.fire({ text: 'Enter Barcode / QRcode' });
      return;
    }
    this.loadDatas('ViewBarcode', this.globals.gBrcode, this.globals.gTerCode, '0', '0', '0', '0', this._paneldata.barcode, '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', this.changeFinalDateFormat(this.globals.gkDate, 'yyyy-MM-dd'), this.changeFinalDateFormat(this.globals.gkDate, 'yyyy-MM-dd'), '0');
  }

  locationChange() {
    if (!this.addDespatch) {
      this.branchControl.reset(); this.locate_code = '';
      this.viewData();
    } else {
      // if(this.branchControl.value) {
      this.branchControl.setValue(this._defaultData.defaultDespatchBrname);
      this.locate_code = this._defaultData.defaultDespatchBrcode;
      this.getloadDespatchItem();
      // }
    }
  }

  open_BatchSelecPopup() {
    if (this.globals.gmainMenuSelected !== 'IssueOnlyToproduct' && this._defaultData.PrdnBatchSelMnlMech == 'Scan') {
      $('#scanModal').modal('show');
      setTimeout(() => {
        this.selectFocus('scanBarcode');
      }, 400);
    }
  }

  viewData() {
    this.viewList = [];
    this.loadDatas('ViewProductionWM', this.globals.gBrcode, this.globals.gTerCode, 'FinishedPrd', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', this.changeFinalDateFormat(this.globals.gkDate, 'yyyy-MM-dd'), this.changeFinalDateFormat(this.globals.gkDate, 'yyyy-MM-dd'), '0');
  }

  viewStoreIssue() {
    if (this.icode == null || this.icode == undefined || this.icode == '') {
      Swal.fire({ text: 'Select Item ..' });
    } else {
      this.isOption = 'StoreIssue';
    }
  }

  openDeleteModal() {
    this.trnDate = this.changeFinalDateFormat(new Date(), 'yyyy-MM-dd');
    this.trn_no = '';
    $('#DeleteModal').modal('show');
    setTimeout(() => {
      document.getElementById('TrnDate')?.focus();
    }, 500);
  }

  deleteApiReq() {
    if (this.trnDate == undefined || this.trnDate == null || this.trnDate == '') {
      Swal.fire({ text: 'Select Date..' });
    } else if (this.trn_no == undefined || this.trn_no == null || this.trn_no == '') {
      Swal.fire({ text: 'Enter trn no..' });
    } else {
      Swal.fire({
        title: 'Are you sure delete ?',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        confirmButtonColor: '#4caf50',
        cancelButtonColor: '#ff80ab',
      }).then((result) => {
        if (result.value) {
          this.loadDatas('DeleteProductionWM', this.globals.gBrcode, this.globals.gTerCode, this.globals.gmainMenuSelected, '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', this.trn_no, this.changeFinalDateFormat(this.trnDate, 'yyyy-MM-dd'), '0', '0', '0');
        } else if (result.dismiss === Swal.DismissReason.cancel) { }
      });
    }
  }

  saveCheck() {
    if (this.globals.gmainMenuSelected !== 'IssueOnlyToproduct' && this.batchnumControl.invalid) {
      Swal.fire('Enter Production Batch No');
    } else if ((this.globals.gmainMenuSelected == 'IssueOnlyToproduct' && this.issuebatchnumControl.invalid)
    || (this.globals.gmainMenuSelected == 'Prdn_IssueBOTH' && this.issuebatchnumControl.invalid)) {
      Swal.fire('Enter Production Issue To Batch');
    } else if ((this.globals.gmainMenuSelected == 'IssueOnlyToproduct' && this.issueItemControl.invalid)
    || (this.globals.gmainMenuSelected == 'Prdn_IssueBOTH' && this.issueItemControl.invalid)) {
      Swal.fire('Enter Production Issue To Item');
    } else if (!this.icode) {
      Swal.fire('Enter item Code');
    } else if (this.itemControl.invalid) {
      Swal.fire('Enter item Name');
    } else if (!this.cross_weight) {
      Swal.fire('Enter cross weight');
    } else if (!this.tare_weight) {
      Swal.fire('Enter tare weight');
    } else if (Number(this.tare_weight) > Number(this.cross_weight)) {
      Swal.fire('Not Allow To Save,Tare weight greater then gross weight..');
    } else {
      this.saveApiReq();
    }
  }

  getSelectedissueItem(event: any) {
    this.issue_itemcode = this.issue_itemList.find((e: any) => e.iname == event).icode;
    this.selectFocus('icode');
  }

  saveApiReq() {
    Swal.fire({
      title: 'Are you sure to save ?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      confirmButtonColor: '#4caf50',
      cancelButtonColor: '#ff80ab',
    }).then((result) => {
      if (result.value) {
        let Despatch = 'No'; let despatchvalue = '';
        let barbatchnum = '0'; let bartareweight = 0;
        let mnlbatchnum = '0'; let mnltareweight = 0;
        if (this._defaultData.PrdnBatchSelMnlMech == 'Barcode') {
          barbatchnum = this.batchnumControl.value;
        } else {
          mnlbatchnum = this.batchnumControl.value;
        }
        if (this._defaultData.PrdnTareMnl_Barc == 'Manual') {
          mnltareweight = this.tare_weight;
        } else {
          bartareweight = this.tare_weight;
        }
        if (this.addDespatch) {
          Despatch = 'Yes'; despatchvalue = this.locate_code;
        }
        if (this.globals.gmainMenuSelected == 'FinishedPrd') {
          this.loadDatas(
            'SaveProductionWM',
            this.globals.gBrcode,
            this.globals.gTerCode,
            this.globals.gmainMenuSelected,
            mnltareweight,
            bartareweight,
            this.icode,
            barbatchnum,
            mnlbatchnum,
            this.label_size,
            '0',
            '1',
            this.cross_weight,
            '0',
            '0',
            Despatch,
            despatchvalue,
            '0',
            '0',
            '0',
            '0',
            '0',
          );
        }
        // --exec KarSmyApiThree 'SaveProductionWM','ADMIN             ','59','1Ter','2selected menu    ','3-taremanual','4tarebarc','5icode','6batbarc','7batchno       ,'8lblsiz','9toicode','10qty','11grosw','12toiname'      ,'13IssueBatch' ,'14DespatchY/N','15Despatch','16delsno','17delseldate','18fromdate','19todate','20searchtext'

        if (this.globals.gmainMenuSelected == 'IssueOnlyToproduct') {
          this.loadDatas(
            'SaveProductionWM',
            this.globals.gBrcode,
            this.globals.gTerCode,
            this.globals.gmainMenuSelected,
            mnltareweight,
            bartareweight,
            this.icode,
            '0',
            '0',
            this.label_size,
            this.issue_itemcode,
            '1',
            this.cross_weight,
            this.issueItemControl.value,
            this.issuebatchnumControl.value,
            'No',
            '0',
            '0',
            '0',
            '0',
            '0',
            '0',
          );
        }
        if (this.globals.gmainMenuSelected == 'Prdn_IssueBOTH') {
          this.loadDatas(
            'SaveProductionWM',
            this.globals.gBrcode,
            this.globals.gTerCode,
            this.globals.gmainMenuSelected,
            mnltareweight,
            bartareweight,
            this.icode,
            barbatchnum,
            mnlbatchnum,
            this.label_size,
            this.issue_itemcode,
            '1',
            this.cross_weight,
            this.issueItemControl.value,
            this.issuebatchnumControl.value,
            Despatch,
            despatchvalue,
            '0',
            '0',
            '0',
            '0',
            '0',
          );
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) { }
    });
  }

  icode_keyPress(event: any) {
    if (this.globals.gmainMenuSelected == 'FinishedPrd') {
      if (!this.batchnumControl.value) {
        this.icode = '';
        Swal.fire({ text: 'Select Batch Number' });
      }
    }

    if (this.globals.gmainMenuSelected == 'IssueOnlyToproduct') {
      if (!this.issuebatchnumControl.value) {
        this.icode = '';
        Swal.fire({ text: 'Select Issue Batch Number' });
      } else if (!this.issueItemControl.value) {
        this.icode = '';
        Swal.fire({ text: 'Select Issue Item' });
      }
    }
  }

  getWeight() {
    this.progressval = 'indeterminate';
    this.subs.add(this.service.getBody({
      ReqMain: 'GetWeight',
      ReqSub: '0',
      TerCode: this.globals.gTerCode,
      StkWhCode: '0',
      Subcat: '0',
      Cat: '0',
      icode: '0',
      phyqty: '0',
      fdate: '0',
      tdate: '0',
      usr: '0',
      var1: this._defaultData.WMIp,
      var2: Number(this._defaultData.WMPort),
      var3: '0',
    }).subscribe((result: any) => {
      const data = result;
      this.progressval = '';
      if (data.length > 0) {
        if (data[0].statusMsg === 'Success') {
          this.cross_weight = data[0].weight;
          if (this.cross_weight) {
            this.selectFocus('Tare');
            this.netValueCalculate();
          }
        } else {
          Swal.fire({ text: data[0].errorMsg });
        }
      } else {
        Swal.fire({ text: 'Failed weight machine request..' });
      }
    }, (err: any) => {
      this.progressval = '';
      Swal.fire({ text: 'weight machine request Error' });
    }));
  }

  saveResponse(data: any) {
    if (data.length > 0) {
      if (data[0].StatusRes == 'Success') {
        this.viewData();
        if (this.isClear) {
          this.clearRcds();
        }
        if (this._defaultData.PrintRequired == 'Yes' && this.globals.gmainMenuSelected !== 'IssueOnlyToproduct') {
          this.getPrintRequest(data[0]);
        } else {
          Swal.fire({ text: 'Save Successfully..' });
          if (this.isClear) {
            this.getPopup();
          }
        }
      } else {
        Swal.fire({ text: data[0].StatusRes });
      }
    } else {
      Swal.fire({ text: 'Save failed..' });
    }
  }

  // var1:barcode, var2:Itm name, var3:netwgt, var4:uom, var5:tarewgt
  // var6: time, date, var7:exp date
  getPrintRequest(list: any) {
    this.progressval1 = 'indeterminate1';
    this.subs.add(this.service.getBody({
      ReqMain: 'ProductionbarcodePrint',
      usr: this.globals.gUsrid,
      var1: this.globals.gLabelprinterIp,
      var2: '1',
      var3: list,
      var4: '0',
      var5: '0',
      var6: '0',
      var7: '0',
      var8: '0',
      var9: '0',
      var10: '0',
    }).subscribe((result: any) => {
      const data = result;
      this.progressval1 = '';
      if (data.length > 0) {
        if (data[0].statusMsg === 'Success') {
          Swal.fire({ text: 'Print Successfully..' });
          this._paneldata.barcode = '';
        //  this.clearRcds();
        } else {
          Swal.fire({ text: `Save Successfully & ${data[0].errorMsg}` });
          this._paneldata.barcode = '';
        }
      } else {
        Swal.fire({ text: 'Save Successfully & Failed print request' });
        this._paneldata.barcode = '';
        // Swal.fire({ text: 'Failed print request..' });
      }
      this.getPopup();
    }, (err: any) => {
      this.progressval1 = '';
      Swal.fire({ text: 'Save Successfully & Print Server Error' });
      this._paneldata.barcode = '';
      this.getPopup();
    }));
  }

  getPopup() {
    if (this._defaultData.PrdnBatchSelMnlMech == 'Scan') {
      this.open_BatchSelecPopup();
    } else {
      this.selectFocus('icode');
    }
  }

  getSelectedLocation(event: any) {
    this.locate_code = this.brname_list.find((e: any) => e.brname == event).brcode;
    // this.locate_code = '';
    if (this.addDespatch) {
      this.getloadDespatchItem();
    }
  }

  getSelectedBatch(event: any) {
    if (this.globals.gmainMenuSelected == 'FinishedPrd') {
      this.selectFocus('icode');
    } else {
      this.selectFocus('issue_batch');
    }
  }

  getSelectIssueBatch(event: any) {
    this.selectFocus('issue_item');
  }

  getloadDespatchItem() {
    this.viewList = [];
    this.loadDatas('LoadDespatchItems', this.globals.gBrcode, this.globals.gTerCode, this.globals.gmainMenuSelected, '0', '0', '0', '0', '0', '0', '0', '1', '0', '0', '0', '0', this.branchControl.value, '0', '0', '0', '0', '0');
  }

  getItemToIcode(event: any) {
    this.icode = this.itemList.find((e: any) => e.iname == event).icode;
    this.getIcodeDetails(this.icode);
  }

  getIcodeDetails(code: any) {
    if (code == '') {
      Swal.fire({ text: 'Enter Item code' });
    } else {
      this.loadDatas('ItemInfo', this.globals.gBrcode, this.globals.gTerCode, true, '0', '0', code, '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0');
    }
  }

  netValueCalculate(type?) {
    let tare = 0; let cross = 0; let net = 0;
    if (this.tare_weight) { tare = Number(this.tare_weight); }
    if (this.cross_weight) { 
      cross = Number(this.cross_weight);
     }
     if(type === 'Tare'){

      if(tare >cross){
        Swal.fire({ text: 'Tare Weight should be lesser then Gross Weight ' });
        this.tare_weight = cross 
        return
      }
      
     }
    net = cross - tare;
    this.net_weight = Number(net).toFixed(3);
  }

  dcraise() {
    if (this.branchControl.value) {
      this.isOption = 'Dc_RaiseDC';
    } else {
      Swal.fire({ text: 'Select Despatch..' });
    }
  }

  viewAll() {
    this.isOption = 'ViewAll';
  }

  isicode = false;

  focusNext(event, option) {
    if (event.key === 'Enter' && event.target.value !== '') {
      setTimeout(() => {
        document.getElementById(option).focus();
      }, 100);
    }
  }

  enterKeyEvent(event: any, option: any) {
    if (event.key === 'Enter' && event.target.value !== '') {
      if (option == 'scanicode') { this.getIcodeDetails(this._paneldata.icode); }
      if (option == 'icode') { this.isicode = true; this.getIcodeDetails(this.icode); }
      if (option == 'scanBarcode') { this.getBarcodeDetails(); }
      if (option == 'cross_weight') { this.selectFocus('Tare'); }
      if (option == 'tare_weight') {
        setTimeout(() => {
          document.getElementById('saveBtn').focus();
        }, 100);
      }
    }
  }

  loadDatas(
    reqmain: any,
    brcode: any,
    extra1: any,
    extra2: any,
    extra3: any,
    extra4: any,
    extra5: any,
    extra6: any,
    extra7: any,
    extra8: any,
    extra9: any,
    extra10: any,
    extra11: any,
    extra12: any,
    extra13: any,
    extra14: any,
    extra15: any,
    extra16: any,
    extra17: any,
    extra18: any,
    extra19: any,
    extra20: any,
  ) {
    this.progressval = 'indeterminate';
    this.subs.add(this.service.datareqKarSmyThree({
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
      var12: extra12,
      var13: extra13,
      var14: extra14,
      var15: extra15,
      var16: extra16,
      var17: extra17,
      var18: extra18,
      var19: extra19,
      var20: extra20,
    }).subscribe((result: any) => {
      this.progressval = '';
      const data = result;
      if (reqmain == 'MenuList') { this.menuList = data; }
      if (reqmain == 'LabelList') { this.lebel_list = data; }
      if (reqmain == 'DespatchFilter') { this.brname_list = data; }
      if (reqmain == 'BatchFilter') { this.batch_list = data; }
      if (reqmain == 'ItemFilter') { this.itemList = data; }
      if (reqmain == 'LoadSettings') {
        this._defaultData = data[0];
        this.clearDetails();
      }
      if (reqmain == 'ItemInfo') { this.getItemInfoResponse(data); }
      if (reqmain == 'DeleteProductionWM') { this.getDeleteResponse(data); }
      if (reqmain == 'ViewProductionWM' || reqmain == 'LoadDespatchItems') { if (data && data[0].StatusRes == 'Success') { this.viewList = data; } }
      if (reqmain == 'SaveProductionWM') { this.saveResponse(data); }
      if (reqmain == 'ViewBarcode') {
        this.getBarcodeResponse(data);
      }
    }, (err: any) => {
      this.progressval = '';
      Swal.fire({ html: err.error });
    }));
  }

  clearItemDetails() {
    this.icode = '';
    this.itemControl.setValue('');
    this.uom = '';
    this.price = '';
    this.ManualorMachine = '';
    this.net_weight = ''; this.cross_weight = ''; this.tare_weight = '';
  }

  getBarcodeResponse(data: any) {
    this.batchnumControl.setValue('');
    this.clearItemDetails();
    if (data.length > 0) {
      if (data[0].StatusRes == 'Success') {
        this.batchnumControl.setValue(data[0].batch);
        this.icode = data[0].icode;
        this.itemControl.setValue(data[0].iname);
        this.uom = data[0].mment;
        this.price = data[0].irate;
        this.ManualorMachine = data[0].manl_mach;
        $('#scanModal').modal('hide');
        if (this.ManualorMachine == 'MANUAL') {
          this.selectFocus('Cross');
        } else {
          this.getWeight();
        }
      } else {
        Swal.fire({ text: data[0].StatusRes });
        this._paneldata.barcode = '';
      }
    } else {
      Swal.fire({ text: 'Invalid Barcode' });
      this._paneldata.barcode = '';
    }
  }

  loadDatas2(
    reqmain: any,
    brcode: any,
    extra1: any,
    extra2: any,
    extra3: any,
    extra4: any,
    extra5: any,
    extra6: any,
    extra7: any,
    extra8: any,
    extra9: any,
    extra10: any,
    extra11: any,
    extra12: any,
    extra13: any,
    extra14: any,
    extra15: any,
    extra16: any,
    extra17: any,
    extra18: any,
    extra19: any,
    extra20: any,
  ) {
    this.progressval = 'indeterminate';
    this.subs.add(this.service.datareqKarSmyThree({
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
      var12: extra12,
      var13: extra13,
      var14: extra14,
      var15: extra15,
      var16: extra16,
      var17: extra17,
      var18: extra18,
      var19: extra19,
      var20: extra20,
    }).subscribe((result: any) => {
      this.progressval = '';
      const data = result;
      if (reqmain == 'BatchFilter') { this.issue_batch_list = data; }
      if (reqmain == 'ToItemFilter') { this.issue_itemList = data; }
    }, (err: any) => {
      this.progressval = '';
      Swal.fire({ html: err.error });
    }));
  }

  getDeleteResponse(data: any) {
    if (data.length > 0) {
      if (data[0].StatusRes == 'Success') {
        Swal.fire({ text: 'Delete Successfully..' });
        $('#DeleteModal').modal('hide');
      } else {
        Swal.fire({ text: data[0].StatusRes });
      }
    } else {
      Swal.fire({ text: 'Delete failed..' });
    }
  }

  getItemInfoResponse(data: any) {
    if (data.length > 0) {
      this.itemControl.reset();
      this.ManualorMachine = '';
      this.icode = '';
      this.cross_weight = '';
      this.net_weight = '';
      this.price = '';
      this.item_name = '';
      this.uom = '';
      this.indwt = '';
      if (data[0].StatusRes == 'Success') {
        this.itemControl.setValue(data[0].iname);
        this.ManualorMachine = data[0].ManualorMachine;
        this.icode = data[0].icode;
        this.cross_weight = '';
        this.net_weight = '';
        this.price = data[0].irate;
        this.item_name = data[0].iname;
        this.uom = data[0].mment;
        this.indwt = data[0].indwt;
        $('#scanModal').modal('hide');
        if (this.ManualorMachine == 'MANUAL') {
          this.selectFocus('Cross');
        } else {
          this.getWeight();
        }
      } else {
        Swal.fire({ text: data[0].StatusRes });
      }
    } else {
      Swal.fire({ text: 'Item not found..' });
    }
  }

  OnluNumeri(event: any, option: any): any {
    if (event.keyCode >= 48 && event.keyCode <= 57) {
      return true;
    } if (event.keyCode === 46) {
      return this.checkOptions(option);
    }
    return false;
  }

  OnlyNumericDecimal(event: any, option: any, input): any {
      if (event.which === 46 && input && (input.indexOf('.') >= 0)) {
      return false;
    }
    input = input.replace(/^0+/, '');
    const decimalIndex = input.indexOf('.');
    if (decimalIndex !== -1 && input.length - decimalIndex > 3) {
      input = input.substring(0, decimalIndex + 4);
      return false;
    }

    if (event.keyCode >= 48 && event.keyCode <= 57) {
      return true;
    } if (event.keyCode === 46) {
      return this.checkOptions(option);
    }
    return false;
  }

  checkOptions(option: any): any {
    let text = '';
    if (option == 'Cross_weight') { text = this.cross_weight; }
    if (option == 'tare_weight') { text = this.tare_weight; }
    if (option == 'net_weight') { text = this.net_weight; }
    if (text.indexOf('.') > -1) {
      return false;
    }
    return true;
  }

  changeFinalDateFormat(startDate: any, format: any): any {
    const locale = 'en-US';
    const date = formatDate(startDate, format, locale);
    return date;
  }

  selectFocus(option: any) {
    setTimeout(() => {
      document.getElementById(option)?.focus();
    }, 100);
  }

  backNavigation() {
    if (this.isOption == 'Save') {
      if (this.isSecondSelection == 'Save') {
        this.router.navigate(['/dashboard']);
      } else {
        this.isSecondSelection = 'Save';
      }
    } else {
      //  this.viewData();
      this.isOption = 'Save';
      this.locationChange();
    }
  }

  homeNavigate() {
    this.globals.SelectDashboard = 'GROUPLIST';
    this.router.navigate(['/dashboard']);
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
    this.progressval = ''
    this.progressval1 = ''
    $('#DeleteModal').modal('hide');
    $('#scanModal').modal('hide');

  }

  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;

  someMethod() {
    this.trigger.openMenu();
  }

  timedOutCloser;

  mouseEnter(trigger1) {
    if (this.timedOutCloser) {
      clearTimeout(this.timedOutCloser);
    }
    trigger1.openMenu();
  }

  mouseLeave(trigger2) {
    this.timedOutCloser = setTimeout(() => {
      trigger2.closeMenu();
    }, 50);
  }

  shortcuts() {
    const keydown$ = fromEvent(window, 'keydown');
    this.subs.add(keydown$.subscribe((event: KeyboardEvent) => {
      if (this.isOption === 'Save') {
        if (event.altKey && (event.key === 'c' || event.key === 'C')) {
          event.preventDefault();
          this.clearDetails();
        } else if (event.altKey && (event.key === 's' || event.key === 'S')) {
          event.preventDefault();
          this.saveCheck();
        }

        if (event.altKey && (event.key === 'v' || event.key === 'V')) {
          event.preventDefault();
          this.viewAll();
        }

        if (event.altKey && (event.key === 'd' || event.key === 'D')) {
          event.preventDefault();
          this.openDeleteModal();
        }

        if (event.altKey && (event.key === 't' || event.key === 'T')) {
          event.preventDefault();
          this.changeOption('TrackItem');
        }

        if (event.altKey && (event.key === 'h' || event.key === 'H')) {
          event.preventDefault();
          this.changeOption('Help');
        }
      }
      if (event.altKey && (event.key === 'x' || event.key === 'X')) {
        event.preventDefault();
        $('#scanModal').modal('hide');
        this.backNavigation();
      }
      //   if (event.key === 'ArrowDown') {
      //     event.preventDefault();
      //     const tbody:any = document.querySelectorAll('tbody tr');

      //     if (this.selectedRowIndex < this.individuals.length - 1) {
      //       this.selectedRowIndex += 1;

      //       tbody[this.selectedRowIndex]?.focus();
      //     }
      //   }

      //   if (event.key === 'ArrowUp') {
      //     event.preventDefault();
      //     const tbody:any = document.querySelectorAll('tbody tr');

      //     if (this.selectedRowIndex > 0) {
      //       this.selectedRowIndex -= 1;
      //       tbody[this.selectedRowIndex]?.focus();
      //     }
      // }
    }));
  }

}
