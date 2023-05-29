/* eslint-disable camelcase */
/* eslint-disable no-redeclare */
/* eslint-disable no-useless-concat */
/* eslint-disable no-dupe-else-if */
/* eslint-disable no-mixed-operators */
/* eslint-disable no-empty */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-shadow */
/* eslint-disable no-sequences */
/* eslint-disable eqeqeq */
/* eslint-disable lines-between-class-members */
/* eslint-disable max-len */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-plusplus */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-empty-function */
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-useless-constructor */
/* eslint-disable import/no-unresolved */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InventoryService } from 'src/app/updatation/services/inventory.service';
import { Globals } from 'src/app/globals';
import Swal from 'sweetalert2';
import { FormControl } from '@angular/forms';
import { SubSink } from 'subsink';
// import { debounceTime } from 'rxjs';
import { formatDate } from '@angular/common';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-set-return-request',
  templateUrl: './set-return-request.component.html',
  styleUrls: ['./set-return-request.component.css'],
})
export class SetReturnRequestComponent implements OnInit, OnDestroy {
  constructor(private router: Router, private service: InventoryService, private globals: Globals) {
    this.service.apiUrl = this.globals.gApiserver;
    this.subs.add(this.BatchControl.valueChanges.pipe(debounceTime(600)).subscribe((myvardatas) => {
      if (myvardatas !== '') {
        this.batches = [];
        this.loadDatas('0', 'BATCH_SELECTION', myvardatas);
      }
    }));

    this.subs.add(this.MasterControl.valueChanges.pipe(debounceTime(600)).subscribe((myvardatas) => {
      if (myvardatas !== '') {
        this.masters = [];
        this.loadDatas('0', 'MASTERNAME_SELECTION', myvardatas);
      }
    }));

    this.subs.add(this.searchItem.valueChanges.pipe(debounceTime(600)).subscribe((myvardatas) => {
      if (myvardatas !== '') {
        if (this.optType === 'ISSUES_SET') {
          this.loadDatas(this.masterCode, 'ITEM_ISSUES_SET', myvardatas);
        } else if (this.optType === 'ISSUES_IND') {
          this.loadDatas(this.masterCode, 'TOITEM_ISSUES_IND_ITEM', myvardatas);
        }
      }
    }));

    this.subs.add(this.toItemControl.valueChanges.pipe(debounceTime(600)).subscribe((myvardatas) => {
      if (myvardatas !== '') {
        this.loadDatas(this.masterCode, 'TOITEM_ISSUES_IND', myvardatas);
      }
    }));
  }

  progressval = '';
  isSelection:any = 'OPTION'; // VIEWOPTION // VIEWLIST // VIEWDETAILS //SAVE
  sectionControl = new FormControl(); private subs = new SubSink(); fromdate: any; todate: any;
  BatchControl = new FormControl(); batches:any = []; batchCode: any; batch: any;
  MasterControl = new FormControl(); masters:any = []; masterCode: any; master: any;

  optionTypes = [{ type: 'Set', val: 'ISSUES_SET' }, { type: 'Individual', val: 'ISSUES_IND' }];

  optType = '';
  listlen:any = 0; List:any = [];
  sCode:any = '';
  searchItem = new FormControl();
  isSearch = false; items:any = [];
  sname:any = ''; qty:any = ''; sUom:any = '';
  individuals:any = [];
  toItems:any = []; to_icode:any;
  toItemControl = new FormControl();

