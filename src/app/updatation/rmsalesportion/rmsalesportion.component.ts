/* eslint-disable consistent-return */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-empty */
/* eslint-disable prefer-const */
/* eslint-disable no-param-reassign */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */
/* eslint-disable import/no-unresolved */
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime } from 'rxjs/operators';
import { Globals } from 'src/app/globals';
import { CommonService } from 'src/app/services/common.service';
import { SubSink } from 'subsink';
import Swal from 'sweetalert2';
import * as $ from 'jQuery';
import * as bootstrap from 'bootstrap';
import { InventoryService } from '../services/inventory.service';

// declare let $: any;
// declare let jQuery: any;

@Component({
  selector: 'app-rmsalesportion',
  templateUrl: './rmsalesportion.component.html',
  styleUrls: ['./rmsalesportion.component.css'],
})
export class RmsalesportionComponent implements OnInit {
  constructor(private router: Router, private globals: Globals, private service: InventoryService, private commonservice: CommonService) {
    this.service.apiUrl = this.globals.gApiserver;

    this.subs.add(this.searchItem.valueChanges.pipe(debounceTime(600)).subscribe((myvardatas) => {
      this.loadDatas('RMProductNameSearch', this.globals.gTerCode, myvardatas, 'Y', '0');
    }));
    this.subs.add(this.searchRecipe.valueChanges.pipe(debounceTime(600)).subscribe((myvardatas) => {
      this.loadDatas('RMRecipeProductNameSearch', this.globals.gTerCode, myvardatas, '', '0');
    }));
    this.subs.add(this.addItemsearch.valueChanges.pipe(debounceTime(600)).subscribe((myvardatas) => {
      this.additemloadDatas('RMRecipeProductNameSearch', this.globals.gTerCode, myvardatas, '', '0');
    }));
  }

  selection = 'RMSAVE'; // BULKUPDATE //SWAP

  progressval = '';

 subs = new SubSink();

  searchItem = new FormControl();

 searchRecipe = new FormControl();

  individuals: any = [];

 items: any = [];

 catList: any = [];

  qty: any;

 iname: any;

 itemUom: any;

 itemCode: any;

  icat = 'select';

 Permission: any;

 RecipeAllow: any;

 rate: any;

  rqty: any;

 riname: any;

 ritemUom: any;

 ritemCode: any;

  rrate: any;

 rvalue: any;

 total = '';

 different = '';

 usr = '';

 updDate: any;

 PerorAmt = '';

  addCost: any;

 actCost: any;

 totCost: any;

 costUom: any;

 addAmt: any;

  rset = '';

 rbundle = '';

  recipItems: any = [];

 listlen = 0;

  addIname: any;

 additemcode: any;

 addiUom: any;

 addItems: any = [];

  addItemsearch = new FormControl();

 isAdditem = false;

 ngOnInit(): void {
   this.loadDatas('RMCatView', '0', '0', '0', '0');
 }

 loadDatas(main: any, extra1: any, extra3: any, extra4: any, extra5: any) {
   this.subs.add(this.service.getCusReport({
     reqMainreq: main,
     Usr: this.globals.gUsrid,
     brcode: this.globals.gBrcode,
     var1: extra1,
     var2: '0',
     var3: extra3,
     var4: extra4,
     var5: extra5,
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
     if (data.length > 0) {
       if (main === 'RMProductNameSearch') { this.items = data; }
       if (main === 'RMCatView') { this.catList = data; }
       if (main === 'RMProductCodeSearch') {
         this.itemCode = data[0].icode; this.iname = data[0].iname;
         this.itemUom = data[0].mment; this.Permission = data[0].Permission;
         this.rate = data[0].irate; this.RecipeAllow = data[0].RecipeAllow;
         if (this.selection === 'RMSAVE') {
           this.loadDatas('RMRecipeItemsView', this.globals.gTerCode, this.itemCode, 'Y', this.globals.Pwrusr);
         } else {
           this.loadDatas('RMItemSwapView', this.globals.gTerCode, this.itemCode, '0', '0');
         }
       }
       if (main === 'RMRecipeItemsView') {
         this.individuals = data;
         this.individuals.forEach((element:any) => {
           element.QtyEdit = false;
         });
         this.listlen = this.individuals.length;
         this.usr = this.individuals[0].Usr; this.updDate = this.individuals[0].doe;
         this.qty = data[0].Output; this.addCost = data[0].AddCost; this.PerorAmt = data[0].PerorAmt;
         this.getTotalDiff();
       }
       if (main === 'RMRecipeProductNameSearch') {
         this.recipItems = data;
       }
       if (main === 'RMRecipeProductCodeSearch') {
         this.setreceipeData(data[0]);
       }

       if (main === 'RMRecipeForView' || main === 'RMItemSwapView') {
         this.individuals = data; this.listlen = this.individuals.length;
       }
     }
   }, (err) => { this.progressval = ''; }));
 }

