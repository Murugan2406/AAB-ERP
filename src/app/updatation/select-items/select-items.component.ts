/* eslint-disable eqeqeq */
/* eslint-disable no-plusplus */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-use-before-define */
/* eslint-disable import/order */
/* eslint-disable max-classes-per-file */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-empty-function */
/* eslint-disable no-useless-constructor */
/* eslint-disable import/prefer-default-export */
import {
  Component, OnInit, OnDestroy, Input, HostListener,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { InventoryService } from '../services/inventory.service';
import { Router } from '@angular/router';
import { Globals } from 'src/app/globals';
import { debounceTime } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { FormControl } from '@angular/forms';
import { SubSink } from 'subsink';
import { fromEvent } from 'rxjs';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-select-items',
  templateUrl: './select-items.component.html',
  styleUrls: ['./select-items.component.css'],
})

export class SelectItemsComponent implements OnInit, OnDestroy {
  isDesc: any;

  column: any;

  direction: number;

  searchTemp = ''

  @Input() gisItems:boolean = false;

  @Input() gisOption:String= '';

  constructor(
public dialog: MatDialog,
private inventryService: InventoryService,
    private globals: Globals,
    private commonservice: CommonService,
  ) {
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

  itemDetail: SelectedItems = new SelectedItems();

  inventry = {
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

  isSearch = true;

 individuals = [];

 items = [];

  qty: any;

 subtotal = '0.00';

 taxAmount = '0.00';

 finalAmount = '0.00';

 ngOnInit() {
   this.individuals = this.globals.issueItems;
   this.getFinalValues();
   this.shortcuts();
 }

 ngOnDestroy() {
   this.subs.unsubscribe();
 }

 @HostListener('paste', ['$event'])
 onPaste($event) {
   $event.preventDefault();
 }

 sorts(property: any) {
   this.isDesc = !this.isDesc;
   this.column = property;
   this.direction = this.isDesc ? 1 : -1;
 }

 openSearch() {
   if (this.isSearch) {
     this.isSearch = false;
     this.searchItem.reset();
     this.items = [];
     setTimeout(() => { this.selectFocus('searchitem'); }, 100);
   } else {
     this.isSearch = true;
   }
 }

 getSelectedIcode(event, item) {
   if (event.source.selected) {
     this.itemDetail.iname = item.iname;
     this.itemDetail.icode = item.icode;
     this.isSearch = true;
     this.getItem('ITEM_NAME_SEARCH');
   }
 }

 checkValidation(option) {
   if (this.itemDetail.icode === undefined || this.itemDetail.icode === null || this.itemDetail.icode === '') {
     Swal.fire({ text: 'Enter the Item code' });
     this.itemDetail.iname = '';
     return;
   }
   if (this.itemDetail.iname === undefined || this.itemDetail.iname === null || this.itemDetail.iname === '') {
     Swal.fire({ text: 'Enter the Item Name' });
     this.itemDetail.iname = '';
     return;
   }

   if (this.qty === undefined || this.qty === null || this.qty === '' || this.qty == 0) {
     this.qty = '';
     Swal.fire({ text: 'Enter the Qty' });
   } else {
     this.getItem(option);
   }
 }

 getItem(option) {
   if (this.itemDetail.icode === undefined || this.itemDetail.icode === null || this.itemDetail.icode === '') {
     Swal.fire({ text: 'Enter the Item Code' });
     this.itemDetail.iname = '';
     return;
   }

   let details = [];
   this.progressval = 'indeterminate';
   this.inventry.ReqMain = 'GetItemDetailsCode';
   this.inventry.icode = this.itemDetail.icode.toString();
   this.inventry.phyqty = this.globals.gmainMenuSelected;
   this.subs.add(this.inventryService.getReport(this.inventry).subscribe((result) => {
     this.progressval = '';
     const uom = this.itemDetail.mment;
     details = result;
     if (details[0].result === 'OK' && !result[0].iname) {
       Swal.fire({ text: 'Invalid Item Code' });
       this.itemDetail.iname = '';
       this.qty = '';
     } else if (details[0].result === 'OK' && result[0].iname) {
       this.itemDetail = details[0];
       if (this.itemDetail.mment !== uom) {
         this.qty = '';
         document.getElementById('qty')?.focus();
         return;
       }
       if (option === 'ITEM_NAME_SEARCH') {
         this.isSearch = true;
         this.searchItem.reset();
       } else if (option === 'tableAdd') {
         this.checkItems();
       }
       this.selectFocus('qty');
     } else {
       Swal.fire({ text: 'Invalid Item Code' });
       this.itemDetail.iname = '';
     }
   }, (err) => {
     this.progressval = '';
     Swal.fire({ text: 'Server Response Failed ..' });
   }));
 }

 getItemByCode(event) {
   if (event.key === 'Enter') {
     if (this.itemDetail.icode === undefined || this.itemDetail.icode === null || this.itemDetail.icode === '') {
       setTimeout(() => { Swal.fire({ text: 'Enter the Item Code' }); }, 100);
       this.itemDetail.iname = '';
     } else {
       this.getItem('ITEM_CODE_SEARCH');
     }
   }
 }

 getEnderQty(event) {
   if (event.key === 'Enter') {
     if (this.qty === null || this.qty === undefined || this.qty === 0) {
       Swal.fire({ text: 'Enter the Quantity' });
     } else {
       if (this.itemDetail.iname === undefined || this.itemDetail.iname === null || this.itemDetail.iname === '') {
         Swal.fire({ text: 'Enter the Item Name' });
         this.itemDetail.iname = '';
         return;
       }

       if (this.qty === undefined || this.qty === null || this.qty === '' || this.qty == 0) {
         this.qty = '';
         Swal.fire({ text: 'Enter the Qty' });

         return;
       }

       this.getItem('tableAdd');
     }
   }
 }

 checkItems() {
   if (this.itemDetail.icode === undefined || this.itemDetail.icode === null) {
     Swal.fire({ text: 'Enter the Item Code' });
     this.itemDetail.iname = '';
   } else if (this.itemDetail.iname === undefined || this.itemDetail.iname === null) {
     Swal.fire({ text: 'Invalid Item Name' });
   } else if (this.qty === null || this.qty === undefined || this.qty <= 0) {
     Swal.fire({ text: 'Enter the Item Qty' });
   } else {
     this.itemDetails();
   }
 }

 itemDetails() {
   this.itemDetail.iqty = this.qty;
   this.itemDetail.value = this.itemDetail.dcrate * this.itemDetail.iqty;
   this.itemDetail.gstValue = this.getTaxCalculate(this.itemDetail.dcrate, this.itemDetail.gst);
   this.itemDetail.cessValue = this.getTaxCalculate(this.itemDetail.dcrate, this.itemDetail.cess);
   this.addItem();
 }

 addItem() {
   if (this.individuals.length === 0) {
     this.individuals.push(this.itemDetail);
     this.pushItems();
   } else {
     const index = this.individuals.findIndex((x) => x.iname === this.itemDetail.iname);
     if (index === -1) {
       this.individuals.push(this.itemDetail);
       this.pushItems();
     } else {
       this.commonservice.openSnackbar('Item Already added', 'OK', 1000);
       setTimeout(() => {
         document.getElementById('icode')?.focus();
       }, 50);
     }
   }
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
   const input = String.fromCharCode(e.which);
   return !!/[\d\s]/.test(input);
 }

 pushItems() {
   this.selectFocus('icode');
   this.getFinalValues();
   this.itemDetail = new SelectedItems();
   this.qty = undefined;
 }

 getTaxCalculate(cost, tax): any {
   let taxAmt = 0;
   taxAmt = (cost * tax) / 100;
   return taxAmt;
 }

 getFinalValues() {
   let totalgst = 0; let totalcess = 0; let subValue = 0; this.subtotal = '0.00';
   this.taxAmount = '0.00'; let finalAmt = 0; let finalTax = 0;
   for (let i = 0; i < this.individuals.length; i++) {
     subValue += this.individuals[i].value;
     totalgst += this.individuals[i].gstValue;
     totalcess += this.individuals[i].cessValue;
   }
   finalTax = totalgst + totalcess;
   finalAmt = subValue + finalTax;
   this.subtotal = Number(subValue).toFixed(2);
   this.taxAmount = Number(finalTax).toFixed(2);
   this.finalAmount = Number(finalAmt).toFixed(2);
   this.progressval = '';
   this.globals.issueItems = this.individuals;
   setTimeout(() => {
     document.getElementById('icode')?.focus();
   }, 100);
 }

 itemRemove(index) {
   this.commonservice.taskConfirmation('Are you sure to Remove ?', '', true, 'Remove', '').then((res) => {
     if (res.isConfirmed) {
       this.individuals.splice(index, 1);
       this.getFinalValues();
     }
   });
 }

 changeValue(event) {
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
     this.hideQty = false;
     this.individuals[i].iqty = 1;
     this.individuals[i].value = this.individuals[i].dcrate * this.individuals[i].iqty;
     this.getFinalValues();
   } else if (event.target.value == 0) {
     this.individuals[i].iqty = 1;
     this.hideQty = false;
     this.individuals[i].value = this.individuals[i].dcrate * this.individuals[i].iqty;
     this.getFinalValues();
   } else {
     this.individuals[i].iqty = event.target.value;
     this.hideQty = false;
     this.individuals[i].value = this.individuals[i].dcrate * this.individuals[i].iqty;
     this.getFinalValues();
   }
 }

 selectFocus(option) {
   document.getElementById(option)?.focus();
 }

 shortcuts() {
   const keydown$ = fromEvent(window, 'keydown');
   this.subs.add(keydown$.subscribe((event: KeyboardEvent) => {
     if (event.altKey && (event.key === 'c' || event.key === 'C')) {
       event.preventDefault();
       this.clear();
     }
   }));
 }

 clear() {
   this.searchItem.setValue('');
   this.itemDetail.icode = '';
   this.itemDetail.iname = '';
   this.itemDetail.mment = '';
   this.qty = null;
   this.individuals = [];
   this.subtotal = '0';
   setTimeout(() => {
     document.getElementById('icode')?.focus();
   }, 100);
 }

 isItems = false

 itemShow() {
   if (this.gisItems && this.gisOption === 'IssueSave') {
     this.isItems = !this.isItems;
     setTimeout(() => {
       document.getElementById('icode')?.focus();
     }, 100);
   } else {
     Swal.fire({ text: 'Please fill all issue Information' });
   }
 }
}

export class SelectedItems {
  result: string;

  icode: string;

  iname: string;

  rate: number;

  iqty: number;

  dcrate: number;

  mment: string;

  gst: number;

  cess: number;

  gstValue: number;

  cessValue: number;

  value: number;
}
