/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-empty */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */
import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime } from 'rxjs/operators';
import { SubSink } from 'subsink';
import Swal from 'sweetalert2';
import { Globals } from 'src/app/globals';
import { InventoryService } from '../updatation/services/inventory.service';

@Component({
  selector: 'app-dcinoutmappingbranch',
  templateUrl: './dcinoutmappingbranch.component.html',
  styleUrls: ['./dcinoutmappingbranch.component.css'],
})
export class DcinoutmappingbranchComponent implements OnInit {
  private subs = new SubSink();

  viewSearch = ''

  constructor(
private router: Router,
private globals: Globals,
    private service: InventoryService,
  ) {
    if (this.globals.gclientServer === 'Client') {
      this.service.apiUrl = this.globals.gServerApiUrl;
    } else {
      this.service.apiUrl = this.globals.gApiserver;
    }

    this.subs.add(this.branchControl.valueChanges.pipe(debounceTime(600)).subscribe((myvardatas) => {
      this.subs.add(this.service.datareqsarn({
        reqMainreq: 'BranchNameSearch',
        Usr: this.globals.gUsrid,
        brcode: '0',
        var1: myvardatas,
        var2: this.loctCode,
        var3: this.trnType,
        var4: '0',
        var5: '0',
        var6: '0',
        var7: '0',
        var8: '0',
        var9: '0',
        var10: '0',
        var11: '0',
        var12: '0',
        var13: '0',
        var14: '0',
        var15: '0',
        var16: '0',
        var17: '0',
        var18: '0',
        var19: '0',
        var20: '0',
      }).subscribe((result) => {
        if (result && result.length > 0) {
          if (result[0].StatusRes === 'Success') {
            this.branches = result;
          } else {
            Swal.fire({ text: result[0].StatusRes });
          }
        } else {
          Swal.fire({ text: 'No record found' });
        }
      }, (err) => {
        this.progressval = '';
        Swal.fire({ text: 'Server Error ..' });
      }));
    }));

    this.subs.add(this.locationControl.valueChanges.pipe(debounceTime(600)).subscribe((myvardatas) => {
      this.subs.add(this.service.datareqsarn({
        reqMainreq: 'DistinctBranch',
        Usr: this.globals.gUsrid,
        brcode: '0',
        var1: myvardatas,
        var2: '0',
        var3: '0',
        var4: '0',
        var5: '0',
        var6: '0',
        var7: '0',
        var8: '0',
        var9: '0',
        var10: '0',
        var11: '0',
        var12: '0',
        var13: '0',
        var14: '0',
        var15: '0',
        var16: '0',
        var17: '0',
        var18: '0',
        var19: '0',
        var20: '0',
      }).subscribe((result) => {
        this.locations = result;
      }, (err) => {
        this.progressval = '';
        Swal.fire({ text: 'Server Error ..' });
      }));
    }));
  }

  branchControl = new FormControl();

 locationControl = new FormControl();

  progressval = '';

  trnTypes = [];

 trnType:string;

  branches = [];

 branch:string;

 brcode:string;

  locations = [];

 location:string;

 loctCode:string;

  List = [];

 listlen=0;

 ngOnInit(): void {
   this.loadOptions('TranactionType');
 }

 changeFromlocation(event) {
   this.location = event;
   this.loctCode = this.locations.find((e) => e.brname === event).Brcode;
   setTimeout(() => {
     document.getElementById('trnType').focus();
   }, 100);
 }

 changeTolocation(event) {
   this.branch = event;
   this.brcode = this.branches.find((e) => e.brname === event).brcode;
   setTimeout(() => {
     document.getElementById('addbtn').focus();
   }, 100);
 }

 loadOptions(option) {
   this.progressval = 'indeterminate';
   this.subs.add(this.service.datareqsarn({
     reqMainreq: option,
     Usr: this.globals.gUsrid,
     brcode: '0',
     var1: '0',
     var2: '0',
     var3: '0',
     var4: '0',
     var5: '0',
     var6: '0',
     var7: '0',
     var8: '0',
     var9: '0',
     var10: '0',
     var11: '0',
     var12: '0',
     var13: '0',
     var14: '0',
     var15: '0',
     var16: '0',
     var17: '0',
     var18: '0',
     var19: '0',
     var20: '0',
   }).subscribe((result) => {
     this.progressval = '';
     const data = result;
     if (data && data.length > 0) {
       if (data[0].StatusRes === 'Success') {
         this.trnTypes = data;
       }
     }
   }, (err) => {
     this.progressval = '';
     Swal.fire({ text: 'Server response failed ..' });
   }));
 }