 additemloadDatas(main: any, extra1: any, extra3: any, extra4: any, extra5: any) {
   this.subs.add(this.service.getCusReport({
     reqMainreq: main,
     Usr: this.globals.gUsrid,
     brcode: this.globals.gBrcode,
     var1: extra1,
     var2: '0',
     var3: extra3,
     var4: extra4,
     var5: extra5,
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
     if (data.length > 0) {
       if (main === 'RMRecipeProductNameSearch') {
         this.addItems = data;
       }
       if (main === 'RMRecipeProductCodeSearch') {
         this.additemcode = data[0].icode;
         this.addIname = data[0].iname;
         this.addiUom = data[0].mment;
       }
     }
   }, (err) => { this.progressval = ''; }));
 }

 checkBulkOptions() {
   if (this.ritemCode === '' || this.ritemCode === null || this.ritemCode === undefined) {
     Swal.fire({ text: 'Enter Item code..' });
   } else if (this.riname === '' || this.riname === null || this.riname === undefined) {
     Swal.fire({ text: 'Enter Item code..' });
   } else if (this.additemcode === '' || this.additemcode === null || this.additemcode === undefined) {
     Swal.fire({ text: 'Enter Add Item code..' });
   } else if (this.addIname === '' || this.addIname === null || this.addIname === undefined) {
     Swal.fire({ text: 'Enter Add Item code..' });
   } else {
     this.confirmation();
   }
 }

 getBulkUpdate() {
   this.progressval = 'indeterminate';
   this.subs.add(this.service.getCusReport({
     reqMainreq: 'RMRecipeChangeItemForAllSets',
     Usr: this.globals.gUsrid,
     brcode: this.globals.gBrcode,
     var1: '',
     var2: '0',
     var3: this.ritemCode,
     var4: '',
     var5: '',
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
     var17: this.additemcode,
     var18: this.addIname,
     var19: this.addiUom,
     var20: '0',
   }).subscribe((result) => {
     this.progressval = '';
     const data = result;
     if (data.length > 0) {
       if (data[0].StatusRes === 'Success') {
         Swal.fire({ text: 'Updation Successfully...' });
         this.individuals = []; this.listlen = 0; this.clearForm();
       } else {
         Swal.fire({ text: data[0].StatusRes });
       }
     } else {
       Swal.fire({ text: 'Updation faild...' });
     }
   }, (err) => { this.progressval = ''; }));
 }

 setreceipeData(data: any) {
   this.ritemCode = data.icode;
   this.riname = data.iname;
   this.ritemUom = data.mment;
   this.rrate = data.irate;
   if (this.selection === 'BULKUPDATE') {
     this.loadDatas('RMRecipeForView', this.globals.gTerCode, this.ritemCode, '0', '0');
   }
   if (this.selection === 'RMSAVE') {
     this.selectFocus('qty0');
   }
 }

 getSearch() {
   this.searchItem.reset();
   //  $('#searchmodal').modal('show');
   const testModal = new bootstrap.Modal(document.getElementById('searchmodal'), {});
   testModal?.show();
 }

