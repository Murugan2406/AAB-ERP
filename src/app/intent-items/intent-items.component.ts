/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-duplicates */
import { TemplateRef } from '@angular/core';
/* eslint-disable no-plusplus */
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
import {
  Component, OnInit, OnDestroy, ViewChild,
} from '@angular/core';
import { formatDate } from '@angular/common';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { SubSink } from 'subsink';
import { InventoryService } from 'src/app/updatation/services/inventory.service';

import { Globals } from 'src/app/globals';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import Swal from 'sweetalert2';
import {
  animate, state, style, transition, trigger,
} from '@angular/animations';
import { MatMenuTrigger } from '@angular/material/menu';
import { fromEvent } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { CommonService } from '../services/common.service';

declare let $: any;
@Component({
  selector: 'app-intent-items',
  templateUrl: './intent-items.component.html',
  styleUrls: ['./intent-items.component.scss'],
  animations: [
    trigger('enterAnimation', [
      transition(':enter', [
        style({ transform: 'translateX(100%)', opacity: 0 }),
        animate('8000ms', style({ transform: 'translateX(0)', opacity: 1 })),
      ]),
      transition(':leave', [
        style({ transform: 'translateX(0)', opacity: 1 }),
        animate('8000ms', style({ transform: 'translateX(100%)', opacity: 0 })),
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
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('555ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],

  // providers: [{ provide: DateAdapter, useClass: AppDateAdapter },
  //   { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS }],
})
export class IntentItemsComponent implements OnInit, OnDestroy {
  classArrTable: any =[];

  showlogin: any = true;

  showItemAdd: boolean = false;

  selectedRowIndex: any = 1;

  headerType: any ='Set' ;

  TrnId: any = '';

  columnsToDisplay = ['S.No', 'BatchNo', 'timenow', 'MasterName', 'usr', 'Delete'];

  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];

  expandedElement: any | null;

  ModalBatch: any = '';

  ModeltrnId: any = '';

  ModalDate: any = '';

  ModelMaster: any = '';

  constructor(
public globals: Globals,
private router: Router,
private service: InventoryService,
    private commonservice: CommonService,
    public dialog: MatDialog,
  ) {
    this.service.apiUrl = this.globals.gServerApiUrl;
    this.subs.add(this.BatchControl.valueChanges.pipe(debounceTime(300),distinctUntilChanged()).subscribe((myvardatas) => {
      this.loadDatas('0', 'BATCH_SELECTION', myvardatas);
    }));

    this.subs.add(this.MasterControl.valueChanges.pipe(debounceTime(300),distinctUntilChanged()).subscribe((myvardatas) => {
      this.loadDatas('0', 'MASTERNAME_SELECTION', myvardatas);
    }));

    this.subs.add(this.IndentControl.valueChanges.pipe(debounceTime(300),distinctUntilChanged()).subscribe((myvardatas) => {
      if (this.isType === 'Ind') {
        this.toloadDatas(this.masterCode, 'TOITEM_ISSUES_IND', myvardatas);
      } else {
        this.toloadDatas('0', 'TO_SECTION', myvardatas);
      }
    }));

    this.subs.add(this.searchItem.valueChanges.pipe(debounceTime(300),distinctUntilChanged()).subscribe((myvardatas) => {
      if (this.isType === 'Set') {
        this.loadDatas(this.masterCode, 'ITEM_ISSUES_SET', myvardatas);
      } else if (this.isType === 'Ind') {
        this.loadDatas(this.masterCode, 'TOITEM_ISSUES_IND_ITEM', myvardatas);
      } else {
        this.loadDatas(this.masterCode, 'RM_ITEMS_TO_SEC', myvardatas);
      }
    }));
  }

  fromUsr = '';

 fromBrcode = '';

 index: any;

 progressval = '';

  isOption = 'INDENT_SAVE';

 isSelection = 'OPTION';

 viewSearch =''

  // tslint:disable-next-line: max-line-length
  assignButton = [{ type: 'Set', value: 'Set' }, { type: 'Individual', value: 'Ind' }, { type: 'Unplanned', value: 'Sec' }];

  searchItem = new FormControl();

 private subs = new SubSink();

  BatchControl = new FormControl();

 MasterControl = new FormControl();

 IndentControl = new FormControl();

  isType = 'Set';

 batch: any;

 master: any;

 item: any;

 isSearch = true;

 isChecked = false;

  today = new Date();

 todate=new Date();

 fromdate=new Date();

 qty: any;

 sname: any;

 sUom: any;

 sCode: any;

  batches: any = [];

 masters: any = [];

 toItems: any = [];

 items: any = [];

 individuals: any = [];

  batchCode: any;

 masterCode: any;

 toIndentCode: any;

  isOutputchk = false;

  ngOnInit() {
    this.toloadBatches('-7');
    this.toggleform();
    this.shortcuts();
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  toloadBatches(option: any) {
    this.progressval = 'indeterminate';
    this.service.getInventryReport(
      'LoadBatches',
      '0',
      this.globals.gTerCode,
      '0',
      '0',
      this.globals.gBrcodeString,
      '0',
      '0',
      '0',
      '0',
      this.globals.gUsrid,
      '0',
      option,
      '5',
    ).subscribe((result) => {
      const List = result;
      this.progressval = '';
      if (List.length > 0) {
        if (List[0].Result === 'Success') {
          this.batch = List[0].currentBatch;
          this.batchCode = List[0].currentBatch;
        } else {
          Swal.fire({ text: List[0] });
        }
      } else { }
    }, (err) => {
      Swal.fire({ text: err });
    });
  }

  toloadDatas(var1: any, var2: any, var3: any) {
    this.service.getInventryReport(
      'BranchSelection',
      '0',
      this.globals.gTerCode,
      '0',
      '0',
      this.globals.gBrcodeString,
      '0',
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
        if (val[0].brname) {
          this.toItems = val;
        }
      } else { this.toItems = [] }
    }, (err) => { Swal.fire({ text: err }); });
  }

  loadDatas(var1: any, var2: any, var3: any) {
    let icode;
    if (var2 == 'TOITEM_ISSUES_IND_ITEM') {
      icode = this.toIndentCode;
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
        if (var2 === 'BATCH_SELECTION') {
          this.batches = val;
        } else if (var2 === 'MASTERNAME_SELECTION') {
          this.masters = val;
        } else if (var2 === 'ITEM_ISSUES_SET' || var2 === 'RM_ITEMS_TO_SEC' || var2 === 'TOITEM_ISSUES_IND_ITEM' || var2 === 'TOITEM_ISSUES_SEC') {
          this.items = val.splice(0,100);
        }
      } else { 
        if (var2 === 'BATCH_SELECTION') {
          this.batches = [];
        } else if (var2 === 'MASTERNAME_SELECTION') {
          this.masters = [];
        } else if (var2 === 'ITEM_ISSUES_SET' || var2 === 'RM_ITEMS_TO_SEC' || var2 === 'TOITEM_ISSUES_IND_ITEM' || var2 === 'TOITEM_ISSUES_SEC') {
          this.items = [];
        }


      }
    }, (err) => { Swal.fire({ text: err }); });
  }

  changeAssignType(event: any) {
    if (event.value === 'Ind') {
      this.headerType = 'Individual';
    } else if (event.value === 'Sec') {
      this.headerType = 'Unplanned';
    } else {
      this.headerType = 'Set';
    }
    this.isType = event.value;

    this.onClear();
  }

  changeList(event: any, option: any) {
    this.isOutputchk = false;
    if (option === 'batch') {
      this.batchCode = event.brcode;
      this.batch = event.brname;
      this.selectfocus('mastername');
    } else if (option === 'master') {
      this.masterCode = event.brcode;
      this.master =  event.brname;

      if (this.isType === 'Set') {
        setTimeout(() => {
          document.getElementById('next').focus();
        }, 100);
      } else {
        this.selectfocus('indentTo');
      }
    } else if (option === 'toItem') {
      this.toIndentCode =event.brcode;
      this.item =  event.brname;
      setTimeout(() => {
        document.getElementById('next').focus();
      }, 100);
    } else if (option === 'search') {
      this.isSearch = true;
      this.sname =  event.brname;
      // console.log(this.items.find((x: any) => x.brname === event), event, this.items);
      
      this.sCode =event.brcode;

      setTimeout(() => {
        document.getElementById('itemDetail').focus();
        document.getElementById('itemDetail').click();
      }, 100);
    }
  }


  onclickFullbatch() {
    if (this.isChecked) {
      this.isChecked = false;
      this.toloadBatches('-7');
    } else {
      this.isChecked = true;
      this.toloadBatches('-30');
    }
  }

  changeOutput(event: any) {
    this.isOutputchk = event;
  }

  selectNextsave() {
    this.sCode = undefined; this.sname = undefined; this.sUom = undefined; this.qty = undefined;
    this.outputQty = 0; this.rmItems = []; this.searchItem.setValue('');
    this.items = [];
    if (this.isType === 'Set') {
      if (this.batch === '' || this.batch === null || this.batch === undefined) {
        Swal.fire({ text: 'Select the batch number' });
      } else if (this.master === '' || this.master === null || this.master === undefined) {
        Swal.fire({ text: 'Select master name' });
      } else {
        this.toIndentCode = '0';
        this.showItemAdd = true;
        this.individuals = [];
        setTimeout(() => { this.selectfocus('icode'); }, 200);
      }
    } else if (this.batch === '' || this.batch === null || this.batch === undefined) {
      Swal.fire({ text: 'Select the batch number' });
    } else if (this.master === '' || this.master === null || this.master === undefined) {
      Swal.fire({ text: 'Select master name' });
    } else if (this.item === '' || this.item === null || this.item === undefined) {
      Swal.fire({ text: 'Select the to item ' });
    } else {
      this.showItemAdd = true;
      this.individuals = [];
      setTimeout(() => { this.selectfocus('icode'); }, 200);
    }
  }

  selectNextView() {
    this.viewAll();
  }

  selectView() {
    this.todate = this.today;
    this.fromdate = this.today;
    this.isOption = 'INDENT_VIEW';
  }

  viewCancel() {
    this.individuals = [];
    this.isOption = 'INDENT_SAVE';
  }

  openSearch() {
    if (this.isSearch) {
      this.isSearch = false;
      setTimeout(() => { this.selectfocus('searchitem'); }, 200);
    } else {
      this.isSearch = true;
    }
  }

  itemCodebyDetails() {
    this.isOutputchk = false;
    if (this.isType === 'Set') {
      this.getcodebyDetails('ITEM_ISSUES_SET_CODE', '0');
    } else if (this.isType === 'Ind') {
      this.getInd_itemDet();
    } else {
      this.getcodebyDetails('RM_ITEMS_TO_SEC_CODE', '0');
    }
  }

  getInd_itemDet() {
    this.progressval = 'indeterminate';
    this.service.getInventryReport(
      'BranchSelection',
      this.isType,
      this.globals.gTerCode,
      '0',
      '0',
      this.globals.gBrcodeString,
      this.sCode,
      '0',
      '0',
      this.toIndentCode,
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
          this.searchItem.setValue(List[0].iname);
          this.sUom = List[0].mment;
          this.qty = 1;
          this.selectfocus('qty');
          if (this.isType === 'Set') {
            this.getloadDataFgcode('FgCodeDets', this.sCode);
          }
        } else {
          Swal.fire({ text:List[0].StatusMsg });
        }
      } else {
        Swal.fire({ text: 'No record found' });
      }
    }, (err) => {
      this.progressval = '';
      Swal.fire({ text: err });
    });
  }

  outputQty:any = 0;

  getcodebyDetails(type: any, extra3: any) {
    this.progressval = 'indeterminate';
    this.service.getInventryReport(
      'BranchSelection',
      this.isType,
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
      type,
      extra3,
    ).subscribe((result) => {
      const List = result;
      this.progressval = '';
      if (List.length > 0) {
        if (List[0].result === 'OK') {
          this.sCode = List[0].icode;
          this.sname = List[0].iname;
          this.searchItem.setValue(List[0].iname);

          this.sUom = List[0].mment;
          this.selectfocus('qty');
          if (this.isType === 'Set') {
            this.getloadDataFgcode('FgCodeDets', this.sCode);
          }
        } else {
          Swal.fire({ text: 'No record found' });
        }
      } else {
        Swal.fire({ text: 'No record found' });
      }
    }, (err) => {
      this.progressval = '';
      Swal.fire({ text: err });
    });
  }

  rmItems: any = [];

  getloadDataFgcode(main: any, submain: any) {
    this.rmItems = []; this.outputQty = 0;
    this.progressval = 'indeterminate';
    this.service.getInventryReport(
      main,
      submain,
      this.globals.gTerCode,
      '0',
      '0',
      this.globals.gBrcodeString,
      '0',
      '0',
      '0',
      '0',
      this.globals.gUsrid,
      '0',
      '0',
      '0',
    ).subscribe((result) => {
      const List = result;
      this.progressval = '';
      if (List.length > 0) {
        if (List[0].Result === 'Success') {
          this.outputQty = Number(List[0].outputqty).toFixed(3);
          this.rmItems = List.splice(0,100);
          //  this.qtyKeyup();
          this.outputKeyUp('normal');
        }
      }
    }, (err) => {
      this.progressval = '';
    });
  }

  qtyKeyup() {
    if (this.isType === 'Set') {
      let qty = 0;
      if (this.qty === '' || this.qty === undefined || this.qty === null) {
        qty = 1;
      } else {
        qty = Number(this.qty);
      }
      this.rmItems.forEach((element: any) => {
        element.Issqty = element.rqty * qty;
        element.rivalue = element.Issqty * element.rirate;
      });
      // eslint-disable-next-line no-unsafe-optional-chaining
      this.outputQty = (this.rmItems[0]?.outputqty * qty).toFixed(3);
    }
  }

  outputKeyUp(type) {
    if (type === 'key') {
      this.qty = (Number(this.outputQty) / this.rmItems[0]?.outputqty).toFixed(3);
    } else {
      this.qty = (Number(this.outputQty) / this.rmItems[0]?.outputqty);
    }
    this.rmItems.forEach((element: any) => {
      element.Issqty = element.rqty * this.qty;
      element.rivalue = element.Issqty * element.rirate;
    });
  }

  clearIntent() {
    this.individuals = [];
    this.sCode = '';
    this.searchItem.reset();
    this.qty = '';
    this.sUom = '';
    this.outputQty = '';
    this.isOutputchk = false;
    setTimeout(() => {
      document.getElementById('icode').focus();
    }, 100);
  }

  
  changeOutputQtyValue(event: any) {
    if (event.keyCode >= 48 && event.keyCode <= 57) {
      return true;
    } if (event.keyCode === 46) {
      const str = this.outputQty.toString();
      if (str.indexOf('.') > -1) {
        return false;
      }
      return true;
    }
    return false;
  }

  changeValue(event: any, type, input) {
    const allowedKeycodes = [46,48, 49,50,51,52,53,54,55,56,57]; 

    if (!allowedKeycodes.includes(event.keyCode)) {
  event.preventDefault(); 
     return false;
}
    if (event.which === 46 && input && (input.indexOf('.') >= 0)) {
      return false;
    }
    input = input.replace(/^0+/, '');

    const decimalIndex = input.indexOf('.');
    if (decimalIndex !== -1 && input.length - decimalIndex > 2) {
      input = input.substring(0, decimalIndex + 3);
    }
if(type ==='qty'){
  this.qty = input;
}else{
  this.outputQty = input
}
    return true;
  }

  enterKeyforCode(event: any) {
    if (event.key === 'Enter') {
      if (this.sCode === '' || this.sCode === null || this.sCode === undefined) {
        Swal.fire({ text: 'Enter the code' });
      } else {
        this.itemCodebyDetails();
      }
    }
  }

  keyTab(event: any, option) {
    if (event.key === 'Enter' && event.target.value !== '') {
      setTimeout(() => {
        document.getElementById(option).focus();
      }, 100);
    }
  }

  keyTab1(event: any, i) {
    if (event.key === 'Enter') {
      this.viewbyTrn(this.individuals[i].trnId, this.individuals[i].timenow, this.isType, this.individuals[i]);
      this.rowClick(i);
    }
  }

  enterQty(event: any) {
    if (event.key === 'Enter') {
      // document.getElementById('itemCheck').focus();
      if (this.qty === '' || this.qty === null || this.qty === undefined) {
        Swal.fire({ text: 'Enter the Quantity' });
      } else {
        setTimeout(() => {
          this.addTolist();
        }, 100);
        // this.selectfocus('addBtn');
      }
    }
  }

  addTolist() {
    if (this.sname === '' || this.sname === null || this.sname === undefined) {
      Swal.fire({ text: 'Invalid Item name' });
    } else if (this.sCode === '' || this.sCode === null || this.sCode === undefined) {
      Swal.fire({ text: 'Enter the Item code ' });
    } else if (this.qty === '' || this.qty === null || this.qty === undefined) {
      Swal.fire({ text: 'Enter the Quantity ' });
    } else if (this.sUom === '' || this.sUom === null || this.sUom === undefined) {
      Swal.fire({ text: 'Click arrow button get UOM ' });
    }else if (this.qty == 0) {
      Swal.fire({ text: 'Enter the Quantity ' });
    } else {

      const exit = this.individuals.find((element) => element.icode == this.sCode);
      if(exit){
        Swal.fire({text:'Item already exist !'})
        return
      }
    
      this.individuals.push({
        icode: this.sCode, iname: this.sname, iqty: Number(this.qty), mment: this.sUom,
      });
      this.sCode = undefined; this.sname = undefined; this.sUom = undefined; this.qty = undefined;
      this.outputQty = 0; this.rmItems = [];
      this.searchItem.reset();
      this.selectfocus('icode');
    }
  }

  save() {
    if (this.individuals.length <= 0) {
      Swal.fire({ text: 'Enter the Intent details' });
    } else {
      let str = '';
      this.individuals.forEach((element: any) => {
        str = `${str + element.icode}|${element.iqty}|0|0|0|0~`;
      });

      this.progressval = 'indeterminate';
      this.service.getInventryReport(
        'SaveIndent',
        this.isType,
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
        this.toIndentCode,
        this.masterCode,
      ).subscribe((result) => {
        const List = result;
        this.progressval = '';
        if (List.length > 0) {
          if (List[0].Result === 'Success') {
            Swal.fire({ text: 'Indent sent successfully' });
            this.progressval = 'indeterminate';
            setTimeout(() => {
              this.isOption = 'INDENT_SAVE'; this.isSelection = 'OPTION';
              this.showItemAdd = !this.showItemAdd;
              this.progressval = '';
            }, 500);
            this.onClear();
          } else {
            Swal.fire({ text: List[0].Result });
          }
        } else {
          Swal.fire({ text: 'Indent sent failed' });
        }
      }, (err) => {
        this.progressval = '';
        Swal.fire({ text: err });
      });
    }
  }

  viewAll() {
    this.progressval = 'indeterminate';
    this.service.getInventryReport(
      'ViewIndentGiven',
      '0',
      this.globals.gTerCode,
      '0',
      '0',
      this.globals.gBrcodeString,
      '0',
      '0',
      this.changeFinalDateFormat(this.fromdate),
      this.changeFinalDateFormat(this.todate),
      this.globals.gUsrid,
      '0',
      '0',
      this.isType,
    ).subscribe((result) => {
      const List = result;
      this.progressval = '';
      if (List.length > 0) {
        if (List[0].Result === 'Success') {
          this.individuals = List.splice(0,100);
          // this.isSelection = 'LISTVIEW';
        } else {
          this.individuals = [];
          // Swal.fire({ text: 'No record found' });
        }
      } else {
        this.individuals = [];
        // Swal.fire({ text: 'No record found' });
      }
    }, (err) => {
      this.progressval = '';
      Swal.fire({ text: err });
    });
  }

  rowClick(index : number) {
    this.selectedRowIndex = index;
    for (let i = 0; i < this.individuals.length; i++) {
      if (i === index) {
        this.classArrTable[i] = true;
      } else {
        this.classArrTable[i] = false;
      }
    }
  }

  showSide = false;

  @ViewChild('detailedTable') detailedTable: TemplateRef<any>;

  @ViewChild('scanModalS') scanModalS;

  viewbyTrn(trnNo: any, date: any, type: any, row) {
    this.progressval = 'indeterminate';
    this.TrnId = trnNo;
    this.service.getInventryReport(
      'ViewIndentForTrnId',
      '0',
      this.globals.gTerCode,
      '0',
      '0',
      this.globals.gBrcodeString,
      '0',
      '0',
      this.changeFinalDateFormat(date),
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
          this.items = List.splice(0,100);
          this.ModalBatch = row.BatchNo;
          this.ModeltrnId = row.trnId;
          this.ModalDate = row.timenow;
          this.ModelMaster = row.MasterName;
          this.scanModalS.nativeElement.click();
          // $('#scanModal').modal('show');
          // this.dialog.open(this.detailedTable, {
          //   width: '300px', maxHeight: '630px', disableClose: true, autoFocus: false, panelClass: 'gNewModel',
          // });

          // this.isSelection = 'SINGLEVIEW';
        } else {
          this.showSide = false;
          Swal.fire({ text: 'No record found' });
        }
      } else {
        this.showSide = false;
        Swal.fire({ text: 'No record found' });
      }
    }, (err) => {
      this.progressval = '';
      Swal.fire({ text: err });
    });
  }

  deletebyTrn(date: any, type: any, trnNo: any) {
    this.progressval = 'indeterminate';
    this.service.getInventryReport(
      'DeleteIndent',
      '0',
      this.globals.gTerCode,
      '0',
      '0',
      this.globals.gBrcodeString,
      '0',
      '0',
      this.changeFinalDateFormat(date),
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
          Swal.fire({ text: 'Record Successfully deleted ' });
          this.items = [];
          this.showSide = false;
          this.selectedRowIndex = 0;
          this.viewAll();
        } else {
          Swal.fire({ text: List[0].Result });
        }
      } else {
        Swal.fire({ text: 'Delete Failed !' });
      }
    }, (err) => {
      this.progressval = '';
      Swal.fire({ text: err });
    });
  }

  onClear() {
    this.individuals = []; this.masters = []; this.items = []; this.toItems = [];
    this.searchItem.reset(); this.MasterControl.reset(); this.IndentControl.reset();
    this.qty = undefined; this.sname = undefined; this.sUom = undefined; this.sCode = undefined;
    this.master = undefined; this.item = undefined;
    this.masterCode = undefined; this.toIndentCode = undefined;
  }

  backNavigation() {
    this.isSearch = true;
    if (this.isSelection === 'OPTION') {
      if (this.isOption === 'INDENT_VIEW') {
        this.isOption = 'INDENT_SAVE';
      } else {
        this.router.navigate(['/dashboard']);
      }
    } else if (this.isSelection === 'ITEMVIEW') {
      this.isSelection = 'OPTION';
    } else if (this.isSelection === 'LISTVIEW') {
      this.individuals = [];
      this.isSelection = 'OPTION';
    } else if (this.isSelection === 'SINGLEVIEW') {
      this.items = [];
      this.isSelection = 'LISTVIEW';
    }
  }

  homeNavigate() {
    this.globals.SelectDashboard = 'GROUPLIST';
    this.router.navigate(['/dashboard']);
  }

  todeleteConfirmation(date: any, type: any, trnNo: any) {
    Swal.fire({
      text: 'Are you sure to delete this indent ?',
      showCancelButton: true,
      confirmButtonText: 'YES',
      cancelButtonText: 'NO',
      confirmButtonColor: '#4caf50',
      cancelButtonColor: '#ff80ab',
    }).then((result) => {
      if (result.value) {
        this.deletebyTrn(date, type, trnNo);
      } else if (result.dismiss === Swal.DismissReason.cancel) { }
    });
  }

  tosaveConfirmation() {
    if (this.individuals.length == 0) {
      Swal.fire({ text: 'No record to save' });
      return;
    }
    Swal.fire({
      text: 'Are you sure to sent this indent ? ',
      showCancelButton: true,
      confirmButtonText: 'YES',
      cancelButtonText: 'NO',
      confirmButtonColor: '#4caf50',
      cancelButtonColor: '#ff80ab',
    }).then((result) => {
      if (result.value) {
        this.save();
      } else if (result.dismiss === Swal.DismissReason.cancel) { }
    });
  }

  itemRemove(index: any, item) {
    this.commonservice.taskConfirmation(`Are you sure to remove ${item.icode} - ${item.iname} ?`, '', true, 'Yes', '').then((res) => {
      if (res.isConfirmed) {
        this.individuals.splice(index, 1);
        setTimeout(() => {
          document.getElementById('icode')?.focus();
        }, 100);
      }
    });
  }

  selectfocus(option: any) {
    setTimeout(() => {
      document.getElementById(option)?.focus();
    }, 100);
  }

  changeFinalDateFormat(startDate: any): any {
    const format = 'dd-MM-yyyy';
    const locale = 'en-US';
    const date = formatDate(startDate, format, locale);
    return date;
  }

  toggleform() {
    this.individuals = [];
    if (this.showlogin) {
      const data = document.getElementById('gcardContainer1') as HTMLElement;
      data.style.transform = 'rotateY(180deg)' || '';

      this.showlogin = !this.showlogin;
    } else {
      const data = document.getElementById('gcardContainer1') as HTMLElement;
      data.style.transform = 'rotateY(0deg)' || '';

      this.showlogin = !this.showlogin;
      this.selectNextView();
    }
  }
  column: any;

  direction: number;
 
  isDesc: boolean = false;

  sorts(property: any) {
    this.isDesc = !this.isDesc;
    this.column = property;
    this.direction = this.isDesc ? 1 : -1;
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
      if (this.showItemAdd) {
        if (event.altKey && (event.key === 'x' || event.key === 'X')) {
          event.preventDefault();
          this.showItemAdd = !this.showItemAdd;
        } else if (event.altKey && (event.key === 'c' || event.key === 'C')) {
          event.preventDefault();
          this.clearIntent();
        } else if (event.altKey && (event.key === 's' || event.key === 'S')) {
          event.preventDefault();
          this.tosaveConfirmation();
        }
      }
      if (event.altKey && (event.key === 'a' || event.key === 'A')) {
        event.preventDefault();
        document.getElementById('setName')?.focus();
      }
      if (event.altKey && (event.key === 'z' || event.key === 'Z')) {
        event.preventDefault();
        document.getElementById('icode')?.focus();
      }
      if (event.altKey && (event.key === 'v' || event.key === 'V')) {
        event.preventDefault();
        this.toggleform();
      }

      if (this.individuals.length > 0) {
        if (event.key === 'ArrowDown') {
          event.preventDefault();
          const tbody:any = document.querySelectorAll('tbody tr');

          if (this.selectedRowIndex < this.individuals.length - 1) {
            this.selectedRowIndex += 1;

            tbody[this.selectedRowIndex]?.focus();
          }
        }

        if (event.key === 'ArrowUp') {
          event.preventDefault();
          const tbody:any = document.querySelectorAll('tbody tr');

          if (this.selectedRowIndex > 0) {
            this.selectedRowIndex -= 1;
            tbody[this.selectedRowIndex]?.focus();
          }
        }
      }
    }));
  }
}