 onChangeTrntype() { // this.region
   this.progressval = 'indeterminate';
   this.subs.add(this.service.datareqsarn({
     reqMainreq: 'ViewBranches',
     Usr: this.globals.gUsrid,
     brcode: '0',
     var1: this.loctCode,
     var2: this.trnType,
     var3: '0',
     var4: '0',
     var5: '0',
     var6: '0',
     var7: '0',
     var8: '0',
     var9: '0',
     var10: '0',
     var11: '0',
     var12: '0',
     var13: '0',
     var14: '0',
     var15: '0',
     var16: '0',
     var17: '0',
     var18: '0',
     var19: '0',
     var20: '0',
   }).subscribe((result) => {
     this.progressval = '';
     const data = result;
     if (data && data.length > 0) {
       this.listlen = data.length;
       if (data[0].StatusRes === 'Success') {
         this.List = data;
       }
     }
   }, (err) => {
     this.progressval = '';
     Swal.fire({ text: 'Server response failed ..' });
   }));
   setTimeout(() => {
     document.getElementById('fromFacts').focus();
   }, 100);
 }

 checkOptions() {
   if (this.brcode === '' || this.brcode === undefined || this.brcode === null) {
     Swal.fire({ text: 'select branch ' });
   } else if (this.loctCode === '' || this.loctCode === undefined || this.loctCode === null) {
     Swal.fire({ text: 'select location' });
   } else if (this.trnType === '' || this.trnType === undefined || this.trnType === null) {
     Swal.fire({ text: 'select Trn type' });
   } else {
     this.confirmation(this.branch, 'Save', '0');
   }
 }

 confirmation(data, option, data2) {
   Swal.fire({
     title: `Are you sure to ${option} ? ${data}`,
     showCancelButton: true,
     confirmButtonText: 'Yes',
     cancelButtonText: 'No',
     confirmButtonColor: '#4caf50',
     cancelButtonColor: '#ff80ab',
   }).then((result) => {
     if (result.value) {
       if (option === 'Save') {
         this.save();
       } else if (option === 'Delete') {
         this.removeMapitem(data2);
       }
     } else if (result.dismiss === Swal.DismissReason.cancel) {}
   });
 }

 save() {
   this.progressval = 'indeterminate';
   this.subs.add(this.service.datareqsarn({
     reqMainreq: 'BranchSave',
     Usr: this.globals.gUsrid,
     brcode: '0',
     var1: this.trnType,
     var2: this.loctCode,
     var3: this.brcode,
     var4: this.globals.gUsrid,
     var5: this.changeFinalDateFormat(new Date()),
     var6: '0',
     var7: '0',
     var8: '0',
     var9: '0',
     var10: '0',
     var11: '0',
     var12: '0',
     var13: '0',
     var14: '0',
     var15: '0',
     var16: '0',
     var17: '0',
     var18: '0',
     var19: '0',
     var20: '0',
   }).subscribe((result) => {
     this.progressval = '';
     const data = result;
     if (data && data.length > 0) {
       if (data[0].StatusRes === 'Success') {
         Swal.fire({ text: 'Saved successfully' });
         this.onChangeTrntype();
       } else {
         Swal.fire({ text: data[0].StatusRes });
       }
     } else {
       Swal.fire({ text: 'Saved failed ' });
     }
   }, (err) => {
     this.progressval = '';
     Swal.fire({ text: 'Server response failed ..' });
   }));
 }

 removeMapitem(item) {
   this.progressval = 'indeterminate';
   this.subs.add(this.service.datareqsarn({
     reqMainreq: 'BranchDelete',
     Usr: this.globals.gUsrid,
     brcode: '0',
     var1: item.trntype,
     var2: item.Brcode,
     var3: item.tobrcode,
     var4: '0',
     var5: '0',
     var6: '0',
     var7: '0',
     var8: '0',
     var9: '0',
     var10: '0',
     var11: '0',
     var12: '0',
     var13: '0',
     var14: '0',
     var15: '0',
     var16: '0',
     var17: '0',
     var18: '0',
     var19: '0',
     var20: '0',
   }).subscribe((result) => {
     this.progressval = '';
     const data = result;
     if (data && data.length > 0) {
       if (data[0].StatusRes === 'Success') {
         Swal.fire({ text: 'Delete successfully' });
         this.onChangeTrntype();
       } else {
         Swal.fire({ text: data[0].StatusRes });
       }
     } else {
       Swal.fire({ text: 'Delete failed ' });
     }
   }, (err) => {
     this.progressval = '';
     Swal.fire({ text: 'Server response failed ..' });
   }));
 }

 changeFinalDateFormat(startDate): any {
   const format = 'dd-MM-yyyy';
   const locale = 'en-US';
   const date = formatDate(startDate, format, locale);
   return date;
 }

 ngOnDestroy(): void {
   this.subs.unsubscribe();
 }

 backNavigation() {
   this.router.navigate(['/dashboard']);
 }
}