 getItemDetails() {
   if (this.itemCode === '' || this.itemCode === undefined || this.itemCode === null) {
     Swal.fire({ text: 'Enter Item Code' });
   } else {
     this.progressval = 'indeterminate';
     this.individuals = []; this.listlen = 0;
     this.loadDatas('RMProductCodeSearch', this.globals.gTerCode, this.itemCode, 'Y', this.globals.Pwrusr);
   }
 }

 getSelectedIcode(event: any, item) {
   if (event.isUserInput && event.source.selected) {
     setTimeout(() => {
       this.itemCode = item.icode;
       this.iname = item.iname;
       (<HTMLInputElement>document.getElementById('clsBtn3')).click();
       this.getItemDetails();
     }, 100);
   }
   //  this.itemCode = this.items.find((x: any) => x.iname === event)?.icode;
 }

 addConditionCheck() {
   if (this.globals.Pwrusr === 'ADMIN' || this.globals.Pwrusr === 'EMPOWERED USER') {
     this.addNewItem();
   } else if (this.RecipeAllow === 'ALLOW' && this.Permission === 'Y') {
     this.addNewItem();
   } else {
     this.permissionError();
   }
 }

 addNewItem() {
   if (this.itemCode === undefined || this.itemCode === null || this.itemCode === '') {
     Swal.fire({ text: 'Enter the Item Code' });
     this.selectFocus('icode');
   } else if (this.iname === undefined || this.iname === null || this.iname === '') {
     Swal.fire({ text: 'Enter the Item Code get item name' });
     this.selectFocus('icode');
   } else {
     this.clearTable();
     //  $('#exampleModal').modal('show');
     const testModal = new bootstrap.Modal(document.getElementById('exampleModal'), {});
     testModal?.show();
   }
 }

 addNewSwapmodal() {
   if (this.itemCode === undefined || this.itemCode === null || this.itemCode === '') {
     Swal.fire({ text: 'Enter the Item Code...' });
     this.selectFocus('icode');
   } else if (this.iname === undefined || this.iname === null || this.iname === '') {
     Swal.fire({ text: 'Enter the Item Code ..' });
     this.selectFocus('icode');
   } else {
     this.clearTable();
     //  $('#exampleModalnew').modal('show');
     const testModal = new bootstrap.Modal(document.getElementById('exampleModalnew'), {});
     testModal?.show();
   }
 }

 addSwapItems() {
   if (this.ritemCode === undefined || this.ritemCode === null || this.ritemCode === '') {
     Swal.fire({ text: 'Enter the Item Code...' });
   } else if (this.riname === undefined || this.riname === null || this.riname === '') {
     Swal.fire({ text: 'Enter the Item Code...' });
   } else {
     this.individuals.push({ SubIcode: this.ritemCode, SubIName: this.riname });
     this.listlen = this.individuals.length;
     this.clearTable();
   }
 }

 removeSwapItem(i: any) {
   this.individuals.splice(i, 1);
   this.listlen = this.individuals.length;
 }

 checkSwapOptions() {
   if (this.listlen > 0) {
     this.confirmation();
   } else {
     Swal.fire({ text: 'Select Item Details..' });
   }
 }

 saveSwapitems() {
   const items : any = [];
   this.individuals.forEach((e: any) => {
     items.push({ ricode: e.SubIcode, riname: e.SubIName });
   });
   const json = {
     ReqMain: 'S@/RMItemSwapSave/E@',
     Usr: this.globals.gUsrid,
     brcode: this.globals.gBrcode,
     icode: this.itemCode,
     iname: this.iname,
     ItemSwap: items,
   };
   this.progressval = 'indeterminate';
   this.subs.add(this.service.getJsonPayloadRjs(json).subscribe((result) => {
     this.progressval = '';
     const data = result;
     if (data.length > 0) {
       if (data[0].Result === 'Success') {
         Swal.fire({ text: 'Update successfully...' });
         this.clearForm();
       } else {
         Swal.fire({ text: data[0].Result });
       }
     } else {
       Swal.fire({ text: 'Update failed...' });
     }
   }, (err) => { this.progressval = ''; }));
 }

