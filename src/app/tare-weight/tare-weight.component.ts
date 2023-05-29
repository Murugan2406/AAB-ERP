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
import { Component, OnInit, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Globals } from 'src/app/globals';
import { InventoryService } from 'src/app/updatation/services/inventory.service';
import { SubSink } from 'subsink';
import Swal from 'sweetalert2';

declare let $: any;

@Component({
  selector: 'app-tare-weight',
  templateUrl: './tare-weight.component.html',
  styleUrls: ['./tare-weight.component.css'],
})
export class TareWeightComponent implements OnInit {
  constructor(
private service: InventoryService,
private globals: Globals,
private router: Router,
    public dialog: MatDialog,
  ) {
    this.service.apiUrl = this.globals.gServerApiUrl;
  }

  progressval = '';

  searchValue = ''

 subs = new SubSink();

  tareweightList: any = [];

  loading = false

  _defaultData = {
    PrdnBatchSelMnlMech: '',
    PrdnItmSelTerwise: '',
    PrdnTareMnl_Barc: '',
    StatusRes: '',
    VmasterQrMnlScn: '',
    billdate: '',
    brname: '',
    companyname: '',
  }

  tareData = {
    desc: '',
    barcode: '',
    weight: '',
  }

  ngOnInit(): void {
    this.loadDatas('LoadSettings', this.globals.gBrcode, this.globals.gTerCode, true, '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0');
  }

