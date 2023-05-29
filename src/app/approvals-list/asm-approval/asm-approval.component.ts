import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { Router } from '@angular/router';
import { debounceTime } from 'rxjs/operators';
import * as _moment from 'moment';
import { SubSink } from 'subsink';
import Swal from 'sweetalert2';
import { Globals } from 'src/app/globals';
import { VinthService } from 'src/app/services/vinth.service';
import { IfStmt } from '@angular/compiler';
import { Subject } from 'rxjs';


export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD-MMM-YYYY',
  },
  display: {
    dateInput: 'DD-MMM-YYYY',
    monthYearLabel: 'MMMM ',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM '
  },
};

@Component({
  selector: 'app-asm-approval',
  templateUrl: './asm-approval.component.html',
  styleUrls: ['./asm-approval.component.css'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
  ]
  //encapsulation : ViewEncapsulation.None
})


export class AsmApprovalComponent implements OnInit {
  @ViewChild('closeAddExpenseModal') closeAddExpenseModal: ElementRef;
  private subs = new SubSink();
  select = "userconfig";
  subselect = "firstTab";
  isLoading = false;masterSelected:boolean=true;checkedList:any;
  approval1: boolean = true; approval2: boolean = false;
  firstTab: boolean = true; secondTab: boolean = false; thirdTab: boolean = false;
  userconfig: boolean = true;
  back: any; myModel = true; post: any;
  Pendingorders: any[] = [];
  brcode = 0; branch: any; TrnNo: any;
  OrderDetail: any[] = [];
  Orderno: any; OrderDate: any; status: any; Brcode: any; id: any;
  ViewOrders: any[] = []; BrcodeReject: any[] = []; Updateorders: any[] = [];
  showModal: boolean = false;
  rejectname: any;
  statusvalue: any[] = []; ViewSelection: any[] = [];
  BrcodeReject1: any; selectedAll: any; approvalstatus: any;
  SearchForm1: any; Flag1: any; itemdetials: any; StatusRes: any;
  ApprovelOrder: any[] = []; OrderDetail1: any[] = [];
  approval3: boolean = true; approval4: boolean = false;
  Status: any;
  StockDate: any[] = []; ApprEnable = 'Yes';
  Branchloccntrl1: FormControl;
  BranchDetail: any[] = []; SearchForm2: any; OrderStatus: any[] = [];
  Branchloccntrl2: FormControl;
  BranchDetail1: any[] = [];
  brcode1 = 0; brname = "ALL"; Brname: any; brname1 = "ALL";
  Customer: any;
  BillDetail: any[] = []; approval5: boolean = false;
  code: any; uploadForm: any;
  pipe: DatePipe;
  Frmdate: any; Todate: any; Frmdate1: any;
  Todate1: any; eventEditForm: any; selectedStatus: any;
  ssname: any; appr: any
  showhide: boolean = true;
  ordervalue: any; ordervalue1: any; value: any;
  edOrderNo: any; edOrderDate: any; edCustomer: any; edOrdervalue: any; edCode: any;
  edQty: any; edRate: any; nqty: any; edvalue: any;
  editval: any;
  OrderstatusUpdatedata: any[] = [];
  auth: boolean = false;
  Orderadddata: any[] = [];
  itemdetials1: any;
  edname: any;
  editForm: FormGroup;
  Ordereditlogdata: any[] = [];
  Ordereditlogview: any[] = [];
  Branch: any;
  Custcode: any;
  gmainFlag: string;
  apiCustCode: string;
  itemNameCtrl: FormControl;
  itemNameDate: any[];
  itemNameData: any[];
  itemImg: any;
  Branchlocload = new Subject<any>();
  tempIname: any;
  tempIcode: any;
  selectIndex: any;

  constructor(private vinthService: VinthService, private router: Router, private globals: Globals,
    private fb: FormBuilder) {
      this.pipe = new DatePipe('en'); this.Branchloccntrl1 = new FormControl(); this.Branchloccntrl2 = new FormControl();
    }