 // Add Raw material items
 getSelectedRIcode(event: any) {
   this.riname = event;
   const i = this.recipItems.findIndex((x: any) => x.iname === event);
   this.ritemSearch = false;
   this.setreceipeData(this.recipItems[i]);
 }

 getItemByCode(event: any, option: any) {
   if (event.key === 'Enter') {
     if (option === 'icode') {
       this.getItemDetails();
     } else if (option === 'ricode') {
       this.getReceipeDetails();
     } else if (option === 'RitemQty') {
       this.rvalue = Number(this.rate) + Number(this.rqty);
       this.selectFocus('setind');
     } else if (option === 'addcost') {
       this.getTotalDiff();
     } else if (option === 'addicode') {
       this.getaddReceipeDetails();
     }
   }
 }

 getReceipeDetails() {
   if (this.ritemCode === '' || this.ritemCode === undefined || this.ritemCode === null) {
     Swal.fire({ text: 'Enter item code..' });
   } else {
     this.progressval = 'indeterminate';
     this.loadDatas('RMRecipeProductCodeSearch', this.globals.gTerCode, this.ritemCode, '0', '0');
   }
 }

  ritemSearch = false;

  selectSearchTwo() {
    if (this.ritemSearch) {
      this.ritemSearch = false;
    } else {
      this.searchRecipe.reset();
      this.ritemSearch = true;
    }
  }

  receipyAdditem() {
    if (this.ritemCode === undefined || this.ritemCode === null || this.ritemCode === '') {
      Swal.fire({ text: 'Enter the Item Code' });
    } else if (this.rqty === undefined || this.rqty === null || Number(this.rqty) === 0) {
      Swal.fire({ text: 'Enter the Item quantity' });
    } else {
      this.pushToItem();
    }
  }

  pushToItem() {
    let bundval = ''; let setval = '';
    if (this.rset === 'Y') { setval = 'Set'; }
    if (this.rbundle === 'Y') { bundval = 'Bundle'; }
    const index = this.individuals.findIndex((x: any) => x.ricode === this.ritemCode);
    if (index === -1) {
      this.individuals.push({
        Bundleedit: true,
        Primarytedit: true,
        SetInd: setval,
        Setedit: true,
        VarPm: '',
        ricode: this.ritemCode,
        riname: this.riname,
        rirate: this.rrate,
        rivalue: this.rvalue,
        rqty: this.rqty,
        ruom: this.ritemUom,
        vbundle: bundval,
        QtyEdit: false,
      });
      this.listlen = this.individuals.length;
      this.clearTable();
      this.selectFocus('Code0');
      this.getTotalDiff();
    } else {
      Swal.fire({ text: 'Item Already exist' });
    }
  }

  changeRdiobtn(data: any) {
    // console.log(data);
    this.PerorAmt = data.value;
    this.getTotalDiff();
  }

  getTotalDiff() {
    this.actCost = 0;
    this.individuals.forEach((e: any) => { this.actCost += e.rivalue; });
    this.actCost = Number(this.actCost.toFixed(2));

    if (this.PerorAmt === '%') {
      this.addAmt = (this.actCost * this.addCost) / 100;
    } else {
      this.addAmt = this.addCost;
    }

    let totcos: any;
    totcos = Number(this.actCost) + Number(this.addAmt);
    this.totCost = Number(totcos.toFixed(2));

    const cosmment = this.totCost / Number(this.qty);
    this.costUom = Number(cosmment.toFixed(2));
    let addamt: any; addamt = this.addAmt;
    this.addAmt = Number(addamt.toFixed(2));
  }

