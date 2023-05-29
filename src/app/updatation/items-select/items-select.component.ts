/* eslint-disable import/order */
/* eslint-disable class-methods-use-this */
/* eslint-disable max-len */
/* eslint-disable array-callback-return */
/* eslint-disable no-plusplus */
/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import {
  Component, OnInit, OnDestroy, Input, Output, EventEmitter,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { InventoryService } from '../services/inventory.service';
import { Globals } from 'src/app/globals';
import { debounceTime } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { FormControl } from '@angular/forms';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-items-select',
  templateUrl: './items-select.component.html',
  styleUrls: ['./items-select.component.css'],
})
export class ItemsSelectComponent implements OnInit, OnDestroy {
  @Input() Cname: any;

  @Output() dataEvent = new EventEmitter();

  constructor(public dialog: MatDialog, private inventryService: InventoryService, private globals: Globals) {
    this.fromBrcode = this.globals.gBrcodeString;
    this.inventry.TerCode = this.globals.gTerCode;
    this.fromUsr = this.globals.gUsrid;
    this.inventryService.apiUrl = this.globals.gApiserver;

    this.subs.add(this.searchItem.valueChanges.pipe(debounceTime(600)).subscribe((myvardatas) => {
      this.inventry.ReqMain = 'ItemSearch';
      this.inventry.var3 = myvardatas;
      this.inventry.phyqty = this.globals.gmainMenuSelected;
      this.subs.add(this.inventryService.getReport(this.inventry).subscribe((data) => {
        this.items = data;
      }, (err) => Swal.fire({ text: 'Server response Error ..' })));
    }));
  }

  progressval = '';

 fromUsr = '';

 fromBrcode = '';

 index: number;

  searchItem = new FormControl();

  private subs = new SubSink();

  inventry = {
    ReqMain: '0',
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

  isSearch = true;

 individuals = [];

 items = [];

  qty: string;

 iname: string;

 itemUom: string;

 itemCode: string;

 ngOnInit() {
   this.selectFocus('icode');
 }

 ngOnDestroy() {
   this.subs.unsubscribe();
 }

 openSearch() {
   if (this.isSearch) {
     this.isSearch = false;
     setTimeout(() => { this.selectFocus('searchitem'); }, 200);
   } else {
     this.isSearch = true;
   }
 }

 getSelectedIcode(event) {
   this.iname = event;
   this.itemCode = this.items.find((x) => x.iname === event).icode;
   this.isSearch = true;
   this.getItem('ITEM_NAME_SEARCH');
 }

 getItem(option) {
   let details = [];
   this.progressval = 'indeterminate';
   this.inventry.ReqMain = 'GetItemDetailsCode';
   this.inventry.icode = this.itemCode;
   this.inventry.phyqty = this.globals.gmainMenuSelected;
   this.subs.add(this.inventryService.getReport(this.inventry).subscribe((result) => {
     this.progressval = '';
     details = result;
     if (details[0].result === 'OK') {
       this.iname = details[0].iname;
       this.itemUom = details[0].mment;
       this.itemCode = details[0].icode;
       if (option === 'ITEM_NAME_SEARCH') {
         this.isSearch = true;
         this.searchItem.reset();
       }
       this.selectFocus('qty');
     } else {
       Swal.fire({ text: 'Invalid Item ' });
       this.selectFocus('icode');
     }
   }, (err) => {
     this.progressval = '';
     Swal.fire({ text: 'Server Response Failed ..' });
   }));
 }

 getItemByCode(event) {
   if (event.key === 'Enter') {
     if (this.itemCode === undefined || this.itemCode === null || this.itemCode === '') {
       Swal.fire({ text: 'Enter the Item Code' });
       this.selectFocus('icode');
     } else {
       this.getItem('ITEM_CODE_SEARCH');
     }
   }
 }

 senddata() {
   if (this.itemCode === undefined || this.itemCode === null || this.itemCode === '') {
     Swal.fire({ text: 'Enter the Item Code' });
     this.selectFocus('icode');
   } else if (this.qty === undefined || this.qty === null || Number(this.qty) === 0) {
     Swal.fire({ text: 'Enter the Item quantity' });
     this.selectFocus('qty');
   } else if (this.itemUom === undefined || this.itemUom === null || this.itemUom === '') {
     Swal.fire({ text: 'Enter the Item Code get uom' });
     this.selectFocus('icode');
   } else if (this.iname === undefined || this.iname === null || this.iname === '') {
     Swal.fire({ text: 'Enter the Item Code get item name' });
     this.selectFocus('icode');
   } else {
     const data = {
       icode: this.itemCode,
       iname: this.iname,
       iqty: this.qty,
       uom: this.itemUom,
     };
     this.dataEvent.emit(data);
     this.clearForm();
     this.selectFocus('icode');
   }
 }

 enterqty(event) {
   if (event.keyCode === 13 || event.Key === 'Enter') {
     if (this.Cname === 'Add') {
       document.getElementById('additem').click();
     }
   }
 }

 changeValue(event) {
   if (event.keyCode >= 48 && event.keyCode <= 57) {
     return true;
   } if (event.keyCode === 46 && this.itemUom !== 'NOS') {
     if (this.qty.indexOf('.') > -1) {
       return false;
     }
     return true;
   }
   return false;
 }

 selectFocus(option) {
   document.getElementById(option).focus();
 }

 clearForm() {
   this.qty = undefined; this.iname = undefined; this.itemUom = undefined; this.itemCode = undefined;
   this.isSearch = true;
 }
}