  changeOption() {
    this.tareweightList = [];
    this.loadDatas(
      'LoadTareWeightDetails',
      this.globals.gBrcode,
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      this._defaultData.PrdnBatchSelMnlMech,
    );
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
    if (this.loading) {
      return;
    }
    this.loading = true;
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
    }).subscribe({
      next: (response) => {
        this.loading = false;
        this.progressval = '';
        if (response?.length > 0) {
          if (response[0]?.StatusRes === 'Success') {
            this.dialog.closeAll();
            const data = response;
            if (reqmain == 'LoadSettings') {
              this._defaultData = data[0];
              this._defaultData.PrdnBatchSelMnlMech = 'MANUAL';
              this.changeOption();
            }
            if (reqmain == 'LoadTareWeightDetails') { this.tareweightList = data; }
            if (reqmain == 'DeleteTareWeightManual' || reqmain == 'DeleteTareWeightBarcode') { this.deleteTareresponse(data); }
          } else {
            Swal.fire({ text: response[0]?.StatusRes });
          }
        } else {
          Swal.fire({ text: 'No response' });
        }
      },
      error: (error) => {
        this.loading = false;
        this.progressval = '';
        Swal.fire({ text: error.message ?? 'Http failure response' });
      },
      complete: () => {},
    }));
    // }).subscribe((result: any) => {
    //   this.progressval = '';
    //   const data = result;
    //   if (reqmain == 'LoadSettings') {
    //     this._defaultData = data[0];
    //     this._defaultData.PrdnBatchSelMnlMech = 'MANUAL';
    //     this.changeOption();
    //   }
    //   if (reqmain == 'LoadTareWeightDetails') { this.tareweightList = data; }
    //   if (reqmain == 'DeleteTareWeightManual' || reqmain == 'DeleteTareWeightBarcode') { this.deleteTareresponse(data); }
    // }, (err: any) => {
    //   this.progressval = '';
    //   Swal.fire({ html: err.error });
    // }));
  }

  deleteTareresponse(data: any) {
    if (data.length > 0) {
      if (data[0].StatusRes == 'Success') {
        Swal.fire({ text: 'Delete Successfully..' });
        this.tareweightList = [];
        this.loadDatas(
          'LoadTareWeightDetails',
          this.globals.gBrcode,
          '0',
          '0',
          '0',
          '0',
          '0',
          '0',
          '0',
          '0',
          '0',
          '0',
          '0',
          '0',
          '0',
          '0',
          '0',
          '0',
          '0',
          '0',
          '0',
          this._defaultData.PrdnBatchSelMnlMech,
        );
      } else {
        Swal.fire({ text: data[0].StatusRes });
      }
    } else {
      Swal.fire({ text: 'Delete failed..' });
    }
  }

  getAddTareweightResponse(data: any) {
    if (data.length > 0) {
      if (data[0].StatusRes == 'Success') {
        Swal.fire({ text: 'Added Successfully..' });
        this.tareweightList = [];
        this.loadDatas(
          'LoadTareWeightDetails',
          this.globals.gBrcode,
          '0',
          '0',
          '0',
          '0',
          '0',
          '0',
          '0',
          '0',
          '0',
          '0',
          '0',
          '0',
          '0',
          '0',
          '0',
          '0',
          '0',
          '0',
          '0',
          this._defaultData.PrdnBatchSelMnlMech,
        );
      } else {
        Swal.fire({ text: data[0].StatusRes });
      }
    } else {
      Swal.fire({ text: 'Added failed..' });
    }
  }

  openTarepopup(Template:TemplateRef<any>) {
    this.tareData.desc = '';
    this.tareData.barcode = '';
    this.tareData.weight = '';
    // $('#tareweightModal').modal('show');

    this.dialog.open(Template, {
      minWidth: '450px', maxHeight: '99vh', disableClose: true, autoFocus: false, panelClass: 'gDialogBox',
    });
  }

  addtareweight() {
    Swal.fire({
      title: 'Are you sure to save ?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      confirmButtonColor: '#4caf50',
      cancelButtonColor: '#ff80ab',
    }).then((result) => {
      if (result.value) {
        if (this._defaultData.PrdnBatchSelMnlMech == 'Manual') {
          this.loadDatas(
            'CreateTareWeightManual',
            this.globals.gBrcode,
            '0',
            this.tareData.desc,
            '0',
            this.tareData.barcode,
            '0',
            '0',
            '0',
            '0',
            '0',
            this.tareData.weight,
            '0',
            '0',
            '0',
            '0',
            '0',
            '0',
            '0',
            '0',
            '0',
            this._defaultData.PrdnBatchSelMnlMech,
          );
        } else {
          this.loadDatas(
            'CreateTareWeightBarcode',
            this.globals.gBrcode,
            '0',
            this.tareData.desc,
            '0',
            this.tareData.barcode,
            '0',
            '0',
            '0',
            '0',
            '0',
            this.tareData.weight,
            '0',
            '0',
            '0',
            '0',
            '0',
            '0',
            '0',
            '0',
            '0',
            this._defaultData.PrdnBatchSelMnlMech,
          );
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) { }
    });
  }

  itemRemove(i: number) {
    Swal.fire({
      title: 'Are you sure to delete ?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      confirmButtonColor: '#4caf50',
      cancelButtonColor: '#ff80ab',
    }).then((result) => {
      if (result.value) {
        if (this._defaultData.PrdnBatchSelMnlMech == 'Manual') {
          this.loadDatas(
            'DeleteTareWeightManual',
            this.globals.gBrcode,
            '0',
            this.tareweightList[i].Mettype,
            '0',
            this.tareweightList[i].barcode,
            '0',
            '0',
            '0',
            '0',
            '0',
            this.tareweightList[i].wgt,
            '0',
            '0',
            '0',
            '0',
            '0',
            '0',
            '0',
            '0',
            '0',
            this._defaultData.PrdnBatchSelMnlMech,
          );
        } else {
          this.loadDatas(
            'DeleteTareWeightBarcode',
            this.globals.gBrcode,
            '0',
            this.tareweightList[i].Mettype,
            '0',
            this.tareweightList[i].barcode,
            '0',
            '0',
            '0',
            '0',
            '0',
            this.tareweightList[i].wgt,
            '0',
            '0',
            '0',
            '0',
            '0',
            '0',
            '0',
            '0',
            '0',
            this._defaultData.PrdnBatchSelMnlMech,
          );
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) { }
    });
  }

  OnlyNumericDecimal(event: any, option: any): any {
    if (event.keyCode >= 48 && event.keyCode <= 57) {
      return true;
    } if (event.keyCode === 46) {
      return this.checkOptions(option);
    }
    return false;
  }

  checkOptions(option: any): any {
    let text = '';
    if (option == 'Addtare_weight') { text = this.tareData.weight; }
    if (text.indexOf('.') > -1) {
      return false;
    }
    return true;
  }

  focusNext(event, id) {
    if (event.key === 'Enter') {
      setTimeout(() => {
        document.getElementById(id)?.focus();
      }, 100);
    }
  }

  selectFocus(option: any) {
    setTimeout(() => {
      (<HTMLInputElement>document.getElementById(option)).focus();
    }, 500);
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