  removeItem(i: any) {
    this.commonservice.taskConfirmation('Are you sure to Delete ?', '', true, 'Delete', '').then((res) => {
      if (res.isConfirmed) {
        if (this.globals.Pwrusr === 'ADMIN' || this.globals.Pwrusr === 'EMPOWERED USER') {
          this.individuals.splice(i, 1);
          this.listlen = this.individuals.length;
        } else if (this.RecipeAllow === 'ALLOW' && this.Permission === 'Y') {
          this.individuals.splice(i, 1);
          this.listlen = this.individuals.length;
        } else {
          this.permissionError();
        }
      }
    });
  }

  valueClaculate(i:number) {
    this.individuals[i].rivalue = (Number(this.individuals[i].rqty) * this.individuals[i].rirate).toFixed(2);
  }

  setYN = '';

 primaryYN = '';

 bundleYN = '';

 editIndex: any;

 changeEdit(i: any, option: any) {
   if (option === 'Qty') {
     this.individuals[i].QtyEdit = true;
   }
   if (option === 'set') {
     if (this.individuals[i].Setedit) {
       this.setYN = ''; this.individuals[i].Setedit = false; setTimeout(() => {
         // document.getElementById('edit').focus() ;
         this.selectFocus('edit');
       }, 117);
     }
   }
   if (option === 'bundle') {
     if (this.individuals[i].Bundleedit) {
       this.bundleYN = ''; this.individuals[i].Bundleedit = false; setTimeout(() => {
         // document.getElementById('edit3').focus()
         this.selectFocus('edit3');
       }, 117);
     }
   }
   if (option === 'primary') {
     if (this.individuals[i].Primarytedit) {
       this.primaryYN = ''; this.individuals[i].Primarytedit = false; setTimeout(() => {
         // document.getElementById('edit2').focus();
         this.selectFocus('edit2');
       }, 117);
     }
   }
   this.editIndex = i;
 }

 onKeydownupdate(event: any, option: any, i: any) {
   if (event.key === 'Enter') {
     if (option === 'set') { this.updateSet(i); }
     if (option === 'bundle') { this.updateBundle(i); }
     if (option === 'primary') { this.updateprimary(i); }
   }
 }

 changeValueNumericList(event: any, id: any): any {
   if (event.keyCode >= 48 && event.keyCode <= 57) {
     return true;
   } if (event.keyCode === 46) {
     if (this.individuals[id].rqty.indexOf('.') > -1) {
       return false;
     }
     return true;
   }
   return false;
 }

 updateQty(i:any) {
   this.individuals[i].QtyEdit = false;
 }

 updateEdit(option: any) {
   if (option === 'set') { this.updateSet(this.editIndex); }
   if (option === 'bundle') { this.updateBundle(this.editIndex); }
   if (option === 'primary') { this.updateprimary(this.editIndex); }
 }

 updateSet(i: any) {
   this.individuals[i].Setedit = true;
   if (this.setYN === 'Y' || this.setYN === 'y') {
     this.individuals[i].SetInd = 'Set';
   }

   if (this.setYN === 'N' || this.setYN === 'n') {
     this.individuals[i].SetInd = '';
   }
 }

 updateBundle(i: any) {
   this.individuals[i].Bundleedit = true;
   if (this.bundleYN === 'Y' || this.bundleYN === 'y') {
     this.individuals[i].vbundle = 'Bundle';
   }
   if (this.bundleYN === 'N' || this.bundleYN === 'n') {
     this.individuals[i].vbundle = '';
   }
 }

 updateprimary(i: any) {
   this.individuals[i].Primarytedit = true;
   if (this.primaryYN === 'Y' || this.primaryYN === 'y') {
     this.individuals.forEach((e: any) => { e.VarPm = ''; });
     this.individuals[i].VarPm = 'Primary';
   }
 }

 checkPrimaryandSet() {
   if (this.listlen > 0) {
     const index = this.individuals.findIndex((x : any) => x.SetInd === 'Set');
     if (index !== -1) {
       const index2 = this.individuals.findIndex((x: any) => x.VarPm === 'Primary');
       if (index2 !== -1) {
         this.confirmation();
       } else {
         Swal.fire({ text: 'Select any one item is Primary' });
       }
     } else {
       Swal.fire({ text: 'Select any one item is Set' });
     }
   } else {
     Swal.fire({ text: 'Select Item & Rawmaterial items' });
   }
 }

