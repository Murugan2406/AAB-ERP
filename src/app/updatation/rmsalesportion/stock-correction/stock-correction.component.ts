  import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
  import { FormControl } from '@angular/forms';
  import { debounceTime } from 'rxjs/operators';
  import { DataService } from 'src/app/data.service';
  import { Globals } from 'src/app/globals';
  import { Router } from '@angular/router';
  import { ElementRef, Renderer2 } from '@angular/core';
  import { MatDialog } from '@angular/material/dialog';
  import { CommonAuthourityComponent } from 'src/app/common-authourity/common-authourity.component';
  import { SubSink } from 'subsink';
  import Swal from 'sweetalert2';
  import { formatDate } from '@angular/common';

  @Component({
    selector: 'app-stock-correction',
    templateUrl: './stock-correction.component.html',
    styleUrls: ['./stock-correction.component.css']
  })
  export class StockCorrectionComponent implements OnInit, OnDestroy {
    date = new FormControl(new Date()); searchItem = new FormControl();
    public progressval = 'indeterminate'; SelectedMenuTitle ="Physical Stock Correction";
    isSearch=true;Category;select: string;ShowEntry_View = "Entry";
    items=[]; iname; itemCode; qty=''; Rate; Chkuom; StkCurQty_val='';
    Icode; Itemname_val=""; Uom_val=""; CurQty=0;List = [];ViewFlag="FRESH";
    public InameAutoSel; SelectionType="Update"; StkCorrectionType="FromSetIss";
    private subs = new SubSink();
    @ViewChild("txtIcode") txtcode:ElementRef;

    constructor(private router:Router,private service:DataService,private globals :Globals,private el: ElementRef,private renderer: Renderer2,public dialog: MatDialog) {
      this.subs.add(
        this.searchItem.valueChanges.pipe(debounceTime(600)).subscribe(myvardatas => {
          this.InameAutoSel = myvardatas;
          this.subs.add(this.service.datareqrachn({reqMainreq :"ItemSearch",Usr:this.globals.gUsrid, brcode:"0", var1: this.StkCorrectionType,  var2 :"0", var3 :this.InameAutoSel, var4 :"0", var5 :"0",  var6 :"0",  var7 :"0",  var8 :"0",
          var9 :"0",  var10 :"0",  var11 :"0", var12 :"0", var13 :"0", var14:"0",   var15:"0",  var16:"0",  var17:"0",  var18:"0",  var19:"0",  var20:"0"}).subscribe((data) => {
             this.items = data;
          }, (err) => {
            if(err.status == 0){
              Swal.fire({  text: 'Server is in Offline' });
            }
            else{
              Swal.fire({  text: err });
            }
          }));
        })
      );
    }

    ngOnInit() {
      if(this.globals.SelectedRouteName === 'UpdateStock')
      {
         this.SelectionType = "Update";
         this.StkCorrectionType = "FromSetIss";
         this.SelectedMenuTitle ="Physical Stock Correction";
      }
      else if(this.globals.SelectedRouteName === 'UpdateStockAll')
      {
        this.SelectionType = "Update";
        this.StkCorrectionType = "ForAllItems";
        this.SelectedMenuTitle ="Physical Stock Correction(All Items)";
      }
      else if(this.globals.SelectedRouteName === 'StockSendtoApproval')
      {
        this.SelectionType = "SendtoApproval";
        this.StkCorrectionType = "FromPhyCorr";
        this.SelectedMenuTitle ="Current Stock Change Request";
      }

      this.SetDateValue();
      this.isSearch=true;
    }

    ngOnDestroy() {
      this.subs.unsubscribe();
    }

    SetDateValue(){
      this.progressval = 'indeterminate';
      this.subs.add(this.service.datareqrachn({reqMainreq :"GetDate",Usr:this.globals.gUsrid, brcode:"0", var1: this.StkCorrectionType,  var2 :"0", var3 :"0", var4 :"0", var5 :"0",  var6 :"0",  var7 :"0",  var8 :"0",
      var9 :"0",  var10 :"0",  var11 :"0", var12 :"0", var13 :"0", var14:"0",   var15:"0",  var16:"0",  var17:"0",  var18:"0",  var19:"0",  var20:"0"}).subscribe((result) => {
         var data = result;
         this.progressval = '';
         if (data.length > 0 ) {
            if (data[0].StatusRes === 'Success')
            {
              this.date = this.changeDateFormat(data[0].CDate,'dd-MMM-yyyy');
            }
         }
      }, (err) => {
        this.progressval = 'determinate';
        if(err.status == 0){
          Swal.fire({  text: 'Server is in Offline' });
        }
        else{
          Swal.fire({  text: err });
        }
      }));
    }

    changeDateFormat(startDate, format):any {
      var date = new Date(startDate)
      const locale = 'en-US';
      return formatDate(startDate, format, locale);
    }

    getSelectedIcode(event) {
      this.iname = event;
      this.itemCode =  this.items.find(x => x.iname === event).icode;
      this.isSearch = true;
      this.Icode=this.itemCode;
      this.GetItemDet(this.Icode);
    }

    ItemSearchFocusOut()
    {
      this.isSearch=true;
    }

    selectSearch() {
      if(this.isSearch){
        this.isSearch=false;
      } else {
        this.isSearch=true;
      }
    }

    GetItemDet(SelIcode){
      if (SelIcode == undefined){
        return
      }
      this.DisplayItemDetail();
    }

    GetItem(){
      if (this.Icode == undefined){
        return
      }
      this.DisplayItemDetail();
    }

    DisplayItemDetail(){
      this.subs.add(this.service.datareqrachn({reqMainreq :"GetStockDetail",Usr:this.globals.gUsrid, brcode:"0", var1: this.StkCorrectionType,  var2 :this.Icode, var3 :"0", var4 :"0", var5 :"0",  var6 :"0",  var7 :"0",  var8 :"0",
      var9 :"0",  var10 :"0",  var11 :"0", var12 :"0", var13 :"0", var14:"0",   var15:"0",  var16:"0",  var17:"0",  var18:"0",  var19:"0",  var20:"0"}).subscribe((result) => {
         var data = result;
         this.progressval = '';
         if (data.length > 0 ) {
            if (data[0].StatusRes === 'Success')
            {
              this.Itemname_val = data[0].iname;
              this.Uom_val=data[0].mment;
              this.Category =data[0].Cat;
              this.Rate = data[0].purrate;
              this.StkCurQty_val= "";
              this.CurQty=data[0].balqty;
              document.getElementById("txtStock").focus();
            }
            else
            {
              Swal.fire({  text: data[0].StatusRes });
            }
         }
      }, (err) => {
        this.progressval = 'determinate';
        if(err.status == 0){
          Swal.fire({  text: 'Server is in Offline' });
        }
        else{
          Swal.fire({  text: err });
        }
      }));
    }

    UpdateStock(){
      if (this.Icode == undefined){
        return
      }
      if (this.Icode == '' || this.Itemname_val == '' || this.StkCurQty_val == ''){
        return
      }

      if(this.SelectionType === 'Update'){
        this.openKeyDialog('0','0','0','0');
      }
      else if(this.SelectionType === 'SendtoApproval')
      {
        Swal.fire({
          text: 'Are you sure to send for Approval?',
          showCancelButton: true, confirmButtonText: 'Yes', cancelButtonText: 'No',
          confirmButtonColor: '#4caf50', cancelButtonColor: '#ff80ab',
        }).then((result) => {
          if (result.value) {
            this.UpdateStockDetail();
          } else if (result.dismiss === Swal.DismissReason.cancel) { }
        });
      }
    }

    UpdateStockDetail(){
      this.subs.add(this.service.datareqrachn({reqMainreq :"UpdateStockOrSendtoApproval",Usr:this.globals.gUsrid, brcode:this.globals.gBrcodeString, var1: this.SelectionType,  var2 :this.StkCorrectionType, var3 :this.Icode, var4 :this.Itemname_val, var5 :this.StkCurQty_val,  var6 :this.Rate,  var7 :this.Uom_val,  var8 :this.Category,
      var9 :this.date,  var10 :this.CurQty,  var11 :this.globals.gTerCode, var12 :this.globals.usrCaption, var13 :"0", var14:"0",   var15:"0",  var16:"0",  var17:"0",  var18:"0",  var19:"0",  var20:"0"}).subscribe((result) => {
         var data = result;
         this.progressval = '';
         if (data.length > 0 ) {
            if (data[0].StatusRes === 'Success')
            {
              this.Icode = "";
              this.ClearDetAll();
              Swal.fire({  text: data[0].Reason });
              //document.getElementById("txtIcode").focus();
              this.txtcode.nativeElement.focus();
            }
            else{
              Swal.fire({  text: data[0].StatusRes });
            }
         }
      }, (err) => {
        this.progressval = 'determinate';
        if(err.status == 0){
          Swal.fire({  text: 'Server is in Offline' });
        }
        else{
          Swal.fire({  text: err });
        }
      }));
    }

    openKeyDialog(brcode, id, date, option) {
      let dialogData: any;
      const dialogRef = this.dialog.open(CommonAuthourityComponent, {
        width: '450px',
        data: {
          data: id,
          authorityFlg: 'DcDelete_ThumbApproval',
          smsCaption: 'PhyStkCorrection',
          dialogType: 'ALL',
          keyCaption: id
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        dialogData = result;
          if (dialogData === undefined) {
            Swal.fire({  text: ' Key authentication failed..!' });
          } else {
            if (dialogData.event === 'Success') {
                    //Otp or key validation success
                    if(dialogData.approvalAuthname === this.globals.usrCaption){
                      this.UpdateStockDetail();
                    }
                    else{
                      Swal.fire({  text: 'Approval should be on manager user' });
                    }
                    //this.UpdateStockDetail();
            } else if (dialogData.event === 'Failed') {
              Swal.fire({  text: ' Key authentication failed..!' });
            } else { }
          }
      });
    }

    ViewPending(){
        this.progressval = 'indeterminate';this.ViewFlag="ALL";
        this.subs.add(this.service.datareqrachn({reqMainreq :"ViewStockCorrectionApprPending",Usr:this.globals.gUsrid, brcode: this.globals.gBrcode, var1: this.ViewFlag, var2: "0", var3: "0", var4: "0", var5: "0", var6: "0", var7: "0", var8: "0",
        var9 : "0",  var10 :"0",  var11 :"0", var12 :"0", var13 :"0", var14:"0",   var15:"0",  var16:"0",  var17:"0",  var18:"0",  var19:"0",  var20:"0"}).subscribe((result) => {
          var data = result;
          this.progressval = '';
          if (data.length > 0) {
            if (data[0].StatusRes === 'Success')
            {
              this.List = data;
              this.select = "LIST";
              this.ShowEntry_View = 'View';
            }
            else
            {
              this.select = "EMPTY";
              Swal.fire({  text: data[0].StatusRes });
            }
          }
          else {
            this.select = "EMPTY";
            Swal.fire({  text: 'DATA NOT FOUND' });
          }
        }, (err) => {
          this.progressval = 'determinate';
          if(err.status == 0){
            Swal.fire({  text: 'Server is in Offline' });
          }
          else{
            Swal.fire({  text: err });
          }
        }));
    }


    OnIcodeTextChange(event) {
      if (event.key !== "Enter"){
        this.ClearDetAll();
      }

      const keycode = (event.which) ? event.which : event.keyCode;
      if((keycode >= 48 && keycode <= 57) || keycode == 8) {
        return true;
      }
      else{
        return false;
      }
    }

    OnStockTextChange(key) {
      this.Chkuom = this.Uom_val;
      const keycode = (key.which) ? key.which : key.keyCode;

      if(this.Chkuom == "KGS" || this.Chkuom == "LTRS" || this.Chkuom == "MTRS" || this.Chkuom == "ROLLS" || this.Chkuom == "RIM"){
        if ((keycode >= 48 && keycode <= 57 ) || keycode == 45 || keycode == 8) {
          if(keycode == 45){
            if(key.srcElement.value !== ''){
              return false;
            }
          }
          return true;
        }
        else if (keycode === 46) {
            if (this.StkCurQty_val.indexOf('.') > -1) {
              return false;
            } else {
              return true;
            }
        }
        else {
          return false;
        }
      }
      else{
        if((keycode >= 48 && keycode <= 57) || keycode == 45 || keycode == 8) {
          if(keycode == 45){
            if(key.srcElement.value !== ''){
              return false;
            }
          }
          return true;
        }
        else{
          return false;
        }
      }
    }

    ClearDetAll(){
      this.Itemname_val = ""; this.Uom_val=""; this.StkCurQty_val= "";
      this.Category = ""; this.Rate="";
    }

    OnBackClic(){
      if(this.ShowEntry_View === 'View')
      {
        this.ShowEntry_View = 'Entry';
      }
      else
      {
        this.router.navigate(['/dashboard']);
      }
    }

    Logout(){
    }

  }