    ngOnInit(): void {
      this.itemNameCtrl = new FormControl({value: '', disabled: this.auth });

    if (this.globals.gmainMenuSelected === "RtlOrderStatusHo") {
      this.gmainFlag = 'RtlOrderStatusHo';
      this.apiCustCode=''
    } else if (this.globals.gmainMenuSelected === "RtlOrderStatusSelf") {
      this.apiCustCode= this.globals.gCustcode
      this.gmainFlag = 'RtlOrderStatusSelf';

    }
    this.eventEditForm = new FormGroup({ 'completed': new FormControl() });
    this.selectedStatus = 1;
    this.uploadForm = this.fb.group({
      rejectname: ['', Validators.required]
    });
    this.SearchForm1 = this.fb.group({
      Flag: [''],
      reqMainreq: ['ViewOrders'], Usr: this.globals.gUsrid, brcode: ['0'],
      var2: [new Date((new Date().getTime() - 500000000))], var3: [new Date()],search: [''],
    });
    this.SearchForm2 = this.fb.group({
      reqMainreq: ['GetOrderStatus'], Usr: this.globals.gUsrid, brcode: ['0'],
      var2: [new Date((new Date().getTime() - 100000000))], var3: [new Date()], var7:this.gmainFlag,search: [''],
      var8:this.apiCustCode
    });
    this.editForm = this.fb.group({
      editfrom: [new Date((new Date().getTime() - 100000000))], editto: [new Date()] ,search: ['']
    })
    this.pending();
    // this.submitFilter();


    this.subs.add(this.Branchloccntrl1.valueChanges.pipe(debounceTime(600)).subscribe((data: any) => {
      this.post = {}
      this.post['reqMainreq'] = "GetBranchDetail"
      this.post['Usr'] = this.globals.gUsrid;
      this.post['brcode'] = "0"; this.post['var1'] = data;
      if (data !== '') {
        this.subs.add(this.vinthService.getAsmApprovalObject(this.post).subscribe(data => {
          this.BranchDetail = data;

        }));
      }

    }));






    this.subs.add(this.Branchloccntrl2.valueChanges.pipe(debounceTime(600)).subscribe((data: any) => {
      this.post = {}
      this.post['reqMainreq'] = "GetBranchDetail"
      this.post['Usr'] = this.globals.gUsrid;
      this.post['brcode'] = "0"; this.post['var1'] = data;
      if (data !== '') {
        this.subs.add(this.vinthService.getAsmApprovalObject(this.post).subscribe(data => {
          this.BranchDetail1 = data;


        }));
      }
    }));
    this.post = {}
    this.post['reqMainreq'] = "ViewSelectionFlag"
    this.post['Usr'] = this.globals.gUsrid;
    this.post['brcode'] = "0";
    this.subs.add(this.vinthService.getAsmApprovalObject(this.post).subscribe(data => {
      this.ViewSelection = data;
      this.Flag1 = this.ViewSelection[0].Flag;

    }));
    this.getItemName();
  }
  getItemName() {
    this.subs.add(this.Branchlocload.pipe(debounceTime(600)).subscribe(data => {
      this.post = {"reqMainreq":"ItmSearchStockist","raFlag":"NON AC","aprStatus":data,
      "Usr":this.globals.gUsrid,"reqfromDTAP":"0","reqfromIp":"0","TrnNo":"0","brcode":this.brcode,"appby":"0",
      "splreason":"0","extra1":this.apiCustCode,"extra2":"0","extra3":"RETAIL"}
      // this.post['reqMainreq'] = 'PO_LOCATION_SEARCH', this.post['var1'] = data, this.post['Usr'] = this.globals.gUsrid
      if (data.length > 0) {
        this.subs.add(this.vinthService.getAsmApprovalItem(this.post).subscribe(data => {
          this.itemNameData = data
        }))
      }
    }));
  }
  getItemDetails(e: any, emp: any) {
    this.edCode =  e.source.__ngContext__[8].$implicit.icode
    this.getItemDetailwithIcode();
    setTimeout(() => { document.getElementById('icode')?.focus(); }, 100);
  }
  pending() {
    if (this.globals.gmainMenuSelected === "RtlOrderStatusHo") {
      this.apiCustCode=''
    }
    this.post = {}
    this.post['reqMainreq'] = "GetPendingOrders"
    this.post['Usr'] = this.globals.gUsrid;
    this.post['brcode'] = "0";
    this.post['var7'] =  this.gmainFlag;
    this.post['var8'] = this.apiCustCode;
    this.Pendingorders = [];
    this.isLoading = true;
    this.subs.add(this.vinthService.getAsmApprovalObject(this.post).subscribe(data => {
      this.Pendingorders = data;
      this.appr = data[0].ApprEnable;
      this.back = "home";
      if (data[0].StatusRes === "No Records Found") {
        this.showhide = false;
      } else {
        this.showhide = true;
      }
      setTimeout(() => { this.isLoading = false; }, 300);

    }));
  }