 rmsetPermission() {
   if (this.globals.Pwrusr === 'ADMIN' || this.globals.Pwrusr === 'EMPOWERED USER') {
     this.checkPrimaryandSet();
   } else if (this.RecipeAllow === 'ALLOW' && this.Permission === 'Y') {
     this.checkPrimaryandSet();
   } else {
     this.permissionError();
   }
 }

 confirmation() {
   Swal.fire({
     text: 'Are you sure ?',
     showCancelButton: true,
     confirmButtonText: 'Yes',
     cancelButtonText: 'No',
     confirmButtonColor: '#4caf50',
     cancelButtonColor: '#ff80ab',
   }).then((result) => {
     if (result.value) {
       if (this.selection === 'RMSAVE') {
         this.saveRmData();
       }
       if (this.selection === 'SWAP') {
         this.saveSwapitems();
       }
       if (this.selection === 'BULKUPDATE') {
         this.getBulkUpdate();
       }
     } else if (result.dismiss === Swal.DismissReason.cancel) { }
   });
 }

 saveRmData() {
   const items: any = [];
   this.individuals.forEach((e: any) => {
     let vpri = ''; let vset = ''; let vbund = '';
     if (e.VarPm === 'Primary') { vpri = 'P'; } else { vpri = 'S'; }
     if (e.SetInd === 'Set') { vset = 'Set'; } else { vset = 'Ind'; }
     if (e.vbundle === 'Bundle') { vbund = 'Bundle'; } else { vbund = 'NB'; }
     items.push({
       ricode: e.ricode, riname: e.riname, riqty: e.rqty, rirate: e.rirate, rmment: e.ruom, PriMOrSec: vpri, SetOrInd: vset, Bundle: vbund,
     });
   });
   const json = {
     ReqMain: 'S@/RMSetPreparationSave/E@',
     Usr: this.globals.gUsrid,
     brcode: this.globals.gBrcode,
     PerorAmt: this.PerorAmt,
     AddCost: this.addCost,
     icode: this.itemCode,
     iname: this.iname,
     output: this.qty,
     mment: this.itemUom,
     receipeR: items,
   };
   this.progressval = 'indeterminate';

   this.subs.add(this.service.getJsonPayloadRjs(json).subscribe((result) => {
     this.progressval = '';
     const data = result;
     if (data.length > 0) {
       if (data[0].Result === 'Success') {
         Swal.fire({ text: 'Update successfully...' });
         this.clearForm();
       } else {
         Swal.fire({ text: data[0].Result });
       }
     } else {
       Swal.fire({ text: 'Update failed...' });
     }
   }, (err) => { this.progressval = ''; }));
 }

 openBulkUpdate() {
   this.clearForm();
   if (this.globals.Pwrusr === 'ADMIN' || this.globals.Pwrusr === 'LEVEL1' || this.globals.Pwrusr === 'EMPOWERED USER') {
     this.selection = 'BULKUPDATE';
   } else {
     Swal.fire({ text: 'Permission Denied...' });
   }
 }

 addselectSearchTwo() {
   if (this.isAdditem) {
     this.isAdditem = false;
   } else {
     this.addItemsearch.reset();
     this.isAdditem = true;
   }
 }

 getaddReceipeDetails() {
   if (this.additemcode === '' || this.additemcode === undefined || this.additemcode === null) {
     Swal.fire({ text: 'Enter item code..' });
   } else {
     this.progressval = 'indeterminate';
     this.additemloadDatas('RMRecipeProductCodeSearch', this.globals.gTerCode, this.additemcode, '0', '0');
   }
 }

 getSelectedaddIcode(event: any) {
   this.addIname = event;
   this.isAdditem = false;
   this.addiUom = this.addItems.find((x: any) => x.iname === event).mment;
   this.additemcode = this.addItems.find((x: any) => x.iname === this.addIname).icode;
   this.addiUom = this.addItems.find((x: any) => x.iname === this.addIname).mment;
 }