  ngOnInit(): void {
    this.defaultDate();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  defaultDate() {
    const tdate = this.globals.gkDate;
    this.fromdate = this.changeFinalDateFormat(tdate, 'yyyy-MM-dd');
    this.todate = this.changeFinalDateFormat(tdate, 'yyyy-MM-dd');
  }

  loadDatas(var1:any, var2:any, var3:any) {
    let icode = '';
    if (var2 === 'TOITEM_ISSUES_IND_ITEM') {
      icode = this.to_icode;
    } else {
      icode = '0';
    }
    this.service.getInventryReport(
      'BranchSelection',
      '0',
      this.globals.gTerCode,
      '0',
      '0',
      this.globals.gBrcodeString,
      icode,
      '0',
      '0',
      '0',
      this.globals.gUsrid,
      var1,
      var2,
      var3,
    ).subscribe((result) => {
      const val = result;
      if (val.length > 0) {
        if (var2 === 'BATCH_SELECTION') { this.batches = val; }
        if (var2 === 'MASTERNAME_SELECTION') { this.masters = val; }
        if (var2 === 'ITEM_ISSUES_SET' || var2 === 'TOITEM_ISSUES_IND_ITEM') { this.items = val; }

        if (var2 === 'TOITEM_ISSUES_IND') {
          this.toItems = val;
        }
      } else { }
    }, (err) => { Swal.fire({ text: err }); });
  }

  changeBatch(event:any) {
    this.batchCode = this.batches.find((x:any) => x.brname === event).brcode;
    this.batch = event;
  }

  changeMaster(event:any) {
    this.masterCode = this.masters.find((x:any) => x.brname === event).brcode;
    this.master = event;
  }

  change_ToItemCode(event:any) {
    this.to_icode = this.toItems.find((x: any) => x.brname === event).brcode;
  }

  changeList(event:any) {
    this.isSearch = false;
    this.sname = event;
    this.sCode = this.items.find((x:any) => x.brname === event).brcode;
    this.searchItem.reset();
    (<HTMLInputElement>document.getElementById('itemDetail')).click();
  }

  openSearch() {
    if (this.isSearch) {
      this.isSearch = false;
    } else {
      this.isSearch = true;
      this.searchItem.reset();
      setTimeout(() => { this.selectfocus('searchitem'); }, 200);
    }
  }

  itemCodebyDetails() {
    if (this.optType === 'ISSUES_SET') {
      this.getcodebyDetails('Set');
    } else {
      this.getInd_itemDet('Ind');
    }
  }

  getcodebyDetails(reqsub:any) {
    this.progressval = 'indeterminate';
    let extra2:any = '';
    if (this.optType == 'ISSUES_SET') {
      extra2 = 'ITEM_ISSUES_SET_CODE';
    }
    this.service.getInventryReport(
      'BranchSelection',
      reqsub,
      this.globals.gTerCode,
      '0',
      '0',
      this.globals.gBrcodeString,
      this.sCode,
      '0',
      '0',
      '0',
      this.globals.gUsrid,
      this.masterCode,
      extra2,
      '0',
    ).subscribe((result) => {
      const List = result;
      this.progressval = '';
      if (List.length > 0) {
        if (List[0].result === 'OK') {
          this.sCode = List[0].icode;
          this.sname = List[0].iname;
          this.sUom = List[0].mment;
          this.selectfocus('qty');
        } else {
          Swal.fire({ text: 'Data Not Found' });
        }
      } else {
        Swal.fire({ text: 'Data Not Found' });
      }
    }, (err) => {
      this.progressval = '';
      Swal.fire({ text: err });
    });
  }

  getInd_itemDet(type:any) {
    this.progressval = 'indeterminate';
    this.service.getInventryReport(
      'BranchSelection',
      type,
      this.globals.gTerCode,
      '0',
      '0',
      this.globals.gBrcodeString,
      this.sCode,
      '0',
      '0',
      this.to_icode,
      this.globals.gUsrid,
      this.masterCode,
      'TOITEM_ISSUES_IND_CODE',
      '0',
    ).subscribe((result) => {
      const List = result;
      this.progressval = '';
      if (List.length > 0) {
        if (List[0].result === 'OK') {
          this.sCode = List[0].icode;
          this.sname = List[0].iname;
          this.sUom = List[0].mment;
          this.selectfocus('qty');
        } else {
          Swal.fire({ text: 'Data Not Found' });
        }
      } else {
        Swal.fire({ text: 'Data Not Found' });
      }
    }, (err) => {
      this.progressval = '';
      Swal.fire({ text: err });
    });
  }

  changeValue(event:any) {
    if (event.keyCode >= 48 && event.keyCode <= 57) {
      return true;
    } if (event.keyCode === 46) {
      if (this.qty.indexOf('.') > -1) {
        return false;
      }
      return true;
    }
    return false;
  }

  enterIcode(event:any) {
    if (event.key === 'Enter') {
      this.itemCodebyDetails();
    }
  }

  enterQty(event:any) {
    if (event.key === 'Enter') {
      if (this.qty === '' || this.qty === null || this.qty === undefined) {
        Swal.fire({ text: 'Enter the Quantity..' });
      } else {
        this.selectfocus('addBtn');
      }
    }
  }

  selectfocus(id:any) {
    (<HTMLInputElement>document.getElementById(id)).focus();
    // document.getElementById(id).focus();
  }

  addTolist() {
    if (this.sname === '' || this.sname === null || this.sname === undefined) {
      Swal.fire({ text: 'Item name Invalid...' });
    } else if (this.sCode === '' || this.sCode === null || this.sCode === undefined) {
      Swal.fire({ text: 'Enter the Item code...' });
    } else if (this.qty === '' || this.qty === null || this.qty === undefined) {
      Swal.fire({ text: 'Enter the Quantity..' });
    } else if (this.sUom === '' || this.sUom === null || this.sUom === undefined) {
      Swal.fire({ text: 'Click arrow button get UOM..' });
    } else {
      this.individuals.push({
        icode: this.sCode, iname: this.sname, iqty: Number(this.qty), mment: this.sUom,
      });
      this.sCode = undefined; this.sname = undefined; this.sUom = undefined; this.qty = undefined;
      this.selectfocus('icode');
    }
  }

  selectNext() {
    if (this.optType === '' || this.optType === null || this.optType === undefined) {
      Swal.fire({ text: 'Select Type...' });
    } else if (this.batchCode === '' || this.batchCode === null || this.batchCode === undefined) {
      Swal.fire({ text: 'Select Batch number...' });
    } else if (this.masterCode === '' || this.masterCode === null || this.masterCode === undefined) {
      Swal.fire({ text: 'Select master name...' });
    } else {
      if (!this.toItemControl && this.optType == 'ISSUES_IND') {
        Swal.fire({ text: 'Select to item...' });
        return;
      }
      this.individuals = [];
      this.isSelection = 'SAVE';
    }
  }

  selectView() {
    this.isSelection = 'VIEWOPTION';
  }

  cancelView() {
    this.isSelection = 'OPTION';
  }
  selectViewNext() {
    if (this.fromdate === '' || this.fromdate === null || this.fromdate === undefined) {
      Swal.fire({ text: 'Select from date...' });
    } else if (this.todate === '' || this.todate === null || this.todate === undefined) {
      Swal.fire({ text: 'Select to date...' });
    } else {
      this.List = [];
      this.viewRequest();
    }
  }

  confirmation() {
    Swal.fire({
      text: 'Are you sure ?',
      showCancelButton: true,
      confirmButtonText: 'YES',
      cancelButtonText: 'NO',
      confirmButtonColor: '#4caf50',
      cancelButtonColor: '#ff80ab',
    }).then((result) => {
      if (result.value) {
        this.saveRequest();
      } else if (result.dismiss === Swal.DismissReason.cancel) { }
    });
  }

  saveRequest() {
    if (this.individuals.length <= 0) {
      Swal.fire({ text: 'Enter the Intem details' });
    } else {
      let str = '';
      this.individuals.forEach((element:any) => {
        str = `${str + element.icode}|${element.iqty}|0|0|0|0~`;
      });
      let type = '';
      let var2 = '';
      if (this.optType === 'ISSUES_SET') {
        type = 'Set';
        var2 = '';
      } else {
        type = 'Ind';
        var2 = this.to_icode;
      }
      this.progressval = 'indeterminate';

      this.service.getInventryReport(
        'ReturnIndentSave',
        type,
        this.globals.gTerCode,
        this.batchCode,
        '0',
        this.globals.gBrcodeString,
        '0',
        '0',
        '0',
        '0',
        this.globals.gUsrid,
        str.substring(0, str.length - 1),
        var2,
        this.masterCode,
      ).subscribe((result) => {
        const List = result;
        this.progressval = '';
        if (List.length > 0) {
          if (List[0].Result === 'Success') {
            Swal.fire({ text: 'Return request send succesfully..' });
            this.isSelection = 'OPTION';
            this.onClear();
          } else {
            Swal.fire({ text: List[0].Result });
          }
        } else {
          Swal.fire({ text: 'Save failed' });
        }
      }, (err) => {
        this.progressval = '';
        Swal.fire({ text: err });
      });
    }
  }

  onClear() {
    this.individuals = []; this.masters = []; this.items = [];
    this.searchItem.reset(); this.MasterControl.reset();
    this.qty = undefined; this.sname = undefined; this.sUom = undefined; this.sCode = undefined;
    this.master = undefined; this.masterCode = undefined;
  }

  deleteRequest(date:any, trnNo:any, type:any) {
    Swal.fire({
      text: 'Are you sure ? ...',
      showCancelButton: true,
      confirmButtonText: 'YES',
      cancelButtonText: 'NO',
      confirmButtonColor: '#4caf50',
      cancelButtonColor: '#ff80ab',
    }).then((result) => {
      if (result.value) {
        this.progressval = 'indeterminate';
        this.service.getInventryReport(
          'DeleteReturnIndent',
          '0',
          this.globals.gTerCode,
          '0',
          '0',
          this.globals.gBrcodeString,
          '0',
          '0',
          this.changeFinalDateFormat(date, 'dd-MMM-yyyy'),
          '0',
          this.globals.gUsrid,
          '0',
          type,
          trnNo,
        ).subscribe((result) => {
          const List = result;
          this.progressval = '';
          if (List.length > 0) {
            if (List[0].Result === 'Success') {
              Swal.fire({ text: 'Delete Success..!' });
              this.viewRequest();
            } else {
              Swal.fire({ text: 'Delete Failed...!' });
            }
          } else {
            Swal.fire({ text: 'Delete Failed...!' });
          }
        }, (err) => {
          this.progressval = '';
          Swal.fire({ text: err });
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) { }
    });
  }

  viewRequest() {
    let type = '';
    if (this.optType === 'ISSUES_SET') {
      type = 'Set';
    } else {
      type = 'Ind';
    }
    this.progressval = 'indeterminate';
    this.service.getInventryReport(
      'ViewReturnIndent',
      '0',
      this.globals.gTerCode,
      '0',
      '0',
      this.globals.gBrcodeString,
      '0',
      '0',
      this.changeFinalDateFormat(this.fromdate, 'dd-MMM-yyyy'),
      this.changeFinalDateFormat(this.todate, 'dd-MMM-yyyy'),
      this.globals.gUsrid,
      '0',
      '0',
      type,
    ).subscribe((result) => {
      const resList = result;
      this.progressval = '';
      if (resList.length > 0) {
        if (resList[0].Result === 'Success') {
          this.List = resList; this.listlen = this.List.length;
          this.isSelection = 'VIEWLIST';
        } else {
          this.List = [];
          Swal.fire({ text: 'Data Not Found' });
        }
      } else {
        this.List = [];
        Swal.fire({ text: 'Data Not Found' });
      }
    }, (err) => {
      this.progressval = '';
      Swal.fire({ text: err });
    });
  }

  viewByid(date:any, trnNo:any) {
    let type = '';
    if (this.optType === 'ISSUES_SET') {
      type = 'Set';
    } else {
      type = 'Ind';
    }
    this.progressval = 'indeterminate';
    this.service.getInventryReport(
      'ViewReturnIndentForTrnId',
      '0',
      this.globals.gTerCode,
      '0',
      '0',
      this.globals.gBrcodeString,
      '0',
      '0',
      this.changeFinalDateFormat(date, 'dd-MMM-yyyy'),
      '0',
      this.globals.gUsrid,
      '0',
      type,
      trnNo,
    ).subscribe((result) => {
      const List = result;
      this.progressval = '';
      if (List.length > 0) {
        if (List[0].Result === 'Success') {
          this.individuals = List;
          this.isSelection = 'VIEWDETAILS';
        } else {
          Swal.fire({ text: 'Data Not Found' });
        }
      } else {
        Swal.fire({ text: 'Data Not Found' });
      }
    }, (err) => {
      this.progressval = '';
      Swal.fire({ text: err });
    });
  }

  itemRemove(index:any) {
    this.individuals.splice(index, 1);
  }

  changeFinalDateFormat(startDate:any, format:any): any {
    const locale = 'en-US';
    const date = formatDate(startDate, format, locale);
    return date;
  }

  backNavigation() {
    // VIEWOPTION // VIEWLIST // VIEWDETAILS // SAVE
    if (this.isSelection === 'VIEWDETAILS') {
      this.isSelection = 'VIEWLIST'; this.individuals = [];
    } else if (this.isSelection === 'VIEWLIST') {
      this.isSelection = 'VIEWOPTION';
    } else if (this.isSelection === 'SAVE' || this.isSelection === 'VIEWOPTION') {
      this.isSelection = 'OPTION';
    } else {
      this.router.navigate(['/dashboard']);
    }
  }

  homeNavigate() {
    this.globals.SelectDashboard = 'GROUPLIST';
    this.router.navigate(['/dashboard']);
  }
}