  changeloc(e: any, brcode: any) {
    if (e.source.selected) { this.brcode = brcode; }

  }
  changeloc1(e: any, brcode: any) {
    if (e.source.selected) { this.brcode1 = brcode; }

  }
  submitFilter() {
    if (this.globals.gmainMenuSelected === "RtlOrderStatusHo") {
      this.apiCustCode=''
    }
    this.Frmdate = this.SearchForm1.value.var2 = this.pipe.transform(this.SearchForm1.value.var2, "dd-MMM-yyyy");
    this.Todate = this.SearchForm1.value.var3 = this.pipe.transform(this.SearchForm1.value.var3, "dd-MMM-yyyy");
    this.post = {}
    this.post['reqMainreq'] = "ViewOrders"
    this.post['Usr'] = this.globals.gUsrid;
    this.post['brcode'] = this.brcode;
    this.post['var1'] = this.Flag1;
    this.post['var2'] = this.Frmdate;
    this.post['var3'] = this.Todate;
    this.post['var7'] =  this.gmainFlag;
    this.post['var8'] = this.apiCustCode;
    this.ViewOrders = [];
    // this.isLoading = true;
    this.subs.add(this.vinthService.getAsmApprovalObject(this.post).subscribe(data => {
      this.ViewOrders = data;
      if (data[0].StatusRes === "No Records Found") {
        this.showhide = false;
      } else {
        this.showhide = true;
      }
      // this.isLoading = false;
    }));




  }

  submitFilter2() {
    if (this.globals.gmainMenuSelected === "RtlOrderStatusHo") {
      this.apiCustCode=''
    }
    this.Frmdate1 = this.SearchForm2.value.var2 = this.pipe.transform(this.SearchForm2.value.var2, "dd-MMM-yyyy");
    this.Todate1 = this.SearchForm2.value.var3 = this.pipe.transform(this.SearchForm2.value.var3, "dd-MMM-yyyy");
    this.post = {}
    this.post['reqMainreq'] = "GetOrderStatus"
    this.post['Usr'] = this.globals.gUsrid;
    this.post['brcode'] = this.brcode1;
    this.post['var1'] = "0";
    this.post['var2'] = this.Frmdate1;
    this.post['var3'] = this.Todate1;
    this.post['var7'] =  this.gmainFlag;
    this.post['var8'] = this.apiCustCode;
    this.OrderStatus = [];
    // this.isLoading = true;
    this.subs.add(this.vinthService.getAsmApprovalObject(this.post).subscribe(data => {
      this.OrderStatus = data;
      if (data[0].StatusRes === "No Records Found") {
        this.showhide = false;
      } else {
        this.showhide = true;
      }
      // this.isLoading = false;
    }));


  }

  checkUncheckAll() {
    for (var i = 0; i < this.OrderDetail.length; i++) {
      this.OrderDetail[i].myModel = this.masterSelected;}
    this.getCheckedItemList();
    if(!this.masterSelected){
      this.myModel = false;
    }
  }
  // Check All Checkbox Checked
  isAllSelected() {
    this.masterSelected = this.OrderDetail.every((item:any)=> {
        return item.myModel == true;
      })
    this.getCheckedItemList();
  }
  // Get List of Checked Items
  getCheckedItemList(){

    this.checkedList = [];
    for (var i = 0; i < this.OrderDetail.length; i++) {
      if(this.OrderDetail[i].myModel){

        this.OrderDetail[i].status = "Approve";
      }else{
        this.checkedList.push(this.OrderDetail[i].Code);
        this.OrderDetail[i].status = "Reject";

      }
    }
      this.myModel = false;

    // console.log(this.checkedList);

  }

  selectAll() {
    var status = '';
    if (this.myModel) {
      this.myModel = false;
      status = 'Reject';
    } else {
      this.myModel = true;
      status = 'Approve';
    }

    this.OrderDetail.forEach(e => {
      e.status = status;
      e.myModel = this.myModel;
    });


  }
  ModelAll(i: any) {
    if (this.OrderDetail[i].myModel) {
      this.OrderDetail[i].myModel = false;
      this.OrderDetail[i].status = "Reject";
      this.myModel = this.OrderDetail.filter(t => t.myModel).length > 0 && false;
      const index1 = this.BrcodeReject.findIndex(x => x.Code === this.OrderDetail[i].Code);
      if (index1 === -1) {
        this.BrcodeReject.push(this.OrderDetail[i].Code);
      }


    } else {
      this.OrderDetail[i].myModel = true;
      this.OrderDetail[i].status = "Approve";
      const index = this.OrderDetail.findIndex(x => x.myModel === false);
      if (index === -1) {
        this.myModel = true;
      }

      const index2 = this.BrcodeReject.indexOf(this.OrderDetail[i].Code);
      if (index2 >= 0) {
        this.BrcodeReject.splice(index2, 1)
      }

    }
  }