 openSwap() {
   this.clearForm();
   if (this.globals.Pwrusr === 'ADMIN' || this.globals.Pwrusr === 'LEVEL1' || this.globals.Pwrusr === 'EMPOWERED USER') {
     this.selection = 'SWAP';
   } else {
     Swal.fire({ text: 'Permission Denied...' });
   }
 }

 permissionError() {
   if (this.Permission === 'Y') {
     Swal.fire({ text: 'Do not allow this item' });
   } else {
     Swal.fire({ text: 'Sorry..You have no rights...' });
   }
 }

 changeYNEvent(event: any) {
   if (event.keyCode === 121 || event.keyCode === 110) {
     return true;
   }
   return false;
 }

 changeValue(event: any, option: any) {
   if (event.keyCode >= 48 && event.keyCode <= 57) {
     return true;
   } if (event.keyCode === 46) {
     if (option === 'itemQty') {
       return this.itemqtyCheck();
     } if (option === 'RitemQty') {
       return this.receipItemqtycheck();
     } if (option === 'Editqty') {
       this.editqtyCheck();
     } else if (option === 'addcost') {
       const str = (this.addCost).toString();
       if (str.indexOf('.') > -1) { return false; } return true;
     } else {
       return false;
     }
   } else {
     return false;
   }
 }

 editqtyCheck(): any {
   const number = (<HTMLInputElement>document.getElementById('edit')).value;
   if (number.indexOf('.') > -1) { return false; } return true;
 }

 itemqtyCheck(): any {
   if (this.qty.indexOf('.') > -1) { return false; } return true;
 }

 receipItemqtycheck() {
   if (this.rqty.indexOf('.') > -1) { return false; } return true;
 }

 selectFocus(option: any) {
   (<HTMLInputElement>document.getElementById(option)).focus();
 }

  isReceipe = false;

  clearForm() {
    this.usr = ''; this.updDate = ''; this.Permission = '';
    this.qty = undefined; this.iname = undefined; this.itemUom = undefined; this.itemCode = undefined;
    this.items = []; this.rate = undefined; this.isReceipe = false; this.RecipeAllow = ''; this.catList = [];
    this.editIndex = undefined; this.individuals = []; this.listlen = 0; this.total = ''; this.different = ''; this.usr = ''; this.updDate = '';
    this.PerorAmt = ''; this.addCost = undefined; this.actCost = undefined; this.totCost = undefined; this.costUom = undefined; this.addAmt = undefined;
    this.addIname = ''; this.additemcode = ''; this.addiUom = ''; this.addItems = [];
    this.addItemsearch.reset(); this.isAdditem = false;
    this.clearTable();
  }

  clearTable() {
    this.recipItems = [];
    this.rqty = undefined; this.riname = undefined; this.ritemUom = undefined; this.ritemCode = undefined;
    this.rrate = undefined; this.rvalue = undefined;
    this.searchRecipe.reset(); this.ritemSearch = false; this.rset = ''; this.rbundle = '';
  }

  public restrictNumeric(e: any) {
    let input;
    if (e.metaKey || e.ctrlKey) {
      return true;
    }
    if (e.which === 32) {
      return false;
    }
    if (e.which === 0) {
      return true;
    }
    if (e.which < 33) {
      return true;
    }
    input = String.fromCharCode(e.which);
    return !!/[\d\s]/.test(input);
  }

  backNavigation() {
    this.clearForm();
    if (this.selection === 'BULKUPDATE') {
      this.selection = 'RMSAVE';
    } else if (this.selection === 'SWAP') {
      this.selection = 'RMSAVE';
    } else {
      this.router.navigate(['/dashboard']);
    }
  }

  homeNavigate() {
    this.globals.SelectDashboard = 'GROUPLIST';
    this.router.navigate(['/dashboard']);
  }
}