  ApprovalConfirm() {
    var listtest = [];

    for (var i = 0; i < this.OrderDetail.length; i++) {
      if (this.OrderDetail[i].status == "Approve") {
        listtest.push(this.OrderDetail[i].Code)
        this.approvalstatus = "Approve"
      }
    }
    if (this.approvalstatus == "Approve") {
      this.approve();

    }

    else if (this.myModel == false) {
      this.approvalstatus = "Reject"
      this.showModal = true;

    } else if (this.StatusRes == "No Records Found") {
      Swal.fire({ text: this.StatusRes })
    }
  }
  cancelEsi() {
    this.showModal = false;
  }
  approve() {

    this.showModal = false;

    this.rejectname = "";
    this.post = {}
    this.post['reqMainreq'] = "UpdateOrderDetail"
    this.post['Usr'] = this.globals.gUsrid;
    this.post['brcode'] = this.brcode;
    this.post['var1'] = this.Orderno;
    this.post['var2'] =this.OrderDate;
    this.post['var3'] = this.branch;
    this.post['var4'] = this.approvalstatus;
    this.post['var5'] = this.TrnNo;
    this.post['var6'] = this.rejectname;
    this.post['var19'] = this.checkedList.toString();
    // this.post['var2'] = this.pipe.transform(this.OrderDate,'dd-MMM-yyyy')

    Swal.fire({
      title: 'Do you Confirm?',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
      denyButtonText: `cancel`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.subs.add(this.vinthService.getAsmApprovalObject(this.post).subscribe(data => {
          this.Updateorders = data;
          if (data[0].StatusRes === "Success") {
            this.select = 'userconfig';
            this.subselect = 'firstTab';
            Swal.fire({ text: data[0].Reason })
            // this.approval(this.itemdetials);
            this.auth = false;
            this.masterSelected=true;
            this.pending();
            this.myModel = false;

            // this.approval2 = false;
          } else {
            Swal.fire({ text: data[0].StatusRes })
          }
        }));
      }
    })

    this.BrcodeReject = [];
    this.approvalstatus = "";


    this.BrcodeReject = [];
  }



  EsiUpdate() {

    this.post = {}
    this.post['reqMainreq'] = "UpdateOrderDetail"
    this.post['Usr'] = this.globals.gUsrid;
    this.post['brcode'] = this.brcode;
    this.post['var1'] = this.Orderno;
    this.post['var2'] = this.OrderDate;
    this.post['var3'] = this.branch;
    this.post['var4'] = this.approvalstatus;
    this.post['var5'] = this.TrnNo;
    this.post['var6'] = this.uploadForm.value.rejectname;
    this.post['var19'] = "";
    if (this.uploadForm.valid) {
      this.subs.add(this.vinthService.getAsmApprovalObject(this.post).subscribe(data => {
        this.Updateorders = data;

        if (data[0].StatusRes === "Success") {
          Swal.fire({ text: data[0].Reason })
          // this.approval(this.itemdetials);
          this.select = 'userconfig';
          this.subselect = 'firstTab';
          this.pending();
          this.showModal = false;

        } else {
          Swal.fire({ text: data[0].StatusRes })
        }

        this.rejectname = "";
        this.approvalstatus = "";
      }));
    } if (this.uploadForm.invalid) {
    }


  }

  approval(pending: any,flag) {
    // console.log(pending);

    this.itemdetials = pending;
    this.brcode = pending.Brcode; this.Orderno = pending.OrderNo; this.OrderDate = pending.OrderDate;
    this.branch = pending.Branch; this.TrnNo = pending.TrnNo; this.Status = pending.Status; this.ordervalue = pending.Ordervalue;
    this.ssname = pending.Customer;
    // this.userconfig = false;

    // this.firstTab = false;
    this.select = "approval2";
    this.post = {}
    this.post['reqMainreq'] = "GetOrderDetail"
    this.post['Usr'] = this.globals.gUsrid;
    this.post['brcode'] = this.brcode;
    this.post['var1'] = this.Orderno;
    this.post['var2'] = this.OrderDate;
    this.post['var3'] = this.branch;
    this.post['var5'] = this.TrnNo;
    this.post['var6'] = this.Status;
    var res: any[] = [];
    this.isLoading = true;
    // console.log(this.post);

    this.subs.add(this.vinthService.getAsmApprovalObject(this.post).subscribe(data => {
      // console.log(data);
      setTimeout(() => { this.isLoading = false; }, 300);
      if(flag=='viewItems'){
        this.OrderDetail = [];
        res = data;
        res.forEach(e => {
          e.status = 'Approve';
          e.myModel = true;
        });
        this.myModel = true;
        this.OrderDetail = res;
      this.back = "approvelpage";
      this.masterSelected = true;
      this.getCheckedItemList();
      }

    //   if(!this.auth){
    //     // this.OrderDetail = [];
    //     // res = data;
    //     // res.forEach(e => {
    //     //   e.status = 'Approve';
    //     //   e.myModel = true;
    //     // });
    //     // this.myModel = true;
    //     // this.OrderDetail.push;
    //   this.back = "approvelpage";
    //   // this.masterSelected = true;
    //   this.getCheckedItemList();
    // }
    if(this.auth){
      this.OrderDetail[this.selectIndex].Qty = data[this.selectIndex].Qty

      this.OrderDetail.forEach(e=>{
        e.Ordervalue = data[0].Ordervalue
      })
      // console.log(this.OrderDetail[this.selectIndex].Qty);
    }
    this.ordervalue=data[0].Ordervalue
    if (this.globals.gmainMenuSelected === "RtlOrderStatusHo") {
      this.apiCustCode=data[0].Custcode;
    }
    }));

  }


  approvalview(pending1: any) {
    // this.itemdetials1 = pending1;
    this.brcode = pending1.Brcode; this.Orderno = pending1.OrderNo; this.OrderDate = pending1.OrderDate;
    this.branch = pending1.Branch; this.TrnNo = pending1.TrnNo; this.Status = pending1.Status;
    this.ordervalue1 = pending1.Ordervalue;
    this.ssname = pending1.Customer;
    // this.userconfig = false;
    // this.secondTab = false;
    this.select = "approval4";
    this.post = {}
    this.post['reqMainreq'] = "GetOrderDetail"
    this.post['Usr'] = this.globals.gUsrid;
    this.post['brcode'] = this.brcode;
    this.post['var1'] = this.Orderno;
    this.post['var2'] = this.OrderDate;
    this.post['var3'] = this.branch;
    this.post['var5'] = this.TrnNo;
    this.post['var6'] = this.Status;
    this.OrderDetail1 = [];
    this.isLoading = true;
    this.subs.add(this.vinthService.getAsmApprovalObject(this.post).subscribe(data => {
      this.OrderDetail1 = data;
      // data.forEach((e: any) => {
      // })
      // // console.log(this.edvalue)
      //  this.back = "approvedview";
      setTimeout(() => { this.isLoading = false; }, 300);

    }))
  }


  deliveryview(pending1: any) {
    this.brcode = pending1.Brcode; this.Orderno = pending1.OrderNo; this.OrderDate = pending1.OrderDate;
    this.Customer = pending1.Customer;
    this.select = "approval5";
    this.post = {}
    this.post['reqMainreq'] = "GetOrderBilledDetail"
    this.post['Usr'] = this.globals.gUsrid;
    this.post['brcode'] = this.brcode;
    this.post['var1'] = this.Orderno;
    this.post['var2'] = this.OrderDate;
    this.post['var3'] = this.Customer;
    this.post['var7'] =  this.gmainFlag;
    this.post['var8'] = this.apiCustCode;
    this.BillDetail = [];
    this.isLoading = true;
    this.subs.add(this.vinthService.getAsmApprovalObject(this.post).subscribe(data => {
      this.BillDetail = data;
      setTimeout(() => { this.isLoading = false; }, 200);
    }))
  }

  clear() {
    // this.edOrderDate = this.pipe.transform(new Date(), 'yyyy-MM-dd');
    this.edCode = ''; this.edQty = ''; this.edRate = ''; this.edvalue = ''; this.edname = ''; this.nqty = '';
  }
  changeload(e: any) { this.Branchlocload.next(e); }

  addneworder(add: any) {
    this.itemImg=''
    this.itemNameCtrl.disabled
    this.auth = false;
    this.edQty = '0'; this.editval = add;
    this.edOrderNo = this.Orderno; this.edOrderDate = this.pipe.transform(this.OrderDate, 'yyyy-MM-dd');
    this.TrnNo = this.TrnNo; this.edOrdervalue = this.ordervalue;
    this.edCustomer = this.ssname;
  }
  keyPressNum(event: any) {
    // Only Numbers 0-9
    return (event.charCode >= 48 && event.charCode <= 57);
  }
  keycode(e: any) {
    if (e.key === 'Enter') {
      this.getItemDetailwithIcode();
    }
  }
  getItemDetailwithIcode(){
    let req ={'reqMainreq':"GetItmDetlsiCodeStockist","raFlag":"NON AC","aprStatus":"NP","Usr":"0","reqfromDTAP":"0",
    "reqfromIp":"0","TrnNo":"0",
    "brcode":this.brcode,"appby":"0","splreason":"0","extra1":this.apiCustCode,"extra2":"0","extra3":this.edCode}

   this.subs.add(this.vinthService.getAsmApprovalItem(req).subscribe(data => {
    //  // console.log(data);

     this.Orderadddata = data;
     if (data[0].result == 'OK') {
       this.edCode = data[0].icode; this.edname = data[0].iname; this.edRate = data[0].rate;
       this.itemImg = data[0].itemImg
       this.tempIcode = data[0].icode;
       this.tempIname = data[0].iname;
       document.getElementById('nqty')?.focus();
     } else if (data[0].StatusRes == 'No Records Found') {
       Swal.fire({ text: 'Invalid Code' })
     } else {
       Swal.fire({ text: data[0].result })
     }
   }))
  }
  keytab(e: any, id: any) { if (e.key === "Enter") { document.getElementById(id)?.focus(); } }
  deliveryedit(ed: any, edit: any,i:any) {
    this.selectIndex = i
    // console.log(this.selectIndex);
    this.itemImg = '';
    this.editval = edit; this.auth = true;
    this.edOrderNo = ed.OrderNo; this.edOrderDate = this.pipe.transform(ed.OrderDate, 'yyyy-MM-dd'); this.edCustomer = ed.Customer; this.edOrdervalue = ed.Ordervalue;
    this.edCode = ed.Code; this.edQty = ed.Qty; this.edRate = ed.Rate; this.edvalue = (ed.Qty * ed.Rate); this.edname = ed.ItemName;
  }

  changesave(event: any) { this.edvalue = (Number(event.target.value) * this.edRate).toFixed(2) }

  dddata() {

    if(!this.auth){
      if(this.tempIcode == this.edCode && this.tempIname == this.edname){}
      else{
        Swal.fire({  text: 'item code & item name Mismatched'});
        return
      }
    }
    // if (this.DeliveryQtyAssignForm.valid) {
      if(!this.auth){
      if (this.OrderDetail?.length > 0) {
       let addfound = this.OrderDetail.find((e: any) => (e.Code == this.edCode )) //&& e.icode == this.poBrCode
        if (!addfound) {
          if (this.edCode != '' && this.edCode != undefined) {
            if (this.nqty != '' && this.nqty != undefined) {
              Swal.fire({
                title: 'Are you sure ?', showCancelButton: true,
                confirmButtonColor: '#3085d6', cancelButtonColor: '#d33',
                confirmButtonText: 'Yes', denyButtonText: `cancel`,
              }).then((result) => {
                if (result.isConfirmed) {
                  this.OrderstatusUpdatedata = [];
                  let reqappr = {
                    'reqMainreq': 'GetOrderDetailToEdit', 'Usr': this.globals.gUsrid, 'brcode': this.brcode, 'var1': this.edOrderNo,
                    'var2': this.pipe.transform(this.edOrderDate, "dd-MMM-yyyy"), 'var3': this.edCustomer, 'var4': this.edOrdervalue, 'var5': this.TrnNo, 'var6': this.editval,
                    'var7': this.edCode, 'var8': this.edQty, 'var9': this.nqty, 'var10': this.edRate, 'var11': this.edvalue
                  }
                  // // console.log(reqappr)
                  this.subs.add(this.vinthService.getAsmApprovalObject(reqappr).subscribe(data => {
                    this.OrderstatusUpdatedata = data;
                    if (data[0].StatusRes == 'Success') {
                      this.OrderDetail.push({Branch:  data[0].Branch,
                      Brcode: data[0].Brcode,
                      Code:data[0].Code,
                      Custcode: data[0].Custcode,
                      Customer: data[0].Customer,
                      DeliveryDate: data[0].DeliveryDate,
                      ItemName: data[0].ItemName,
                      OrderDate:  data[0].OrderDate,
                      OrderNo: data[0].OrderNo,
                      OrderTime:  data[0].OrderTime,
                      Ordervalue: data[0].Ordervalue,
                      Qty: data[0].Qty,
                      Rate:  data[0].Rate,
                      RequestUser:data[0].RequestUser,
                      status:'Approve',
                      StatusRes: data[0].StatusRes,
                      Uom: data[0].Uom,
                      myModel:true})
                      this.approval(this.itemdetials,'e');
                       this.clear();
                      this.pending();
                      this.getCheckedItemList();
                      this.closeAddExpenseModal.nativeElement.click();
                    } else {
                      Swal.fire({ text: data[0].StatusRes })
                    }
                  }))

                }
              })
            } else { Swal.fire({ text: 'Enter Qty' }) }
          } else { Swal.fire({ text: 'Enter Icode' }) }
        } else {
          Swal.fire({ text: 'Item code already exist' })
        }
      } else if (!this.OrderDetail?.length) {
        if (this.edCode != '' && this.edCode != undefined) {
          if (this.nqty != '' && this.nqty != undefined) {
            Swal.fire({
              title: 'Are you sure ?', showCancelButton: true,
              confirmButtonColor: '#3085d6', cancelButtonColor: '#d33',
              confirmButtonText: 'Yes', denyButtonText: `cancel`,
            }).then((result) => {
              if (result.isConfirmed) {
                this.OrderstatusUpdatedata = [];
                let reqappr = {
                  'reqMainreq': 'GetOrderDetailToEdit', 'Usr': this.globals.gUsrid, 'brcode': this.brcode, 'var1': this.edOrderNo,
                  'var2': this.pipe.transform(this.edOrderDate, "dd-MMM-yyyy"), 'var3': this.edCustomer, 'var4': this.edOrdervalue, 'var5': this.TrnNo, 'var6': this.editval,
                  'var7': this.edCode, 'var8': this.edQty, 'var9': this.nqty, 'var10': this.edRate, 'var11': this.edvalue
                }
                // // console.log(reqappr)
                this.subs.add(this.vinthService.getAsmApprovalObject(reqappr).subscribe(data => {

                  this.OrderstatusUpdatedata = data;
                  if (data[0].StatusRes == 'Success') {


                    this.approval(this.itemdetials,'e');
                    this.clear();
                    this.pending();
                    this.closeAddExpenseModal.nativeElement.click();
                  } else {
                    Swal.fire({ text: data[0].StatusRes })
                  }
                }))

              }
            })
          } else { Swal.fire({ text: 'Enter Qty' }) }
        } else { Swal.fire({ text: 'Enter Icode' }) }
      }
    }else{
      if (this.edCode != '' && this.edCode != undefined) {
        if (this.nqty != '' && this.nqty != undefined) {
          Swal.fire({
            title: 'Are you sure ?', showCancelButton: true,
            confirmButtonColor: '#3085d6', cancelButtonColor: '#d33',
            confirmButtonText: 'Yes', denyButtonText: `cancel`,
          }).then((result) => {
            if (result.isConfirmed) {
              this.OrderstatusUpdatedata = [];
              let reqappr = {
                'reqMainreq': 'GetOrderDetailToEdit', 'Usr': this.globals.gUsrid, 'brcode': this.brcode, 'var1': this.edOrderNo,
                'var2': this.pipe.transform(this.edOrderDate, "dd-MMM-yyyy"), 'var3': this.edCustomer, 'var4': this.edOrdervalue, 'var5': this.TrnNo, 'var6': this.editval,
                'var7': this.edCode, 'var8': this.edQty, 'var9': this.nqty, 'var10': this.edRate, 'var11': this.edvalue
              }
              // // console.log(reqappr)
              this.subs.add(this.vinthService.getAsmApprovalObject(reqappr).subscribe(data => {
                // console.log(data);

                this.OrderstatusUpdatedata = data;
                if (data[0].StatusRes == 'Success') {
                  this.approval(this.itemdetials,'e');
                  this.clear();
                  this.pending();
                  this.closeAddExpenseModal.nativeElement.click();
                } else {
                  Swal.fire({ text: data[0].StatusRes })
                }
              }))

            }
          })
        } else { Swal.fire({ text: 'Enter Qty' }) }
      } else { Swal.fire({ text: 'Enter Icode' }) }
    }
    // }


    // if (this.edCode != '' && this.edCode != undefined) {
    //   if (this.nqty != '' && this.nqty != undefined) {
    //     Swal.fire({
    //       title: 'Are you sure ?', showCancelButton: true,
    //       confirmButtonColor: '#3085d6', cancelButtonColor: '#d33',
    //       confirmButtonText: 'Yes', denyButtonText: `cancel`,
    //     }).then((result) => {
    //       if (result.isConfirmed) {
    //         this.OrderstatusUpdatedata = [];
    //         let reqappr = {
    //           'reqMainreq': 'GetOrderDetailToEdit', 'Usr': this.globals.gUsrid, 'brcode': this.brcode, 'var1': this.edOrderNo,
    //           'var2': this.pipe.transform(this.edOrderDate, "dd-MMM-yyyy"), 'var3': this.edCustomer, 'var4': this.edOrdervalue, 'var5': this.TrnNo, 'var6': this.editval,
    //           'var7': this.edCode, 'var8': this.edQty, 'var9': this.nqty, 'var10': this.edRate, 'var11': this.edvalue
    //         }
    //         // // console.log(reqappr)
    //         this.subs.add(this.vinthService.getAsmApprovalObject(reqappr).subscribe(data => {
    //           this.OrderstatusUpdatedata = data;
    //           if (data[0].StatusRes == 'Success') {
    //             this.approval(this.itemdetials); this.clear();
    //             this.pending();
    //             this.closeAddExpenseModal.nativeElement.click();
    //           } else {
    //             Swal.fire({ text: data[0].StatusRes })
    //           }
    //         }))

    //       }
    //     })
    //   } else { Swal.fire({ text: 'Enter Qty' }) }
    // } else { Swal.fire({ text: 'Enter Icode' }) }
  }

  hrclear() { this.clear(); this.closeAddExpenseModal.nativeElement.click(); }

  editlog() {
    if (this.globals.gmainMenuSelected === "RtlOrderStatusHo") {
      this.apiCustCode=''
    }
    this.Ordereditlogdata = [];
    let reqappr = {
      'reqMainreq': 'GetEditedOrderDetail', 'Usr': this.globals.gUsrid, 'brcode': this.brcode, 'var1': '',
      'var2': this.pipe.transform(this.editForm.value.editfrom, "dd-MMM-yyyy"), 'var3': this.pipe.transform(this.editForm.value.editto, "dd-MMM-yyyy"),
      'var7': this.gmainFlag,'var8': this.apiCustCode
    }
    this.subs.add(this.vinthService.getdeptdesign(reqappr).subscribe(data => {
      this.Ordereditlogdata = data;
    }))
  }
  editviewshow(ask: any) {
    this.Ordereditlogview = [];
    let reqappr = {
      'reqMainreq': 'GetEditedOrderItems', 'Usr': this.globals.gUsrid, 'brcode': ask.Brcode, 'var1': ask.OrderNo,
      'var2': this.pipe.transform(ask.OrderDate, "dd-MMM-yyyy")
    }
    this.subs.add(this.vinthService.getdeptdesign(reqappr).subscribe(data => {
      this.Ordereditlogview = data; this.Orderno = data[0].OrderNo;
      this.Custcode = data[0].Custcode; this.Branch = data[0].Branch; this.Status = data[0].Status;
      this.Customer = data[0].Customer;
      this.select = 'editlogshowdata';
    }))

  }

  onFirstTab() { this.subselect = "secondTab"; this.OrderStatus = []; this.ViewOrders = []; this.submitFilter(); }

  onSecondTab() { this.subselect = "firstTab"; this.OrderStatus = []; this.pending();}

  onThirdTab() { this.subselect = "thirdTab"; this.submitFilter2(); this.ViewOrders = []; }

  onFourthTab() { this.subselect = "fourthTab"; this.editlog(); }


  backNavigation() {
    if (this.select == "userconfig") {
      this.BrcodeReject = []; this.pending();
      this.router.navigate(['/dashboard']);
    } else if (this.select == "approval2") {
      this.select = "userconfig"; this.subselect = "firstTab";
    } else if (this.select == "approval4") {
      this.select = "userconfig"; this.subselect = "secondTab";
    } else if (this.select == "approval5") {
      this.select = "userconfig"; this.subselect = "thirdTab";
    } else if (this.select == "editlogshowdata") {
      this.select = "userconfig"; this.subselect = "fourthTab";
    } else {
      this.router.navigate(['/dashboard']);
    }
  }

  public homeNavigate() {
    this.globals.SelectDashboard = 'GROUPLIST';
    this.router.navigate(['/dashboard']);
  }
  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}












 // this.post = {}
    // this.post['reqMainreq'] = "GetSuperStockDate"
    // this.post['Usr'] = this.globals.gUsrid;
    // this.post['brcode'] = "0";
    // this.subs.add(this.vinthService.getAsmApprovalObject(this.post).subscribe(data => {
    //   this.StockDate = data;
    //   this.StockDate.forEach(e => {
    //     this.Frmdate = this.pipe.transform(e.Frmdate, "yyyy-MM-dd'T'HH:mm:ss'Z'");
    //     this.Todate = this.pipe.transform(e.Todate, "yyyy-MM-dd'T'HH:mm:ss'Z'");
    //     this.Frmdate1 = this.pipe.transform(e.Frmdate, "yyyy-MM-dd'T'HH:mm:ss'Z'");
    //     this.Todate1 = this.pipe.transform(e.Todate, "yyyy-MM-dd'T'HH:mm:ss'Z'");
    //     this.SearchForm1.get('Frmdate').setValue(this.Frmdate);
    //     this.SearchForm1.get('Todate').setValue(this.Todate);
    //     this.SearchForm2.get('Frmdate').setValue(this.Frmdate1);
    //     this.SearchForm2.get('Todate').setValue(this.Todate1);

    //   });

    // }));


